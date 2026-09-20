---
title: "A+ Core 1: Mobile Devices"
description: "Exam tip: on the 220-1201 exam, display technologies (LCD, OLED, digitizers, inverters) moved to section 3 (Hardware). Section 1 is laptop hardware, connections and connectivity/management."
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Section 1 (objectives 1.1–1.3)__

__Quick reference:__ the short version of this section is the Section 1 cheat sheet. Hands-on laptop repair is in TCM Help Desk section 5.

## Learning objectives

By the end of these notes you should be able to:

1. Describe laptop hardware components and how to replace or upgrade them (objective 1.1).
2. Plan an HDD-to-SSD migration.
3. Connect mobile devices using wired and wireless methods, and choose the right accessory (1.2).
4. Explain cellular, Wi-Fi, Bluetooth, NFC and GPS connectivity, and the role of the SIM (1.3).
5. Explain mobile device management, device ownership models and remote wipe.
6. Apply mobile security best practices.

__Exam tip:__ on the 220-1201 exam, display technologies (LCD, OLED, digitizers, inverters) moved to section 3 (Hardware). Section 1 is laptop hardware, connections and connectivity/management.

## 1. Laptop hardware (1.1)

## 1.1 Batteries

__Technology__

__Notes__

Lithium-ion (Li-ion)

The standard rechargeable chemistry. No "memory effect" — partial charges are fine

Lithium-polymer (Li-poly)

A lithium variant in a flexible pouch that can be shaped to fit thin devices

Older chemistries (NiCd, NiMH)

Legacy. NiCd suffered from "memory effect"

- __Capacity__ declines with charge cycles and heat.
- __Removable vs internal:__ older laptops have external, swappable packs. Most modern laptops have internal batteries that need the case opened.
- __Replacement:__ use the manufacturer's part number. Voltage and connector must match exactly.
- __Swollen battery:__ stop using it immediately; don't puncture it; recycle it as hazardous waste.

## 1.2 Keyboards and keycaps

- __Individual keys:__ keycaps usually pop off and clip back onto a small scissor or butterfly mechanism. Replace just the keycap if the mechanism is intact.
- __Whole keyboard:__
	- Some are screwed in and connected by a ribbon cable.
	- Many modern laptops rivet the keyboard to the palm rest ("top case"), so the whole assembly is replaced.
- __Function (Fn) keys__ control dual-purpose actions: brightness, volume, Wi-Fi on/off, external display toggle, keyboard backlight. Many "my Wi-Fi/screen stopped working" tickets are a toggled Fn key or airplane mode.

## 1.3 Memory

__Type__

__Notes__

SODIMM

Laptop memory module (DDR4 SODIMM 260-pin; DDR5 SODIMM 262-pin)

Soldered (LPDDR)

Built onto the motherboard — no upgrade possible

Installation

Insert at an angle, then press down until the clips lock

## 1.4 Storage and HDD-to-SSD migration

__Form factor__

__Notes__

2.5" SATA

HDDs and SSDs; laptop drives are usually 7 mm thick

M.2

SATA or NVMe; common lengths 2230, 2242, 2280

mSATA

Older small SSD format

__Why upgrade:__ an SSD has no moving parts, making it faster, quieter, more shock-resistant and lower-power. It's the single most effective laptop upgrade.

### Worked example — planning a migration

__Scenario:__ a 5-year-old laptop with a 1 TB HDD holding 300 GB of data. The user wants it faster without losing anything.

1. __Check the interface:__ the laptop has a 2.5" SATA bay and an empty M.2 2280 slot supporting NVMe. Choose a 500 GB NVMe M.2 2280 SSD (faster than SATA; room to grow).
2. __Choose the method:__
	- __Clone (image):__ copies the whole disk — OS, apps, data, partitions. No reinstall.
	- __Fresh install:__ clean OS on the SSD, then reinstall apps and copy data. Removes accumulated clutter, but takes longer.
