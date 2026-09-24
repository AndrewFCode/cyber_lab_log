---
title: "A+ Core 1 3.2: 568A and 568B Colours — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: ANSI/TIA-568 and ISO/IEC 11801, the T568A and T568B pinouts, what differs between them, and wiring keystone jacks."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "t568a", "t568b", "rj45"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (568A and 568B Colours)**

> **Quick reference:** the short version of this lesson is the 568A and 568B Colours cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It is the companion to the Network Cables lesson in the same section — that one covers what is inside the cable, this one covers which wire goes on which pin. The crimpers, punch-down tools and cable testers used to do the work are in the network tools lesson in [section 2](/cyber_lab_log/resources/a-plus-core-1/2/).

## Learning objectives

By the end of these notes you should be able to:

1. Name the standards bodies and documents that define structured cabling and the colour schemes.
2. Write out the T568A and T568B pinouts from memory.
3. State exactly which pins differ between the two, and which are identical.
4. Identify which standard a finished cable was crimped to by looking at it.
5. Explain why you should not mix the two standards on one cable.
6. Describe the sequence for crimping an RJ45 connector correctly first time.
7. Wire a keystone jack from its printed colour guide, and explain why the jack's own layout does not match the pinout.

## 1. Why there is a standard

### 1.1 The standards bodies

Ethernet wiring is standardised well beyond any one country's borders.

| Body | Document | Covers |
|---|---|---|
| ISO/IEC | **ISO/IEC 11801** | The international cabling standard, defining classes of cabling |
| TIA (Telecommunications Industry Association, US) | **ANSI/TIA-568** | The installation of cabling in commercial buildings |

Inside ANSI/TIA-568 is the part that concerns this lesson: which wire goes on which pin, with which connector, for an Ethernet network. Those pin-and-colour assignments are the **T568A** and **T568B** colour schemes.

### 1.2 What the standard buys you

The point of a standard is that you can walk into any building anywhere and find the same colours in the same places. That helps twice over:

- **During installation** — everyone terminating cable works to the same pattern, so the work is consistent and can be divided up.
- **During troubleshooting** — you can pick up an unfamiliar cable and immediately tell whether it is wired correctly, rather than guessing at whoever made it.

Both schemes use the same **RJ45** connector. The only difference is which colour sits on which pin.

## 2. The two schemes

### 2.1 T568A

| Pin | Wire |
|---|---|
| 1 | White/green |
| 2 | Green |
| 3 | White/orange |
| 4 | Blue |
| 5 | White/blue |
| 6 | Orange |
| 7 | White/brown |
| 8 | Brown |

### 2.2 T568B

| Pin | Wire |
|---|---|
| 1 | White/orange |
| 2 | Orange |
| 3 | White/green |
| 4 | Blue |
| 5 | White/blue |
| 6 | Green |
| 7 | White/brown |
| 8 | Brown |

### 2.3 What actually differs

This is the part worth memorising properly, because it is far less than it first appears. I compared the two pin by pin: **pins 4, 5, 7 and 8 are identical** — blue and white/blue in the middle, white/brown and brown at the end. Only **pins 1, 2, 3 and 6** differ, and they differ in a single, simple way: the **orange and green pairs swap places**.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Pin      1       2       3       4       5       6       7       8         |
|                                                                              |
|   T568A   W/Gn    Gn     W/Or     Bl     W/Bl    Or      W/Br    Br          |
|   T568B   W/Or    Or     W/Gn     Bl     W/Bl    Gn      W/Br    Br          |
|                                                                              |
|           ^^^^^^^^^^^^^^^^^^              ^^^                                |
|           orange and green swap        also swaps         identical          |
|                                                                              |
|   Learn this only: A starts GREEN, B starts ORANGE. Everything else follows. |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **Exam tip:** if you can remember **B: white/orange, orange, white/green, blue, white/blue, green, white/brown, brown**, you have both schemes. Swap every orange for green and every green for orange and you have T568A.

### 2.4 Which one is used

In the US, and in most places, **T568B is the common choice**. What matters more than which one is **consistency**: an organisation picks a standard and stays with it. It would be very unusual to start an installation with one scheme and change to the other partway through.

> **Note (beyond this lesson):** T568A is still specified in some contexts — notably some US federal and residential wiring requirements — and it has better backwards compatibility with older telephone wiring, where the blue and orange pairs sit on the middle pins. That is the historical reason two schemes exist at all. For the exam and for most commercial work, B is the answer you will meet.

### 2.5 Do not mix them

