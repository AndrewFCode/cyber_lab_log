---
title: "TryHackMe 5.2: Intro to LAN — Class Notes"
description: "Full class notes for TryHackMe Pre Security (2026 path) module 5, Intro to LAN: star, bus and ring topologies, switches and routers, subnetting, ARP and DHCP."
pubDate: 2026-09-22
tags: ["class-notes", "tryhackme", "networking", "topologies", "subnetting", "arp", "dhcp"]
draft: false
---

**Class notes · TryHackMe Pre Security (2026 path) · Module 5, room 2: Intro to LAN**

> **Quick reference:** the short version of this room is the [Intro to LAN cheat sheet](/cyber_lab_log/resources/tryhackme/5/), the second sheet in Module 5. It follows [What is Networking?](/cyber_lab_log/resources/tryhackme/5/), and overlaps with the A+ lessons on [network devices and addressing](/cyber_lab_log/resources/a-plus-core-1/2/) and with [Networking for Sysadmins chapter 2](/cyber_lab_log/resources/networking-sysadmins/2/), which goes deeper on ARP.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what a network topology is, and compare star, bus and ring topologies.
2. Describe what a switch does and how it differs from a hub.
3. Explain what a router does and why multiple paths matter.
4. Explain subnetting, and identify the network address, host addresses and default gateway in a subnet.
5. Describe how ARP maps an IP address to a MAC address.
6. Walk through the four DHCP messages a device uses to get an address.

## 1. LAN topologies

A **topology** is the shape of a network: how the devices are connected to each other. Three classic designs are worth knowing, because each trades cost against reliability in a different way.

```text
  STAR: every device has its own link to a central switch
                                                         
          PC      PC                                     
            \    /                                       
      PC --- SWITCH --- PC                               
            /    \                                       
          PC      PC                                     
                                                         
  BUS: every device taps the same backbone cable         
                                                         
          PC      PC      PC      PC                     
           |       |       |       |                     
   term ===+=======+=======+=======+=== term             
                                                         
  RING: devices form a loop and pass data round it       
                                                         
           PC ----- PC                                   
          /           \                                  
        PC             PC                                
          \           /                                  
           PC ----- PC                                   
```

### 1.1 Star topology

In a **star topology**, every device has its own cable to a central device, usually a switch (or, historically, a hub). All traffic passes through that central device on its way to anywhere else.

This is by far the most common design today, because it is reliable and easy to grow. Adding a device means running one more cable to a free port. If one cable or device fails, only that device is affected.

The costs are real, though. A star needs more cabling than the other designs and a dedicated switch to plug it into, and the larger the network grows, the more maintenance and troubleshooting it demands. It also has one weak point: if the central switch fails, every device attached to it loses the network. In practice, that hardware is built to be reliable, and important networks use more than one switch.

### 1.2 Bus topology

A **bus topology** hangs every device off a single shared cable, the **backbone**. Think of leaves growing along one branch.

It is cheap and simple: one cable, no central equipment. But every device's traffic shares that one cable, so the network slows down badly when several devices are busy at once. Faults are hard to track down, because all the traffic follows the same path and any device could be the culprit. Worst of all, the backbone is a single point of failure. One break and nothing can communicate.

> **Note (beyond this lesson):** a bus needs a **terminator** at each end of the backbone to absorb the signal, otherwise it reflects back down the cable and corrupts traffic. Bus networks were common in early Ethernet using coaxial cable, and are rare today.

### 1.3 Ring topology

A **ring topology** connects each device to the next, in a loop, with no central equipment and little cabling. Data travels around the loop in one direction, with each device passing it on until it reaches the right one.

Because there is only one direction of travel, faults are relatively easy to trace. The trade-off is efficiency: data may pass through many devices before arriving. Rings are less prone to the bottlenecks of a bus, because much less traffic is in flight at once, but a single cut cable or failed device breaks the whole ring.

> **Correction:** the room calls a ring "also known as token topology", and says a device only forwards another device's data when it has none of its own to send. Those describe **token passing**, a method used on some ring networks (notably IEEE 802.5 Token Ring and FDDI), not the topology itself. With token passing, a small message called a **token** circulates, and a device may only transmit while it holds the token. The rest of the time it simply repeats frames onward. A ring is the shape; token passing is one way of controlling who talks.

