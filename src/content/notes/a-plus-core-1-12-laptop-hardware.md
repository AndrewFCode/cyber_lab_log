---
title: "A+ Core 1 1.1: Laptop Hardware"
description: "A laptop packs a full computer into a very small space. That's why it's the standard platform for anyone on the move — but it's also why laptops are harder to service:"
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 1.1__

__Quick reference:__ the short version of this lesson is the 1.1 Laptop Hardware cheat sheet, part of Section 1.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why laptops need a more careful, manufacturer-specific approach to repair than desktops.
2. Compare modular and built-in batteries, and the two lithium battery types used in laptops.
3. Replace a laptop keyboard or keycap, and use an external keyboard to isolate a fault.
4. Identify SO-DIMM memory, and recognise when memory can't be upgraded.
5. Compare 2.5-inch and M.2 storage, and install each.
6. Plan an HDD-to-SSD migration using either a fresh install or imaging/cloning software.
7. Describe laptop wireless cards, antenna connections and where the antennas run.
8. Explain the requirements for biometric login, and what NFC and built-in cameras are used for.

## 1. Why laptops are different

A laptop packs a full computer into a very small space. That's why it's the standard platform for anyone on the move — but it's also why laptops are harder to service:

- __Tolerances are tight.__ Components are built to precise specifications and packed closely, so repair has to be just as precise.
- __Serviceability varies enormously.__
	- Some models are designed for easy access, with panels for swapping memory and storage.
	- Others are very hard to open, and harder still to replace parts in.
- __Every manufacturer does it differently.__ Procedures that work on one brand — or even one model — may not work on another.

__The practical rule:__ before opening any laptop, find the __manufacturer's service instructions__ for that exact model.

## 2. Batteries

## 2.1 Modular vs built-in

__Design__

__How it's replaced__

__Typical of__

Modular (removable)

The user presses a release button, the battery pops out, and a replacement slides into the same slot

Older and business-focused laptops

Built-in (internal)

Not designed for user replacement. A technician usually has to take the laptop apart

Most thin, modern laptops

## 2.2 Battery types

Laptops generally use one of two lithium technologies:

__Type__

__Notes__

Lithium-ion (Li-ion)

The standard rechargeable laptop battery

Lithium-ion polymer (Li-poly)

A lithium variant, often shaped to fit slim designs

__No memory effect.__ Neither type suffers from the __memory effect__ of older battery chemistries. You can recharge whenever you like without reducing the battery's usable capacity.

__Exam tip:__ "memory effect" is a trait of older battery technologies, not lithium-ion. Charging a Li-ion battery part-way doesn't damage its capacity.

### 2.3 Batteries are model-specific

Manufacturers use different battery __form factors__. A battery from a different make or model generally won't fit the slot, even if it looks similar. Always match the replacement to the exact laptop model (and the manufacturer's part number).

## 2.4 Worked example — "can I replace this battery myself?"

A user's battery barely lasts an hour and they ask whether they can swap it themselves.

1. __Identify the exact model__ from the label on the underside, or the system information tool.
2. __Check the design:__
	- A release latch or button on the underside means a modular battery. The user can swap it with the correct replacement part.
	- No latch means a built-in battery. Book a technician repair following the manufacturer's procedure.
3. __Order the replacement__ by the manufacturer's part number for that model. Don't go by appearance.

__Note (beyond this lesson):__ a swollen lithium battery is a fire risk. Stop using and charging it, and recycle it as hazardous waste. TCM Help Desk section 5 covers battery health reports and safety.

## 3. Keyboards

## 3.1 The most-replaced part

The keyboard is used more than any other laptop component, so in a fleet of laptops it's often the part you replace most. Fortunately, most manufacturers make it fairly straightforward:

1. __Remove__ a bezel (trim panel) or a few screws.
2. __Lift out__ the keyboard as a single unit.
3. __Disconnect__ its ribbon cable from the system board connector.
4. __Connect__ the new keyboard's cable, and refit it.

## 3.2 Worked example — hardware or software?

A user says several keys don't work.

1. __Plug in an external USB keyboard.__
2. __If the external keyboard works:__
	- The operating system is receiving input fine, so the fault is in the __laptop's keyboard hardware__ — or its ribbon cable connection.
	- The user can keep working on the external keyboard while a replacement is arranged.
3. __If the external keyboard shows the same problem:__ suspect the __operating system__ — for example a keyboard layout or driver setting — rather than the hardware.

This is a standard isolation technique: swap in a known-good external device to find out which side of the problem you're on.

## 3.3 Compact layouts

To fit a full keyboard's functions into less space, laptop keyboards use:

