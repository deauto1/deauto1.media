#!/usr/bin/env python3
"""Make sure a video's FIRST frame is a readable cover (TikTok/IG use frame 0 as the thumbnail).
usage: fixcover.py <in.mp4|url> <out.mp4> [--force]
Prints: OK (frame 0 already has content, copied as-is) or FIXED t=<cover time>.
Rule: every video we upload must pass this (see reports/algo.md)."""
import sys, subprocess, json, os, tempfile, urllib.request
import numpy as np

def run(*a): return subprocess.run(a, capture_output=True, text=True, check=True)

def ink_profile(path, secs=4.5, fps=10):
    # dark-pixel fraction per sampled frame, from a 90x160 gray proxy
    p = subprocess.run(["ffmpeg","-v","error","-t",str(secs),"-i",path,"-vf",f"fps={fps},scale=90:160,format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
    a = np.frombuffer(p, np.uint8).reshape(-1,160,90)
    return [float((f<120).mean()) for f in a]

def frame0_ink(path):
    p = subprocess.run(["ffmpeg","-v","error","-i",path,"-frames:v","1","-vf","scale=90:160,format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
    return float((np.frombuffer(p,np.uint8)<120).mean())

def main():
    src, out = sys.argv[1], sys.argv[2]; force = "--force" in sys.argv
    tmp = tempfile.mkdtemp()
    if src.startswith("http"):
        f = os.path.join(tmp,"in.mp4"); urllib.request.urlretrieve(src, f); src = f
    prof = ink_profile(src); best = max(prof); f0 = frame0_ink(src)
    if not force and best > 0 and f0 >= 0.6*best:
        subprocess.run(["cp",src,out],check=True); print(f"OK f0={f0:.3f} max={best:.3f}"); return
    # cover = last frame that is within 97% of the max ink in the window (fully revealed hook)
    i = max(k for k,v in enumerate(prof) if v >= 0.97*best); t = i/10
    cover = os.path.join(tmp,"cover.png")
    run("ffmpeg","-v","error","-y","-ss",f"{t:.2f}","-i",src,"-frames:v","1",cover)
    info = json.loads(run("ffprobe","-v","error","-show_streams","-of","json",src).stdout)["streams"]
    v = next(s for s in info if s["codec_type"]=="video"); a = next((s for s in info if s["codec_type"]=="audio"),None)
    W,H = v["width"],v["height"]; fr = v.get("r_frame_rate","30/1")
    hold = "0.1"
    if a:
        sr = a["sample_rate"]; cl = "stereo" if a.get("channels",2)==2 else "mono"
        fc = f"[1:v]scale={W}:{H},fps={fr},format=yuv420p,setsar=1[c];[0:v]fps={fr},format=yuv420p,setsar=1[v];[2:a]aformat=sample_rates={sr}:channel_layouts={cl}[s];[0:a]aformat=sample_rates={sr}:channel_layouts={cl}[a];[c][s][v][a]concat=n=2:v=1:a=1[ov][oa]"
        cmd = ["ffmpeg","-v","error","-y","-i",src,"-loop","1","-t",hold,"-i",cover,"-f","lavfi","-t",hold,"-i",f"anullsrc=r={sr}:cl={cl}","-filter_complex",fc,"-map","[ov]","-map","[oa]","-c:a","aac","-b:a","160k"]
    else:
        fc = f"[1:v]scale={W}:{H},fps={fr},format=yuv420p,setsar=1[c];[0:v]fps={fr},format=yuv420p,setsar=1[v];[c][v]concat=n=2:v=1:a=0[ov]"
        cmd = ["ffmpeg","-v","error","-y","-i",src,"-loop","1","-t",hold,"-i",cover,"-filter_complex",fc,"-map","[ov]"]
    run(*cmd,"-c:v","libx264","-preset","veryfast","-crf","19","-pix_fmt","yuv420p","-movflags","+faststart",out)
    print(f"FIXED t={t:.1f} f0={f0:.3f} max={best:.3f} new_f0={frame0_ink(out):.3f}")

main()
