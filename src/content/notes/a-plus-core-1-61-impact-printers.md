---
title: "A+ Core 1 3.8: Impact Printers — Class Notes"
description: "Full class notes for A+ Core 1 3.8: dot-matrix print heads, ribbons, tractor-feed paper, and multi-part carbonless copies."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "impact-printer", "dot-matrix", "tractor-feed", "multipart-paper"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 3.8**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> further lesson under objective **3.8**, alongside laser, inkjet and thermal —
> impact printers are the fourth and oldest printing technology in this set.

## Learning objectives

By the end of these notes you should be able to:

1. Explain how an impact (dot-matrix) printer creates output.
2. Describe the print head, its pin matrix, and the ribbon.
3. Explain tractor-feed paper and why alignment matters.
4. Describe multi-part paper and how it produces copies.
5. State why impact printers persist in only niche use today.

## 1. What an impact printer is

An **impact printer** creates output by **physically pressing** a print head
against the page. The most common type is the **dot-matrix printer**, named for
how it forms characters: a small **matrix of pins** in the print head presses
against a **ribbon**, and the ribbon's ink transfers to the paper beneath.

Look closely at dot-matrix output and you can see it is built from **many tiny
dots** — one for each pin position the head fired at that spot.

## 2. Strengths and weaknesses

Because the print head physically strikes the page, an impact printer is
uniquely suited to one job: **carbon copies**. Pressing hard enough on the top
sheet marks the sheets **behind** it too, producing several copies from a single
pass. Impact printing is also **cheap per page**, which matters for
high-volume printing.

The trade-offs are real:

- **Noisy.** The mechanical striking makes these printers loud — a poor fit for
  a quiet office or a library.
- **Low resolution.** Built from a coarse grid of dots, the output looks rough
  next to a laser or inkjet page.

These weaknesses are why dot-matrix printers have **largely disappeared** from
homes and offices, surviving only in **niche cases** where a different printer
simply cannot do the specific job as well — carbon-copy forms being the classic
example.

## 3. The print head and ribbon

The print head **moves back and forth** across the page. Its business end holds
the **small pins**, which push into the **ribbon** — where the ink lives —
transferring ink to the paper sitting behind the ribbon.

The head itself is physically **small**, but carries a noticeably **large heat
sink** on the back, because repeatedly firing pins makes the head run **warm**.
It contains a **single print matrix**, so covering a whole page means the head
must sweep **back and forth** across each line, while the **page advances** to
bring the next line under the head.

```
Dot-matrix printing:

   print head (pin matrix) <---- moves back and forth ---->
        |
        v  pins strike
   +---------+
   | ribbon  |  <- ink lives here
   +---------+
   | paper   |  <- ink transfers here; page advances line by line
   +---------+
```

### 3.1 The ribbon

The **ribbon** is usually a single **cartridge** that fits inside the printer,
stretching the **full width of the page** so the travelling print head always has
ribbon in front of it. It is one **continuous, unending loop**: the ribbon cycles
through the cartridge case, comes back out the other side, and keeps circulating
until the whole cartridge is **replaced**.

Replacing a ribbon cartridge is quick — it **pops out**, a new one **pops in**,
and the swap takes only a **few seconds**. Ribbon **size varies by make and
model**, so always fit the ribbon designed for your specific printer.

## 4. Tractor-feed paper

Alongside the moving ribbon, most dot-matrix printers use a **tractor feed** to
pull paper through. The paper has **holes down the left and right edges** that
engage **tractor feed** sprockets connected to the printer, which pull the page
through past the print head.

Those holes must **line up perfectly on both sides**, or the page will not feed
straight — **miss a hole**, or misalign the paper going in, and you are likely to
get a **paper jam**.

This paper is commonly called **tractor paper**, for its tractor-feed holes. It
may be a single **continuous** roll, or **perforated** into standard-size pages.
Many tractor-feed sheets are also perforated **down each edge**, so you can tear
off the holed strips after printing and be left with a page that looks like
ordinary paper.

> **Note (beyond this lesson):** you will sometimes hear tractor-feed paper of
> this kind called **fanfold** or **continuous-feed** paper, since it folds up
> accordion-style between pages rather than arriving as loose sheets.