You should never put T568A on one end of a cable and T568B on the other. The lesson is blunt about this for a gigabit network, and warns that you will find material online claiming that an A-to-B cable is an Ethernet crossover cable.

> **Caution:** the online claim is half-right, and the distinction matters. An A-to-B cable swaps pins 1 and 2 with 3 and 6 — which **is** the classic crossover used by 10BASE-T and 100BASE-TX, where only those four pins carry data. **Gigabit uses all eight pins**, and a true gigabit crossover also swaps pins 4 and 5 with 7 and 8. An A-to-B cable does not do that, so it is not a gigabit crossover. The practical advice stands for a different reason too: virtually all modern equipment has **Auto-MDI-X**, which detects and corrects the crossover in hardware, so crossover cables are no longer needed. Wire both ends the same way.

### 2.6 Worked example — identifying a finished cable

**Scenario:** you find a patch cable in a drawer and need to know which scheme it was crimped to.

1. **Hold the connector with the clip away from you** and the pins facing you, so pin 1 is on the left. (Orientation is what people get wrong here — flipping the plug reverses the order.)
2. **Read the colours left to right.** Say the cable shows white/orange, orange, white/green, blue, white/blue, green, white/brown, brown.
3. **Check the middle and the end first.** Blue and white/blue on 4 and 5, white/brown and brown on 7 and 8 — both schemes agree, so these tell you nothing.
4. **Look at pin 1.** White/orange means **T568B**. White/green would mean T568A.
5. **Confirm the whole sequence** against the table rather than stopping at pin 1, in case the cable was made badly.
6. **Check the other end matches.** A cable is only correct if both ends use the same scheme.

## 3. Crimping in practice

### 3.1 It is easy to get wrong

Understanding the colour schemes matters for the exam, but it matters just as much on any network where you will be crimping or managing cable. The individual wires are fiddly, and they become more so at exactly the wrong moment — sliding eight of them into an RJ45 connector, in order, just before you crimp.

### 3.2 Check before you crimp

The crimp is permanent, so the useful habit is to **insert the wires into the connector and inspect them before squeezing**:

1. Strip the jacket and fan the four pairs out.
2. Untwist each pair only as far as necessary and arrange the eight wires in the order for your chosen scheme.
3. Trim the ends square so all eight reach the front of the connector together.
4. Slide them into the RJ45 and **look through the connector** at the colour order, exactly as you would when identifying a finished cable.
5. If anything is out of place, pull the wires out, rearrange, and reinsert. Nothing is lost at this stage.
6. Only when the order is right, crimp.
7. Test both ends with a cable tester — the continuity test in the network tools lesson exists precisely for this.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Looking into the RJ45 before crimping (clip away from you)                 |
|                                                                              |
|      +-------------------------------+                                       |
|      |  1  2  3  4  5  6  7  8       |   all eight wires fully forward,      |
|      |  |  |  |  |  |  |  |  |       |   touching the front of the plug      |
|      |  W  O  W  B  W  G  W  B       |                                       |
|      |  /     /     /     /          |   read the order, THEN crimp          |
|      |  O     G     B     B          |                                       |
|      +-------------------------------+                                       |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **In the real world:** two failures account for most bad home-made cables — a wire that did not reach the front of the connector (so its contact never pierces the copper) and a pair untwisted too far back. Both pass a visual glance and one of them passes a continuity test. Inspect, then test.

### 3.3 Worked example — a newly made cable fails its test

**Scenario:** you crimp a cable, and the tester lights pins 1, 2, 4, 5, 7 and 8 but never 3 or 6.

1. **Read what the tester is telling you.** Two pins are open — no continuity on those conductors.
2. **Identify which pair.** Pins 3 and 6 are the **green** pair in T568B (and the orange pair in T568A). One pair is not connected.
3. **Most likely cause:** those two wires did not reach the front of the connector before crimping, or were trimmed unevenly.
4. **Check both ends** — the fault is at whichever end the wires were short.
5. **The fix is a new connector.** A crimp cannot be undone; cut it off, re-strip and redo it.
6. **Note the impact if it had gone unnoticed:** 10/100 Ethernet uses pins 1, 2, 3 and 6, so this cable would not work at all — while a fault on pins 4, 5, 7 or 8 would work at 100 Mbps and fail only at gigabit, which is far harder to diagnose later.

## 4. Keystone jacks

### 4.1 Wiring from the printed guide