3. __Clone:__
	- Install the SSD in the M.2 slot.
	- Suspend BitLocker if enabled.
	- Run a cloning tool from HDD to SSD, including the EFI and recovery partitions.
4. __Boot order:__ set the SSD first in UEFI; confirm Windows boots from it.
5. __After:__
	- Verify the data is all there.
	- Decide what happens to the HDD — keep it as secondary storage (wipe and reformat) or remove it.
	- A removed drive must be securely wiped before disposal.

## 1.5 Wireless, NFC and biometrics

__Component__

__Notes__

Wireless card

M.2 Wi-Fi/Bluetooth card; antenna leads run up through the hinge into the display

NFC

Near-field communication (13.56 MHz, a few cm): tap-to-pay, pairing, access badges

Biometrics

Fingerprint readers, IR face recognition (Windows Hello)

## 1.6 Cameras and microphones

- Usually in the display bezel.
- Controlled by OS privacy settings: Settings → Privacy & security → Camera / Microphone.
- Some laptops have __physical shutters__ or kill switches — the only control malware can't bypass.

## 2. Mobile device configuration (1.2)

## 2.1 Wired connections

__Connector__

__Traits__

USB-C

Reversible, 24-pin; data, video (DisplayPort Alt Mode) and USB Power Delivery charging. The modern standard, including iPhone 15 and later

Lightning

Apple's proprietary 8-pin reversible connector on older iPhones and iPads

Micro-USB

Older Android phones and accessories; not reversible; USB 2.0 speeds

Mini-USB

Older still (cameras, older devices)

Proprietary vendor-specific ports appear on some older devices and accessories.

## 2.2 Wireless connections

__Method__

__Range__

__Use__

NFC

A few cm

Payments, quick pairing, transit and access cards

Bluetooth

About 10 m typical

Headsets, keyboards, speakers, car kits

Wi-Fi

Tens of metres

Network and internet access

Hotspot

Wi-Fi range

Phone shares its cellular data __over Wi-Fi__

Tethering

Cable / Bluetooth

Phone shares its cellular data __over USB or Bluetooth__

### Worked example — Bluetooth pairing

A user's new headset won't connect to their laptop.

1. __Enable Bluetooth__ on the laptop: Settings → Bluetooth & devices, or check airplane mode and the Fn key.
2. __Put the headset in pairing (discoverable) mode__ — usually a long press on the power button until the LED flashes.
3. __On the laptop:__ Add device → Bluetooth → select the headset.
4. __Confirm the PIN__ or code if prompted (many headsets use a fixed code, or none).
5. __Test__ audio output, and set it as the default device if needed.
6. __Still failing?__ Remove the old pairing from both devices, check the headset isn't already connected to a phone nearby, and update the Bluetooth driver.

## 2.3 Accessories

__Accessory__

__Use__

Stylus / touch pen

Precise input and handwriting on touchscreens

Headsets

Calls and audio (Bluetooth, USB, 3.5 mm)

Speakers

External audio

Webcam

External camera for better video quality

Docking station

One connection (often USB-C/Thunderbolt) gives power, multiple displays, Ethernet and many USB ports; may add expansion

Port replicator

A simpler device that duplicates the laptop's own ports

Trackpad / touchpad

External pointing device

Drawing pad

Pressure-sensitive tablet for artwork and signatures

__Exam tip:__ docking station vs port replicator. A dock offers __more__ (power, displays, network, sometimes expansion slots); a port replicator just __replicates__ existing ports.

## 3. Mobile connectivity (1.3)

## 3.1 Cellular networks

__Generation__

__Notes__

3G

Early mobile data — being switched off by carriers

4G / LTE

Widespread mobile broadband

5G

Faster, lower latency. Three band types: low-band (long range, modest speed), mid-band (balance), high-band / mmWave (very fast, very short range, poor wall penetration)

## 3.2 SIM, IMEI and IMSI

__Term__

__Identifies__

__Notes__

SIM / eSIM

The subscriber's account with the carrier

