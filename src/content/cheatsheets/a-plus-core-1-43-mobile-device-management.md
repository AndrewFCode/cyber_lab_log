---
title: "A+ Core 1 1.3: Mobile Device Management"
description: "Professor Messer A+ 220-1201 lesson on MDM — BYOD, COPE, CYOD, partitioning, policies and restrictions, the MDM console and IMEI, over-the-air sync and business app accounts."
tags: ["a-plus", "comptia", "messer", "mobile", "mdm"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Mobile Device Management"
moduleOrder: 43
unit: 1
---
> **In one line:** an MDM manages every company and personal phone from one console — who owns it, what it can do, what's installed, how it's secured, and how its data syncs.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 1.3 (MDM).* The full version is the Mobile Device Management class notes; the section overview is the Section 1 sheet.

---

## Ownership models

| Model | Stands for | Owner | Chosen by | Control | Personal use |
|---|---|---|---|---|---|
| **BYOD** | Bring your own device (also **bring your own technology**) | Employee | Employee | Work partition only | Yes |
| **COPE** | Corporate owned, personally enabled | Company | Company | **Complete** | Often allowed |
| **CYOD** | Choose your own device | Company | **User, from a selection** | Complete | Often allowed |
| COBO *(beyond this lesson)* | Corporate owned, business only | Company | Company | Complete | **No** |

**BYOD must answer:** how do we protect company data, keep personal data private, and handle **upgrade, trade-in or loss**?

## Partitioning

A personal phone is split into a **home (private)** area and a **work (corporate)** area. The MDM manages only the work side. *(Beyond this lesson: "containerisation"; removing only the work area = selective wipe.)*

## What an MDM enforces

| Area | Controls |
|---|---|
| Security | Screen lock with a **PIN** (or other unlock); **2FA / MFA**, including which type |
| Apps | **Allow**, **forbid**, or **push** automatic installs |
| Features | Camera, GPS, FaceTime, voice dialling, Siri, printing |
| Email | Corporate email **configured centrally and pushed** — the inbox just works |

## MDM console

| View | Shows |
|---|---|
| Device list | Device name, platform, username, email and contact, **IMEI** (unique identifier) |
| Device detail | Model (e.g. iPhone 13), iOS version, OS info, security options, network summary |
| Restrictions tab | Enable or disable camera, FaceTime, voice dialling, Siri, security, printing, app options |

## Over-the-air sync

| Setting | Options |
|---|---|
| Purpose | **Backup** — and **restore** if a device fails, is damaged or is replaced |
| Preconfigured | Phone information and messages |
| Email service | Varies by organisation (Gmail, Outlook) → set centrally |
| Network | **Wi-Fi only** or Wi-Fi + **cellular** |
| Granular | Calendar, contacts and so on; different settings by time of day |
| Cost control | Limit cellular use; limit automatic downloads and **app size over mobile**; **check the provider contract** |

## Business app accounts

- **Add them in account settings** with a username and password (or another authentication factor).
- **Choose what syncs:** mail, contacts, calendars, reminders, notes.
- **Settings are per service** — e.g. Exchange ≠ Google Mail.

---

## 🔐 Security notes

- **Mobiles leave the building and get lost** → enforce screen locks and MFA through the MDM.
- **Decide lost-device, upgrade and trade-in handling in advance.** Use the console and IMEI to track and block devices.
- **App allow and deny lists** stop risky apps; feature restrictions (e.g. the camera) protect sensitive areas.
- **BYOD privacy:** the organisation manages the work partition, not personal data — make the policy clear to users.
- **Sync is backup:** a lost device shouldn't mean lost data.

---

## Practice drills

<details>
<summary>1. Staff use their own phones for work email. Which model, and what keeps their photos private?</summary>

BYOD, with MDM partitioning — separate personal (home) and corporate (work) areas.
</details>

<details>
<summary>2. The company buys phones, fully manages them, and lets staff use them personally. Which model?</summary>

COPE — corporate owned, personally enabled.
</details>

<details>
<summary>3. The company buys and manages phones, but staff pick from three approved models. Which model?</summary>

CYOD — choose your own device.
</details>

<details>
<summary>4. Where would you find a lost phone's unique hardware identifier?</summary>

In the MDM console's device list — the IMEI.
</details>

<details>
<summary>5. Users have small cellular data plans. How should sync be configured?</summary>

Large data and app downloads over Wi-Fi only; limit cellular use and download sizes; check the provider contract.
</details>

<details>
<summary>6. How do you get corporate email onto 500 phones without users typing server settings?</summary>

Configure it once in the MDM and push it to every device.
</details>

<details>
<summary>7. Can Exchange and Google Mail accounts on one phone sync different data?</summary>

Yes — sync choices (mail, contacts, calendars, reminders, notes) are set per service.
</details>

---

## Key takeaways

- **MDM** = central management of company and personal mobile devices.
- **BYOD** (employee-owned; also BYOT), **COPE** (company-owned with full control; personal use allowed), **CYOD** (user picks from company options).
- **Partitioning** separates work data from private data on personal phones.
- **Policies:** PIN screen locks, MFA, allowed, forbidden and pushed apps, feature restrictions, pushed email configuration.
- **The console** lists devices, users and the **IMEI**; the Restrictions tab toggles the camera, FaceTime, voice dialling, Siri and more.
- **OTA sync** is backup and restore: Wi-Fi vs cellular, granular data types and timing, cost limits.
- **Business accounts:** set up in account settings with credentials; sync choices per service.
