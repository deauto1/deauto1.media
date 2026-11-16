// Batch 8: English half-info clips for Parts 2-12 (to run once the English parts are live in the store).
const L = n => ({ vo: `The rest is in Part ${n} of DE AUTO.`, cta: true });
const T = "HALF THE ANSWER";
const V8 = [
{ id:"y1", lang:"en", tag:T, sim:"race", theme2:"dark", part:[5,"The Transmission"], hero:{kind:"versus", a:"CVT", b:"Manual"}, beats:[
  {vo:"CVT, or manual?"},
  {vo:"A manual has fixed gears.", side:1, show:"Manual: fixed gears"},
  {vo:"A CVT has no fixed gears at all.", side:0, show:"CVT: no fixed gears"},
  {vo:"So how does it change speed?", show:"So how does it change speed? 🤔", strong:true}, L(5) ]},
{ id:"y2", lang:"en", tag:T, sim:"wash", theme2:"light", part:[7,"Turbochargers and Superchargers"], hero:{kind:"versus", a:"Turbo", b:"Supercharger"}, beats:[
  {vo:"Turbo, or supercharger?"},
  {vo:"A turbo is spun by the exhaust.", side:0, show:"Turbo: spun by the exhaust"},
  {vo:"A supercharger is driven by the engine belt.", side:1, show:"Supercharger: engine belt"},
  {vo:"So which one makes you wait?", show:"Which one makes you wait? 🤔", strong:true}, L(7) ]},
{ id:"y3", lang:"en", tag:T, sim:"sand", theme2:"red", part:[4,"The Exhaust System"], hero:{kind:"text", text:"Louder exhaust = more speed?", opts:["Definitely","No"]}, beats:[
  {vo:"Does a louder exhaust mean more speed?"},
  {vo:"No. The muffler only quiets the sound.", answer:1, show:"No. The muffler only quiets it"},
  {vo:"So what does back pressure do?", show:"So what does back pressure do? 🤔", strong:true}, L(4) ]},
{ id:"y4", lang:"en", tag:T, sim:"plinko", theme2:"dark", part:[9,"Brakes and Safety"], hero:{kind:"versus", a:"ABS", b:"ESC"}, beats:[
  {vo:"ABS, or ESC?"},
  {vo:"ABS stops the wheels locking.", side:0, show:"ABS: stops wheels locking"},
  {vo:"ESC helps keep the car stable.", side:1, show:"ESC: keeps the car stable"},
  {vo:"So when does each one kick in?", show:"When does each kick in? 🤔", strong:true}, L(9) ]},
{ id:"y5", lang:"en", tag:T, sim:"bricks", theme2:"light", part:[8,"Suspension and Handling"], hero:{kind:"versus", a:"Spring", b:"Shock"}, beats:[
  {vo:"Spring, or shock?"},
  {vo:"The spring carries the weight.", side:0, show:"Spring: carries the weight"},
  {vo:"The shock calms the spring down.", side:1, show:"Shock: calms the spring"},
  {vo:"Your car keeps bouncing after a bump. Which one is done?", show:"Still bouncing? Which one? 🤔", strong:true}, L(8) ]},
{ id:"y6", lang:"en", tag:T, sim:"multiply", theme2:"red", part:[12,"Car Tuning and ECU"], hero:{kind:"text", text:"Is Stage 2 an official number?", opts:["Yes","No, a workshop label"]}, beats:[
  {vo:"Is Stage 2 an official number?"},
  {vo:"No. Stage 1, 2 and 3 are workshop labels.", answer:1, show:"No. They are workshop labels"},
  {vo:"So what is actually the difference?", show:"So what is the difference? 🤔", strong:true}, L(12) ]},
{ id:"y7", lang:"en", tag:T, sim:"dvd", theme2:"dark", part:[6,"Drive Systems and Torque"], hero:{kind:"versus", a:"LSD", b:"Diff lock"}, beats:[
  {vo:"L S D, or diff lock?"},
  {vo:"An L S D stops one wheel spinning on its own.", side:0, show:"LSD: stops one wheel spinning"},
  {vo:"A diff lock locks the differential fully.", side:1, show:"Diff lock: locks it fully"},
  {vo:"So when do you need each?", show:"When do you need each? 🤔", strong:true}, L(6) ]},
{ id:"y8", lang:"en", tag:T, sim:"grow", theme2:"light", part:[2,"The Engine"], hero:{kind:"versus", a:"Torque", b:"Horsepower"}, beats:[
  {vo:"Torque, or horsepower?"},
  {vo:"Torque is the pushing force.", side:0, show:"Torque = pushing force"},
  {vo:"And horsepower?", side:1, show:"Horsepower = ???"},
  {vo:"Which one matters for your car?", show:"Which one matters for you? 🤔", strong:true}, L(2) ]},
];
if (typeof module !== "undefined") module.exports = V8;
