---
title: "A+ Core 1 2.5: Network Devices"
description: "Professor Messer A+ 220-1201 objective 2.5 — routers, managed vs unmanaged switches, access points, patch panels, firewalls, PoE standards, cable/DSL/ONT and NICs."
tags: ["a-plus", "comptia", "messer", "networking", "network-devices", "poe"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "a-plus-core-1"
module: "Network Devices"
moduleOrder: 52
unit: 2
---
> **In one line:** every network device has one job and decides using one piece of information — routers use IP addresses, switches and access points use MAC addresses, firewalls use rules — and PoE, modems and ONTs bring power and the internet to it all.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.5 (Network Devices).* The full version is the Network Devices class notes; the section overview is the Section 2 sheet.

---

## The devices

| Device | Layer | Decides using | Key point |
|---|---|---|---|
| Router | 3 | Destination IP + routing table | Connects subnets, and different media (copper, fibre, wireless, WAN) |
| Layer 3 (multilayer) switch | 2 and 3 | MAC and IP | A switch that also routes |
| Switch | 2 | Destination MAC | Hardware forwarding (**ASIC**); 24/48 ports, hundreds in the core |
| Access point | 2 | Destination MAC | **Bridges** wireless to wired: no routing, no address translation |
| Traditional firewall | 3–4 | IP addresses, protocol, ports | Rule-based (ACLs), usually stateful |
| Next-generation firewall | Up to 7 | The application | Can block remote access tools even on port 443 |

A home "wireless router" = router + switch + access point + firewall in one box.

## Unmanaged vs managed switches

| | Unmanaged | Managed |
|---|---|---|
| Setup | Plug-and-play | Configured |
| VLANs | None: one big VLAN | Per-port VLANs |
| QoS / prioritisation | No | Yes |
| Redundancy | No | Yes (backup switches) |
| Port mirroring | No | Yes: feed an analyser or IDS |
| SNMP / logs / remote management | No | Yes |
| Price | Low | Higher |

**Rule of thumb:** if anyone needs to separate, prioritise, monitor or remotely manage traffic, buy managed.

## Patch panels

| Part | What happens there |
|---|---|
| Desk → closet run | Permanent; never moved |
| Back of patch panel | Run is punched down (numbered by desk) |
| Front of patch panel | RJ45 socket per desk |
| Patch lead | Short and replaceable: move it to change switch or VLAN |

The lesson's "punch-down block" and patch panel are one device here: punch-down on the back, RJ45 on the front.

## Firewall extras

| Role | Meaning |
|---|---|
| VPN concentrator | Terminates site-to-site and remote access VPNs |
| Proxy | Makes requests for the client, checks responses, then passes them back |
| Router | Routes between subnets, so inter-subnet traffic passes the rules |

## Power over Ethernet

| Name | Standard | At the switch (PSE) | At the device (PD) | Max current |
|---|---|---|---|---|
| PoE | 802.3af | 15.4 W | 12.95 W | 350 mA |
| PoE+ | 802.3at | 30 W | 25.5 W | 600 mA |
| PoE++ Type 3 | 802.3bt | 60 W | 51 W | 600 mA per pair set |
| PoE++ Type 4 | 802.3bt | 90 W | 71.3 W | 960 mA per pair set |

| Term | Meaning |
|---|---|
| Endspan | The switch supplies the power |
| Midspan | An injector adds power partway along the cable |
| Backward compatible | A PoE++ switch can power a PoE phone |
| Not forward compatible | A PoE++ device can't be fully powered by PoE+ |

**Uses:** PoE — phones · PoE+ — PTZ cameras · PoE++ — high-power APs, some laptops. A switch also has a **total** PoE budget shared by all ports.

## Internet connections

| Device | Medium | Remember |
|---|---|---|
| Cable modem | Coax | **DOCSIS**; 1 Gb/s+ common; shared with neighbours |
| DSL modem | Telephone line | Asymmetric; slower the further from the exchange or cabinet |
| ONT | Fibre | Optical network terminal; marks the **demarc** |

| ONT port | Connector | For |
|---|---|---|
| Data | RJ45 | Ethernet to your router |
| Voice | RJ11 | Phones (usually VoIP) |
| Video | F-connector | TV / set-top box |

**Demarc:** provider's side = their problem; your side, including internal wiring = yours.

**DSL speeds, realistically:** ADSL2+ up to ~24 Mb/s down (reach ~5.5 km) · UK FTTC (VDSL2) up to 80/20 Mb/s · 200 Mb/s+ only on the newest VDSL2 over very short lines.

## NICs

Built into the motherboard, or added as an expansion card (often 2–4 ports). Match the speed and medium (copper or fibre). **Every interface has its own MAC address.**

| See MACs | Command |
|---|---|
| PowerShell | `Get-NetAdapter` |
| Command prompt | `getmac /v` |
| Linux | `ip link` |

## 🔐 Security notes

- **Unmanaged switches are blind spots:** no logs, VLANs or port security. A hidden desk switch silently extends the LAN.
- **Rogue access points:** an AP just bridges, so one plugged into a wall socket puts the wired LAN on the air.
- **Managed switch hygiene:** port security or 802.1X, disable unused ports, management on its own VLAN, SNMPv3 (v1/v2c send community strings in clear text).
- **Port mirroring** feeds IDS and packet capture.
- **Firewall as router** makes inter-subnet traffic a filtered, logged chokepoint; NGFWs catch apps hiding on port 443.
- **Lock wiring closets:** whoever reaches the patch panel can move any desk onto any network.
- **PoE devices are IoT:** put cameras, phones and APs on their own VLANs.
- **Your side of the demarc is yours:** change default credentials on ISP-supplied kit.

## Practice drills

<details>
<summary>1. A router forwards by what, and at which layer?</summary>

The **destination IP address**, using its routing table, at **layer 3**.
</details>

<details>
<summary>2. A small office wants guest devices kept off the staff network on the same switch. Managed or unmanaged?</summary>

**Managed.** Separation on one switch needs VLANs, which unmanaged switches don't have.
</details>

<details>
<summary>3. What makes an access point different from a SOHO wireless router?</summary>

An AP only **bridges** wireless to wired, forwarding by MAC address. It does no routing or address translation.
</details>

<details>
<summary>4. A firewall blocks remote access software over HTTPS but allows web browsing. What type is it?</summary>

A **next-generation firewall**. It identifies the application, not just the port.
</details>

<details>
<summary>5. The switch has no PoE, but a ceiling AP needs power. What do you use, and what's it called?</summary>

A **PoE injector**: a **midspan** arrangement. PoE from the switch itself is endspan.
</details>

<details>
<summary>6. How much power does PoE+ provide at the switch and at the device?</summary>

**30 W** at the switch, **25.5 W** at the device.
</details>

<details>
<summary>7. Which device converts the provider's fibre to Ethernet, and what does it mark?</summary>

The **ONT** (optical network terminal). It marks the **demarcation point**.
</details>

<details>
<summary>8. A server has a four-port NIC. How many MAC addresses does it have?</summary>

**Four**: one per interface.
</details>

## Key takeaways

- Routers use IP addresses (layer 3); switches and APs use MAC addresses (layer 2).
- Managed switches add VLANs, QoS, redundancy, port mirroring and SNMP; unmanaged switches add nothing but ports.
- Patch panels keep permanent runs fixed; move patch leads, not cables.
- PoE 15.4 W · PoE+ 30 W · PoE++ 60/90 W at the switch; endspan = switch, midspan = injector.
- Cable = coax/DOCSIS · DSL = phone line, distance-limited · ONT = fibre, at the demarc.
