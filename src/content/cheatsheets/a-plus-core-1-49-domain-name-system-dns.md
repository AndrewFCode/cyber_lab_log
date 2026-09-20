---
title: "A+ Core 1 2.4: Domain Name System (DNS)"
description: "Professor Messer A+ 220-1201 objective 2.4 — DNS hierarchy and root servers, dig/nslookup, resource records, A/AAAA, CNAME, MX, TXT, DKIM, SPF and DMARC."
tags: ["a-plus", "comptia", "messer", "networking", "dns"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Domain Name System (DNS)"
moduleOrder: 49
unit: 2
---
> **In one line:** DNS is a distributed, hierarchical database of resource records — know the record types (A/AAAA, CNAME, MX, TXT) and how SPF, DKIM and DMARC together stop email spoofing.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.4 (DNS).* The full version is the DNS class notes; the section overview is the Section 2 sheet.

---

## The hierarchy

```
 root (13 clusters, 1,000+ servers)
   -> TLD (.com, .org, .uk, ~275 country codes)
     -> domain (professormesser.com)
       -> host/subdomain (www, mail, katie.east...)
```

## Query tools

| Tool | Platform | Example |
|---|---|---|
| `dig` | Linux/macOS | `dig www.professormesser.com` |
| `nslookup` | Windows | `nslookup professormesser.com` |
| TXT records | Either | `dig domain.com TXT` / `nslookup -type=txt domain.com` |

**Multiple IPs returned = redundant servers**, not an error.

## Record types

| Record | Maps | Notes |
|---|---|---|
| **A** | Hostname → **IPv4** | `www IN A 162.159.246.164` |
| **AAAA** | Hostname → **IPv6** | "Quad A" |
| **CNAME** | Alias → another name | Change one A record, every CNAME follows |
| **MX** | Domain → mail server **name** | Needs a follow-up A-record lookup for the IP |
| **TXT** | Free text | Verification, SPF, DKIM |
| SOA | Zone authority info | Sits at the top of a config |

**TTL** = how long an answer is cached before re-querying (e.g. 15 min).

## Mail delivery, two lookups

1. **MX** lookup on the recipient's domain → mail server name.
2. **A record** lookup on that mail server name → IP address to deliver to.

## Anti-spoofing trio

| Mechanism | Published as | Says |
|---|---|---|
| **SPF** | TXT | Which servers **may send** mail for this domain |
| **DKIM** | TXT (`v=DKIM`) | **Public key** to verify a message's digital signature (private key stays on the mail server) |
| **DMARC** | TXT | What to do if SPF/DKIM **fail** — accept / **quarantine** / **reject** — plus a reporting address |

```
 Sender publishes SPF + DKIM key + DMARC policy
 Receiver checks SPF -> checks DKIM signature -> applies DMARC policy on failure -> reports back
```

---

## 🔐 Security notes

- **Always back up before changing DNS** — one bad record can take a service offline.
- **Short TTL** = fast propagation, more queries. **Long TTL** = less load, slower to fix (or slower for an attacker's change to spread).
- **SPF alone, DKIM alone, or DMARC alone is weaker** — they close different gaps; use all three.
- **No DMARC record = easy to spoof convincingly**, since receivers have no policy to enforce.
- **Protect the DKIM private key** — a leak lets an attacker forge validly signed mail until it's rotated.
- **Check SPF/DKIM/DMARC results first** on a suspected phishing message.

---

## Practice drills

<details>
<summary>1. dig returns three IPs for a web server. Why?</summary>

Redundant web servers — any of the three can be used if one becomes unavailable.
</details>

<details>
<summary>2. What's the difference between an A record and a CNAME?</summary>

A points a name directly to an IP address; a CNAME points a name to another name (an alias).
</details>

<details>
<summary>3. Why does changing a server's IP address only require updating one record, even if it answers to four names?</summary>

The four names are CNAMEs pointing at one A record — update that record, and every CNAME follows.
</details>

<details>
<summary>4. Describe both DNS lookups needed to deliver mail to a domain.</summary>

Look up the domain's MX record to get the mail server's name, then look up that name's A record to get its IP address.
</details>

<details>
<summary>5. A domain's SPF record doesn't list the server a message came from. What does that suggest?</summary>

The message likely didn't come from a legitimate server for that domain.
</details>

<details>
<summary>6. Where is DKIM's public key stored, and where is the private key?</summary>

Public key in a DNS TXT record; private key on the sending mail server.
</details>

<details>
<summary>7. A DMARC record specifies "quarantine". What happens to a message that fails SPF and DKIM?</summary>

It's placed in the recipient's spam/quarantine folder rather than delivered normally or rejected outright.
</details>

---

## Key takeaways

- **DNS = distributed, hierarchical:** root → TLD → domain → host.
- **`dig`** (Linux/macOS) and **`nslookup`** (Windows) query it directly.
- **A/AAAA** = name→IP (v4/v6); **CNAME** = name→name; **MX** = domain→mail server name; **TXT** = free text.
- **TTL** controls caching duration.
- **Mail delivery** = MX lookup, then A-record lookup.
- **SPF** (who may send) + **DKIM** (signature verification) + **DMARC** (policy + reporting) together fight spoofing.
- **Always back up before editing DNS.**
