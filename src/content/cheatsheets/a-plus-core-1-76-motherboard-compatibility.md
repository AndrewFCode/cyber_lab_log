---
title: "A+ Core 1 3.5: Motherboard Compatibility"
description: "A+ Core 1 3.5 — Intel vs AMD sockets, zero-force CPU install, and multisocket server motherboards."
tags: ["a-plus", "comptia", "messer", "hardware", "motherboard", "cpu", "sockets", "intel", "amd", "server"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "Motherboard Compatibility"
moduleOrder: 76
unit: 3
---

> **In one line:** the CPU brand picks the board — AMD CPU needs an AMD socket, Intel CPU needs an Intel socket — and server boards add multiple CPUs, more RAM slots and rack-fit size.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the Motherboard Compatibility class notes; the section overview is the Section 3 sheet.

## Intel vs AMD

| | Intel | AMD |
| --- | --- | --- |
| Role (traditional) | Higher performance | Lower cost |
| Reality | Lead switches generation to generation — compare the actual parts | Same |
| Socket | Intel socket only | AMD socket only |
| Interchangeable? | **No** — an Intel CPU won't fit an AMD board or vice versa | **No** |
| Socket style* | LGA (pins in socket) | PGA on older AM4; LGA on AM5 |

\*Beyond this lesson — the exam here just asks you to match brand to socket.

**Rule:** the CPU you choose chooses the motherboard.

## Installing a CPU

- **No force.** Rest the CPU in the socket (orientation marker aligned), close the cover, lock the lever.
- Force means misalignment — stop, don't press. Bent pins are usually fatal.

## Desktop vs server board

| Feature | Desktop | Server |
| --- | --- | --- |
| CPUs | Single socket | **Multisocket** (2+ physical CPUs) |
| RAM slots | 2–4 | Many (4, 6 or more) |
| RAM type | Usually non-ECC | Usually **ECC** (see 3.3) |
| Expansion | Few | Many |
| Form factor / mount | Any | Large, full-size, fits a **19-inch rack** |

## 🔐 Security notes

- **The CPU platform is a firmware platform:** microcode and management engines (Intel ME, AMD PSP) sit below the OS, and their fixes arrive via the board's BIOS/UEFI updates — patch firmware, not just the OS.
- **Server boards usually carry a BMC (IPMI):** out-of-band management that can power-cycle, mount virtual media and see the console independent of the OS. Exposed or default-credentialled BMCs = full control. Isolate the management network, change defaults, patch it.
- **Multisocket = concentration:** one board often runs many VMs, so a compromise or physical attack reaches far more than a desktop.

## Practice drills

<details>
<summary>1. Which two companies make PC CPUs?</summary>

Intel and AMD.
</details>

<details>
<summary>2. Why does the CPU brand decide the motherboard?</summary>

Intel and AMD use different sockets, so the CPU only fits a board with its matching socket.
</details>

<details>
<summary>3. Can you fit an AMD CPU to an Intel-socket board?</summary>

No — the sockets are physically different and not interchangeable.
</details>

<details>
<summary>4. How much force should installing a CPU take?</summary>

None — rest it in the socket, close the cover, lock the lever. Force means it's misaligned.
</details>

<details>
<summary>5. What does "multisocket" mean and where is it used?</summary>

More than one physical CPU on one board — used on server motherboards for extra processing power.
</details>

<details>
<summary>6. Two ways a server board scales beyond a desktop board?</summary>

More RAM slots (4, 6 or more) and more expansion slots (plus multiple CPU sockets).
</details>

<details>
<summary>7. What form factor and mounting do server boards favour?</summary>

Large, full-size ATX-style boards built to fit a 19-inch rack.
</details>

## Key takeaways

- **CPU brand picks the board:** AMD CPU → AMD socket, Intel CPU → Intel socket; never interchangeable.
- **Price/performance stereotype shifts** — compare the actual parts today.
- **Install with zero force:** seat, close cover, lock lever.
- **Server boards:** multisocket, many RAM slots (often ECC), lots of expansion, rack-fit full-size.
- **Security:** patch platform firmware; isolate and harden server BMC/IPMI management.
