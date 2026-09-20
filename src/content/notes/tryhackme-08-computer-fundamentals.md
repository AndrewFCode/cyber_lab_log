---
title: "TryHackMe: Computer Fundamentals"
description: "Note: rooms in this module include Inside a Computer System and Computer Types. These notes are written from the module outline — cross-check room specifics as you go."
tags: ["tryhackme", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TryHackMe Pre Security (2026 path) · Module 2__

__Quick reference:__ the short version of this module is the Module 2 cheat sheet. Hands-on hardware detail is in TCM Help Desk sections 4–5.

__Note:__ rooms in this module include __Inside a Computer System__ and __Computer Types__. These notes are written from the module outline — cross-check room specifics as you go.

## Learning objectives

By the end of these notes you should be able to:

1. Explain the input–process–output–storage model of a computer.
2. Name the main components and explain what each does and how they connect.
3. Explain why computers have several kinds of memory and storage.
4. Walk through the boot process from power button to desktop.
5. Compare the different types of computer and where each is used.
6. Explain the client–server model.
7. Describe how the type of device affects its security.

## 1. What is a computer?

A __computer__ is a machine that takes __input__, __processes__ it according to instructions, produces __output__ and __stores__ data for later. Everything from a smartwatch to a cloud data centre fits this model.

            \+------------------------------\+
  INPUT --> |          PROCESS             | --> OUTPUT
 keyboard,  |  CPU runs instructions,      |    screen, speaker,
 mouse,     |  using RAM as working space  |    printer, network
 network,   \+--------------\+---------------\+
 sensors                   |
                           v
                        STORAGE
               SSD / HDD: keeps data when off

### 1.1 Worked example — tracing "save a document"

1. __Input:__ you press Ctrl\+S. The keyboard sends a signal, and the OS passes it to the word processor.
2. __Process:__ the CPU runs the program's save code, converting the document in RAM into the file format.
3. __Storage:__ the OS writes the bytes to the SSD through the storage controller.
4. __Output:__ the screen updates to show "Saved".

Four parts of the computer cooperated in well under a second.

## 2. Inside a computer system

## 2.1 The components

__Component__

__Job__

__Analogy__

CPU (processor)

Executes instructions — calculations, logic, decisions

The brain

RAM (memory)

Holds programs and data in use right now; fast but volatile

Short-term memory / a desk you work on

Storage (SSD / HDD)

Keeps data permanently, even when off

Long-term memory / a filing cabinet

Motherboard

Connects every component and carries data between them

The nervous system

PSU

Converts mains power to what the components need

The heart

GPU

Draws images for the display; also fast parallel maths

The visual system

NIC (network interface)

Connects to networks; has a unique MAC address

Voice and ears

Firmware (BIOS / UEFI)

The first code that runs: tests hardware and starts the OS

Reflexes on waking

Peripherals

Input/output devices: keyboard, mouse, monitor, printer

Hands, eyes, voice

## 2.2 Why several kinds of memory?

There's a trade-off between __speed__, __capacity__ and __cost__:

__Level__

__Speed__

__Size__

__Cost per GB__

__Keeps data when off?__

CPU registers

Fastest

Tiny (bytes)

Highest

No

CPU cache

Very fast

KB–MB

Very high

No

RAM

Fast

GB

Moderate

No

SSD

Slower

Hundreds of GB – TB

Low

Yes

HDD

Slowest

TB

Lowest

Yes

Computers keep the data they need __right now__ in the fastest memory and everything else in larger, slower storage.

__Exam tip:__ RAM is __volatile__ (cleared at power-off); storage is __non-volatile__. "Memory" and "storage" aren't the same thing, even though people often mix them up.

### 2.3 How components connect

Components communicate over __buses__ — shared electrical pathways — and point-to-point links:

            \+-------\+        \+-------\+
            |  CPU  |<======>|  RAM  |   memory bus (fastest link)
            \+---\+---\+        \+-------\+
                |
                | PCIe lanes
      \+---------\+-----------\+-------------\+
      |                     |             |
 \+----\+----\+          \+-----\+----\+   \+----\+-----\+
 |   GPU   |          | NVMe SSD |   | Chipset  |---- USB, SATA,
 \+---------\+          \+----------\+   \+----------\+     network, audio- __PCIe__ — high-speed lanes for GPUs, NVMe SSDs and expansion cards.
- __The chipset__ — on the motherboard; routes slower devices (USB, SATA, audio) to the CPU.
- __USB, Thunderbolt, SATA__ — connect peripherals and drives.

## 3. The boot process

What happens between pressing the power button and seeing the login screen:

__Step__

__What happens__

__Where it can fail__

1. Power on

PSU stabilises voltages and signals "power good"

Dead PSU, no power

2. Firmware starts

The CPU runs BIOS/UEFI code from a chip on the motherboard

Corrupt firmware

3. POST

Power-on self-test checks CPU, RAM and video

Beep codes or LEDs for bad RAM or GPU

4. Find boot device

Firmware reads the boot order (SSD, USB, network)

"No bootable device"

5. Bootloader

Windows Boot Manager or GRUB loads the OS kernel

Corrupt bootloader; Secure Boot rejects it

6. Kernel

The OS core loads drivers and takes control of the hardware

Blue screen or kernel panic from a bad driver

7. Services

Background services start (networking, security, updates)

Slow boot from a misbehaving service

8. Login

You sign in; your user environment loads

Profile problems

## 3.1 Checking boot information

(Get-CimInstance Win32\_OperatingSystem).LastBootUpTime    \

# when did it last boot?
Get-CimInstance Win32\_ComputerSystem |
    Select-Object Manufacturer, Model, TotalPhysicalMemory
\

# BIOS mode (UEFI/Legacy), Secure Boot state
msinfo32
uptime -s                \

# last boot time
systemd-analyze          \

# how long the boot took (firmware, loader, kernel, userspace)
systemd-analyze blame    \

# which services slowed it down
journalctl -b            \

# logs from this boot

### 3.2 Worked example — a slow boot

A user says their Linux laptop takes nearly two minutes to boot.

1. __Measure:__ systemd-analyze shows most of the time in "userspace".
2. __Find the culprit:__ systemd-analyze blame shows NetworkManager-wait-online.service taking 90 seconds.
3. __Diagnose:__ the service waits for a network the laptop isn't connected to at boot.
4. __Fix:__ disable that wait service (if nothing depends on it), then reboot and re-measure.

Measure, identify, fix, verify — the same method as the TCM troubleshooting steps.

## 4. Types of computer

__Type__

__Traits__

__Typical use__

Desktop

Powerful for the price, upgradable, stays in one place

Office work, gaming, engineering

Laptop

Portable, battery-powered, integrated parts

Mobile work, students

Workstation

High-end desktop with ECC RAM and pro GPUs

CAD, video, data science

Server

Runs services for others; always on; redundant PSUs, ECC RAM, often rack-mounted and headless

Websites, email, file storage, databases

Smartphone / tablet

Always connected; touch; sensors; app stores

Personal and work communication

Embedded system

A computer built into another device for one job

Car engine units, washing machines, medical devices

IoT device

A networked embedded device

Smart cameras, thermostats, speakers

Mainframe

Enormous transaction throughput and reliability

Banks, airlines, government

Supercomputer

Massive parallel computation

Weather, science, AI research

Virtual machine

A computer made of software, running on a host

Servers, labs, cloud

Cloud instance

A VM or container rented from a provider

Scalable services

## 4.1 Clients and servers

- A __client__ requests a service: your browser, an email app.
- A __server__ provides it: the web server, the mail server.

The same hardware can be either; it's a __role__, not a type of machine.

 \[Your laptop: client\] -- "GET /index.html" --> \[Web server\]
                       <----- web page --------

### 4.2 Worked example — matching devices to jobs

__Need__

__Best fit__

__Why__

Host the company intranet, 24/7

Server (or cloud instance)

Always on, redundant, managed centrally

A field engineer who travels daily

Laptop (\+ smartphone)

Portable, battery, encrypted

Monitor room temperature in a warehouse

IoT sensor

Cheap, low-power, single purpose

Practise hacking safely

Virtual machine

Isolated, snapshot and revert

Render 3D animation

Workstation

Pro GPU, lots of ECC RAM

## 4.3 Identify a machine from the command line

\

# hostname, OS, kernel, "Chassis" (laptop/desktop/vm), "Virtualization"
hostnamectl
systemd-detect-virt      \

# kvm, vmware, oracle (VirtualBox) — or "none"
lscpu; free -h; lsblk    \

# CPU, memory, disks
\

# "Virtual Machine" gives Hyper-V away
Get-CimInstance Win32\_ComputerSystem | Select-Object Manufacturer, Model
\

# e.g. 3 = desktop, 9/10 = laptop/notebook
(Get-CimInstance Win32\_SystemEnclosure).ChassisTypes

## 5. Security perspective

## 5.1 Every device type brings its own risks

__Device__

__Key risk__

__Key control__

Laptop

Loss or theft

Full-disk encryption, MDM remote wipe

Desktop

Physical tampering

Firmware password, chassis locks

Server

High-value target running shared services

Patching, hardening, monitoring, segmentation

Smartphone

Mixed personal and work data; malicious apps

MDM, app control, updates

IoT / embedded

Default passwords; rarely patched

Change credentials; isolate on its own network

VM

Relies on the hypervisor for isolation

Patch the host; separate sensitive workloads

## 5.2 Other security points

- __The boot chain is a target.__
	- Bootkits load before the OS, out of reach of antivirus.
	- __Secure Boot__ verifies each stage is signed.
	- The __TPM__ records what booted, so BitLocker can refuse to unlock if the boot chain changes.
- __Physical access is powerful.__ Booting from USB bypasses the installed OS entirely. Firmware passwords, USB-boot disabled and disk encryption close that door.
- __RAM is volatile evidence.__
	- Running processes, network connections, encryption keys and "fileless" malware may exist only in memory.
	- Incident responders capture memory __before__ powering a machine off.
- __IoT expands the attack surface quietly.__ Every smart device on a network is another computer that can be compromised — often the weakest one.

# Summary

- A computer takes input, processes it, produces output and stores data.
- __Components:__ CPU (processing), RAM (volatile working memory), storage (persistent), motherboard (connections), PSU (power), GPU (display), NIC (network), firmware (start-up).
- __The memory hierarchy__ trades speed for size and cost: registers → cache → RAM → SSD → HDD.
- __Boot:__ power → firmware/POST → boot device → bootloader → kernel → services → login.
- __Computer types__ range from embedded chips to mainframes. Client and server are roles, not hardware.
- __Security__ depends on device type; protect the boot chain and the physical box; capture RAM before shutdown in an incident.

# Glossary

__Term__

__Definition__

Input / output

Data entering / leaving a computer

CPU

Central processing unit — executes instructions

RAM

Random access memory — fast, volatile working memory

Volatile

Loses its contents when power is removed

Storage

Non-volatile data retention (SSD, HDD)

Motherboard

The main circuit board connecting all components

Bus

A shared pathway for data between components

PCIe

High-speed interface for GPUs, NVMe drives and cards

Chipset

Motherboard controller linking CPU to slower devices

NIC

Network interface card; holds the MAC address

Firmware

Low-level software stored on a chip (BIOS/UEFI)

POST

Power-on self-test

Bootloader

Program that loads the OS kernel

Kernel

The core of the operating system

Server

A computer (or role) providing services to clients

Embedded system

A computer built into a device for a dedicated function

IoT

Internet of Things — networked everyday devices

Virtual machine

A software-emulated computer running on a host

Secure Boot

Firmware feature that only runs signed bootloaders

TPM

Trusted Platform Module — secure chip storing keys and boot measurements

# Review questions

1. Describe the four parts of the input–process–output–storage model.
2. Why can't a computer just use RAM for everything?
3. Which is faster: CPU cache or RAM? Which holds more?
4. What does POST check, and what happens if it fails?
5. What loads the operating system kernel?
6. A server and a desktop can use similar hardware. What makes a machine a server?
7. Which device type is most likely to ship with default passwords and never be patched?
8. How do you check whether a Linux system is a virtual machine?
9. Why do incident responders capture RAM before shutting a machine down?
10. What does Secure Boot protect against?
11. A laptop is stolen. Which two controls most reduce the damage?
12. Which bus or link connects an NVMe SSD to the CPU?

# Answer key

1. __Input__ (data in), __process__ (the CPU runs instructions), __output__ (results out), __storage__ (data kept for later).
2. __RAM is volatile and expensive per GB.__ Data would vanish at power-off, and large amounts would cost far too much. Storage is cheap and persistent.
3. __Cache is faster; RAM holds more.__
4. __CPU, RAM and video.__ On failure the firmware signals with beep codes or LEDs and doesn't boot.
5. __The bootloader__ (Windows Boot Manager or GRUB).
6. __Its role — it provides services to clients.__ Servers are usually built for it too: always on, redundant, remotely managed.
7. __IoT and embedded devices.__
8. __systemd-detect-virt__ (or hostnamectl, which shows Virtualization and Chassis).
9. __RAM is volatile__, and holds processes, connections, keys and fileless malware that disappear at power-off.
10. __Unsigned or tampered bootloaders__, such as bootkits.
11. __Full-disk encryption and MDM remote lock/wipe.__
12. __PCIe lanes.__
