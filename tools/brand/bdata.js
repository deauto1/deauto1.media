const N=["كيف تشتغل السيارة؟","المحرك","أنظمة الهواء والوقود","نظام العادم","ناقل الحركة","أنظمة الدفع والعزم","التيربو والسوبرتشارج","التعليق والثبات","الفرامل والأمان","الإطارات والجنوط","الديناميكية الهوائية وتخفيف الوزن","برمجة السيارات","السباقات وقياس الأداء","الصيانة والعناية"];
const NE=["HOW A CAR WORKS","THE ENGINE","AIR & FUEL SYSTEMS","THE EXHAUST SYSTEM","THE TRANSMISSION","DRIVE SYSTEMS & TORQUE","FORCED INDUCTION","SUSPENSION & HANDLING","BRAKES & SAFETY","TIRES & WHEELS","AERO & LIGHTNESS","ECU TUNING","RACING & MEASUREMENT","MAINTENANCE & CARE"];
const ALL=N.map((name,i)=>({n:i+1,name})), ALLE=NE.map((name,i)=>({n:i+1,name}));
module.exports=[
{id:"ba1",tag:"تعرّف على دي اوتو",scenes:[
 {k:"txt",d:2.2,size:160,lines:["وش هو","*دي اوتو؟*"]},
 {k:"logo",d:2.4,cap:"دي اوتو",sub:"أكثر من مجرد اسم"},
 {k:"txt",d:3.0,lines:["هوية تجمع","*شغف* السيارات","مع *المعرفة*"]},
 {k:"big",d:3.0,num:"14",count:14,label:"جزء… كل جزء عالم",sub:"من تحت الكبوت… إلى الإطارات"},
 {k:"txt",d:2.5,lines:["نشرحها لك","*ببساطة*"],sub:"لين تفهم سيارتك صح"},
 {k:"end",d:2.8}]},
{id:"ba2",tag:"ليش دي اوتو؟",scenes:[
 {k:"txt",d:2.0,size:130,lines:["تسوق سيارتك","*كل يوم…*"]},
 {k:"txt",d:2.8,lines:["تعرف وش يصير","تحت *رجلك*","لما تدعس؟"]},
 {k:"txt",d:2.3,size:140,lines:["أغلبنا","*ما يعرف.*"],sub:"وهذا طبيعي."},
 {k:"list",d:3.8,gap:.55,title:"عشان كذا جا<br><span class='r'>دي اوتو</span>",items:["نشرح بلغة بسيطة","بدون تعقيد","تفهم سيارتك","وتتكلم عنها بثقة"]},
 {k:"end",d:2.8}]},
{id:"ba3",tag:"وش تستلم؟",scenes:[
 {k:"txt",d:2.4,lines:["وش تستلم","لما تشتري","*جزء*؟"]},
 {k:"phone",d:3.4,title:"ملف PDF",s2:"تحمّله وتقراه من جوالك",pill:"من 13 إلى 26 <b>صفحة</b>"},
 {k:"phone",d:3.0,title:"+ نسخة مبسّطة",s2:"تلخّص لك الجزء كله",pill:"3 <b>صفحات</b>"},
 {k:"list",d:3.0,gap:.5,title:"وداخل كل جزء",items:["رسومات توضيحية","مصطلحات بلغة سهلة","معلومات تبهرك"]},
 {k:"end",d:2.8}]},
{id:"ba4",tag:"سلسلة دي اوتو",scenes:[
 {k:"txt",d:2.2,size:150,lines:["*14* جزء","كل جزء *عالم*"]},
 {k:"cards",d:14*0.62+0.3,title:"من تحت الكبوت",s2:"إلى الإطارات",items:ALL},
 {k:"txt",d:1.9,size:150,lines:["اختار","اللي *يهمك*"]},
 {k:"end",d:2.6}]},
{id:"ba5",tag:"لمين دي اوتو؟",scenes:[
 {k:"txt",d:2.0,size:160,lines:["دي اوتو","*لمين؟*"]},
 {k:"list",d:3.9,gap:.55,title:"",items:["لعاشق السيارات","لصاحب أول سيارة","للي يبي يعدّل صح","للي يبي يفهم كلام الميكانيكي"]},
 {k:"txt",d:2.0,size:160,lines:["يعني…","*لك أنت.*"]},
 {k:"end",d:2.7}]},
{id:"ba6",tag:"فلسفتنا",scenes:[
 {k:"txt",d:2.6,size:130,lines:["فيه فرق","بين *تتعلّم*","و *تفهم*"]},
 {k:"txt",d:1.9,size:140,lines:["التعليم","~يحفّظك.~"]},
 {k:"txt",d:2.0,size:140,lines:["الفهم","*يخليك واثق.*"]},
 {k:"txt",d:2.1,size:140,lines:["وإحنا","اخترنا *الفهم.*"]},
 {k:"end",d:3.0}]},
{id:"ba7",tag:"ابدأ من هنا",scenes:[
 {k:"txt",d:2.0,size:140,lines:["أول مرة","مع *دي اوتو*؟"]},
 {k:"cards",d:2.2,title:"ابدأ من هنا",s2:"الجزء الأول… الأساس",items:[ALL[0]]},
 {k:"txt",d:2.7,size:104,lines:["بعدها","اختار *اللي يهمك*"],sub:"المحرك؟ التيربو؟ الفرامل؟ القرار لك."},
 {k:"txt",d:2.3,size:96,lines:["خصم *الافتتاح*","ينتهي *26 نوفمبر*"]},
 {k:"end",d:2.7}]},
{id:"be1",lang:"en",tag:"MEET DE AUTO",scenes:[
 {k:"txt",d:2.2,size:200,lines:["WHAT IS","*DE AUTO?*"]},
 {k:"logo",d:2.4,cap:"DE AUTO",sub:"More than a name."},
 {k:"txt",d:3.2,size:150,gap:.42,lines:["AN IDENTITY","THAT BRINGS","*CAR PASSION*","TOGETHER WITH","*KNOWLEDGE*"]},
 {k:"big",d:3.0,num:"14",count:14,label:"CHAPTERS",sub:"From under the hood to the tires."},
 {k:"txt",d:2.4,size:170,lines:["EXPLAINED","*SIMPLY.*"]},
 {k:"end",d:2.8}]},
{id:"be2",lang:"en",tag:"WHAT YOU GET",scenes:[
 {k:"txt",d:2.0,size:200,lines:["WHAT DO","YOU *GET?*"]},
 {k:"phone",d:3.8,img:["p1-05.png","p1-06.png"],title:"A REAL GUIDE",s2:"A PDF you read on your phone",pill:"CHAPTER <b>1</b>"},
 {k:"phone",d:3.6,img:["pm-2.png","pm-3.png"],title:"+ MADE EASIER",s2:"The short version, with a quick quiz"},
 {k:"list",d:3.0,gap:.5,title:"",items:["CLEAR VISUALS","PLAIN, FRIENDLY ENGLISH","NO JARGON WALLS"]},
 {k:"end",d:2.8}]},
{id:"be3",lang:"en",tag:"THE DE AUTO SERIES",scenes:[
 {k:"txt",d:2.1,size:190,lines:["*14* CHAPTERS","ONE *WORLD*"]},
 {k:"covers",d:14*0.62+0.3,title:"",items:ALLE},
 {k:"txt",d:2.4,size:160,lines:["START WITH","*CHAPTER 1*"],sub:"Out now in English. More chapters coming."},
 {k:"end",d:2.6}]},
{id:"be4",lang:"en",tag:"WHO IS IT FOR?",scenes:[
 {k:"txt",d:2.0,size:190,lines:["WHO IS","*DE AUTO* FOR?"]},
 {k:"list",d:3.9,gap:.55,title:"",items:["CAR LOVERS","FIRST-CAR OWNERS","FUTURE MODDERS","ANYONE WHO WANTS TO REALLY GET IT"]},
 {k:"txt",d:2.0,size:220,lines:["SO…","*YOU.*"]},
 {k:"end",d:2.7}]},
];