### 1.4 The three compared

| | Star | Bus | Ring |
|---|---|---|---|
| Central equipment | Switch or hub | None | None |
| Cabling needed | Most | Least | Little |
| Cost | Highest | Lowest | Low |
| Scales well | Yes | No | Poorly |
| Bottlenecks | Rare | Common | Uncommon |
| Single point of failure | The central device | The backbone cable | Any cable or device |
| Troubleshooting | Harder as it grows | Hard | Easier |
| Used today | Almost everywhere | Rarely | Rarely |

### 1.5 Worked example — choosing a topology

A small architecture firm is fitting out a new office for 30 staff, with printers and IP phones.

1. **Bus?** One cable is cheap, but 30 devices sharing it would crawl, and a single break would stop everyone. Rule it out.
2. **Ring?** Little cabling, but any break kills the network, and adding a desk means breaking the loop to insert it. Rule it out.
3. **Star.** Run a cable from each desk to a switch in a comms cupboard. Adding a desk is one more cable into a free port, and one faulty cable affects one person.
4. **Reduce the weak point.** Because the switch is now the single point of failure, use two switches connected together, so one failure doesn't take out the whole office.

The answer is almost always a star, which is why a switch in a cupboard is what you find in practically every office.

## 2. Switches

A **switch** is a dedicated device that joins many other devices, such as computers, printers and anything else with an Ethernet port. Each device plugs into one of the switch's **ports**, and switches come with port counts of 4, 8, 16, 24, 32 or 64, so a business, school or similar-sized network can connect everything in one place.

Switches are far more efficient than **hubs** (or repeaters), the devices they replaced. A hub repeats every incoming frame out of every other port, so all the traffic reaches all the devices. A switch keeps track of which device is on which port, so it sends each frame only to the port where the destination lives. That cuts network traffic dramatically.

> **Note (beyond this lesson):** the switch learns this by reading the **source MAC address** of every frame it receives and noting the port it arrived on, storing the pairs in a MAC address table. Traffic to an address it hasn't learned yet, and broadcast traffic, still goes to every port.

### 2.1 Connecting switches and routers together

Switches and routers can be connected to each other, and connecting them in more than one way adds **redundancy**: if one path fails, another is available, and the network keeps running.

> **Correction:** the room says redundancy costs performance, because packets take longer routes. That isn't quite how it works. On a layer 2 network, loops would flood the network with endlessly circling frames, so the **Spanning Tree Protocol** blocks the redundant links until a failure happens, meaning the backup path carries nothing until it is needed. Between routers, routing protocols normally pick the best available path, and only use a longer one when the best is gone. The longer path may be slower, but that is the failure case, not the everyday one.

## 3. Routers

A **router** connects networks and passes data between them, a process called **routing**. Routing works out a path across one or more networks so that data reaches its destination.

Routing matters most when there are several possible paths between two points. A router chooses which one to use, and can choose again when a path becomes unavailable.

## 4. Subnetting

### 4.1 Splitting a network up

**Subnetting** means dividing a network into smaller networks inside it. The room's analogy is cutting a cake: there is only so much of it, and you decide who gets which slice.

The usual reason is organisational. A business has departments, such as accounting, finance and human resources, and network administrators use subnets to give each its own part of the network, just as an office gives each its own floor or corridor.

### 4.2 The subnet mask

An IPv4 address has four **octets**. A **subnet mask** is written the same way, four numbers of 0 to 255 making 32 bits in total, and it marks which part of an address identifies the network and which part identifies the host. A typical mask is `255.255.255.0`.

At home, one subnet is plenty: a `255.255.255.0` mask leaves room for 254 devices, and few homes have that many. Offices, with their PCs, printers, cameras and sensors, are where subnetting earns its keep.

### 4.3 Three jobs addresses do in a subnet

| Type | What it identifies | Example |
|---|---|---|
| Network address | The start of the network; it names the network itself, rather than any device | `192.168.1.0` |
| Host address | One device on that network | `192.168.1.100` |
| Default gateway | The device that forwards traffic to other networks | `192.168.1.254` |

Any traffic for an address outside the local network (anything not on `192.168.1.0`, in this example) is sent to the default gateway. A gateway can use any host address, but by convention it takes the first or the last one, `.1` or `.254`.

