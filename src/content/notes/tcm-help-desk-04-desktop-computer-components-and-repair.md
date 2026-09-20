---
title: "Help Desk: Desktop Computer Components and Repair"
description: "Electrostatic discharge (ESD) is the sudden flow of static electricity between two objects at different charge levels. You feel a shock at around 3,000 volts, but chips can be damaged by a few hundred — far below…"
tags: ["help-desk", "tcm", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TCM Security, Practical Help Desk · Section 4__

__Quick reference:__ the short version of this section is the Section 4 cheat sheet. Exam-depth hardware is in A\+ Core 1.

## Learning objectives

By the end of these notes you should be able to:

1. Work inside a PC safely, avoiding electrostatic discharge and electrical hazards.
2. Explain the role, key specifications and failure signs of the CPU, RAM, storage, PSU, GPU and motherboard.
3. Install and replace each major component.
4. Identify common ports, cables and peripherals.
5. Describe the POST and boot process, and use BIOS/UEFI settings.
6. Size a power supply with a worked calculation.
7. Apply a structured troubleshooting method to hardware tickets.
8. Inspect hardware from the command line before opening a case.

## 1. Safety and ESD

## 1.1 Electrostatic discharge

__Electrostatic discharge (ESD)__ is the sudden flow of static electricity between two objects at different charge levels. You feel a shock at around 3,000 volts, but chips can be damaged by a few hundred — far below what you'll notice. Damage may be instant or __latent__: a component that fails weeks later.

__Precaution__

__Why__

Antistatic wrist strap clipped to bare metal on the chassis

Keeps you at the same potential as the PC

Antistatic mat

A safe, grounded work surface

Antistatic bags for parts

Shield components in storage

Handle boards by the edges

Avoid touching contacts and chips

Avoid carpets and wool

Big static generators

## 1.2 Electrical safety

1. __Shut down__ properly.
2. __Switch off__ at the PSU rocker and unplug the power cable.
3. __Press and hold the power button__ for about 5 seconds to drain residual charge.
4. __Never open a PSU.__ Its capacitors can hold a dangerous charge long after unplugging. A faulty PSU is replaced, not repaired.

## 1.3 Opening the case

- __Photograph__ the cabling before you disconnect anything.
- __Keep screws organised__ — a magnetic tray or labelled cups.
- __Note which slots__ RAM and cards came from.

## 2. The CPU

## 2.1 What it does

The __central processing unit__ executes instructions: the fetch-decode-execute cycle from section 3.

## 2.2 Key specifications

__Spec__

__Meaning__

__Why it matters__

Cores

Independent processing units on one chip

More cores = more simultaneous work

Threads

Logical processors; SMT/Hyper-Threading gives 2 per core

Better multitasking throughput

Clock speed (GHz)

Cycles per second; base and boost speeds

Faster single-task performance

Cache (L1/L2/L3)

On-chip fast memory

Less waiting on RAM

TDP (watts)

Heat the cooler must remove

Sizes the cooler and PSU

Socket

The physical interface, e.g. Intel LGA 1700, AMD AM5

The CPU __must__ match the board

Architecture

x86-64 (Intel/AMD) or ARM

Determines which software runs natively

## 2.3 Installing a CPU

1. __Open the socket:__ lift the retention arm and open the load plate.
2. __Orient the CPU:__ line up the small triangle on the CPU with the triangle on the socket (pin 1), and match the notches.
3. __Lower it straight down.__ Never press or slide it — bent socket pins are the classic disaster.
4. __Close__ the load plate and lever.
5. __Thermal paste:__ apply a pea-sized amount to the centre of the CPU's heat spreader. Coolers with pre-applied paste don't need more.
6. __Mount the cooler__ with even, diagonal tightening.
7. __Connect the fan__ to the CPU\_FAN header.

## 2.4 CPU failure signs

- __Overheating:__ sudden shutdowns under load, or thermal throttling. Usually dried paste or a clogged cooler, not a dead CPU.
- __No POST at all:__ often RAM or the motherboard is the real culprit. True CPU failure is rare.

## 3. RAM

## 3.1 What it does

__Random access memory__ holds the programs and data in use right now. It's fast but __volatile__: everything is lost at power-off.

## 3.2 Key specifications

__Spec__

__Meaning__

Type / generation

DDR4 or DDR5 — keyed differently, __not__ interchangeable

Form factor

DIMM (desktop) or SODIMM (laptop)

Capacity

8, 16 or 32 GB per module

Speed

MT/s, e.g. DDR4-3200, DDR5-5600

Channels

Matched modules in the right slots run in dual channel for more bandwidth

ECC

Error-correcting memory for servers; usually not supported by consumer boards

## 3.3 Installing RAM

1. Check the motherboard manual for the recommended slots (for two modules, often A2 and B2).
2. Open the clips at the slot ends.
3. Line up the module's notch with the key in the slot.
4. Press straight down, evenly, until both clips snap closed. Expect firm pressure.

## 3.4 Worked example — "PC slow since an upgrade"

__Symptom:__ a user added a 16 GB module to their existing 8 GB one. The PC now shows 24 GB but games stutter.

1. __Check what's installed:__

Get-CimInstance Win32\_PhysicalMemory |
    Select-Object BankLabel, Capacity, Speed, ConfiguredClockSpeed1. __Result:__ mismatched modules with different capacities, both running at the slower module's speed. Only part of the memory runs in dual channel.
2. __Fix:__ a matched pair (2 × 16 GB) in the recommended slots.

## 3.5 RAM failure signs and tests

__Sign__

__Test__

Random blue screens, crashes, corrupted files

Windows Memory Diagnostic: run mdsched.exe, then reboot

Beeps or a DRAM debug LED at power-on

Reseat modules; test one module at a time

PC reports less RAM than installed

Reseat; check that slot; check the 32-bit OS limit

Deeper testing: MemTest86 from a bootable USB, left running for several passes.

## 4. Storage drives

## 4.1 Drive types

__Type__

__How it stores data__

__Speed__

__Notes__

HDD

Magnetic spinning platters and a moving read/write head

~100–250 MB/s

Cheap per TB; fragile when running; clicks when failing

SATA SSD

NAND flash chips

~550 MB/s (SATA limit)

Big upgrade over an HDD

NVMe SSD

NAND flash over PCIe lanes

3,000–7,000\+ MB/s

Usually M.2; the modern default

__Form factor / interface__

__Notes__

3.5"

Desktop HDDs

2.5"

Laptop HDDs and SATA SSDs; 7 mm or 9.5 mm thick

M.2

A card shape, *not* a speed. Can be SATA or NVMe — check the slot supports the drive. Lengths 2230, 2242, 2280 (width × length in mm)

SATA cables

7-pin data plus 15-pin power

## 4.2 Drive health

__SMART__ (Self-Monitoring, Analysis and Reporting Technology) is built into drives to predict failure.

Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, HealthStatus
Get-PhysicalDisk |
    Get-StorageReliabilityCounter |
    Select-Object Temperature, Wear, ReadErrorsTotal
sudo smartctl -a /dev/sda      \

# smartmontools package

### 4.3 Replacing a drive

1. __Back up__ or clone the data first.
2. __Mount__ the drive: screws or a tool-less caddy. M.2 drives need the standoff and retaining screw.
3. __Connect__ SATA data and power, or seat the M.2 at an angle and press it down.
4. __Initialise__ the new drive: Disk Management (diskmgmt.msc) → GPT → New Simple Volume.

## 5. The power supply (PSU)

## 5.1 What it does

The PSU converts mains __AC__ (230 V in the UK) into the low-voltage __DC__ rails the components need.

__Rail__

__Wire colour__

__Powers__

\+12 V

Yellow

CPU, GPU, drive motors, fans — most of the load

\+5 V

Red

Drives, USB

\+3.3 V

Orange

Some motherboard circuits, M.2

Ground

Black

Return path

__Connector__

__Goes to__

24-pin ATX (20\+4)

Motherboard

4/8-pin EPS (CPU)

CPU power, near the socket

6/8-pin PCIe, or 16-pin 12V-2x6

Graphics card

SATA power (15-pin)

SATA drives

Molex (4-pin)

Legacy devices, some fans

## 5.2 Worked example — sizing a PSU

__Build:__ CPU rated at 125 W, graphics card at 220 W, plus motherboard, RAM, drives and fans at roughly 75 W.

1. __Estimated peak:__ 125 \+ 220 \+ 75 = __420 W__.
2. __Add 30–50 % headroom__ (efficiency sweet spot, spikes, ageing): 420 × 1.3 ≈ 550 W; 420 × 1.5 = 630 W.
3. __Choose:__ a __quality 550–650 W__ unit with an 80 PLUS Gold rating.

__80 PLUS efficiency__, in increasing order: White, Bronze, Silver, Gold, Platinum, Titanium.

- A Gold unit wastes less power as heat.
- __Example:__ delivering 400 W at about 90 % efficiency draws roughly 444 W from the wall.

## 5.3 PSU failure signs

- __Dead system:__ no lights, no fans.
- __Random reboots__ under load.
- __A burning smell__ or clicking.

Test with a __PSU tester__, or swap in a known-good unit.

## 6. The graphics card (GPU)

__Integrated graphics__

__Dedicated (discrete) GPU__

Built into the CPU; shares system RAM

Separate card with its own VRAM

Low power, fine for office work

Gaming, 3D, video editing, AI workloads

Video out from the __motherboard__ ports

Video out from the __card's__ ports

__Installing a card:__

1. Remove the slot covers.
2. Seat the card in the top __PCIe x16__ slot until the latch clicks.
3. Screw it to the case.
4. Connect the PCIe power cables.
5. Plug the monitor __into the card__.
6. Install the vendor driver.

__In the real world:__ "new graphics card, no display" is one of the most common tickets. The monitor cable is still in the motherboard's port — and many boards turn integrated graphics off when a card is present.

## 7. The motherboard

## 7.1 Form factors

__Form factor__

__Size__

__Expansion__

ATX

305 × 244 mm

Most slots

microATX

244 × 244 mm

Fewer slots

Mini-ITX

170 × 170 mm

One PCIe slot, 2 RAM slots

A smaller board fits a larger case (mounting holes line up), but not the reverse.

## 7.2 Anatomy

 \+----------------------------------------------------------\+
 | \[Rear I/O\]   \[CPU socket\]   \[RAM\]\[RAM\]\[RAM\]\[RAM\]  \[24pin\] |
 |  USB, LAN,        |                                       |
 |  audio,       \[CPU\_FAN\]                                   |
 |  video                                                    |
 | \[M.2 slot\]---------------------------------------         |
 | \[PCIe x16\]=======================================  \[SATA\] |
 | \[PCIe x1 \]=====                                    \[SATA\] |
 | \[CMOS battery\]   \[Chipset\]          \[Front panel header\]  |
 \+----------------------------------------------------------\+

__Part__

__Role__

Chipset

Controls communication between CPU, storage, USB and slots

PCIe slots

x16 for GPUs; x1/x4 for network, sound and capture cards

M.2 slots

NVMe/SATA SSDs; some carry Wi-Fi cards

SATA ports

Drives

Headers

Front-panel buttons and LEDs, front USB, audio, fans

CMOS battery (CR2032)

Keeps the real-time clock and firmware settings when unplugged

Standoffs

Hold the board off the case; prevent short circuits

__The front-panel header__ is fiddly. PWR\_SW and RESET\_SW have no polarity; the LED pins (PLED \+/-, HDD LED \+/-) do. Check the manual's diagram.

## 8. Ports, cables and peripherals

__Port__

__Use__

__Notes__

USB-A

Peripherals, storage

USB 2.0 (480 Mbps), 3.x (5–20 Gbps)

USB-C

Data, video, charging

Reversible; capabilities vary by port

HDMI

Monitors, TVs — video and audio

Digital

DisplayPort

Monitors — video and audio

Digital; common on PC GPUs

DVI / VGA

Older monitors

VGA is analog

RJ45

Ethernet

1 Gbps typical, 2.5 Gbps increasingly common

3.5 mm audio

Green = output, pink = mic, blue = line in

PS/2 (legacy)

Purple = keyboard, green = mouse

## 9. POST and the BIOS/UEFI

## 9.1 The boot sequence

1. Power button pressed → PSU starts and sends "power good".
2. The CPU starts running __firmware__ (BIOS/UEFI) from a chip on the motherboard.
3. __POST__ (power-on self-test) checks the CPU, RAM and video.
4. The firmware reads the __boot order__ and finds a bootable device.
5. The __bootloader__ (Windows Boot Manager or GRUB) loads the operating system.

## 9.2 When POST fails

__Indicator__

__Meaning__

Beep codes

Patterns (e.g. long-short-short) that mean different things by firmware vendor — look them up in the board manual

Debug LEDs (CPU / DRAM / VGA / BOOT)

The stage where POST stopped

Two-digit POST code display

A specific error code, listed in the manual

## 9.3 BIOS vs UEFI

__Legacy BIOS__

__UEFI__

1980s design, 16-bit

Modern firmware

MBR disks, 2 TB boot limit

GPT disks, huge drives

Text-only setup

Graphical, mouse support

No Secure Boot

Secure Boot: only signed bootloaders run

__Common settings:__ boot order; enable/disable Secure Boot; TPM (fTPM/PTT) on or off; virtualization (VT-x / AMD-V); XMP/EXPO memory profiles (run RAM at its rated speed); fan curves; date and time; firmware passwords.

__Reset to defaults:__ use "Load optimized defaults" in setup, or clear the CMOS (a jumper, or remove the coin cell for a few minutes).

__Firmware updates__ fix bugs and security flaws. Use only the vendor's file, and don't interrupt the flash.

## 10. Troubleshooting method and a Ticket Interrupt

## 10.1 The six steps

1. __Identify the problem.__ Question the user, reproduce it, and ask what changed.
2. __Establish a theory__ of probable cause. Question the obvious first.
3. __Test the theory.__ If it's wrong, form a new one, or escalate.
4. __Plan and implement__ the fix.
5. __Verify__ full functionality, and add preventive measures.
6. __Document__ findings, actions and outcome.

## 10.2 Worked example — "My PC won't turn on"

1. __Identify:__ is it completely dead, or do fans spin with no display? The user says nothing happens at all — no lights. They moved desks yesterday.
2. __Theory:__ power delivery — cable, wall socket, PSU switch, or the PSU itself. Starting obvious: a moved PC often loses a cable or has the rocker switch knocked.
3. __Test:__
	- The PSU rocker is set to off. Switch it on → still dead.
	- Try a known-good power cable and socket → still dead.
	- Test the PSU with a tester → no \+12 V output.
4. __Fix:__ replace the PSU (sized per section 5.2).
5. __Verify:__ the PC powers on, POSTs and boots. Check temperatures and run for a while.
6. __Document:__

"No power after desk move; cable and socket OK; PSU tester showed no 12 V; replaced PSU (650 W Gold); verified boot; old PSU disposed of as e-waste."

## 11. Inspect hardware without opening the case

__Need__

__Windows (PowerShell)__

__Linux__

CPU

Get-CimInstance Win32\_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed

lscpu

RAM

Get-CimInstance Win32\_PhysicalMemory | Select-Object BankLabel, Capacity, Speed

free -h and sudo dmidecode -t memory

Disks

Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, Size, HealthStatus

lsblk and sudo smartctl -a /dev/sda

GPU

Get-CimInstance Win32\_VideoController | Select-Object Name, DriverVersion

lspci | grep -iE 'vga|3d'

Motherboard / BIOS

Get-CimInstance Win32\_BaseBoard; Get-CimInstance Win32\_BIOS

sudo dmidecode -t baseboard -t bios

Everything

msinfo32, dxdiag

sudo lshw -short

## 12. Security perspective

- __Physical access defeats most software security.__ With the case open or a USB boot stick, an attacker can reset passwords offline or copy the disk. Defences:
	- Firmware (BIOS) password
	- Secure Boot on; USB boot disabled
	- __Full-disk encryption__ (BitLocker), so a removed drive is unreadable
	- Chassis locks or intrusion detection where it matters
- __Hardware keyloggers__ sit between the keyboard and the USB port. Check the back of shared and public PCs.
- __Drive disposal.__ Deleted files are recoverable; old drives must be securely wiped or physically destroyed, with a record kept.
- __Firmware is code.__ Keep BIOS/UEFI updated from the vendor; firmware malware (bootkits) survives OS reinstalls. Secure Boot helps block unsigned bootloaders.

# Summary

- __Safety first:__ ESD strap and mat, unplug and drain, never open a PSU.
- __CPU:__ cores, threads, clock, cache, socket. Align pin 1, apply paste, fit the cooler.
- __RAM:__ DDR generation must match; matched pairs for dual channel; test with mdsched.exe.
- __Storage:__ HDD, SATA SSD, NVMe. M.2 is a shape; SMART reports health.
- __PSU:__ AC to DC rails. Size = peak load \+ 30–50 % headroom; 80 PLUS rates efficiency.
- __GPU:__ integrated vs dedicated — plug the monitor into the card.
- __Motherboard:__ form factor, chipset, slots, headers, CMOS battery, standoffs.
- __Boot:__ POST, then boot order, then bootloader. Beep codes and LEDs are vendor-specific; UEFI adds GPT and Secure Boot.
- __Troubleshooting:__ identify, theorise, test, fix, verify, document.

# Glossary

__Term__

__Definition__

ESD

Electrostatic discharge — static that can damage components

Latent damage

ESD damage that causes failure later rather than immediately

Core / thread

A physical processing unit / a logical processor

TDP

Thermal design power — heat output a cooler must handle

Socket

The CPU's physical interface on the motherboard

Thermal paste

Compound that fills gaps between CPU and cooler

DIMM / SODIMM

Desktop / laptop memory module

Dual channel

Two matched modules working in parallel for bandwidth

XMP / EXPO

Memory profiles that set rated RAM speeds

NVMe

Fast SSD protocol over PCIe

M.2

Small card form factor for SSDs and Wi-Fi

SMART

Built-in drive health monitoring

PSU rail

A DC voltage output (\+12 V, \+5 V, \+3.3 V)

80 PLUS

PSU efficiency certification tiers

VRAM

Memory on a graphics card

Chipset

Motherboard controller linking CPU, storage and I/O

Standoff

A spacer holding the motherboard off the case

CMOS battery

Coin cell powering the real-time clock and settings

POST

Power-on self-test run by firmware

UEFI

Modern firmware replacing BIOS; supports GPT and Secure Boot

Secure Boot

UEFI feature allowing only signed bootloaders

# Review questions

1. Why press the power button after unplugging, before working inside a PC?
2. What must match between a CPU and a motherboard?
3. A PC has 8 GB \+ 16 GB modules and games stutter. What's likely and what fixes it?
4. Is an M.2 drive always faster than a 2.5" SSD? Explain.
5. Calculate a sensible PSU size for a 105 W CPU, 285 W GPU and 80 W for everything else.
6. Which PSU rail carries most of the load, and what colour are its wires?
7. A user installs a graphics card and gets "no signal". What's the most likely cause?
8. What does the CMOS battery do, and what's the symptom when it dies?
9. Name three differences between legacy BIOS and UEFI.
10. List the six troubleshooting steps in order.
11. Which Windows tool tests RAM, and how do you launch it?
12. Give three defences against an attacker with physical access to a desktop.

# Answer key

1. __To drain residual charge__ from the PSU and board capacitors.
2. __The socket__ (e.g. AM5, LGA 1700) __and chipset support__ for that CPU generation — sometimes needing a BIOS update.
3. __Mismatched modules__, so only part of the memory runs in dual channel, at the slower speed. __Fix:__ a matched pair (2 × 16 GB) in the recommended slots.
4. __No.__ M.2 is a form factor. An M.2 __SATA__ drive is no faster than a 2.5" SATA SSD; only M.2 __NVMe__ is faster.
5. __105 \+ 285 \+ 80 = 470 W; × 1.3–1.5 = about 610–705 W.__ Choose a quality 650–750 W unit.
6. __\+12 V, yellow.__
7. __The monitor is plugged into the motherboard's video port__ instead of the graphics card.
8. __It keeps the real-time clock and firmware settings when the PC is unplugged.__ When it dies, the date/time resets and settings return to defaults at each power loss.
9. __Any three of:__ UEFI supports GPT and large boot drives; a graphical setup; Secure Boot; faster boot. BIOS uses MBR with a 2 TB boot limit.
10. __Identify, theorise, test, plan and implement, verify, document.__
11. __Windows Memory Diagnostic__ — run mdsched.exe and reboot.
12. __Any three of:__ firmware password; Secure Boot with USB boot disabled; BitLocker full-disk encryption; chassis lock or intrusion detection; checking for hardware keyloggers.
