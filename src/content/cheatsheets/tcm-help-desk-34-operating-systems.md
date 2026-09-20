---
title: "Help Desk: Operating Systems"
description: "TCM Practical Help Desk section 6 — what an OS does, kernel vs userland, file systems and partition styles, and file types, with commands to check each."
tags: ["help-desk", "tcm", "operating-systems", "file-systems"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tcm-help-desk"
module: "§6"
moduleOrder: 34
unit: 6
---
> **In one line:** the OS is the manager between hardware and apps — the kernel does the privileged work, userland is everything you see, and the file system decides how data sits on disk.

*Companion to: TCM Security, Practical Help Desk, section 6.*

---

## Operating systems 101

| An OS manages | Meaning |
|---|---|
| Processes | Scheduling which program gets the CPU, and when |
| Memory | Giving each program RAM and keeping them apart |
| Storage | File systems, reading and writing files |
| Devices | Drivers that talk to hardware |
| Users and security | Accounts, permissions, authentication |
| Interface | GUI and CLI shells |

| Layer | What runs there |
|---|---|
| Kernel (kernel mode, "ring 0") | Core OS and drivers — full hardware access |
| Userland (user mode, "ring 3") | Apps, services, shells — must ask the kernel via **system calls** |

| OS family | Kernel | Where you'll meet it |
|---|---|---|
| Windows | Windows NT (hybrid) | Business desktops, Active Directory, servers |
| Linux | Linux (monolithic) | Servers, cloud, network gear, security tools |
| macOS / iOS | XNU (hybrid) | Apple devices |
| Android | Linux | Most phones |

```powershell
Get-ComputerInfo -Property OsName, OsVersion, OsArchitecture
[Environment]::Is64BitOperatingSystem
```

```bash
uname -r              # kernel version
uname -m              # architecture, e.g. x86_64, aarch64
cat /etc/os-release   # distro and version
```

---

## File systems

| File system | Used by | Notes |
|---|---|---|
| NTFS | Windows system drives | Permissions (ACLs), encryption, compression, journaling |
| ReFS | Windows Server storage | Built for resilience on large volumes |
| FAT32 | Old USB sticks, boot partitions | **4 GB max file size**; no permissions; works everywhere |
| exFAT | Modern USB sticks, SD cards | No 4 GB limit; cross-platform; no permissions |
| ext4 | Linux default | Journaling, permissions |
| XFS | RHEL default | Large files and volumes |
| APFS | Current macOS | SSD-optimised, snapshots, built-in encryption |
| HFS+ | Older macOS | Legacy |

**Journaling** logs changes before making them, so a crash doesn't corrupt the file system.

| Partition style | Notes |
|---|---|
| MBR | Legacy BIOS; 4 primary partitions; 2 TB disk limit |
| GPT | Modern UEFI; up to 128 partitions on Windows; huge disks |

| Check | Windows | Linux |
|---|---|---|
| File system per volume | `Get-Volume` | `df -Th` · `lsblk -f` |
| MBR or GPT? | `Get-Disk` (the `PartitionStyle` column) | `sudo fdisk -l` ("Disklabel type") · `sudo parted -l` |
| Partitions | `Get-Partition` | `lsblk` |
| NTFS details | `fsutil fsinfo ntfsinfo C:` (elevated) | — |

**Classic ticket:** "Can't copy a 6 GB file to my USB stick." The stick is FAT32 — reformat it as exFAT, after backing up its contents.

---

## File types

| Extension | Type | First bytes (magic number) |
|---|---|---|
| `.exe` `.dll` | Windows program / library | `4D 5A` — "MZ" |
| (none) | Linux program (ELF) | `7F 45 4C 46` |
| `.pdf` | Document | `25 50 44 46` — "%PDF" |
| `.zip` `.docx` `.xlsx` `.pptx` | ZIP container (Office files are ZIPs) | `50 4B 03 04` — "PK" |
| `.png` / `.jpg` | Images | `89 50 4E 47` / `FF D8 FF` |
| `.txt` `.csv` `.log` | Plain text | — |
| `.ps1` `.bat` `.cmd` `.vbs` `.js` `.sh` `.py` | Scripts — text that runs | — |
| `.msi` | Windows installer | — |
| `.iso` `.img` | Disk images | — |
| `.lnk` | Windows shortcut | — |

- **Windows** chooses the program by **extension**. **Linux** ignores extensions; `file` reads the contents.
- Check what a file really is:

```powershell
Format-Hex .\invoice.pdf | Select-Object -First 1
```

```bash
file invoice.pdf
xxd invoice.pdf | head -n 1
```

---

## 🔐 Security notes

- **Show file extensions.** Explorer → View → Show → **File name extensions**. With them hidden, `invoice.pdf.exe` looks like `invoice.pdf`.
- **Other extension tricks:**
  - A right-to-left-override character can make `invoice[U+202E]fdp.exe` display as `invoiceexe.pdf`.
  - Double extensions and document-style icons on `.exe` files do the same job.
  - Check the magic number.
- **Phishing favourites:** `.lnk`, `.js`, `.vbs`, `.hta`, `.iso`, `.one` and macro-enabled Office files (`.docm`, `.xlsm`).
- **Permissions don't travel.** Copying from NTFS to a FAT32/exFAT USB stick strips permissions and alternate data streams — anyone with the stick can read it. Encrypt removable media (BitLocker To Go).
- **Kernel vs user mode is a security boundary.** Malware that reaches kernel mode (rootkits, malicious drivers) can hide from tools running in user mode.

---

## Practice drills

<details>
<summary>1. Is this disk MBR or GPT?</summary>

`Get-Disk` — read the `PartitionStyle` column.
</details>

<details>
<summary>2. A 5 GB video won't copy to a USB stick that has 30 GB free. Why?</summary>

The stick is FAT32, which caps single files at 4 GB. Back up, then reformat as exFAT.
</details>

<details>
<summary>3. An attachment called <code>payslip.pdf</code> has an application icon. How do you check it?</summary>

Show extensions in Explorer, then check the first bytes with `Format-Hex`. `MZ` means it's a Windows executable.
</details>

<details>
<summary>4. Which file system would you choose for a USB stick shared between Windows and macOS?</summary>

exFAT — both read and write it, with no 4 GB limit.
</details>

<details>
<summary>5. What does a program in user mode have to do to read a file?</summary>

Make a system call — ask the kernel, which does the privileged work.
</details>

---

## Key takeaways

- The OS manages processes, memory, storage, devices, users and the interface.
- Kernel mode is privileged; userland asks it through system calls.
- NTFS for Windows, ext4 for Linux, APFS for macOS, exFAT for flash drives — FAT32 caps files at 4 GB.
- GPT with UEFI is modern; MBR with BIOS is legacy.
- Extensions tell Windows what to run; magic numbers tell you what a file really is.