> **Correction:** the room's table explains the host address with "a device will have the network address of 192.168.1.1", which mixes up the two rows. A host address identifies a device, such as `192.168.1.100`; the network address, `192.168.1.0`, identifies the network and is never given to a device.

> **Note (beyond this lesson):** there is a fourth special address. The last address in the range, `192.168.1.255` here, is the **broadcast address**, used to reach every device on the subnet at once. That is why a `255.255.255.0` network has 256 addresses but only 254 usable ones: the first and last are reserved.

### 4.4 Worked example — reading a subnet

A device has the address `192.168.1.100` and the mask `255.255.255.0`.

1. **Network address:** the mask says the first three octets are the network, so the network is `192.168.1.0`.
2. **Host range:** `192.168.1.1` to `192.168.1.254`, which is 254 usable addresses.
3. **Broadcast address:** `192.168.1.255`.
4. **Default gateway:** one of the host addresses, conventionally `192.168.1.1` or `192.168.1.254`.
5. **Local or not:** another device at `192.168.1.50` is on the same network, so traffic goes straight to it. A server at `192.168.2.50` is not, so traffic goes to the gateway.

### 4.5 Worked example — splitting one network in two

> **Note (beyond this lesson):** the room leaves the arithmetic of subnetting for later. This example shows where the numbers come from, for when you meet it.

The café in the room's example wants staff devices and public Wi-Fi kept apart, and has only `192.168.1.0/24` to work with. Changing the mask from `255.255.255.0` to `255.255.255.128` borrows one bit from the host part and makes two networks:

| Subnet | Network address | Host range | Broadcast | Usable |
|---|---|---|---|---|
| Staff | `192.168.1.0` | `192.168.1.1` to `192.168.1.126` | `192.168.1.127` | 126 |
| Public | `192.168.1.128` | `192.168.1.129` to `192.168.1.254` | `192.168.1.255` | 126 |

Each half needs its own default gateway, and traffic between the two halves has to pass through a router, which is exactly where the café can block the public side from reaching the till systems.

### 4.6 Why subnet at all?

The room lists three benefits: **efficiency**, **security** and **full control**. The security one is the easiest to see. A café typically runs two networks: one for staff, tills and back-office equipment, and one as a public hotspot for customers. Subnetting keeps the two apart while both still reach the internet, so a customer's laptop cannot wander into the till system.

Efficiency comes from keeping local traffic, especially broadcasts, inside a smaller group of devices. Control comes from being able to apply different rules, and different filtering, to each subnet.

## 5. ARP

### 5.1 What ARP does

A device has two identifiers: an IP address and a MAC address. The **Address Resolution Protocol (ARP)** is what links them. When a device knows the IP address it wants to reach on its local network, ARP finds the MAC address that goes with it, so the data can actually be addressed and sent.

> **Correction:** the room describes ARP as "allowing devices to identify themselves on a network" and as associating a device's own MAC address with its IP address. ARP is really a lookup of *other* devices: a host asks which MAC address owns a given IPv4 address, and uses the answer to address its traffic.

### 5.2 Request, reply and the cache

Every device keeps a store of what it has learned, called the **ARP cache**, which holds the IP-to-MAC pairings of other devices on the network. ARP uses two messages to fill it:

- An **ARP request** is broadcast to the whole local network: "what is the MAC address that owns this IP address?"
- An **ARP reply** comes back from the one device that owns that address, giving its MAC address. Every other device ignores the request.

The requester stores the pairing in its cache, so it doesn't have to ask again for a while.

```text
  PC-A 192.168.1.50                      PC-B 192.168.1.100
  wants to reach 192.168.1.100                             
        |                                        |         
        |  ARP request, broadcast to every host  |         
        |  "who has 192.168.1.100?"              |         
        |--------------------------------------->|         
        |                                        |         
        |  ARP reply, sent only to PC-A          |         
        |  "that's me, and here is my MAC"       |         
        |<---------------------------------------|         
        |                                        |         
  PC-A's ARP cache now holds:                              
  192.168.1.100 -> a4:c3:f0:85:ac:2d                       
```

> **Note (beyond this lesson):** ARP only ever resolves addresses on the local network. For anything further away, the device looks up the MAC address of its **default gateway** instead, and lets the router take it from there. ARP is also IPv4-only: IPv6 does the same job with Neighbor Discovery.

