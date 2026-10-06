---
title: "Networking for Sysadmins 3: IPv4 — Class Notes"
description: "Full class notes for Networking for Sysadmins ch. 3: IPv4 addressing, subnets/netmasks, viewing config on Windows/Debian/FreeBSD, private addressing and NAT, and troubleshooting."
tags: ["class-notes", "networking", "ipv4", "subnetting", "netmask", "nat", "troubleshooting"]
draft: false
pubDate: 2026-09-27
---

> **How these notes were made:** the material supplied for this lesson was the
> chapter's own **heading list** — "IPv4 Addresses", "Special IPv4 Addresses",
> "The Localhost Address", "Subnets", and so on — with an explicit instruction
> to draft the content from general knowledge rather than a transcript. These
> notes follow that heading structure, but the explanations are written from
> general networking knowledge, **not** reproduced or paraphrased from Michael
> W. Lucas's actual book text, which was not supplied. Treat this as original
> coverage of the same topics, organised the way the book organises them —
> worth checking against your own copy of the chapter for Lucas's specific
> examples, wording, and any details particular to his presentation.


**Class notes · Networking for System Administrators (2nd ed.), Michael W.
Lucas · Chapter 3**

> **Quick reference:** the short version of this lesson lives in the
> [Networking for Sysadmins resource sheets](/cyber_lab_log/resources/networking-sysadmins/3/).
> This follows Chapter 2 (Ethernet) — Ethernet gets frames onto the local
> wire; this chapter is about the addressing layered on top of that, IPv4.

## Learning objectives

By the end of these notes you should be able to:

1. Describe the structure of an IPv4 address and identify special/reserved
   addresses, including localhost.
2. Explain subnetting, netmasks, and CIDR notation, and identify the
   unusable addresses in a subnet.
3. Explain the role of a router and default gateway, and distinguish a LAN
   from a routed network.
4. View IP configuration on Windows, Debian and FreeBSD.
5. Explain multiple network interfaces and IP aliasing.
6. Explain private addressing and NAT.
7. Apply a basic IP troubleshooting approach.

## 1. IPv4 addresses

An **IPv4 address** is a 32-bit number, conventionally written as **dotted
decimal notation**: four numbers from 0–255, separated by periods — for
example `192.168.1.10`. Each of those four numbers represents one **octet**
(8 bits), and together the four octets make up the full 32-bit address.

An IPv4 address by itself does not say which part identifies the **network**
and which part identifies the **host** on that network — that division is
supplied separately, by the **subnet mask** (Section 4).

## 2. Special IPv4 addresses

Certain addresses and ranges are reserved for specific purposes rather than
being assigned to ordinary hosts:

| Address / range | Purpose |
| --- | --- |
| `0.0.0.0` | Represents "this network" or an unspecified address, depending on context |
| `255.255.255.255` | The **limited broadcast** address — reaches every host on the local network segment |
| `127.0.0.0/8` | Reserved for **loopback** (Section 3) |
| `169.254.0.0/16` | **APIPA/link-local** addresses, self-assigned when DHCP fails |
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | **Private** address ranges (Section 9) |

## 3. The localhost address

**`127.0.0.1`** is the best-known **loopback** address — a way for a machine
to address **itself** over IP, without traffic ever leaving the machine or
touching a real network interface. In fact, the **entire** `127.0.0.0/8`
range (`127.0.0.1` through `127.255.255.254`) is reserved for loopback use,
though `127.0.0.1` is the address almost universally used in practice.

Loopback is heavily used by services that run and communicate **locally** on
one machine — a database only accepting connections from `127.0.0.1`, for
instance, is deliberately refusing any connection that did not originate on
that same machine.

## 4. Subnets

A **subnet** is a logically distinct portion of a larger IP network. Rather
than treating every device as part of one enormous flat address space,
subnetting **divides** the address space into smaller segments — useful for
separating traffic (a staff subnet vs a guest subnet), for limiting the size
of broadcast domains, and for organising a network in a way that mirrors an
organisation's actual structure.

## 5. Netmasks and subnet size

A **subnet mask** (or **netmask**) marks which bits of an IP address belong
to the **network** portion and which belong to the **host** portion. It is
written either in the same dotted-decimal form as an IP address (e.g.
`255.255.255.0`) or as **CIDR notation** — a slash followed by the number of
network bits (e.g. `/24`).

| CIDR | Netmask | Host bits | Usable hosts |
| --- | --- | --- | --- |
| /8 | 255.0.0.0 | 24 | 16,777,214 |
| /16 | 255.255.0.0 | 16 | 65,534 |
| /24 | 255.255.255.0 | 8 | 254 |
| /25 | 255.255.255.128 | 7 | 126 |
| /26 | 255.255.255.192 | 6 | 62 |
| /27 | 255.255.255.224 | 5 | 30 |
| /28 | 255.255.255.240 | 4 | 14 |
| /30 | 255.255.255.252 | 2 | 2 |

