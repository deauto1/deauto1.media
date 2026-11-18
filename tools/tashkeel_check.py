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
for w in re.findall(f"[{LET}{H}ـ]+", txt):
    letters = re.findall(f"[{LET}]", w)
    if len(letters) < 2: continue
    # a letter is covered if it is followed by a mark, or it is a long vowel / hamza carrier / final letter
    core = [c for i, c in enumerate(re.findall(f"[{LET}][{H}]*", w)) if c[0] not in LONG and i < len(letters) - 1]
    unmarked = [c for c in core if len(c) == 1]
    if unmarked: bad.append(w)
if bad:
    print("UNVOWELED:", " | ".join(dict.fromkeys(bad))); sys.exit(1)
print("OK: fully voweled")