### 5.3 Worked example — looking in the cache

Any machine will show you what ARP has learned. On Linux:

```bash
ip neigh show                # or: arp -a
```

```text
192.0.2.1 dev eth0 lladdr 02:fc:00:00:00:05 REACHABLE
```

On Windows, `arp -a` or `Get-NetNeighbor` shows the same pairings.

1. **What it says:** the device at `192.0.2.1` has the MAC address `02:fc:00:00:00:05`, and the entry is current (`REACHABLE`).
2. **Who is in there:** on a quiet machine, usually just the default gateway and any devices it has recently spoken to on the local network.
3. **Why it matters:** if the MAC address for your gateway suddenly changes, something on the network is claiming to be the gateway. That is the signature of an ARP spoofing attack.

## 6. DHCP

An IP address can be typed into a device by hand, but most addresses are handed out automatically by a **DHCP server** (Dynamic Host Configuration Protocol). When a device joins a network without a manually configured address, it and the server exchange four messages, remembered as **DORA**:

| Step | Message | What it means |
|---|---|---|
| 1 | DHCP **Discover** | The device asks whether any DHCP server is out there |
| 2 | DHCP **Offer** | A server replies with an address the device could use |
| 3 | DHCP **Request** | The device says it wants that address |
| 4 | DHCP **Acknowledge** (ACK) | The server confirms, and the device starts using the address |

```text
  Client, no IP address yet                      DHCP server
        |                                             |     
        |  1. DISCOVER: is there a DHCP server?       |     
        |-------------------------------------------->|     
        |  2. OFFER: you could use 192.168.1.50       |     
        |<--------------------------------------------|     
        |  3. REQUEST: yes please, I'll take it       |     
        |-------------------------------------------->|     
        |  4. ACKNOWLEDGE: it's yours, with a lease   |     
        |<--------------------------------------------|     
        |                                             |     
  The client can now use 192.168.1.50.                      
```

> **Note (beyond this lesson):** the address comes with a **lease**, a period after which the device must ask to keep it. The first messages are broadcast, because the device has no address yet, and the server also supplies the subnet mask, default gateway and DNS servers at the same time.

## 7. Security perspective

- **Flat networks help attackers.** On one large subnet, anything that compromises one device can reach everything else directly. Subnets and VLANs limit how far an intruder can move, but only if a router or firewall actually filters what passes between them. A subnet boundary with an open route is a speed bump, not a wall.
- **Guest networks belong on their own subnet.** The café example is the everyday case: public Wi-Fi should reach the internet and nothing else. The same goes for cameras, printers and other devices you cannot patch easily.
- **ARP has no authentication.** Any device can answer a request, or send unsolicited replies, and claim any address. That is **ARP spoofing**, and it puts an attacker in the middle of other devices' traffic. Watch for a gateway MAC address that changes; on managed switches, Dynamic ARP Inspection blocks forged replies.
- **Switches limit what you can sniff, but not by design.** A hub or a bus showed every device's traffic to everyone. A switch sends frames only where they belong, which is a side effect of efficiency, not a security control: ARP spoofing or a mirrored port restores the full view.
- **DHCP trusts the first answer.** A rogue DHCP server can hand out its own address as the gateway or DNS server, redirecting a victim's traffic. DHCP snooping on managed switches only accepts offers from trusted ports.
- **Topology choices are availability decisions.** Bus and ring designs fail completely when one link breaks, and a single switch does the same for a star. Redundant switches and links are what turn a single point of failure into an inconvenience.

## Summary

- A topology is the shape of a network: star (central switch), bus (one backbone cable) or ring (a loop).
- Star is standard today: easy to grow, one failure affects one device, but the central switch is a weak point.
- Bus is cheap but slow and fragile; ring is tidy but breaks entirely if one link fails.
- Switches learn which device is on which port and forward frames only there; hubs repeat everything everywhere.
- Multiple links between switches and routers add redundancy; Spanning Tree keeps layer 2 backups idle until needed.
- Routers connect networks and choose paths between them.
- Subnetting splits a network into smaller ones, for efficiency, security and control.
- In a subnet: the network address names the network (`192.168.1.0`), host addresses name devices (`192.168.1.100`), the default gateway leads off the network (`.1` or `.254`), and the last address is the broadcast.
- ARP maps an IP address to a MAC address using a broadcast request and a unicast reply, and caches the result.
- DHCP hands out addresses with four messages: Discover, Offer, Request, Acknowledge.

