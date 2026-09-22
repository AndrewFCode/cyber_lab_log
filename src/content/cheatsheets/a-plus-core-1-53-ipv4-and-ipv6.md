---
title: "A+ Core 1 2.6: IPv4 and IPv6"
description: "Professor Messer A+ 220-1201 objective 2.6 — IPv4 octets and binary, RFC 1918 private ranges and NAT, IPv6 hex notation, shortening rules, address types and /64."
tags: ["a-plus", "comptia", "messer", "networking", "ipv4", "ipv6", "nat"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "a-plus-core-1"
module: "IPv4 and IPv6"
moduleOrder: 53
unit: 2
---
> **In one line:** IPv4 is 32 bits in four decimal octets and ran short, so private ranges and NAT share public addresses; IPv6 is 128 bits in eight hex groups, with a /64 network prefix and addresses to spare.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.6 (IPv4 and IPv6).* The full version is the IPv4 and IPv6 class notes; the section overview is the Section 2 sheet.

---

## IPv4 vs IPv6

| | IPv4 | IPv6 |
|---|---|---|
| Length | 32 bits = 4 bytes | 128 bits = 16 bytes |
| Written as | 4 decimal **octets**, dots | 8 groups of 4 **hex** digits, colons |
| Each part | 8 bits, 0–255 | 16 bits, `0000`–`ffff` |
| Example | `192.168.1.131` | `2001:db8::ff00:42:8329` |
| Total addresses | 2³² ≈ 4.29 billion | 2¹²⁸ ≈ 340 undecillion |
| Network part | Subnet mask / prefix (`255.255.255.0` = `/24`) | Prefix length, usually `/64` |
| Shortage fix | Private ranges + NAT | None needed; NAT not normally used |
| Loopback | `127.0.0.1` | `::1` |
| DNS record | A | AAAA |

## IPv4 binary

| Place value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|---|
| 192 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| 168 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| 131 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |

`192.168.1.131` = `11000000.10101000.00000001.10000011`. Decimal → binary: subtract place values left to right. Binary → decimal: add the place values under each 1.

## Private ranges (RFC 1918) and NAT

| Range | CIDR | Addresses | Typical use |
|---|---|---|---|
| 10.0.0.0 – 10.255.255.255 | `10.0.0.0/8` | 16,777,216 | Large corporate |
| 172.16.0.0 – 172.31.255.255 | `172.16.0.0/12` | 1,048,576 | Medium networks |
| 192.168.0.0 – 192.168.255.255 | `192.168.0.0/16` | 65,536 | Home / SOHO |

- **NAT** translates many private addresses to one public address at the router. Home routers also rewrite ports (PAT / NAT overload).
- **Watch the middle range:** only 172.**16**–172.**31** is private; `172.32.0.1` and `172.15.0.1` are public.
- **Not public either:** `127.0.0.0/8` loopback · `169.254.0.0/16` APIPA · `100.64.0.0/10` carrier-grade NAT.
- RFC 1918 is a Best Current Practice (BCP 5), not a formal standard — but universal.

## IPv6 shortening

| Rule | Example |
|---|---|
| Drop leading zeros in a group | `0652` → `652`, `0000` → `0` |
| Replace **one** run of zero groups with `::` | `2001:0db8:0000:0000:0000:ff00:0042:8329` → `2001:db8::ff00:42:8329` |
| Two runs? Compress the longest (first if tied) | `2001:db8:0:1:0:0:0:1` → `2001:db8:0:1::1` |
| Expanding: `::` fills up to 8 groups | `fe80::5d18:652:cffd:8f52` → `fe80:0000:0000:0000:5d18:0652:cffd:8f52` |

## IPv6 address types

| Type | Prefix | Recognise it by | Reach |
|---|---|---|---|
| Global unicast | `2000::/3` | Starts `2` or `3` | Whole internet |
| Link-local | `fe80::/10` | Starts `fe80` | Local segment only; every IPv6 interface has one |
| Unique local | `fc00::/7` | Starts `fd` in practice | Private, like RFC 1918 |
| Loopback | `::1/128` | `::1` | This host |
| Documentation | `2001:db8::/32` | Starts `2001:db8` | Examples only |

The lesson's example `fe80::5d18:652:cffd:8f52` is **link-local**, not a global internet address.

## IPv6 prefix and interface ID

```
      2001:0db8:0000    :     0001     :    5d18:0652:cffd:8f52
  |<-- site prefix -->|   |< subnet >|   |<---- interface ID --->|
  |      48 bits      |   | 16 bits  |   |        64 bits        |
  |<--- network prefix: 64 bits ---->|
```

| Fact | Value |
|---|---|
| Usual LAN prefix | `/64` (a prefix length, not a "subnet mask") |
| Addresses in one /64 | 2⁶⁴ ≈ 18.4 quintillion (2³² × the whole IPv4 internet) |
| /64 subnets in a /48 site | 65,536 |

IPv6 is still subnetted — sites carve a /48 or /56 into /64s — but nobody sizes subnets to fit host counts any more.

## 🔐 Security notes

- **NAT is not a firewall:** port forwards, UPnP and inside-initiated connections (including malware) pass straight through.
- **IPv6 has no NAT side effect:** hosts can be globally reachable, so write and test IPv6 firewall rules, not just IPv4.
- **Drop RFC 1918 sources at the internet edge:** they're spoofed or misrouted.
- **Normalise IPv6 before matching:** `2001:db8::1` = `2001:0db8:0:0:0:0:0:1`; text-based blocklists and log searches miss variants.
- **IPv6 hosts are found via DNS and logs, not sweeps:** a /64 is too big to scan, so protect DNS records and logs.
- **Link-local IPv6 is always on:** even "IPv4-only" networks carry `fe80::` traffic; monitor it.

## Practice drills

<details>
<summary>1. Why can't an IPv4 octet exceed 255?</summary>

Eight bits hold **256 values, 0–255** (2⁸ = 256).
</details>

<details>
<summary>2. Convert 172 to binary.</summary>

**10101100** — 128 + 32 + 8 + 4 = 172.
</details>

<details>
<summary>3. Private or public: 172.30.5.9, 172.40.5.9, 192.169.0.1?</summary>

**Private, public, public.** Only 172.16–172.31 and 192.168.x.x are in the RFC 1918 ranges.
</details>

<details>
<summary>4. How do 800 devices share one public IPv4 address?</summary>

Private addresses inside, and **NAT** (with port translation) on the router.
</details>

<details>
<summary>5. Shorten <code>2001:0db8:0000:0000:0000:0000:0000:0001</code>.</summary>

**`2001:db8::1`**
</details>

<details>
<summary>6. Expand <code>fe80::1</code>.</summary>

**`fe80:0000:0000:0000:0000:0000:0000:0001`** — the `::` stands for six zero groups.
</details>

<details>
<summary>7. A server's address starts <code>fe80</code>. Can the internet reach it on that address?</summary>

**No.** `fe80::/10` is **link-local**: it works only on the local segment. Global addresses start with 2 or 3.
</details>

<details>
<summary>8. In a typical IPv6 address, what do the two 64-bit halves identify?</summary>

The first 64 bits are the **network prefix**; the last 64 are the **interface ID** (the host).
</details>

## Key takeaways

- IPv4: 32 bits, four octets of 0–255, about 4.29 billion addresses.
- Private ranges 10/8, 172.16/12 (16–31 only) and 192.168/16, plus NAT, stretch IPv4.
- IPv6: 128 bits, eight hex groups; shorten with leading-zero removal and one `::`.
- `fe80::` is link-local, `2`/`3` is global, `::1` is loopback.
- IPv6 LANs are /64: 64 bits of network, 64 bits of interface ID.
- NAT is not a firewall, and IPv6 needs its own firewall rules.
