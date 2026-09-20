---
title: "Help Desk: Desktop Computer Components and Repair"
description: "TCM Practical Help Desk section 4 — ESD, CPU, RAM, drives, PSU, GPU, motherboard, ports and peripherals, POST and the BIOS, plus commands to inspect hardware."
tags: ["help-desk", "tcm", "hardware"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tcm-help-desk"
module: "§4"
moduleOrder: 32
unit: 4
---
> **In one line:** know what each part does, how it fails and how to swap it safely — then check it from the command line before you ever open the case.

*Companion to: TCM Security, Practical Help Desk, section 4.* Exam-level detail is in [A+ Core 1 domain 3](/resources/a-plus-core-1/3/).

---

## ESD and opening the case

1. Shut down, switch off at the PSU, and unplug.
2. Hold the power button for a few seconds to drain residual charge.
3. Wear an antistatic wrist strap clipped to bare chassis metal; work on an antistatic mat.
4. Handle cards and modules by the edges. Store parts in antistatic bags.
5. **Never open a PSU.** Its capacitors hold a dangerous charge after unplugging.
6. Photograph cable layouts before disconnecting anything.

---

## Components at a glance

| Part | Job | Common failure signs |
|---|---|---|
| CPU | Executes instructions | Overheating shutdowns, no POST |
| RAM | Short-term working memory (volatile) | Random crashes, blue screens, beep codes, no POST |
| Drive | Long-term storage | Clicking, slow boots, "no boot device", SMART warnings |
| PSU | AC mains → DC rails | Dead system, random reboots, burning smell |
| GPU | Display output and graphics processing | No display, artefacts, driver crashes |
| Motherboard | Connects everything | No POST, dead ports, swollen capacitors |

---

## CPU

- **Specs:** cores, threads, clock speed (GHz) and cache.
- **Platforms:** Intel and AMD use different sockets — the CPU must match the board's socket and chipset.
- **Install:**
  1. Lift the socket lever and align the triangle marker (pin 1). No force.
  2. Close the lever.
  3. Add a pea-sized dot of thermal paste.
  4. Seat the cooler with even pressure.
  5. Plug the cooler into the `CPU_FAN` header.
- **Replacing the cooler:** clean off old paste with isopropyl alcohol and apply fresh.

## RAM

- **Type:** DIMMs for desktops. DDR generations are keyed differently and aren't interchangeable.
- **Install:** open the clips, line up the notch, and press evenly until both clips snap.
- **Dual channel:** use matched modules in the manual's recommended slots (often A2 + B2).

## Drives

| Type | Connects via | Notes |
|---|---|---|
| HDD 3.5" | SATA data + SATA power | Moving parts; don't knock it while it runs |
| SATA SSD 2.5" | SATA data + SATA power | About 550 MB/s ceiling |
| NVMe M.2 | M.2 slot, held by a standoff screw | Several GB/s; check the slot supports NVMe |

## PSU

- **Wattage:** size for peak load plus headroom.
- **Efficiency:** 80 PLUS ratings, in order: White → Bronze → Silver → Gold → Platinum → Titanium.
- **Connectors:**
  - 24-pin to the motherboard
  - 4/8-pin to the CPU
  - 6/8-pin or 16-pin (12V-2x6) to the GPU
  - SATA power to drives
- **Checking it:** use a PSU tester rather than guessing.

## GPU

- **Integrated vs dedicated:** integrated graphics live in the CPU; a dedicated card sits in the PCIe x16 slot.
- **Power:** higher-end cards need supplemental PCIe power cables.
- **Classic ticket:** "no display" after fitting a graphics card — the monitor is still plugged into the motherboard's video port instead of the card.

## Motherboard

- **Form factors:** ATX > microATX > Mini-ITX. Mount on standoffs so the board never touches the case.
- **Key parts:** chipset, CPU socket, RAM slots, PCIe slots, M.2 slots, SATA ports, and the CMOS battery (CR2032).
- **Headers:**
  - Front panel: power switch, reset switch, power LED +/−, drive LED +/−
  - USB and audio
  - Fans

## Ports, cables and peripherals

| Port | Notes |
|---|---|
| USB-A / USB-C | Peripherals, storage, charging; USB-C is reversible |
| HDMI / DisplayPort | Digital video and audio |
| DVI / VGA | Older video; VGA is analog |
| RJ45 | Ethernet |
| 3.5 mm audio | Green = output, pink = microphone, blue = line in |
| PS/2 (legacy) | Purple = keyboard, green = mouse |

## POST and the BIOS

| Step | What happens |
|---|---|
| 1. Power on | PSU stabilises, then signals "power good" |
| 2. POST | Firmware checks CPU, RAM and video |
| 3. Beep / LED codes | Report failures — **vendor-specific**, so check the manual. Many boards have CPU / DRAM / VGA / BOOT debug LEDs |
| 4. Boot device | Firmware follows the boot order to find a bootloader |

- **Setup keys:** usually `Del` or `F2`; the boot menu is often `F12`, `F11` or `Esc`.
- **Clear CMOS** to reset firmware settings: use the jumper, or remove the coin cell for a few minutes with the PC unplugged.
- **BIOS vs UEFI:** UEFI is the modern replacement — GPT disks, Secure Boot, graphical setup.

---

## Troubleshooting a ticket

The CompTIA method, as used for Ticket Interrupts:

1. **Identify the problem** — question the user, reproduce it, note recent changes.
2. **Establish a theory** of probable cause — start with the obvious.
3. **Test the theory** — if it's wrong, go back to step 2 or escalate.
4. **Plan and implement** the fix.
5. **Verify** everything works, and prevent it happening again.
6. **Document** findings, actions and outcome in the ticket.

---

## Inspect hardware without opening the case

| Want | Windows (PowerShell) | Linux |
|---|---|---|
| CPU | `Get-CimInstance Win32_Processor \| Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed` | `lscpu` |
| RAM modules | `Get-CimInstance Win32_PhysicalMemory \| Select-Object BankLabel, Capacity, Speed, Manufacturer` | `free -h` · `sudo dmidecode -t memory` |
| Drives and health | `Get-PhysicalDisk \| Select-Object FriendlyName, MediaType, BusType, Size, HealthStatus` | `lsblk` · `sudo smartctl -a /dev/sda` |
| GPU | `Get-CimInstance Win32_VideoController \| Select-Object Name, DriverVersion` | `lspci \| grep -iE 'vga\|3d'` |
| Motherboard | `Get-CimInstance Win32_BaseBoard \| Select-Object Manufacturer, Product` | `sudo dmidecode -t baseboard` |
| BIOS version | `Get-CimInstance Win32_BIOS \| Select-Object SMBIOSBIOSVersion, ReleaseDate` | `sudo dmidecode -t bios` |
| Everything | `msinfo32` · `dxdiag` | `sudo lshw -short` |
| USB devices | `Get-PnpDevice -Class USB` | `lsusb` |

`wmic` is deprecated — use `Get-CimInstance`. `smartctl` comes from the `smartmontools` package.

---

## 🔐 Security notes

- **Physical access beats most software security.** Anyone with the case open or a USB boot stick can reset passwords offline or pull the drive.
  - Countermeasures: a firmware password, Secure Boot, USB boot disabled, and full-disk encryption (BitLocker).
- **Hardware keyloggers** sit inline between the keyboard and the USB port. Glance at the back of shared or public PCs.
- **Old drives hold data.** Wipe or destroy drives you replace before disposal — deleting files isn't enough.
- **Firmware matters.** BIOS/UEFI updates fix security flaws, so apply them from the vendor only.

---

## Practice drills

<details>
<summary>1. A PC powers on, fans spin, but there's no display and three beeps. First step?</summary>

Look up that beep code in the motherboard manual. It's vendor-specific, and often points at RAM — reseat the modules.
</details>

<details>
<summary>2. Confirm how much RAM is installed, and in which slots, without opening the case.</summary>

`Get-CimInstance Win32_PhysicalMemory | Select-Object BankLabel, Capacity, Speed`
</details>

<details>
<summary>3. A new graphics card shows "no signal". Most likely cause?</summary>

The monitor is plugged into the motherboard's video output, not the card's.
</details>

<details>
<summary>4. The clock resets to 2009 every boot. What part?</summary>

The CMOS battery (CR2032).
</details>

<details>
<summary>5. Is the drive SSD or HDD, and is it healthy?</summary>

`Get-PhysicalDisk | Select-Object FriendlyName, MediaType, HealthStatus`
</details>

---

## Key takeaways

- Unplug, drain, strap on. Never open a PSU.
- CPU, RAM, drives, PSU, GPU and motherboard each have tell-tale failure signs — learn them.
- POST beep and LED codes are vendor-specific; the clear-CMOS jumper resets firmware settings.
- Diagnose from the OS first: `Get-CimInstance`, `Get-PhysicalDisk`, `msinfo32`; `lscpu`, `lsblk`, `dmidecode`.
- Physical access defeats software security — firmware passwords and BitLocker close that gap.
