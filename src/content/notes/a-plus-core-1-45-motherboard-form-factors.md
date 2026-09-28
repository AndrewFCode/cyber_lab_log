---
title: "A+ Core 1 3.5: Motherboard Form Factors — Class Notes"
description: "Full class notes for A+ Core 1 3.5: choosing between ATX, micro-ATX and Mini-ITX by size, slots, power and mounting."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "motherboard", "form-factors", "atx", "micro-atx", "mini-itx"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This
> lesson shares objective **3.5** ("Given a scenario, install and configure
> motherboards, CPUs, and add-on cards") with the Motherboard expansion slots
> lesson — that one covered the add-on cards; this one covers the board itself.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why a motherboard's form factor matters — size, component layout,
   power and cooling.
2. Name the three form factors the A+ expects you to know and rank them by size.
3. Describe ATX: what the name stands for, roughly when it appeared, and how its
   main power connector changed.
4. Describe micro-ATX and how it relates to ATX (mounting points, power, slot
   count).
5. Describe Mini-ITX and why its mounting compatibility lets it fit an ATX case.
6. Choose an appropriate form factor for a given scenario.

## 1. Why form factor matters

Whether you are buying a machine or building one, you face a lot of choices, and
one of the first is the **form factor** of the motherboard — its standardised
size and layout. Very different computers can hold the same *kinds* of parts. A
big desktop tower and a small box sitting next to a television both contain a
CPU, memory, storage, a network connection and so on. What separates them is
their **footprint**: the tower is large, the media box is small, and the boards
inside them cannot be the same shape.

Four things drive the differences between one motherboard and another:

- **Physical size.** The most obvious difference, and the one the form-factor
  name captures.
- **Component layout.** Larger boards have room for more components and more
  flexibility in how they are arranged; smaller boards force compromises.
- **Power.** Most boards use a standard main power connector, but not every
  board uses exactly the same one, so it is worth checking.
- **Airflow and cooling.** Every board generates heat, and the cooling system
  has to keep up with it — a consideration that gets harder as boards and cases
  shrink.

There are, per Wikipedia, more than forty motherboard types in existence. The
good news is that for the A+ you only need three of them.

> **Exam tip:** objective 3.5 is written "**Given a scenario**". You will not be
> asked to recite dimensions so much as to *choose*: which of these three boards
> suits a media centre, and which suits a video-editing desktop? Match the
> board to the job.

## 2. The three you need

For the exam, focus on **ATX**, **micro-ATX** and **Mini-ITX**. In size order,
ATX is the largest, micro-ATX sits in the middle, and Mini-ITX is the smallest
of the three. They are closely related — micro-ATX and Mini-ITX both descend
from the ATX standard and deliberately keep parts of it — which is what makes
them easy to compare.

| | ATX | micro-ATX | Mini-ITX |
| --- | --- | --- | --- |
| Full name | Advanced Technology Extended | Micro-ATX | Mini-ITX |
| Appeared | 1995 | Later, from ATX | Later, from ITX |
| Relative size | Largest | Smaller than ATX | Smallest of the three |
| Expansion slots | Most | Fewer | Fewest (often one) |
| Memory slots | Most (e.g. four) | Fewer (e.g. two) | Fewest |
| Main power | 20-pin (early), 24-pin now | Same as ATX | Same family |
| Mounting points | The ATX standard | Same as ATX | ATX-compatible |
| Fits an ATX case | Yes | Yes | Yes |

> **Note (beyond this lesson):** the transcript compares the three only in
> relative terms. For reference, the usual maximum sizes are ATX ~305 x 244 mm,
> micro-ATX ~244 x 244 mm, and Mini-ITX ~170 x 170 mm. The exam leans on the
> relative ordering rather than the exact millimetres.

```
Shared mounting points, drawn nested:

+-------------------------------+
|  o                         o  |
|     +---------------------+   |
|     |  o             o    |   |
|     |    +-----------+    |   |
|     |    | o       o |    |   |
|     |    |           |    |   |
|     |    | o       o |    |   |
|     |    +-----------+    |   |
|     |  o             o    |   |
|     +---------------------+   |
|  o                         o  |
+-------------------------------+
```

Outer board = ATX, middle = micro-ATX, inner = Mini-ITX; each `o` is a mounting
screw point. Because the smaller boards reuse ATX screw positions, a smaller
board bolts into a case built for a larger one. (Schematic, not to scale.)

## 3. ATX — Advanced Technology Extended

**ATX** stands for **Advanced Technology Extended**. It is a long-lived standard
that has been around since 1995, and although it has seen many revisions over
the years, the current version remains very similar to the original.

The part that has changed most is the **main power connector**. Early ATX boards
used a **20-pin** connector for main system-board power; more modern boards use
a **24-pin** connector. (You will meet the 24-pin main connector again in the
Computer power lesson, 3.6.)

An ATX board is physically large, and that size buys capacity: room for a
generous number of expansion slots and, in the example Messer shows (a Gigabyte
GA-P67A board), four memory slots, with the CPU socket in the middle. It is
worth fixing the *relative* sizes of the CPU socket, the memory slots and the
expansion slots in your mind on the full-size board, because those same
components look proportionally different once you move to a smaller form factor.

> **In the real world:** "more slots" is a *tendency* of the larger board, not a
> fixed rule of the standard. Two ATX boards can differ in how many slots the
> manufacturer fits — but the extra area is what makes more slots possible.

## 4. micro-ATX

**micro-ATX** is very similar in layout to ATX, just slightly smaller. Two
similarities matter most:

- **Mounting points.** micro-ATX places its mounting holes at the *same*
  positions as a full-size ATX board (a subset of them), so it fits the same
  cases and standoffs.
- **Power connectors.** It uses the same power connectors as full-size ATX.

That close compatibility is exactly why micro-ATX is popular: it follows the ATX
standards yet fits a much smaller board.

The trade-off is capacity. Shrinking the board means deciding which components
survive the cut. The micro-ATX board Messer shows (an MSI H81M-P33) has a
**single** expansion slot and just **two** memory slots, against the larger
board's four memory slots and multiple expansion slots. When you go smaller, you
give up expansion room.

## 5. Mini-ITX

If you need something genuinely small, look at an **ITX** board — specifically
**Mini-ITX**, one of the smallest members of the ITX family.

Despite being a small board, Mini-ITX keeps the **same mounting screw points as
a traditional ATX motherboard**. The practical consequence is neat: you can take
a case designed for an ATX board and install a Mini-ITX board inside it, because
the screw holes line up.

Its very small size makes it ideal wherever space is tight or the machine has
one job to do: a streaming media device beside a television, a small-office box,
or any single-task computer. Fewer slots is the price, but for an appliance-style
build that is rarely a problem.

### 5.1 Worked example — picking a board for the scenario

Two builds land on your bench on the same day.

1. **A 4K video-editing desktop.** This needs a powerful graphics card (a long
   PCIe x16 card), plenty of RAM across several memory slots, and maybe a
   capture card and extra storage controllers. Capacity is everything, so choose
   **ATX** — the most expansion and memory slots, the most room for cooling.
2. **A streaming box for the living room.** This runs one application beside the
   TV and must be small and quiet. It needs almost no expansion. Choose
   **Mini-ITX** — smallest footprint, fits neatly into a tight space, and still
   bolts into standard mounts if you reuse a case.
3. **A general small-office PC** that should stay cheap and compact but keep a
   little room to grow (one add-in card, a RAM upgrade later)? **micro-ATX** is
   the middle ground — ATX-compatible, smaller, a slot or two to spare.

The reasoning is always the same: start from what the machine must *do*, work out
how much expansion and cooling that implies, then pick the smallest form factor
that still meets it.

## 6. Security perspective

This is a hardware-selection lesson, so its security relevance is indirect — but
two points are worth keeping:

- **A standard footprint cuts both ways.** Shared mounting points and layouts
  are convenient for you and for an attacker: a tampered board of the same form
  factor drops into the same chassis and looks right, which is the physical
  side of a supply-chain or "evil maid" swap. Physical asset checks — does this
  machine have the board, slot count and populated headers you expect? — are how
  you catch that, so knowing the normal layout is a defender's baseline.
- **Small single-purpose boxes are still endpoints.** Mini-ITX appliances beside
  a TV, at a reception desk or in a comms cupboard are physically exposed, often
  run unattended and unpatched, and are easy to overlook in an inventory. Treat
  them as untrusted devices on the network, patch and segment them, and don't let
  "it's just the media box" leave one unmanaged on the corporate LAN.

Slot count also has a quiet security dimension: a board with fewer expansion
slots simply offers fewer internal card-based attack points, but also less room
for defensive hardware (an extra monitored NIC, add-in security modules) — a
trade-off, not a win either way.

## Summary

- **Form factor** is a motherboard's standardised size and layout; it is driven
  by size, component layout, power and cooling.
- The A+ wants **three**: **ATX** (largest), **micro-ATX** (middle), **Mini-ITX**
  (smallest).
- **ATX** = Advanced Technology Extended, from 1995; main power went from
  **20-pin** to **24-pin**; largest, most slots.
- **micro-ATX** shares ATX's **mounting points and power connectors** but is
  smaller with fewer slots.
- **Mini-ITX** is the smallest common ITX board and keeps **ATX-compatible
  mounting**, so it fits an ATX case; ideal for small, single-task machines.
- Objective 3.5 is scenario-based: choose the smallest board that still gives the
  expansion and cooling the job needs.

## Glossary

| Term | Meaning |
| --- | --- |
| Form factor | A motherboard's standardised size and layout. |
| ATX | Advanced Technology Extended; the largest of the three, from 1995. |
| micro-ATX | Smaller ATX-compatible board; same mounts and power, fewer slots. |
| Mini-ITX | Smallest common ITX board; ATX-compatible mounting. |
| ITX | The board family Mini-ITX belongs to. |
| Mounting point | A screw hole aligning the board to case standoffs. |
| Standoff | A spacer the board is screwed onto inside the case. |
| Main power connector | The primary board power feed: 20-pin (early) or 24-pin. |
| Expansion slot | A connector for an add-in card; larger boards fit more. |
| Memory slot | A DIMM slot; larger boards typically fit more. |
| Footprint | The physical area a board (or machine) occupies. |
| Layout | The arrangement of components on the board. |
| Airflow / cooling | Moving heat away from the board's components. |
| Scenario-based | Objective style: choose the right part for a situation. |

## Review questions

1. In one sentence, what does "form factor" mean for a motherboard?
2. List the four practical factors that differentiate one motherboard from
   another.
3. Name the three form factors the A+ expects, in size order.
4. What does ATX stand for, and roughly when did it appear?
5. How did the ATX main power connector change over time?
6. Give two things micro-ATX keeps the same as full-size ATX.
7. What does micro-ATX give up compared with ATX, and why?
8. Why can a Mini-ITX board be installed in a case built for ATX?
9. Scenario: a customer wants a tiny, quiet machine to stream video next to
   their TV. Which form factor, and why?
10. Scenario: a customer wants a workstation for 4K video editing with a big GPU
    and lots of RAM. Which form factor, and why?
11. True or false: a larger form factor guarantees more expansion slots. Explain.
12. Objective 3.5 begins "Given a scenario". What does that tell you about how
    this material is tested?

## Answer key

1. **Its standardised physical size and component layout.** The form factor sets
   what fits and where.
2. **Physical size, component layout, power, and airflow/cooling.** These drive
   the choice between boards.
3. **ATX (largest), micro-ATX (middle), Mini-ITX (smallest).** Three of forty-plus
   real types.
4. **Advanced Technology Extended; 1995.** Long-lived, little changed since.
5. **From a 20-pin main connector on early boards to a 24-pin on modern ones.**
   The rest of ATX stayed largely the same.
6. **The mounting points and the power connectors.** That compatibility is why
   micro-ATX is popular.
7. **Expansion and memory slots (fewer of each), because the smaller board has
   less room.** Shrinking forces trade-offs.
8. **It uses ATX-compatible mounting screw points, so the holes line up with an
   ATX case.** Same standoffs, smaller board.
9. **Mini-ITX — smallest footprint, fits a tight space beside the TV, needs
   almost no expansion.** Right tool for a single-task box.
10. **ATX — the most expansion and memory slots and the most room for cooling.**
    Capacity is the priority.
11. **False — it makes more slots *possible*, but the manufacturer decides how
    many to fit.** Size is an enabler, not a guarantee.
12. **It is tested by choosing the right board for a situation, not by reciting
    specs.** Match the board to the job.