You will often be punching wires into a **keystone jack** rather than crimping a plug. Helpfully, jacks are printed with the colour scheme: typically the **A colours along one edge and the B colours along the other**. Choose your organisation's scheme, ignore the other row entirely, and punch each wire into the slot the guide shows.

Layouts vary. On one common style the wires are split, with four going into one side of the jack and four into the other. For T568A you would put green, white/green, blue and white/blue into the four positions on one side, and for T568B orange, white/orange, blue and white/blue — with the remaining four wires going into the other side under the same scheme.

### 4.2 Why the jack's order looks wrong

Here is the part that confuses people: **the colour order printed on the jack does not match the T568A or T568B pin order**. That is not an error. The printed layout is arranged to make the physical punching easier — the slots are placed where the wires naturally fall. Internally, the jack routes each contact to the correct pin position on the RJ45 interface.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Keystone jack                                                              |
|                                                                              |
|     A colours  ->  [ Gn ][ W/Gn ][ Bl ][ W/Bl ]    <- punch here             |
|     B colours  ->  [ Or ][ W/Or ][ Bl ][ W/Bl ]                              |
|                        |      |      |      |                                |
|                        +------+------+------+                                |
|                          internal routing                                    |
|                                 |                                            |
|                                 v                                            |
|                    correct pin order at the RJ45 socket                      |
|                                                                              |
|   Follow the printed guide. Do NOT try to punch in 1-8 pin order.            |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **Exam tip:** trust the label on the jack, not the pinout table, when punching down. The table is for connectors you crimp yourself; the jack has already done the translation.

### 4.3 Worked example — a mixed-standard wall run

**Scenario:** a wall socket was punched to T568A and the patch panel at the other end of the same run to T568B. Devices connect at 100 Mbps but gigabit links fail or fall back.

1. **Recognise the pattern.** A at one end and B at the other crosses pins 1 and 2 with 3 and 6 across the run.
2. **Why 100 Mbps still works:** that combination is the classic 10/100 crossover, and Auto-MDI-X on modern equipment corrects it automatically.
3. **Why gigabit misbehaves:** gigabit uses all four pairs, and this cable's pairs no longer land where the standard expects.
4. **Find out which standard the site uses** — the rest of the building will tell you, and you match it.
5. **Re-punch the non-conforming end** to that standard. Re-punching is quick; it is the same tool and the same wires.
6. **Test the run end to end** and record the standard used, so the next person does not repeat it.

## 5. Security perspective

A colour standard seems far removed from security, but consistent, documented cabling is a control in its own right.

- **Consistency makes anomalies visible.** If the whole site is T568B, a cable that is not raises a question — who made it, when, and why. In an environment where every cable looks arbitrary, an added or altered run attracts no attention at all.
- **Hand-made cables deserve scrutiny.** Anyone can make a cable, and a plug can be crimped onto a cable that has been cut and rejoined mid-run. Neat, standard, labelled terminations make an inserted device or splice easier to spot during inspection.
- **Bad terminations become intermittent faults, and intermittent faults erode trust in monitoring.** A pair untwisted too far or a wire not fully seated produces errors that come and go. Teams learn to ignore the alerts, which is exactly the condition an attacker benefits from.
- **Documentation is an incident response asset.** Knowing which standard, which panel position and which room each run belongs to turns "trace this cable" from an afternoon with a tone generator into a lookup. During an incident, that speed matters.
- **Unused, punched-down runs are live network access.** Every position wired to a patch panel is a potential entry point if it gets patched into a switch. Patch only what is in use, and keep the record current.
- **Test and certify what you install.** A cable tester proves the wiring matches the standard. Verification, rather than assuming the installer got it right, is the same principle that applies to any control.

## Summary

- **ISO/IEC 11801** is the international cabling standard; **ANSI/TIA-568** is the US commercial building standard that defines the **T568A** and **T568B** pin-and-colour schemes.
- A standard means consistent colours everywhere, which helps both installation and troubleshooting. Both schemes use the same **RJ45** connector.
- **T568A:** white/green, green, white/orange, blue, white/blue, orange, white/brown, brown.
- **T568B:** white/orange, orange, white/green, blue, white/blue, green, white/brown, brown.
- **Pins 4, 5, 7 and 8 are identical.** Only pins **1, 2, 3 and 6** differ — the orange and green pairs swap.
- **T568B is the common choice** in the US and most places. Whichever you use, be consistent across the whole installation.
- **Never wire A on one end and B on the other.** Wire both ends the same way.
- **Check the colour order through the connector before crimping** — it costs nothing to rearrange, and everything to re-do.
- **Keystone jacks** print both A and B colour guides, and their layout deliberately does not match the pin order. Follow the printed guide; the jack routes the contacts internally.

