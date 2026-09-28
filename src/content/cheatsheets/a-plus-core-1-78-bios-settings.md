---
title: "A+ Core 1 3.5: BIOS Settings"
description: "A+ Core 1 3.5 — entering setup, boot order, USB control, fans/temps, Secure Boot, boot vs supervisor passwords, CMOS reset, virtualisation."
tags: ["a-plus", "comptia", "messer", "hardware", "bios", "uefi", "secure-boot", "boot-order", "passwords"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "BIOS Settings"
moduleOrder: 78
unit: 3
---

> **In one line:** inside UEFI setup you set boot order, enable/disable hardware (USB), tune fans and read temps, turn on Secure Boot, set boot/supervisor passwords, and enable CPU virtualisation — documenting every change first.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the BIOS Settings class notes; the section overview is the Section 3 sheet.

## Getting into setup

| Situation | How |
| --- | --- |
| Normal boot | Press setup key: **Del / F1 / F2**, or **Ctrl+S / Ctrl+Alt+S** |
| Practice, no hardware | VM firmware (**Hyper-V, VMware** — *not VirtualBox*) or an online UEFI simulator |
| Windows Fast Startup (no prompt) | **Shift+Restart**; Advanced startup; `msconfig`; or interrupt boot **3×** |

**Before any change:** document/photograph it, understand it, keep a backup to revert.

## Where the settings live

```
Startup   -> boot order (SATA / M.2 / network / USB)
Devices   -> USB Setup (enable/disable ports and support)
Power     -> fan / cooling profiles + temperature monitoring
Security  -> Secure Boot (+ keys), passwords
Advanced  -> CPU Setup -> virtualisation (VT-x / AMD-V / SVM)
```

## Key settings

| Setting | Notes |
| --- | --- |
| Boot order | Order devices tried; move wanted drive to top. Disabling a device hides it from the OS entirely |
| USB control | Enable/disable ports — real DLP/malware control (2008 DoD ban after the **Agent.btz** worm, a SillyFDC variant) |
| Cooling | Profiles: best performance (max cool) / best experience (quiet) / full speed |
| Temp monitor | Read sensors (CPU, memory…) in firmware before booting an OS |
| Secure Boot | **UEFI only**; verifies bootloader, OS **and** firmware-update signatures; disable only for old/unsigned OS, then re-enable |
| Boot / user password | Needed to **boot** the machine |
| Supervisor / BIOS password | Needed to **enter setup** (stops re-enabling USB, etc.) |
| Reset config | Modern settings are in **flash** — battery pull won't clear; short the **CLRTC** (clear-CMOS) jumper |
| Virtualisation | Intel **VT (VT-x)** / AMD **AMD-V (SVM)** |

## 🔐 Security notes

- **Lock the boot path:** internal-only boot order + USB boot disabled stops live-USB bypass; pair with Secure Boot and full-disk encryption.
- **Firmware USB disable** blocks removable-media worms and exfiltration in a way the OS user can't undo.
- **BIOS passwords deter, they don't protect data:** anyone who can open the case clears them via the CLRTC/clear-CMOS jumper (or a vendor backdoor reset). Only FDE + physical security protect the data.
- **Disabling Secure Boot lowers posture** — do it knowingly and re-enable after; track firmware settings in the baseline.

## Practice drills

<details>
<summary>1. Three ways to enter firmware setup?</summary>

Press the setup key at boot — commonly Del, F1 or F2 (or Ctrl+S / Ctrl+Alt+S).
</details>

<details>
<summary>2. Why does Windows often show no BIOS prompt, and how do you fix it?</summary>

Fast Startup does a partial shutdown (no cold boot). Force a full shutdown with Shift+Restart, Advanced startup, msconfig, or by interrupting the boot three times.
</details>

<details>
<summary>3. If you disable a device in the BIOS, what does the OS see?</summary>

Nothing — the OS has no idea it exists, because the BIOS is the connection to the hardware.
</details>

<details>
<summary>4. What does Secure Boot check, and when do you disable it?</summary>

The bootloader, the OS and firmware-update signatures against trusted keys. Disable only to run old/unsigned software, then re-enable.
</details>

<details>
<summary>5. Boot password vs supervisor password?</summary>

Boot/user password is needed to boot; supervisor/BIOS password is needed to enter setup.
</details>

<details>
<summary>6. On a modern board, how do you reset the BIOS config?</summary>

Not by pulling the battery (settings are in flash) — short the clear-CMOS/CLRTC jumper with physical access.
</details>

<details>
<summary>7. Intel and AMD names for the virtualisation setting?</summary>

Intel VT (VT-x) and AMD-V (AMD Secure Virtual Machine / SVM), under Advanced > CPU Setup.
</details>

## Key takeaways

- **Enter setup** with a key at boot; Windows **Fast Startup** hides the prompt — force a full shutdown.
- **Document, understand, back up** before any change.
- **Boot order + USB control** are your main hardening levers; disabling a device hides it from the OS.
- **Secure Boot** (UEFI) verifies boot chain and firmware; **boot vs supervisor** passwords do different jobs.
- **BIOS passwords are cleared by physical access (CLRTC jumper)** — rely on FDE + physical security for data.
