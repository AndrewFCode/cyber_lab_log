---
title: "A+ Core 1 3.2: Video Cables — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: HDMI, DisplayPort and its locking connector, DVI variants and single/dual link, VGA, and video over USB-C."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "hdmi", "displayport", "dvi", "vga"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (Video Cables)**

> **Quick reference:** the short version of this lesson is the Video Cables cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It is the last of the objective 3.2 cabling lessons in this section, alongside network cables, 568A/568B, optical fibre and peripheral cables — this one covers what connects a computer to a display.

## Learning objectives

By the end of these notes you should be able to:

1. Describe HDMI, its connector and its practical maximum range.
2. Describe DisplayPort, its locking mechanism, and its compatibility with HDMI and DVI.
3. Explain the DVI variants — DVI-A, DVI-D, DVI-I — and single-link versus dual-link.
4. Describe VGA, its connector and its practical distance limit.
5. Compare all four standards on audio support, signal type and connector shape.
6. Explain how video signals can travel over a USB-C connector.
7. Diagnose a mismatched-cable or mismatched-connector video problem.

## 1. HDMI

### 1.1 What it is

**HDMI** — **High Definition Multimedia Interface** — is what you are probably using whenever you connect a computer, or almost any consumer electronics device, to a screen. It sends **audio and video together** over one digital connection, and it is one of the most common connector types on today's monitors and televisions.

### 1.2 The connector

The full-size HDMI connector is a **19-pin** connector known in the HDMI specification as **Type A**. Its shape is close to a rectangle, but the bottom two corners are subtly indented — enough that only an HDMI plug fits the socket, and nothing else can be mistakenly inserted.

### 1.3 Distance

The lesson gives roughly **20 metres** as the practical range before signal loss starts to show as blockiness on the screen.

> **Note (beyond this lesson):** cable-length guidance for HDMI varies quite a bit by source and by HDMI version, since a passive copper cable's real limit depends on build quality, the resolution and refresh rate being sent, and how demanding the HDMI version is. Figures commonly cited for standard passive cables range from around 15 to 25 metres before quality degrades noticeably, with newer high-bandwidth standards (HDMI 2.1 at high resolutions) tolerating shorter passive runs than that. Treat 20 m as a reasonable rule-of-thumb rather than a fixed specification number, and go active or optical for anything longer or more demanding.

## 2. DisplayPort

### 2.1 What it is

**DisplayPort** is another connection that sends audio and video together. It was one of the first display connections to send that information **packetised** — broken into data packets in a way conceptually similar to how information travels over an Ethernet network, rather than as a continuous analogue or fixed-format digital stream.

### 2.2 Compatibility with HDMI and DVI

DisplayPort has a degree of built-in compatibility with the older standards. A **passive adapter** can convert DisplayPort to HDMI or DisplayPort to DVI.

> **Caution:** that compatibility only works in the direction DisplayPort supports it. A DisplayPort output that includes **DP++** (Dual-Mode DisplayPort) can drive an HDMI or DVI display through a cheap passive adapter, because the port switches to sending an HDMI/DVI-compatible signal directly. A plain DisplayPort output without DP++ needs an **active** adapter, which converts the signal electrically rather than simply reshaping the connector. Check for the DP++ logo before assuming a passive adapter will work.

### 2.3 Sizes

Some devices use the smaller **Mini DisplayPort**, but on desktop computers and dedicated video cards you will normally find the **full-size** DisplayPort connector.

### 2.4 The locking connector

DisplayPort has small **locks along the top of the connector**, and plugging it in generally clicks it into place so it cannot be pulled out accidentally. A **button** — along the top or the sides, depending on the implementation — releases the lock so the cable can be removed.

> **Exam tip:** "a video cable won't come out of the computer" is a classic scenario question, and the answer is almost always **DisplayPort** — press the release button before pulling.

### 2.5 Telling DisplayPort and HDMI apart

