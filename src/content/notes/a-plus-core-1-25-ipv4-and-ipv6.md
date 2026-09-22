---
title: "A+ Core 1 2.6: IPv4 and IPv6 — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 2.6: IPv4 structure and binary, RFC 1918 private ranges and NAT, IPv6 notation and /64 prefixes."
pubDate: 2026-09-22
tags: ["class-notes", "a-plus", "comptia", "messer", "networking", "ipv4", "ipv6", "nat"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 2, objective 2.6**

> **Quick reference:** the short version of this lesson is the [IPv4 and IPv6 cheat sheet](/cyber_lab_log/resources/a-plus-core-1/2/), part of Section 2 alongside the lessons on ports, wireless, network services, DNS, DHCP, VLANs and VPNs, and network devices.

## Learning objectives

By the end of these notes you should be able to:

1. Describe the structure of an IPv4 address, and convert an octet between decimal and binary.
2. Explain why IPv4 addresses ran short, and how private addressing and NAT stretch them.
3. List the three RFC 1918 private ranges, and tell a private address from a public one.
4. Describe the structure of an IPv6 address, and shorten or expand one correctly.
5. Recognise link-local, global and loopback IPv6 addresses.
6. Explain the /64 network prefix and interface ID in IPv6.
7. Compare IPv4 and IPv6, including why DNS matters more with IPv6.

## 1. Two versions of IP

Almost every network conversation you have ever had used **IP version 4 (IPv4)**, and configuring IPv4 on a system is a core A+ skill. Its successor, **IP version 6 (IPv6)**, does the same job, getting packets from one host to another, but its addresses look completely different and are configured differently. You need to know both, because most networks today run both side by side.

## 2. The IPv4 address

### 2.1 Thirty-two bits in dotted decimal

An IPv4 address is **32 bits**: a string of 32 ones and zeros. Nobody wants to read 32 binary digits, so we split the address into four groups of 8 bits and write each group as a decimal number, separated by dots. This is **dotted decimal** notation, as in `192.168.1.131`.

Each group of 8 bits is an **octet** (8 bits make one byte, so you will also hear "byte"). Four octets make 32 bits, or 4 bytes.

```text
      192       .      168       .       1        .      131     
    11000000    .    10101000    .    00000001    .    10000011  
  |  8 bits  |     |  8 bits  |     |  8 bits  |     |  8 bits  |
  |<--------------- 32 bits = 4 octets = 4 bytes -------------->|
```

### 2.2 Why no octet goes above 255

Eight bits can hold 2 to the power 8, or 256, different values. Counting from zero, that is 0 to 255. So every octet in a valid IPv4 address is between 0 and 255, and an address such as `192.168.1.300` is simply invalid.

### 2.3 Worked example — converting 192.168.1.131 to binary

Each bit in an octet has a place value, doubling from right to left:

| Place value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|---|
| 192 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| 168 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| 131 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |

Take 131 as an example. Work left to right, subtracting each place value that fits:

1. 128 fits into 131, so write 1. That leaves 3.
2. 64, 32, 16, 8 and 4 are all bigger than 3, so write 0 for each.
3. 2 fits into 3, so write 1. That leaves 1.
4. 1 fits into 1, so write 1. That leaves 0.

The result is `10000011`. Doing the same for each octet gives `11000000.10101000.00000001.10000011`, which is 32 bits in total.

To go the other way, add up the place values wherever there is a 1: for `10101000`, that is 128 + 32 + 8 = 168.

## 3. Running out of IPv4 addresses

To communicate across the public internet, every device needs a **unique** public IP address. One device might be `1.1.1.1` and talk to another at `2.2.2.2`, but no two devices on the internet can share the same public address.

Thirty-two bits allow 2 to the power 32 combinations: **4,294,967,296**, or about 4.29 billion addresses. That sounds a lot, but the lesson cites more than 20 billion internet-connected devices, and the number keeps growing. There are simply not enough IPv4 addresses for every device to have its own.

The world has handled this in two ways: by reusing private addresses behind NAT (section 4), and by building a new version of IP with vastly more addresses (section 5).

## 4. Private addresses and NAT

### 4.1 How NAT stretches the supply

A company might have one link to the internet with **one public IPv4 address**, but hundreds or thousands of devices inside. Those inside devices use **private addresses**, which work only within the private network and are reused by millions of other private networks around the world. **Network Address Translation (NAT)** on the router translates between the private addresses inside and the public address outside.

Private addresses never consume any of the public pool, so a whole organisation, or a whole home, can go online through a single public address.

```text
  PRIVATE NETWORK (RFC 1918)                          THE INTERNET    
                                                                      
  192.168.1.10 --+                                                    
                 |      +----------------------+                      
  192.168.1.11 --+----->+ Router doing NAT     +-----> 203.0.113.5    
                 |      | inside: 192.168.1.1  |      (the only public
  192.168.1.12 --+      +----------------------+       address used)  
                                                                      
  Hundreds of private hosts can share one public IPv4 address.        
```

> **Note (beyond this lesson):** when many hosts share one public address, the router tells their connections apart by rewriting the TCP and UDP **port numbers** as well as the addresses. This is called port address translation (PAT), NAT overload, or NAPT, and it is what almost every home router does.

### 4.2 The RFC 1918 private ranges

The private ranges are defined in **RFC 1918**. RFCs (Requests for Comments) are the documents in which internet standards and practices are published.

> **Correction:** the lesson calls RFC 1918 a worldwide standard. It is published as a Best Current Practice (BCP 5) rather than a formal internet standard, but in practice every network follows it.

| Range | CIDR | Addresses | Typical use |
|---|---|---|---|
| 10.0.0.0 to 10.255.255.255 | 10.0.0.0/8 | 16,777,216 | Large corporate networks |
| 172.16.0.0 to 172.31.255.255 | 172.16.0.0/12 | 1,048,576 | Medium-sized networks |
| 192.168.0.0 to 192.168.255.255 | 192.168.0.0/16 | 65,536 | Home and small office networks |

Even the smallest range holds 65,536 addresses, far more than any home needs.

> **Exam tip:** the middle range is the one people get wrong. It runs from 172.**16** to 172.**31** only. An address such as 172.32.0.1 or 172.15.0.1 is public.

### 4.3 Worked example — private or public?

Classify each address by checking it against the three ranges.

| Address | Private? | Reason |
|---|---|---|
| 10.20.30.40 | Private | Anything starting 10 is in 10.0.0.0/8 |
| 172.20.1.5 | Private | Second octet 20 is between 16 and 31 |
| 172.32.0.1 | Public | Second octet 32 is just outside 16 to 31 |
| 192.168.100.1 | Private | Starts 192.168 |
| 192.169.0.1 | Public | 192.169 is not 192.168 |
| 1.1.1.1 | Public | Not in any private range |

The method is always the same: look at the first octet, then the second, and compare with the table. The first two octets settle every case.

> **Note (beyond this lesson):** a few other ranges are not public either. `127.0.0.0/8` is loopback, `169.254.0.0/16` is APIPA (a Windows machine gives itself one of these when DHCP fails), and `100.64.0.0/10` is shared address space that some internet providers use for carrier-grade NAT, meaning your router's "public" address may itself be behind another layer of NAT.

## 5. The IPv6 address

### 5.1 One hundred and twenty-eight bits

Running out of addresses was one of the main problems IPv6 was designed to solve, so it is far larger: **128 bits** instead of 32. That gives 2 to the power 128 addresses, about **340 undecillion** (340 followed by 36 zeros; the exact figure is 340,282,366,920,938,463,463,374,607,431,768,211,456).

> **Correction:** the lesson divides this among about 6.8 billion people, which was the world's population around 2010. The UN-based estimate for 2026 is about 8.3 billion. That still leaves roughly 41 billion billion billion (about 4 x 10 to the power 28) addresses per person, so the point stands.

### 5.2 Hexadecimal groups

Writing 128 bits in dotted decimal would take sixteen numbers, so IPv6 uses **hexadecimal** instead. Each hex digit represents 4 bits. An IPv6 address is written as **eight groups of four hex digits**, separated by colons. Each group is therefore 16 bits (2 octets), and eight groups make 128 bits, or 16 bytes.

```text
      2001:0db8:0000    :     0001     :    5d18:0652:cffd:8f52        
  |<-- site prefix -->|   |< subnet >|   |<---- interface ID --->|     
  |      48 bits      |   | 16 bits  |   |        64 bits        |     
  |<--- network prefix: 64 bits ---->|                                 
                                                                       
  Each group of four hex digits is 16 bits; eight groups make 128 bits.
  A site given a /48 can number 65,536 separate /64 subnets.           
```

### 5.3 Shortening IPv6 addresses

The lesson shows the address `fe80::5d18:652:cffd:8f52` alongside its full form, `fe80:0000:0000:0000:5d18:0652:cffd:8f52`. Two rules turn one into the other.

> **Note (beyond this lesson):** the lesson shows both forms without stating the rules. They are:
> 1. **Drop leading zeros** in any group: `0652` becomes `652`, and `0000` becomes `0`.
> 2. **Replace one run of consecutive all-zero groups with `::`**. You can only do this once in an address, otherwise nobody could tell how many zeros each `::` stands for. If there are two runs, the convention is to compress the longer one (or the first, if they are the same length).

### 5.4 Worked example — shortening and expanding

**Shortening** `2001:0db8:0000:0000:0000:ff00:0042:8329`:

1. Drop leading zeros: `2001:db8:0:0:0:ff00:42:8329`.
2. Replace the run of three zero groups with `::`: `2001:db8::ff00:42:8329`.

**Choosing which run to compress** in `2001:db8:0:1:0:0:0:1`: there is a single zero group (the third) and a run of three (fifth to seventh). Compress the longer run: `2001:db8:0:1::1`.

**Expanding** `fe80::5d18:652:cffd:8f52`:

1. Count the groups you can see: `fe80`, `5d18`, `652`, `cffd`, `8f52`. That is five.
2. An address has eight groups, so `::` stands for three groups of zeros.
3. Pad every group to four digits: `fe80:0000:0000:0000:5d18:0652:cffd:8f52`.

These results were checked with a standard IPv6 library, which produces the same shortened forms.

### 5.5 Not every IPv6 address is global

> **Correction:** the lesson presents `fe80::5d18:652:cffd:8f52` as the kind of address that connects the world over the global internet. Any address starting `fe80` is **link-local**: it only works on the local network segment, and routers never forward it. Globally routable addresses come from a different range.

| Type | Prefix | Starts with | Reach |
|---|---|---|---|
| Global unicast | `2000::/3` | `2` or `3` | The whole internet |
| Link-local | `fe80::/10` | `fe80` | This network segment only; every IPv6 interface has one |
| Loopback | `::1/128` | `::1` | This host only |

> **Note (beyond this lesson):** there are also **unique local addresses** in `fc00::/7` (in practice, addresses starting `fd`), which play a role similar to IPv4's private ranges. The `2001:db8::/32` prefix used in the examples here is reserved for documentation, so it never appears on a real network.

### 5.6 Why DNS matters more with IPv6

Nobody memorises `2001:db8::ff00:42:8329`. With IPv4, people often type addresses directly; with IPv6, you rely on DNS to turn names into addresses. The DNS record for an IPv6 address is the **AAAA** record, the counterpart of IPv4's A record (covered in the 2.4 DNS lesson).

## 6. IPv6 prefixes and subnets

### 6.1 Network prefix and interface ID

An IPv6 address splits neatly in half. The first 64 bits are the **network prefix**, which identifies the network. The last 64 bits are the **interface ID**, which identifies the host on that network. So almost every IPv6 network is written with a **/64** prefix length.

### 6.2 Prefix length, not subnet mask

> **Correction:** the lesson calls /64 "the default subnet mask". IPv6 does not use dotted subnet masks at all; it uses a **prefix length** written after a slash. It also says IPv6 does not need much subnetting. Organisations still subnet IPv6, but differently: a site is typically given a larger block such as a /48 and divides it into /64 networks, one per LAN or VLAN. What disappears is the IPv4 habit of squeezing subnets to fit a certain number of hosts, because every /64 is vast.

### 6.3 Worked example — how big is one /64?

1. A /64 leaves 64 bits for the interface ID.
2. 2 to the power 64 = 18,446,744,073,709,551,616, about 18.4 quintillion addresses.
3. The whole IPv4 internet is 2 to the power 32 addresses.
4. 2 to the power 64 divided by 2 to the power 32 is 2 to the power 32. So **one** IPv6 LAN holds about 4.29 billion times as many addresses as the entire IPv4 internet.
5. A /48 site contains 2 to the power 16 = 65,536 of those /64 networks.

## 7. IPv4 and IPv6 compared

| | IPv4 | IPv6 |
|---|---|---|
| Length | 32 bits (4 bytes) | 128 bits (16 bytes) |
| Written as | Four decimal octets, dotted | Eight groups of four hex digits, colons |
| Example | `192.168.1.131` | `2001:db8::ff00:42:8329` |
| Total addresses | About 4.29 billion | About 340 undecillion |
| Network part shown by | Subnet mask or prefix, e.g. `255.255.255.0` = `/24` | Prefix length, usually `/64` |
| Address shortage | Solved with private ranges and NAT | No shortage; NAT not normally used |
| Loopback | `127.0.0.1` | `::1` |
| Name lookup | A record | AAAA record |

> **In the real world:** most machines have both. On Windows, `ipconfig` lists an IPv4 address and subnet mask alongside at least a link-local IPv6 address (it may end in `%` and a number, the interface index). `Get-NetIPAddress` in PowerShell and `ip addr` on Linux show the same information.

## 8. Security perspective

- **NAT is not a firewall.** NAT blocks unsolicited inbound connections only as a side effect: nothing inside has been told to expect them. Port forwards, UPnP (which lets devices open ports on the router themselves) and any connection started from inside, including malware calling home, pass straight through. You still need firewall rules.
- **IPv6 removes the NAT side effect.** With no NAT, every IPv6 device can have a globally reachable address. A firewall with careful IPv4 rules but no IPv6 rules can leave hosts wide open. Write and test rules for both.
- **Private addresses should never arrive from the internet.** A packet from outside with an RFC 1918 source address is spoofed or misrouted, so edge firewalls should drop it. Seeing private or APIPA addresses in logs where they don't belong is a useful clue.
- **One IPv6 address, many spellings.** `2001:db8::1` and `2001:0db8:0:0:0:0:0:1` are the same address. Blocklists, detection rules and log searches that compare text can miss matches, so normalise addresses to the standard compressed form first.
- **Scanning changes with IPv6.** A /64 is far too big to sweep address by address, so attackers find IPv6 hosts through DNS, logs and neighbour caches instead. That makes DNS records and internal logs more sensitive.
- **Link-local addresses are always there.** Even on a network that "doesn't use IPv6", hosts have `fe80::` addresses and talk IPv6 on the local segment. Monitoring that ignores IPv6 misses that traffic.

## Summary

- IPv4 addresses are 32 bits, written as four decimal octets from 0 to 255, giving about 4.29 billion addresses.
- There are far more devices than IPv4 addresses, so private addresses and NAT let many devices share one public address.
- RFC 1918 private ranges: 10.0.0.0/8 (about 16.7 million), 172.16.0.0/12 (172.16 to 172.31, about 1 million) and 192.168.0.0/16 (65,536).
- IPv6 addresses are 128 bits, written as eight groups of four hex digits, giving about 340 undecillion addresses.
- Shorten IPv6 by dropping leading zeros and replacing one run of zero groups with `::`.
- `fe80::` addresses are link-local only; global addresses start with 2 or 3; `::1` is loopback.
- IPv6 networks normally use a /64 prefix: 64 bits of network, 64 bits of interface ID.
- DNS (AAAA records) matters more with IPv6, and NAT is not a substitute for a firewall on either version.

## Glossary

| Term | Meaning |
|---|---|
| AAAA record | The DNS record that maps a name to an IPv6 address |
| Dotted decimal | IPv4 notation: four decimal numbers separated by dots |
| Global unicast address | A publicly routable IPv6 address, from `2000::/3` |
| Hexadecimal | Base-16 numbering, digits 0 to 9 and a to f; each digit is 4 bits |
| Interface ID | The last 64 bits of an IPv6 address, identifying the host |
| IPv4 | Internet Protocol version 4: 32-bit addresses |
| IPv6 | Internet Protocol version 6: 128-bit addresses |
| Link-local address | An IPv6 address in `fe80::/10`, usable only on the local segment |
| NAT | Network Address Translation: translating private addresses to a public one |
| Network prefix | The network part of an IPv6 address, usually the first 64 bits |
| Octet | A group of 8 bits; one of the four parts of an IPv4 address |
| Prefix length | The number of network bits, written after a slash, such as `/64` |
| Private address | An address from the RFC 1918 ranges, not routed on the internet |
| Public address | A globally unique address that is routed on the internet |
| RFC | Request for Comments: the document series that publishes internet standards and practices |
| RFC 1918 | The document that defines the IPv4 private address ranges |

## Review questions

1. How many bits are in an IPv4 address, and how many octets?
2. Why can no octet in an IPv4 address be greater than 255?
3. Convert 172 to binary.
4. Roughly how many IPv4 addresses are there, and why is that not enough?
5. A company has 800 devices and one public IPv4 address. How can they all reach the internet?
6. List the three RFC 1918 private ranges.
7. Is 172.30.5.9 private or public? What about 172.40.5.9?
8. How many bits are in an IPv6 address, and how is it written?
9. Shorten `2001:0db8:0000:0000:0000:0000:0000:0001`.
10. Expand `fe80::1` to its full form.
11. A technician sees an address starting `fe80` on a server and says it is the server's internet address. What is wrong?
12. In a typical IPv6 address, what do the first 64 bits and the last 64 bits identify?
13. Why does DNS become more important with IPv6?
14. A firewall has strict IPv4 inbound rules but no IPv6 rules. Why is that a problem?

## Answer key

1. **32 bits in four octets.** Each octet is 8 bits.
2. **Eight bits can only hold 256 values, 0 to 255.** 2 to the power 8 is 256.
3. **10101100.** 128 + 32 + 8 + 4 = 172.
4. **About 4.29 billion; there are far more connected devices than that.** 2 to the power 32 is 4,294,967,296.
5. **Give them private addresses and use NAT on the router.** They share the one public address.
6. **10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16.** Defined in RFC 1918.
7. **172.30.5.9 is private; 172.40.5.9 is public.** The private range covers 172.16 to 172.31 only.
8. **128 bits, as eight groups of four hex digits separated by colons.** Each group is 16 bits.
9. **`2001:db8::1`.** Drop leading zeros, then replace the zero run with `::`.
10. **`fe80:0000:0000:0000:0000:0000:0000:0001`.** The `::` stands for six zero groups.
11. **It is a link-local address, which works only on the local segment.** Global addresses start with 2 or 3.
12. **The network (prefix) and the host (interface ID).** Almost every IPv6 network is a /64.
13. **IPv6 addresses are too long to remember, so people rely on names.** DNS AAAA records hold the addresses.
14. **Without NAT, IPv6 hosts may be directly reachable from the internet.** Rules are needed for both versions.
