const {chromium}=require('playwright');const fs=require('fs');const {spawn}=require('child_process');
// node games.js <mode> stills f1 f2 ...   |   node games.js <mode> full
(async()=>{const [mode,cmd,...fr]=process.argv.slice(2);
const b=await chromium.launch({args:['--allow-file-access-from-files','--disable-web-security']});const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto(`file://${__dirname}/games.html?m=${mode}`);await p.waitForFunction(()=>document.title==='ready');await p.waitForTimeout(200);
if(cmd==='stills'){for(const f of fr.map(Number)){const d=await p.evaluate(i=>draw(i),f);fs.writeFileSync(`${__dirname}/out/g_${mode}_${f}.jpg`,Buffer.from(d.split(',')[1],'base64'));}
 console.log(await p.evaluate(()=>{const o=[];(CLS||[]).forEach((c,i)=>{if(c===2)o.push(i)});return 'N='+N+' perfect='+o.join(',')}));}
else{const N=await p.evaluate(()=>N);
 const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','16','-pix_fmt','yuv420p','-g','15',`${__dirname}/out/g_${mode}_v.mp4`]);
 for(let i=0;i<N;i++){const d=await p.evaluate(i=>draw(i),i);if(!ff.stdin.write(Buffer.from(d.split(',')[1],'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log(mode,'frames',N);}
await b.close();})();
