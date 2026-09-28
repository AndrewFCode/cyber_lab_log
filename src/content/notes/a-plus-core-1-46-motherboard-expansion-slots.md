---
title: "A+ Core 1 3.5: Motherboard Expansion Slots — Class Notes"
description: "Full class notes for A+ Core 1 3.5: buses, PCI vs PCIe, parallel vs serial, PCIe lanes, and installing add-in cards safely."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "motherboard", "pci", "pcie", "expansion-slots", "buses"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is
> lesson 3.5, sitting between Storage devices (3.4) and Computer power (3.6),
> and it deals with the expansion buses you use to add cards to a board.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what a computer bus is and why a motherboard is built from several
   of them.
2. Describe conventional PCI: its parallel signalling, its 32-bit and 64-bit
   forms, and the keying that stops a card seating the wrong way.
3. Describe PCI Express (PCIe): its serial signalling and the idea of lanes,
   and read an interface label such as "PCIe x1".
4. Compare PCI and PCIe physically on a real board (keyway position, slot
   length, retention latch).
5. Install and remove an add-in card safely without damaging the board.

## 1. The motherboard as a system of buses

Look at a motherboard from above and it resembles a small city seen from the
air: distinct districts of components, with roads running between them. Those
roads are **buses**. A bus is simply a shared pathway that carries information
from one part of the board to another, so that many very different components
behave as a single working system.

There is not one bus but several. A **memory bus** connects the CPU to the
memory slots. A separate **expansion bus** connects the expansion slots to the
rest of the system. Keeping these on their own pathways lets each be designed
for its own job while still tying everything together.

Buses are also how you *grow* a system. The expansion bus exists precisely so
that you can drop additional cards onto the board and add capability that
wasn't there before: a faster graphics card, a network card, a capture card,
extra storage controllers. If you trace the fine copper lines (the **traces**)
on a board, you can follow one side of a bus connection all the way round to
where it lands on the other side.

```
+---------+   +---------+   +-----------------------------+
|   CPU   |   |   RAM   |   |   Expansion slots (cards)   |
+----+----+   +----+----+   +--------------+--------------+
     |             |                       |
     +=====+=======+===========+===========+
           |                   |
      memory bus          expansion bus
   (CPU <-> RAM)     (CPU <-> add-in cards)
```

The two expansion technologies you meet in this lesson are **PCI**, the older
one, and **PCIe**, the one on essentially every modern board.

## 2. PCI — Peripheral Component Interconnect

On older motherboards one of the available buses is the **PCI bus**, short for
**Peripheral Component Interconnect**. Newer boards have usually dropped it in
favour of PCI Express, but you will still meet it in the field and on the exam.

> **Note (beyond this lesson):** the transcript dates PCI to 1994. The first
> PCI Local Bus specification actually appeared in 1992, with the 2.x
> revisions that made it ubiquitous following across the mid-1990s, so "early
> 1990s" is the safest way to place it. Nothing else about how it works
> changes.

### 2.1 Parallel signalling, 32-bit and 64-bit

PCI sends data over **parallel** communication, and it comes in two widths: a
**32-bit** bus and a **64-bit** bus. Parallel means the bits of a single
transfer travel *side by side* on their own separate wires and are meant to
arrive together at the far end. A 32-bit PCI bus therefore has 32 separate
connections; when you send 32 bits, one bit rides each of the 32 lines and,
ideally, all 32 appear simultaneously on the other side. A 64-bit PCI bus works
in exactly the same way but doubles the count to 64 lines carrying 64 bits at
once.

```
PCI (parallel), 32-bit:            PCIe (serial), one x1 lane:

  bit  0 ----------------->          --- one bit at a time --->
  bit  1 ----------------->          <-- one bit at a time ----
  bit  2 ----------------->
   ...   (32 wires total)           one lane = two paths, one
  bit 31 ----------------->         per direction (full duplex)

  32 bits arrive together            x4 = four such lanes, and
  across 32 separate wires           roughly 4x the throughput
```

### 2.2 Keying: the tabs in the slot

Look closely at a PCI slot and you will see small **tabs** or **keys** part way
along the connector. These keys designate the power arrangement for the cards
that plug in, and they physically stop a card seating in a slot it does not
belong in. The matching card has notches cut into its edge connector that slide
past those tabs, so a card only drops in when it is the right type and the right
way round.

A **64-bit** card is longer than a 32-bit card: it carries the extra 32 bits on
an additional run of contacts beyond the 32-bit section, with its own separate
keyway marking it out as a 64-bit card.

> **Exam tip:** the key/notch scheme is what enforces compatibility. If a card
> will not drop into place, do not force it — the keying is telling you the card
> and slot do not match.

## 3. Installing an add-in card

Fitting a card is mechanically simple, but the "carefully" matters. Line the
card's notches up with the keys in the slot so it is correctly oriented, rest it
squarely on top of the slot, then press straight down with steady, even
pressure. Too much force, or pressing at an angle, risks cracking the board or
its components.

