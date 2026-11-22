# قواعد الخوارزميات لمحتوى دي اوتو (16 نوفمبر 2026)

## أرقامنا (1–15 نوفمبر، من ميتريكول)
- تيك توك: 170 مقطع، 38,045 مشاهدة، 6 تعليقات، 16 مشاركة. متوسط المشاهدة 2–3 ثواني من 13. نسبة إكمال المقطع أقل من 0.1%. متوسط المشاهدات للمقطع نزل من 310 (1 نوفمبر) إلى 137 (15 نوفمبر). أعلى مقطع 683.
- إنستغرام: 229 ريل، 35,250 مشاهدة، تعليقين، 38 مشاركة، 67 حفظ. الوسيط 125 مشاهدة. 6 مقاطع فقط فوق 1,000.
- المقاطع الستة اللي طلعت: نسبة التخطي في أول 3 ثواني 34–42% (الباقي 62%)، أو مشاركات عالية («5W-30»: 28 مشاركة و10 حفظ).
- التعفن الدماغي (15 نوفمبر): التخطي في إنستغرام نزل من 62% إلى 51%، ومتوسط المشاهدة في تيك توك طلع من 1.8 إلى 3.4 ثانية.

## وش تبي المنصات
- إنستغرام (آدم موسيري): أهم 3 إشارات وقت المشاهدة، اللايكات، والإرسال. الإرسال هو الأهم للوصول لغير المتابعين. ما يُرشَّح: محتوى مكرر أو معاد، شعارات تطبيقات ثانية، واستجداء التفاعل. نشر كذا مقطع ورا بعض ممكن يخفي بعضها.
- تيك توك (رسمي): إكمال المقطع ووقت المشاهدة أقوى إشارة. المكرر ما يدخل «لك». غير رسمي: كل مقطع ينعرض على مجموعة تجربة، وإذا ما عدّى الحد يوقف.

## القواعد
1. أول ثانيتين: سؤال أو تحدي على الشاشة من أول فريم، بدون مقدمة.
2. الطول: 7–10 ثواني للمقاطع السريعة عشان نسبة الإكمال تطلع. القصص 15–18.
3. كل مقطع له سبب يُرسل: «أرسلها للي...» أو معلومة مرجعية تنحفظ.
4. ولا موضوع يتكرر خلال 14 يوم، ولا مقطع يعاد.
5. أكثر شكل يتكرر: «X ولا Y ⚔️»، وبعده السؤال بثلاث خيارات.
6. القياس كل 3 أيام: التخطي تحت 45% في إنستغرام، ومتوسط المشاهدة فوق 5 ثواني في تيك توك.

المصادر: buffer.com/resources/instagram-algorithms ، socialpilot.co/blog/tiktok-algorithm

## Pronunciation rule (2026-11-18, after a TikTok comment)
The TTS read «الكفر» (tire) as «الكُفر». Never write «كفر/الكفر/كفرك/كفره» bare in a VO prompt.
Use a different word («التاير»، «الإطار») or write it fully voweled: «الكَفَر»، «كَفَرك»، «الكَفَرات».
Before any VO generation, grep the script for كفر.

## Full tashkeel rule (owner's order, 2026-11-18)
Every Arabic voiceover script is written fully voweled, every word, before it goes to ElevenLabs. Not just «الكفر».
- Write the dialect the way it is said: «وَشْ»، «يْصِيرْ»، «سَيَّارْتَكْ»، «الْكَفَرْ».
- Before every generation run `python3 tools/tashkeel_check.py "<script>"`. If it prints UNVOWELED, nothing gets generated until it is fixed.
- On-screen text and captions stay without tashkeel. The rule is for the voice only.
- Before scheduling a voiced clip, check the transcript or listen to the clip.

## Content mix (owner's order, 2026-11-21)
- Every day: at least 2 PURE brand films (what or who DE AUTO is, what you get, who it's for, gift, discount). Redesigned hook-first: a question or conflict in frame 1, never the logo first.
- Every other clip is a HYBRID: a winning format (⚔️ X vs Y, «اختار», «الفني قال», «صاحبك يقول», «جاوب قبل 3», safety) used as the vehicle, with the brand woven in:
  - mid-clip line «في دي اوتو نفهّمك…»
  - DE AUTO card/look throughout
  - ending signature «دي اوتو، ما نعلمك إحنا نفهمك» + part number
- Target skip rate under 40%. Check daily at 11:00 and adjust.

## Sound rule (owner, 2026-11-22)
No synthesized SFX on brand films. The whoosh/tick noise sounded like a hair clipper. Voice only.
