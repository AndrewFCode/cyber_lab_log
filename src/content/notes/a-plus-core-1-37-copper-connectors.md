---
title: "A+ Core 1 3.2: Copper Connectors — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: RJ11 and RJ45, F connectors and DOCSIS, punchdown blocks, USB and USB-C, Molex, Lightning, and DB-9/RS-232."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "rj11", "rj45", "connectors", "molex"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (Copper Connectors)**

> **Quick reference:** the short version of this lesson is the Copper Connectors cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It is a survey lesson across the whole of objective 3.2: several of these connectors — RJ45, USB, USB-C, DB-9/RS-232, punchdown blocks — are covered in more depth in the network cables, network tools, and peripheral cables lessons in this section. This lesson's own new ground is **RJ11/RJ14**, **F connectors**, and **Molex** and **Lightning** in more detail.

## Learning objectives

By the end of these notes you should be able to:

1. Describe an RJ11 connector, its pin/conductor count, and the related RJ14.
2. Compare RJ11 and RJ45 physically and explain the mis-insertion risk between them.
3. Describe an F connector, what it terminates, and where DOCSIS fits in.
4. Explain what a punchdown block is for and why it is fast and inexpensive.
5. Summarise the USB connector family and what USB-C changed.
6. Describe a Molex connector: its origin, pin count, voltages and typical use.
7. Describe the Lightning connector and why Apple introduced it.
8. Describe DB-9 and RS-232, and why they persist for console access.
9. Identify the right connector for a described device or symptom.

## 1. RJ11 (and RJ14)

### 1.1 What it is

**RJ11** is a small modular connector with **6 positions** and, in its common form, **2 conductors** — written **6P2C**. You will meet it on **analogue telephone** connections, and, more recently, on **DSL** (Digital Subscriber Line) connections, since DSL rides on the same telephone wiring.

### 1.2 RJ14

Sometimes the same 6-position body carries **4 conductors** rather than 2 — technically an **RJ14** (6P4C), typically used to carry two separate phone lines through one jack. In everyday use, though, people generally call all of these connectors "RJ11" regardless of how many conductors are actually populated, so the name is used loosely in practice.

> **Note (beyond this lesson):** RJ14's four conductors give it two independent pairs, commonly wired as line 1 on the centre pair and line 2 on the outer pair — which is how a single wall jack can serve two separate phone numbers.

### 1.3 RJ11 versus RJ45

**RJ45** is the larger modular connector most people associate with Ethernet: **8 positions, 8 conductors**, every one of them visibly present and countable in the connector. "**RJ**" stands for **Registered Jack**, and the "45" identifies this particular jack type in the registered jack numbering scheme.

