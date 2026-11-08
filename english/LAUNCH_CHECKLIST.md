# English launch: what is blocked and the exact order (CEO, 2026-11-08)

Blocker verified: Salla refuses any English edit while the language is disabled
("language 'en' ... currently disabled ... cannot be edited"). Only Abdullah can enable it (Settings > Languages).

Design decision (CEO): the PDF file on a Salla product is ONE file shared by all languages.
So translating the Arabic products would sell Arabic PDFs to English visitors. Therefore:
- Books: create separate English-edition products (hidden until ready), with the English PDFs from english/books/.
- Pilot first: Part 1 (13 pages) + its Made Easier. Add the rest after the first real visit/order signal.
- Checklist, game, logbook, workshop cards: NOT in the English launch (no English files exist yet; cards slang needs a new English set).

Order once English is enabled (CEO applies all of it in one run):
1. products_create (digital, hidden): "DE.AUTO — Part 1: How a Car Works (English Edition)", Arabic name carries "(النسخة الإنجليزية)".
2. products_update_propose language=en: name, description, SEO from EN_STORE_PACK.md.
3. Abdullah uploads english/books/Chapter 01 PDFs as the product file (MCP cannot upload files).
4. Homepage English section names (EN_STORE_PACK.md "Homepage / sections").
5. Unhide, then post English clips pointing to the link.
Price: same 29 SAR unless Abdullah says otherwise (price is shared across languages).
