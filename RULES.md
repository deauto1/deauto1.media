# قواعد عبدالله لـ دي اوتو (DE AUTO)

Every agent and every scheduled task reads this file **before doing anything**, and checks every caption, video and voice against it before posting. These are the owner's rules from day one (Oct 2026) to 28 Nov 2026, de-duplicated. The newest wording wins where two conflict. A violation is not acceptable («أي غلط ثاني غير مقبول»).

## ⛔ 1. Never (the mistakes that already embarrassed the brand)
1. **The word «كفر» in any form** (كفر، الكفر، كفرك، كفرات، كفراتك…). The voice reads it «كُفر». Use **الإطار / الإطارات / إطار سيارتك (Tire)**. `tools/tashkeel_check.py` blocks it.
2. **Any word the voice could misread** or that has a second, bad meaning. Swap it for a plain synonym. No English acronyms or digits in the voice script: spell them in Arabic, or show them on screen only. «إل إس دي» is banned (drug meaning).
3. **Promoting the 10 SAR workshop cards** («بطاقات مصطلحات الورش») or **any price in captions, titles or first comments**. It cheapens the brand. A price may appear on screen inside a video only.
4. **«لين»** in offers and dates. Write «إلى».
5. **His private data** in any public content: name, phone number, OTP, coupon codes, order number. Blur or cut it.
6. **His real voice**, and the voice «Abdullah - Natural». Approved voices only: **Mansour** (preferred) and **Fahad**. Bandar is rejected (sounds AI).
7. **Any ElevenLabs generation without asking him first**, including test samples. Say how many credits are left after each batch.
8. **Paid ads.** Never propose them.
9. **Contacting anyone first**: no creators, influencers, B2B, workshops, clubs or affiliates. **Never his personal circle.**
10. **Real car brands or models** in content. Don't badmouth workshops.
11. **Music.** Voice and non-musical sound effects only. TikTok: `autoAddMusic:false`, commercial content off.
12. **Screen recordings of checkout, payment or login on TikTok.** TikTok removed one (first warning, 25 Nov).
13. **A blank or white first frame.** Frame 0 = the hook, with real content.
14. **3D CGI renders** (gears and parts). He finds them gloomy and ugly.
15. **Founder or personal story** in brand content. Never the private meaning of the logo's two lines.
16. **Showing the 14-part bundle** in the store.
17. **The same brain-rot visual in every clip** (e.g. a circle and a ball). Vary the technique.
18. **Silent or text-only clips** for the new content model. They need a voiceover, but only with credits he approved.
19. **Fake numbers.** Report honestly and don't polish.

## 2. Brand
- Name: **«دي اوتو»** with no dot and no hamza in Arabic, **«DE AUTO»** with no dot in English. Mention it in everything.
- Slogan: **«ما نعلمك، إحنا نفهمك»**.
- Framing: **ترفيهي فقط** (entertainment only, not educational or scientific).
- Look: black, white and gray with one red accent **#e5322d**. Cairo for Arabic, Bebas Neue for English. The real logo file, never redrawn. He prefers the **premium white background**. The store theme is dark.
- Tone: light, white Saudi dialect. «غيّر لي الزيت», never «الدهن».
- **Western digits** (1 2 3). Part numbers have no leading zero (Part 7, not 07).
- Car terms: Arabic **with the English term beside it**, e.g. «محوّل العزم (Torque Converter)».
- Campaigns about women (e.g. Pink October): gentle and general, never instructing women.
- Copy persuades without sounding cheap or salesy.

## 3. Voice and video
- Every Arabic voice script is **fully diacritized** word by word, then passes `python3 tools/tashkeel_check.py`. Exit 0, or it doesn't go to ElevenLabs.
- Clean voice: no hum or noise. It must not sound obviously AI.
- Keep the existing DE AUTO templates. No cartoon mascot.
- Brain-rot: give half the information so they buy the part for the rest. Repeat what gets the most views.
- Content mix (21 Nov): **at least 2 pure brand videos a day** about DE AUTO itself (told with passion, no founder). Everything else blends the formats that win the audience with the brand. Since 24 Nov, new clips also explain **who DE AUTO is**.
- The pinned «كيف تشتري» explainer runs **twice a day, morning and 19:00**, on **IG + Threads only** (not TikTok).
- English clips run alongside Arabic («نلعب على الحبلين»).

## 4. Store and products (Salla)
- 14 parts, Arabic and English, sold **one by one at 36 SAR**. Part 1 has a launch price of **19 SAR until 30 Nov**, then back to 36.
- Each part has a «Made Easier» companion. Customers can download the PDFs and are asked not to share them.
- Free: the «قبل ما تروح الورشة» checklist and the group game «تحدي الشلة» (free since 25 Nov). The workshop cards are 10 SAR but **are not promoted**.
- Pause challenge coupon **STOP**: 20% on any part (created by him on 28 Nov).
- No VAT, and he has the licence. Don't raise the discount-licence question.
- English store: «DE AUTO» with no dot, and no trailing period in SEO text.
- He uploads files and images to Salla himself.

## 5. How to work with him
- **Don't ask about small things.** Marketing decides cadence, timing, formats and platforms itself and just reports.
- Post without sending clips for approval; tell him what went out.
- For a big new creative campaign: pitch 3 ideas (2 lines each) with a recommendation first.
- Remind him of every national or awareness occasion so DE AUTO joins it.
- Comment replies: short and simple (e.g. «ابشر»). Don't tell people to buy. If a reply mentions a part, give the part number (check it in the repo).
- The goal is **paid sales** («ابي فلوس»). Resources are very limited, and he can't renew subscriptions without sales (28 Nov).
- Read BOARD.md for history. **This file overrides anything older.**

## 6. Before you schedule ANY post: checklist
1. Caption has no «كفر», «ريال», «بطاقات», «لين», price or digit-price. «دي اوتو» has no dot.
2. The video's source text (tools/**/data*.js) and voice have no «كفر» or risky words. The clip is not on the do-not-repost list in BOARD.md.
3. Frame 0 is the hook, there's no music, and no private data shows.
4. TikTok: no checkout or login screen, commercial content off, autoAddMusic off, a title is set.
5. Any part number you mention matches the repo (e.g. brakes = Part 9, tires = Part 10, gearbox = Part 5).
