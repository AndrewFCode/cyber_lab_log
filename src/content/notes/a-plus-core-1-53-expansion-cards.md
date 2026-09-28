---
title: "A+ Core 1 3.5: Expansion Cards — Class Notes"
description: "Full class notes for A+ Core 1 3.5: sound cards, discrete GPUs, capture cards, NICs, and driver install best practice."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "expansion-cards", "gpu", "capture-card", "nic", "drivers"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> ninth lesson under objective **3.5**, and the direct companion to the
> Motherboard expansion slots lesson: that one covered the PCI/PCIe **slots**,
> this one covers the **cards** that go in them and the drivers that run them.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what an expansion card is and why computers are built to take them.
2. Describe the common card types — sound, discrete graphics, capture and
   network — and what each adds.
3. Distinguish integrated from discrete graphics.
4. Research the right card for a system.
5. Install a card's driver correctly and verify it.

## 1. Modularity and expansion cards

Modern computers are deliberately **modular**: you can extend what a machine does
by adding hardware to the motherboard. The vehicle for that is the **expansion
card** — a card that provides functionality **not already on the motherboard**.
That lets a manufacturer ship a **generic board** which you then customise into
exactly the machine you need.

These cards are designed to be **end-user installable** — no trip back to the
manufacturer. Open the case, seat the card in an open slot, and power on; **most
of the time the operating system detects the card, installs the right driver
automatically, and the hardware is ready to use**.

```
Expansion cards add function a board lacks:

  Sound card   -> better audio in/out (multi-channel, digital)
  Discrete GPU -> high-end graphics (its own GPU + memory)
  Capture card -> video INPUT (HDMI / SDI), high throughput
  NIC          -> wired Ethernet (single or multi-port)

  All seat in a PCIe slot; then load the correct driver.
```

## 2. Sound cards

A **sound card** adds audio well beyond what a motherboard's built-in audio
offers. That can mean **specialised hardware for higher-quality audio**, or extra
outputs — enough to drive a **home theatre** with multiple speakers and a
subwoofer.

Sound cards handle **input** too: you might plug in several audio sources,
**musical instruments**, or **multiple microphones**. A typical card exposes a
mix of connectors — left/right channel outputs, a headphone jack, a line input,
and a **digital audio output** — supporting several inputs, outputs and formats.

> **Note (beyond this lesson):** the digital audio output is usually **S/PDIF**
> (optical TOSLINK or coaxial), and higher-end cards drive **5.1/7.1** surround
> formats — which is the "multiple speakers and a subwoofer" the lesson
> describes.

## 3. Video adapters: integrated vs discrete

Many CPUs include an **integrated graphics** function built into the processor
itself (an iGPU). Its video connectors come straight off the motherboard — you
will often see **VGA, DVI and HDMI** ports wired directly to the board.

For heavy work — high-end graphics, video editing, gaming — you add a **discrete
graphics adapter**: a **GPU external to the CPU**, on its own card, bringing its
**own processing power and memory** for the most demanding graphics. The card
plugs into the motherboard and carries **its own video outputs** on the card
itself.

> **Note (beyond this lesson):** a discrete GPU seats in a **PCIe x16** slot and,
> if power-hungry, takes a **supplemental PCIe 6/8-pin power** feed — the slots
> and connectors from the Motherboard expansion slots and Motherboard
> connections lessons. Its outputs on the card are how you tell "the graphics
> ports low on the back panel" (motherboard iGPU) from "the ports on the card"
> (discrete GPU).

## 4. Capture cards

A discrete GPU is built to **output** video. Sometimes you need the opposite —
video **into** the computer — and that is a **capture card**. The source might be
a **camera** or even **other computers** fed in as video.

Video is a lot of data, so capture cards run at **high throughput** and connect
**directly to the PCI Express bus**. A typical card accepts input over **HDMI**
and **SDI** — SDI being a **serialised** form of video input.

> **Note (beyond this lesson):** **SDI** is the **Serial Digital Interface**, a
> broadcast-grade standard (SMPTE) carried over coax with BNC connectors — which
> is why you meet it on capture hardware rather than on consumer displays.

## 5. Network interface cards (NICs)

Even where networks are usually wireless, you sometimes need a **wired Ethernet**
connection — and a motherboard may have **no Ethernet jack**, or its built-in one
may have **failed**. In either case you fit a separate **network interface card
(NIC)**. You would also add a NIC for a **server**, a **security device**, or
anything else that needs **multiple Ethernet connections**.