- __Special keys__ such as a __Windows key__ and a __function (Fn) key__, pressed together with other keys to reach secondary functions (brightness, volume, wireless on/off and so on).
- __A numeric keypad__ only on laptops wide enough to fit one.

## 3.4 Replacing a single keycap

Sometimes only one key or keycap is faulty.

- __Desktop__ keycaps are sturdy and easy to pull off and replace.
- __Laptop__ keycaps and the small mechanisms under them are __fragile__ and vary between keyboards. Follow the manufacturer's instructions to avoid breaking the parts underneath.

## 4. Memory

## 4.1 SO-DIMM

Laptops use a smaller memory module than desktops: the __SO-DIMM__ — Small Outline Dual In-line Memory Module.

__Desktop__

__Laptop__

Module

DIMM

SO-DIMM (smaller)

Upgradable?

Almost always

Only if the laptop has SO-DIMM slots

## 4.2 Soldered memory

Not every laptop uses removable modules. Some have memory __soldered to the motherboard__. Upgrading that memory would mean replacing the whole __system board__ — in practice, it can't be upgraded.

## 4.3 Installing a SO-DIMM

1. __Open__ the access panel (a "window" on the underside) where the memory sits.
2. __Remove__ an existing module, if replacing, or find an empty slot.
3. __Seat__ the new module in the slot, then __press it down__ until the clips on the motherboard lock it in place.
4. __Refit__ the panel.

## 4.4 Worked example — planning a memory upgrade

A user wants more RAM in their laptop.

1. __Check the model's specifications:__ does it use SO-DIMM slots, or soldered memory?
2. __If soldered:__ no upgrade is possible without replacing the system board. Set expectations early.
3. __If there are SO-DIMM slots:__ check how many are free, the memory type and speed supported, and the maximum capacity. Then order matching modules.

## 5. Storage

## 5.1 Hard drives and SSDs

__Drive__

__Traits__

2.5-inch hard drive (HDD)

Spinning platters. The laptop-sized equivalent of the 3.5-inch drives used in desktops

Solid state drive (SSD)

Flash memory with __no moving parts__. Much faster access, and more reliable because there's no spinning drive to fail

Laptops have rapidly moved from spinning drives to SSDs.

## 5.2 Form factors: 2.5-inch vs M.2

__2.5-inch drive (HDD or SSD)__

__M.2 SSD__

Found in

Older laptops

Newer laptops

Size

Larger

Much smaller — ideal for laptops and mobile devices

Connections

__Two:__ one for data, one for power

__One:__ the M.2 slot carries both data and power

Fixing

A couple of screws, often in a caddy

A single screw

## 5.3 Installing an M.2 drive

1. __Slide__ the M.2 card into its slot on the system board, at an angle.
2. __Push it in fully.__ A good connection has none of the gold contacts showing.
3. __Press it down__ flat and fasten it with its single screw.

## 5.4 Replacing a 2.5-inch drive

1. __Remove__ the access cover.
2. __Remove__ the couple of screws holding the drive. A screw mat or magnetic tray keeps the tiny screws organised.
3. __Slide__ the drive out of its connector.
4. __Reverse__ the process to fit the new drive, then replace the cover.

## 6. Migrating from an HDD to an SSD

Replacing an older laptop's spinning drive with an SSD makes it faster and more reliable. The difference can feel like getting a new laptop from a single part swap. The question is how to get the user's system onto the new drive.

## 6.1 The two approaches

__Approach__

__Steps__

__Trade-off__

Fresh install

Install a new OS on the SSD, copy the user's documents across manually, then reinstall every application

Clean start, but much more time-consuming

Imaging / cloning

Use software to make an __exact duplicate__ of the old drive on the new one

Much faster; the user's system arrives exactly as it was

__Imaging__ or __cloning__ software copies an entire drive or partition to another. It's such a common job that many SSD manufacturers __include cloning software with the drive__. Third-party tools also exist.

## 6.2 Two ways to clone

 Method 1 — via an image file
 \[Old drive\] --image--> \[Separate storage\] --restore--> \[New SSD\]
                       (external drive)     (after the SSD is installed)

 Method 2 — direct, drive to drive (faster)
 \[Old drive\] ---------------clone----------------> \[New SSD\]
         (both connected at once, e.g. the SSD in a USB adapter
          or a spare slot)

### 6.3 Worked example — upgrading a user's laptop

A laptop has a 500 GB spinning drive with 200 GB used, and a free M.2 slot.

1. __Choose the SSD:__ an M.2 drive of at least 250 GB (500 GB for growth), matching what the slot supports.
2. __Choose the method:__ the M.2 slot is free, so both drives can be installed at once. Use __direct cloning__ — the faster method.
3. __Clone__ with the SSD manufacturer's bundled software, copying the whole drive (all partitions).
4. __Boot__ from the SSD, and check the system and user files are all there.
5. __Decide what happens to the old drive:__ remove it, or wipe it and keep it as extra storage.