The **larger** the CIDR number (more network bits), the **fewer** hosts a
subnet can hold. A `/24` (255.255.255.0) is a very common size for a small
office LAN, giving 254 usable host addresses.

## 6. Unusable IPv4 addresses

Within any subnet, **two** addresses cannot be assigned to a host:

- The **network address** — every host bit set to **0**. Identifies the
  subnet itself, not a device on it. For `192.168.1.0/24`, that is
  `192.168.1.0`.
- The **broadcast address** — every host bit set to **1**. Used to reach
  **every host** on that specific subnet at once. For `192.168.1.0/24`, that
  is `192.168.1.255`.

That is why a `/24` subnet, with 256 total addresses, yields only **254**
usable host addresses — the first and last are reserved.

```
192.168.1.0/24:

  192.168.1.0    <- network address (unusable)
  192.168.1.1    <- first usable host  (often the gateway)
  ...
  192.168.1.254  <- last usable host
  192.168.1.255  <- broadcast address (unusable)
```

## 7. Routers and the default gateway

A **router** forwards traffic **between** different networks — it is the
device that lets a packet leave the local subnet and reach somewhere else.
When a host needs to send traffic to an address **outside** its own subnet,
it sends that traffic to its **default gateway**: the router's IP address on
the local subnet, configured on every host that needs to reach beyond its own
network.

Without a correctly configured default gateway, a host can talk to other
devices on its **own** subnet, but nothing beyond it.

## 8. Networks vs LANs and gateways

It helps to keep two related ideas distinct:

- A **LAN (Local Area Network)** is the local segment a host's traffic can
  reach directly, without needing a router — typically the same as its
  subnet.
- A **network**, more broadly, can mean the LAN, or it can mean the wider set
  of interconnected networks (potentially spanning many LANs joined by
  routers) that a host can ultimately reach.

The **gateway** is the specific device — a router's local interface — that
bridges a host's LAN to everything beyond it. "The network" a host can reach
is therefore its own LAN, plus whatever its gateway (and the routers beyond
that) can forward traffic toward.

## 9. Viewing IP configuration

The command to check a machine's IP configuration differs by operating
system.

### 9.1 Windows

```text
ipconfig
```

For full detail, including DNS servers and adapter descriptions:

```text
ipconfig /all
```

### 9.2 Debian (and most modern Linux)

The modern tool is `ip`, from the `iproute2` package:

```bash
ip addr show
```

or shortened:

```bash
ip a
```

The older `ifconfig` command (from the `net-tools` package) still works on
many systems, though it is considered legacy on modern Linux distributions:

```bash
ifconfig
```

### 9.3 FreeBSD

FreeBSD uses `ifconfig` as its standard, current tool for viewing (and
configuring) interfaces — unlike on Linux, this is not a legacy command on
FreeBSD:

```bash
ifconfig
```

> **Note (beyond this lesson):** on FreeBSD, `ifconfig` with no arguments
> lists every interface and its assigned addresses; a specific interface can
> be queried with `ifconfig <interface_name>` (e.g. `ifconfig em0`).

## 10. Multiple network interfaces

A machine can have **more than one** network interface — for example, a
server with both a wired Ethernet port and a separate management network
port, or a router with an interface on each network it connects. A host with
multiple interfaces, each potentially on a different subnet, is sometimes
called **multihomed**.

Each interface typically gets its **own** IP address (and can have its own
default gateway, though a host generally uses only one at a time for
general-purpose routing).

## 11. IP aliasing

**IP aliasing** is assigning **more than one IP address to a single network
interface**. A single physical (or virtual) interface can therefore answer to
several addresses at once — useful for hosting multiple services that each
need their own IP, without needing a separate physical interface for each.

On Linux, this is done with the `ip` command, adding a further address to an
existing interface:

```bash
ip addr add 192.168.1.50/24 dev eth0
```

> **Note (beyond this lesson):** older Linux tooling historically used a
> labelled sub-interface naming convention such as `eth0:0`, `eth0:1` for
> aliases; modern `iproute2`-based tooling (as shown above) simply attaches
> multiple addresses to the same interface name without that labelling
> scheme.

## 12. Private addresses and NAT

Certain IPv4 ranges are set aside as **private** — not routable on the public
internet, and free for any organisation to reuse internally without
coordinating with anyone else. These are defined in **RFC 1918**:

| Range | CIDR |
| --- | --- |
| `10.0.0.0` – `10.255.255.255` | `10.0.0.0/8` |
| `172.16.0.0` – `172.31.255.255` | `172.16.0.0/12` |
| `192.168.0.0` – `192.168.255.255` | `192.168.0.0/16` |

