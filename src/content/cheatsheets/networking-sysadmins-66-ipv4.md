---
title: "Networking for Sysadmins 3: IPv4"
description: "Networking for Sysadmins ch. 3 — IPv4 addressing, subnets/netmasks, viewing config on Windows/Debian/FreeBSD, private addressing/NAT, and troubleshooting."
tags: ["networking", "networking-for-sysadmins", "ipv4", "subnetting", "netmask", "nat", "troubleshooting"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "networking-sysadmins"
module: "Ch. 3"
moduleOrder: 66
unit: 3
---

> **Drafted from general knowledge:** the source was the chapter's heading list with an instruction to draft from general knowledge, not a transcript — verify against your own copy of Lucas's book for his specific wording/examples.


> **In one line:** an IPv4 address plus a netmask/CIDR defines a subnet, whose network and broadcast addresses are always unusable; a default gateway routes off-subnet, private ranges + NAT share one public address, and troubleshooting works outward in layers.

*Companion to: Networking for System Administrators (2nd ed.), Michael W. Lucas, Chapter 3.* The full version is the IPv4 class notes; the chapter overview is the Networking for Sysadmins sheet.

## Addressing basics

| Address / range | Purpose |
| --- | --- |
| `0.0.0.0` | "This network" / unspecified |
| `255.255.255.255` | Limited broadcast |
| `127.0.0.0/8` (usually `127.0.0.1`) | Loopback (localhost) |
| `169.254.0.0/16` | APIPA/link-local (DHCP failed) |
| `10/8`, `172.16/12`, `192.168/16` | Private (RFC 1918) |

## Netmask / CIDR table

| CIDR | Netmask | Usable hosts |
| --- | --- | --- |
| /8 | 255.0.0.0 | 16,777,214 |
| /16 | 255.255.0.0 | 65,534 |
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /30 | 255.255.255.252 | 2 |

- **Network address** (all host bits 0) and **broadcast address** (all host bits 1) are always unusable — that's why /24 gives 254, not 256.

## Gateway / LAN

- **Default gateway** = the router a host sends off-subnet traffic to.
- **LAN** = the local segment reachable without routing; "the network" can mean further than that, via the gateway.

## Viewing IP config

| Platform | Command |
| --- | --- |
| Windows | `ipconfig` (`ipconfig /all` for detail) |
| Debian/modern Linux | `ip addr show` / `ip a` (legacy: `ifconfig`) |
| FreeBSD | `ifconfig` (still the standard tool there) |

## Multiple interfaces / aliasing

- **Multihomed** = a host with more than one interface (often each on a different subnet).
- **IP aliasing** = multiple IPs on one interface: `ip addr add 192.168.1.50/24 dev eth0` (Linux).

## Private addressing + NAT

| Range | CIDR |
| --- | --- |
| 10.0.0.0–10.255.255.255 | /8 |
| 172.16.0.0–172.31.255.255 | /12 |
| 192.168.0.0–192.168.255.255 | /16 |

- **NAT** rewrites a private source address to a public one (and back) so many private hosts share one public address.

## Troubleshooting IP (layered)

```
local config -> local subnet -> default gateway -> beyond the gateway
(check DNS separately from IP reachability)
```

## 🔐 Security notes

- **Subnet boundaries enable real segmentation** — a firewall/router between subnets can filter; a flat subnet can't be filtered internally.
- **NAT is not a firewall** — a forwarded port or an outbound-initiated connection is just as reachable as a direct public address for that traffic.
- **Loopback-only binding (127.0.0.1) is a strong, simple control** — genuinely unreachable from the network.
- **Aliased/multihomed hosts have more surface to review** — don't audit only "the" IP.
- **APIPA (169.254.x.x) is a diagnostic + possible security signal** — DHCP outage, rogue scope, or exhaustion/starvation.

## Practice drills

<details>
<summary>1. What are the two unusable addresses in any subnet?</summary>

The network address (all host bits 0) and the broadcast address (all host bits 1).
</details>

<details>
<summary>2. Netmask for /24, and how many usable hosts?</summary>

255.255.255.0; 254 usable host addresses.
</details>

<details>
<summary>3. What is a default gateway?</summary>

The router a host sends traffic to when the destination is outside its own subnet.
</details>

<details>
<summary>4. Commands to view IP config on Windows, Debian/Linux, and FreeBSD?</summary>

ipconfig (Windows); ip addr show (Debian/modern Linux); ifconfig (FreeBSD).
</details>

<details>
<summary>5. What is IP aliasing?</summary>

Assigning multiple IP addresses to a single network interface.
</details>

<details>
<summary>6. Name the three RFC 1918 private ranges.</summary>

10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.
</details>

<details>
<summary>7. What does NAT do?</summary>

Translates a private address to a public one (and back), letting many private hosts share one public address.
</details>

## Key takeaways

- **Netmask/CIDR** defines network vs host bits; **network + broadcast address** are always unusable.
- **Default gateway** routes off-subnet traffic; LAN = local reach only.
- **View config:** ipconfig (Windows) / ip addr show (Linux) / ifconfig (FreeBSD).
- **Private ranges + NAT** let many hosts share one public IP — NAT is address translation, not security.
- **Troubleshoot in layers:** local config → subnet → gateway → beyond, DNS checked separately.
