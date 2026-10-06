---
title: "TryHackMe 6: DNS in Detail — Class Notes"
description: "Full class notes for TryHackMe module 6: domain structure (TLD/SLD/subdomain), A/AAAA/CNAME/MX/TXT records, and the DNS resolution journey."
tags: ["class-notes", "tryhackme", "dns", "domains", "dns-records", "name-resolution"]
draft: false
pubDate: 2026-09-27
---

**Class notes · TryHackMe Pre Security · Module 6**

> **Quick reference:** the short version of this lesson lives in the
> [TryHackMe resource sheets](/cyber_lab_log/resources/tryhackme/6/). This follows Module 5
> (Networking), and goes deeper into one piece of that picture: how a domain
> name actually turns into an IP address.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what DNS does and why it exists.
2. Break a domain name down into its TLD, second-level domain and subdomain
   parts, including naming rules.
3. Identify the purpose of the A, AAAA, CNAME, MX and TXT record types.
4. Walk through the full journey of a DNS lookup, from local cache to
   authoritative server.
5. Explain what a TTL is and why caching matters.

## 1. What DNS does

Every device on the internet has a unique numeric address, an **IP address**,
used to actually locate and communicate with it — something like
`104.26.10.229`: four numbers from **0 to 255**, separated by periods. Numbers
like that are precise but hard for a person to remember, which is exactly the
problem the **Domain Name System (DNS)** solves. Rather than memorising an IP
address, you remember a **name** — `tryhackme.com` — and DNS handles turning
that name back into the address a computer actually needs.

> **In the real world:** the analogy the lesson leans on is a street address:
> just as every house has a unique address for mail to find it, every device
> online has a unique IP address, and DNS is the "directory" that looks a name
> up and returns the matching address.

## 2. The parts of a domain name

A domain name is built from several pieces, read right to left.

### 2.1 Top-Level Domain (TLD)

The **TLD** is the right-most part of the name — in `tryhackme.com`, that is
`.com`. There are two broad kinds:

- **gTLD (generic Top-Level Domain).** Historically meant to signal *purpose*:
  `.com` for commercial use, `.org` for organisations, `.edu` for education,
  `.gov` for government.
- **ccTLD (country code Top-Level Domain).** Meant to signal *geography*: `.ca`
  for Canada, `.co.uk` for the United Kingdom, and so on.

Demand for domain names has pushed a large expansion of newer gTLDs — `.online`,
`.club`, `.website`, `.biz` among many others — and there are now **over 2,000**
TLDs in total.

### 2.2 Second-Level Domain (SLD)

Immediately to the left of the TLD is the **second-level domain** — in
`tryhackme.com`, that is `tryhackme`. When registering one, it is limited to
**63 characters** (not counting the TLD) and can only use **a–z, 0–9, and
hyphens** — it cannot **start or end** with a hyphen, and cannot contain
**consecutive** hyphens.

### 2.3 Subdomain

A **subdomain** sits to the **left** of the second-level domain, separated by a
period — in `admin.tryhackme.com`, `admin` is the subdomain. The same naming
rules apply (63 characters, a–z/0–9/hyphens, no leading/trailing or doubled
hyphens), and you can **chain several subdomains** together, as in
`jupiter.servers.tryhackme.com`. The one extra limit is on the **whole name**:
it must stay at **253 characters or fewer**. There is **no limit** on how many
subdomains a domain can have.

```
Anatomy of a domain name:

  jupiter . servers . tryhackme . com
     |         |          |        |
  subdomain subdomain  2nd-level  TLD
  (further  (further    domain
   left)     left)
```

## 3. DNS record types

DNS is not only used for websites, and several distinct **record types** exist
to answer different kinds of question. The common ones:

