---
title: "TryHackMe 5.3: OSI Model"
description: "Pre Security module 5, OSI Model — the seven layers and what each does, addresses and devices per layer, TCP vs UDP, and encapsulation."
tags: ["tryhackme", "networking", "osi-model", "tcp", "udp"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "tryhackme"
module: "OSI Model"
moduleOrder: 41
unit: 5
---
> **In one line:** the OSI model splits networking into seven layers so different devices can understand each other — cables, MACs, IPs, TCP/UDP, sessions, formats and protocols — with each layer adding a header on the way down.

*Companion to: TryHackMe Pre Security (2026 path), module 5, OSI Model.* The full version is the OSI Model class notes; the previous rooms are What is Networking? and Intro to LAN.

---

## The seven layers

| # | Layer | Does | Unit | Addresses / examples | Devices |
|---|---|---|---|---|---|
| 7 | Application | Protocols users meet | Data | HTTP, DNS, SMTP, FTP | Proxy, WAF |
| 6 | Presentation | Formats, encodes, encrypts | Data | HTTPS/TLS, character encoding | — |
| 5 | Session | Opens, maintains, closes sessions; checkpoints | Data | — | — |
| 4 | Transport | TCP or UDP, ports | Segment (TCP) / datagram (UDP) | Port 443, 53 | Host firewall |
| 3 | Network | Routing between networks | Packet | IP addresses, OSPF, RIP | Router ("layer 3 device") |
| 2 | Data link | Local delivery | Frame | MAC addresses | Switch, NIC |
| 1 | Physical | Signals and hardware | Bits | Cables, connectors | Hub, cable |

**Mnemonics:** 1→7 "Please Do Not Throw Sausage Pizza Away" · 7→1 "All People Seem To Need Data Processing".

## Routing choices (layer 3)

| Factor | Question |
|---|---|
| Distance | Fewest devices to cross? |
| Reliability | Has this path dropped packets before? |
| Speed | Copper (slower) or fibre (faster)? |

**OSPF** costs paths by bandwidth; **RIP** just counts hops.

## TCP vs UDP

| | TCP | UDP |
|---|---|---|
| Connection | Set up first, kept for the exchange | None |
| Reliability | Numbered, acknowledged, missing parts re-sent | None; sent and forgotten |
| Ordering | Reassembled in order | No guarantee |
| Speed | Slower: more work | Faster: little overhead |
| Use when | Losing data breaks the result | Waiting breaks the result |
| Examples | Web, email, file transfer, SSH | DNS queries, DHCP, NTP, VoIP, live video |

```
  TCP: sent [1][2][3][4]  ->  received [1][2][3][4]   whole picture
  UDP: sent [1][2][3][4]  ->  received [1][ ][3][ ]   gaps stay gaps
```

**Two fixes to the room:** a TCP connection is a logical agreement, not reserved capacity, and a missing chunk is **re-sent** rather than lost. And **ARP is not UDP** — it sits at layer 2, below IP, with no ports at all. DHCP *is* UDP.

## Encapsulation

```
  7-5  the application's data          data handed to the application
   4   + TCP or UDP header  = segment  transport header removed
   3   + IP header          = packet   IP header removed
   2   + MAC header/trailer = frame    frame header and trailer removed
   1   sent as bits  -------------->   bits read back in
```

Down the stack = encapsulation; up the stack = decapsulation. Data → segment → packet → frame → bits.

## Which layer is it?

| Symptom | Layer |
|---|---|
| No link light | 1 |
| Duplicate IP / wrong MAC for the gateway | 2 |
| No route, wrong gateway, can't reach another subnet | 3 |
| Ping works, port doesn't | 4 |
| Works by IP, not by name | 7 (DNS) |
| Certificate warning | 6 |

## 🔐 Security notes

- **Attacks map to layers:** cable taps (1), ARP spoofing (2), IP spoofing and route hijacking (3), SYN floods and UDP amplification (4), session hijacking (5), app exploits and phishing (7).
- **So do defences:** a packet filter sees addresses and ports only; reading the content needs a layer 7 control such as a WAF or proxy.
- **UDP source addresses are easy to forge** (no handshake), which is what makes UDP services useful for reflection/amplification DDoS.
- **TCP logs are harder to forge:** completing the handshake means replies reached the claimed address.
- **Encryption at one layer doesn't hide the others:** HTTPS hides content, not the IPs and ports beneath it.
- **Two kinds of "session":** OSI's layer 5 session isn't a website's login session — different hijacks, different defences.

## Practice drills

<details>
<summary>1. Name the layers 1 to 7 in order.</summary>

**Physical, Data link, Network, Transport, Session, Presentation, Application.**
</details>

<details>
<summary>2. Which layer adds MAC addresses, and which adds IP addresses?</summary>

**Layer 2** adds MAC addresses; **layer 3** adds IP addresses.
</details>

<details>
<summary>3. What is a "layer 3 device"?</summary>

One that forwards using **IP addresses** — a **router** (or a layer 3 switch).
</details>

<details>
<summary>4. TCP or UDP for a video call, and why?</summary>

**UDP.** A late packet is useless; waiting for retransmissions would freeze the call.
</details>

<details>
<summary>5. A TCP transfer loses a chunk. What happens?</summary>

TCP notices the gap and **re-sends** it. The transfer is slower, not broken.
</details>

<details>
<summary>6. Why isn't ARP a UDP protocol?</summary>

ARP runs at **layer 2**, below IP, so it has no ports and no UDP header. **DHCP** is the UDP one.
</details>

<details>
<summary>7. Name the unit of data at layers 4, 3, 2 and 1.</summary>

**Segment** (4, with TCP), **packet** (3), **frame** (2), **bits** (1).
</details>

<details>
<summary>8. What does the session layer's checkpoint save you from?</summary>

Re-sending everything: only data **after the last checkpoint** needs sending again.
</details>

## Key takeaways

- Seven layers: physical, data link, network, transport, session, presentation, application.
- MACs at layer 2, IPs at layer 3, ports at layer 4.
- TCP = reliable and ordered but slower; UDP = fast with no guarantees.
- Encapsulation adds a header per layer: data → segment → packet → frame → bits.
- Naming the layer of a fault (or an attack) tells you where to look.
