---
title: "A+ Core 1 3.8: Inkjet Printer Maintenance — Class Notes"
description: "Full class notes for A+ Core 1 3.8: cleaning inkjet print heads, replacing CMYK cartridges, calibration, and clearing paper jams."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "inkjet-printer", "print-head-cleaning", "cmyk", "calibration", "paper-jam"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 3.8**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is the
> maintenance companion to the Inkjet printers lesson (also 3.8) — see that
> lesson for how inkjets work and for the print-head arrangements; here we focus
> on keeping one running: head cleaning, cartridge replacement, calibration and
> jams.

## Learning objectives

By the end of these notes you should be able to:

1. Keep an inkjet print head clean and recognise a dirty-head symptom.
2. Replace CMYK ink cartridges and dispose of them responsibly.
3. Calibrate an inkjet and explain when it is needed.
4. Clear a paper jam without leaving debris behind.

## 1. Keeping the print head clean

The **biggest** ongoing problem on an inkjet is keeping the **print head clean**.
The exact process varies between printers, so **check the manufacturer's** best
practice for your model — but the common tools are these:

- **Automated cleaning.** Many inkjets run an automatic cleaning process **around
  every 24 hours**, wiping off **excess or dried ink** to keep the head working
  properly.
- **The symptom of a dirty head.** If you see **streaks of colour** across the
  page, it is usually **excess ink still on the print head**.
- **Manual cleaning.** Most inkjets let you **start the cleaning process by
  hand**. A printer used heavily during the day may need cleaning **more often
  than every 24 hours**.
- **Careful hand-cleaning.** If you are very careful, you can **remove the print
  head (or the whole cartridge)** and clean the head off by hand — but the head
  is delicate, so this is a last resort.

```
Streaks or misaligned colour on an inkjet:

  Streaks / gaps?          -> run the automated head-clean cycle
        | still bad
        v
  Run it again / clean manually  (heavy users: more than daily)
        | still bad
        v
  Carefully remove + hand-clean the head   (last resort; delicate)
        |
        v
  Colours misaligned?      -> run calibration (prints a test page
                              with alignment marks; auto + tweaks)
```

> **Note (beyond this lesson):** cleaning cycles **use ink** — the flushed ink
> goes to a **waste-ink pad/absorber** inside the printer, which on some models
> can eventually fill and report a service/end-of-life condition. Run a **nozzle
> check** first to see which nozzles are actually clogged, so you clean only when
> needed rather than wasting ink.

## 2. Replacing ink cartridges

Inkjet cartridges hold the **CMYK** colours — **C**yan, **M**agenta, **Y**ellow
and **K**ey (**black**). They come in a few arrangements:

- **Combined** — all colours in one cartridge.
- **A mix** — for example, **cyan, magenta and yellow combined** in one cartridge
  with **black separate**.
- **Fully separate** — an individual cartridge per colour, which is the most
  **modular** to replace (you swap only the colour that has run out).

Replacement is **quick and easy**: the cartridge **pops out** of its holder and a
new one drops in within seconds. Because the cartridges are largely **plastic**,
it is good practice to **recycle** them.

> **In the real world:** fully separate CMYK cartridges save money and waste over
> a combined tri-colour cartridge — with a combined cartridge, running out of one
> colour means replacing all three. Many manufacturers also run **cartridge
> recycling/return programmes**.

## 3. Calibration

After fitting a **new cartridge**, the printer normally runs a **calibration**
that takes a few minutes to make sure all the colours **line up properly** on the
output. But calibration is not only for new cartridges — you may need to
calibrate at other times too, to keep the colours aligned across all the
individual cartridges.

Calibration is usually **automated**, though **small manual adjustments** can make
the output a little **crisper**. The printer prints a **calibration page** carrying
the CMYK colours and a set of **alignment marks** you (or the printer) use to line
everything up precisely.

## 4. Clearing paper jams

A lot of paper passes through an inkjet, and occasionally a sheet **catches on the
mechanism** and jams. How easy it is to clear depends on the design:

- Many inkjets give **generous access** to the whole paper path — open the cover
  and lift the sheet out easily.
- Others have a **more complex path**, so remove the paper **carefully**, pulling
  the **entire page** out **without ripping** off little pieces that could stay
  behind.

Whichever it is, once the paper is out, **check it** to be sure you have not left
any **fragments** inside the paper path, then try the print again.

> **Note (beyond this lesson):** pull a jammed sheet slowly **in the direction the
> paper normally travels** where you can, and **do not force the print-head
> carriage** out of the way — yanking against the rollers or the carriage risks
> tearing the page or damaging the mechanism. Leftover scraps are a common cause
> of **repeat jams** and paper-path sensor errors.

### 4.1 Worked example — streaky colour output

A user reports coloured streaks across every page.

1. **Recognise the symptom:** streaks usually mean **excess/dried ink on the
   print head**, not empty cartridges.
2. **Run the automated head-cleaning** cycle; print a test page.
3. If it persists, **run the clean again** (or the manual clean) — a heavy-use
   printer may need cleaning more than once a day.
4. As a last resort, and only if careful, **remove the head/cartridge and
   hand-clean** the delicate head.
5. If colours are also **misaligned**, run **calibration** and use the alignment
   marks on the test page.

