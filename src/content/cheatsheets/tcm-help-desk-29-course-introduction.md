---
title: "Help Desk: Course Introduction"
description: "TCM Practical Help Desk section 1 — what the course covers, how lessons are formatted, lab requirements, and how to ask for help well."
tags: ["help-desk", "tcm", "it-fundamentals"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tcm-help-desk"
module: "§1"
moduleOrder: 29
unit: 1
---
> **In one line:** a zero-to-Tier-1 course — theory, then hands-on labs — and the habits you set up now (notes, lab, asking good questions) carry the rest of it.

*Companion to: TCM Security, Practical Help Desk, section 1.*

---

## What the course covers

| Area | What you'll be able to do |
|---|---|
| IT in business | Explain what an IT department does and where help desk fits |
| Computing | Explain binary, bits, bytes and how a computer computes |
| Hardware | Identify, remove and replace desktop and laptop components |
| Operating systems | Explain the kernel and userland, file systems and file types |
| Virtualization | Install a hypervisor and build Windows and Linux VMs |
| Administration | Install, configure and troubleshoot Windows and Linux |
| Networking | IP addressing, the OSI model, and network troubleshooting tools |
| Support skills | Remote support, security fundamentals, and self-hosted ticketing |
| Capstone | Build and administer a Windows Active Directory environment |

The course maps to TCM's **PHDA** (Practical Help Desk Associate) certification, the first step on their Security Operations path.

---

## Lesson formats

| Marker | Format |
|---|---|
| (plain) | Video lesson |
| 🖥️ | Hands-on lab — do it, don't just watch it |
| 🎟️ | **Ticket Interrupt** — a realistic support ticket to solve with what you've just learned |
| ✏️ | Check-In Quiz at the end of each section |

---

## Lab requirements

| Resource | Recommended |
|---|---|
| RAM | At least 8 GB — 8–12 GB or more to run several VMs |
| Free disk | 80–100 GB |
| Storage type | SSD strongly recommended |
| CPU | Virtualization (VT-x / AMD-V) enabled in firmware |

```powershell
# Is virtualization enabled? (Windows)
systeminfo | findstr /i "Virtualization"          # look for "Virtualization Enabled In Firmware: Yes"
(Get-CimInstance Win32_Processor).VirtualizationFirmwareEnabled
```

```bash
# Linux: a non-zero count means the CPU supports it
grep -Ec '(vmx|svm)' /proc/cpuinfo
```

If Hyper-V or WSL is already running on Windows, `systeminfo` may instead say a hypervisor has been detected. That also means virtualization is on.

---

## Asking for help (course Discord and later, real tickets)

A good question is shaped exactly like a good ticket:

| Include | Example |
|---|---|
| What you were trying to do | "Install Ubuntu in VirtualBox for the Linux lab" |
| What happened | "VM won't start: VT-x is not available" |
| Exact error text | Paste it — don't paraphrase |
| What you've tried | "Checked BIOS, rebooted, disabled Hyper-V" |
| Environment | Host OS, hypervisor and version, RAM given to the VM |

---

## 🔐 Security notes

- **Redact before you share.** Screenshots in public channels can leak usernames, hostnames, IP addresses, email addresses, licence keys and tokens.
- **Keep labs separate from work and personal machines.** Use VMs you can snapshot and destroy.
- **Credentials in lab write-ups:** fine for throwaway lab accounts, never for anything real.

---

## Practice drills

<details>
<summary>1. Does this PC meet the lab spec?</summary>

Check RAM and CPU with `Get-CimInstance Win32_ComputerSystem | Select-Object TotalPhysicalMemory` and `Get-CimInstance Win32_Processor`. Check free disk with `Get-Volume`.
</details>

<details>
<summary>2. Rewrite "my VM doesn't work, help" as a useful question.</summary>

Goal, exact error, what you've tried, and environment — e.g. "Ubuntu VM in VirtualBox 7 fails with 'VT-x is not available'; virtualization is enabled in BIOS; Hyper-V was on and I've now disabled it; host is Windows 11 with 16 GB RAM."
</details>

<details>
<summary>3. What's a 🎟️ Ticket Interrupt for?</summary>

Practising the section's skills on a realistic support request, the way the job actually arrives.
</details>

---

## Key takeaways

- The course runs from IT basics to an Active Directory capstone and lines up with the PHDA certification.
- Labs need roughly 8–12 GB RAM, 80–100 GB on an SSD, and virtualization switched on.
- Ask questions the way you'll write tickets: goal, exact error, what you tried, environment.
