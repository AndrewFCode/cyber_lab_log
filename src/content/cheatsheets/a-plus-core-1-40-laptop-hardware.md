---
title: "A+ Core 1 1.1: Laptop Hardware"
description: "Professor Messer A+ 220-1201 lesson 1.1 — laptop batteries, keyboards, SO-DIMM memory, 2.5-inch vs M.2 storage, HDD-to-SSD cloning, wireless cards and antennas, biometrics, NFC and cameras."
tags: ["a-plus", "comptia", "messer", "laptops", "hardware"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Laptop Hardware"
moduleOrder: 40
unit: 1
---
> **In one line:** laptops cram a whole PC into a tiny, precisely built case — so know which parts are swappable, follow the manufacturer's procedure, and match every part to the exact model.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 1.1 (Laptop Hardware).* The full version is the 1.1 class notes; the section overview is the Section 1 sheet.

---

## Batteries

| Point | Detail |
|---|---|
| Modular | Release button → battery pops out → slide a new one into the same slot |
| Built-in | Not user-replaceable — a technician takes the laptop apart |
| Types | Lithium-ion (Li-ion) and lithium-ion polymer |
| Memory effect | **None** with lithium — recharge any time without losing capacity |
| Compatibility | Form factors are model-specific. Match the exact model and part number |

## Keyboards

| Point | Detail |
|---|---|
| Most-replaced part | It's the most-used component |
| Removal | Remove a bezel or a few screws → lift out as one unit → disconnect the **ribbon cable** |
| Troubleshooting | Plug in an **external USB keyboard**. If it works, the fault is the laptop keyboard hardware; if not, look at the OS |
| Compact layout | `Fn` and Windows keys give secondary functions; a numeric keypad only on wide laptops |
| Single keycap | Laptop keycaps are **fragile** — follow the manufacturer's instructions |

## Memory

| Point | Detail |
|---|---|
| Module | **SO-DIMM** — Small Outline Dual In-line Memory Module |
| Install | Open the access panel → seat the module → press down until the clips lock |
| Soldered RAM | Can't be upgraded without replacing the **system board** |

## Storage

| | 2.5-inch drive | M.2 |
|---|---|---|
| Used in | Older laptops (desktops use 3.5-inch) | Newer laptops |
| Types | HDD (spinning platters) or SSD | SSD |
| Connections | **Two** — data and power | **One** slot — data and power together |
| Fixing | A couple of screws | A single screw |
| Install tip | Use a screw mat for the tiny screws | Push in until **no gold contacts show**, press down, screw in |

**SSD = no moving parts** → faster and more reliable than a spinning HDD.

## HDD → SSD migration

| Method | How | Speed |
|---|---|---|
| Fresh install | New OS on the SSD → copy documents → reinstall apps | Slow |
| Image to separate storage | Image the old drive → install the SSD → restore the image | Faster |
| Direct clone | Both drives connected → clone drive to drive | **Fastest** |

Cloning (imaging) software is often **bundled with the SSD**; third-party tools also work.

## Wireless

| Point | Detail |
|---|---|
| No wired port | Many laptops rely entirely on 802.11 and Bluetooth |
| Where | Usually on the system board; older laptops use **Mini PCI / Mini PCI Express** cards |
| Bluetooth | Short-range **PAN** for mice, keyboards and peripherals |
| Antennas | Wi-Fi: **main + auxiliary** (e.g. grey and black wires); possibly a third for Bluetooth |
| Antenna route | Around the **display** (high up for reception) → out of the bottom of the screen → behind the keyboard → system board |

## Biometrics, NFC and camera

| Feature | Key facts |
|---|---|
| Biometrics | Fingerprint or face login. Needs **OS support + hardware** (fingerprint reader or camera) |
| Windows | **Windows Hello Face** and **Windows Hello Fingerprint** |
| NFC | Near Field Communication, **about 4 cm or less**: payments, hospital workstation badge login, warehouses, manufacturing, shipping and receiving |
| Camera | Top-centre of the display; **microphones either side**; external webcam for higher definition |

---

## 🔐 Security notes

- **Biometrics** are a relatively secure login method. Keep a strong PIN or password as the fallback.
- **NFC's short range** means an attacker has to be very close — but keep payment and login authentication on.
- **Cameras and microphones** can be hijacked by malware. Review app permissions; a physical shutter is the only control software can't override.
- **Cloning copies everything** — including malware and stored credentials. Scan a suspect system first.
- **Old drives still hold data.** Securely wipe or destroy them before disposal.

---

## Practice drills

<details>
<summary>1. A user charges their Li-ion laptop battery from 60 %. Does this reduce capacity?</summary>

No. Lithium-ion batteries have no memory effect.
</details>

<details>
<summary>2. Some keys don't work, but an external USB keyboard works fine. Hardware or OS?</summary>

The laptop keyboard hardware (or its ribbon cable) — the OS is accepting input.
</details>

<details>
<summary>3. The RAM is soldered to the motherboard. Can it be upgraded?</summary>

Not without replacing the whole system board.
</details>

<details>
<summary>4. How many connections does a 2.5-inch drive need, and an M.2 drive?</summary>

2.5-inch: two (data and power). M.2: one slot carries both.
</details>

<details>
<summary>5. What's the fastest way to move a user's system from an HDD to a new SSD?</summary>

Connect both drives and clone directly from one to the other with imaging software.
</details>

<details>
<summary>6. Wi-Fi is weak after a screen replacement. What do you check?</summary>

The Wi-Fi antenna wires (main and aux). They run through the display, so they may be disconnected, misconnected or pinched.
</details>

<details>
<summary>7. Face recognition login doesn't appear as an option on a laptop. What two things are required?</summary>

An operating system that supports it (Windows Hello Face) and suitable camera hardware.
</details>

---

## Key takeaways

- Laptops are precise and differ by manufacturer — follow the model's service instructions.
- Batteries are modular or built-in, Li-ion or lithium-ion polymer, with no memory effect, and model-specific.
- The keyboard is the most-replaced part. An external USB keyboard isolates hardware from OS faults.
- SO-DIMM memory unless soldered (then it means a system board swap).
- 2.5-inch drives have two connectors; M.2 has one slot and one screw. SSDs have no moving parts.
- HDD → SSD: fresh install (slow) or clone (via an image, or direct — fastest).
- Wi-Fi uses main + aux antennas routed around the display. Bluetooth is a PAN.
- Biometrics need OS support plus hardware. NFC works at about 4 cm. The camera sits top-centre, with mics either side.
