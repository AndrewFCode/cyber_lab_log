---
title: "TryHackMe 5.5: Extending Your Network"
description: "Pre Security module 5, Extending Your Network — port forwarding, stateful vs stateless firewalls, VPNs and VPN protocols, routers, layer 2 vs layer 3 switches, and VLANs."
tags: ["tryhackme", "networking", "firewalls", "vpn", "vlans"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "tryhackme"
module: "Extending Your Network"
moduleOrder: 43
unit: 5
---
> **In one line:** port forwarding on the router exposes an internal service to the internet, firewalls decide what may travel (stateful tracks connections, stateless judges packets), VPNs tunnel private traffic across public networks, and VLANs split one switch into separate networks.

*Companion to: TryHackMe Pre Security (2026 path), module 5, Extending Your Network.* The full version is the Extending Your Network class notes; the previous room is Packets & Frames.

---

## Port forwarding

| Point | Detail |
|---|---|
| Problem it solves | A private address (`192.168.1.10`) isn't routable from the internet |
| Configured on | The **router** |
| What it does | Public IP + port → internal host + port (a NAT rule) |
| Not the same as | A **firewall**: forwarding opens a path, the firewall decides what may travel it |
| Needs | A fixed internal address (static or DHCP reservation), and the host's own firewall to allow it |

```
  Visitor --- 203.0.113.70:80 ---> [ router: forward 80 -> 192.168.1.10:80 ]
                                             |
                                        192.168.1.10  (web server)
```

Test from outside the network — from inside, the traffic never leaves.

## Firewalls

Decide on: **source · destination · port · protocol**, by inspecting packets.

| | Stateful | Stateless |
|---|---|---|
| Judges | The whole connection | One packet at a time |
| Remembers | Every live connection | Nothing |
| Return traffic | Allowed automatically | Needs its own rule |
| Resources | Higher | Very low |
| Best at | Accurate everyday filtering | Huge volumes, e.g. absorbing DDoS |

Forms: dedicated hardware · home router · host software (Windows Defender Firewall, `nftables`, `pf`).

**Fix to the room:** Snort is an **IDS/IPS**, not a firewall. And "stateful" means tracking connection state — blocking a whole host after bad behaviour is an IPS/blocklist feature, not what stateful means.

## VPNs

| Benefit | Detail |
|---|---|
| Joins locations | Offices in different places share resources as one private network |
| Privacy | Encrypted tunnel: unreadable in transit, which matters on public Wi-Fi |
| Anonymity | Traffic exits at the provider — worth only as much as their logging policy |

```
  Office 1 ==== encrypted VPN tunnel over the internet ==== Office 2
```

| Technology | Verdict |
|---|---|
| PPP | Framing and authentication on one link; not routable alone. It does **not** encrypt (MPPE does, inside PPTP) |
| PPTP | Tunnels PPP; easy and widely supported, but **broken — don't use** |
| IPsec | Encrypts and authenticates within IP; fiddly to set up, strong and well supported |
| (Modern) | IPsec with IKEv2, OpenVPN, WireGuard |

## Routers and switches

| Device | Layer | Forwards using | Notes |
|---|---|---|---|
| Router | 3 | IP addresses | Connects networks, picks paths, hosts port forwarding and firewall rules |
| Layer 2 switch | 2 | MAC addresses | Frames to the right port; cannot route |
| Layer 3 switch | 2 and 3 | MAC and IP | Also routes between networks/VLANs at switching speed |

Path choice: shortest · most reliable · faster medium (fibre over copper).

**Fix to the room:** switches don't run "3 to 63" devices — typical counts are 5, 8, 16, 24 or 48 ports, with hundreds on core chassis switches.

## VLANs

```
   Internet --- [ Layer 3 switch: VLAN 10 = 192.168.1.1, VLAN 20 = 192.168.2.1 ]
                          |                         |
                    VLAN 10 Sales            VLAN 20 Accounting
```

One switch, separate virtual networks: both reach the internet, and whether they reach **each other** depends on the rules. A layer 3 switch will route between VLANs unless something denies it — the room's "not able to communicate" needs that rule to be true.

## 🔐 Security notes

- **A port forward is a permanent doorway:** scanners find it in hours. Forward only what must be public; reach internal services over a VPN. Forwarded RDP 3389 and SMB 445 are prime ransomware routes.
- **Default deny inbound,** then permit the few things that must work — don't block case by case.
- **Stateless "reply" rules can be forged:** a crafted packet with source port 443 matches them; a stateful firewall drops it as belonging to no connection.
- **A VPN is encryption, not anonymity:** it protects traffic from the network it crosses and shifts trust to the provider. Logging in still identifies you.
- **PPTP is broken:** a tunnel people trust but that doesn't protect them is worse than none.
- **VLANs need rules to be a boundary:** test from one VLAN to another rather than assuming.

## Practice drills

<details>
<summary>1. Why can't the internet reach <code>192.168.1.10</code> without port forwarding?</summary>

It's a **private address**, not routable on the internet. Only devices on the same network can reach it.
</details>

<details>
<summary>2. Where is port forwarding set, and how does it differ from a firewall?</summary>

On the **router**. Forwarding **opens a path** to an internal host and port; the **firewall decides** whether traffic may travel it.
</details>

<details>
<summary>3. Four things a firewall can decide on?</summary>

**Source, destination, port and protocol.**
</details>

<details>
<summary>4. What does "stateful" mean, and what does it buy you?</summary>

It **tracks connections**, so return traffic is allowed automatically and packets belonging to no connection are dropped.
</details>

<details>
<summary>5. Why might you still want a stateless firewall?</summary>

It uses **very few resources per packet**, so it copes with huge volumes — useful at the edge during a DDoS.
</details>

<details>
<summary>6. Which VPN protocol here should never be used, and why?</summary>

**PPTP** — its encryption and authentication are broken. Use IPsec, OpenVPN or WireGuard.
</details>

<details>
<summary>7. What can a layer 3 switch do that a layer 2 switch can't?</summary>

**Route packets by IP address** between networks or VLANs, as well as forwarding frames by MAC.
</details>

<details>
<summary>8. Staff need the internal file server from home. Port forward or VPN?</summary>

**VPN.** Port forwarding would expose the file server to the entire internet.
</details>

## Key takeaways

- Port forwarding (on the router) exposes one internal host and port through the public IP.
- Firewalls decide by source, destination, port and protocol; stateful tracks connections, stateless doesn't.
- VPN = encrypted tunnel joining networks; privacy yes, anonymity only as far as the provider.
- PPTP is obsolete; IPsec, OpenVPN and WireGuard are the real options.
- Routers work at layer 3; layer 2 switches forward frames, layer 3 switches also route.
- VLANs separate devices on one switch — with rules between them, or they just route.
