---
title: "A+ Core 1 Section 2 Primer: Introduction to IP"
description: "Professor Messer A+ 220-1201 networking primer — encapsulation, TCP vs UDP, multiplexing, IP addresses, well-known vs ephemeral ports, reading a protocol decode."
tags: ["a-plus", "comptia", "messer", "networking", "tcp", "udp"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Introduction to IP"
moduleOrder: 45
unit: 2
---
> **In one line:** IP is the truck that carries TCP or UDP boxes across any network, and IP addresses plus port numbers deliver each box to the right service on the right device.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, Section 2 primer (not a direct objective — the foundation for all of domain 2).* The full version is the Introduction to IP class notes; the section overview is the Section 2 sheet.

---

## The analogy

| Networking | Analogy |
|---|---|
| Network (Ethernet, wireless, DSL) | Road — IP doesn't care which |
| **IP** | Truck |
| **TCP / UDP** | Boxes |
| Application data (e.g. HTTP) | Box contents |
| **IP address** | House address |
| **Port number** | Room the box goes to |

## Encapsulation

```
 +----------+--------+--------+---------------------+----------+
 | Ethernet | IP     | TCP    | HTTP data           | Ethernet |
 | header   | header | header | (the web request)   | trailer  |
 +----------+--------+--------+---------------------+----------+
```

**Encapsulation** = wrapping on send. **Decapsulation** = unwrapping on receive. The header and trailer mark where the data starts and ends.

## TCP vs UDP

TCP and UDP are "OSI Layer 4" protocols (a term you'll see, though the A+ doesn't need the OSI model). Both allow **multiplexing** — many conversations at once.

| | **TCP** — Transmission Control Protocol | **UDP** — User Datagram Protocol |
|---|---|---|
| Connection | **Connection-oriented**: formal setup and teardown (like a phone call) | **Connectionless** |
| Delivery | **Reliable** — acknowledged (a "return receipt") | **"Unreliable"** — best effort |
| Retransmission | Yes | No (the application may retry) |
| Flow control | Yes — the receiver says speed up or slow down | No |
| Overhead | Higher | Very low |
| Examples | **HTTPS, SSH** | **VoIP, real-time video, DHCP, TFTP** |

**Why real-time uses UDP:** lost audio can't be rewound and replayed, so don't waste effort resending it.

## Ports

| Fact | Detail |
|---|---|
| Each end of a flow has | **IP address + protocol (TCP/UDP) + port** |
| Non-ephemeral (well-known, permanent) | Server/service ports, usually **0–1,023** — set in the service's configuration |
| Ephemeral | Temporary **client** ports, usually **1,024–65,535**; random; one per conversation (Windows default: 49,152–65,535) |
| Range | **0–65,535** for TCP **and separately** for UDP |
| TCP 80 vs UDP 80 | **Not the same** |
| Security? | **No** — ports are reference numbers, and easy to find even if changed |

## Reading a decode

| Src IP | Dst IP | Proto | Src port | Dst port | App |
|---|---|---|---|---|---|
| 10.0.0.1 | 10.0.0.2 | TCP | random, e.g. 51734 | **80** | Web |
| 10.0.0.1 | 10.0.0.2 | UDP | random, e.g. 62208 | **5004** | VoIP |
| 10.0.0.1 | 10.0.0.2 | TCP | random, e.g. 49915 | **143** | Email |

Same IPs → one client and one server. **Destination port = the service. Random source port = the client's ephemeral port.**

```powershell
netstat -an                              # Local Address = you, Foreign Address = the server
Get-NetTCPConnection -State Established
```

---

## 🔐 Security notes

- **Ports aren't security** — scanners find services on any port. Use firewalls, authentication and patching.
- **Firewalls filter on IP + protocol + port** — remember TCP 80 ≠ UDP 80 when writing rules.
- **Unknown listening ports** in `netstat` are worth investigating.
- **Encapsulation isn't encryption** — packet captures reveal plain HTTP. HTTPS and SSH encrypt the payload.

---

## Practice drills

<details>
<summary>1. Put these in order, outermost first: TCP, HTTP, Ethernet, IP.</summary>

Ethernet → IP → TCP → HTTP.
</details>

<details>
<summary>2. Which protocol has acknowledgements, retransmission and flow control?</summary>

TCP.
</details>

<details>
<summary>3. Why does VoIP use UDP?</summary>

It's real-time — lost data can't usefully be replayed, so UDP's low overhead with no retransmission suits it.
</details>

<details>
<summary>4. Name two non-real-time protocols that use UDP.</summary>

DHCP and TFTP.
</details>

<details>
<summary>5. A connection shows local port 50522 and remote port 443. Which end is the client?</summary>

The local side — 50522 is an ephemeral client port; 443 is the well-known HTTPS service port.
</details>

<details>
<summary>6. Is TCP port 53 the same as UDP port 53?</summary>

No — TCP and UDP port numbers are separate, even with the same number.
</details>

<details>
<summary>7. Does running SSH on port 2222 instead of 22 make it secure?</summary>

No — ports are just reference numbers and are easily found by scanning.
</details>

---

## Key takeaways

- The network is the road, IP the truck, TCP/UDP the boxes, and data the contents.
- **Encapsulation:** Ethernet [ IP [ TCP [ HTTP ] ] ] — decapsulated in reverse.
- **TCP:** connection-oriented, reliable, acknowledged, retransmits, flow control (HTTPS, SSH).
- **UDP:** connectionless, best effort, low overhead (VoIP, video, DHCP, TFTP).
- **Each end** = IP address + protocol + port.
- **Well-known ports** (usually 0–1,023) are for services; **ephemeral ports** (usually 1,024–65,535) are for clients.
- **0–65,535 per protocol**; TCP 80 ≠ UDP 80; ports aren't security.
