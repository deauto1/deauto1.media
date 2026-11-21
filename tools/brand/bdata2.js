const N=["كيف تشتغل السيارة؟","المحرك","أنظمة الهواء والوقود","نظام العادم","ناقل الحركة","أنظمة الدفع والعزم","التيربو والسوبرتشارج","التعليق والثبات","الفرامل والأمان","الإطارات والجنوط","الديناميكية الهوائية وتخفيف الوزن","برمجة السيارات","السباقات وقياس الأداء","الصيانة والعناية"];
const P=(...a)=>a.map(n=>({n,name:N[n-1]}));
const NE=["HOW A CAR WORKS"];
const SL="دِي أُوتُو. مَا نْعَلِّمَكْ، إِحْنَا نْفَهِّمَكْ.", BIO="دِي أُوتُو. الرَّابِطْ فِي الْبَايُو.";
module.exports=[
{id:"bb1",tag:"سلسلة دي اوتو",scenes:[
 {k:"txt",size:160,lines:["ليش","*14* جزء؟"],vo:"لَيْشْ أَرْبَعْطَعْشْ جُزْءْ؟"},
 {k:"txt",size:130,lines:["لأن السيارة","مو *قطعة وحدة*"],vo:"لِأَنَّ السَّيَّارَةْ مُو قِطْعَةْ وِحْدَةْ."},
 {k:"txt",size:140,lines:["كل نظام","*عالم* لحاله"],vo:"كُلّْ نِظَامْ فِيهَا، عَالَمْ لِحَالَهْ."},
 {k:"cards",title:"من تحت الكبوت",s2:"لين آخر برغي",items:P(1,2,3,4,5,6,7,8,9,10,11,12,13,14),vo:"الْمُحَرِّكْ. الْقِيرْ. التِّيرْبُو. التَّعْلِيقْ. الْفَرَامِلْ. الْبَرْمَجَةْ. وَالسِّبَاقَاتْ."},
 {k:"txt",size:120,lines:["وانت","تختار *اللي يهمك*"],vo:"وَإِنْتَ تِخْتَارْ اللِّي يْهِمَّكْ."},
 {k:"end",vo:BIO}]},
{id:"bb2",tag:"ابدأ من هنا",scenes:[
 {k:"txt",size:120,lines:["أول خطوة","تفهم فيها *سيارتك*"],vo:"أَوَّلْ خُطْوَةْ، تِفْهَمْ فِيهَا سَيَّارْتَكْ."},
 {k:"cards",title:"الجزء الأول",s2:"البداية الصح",items:P(1),vo:"الْجُزْءْ الْأَوَّلْ: كَيْفْ تِشْتَغِلْ السَّيَّارَةْ؟"},
 {k:"list",gap:.5,title:"بعده بتعرف",items:["وش يصير لما تشغّلها","كيف تتحرك من مكانها","وليش كل قطعة مهمة"],vo:"بَعْدَهْ بِتِعْرِفْ: وَشْ يْصِيرْ لَمَّا تْشَغِّلْهَا، وَكَيْفْ تِتْحَرَّكْ، وَلَيْشْ كُلّْ قِطْعَةْ مُهِمَّةْ."},
 {k:"txt",size:150,lines:["البداية","*الصح*"],vo:"هَذِي الْبِدَايَةْ الصَّحْ."},
 {k:"end",vo:BIO}]},
{id:"bb3",tag:"عند الفني",scenes:[
 {k:"txt",size:120,lines:["الفني يشرح…","وانت تهز *راسك*؟"],vo:"الْفَنِّي يِشْرَحْ، وَإِنْتَ تْهِزّْ رَاسَكْ؟"},
 {k:"txt",size:150,lines:["كلنا","*مرينا* فيها"],vo:"كِلِّنَا مَرِّينَا فِيهَا."},
 {k:"txt",size:120,lines:["بعد دي اوتو","*تفهم* كلامه"],sub:"وتتناقش معه بثقة",vo:"بَعْدْ دِي أُوتُو، تِفْهَمْ كَلَامَهْ، وَتِتْنَاقَشْ مَعَهْ بِثِقَةْ."},
 {k:"big",num:"14",count:14,label:"جزء يفهّمك سيارتك",sub:"اختار اللي يهمك",vo:"أَرْبَعْطَعْشْ جُزْءْ، يْفَهِّمُونَكْ سَيَّارْتَكْ."},
 {k:"end",vo:SL}]},
{id:"bb4",tag:"فكرة هدية",scenes:[
 {k:"txt",size:120,lines:["عندك خوي","*مجنون* سيارات؟"],vo:"عِنْدَكْ خُوِيّْ مَجْنُونْ سَيَّارَاتْ؟"},
 {k:"txt",size:120,lines:["لا تهديه","شي *ينساه*"],vo:"لَا تِهْدِيهْ شَيّْ يِنْسَاهْ."},
 {k:"cards",title:"اهده جزء",s2:"على ذوقه",items:P(7,8,12,13),vo:"اِهْدِهْ جُزْءْ عَلَى ذَوْقَهْ: التِّيرْبُو، التَّعْلِيقْ، الْبَرْمَجَةْ، أَوْ السِّبَاقَاتْ."},
 {k:"txt",size:150,lines:["هدية","*تبقى معه*"],vo:"هَدِيَّةْ، تِبْقَى مَعَهْ."},
 {k:"end",vo:BIO}]},
{id:"bb5",tag:"قبل التعديل",scenes:[
 {k:"txt",size:160,lines:["قبل ما","*تعدّل*…"],vo:"قَبْلْ مَا تْعَدِّلْ."},
 {k:"txt",size:150,lines:["افهم","وش *تعدّل*"],vo:"اِفْهَمْ وَشْ تْعَدِّلْ."},
 {k:"cards",title:"أجزاء التعديل",s2:"اختار اللي يهمك",items:P(3,4,7,8,12),vo:"الْهَوَا وَالْوَقُودْ. الْعَادِمْ. التِّيرْبُو. التَّعْلِيقْ. وَالْبَرْمَجَةْ."},
 {k:"txt",size:120,lines:["التعديل الصح","يبدأ *بالفهم*"],vo:"التَّعْدِيلْ الصَّحْ، يِبْدَأْ بِالْفَهْمْ."},
 {k:"end",vo:SL}]},
{id:"bb6",tag:"دي اوتو في 10 ثواني",scenes:[
 {k:"logo",cap:"دي اوتو",sub:"في 10 ثواني",vo:"دِي أُوتُو، فِي عَشْرْ ثَوَانِي."},
 {k:"big",num:"14",count:14,label:"جزء",sub:"من المحرك… لين الفرامل",vo:"أَرْبَعْطَعْشْ جُزْءْ، مِنْ الْمُحَرِّكْ، لِينْ الْفَرَامِلْ."},
 {k:"phone",title:"PDF على جوالك",s2:"ومعه نسخة مبسّطة",vo:"مَلَفّْ بِي دِي إِفْ عَلَى جَوَّالَكْ، وَمَعَهْ نُسْخَةْ مْبَسَّطَةْ."},
 {k:"end",vo:SL}]},
{id:"bb7",tag:"خصم الافتتاح",scenes:[
 {k:"txt",size:150,lines:["خصم","*الافتتاح*"],vo:"خَصْمْ الِافْتِتَاحْ."},
 {k:"big",num:"26",count:26,label:"نوفمبر",sub:"آخر يوم",vo:"يِنْتَهِي سِتَّةْ وَعِشْرِينْ نُوفَمْبَرْ."},
 {k:"txt",size:130,lines:["على كل","*الأجزاء*"],vo:"عَلَى كُلّْ الْأَجْزَاءْ."},
 {k:"txt",size:170,lines:["لا","*تفوتك*"],vo:"لَا تْفُوتَكْ."},
 {k:"end",vo:BIO}]},
{id:"be5",lang:"en",tag:"START HERE",scenes:[
 {k:"txt",size:200,lines:["NEW TO","*CARS?*"],vo:"New to cars?"},
 {k:"covers",items:[{n:1,name:"HOW A CAR WORKS"}],vo:"Start with Chapter One: How a Car Works."},
 {k:"list",gap:.5,title:"",items:["WHAT HAPPENS WHEN YOU START IT","HOW IT ACTUALLY MOVES","WHY EVERY PART MATTERS"],vo:"What happens when you start it. How it actually moves. And why every part matters."},
 {k:"txt",size:190,lines:["OUT NOW","*IN ENGLISH*"],vo:"Out now, in English."},
 {k:"end",vo:"Dee Auto. Because knowledge is power, and cars are passion."}]},
{id:"be6",lang:"en",tag:"A GIFT IDEA",scenes:[
 {k:"txt",size:150,lines:["GOT A FRIEND","WHO'S *CRAZY*","ABOUT CARS?"],vo:"Got a friend who's crazy about cars?"},
 {k:"txt",size:150,lines:["DON'T GIFT","SOMETHING","THEY'LL *FORGET*"],vo:"Don't gift them something they'll forget."},
 {k:"phone",img:["p1-05.png","p1-06.png"],title:"GIFT THEM",s2:"Real understanding",vo:"Gift them real understanding."},
 {k:"end",vo:"Dee Auto. Link in bio."}]},
{id:"be7",lang:"en",tag:"DE AUTO IN 10 SECONDS",scenes:[
 {k:"logo",cap:"DE AUTO",sub:"In 10 seconds.",vo:"Dee Auto, in ten seconds."},
 {k:"big",num:"14",count:14,label:"CHAPTERS",sub:"From the engine to the brakes.",vo:"Fourteen chapters. From the engine to the brakes."},
 {k:"phone",img:["pm-2.png","pm-3.png"],title:"PDF + MADE EASIER",s2:"Read it on your phone",vo:"A PDF on your phone, plus a Made Easier version."},
 {k:"end",vo:"Because knowledge is power, and cars are passion."}]},
];