One well-known example is **green bar paper** — wide tractor-feed paper printed
with alternating pale green and white horizontal bars, used with dot-matrix
printers. It was a common way to output **source code**, giving programmers a
printed page that was easier on the eyes to review line by line.

## 5. Multi-part paper

One popular use of an impact printer's physical strike is **multi-part paper**:
a single pass through the printer produces **multiple copies** at once.

The classic method used true **carbon paper** between sheets. A cheaper, easier
alternative uses **micro-encapsulated ink** on the **back** of the top sheet,
paired with a **clay coating** on the **second** sheet that **reacts** with that
ink. The pressure of the print head breaks the tiny ink capsules on the back of
sheet one, and the reaction with the clay on sheet two creates the copy — all
without the print head ever physically touching the second sheet.

> **Caution:** the inks and dyes used in this carbonless process, combined with
> the clay coating, can act as an **irritant** for some people. Extended handling
> of multi-part paper may cause skin irritation in sensitive individuals.

Many organisations have moved away from multi-part impact printing simply
because **printing an extra copy** on a different printer is now **cheaper and
easier** than maintaining a dot-matrix printer's moving parts, ribbons and
special paper — one more reason dot-matrix printers keep fading from general
use.

### 5.1 Worked example — choosing between an impact printer and a normal reprint

An accounts team needs a delivery note with a customer copy and a warehouse copy
produced at the same time, at the point of dispatch.

1. **Consider the impact printer's advantage:** a dot-matrix printer with
   multi-part paper produces both copies **in one pass**, at the moment of
   printing, with no extra step.
2. **Weigh the trade-offs:** noise on the warehouse floor may be acceptable
   (unlike an office), but the printer, ribbon and special paper are all
   maintenance overhead, and resolution is poor for anything beyond plain text.
3. **Compare to the modern alternative:** a laser or inkjet MFD could instead
   print the note once and immediately **reprint** a second copy — cheaper to
   run and maintain, at the cost of a manual second step (or simple driver
   automation) instead of a single physical pass.
4. **Decide by volume and workflow:** for very high volume with a genuine need
   for a physically simultaneous carbon-style copy, the impact printer's niche
   strength still applies; for most modern operations, the reprint approach wins
   on cost and simplicity.

## 6. Security perspective

Impact printers are largely a legacy technology, but where they still appear —
often in industrial, point-of-sale or archival settings — a few points matter:

- **Legacy printers mean legacy connectivity.** A dot-matrix printer surviving in
  a niche role is frequently attached over an old **parallel or serial** interface
  to an equally old workstation, both of which may be **unpatched and
  unsupported**. Where such a device must stay in service, isolate it on its own
  segment rather than letting an old, exposed host sit on the general network.
- **Physical output can be a compliance artefact.** Multi-part carbon-style forms
  (delivery notes, till duplicates, some regulated paperwork) are sometimes kept
  specifically because a **physically simultaneous** copy is harder to
  selectively forge after the fact than two separately printed pages — worth
  understanding if a process still depends on an impact printer for that reason,
  rather than assuming it is only inertia.
- **Consumables and paper stock still need secure disposal.** A used ribbon has
  physically **imprinted every character it ever struck**, in reverse, and can in
  principle be read back — a low-tech but real data remnant. Treat spent ribbons
  from a printer handling sensitive output the same way as printed waste:
  dispose of them securely rather than in ordinary rubbish.

## Summary

- **Impact printers** (typically **dot-matrix**) form characters from a **matrix
  of pins** striking a **ribbon** against the paper — visible as tiny dots.
- **Strengths:** carbon-copy capable, low cost per page. **Weaknesses:** **noisy**,
  **low resolution** — now used only in **niche** cases.
- The **print head** moves back and forth per line, gets **warm** (hence a large
  heat sink), and holds a **single pin matrix**.
- The **ribbon** is one continuous loop in a **replaceable cartridge**, swapped in
  seconds; size varies by **make and model**.
- **Tractor feed:** side holes engage sprockets to pull the paper through;
  **misalignment causes jams**. **Tractor/fanfold paper** may be continuous or
  perforated into pages; **green bar paper** was common for printed source code.