Installing a NIC is exactly like any other card: find an open slot, seat the
card, restart, and install the driver. For a server needing several connections,
a **multi-port Ethernet card** packs, for example, **four Ethernet ports into one
slot**.

## 6. Choosing the right card

Before buying, check several sources so the card actually fits and works:

- **Your motherboard documentation** — confirm you have the right number and
  type of interfaces (the right slot free).
- **The card manufacturer** — the minimum hardware and software requirements.
- **The manufacturer's knowledge base** — for issues you might not have
  considered.
- **Other users** of the same card — real-world experience.

## 7. Installing drivers

Driver order is not universal, so **read the card's documentation first**:

- **Some cards want the driver installed before the hardware; others after.**
  The documentation tells you which — check it **before** you power up.
- **Often the driver installs automatically** once the hardware is in, but
  confirm that against the docs rather than assuming.
- **Get the latest driver** from the manufacturer's website. If you are replacing
  an older version, you may need to **manually uninstall the old driver first**.
- The mechanism varies: sometimes it is the **Windows front end**, sometimes the
  manufacturer's **own installer**.
- Use **Windows Device Manager** to install a driver and to **check its status**
  once booted — you can view the driver details and confirm it is working with
  the new hardware.

```
Installing a new card's driver:

  Read the card's documentation
        |
        v
  Driver BEFORE hardware?  --yes--> install driver, then card
        | no
        v
  Install card, then driver (often automatic)
        |
        v
  Get the LATEST driver from the maker's website
  (uninstall the old version first if replacing)
        |
        v
  Confirm status in Device Manager
```

> **Note (beyond this lesson):** in Device Manager a **yellow "!"** flags a device
> with a driver problem, and **Roll Back Driver** reverts a bad update to the
> previous version — the safety net when a new driver misbehaves.

### 7.1 Worked example — adding a discrete GPU

A user wants a graphics card for video editing.

1. **Research:** confirm a free **PCIe x16** slot in the motherboard docs, check
   the card's power requirement, and confirm the PSU has the needed **6/8-pin
   PCIe** connectors.
2. **Read the card's install guide** for driver order.
3. **Fit the card** in the x16 slot, screw the bracket, connect supplemental
   power.
4. **Driver:** let Windows install it, then fetch the **latest** version from the
   maker's site (uninstalling the old one if the machine had a prior GPU driver).
5. **Verify** in Device Manager that the GPU is present and the driver reports it
   is working; use the card's own outputs for the display.

The pattern generalises to any card: research the slot and requirements, follow
the documented driver order, get the latest driver, and confirm in Device
Manager.

## 8. Security perspective

Expansion cards look benign, but two of their properties carry real risk:

- **Drivers run in the kernel, so the driver is the threat, not just the card.**
  A device driver executes with the highest privilege on the machine, which means
  a **malicious or vulnerable driver is a full-system compromise** — the basis of
  "bring your own vulnerable driver" (BYOVD) attacks, where a legitimately signed
  but flawed driver is loaded to get into the kernel. The defensive habits from
  this lesson are exactly right: install drivers **only from the manufacturer's
  official site**, prefer **signed** drivers, and **avoid third-party "driver
  updater" utilities**, which are a well-known malware and unwanted-software
  vector. Keep drivers patched, because driver vulnerabilities are patched like
  any other.
- **Any card is on the PCIe bus — and some cards are network paths.** As with the
  expansion-slots lesson, a card sits on the system bus with potential **DMA**
  access to memory, so account for every installed card. A **NIC** adds a
  specific twist: it is another way onto (or off) the network. A second NIC can
  **bridge two networks** and defeat segmentation, a NIC in promiscuous mode can
  **sniff** traffic, and a capture card likewise ingests external signals. Treat
  an added or unexpected NIC as a network-topology change to review, and use
  **Device Manager** to spot devices that should not be there.

## Summary

- **Expansion cards** add functionality a motherboard lacks, are **user
  installable**, and are usually **auto-detected with drivers installed** by the
  OS.
- **Sound card:** better audio, multi-channel output (home theatre/subwoofer),
  multiple inputs (instruments, mics), plus line-in, headphone and **digital
  audio** out.
- **Graphics:** **integrated** (in the CPU, ports on the motherboard) vs
  **discrete** (a separate GPU card with its **own processor, memory and
  outputs**) for high-end work.
