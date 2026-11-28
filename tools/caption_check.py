#!/usr/bin/env python3
"""Check a caption against RULES.md before scheduling. Usage: python3 tools/caption_check.py "caption text"
Exit 1 and print the problems if anything breaks the owner's rules."""
import re, sys
t = " ".join(sys.argv[1:])
P = [
    (r"كفر", "«كفر» is banned → الإطار / الإطارات"),
    (r"ريال|SAR|ر\.س|﷼", "no price in captions"),
    (r"بطاق", "don't promote the workshop cards"),
    (r"(^|\s)لين(\s|$)", "write «إلى», not «لين»"),
    (r"دي\.? ?أوتو|DE\.AUTO|AUTO\.DE", "write «دي اوتو» / «DE AUTO» (no dot, no hamza)"),
    (r"[٠-٩]", "Western digits only"),
    (r"إل إس دي|\bLSD\b", "risky term"),
]
bad = [m for p, m in P if re.search(p, t)]
if bad: print("CAPTION BREAKS RULES.md:\n  " + "\n  ".join(bad)); sys.exit(1)
print("OK")
