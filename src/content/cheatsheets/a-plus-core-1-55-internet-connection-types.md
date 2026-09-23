---
title: "A+ Core 1 2.7: Internet Connection Types"
description: "Professor Messer A+ 220-1201 objective 2.7 — satellite (GEO vs LEO), fibre, cable and DOCSIS, DSL, cellular tethering vs hotspot, and WISPs."
tags: ["a-plus", "comptia", "messer", "networking", "internet-connection-types", "satellite", "fibre", "dsl", "cellular"]
draft: false
updated: "2026-09-23"
kind: "resource"
resource: "a-plus-core-1"
module: "Internet Connection Types"
moduleOrder: 55
unit: 2
---

> **In one line:** the last mile to the ISP can be satellite (anywhere, but laggy and weather-hit), fibre (fastest, dearest), cable (coax, DOCSIS), DSL (phone line, asymmetric, distance-limited), cellular (tethering or hotspot) or a WISP (radio to an outdoor antenna).

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.7 (Internet Connection Types).* The full version is the Internet Connection Types class notes; the section overview is the Section 2 sheet.

---

## At a glance

| Type | Medium | Speed (lesson figures) | Latency | Watch out for |
|---|---|---|---|---|
| Satellite | Radio to a dish | ~100 down / 5 up Mbps | GEO ~600 ms · LEO 25–60 ms | Line of sight, rain fade, cost |
| Fibre | Light in glass | Highest | Very low | Cost to install and repair |
| Cable | Coax + cable modem | ~50 Mbps – 1 Gbps+ | Low | Shared with the neighbourhood |
| DSL | Copper phone line | e.g. 200 down / 20 up Mbps | Low | Asymmetric; slower with distance |
| Cellular | Mobile network | Varies with signal | Low–moderate | Coverage, caps, carrier rules |
| WISP | Radio to outdoor antenna | ~10–1,000 Mbps | Low–moderate | Line of sight, weather, range |

## Satellite: GEO vs LEO

| | GEO (traditional) | LEO (e.g. Starlink) |
|---|---|---|
| Altitude | ~35,786 km, fixed in the sky | ~550 km, moves across the sky |
| Light travel, dish → satellite → ground | ~239 ms | ~4 ms |
| Round trip in practice | ~480 ms minimum, often ~600 ms | 25–60 ms advertised |
| Dish needs | One fixed direction | A wide patch of open sky |

**Both:** line of sight required · **rain fade** = heavy rain weakens the signal (high Ku/Ka frequencies absorbed by water) · dearer than terrestrial · ideal for remote sites.

## Fibre

| Fact | Detail |
|---|---|
| Strengths | Most bandwidth, longest distances, no electrical interference |
| Weakness | Cable, equipment and repairs (splicing) all cost more than copper |
| WAN use | **SONET rings** (SDH in Europe) and **multi-wavelength** fibre (WDM / DWDM) |
| At the home | **ONT** converts light to Ethernet and marks the demarc — inside or outside the building |
| UK terms | **FTTP** = fibre to the building · **FTTC** = fibre to the street cabinet, then VDSL2 over copper |

## Cable vs DSL

| | Cable | DSL |
|---|---|---|
| Wire | Coax (cable TV) | Copper phone line |
| Box at home | Cable modem | DSL modem / router |
| Standard | **DOCSIS** — Data Over Cable Service Interface Specification | ADSL, VDSL2 |
| Signal | **Broadband**: many frequencies on one wire (TV, voice, data) | Data above the voice frequencies |
| Shape | Download > upload | **Asymmetric**: download much faster than upload |
| Distance | Not the main limit | Slower the further from the **central office** (exchange) — exam: within ~10,000 ft (~3 km) |
| Shared? | Yes, per neighbourhood segment | Line is yours back to the exchange/cabinet |

**Upload maths:** 2 GB = 16,000 Mb → 80 s at 200 Mbps down, **800 s** at 20 Mbps up.

## Cellular: tethering vs hotspot

| | Tethering | Mobile hotspot |
|---|---|---|
| Devices | **One** (one-to-one) | **Several** at once |
| Link | USB, Bluetooth or Wi-Fi | Wi-Fi |
| Phone acts as | Modem for one device | Wi-Fi access point + router |