- **Capture card:** video **input** (camera, other computers), **high
  throughput**, on the **PCIe bus**, via **HDMI/SDI**.
- **NIC:** wired Ethernet when the board's is missing/failed, or for
  servers/security/multiple links; **multi-port** cards give several ports in one
  slot.
- **Choosing:** check motherboard docs, the maker's requirements and knowledge
  base, and other users.
- **Drivers:** follow the documented **before/after** order, prefer the
  **latest** version (uninstall the old first), and verify in **Device Manager**.

## Glossary

| Term | Meaning |
| --- | --- |
| Expansion card | A card adding functionality not on the motherboard. |
| Modular | Built so hardware can be added/changed by the user. |
| Sound card | Card for higher-quality/multi-channel audio in and out. |
| Digital audio out | S/PDIF output on a sound card (beyond this lesson). |
| Integrated graphics | A GPU built into the CPU; ports on the motherboard. |
| Discrete graphics / GPU | A separate graphics card with its own GPU and memory. |
| Capture card | Card that brings video input into the computer. |
| SDI | Serial Digital Interface; serialised (broadcast) video input. |
| Throughput | The data rate a card/bus can move. |
| NIC | Network interface card; adds a wired Ethernet connection. |
| Multi-port NIC | One card providing several Ethernet ports. |
| Driver | Software letting the OS use a piece of hardware. |
| Device Manager | Windows tool to install drivers and check device status. |
| Roll Back Driver | Device Manager option reverting to a prior driver. |
| Knowledge base | A manufacturer's searchable support articles. |

## Review questions

1. What is an expansion card, and why are computers built to take them?
2. What usually happens when you install a card and power the system on?
3. Give two output and two input capabilities of a sound card.
4. Distinguish integrated graphics from a discrete graphics adapter.
5. Where do an integrated GPU's video connectors appear, versus a discrete GPU's?
6. What does a capture card do, and why is it connected to the PCIe bus?
7. What two input types did the example capture card support, and what is SDI?
8. Name three situations where you'd add a NIC.
9. What does a multi-port NIC provide?
10. List three sources to check when choosing an adapter card.
11. Describe the correct approach to installing a card's driver.
12. Which Windows tool confirms a driver is working, and what else can it do?
13. Scenario: a new GPU shows a yellow "!" in Device Manager after install. Give
    two things to try.
14. Scenario: why should you avoid a third-party "driver updater" tool and get
    drivers from the manufacturer instead?

## Answer key

1. **A card that adds functionality not on the motherboard, so a generic board
   can be customised.** Modularity by design.
2. **The OS usually detects it, installs the correct driver automatically, and it
   is ready to use.** Plug-and-play in most cases.
3. **Output: multi-channel/home-theatre, digital audio, line/headphone; input:
   line-in, microphones, instruments — any two of each.** Better audio both ways.
4. **Integrated graphics are built into the CPU; a discrete adapter is a separate
   card with its own GPU and memory for high-end work.** In-CPU vs separate card.
5. **Integrated: on the motherboard back panel (VGA/DVI/HDMI); discrete: on the
   card itself.** The output location tells them apart.
6. **It brings video input into the computer; video is high-bandwidth, so it uses
   the fast PCIe bus.** Throughput drives the connection.
7. **HDMI and SDI; SDI is the Serial Digital Interface, a serialised (broadcast)
   video input.** Two input formats.
8. **No/failed motherboard Ethernet, a server, or a security device / any need for
   multiple Ethernet connections — any three.** When wired networking is needed.
9. **Several Ethernet ports (e.g. four) from a single expansion slot.** Many links,
   one slot.
10. **Motherboard documentation, the card maker's requirements, its knowledge
    base, and other users — any three.** Confirm fit and support.
11. **Read the docs for before/after order, prefer the latest driver (uninstalling
    the old first), then verify in Device Manager.** Order and currency matter.
12. **Device Manager — it confirms status/details and can install drivers and roll
    back a bad one.** Install and diagnose.
13. **Reinstall/update with the latest driver from the maker, or roll back /
    reseat the card — any two.** The "!" means a driver problem.
14. **Drivers run in the kernel, so a trojanised or bundled driver is a full
    compromise; the manufacturer's signed driver is the trustworthy source.**
    Third-party updaters are a malware vector.
