const {chromium}=require('playwright');
const P=[[1,'كيف تشتغل السيارة؟','How a Car Works'],[2,'المحرك','The Engine'],[3,'أنظمة الهواء والوقود','Air and Fuel Systems'],[4,'نظام العادم','The Exhaust System'],[5,'ناقل الحركة','The Transmission'],[6,'أنظمة الدفع والعزم','Drive Systems and Torque'],[7,'التيربو والسوبرتشارج','Turbochargers and Superchargers'],[8,'التعليق والثبات','Suspension and Handling'],[9,'الفرامل والأمان','Brakes and Safety'],[10,'الإطارات والجنوط','Tires and Wheels'],[11,'الديناميكية الهوائية وتخفيف الوزن','Aerodynamics and Weight Reduction'],[12,'برمجة السيارات','Car Tuning and ECU'],[13,'السباقات وقياس الأداء','Racing and Performance Measurement'],[14,'الصيانة والعناية','Maintenance and Care']];
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1240,height:1754}});
await p.goto('file://'+__dirname+'/cov.html');await p.waitForFunction(()=>document.title==='ready');
const only=process.argv[2];
for(const [n,ar,en] of P){for(const lang of ['ar','en']){if(only&&only!==`${lang}${n}`)continue;
await p.evaluate(d=>window.setCover(d),{n,ar,en,lang});await p.waitForTimeout(100);
await p.locator('#c').screenshot({path:`${__dirname}/out/DEAUTO_${lang.toUpperCase()}_part${String(n).padStart(2,'0')}.png`});}}
await b.close();})();
