---
title: "TryHackMe: Computer Fundamentals"
description: "Pre Security module 2 — what's inside a computer, how components connect, the boot process, and the many types of computer you'll need to secure."
tags: ["tryhackme", "hardware", "computing"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tryhackme"
module: "Module 2"
moduleOrder: 36
unit: 2
---
> **In one line:** you can't defend what you don't understand — learn the parts, how they talk, how a machine boots, and how many shapes "a computer" comes in.

*Companion to: TryHackMe Pre Security (2026 path), module 2 — rooms include **Inside a Computer System** and **Computer Types**.*

> ⚠ Built from the room outlines, not personal notes. Check any room-specific details against the rooms.

---

## Inside a computer system

| Part | Job | Analogy |
|---|---|---|
| CPU | Executes instructions | The brain |
| RAM | Fast, temporary working memory — cleared at power-off | Short-term memory |
| Storage (SSD / HDD) | Keeps data permanently | Long-term memory |
| Motherboard | Connects everything with buses and slots | The nervous system |
| PSU | Converts mains power for the components | The heart |
| GPU | Draws the display; parallel maths | Visual system |
| NIC | Connects to networks; holds the MAC address | Voice and ears |
| Firmware (BIOS / UEFI) | First code that runs; starts the hardware and finds the OS | Reflexes on waking |

**The speed ladder:** CPU registers → cache → RAM → SSD → HDD. Each step down is bigger, cheaper and slower.

---

## The boot process

| Step | What happens |
|---|---|
| 1. Power on | PSU stabilises and signals "power good" |
| 2. Firmware | UEFI/BIOS runs the **POST** hardware checks |
| 3. Boot device | Firmware follows the boot order to a disk, USB or network |
| 4. Bootloader | Windows Boot Manager or GRUB loads the OS kernel |
| 5. Kernel | Loads drivers and takes control of the hardware |
| 6. Services | Background services start (Windows services, systemd units) |
| 7. Login | The user signs in and their session starts |

```powershell
(Get-CimInstance Win32_OperatingSystem).LastBootUpTime       # when did it last boot?
Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model, TotalPhysicalMemory
msinfo32                                                     # everything, in a GUI
```

```bash
uptime -s                    # last boot time
systemd-analyze              # how long boot took
systemd-analyze blame        # which services slowed it down
journalctl -b                # logs from this boot
```

---

## Computer types

| Type | Traits | Security angle |
|---|---|---|
| Desktop | Powerful, upgradable, stays put | Physical access in offices |
| Laptop | Portable, battery, integrated parts | Loss and theft — needs encryption |
| Server | Always on, often headless, redundant PSUs and ECC RAM, rack-mounted | High-value target; runs the services everyone depends on |
| Smartphone / tablet | Always connected, sensors, app stores | Personal and work data mixed; MDM |
| Embedded system | Computer inside a device (car, appliance, medical kit) | Hard or impossible to patch |
| IoT device | Networked smart device (camera, thermostat, speaker) | Default passwords, rarely updated |
| Mainframe | Huge transaction throughput (banks, airlines) | Legacy but critical |
| Virtual machine | A computer made of software on a host | Isolation depends on the hypervisor |

```bash
hostnamectl                  # shows "Chassis" (laptop, desktop, vm...) and "Virtualization"
systemd-detect-virt          # prints the hypervisor (kvm, vmware...) or "none"
```

```powershell
(Get-CimInstance Win32_SystemEnclosure).ChassisTypes    # e.g. 3 = desktop, 9 / 10 = laptop / notebook
(Get-CimInstance Win32_ComputerSystem).Model            # "Virtual Machine" or "VMware..." gives a VM away
```

Full hardware detail: [TCM Help Desk section 4](/resources/tcm-help-desk/4/) and [A+ Core 1 domain 3](/resources/a-plus-core-1/3/).

---

## 🔐 Security notes

- **The boot chain is a target.** Bootkits load before the OS, where antivirus can't see them. **Secure Boot** checks each stage is signed, and the **TPM** records what booted.
- **Physical access means full access.** Booting from USB bypasses the OS entirely. Set a firmware password, disable USB boot, and encrypt the disk.
- **Every device type adds attack surface.** IoT and embedded devices often ship with default credentials and never get patched — segment them onto their own network.
- **RAM is volatile evidence.** Running processes, keys and malware that never touches disk live only in memory. Responders capture RAM *before* powering a machine off.

---

## Practice drills

<details>
<summary>1. Put these in boot order: kernel, POST, login, bootloader, firmware.</summary>

Firmware → POST → bootloader → kernel → login.
</details>

<details>
<summary>2. Why might a responder avoid switching off a compromised machine straight away?</summary>

RAM holds volatile evidence — processes, network connections, keys, fileless malware — which is lost at power-off.
</details>

<details>
<summary>3. How do you tell whether a Linux box is a VM?</summary>

`systemd-detect-virt` or `hostnamectl`.
</details>

<details>
<summary>4. Which device type is hardest to patch, and what do you do about it?</summary>

Embedded and IoT devices. Isolate them on their own network segment or VLAN, and change the default credentials.
</details>

---

## Key takeaways

- CPU, RAM, storage, motherboard, PSU, GPU, NIC and firmware — know each one's job.
- Boot: power → firmware and POST → boot device → bootloader → kernel → services → login.
- "Computer" covers desktops to IoT to VMs, and each brings its own security problems.
- Secure Boot, firmware passwords and encryption protect the boot chain and the physical box.
