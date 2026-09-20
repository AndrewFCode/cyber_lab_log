---
title: "Help Desk: Course Introduction"
description: "The Practical Help Desk course takes someone with no IT experience to the point where they can do the real work of a Tier 1 help desk technician. It's also the foundation TCM recommends before its more advanced…"
tags: ["help-desk", "tcm", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TCM Security, Practical Help Desk · Section 1__

__Quick reference:__ the short version of this section is the Section 1 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Describe what the Practical Help Desk course covers and how its sections build on each other.
2. Explain where a Tier 1 help desk role sits in an IT career path.
3. Plan and build a home lab: choose a hypervisor, enable virtualization, size your VMs and pick a safe network mode.
4. Use proven study techniques to retain what you learn.
5. Ask for help in a way that gets fast, useful answers — the same skill as writing a good ticket.

## 1. What this course is for

The Practical Help Desk course takes someone with __no IT experience__ to the point where they can do the real work of a __Tier 1 help desk technician__. It's also the foundation TCM recommends before its more advanced security courses.

## 1.1 The course arc

The sections build in a deliberate order: first you learn how computers work, then how to fix them, then how to run and support them at scale.

 Foundations            Hardware              Systems               Support at scale
 -----------            --------              -------               ----------------
 1 Introduction    -->  4 Desktops       -->  6 Operating      -->  Networking
 2 Intro to IT          5 Laptops              systems              Security basics
 3 Intro to                                   7 Virtualization      Remote support
   computing                                  Windows & Linux       Ticketing
                                                admin                Active Directory
                                                                     capstone

__Stage__

__Why it comes here__

Intro to IT and computing

You can't troubleshoot what you don't understand. Binary, encoding and how a CPU works explain *why* things fail

Desktop and laptop hardware

A large share of real tickets are physical: dead batteries, failing drives, loose cables

Operating systems and virtualization

Most problems live in the OS. Virtualization gives you a safe place to break and fix them

Networking, security, remote support

Modern help desks fix most issues remotely, over the network, without leaving their desk

Ticketing and Active Directory

This is the day job: tickets arrive, and most involve user accounts in a directory

## 1.2 Where Tier 1 sits

   Tier 3  Engineers / specialists  (architecture, complex fixes)
     ^
   Tier 2  Desktop support / sysadmin (deeper technical problems)
     ^
   Tier 1  Help desk  <-- this course: first contact, triage, common fixes
     ^
   Tier 0  Self-service (knowledge base, password-reset portals)

Tier 1 is the entry point for most IT careers. From there, common paths lead to:

- __Systems administration__ — servers, Active Directory, patching.
- __Networking__ — switches, routers, firewalls.
- __Security operations (SOC)__ — monitoring alerts and investigating incidents. Help desk experience matters here: SOC analysts constantly deal with user accounts, endpoints and tickets, all of which a help desk tech handles daily.

__In the real world:__ hiring managers for junior SOC roles often prefer candidates with help desk experience over those with certifications alone. Knowing how a real organisation's machines, accounts and users behave is hard to learn any other way.

## 2. How the course is delivered

## 2.1 Lesson formats

__Format__

__What it is__

__How to get the most from it__

Video lessons

Concept explanations and demonstrations

Pause and repeat demonstrations yourself; don't just watch

Hands-on labs

You perform the task in your own lab

Do every lab. This is where the learning actually happens

Ticket Interrupts

A realistic support ticket arrives mid-course

Treat it like a real job: read carefully, form a theory, test it, write up the fix

Check-in quizzes

Short tests at the end of each section

Take them *before* re-watching anything — the gaps they reveal are what to revise

## 2.2 The certification

The course lines up with TCM Security's __PHDA (Practical Help Desk Associate)__ certification. TCM positions it as the first step on its Security Operations path. TCM's certifications emphasise practical, hands-on assessment. Check the current exam format and requirements on TCM's site before you book, as details can change.

## 3. Building your home lab

A __lab__ is a set of computers you're allowed to break. For this course it will be __virtual machines (VMs)__ running on your own PC. Virtualization gets its own section later; here's what you need to get started.

## 3.1 Hardware requirements

__Resource__

__Minimum__

__Comfortable__

__Why__

RAM

8 GB

16 GB or more

Every running VM needs its own slice of memory

Free disk

80 GB

100 GB or more

Each Windows VM wants 40–60 GB

Disk type

—

SSD

VMs on a hard drive are painfully slow

CPU

4 cores

6 cores or more

Several VMs run at once

Virtualization

Must be enabled

—

Without it, VMs won't start or run very slowly

## 3.2 Choosing a hypervisor

A __hypervisor__ is the software that creates and runs virtual machines.

__Type__

__Runs on__

__Examples__

__Good for__

Type 2 (hosted)

Your normal OS, like any app

VirtualBox (free), VMware Workstation

Learning on your everyday PC — the usual choice for this course

Type 1 (bare metal)

Directly on the hardware

Proxmox VE, VMware ESXi, Hyper-V

A dedicated lab machine or server

__Exam tip:__ Type 1 = bare metal (no host OS underneath). Type 2 = hosted (runs on top of an OS). Hyper-V counts as Type 1, even though you switch it on from inside Windows.

### 3.3 Enabling hardware virtualization

Modern CPUs include hardware virtualization extensions, but they're often __switched off in the firmware__:

- __Intel__ calls it __VT-x__, often labelled "Intel Virtualization Technology".
- __AMD__ calls it __AMD-V__, often labelled "SVM Mode".

__How to check (Windows):__

- __Task Manager:__ Performance → CPU. Look for __Virtualization: Enabled__.
- __PowerShell:__

systeminfo | findstr /i "Virtualization"
(Get-CimInstance Win32\_Processor).VirtualizationFirmwareEnabled

__How to check (Linux):__

grep -Ec '(vmx|svm)' /proc/cpuinfo    \

# a number above 0 means the CPU supports it

__How to enable it:__

1. Reboot into firmware setup (usually Del or F2 during start-up).
2. Find the virtualization setting — often under Advanced, CPU Configuration, or Security.
3. Enable it, save, and reboot.

__Note:__ if Hyper-V, WSL 2 or Windows' Virtual Machine Platform is enabled, Windows itself runs on a hypervisor. systeminfo then reports that a hypervisor has been detected rather than showing the firmware setting. Most desktop hypervisors can run alongside it, sometimes with a performance cost.

### 3.4 Worked example — planning a lab on a 16 GB laptop

__Goal:__ a small Windows domain plus a Linux box, all running at once.

__Machine__

__RAM__

__Disk__

__Role__

Windows Server

4 GB

60 GB

Domain controller (the Active Directory capstone)

Windows 11

4 GB

60 GB

A "user" workstation to support

Ubuntu

2 GB

25 GB

Linux administration practice

__Total for VMs__

__10 GB__

__145 GB__

Left for the host

6 GB

—

Enough for Windows plus a browser

__Reasoning:__

- __Rule of thumb:__ never give the VMs more than about 60–70 % of physical RAM, or the host starts swapping and everything crawls.
- __Disk:__ thin-provisioned ("dynamically allocated") disks only take the space actually used. The 145 GB is a ceiling, not an up-front cost.
- __If RAM is tight,__ run only the VMs a given lab needs — you rarely need all three at once.

## 3.5 Getting operating system images

__OS__

__Source__

__Notes__

Windows 11 Enterprise

Microsoft Evaluation Center

90-day evaluation

Windows Server

Microsoft Evaluation Center

180-day evaluation

Ubuntu

ubuntu.com

Free; choose the LTS release

Only download images from the official source (see the security section).

## 3.6 VM network modes

This is the most important lab decision for safety.

__Mode (VirtualBox names)__

__VM can reach internet?__

__VMs see each other?__

__Visible on your home network?__

__Use for__

NAT

Yes

No

No

A single VM that just needs internet

NAT Network

Yes

Yes

No

__Default for this course__ — a private lab that can still update

Host-only

No

Yes (and the host)

No

Fully offline labs

Internal

No

Yes (not the host)

No

Isolated VM-only networks

Bridged

Yes

Yes

__Yes__

Only when a VM must act like a real device on your LAN

  Internet
     |
  \[Home router\] ---- your phone, TV, other PCs      <- bridged VMs appear HERE
     |
  \[Host PC\]
     |
  (virtual NAT router)                              <- NAT Network lives HERE
     |           |            |
  \[Server\]   \[Win 11\]    \[Ubuntu\]

### 3.7 Snapshots

A __snapshot__ saves a VM's complete state so you can roll back instantly.

- __Take one__ after installing and updating each OS ("clean install").
- __Take another__ before any risky lab ("before AD install").
- __Don't__ keep dozens: long snapshot chains slow the VM and eat disk space.

__In the real world:__ a snapshot is __not__ a backup. It depends on the original disk file — if that's corrupted or deleted, the snapshot goes with it.

## 4. Studying so it sticks

## 4.1 Techniques that work

__Technique__

__What you do__

__Why it works__

Active recall

Close the notes and answer questions from memory

Retrieving information strengthens memory far more than re-reading

Spaced repetition

Review after 1 day, 3 days, 1 week, 1 month

Memory decays predictably; timed reviews catch it just before you forget

Doing, not watching

Complete every lab yourself

Skills live in your hands, not in the video

Explain it simply (Feynman technique)

Teach the idea in plain words, as if to a beginner

Gaps in understanding show up immediately

Interleaving

Mix topics in one study session

Builds the ability to pick the right tool for a problem

## 4.2 A three-layer note system

__Layer__

__Purpose__

__Example__

Class notes (like these)

Full understanding, read once or twice

Why RAID 5 survives one drive failure

Cheat sheet

Fast lookup during work

RAID 5: min 3 disks, survives 1

Lab log

What *you* did, what broke, how you fixed it

"VT-x disabled in BIOS; enabled under Advanced → CPU"

The lab log is the most underrated. It becomes your personal troubleshooting database, and great interview material ("tell me about a problem you solved").

## 5. Asking for help well

Asking a good question is the same skill as writing a good ticket or escalation.

## 5.1 The anatomy of a good question

__Element__

__Bad__

__Good__

Goal

"It doesn't work"

"I'm trying to install Ubuntu in VirtualBox for the Linux lab"

Symptom

"Error"

"The VM fails to start: *VT-x is not available (VERR\_VMX\_NO\_VMX)*"

Already tried

—

"Enabled virtualization in BIOS, rebooted, turned off Hyper-V"

Environment

—

"Windows 11 host, 16 GB RAM, VirtualBox 7"

## 5.2 Worked example — rewriting a question

__Before:__

"my vm is broken pls help"

__After:__

"Goal: run the Windows 11 VM for the section 6 lab. Problem: it boots to a black screen, then shows *No bootable medium found*. Tried: checked the ISO is attached in Settings → Storage — it wasn't; I attached it and got the same result. Environment: VirtualBox 7 on Windows 11, VM set to EFI. Question: is the boot order wrong, or is this an EFI/ISO mismatch?"The second version can be answered in one reply. The first needs a round of questions just to find out what's wrong.

## 5.3 Searching error messages

- __Search the exact error text in quotes:__ "VERR\_VMX\_NO\_VMX".
- __Add the product and version:__ VirtualBox 7.
- __Remove anything personal__ (usernames, paths with your name) before pasting into a search box or a public chat.

## 6. The help desk mindset

__Habit__

__What it looks like__

Question the obvious

Is it plugged in? Is the right account signed in? Has it been restarted?

Reproduce first

See the problem yourself before changing anything

Change one thing at a time

Otherwise you won't know what fixed it

Document as you go

Your ticket notes are your memory, and your colleague's hand-over

Own the ticket

Keep the user updated until the issue is closed, even if you escalated it

Be kind

Users are often stressed; a calm tone solves half the problem

These habits are practised in each __Ticket Interrupt__. Treat every one as a real user waiting on you.

## 7. Security perspective

- __Isolate the lab.__
	- Use NAT Network or host-only modes by default.
	- Bridged mode puts vulnerable practice machines on your home network, next to your family's devices.
	- Never expose lab VMs to the internet.
- __Verify what you download.__
	- Official sources publish __SHA-256 hashes__ for their images. Compare them before use:

Get-FileHash .\\ubuntu-24.04-desktop-amd64.iso -Algorithm SHA256
sha256sum ubuntu-24.04-desktop-amd64.iso-
	- A mismatch means a corrupted or tampered file — don't use it.
- __Throwaway credentials only.__ Lab passwords should never be reused anywhere real. Assume anything typed in a lab is visible.
- __Redact before sharing.__ Screenshots can leak hostnames, usernames, IP addresses, email addresses and licence keys.
- __Snapshots are an incident-response habit in miniature.__ Knowing the last known-good state and returning to it is exactly what real recovery looks like.

# Summary

- The course takes you from zero to Tier 1 help desk: theory, then hardware, then systems, then support at scale.
- Tier 1 is the front door of IT and a proven route into security operations.
- __Lab setup:__
	- A Type 2 hypervisor on a PC with 16 GB RAM, an SSD and VT-x / AMD-V enabled.
	- Size VMs to leave the host 30–40 % of RAM.
	- Use NAT Network by default; snapshot before risky changes.
- __Study with__ active recall, spaced repetition and a lab log — not by re-watching.
- __Ask questions like tickets:__ goal, exact error, what you tried, environment.

# Glossary

__Term__

__Definition__

Help desk / service desk

The first point of contact for IT problems and requests

Tier 1

Front-line support: logging, triage, common fixes, escalation

Home lab

Your own set of machines, usually virtual, for safe practice

Virtual machine (VM)

A complete computer simulated in software

Hypervisor

Software that creates and runs virtual machines

Type 1 hypervisor

Runs directly on hardware (bare metal)

Type 2 hypervisor

Runs as an application on a host operating system

Host / guest

The physical machine / the virtual machine running on it

VT-x / AMD-V

Intel / AMD hardware virtualization extensions

ISO

A disk image file, used to install an operating system

Snapshot

A saved point-in-time state of a VM you can revert to

NAT Network

A private virtual network whose VMs can reach the internet but aren't reachable from your LAN

Bridged networking

The VM joins your physical network as if it were a real device

Thin provisioning

A virtual disk that grows only as data is written

SHA-256 hash

A fingerprint of a file, used to confirm it hasn't been altered

Active recall

Studying by retrieving information from memory rather than re-reading

# Review questions

1. A VM refuses to start with an error mentioning VT-x. What is the most likely cause? A. Not enough disk space B. Hardware virtualization is disabled in firmware C. The ISO is corrupted D. The VM has too many CPUs
2. Which hypervisor type runs directly on the hardware without a host OS?
3. You have a 16 GB host. Roughly how much RAM should you leave for the host itself?
4. Which network mode puts a VM on your home network alongside your real devices? A. NAT B. Host-only C. Bridged D. Internal
5. Why is a snapshot not a backup?
6. Name the four elements of a well-asked technical question.
7. What does comparing a SHA-256 hash protect against when downloading an ISO?
8. A lab needs VMs that talk to each other but can't reach the internet. Which mode fits best?
9. Which study technique involves reviewing material at increasing intervals?
10. Give two reasons a help desk role is a good route into security operations.

# Answer key

1. __B__ — VT-x / AMD-V disabled in firmware is by far the most common cause. Enable it in the BIOS/UEFI setup.
2. __Type 1 (bare metal)__ — e.g. Proxmox VE, ESXi or Hyper-V.
3. __About 30–40 % (5–6 GB).__ Keeping total VM allocation to 60–70 % of RAM stops the host swapping.
4. __C, Bridged__ — the VM gets an address on your physical LAN.
5. __It depends on the original virtual disk.__ If that file is lost or corrupted, the snapshot is useless. A backup is an independent copy.
6. __Goal, exact error/symptom, what you've already tried, and environment details.__
7. __Corrupted or tampered files__ — a mismatched hash means the file isn't what the publisher released.
8. __Host-only or Internal__ (Internal if the host shouldn't be reachable either).
9. __Spaced repetition.__
10. __Any two of:__ daily contact with real user accounts and endpoints; ticketing and escalation discipline; a first line against social engineering; understanding how "normal" looks in an organisation.
