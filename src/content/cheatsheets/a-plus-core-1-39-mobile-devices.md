---
title: "A+ Core 1: Mobile Devices"
description: "Professor Messer A+ 220-1201 section 1 — laptop hardware, connecting and accessorising mobile devices, cellular and wireless connectivity, and MDM."
tags: ["a-plus", "comptia", "messer", "mobile", "laptops"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "a-plus-core-1"
module: "Mobile Devices"
moduleOrder: 39
unit: 1
---
> **In one line:** laptops and phones are full computers with batteries — know what's inside, how they connect, and how an organisation keeps hundreds of them under control.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1 course, section 1 (objectives 1.1–1.3).* Display types (LCD, OLED, digitizers) sit in section 3 on the 220-1201 exam.

---

## 1.1 Laptop hardware

| Component | Exam-level facts |
|---|---|
| Battery | Lithium-ion (Li-ion) or lithium-polymer (Li-poly, can be moulded to shape). Removable on older models, internal on most new ones. Capacity falls with charge cycles |
| Keyboard | Keycaps pop off and clip back on; a whole keyboard swaps via ribbon cable — sometimes only as part of the top case. `Fn` keys control brightness, Wi-Fi, display output |
| Storage | 2.5" SATA or M.2. HDD → SSD is the classic upgrade |
| NFC | Short-range radio for tap-to-pay, pairing and access badges |
| Camera and microphone | Built into the display bezel; privacy shutters and OS privacy settings control them |
| Biometrics | Fingerprint readers and IR cameras for Windows Hello |

**Migrating HDD → SSD:** clone (image the old drive to the new one) or do a clean install. Check the form factor (2.5" vs M.2, and M.2 length) and the interface (SATA vs NVMe) first.

---

## 1.2 Mobile device configuration

### Connecting

| Method | Notes |
|---|---|
| USB-C | Reversible; data, video and Power Delivery charging — the current standard, including iPhone 15 onwards |
| Lightning | Apple's older 8-pin reversible connector |
| Micro-USB | Older Android and accessories; one way round |
| NFC | Tap-to-pair and tap-to-pay, a few centimetres of range |
| Bluetooth | Wireless peripherals and audio |
| Hotspot | Phone shares its cellular data over **Wi-Fi** |
| Tethering | Phone shares its cellular data over **USB or Bluetooth** |

**Bluetooth pairing:**
1. Turn Bluetooth on.
2. Make the device discoverable.
3. Select it on the host.
4. Confirm or enter the PIN.
5. Test it.

### Accessories

| Accessory | Use |
|---|---|
| Stylus / touch pen | Precise input and handwriting on touchscreens |
| Headsets and speakers | Audio via Bluetooth, USB or 3.5 mm |
| Webcam | External camera, typically USB |
| Docking station | One connection adds power, displays, network and many ports; may add expansion |
| Port replicator | Simpler — duplicates the laptop's own ports |
| Trackpad / touchpad | External pointing device |
| Drawing pad | Pressure-sensitive tablet for artwork and signatures |

---

## 1.3 Mobile connectivity

| Technology | Notes |
|---|---|
| Cellular 3G | Legacy, being switched off |
| Cellular 4G / LTE | Widespread mobile broadband |
| Cellular 5G | Low-band (range) · mid-band (balance) · high-band mmWave (very fast, very short range) |
| Wi-Fi | Preferred when available — faster and doesn't use the data allowance |
| SIM / eSIM | Identifies the subscriber to the carrier; an eSIM is built in and provisioned digitally |
| Bluetooth | Personal area network for peripherals |
| GPS | Satellite positioning — at least four satellites for a 3D fix. Phones speed it up with Wi-Fi and cell data |

### Mobile device management (MDM)

| Concept | Meaning |
|---|---|
| MDM | Central control of phones and laptops: policies, apps, updates, lock and wipe (e.g. Microsoft Intune) |
| Policies | Required PIN or biometrics, encryption, OS version, blocked features such as the camera |
| BYOD | Bring your own device — employee-owned, company data on it |
| COPE | Corporate-owned, personally enabled — company device, personal use allowed |
| CYOD / COBO | Choose your own device (from a list) / corporate-owned, business only |
| Containerisation / MAM | Separates business apps and data from personal ones |
| Data synchronisation | Email, contacts, calendar and files synced to cloud or Exchange |
| Business apps | Pushed and updated through MDM or a managed app store |

---

## Handy checks (Windows)

| Want | Command |
|---|---|
| Wi-Fi status: SSID, signal, band, channel | `netsh wlan show interfaces` |
| Network adapters, including cellular | `Get-NetAdapter` |
| Bluetooth devices | `Get-PnpDevice -Class Bluetooth` |
| Mobile hotspot settings | `start ms-settings:network-mobilehotspot` |
| Camera / microphone privacy | `start ms-settings:privacy-webcam` · `start ms-settings:privacy-microphone` |
| Battery health | `powercfg /batteryreport` |

---

## 🔐 Security notes

- **Lost device = security incident.** Report it at once, so MDM can lock or wipe it.
  - A full wipe erases everything.
  - A selective (corporate) wipe removes only company data — the usual choice for BYOD.
- **SIM-swap attacks.** Criminals talk a carrier into moving your number to their SIM, then receive your SMS codes. Prefer authenticator apps or passkeys over SMS for MFA.
- **Bluetooth:** switch it off when not in use and don't accept unknown pairing requests.
  - Bluejacking = unsolicited messages.
  - Bluesnarfing = data theft.
- **Hotspots and public Wi-Fi:** use a VPN, and beware "evil twin" access points with familiar names.
- **Cameras and microphones:** a physical shutter beats any software setting. Review app permissions.

---

## Practice drills

<details>
<summary>1. A user shares their phone's data with a laptop over a USB cable. Hotspot or tethering?</summary>

Tethering — a hotspot is over Wi-Fi.
</details>

<details>
<summary>2. Which ownership model gives the company the most control over a device the employee can also use personally?</summary>

COPE — corporate-owned, personally enabled.
</details>

<details>
<summary>3. A BYOD phone is lost. Full wipe or selective wipe?</summary>

Selective (corporate) wipe — remove company data without destroying personal data.
</details>

<details>
<summary>4. A laptop dock vs a port replicator — what's the difference?</summary>

A dock offers more — power, displays, network, sometimes expansion. A port replicator just duplicates the laptop's ports.
</details>

<details>
<summary>5. Why is 5G mmWave fast in a stadium but useless indoors down the street?</summary>

High-band mmWave has huge bandwidth but very short range and poor penetration of walls.
</details>

---

## Key takeaways

- Laptop parts: Li-ion/Li-poly batteries, keycaps and keyboards, 2.5" or M.2 storage, NFC, bezel cameras and mics.
- Connections: USB-C (current), Lightning (older Apple), micro-USB (legacy), Bluetooth pairing, hotspot (Wi-Fi) vs tethering (USB/Bluetooth).
- Connectivity: 4G/5G bands, SIM/eSIM, GPS needs four satellites.
- MDM enforces policy and remote wipe; BYOD vs COPE decides who owns what.
