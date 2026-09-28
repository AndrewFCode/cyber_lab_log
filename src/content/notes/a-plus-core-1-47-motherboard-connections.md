---
title: "A+ Core 1 3.5: Motherboard Connections — Class Notes"
description: "Full class notes for A+ Core 1 3.5: main and PCIe power connectors, SATA/eSATA data, front-panel and USB/TPM headers, and M.2."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "motherboard", "power-connectors", "sata", "headers", "m2"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> third lesson under objective **3.5** ("install and configure motherboards,
> CPUs, and add-on cards"), alongside Motherboard form factors and Motherboard
> expansion slots. Here the focus is the connectors dotted around the board:
> power in, data out, and the header pins that wire up the case.

## Learning objectives

By the end of these notes you should be able to:

1. Identify the main motherboard power connector, the voltages it carries, and
   how 20-pin and 24-pin versions relate.
2. Explain why supplemental PCIe power connectors exist and state the wattage of
   the 6-pin and 8-pin versions.
3. Recognise the SATA data interface and the external eSATA variant.
4. Describe pin headers and the case devices they connect (front panel, USB,
   TPM, speaker).
5. Identify the M.2 connector and install an M.2 drive.

## 1. Main motherboard power

Among the CPU socket, memory slots and expansion slots sits one relatively
large connector: the **main power** connection for the board. It delivers
**+3.3 V, +5 V and +12 V DC** to the motherboard and, through it, to the
components attached to the board.

Older boards use a **20-pin** main connector; newer boards use **24-pin**. The
two are compatible in a helpful way. If you have a 24-pin cable but a 20-pin
board, you can usually plug the 24-pin connector in and leave the extra four
pins hanging off the end. Many power supplies make this even cleaner with a
**modular** or split connector: the extra four-pin block detaches, so you plug
in only the 20 the board expects.

The 24-pin connector is **keyed**. Its pins have different shapes so it only
mates one way round, and the connector from the power supply carries the
matching keying. To fit it, line the keys up and push the connector fully home;
a **lip or locking latch** clips it in place, and you release that latch before
pulling it out.

```
Main power (24-pin), schematic:

+---------------------------------------+
| [] [] [] [] [] [] [] [] [] [] [] []    |  row A (12)
| [] [] [] [] [] [] [] [] [] [] [] []    |  row B (12)
+----------------------------------^----+
                                   latch
   Carries +3.3 V, +5 V, +12 V DC. Keyed: fits one way only.
   20-pin boards take the same cable (extra 4 pins left off).
```

> **Caution:** do not confuse the two 8-pin connectors on a build. The **8-pin
> PCIe** connector (below) powers a graphics card; the separate **8-pin CPU
> power** connector (EPS 12 V, not covered in this lesson) powers the processor.
> They are keyed differently and are **not** interchangeable — forcing one into
> the other's socket can damage hardware.

## 2. Supplemental PCIe power

The main connector usually supplies everything the board itself needs. But some
add-in cards draw **more power than the motherboard can provide through the
slot**, and those cards take an extra feed straight from the power supply. This
is most common with **graphics cards**, though any power-hungry adapter may need
it.

These are the **PCI Express power connectors**, and they come in two sizes,
both delivering **+12 V DC**:

| Connector | Delivers |
| --- | --- |
| PCIe 6-pin | 75 W |
| PCIe 8-pin | 150 W |

Many cables are built as a **6+2** connector: an 8-pin plug with two pins that
detach, so the same cable serves a card that wants 8 pins or one that wants only
6. When you fit a graphics card, look along its top edge for the power sockets —
if the card has a six-link socket, feed it the six-pin supply; if eight, use the
full eight.

> **Exam tip:** remember the pair as **6-pin = 75 W, 8-pin = 150 W**. The number
> of pins scales with how much 12 V power the card is allowed to pull.

## 3. SATA data interfaces

If you have ever connected a storage drive, you have met the **SATA** data
interface. The connector has a distinctive **L shape** so it seats one way only,
and — importantly — it carries **data only**. The drive's power arrives on a
separate SATA power lead (covered with the storage cables in 3.2); the L-shaped
data connector on the board is purely the data path.

Some boards also provide **eSATA** — external SATA — for drives outside the
case, either as a port built onto the board's back panel or added by an
expansion card. An **eSATA expansion card** plugs into the computer's bus and
presents, for example, two eSATA connectors out the back of the machine for
external drives.

> **In the real world:** SATA is strictly one cable, one port, one drive — no
> daisy-chaining. The number of SATA data connectors on the board is the maximum
> number of SATA drives it can take internally.

## 4. Header pins

Another connector type looks quite different: a cluster of small metal **pins
sticking up** from the board. These are **headers** (or **pin headers**) — a
simple electrical interface used to connect a range of devices, many of them
built into the computer's case.

A single board can carry several kinds of header:

- **Front-panel headers** for the case's **power button, reset button, power
  LED and drive-activity (HDD) LED**. These often arrive as single pairs of
  wires that push onto the correct pins.
- **USB headers** — internal connectors that bring the case's front USB ports
  back to the board, in **USB 2.0** and **USB 3.0** varieties.
- A **TPM header** for a Trusted Platform Module (version 1 or 2).
- A **speaker** header for the internal beep speaker.

The board itself is usually **labelled** next to each header, which is what makes
matching a case's tangle of little plugs to the right pins manageable: find the
printed label for power, reset, the LEDs and so on, and connect each lead there.

```
Front-panel header (generic, illustrative only):

  +----+----+----+----+----+
  | PWR| PWR| HDD| PWR| SPK|   top row
  | SW+| SW-| LED| LED| ... |
  +----+----+----+----+----+
  | RST| RST|    | GND|     |   bottom row
  | SW | SW |    |    |     |
  +----+----+----+----+----+
   Layout and labels DIFFER by board -- always follow the
   labels printed on the motherboard, never a remembered map.
```

> **Caution:** front-panel pinouts are not standardised across boards, so the
> diagram above is only illustrative. LEDs are polarised (they have a + and a
> -); if a light does not come on, try reversing that single connector. The
> switch connectors (power, reset) are not polarised.

## 5. The M.2 connector

The last connector is easy to miss because it is **small** — you have to look
closely to spot the **M.2** connector on a board. Set beside an M.2 drive (a
slim "stick" of flash), the slot is noticeably compact.

M.2 is pleasantly **modular** to fit: locate the M.2 slot, push the drive
straight into it, then **fasten it down** with the retaining screw to finish the
install. No data cable and no power cable — the single slot carries both.

> **Note (beyond this lesson):** M.2 is a *form factor*, not a single interface.
> An M.2 drive may speak **SATA** or **NVMe/PCIe** depending on the drive and
> slot, and the slot's **B-key / M-key** notch determines what fits and at what
> speed. That keying detail belongs with the Storage devices lesson (3.4);
> here, the point is simply how the connector looks and installs.

### 5.1 Worked example — powering and wiring a new build

You are finishing a desktop with a discrete graphics card.

1. **Main power:** seat the 24-pin connector, keys aligned, until the latch
   clicks. On this 24-pin board there is nothing to leave off.
2. **CPU power:** connect the separate 8-pin CPU (EPS) lead — remember, *not* the
   PCIe 8-pin.
3. **Graphics card:** the card's top edge has a single 8-pin socket, so run a
   PCIe 8-pin (150 W) feed to it; use the 6+2 cable's full eight pins.
4. **Storage:** L-shaped SATA data lead from board to drive, plus the drive's
   separate SATA power lead.
5. **Front panel:** read the board's printed labels and push the power switch,
   reset switch, power LED and HDD LED leads onto their pins — reverse an LED if
   it fails to light.
6. **M.2:** slot the boot SSD into the M.2 connector and fasten its screw.

The theme throughout: match keying and labels, and never force a connector that
resists — a connector that will not seat is usually the wrong one or the wrong
way round.

## 6. Security perspective

Most of these connectors are benign, but two carry a real defender angle:

- **Internal headers are USB ports the policy often forgets.** A USB header is a
  genuine USB bus brought out on pins inside the case. Device-control and
  data-loss policies that block external USB frequently ignore internal headers,
  so an implant plugged onto one — or a rogue front-panel cable — sits on the
  bus, hidden behind the case panel, bypassing the external-port controls.
  Include internal USB when you reason about USB exposure, and treat an opened
  case as the event that matters.
- **The TPM is a security component on a connector.** A TPM stores keys and
  measurements behind Secure Boot and disk encryption (BitLocker). A *discrete*
  TPM on a header is physically removable and its bus is comparatively exposed,
  which is the basis of TPM-sniffing and swap attacks; a firmware TPM avoids the
  header but has its own trade-offs. Either way, physical case access is what
  the attack needs, so the lock on the chassis is part of the crypto's threat
  model.

The eSATA point from the storage lessons still applies: an external SATA port is
raw disk access outside the case and is easy to miss in a USB-focused
device-control policy.

## Summary

- **Main power:** one large keyed connector carrying **+3.3 V, +5 V, +12 V DC**;
  **20-pin** (older) or **24-pin** (newer), and a 24-pin cable fits a 20-pin
  board with four pins left off. A latch locks it.
- **Supplemental PCIe power:** for cards (usually GPUs) needing more than the
  slot provides — **6-pin = 75 W, 8-pin = 150 W**, both +12 V; often a **6+2**
  cable.
- **SATA:** **L-shaped, data only**; **eSATA** is the external variant, sometimes
  added on an expansion card.
- **Headers:** pins for the case's **power/reset buttons and LEDs**, **USB 2.0/
  3.0**, a **TPM**, and a speaker — follow the board's **printed labels**.
- **M.2:** a small slot; **push the drive in and screw it down** — no cables.

## Glossary

| Term | Meaning |
| --- | --- |
| Main power connector | The board's primary feed: 20-pin or 24-pin. |
| Rail | A supply voltage: +3.3 V, +5 V or +12 V DC. |
| Keying | Pin shapes that force a connector to mate one way only. |
| Latch | The clip that locks the main power connector in place. |
| PCIe power connector | Extra card power: 6-pin (75 W) or 8-pin (150 W). |
| 6+2 connector | An 8-pin PCIe plug whose two extra pins detach for 6-pin use. |
| EPS 8-pin | The separate CPU power connector (not the PCIe 8-pin). |
| SATA data connector | L-shaped, data-only drive interface on the board. |
| eSATA | External SATA, for drives outside the case. |
| eSATA expansion card | An add-in card adding external eSATA ports. |
| Header / pin header | A block of pins connecting case devices to the board. |
| Front-panel header | Pins for the case power/reset buttons and LEDs. |
| USB header | Internal connector bringing case USB ports to the board. |
| TPM | Trusted Platform Module; stores keys and boot measurements. |
| M.2 | A small, cable-free slot for an M.2 drive. |

## Review questions

1. Which three DC voltages does the main motherboard power connector supply?
2. How do the 20-pin and 24-pin main power connectors relate when the cable and
   board differ?
3. What stops the main power connector being plugged in the wrong way?
4. Why do some adapter cards need a supplemental PCIe power connector?
5. State the wattage of a PCIe 6-pin and a PCIe 8-pin connector.
6. What is a 6+2 PCIe power cable, and why is it useful?
7. Describe the SATA data connector's shape and what it carries.
8. What is eSATA, and give one way a board might provide it.
9. Name four things commonly connected to a motherboard's pin headers.
10. When wiring front-panel connectors, what should you rely on, and what do you
    do if a case LED will not light?
11. How do you install an M.2 drive, and what does the single slot carry?
12. Scenario: a build won't power on, and you find an 8-pin lead forced part-way
    into the CPU power socket. What likely went wrong?

## Answer key

1. **+3.3 V, +5 V and +12 V DC.** These feed the board and its components.
2. **A 24-pin cable fits a 20-pin board with the extra four pins left off (often
   a detachable 4-pin block on modular supplies).** They are designed to
   interoperate.
3. **Keying — the pins are shaped so it mates one way only, and a latch locks
   it.** Line the keys up and push home.
4. **The card draws more power than the motherboard can supply through the
   slot.** Graphics cards are the usual case.
5. **6-pin = 75 W, 8-pin = 150 W (both +12 V DC).** Pins scale with allowed
   power.
6. **An 8-pin plug whose two extra pins detach, so one cable serves a 6-pin or
   an 8-pin card.** Flexibility for different cards.
7. **An L-shaped connector carrying data only** — power comes on a separate SATA
   lead. Shape prevents mis-seating.
8. **External SATA for drives outside the case; via a back-panel port or an
   eSATA expansion card.** Same signal family, external connector.
9. **Power button, reset button, power/HDD LEDs, USB (2.0/3.0), TPM, speaker —
   any four.** All wire the case to the board.
10. **Rely on the board's printed labels; reverse the LED connector if it does
    not light (LEDs are polarised, switches are not).** Layouts differ per board.
11. **Push it into the M.2 slot and fasten the retaining screw; the slot carries
    both data and power.** No cables needed.
12. **An 8-pin PCIe (GPU) lead was forced into the 8-pin CPU (EPS) socket — they
    are keyed differently and not interchangeable.** Match the connector to its
    socket.
