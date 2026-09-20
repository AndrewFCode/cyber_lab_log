---
title: "Code: The Operating System"
description: "Code ch. 26 — why raw hardware needs an OS: the kernel, system calls, processes and multitasking, memory management, file systems and drivers."
tags: ["code", "petzold", "computing", "operating-systems"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 26"
moduleOrder: 26
unit: 26
---
> **In one line:** the operating system is the program that manages every other program — turning bare, awkward hardware into something applications (and people) can actually use.

*Companion to: Charles Petzold, Code (2nd edition), chapter 26.* See also [TCM Help Desk section 6](/resources/tcm-help-desk/6/) and [TryHackMe module 3](/resources/tryhackme/3/).

---

## Why an OS exists

Without one, every program would have to drive the disk, memory and screen itself. The OS provides shared services so they don't have to.

| The OS manages | Provides |
|---|---|
| Processes | Runs many programs, sharing the CPU |
| Memory | Gives each program its own space; virtual memory |
| Files | Turns raw disk blocks into files and folders |
| Devices | Drivers, so apps don't talk to hardware directly |
| Users and security | Accounts, permissions, isolation |
| Interface | The shell and system calls |

---

## Kernel and system calls

| Mode | Runs there |
|---|---|
| Kernel mode (privileged) | The kernel and drivers — full hardware access |
| User mode (restricted) | Applications |

A program in user mode asks the kernel for anything privileged through a **system call** (open a file, send on the network, start a process). The boundary is enforced by the CPU — it's the OS's core security line.

---

## Processes and multitasking

| Concept | Meaning |
|---|---|
| Process | A running program, with its own memory |
| Thread | A stream of execution inside a process |
| Scheduler | Decides which thread runs next |
| Context switch | Save one process's registers, load another's — fast enough to look simultaneous |
| Preemptive multitasking | The OS can interrupt (via the timer interrupt) and switch, so one program can't hog the CPU |

---

## Memory and files

- **Virtual memory:** each process sees its own private address space; the **MMU** maps it to physical RAM, using disk (page file / swap) as overflow. This also **isolates** processes from each other.
- **File system:** directories, permissions and metadata over raw blocks (NTFS, ext4, APFS — see [TCM section 6](/resources/tcm-help-desk/6/)).

---

## Try it

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5
Get-Service | Where-Object Status -eq 'Running' | Measure-Object      # count running services
```

```bash
ps aux --sort=-%cpu | head       # busiest processes
top                              # live scheduler view
strace -c ls                     # count the system calls one command makes
```

---

## 🔐 Security and IT connections

- **Process isolation is a security boundary.** Virtual memory stops one process reading another's. **Privilege escalation** is the act of breaking out of a low-privilege process into kernel or admin context.
- **The user/kernel boundary is the prize.** Most serious exploits aim to get code running in kernel mode, where nothing above can stop it. That's why patching the kernel matters most.
- **The scheduler and shared hardware leak.** Side-channel attacks (Spectre-class) exploit CPU features shared across processes.
- **Everyday defence:** run as a standard user, keep the OS patched, and limit what services run — every running process is attack surface.

---

## Practice drills

<details>
<summary>1. What's the difference between kernel mode and user mode?</summary>

Kernel mode has full hardware access; user mode is restricted and must use system calls for privileged actions.
</details>

<details>
<summary>2. What does a context switch do?</summary>

Saves the current process's registers and loads another's, so the CPU can switch between processes.
</details>

<details>
<summary>3. How does virtual memory contribute to security?</summary>

Each process gets its own address space, so one process can't read or corrupt another's memory.
</details>

---

## Key takeaways

- The OS manages processes, memory, files, devices, users and the interface.
- The kernel runs privileged; apps use system calls across a CPU-enforced boundary.
- Multitasking is fast context switching; virtual memory isolates processes.
- That isolation and the user/kernel line are the security boundaries attackers try to break.
