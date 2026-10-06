---
title: "A+ Core 1 3.8: Inkjet Printers — Class Notes"
description: "Full class notes for A+ Core 1 3.8: inkjet operation, CMYK cartridges, print heads, feed rollers, duplex, and (beyond the clip) carriage/belt and calibration."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "inkjet-printer", "cmyk", "print-head", "feed-rollers", "calibration"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 3.8**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> second lesson under objective **3.8**, the inkjet counterpart to the Laser
> printer maintenance lesson, and part of the printer material that began with
> Multifunction devices (3.7).

## Learning objectives

By the end of these notes you should be able to:

1. Describe how an inkjet printer produces output and where it excels.
2. Explain the ink's characteristics and its common problems.
3. Describe CMYK cartridges and the two print-head arrangements.
4. Explain the role of the feed rollers and when to clean them.
5. Recognise duplex support, and (beyond the clip) the carriage/belt and
   calibration.

## 1. Inkjet overview

An **inkjet** — or **ink dispersion** — printer produces **high-resolution**
output in both **black-and-white and colour**. The technology is **inexpensive**,
the printers run **quietly**, and the high resolution makes them a popular choice
for **graphics and photographs**.

## 2. The ink and its problems

The ink is where the trade-offs live:

- **Expensive**, and **proprietary** — specific to the printer's manufacturer.
- **Fades over time** — a print made today can look noticeably different a year
  later.
- **Clogs easily** — a recurring inkjet problem. Manufacturers each have their
  own approaches to combating clogs, and the methods **vary between makers**.

> **Note (beyond this lesson):** inkjet inks come as **dye-based** (vivid, but
> fades faster) or **pigment-based** (more fade- and water-resistant). Choosing
> pigment ink is one way to reduce the fading the lesson describes.

## 3. How it prints, and CMYK

The process is straightforward: **drops of ink are moved from a cartridge onto
the paper** to build the output. Colour inkjets normally use **four** colours —
**black, cyan, magenta and yellow** — which you will see written as **CMYK**:
**C**yan, **M**agenta, **Y**ellow, and **K** for **Key**, meaning **black**.

These may be fitted as **individual cartridges** (one per colour) or, on some
models, combined so **all the colours sit in a single cartridge**.

> **Note (beyond this lesson):** the drop itself is ejected by one of two
> mechanisms — **thermal** ("bubble jet": a tiny heater boils the ink to fire a
> drop, used by HP and Canon) or **piezoelectric** (a piezo crystal flexes to
> push a drop, used by Epson). The exam sometimes distinguishes the two.

## 4. Print heads

The **print head** is what sprays the ink, and inkjets take one of two
approaches:

- **Combined head and cartridge.** The print head is built into the **bottom of
  the ink cartridge**, so replacing the cartridge also gives you a **brand-new
  print head**. This is a **simple, inexpensive** design, which is why many makers
  use it.
- **Separate head and cartridge.** The **ink cartridge** and the **print head**
  are distinct components in different parts of the printer, and you service them
  independently.

The print head is **very small and delicate**. If you need to clean one, be
**very careful not to damage it**.

## 5. The paper path: feed rollers

Compared with a laser printer, an inkjet is a **small, simple** machine. At the
front are **feed rollers** that **pull the paper into the printer and all the way
through**, past the print heads, and out the other side.

Feed rollers **get dirty over time**. If the printer is **struggling to pull
paper in**, the fix may simply be to **clean the feed rollers**.

## 6. Duplex

Some **larger** inkjets support **duplex** printing — output on **both sides** of
the page. It may be **built in** or **require additional hardware**, so check with
the manufacturer whether your model supports it.

## 7. Beyond this clip — carriage, belt and calibration

The lesson's introduction also lists the **carriage and belt** and **inkjet
calibration**, but the provided transcript ends after the feed rollers and duplex
without covering them. For completeness, here they are from general knowledge —
treat this whole section as **beyond the transcript**:

> **Note (beyond this lesson):** the print head rides on a **carriage** that
> moves **back and forth** across the width of the page, driven by a toothed
> **carriage belt** on a small motor. The paper steps forward between passes
> while the head sweeps across. A **dirty, worn or slipping belt**, or a
> **carriage** that binds on its rail, shows up as **banding, misalignment or
> stalled printing**.

> **Note (beyond this lesson):** inkjet **calibration** centres on **print-head
> alignment** — you print an **alignment/test page** and the printer (or its
> driver) corrects any offset so colours and passes line up. Most inkjets also
> offer a **nozzle check** and a **head-cleaning cycle** that pushes ink through
> the nozzles to clear the clogs from Section 2. These cleaning cycles **use
> ink**, so run them when needed rather than routinely.

```
Inkjet mechanism (top view):

    <----   carriage travel   ---->
   +-------------------------------+
   |   [ print head on carriage ]  |  driven along a belt
   |  ============================ |  <- carriage belt
   |                               |
   |  paper advances this way  \/  |  <- feed rollers pull paper
   +-------------------------------+
   The head sprays CMYK drops as it sweeps; the paper steps
   forward between passes.
```

### 7.1 Worked example — faded, streaky colour output

A user reports pale, banded prints with a missing colour.

1. **Check ink levels** — a colour printing pale or missing often means that
   cartridge is low or empty; low ink also causes fading.
2. **Run a nozzle check**, then a **head-cleaning cycle** if the check shows gaps
   — inkjet ink clogs easily, and cleaning clears blocked nozzles (it uses ink).
3. **Run print-head alignment/calibration** if colours or passes are misaligned
   (banding).