The order is cheapest-first: automated clean, repeat/manual clean, then careful
hand-cleaning and calibration.

## 5. Security perspective

Inkjet maintenance is a **physical, consumables** task, so its direct security
surface is genuinely small — most of the care here is about delicate heads and
not leaving paper scraps behind, not about attackers. The honest, specific points
are:

- **Maintenance is availability.** A clogged head, a jam, or a full waste-ink pad
  is **downtime** for whatever the printer supports, and availability is a
  security property. Routine head cleaning and prompt, complete jam clearing keep
  a shared device usable — the same reasoning as page-counter maintenance on a
  laser printer.
- **The printer's admin/maintenance surface still applies.** If this inkjet is
  network-connected (many all-in-ones are), the cleaning, calibration and
  configuration functions run through the same **admin interface** an attacker
  would target — so the Multifunction devices guidance holds: patch firmware,
  change default credentials, and keep it off the flat user network. A simple
  USB-only inkjet carries very little of this.
- **Consumables are supply chain, not data.** Spent cartridges are **e-waste**
  to recycle rather than a data-leak risk (unlike an MFD's internal drive), but
  vendor **firmware that rejects third-party/refilled cartridges** can still take
  a printer out of service — an availability and supply-chain consideration.

## Summary

- The **print head** is the main maintenance point: an **auto-clean** (often
  ~every 24h) and a **manual** clean remove excess/dried ink; **streaks** = dirty
  head; heavy use needs more frequent cleaning; careful **hand-cleaning** is a
  last resort.
- **Cartridges** are **CMYK** (Key = black), **combined**, **mixed** (CMY + black)
  or **fully separate**; they **pop out/in** in seconds and should be **recycled**.
- **Calibration** aligns the colours — run after a new cartridge (a few minutes)
  or any time output drifts; usually **automatic** with optional **manual**
  tweaks; it prints a **calibration page** with alignment marks.
- **Jams:** open the printer, pull the **whole** sheet out carefully (in the feed
  direction; don't force the carriage), and **check no fragments remain** before
  retrying.

## Glossary

| Term | Meaning |
| --- | --- |
| Print head | The delicate component that sprays the ink. |
| Head cleaning | Auto or manual cycle that clears excess/dried ink. |
| Streaks | Coloured lines caused by a dirty print head. |
| Nozzle check | A test print showing which nozzles are clogged (beyond this lesson). |
| Waste-ink pad | Absorber that catches ink used by cleaning (beyond this lesson). |
| CMYK | Cyan, Magenta, Yellow, Key (black) — the ink colours. |
| Combined cartridge | One cartridge holding multiple colours. |
| Separate cartridges | One cartridge per colour (most modular). |
| Calibration | Aligning the colours; prints a marked test page. |
| Calibration page | The printed sheet with colours and alignment marks. |
| Paper path | The route paper takes through the printer. |
| Paper jam | Paper caught on the printer's mechanism. |
| Carriage | The moving mount holding the print head (beyond this lesson). |
| Recycle | Responsible disposal of the plastic cartridges. |

## Review questions

1. What is the biggest ongoing maintenance problem on an inkjet printer?
2. How often do many inkjets run an automated head-cleaning cycle, and what does
   it remove?
3. What symptom usually indicates a dirty print head?
4. What can a heavy-use printer need, and what is the last-resort cleaning
   option?
5. What do the letters CMYK stand for?
6. Give three ways CMYK cartridges can be arranged.
7. Why is it good practice to recycle ink cartridges?
8. When does an inkjet calibrate, and what does calibration achieve?
9. What is printed during calibration, and what is on it?
10. Describe the correct way to clear a paper jam.
11. What must you check after removing jammed paper, and why?
12. Scenario: every page has coloured streaks. Walk through your fix in order.
13. Scenario: after a new tri-colour cartridge, colours look slightly off. What
    step likely fixes it?

## Answer key

1. **Keeping the print head clean.** Inkjet ink clogs and dries easily.
2. **Roughly every 24 hours; it wipes off excess or dried ink.** Automatic upkeep.
3. **Streaks of colour across the page.** Excess ink on the head.
4. **Cleaning more often than every 24 hours; carefully removing and hand-cleaning
   the head as a last resort.** Frequency plus manual care.
5. **Cyan, Magenta, Yellow, Key (black).** The four ink colours.
6. **Combined (all in one), mixed (CMY combined + black separate), or fully
   separate per colour.** Model-dependent packaging.
7. **They are largely plastic, so recycling reduces waste (many makers run return
   programmes).** Environmental good practice.
8. **After a new cartridge (a few minutes) or any time colours drift; it aligns
   the colours across the cartridges.** Colour registration.
9. **A calibration page with the CMYK colours and alignment marks.** Used to line
   the colours up.
10. **Open the printer, pull the whole sheet out carefully (in the feed direction,
    without forcing the carriage), avoiding tearing.** Remove it intact.
11. **Check no fragments were left in the paper path, because leftover scraps cause
    repeat jams/sensor errors.** Debris re-jams the printer.
12. **Recognise streaks as a dirty head, run the auto-clean, repeat/manual clean,
    then careful hand-cleaning, and calibrate if colours are misaligned.**
    Cheapest fix first.
13. **Run a calibration to realign the colours.** Registration adjustment.
