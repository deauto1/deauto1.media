// Batch 7: English test, all pointing to Part 1 (the only English part live in the store).
const L = { vo: "The rest is in Part 1 of DE AUTO.", cta: true };
const P = [1, "How a Car Works"];
const V7 = [
{ id:"x1", lang:"en", tag:"HALF THE ANSWER", sim:"plinko", theme2:"dark", part:P, hero:{kind:"text", text:"What charges your battery while you drive?", opts:["The starter","The alternator"]}, beats:[
  {vo:"What charges your battery while you drive? The starter, or the alternator?"},
  {vo:"The alternator.", answer:1, show:"The alternator"},
  {vo:"It is one of six systems in your car. Can you name the other five?", show:"Name the other five? 🤔", strong:true}, L ]},
{ id:"x2", lang:"en", tag:"HALF THE ANSWER", sim:"race", theme2:"light", part:P, hero:{kind:"code", parts:["245","/","40","R","19"], sub:"the code on your tire"}, beats:[
  {vo:"The numbers on your tire are a code."},
  {vo:"19 is the wheel size.", hi:[4], show:"19 = wheel size"},
  {vo:"So what are 245 and 40?", hi:[0,2], show:"So what are 245 and 40? 🤔", strong:true}, L ]},
{ id:"x3", lang:"en", tag:"HALF THE ANSWER", sim:"bricks", theme2:"red", part:P, hero:{kind:"versus", a:"Gearbox", b:"Differential"}, beats:[
  {vo:"Gearbox, or differential?"},
  {vo:"The gearbox sends the power to the wheels.", side:0, show:"Gearbox: sends the power"},
  {vo:"The differential lets them spin at different speeds.", side:1, show:"Diff: different wheel speeds"},
  {vo:"But why would your wheels need different speeds?", show:"Why different speeds? 🤔", strong:true}, L ]},
];
if (typeof module !== "undefined") module.exports = V7;
