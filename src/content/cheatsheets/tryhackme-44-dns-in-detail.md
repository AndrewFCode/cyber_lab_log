---
title: "TryHackMe 6: DNS in Detail"
description: "TryHackMe module 6 — TLD/SLD/subdomain structure, A/AAAA/CNAME/MX/TXT records, and the DNS resolution journey with TTL caching."
tags: ["tryhackme", "dns", "domains", "dns-records", "name-resolution"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "tryhackme"
module: "DNS in Detail"
moduleOrder: 44
unit: 6
---

> **In one line:** DNS turns domain names into IP addresses by walking local cache → recursive resolver → root → TLD → authoritative server, and a domain name itself breaks into TLD / second-level domain / subdomain, each record type (A, AAAA, CNAME, MX, TXT) answering a different kind of question.

*Companion to: TryHackMe Pre Security, Module 6.* The full version is the DNS in Detail class notes; the module overview is the TryHackMe module sheet.

## Domain name anatomy

```
jupiter . servers . tryhackme . com
   |          |          |       |
subdomain  subdomain  2nd-level TLD
```

| Part | Rules |
| --- | --- |
| TLD | Rightmost part; **gTLD** = purpose (.com/.org/.edu/.gov), **ccTLD** = geography (.ca/.co.uk); 2,000+ exist |
| Second-level domain | Max **63 chars**, a-z/0-9/hyphens, no leading/trailing/double hyphens |
| Subdomain(s) | Same char rules per segment; chainable; **whole name ≤ 253 chars**; unlimited count |

## Record types

| Record | Resolves to | Note |
| --- | --- | --- |
| **A** | IPv4 address | e.g. `104.26.10.229` |
| **AAAA** | IPv6 address | e.g. `2606:4700:20::681a:be5` |
| **CNAME** | Another domain name | Needs a **further lookup** to reach an actual IP |
| **MX** | Mail server(s), with **priority** | Priority enables failover to a backup server |
| **TXT** | Free text | SPF/DKIM/DMARC, domain-ownership verification |

## Resolution path

```
local cache -> recursive DNS server (own cache) -> root servers
  -> TLD server -> authoritative server (nameserver) -> answer
  cached back along the way
```

- **Root servers:** refer to the right **TLD server**.
- **TLD server:** refers to the domain's **authoritative server(s)**.
- **Authoritative server / nameserver:** actually stores and answers with the record; domains have **multiple** for redundancy.
- **TTL:** seconds a record can be cached before a fresh lookup is required.

## 🔐 Security notes

- **DNS is plaintext by default** — observable lookups leak browsing activity; DoH/DoT exist to encrypt it.
- **Cache poisoning:** a false answer injected into a resolver's cache redirects everyone using it until the TTL expires.
- **TXT records show email-security posture:** missing/weak SPF/DKIM/DMARC makes a domain easier to spoof in phishing.
- **Dangling CNAMEs enable subdomain takeover:** a CNAME left pointing at a deprovisioned service can be claimed by an attacker.
- **Nameserver/registrar accounts are high-value:** compromising DNS management redirects an entire domain (mail, web, everything) at once.

## Practice drills

<details>
<summary>1. Identify the TLD, SLD and subdomain in mail.example.co.uk.</summary>

TLD: .co.uk; second-level domain: example; subdomain: mail.
</details>

<details>
<summary>2. gTLD vs ccTLD?</summary>

gTLD historically signals purpose (.com, .org, .edu); ccTLD signals geography (.ca, .co.uk).
</details>

<details>
<summary>3. A record vs AAAA record?</summary>

A resolves to an IPv4 address; AAAA resolves to an IPv6 address.
</details>

<details>
<summary>4. Why might a CNAME need a second DNS lookup?</summary>

It points to another domain name, not an IP address directly — that name then needs its own A/AAAA lookup.
</details>

<details>
<summary>5. What's the MX priority value for?</summary>

It tells a sending mail system which server to try first, enabling fallback to a backup.
</details>

<details>
<summary>6. List the DNS resolution path in order (nothing cached).</summary>

Local cache → recursive DNS server → root servers → TLD server → authoritative server.
</details>

<details>
<summary>7. What is a TTL?</summary>

The number of seconds a record may be cached before it must be looked up again.
</details>

## Key takeaways

- **Domain anatomy:** TLD (rightmost) → second-level domain → subdomain(s), each with character/hyphen rules, whole name ≤ 253 chars.
- **Records:** A/AAAA = addresses, CNAME = another name (extra hop), MX = mail + priority, TXT = free text (SPF/DKIM/DMARC).
- **Resolution path:** local cache → recursive resolver → root → TLD → authoritative server, caching back along the way.
- **TTL controls caching duration** — efficiency, but also a spoofing/poisoning consideration.
- **Security:** DNS leaks activity in plaintext, dangling CNAMEs enable takeover, and TXT records reveal email-security posture.
