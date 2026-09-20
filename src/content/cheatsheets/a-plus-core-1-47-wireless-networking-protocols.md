---
title: "A+ Core 1 2.2: Wireless Networking Protocols"
description: "Professor Messer A+ 220-1201 objective 2.2 — 802.11/Wi-Fi naming, frequency bands, channels and bandwidth, Bluetooth and ISM, RFID passive/active tags, and NFC."
tags: ["a-plus", "comptia", "messer", "networking", "wireless", "wifi", "bluetooth", "rfid", "nfc"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Wireless Networking Protocols"
moduleOrder: 47
unit: 2
---
> **In one line:** Wi-Fi (IEEE 802.11) uses channels within 2.4/5/6 GHz; Bluetooth and Wi-Fi share the unlicensed ISM band; RFID and NFC add short-range identification and payment.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.2 (wireless networking protocols).* The full version is the Wireless Networking Protocols class notes; the section overview is the Section 2 sheet.

---

## Wi-Fi naming

| 802.11 standard | Wi-Fi name |
|---|---|
| 802.11ac | **Wi-Fi 5** |
| 802.11ax | **Wi-Fi 6** / **6E** (extended) |
| 802.11be | **Wi-Fi 7** |

Standardised by the **IEEE 802.11 Committee**.

## Frequency bands

| Band | Spectrum | Bandwidth options | Interference |
|---|---|---|---|
| **2.4 GHz** | Limited — **3 non-overlapping 20 MHz channels** (1, 6, 11) | Mainly 20 MHz | Highest |
| **5 GHz** | Much more | 20 / 40 / 80 / **160 MHz** | Lower |
| **6 GHz** | The most | 20 / 40 / 80 / 160 MHz | Lowest |

**Channel** = a simple label for a slice of spectrum. Example: 2.4 GHz **channel 6 = 2.437 GHz**; 5 GHz **channel 44 = 5.220 GHz**.

**Bandwidth** = how much spectrum one connection uses (20/40/80/160 MHz) — more bandwidth, generally more throughput.

## Bluetooth

| Feature | Detail |
|---|---|
| Frequency | **2.4 GHz**, part of the unlicensed **ISM** band |
| Range (consumer) | About **10 m** |
| Typical use | Personal devices — headsets, speakers |

**ISM** = Industrial, Scientific, Medical — unlicensed spectrum, no permit needed.

## RFID

| Tag type | Power | Range |
|---|---|---|
| **Passive** | None — powered by the **scanner's** signal | Short |
| **Active** | Own **battery** | Longer |

**How a passive read works:** tag unpowered → scanner brought close → scanner's RF energy powers the tag → scanner reads the ID code → code compared against a database.

**Uses:** access badges, retail/manufacturing tags, pet identification.

## NFC

**Builds on RFID, but two-way** (RFID is generally one-way).

| Use | Example |
|---|---|
| Payment | Tap phone/watch at a POS terminal |
| Device setup | Passes Bluetooth/Wi-Fi config to a new device |
| Access | Phone instead of a badge |

---

## 🔐 Security notes

- **2.4 GHz congestion can mimic a fault** — try 5/6 GHz or a channel change before assuming something's broken.
- **ISM is unlicensed for everyone,** including rogue APs — verify SSID and authentication before joining.
- **Basic RFID/NFC isn't inherently encrypted** — some badges can be cloned; use encrypted/rolling-code tags for sensitive access.
- **Bluetooth's "10 m" is typical, not absolute** — directional antennas can extend an attacker's range. Turn it off when unused; reject unexpected pairing requests.
- **NFC's tiny range helps**, but keep payment PIN/biometric on as a second layer.

---

## Practice drills

<details>
<summary>1. Which 802.11 standard corresponds to Wi-Fi 6E?</summary>

802.11ax (extended to 6 GHz).
</details>

<details>
<summary>2. Why does 2.4 GHz suffer more interference than 5 GHz?</summary>

It has far less usable spectrum — only three non-overlapping 20 MHz channels.
</details>

<details>
<summary>3. What does channel 6 on 2.4 GHz correspond to in frequency?</summary>

2.437 GHz.
</details>

<details>
<summary>4. What band does Bluetooth use, and what family of frequencies is that part of?</summary>

2.4 GHz — the unlicensed ISM band.
</details>

<details>
<summary>5. A pet microchip has no battery. How is it read?</summary>

It's a passive RFID tag — the scanner's radio signal powers it, then reads its ID.
</details>

<details>
<summary>6. A container needs tracking from much farther away than a badge reader can manage. Passive or active tag?</summary>

Active — it has its own battery for longer range.
</details>

<details>
<summary>7. What's the key functional difference between RFID and NFC?</summary>

RFID is generally one-way (reader scans tag); NFC supports two-way communication.
</details>

---

## Key takeaways

- **802.11 (IEEE)** = Wi-Fi. 802.11ac/ax/be = Wi-Fi 5/6(E)/7.
- **2.4 GHz:** crowded, only 3 non-overlapping channels. **5/6 GHz:** far more spectrum and wider bandwidths (up to 160 MHz).
- **Channels** simplify referring to frequencies; **bandwidth** is spectrum used per connection.
- **Bluetooth:** 2.4 GHz, ISM band, ~10 m, personal devices.
- **RFID:** passive (scanner-powered, short range) vs active (battery, longer range) tags.
- **NFC:** two-way, short-range — payments, pairing/setup, access.
