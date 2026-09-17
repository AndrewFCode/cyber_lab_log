---
title: "PC Hardware & Repair: Desktop and Laptop"
description: "ESD safety, every major component, sockets and ports, POST/BIOS, laptop differences and a repeatable troubleshooting method."
tags:
  - hardware
  - repair
  - troubleshooting
  - help-desk
draft: false
updated: 2026-09-17
category: hardware
pinned: false
---

> **In one line:** know what each component does, break the system down to the lowest testable part, and test cheapest-and-easiest first.

## ESD safety — do this before anything else

**Electrostatic discharge** can damage the small parts inside a computer. The damage often **doesn't show up immediately** — the machine may work for days before failing, which makes it brutal to diagnose later.

| Equipment | Purpose |
|---|---|
| **ESD mat** | Rubber mat for the work surface |
| **ESD wrist strap** | Keeps your body grounded so it can't build a charge |

**Rules:**
- Unplug the computer **completely from the wall** first.
- Hold components **by the edges** only — never touch the contacts, chips or traces.
- Touch both hands to the metal case to discharge before handling parts.

## Components

### CPU — Central Processing Unit

- The brain. Usually near the centre of the motherboard, under a **heatsink and fan**.
- Unclip from the socket, lift out **by the edges**. Thermal paste sits on the top face.
- Read the **chip number and manufacturer**, then check the vendor's site for specs.

**Two specs that matter most:**

| Spec | Meaning |
|---|---|
| **Cores / threads** | How many things it can work on simultaneously |
| **Clock frequency** | How fast each one runs |

More cores + higher frequency = more processing power. Also check **socket type** on the spec sheet.

**Socket types:**

| Type | Full name | Pins | Typical use |
|---|---|---|---|
| **LGA** | Land Grid Array | On the **socket**; CPU has flat pads | Mostly Intel |
| **PGA** | Pin Grid Array | On the **CPU** | Mostly AMD |
| **BGA** | Ball Grid Array | Soldered to the board | Laptops/mobile — not replaceable |

**Orientation:** a small white triangle on the socket matches a triangle on the CPU. Line them up — never force it.
**Always reapply thermal paste** after reseating.

### RAM — Random Access Memory

- Clips straight into the motherboard. Hold by the edges.
- Reading a stick label — `4GB 1Rx8 PC3-12800U`:

| Field | Meaning |
|---|---|
| `4GB` | Capacity |
| `1Rx8` | Single rank, ×8-wide chips |
| `PC3` | Generation — **PC3 = DDR3** |
| `12800U` | Bandwidth — 12,800 MB/s ≈ **12.8 GB/s** |

**DDR SDRAM** = Double Data Rate Synchronous Dynamic RAM. Generations: DDR → DDR2 → DDR3 → DDR4 → DDR5. Each generation brings **lower operating voltage** plus more speed and bandwidth.

- **One DDR generation per motherboard** — they are physically keyed differently and are not interchangeable.
- **DIMM** = Dual Inline Memory Module. Slots work in **pairs** for dual channel (commonly 1&3, 2&4 — check the manual or matching slot colours).
- Best practice: **identical sticks**, down to the manufacturer.

### Drives — storage

| | **HDD (Hard Disk)** | **SSD (Solid State)** |
|---|---|---|
| Mechanism | Spinning platters, moving heads | Flash memory, no moving parts |
| Speed | Much slower | Much faster |
| Reliability | More prone to failure | More reliable |
| Cost per GB | Cheap | Expensive |
| Capacity | Large | Smaller for the money |
| Best for | Bulk storage, rarely-opened files | OS and applications |

- Standard 2.5" and 3.5" drives use **SATA** connectors (data + power). The physically larger drive is usually the HDD.
- Purpose-built business desktops often have **tool-less drive caddies** that release with a button. Some connectors have a small clip to unseat.
- **Always check the manual** before levering anything.
- **M.2** — a compact form factor increasingly common in both laptops and desktops.
- **NVMe** — the *protocol* an M.2 SSD uses to talk to the system (much faster than SATA). M.2 = shape, NVMe = language.

### PSU — Power Supply Unit

- Converts mains power into the voltages each component needs.
- Sometimes supplied fixed to the case and not replaceable; usually it swaps out easily.
- When choosing one, check **total wattage** covers all components **and** that it has the right **connectors**.

### GPU — Graphics Processing Unit

- Most modern CPUs include **integrated graphics** — fine for standard office use.
- Graphically intensive work needs a **discrete GPU**, seated in a **PCIe slot** and usually clipped in.
- PCIe slots are the main expansion ports. Other common expansion cards: **additional network card**, **wireless card**.

### Motherboard (MOBO)

- The interconnect: links the CPU to every other component, and distributes voltage.
- **CMOS battery** — a coin cell drawing minimal power that keeps the clock running and stores BIOS settings.
- **CLR_CMOS jumper** — move the jumper from the default pins to the clear pins, hold ~5 seconds, return it. This resets BIOS settings to factory defaults.

**Compatibility checklist when replacing:**
- Correct **CPU socket** *and* supported CPU generation
- Compatible **chipset**
- Correct **RAM generation**
- The **ports** you need
- The right **form factor** for the case

