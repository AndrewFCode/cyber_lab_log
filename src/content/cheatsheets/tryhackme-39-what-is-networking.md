---
title: "TryHackMe 5.1: What is Networking?"
description: "Pre Security module 5, What is Networking? — networks and the internet, private vs public, IP vs MAC addresses, MAC spoofing, IPv4 vs IPv6, and ping."
tags: ["tryhackme", "networking", "ip-addresses", "mac-addresses", "ping"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "tryhackme"
module: "What is Networking?"
moduleOrder: 39
unit: 5
---
> **In one line:** a network is connected devices, the internet is a network of networks, and every device is known by an IP address (which changes) and a MAC address (set at the factory, but spoofable) — and ping tells you if one answers.

*Companion to: TryHackMe Pre Security (2026 path), module 5, What is Networking?* The full version is the What is Networking? class notes.

---

## Networks and the internet

| Term | Meaning |
|---|---|
| Network | Connected things; in computing, from 2 devices to billions |
| Internet | One giant network of networks |
| Router | Joins networks and passes traffic between them ("Alice" in the room) |
| Private network | A home or organisation's own network |
| Public network | The networks joining private networks — the internet |

| History | Fact |
|---|---|
| ARPANET | Late 1960s, US Department of Defense funded; forerunner of the internet (one of the first packet-switched networks, not the first network) |
| TCP/IP | Adopted by ARPANET in 1983 — the internet's protocols |
| World Wide Web | Proposed by Tim Berners-Lee in 1989; runs **on** the internet — he invented the Web, not the internet |

## Two identifiers

| | IP address ("name") | MAC address ("fingerprint") |
|---|---|---|
| Identifies | A host on a network, for a period of time | A network interface |
| Set by | The network | The manufacturer |
| Changes? | Yes; addresses get reused | Normally fixed — but spoofable and often randomised |
| Example | `192.168.1.77` | `a4:c3:f0:85:ac:2d` |
| Size | 32 bits (IPv4) / 128 bits (IPv6) | 48 bits = 12 hex digits |

**Rule:** an IP address can move between devices, but never be used by two at once on the same network.

## Private vs public addresses

| Device | Private | Public |
|---|---|---|
| DESKTOP-KJE57FD | `192.168.1.77` | `203.0.113.21` |
| CMNatic-PC | `192.168.1.74` | `203.0.113.21` |

Private addresses let the PCs reach each other; to the internet, both are the one public address from the ISP (the router translates with NAT). Public address shown here is a documentation address.

## IPv4 vs IPv6

| | IPv4 | IPv6 |
|---|---|---|
| Bits | 32 | 128 |
| Addresses | 2³² ≈ 4.29 billion | 2¹²⁸ ≈ **340 undecillion** (the room's "340 trillion" is 10²⁴ times too small) |
| Why it exists | Original | Fixes the IPv4 shortage |

The room's "50 billion devices by 2021" was a Cisco *forecast* (for 2020) that proved too high — but devices still far outnumber IPv4 addresses.

## MAC addresses

```
    a4  :  c3  :  f0  :  85  :  ac  :  2d
  |<- manufacturer ->| |< this interface >|
  |   OUI: 24 bits   | |     24 bits      |
  |<------ 48 bits = 12 hex digits ------>|
```

| Fact | Detail |
|---|---|
| Notation | Linux `a4:c3:f0:85:ac:2d` · Windows `A4-C3-F0-85-AC-2D` · Cisco `a4c3.f085.ac2d` |
| First 6 hex digits | Manufacturer (OUI) |
| Last 6 | Unique to the interface |
| Second digit 2, 6, a or e | Locally set (often a randomised privacy MAC), not from the factory |
| Spoofing | Copying another device's MAC to impersonate it |

**The hotel Wi-Fi lab:** Alice pays, so her MAC is allowed; Bob copies her MAC and gets online free. MAC-based access control can't tell them apart.

```bash
sudo ip link set dev eth0 down
sudo ip link set dev eth0 address 02:11:22:33:44:55    # change (spoof) the MAC on Linux
sudo ip link set dev eth0 up
```

## Ping

| Fact | Detail |
|---|---|
| Protocol | ICMP (Internet Control Message Protocol) |
| Messages | Echo request → echo reply |
| Measures | Reachability, packet loss, round-trip time |
| Linux / macOS | `ping -c 4 8.8.8.8` (without `-c`, runs until Ctrl+C) |
| Windows | `ping 8.8.8.8` (sends 4) · PowerShell `Test-Connection 8.8.8.8` |
| `8.8.8.8` | Google Public DNS — a common connectivity test target |

| Output field | Meaning |
|---|---|
| `icmp_seq` | Sequence number: gaps = lost packets |
| `ttl` | Hops left for the reply |
| `time` | Round-trip time for that packet |
| `0% packet loss` | Every request answered |
| `rtt min/avg/max/mdev` | Fastest / average / slowest / variation |

Local devices answer in well under a millisecond to a few ms; internet hosts usually take tens of ms. **No reply ≠ offline** — many devices ignore ping.

## 🔐 Security notes

- **MACs aren't identity:** one command spoofs them, so MAC allow-lists (guest Wi-Fi paywalls, "admin MAC" firewall rules) are easy to bypass. Use 802.1X or WPA2/WPA3-Enterprise.
- **Randomised MACs** protect privacy but break MAC-based inventories and controls.
- **Unexpected OUIs** (a consumer router's maker on the corporate LAN) can reveal rogue devices.
- **A public IP identifies a network, not a person:** everyone behind the router shares it.
- **Ping is reconnaissance too:** attackers sweep ranges for live hosts; many networks block ICMP echo, so silence proves nothing.

## Practice drills

<details>
<summary>1. What is the internet, and who plays the router in the room's story?</summary>

A **network of networks**. **Alice**, who speaks both groups' language and passes messages between them.
</details>

<details>
<summary>2. Did Tim Berners-Lee invent the internet?</summary>

**No.** He invented the **World Wide Web** (1989), which runs on the internet. The internet grew from ARPANET and TCP/IP.
</details>

<details>
<summary>3. Which identifier is like a name, and which like a fingerprint?</summary>

**IP address = name** (it changes). **MAC address = fingerprint** (set at the factory) — though MACs can be spoofed.
</details>

<details>
<summary>4. Two home PCs are <code>192.168.1.77</code> and <code>192.168.1.74</code>. What does a website see?</summary>

The **same public address** for both — the one the ISP gave the home's router.
</details>

<details>
<summary>5. Split <code>a4:c3:f0:85:ac:2d</code> into its two parts.</summary>

**`a4:c3:f0`** = manufacturer (OUI); **`85:ac:2d`** = unique to the interface.
</details>

<details>
<summary>6. How did Bob get free hotel Wi-Fi?</summary>

**MAC spoofing** — he copied Alice's paid-for MAC address.
</details>

<details>
<summary>7. Roughly how many addresses does IPv6 allow?</summary>

**About 340 undecillion** (2¹²⁸) — not 340 trillion.
</details>

<details>
<summary>8. Which protocol and messages does ping use?</summary>

**ICMP**: an **echo request** out and an **echo reply** back.
</details>

## Key takeaways

- The internet is a network of networks, joined by routers.
- Berners-Lee invented the Web (1989); the internet grew from ARPANET.
- Many private addresses share one public address from the ISP.
- IP = changeable name; MAC = factory fingerprint, but spoofable — never proof of identity.
- IPv4 ≈ 4.29 billion addresses; IPv6 ≈ 340 undecillion.
- Ping = ICMP echo request/reply; no reply doesn't mean no host.
