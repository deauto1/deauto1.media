const {chromium}=require("playwright");const fs=require("fs");const {spawn,execSync}=require("child_process");
const D=[0,1,2,3,4,5,6,7,8,9].map(i=>parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 vo/x${i}.mp3`).toString()));
(async()=>{const mode=process.argv[2];
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on("console",m=>console.log("PAGE",m.text()));p.on("pageerror",e=>console.log("ERR",e.message));
await p.goto(`file://${process.cwd()}/ex.html?d=${encodeURIComponent(JSON.stringify(D))}`);await p.waitForFunction(()=>window.READY);
const TOTAL=await p.evaluate(()=>window.TOTAL);
if(mode==="stills"){fs.mkdirSync("st",{recursive:true});for(const t of process.argv.slice(3).map(Number)){await p.evaluate(t=>seek(t),t);await p.screenshot({path:`st/${t.toFixed(2)}.jpg`,type:"jpeg",quality:80});}
 console.log("TOTAL",TOTAL,"starts",JSON.stringify(await p.evaluate(()=>0)));await b.close();return;}
const fps=30,N=Math.ceil(TOTAL*fps);const tmp="tmp_ex.mp4";
const ff=spawn("ffmpeg",["-y","-v","error","-f","image2pipe","-framerate",""+fps,"-c:v","mjpeg","-i","-","-i","vo/full.m4a","-t",""+TOTAL,"-c:v","libx264","-preset","veryfast","-crf","18","-pix_fmt","yuv420p","-c:a","aac","-b:a","192k","-movflags","+faststart",tmp]);
for(let i=0;i<N;i++){await p.evaluate(t=>seek(t),i/fps);const buf=await p.screenshot({type:"jpeg",quality:92});if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once("drain",r));}
ff.stdin.end();await new Promise(r=>ff.on("close",c=>{if(c===0) fs.renameSync(tmp,"DEAUTO_how_to_buy_ar.mp4");console.log("exit",c);r();}));await b.close();})();
