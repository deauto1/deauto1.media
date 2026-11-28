const {chromium}=require('playwright');const fs=require('fs');const {spawn}=require('child_process');
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files','--disable-web-security']});const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto(`file://${__dirname}/pz.html?lang=${process.env.LANG2||'ar'}`);await p.waitForFunction(()=>document.title==='ready');await p.waitForTimeout(200);
const mode=process.argv[2];
if(mode==='stills'){for(const f of process.argv.slice(3).map(Number)){const d=await p.evaluate(i=>draw(i),f);fs.writeFileSync(`${__dirname}/out/pz_${f}.jpg`,Buffer.from(d.split(',')[1],'base64'));}
 const info=await p.evaluate(()=>{const o=[];CLS.forEach((c,i)=>{if(c)o.push(i+':'+c)});return o.join(' ')});console.log(info);}
else{const N=await p.evaluate(()=>N);
 const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','16','-pix_fmt','yuv420p','-g','15',`${__dirname}/out/pz_${process.env.LANG2||'ar'}_v.mp4`]);
 for(let i=0;i<N;i++){const d=await p.evaluate(i=>draw(i),i);if(!ff.stdin.write(Buffer.from(d.split(',')[1],'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log('frames',N);}
await b.close();})();