A physical card, or an embedded eSIM provisioned digitally

IMSI

The __subscriber__ — stored on the SIM

Moves with the SIM

IMEI

The __device__ — the phone hardware

Used to block stolen phones; dial \*\#06\

# to show it

## 3.3 Wi-Fi, hotspots and Bluetooth on mobile devices

- __Wi-Fi__ is preferred when available: faster, and saves the data allowance.
- A __mobile hotspot__ makes the phone a Wi-Fi access point for other devices.
- __Bluetooth__ carries peripherals and audio, and can also be used for tethering.

## 3.4 Location services

- __GPS__ receives signals from navigation satellites. A 3D fix (latitude, longitude, altitude, time) needs at least __four satellites__.
- Phones speed up and refine location using cell towers and known Wi-Fi networks (assisted location).
- __Privacy:__ location access is granted per app — review app permissions.

## 4. Mobile device management

## 4.1 What MDM does

__Mobile device management (MDM)__ lets an organisation centrally manage phones, tablets and laptops (Microsoft Intune is a common example):

- __Enforce policies:__ screen lock PIN or biometrics, encryption, minimum OS version.
- __Control features:__ disable the camera, block app stores, restrict USB.
- __Deploy and update apps__, and configure Wi-Fi, VPN and email profiles automatically.
- __Locate, lock or wipe__ lost devices.
- __Report compliance.__ Non-compliant devices can be blocked from company data.

## 4.2 Ownership models

__Model__

__Who owns it__

__Personal use__

__Company control__

BYOD (bring your own device)

Employee

Full

Limited — usually only the work apps and data

COPE (corporate-owned, personally enabled)

Company

Allowed

High

CYOD (choose your own device)

Company (from an approved list)

Often allowed

High

COBO (corporate-owned, business only)

Company

Not allowed

Full

## 4.3 Containerisation and MAM

On BYOD devices, __mobile application management (MAM)__ or __containerisation__ keeps business apps and data in a separate, managed space. The company can wipe that container without touching the user's personal photos and apps.

## 4.4 Remote wipe

__Type__

__Removes__

__Use__

Full wipe (factory reset)

Everything

Lost or stolen corporate devices

Selective / corporate wipe

Only company apps, data and profiles

BYOD devices, or when an employee leaves

## 4.5 Data synchronisation and business apps

- __Sync__ keeps email, contacts, calendar and files consistent across devices, via Microsoft 365/Exchange (often Exchange ActiveSync) or cloud storage.
- __Challenges:__ conflicts, bandwidth, and sensitive data being copied to many devices.
- __Business apps__ are published through MDM or a managed app store, kept updated centrally, and removed when a device leaves management.

## 4.6 Worked example — choosing a model

A company wants staff to read work email on their own phones without IT controlling their whole device.

1. __Model:__ BYOD with MAM/containerisation.
2. __Policy:__ require a device PIN; block copy-paste from work apps to personal apps; require an up-to-date OS.
3. __Leaver process:__ a selective wipe removes the work container only.
4. __Result:__ company data is protected, and personal data stays private.

## 5. Security perspective

- __Treat a lost device as a security incident.__ Report it immediately, so MDM can lock or wipe it.
- __SIM-swap attacks:__ criminals persuade a carrier to move a victim's number to a SIM they control, then receive SMS verification codes. Prefer authenticator apps, passkeys or hardware keys over SMS for MFA.
- __Bluetooth attacks:__
	- __Bluejacking__ — sending unsolicited messages.
	- __Bluesnarfing__ — stealing data over Bluetooth.
	- Keep Bluetooth off when unused, don't accept unknown pairings, and keep devices updated.
- __Public Wi-Fi and hotspots:__ use a VPN, and beware __evil twin__ access points that imitate legitimate network names.
- __NFC:__ its tiny range limits risk, but keep payment authentication (PIN or biometric) enabled.
- __Cameras and microphones:__ physical shutters and per-app permissions; check which apps have access.
- __Charging from untrusted USB ports__ can expose data connections. Use your own charger or a data-blocking adapter.