**Form factors** (largest → smallest): **Standard ATX → Micro ATX → Mini ITX → Nano ITX → Pico ITX**. Size determines physical fit, mounting alignment and expansion slot count.

> **Reassembly tip:** label cables with masking tape and write the destination on it before wrapping it round the wire. Pre-built machines often print part numbers on the cables.

## Ports, cables & peripherals

| Connector | Carries | Notes |
|---|---|---|
| **DB9 / Serial** | Serial data | Legacy — modems, routers, switch console access |
| **VGA** | Video only | Analogue, older monitors |
| **DVI** | Video only | The replacement for VGA — no audio |
| **HDMI** | Video + audio | TVs, consoles, most modern displays |
| **DisplayPort** | Video + audio | Most modern; supports the highest resolutions |
| **USB-A** | Data | Black = USB 2.0 |
| **USB 3.0** | Data | Blue connector, faster transfer |
| **USB-C** | Data, power, video | Increasingly universal |
| **PS/2** | Keyboard / mouse | Legacy, colour-coded |
| **RJ45** | Ethernet | Wired networking |

## POST & the BIOS

**BIOS** = Basic Input/Output System — firmware that initialises hardware before the OS loads.

**POST** = Power-On Self-Test. Runs automatically at power-on and checks that RAM, CPU, power and other essentials are healthy. If something fails, it reports a **beep code** (and/or a POST code) — **look the code up in the motherboard manual**, since codes vary by manufacturer.

POST is your first real diagnostic on a machine that powers on but won't boot.

**Getting in:** the key varies by manufacturer — commonly **Del** or **F2** for BIOS/UEFI setup, **F12** for the one-time boot menu. The prompt flashes on the splash screen; tap the key repeatedly from the moment you power on.

## Laptop specifics

**Tools:** screwdriver set, **metal spudger** (prying), **plastic/pencil spudger**, **suction cup** (screens and phone displays), shims.

**Opening one up:**
- The **bottom panel** comes off. Many laptops use **captive screws** that won't fully come out — that's by design.
- The base is often a **pressure fit** as well as screwed — find the small gap, insert a spudger, and **work shims around the edge** to release the clips progressively.

| Component | How it differs from desktop |
|---|---|
| **Battery** | Screwed in (often captive screws); connector pulls out; two tabs slot back in on refit |
| **RAM** | **SO-DIMM** — Small Outline DIMM. Same idea, smaller module |
| **Drive** | Usually **M.2**, often **NVMe** |
| **CMOS battery** | Same size as desktop, but wrapped in black insulation. **Disconnect the main battery to reset it** |
| **Cooling** | Heatsink with thermal paste, connected to the fan by a heat pipe |
| **Wireless card** | Replaceable (usually M.2) |
| **PSU** | External, because there's no room inside |

## Troubleshooting method

**The principle:** break the system down to its **lowest testable parts** to isolate the fault, and test in order of **easiest and cheapest first**. Understanding what each component does is what makes this possible.

### Worked example — "Computer won't power on"

> *Ticket #4561291 — After the weekend my computer won't power on. Pressing the power button does nothing: no sounds, nothing on screen.*

| # | Step | Why |
|---|---|---|
| 1 | Check the power cable at **both ends**; if on a power bar, check it's switched on. Check the **PSU switch** is set to ON | Free, 10 seconds, extremely common cause |
| 2 | Verify the outlet/power bar works — plug in a **known-good device** | Rules out the environment, not the PC |
| 3 | Open the case (**ground yourself first**). Check **power button → motherboard** header cables; unplug and reseat. If still dead, consult the manual for the power-on pins and **jumper them manually** | Isolates a faulty power button/front panel |
| 4 | Check the **CMOS battery**; reset CMOS by removing it or via the CLR_CMOS jumper | Bad settings or a dead cell can block POST |
| 5 | Check **PSU → motherboard** connections; inspect the PSU for visible damage (bulging, scorching, smell) | Cheap visual check before swapping parts |
| 6 | **Test the PSU** — or, if out of scope, swap in a **known-good** one | First real component swap |
| 7 | **Test the motherboard** — or swap in a known-good one | Most expensive and most invasive, so last |

**The pattern to carry into every ticket:**
1. Gather information before you touch anything.
2. Verify the simple, external and free things first.
3. Substitute **known-good** parts to isolate — that's how you prove a fault rather than guess at it.
4. Work down to the most expensive/invasive step last.
5. Know your **scope** — when component-level testing isn't yours to do, escalate.
6. **Document what you did**, including what *didn't* work.

## Key takeaways

- Ground yourself and unplug from the wall before opening anything. ESD damage is often delayed.
- Socket type dictates CPU compatibility: LGA (Intel), PGA (AMD), BGA (soldered/laptop).
- One DDR generation per board; match sticks and populate the correct pairs.
- SSD for OS and apps, HDD for bulk storage; M.2 is the shape, NVMe is the protocol.
- POST beep codes are manufacturer-specific — the manual is the reference.
- Laptops = same components, smaller packages: SO-DIMM, M.2, external PSU, BGA CPU.
- Isolate to the lowest testable part; test easiest and cheapest first.
