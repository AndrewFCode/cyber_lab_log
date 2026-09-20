---
title: "TryHackMe: Operating System Basics"
description: "Pre Security module 3 — what an OS does, Windows basics (interface, system tools, apps, files, security settings) and Linux basics, with the commands for each."
tags: ["tryhackme", "windows", "linux", "operating-systems"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tryhackme"
module: "Module 3"
moduleOrder: 37
unit: 3
---
> **In one line:** the OS is the manager between you, your apps and the hardware — learn to find your way around Windows and Linux, and where each keeps its security settings.

*Companion to: TryHackMe Pre Security (2026 path), module 3 — rooms include **Operating Systems: Introduction** and **Windows Basics**, with Linux covered alongside.*

> ⚠ Built from the room outlines, not personal notes. Check room-specific details and any room names I haven't listed.

---

## What an OS does

| Job | Meaning |
|---|---|
| Process management | Decides which program runs on the CPU, and when |
| Memory management | Gives each program RAM and keeps them apart |
| File management | Organises data into files and folders on disk |
| Device management | Talks to hardware through drivers |
| User management and security | Accounts, permissions, sign-in |
| User interface | Desktop (GUI) and command line (CLI) |

Deeper version: [TCM Help Desk section 6](/resources/tcm-help-desk/6/).

---

## Windows basics

### Interface

| Area | Use |
|---|---|
| Start menu | Launch apps; type to search |
| Taskbar | Running apps, system tray, clock, notifications |
| File Explorer (`Win+E`) | Browse files and folders |
| Settings (`Win+I`) | Modern configuration |
| Control Panel (`control`) | Classic configuration — still needed for some things |

### Quick-launch tools (`Win+R`, then type)

| Command | Opens |
|---|---|
| `winver` | Windows version and build |
| `msinfo32` | System Information |
| `taskmgr` | Task Manager — processes, performance, startup apps |
| `resmon` | Resource Monitor — detailed CPU, disk, network and memory |
| `appwiz.cpl` | Programs and Features — uninstall apps |
| `sysdm.cpl` | System Properties — computer name, remote access, advanced |
| `ncpa.cpl` | Network Connections |
| `services.msc` | Services |
| `eventvwr.msc` | Event Viewer — logs |
| `compmgmt.msc` | Computer Management (disks, users, services, logs in one) |
| `diskmgmt.msc` | Disk Management |
| `lusrmgr.msc` | Local Users and Groups (Pro/Enterprise only) |
| `wf.msc` | Windows Defender Firewall with Advanced Security |
| `regedit` | Registry Editor |
| `windowsdefender:` | Windows Security (via `start windowsdefender:`) |

### Files and folders

- **Paths:** `C:\Users\andrew\Documents` — drive letter, backslashes.
- **Key folders:** `C:\Windows` (OS), `C:\Program Files` (64-bit apps), `C:\Program Files (x86)` (32-bit apps), `C:\Users\<name>` (profiles).
- **Hidden items and file name extensions:** turn both on in Explorer → View → Show.

### Security settings

| Setting | Where / check |
|---|---|
| Antivirus (Microsoft Defender) | Windows Security → Virus & threat protection · `Get-MpComputerStatus` |
| Firewall | Windows Security → Firewall · `Get-NetFirewallProfile \| Select-Object Name, Enabled` |
| Updates | Settings → Windows Update |
| User Account Control (UAC) | Prompts before admin-level changes — leave it on |
| Account type | Standard vs Administrator — `net user <name>`, `whoami /groups` |

```powershell
Get-MpComputerStatus | Select-Object RealTimeProtectionEnabled, AntivirusSignatureLastUpdated
Update-MpSignature                          # update Defender definitions
Start-MpScan -ScanType QuickScan            # run a quick scan
systeminfo                                  # OS, build, hotfixes, boot time
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10
```

---

## Linux basics

| Task | Command |
|---|---|
| Who am I? What groups? | `whoami` · `id` |
| System info | `uname -a` · `cat /etc/os-release` · `hostname` |
| Where am I? What's here? | `pwd` · `ls -la` |
| Move around | `cd /etc` · `cd ~` · `cd ..` |
| Read a file | `cat file` · `less file` |
| Processes | `ps aux` · `top` · `kill <PID>` |
| Run as admin | `sudo <command>` |
| Update software (Debian/Ubuntu) | `sudo apt update && sudo apt upgrade` |
| Install software | `sudo apt install <package>` |
| Permissions | `ls -l` · `chmod 640 file` · `sudo chown user:group file` |

Full depth: [Linux ch. 1–7](/resources/linux/) and the Ultimate sheet's users, permissions and processes topic.

### Windows vs Linux at a glance

| | Windows | Linux |
|---|---|---|
| Admin account | Administrator (UAC prompts) | root (`sudo` per command) |
| Paths | `C:\Users\andrew` | `/home/andrew` |
| Separator | `\` | `/` |
| Case-sensitive names | No | Yes |
| Settings stored in | Registry + config files | Text files in `/etc` and `~/.config` |
| Logs | Event Viewer | `/var/log`, `journalctl` |
| Install software | Installers, winget, Store | Package manager (`apt`, `dnf`) |

---

## 🔐 Security notes

- **Use a standard account day to day.** Elevate only when needed — UAC on Windows, `sudo` on Linux. Malware inherits the rights of whoever runs it.
- **Keep Defender real-time protection, the firewall and updates on.** Turning them off "to make something work" is how incidents start.
- **Weak passwords and command history leak access.**
  - Remote logins like SSH get brute-forced when passwords are weak.
  - Credentials typed on the command line sit in `~/.bash_history` or the PowerShell history file.
- **Know your logs.** Event Viewer (Security log: 4624 / 4625 logons) and `/var/log/auth.log` are where investigations begin.

---

## Practice drills

<details>
<summary>1. Find the exact Windows version and build in under five seconds.</summary>

`Win+R` → `winver`
</details>

<details>
<summary>2. Is Defender's real-time protection on, and when were signatures last updated?</summary>

`Get-MpComputerStatus | Select-Object RealTimeProtectionEnabled, AntivirusSignatureLastUpdated`
</details>

<details>
<summary>3. Which tool shows which apps launch at startup?</summary>

Task Manager (`taskmgr`) → Startup apps tab.
</details>

<details>
<summary>4. You need root for one Linux command. How, and why not log in as root?</summary>

`sudo <command>`. Each use is logged, and you're not running everything with full privileges.
</details>

<details>
<summary>5. Where would you look first for failed logons on each OS?</summary>

Windows: Event Viewer → Security log, event 4625. Linux: `/var/log/auth.log` (or `/var/log/secure`).
</details>

---

## Key takeaways

- An OS manages processes, memory, files, devices, users and the interface.
- Windows: know the `Win+R` shortcuts (`winver`, `taskmgr`, `services.msc`, `eventvwr.msc`, `ncpa.cpl`) and where Windows Security lives.
- Linux: `whoami`, `ls -la`, `cd`, `ps aux`, `sudo`, `apt`, `chmod`.
- Standard accounts plus elevation, updates on, protection on, and logs are your friend.
