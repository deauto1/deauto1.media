// Batch 10: Part 1 sales clips in brain-rot format (reuses paid sl/of voiceovers, ends on a sale card).
const P1 = {vo:"الجزء الأول من دي أوتو: كيف تشتغل السيارة.", show:"الجزء 1 · كيف تشتغل السيارة؟"};
const LS = {vo:"المحرك، والقير، والدفرنس، ومقاس إطارك… في 13 صفحة.", show:"المحرك · القير · الدفرنس · مقاس إطارك"};
const PR = {vo:"ب19 ريال بس… إلى 30 نوفمبر.", show:"19 ريال بدل 36 · إلى 30 نوفمبر", strong:true};
const GO = {vo:"اطلبه الحين… الرابط في البايو.", show:"اطلبه الحين · الرابط في البايو", strong:true};
const END = {vo:"دي أوتو. ما نعلمك، إحنا نفهمك.", cta:true};
const OP1 = {vo:"الجزء الأول من دي أوتو، يفهمك كيف تشتغل السيارة.", show:"الجزء 1 · كيف تشتغل السيارة؟"};
const OLS = {vo:"المحرك في 4 خطوات… وكيف توصل القوة للأرض… وكيف تقرا مقاس إطارك.", show:"المحرك · القوة للأرض · مقاس إطارك"};
const OPR = {vo:"وسعره الحين، 19 ريال بس… إلى 30 نوفمبر.", show:"19 ريال بدل 36 · إلى 30 نوفمبر", strong:true};
const OGO = {vo:"الرابط في البايو.", show:"الرابط في البايو", strong:true};
const T = "الجزء 1";
const V10 = [
{ id:"zs1", sale:1, tag:T, sim:"plinko", theme2:"light", hero:{kind:"text", text:"فاتورة الورشة… تفهم نصها؟", opts:["أفهمها","ولا كلمة"]}, beats:[
  {vo:"تطلع من الورشة… بفاتورة ما تفهم نصها؟"},
  {vo:"مو لازم تصير فني… بس لازم تفهم.", answer:1, show:"مو لازم تصير فني… بس لازم تفهم"}, P1, LS, PR, GO, END ]},
{ id:"zs2", sale:1, tag:T, sim:"race", theme2:"dark", hero:{kind:"versus", a:"تشرح", b:"ساكت"}, beats:[
  {vo:"الشباب يتكلمون عن التيربو والقير… وأنت ساكت؟", side:1},
  {vo:"بعد 13 صفحة… أنت اللي تشرح.", side:0, show:"بعد 13 صفحة… أنت اللي تشرح"}, P1, LS, PR, GO, END ]},
{ id:"zs3", sale:1, tag:T, sim:"wash", theme2:"red", hero:{kind:"versus", a:"عشرات الآلاف", b:"سعر وجبة"}, beats:[
  {vo:"سيارتك دفعت فيها عشرات الآلاف…", side:0},
  {vo:"وتفهمها… بسعر وجبة.", side:1, show:"وتفهمها… بسعر وجبة 🍔"}, P1, LS, PR, GO, END ]},
{ id:"zs4", sale:1, tag:T, sim:"sand", theme2:"light", hero:{kind:"text", text:"أول سيارة لك؟", opts:["إيه","قريب"]}, beats:[
  {vo:"أول سيارة لك؟"},
  {vo:"قبل لا تدوس… افهمها.", show:"قبل لا تدوس… افهمها"}, P1, LS, PR, GO, END ]},
{ id:"zs5", sale:1, tag:T, sim:"bricks", theme2:"dark", hero:{kind:"versus", a:"المحرك", b:"القير"}, beats:[
  {vo:"تعرف الفرق بين المحرك والقير؟"},
  {vo:"إذا ترددت… هذا لك.", show:"إذا ترددت… هذا لك 👇"}, P1, LS, PR, GO, END ]},
{ id:"zs6", sale:1, tag:T, sim:"multiply", theme2:"red", hero:{kind:"code", parts:["13"], sub:"صفحة"}, beats:[
  {vo:"13 صفحة…"},
  {vo:"تغيّر طريقة شوفتك لسيارتك.", hi:[0], show:"تغيّر طريقة شوفتك لسيارتك"}, P1, LS, PR, GO, END ]},
{ id:"zs7", sale:1, tag:T, sim:"grow", theme2:"light", hero:{kind:"text", text:"صاحبك يحب السيارات؟", opts:["إيه","مرة"]}, beats:[
  {vo:"صاحبك يحب السيارات؟"},
  {vo:"هديته عندنا.", show:"هديته عندنا 🎁"}, P1, LS, PR, GO, END ]},
{ id:"zs8", sale:1, tag:T, sim:"rings", theme2:"dark", hero:{kind:"icon", sub:"لمبة طلعت في الطبلون…"}, beats:[
  {vo:"لمبة طلعت في الطبلون… وقلبك وقف؟", blink:1},
  {vo:"ابدأ تفهم سيارتك.", show:"ابدأ تفهم سيارتك"}, P1, LS, PR, GO, END ]},
{ id:"zs9", sale:1, tag:T, sim:"dvd", theme2:"red", hero:{kind:"text", text:"كل يوم تسوقها… فهمتها؟", opts:["إيه","ولا مرة"]}, beats:[
  {vo:"كل يوم تسوقها…"},
  {vo:"ولا مرة فهمتها؟", answer:1, show:"ولا مرة فهمتها؟"}, P1, LS, PR, GO, END ]},
{ id:"zo1", sale:1, tag:T, sim:"plinko", theme2:"dark", hero:{kind:"text", text:"وش يصير تحتك وأنت تسوق؟", opts:["أعرف","ما أدري"]}, beats:[
  {vo:"تسوق سيارتك كل يوم… وما تدري وش يصير تحتك؟", answer:1}, OP1, OLS, OPR, OGO, END ]},
{ id:"zo2", sale:1, tag:T, sim:"wash", theme2:"light", hero:{kind:"text", text:"الفني يتكلم… وأنت؟", opts:["أفهم","أهز راسي"]}, beats:[
  {vo:"الفني يتكلم… وأنت تهز راسك؟", answer:1},
  {vo:"ابدأ من هنا.", show:"ابدأ من هنا 👇"}, OP1, OLS, OPR, OGO, END ]},
];
if (typeof module !== "undefined") module.exports = V10;