Because private addresses cannot be routed on the public internet directly,
a device called a **NAT (Network Address Translation)** gateway — typically
built into a home or office router — **translates** between a host's private
address and a single **public** address when traffic needs to leave the local
network. This is what lets many devices on a private network share one public
internet connection.

### 12.1 Worked example — a home network behind NAT

A laptop on a home network has the private address `192.168.1.20`. It sends a
request to a public web server.

1. The laptop sends the request to its **default gateway**, the home router,
   at `192.168.1.1`.
2. The router's **NAT** function rewrites the packet's source address from
   `192.168.1.20` to the router's own **public** IP address before sending it
   onward to the internet.
3. The web server's response comes back addressed to the router's public IP.
4. The router's NAT table **remembers** which internal private address made
   the original request, and rewrites the response's destination back to
   `192.168.1.20` before delivering it to the laptop.

The laptop never has a directly internet-routable address of its own — NAT
makes that unnecessary for outbound connections.

## 13. Troubleshooting IP

A basic, layered approach to IP-level troubleshooting:

1. **Confirm the host's own configuration.** Check the IP address, subnet
   mask and default gateway are what you expect (Section 9's commands).
2. **Test the local subnet.** Can the host reach another device on its own
   subnet? A failure here usually points to a local link or configuration
   problem, not a routing issue.
3. **Test the gateway.** Can the host reach its own default gateway? If not,
   nothing beyond the local subnet will work either.
4. **Test beyond the gateway.** Can the host reach something further away —
   another subnet, or the internet? A failure here, with a working gateway,
   points toward a routing problem beyond the local network.
5. **Check DNS separately from IP reachability.** A host can be fully
   IP-reachable and still fail to "get to a website" if DNS resolution is
   broken — rule this out as a distinct step rather than assuming it is an IP
   problem.

> **In the real world:** working through these steps **in order** — local
> config, then local subnet, then gateway, then beyond — narrows down where a
> connectivity problem actually lives far faster than guessing at the far end
> first.

## 14. Security perspective

IPv4 addressing and subnetting decisions carry real security weight, beyond
pure connectivity:

- **Subnet boundaries are a natural place to enforce segmentation.** Putting
  different trust levels — staff, guest Wi-Fi, IoT devices, servers — on
  separate subnets means a firewall or router **between** them can actually
  filter traffic; devices sharing one flat subnet can typically reach each
  other directly with nothing in the way.
- **NAT is not a firewall, even though it feels like one.** NAT exists to
  conserve public addresses and enable address translation, not to provide
  security — a host behind NAT that has a port forwarded to it, or that
  initiates an outbound connection, is just as reachable as if it had a
  direct public address for that traffic. Do not rely on "it's behind NAT" as
  a security boundary on its own.
- **Loopback-only services are a real, simple control.** A service configured
  to listen **only** on `127.0.0.1` cannot be reached from anywhere else on
  the network at all — a genuinely strong restriction for anything that only
  needs to be used locally (a local admin interface, a database only accessed
  by an app on the same host).
- **IP aliasing and multihomed hosts widen what needs reviewing.** Each
  additional address or interface on a host is another thing that might be
  listening for connections, and another thing to include when reasoning
  about that host's actual exposure — an audit that only checks "the" IP
  address of a multihomed or aliased host can miss real attack surface.
- **APIPA addresses (169.254.0.0/16) are a diagnostic signal.** A host showing
  a self-assigned link-local address has failed to reach DHCP — worth
  investigating not just as a connectivity fault, but as a possible sign of a
  DHCP outage, a rogue/exhausted DHCP scope, or (in rarer cases) DHCP
  starvation as part of an attack.

## Summary

- An **IPv4 address** is a 32-bit number in dotted-decimal form; the **subnet
  mask** splits it into network and host portions.
- Special addresses include `0.0.0.0`, the broadcast `255.255.255.255`, the
  `127.0.0.0/8` **loopback** range (usually `127.0.0.1`), and the
  `169.254.0.0/16` **APIPA/link-local** range.
- **Subnetting** divides an address space; **netmasks/CIDR** define subnet
  size — the **network address** (all host bits 0) and **broadcast address**
  (all host bits 1) in any subnet are always unusable for hosts.
- A **router** forwards between networks; a host's **default gateway** is the
  router it sends off-subnet traffic to. A **LAN** is the local, directly
  reachable segment; "the network" more broadly can include everything a
  gateway can forward toward.
- View IP config with **`ipconfig`** (Windows), **`ip addr show`** (modern
  Debian/Linux, with legacy `ifconfig` still around), or **`ifconfig`**
  (FreeBSD's standard tool).
- A host can have **multiple interfaces** (multihomed); **IP aliasing**
  assigns several addresses to one interface.
- **Private addressing** (RFC 1918: `10.0.0.0/8`, `172.16.0.0/12`,
  `192.168.0.0/16`) plus **NAT** lets many private hosts share one public
  address.
- **Troubleshoot IP** in layers: local config -> local subnet -> gateway ->
  beyond the gateway, checking DNS separately.

## Glossary

| Term | Meaning |
| --- | --- |
| IPv4 address | A 32-bit address in dotted-decimal form. |
| Octet | One of the four 8-bit segments of an IPv4 address. |
| Subnet mask / netmask | Defines the network vs host portion of an address. |
| CIDR notation | Slash notation stating the number of network bits (e.g. /24). |
| Loopback | 127.0.0.0/8; a host addressing itself, usually via 127.0.0.1. |
| Network address | The all-host-bits-zero address identifying a subnet. |
| Broadcast address | The all-host-bits-one address reaching every host on a subnet. |
| Default gateway | The router a host sends off-subnet traffic to. |
| LAN | The local segment directly reachable without routing. |
| Multihomed | A host with more than one network interface/address. |
| IP aliasing | Assigning multiple IP addresses to one interface. |
| RFC 1918 | The standard defining the private IPv4 address ranges. |
| NAT | Network Address Translation; maps private to public addresses. |
| APIPA / link-local | 169.254.0.0/16; self-assigned when DHCP fails. |

## Review questions

1. What is the structure of an IPv4 address, and what determines which part
   is the network vs the host portion?
2. What is the loopback address, and what range is actually reserved for it?
3. What are the two unusable addresses in any subnet, and why are they
   unusable?
4. Convert /24 to its dotted-decimal netmask, and state how many usable host
   addresses it provides.
5. What is a default gateway, and what happens to off-subnet traffic without
   one configured correctly?
6. Distinguish a LAN from "the network" more broadly.
7. Give the command to view IP configuration on Windows, on modern Debian/
   Linux, and on FreeBSD.
8. What is a multihomed host?
9. What is IP aliasing, and give a reason you might use it.
10. Name the three RFC 1918 private address ranges.
11. What does NAT do, and why is it needed for private addresses to reach the
    internet?
12. Describe the layered approach to troubleshooting an IP connectivity
    problem.
13. Scenario: a host shows an address starting 169.254. What does this
    indicate?
14. Scenario: a service is configured to listen only on 127.0.0.1. Can it be
    reached from another machine on the network? Explain.
15. Scenario: why is "the server is behind NAT" not, by itself, a security
    justification for skipping a firewall rule?

## Answer key

1. **A 32-bit address in four dotted-decimal octets; the subnet mask
   determines the network/host split, not the address alone.** Mask defines
   the boundary.
2. **127.0.0.1 is the address in practice; the whole 127.0.0.0/8 range is
   reserved for loopback.** A wider reserved block than just one address.
3. **The network address (all host bits 0, identifies the subnet) and the
   broadcast address (all host bits 1, reaches every host on the subnet) —
   neither can be assigned to a single host.** Structural reservations.
4. **255.255.255.0; 254 usable host addresses.** Standard small-LAN size.
5. **The router a host sends traffic to when the destination is outside its
   own subnet; without one configured, that traffic simply cannot leave the
   local subnet.** No path beyond the LAN.
6. **A LAN is the local segment reachable without routing; "the network" can
   also mean everything reachable via the gateway and routers beyond it.**
   Local vs wider reachability.
7. **`ipconfig` (Windows); `ip addr show` (modern Debian/Linux, `ifconfig`
   still exists as legacy); `ifconfig` (FreeBSD, still the standard tool
   there).** Three different platforms, three commands.
8. **A host with more than one network interface (and typically more than one
   IP address).** Connected to multiple networks at once.
9. **Assigning multiple IP addresses to a single interface; useful for
   hosting several services that each need their own address without extra
   physical interfaces.** One interface, many addresses.
10. **10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.** The RFC 1918 ranges.
11. **NAT translates a private address to a public one (and back) so private
    hosts can communicate over the internet, which does not route private
    addresses directly.** Address translation bridges the two.
12. **Check local config, then local subnet reachability, then the default
    gateway, then beyond the gateway — checking DNS as a separate step.**
    Narrow down layer by layer.
13. **DHCP failed, so the host self-assigned an APIPA/link-local address —
    it can likely only reach other hosts on the same local segment, if
    that.** A DHCP problem signal.
14. **No — a loopback-only service is reachable only from the same machine,
    not from the network at all.** Loopback binding is a strong local-only
    restriction.
15. **NAT exists for address translation, not security; a port forwarded
    through it, or an outbound connection it permits, is just as reachable as
    a direct public address would be for that traffic.** NAT isn't a firewall.
