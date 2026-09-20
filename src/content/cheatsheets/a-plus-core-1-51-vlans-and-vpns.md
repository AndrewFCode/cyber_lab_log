---
title: "A+ Core 1 2.4: VLANs and VPNs"
description: "Professor Messer A+ 220-1201 objective 2.4 — broadcast domains, LANs, VLANs and inter-VLAN routing, VPN concentrators, client-to-site vs site-to-site VPN."
tags: ["a-plus", "comptia", "messer", "networking", "vlan", "vpn"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "VLANs and VPNs"
moduleOrder: 51
unit: 2
---
> **In one line:** VLANs split one physical switch into multiple logically separate broadcast domains; VPNs encrypt traffic between a remote user (client-to-site) or two whole networks (site-to-site) through a concentrator.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.4 (VLANs and VPNs).* The full version is the VLANs and VPNs class notes; the section overview is the Section 2 sheet.

---

## LANs and broadcast domains

**LAN = one broadcast domain.** A broadcast reaches every device on it. **Separate switches = separate broadcast domains** — good for security, but wastes capacity (a 24-port switch with 2 devices connected).

## VLANs

| Point | Detail |
|---|---|
| What it does | Assigns different **interfaces** on **one physical switch** to different, logically separate broadcast domains |
| Result | One switch replaces several — same isolation, less hardware, less rack space |
| Example | VLAN 1 = gate room, VLAN 2 = dining room, VLAN 3 = infirmary — **none can talk to another directly** |
| Cross-VLAN communication | Needs a **router** — built into the switch, or external |

## VPNs

| Term | Meaning |
|---|---|
| VPN | Encrypts data sent across a network — captured traffic is unreadable |
| **Concentrator** | The device doing the real-time encrypt/decrypt; often built into a **firewall**; hardware or software |
| VPN client | Software on the user's device (built into the OS, or third-party) |

### Client-to-site

| | Detail |
|---|---|
| Client | The remote user (e.g. working from home) |
| Site | A **concentrator** at the edge of the corporate network |
| Encryption | Client ↔ concentrator link is **always encrypted** |
| Always-on option | VPN connects automatically at power-on/login — no manual step |

### Site-to-site

| | Detail |
|---|---|
| Connects | Two **whole networks** (e.g. corporate HQ and a remote site) |
| Implemented via | A **firewall at each site**, acting as the concentrator |
| Encrypted | Traffic **between** the two sites, over the internet |
| Not encrypted | Traffic **inside** either site's own network |

---

## 🔐 Security notes

- **VLANs segment; they don't encrypt.** Data inside a VLAN is not confidential just because it's isolated.
- **Inter-VLAN routing needs firewall rules/ACLs** — otherwise segmentation achieves little.
- **Check port-to-VLAN assignment** — a misconfigured port can expose a device to the wrong broadcast domain.
- **The concentrator is a prime target** — it's the one place encrypted traffic becomes readable.
- **Always-on VPN + a lost/compromised device** = an automatic path into the corporate network — device security and remote wipe matter more as a result.
- **Site-to-site VPN protects the link, not either end** — internal controls at both sites still matter.

---

## Practice drills

<details>
<summary>1. A 24-port switch has 2 devices; a second 24-port switch has 2 more. How do VLANs solve the waste?</summary>

Combine both sets of devices onto one physical switch, with different interfaces assigned to different VLANs — same isolation, one device.
</details>

<details>
<summary>2. Devices on VLAN 2 need to reach devices on VLAN 3. What's required?</summary>

A router — either built into the switch or external — to route between the VLANs.
</details>

<details>
<summary>3. What device performs real-time VPN encryption and decryption, and where is it often built in?</summary>

A concentrator, often built into a firewall.
</details>

<details>
<summary>4. An employee's laptop connects to the VPN automatically the moment they log in at home. What's this called?</summary>

An always-on VPN configuration.
</details>

<details>
<summary>5. Two office buildings need a permanent encrypted link over the internet. Client-to-site or site-to-site?</summary>

Site-to-site, typically firewall to firewall.
</details>

<details>
<summary>6. In a site-to-site VPN, is traffic inside either office encrypted by the VPN?</summary>

No — only traffic travelling between the two sites over the internet is encrypted.
</details>

<details>
<summary>7. Does putting two networks on separate VLANs encrypt the traffic on each?</summary>

No — VLANs are a segmentation tool, not encryption.
</details>

---

## Key takeaways

- **LAN = broadcast domain.** Separate switches isolate traffic but waste capacity.
- **VLANs** put multiple logical broadcast domains on one physical switch; devices on different VLANs can't talk without a router.
- **VPNs encrypt data in transit**, handled by a **concentrator** (often a firewall).
- **Client-to-site:** one remote user ↔ a central concentrator, often always-on.
- **Site-to-site:** two whole networks, firewall to firewall — only the inter-site link is encrypted.
