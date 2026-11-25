const {chromium}=require('playwright');const D=require('./data.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const k of process.argv.slice(2)){for(let i=0;i<8;i++){
 await p.goto(`file://${__dirname}/slide.html?i=${i}&d=${encodeURIComponent(JSON.stringify(D[k]))}`);
 await p.waitForFunction(()=>document.title==='ready');await p.waitForTimeout(150);
 await p.screenshot({path:`${__dirname}/out/${k}_${i+1}.jpg`,type:'jpeg',quality:92});}}
await b.close();})();
