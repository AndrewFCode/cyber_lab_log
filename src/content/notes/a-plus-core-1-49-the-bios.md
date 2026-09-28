---
title: "A+ Core 1 3.5: The BIOS — Class Notes"
description: "Full class notes for A+ Core 1 3.5: BIOS firmware, POST and boot, legacy BIOS vs UEFI, dual-BIOS flash, and settings."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "bios", "uefi", "firmware", "post", "boot"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> fifth lesson under objective **3.5** ("install and configure motherboards,
> CPUs, and add-on cards"), joining Motherboard form factors, expansion slots,
> connections and compatibility. Here we look at the firmware that starts the
> board before any operating system exists.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what the BIOS is, the other names it goes by, and where it is stored
   today.
2. Describe the POST and how it leads into the bootloader and the operating
   system.
3. Explain why boards carry a main and a backup BIOS chip.
4. Contrast legacy BIOS with UEFI, including how each is navigated.
5. Describe the kinds of settings a UEFI interface exposes, and how to change
   them safely.

## 1. What the BIOS is

Press the power button and, for the first few seconds, what fills the screen has
nothing to do with the operating system that eventually loads. That early screen
is the **BIOS** — the **Basic Input/Output System**. You will hear it called by
several names: the system's **firmware**, the **system BIOS**, or the **ROM
BIOS**, where ROM means Read-Only Memory.

That last name is now a historical hangover. Modern systems do not keep the BIOS
in true read-only memory; it lives in **flash memory** on the motherboard
instead, which is what makes it updatable. The BIOS's job is to **initialise the
system** and get everything ready to hand over to the operating system.

> **Note (beyond this lesson):** the BIOS *program* lives in flash, but your
> *settings* (and the real-time clock) are held in a small amount of
> battery-backed memory kept alive by the motherboard's **CR2032** coin cell.
> A dead cell is the classic cause of a clock that resets and BIOS settings that
> revert on every power-off.

## 2. POST and the boot sequence

The start-up sequence you watch is the **Power-On Self-Test**, or **POST**. It
is a quick diagnostic that checks the core hardware is present and sane: is there
a **CPU**, is **memory** installed, are a **keyboard and mouse** connected? If
any of those core systems fails to initialise, POST puts an **error message** on
the screen rather than pressing on.

POST takes only a few seconds. Once it passes, control moves to the
**bootloader** — the point at which the firmware has finished its checks and is
ready to load an operating system. Depending on the machine, the OS may start
immediately, or you may get a prompt asking **which** operating system to load.
Reaching that prompt is the signal that POST is complete.

```
Power on
   |
   v
+----------------------+
|  BIOS / UEFI starts  |  firmware in flash on the board
+----------+-----------+
           |
           v
+----------------------+
|  POST self-test      |  CPU? RAM? keyboard/mouse?
+----------+-----------+  fail -> error message on screen
           | pass
           v
+----------------------+
|  Bootloader          |  choose an OS if prompted
+----------+-----------+
           |
           v
+----------------------+
|  Operating system    |
+----------------------+
```

## 3. Where the BIOS lives: main and backup

Because the BIOS is in flash on the motherboard, you can often find the chip
physically marked on the board. Many boards carry **two** BIOS flash chips: a
**main** BIOS and a **backup**. The reason is safety during an update. A BIOS
upgrade rewrites the flash, and if that process is interrupted — a power cut, a
bad image — the board could be left unbootable. A second, standby copy means you
can recover to a known-good BIOS if an upgrade goes wrong.

> **In the real world:** this is why a BIOS/UEFI update is one of the few
> maintenance jobs where you genuinely do not want to lose power partway. Use a
> reliable supply, and never interrupt a flash in progress.

## 4. Legacy BIOS

On older PCs you may meet a **legacy** (traditional) BIOS — a design that has
been around for more than twenty-five years. If a machine runs an older
operating system on older hardware, it is probably using legacy BIOS. The
catch is that legacy BIOS was written for **older, legacy hardware**, so putting
**newer** hardware into an old system can run into a legacy BIOS that simply does
not support it.

A legacy BIOS presents a **text-based** screen. You navigate it from the
**keyboard** — arrow keys to move, and Enter, Space or various function keys to
select and change values — with the available choices listed along the bottom of
each screen so you always know your options.

> **Correction:** the transcript describes the legacy screen as one you move
> around with "mouse keys". Legacy BIOS is **keyboard-navigated and has no mouse
> support** — mouse control is a UEFI feature (below). The keyboard keys the
> transcript then lists (Enter, Space, function keys) are the correct ones.

> **Note (beyond this lesson):** legacy BIOS pairs with **MBR** partitioning,
> which brings the familiar limits — up to four primary partitions and a ~2 TB
> boot-disk ceiling. UEFI pairs with **GPT**, which lifts both. That partition
> detail belongs with the Operating systems material, but it is the practical
> reason legacy vs UEFI matters at install time.

## 5. UEFI

Modern hardware needs a modern firmware, and on a recent computer that is a
**UEFI** BIOS. UEFI stands for **Unified Extensible Firmware Interface**, a
standard created by Intel and now used on essentially all modern systems.

Because UEFI is a **standard**, its functionality is broadly **consistent across
manufacturers** — the options and features look and behave much the same
whoever built the machine. It also brings a friendlier interface: **graphical**
screens you can drive with a **mouse**, not just the keyboard.

The settings a UEFI interface exposes are the ones you would expect for bringing
a machine up to the point of loading an OS:

- An **overview** of the CPU and the firmware version itself.
- **Connected devices**, especially storage, audio and network.
- **Advanced** settings for CPU features — notably **virtualisation** support.
- **Power** options, **security**, **startup/boot** order, and more.

> **Note (beyond this lesson):** UEFI grew out of Intel's earlier EFI and is now
> maintained by the multi-vendor UEFI Forum, which is why the experience is so
> similar across brands. UEFI also enables **Secure Boot**, which pairs with a
> **TPM** in the modern trusted-boot stack.

### 5.1 Worked example — enabling virtualisation safely

A user needs to run virtual machines, and the hypervisor complains that
hardware virtualisation is off.

1. **Document first.** Note the current relevant settings (or photograph the
   screens) so you can put anything back.
2. **Enter firmware setup** at power-on (the key varies — Del, F2 and F10 are
   common; the POST screen usually tells you).
3. **Advanced -> CPU features:** enable the virtualisation option (Intel VT-x or
   AMD-V, depending on the platform).
4. **Change one thing at a time.** Do not tweak unrelated settings "while you're
   in there" — several are critical to stable operation.
5. **Save and exit**, then confirm the hypervisor now sees hardware
   virtualisation. If something misbehaves, your notes let you revert.

The discipline the lesson stresses: some firmware settings are critical to
reliable operation, so back up and document before you change anything, and
change only what you understand.

## 6. Changing BIOS settings safely

To restate the caution plainly: several BIOS/UEFI settings are **critical** to
whether the system runs reliably at all, so they are not things to change on a
hunch. Before any BIOS update or configuration change, **make backups and keep
documentation** of the previous configuration, so you have a route back if the
new settings cause trouble.

## 7. Security perspective

Firmware runs **before and beneath** the operating system, which makes the BIOS
both a powerful control point and a high-value target:

- **Firmware persistence outlives a reinstall.** Malware that reaches the
  firmware (a bootkit or UEFI implant) survives wiping the disk and reinstalling
  the OS, because it does not live on the disk. This is exactly why signed
  firmware, **Secure Boot** and measured boot matter, and why only vendor-signed
  BIOS images should ever be flashed. The dual-BIOS design also gives you a
  recovery path if an implant or a bad flash bricks the main chip.
- **Lock the boot path.** An attacker with a few minutes at the machine (the
  "evil maid") can boot a live USB and bypass the installed OS entirely. Set a
  **supervisor/UEFI password**, restrict the **boot order** so the machine will
  not boot removable media by default, and keep Secure Boot enabled. Combined
  with full-disk encryption, this closes the easy offline-access routes.
- **Change control is a security control.** Because critical settings live here,
  "back up and document before changing" is not just good hygiene — an
  undocumented firmware change (disabling Secure Boot, opening the boot order,
  turning off a security feature) can quietly weaken a machine. Track firmware
  version and settings as part of the build baseline.
- **Keep firmware patched.** CPU microcode and platform vulnerabilities are
  fixed through BIOS/UEFI updates from the board vendor; an unpatched firmware is
  an unpatched attack surface below the OS.

## Summary

- The **BIOS** (Basic Input/Output System) is the motherboard **firmware** that
  initialises the system; also called system/ROM BIOS, now stored in **flash**,
  not ROM.
- **POST** checks core hardware (CPU, memory, keyboard/mouse) and shows an error
  on failure; on success the **bootloader** loads (or lets you choose) the OS.
- Many boards have a **main and backup BIOS** so a failed update can be
  recovered.
- **Legacy BIOS** is old, text-based and **keyboard**-navigated, and may not
  support newer hardware. **UEFI** (Unified Extensible Firmware Interface, from
  Intel) is the modern standard: consistent across vendors, **graphical/mouse**,
  with settings for devices, CPU/virtualisation, power, security and boot.
- Some settings are critical — **back up and document before changing** anything.

## Glossary

| Term | Meaning |
| --- | --- |
| BIOS | Basic Input/Output System; the firmware that starts the board. |
| Firmware | Low-level software stored on the hardware itself. |
| ROM BIOS | Old name; the BIOS is now in flash, not read-only memory. |
| Flash memory | Rewritable storage on the board holding the BIOS. |
| POST | Power-On Self-Test; the start-up hardware check. |
| Bootloader | The stage that loads (or offers a choice of) the OS. |
| Dual BIOS | Main plus backup BIOS chips for safe recovery. |
| Legacy BIOS | Traditional text-based, keyboard-navigated firmware. |
| UEFI | Unified Extensible Firmware Interface; the modern standard. |
| Secure Boot | UEFI feature that only lets signed boot code run. |
| Virtualisation setting | Advanced CPU option (VT-x / AMD-V) enabling hypervisors. |
| Boot order | The sequence of devices the firmware tries to boot from. |
| Supervisor password | A firmware password protecting BIOS settings. |
| CR2032 | The coin cell backing BIOS settings and the clock. |
| Baseline | The documented known-good firmware version and settings. |

## Review questions

1. What does BIOS stand for, and give two other names for it.
2. Where is the BIOS stored on a modern motherboard, and why is "ROM BIOS" now a
   misnomer?
3. What does POST check, and what happens if a core component fails?
4. What is the bootloader, and what does reaching it tell you?
5. Why do some motherboards have two BIOS chips?
6. Roughly how old is the legacy BIOS design, and what is its main limitation
   with new hardware?
7. How is a legacy BIOS navigated?
8. What does UEFI stand for, and who created the standard?
9. Give two advantages UEFI has over legacy BIOS.
10. Name four categories of setting you would find in a UEFI interface.
11. What should you always do before making a BIOS change or update, and why?
12. Scenario: after a disk wipe and clean OS reinstall, a machine is still
    infected. What class of problem should you suspect, and why?

## Answer key

1. **Basic Input/Output System; also firmware, system BIOS or ROM BIOS.** Same
   component, different names.
2. **In flash memory on the motherboard; it is no longer read-only, so it can be
   updated.** The ROM name is historical.
3. **It checks core hardware (CPU, memory, keyboard/mouse); a failure shows an
   error message instead of continuing.** A go/no-go start-up test.
4. **The stage that loads the OS (sometimes offering a choice); reaching it means
   POST has passed.** Hand-off point to the OS.
5. **A main and a backup, so a failed or interrupted BIOS update can be
   recovered.** Safety during flashing.
6. **More than twenty-five years old; it was built for legacy hardware and may
   not support newer hardware.** Age is the constraint.
7. **From the keyboard — arrow keys plus Enter, Space and function keys, with
   choices listed at the bottom (no mouse).** Text-based navigation.
8. **Unified Extensible Firmware Interface; created by Intel.** The modern
   standard.
9. **Consistency across manufacturers and a graphical, mouse-driven interface (it
   also enables Secure Boot) — any two.** Standardised and friendlier.
10. **Device info, CPU/virtualisation (advanced), power, security, boot/startup —
    any four.** Plus a CPU/firmware overview.
11. **Back up and document the current configuration, in case you need to revert
    a change that harms reliability.** Critical settings live here.
12. **Firmware-level malware (a bootkit / UEFI implant), because it lives below
    the OS and survives a disk wipe.** Reinstalling the OS does not clear it.
