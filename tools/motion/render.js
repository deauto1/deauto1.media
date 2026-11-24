const {chromium}=require("playwright");const fs=require("fs");const {spawn}=require("child_process");
(async()=>{const [lang,id]=process.argv.slice(2);const a=JSON.parse(fs.readFileSync(process.env.G+`/baudio/${id}.json`));
const dur=a.dur+0.3, fps=30, N=Math.ceil(dur*fps);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto(`file://${process.cwd()}/ad.html?lang=${lang}&dur=${a.dur}&st=${encodeURIComponent(JSON.stringify(a.starts))}`);await p.waitForFunction(()=>window.READY);
const tmp=`tmp_${lang}.mp4`;
const ff=spawn("ffmpeg",["-y","-v","error","-f","image2pipe","-framerate",""+fps,"-c:v","mjpeg","-i","-","-i",process.env.G+`/baudio/${id}.mp3`,"-af","apad","-t",""+dur,"-c:v","libx264","-preset","veryfast","-crf","18","-pix_fmt","yuv420p","-c:a","aac","-b:a","192k","-movflags","+faststart",tmp]);
for(let i=0;i<N;i++){await p.evaluate(t=>seek(t),i/fps);const buf=await p.screenshot({type:"jpeg",quality:92});if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once("drain",r));}
ff.stdin.end();await new Promise(r=>ff.on("close",c=>{if(c===0) fs.renameSync(tmp,`DEAUTO_motion_${lang}.mp4`);console.log(lang,"exit",c);r();}));await b.close();})();
