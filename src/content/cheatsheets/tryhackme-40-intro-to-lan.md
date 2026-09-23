---
title: "TryHackMe 5.2: Intro to LAN"
description: "Pre Security module 5, Intro to LAN — star, bus and ring topologies, switches vs hubs, routers, subnetting and address roles, ARP request/reply, and DHCP DORA."
tags: ["tryhackme", "networking", "topologies", "subnetting", "arp", "dhcp"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "tryhackme"
module: "Intro to LAN"
moduleOrder: 40
unit: 5
---
> **In one line:** a LAN's shape is its topology (star, bus or ring), switches forward by port and routers join networks, subnetting splits a network into smaller ones, ARP turns an IP address into a MAC address, and DHCP hands out addresses with DORA.

*Companion to: TryHackMe Pre Security (2026 path), module 5, Intro to LAN.* The full version is the Intro to LAN class notes; the previous room is What is Networking?

---

## Topologies

| | Star | Bus | Ring |
|---|---|---|---|
| Layout | Each device to a central switch | All devices on one backbone cable | Devices in a loop |
| Cost | Highest (cabling + switch) | Lowest | Low |
| Scales | Yes, add a cable and a port | Poorly | Poorly |
| Bottlenecks | Rare | Common: one shared cable | Uncommon |
| Fails when | The central switch dies | The backbone breaks | Any link or device breaks |
| Troubleshooting | Harder as it grows | Hard | Easier (one direction) |
| Used today | Almost everywhere | Rarely | Rarely |

```
  STAR                       BUS                        RING
      PC   PC                PC    PC    PC              PC -- PC
        \  /                  |     |     |             /        \
   PC -- SW -- PC       ===+==+==+==+==+==+===        PC          PC
        /  \                                            \        /
      PC   PC            (terminator each end)            PC -- PC
```

**Token passing** (the room's "token topology"): a token circulates and only the device holding it may transmit — a *method* used on some rings (Token Ring, FDDI), not the topology itself.

## Switches and routers

| Device | Job | Detail |
|---|---|---|
| Hub / repeater | Repeats every frame out of every port | All traffic reaches everyone |
| Switch | Sends each frame only to the destination's port | Learns which device is on which port; 4–64 ports |
| Router | Connects networks and passes data between them | Routing = working out the path |

**Redundancy:** extra links between switches and routers mean a failure doesn't stop the network. On layer 2, Spanning Tree blocks the spare link until it's needed — it isn't carrying traffic (or slowing things) in normal use.

## Subnetting

Splitting a network into smaller networks. Benefits: **efficiency**, **security**, **full control**. The café case: staff and tills on one subnet, public Wi-Fi on another, both reaching the internet, neither reaching the other.

| Role | What it is | Example (`192.168.1.0/24`) |
|---|---|---|
| Network address | Names the network; never given to a device | `192.168.1.0` |
| Host addresses | The devices | `192.168.1.1`–`192.168.1.254` (254 usable) |
| Default gateway | Sends traffic to other networks; a host address, usually first or last | `192.168.1.1` or `192.168.1.254` |
| Broadcast address | Reaches every device on the subnet | `192.168.1.255` |

Subnet mask = four octets (32 bits), e.g. `255.255.255.0`: it marks which part of the address is the network.

**Splitting `192.168.1.0/24` in two** with mask `255.255.255.128`:

| Half | Network | Hosts | Broadcast |
|---|---|---|---|
| First | `192.168.1.0` | `.1`–`.126` | `192.168.1.127` |
| Second | `192.168.1.128` | `.129`–`.254` | `192.168.1.255` |

## ARP

| Item | Detail |
|---|---|
| Job | Find the MAC address that owns a known **local** IPv4 address |
| ARP request | Broadcast: "who has 192.168.1.100?" |
| ARP reply | Unicast, from the owner only: "that's me, here's my MAC" |
| ARP cache | Stored IP-to-MAC pairings, so it needn't ask again |
| Off-subnet traffic | ARP resolves the **gateway's** MAC, not the remote host's |
| IPv6 | Uses Neighbor Discovery instead |

```bash
ip neigh show            # Linux: 192.0.2.1 dev eth0 lladdr 02:fc:00:00:00:05 REACHABLE
arp -a                   # Windows and Linux
```

## DHCP: DORA

| Step | Message | Meaning |
|---|---|---|
| 1 | **D**iscover | Client (no address yet) asks if a server is there |
| 2 | **O**ffer | Server proposes an address |
| 3 | **R**equest | Client asks for that address |
| 4 | **A**cknowledge | Server confirms; the address comes with a lease |

The server also supplies the subnet mask, gateway and DNS servers. Addresses can still be set manually instead.

## 🔐 Security notes

- **Flat networks help attackers:** one compromised device reaches everything. Subnets and VLANs only contain it if a router or firewall filters between them.
- **Guest and IoT on their own subnet:** public Wi-Fi, cameras and printers should reach the internet, not the tills.
- **ARP has no authentication:** any device can claim any address (ARP spoofing). A gateway MAC that changes is a red flag; Dynamic ARP Inspection blocks forged replies.
- **Switches aren't a privacy control:** they limit who sees what as a side effect; ARP spoofing or port mirroring restores the full view.
- **DHCP trusts the first offer:** a rogue server can set itself as your gateway or DNS. Use DHCP snooping.
- **Topology = availability:** bus, ring and single-switch stars all have one thing that stops everything.

## Practice drills

<details>
<summary>1. Which topology is used almost everywhere, and what's its weak point?</summary>

**Star.** The **central switch**: if it fails, every attached device loses the network. Use two connected switches.
</details>

<details>
<summary>2. Why does a bus topology bottleneck?</summary>

Every device shares **one backbone cable**, so simultaneous traffic queues on it. A break also stops everything.
</details>

<details>
<summary>3. What is token passing?</summary>

A token circulates the ring and **only the holder may transmit**; other devices just pass frames on. It's a method (Token Ring, FDDI), not a topology.
</details>

<details>
<summary>4. How does a switch differ from a hub?</summary>

A hub repeats frames to **every** port; a switch learns which device is on which port and sends each frame **only there**.
</details>

<details>
<summary>5. For <code>192.168.1.100</code> with mask <code>255.255.255.0</code>: network, host range, broadcast?</summary>

Network **192.168.1.0**, hosts **192.168.1.1–192.168.1.254**, broadcast **192.168.1.255**.
</details>

<details>
<summary>6. Which ARP message is broadcast, and which is not?</summary>

The **request** is broadcast to the whole local network; the **reply** comes back only from the device that owns the address.
</details>

<details>
<summary>7. You want to reach a server on another network. Whose MAC does ARP find?</summary>

The **default gateway's**. ARP only resolves addresses on the local network.
</details>

<details>
<summary>8. Name the four DHCP messages in order.</summary>

**Discover, Offer, Request, Acknowledge** (DORA).
</details>

## Key takeaways

- Star is the modern default; bus and ring both fail whole-network on one break.
- Switches forward by learned port; hubs repeat to everyone.
- Subnetting splits a network for efficiency, security and control — and needs filtering between subnets to be a boundary.
- In a subnet: `.0` network, hosts, gateway (`.1`/`.254`), `.255` broadcast.
- ARP: broadcast request, unicast reply, cached; gateway's MAC for anything off-subnet.
- DHCP: Discover, Offer, Request, Acknowledge, plus a lease.
