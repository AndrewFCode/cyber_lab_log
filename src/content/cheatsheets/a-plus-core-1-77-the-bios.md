---
title: "A+ Core 1 3.5: The BIOS"
description: "A+ Core 1 3.5 — BIOS firmware, POST and boot, legacy BIOS vs UEFI, dual-BIOS flash, and safe setting changes."
tags: ["a-plus", "comptia", "messer", "hardware", "bios", "uefi", "firmware", "post", "boot"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "The BIOS"
moduleOrder: 77
unit: 3
---

> **In one line:** the BIOS is the motherboard firmware (now in flash) that runs POST, hands off to the bootloader, and — as modern UEFI — gives a consistent, graphical setup for devices, CPU, power, security and boot.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the BIOS class notes; the section overview is the Section 3 sheet.

## What it is

| Term | Meaning |
| --- | --- |
| BIOS | Basic Input/Output System — the board's firmware |
| Other names | Firmware, system BIOS, ROM BIOS |
| Stored in | **Flash** on the motherboard (not ROM — updatable) |
| Settings/clock kept by | Battery-backed memory (CR2032 coin cell) |
| Dual BIOS | Main + backup chip → recover a failed update |

## Boot sequence

```
Power on -> BIOS/UEFI -> POST -> Bootloader -> Operating system
```

- **POST** (Power-On Self-Test): checks CPU, memory, keyboard/mouse; error on failure.
- **Bootloader:** POST passed; loads the OS (may prompt which OS).

## Legacy BIOS vs UEFI

| | Legacy BIOS | UEFI |
| --- | --- | --- |
| Age / status | 25+ years, older systems | Modern standard (from Intel) |
| Interface | **Text, keyboard only** | **Graphical, mouse** |
| Consistency | Varies | Similar across manufacturers |
| Hardware | Built for legacy hardware; may not support new | Supports modern hardware |
| Partitioning* | MBR (≤2 TB, 4 primary) | GPT; enables Secure Boot + TPM |

\*Beyond this lesson, but the practical reason the choice matters at install time.

## UEFI settings you'll see

CPU/firmware overview · connected devices (storage, audio, network) · advanced (CPU features, **virtualisation** VT-x/AMD-V) · power · security · boot/startup.

- **Some settings are critical** — back up and **document before changing** anything, so you can revert.

## 🔐 Security notes

- **Firmware runs below the OS, so a bootkit/UEFI implant survives a disk wipe and reinstall.** Keep **Secure Boot** on, flash only vendor-signed images; dual BIOS aids recovery.
- **Lock the boot path against evil-maid access:** set a supervisor/UEFI password and restrict boot order so it won't boot removable media by default. Pair with full-disk encryption.
- **Change control is security:** an undocumented change (Secure Boot off, boot order opened) quietly weakens a machine — track firmware version and settings in the baseline, and patch firmware (microcode fixes ship this way).

## Practice drills

<details>
<summary>1. What does BIOS stand for, and where is it stored today?</summary>

Basic Input/Output System; in flash memory on the motherboard (not ROM).
</details>

<details>
<summary>2. What does POST do?</summary>

Power-On Self-Test — checks core hardware (CPU, memory, keyboard/mouse) and shows an error if something core fails.
</details>

<details>
<summary>3. What is the bootloader, and what does reaching it tell you?</summary>

The stage that loads the OS (sometimes offering a choice) — reaching it means POST passed.
</details>

<details>
<summary>4. Why do some boards have two BIOS chips?</summary>

A main and a backup, so a failed or interrupted BIOS update can be recovered.
</details>

<details>
<summary>5. How is a legacy BIOS navigated, and how does UEFI differ?</summary>

Legacy is text-based, keyboard only; UEFI is graphical and mouse-driven, and consistent across manufacturers.
</details>

<details>
<summary>6. What does UEFI stand for and who created it?</summary>

Unified Extensible Firmware Interface; created by Intel.
</details>

<details>
<summary>7. What should you do before any BIOS change or update?</summary>

Back up and document the current configuration so you can revert — some settings are critical to stability.
</details>

## Key takeaways

- **BIOS = firmware in flash;** runs **POST**, then the **bootloader** loads the OS.
- **Dual BIOS** (main + backup) makes updates recoverable.
- **Legacy = text/keyboard, older hardware; UEFI = graphical/mouse, modern, consistent, Secure Boot.**
- **Back up and document before changing** critical settings.
- **Security:** firmware sits below the OS — bootkits survive reinstalls; lock boot order, set a firmware password, keep Secure Boot on, flash only signed images.
