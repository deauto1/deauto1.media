// Batch 9: World Children's Day (Nov 20). Brand greeting end card, no selling.
const E = { vo: "أغلى راكب في سيارتك. دي اوتو.", cta: true };
const T = "اليوم العالمي للطفل";
const V9 = [
{ id:"kd1", kid:1, part:[0,""], tag:T, sim:"plinko", theme2:"light", hero:{kind:"text", text:"الطفل في السيارة… مكانه وين؟", opts:["قدام","ورا"]}, beats:[
  {vo:"الطفل في السيارة، مكانه وين؟ قدام ولا ورا؟"},
  {vo:"ورا. المقعد الخلفي آمن له.", answer:1, show:"ورا · المقعد الخلفي آمن له"}, E ]},
{ id:"kd2", kid:1, part:[0,""], tag:T, sim:"rings", theme2:"dark", hero:{kind:"code", parts:["ISOFIX"], sub:"الحلقات المعدنية بين مقاعد سيارتك"}, beats:[
  {vo:"آيزوفكس… الحلقات المعدنية بين مقاعد سيارتك."},
  {vo:"تثبّت كرسي الطفل في هيكل السيارة نفسه.", hi:[0], show:"تثبّت كرسي الطفل في هيكل السيارة"},
  {vo:"دوّر عليها في سيارتك اليوم.", show:"دوّر عليها في سيارتك اليوم", strong:true}, E ]},
{ id:"kd3", kid:1, part:[0,""], tag:T, sim:"bricks", theme2:"red", hero:{kind:"code", parts:["CHILD"," ","LOCK"], sub:"القفل الصغير على طرف الباب الخلفي"}, beats:[
  {vo:"القفل الصغير على طرف الباب الخلفي… وش يسوي؟"},
  {vo:"يمنع فتح الباب من داخل.", hi:[0,2], show:"يمنع فتح الباب من داخل"},
  {vo:"شغّله إذا معك أطفال ورا.", show:"شغّله إذا معك أطفال ورا", strong:true}, E ]},
{ id:"kd4", kid:1, part:[0,""], tag:"صاحبك يقول", sim:"sand", theme2:"dark", hero:{kind:"quote", text:"دقيقة وراجع، خل الولد في السيارة"}, beats:[
  {vo:"صاحبك يقول: دقيقة وراجع، خل الولد في السيارة."},
  {vo:"لا.", stamp:"لا", show:"لا"},
  {vo:"السيارة المقفلة تسخن بسرعة.", show:"السيارة المقفلة تسخن بسرعة"},
  {vo:"لا تتركه لحاله ولا دقيقة.", show:"لا تتركه لحاله ولا دقيقة", strong:true}, E ]},
{ id:"kd5", kid:1, part:[0,""], tag:T, sim:"race", theme2:"light", hero:{kind:"versus", a:"حضنك", b:"كرسي الطفل"}, beats:[
  {vo:"حضنك ولا كرسي الطفل؟"},
  {vo:"حضنك ما يمسكه وقت الفرملة القوية.", side:0, show:"حضنك ما يمسكه وقت الفرملة"},
  {vo:"الكرسي مصمم يمسكه.", side:1, show:"الكرسي مصمم يمسكه"}, E ]},
{ id:"kd6", kid:1, part:[0,""], tag:T, sim:"multiply", theme2:"red", hero:{kind:"text", text:"زر قفل النوافذ عند السواق… ليش موجود؟", opts:["للزينة","عشان الأطفال"]}, beats:[
  {vo:"زر قفل النوافذ عند السواق… ليش موجود؟"},
  {vo:"عشان الأطفال.", answer:1, show:"عشان الأطفال"},
  {vo:"يمنعهم يفتحون النوافذ وأنت تسوق.", show:"يمنعهم يفتحون النوافذ وأنت تسوق", strong:true}, E ]},
];

const EE = { vo: "Your most precious passenger. DE AUTO.", cta: true };
const TE = "WORLD CHILDREN'S DAY";
V9.push(
{ id:"ke1", lang:"en", kid:1, part:[0,""], tag:TE, sim:"plinko", theme2:"light", hero:{kind:"text", text:"Where should a child sit in the car?", opts:["Front","Back"]}, beats:[
  {vo:"Where should a child sit? Front or back?"},
  {vo:"The back. It is the safer place.", answer:1, show:"The back seat is safer"}, EE ]},
{ id:"ke2", lang:"en", kid:1, part:[0,""], tag:TE, sim:"rings", theme2:"dark", hero:{kind:"code", parts:["ISOFIX"], sub:"the metal anchors between your seats"}, beats:[
  {vo:"ISOFIX. The metal anchors between your seats."},
  {vo:"They lock the child seat to the car itself.", hi:[0], show:"They lock the child seat to the car"},
  {vo:"Find them in your car today.", show:"Find them in your car today", strong:true}, EE ]},
{ id:"ke3", lang:"en", kid:1, part:[0,""], tag:TE, sim:"bricks", theme2:"red", hero:{kind:"code", parts:["CHILD"," ","LOCK"], sub:"the small switch on the rear door edge"}, beats:[
  {vo:"That small switch on the rear door. What does it do?"},
  {vo:"It stops the door opening from inside.", hi:[0,2], show:"Stops the door opening from inside"},
  {vo:"Turn it on when kids ride in the back.", show:"Turn it on when kids ride in the back", strong:true}, EE ]},
{ id:"ke4", lang:"en", kid:1, part:[0,""], tag:"YOUR FRIEND SAYS", sim:"sand", theme2:"dark", hero:{kind:"quote", text:"One minute, leave the kid in the car"}, beats:[
  {vo:"Your friend says: one minute, leave the kid in the car."},
  {vo:"No.", stamp:"NO", show:"No"},
  {vo:"A closed car heats up fast.", show:"A closed car heats up fast"},
  {vo:"Never leave a child alone in it. Not even a minute.", show:"Not even a minute", strong:true}, EE ]},
{ id:"ke5", lang:"en", kid:1, part:[0,""], tag:TE, sim:"race", theme2:"light", hero:{kind:"versus", a:"Your lap", b:"Child seat"}, beats:[
  {vo:"Your lap, or a child seat?"},
  {vo:"Your lap can't hold them in hard braking.", side:0, show:"Your lap can't hold them"},
  {vo:"A child seat is built to.", side:1, show:"A child seat is built to"}, EE ]},
{ id:"ke6", lang:"en", kid:1, part:[0,""], tag:TE, sim:"multiply", theme2:"red", hero:{kind:"text", text:"The window lock button. Why is it there?", opts:["Decoration","For kids"]}, beats:[
  {vo:"The window lock button by the driver. Why is it there?"},
  {vo:"For kids.", answer:1, show:"For kids"},
  {vo:"It stops them opening windows while you drive.", show:"No windows opening while you drive", strong:true}, EE ]},
);
if (typeof module !== "undefined") module.exports = V9;
