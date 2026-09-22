---
title: "Networking for Sysadmins 1: Network Layers"
description: "Lucas, Networking for System Administrators (2nd ed.) ch. 1 — the four layers, encapsulation, what changes at each hop, and troubleshooting commands by layer."
tags: ["networking", "network-layers", "osi-model", "tcp-ip", "troubleshooting", "networking-for-sysadmins"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "networking-sysadmins"
module: "Ch. 1"
moduleOrder: 64
unit: 1
---
> **In one line:** networks work in layers (physical, datalink, network, transport, then the application), and troubleshooting means finding the lowest layer that's broken.

*Companion to: Michael W Lucas, Networking for System Administrators (2nd ed.), chapter 1 — written from general networking knowledge, following the chapter's headings.* The full version is the Network Layers class notes.

---

## The layers

| Layer | Job | Data unit | Addressed by | Device | Typical fault |
|---|---|---|---|---|---|
| 1 Physical | Move signals | Bits | Nothing | Cable, transceiver | Unplugged, damaged pair, duplex mismatch |
| 2 Datalink | Frame to a neighbour | Frame | MAC (48-bit) | Switch, access point | Wrong VLAN, gateway not answering ARP |
| 3 Network | Packet across networks | Packet | IP address | Router | No address, missing or wrong route |
| 4 Transport | Data to the right program | Segment (TCP), datagram (UDP) | Port | Host firewall | Not listening, port blocked |
| Higher | The application itself | Data | Names, URLs | Web or DNS server, proxy | DNS, certificates, config, auth |

**Other models:** OSI adds 5 Session, 6 Presentation, 7 Application (mnemonic, bottom up: *Please Do Not Throw Sausage Pizza Away*). TCP/IP (RFC 1122) has link, internet, transport, application.

## Encapsulation

```
Higher layers: the                              +----------------+
application's data                              |  HTTP request  |
                                                +----------------+
Layer 4 adds a TCP                    +---------+----------------+
header = a segment                    | TCP hdr |  HTTP request  |
                                      +---------+----------------+
Layer 3 adds an IP              +-----+---------+----------------+
header = a packet               | IP  | TCP hdr |  HTTP request  |
                                +-----+---------+----------------+
Layer 2 adds a header     +-----+-----+---------+----------------+-----+
and trailer = a frame     | Eth | IP  | TCP hdr |  HTTP request  | FCS |
                          +-----+-----+---------+----------------+-----+
```

Receiving hosts unwrap in reverse (decapsulation). With HTTPS, the request sits inside TLS first.

## What changes at each hop

| Field | At each router |
|---|---|
| Source and destination MAC | Rewritten: a new frame for every link |
| Source and destination IP | Unchanged end to end (unless NAT) |
| TTL / hop limit | Down by one; dropped at zero (`traceroute` relies on this) |
| TCP / UDP ports | Unchanged (unless NAT) |

A frame for a remote host is addressed to the **default gateway's MAC**, while the packet inside stays addressed to the real destination.

## TCP vs UDP

| | TCP | UDP |
|---|---|---|
| Setup | Handshake: SYN, SYN-ACK, ACK | None |
| Reliability | Acks, retransmission, ordering | None |
| Typical uses | SSH, HTTPS, SMTP | DNS queries, DHCP, NTP, VoIP |

A connection is identified by its **5-tuple**: protocol, source IP, source port, destination IP, destination port. Ports run 0–65,535, separately for TCP and UDP.

## Commands by layer

| Layer | Question | Windows (PowerShell) | Debian | FreeBSD |
|---|---|---|---|---|
| 1 | Link up? | `Get-NetAdapter` | `ip -br link` | `ifconfig em0` |
| 1 | Errors? | `Get-NetAdapterStatistics` | `ip -s link show dev eth0` | `netstat -i` |
| 2 | Neighbours answer? | `Get-NetNeighbor` | `ip neigh` | `arp -a` (`ndp -a` for IPv6) |
| 3 | Address and route? | `Get-NetIPAddress`, `Get-NetRoute` | `ip -br addr`, `ip route` | `ifconfig`, `netstat -rn` |
| 3 | Which route for X? | `Find-NetRoute -RemoteIPAddress X` | `ip route get X` | `route -n get X` |
| 3 | Reachable? | `Test-Connection host` | `ping -c 4 host` | `ping -c 4 host` |
| 3 | Where does it stop? | `Test-NetConnection host -TraceRoute` | `traceroute host` | `traceroute host` |
| 4 | Listening? | `Get-NetTCPConnection -State Listen` | `sudo ss -tlnp` | `sockstat -4l` |
| 4 | Port reachable? | `Test-NetConnection host -Port 443` | `nc -zv host 443` | `nc -zv host 443` |
| Higher | App answers? | `Invoke-WebRequest`, `Resolve-DnsName` | `curl -v`, `dig` | `fetch`, `host` |

Minimal Debian installs may need the `traceroute`, `dnsutils` and `netcat-openbsd` packages. In Windows PowerShell 5.1, `curl` means `Invoke-WebRequest`; type `curl.exe` for the real thing.

## Reading the results

| You see | It means |
|---|---|
| `NO-CARRIER`, `Disconnected`, or `status: no carrier` | Layer 1: no link |
| Link up, error counters climbing | Failing cable, port or transceiver |
| 100 Mb/s on gigabit kit | Probably a damaged wire pair |
| Gateway `FAILED` in `ip neigh` | Layer 2: gateway down, or wrong VLAN |
| `STALE` in `ip neigh` | Normal: rechecked on next use |
| Ping fails | Not proof it's down: ICMP is often blocked |
| Ping works, port test fails | Layer 4: not listening, or a firewall |
| Connection refused | Host is up, nothing listening on that port |
| Connection times out | Something is dropping traffic, usually a firewall |
| Listening on `127.0.0.1` / `::1` | Local only: other machines can't connect |
| Listening on `0.0.0.0` / `::` | All interfaces |
| Works by IP, not by name | DNS: a higher-layer fault |

## Troubleshooting strategies

| Strategy | Start at | Use when |
|---|---|---|
| Bottom-up | Layer 1 | Nothing works at all |
| Top-down | The application | One app fails while others work |
| Divide and conquer | Ping (layer 3) | You want speed: pass means look up, fail means look down |

## 🔐 Security notes

- **ARP has no authentication.** A gateway MAC that changes in `ip neigh` / `Get-NetNeighbor` without a hardware swap may be ARP spoofing. Switch-side defences: Dynamic ARP Inspection, DHCP snooping, port security.
- **MAC addresses are trivially changed,** so never treat one as proof of identity.
- **Every listener is attack surface.** Audit listeners with their owning process, and bind internal-only services to loopback.
- **Check routes during incidents:** an unexpected default route can silently redirect traffic.
- **Blocking ping doesn't hide a host,** and blocking *all* ICMP breaks path MTU discovery and IPv6.
- **TLS hides the data, not the headers:** IP addresses, ports and usually the server name stay visible.

## Practice drills

<details>
<summary>1. Which Debian command shows every interface's link state on one line each, and what flag means "cable connected"?</summary>

`ip -br link`. `LOWER_UP` means a physical carrier is present; `NO-CARRIER` means there isn't one.
</details>

<details>
<summary>2. A host at <code>192.0.2.2/24</code> sends a packet to <code>198.51.100.20</code>. Whose MAC address goes in the frame's destination?</summary>

The **default gateway's**. The destination isn't local, so the frame goes to the router; the packet inside is still addressed to `198.51.100.20`.
</details>

<details>
<summary>3. Ping works, but <code>Test-NetConnection web01 -Port 443</code> fails. Which layer, and two likely causes?</summary>

Layer 4. Nothing is listening on 443 (or it's only listening on loopback), or a firewall is blocking the port.
</details>

<details>
<summary>4. <code>ip neigh</code> shows the gateway as <code>FAILED</code>. Where do you look?</summary>

Layers 1 and 2: the link, the switch port's VLAN, and whether the gateway itself is up. Nothing on the local network is answering ARP for it.
</details>

<details>
<summary>5. What's the difference between "connection refused" and a timeout?</summary>

**Refused:** the host answered with a reset, so the path works but nothing is listening. **Timeout:** nothing answered, usually because a firewall dropped the traffic.
</details>

<details>
<summary>6. As a packet crosses a router, what changes and what stays the same?</summary>

The MAC addresses are rewritten (new frame) and the TTL drops by one. The IP addresses and ports stay the same, unless NAT is involved.
</details>

<details>
<summary>7. Which PowerShell cmdlet lists listening TCP ports with the owning process?</summary>

`Get-NetTCPConnection -State Listen` (the `OwningProcess` column gives the PID).
</details>

## Key takeaways

- Find the lowest broken layer first: nothing above it can work until it does.
- MAC addresses are per link; IP addresses are end to end (unless NAT).
- Ping proves layers 1 to 3 only.
- Refused means nothing is listening; a timeout means something is dropping traffic.
- The listening address matters: `127.0.0.1` is local only.
