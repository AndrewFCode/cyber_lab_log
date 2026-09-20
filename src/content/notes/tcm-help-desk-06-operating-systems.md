---
title: "Help Desk: Operating Systems"
description: "An operating system (OS) manages the hardware and gives programs a consistent, safe way to use it. Without an OS, every application would need its own code to drive the disk, network card and screen — and nothing…"
tags: ["help-desk", "tcm", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TCM Security, Practical Help Desk · Section 6__

__Quick reference:__ the short version of this section is the Section 6 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what an operating system does and name its main responsibilities.
2. Distinguish the kernel from userland, and explain system calls and privilege levels.
3. Describe processes, threads, virtual memory and drivers.
4. Walk through the boot process from power-on to login.
5. Compare the major file systems and partition styles, and choose the right one for a job.
6. Explain how operating systems identify file types, and use magic numbers to find a file's real type.
7. Recognise file-type tricks used in attacks.

## 1. What an operating system does

An __operating system (OS)__ manages the hardware and gives programs a consistent, safe way to use it. Without an OS, every application would need its own code to drive the disk, network card and screen — and nothing would stop one program trampling on another.

__Responsibility__

__What it means__

Process management

Starting, scheduling and stopping programs; sharing the CPU between them

Memory management

Giving each program its own memory and keeping them apart

Storage management

File systems: organising data into files and folders on disk

Device management

Drivers that translate between the OS and each piece of hardware

Security

User accounts, permissions, authentication, isolation

User interface

A GUI (desktop) and CLIs (shells like PowerShell and Bash)

Networking

Network stacks so apps can communicate

## 1.1 OS families

__Family__

__Kernel__

__Found on__

Windows

NT kernel (hybrid)

Most business desktops and laptops; Windows Server

Linux

Linux (monolithic, with loadable modules)

Most servers, cloud, network appliances, Android, security tools

macOS / iOS / iPadOS

XNU (hybrid)

Apple devices

ChromeOS

Linux

Education and lightweight laptops

__Linux distributions__ (distros) package the Linux kernel with tools and a desktop:

- __Debian / Ubuntu__ — apt package manager.
- __Red Hat Enterprise Linux / Fedora__ — dnf.
- __Kali__ — security testing tools.

## 2. Kernel and userland

## 2.1 Two worlds

 \+-------------------------------------------------------\+
 |  USERLAND (user mode / "ring 3")                        |
 |  Browser   Outlook   PowerShell   Services   Your app   |
 \+--------------------------\+----------------------------\+
                            |  system calls
 \+--------------------------v----------------------------\+
 |  KERNEL (kernel mode / "ring 0")                        |
 |  Scheduler  Memory manager  File systems  Drivers       |
 \+--------------------------\+----------------------------\+
                            |
 \+--------------------------v----------------------------\+
 |  HARDWARE   CPU   RAM   Disk   Network   USB            |
 \+-------------------------------------------------------\+

__Kernel mode__

__User mode__

Access

Unrestricted — any memory, any hardware

Restricted — only its own memory

What runs there

The kernel and drivers

Applications and most services

If it crashes

The whole system crashes (Windows blue screen, Linux kernel panic)

Only that program crashes

The CPU enforces the boundary with hardware __privilege levels__ ("rings").

## 2.2 System calls

A user-mode program can't touch hardware directly. It asks the kernel with a __system call__ — "open this file", "send these bytes", "start a process". The kernel checks permission, does the privileged work and returns the result.

__Worked example — opening a document:__

1. You double-click report.docx. Explorer asks the kernel to start Word — a system call to create a process.
2. Word asks to open the file (another system call).
3. The kernel checks the file system permissions for your account.
4. The kernel's file system driver reads the blocks from disk through the storage driver.
5. The data is copied into Word's memory and control returns to Word.

## 2.3 Drivers

A __driver__ is software that lets the OS talk to a specific piece of hardware. Most run in kernel mode, which is why a buggy driver can crash the whole system — faulty drivers are a leading cause of blue screens.

\

# devices with driver problems
Get-PnpDevice -PresentOnly | Where-Object Status -ne 'OK'
driverquery /v | more                                          \

# installed drivers
lsmod | head          \

# loaded kernel modules (drivers)

## 3. Processes, threads and memory

__Concept__

__Meaning__

Program

Code on disk, e.g. notepad.exe

Process

A running instance of a program, with its own memory space and a process ID (PID)

Thread

A sequence of execution within a process; a process can have many

Scheduler

Kernel component that decides which thread runs on which CPU core, and when

Context switch

Saving one thread's state and loading another's — thousands of times a second

## 3.1 Virtual memory

Every process sees its __own private address space__, as if it had the machine to itself. The OS and the CPU's __memory management unit (MMU)__ map those virtual addresses to physical RAM.

__Benefits:__

- __Isolation:__ one process can't read or corrupt another's memory.
- __Overcommit:__ processes can use more memory than there is physical RAM. Less-used pages move to disk:
	- Windows: the __page file__ (pagefile.sys)
	- Linux: __swap__
- __Simplicity:__ programs don't need to know where they physically sit in RAM.

__The cost:__ when RAM runs out and the OS constantly swaps to disk ("thrashing"), everything becomes painfully slow. That's the classic "PC slow with lots of tabs open" ticket; the fix is more RAM or fewer running programs.

Get-Process |
    Sort-Object WorkingSet64 -Descending |
    Select-Object -First 5 Name, Id, @\{n='MB';e=\{\[int\]($\_.WorkingSet64/1MB)\}\}
ps aux --sort=-%mem | head -6
free -h

## 4. The boot process

__Stage__

__Windows__

__Linux__

1. Firmware

UEFI runs POST, initialises hardware

Same

2. Boot device

Firmware reads the boot order and finds the EFI system partition

Same

3. Bootloader

Windows Boot Manager (bootmgfw.efi)

GRUB

4. Kernel loads

ntoskrnl.exe plus boot drivers

vmlinuz plus initramfs

5. First processes

Session Manager (smss.exe) → wininit.exe / winlogon.exe

systemd (PID 1)

6. Services start

Service Control Manager (services.exe)

systemd units

7. Login

Sign-in screen; user profile loads

Display manager or console login

__Secure Boot__ checks that the bootloader is signed by a trusted key, so boot-level malware can't slip in before the OS.

## 5. File systems

## 5.1 What a file system does

A disk is just billions of numbered blocks. A __file system__ organises them. It records:

- __which blocks belong to which file__ (allocation);
- __names, folders and paths__ (directories);
- __metadata:__ size, timestamps, owner;
- __permissions:__ who can read, write or execute.

Many also keep a __journal__: they log intended changes before making them, so a crash or power cut doesn't corrupt the structure.

## 5.2 Common file systems

__File system__

__Used by__

__Max file size__

__Permissions__

__Journaling__

__Notes__

NTFS

Windows system and data drives

Huge (16 TB\+ in practice)

Yes (ACLs)

Yes

Encryption (EFS), compression, alternate data streams, shadow copies

FAT32

Old USB sticks, EFI partitions

__4 GB__

No

No

Works almost everywhere

exFAT

Modern USB sticks, SD cards

Huge

No

No

Cross-platform, no 4 GB limit

ReFS

Windows Server storage

Huge

Yes

Integrity streams

Resilience for large volumes

ext4

Linux default

16 TB

Yes

Yes

Mature, reliable

XFS

RHEL default

Huge

Yes

Yes

Large files, high performance

APFS

macOS

Huge

Yes

Copy-on-write

Snapshots, native encryption, SSD-optimised

## 5.3 Clusters (allocation units)

A file system allocates space in __clusters__. With 4 KB clusters, a 1-byte file still uses 4 KB on disk ("size on disk" vs "size" in File Properties). Larger clusters waste space on small files but can speed up very large ones.

## 5.4 Partitions and partition styles

A __partition__ is a slice of a disk; each holds one file system (a __volume__).

__MBR__

__GPT__

Firmware

Legacy BIOS

UEFI

Max disk size

2 TB

Effectively unlimited

Partitions

4 primary (or 3 \+ extended)

128 on Windows

Resilience

Single partition table

Primary and backup tables, with CRC checks

__A typical Windows GPT disk:__

 \[EFI System (FAT32, ~100 MB)\] \[MSR (16 MB)\] \[Windows C: (NTFS)\] \[Recovery (NTFS)\]

### 5.5 Worked example — choosing a file system

__Scenario__

__Choice__

__Reason__

Windows laptop system drive

NTFS

Permissions, encryption, journaling

USB stick shared between Windows and Mac, with 6 GB videos

exFAT

Cross-platform, no 4 GB limit

USB stick for an old car stereo

FAT32

Maximum compatibility; files are small

Ubuntu server data disk

ext4 (or XFS)

Linux-native, journaled, permissions

External drive for a Mac's Time Machine

APFS

macOS-native backup target

## 5.6 Checking disks and volumes

Get-Disk                                \

# PartitionStyle: MBR or GPT
Get-Partition
Get-Volume                              \

# FileSystemType, size, free space
fsutil fsinfo ntfsinfo C:               \

# NTFS details (elevated)
lsblk -f              \

# devices, file systems, mount points
df -Th                \

# file system type and usage
sudo fdisk -l         \

# "Disklabel type: gpt" or "dos" (MBR)

__Caution:__ formatting erases a volume. Commands like Format-Volume and mkfs.ext4 destroy data on the target instantly. Triple-check the drive letter or device name, and confirm backups first.

## 6. File types

## 6.1 How an OS decides what a file is

__OS__

__Method__

Windows

Mainly the __extension__ (.docx, .exe). File associations map each extension to a program

Linux

Doesn't rely on extensions. Executability comes from the permission bit; tools like file inspect the __content__

macOS

Extensions plus type metadata

Web browsers and servers

__MIME types__, e.g. text/html, application/pdf, image/png

In Command Prompt, assoc .txt shows the file type an extension maps to (e.g. .txt=txtfile), and ftype txtfile shows the command that opens it:

assoc .txt
ftype txtfile

### 6.2 Common file types

__Category__

__Extensions__

Executables

.exe, .msi (installer), .dll (library), .com, .scr (screensaver — also an executable)

Scripts

.ps1, .bat, .cmd, .vbs, .js, .hta, .sh, .py

Documents

.docx, .xlsx, .pptx, .pdf, .txt, .csv, .rtf

Macro-enabled Office

.docm, .xlsm, .pptm

Archives and images

.zip, .7z, .rar, .iso, .img

Media

.jpg, .png, .gif, .mp3, .mp4

Shortcuts

.lnk (Windows), .url

## 6.3 Magic numbers

Many formats begin with a fixed __signature__ — a magic number — in their first bytes:

__Format__

__First bytes (hex)__

__As text__

Windows executable (PE)

4D 5A

MZ

Linux executable (ELF)

7F 45 4C 46

.ELF

PDF

25 50 44 46

%PDF

ZIP (and .docx / .xlsx, which are ZIP files)

50 4B 03 04

PK..

PNG

89 50 4E 47

.PNG

JPEG

FF D8 FF

—

__Worked example — is this "invoice" really a PDF?__

A user received invoice.pdf and double-clicking it did "nothing".

1. __Show extensions:__ Explorer → View → Show → File name extensions. The name is actually invoice.pdf.exe.
2. __Check the header:__

Format-Hex .\\invoice.pdf.exe | Select-Object -First 1- It starts 4D 5A ("MZ") — a Windows program, not a document.

1. __Response:__ don't run it again. Isolate the PC per policy and report it to security as a likely malware execution. Double-clicking an executable that "does nothing" often means it ran silently.

__Linux equivalent:__

file invoice.pdf              \

# "PE32 executable" gives it away
xxd invoice.pdf | head -n 1

## 7. Security perspective

- __Always show file extensions__ on managed PCs (a Group Policy setting). Hidden extensions are an attacker's best friend.
- __Extension tricks:__
	- __Double extensions:__ invoice.pdf.exe.
	- __Right-to-left override:__ the invisible Unicode character U\+202E reverses the display, so invoice\[U\+202E\]fdp.exe shows as invoiceexe.pdf.
	- __Misleading icons:__ an executable carrying a PDF or Word icon.
- __Phishing favourites:__ .lnk, .js, .vbs, .hta, .iso, .img, .one, and macro-enabled Office files.
- __Kernel mode is the prize.__
	- Malware that reaches kernel mode — a rootkit or malicious driver — can hide from user-mode security tools.
	- Driver signing, Secure Boot and memory integrity (HVCI) defend it.
- __Permissions depend on the file system.__ FAT32 and exFAT have no permissions: anyone with the USB stick can read everything. Encrypt removable media (BitLocker To Go).
- __Alternate data streams (NTFS)__ can hide data inside a file. The Zone.Identifier stream is how Windows marks downloaded files ("Mark of the Web").

# Summary

- __An OS manages__ processes, memory, storage, devices, security, networking and the interface.
- __Kernel vs userland:__ the kernel runs in privileged kernel mode; apps run in user mode and use system calls. Drivers mostly run in the kernel, so bad drivers crash systems.
- __Processes and memory:__ processes own memory; threads run; the scheduler shares the CPU. Virtual memory isolates processes and uses page file/swap when RAM runs short.
- __Boot:__ UEFI/POST → bootloader → kernel → first processes → services → login. Secure Boot protects the start of the chain.
- __Storage:__ file systems organise blocks. NTFS (Windows), ext4 (Linux), APFS (macOS), exFAT (USB, no 4 GB limit), FAT32 (4 GB limit). GPT is the modern partition style; MBR is legacy.
- __File types:__ Windows trusts extensions; magic numbers reveal the truth. Show extensions, and treat unexpected executables and scripts as dangerous.

# Glossary

__Term__

__Definition__

Operating system

Software that manages hardware and provides services to programs

Kernel

The core of the OS, running with full privileges

Userland / user mode

Restricted environment where applications run

System call

A request from a program to the kernel for a privileged service

Driver

Software that lets the OS control a specific device

Process / PID

A running program / its process ID

Thread

A unit of execution within a process

Scheduler

The kernel part that decides which thread runs when

Virtual memory

A private address space per process, mapped to physical RAM by the MMU

Page file / swap

Disk space used as overflow for RAM

Thrashing

Constant swapping that makes a system crawl

Bootloader

Program that loads the OS kernel (Windows Boot Manager, GRUB)

File system

A structure that organises data on a volume into files and folders

Journaling

Logging changes before making them, to survive crashes

Cluster / allocation unit

The smallest unit of disk space a file system allocates

Partition / volume

A slice of a disk / a formatted partition

MBR / GPT

Legacy / modern partition table formats

File association

Mapping from a file extension to the program that opens it

MIME type

A standard label for content type used on the web

Magic number

Fixed bytes at the start of a file identifying its format

Alternate data stream

NTFS feature allowing hidden extra data attached to a file

# Review questions

1. What is a system call, and why can't apps just access hardware directly?
2. Why can a faulty driver crash the entire system, when a faulty app usually can't?
3. What's the difference between a process and a thread?
4. A PC with 8 GB of RAM becomes very slow with 40 browser tabs open and the disk light is constantly on. Explain.
5. Put these boot stages in order: services start, POST, bootloader, kernel loads, login.
6. Which file system would you choose for a USB drive holding 10 GB video files used on Windows and macOS?
7. A 3 TB disk needs to boot Windows. Which partition style and why?
8. What does journaling protect against?
9. How does Windows decide which program opens a file? How does Linux's file command decide what a file is?
10. A file named photo.jpg starts with bytes 4D 5A. What is it really, and what should you do?
11. Name two file-extension tricks attackers use.
12. Why is data on an exFAT USB stick unprotected even when the PC it came from has strict NTFS permissions?

# Answer key

1. __A request from a user-mode program asking the kernel to do something privileged.__ Apps run in user mode, which the CPU blocks from touching hardware directly; this protects stability and security.
2. __Most drivers run in kernel mode with full access__, so a bug corrupts the whole system. Apps run in isolated user mode.
3. __A process is a running program with its own memory; a thread is a sequence of execution within it.__ A process can have many threads sharing its memory.
4. __RAM is exhausted, so the OS keeps swapping pages to the page file (thrashing).__ Disk is far slower than RAM. __Fix:__ close tabs or programs, or add RAM.
5. __POST → bootloader → kernel loads → services start → login.__
6. __exFAT__ — cross-platform with no 4 GB file limit (FAT32 can't hold a 10 GB file).
7. __GPT__ — MBR can't address beyond 2 TB, and modern UEFI boots from GPT.
8. __Corruption of the file system's structure__ after a crash or power loss.
9. __Windows uses the file extension and its association.__ file reads the content's signature (magic number).
10. __A Windows executable disguised as an image.__ Don't open it; report it to security and follow the malware procedure.
11. __Any two of:__ double extensions (.pdf.exe), the right-to-left override character, misleading icons, hidden extensions.
12. __exFAT has no permission system__, so the NTFS permissions are lost when files are copied to the stick. Anyone with the stick can read the files — encrypt it instead.
