---
title: "TryHackMe 5.4: Packets and Frames"
description: "Pre Security module 5, Packets & Frames — packet vs frame, IP and TCP headers, the three-way handshake and close, UDP, and port numbers and ranges."
tags: ["tryhackme", "networking", "tcp", "udp", "ports"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "tryhackme"
module: "Packets and Frames"
moduleOrder: 42
unit: 5
---
> **In one line:** a frame (layer 2, MAC addresses) is the envelope around a packet (layer 3, IP addresses); TCP adds ports, sequence numbers and a three-way handshake for reliability, UDP adds almost nothing, and ports say which service the data is for.

*Companion to: TryHackMe Pre Security (2026 path), module 5, Packets & Frames.* The full version is the Packets and Frames class notes; the previous room is OSI Model.

---

## Packet vs frame

| | Frame | Packet |
|---|---|---|
| Layer | 2 (data link) | 3 (network) |
| Addresses | MAC | IP |
| Analogy | The envelope | The letter inside |
| Lifetime | Rewritten at every hop | Travels end to end unchanged |

```
  FRAME (MACs) [ PACKET (IPs) [ SEGMENT (ports, seq, flags) [ DATA ] ] ] + FCS
```

## Where each field lives

| Field | Header it's in |
|---|---|
| Source / destination IP, TTL | **IP** (layer 3) |
| Source / destination port, checksum | TCP or UDP (layer 4) |
| Sequence number, acknowledgement number, flags | TCP only |
| Source / destination MAC | Frame (layer 2) |

**Two fixes to the room:** source and destination IP are *not* TCP headers, and TTL is *not* a UDP header — all three are IP fields. TTL is also a **hop count**, not a timer: each router decrements it, and 0 means drop.

## TCP/IP model

| TCP/IP layer | OSI | Examples |
|---|---|---|
| Application | 7–5 | HTTP, DNS, SMTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP |
| Network interface | 2–1 | Ethernet, Wi-Fi |

TCP = one transport protocol. TCP/IP = the four-layer model named after TCP and IP.

## TCP headers

| Header | Purpose |
|---|---|
| Source port | Opened by the sender, from the free (ephemeral) ports |
| Destination port | Where the service is listening — never random |
| Sequence number | Where these bytes sit in the stream; starts at a random ISN |
| Acknowledgement number | The next byte expected, confirming everything before it |
| Checksum | Detects corruption |
| Flags | SYN, ACK, FIN, RST, PSH, URG |
| Data | The bytes being carried |

**Not "+1" in general:** sequence numbers advance by the **number of bytes sent**; only SYN and FIN count as one each. And there is **no DATA flag** — data rides in ordinary ACK segments.

## Handshake and close

```
  Client                                                Server
     |  1. SYN          seq = 0 (my ISN)                   |
     |---------------------------------------------------->|
     |  2. SYN/ACK      seq = 5000 (my ISN), ack = 1       |
     |<----------------------------------------------------|
     |  3. ACK          seq = 1, ack = 5001                |
     |---------------------------------------------------->|
     |  ===== data =====                                   |
     |  4. FIN -> 5. ACK <- 6. FIN <- 7. ACK ->            |
```

| Flag | Means |
|---|---|
| SYN | Start a connection, here's my ISN |
| SYN/ACK | Server's ISN, plus acknowledgement of yours |
| ACK | I have everything up to this byte |
| FIN | I've finished sending (clean close) |
| RST | Abort now — nothing listening, or something is wrong |

**Refused vs timed out:** RST back = host reachable, nothing listening. Silence = something dropped it.

## UDP

| | TCP | UDP |
|---|---|---|
| Connection | Three-way handshake | None (stateless) |
| Headers | Ports, seq, ack, flags, checksum, data | Ports, length, checksum, data |
| Guarantees | Delivery and order | None |
| Good for | Web, email, files, SSH | Video, voice, DNS, DHCP, NTP |

## Ports

| Range | Name | Used for |
|---|---|---|
| 0–1023 | **Well-known** (the room says "common", 0–1024) | Standard services |
| 1024–49151 | Registered | Registered applications |
| 49152–65535 | Dynamic / ephemeral | Client source ports |

| Protocol | Port |
|---|---|
| FTP | 21 |
| SSH | 22 |
| HTTP | 80 |
| HTTPS | 443 |
| SMB | 445 |
| RDP | 3389 |

Ports are conventions, not rules: a web server can run on 8080, and then the URL needs the port — `http://example.com:8080`.

## 🔐 Security notes

- **SYN flood:** half-open connections consume server state; SYN cookies defer that state until the handshake finishes.
- **SYN scans** never complete the handshake, so they leave little in application logs. SYN/ACK = open, RST = closed, silence = filtered — which is why dropping beats rejecting at the perimeter.
- **Checksums catch accidents, not attackers:** anyone altering a packet recalculates them. Integrity needs cryptography (TLS).
- **Random ISNs are a control:** predictable ones let an attacker inject data into, or reset, a connection they can't see.
- **A port is not access control:** moving a service to 8080 hides it from casual traffic, not from a scan. And don't assume port 80 means HTTP — a protocol that doesn't match its port is worth investigating.
- **Well-known ports are well-known targets:** SMB 445 and RDP 3389 exposed to the internet are prime ransomware routes. Put them behind a VPN.

## Practice drills

<details>
<summary>1. Packet or frame: which carries MAC addresses, and which survives a hop?</summary>

The **frame** carries MACs and is rewritten at every hop; the **packet** (IP addresses) travels end to end.
</details>

<details>
<summary>2. Why isn't "Source IP" a TCP header?</summary>

IP addresses live in the **IP header** at layer 3. TCP carries ports, sequence and acknowledgement numbers, flags and a checksum.
</details>

<details>
<summary>3. What does TTL actually count?</summary>

**Hops.** Each router decrements it; at 0 the packet is dropped. IPv6 calls it the hop limit.
</details>

<details>
<summary>4. Name the three-way handshake in order.</summary>

**SYN → SYN/ACK → ACK**, exchanging each side's random initial sequence number.
</details>

<details>
<summary>5. A TCP transfer loses one segment. What is re-sent?</summary>

**Only that segment.** The sender retransmits it; the rest of the transfer stands.
</details>

<details>
<summary>6. What closes a connection cleanly, and what aborts it?</summary>

**FIN, ACK, FIN, ACK** closes it. **RST** aborts it.
</details>

<details>
<summary>7. What does a UDP header contain?</summary>

**Source port, destination port, length, checksum, data.** No sequence numbers, acknowledgements or flags.
</details>

<details>
<summary>8. Which range holds the well-known ports, and which holds a client's source port?</summary>

**0–1023** well-known; the client's source port comes from the **ephemeral** range (49152–65535).
</details>

## Key takeaways

- Frame wraps packet wraps segment wraps data; MACs change per hop, IPs don't.
- IP header: addresses, TTL (hops), checksum. TCP header: ports, seq/ack, flags.
- Handshake SYN → SYN/ACK → ACK; close FIN/ACK/FIN/ACK; RST = abort.
- Only the missing segment gets re-sent, not the whole transfer.
- Ports: 0–1023 well-known, 49152+ ephemeral; standards are conventions, not security.
