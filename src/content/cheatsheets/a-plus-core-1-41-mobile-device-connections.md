---
title: "A+ Core 1 1.2: Mobile Device Connections"
description: "Professor Messer A+ 220-1201 lesson on connecting mobile devices — mini/micro-USB, Type-A, USB-C, Lightning, NFC, Bluetooth PAN, hotspot vs tethering."
tags: ["a-plus", "comptia", "messer", "mobile", "usb", "bluetooth"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Mobile Device Connections"
moduleOrder: 41
unit: 1
---
> **In one line:** mobile devices connect by cable (USB family or Lightning) or wirelessly (NFC, Bluetooth, hotspot/tethering) — for charging, and also for sync, backup and identification.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 1.2 (connecting mobile devices).* The full version is the 1.2 class notes; the section overview is the Section 1 sheet.

---

## What connections are for

**Charging** · **connectivity** · **synchronisation** · **backup** · **identification** (proving the device is yours)

## Wired connectors

| Connector | Pins | Reversible? | Where | Key facts |
|---|---|---|---|---|
| Mini-USB (mini-B) | — | No | Older devices | An older, larger-style plug |
| Micro-USB (micro-B) | — | No | Older phones and accessories | Still found on devices in use today |
| USB Type-A | — | No | **Computer or charger end** | Still common even when the device end has changed |
| **USB-C** | **24** | **Yes** | Modern phones, tablets, laptops | Faster; covers USB 2.0 → latest; also carries **DisplayPort, HDMI, Thunderbolt** |
| **Lightning** | **8** | **Yes** | **Older iPhones and iPads** (Apple proprietary) | Higher power output (faster charging); simple design |

**USB-C is a connector, not a speed.** What works — video, Thunderbolt, fast charging — depends on the device and the cable.

**Trend:** everything is converging on USB-C → fewer cables in the bag.

## Wireless connections

| Method | Range | Uses |
|---|---|---|
| **NFC** (Near Field Communication) | Very short | Point-of-sale **payments**; **access control** (phone or watch on a wall sensor instead of an ID card); phone-to-phone data transfer |
| **Bluetooth** | Short, high speed | **PAN** (personal area network): headsets, headphones, keyboards, mice, tethering. Can link several devices |

## Hotspot vs tethering

| | Hotspot | Tethering |
|---|---|---|
| Messer's definition | Phone shares internet with **many** devices | Phone shares internet with **one** device |
| Usual link | Wi-Fi | USB cable or Bluetooth |
| Depends on | Phone software **+ mobile provider's plan** | Same |

**Exam trap:** one laptop on a USB cable to a phone = **tethering**.

---

## 🔐 Security notes

- **USB carries data, not just power.** Avoid untrusted public USB charging ("juice jacking"); use your own charger or a data-blocking adapter. Don't "trust" unknown computers when the phone asks.
- **NFC:** its short range helps, but keep payment PINs and biometrics on. Report lost phones or watches used for door access so the credential is revoked.
- **Bluetooth:** switch it off when idle and reject pairing requests you didn't start (bluejacking, bluesnarfing).
- **Hotspots:** use a strong password with WPA2/WPA3 — never leave them open.
- **MDM** can block tethering and USB data transfer on corporate phones.

---

## Practice drills

<details>
<summary>1. How many pins do USB-C and Lightning have, and are they reversible?</summary>

USB-C: 24 pins. Lightning: 8 pins. Both are reversible.
</details>

<details>
<summary>2. Name three signal types besides USB data that can use a USB-C connector.</summary>

DisplayPort, HDMI and Thunderbolt.
</details>

<details>
<summary>3. Which end of an older phone cable is usually USB Type-A?</summary>

The computer or charger end. The device end is typically micro-B or mini-B.
</details>

<details>
<summary>4. Staff want to open doors with their phones instead of ID cards. Which technology?</summary>

NFC — a phone or watch held to a sensor on the wall.
</details>

<details>
<summary>5. A wireless headset and mouse connected to a laptop form what kind of network?</summary>

A PAN (personal area network), using Bluetooth.
</details>

<details>
<summary>6. Four laptops share one phone's internet. Hotspot or tethering?</summary>

Hotspot — many devices. Tethering is a single device.
</details>

<details>
<summary>7. Hotspot doesn't work on a user's phone even though the setting exists. What should you check?</summary>

Whether the mobile provider's plan allows hotspot use.
</details>

---

## Key takeaways

- Connections are for charging, connectivity, sync, backup and identification.
- Mini-B and micro-B are older; Type-A is at the computer end; **USB-C** (24 pins, reversible) is the modern standard, carrying DisplayPort, HDMI and Thunderbolt.
- **Lightning** is Apple's older 8-pin, reversible, higher-power connector.
- **NFC:** tiny range and small amounts of data — payments, door access, phone-to-phone.
- **Bluetooth** is a **PAN**: headsets, keyboards, mice, tethering.
- **Hotspot = many devices; tethering = one.** Both depend on the phone and the provider's plan.