__Note (beyond this lesson):__ suspend BitLocker before cloning an encrypted drive, and securely wipe any drive that leaves the organisation — it still holds all the user's data.

## 7. Wireless networking

## 7.1 Wireless is the connection

Many modern laptops have __no wired network port__ at all. All connectivity comes over wireless — __802.11__ (Wi-Fi) for the local network, and __Bluetooth__ for peripherals.

__Technology__

__Role__

__Notes__

802.11 (Wi-Fi)

Local area network connectivity

Usually built into the system board; older laptops may use a removable __Mini PCI__ or __Mini PCI Express__ card

Bluetooth

Short-range __PAN (personal area network)__: external mouse, keyboard, other peripherals

Often on a separate card in the past; built into the system board on most newer laptops

## 7.2 Installing a wireless card

Installing a modular wireless card is much like installing memory:

1. __Remove__ the access panel on the underside.
2. __Seat__ the card in its slot, where it locks into place.
3. __Connect the antenna wires__ to the small connectors on the card.

## 7.3 Antennas

- __Wi-Fi__ interfaces usually have __two antenna connectors__: a __main__ and an __auxiliary__ (often a grey and a black wire).
- __Bluetooth__ may use a __third__ antenna.
- __The antenna wires run around the display.__ Putting them high up, around the screen, gives the best reception when the lid is open. From there they come out of the bottom of the display, pass behind the keyboard and reach the connectors on the system board.

## 7.4 Worked example — weak Wi-Fi after a screen replacement

A laptop had its screen replaced, and now its Wi-Fi signal is poor.

1. __Remember where the antennas run:__ through the display assembly. Replacing a screen means disconnecting and reconnecting them.
2. __Check__ that both antenna leads (main and aux) are connected to the correct connectors on the wireless card or system board.
3. __Check__ the wires weren't pinched when the display or keyboard was refitted.
4. __Reconnect__ and test the signal again.

## 8. Biometrics

Modern operating systems can log you in with __biometrics__ instead of — or as well as — a password:

- __Fingerprint__ recognition.
- __Face__ recognition.

__Two things are needed:__

1. __An operating system that supports biometric login.__
2. __The biometric hardware:__ a __fingerprint reader__, or a suitable __camera__ for face recognition.

__On Windows__, the biometric options are:

__Feature__

__Uses__

Windows Hello Face

Face recognition

Windows Hello Fingerprint

A fingerprint reader

Biometric login has become a relatively secure way to lock down a laptop.

## 9. NFC

__NFC (Near Field Communication)__ is very short-range wireless communication — typically __4 cm or less__. It's what you use to pay at a point-of-sale terminal with a phone or smartwatch.

__Use__

__Example__

Payments

Tapping a phone or watch at a point-of-sale terminal

Authentication

A nurse taps an access card or NFC device on a hospital workstation to log in

Industry

Quick wireless authentication in warehouses, manufacturing, and shipping and receiving

## 10. Cameras and microphones

- __The camera__ usually sits in the centre at the top of the screen. It records video to a file, and provides live video for calls and conferences.
- __The microphones__ are usually on either side of the camera, so people can hear you as well as see you.
- __Need better quality?__ Attach an __external camera__, typically clipped to the top of the display, for higher definition or extra features.

## 11. Security perspective