## Glossary

| Term | Meaning |
|---|---|
| ARP | Address Resolution Protocol: finds the MAC address that owns a local IPv4 address |
| ARP cache | A device's stored list of IP-to-MAC pairings |
| Backbone | The single shared cable in a bus topology |
| Broadcast address | The last address in a subnet, which reaches every device on it |
| Bus topology | A design where all devices share one backbone cable |
| Default gateway | The device traffic is sent to when the destination is on another network |
| DHCP | Dynamic Host Configuration Protocol: hands out IP settings automatically |
| DORA | The four DHCP messages: Discover, Offer, Request, Acknowledge |
| Host address | An address identifying one device on a subnet |
| Hub | An older device that repeats every frame out of every port |
| Lease | The period for which a DHCP address is valid |
| Network address | The address identifying a subnet itself, never given to a device |
| Redundancy | Extra paths or equipment so a failure doesn't stop the network |
| Ring topology | A design where devices form a loop and pass data around it |
| Router | A device that connects networks and passes data between them |
| Routing | Working out the path data takes across networks |
| Star topology | A design where every device connects to a central switch |
| Subnet mask | The 32-bit value marking which part of an address is the network |
| Subnetting | Splitting a network into smaller networks |
| Token passing | A method where only the device holding a token may transmit |

## Review questions

1. What does "topology" mean in networking?
2. Which topology is most common today, and why?
3. What is the single point of failure in a star topology, and how can it be reduced?
4. Why does a bus topology slow down when several devices are busy?
5. What happens to a ring topology if one cable is cut?
6. What is token passing, and how does it relate to a ring topology?
7. How does a switch differ from a hub when forwarding traffic?
8. Give one reason to connect two switches to each other with more than one link.
9. What is a router's job?
10. Why would a business subnet its network?
11. For `192.168.1.100` with a mask of `255.255.255.0`: give the network address, the usable host range and the broadcast address.
12. Which two addresses in a subnet are conventionally used for the default gateway?
13. Which two messages does ARP use, and which one is broadcast?
14. Your ARP cache shows a different MAC address for the gateway than it did yesterday. What might that mean?
15. Name the four DHCP messages in order.
16. A café wants staff tills and public Wi-Fi on the same physical kit but kept apart. What does it need?

## Answer key

1. **The design or shape of the network: how devices are connected.** Star, bus and ring are the classic ones.
2. **Star, because it is reliable and easy to scale.** Adding a device is one more cable into a free port.
3. **The central switch; use more than one switch, connected together.** Otherwise its failure takes every attached device offline.
4. **Every device shares the one backbone cable.** Simultaneous traffic bottlenecks on it.
5. **The whole ring stops working.** Data has only one path around the loop.
6. **A token circulates, and only the device holding it may transmit; it is a method used on some ring networks, not the topology itself.** Token Ring and FDDI used it.
7. **A hub repeats frames out of every port; a switch sends them only to the port of the destination.** The switch learns which device is on which port.
8. **Redundancy: if one link fails, the other carries the traffic.** Spanning Tree keeps the spare idle until it is needed.
9. **To connect networks and pass data between them, choosing a path (routing).** It works at the IP level.
10. **To separate departments or device types for efficiency, security and control.** For example, staff and guest networks.
11. **Network `192.168.1.0`; hosts `192.168.1.1` to `192.168.1.254`; broadcast `192.168.1.255`.** That is 254 usable addresses.
12. **The first and last host addresses: `.1` or `.254` in a `255.255.255.0` network.** Any host address would work.
13. **An ARP request, which is broadcast, and an ARP reply, which comes from the owner of the address.** The reply is stored in the cache.
14. **Someone may be spoofing the gateway to intercept your traffic.** Genuine hardware changes are the other explanation.
15. **Discover, Offer, Request, Acknowledge (DORA).** The client discovers and requests; the server offers and acknowledges.
16. **Two subnets (or VLANs), with a router or firewall between them that blocks the public side from the till network.** Separation only works if something filters between them.