RJ45 is often called "the Ethernet connector," but that is a simplification — it is also used for **serial connections** (as seen in the peripheral cables lesson's console-port discussion) and other purposes beyond networking.

### 1.4 The mis-insertion risk

RJ11 and RJ45 sit right next to each other on the back of many DSL modems, and RJ11 is **noticeably smaller** than RJ45. Reaching behind a device without looking makes it easy to push an RJ11 plug into an RJ45 socket by mistake. The reverse cannot happen — an RJ45 plug is physically too large to fit an RJ11 socket — but the RJ11-into-RJ45 direction is a genuine, common error.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   RJ11 (6P2C / 6P4C)              RJ45 (8P8C)                                |
|                                                                              |
|     narrower body                   wider body                               |
|     6 positions                     8 positions                              |
|     fits INTO an RJ45 socket        too large for an RJ11 socket             |
|     (loosely, off-centre)           will not fit at all                      |
|                                                                              |
|   Risk: RJ11 mistakenly plugged into an RJ45 port                            |
|   Not a risk in reverse: RJ45 simply does not fit an RJ11 port               |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **In the real world:** on a device with both connector types close together — a DSL modem is the classic example — always check by sight before plugging in from behind the unit by feel alone. A phone cable pushed into the Ethernet port produces a connection that looks seated but carries nothing useful.

## 2. F connectors

### 2.1 What it terminates

The **F connector** is the common coaxial connector used for **cable television** connections, and, by extension, **cable modem** connections — anywhere a cable provider's coax reaches into a building.

### 2.2 Physical design

An F connector typically has a **threaded** outer shell, screwed onto the mating connection so it resists being pulled out accidentally — you must unscrew it deliberately to remove it. At the very centre is a **single exposed copper conductor**, which is the actual signal path; the coax's own centre conductor is used directly as the connector's pin, rather than a separate pin being crimped on.

### 2.3 DOCSIS

A cable modem's specification sheet will typically reference **DOCSIS** — **Data Over Cable Service Interface Specification** — the standard governing how data is carried over the cable television infrastructure. The modem connects to the provider's cable network through the **F connector**, and DOCSIS is the standard that makes that data connection work.

> **Note (beyond this lesson):** this reinforces a point from the internet connection types lesson: an "LED monitor" is a marketing label describing the backlight, not the panel technology, and similarly "cable internet" describes the delivery infrastructure (coax, F connector, DOCSIS), which is distinct from the panel or connector type used on the customer's own equipment.

### 2.4 Male and female

On the back of a cable modem you will find a **female F connector**; the coax cable itself terminates in a **male F connector** that screws into it. This male/female, threaded arrangement is standard across F-connector cable television and cable modem installations.

## 3. Punchdown blocks

### 3.1 The problem they solve

In a building with hundreds or thousands of twisted-pair cables — a large comms room or a telecom closet — terminating every individual wire with its own crimped connector would be slow and costly. **Punchdown blocks** solve this: walls of blocks where wires are terminated quickly and cheaply.

### 3.2 Why they are fast and inexpensive

You simply **place the wire into the correct slot** on the block and use a **punchdown tool** to seat it — no individual connector to attach, no crimping. This is quick per-wire and needs comparatively little in the way of materials, which is why punchdown blocks are the standard approach wherever large volumes of cable need terminating.

### 3.3 How the connection is made

Inside the punchdown block, **metal contacts pierce the insulation** of each wire and make direct contact with the copper conductor beneath — the same **insulation displacement** principle used by an RJ45 crimp connector, applied at block scale. Look closely at a punched-down block and you can see the individual wire pairs from an unshielded twisted-pair cable, each punched down into its own position, eight wires per cable position.

Punchdown blocks come in more than one physical arrangement — some have wires running along the outside of the block with individual connectors punched down one at a time; others are laid out differently, but the underlying principle (insulation-piercing contact, fast tool-based termination) is the same throughout.

> **Note (beyond this lesson):** this lesson's punchdown coverage is intentionally brief; the network tools lesson in this section covers the **punchdown tool** itself, keeping the twists to the block, and the numbering and documentation practices that go with a punchdown installation.

## 4. USB

### 4.1 The family, briefly

**USB** — **Universal Serial Bus** — is covered in full detail in the peripheral cables lesson; this lesson's contribution is the same connector family viewed as part of the broader copper-connector landscape.

| USB generation | Connector types |
|---|---|
| USB 1.1 / 2.0 | Standard-A, Standard-B (square, for peripherals), Mini-B, Micro-B (mobile devices) |
| USB 3.0 | Standard-A (same size as before), Standard-B (updated), Micro-B (a different shape entirely) |

### 4.2 USB-C

Having accumulated so many different connector shapes across USB's history created real confusion, so the industry converged on one connector: **USB-C**. The key idea, restated from the peripheral cables lesson, is that **USB-C is a physical connector type**, not a signal — you can run USB data, **Thunderbolt**, **HDMI**, and other signal types across a cable that terminates in a USB-C plug.

## 5. Molex

### 5.1 What it is

An older-style desktop computer will often have a **4-pin power connector** supplying a number of internal peripherals. This is commonly called a **Molex connector**, after the **Molex Connector Company**, which manufactures it.

> **Caution:** strictly speaking, "Molex connector" is imprecise — the Molex Connector Company manufactures a very wide range of connector types, of which this 4-pin power connector is only one. In practice, "Molex" has become the everyday name for this specific connector, and that usage is universal enough to be understood without confusion — but it is worth knowing the name is a manufacturer's brand applied informally to one particular product, not a technical standard name in its own right.

### 5.2 Also called AMP Mate-n-Lok

The same connector is also referred to as an **AMP Mate-n-Lok** connector — a name from a different manufacturer (AMP) for a functionally similar or identical connector design. Both names circulate for the same physical connector in practice.

### 5.3 What it powers and its voltages

The Molex connector supplies power to internal components — **fans, storage drives**, and other peripherals inside the case — and commonly provides both **12-volt and 5-volt** power on the same connector.

### 5.4 How it connects

Molex connectors are **modular** and generally mate by simple **friction** — no locking latch to release, just enough grip to stay connected under normal handling, and pull-apart when you actually want to disconnect them. This makes them quick to connect and disconnect compared with connectors that need a latch released first.

You will find Molex connectors included among the various outputs on an older-style power supply, alongside the main motherboard power connector and other connector types the supply provides.

> **Exam tip:** know the two defining facts — **4 pins**, **12 V and 5 V**, powering fans and drives — and recognise both names, **Molex** and **AMP Mate-n-Lok**, for the same connector.

## 6. Lightning

### 6.1 What it is

**Lightning** is **Apple's proprietary** connector, used on **iPhones, iPads**, and similar Apple devices. Being proprietary, it appears **only on Apple products** — you will not find it on other manufacturers' hardware.

### 6.2 Why Apple introduced it

Lightning arrived at a time when **Micro-USB** was the common connector on mobile devices generally. Apple wanted two things Micro-USB of that era did not fully provide: **greater power delivery** capability for its phones and tablets, and a connector that could be **inserted either way round** and still work correctly — a reversible connector, well before USB-C brought that idea to the wider industry.

### 6.3 Its position today

The broader industry has moved towards **USB-C** as the standard connector, and Apple's own newer devices have followed that shift. Even so, you will still encounter **Lightning** on devices that predate that transition, so recognising the connector and knowing it is Apple-specific remains practically useful.

## 7. DB-9 and RS-232

### 7.1 Why it still matters

System administrators and network technicians still need **DB-9** connections to reach some **older switches, routers, firewalls** and similar infrastructure devices. These connections carry **serial communication** using the **RS-232** standard — **Recommended Standard 232**.

> **Caution:** the transcript places RS-232 as having been around "since about 1969." More precisely, RS-232 was **first introduced in 1960**, with the widely referenced **RS-232-C revision published in 1969** — which is likely the origin of that date. Either figure supports the underlying point: this is one of the oldest standards still in day-to-day IT use.

### 7.2 Before USB

Today, **USB** is the everyday standard for serial-style peripheral communication, but **before USB existed**, **RS-232 over DB-9** filled that role. Modems and mice, among other devices, commonly connected this way in that earlier period.

### 7.3 Why technicians still carry one

The reason a DB-9 (or an adapter to reach one) still belongs in a technician's bag is **console access**: many switches, routers and other infrastructure devices still use this connector type — or expect this kind of connection — as their **console port**. When you need to connect directly to such a device and configure it at a **command prompt**, the serial connection, often via DB-9, is frequently the way in — precisely because, as covered in the peripheral cables lesson, it works even when the device's normal network interfaces do not.

## 8. Choosing the right connector

| You need to... | Reach for |
|---|---|
| Connect an analogue phone line or DSL modem | **RJ11** (or RJ14 for two lines) |
| Wire an Ethernet run or a serial console over modular jacks | **RJ45** |
| Connect cable TV or a cable modem | **F connector** |
| Terminate large volumes of twisted-pair cable quickly | **Punchdown block**  |
| Connect a common peripheral or mobile device | **USB** (Standard-A/B, Mini/Micro-B, or **USB-C**) |
| Power an internal fan or drive on an older system | **Molex / AMP Mate-n-Lok** |
| Connect an older Apple mobile device | **Lightning** |
| Reach a legacy device's console port | **DB-9 / RS-232** |

### 8.1 Worked example — sorting a mixed box of cables

**Scenario:** you are handed a box of unlabelled cables and connectors from a decommissioned server room and asked to sort them for disposal or reuse.

1. **Small modular plugs, narrow body:** RJ11 or RJ14 — check the conductor count if it matters (2 vs 4); likely phone or DSL cabling, low value for reuse in a modern network.
2. **Larger modular plugs, 8 visible conductors:** RJ45 — check for crimped patch cables worth keeping versus damaged ones for disposal.
3. **Threaded coax connectors:** F connectors — cable TV or cable modem runs; check for damage to the centre conductor before reusing.
4. **Small 4-pin connectors on the ends of drive-shaped power leads:** Molex/AMP Mate-n-Lok — from an old power supply, still useful for legacy drives or fans if the supply itself is being reused.
5. **9-pin D-shaped connectors:** DB-9 — worth keeping a couple for console access to legacy infrastructure, even in an otherwise modern environment.
6. **Anything unfamiliar and reversible, small and flat:** possibly Lightning — check whether it is genuinely Apple hardware before assuming a generic USB cable.
7. **When genuinely unsure**, compare the connector's size, shape and pin/conductor count against the reference table above rather than guessing from memory.

## 9. Security perspective

Connector identification is a basic skill, but a few of this lesson's specific connectors carry real security weight.

- **RJ11-into-RJ45 mistakes are availability incidents, not security incidents** — but a technician working quickly behind a rack of equipment without looking can just as easily seat the *wrong network* cable into the *right-looking* port, connecting equipment where it should not be. Label ports and cables, and look before connecting from behind equipment.
- **F connectors and cable modems sit at your network's edge.** The DOCSIS connection is a boundary between your network and the provider's — treat the demarcation point and any provider-owned equipment with the same scepticism you would any other WAN edge, and ensure your own router or firewall, not the modem, is the actual security boundary.
- **Punchdown blocks are unlabelled trust by default.** A punchdown block with hundreds of terminated pairs and no documentation is an environment where an unauthorised or forgotten cross-connect is nearly invisible. The numbering and documentation discipline covered in the network tools lesson is a genuine control here, not just tidiness.
- **Molex-powered legacy devices often predate modern firmware security practices entirely.** A drive or peripheral old enough to still use Molex power may also be old enough to lack any meaningful firmware update path. Treat such legacy hardware as a known-risk item in an asset inventory rather than assuming it is simply "old but harmless."
- **A proprietary connector like Lightning is also a supply-chain signal.** A non-genuine Lightning cable or accessory can carry malicious electronics precisely because the connector's proprietary nature makes counterfeit and modified accessories harder for a casual inspection to detect. Source charging and data cables for Apple devices from trusted suppliers, the same caution urged for USB-C cables in the peripheral cables lesson.
- **DB-9 console access is unauthenticated physical access by design,** as covered in the peripheral cables lesson — repeating it here because this lesson is where a technician is most likely to be reaching for the DB-9 adapter in the first place. The lock on the equipment cabinet is the real control.

## Summary

- **RJ11** (6P2C, sometimes 6P4C as **RJ14**) connects analogue phone lines and DSL. **RJ45** (8P8C) is larger, commonly used for Ethernet but also serial. RJ11 can be mistakenly plugged into RJ45; the reverse does not physically fit.
- The **F connector** is a threaded coax connector for cable TV and cable modems, with a single centre conductor; cable modems use **DOCSIS** to carry data over that infrastructure.
- **Punchdown blocks** terminate large volumes of twisted-pair cable quickly and cheaply, using insulation-piercing metal contacts and a punchdown tool — no individual crimped connector needed per wire.
- **USB** spans Standard-A/B, Mini-B, Micro-B across 1.1/2.0/3.0, converging on **USB-C** — one reversible connector, many possible signal types.
- **Molex** (also called **AMP Mate-n-Lok**) is a 4-pin, friction-fit power connector providing **12 V and 5 V** to fans and drives in older systems.
- **Lightning** is Apple's proprietary, reversible mobile-device connector, introduced for extra power capability and reversibility ahead of the industry's later move to USB-C.
- **DB-9**, carrying **RS-232** serial signalling, remains in use for **console access** to legacy network infrastructure, exactly as covered in the peripheral cables lesson.

## Glossary

| Term | Meaning |
|---|---|
| RJ11 | 6-position modular connector for analogue phone and DSL lines |
| 6P2C | Six positions, two conductors — the common RJ11 configuration |
| RJ14 | The 6-position, 4-conductor variant, carrying two phone lines |
| RJ45 | 8-position, 8-conductor modular connector, used for Ethernet and serial |
| Registered Jack | The naming scheme RJ connectors belong to |
| F connector | Threaded coaxial connector for cable TV and cable modems |
| DOCSIS | Data Over Cable Service Interface Specification |
| Punchdown block | A block for fast, tool-based termination of many twisted-pair wires |
| Insulation displacement | Contacts piercing wire insulation to reach the copper, without stripping |
| USB-C | The single reversible connector able to carry many different signal types |
| Molex | Common name for a 4-pin, friction-fit internal power connector |
| AMP Mate-n-Lok | Alternative name for the same 4-pin power connector |
| Lightning | Apple's proprietary, reversible mobile-device connector |
| DB-9 | The 9-pin D-shaped serial connector, commonly used for console access |
| RS-232 | Recommended Standard 232; the serial signalling standard used over DB-9 |
| Console port | A device's dedicated management port for direct, out-of-band access |

## Review questions

1. What does RJ11 stand for functionally, and what is its pin/conductor configuration?
2. What is the difference between RJ11 and RJ14?
3. Why is it possible to accidentally plug an RJ11 into an RJ45 socket but not the reverse?
4. What does an F connector terminate, and what physical feature keeps it from pulling out accidentally?
5. What does DOCSIS stand for, and where does it fit relative to the F connector?
6. Why are punchdown blocks fast and inexpensive compared with individually crimped connectors?
7. What principle lets a punchdown block make contact with a wire's copper without stripping it?
8. What single idea does USB-C bring to the previously fragmented USB connector family?
9. How many pins does a Molex connector have, and what two voltages does it commonly provide?
10. What is another name for the Molex connector, and where does it come from?
11. Why did Apple introduce the Lightning connector?
12. What standard does a DB-9 serial connection typically carry, and what is it most often used for today?
13. **Scenario:** a DSL modem has RJ11 and RJ45 ports close together on the back, and a technician working by feel connects the wrong one. What is the likely mistake, and why can it only happen in one direction?
14. **Scenario:** you find an unlabelled 4-pin power connector inside an old desktop, powering a case fan. What is it called (two acceptable names), and what voltages does it likely supply?
15. **Scenario:** a technician needs to configure a legacy switch with no reachable network interface. What connector are they likely to need, and why does it work when the network does not?
16. **Scenario:** a box of old cables includes a reversible connector that only fits Apple devices. What is it, and why was it designed to be reversible in the first place?

## Answer key

1. **A 6-position connector, commonly with 2 conductors (6P2C),** used for analogue phone lines and DSL.
2. **RJ14 is the same 6-position body wired with 4 conductors instead of 2,** typically carrying two phone lines through one jack.
3. **RJ11 is physically smaller than RJ45,** so it can be pushed into an RJ45 socket; an RJ45 plug is too large to fit into an RJ11 socket at all.
4. **Coaxial cable, typically for cable TV or cable modems.** A **threaded** shell that must be deliberately unscrewed to remove.
5. **Data Over Cable Service Interface Specification.** It is the standard by which a cable modem carries data over the cable infrastructure that the F connector physically connects to.
6. **No individual connector needs crimping onto each wire** — the wire is simply placed into a slot and punched down with a tool, which is quick per wire and needs little material.
7. **Insulation displacement** — metal contacts inside the block pierce each wire's insulation to reach the copper directly.
8. **One single, reversible physical connector that can carry many different signal types** (USB, Thunderbolt, HDMI, and others), replacing the earlier fragmented set of USB connector shapes.
9. **4 pins, providing 12-volt and 5-volt power.**
10. **AMP Mate-n-Lok,** from the connector manufacturer AMP.
11. **Micro-USB, the common connector of the time, did not offer the power capability Apple wanted, and was not reversible** — Lightning provided both greater power delivery and insert-either-way convenience.
12. **RS-232.** Today it is most often used for **console access** to legacy switches, routers, firewalls and similar infrastructure devices.
13. **The RJ11 plug was pushed into the RJ45 socket** — it is small enough to fit, even though it will not make a working connection. This can only happen in that direction because an RJ45 plug is physically too large to fit an RJ11 socket at all.
14. **A Molex connector, also called an AMP Mate-n-Lok connector.** It likely supplies **12-volt and 5-volt** power.
15. **A DB-9 (serial) connector, or an adapter chain reaching one,** to access the device's **console port**. It works because console access does not depend on the device's normal network interfaces being reachable.
16. **A Lightning connector.** Apple designed it to be reversible so it could be inserted either way round and still function — something Micro-USB, the common standard at the time, did not offer.