4. **Clean the feed rollers** if paper is also feeding unevenly, and check the
   **carriage** moves freely on its rail.
5. Consider **pigment ink** or fresher cartridges if fading over time is the real
   complaint.

The pattern: for inkjet quality faults, work through ink level, clogged nozzles,
then alignment — cheap checks before parts.

## 8. Security perspective

Like the laser maintenance lesson, this is largely a **physical/consumables**
topic, so its direct security surface is small — but two points are worth noting:

- **Network-capable inkjets are still networked computers.** A home inkjet may be
  a simple USB device, but any inkjet that joins Wi-Fi or Ethernet (often as part
  of an all-in-one) inherits the same attack surface as the Multifunction devices
  lesson: patch its firmware, change default admin credentials, and keep it off
  the flat user network. Simple USB-only inkjets carry far less of this risk.
- **Consumables are a supply-chain and availability issue.** Inkjet ink is
  proprietary, and cartridges increasingly carry **chips**; a vendor **firmware
  update** can refuse third-party or refilled cartridges and, in effect, take a
  printer out of service, while **counterfeit** cartridges bring their own quality
  and tampering risks. Track firmware changes and source consumables from
  reputable suppliers, and remember that a clogged head or dirty rollers is
  itself **downtime** for whatever the printer supports.

## Summary

- **Inkjet (ink dispersion)** printers give **inexpensive, quiet, high-resolution**
  colour and mono output — good for **graphics and photos**.
- The **ink** is **expensive, proprietary, fades over time, and clogs easily**;
  anti-clog methods vary by maker.
- Output is built from **ink drops** onto paper; colour uses **CMYK** (Cyan,
  Magenta, Yellow, **K**ey = black), as **individual** cartridges or a **combined**
  one.
- **Print heads** are either **combined** with the cartridge (new head with each
  cartridge — simple, cheap) or **separate**; they are **small and delicate**.
- **Feed rollers** pull paper through; **clean** them if paper won't feed.
- **Duplex** is available on some larger models (built in or extra hardware —
  check the maker).
- Beyond the clip: the head rides a **carriage** on a **belt** (dirt/wear causes
  banding), and **calibration** aligns the head, with **nozzle-check/cleaning**
  cycles for clogs.

## Glossary

| Term | Meaning |
| --- | --- |
| Inkjet / ink dispersion | Printer that sprays ink drops onto paper. |
| CMYK | Cyan, Magenta, Yellow, Key (black) — the ink colours. |
| Key (K) | The black in CMYK. |
| Ink cartridge | The replaceable ink container (individual or combined). |
| Print head | The component that sprays the ink drops. |
| Combined head/cartridge | Head built into the cartridge; renewed each swap. |
| Feed roller | Roller that pulls paper through the printer. |
| Duplex | Printing on both sides of the page. |
| Carriage | The moving mount the print head rides on (beyond this lesson). |
| Carriage belt | The belt that drives the carriage across (beyond this lesson). |
| Calibration | Print-head alignment via a test page (beyond this lesson). |
| Nozzle check | A test for clogged nozzles (beyond this lesson). |
| Head-cleaning cycle | An ink-using cycle to clear clogs (beyond this lesson). |
| Thermal / piezoelectric | The two drop-ejection methods (beyond this lesson). |
| Dye vs pigment ink | Ink types differing in fade resistance (beyond this lesson). |

## Review questions

1. What kind of output are inkjet printers known for, and what are they popular
   for?
2. Give three downsides of inkjet ink.
3. What does CMYK stand for, and what does the K mean?
4. What are the two ways CMYK inks can be packaged in a printer?
5. Describe the two print-head arrangements, and a benefit of the combined type.
6. What must you be careful of when cleaning a print head?
7. What do the feed rollers do, and what simple fix helps a paper-feed problem?
8. Is duplex guaranteed on an inkjet? How do you find out?
9. (Beyond the clip) What are the carriage and belt, and what fault does a
   worn/dirty belt cause?
10. (Beyond the clip) What does inkjet calibration do, and what clears a clogged
    nozzle?
11. Scenario: one colour is missing and prints are banded. Give your first two
    checks.
12. Scenario: a customer says photos printed last year have faded. What ink
    choice reduces this?

## Answer key

1. **Inexpensive, quiet, high-resolution colour and mono; popular for graphics
   and photographs.** Quality output, low cost.
2. **Expensive, proprietary to the maker, fades over time, and clogs easily — any
   three.** The ink is the weak point.
3. **Cyan, Magenta, Yellow, Key; K (Key) is black.** The four ink colours.
4. **As individual cartridges (one per colour) or a single combined cartridge.**
   Model-dependent.
5. **Combined (head built into the cartridge, renewed with each swap) or separate
   (independent head and cartridge); combined is simple and cheap and gives a
   fresh head each time.** Two designs.
6. **The head is small and delicate — take care not to damage it.** Fragile part.
7. **They pull the paper into and through the printer; clean the rollers if paper
   won't feed properly.** Common feed fix.
8. **No — only some larger models; check with the manufacturer (it may need extra
   hardware).** Not universal.
9. **The carriage carries the print head across the page on a driven belt; a worn
   or dirty belt causes banding/misalignment or stalls.** Movement mechanism.
10. **Calibration aligns the print head via a test page; a nozzle check plus a
    head-cleaning cycle clears clogs (using ink).** Alignment and unclogging.
11. **Check ink levels for the missing colour, then run a nozzle check/head clean
    (and align).** Ink and clog first.
12. **Pigment-based ink resists fading better than dye-based.** More durable ink.