| Record | Resolves to | Example |
| --- | --- | --- |
| **A** | An **IPv4** address | `104.26.10.229` |
| **AAAA** | An **IPv6** address | `2606:4700:20::681a:be5` |
| **CNAME** | Another **domain name** | `store.tryhackme.com` -> `shops.shopify.com` |
| **MX** | A mail server for the domain, with a **priority** | `alt1.aspmx.l.google.com` |
| **TXT** | Arbitrary **text** data | SPF/DKIM/DMARC entries, ownership tokens |

A few points worth expanding:

- **CNAME** does not itself give you an IP address — it points to **another
  name**, which then needs its **own** lookup (for an A or AAAA record) to
  finally resolve to an address. Looking up `store.tryhackme.com`, for
  instance, could return the CNAME `shops.shopify.com`, and a second DNS
  request against *that* name would be needed to get an actual IP.
- **MX** records carry a **priority** value alongside the mail server address,
  telling a sending mail system which server to try **first** — useful for
  falling back to a **backup** mail server if the primary one is unreachable.
- **TXT** records are free-form text and get used for several unrelated
  purposes: listing which servers are authorised to send mail for a domain
  (helping fight spam and spoofing), proving domain ownership to a third-party
  service, and other verification or policy statements. The shape of a TXT
  record varies entirely by what it is being used for.

> **Note (beyond this lesson):** the SPF, DKIM and DMARC email-authentication
> mechanisms referenced by some TXT records are each a substantial topic on
> their own — they define how a receiving mail server checks whether a message
> claiming to be from a domain is legitimate. This lesson only introduces TXT
> records as a general-purpose text field; SPF/DKIM/DMARC mechanics are not
> explained here.

## 4. The journey of a DNS request

Resolving a domain name to an address follows a defined path, checked at each
stage before moving to the next:

```
DNS resolution path:

  1. Local cache on your device
        | not found
        v
  2. Recursive DNS server (often your ISP's, or one you chose)
     - checks its own cache first
        | not found
        v
  3. Root DNS servers
     - point you to the right TLD server
        v
  4. TLD server (e.g. the .com servers)
     - point you to the domain's authoritative server(s)
        v
  5. Authoritative server (the domain's nameserver)
     - holds and returns the actual DNS record
        |
        v
  Answer flows back through the recursive server (cached there too)
  to your device, and is cached locally as well.
```

1. **Local cache.** Your own computer checks whether it has already looked this
   name up recently. If so, the answer is used immediately and nothing further
   happens.
2. **Recursive DNS server.** If there is no local answer, your device asks a
   **recursive DNS server** — usually supplied by your ISP, though you can
   choose a different one. This server keeps its **own cache** of recently
   resolved names too. If the recursive server already has the answer cached
   (common for very popular sites), it returns that immediately, and the
   lookup ends there.
3. **Root DNS servers.** If nothing is cached anywhere, the recursive server
   begins a fresh lookup, starting with the internet's **root DNS servers** —
   effectively the backbone of the whole system. The root server's job is to
   point the request toward the correct **TLD server** based on the TLD in the
   name being looked up (`.com`, in the `tryhackme.com` example).
4. **TLD server.** The relevant TLD server (the one handling `.com`, in this
   example) holds records pointing to the **authoritative server(s)** for the
   specific domain being resolved — it does not hold the final answer itself,
   only the referral to who does.
5. **Authoritative server.** Also called the domain's **nameserver**, this is
   the server actually **responsible for storing** that domain's DNS records
   and where any updates to those records are made. It returns the requested
   record. Domains commonly have **multiple** nameservers configured, so a
   backup is available if one goes down.

Once the authoritative server answers, the record travels back through the
**recursive DNS server**, which **caches** a local copy for next time, and then
on to the original client, which caches it too.

## 5. TTL and caching

Every DNS record carries a **TTL (Time To Live)** — a number of **seconds**
telling any resolver or client how long it may keep and reuse that answer
before it needs to look it up again. Caching at multiple points along the path
(your device, the recursive server) means most repeated requests never need to
walk the full root -> TLD -> authoritative chain, which would otherwise be
needed **every single time** you contacted a server by name.

### 5.1 Worked example — tracing a fresh lookup for `admin.example.com`

