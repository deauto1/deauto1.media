// Batch 12: "who we are" clips (owner, Nov 24: people don't know who DE AUTO is). Brain-rot format, brand end card.
const END = {vo:"دي أوتو. ما نعلمك، إحنا نفهمك.", cta:true};
const T = "مين دي اوتو؟";
const V12 = [
{ id:"u1", who:1, tag:T, sim:"plinko", theme2:"light", hero:{kind:"text", text:"دي اوتو… معرض سيارات؟", opts:["إيه","لا"]}, beats:[
  {vo:"دي أوتو… معرض سيارات؟"},
  {vo:"لا. إحنا ما نبيع سيارات.", answer:1, show:"لا. إحنا ما نبيع سيارات"},
  {vo:"نبيع الفهم: 14 جزء، يشرح لك السيارة بالعربي البسيط.", show:"نبيع الفهم: 14 جزء بالعربي البسيط", strong:true}, END ]},
{ id:"u2", who:1, tag:T, sim:"race", theme2:"dark", hero:{kind:"text", text:"دي اوتو… ورشة؟", opts:["إيه","لا"]}, beats:[
  {vo:"دي أوتو… ورشة؟"},
  {vo:"لا، ما نصلّح سيارتك.", answer:1, show:"لا، ما نصلّح سيارتك"},
  {vo:"نفهّمك وش فيها… قبل لا تروح الورشة.", show:"نفهّمك وش فيها قبل لا تروح الورشة", strong:true}, END ]},
{ id:"u3", who:1, tag:T, sim:"wash", theme2:"red", hero:{kind:"code", parts:["PDF"], sub:"وش تستلم بالضبط؟"}, beats:[
  {vo:"وش تستلم من دي أوتو بالضبط؟"},
  {vo:"ملف بي دي إف، يوصلك رابطه أول ما تدفع.", hi:[0], show:"ملف PDF يوصلك أول ما تدفع"},
  {vo:"تقراه من جوالك، ويبقى معك.", show:"تقراه من جوالك 📱 ويبقى معك"},
  {vo:"ومعه ملخص من 3 صفحات.", show:"+ ملخص Made Easier من 3 صفحات", strong:true}, END ]},
{ id:"u4", who:1, tag:T, sim:"multiply", theme2:"light", hero:{kind:"code", parts:["14"], sub:"جزء"}, beats:[
  {vo:"14 جزء."},
  {vo:"من المحرك والقير… إلى الفرامل والإطارات والبرمجة.", hi:[0], show:"المحرك · القير · الفرامل · الإطارات · البرمجة"},
  {vo:"كل جزء… عالم لحاله.", show:"كل جزء… عالم لحاله", strong:true}, END ]},
{ id:"u5", who:1, tag:T, sim:"bricks", theme2:"dark", hero:{kind:"versus", a:"عربي", b:"English"}, beats:[
  {vo:"عربي، ولا إنجليزي؟"},
  {vo:"الاثنين.", show:"الاثنين ✅", strong:true},
  {vo:"كل أجزاء دي أوتو… بالعربي، وبالإنجليزي.", show:"كل الأجزاء بالعربي و English"}, END ]},
{ id:"u6", who:1, tag:T, sim:"grow", theme2:"red", hero:{kind:"text", text:"دي اوتو لمين؟", opts:["للمحترفين","لأي أحد"]}, beats:[
  {vo:"دي أوتو لمين؟"},
  {vo:"لأي أحد يحب سيارته.", answer:1, show:"لأي أحد يحب سيارته 🤍"},
  {vo:"لصاحب أول سيارة… وللي يبي يفهم كلام الفني.", show:"لصاحب أول سيارة… وللي يبي يفهم الفني"}, END ]},
{ id:"u7", who:1, tag:T, sim:"sand", theme2:"light", hero:{kind:"text", text:"تحتاج خبرة؟", opts:["إيه","أبد"]}, beats:[
  {vo:"تحتاج خبرة عشان تفهم دي أوتو؟"},
  {vo:"أبد. نبدأ معك من الصفر.", answer:1, show:"أبد. نبدأ معك من الصفر"},
  {vo:"بكلام بسيط، ورسومات توضيحية، بدون تعقيد.", show:"كلام بسيط · رسومات · بدون تعقيد"}, END ]},
{ id:"u8", who:1, tag:T, sim:"rings", theme2:"dark", hero:{kind:"text", text:"من وين أبدأ مع دي اوتو؟", opts:["من أي جزء","من الجزء 1"]}, beats:[
  {vo:"من وين تبدأ مع دي أوتو؟"},
  {vo:"من الجزء الأول: كيف تشتغل السيارة.", answer:1, show:"الجزء 1 · كيف تشتغل السيارة؟"},
  {vo:"وبعدها، اختار اللي يهمك.", show:"وبعدها اختار اللي يهمك 👇"}, END ]},
];
if (typeof module !== "undefined") module.exports = V12;