When it is seated correctly the card sits snugly and you should no longer see
any of the gold **copper** contacts above the slot — if a strip of copper is
still visible, it usually needs pushing down a little further. Once home, the
card is screwed to the computer's case at its metal bracket so it cannot work
loose or be knocked out of the slot.

> **Caution:** as with any work inside the case, power down and follow ESD
> precautions first. A card that is only half-seated can behave like a faulty
> card — no output, intermittent errors — so reseating is a sensible first
> check before condemning the hardware.

## 4. PCI Express (PCIe)

**PCI Express**, or **PCIe**, is the newer bus and the one you will find on the
most recent computers. Its key difference from PCI is that it communicates over
a **serial** connection rather than a parallel one. Instead of spreading a
transfer across many wires at once, serial sends **one bit at a time** down the
same pathway.

### 4.1 Lanes

Each PCIe pathway is called a **lane**. A lane is not a single wire but a pair
of paths: one carrying data in each direction, so a lane is full duplex.

An interface is labelled by how many lanes it has. "PCIe x1" is spoken "PCIe
by 1" and means a single-lane interface; "x2" is "by 2", then "by 4", "by 8",
and so on. Because the signalling is serial you do not need the wide 32- or
64-wire pathways of PCI to go faster — you simply add more lanes. A **PCIe x4**
interface is four lanes wide and moves data at roughly four times the
throughput of a **PCIe x1**.

### 4.2 Worked example — reading a slot and picking a card

You are fitting a low-profile network card. The card's edge connector is short
and its notch is near the end closest to the bracket. On the board you see two
empty slots: a very short one and a much longer one.