## Glossary

| Term | Meaning |
|---|---|
| ISO/IEC 11801 | The international standard defining classes of structured cabling |
| ANSI/TIA-568 | The US standard for cabling installation in commercial buildings |
| TIA | Telecommunications Industry Association |
| T568A | The pin-and-colour scheme starting white/green, green |
| T568B | The pin-and-colour scheme starting white/orange, orange; the common choice |
| RJ45 | The eight-pin modular connector used by both schemes |
| Pinout | Which conductor is assigned to which numbered pin |
| Pin 1 | The leftmost pin with the clip away from you and contacts facing you |
| Crimp | Pressing the connector permanently onto the cable |
| Keystone jack | A modular wall or panel socket that wires are punched down into |
| Punch down | Seating a wire into a jack or block with a punch-down tool |
| Patch panel | The panel of jacks where horizontal cable runs terminate |
| Crossover cable | A cable that swaps transmit and receive pairs between its ends |
| Auto-MDI-X | Equipment detecting and correcting a crossover automatically |
| Continuity test | Checking each pin connects to the matching pin at the other end |

## Review questions

1. Which two standards documents were named, and what does each cover?
2. Why does having a colour standard help with troubleshooting, not just installation?
3. Write out the T568A pinout.
4. Write out the T568B pinout.
5. Which pins are identical between the two schemes?
6. Which pins differ, and what is the difference in one sentence?
7. Which standard is commonly used in the US?
8. What should you do before crimping the connector down?
9. Why does the colour layout printed on a keystone jack not match the pinout?
10. A cable's first two wires are white/green and green. Which standard is it?
11. Why should you not use T568A on one end and T568B on the other?
12. What is Auto-MDI-X, and why does it matter here?
13. **Scenario:** a new cable tests with pins 3 and 6 open. What is the likely cause, which pair is affected in T568B, and what is the fix?
14. **Scenario:** a wall socket is punched to T568A and its patch panel end to T568B. Devices link at 100 Mbps but gigabit fails. Explain both halves of that behaviour.
15. **Scenario:** you are adding four new runs to a building where everything existing is T568B. Which scheme do you use, and why?
16. **Scenario:** a home-made cable works at 100 Mbps but never negotiates gigabit. Which pins would you suspect, and why is this harder to spot than a total failure?

## Answer key

1. **ISO/IEC 11801** — the international cabling standard defining classes of cabling. **ANSI/TIA-568** — the US standard for cabling installation in commercial buildings, which contains the T568A and T568B schemes.
2. **You can pick up any cable anywhere and immediately tell whether it is wired correctly,** rather than working out what the person who made it intended.
3. **White/green, green, white/orange, blue, white/blue, orange, white/brown, brown.**
4. **White/orange, orange, white/green, blue, white/blue, green, white/brown, brown.**
5. **Pins 4, 5, 7 and 8** — blue, white/blue, white/brown, brown.
6. **Pins 1, 2, 3 and 6.** The orange and green pairs swap places.
7. **T568B.**
8. **Insert the wires into the RJ45 and inspect the colour order through the connector,** rearranging if needed — the crimp cannot be undone.
9. **The printed layout is arranged to make punching down easier,** and the jack routes each contact internally to the correct RJ45 pin.
10. **T568A.**
11. **Because a cable should be wired the same at both ends.** Mixing them crosses pins 1 and 2 with 3 and 6, which is not a valid straight-through cable and is not a gigabit crossover either.
12. **Equipment detecting and correcting a crossover in hardware.** It means crossover cables are no longer needed, so there is no reason to mix the standards.
13. **Two wires most likely did not reach the front of the connector, or were trimmed unevenly.** In T568B pins 3 and 6 are the **green** pair. **Fix:** cut off the connector and re-terminate — a crimp cannot be undone.
14. **100 Mbps works** because 10/100 uses only pins 1, 2, 3 and 6, the A-to-B mismatch is the classic crossover, and **Auto-MDI-X** corrects it. **Gigabit fails** because it uses all four pairs and they no longer land where the standard expects.
15. **T568B** — match the existing installation. Consistency across a site is what makes cabling maintainable and anomalies visible.
16. **Pins 4, 5, 7 and 8** — the blue and brown pairs, unused by 10/100 but required by gigabit. It is harder to spot because the cable appears to work; the fault only shows as a failure to negotiate the higher speed.
