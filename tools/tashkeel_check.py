#!/usr/bin/env python3
"""Check every Arabic voiceover script before generation: each Arabic word must be fully voweled.
Usage: python3 tools/tashkeel_check.py "النص"   or   python3 tools/tashkeel_check.py file.txt
Exit 1 if any word is under-voweled (the script is not allowed to go to ElevenLabs)."""
import re, sys, os
H = "ً-ْٰ"            # harakat + shadda + sukun + dagger alif
LET = "ء-غف-يٱ-ۓ"
LONG = set("اويىآءأإؤئة")             # letters that often need no mark
txt = open(sys.argv[1]).read() if os.path.isfile(sys.argv[1]) else " ".join(sys.argv[1:])
bad = []
# ⛔ Owner rule 2026-11-28: «كفر» in any form is banned in voiceovers. Even voweled, the voice can say «كُفر» (disbelief).
# Use الإطار / الإطارات instead.
_plain = re.sub(f"[{H}ـ]", "", txt)
# Owner rule 2026-11-28: no word the voice could misread. Each entry is pattern → plain replacement.
RISKY = {
    "كفر": "الإطار / الإطارات",                      # read as كُفر
    "إل إس دي|ال اس دي|LSD": "الدفرنس المقفول",      # drug association
    "[A-Za-z]{2,}": "write it in Arabic letters, or show it on screen only",  # the voice reads English oddly
    "[0-9]": "write the number out in Arabic words",
}
hits = [f"«{m.group(0)}» → {rep}" for pat, rep in RISKY.items() for m in [re.search(pat, _plain)] if m]
if hits:
    print("RISKY WORDS (the voice may misread them):\n  " + "\n  ".join(hits)); sys.exit(2)
for w in re.findall(f"[{LET}{H}ـ]+", txt):
    letters = re.findall(f"[{LET}]", w)
    if len(letters) < 2: continue
    # a letter is covered if it is followed by a mark, or it is a long vowel / hamza carrier / final letter
    units = re.findall(f"[{LET}][{H}]*", w)
    # skip the lam of the definite article (silent before sun letters), incl. after و/ب/ف/ل prefixes
    core = [c for i, c in enumerate(units) if c[0] not in LONG and i < len(units) - 1
            and not (c[0] == "ل" and i >= 1 and units[i-1][0] == "ا" and i <= 2)]
    unmarked = [c for c in core if len(c) == 1]
    if unmarked: bad.append(w)
if bad:
    print("UNVOWELED:", " | ".join(dict.fromkeys(bad))); sys.exit(1)
print("OK: fully voweled")
