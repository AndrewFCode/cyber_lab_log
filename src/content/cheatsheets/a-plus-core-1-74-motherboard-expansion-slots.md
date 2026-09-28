---
title: "A+ Core 1 3.5: Motherboard Expansion Slots"
description: "A+ Core 1 3.5 — buses, PCI (parallel, 32/64-bit) vs PCIe (serial, lanes), keying, and safe card installation."
tags: ["a-plus", "comptia", "messer", "hardware", "motherboard", "pci", "pcie", "expansion-slots", "buses"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "Motherboard Expansion Slots"
moduleOrder: 74
unit: 3
---

> **In one line:** an expansion bus lets you add cards to a board — PCI is the old parallel bus (32/64-bit), PCIe is the modern serial bus measured in lanes (x1–x16).

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, lesson 5.* The full version is the Motherboard Expansion Slots class notes; the section overview is the Section 3 sheet.

## Buses

| Term | What it is |
| --- | --- |
| Bus | Shared pathway carrying data between board components |
| Memory bus | Connects the CPU to the RAM slots |
| Expansion bus | Connects the expansion slots — how you add cards |
| Trace | The fine copper line on the board forming a bus |

## PCI vs PCIe

| | PCI | PCIe |
| --- | --- | --- |
| Signalling | **Parallel** (all bits at once) | **Serial** (one bit at a time) |
| Unit of width | Bus width: **32-bit** or **64-bit** | **Lanes**: x1, x2, x4, x8, x16 |
| More speed by | Wider bus (more wires) | More lanes |
| Duplex | — | One path each way per lane (full duplex) |
| Notch/keyway | Set **further back** from edge | **Closer** to the board edge |
| Slot length | 64-bit longer than 32-bit | x1 shortest, x16 longest |
| Retention latch | No | Often yes (x16 especially) |
| Era | Older boards (early 1990s on) | Modern boards |

- **"PCIe x4"** is read "PCIe by 4" = 4 lanes ≈ 4x the throughput of x1.
- **64-bit PCI card** = longer, with an extra keyed section for the extra 32 bits.
- **Keying** enforces card type/orientation — a card only drops in when it matches.

## Installing a card

1. Align the card's notch with the slot's key.
2. Press **straight down**, steady even pressure — never force it.
3. Seated right = **no copper contacts** visible above the slot.
4. Screw the bracket to the case.
5. Removing a PCIe card: undo the screw **and** release the retention latch first.

## 🔐 Security notes

- **A card in a slot is on the system bus**, not held at arm's length by the OS — an unexpected add-in card is an incident, not a curiosity.
- **PCIe supports DMA:** a rogue PCIe card (PCILeech class) can read/write RAM directly and lift keys, credentials and decrypted data — even on an encrypted disk, because it's unlocked while running. Same reason Thunderbolt (tunnelled PCIe) is treated carefully.
- **Control is physical:** lock the case, account for every slot, know what should be installed. Full-disk encryption protects a powered-off machine, not live memory.

## Practice drills

<details>
<summary>1. Parallel or serial: PCI? PCIe?</summary>

PCI is parallel; PCIe is serial.
</details>

<details>
<summary>2. What does "PCIe x16" tell you, and how is it read?</summary>

Sixteen lanes ("PCIe by 16") — the widest common slot, used for graphics cards.
</details>

<details>
<summary>3. On a board with both, how do you tell a PCIe slot from a PCI slot?</summary>

PCIe notch sits closer to the board edge (PCI's is set further back), and PCIe slots vary in length (x1 short, x16 long). Many PCIe slots also have a retention latch.
</details>

<details>
<summary>4. A card won't drop into the slot whichever way you turn it. Cause? Action?</summary>

The keying doesn't match — wrong card/slot. Do not force it.
</details>

<details>
<summary>5. You've seated a card but a strip of gold contacts still shows. What now?</summary>

It isn't fully home — press it down a little further until no copper is visible, then screw the bracket.
</details>

<details>
<summary>6. Two things to release before pulling out a PCIe x16 graphics card?</summary>

The case bracket screw and the retention latch at the far end of the slot.
</details>

<details>
<summary>7. Why is a rogue PCIe card dangerous even on a full-disk-encrypted machine?</summary>

DMA lets it read live RAM, and the disk is decrypted while the system runs — so keys and data sit in memory in the clear.
</details>

## Key takeaways

- **Bus = shared pathway;** the expansion bus is how you add cards.
- **PCI = parallel, 32/64-bit;** **PCIe = serial, measured in lanes** (x1–x16), more lanes = more throughput.
- **PCIe notch is nearer the edge; PCI notch is set back.** Slot length and a retention latch also give PCIe away.
- **Install:** match the key, press straight down until no copper shows, screw it in. **Remove PCIe:** screw *and* latch.
- **Security:** a slot is direct bus access; PCIe DMA can read live memory — physical control is the defence.
