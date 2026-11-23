// Batch 11: English half-info clips, one per chapter (official EN launch, Nov 23).
const L = n => ({ vo: `The rest is in Chapter ${n} of DE AUTO.`, cta: true });
const T = "HALF THE ANSWER";
const V11 = [
{ id:"w1", lang:"en", tag:T, sim:"plinko", theme2:"light", part:[1,"How a Car Works"], hero:{kind:"text", text:"Why does your car even need a gearbox?", opts:["Speed","Something else"]}, beats:[
  {vo:"Why does your car even need a gearbox?"},
  {vo:"Because the engine only makes good power in a narrow range.", answer:1, show:"The engine only has a narrow power range"},
  {vo:"So how do gears fix that?", show:"So how do gears fix that? 🤔", strong:true}, L(1) ]},
{ id:"w2", lang:"en", tag:T, sim:"rings", theme2:"dark", part:[2,"The Engine"], hero:{kind:"code", parts:["SUCK","·","SQUEEZE","·","BANG","·","?"], small:1, sub:"the 4 strokes of your engine"}, beats:[
  {vo:"Suck. Squeeze. Bang. What is the fourth one?"},
  {vo:"Blow. Intake, compression, power, exhaust.", hi:[6], show:"Intake · Compression · Power · Exhaust"},
  {vo:"But what happens when the timing is off?", show:"And when the timing is off? 🤔", strong:true}, L(2) ]},
{ id:"w3", lang:"en", tag:T, sim:"sand", theme2:"red", part:[3,"Air and Fuel Systems"], hero:{kind:"text", text:"Premium fuel = more power?", opts:["Yes","Only if it needs it"]}, beats:[
  {vo:"Does premium fuel give you more power?"},
  {vo:"Only if your engine is built for it.", answer:1, show:"Only if your engine is built for it"},
  {vo:"So what does the octane number actually mean?", show:"So what does octane mean? 🤔", strong:true}, L(3) ]},
{ id:"w4", lang:"en", tag:T, sim:"bricks", theme2:"dark", part:[4,"The Exhaust System"], hero:{kind:"versus", a:"Catalytic converter", b:"Muffler"}, beats:[
  {vo:"Catalytic converter, or muffler?"},
  {vo:"One cleans the exhaust gases.", side:0, show:"Cat: cleans the gases"},
  {vo:"The other one quiets the sound.", side:1, show:"Muffler: quiets the sound"},
  {vo:"So what really happens when you remove the cat?", show:"What happens if you remove the cat? 🤔", strong:true}, L(4) ]},
{ id:"w5", lang:"en", tag:T, sim:"wash", theme2:"light", part:[5,"The Transmission"], hero:{kind:"text", text:"Why doesn't an automatic stall at a red light?", opts:["Magic","Torque converter"]}, beats:[
  {vo:"Why doesn't an automatic stall at a red light?"},
  {vo:"The torque converter. It lets the engine keep turning while the wheels stop.", answer:1, show:"The torque converter"},
  {vo:"So how does it pass power with no solid connection?", show:"No solid connection… so how? 🤔", strong:true}, L(5) ]},
{ id:"w6", lang:"en", tag:T, sim:"race", theme2:"dark", part:[6,"Drive Systems and Torque"], hero:{kind:"versus", a:"AWD", b:"4WD"}, beats:[
  {vo:"AWD, or four wheel drive?"},
  {vo:"AWD works on its own, all the time.", side:0, show:"AWD: always on, automatic"},
  {vo:"4WD is usually something you switch on.", side:1, show:"4WD: you switch it on"},
  {vo:"So which one do you actually need?", show:"Which one do you need? 🤔", strong:true}, L(6) ]},
{ id:"w7", lang:"en", tag:T, sim:"multiply", theme2:"red", part:[7,"Turbochargers and Superchargers"], hero:{kind:"code", parts:["1"," ","BAR"], sub:"of boost"}, beats:[
  {vo:"One bar of boost."},
  {vo:"That is roughly double the air your engine breathes.", hi:[0], show:"≈ double the air"},
  {vo:"So why don't we just keep adding more?", show:"So why not add more? 🤔", strong:true}, L(7) ]},
{ id:"w8", lang:"en", tag:T, sim:"grow", theme2:"light", part:[8,"Suspension and Handling"], hero:{kind:"text", text:"Lower car = better handling?", opts:["Always","Not always"]}, beats:[
  {vo:"Does a lower car always handle better?"},
  {vo:"Not always. Go too low and the suspension geometry changes.", answer:1, show:"Too low changes the geometry"},
  {vo:"So what is the right way to lower it?", show:"So what's the right way? 🤔", strong:true}, L(8) ]},
{ id:"w9", lang:"en", tag:T, sim:"plinko", theme2:"dark", part:[9,"Brakes and Safety"], hero:{kind:"text", text:"Does brake fluid expire?", opts:["No","Yes"]}, beats:[
  {vo:"Does brake fluid expire?"},
  {vo:"Yes. It slowly absorbs water over time.", answer:1, show:"It absorbs water over time"},
  {vo:"So what does that water do to your brakes?", show:"What does water do to your brakes? 🤔", strong:true}, L(9) ]},
{ id:"w10", lang:"en", tag:T, sim:"dvd", theme2:"red", part:[10,"Tires and Wheels"], hero:{kind:"code", parts:["DOT"," ","2324"], sub:"the date on your tire"}, beats:[
  {vo:"The last four digits on your tire are a date."},
  {vo:"Two three, two four. Week twenty three of twenty twenty four.", hi:[2], show:"Week 23 of 2024"},
  {vo:"So how old is too old?", show:"How old is too old? 🤔", strong:true}, L(10) ]},
{ id:"w11", lang:"en", tag:T, sim:"wash", theme2:"dark", part:[11,"Aerodynamics and Weight Reduction"], hero:{kind:"versus", a:"Spoiler", b:"Wing"}, beats:[
  {vo:"Spoiler, or wing?"},
  {vo:"A spoiler breaks up the air that lifts the car.", side:0, show:"Spoiler: breaks up lift"},
  {vo:"A wing pushes the car down.", side:1, show:"Wing: pushes the car down"},
  {vo:"So which one does your car actually need?", show:"Which one do you need? 🤔", strong:true}, L(11) ]},
{ id:"w12", lang:"en", tag:T, sim:"rings", theme2:"light", part:[12,"Car Tuning and ECU"], hero:{kind:"text", text:"What does the ECU actually control?", opts:["Just the radio","Fuel and spark"]}, beats:[
  {vo:"What does the ECU in your car actually control?"},
  {vo:"How much fuel goes in, and when the spark fires.", answer:1, show:"Fuel and spark timing"},
  {vo:"So what really changes when you tune it?", show:"What changes when you tune it? 🤔", strong:true}, L(12) ]},
{ id:"w13", lang:"en", tag:T, sim:"race", theme2:"red", part:[13,"Racing and Performance Measurement"], hero:{kind:"versus", a:"0–100", b:"Quarter mile"}, beats:[
  {vo:"Zero to one hundred, or the quarter mile?"},
  {vo:"Zero to one hundred shows the launch.", side:0, show:"0–100: the launch"},
  {vo:"The quarter mile shows the whole run.", side:1, show:"Quarter mile: the whole run"},
  {vo:"So how do you measure it the right way?", show:"How do you measure it right? 🤔", strong:true}, L(13) ]},
{ id:"w14", lang:"en", tag:T, sim:"sand", theme2:"dark", part:[14,"Maintenance and Care"], hero:{kind:"text", text:"Oil change every 5,000 km?", opts:["Always","Check your manual"]}, beats:[
  {vo:"Should you change your oil every five thousand kilometers?"},
  {vo:"Not always. Your manual and your oil type decide.", answer:1, show:"Your manual and oil type decide"},
  {vo:"So what does five W thirty actually mean?", show:"So what does 5W-30 mean? 🤔", strong:true}, L(14) ]},
];
if (typeof module !== "undefined") module.exports = V11;