Assume nothing is cached anywhere yet.

1. **Local cache:** empty — miss.
2. **Recursive DNS server:** also empty for this name — miss, so it starts a
   full lookup.
3. **Root servers:** the recursive server asks a root server, which sees the
   TLD `.com` and refers it to the `.com` TLD servers.
4. **TLD server:** the `.com` TLD server does not know the final answer, but it
   knows which nameservers are **authoritative** for `example.com`, and refers
   the recursive server there.
5. **Authoritative server:** `example.com`'s nameserver holds the actual A
   record for `admin.example.com` and returns it, along with its **TTL**.
6. **Caching and return:** the recursive server caches that answer for the
   duration of the TTL, then relays it back to the original client, which
   caches it locally too.

A **second** request for `admin.example.com`, made before the TTL expires, would
be answered straight from the **local cache** — step 1 — with no network
lookup at all.

## 6. Security perspective

DNS sits underneath almost everything else on a network, which makes it a
favourite target and a valuable place to look for trouble:

- **DNS is plaintext by default.** A standard DNS lookup travels unencrypted,
  so anyone able to observe the traffic can see which domains a device is
  resolving — a real privacy leak, and one of the reasons **DNS over HTTPS
  (DoH)** and **DNS over TLS (DoT)** exist, to encrypt that traffic.
- **Caching is also a spoofing target.** Because recursive resolvers cache
  answers to avoid repeating the full lookup chain, an attacker who can inject
  a **false answer** into a resolver's cache (DNS cache poisoning) can
  redirect anyone using that resolver to the wrong address until the TTL
  expires — which is exactly why TTL values and cache integrity matter for
  defenders, not just performance.
- **TXT records reveal defensive posture — or its absence.** SPF, DKIM and
  DMARC entries (all delivered as TXT records) tell you how seriously a domain
  is fighting email spoofing; a domain with no such records, or a permissive
  SPF/DMARC policy, is easier to impersonate convincingly in a phishing
  campaign. Checking a domain's TXT records is a quick, low-effort step in
  assessing its email-security posture.
- **CNAME chains create "dangling" risk.** If a CNAME points at a service
  (a cloud storage bucket, a SaaS subdomain) that is later **deprovisioned**
  while the CNAME record is left in place, an attacker can sometimes claim
  that now-unused resource and effectively take over the subdomain — a real
  class of vulnerability called **subdomain takeover**.
- **Nameservers are high-value targets.** Because the authoritative server is
  where a domain's records are actually stored and changed, compromising the
  account that manages a domain's DNS (at the registrar, or the DNS provider)
  lets an attacker redirect an entire domain — email, website, everything —
  without touching any of the domain's own infrastructure directly.

## Summary

- **DNS** translates human-friendly domain names into the numeric **IP
  addresses** computers actually use to communicate.
- A domain name breaks into a **TLD** (rightmost, e.g. `.com`; gTLD = purpose,
  ccTLD = geography), a **second-level domain** (the registered name, max 63
  characters, a-z/0-9/hyphens), and an optional **subdomain** (or chain of
  subdomains) to the left, with the whole name capped at **253 characters**.
- Key record types: **A** (IPv4), **AAAA** (IPv6), **CNAME** (points to another
  domain name, needing a further lookup), **MX** (mail server, with a
  **priority** for failover), and **TXT** (free text — SPF/verification/
  policy uses).
- A DNS lookup checks, in order: **local cache -> recursive DNS server (and
  its cache) -> root servers -> TLD server -> authoritative server (the
  nameserver)**, with the answer cached along the way back.
- Every record has a **TTL**, in seconds, controlling how long it can be
  cached before a fresh lookup is required.

## Glossary