- **Multi-part paper** makes several copies in one pass, traditionally via
  **carbon paper**, now more often **micro-encapsulated ink + clay reaction**,
  which can **irritate skin**; many organisations now just print a separate copy
  instead.

## Glossary

| Term | Meaning |
| --- | --- |
| Impact printer | A printer that physically strikes the page to print. |
| Dot-matrix printer | An impact printer using a matrix of pins. |
| Print head | The moving component holding the pin matrix. |
| Pin matrix | The small grid of pins that strike the ribbon. |
| Ribbon | The continuous, ink-carrying loop the pins strike. |
| Ribbon cartridge | The replaceable case housing the ribbon. |
| Heat sink | Cooling fitted to the print head, which runs warm. |
| Tractor feed | Sprockets that pull paper via edge holes. |
| Tractor paper | Paper with tractor-feed holes down each side. |
| Fanfold / continuous-feed paper | Accordion-folded tractor paper (beyond this lesson). |
| Green bar paper | Alternating-bar tractor paper, once used for source code. |
| Multi-part paper | Paper producing several copies from one printed pass. |
| Carbon paper | Traditional ink-transfer sheet for multi-part copies. |
| Micro-encapsulated ink | Modern carbonless ink used with a clay-coated sheet. |
| Paper jam | Paper caught in the mechanism, often from misaligned feed. |

## Review questions

1. How does a dot-matrix printer form characters on the page?
2. Give one advantage and two disadvantages of impact printers.
3. Why do dot-matrix printers survive mainly in niche use today?
4. Describe how the print head produces output as it moves.
5. Why does the print head need a heat sink?
6. How is the ribbon shaped, and how do you replace it?
7. What determines which ribbon fits which printer?
8. What is a tractor feed, and what happens if the holes don't align?
9. What is green bar paper and what was it commonly used for?
10. Describe how carbonless multi-part paper produces a copy.
11. What health caution applies to multi-part paper, and why?
12. Why have many organisations moved away from multi-part impact printing?
13. Scenario: an old dot-matrix printer is still used for warehouse carbon-copy
    delivery notes. What are two things to consider before retiring it?
14. Scenario: a sensitive ribbon cartridge is being thrown out. What data risk
    does it carry, and what should you do?

## Answer key

1. **A matrix of pins in the print head strikes a ribbon, transferring ink to the
   paper as small dots.** Physical impact through a ribbon.
2. **Advantage: can produce carbon copies (and low cost per page); disadvantages:
   noisy, low resolution.** Trade-offs of the mechanism.
3. **They are loud and low-resolution, so modern printers outperform them except
   in specific niche cases (e.g. multi-part forms).** Superseded generally.
4. **It moves back and forth across the line, firing pins into the ribbon as it
   goes, while the page advances between lines.** Line-by-line sweep.
5. **Repeated pin strikes make the head run warm, and the heat sink dissipates
   that heat.** Thermal management.
6. **A single continuous loop inside a replaceable cartridge; it pops out and a
   new one pops in within seconds.** Fast cartridge swap.
7. **The printer's make and model — ribbon sizes vary between them.** Match the
   part to the printer.
8. **Sprockets pulling the paper via holes on each edge; misaligned or missed
   holes cause a paper jam.** Precise engagement needed.
9. **Wide tractor-feed paper with alternating green/white bars, commonly used to
   print source code for review.** Legacy programmer's printout.
10. **Micro-encapsulated ink on the back of the top sheet reacts with a clay
    coating on the sheet below, creating a copy without the head touching that
    second sheet.** Chemical reaction, not carbon.
11. **The inks/dyes and clay can irritate skin with extended handling.** A health
    consideration.
12. **Printing a separate copy on another printer is now cheaper and easier than
    maintaining a dot-matrix printer's ribbons, paper and moving parts.** Cost
    and simplicity favour the alternative.
13. **Whether the carbon-copy-in-one-pass benefit still justifies the noise/
    maintenance/resolution trade-offs, and whether a modern printer plus a
    reprint step would work just as well — any two considerations.** Weigh the
    niche benefit against upkeep.
14. **The ribbon carries a physical impression of everything it printed and could
    in principle be read back — dispose of it securely, like sensitive printed
    waste.** A low-tech data remnant.