DisplayPort and HDMI connectors are similar in overall size, but their shapes differ enough that you cannot plug one into the other's socket by mistake. DisplayPort's rectangle has one corner **slightly slanted**; HDMI's has the two bottom corners indented in the way described above. Each shape only accepts its own plug.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   HDMI (Type A)                                                              |
|     Rectangle with BOTH bottom corners indented inward                       |
|                                                                              |
|   DisplayPort                                                                |
|     Rectangle with ONE top corner slanted off, plus small locking tabs       |
|                                                                              |
|   Similar overall size, different enough that neither plug fits the          |
|   other's socket                                                             |
|                                                                              |
+------------------------------------------------------------------------------+
```

## 3. DVI

### 3.1 One connector, several types

**DVI** — **Digital Visual Interface** — is a standard you will still meet on older systems. Its main complication is that "DVI" is not one connector: there are several variants, including **DVI-A**, **DVI-D single link**, **DVI-D dual link**, and further combinations.

### 3.2 Single link versus dual link

A **dual-link** connection roughly doubles the throughput of a **single-link** connection, by using a second set of transmission pairs alongside the first.

Single-link DVI transmits at approximately **3.96 gigabits per second** and supports resolutions up to **1920 × 1200**.

> **Caution:** the transcript gives single link as approximately 3.7 Gbps. The commonly cited figure is **3.96 Gbps** (a 165 MHz pixel clock, with the 8b/10b encoding overhead removed) — close to what was said, but worth the precise number for the exam. The 1920 × 1200 resolution figure is exactly right.

### 3.3 Video only

Unlike HDMI and DisplayPort, DVI carries **video only** — there is no audio channel on a DVI connection.

### 3.4 The DVI variants

| Variant | Signal | Notes |
|---|---|---|
| **DVI-A** | Analogue only | Backwards-compatible with VGA |
| **DVI-D** | Digital only | Single link or dual link |
| **DVI-I** | Digital **and** analogue ("integrated") | Carries both signal types on one connector |

> **Exam tip:** the letter tells you the signal type — **A**nalogue, **D**igital, **I**ntegrated (both). Pair that with single-link/dual-link for the digital variants and you have the whole family.

> **Caution:** the connectors are physically different, and a cable's pin layout has to match the port. A DVI-I plug will not fit a DVI-D-only socket, because DVI-I carries extra analogue pins the DVI-D socket has no slots for. Always check both ends of the connection — the port on the computer or video card, and the connector on the cable — before assuming they will mate.

### 3.5 Worked example — matching cable to port

**Scenario:** you have a DVI-D dual-link cable and a graphics card with a DVI-I single-link port.

1. **Check the signal type.** Both are digital, so that part is compatible.
2. **Check the pin count and shape.** Dual-link needs the extra pins a single-link port does not have — the plug will not physically fit.
3. **Result:** this pairing does not work, regardless of resolution needs.
4. **The fix:** use a single-link cable that matches the port, or use a different port on the card if one supports dual-link.
5. **General rule:** match signal type (A/D/I) and link type (single/dual) at both ends before worrying about anything else.

## 4. VGA

### 4.1 What it is

Legacy equipment commonly uses **VGA** — the **Video Graphics Array** standard.

### 4.2 The connector

VGA uses the **DB-15** connector: 15 pins, in the D-shaped shell family. As with the DB-9/DE-9 naming seen in the peripheral cables lesson, this connector's shell size technically makes it a **DE-15**, though **DB-15** is the name in everyday use.

VGA connectors are conventionally **blue**, part of a set of standardised connector colours from the **PC System Design Guide**.

### 4.3 Video only, and analogue

Like DVI, VGA carries **video only** — no audio. VGA is an **analogue** signal, and because of that, the signal starts to **degrade** past a certain cable length — the lesson puts this at around **five metres**.

> **Note (beyond this lesson):** five metres is a conservative figure. In practice, VGA can often run considerably further than that — commonly cited guidance allows for longer runs, with quality dropping progressively rather than failing outright at a hard cutoff, and the acceptable length depends heavily on the resolution and refresh rate being driven. Higher resolutions show degradation sooner. Treat "five metres or so" as where you should start being cautious about analogue signal quality, not as an absolute limit.

### 4.4 Telling the three apart

The lesson makes a practical point worth remembering: despite there being several video standards to learn, **VGA, DVI and HDMI have distinctly different connector shapes**, so identifying which port or cable you are looking at on the back of a motherboard is usually straightforward.

## 5. Video over USB-C

### 5.1 One connector, many signals

As established in the peripheral cables lesson, **USB-C is a connector type**, and a variety of different signals can travel across a cable that terminates in a USB-C plug. This lesson adds the video-specific examples: alongside USB data and power, a USB-C cable can carry **Thunderbolt** data, **DisplayPort**, **HDMI**, and a mobile-device standard called **MHL** (**Mobile High-definition Link**).

### 5.2 What this means in practice

A single USB-C port on a modern device may be capable of several of these signal types at once, or none of them beyond plain USB — it depends entirely on what the device's hardware supports. Getting video out of a USB-C port depends on having **both** the right port capability and the right cable.

> **Caution:** this is the same warning from the peripheral cables lesson, applied specifically to video: a USB-C cable that charges a laptop fine may carry no video signal at all. Video over USB-C generally means **DisplayPort Alt Mode** (the port directly carries a DisplayPort signal) is present on that specific port, and the cable supports it.

### 5.3 Worked example — choosing a USB-C dock

**Scenario:** a user needs one USB-C cable to drive an external monitor and charge their laptop.

1. **Confirm the laptop's port supports DisplayPort Alt Mode** (or Thunderbolt, which also carries DisplayPort). Not every USB-C port does — check the manufacturer's documentation for the marked port.
2. **Confirm the monitor's input.** If it only has HDMI or DVI, you additionally need a dock or adapter that converts the DisplayPort-over-USB-C signal to that connector.
3. **Choose a cable rated for the job** — USB-C cables vary in what they carry, exactly as covered in the peripheral cables lesson.
4. **Check power delivery separately from video.** The two are independent capabilities that happen to share the connector.
5. **If any part of the chain lacks the capability** — port, cable, or dock — video will not appear even though everything is physically connected.

## 6. Security perspective

Video cabling is not usually thought of as a security topic, but a few points carry real weight.

- **Video signals disclose information as directly as a screen does.** A tapped HDMI or DisplayPort link, an inline capture device, or a compromised dock can capture exactly what is displayed — including one-time passcodes, confidential documents and video calls — without touching the endpoint's operating system at all.
- **USB-C's multi-signal nature widens the attack surface.** A malicious "charging" cable or dock can present itself as a legitimate video and data path while also carrying a data-capable connection back to the host. Treat unfamiliar USB-C docks, cables and adapters with the same suspicion as any other unknown peripheral.
- **DisplayPort's locking connector is a minor physical-security plus.** It resists an accidental (or casual) disconnection of a monitor feeding a shared or public display, though it is not a substitute for proper physical access control.
- **Adapters and converters are active devices in the path.** A DisplayPort-to-HDMI or USB-C-to-video adapter can, in principle, be a point of interception, particularly in shared equipment pools, conference rooms and hot-desking setups. Source them from trusted supply, the same as any other in-line hardware.
- **Legacy analogue links (VGA) are easier to intercept passively** than modern digital, encrypted display links. Where content sensitivity genuinely matters, prefer a modern digital connection with content protection over an analogue one.
- **A cable that "just doesn't work" deserves a second look, not just a swap.** Distinguishing a faulty cable from a deliberately substituted one is difficult by eye; where video equipment is exposed to public or semi-public access, periodic physical inspection of cabling is a reasonable control.

## Summary

- **HDMI** sends audio and video together over a **19-pin Type A** connector, with a practical range of roughly 20 m.
- **DisplayPort** also carries audio and video, sends it **packetised**, offers passive adapters to HDMI/DVI where DP++ is present, comes in full-size and **Mini** variants, and **locks in place** — release the button before disconnecting.
- **DVI** carries **video only**. Variants are **DVI-A** (analogue, VGA-compatible), **DVI-D** (digital), and **DVI-I** (both). **Single-link** runs about 3.96 Gbps to 1920 × 1200; **dual-link** roughly doubles that.
- **VGA** carries **video only**, is **analogue**, uses the blue **DB-15 (DE-15)** connector, and starts to degrade at longer cable lengths — the lesson's figure is around 5 m.
- HDMI, DisplayPort, DVI and VGA all have **distinctly shaped connectors**, so misidentifying a port is uncommon.
- **USB-C** is a connector, not a signal — it can carry USB data, Thunderbolt, DisplayPort, HDMI or MHL depending entirely on the port and cable's actual capability.

## Glossary

| Term | Meaning |
|---|---|
| HDMI | High Definition Multimedia Interface; combined digital audio and video |
| Type A | The 19-pin standard HDMI connector |
| DisplayPort | Packetised digital audio/video standard with a locking connector |
| DP++ | Dual-Mode DisplayPort; enables passive adapters to HDMI/DVI |
| Mini DisplayPort | The smaller DisplayPort connector variant |
| DVI | Digital Visual Interface; video-only standard with several variants |
| DVI-A | Analogue-only DVI, backwards-compatible with VGA |
| DVI-D | Digital-only DVI |
| DVI-I | Integrated DVI carrying both digital and analogue signals |
| Single link | The base DVI throughput, about 3.96 Gbps |
| Dual link | Roughly double single link's throughput, using extra pairs |
| VGA | Video Graphics Array; legacy analogue video standard |
| DB-15 / DE-15 | The 15-pin VGA connector; properly DE-15 by shell size |
| PC System Design Guide | The source of VGA's standardised blue connector colour |
| USB-C | A reversible connector able to carry many different signal types |
| MHL | Mobile High-definition Link; a mobile-device video standard over USB |
| DisplayPort Alt Mode | DisplayPort signalling carried directly over a USB-C port |

## Review questions

1. What does HDMI stand for, and what two things does it send together?
2. What connector type and pin count does standard HDMI use?
3. What is distinctive about how DisplayPort sends its data?
4. How can you convert DisplayPort to HDMI or DVI, and what determines whether that works passively?
5. What does the locking mechanism on a DisplayPort connector do, and how do you release it?
6. What does DVI stand for, and does it carry audio?
7. What do the letters A, D and I mean in DVI-A, DVI-D and DVI-I?
8. Roughly what throughput and resolution does single-link DVI support, and how does dual-link compare?
9. What does VGA stand for, and what colour is its connector conventionally?
10. Is VGA digital or analogue, and what practical consequence does that have?
11. Why is a DE-15 commonly called a DB-15?
12. Name three different signal types that can travel over a USB-C connector.
13. **Scenario:** a monitor cable will not unplug from a desktop computer no matter how hard you pull. What connector is it, and what should you do?
14. **Scenario:** you need to connect a DVI-D dual-link cable to a graphics card with only a DVI-D single-link port. Will it work, and why?
15. **Scenario:** a USB-C cable charges a laptop but the connected monitor shows nothing. What is the most likely explanation?
16. **Scenario:** you need to run a video signal about 40 m from a control room to a lobby display. Which of HDMI, DisplayPort, DVI or VGA is best suited, and what would you need beyond a standard passive cable?

## Answer key

1. **High Definition Multimedia Interface. Audio and video together, over one connection.**
2. **A 19-pin Type A connector.**
3. **It sends audio and video in packetised form,** similar in concept to how data travels over an Ethernet network.
4. **With a passive adapter,** which works when the DisplayPort output supports **DP++** (Dual-Mode DisplayPort); otherwise an active adapter is needed.
5. **It locks the connector in place so it cannot be pulled out accidentally;** press the release button (top or side of the connector) to disconnect it.
6. **Digital Visual Interface.** **No** — DVI carries video only.
7. **A = Analogue, D = Digital, I = Integrated** (both digital and analogue on one connector).
8. **Single-link: about 3.96 Gbps, up to 1920 × 1200.** **Dual-link roughly doubles that throughput** using a second set of transmission pairs.
9. **Video Graphics Array.** Its connector is conventionally **blue**.
10. **Analogue.** Signal quality **degrades with cable length**, becoming noticeable at longer runs (the lesson cites around 5 m as a caution point).
11. **The 15-pin connector uses the smaller E-size shell,** making it technically a DE-15, but the DB name is the one in common use.
12. **Any three of:** USB data, power, serial data, Thunderbolt, DisplayPort, HDMI, MHL.
13. **DisplayPort.** Locate and press the **release button** before pulling the connector out.
14. **No.** Dual-link needs the extra pins a single-link port physically lacks, so the connector will not fit, regardless of both being digital.
15. **The cable (or port) does not carry a video signal.** USB-C is a connector, not a guarantee of capability — charging works independently of video support.
16. **DisplayPort or HDMI, over an active or optical cable rather than plain passive copper** — 40 m exceeds the practical range of a standard passive HDMI or DisplayPort cable, and VGA's analogue signal would degrade badly over that distance; DVI is not designed for long runs either.
