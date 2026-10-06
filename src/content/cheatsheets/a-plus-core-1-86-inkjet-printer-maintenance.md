---
title: "A+ Core 1 3.8: Inkjet Printer Maintenance"
description: "A+ Core 1 3.8 — cleaning inkjet print heads, replacing CMYK cartridges, calibration, and clearing paper jams."
tags: ["a-plus", "comptia", "messer", "hardware", "inkjet-printer", "print-head-cleaning", "cmyk", "calibration", "paper-jam"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "Inkjet Printer Maintenance"
moduleOrder: 86
unit: 3
---

> **In one line:** keep an inkjet healthy by cleaning the print head (streaks = dirty head), swapping and recycling CMYK cartridges, calibrating to align colours, and clearing jams completely without leaving scraps.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.8.* The full version is the Inkjet Printer Maintenance class notes; the section overview is the Section 3 sheet. See the Inkjet Printers lesson for how inkjets work.

## Maintenance tasks

| Task | Key points |
| --- | --- |
| Head cleaning | **Streaks** = excess/dried ink. **Auto-clean** ~every 24h; **manual** clean too; heavy use = more often; careful **hand-clean** as last resort (delicate). Cycles **use ink** |
| Cartridges | **CMYK** (Key = black); **combined**, **mixed** (CMY + black separate), or **fully separate** (most modular). Pop out/in in seconds; **recycle** the plastic |
| Calibration | After a new cartridge (or anytime) to **align colours**; prints a **calibration page** with marks; auto + optional manual tweaks |
| Paper jams | Open cover, pull the **whole** sheet (feed direction; don't force the carriage); **check no fragments remain**; retry |

## Fix order for streaky/misaligned output

```
Streaks/gaps -> auto head-clean -> repeat/manual clean
             -> careful hand-clean (last resort)
Colours misaligned -> run calibration (test page + alignment marks)
```

## 🔐 Security notes

- **Maintenance = availability:** clogged heads, jams or a full **waste-ink pad** are downtime — keep the shared device usable.
- **Network inkjets** run cleaning/calibration/config through the same **admin interface** an attacker targets — patch firmware, change defaults, segment (as in 3.7). USB-only units carry little risk.
- **Spent cartridges are e-waste, not data** — recycle them; but vendor firmware rejecting third-party ink can still cause downtime.

## Practice drills

<details>
<summary>1. Biggest inkjet maintenance problem, and its telltale symptom?</summary>

Keeping the print head clean; streaks of colour across the page mean a dirty head.
</details>

<details>
<summary>2. How often is the auto head-clean, and what does it remove?</summary>

Roughly every 24 hours; it wipes off excess or dried ink.
</details>

<details>
<summary>3. Three ways CMYK cartridges are arranged?</summary>

Combined (all in one), mixed (CMY combined + black separate), or fully separate per colour.
</details>

<details>
<summary>4. Why recycle ink cartridges?</summary>

They're largely plastic — recycling reduces waste (many makers run return programmes).
</details>

<details>
<summary>5. When do you calibrate, and what does it do?</summary>

After a new cartridge or any time colours drift — it aligns the colours (prints a marked calibration page).
</details>

<details>
<summary>6. Correct way to clear a jam?</summary>

Open the printer and pull the whole sheet out carefully (feed direction, don't force the carriage), then check no fragments remain.
</details>

<details>
<summary>7. New tri-colour cartridge, colours slightly off — fix?</summary>

Run a calibration to realign the colours.
</details>

## Key takeaways

- **Streaks = dirty head:** auto-clean (~24h) → manual → careful hand-clean; cycles use ink.
- **CMYK cartridges** (combined/mixed/separate) pop out fast — **recycle** them.
- **Calibrate** to align colours (new cartridge or drift); it prints a marked test page.
- **Jams:** remove the **whole** sheet carefully; **check for scraps** before retrying.
- **Security:** thin surface — mainly availability, plus the networked-printer admin interface (as in 3.7).