# Summary

- __Laptops:__ Li-ion/Li-poly batteries; keycaps and keyboards (sometimes part of the top case); SODIMM or soldered RAM; 2.5" or M.2 storage; wireless cards with antennas in the lid; NFC; biometrics; bezel cameras and mics.
- __HDD → SSD:__ check form factor and interface; clone or fresh install; set the boot order; wipe the old drive.
- __Connections:__ USB-C (modern), Lightning (older Apple), micro-USB (legacy). Hotspot shares over Wi-Fi; tethering over USB or Bluetooth.
- __Accessories:__ a docking station does more than a port replicator.
- __Cellular:__ 3G/4G/5G, with 5G low-, mid- and high-band (mmWave). The SIM carries the IMSI (subscriber); the IMEI identifies the device. GPS needs four satellites.
- __MDM:__ enforces policy, deploys apps, and locks or wipes devices. BYOD/COPE/CYOD/COBO set ownership; selective wipe for BYOD.

# Glossary

__Term__

__Definition__

Li-ion / Li-poly

Lithium-ion / lithium-polymer battery chemistries

SODIMM

Small-outline memory module for laptops

M.2

Small card form factor for SSDs and wireless cards

Cloning

Copying an entire disk to another disk

NFC

Near-field communication — very short-range wireless

USB-C

Reversible connector for data, video and power

Lightning

Apple's older proprietary connector

Hotspot

Sharing a phone's cellular data over Wi-Fi

Tethering

Sharing a phone's cellular data over USB or Bluetooth

Docking station

Adds power, displays, network and ports via one connection

Port replicator

Duplicates a laptop's ports

mmWave

High-band 5G: very fast, very short range

SIM / eSIM

Subscriber identity module, physical or embedded

IMSI

Identifies the subscriber (on the SIM)

IMEI

Identifies the physical device

MDM

Mobile device management

MAM

Mobile application management — managing apps and data only

BYOD / COPE / CYOD / COBO

Device ownership models

Selective wipe

Removing only corporate data from a device

SIM swap

Fraudulently moving a phone number to an attacker's SIM

# Review questions

1. What's the difference between Li-ion and Li-poly batteries?
2. A user's laptop Wi-Fi suddenly stops working after they pressed some keys. What's the first thing to check?
3. List three things to check before buying an SSD upgrade for a laptop.
4. A phone shares its data connection with a laptop over a USB cable. Is this a hotspot or tethering?
5. What's the difference between a docking station and a port replicator?
6. Which 5G band offers the highest speed but the shortest range?
7. Which identifier stays with the phone if the SIM is removed: IMSI or IMEI?
8. What's the minimum number of GPS satellites for a 3D position fix?
9. An employee leaves the company and their personal phone has company email. Which kind of wipe?
10. Which ownership model is company-owned but allows personal use?
11. Why are authenticator apps safer than SMS codes for MFA?
12. Name two Bluetooth-based attacks.

# Answer key

1. __Both are lithium chemistries; Li-poly uses a flexible pouch that can be shaped for thin devices.__
2. __Airplane mode or the Fn wireless toggle key.__
3. __Any three of:__ form factor (2.5" vs M.2 and its length), interface (SATA vs NVMe), capacity vs data size, BitLocker status and the migration method.
4. __Tethering__ — a hotspot shares over Wi-Fi.
5. __A dock provides more__ (power, displays, network, sometimes expansion); __a port replicator just duplicates__ the laptop's ports.
6. __High-band (mmWave).__
7. __The IMEI__ — it identifies the device. The IMSI is on the SIM.
8. __Four.__
9. __A selective (corporate) wipe__ — remove company data only.
10. __COPE__ (corporate-owned, personally enabled).
11. __SIM-swap attacks__ can redirect SMS codes to an attacker; authenticator apps aren't tied to the phone number.
12. __Bluejacking and bluesnarfing.__
