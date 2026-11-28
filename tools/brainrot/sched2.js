const H = process.argv[2];
const OFFER = "بطاقات مصطلحات الورش من دي اوتو بـ 10 ريال، الرابط في البايو 🔗", TAGS = "#DEAUTO #دي_اوتو #سيارات #ورشة";
const C = {
  e1: ["تيربو ولا سحب طبيعي؟ ⚔️", "اكتب فريقك 👇"], e2: ["سيدان ولا جيب؟ ⚔️", "اكتب فريقك 👇"], e3: ["بنزين ولا كهرب؟ ⚔️", "اكتب فريقك 👇"],
  e4: ["جاوب قبل 3 ⏱️ لمبة البطارية ولّعت وأنت ماشي… المشكلة وين؟", "جاوبت صح؟ 👇"], e5: ["جاوب قبل 3 ⏱️ الـ ABS وش فايدته الأساسية؟", "جاوبت صح؟ 👇"],
  e6: ["35 PSI… وش تعني؟ 🤔", "كم ضغط إطاراتك؟ 👇"], e7: ["AWD و 4WD… مو نفس الشي 👀", "سيارتك أي واحد؟ 👇"], e8: ["زر ECO… وش يسوي فعلًا؟ 🤔", "تستخدمه ولا عمرك ما ضغطته؟ 👇"],
  e9: ["السهم الصغير جنب علامة المضخة… وش فايدته؟ ⛽", "كنت تعرفها؟ 👇"], e10: ["الفني قال: «الرديتر مسكّر»… وهزّيت راسك؟ 😅", "ارتفعت حرارة سيارتك قبل؟ 👇"],
  e11: ["الفني قال: «الكمبروسر خربان»… وهزّيت راسك؟ 😅", "مكيفك يبرّد زين؟ 👇"], e12: ["الفني قال: «طرمبة البنزين ضعيفة»… وهزّيت راسك؟ 😅", "كم مرة هزّيت راسك عند الفني؟ 😂👇"],
  e13: ["صاحبك يقول: بنزين 95 يخلي أي سيارة أقوى 🤨", "منشن صاحبك اللي يعبّي 95 على الفاضي 😂👇"], e14: ["صاحبك يقول: الإطار العريض دايم أحسن 🤨", "صح ولا خطأ؟ 👇"],
  e15: ["صاحبك يقول: فصّل البطارية وتنحل المشكلة 🤨", "جرّبتها قبل؟ 👇"] };
const days = { "2026-11-17": [[9, "e1", 1], [11, "e6", 1], [13, "e10"], [15, "e13", 1], [17, "e4", 1], [19, "e2", 1], [20, "e7", 1], [21, "e14", 1], [22, "e11"], [23, "e5"]],
  "2026-11-18": [[9, "e3", 1], [11, "e8", 1], [13, "e12", 1], [15, "e9", 1], [17, "e15", 1]] };
for (const [d, list] of Object.entries(days)) for (const [h, id, tt] of list) { const hh = String(h).padStart(2, "0"), [hook, q] = C[id];
  const info = { autoPublish: true, descendants: [], draft: false, firstCommentText: "", hasNotReadNotes: false, media: [`https://raw.githubusercontent.com/deauto1/deauto1.media/${H}/vo/DEAUTO_br_${id}.mp4`], mediaAltText: [],
    providers: [{ network: "instagram" }, { network: "threads" }].concat(tt ? [{ network: "tiktok" }] : []), publicationDate: { dateTime: `${d}T${hh}:00:00`, timezone: "Asia/Riyadh" }, shortener: false, smartLinkData: { ids: [] },
    text: `${hook}\n${OFFER}\n${q}\n${TAGS}`, instagramData: { type: "REEL", showReelOnFeed: true }, threadsData: {} };
  if (tt) info.tiktokData = { privacyOption: "PUBLIC_TO_EVERYONE", title: hook, commercialContentOwnBrand: false, commercialContentThirdParty: false, autoAddMusic: false };
  console.log(`${d}T${hh}:00:00+03:00|${JSON.stringify(info)}`); }
