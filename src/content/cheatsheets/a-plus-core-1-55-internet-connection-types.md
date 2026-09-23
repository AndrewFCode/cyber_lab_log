---
title: "A+ Core 1 2.7: Internet Connection Types"
description: "A+ Core 1 objective 2.7 — satellite, fibre, cable/DOCSIS, DSL, cellular tethering/hotspot and WISP, compared."
tags: ["a-plus", "comptia", "messer", "internet-connections", "satellite", "fibre", "dsl", "cable", "wisp"]
draft: false
updated: "2026-09-23"
kind: "resource"
resource: "a-plus-core-1"
module: "Internet Connection Types"
moduleOrder: 55
unit: 2
---
> **In one line:** each internet connection type trades off speed, latency, cost and geographic reach differently — know which one fits which scenario.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 2 objective 2.7.* The full version is the Internet Connection Types class notes; the section overview is the Section 2 sheet.

## Connection types at a glance

| Type      | Medium              | Typical speed              | Latency        | Key limitation |
|-----------|----------------------|------------------------------|------------------|------------------|
| Satellite | RF to/from orbit     | ~100 Mbps down / 5 Mbps up  | ~500 ms (old); 25–60 ms (Starlink) | Line of sight, rain fade, cost |
| Fibre     | Light through glass  | Very high (multi-Gbps)      | Low             | Install/repair cost |
| Cable     | Coaxial copper        | 50 Mbps – 1 Gbps+           | Low             | Shared bandwidth on the segment |
| DSL       | Telephone copper      | Up to ~200/20 Mbps (asym.)  | Low             | Degrades with distance from CO |
| Cellular  | Cell towers            | Varies (carrier/generation) | Low–moderate    | Carrier data limits/cost |
| WISP      | Fixed wireless        | ~10–1,000 Mbps              | Low–moderate    | Needs line of sight to transmitter |

## Key terms

| Term | Meaning |
|---|---|
| DOCSIS | Standard governing data over cable internet |
| ADSL | Asymmetric DSL — download much faster than upload |
| Rain fade | Storm-caused satellite signal loss |
| Tethering | One device sharing a phone's data connection |
| Mobile hotspot | Multiple devices sharing a phone's data connection |
| WISP | Wireless ISP, common in rural/remote areas |
| Central office | Telco facility; DSL speed drops with distance from it |

## 🔐 Security notes

- Tethering/hotspot use on a managed device bypasses corporate network monitoring and filtering — flag it in acceptable use policy checks.
- Outdoor WISP/satellite antennas are physically exposed and identifiable — factor into physical security reviews for remote sites.
- Cable/WISP shared-medium links rely on encryption at the link and application layer, not physical isolation, to protect traffic from other subscribers.

## Practice drills

<details>
<summary>1. Which connection type is best suited to a remote site with no cable, phone line, or WISP coverage, but a clear view of the sky?</summary>

Satellite.
</details>

<details>
<summary>2. What causes satellite internet's traditionally high latency?</summary>

The physical distance the signal travels up to the satellite and back down to Earth.
</details>

<details>
<summary>3. What does DOCSIS govern?</summary>

Data transmission over cable (coaxial) internet connections.
</details>

<details>
<summary>4. Why is ADSL called "asymmetric"?</summary>

Because download speed is significantly higher than upload speed.
</details>

<details>
<summary>5. What is the practical distance limit for good DSL service from the central office?</summary>

Roughly 10,000 feet.
</details>

<details>
<summary>6. What's the difference between tethering and a mobile hotspot?</summary>

Tethering connects one other device to the phone's data; a hotspot serves multiple devices at once.
</details>

<details>
<summary>7. Name two wireless technologies a WISP might use to serve its customers.</summary>

Meshed 802.11 Wi-Fi and 5G home internet (also possibly proprietary wireless tech).
</details>

## Key takeaways

- Satellite: near-universal reach, higher cost, latency depends heavily on satellite altitude (Starlink is much lower latency than traditional systems).
- Fibre: fastest and longest-range option, but costlier to install and repair than copper.
- Cable uses DOCSIS over coax and carries voice/video/data simultaneously as broadband.
- DSL is asymmetric and distance-limited from the central office.
- Cellular sharing splits into tethering (one device) and hotspot (many devices).
- WISPs are a practical fixed-wireless option for areas without wired infrastructure.