Check the carrier plan: some block tethering/hotspot or charge extra. Mobile networks often use **CGNAT** (many customers, one public IP).

## WISP (wireless internet service provider)

| Fact | Detail |
|---|---|
| When | No cable or phone line available; remote and rural sites |
| Equipment | Outdoor antenna pointed at the WISP's tower, cabled to the router |
| Technologies | Meshed 802.11 · 5G home internet · proprietary wireless |
| Speed | ~10–1,000 Mbps |

## Choose by scenario

| Clue in the question | Answer |
|---|---|
| Nowhere else reaches; ship, research station | Satellite (LEO if calls/gaming matter) |
| Drops in storms | Satellite rain fade |
| Voice/video lag on a remote link | GEO satellite latency |
| Highest bandwidth, long distance, WAN | Fibre |
| Uses the TV coax; DOCSIS | Cable |
| Uses the phone line; neighbours get different speeds | DSL (distance) |
| Share a phone's data with one laptop | Tethering |
| Share a phone's data with several devices | Mobile hotspot |
| Rural, no cables, antenna on the roof | WISP |

## Measure latency

```powershell
Test-Connection 1.1.1.1 -Count 4      # PowerShell
ping -n 4 1.1.1.1                     # CMD
```

```bash
ping -c 4 1.1.1.1
```

A few ms = fibre/cable · tens of ms, jittery = LEO · ~600 ms = GEO.

## 🔐 Security notes

- **The modem, ONT or antenna is your perimeter:** change default credentials on anything you control, patch firmware, know where the ISP's kit ends.
- **The link isn't the encryption:** some GEO satellite links have been found carrying traffic unencrypted, and every ISP can see cleartext. Use HTTPS/TLS and VPNs.
- **Tethering and hotspots bypass the corporate edge:** no firewall, filter, DLP or logging, and a laptop on the LAN and a hotspot at once can bridge the two. Control with policy/MDM.
- **A hotspot is an access point:** WPA2/WPA3, strong passphrase, off when unused.
- **CGNAT muddies attribution:** one public IP can be hundreds of users.
- **Availability:** back up with a *different* type on a *different* path (fibre + cellular failover).

## Practice drills

<details>
<summary>1. Which connection type suffers rain fade, and what else does it need?</summary>

**Satellite.** It also needs **line of sight** to the satellite.
</details>

<details>
<summary>2. Why does GEO satellite add around half a second?</summary>

The satellite is ~35,786 km up: ~239 ms dish → satellite → ground, so ~480 ms for request and reply before processing.
</details>

<details>
<summary>3. What latency does Starlink advertise, and why is it lower?</summary>

**About 25–60 ms**, because its LEO satellites are only ~550 km up.
</details>

<details>
<summary>4. What does DOCSIS stand for?</summary>

**Data Over Cable Service Interface Specification** — the standard for data over cable TV coax.
</details>

<details>
<summary>5. Why is ADSL "asymmetric"?</summary>

**Download is much faster than upload.**
</details>

<details>
<summary>6. Two neighbours, same DSL plan, one much slower. Most likely cause?</summary>

**Distance / copper length** to the exchange or cabinet.
</details>

<details>
<summary>7. Tethering vs mobile hotspot?</summary>

**Tethering = one device; hotspot = several at once** (usually Wi-Fi).
</details>

<details>
<summary>8. Rural office, no cables, clear view of a local provider's mast. Best fit?</summary>

**A WISP** — outdoor antenna, 802.11 mesh / 5G / proprietary link.
</details>

## Key takeaways

- Compare connection types on bandwidth, latency, availability and cost.
- Satellite reaches anywhere; GEO ≈ half a second+ latency, LEO 25–60 ms; line of sight and rain fade.
- Fibre = fastest and longest reach, dearest to install and repair; ONT at the home.
- Cable = coax broadband with DOCSIS; DSL = phone line, asymmetric, slower with distance.
- Tethering = one device, hotspot = many; WISP = outdoor antenna, 10–1,000 Mbps.