| Term | Meaning |
| --- | --- |
| DNS | Domain Name System; translates domain names to IP addresses. |
| IP address | A device's numeric address on the network. |
| TLD | Top-Level Domain; the rightmost part of a domain name. |
| gTLD | Generic TLD, historically signalling purpose (.com, .org). |
| ccTLD | Country-code TLD, signalling geography (.ca, .co.uk). |
| Second-level domain (SLD) | The registered name directly left of the TLD. |
| Subdomain | A name segment to the left of the second-level domain. |
| A record | DNS record resolving to an IPv4 address. |
| AAAA record | DNS record resolving to an IPv6 address. |
| CNAME record | DNS record pointing to another domain name. |
| MX record | DNS record identifying a domain's mail server(s) and priority. |
| TXT record | Free-text DNS record, used for SPF/verification/policy. |
| Recursive DNS server | The server your device asks; performs the full lookup. |
| Root DNS servers | Top of the DNS hierarchy; refer requests to TLD servers. |
| TLD server | Refers requests to the domain's authoritative server. |
| Authoritative server / nameserver | Stores and answers for a domain's actual records. |
| TTL | Time To Live; seconds a record may be cached before re-lookup. |

## Review questions

1. What problem does DNS solve?
2. Identify the TLD, second-level domain and subdomain in
   `mail.example.co.uk`.
3. What is the difference between a gTLD and a ccTLD?
4. State the naming rules for a second-level domain.
5. What additional limit applies to a full domain name with subdomains, beyond
   the per-segment character limit?
6. What does an A record resolve to, and what does an AAAA record resolve to?
7. Why might resolving a CNAME record require a second DNS lookup?
8. What is the priority value on an MX record for?
9. Give two different uses of a TXT record.
10. List, in order, the stages a DNS request passes through when nothing is
    cached anywhere.
11. What does the root DNS server actually do in that chain?
12. What is the authoritative server responsible for, and why do domains
    usually have more than one?
13. What is a TTL, and why does caching matter?
14. Scenario: two requests for the same domain are made five seconds apart, and
    the record's TTL is 300 seconds. Where does the second request get its
    answer from, and why?
15. Scenario: a CNAME record still points to a cloud storage subdomain that was
    deleted months ago. What security risk does this create?

## Answer key

1. **It lets people use memorable domain names instead of numeric IP
   addresses.** Human-friendly naming.
2. **TLD: .co.uk; second-level domain: example; subdomain: mail.** Reading
   right to left.
3. **gTLD historically signals purpose (.com, .org, .edu); ccTLD signals
   geography (.ca, .co.uk).** Purpose vs place.
4. **Up to 63 characters, using a-z, 0-9 and hyphens only, no leading/trailing
   hyphen, no consecutive hyphens.** Registration constraints.
5. **The full domain name (including all subdomains) must be 253 characters or
   fewer.** An overall length cap.
6. **A resolves to an IPv4 address; AAAA resolves to an IPv6 address.** Address
   family distinction.
7. **Because a CNAME points to another domain name, not an IP address directly
   — that name then needs its own A/AAAA lookup.** An extra hop.
8. **It tells a sending mail system which mail server to try first, enabling
   fallback to a backup server.** Ordered mail-server preference.
9. **Listing authorised mail-sending servers (anti-spoofing) and verifying
   domain ownership for a third-party service — any two.** Flexible text
   field, many uses.
10. **Local cache -> recursive DNS server (and its cache) -> root servers ->
    TLD server -> authoritative server.** The full resolution path.
11. **It refers the request to the correct TLD server based on the domain's
    TLD.** A signpost, not the final answer.
12. **It stores and answers for the domain's actual DNS records (where updates
    are made); multiple nameservers exist as a backup if one is unreachable.**
    The definitive source, made redundant.
13. **A TTL is the number of seconds a record may be cached before it must be
    looked up again; caching avoids repeating the full lookup chain on every
    request.** Efficiency through caching.
14. **From the local cache, since five seconds is well within the 300-second
    TTL — no new lookup is needed.** Still within the cache window.
15. **Subdomain takeover — an attacker could claim the now-unused cloud
    resource and effectively control content served from that subdomain.**
    A dangling-CNAME vulnerability.