- __Biometrics strengthen login,__ but only if configured properly. Keep a strong PIN or password as the fallback, and remember biometrics depend on both OS support and working hardware.
- __NFC's tiny range__ is a security feature: an attacker must be very close. Still, keep payment and login authentication (PIN, biometric) turned on.
- __Cameras and microphones are privacy risks__ if malware takes control of them. Review app permissions (beyond this lesson: physical shutters are the only control software can't override).
- __Cloning copies everything__ — the user's files, stored credentials and any malware. Scan before cloning if you suspect the system is compromised.
- __Old drives hold data.__ A drive removed during an upgrade must be securely wiped or destroyed before disposal.
- __Buy genuine parts.__ Model-specific batteries and parts from unknown sources can be unsafe or counterfeit.

# Summary

- __Laptops are precise and vary by manufacturer__ — always follow the service instructions for the exact model.
- __Batteries:__ modular (pop out and swap) or built-in (technician job). Li-ion or lithium-ion polymer, with no memory effect. Form factors are model-specific.
- __Keyboards:__ the most-replaced part. Remove a bezel or screws, then disconnect the ribbon cable. An external USB keyboard separates hardware faults from OS faults. Fn and Windows keys give secondary functions; laptop keycaps are fragile.
- __Memory:__ SO-DIMM modules press down until the clips lock. Soldered memory can't be upgraded without replacing the system board.
- __Storage:__ 2.5-inch drives (separate data and power connectors) or M.2 (one slot for both, one screw). SSDs have no moving parts — faster and more reliable.
- __HDD → SSD:__ either a fresh install (slow), or cloning with imaging software — via an image file on separate storage, or directly drive to drive (faster).
- __Wireless:__ 802.11 and Bluetooth, on the system board or Mini PCI/PCIe cards. Main and aux antenna wires (plus perhaps a third for Bluetooth) run around the display.
- __Biometrics__ need OS support plus a fingerprint reader or camera (Windows Hello Face / Fingerprint). __NFC__ works at about 4 cm or less. __Cameras__ sit top-centre with microphones either side.

# Glossary

__Term__

__Definition__

Modular battery

A battery the user can remove and replace without opening the laptop

Built-in battery

A battery inside the case, replaced by a technician

Lithium-ion (Li-ion)

The standard rechargeable laptop battery type

Lithium-ion polymer

A lithium battery variant, often shaped for slim devices

Memory effect

Loss of usable capacity from partial charging — found in older chemistries, not lithium-ion

Form factor

The physical size and shape of a component

Bezel

A removable trim panel around a component

Ribbon cable

A thin, flat cable connecting internal components

Keycap

The removable top of a single key

Fn key

Function key used with other keys for secondary functions

SO-DIMM

Small Outline Dual In-line Memory Module — laptop memory

System board

The motherboard

2.5-inch drive

Laptop-size drive form factor, with separate data and power connections

SSD

Solid state drive — flash storage with no moving parts

M.2

Small drive form factor; one slot provides both data and power

Imaging / cloning

Creating an exact duplicate of one drive on another

802.11

The Wi-Fi standards for wireless LANs

Mini PCI / Mini PCI Express

Small expansion card slots used for wireless cards in older laptops

PAN

Personal area network, e.g. Bluetooth

Main / auxiliary antenna

The two antenna connections on a Wi-Fi interface

Biometrics

Authentication by physical traits such as a fingerprint or face

Windows Hello

Windows biometric login: Face and Fingerprint

NFC

Near Field Communication — very short-range wireless (about 4 cm or less)

# Review questions

1. Why should you check the manufacturer's instructions before repairing a laptop?
2. What's the practical difference between a modular and a built-in battery?
3. A user asks whether charging their Li-ion battery at 50 % will reduce its capacity. What do you say?
4. Why can't you use a battery from another laptop model that looks similar?
5. Several keys don't work on a laptop, but an external USB keyboard works perfectly. Where is the fault?
6. What does SO-DIMM stand for?
7. A user wants to upgrade RAM, but the memory is soldered to the motherboard. What's the implication?
8. How many connections does a 2.5-inch drive need, and how many does an M.2 drive need?
9. How can you tell an M.2 card is fully inserted?
10. Name the two approaches to moving a user from an HDD to an SSD, and the advantage of each.
11. What are the two ways to clone a drive, and which is faster?
12. Wi-Fi is weak after a laptop screen replacement. What should you check first, and why?
13. What two things does biometric login require?
14. Roughly what is NFC's range, and name two uses beyond payments.

# Answer key

1. __Laptops are built to precise specifications, and their design and repair procedures vary widely between manufacturers and models.__ Guessing risks damage.
2. __A modular battery pops out and a new one slides in; a built-in battery requires a technician to take the laptop apart.__
3. __No.__ Lithium-ion batteries have no memory effect, so charging at any level doesn't reduce capacity.
4. __Battery form factors differ between makes and models__, so it won't fit. Match the exact part for that model.
5. __In the laptop's keyboard hardware__ (or its ribbon cable connection) — the OS is accepting input fine.
6. __Small Outline Dual In-line Memory Module.__
7. __It can't be upgraded without replacing the whole system board.__
8. __2.5-inch: two (data and power). M.2: one — the slot carries both.__
9. __No gold contacts are visible__ once it's pushed into the slot.
10. __A fresh install gives a clean start__ (OS, then documents, then applications), but it's slow. __Imaging/cloning is much faster__ and duplicates the system exactly.
11. __Imaging to separate storage and restoring onto the new drive, or cloning directly drive to drive with both connected.__ Direct cloning is faster.
12. __The antenna wires and their connections.__ They run through the display assembly, so they're disconnected during a screen replacement and may have been reconnected wrongly or pinched.
13. __An operating system that supports biometrics, and the hardware__ (a fingerprint reader or suitable camera).
14. __About 4 cm or less.__ Beyond payments: authenticating at hospital workstations, and quick authentication in warehouses, manufacturing, and shipping and receiving.