1. The short notch tells you this is a **PCIe** card (PCIe notches sit closer
   to the board edge than PCI's), and its short length points to a **PCIe x1**
   card.
2. The short slot is a **PCIe x1** slot; the long slot is a **PCIe x16** slot
   (the length you would use for a graphics card).
3. A x1 card physically fits and works in the x1 slot, so use the short slot
   and save the long x16 slot for something that needs the extra lanes.
4. Orient the notch to the slot's key, press straight down until no copper
   shows, then screw the bracket to the case.

The general rule the example shows: a smaller PCIe interface (fewer lanes) is
a smaller physical slot, which lets a board dedicate only as much room as a card
actually needs.

## 5. Telling PCI and PCIe apart on a board

A board can carry both PCI and PCIe slots at once, and at a glance they look
similar. Three cues separate them.

**Keyway position.** On a **PCI** slot the key/notch sits **further back**, away
from the edge of the motherboard. On a **PCIe** slot the key sits **closer to
the edge**. This is also how you read a card: a PCIe card has its notch nearer
the bracket end.

**Slot length.** The slots are different sizes depending on the bus. The
shortest PCI interface is the 32-bit slot; the shortest PCIe interface is the
x1 slot. Because PCIe scales by lane count, its slots range from the tiny x1 up
to the long x16.

**Retention latch.** Many PCIe cards — x16 graphics cards especially — have a
small **hook** on the back of the card that clips into a **retention latch** on
the motherboard. That fastens the card down to the board itself, on top of the
screw holding its bracket to the case.

```
Board edge (nearest the case bracket)
|
v
+--------------------------------------------------+
| PCIe x1 :  [==]#[====]                            |  shortest
| PCIe x16:  [==]#[==========================]      |  longest PCIe
| PCI 32  :  [========]##[==============]           |  key set back
| PCI 64  :  [========]##[=====================]    |  longest PCI
+--------------------------------------------------+
   #  = notch near the edge  -> PCIe
   ## = notch set further back -> PCI
   (schematic: relative length and notch position, not to scale)
```

> **Exam tip:** when removing a PCIe card, undo the case screw **and** release
> the retention latch at the far end. Pulling a latched card out by force is a
> common way to damage the slot.

## 6. Security perspective

Expansion slots are a physical-access story, and the risk is specific to what a
card on the bus can reach:

- **A card in a slot sits on the system bus.** An add-in card is not a
  peripheral held at arm's length by the OS; it is wired into the machine's
  internal pathways. That is exactly why an *unexpected* card in a previously
  empty slot is worth treating as an incident rather than a curiosity.
- **PCIe devices can use DMA.** Direct Memory Access lets a device read and
  write system memory without going through the CPU. That is what makes PCIe
  fast, and also what makes a rogue PCIe card (the PCILeech class of attack
  tooling) able to lift keys, credentials and decrypted data straight out of
  RAM — even on a machine with an encrypted disk, because the disk is unlocked
  while running. The same DMA exposure is why external Thunderbolt, which
  tunnels PCIe, is treated with such caution.
- **Open slots and case access are the control.** The defence is boringly
  physical: lock the case, account for every slot, and know what is supposed to
  be installed. Full-disk encryption protects a powered-off machine; it does
  not protect memory on a running one, so a DMA-capable card fitted to a live
  system defeats it.
- **Half-seated is not just a fault, it's noise.** A card that only sometimes
  registers muddies the picture during triage — rule out a poor seat before
  assuming tampering or failure.

## Summary

- A **bus** is a shared pathway on the board; a motherboard is built from
  several (memory bus, expansion bus, and others).
- **PCI** is the older expansion bus: **parallel**, in **32-bit** and **64-bit**
  widths, sending all the bits of a transfer at once across many wires.
- PCI slots are **keyed**; 64-bit cards are longer with an extra keyed section.
- **PCIe** is the modern bus: **serial**, one bit at a time, organised into
  **lanes**. "PCIe x1/x4/x16" states the lane count, and more lanes means more
  throughput. Each lane is full duplex.
- Physically: PCIe notches sit **closer to the edge**, PCI notches **further
  back**; PCIe slots range from tiny **x1** to long **x16**; many PCIe cards add
  a **retention latch**.
- Install by aligning the key, pressing straight down until no copper shows, and
  screwing the bracket to the case. Remove a PCIe card by undoing the screw
  *and* releasing the latch.

## Glossary

| Term | Meaning |
| --- | --- |
| Bus | A shared pathway on the motherboard carrying data between components. |
| Trace | A fine copper line on the board forming part of a bus. |
| Expansion slot | A connector on the expansion bus for adding an add-in card. |
| Add-in / adapter card | A card fitted to an expansion slot to add capability. |
| PCI | Peripheral Component Interconnect; older parallel expansion bus. |
| PCIe | PCI Express; modern serial expansion bus organised into lanes. |
| Parallel communication | Bits of one transfer sent at once over many wires. |
| Serial communication | Bits sent one at a time over a single pathway. |
| Lane | A PCIe pathway; one path in each direction (full duplex). |
| x1 / x16 | The lane count of a PCIe interface ("by 1", "by 16"). |
| 32-bit / 64-bit bus | PCI widths; 32 or 64 parallel data lines. |
| Keyway / key | Notch-and-tab that enforces card orientation and type. |
| Retention latch | A clip on the board that holds a PCIe card down. |
| Throughput | The rate of data a bus can move; scales with PCIe lane count. |
| Copper (contacts) | The gold edge contacts; none should show once seated. |

## Review questions

1. In one sentence, what is a computer bus?
2. Name two different buses found on a motherboard and what each connects.
3. Does PCI use parallel or serial communication, and what does that mean for
   how a 32-bit transfer travels?
4. What are the two width variants of the PCI bus?
5. How does a 64-bit PCI card differ physically from a 32-bit one?
6. What is the purpose of the tabs/keys in a PCI slot?
7. Does PCIe use parallel or serial communication?
8. What is a PCIe "lane", and how is "PCIe x4" read aloud?
9. Roughly how does the throughput of a PCIe x4 interface compare to x1, and
   why can PCIe add speed without wider physical slots?
10. Give two physical ways to tell a PCIe slot from a PCI slot on the same
    board.
11. A graphics card will not drop into its slot no matter how you orient it.
    What is the most likely cause, and what should you not do?
12. Scenario: you must remove a seated PCIe x16 graphics card. List the two
    things you release before lifting it out, and why forcing it is risky.

## Answer key

1. **A shared pathway that carries data between the components of the
   motherboard.** It is the "road" tying diverse parts into one system.
2. **Memory bus (CPU to RAM) and expansion bus (CPU to add-in cards).** Each
   pathway is dedicated to its role.
3. **Parallel; the 32 bits travel side by side on 32 separate wires and arrive
   together.** Width equals the number of simultaneous data lines.
4. **32-bit and 64-bit.** Same signalling method, twice the lines.
5. **It is longer, adding a further run of contacts with its own keyway for the
   extra 32 bits.** The keyway marks it as 64-bit.
6. **They set the card's orientation/type and physically stop the wrong card
   seating.** Compatibility is enforced mechanically.
7. **Serial — one bit at a time down a pathway.** No wide parallel bundle.
8. **A lane is a PCIe pathway with one path each direction (full duplex); "PCIe
   x4" is read "PCIe by 4".** The number is the lane count.
9. **Roughly four times the throughput of x1, because PCIe scales by adding
   serial lanes rather than widening the slot.** More lanes, more bandwidth.
10. **PCIe notches sit closer to the board edge (PCI's are set further back),
    and PCIe slots come in different lengths from short x1 to long x16.** Latch
    presence is a third cue.
11. **The keying does not match — it is the wrong card/slot. Do not force it.**
    Forcing risks breaking the card or board.
12. **Undo the case bracket screw and release the retention latch at the far
    end.** A latched card levered out by force can damage the slot.
