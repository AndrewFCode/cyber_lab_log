---
title: "A+ Core 1 2.4: Dynamic Host Configuration Protocol (DHCP)"
description: "Professor Messer A+ 220-1201 objective 2.4 — why DHCP exists, the DORA process with exact packet fields, scopes, pools and exclusions, and DHCP reservations."
tags: ["a-plus", "comptia", "messer", "networking", "dhcp"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Dynamic Host Configuration Protocol (DHCP)"
moduleOrder: 50
unit: 2
---
> **In one line:** DHCP automates IP configuration through a four-step broadcast exchange (DORA), drawing from a scope's pool of addresses — with exclusions for statically configured devices and reservations for ones that need a fixed address.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.4 (DHCP).* The full version is the DHCP class notes; the section overview is the Section 2 sheet.

---

## DORA — every step is a broadcast

```
 Client (no IP)                          DHCP server
     |--- 1. DISCOVER (src 0.0.0.0, UDP 68) -------->|
     |<-- 2. OFFER (broadcast 255.255.255.255) -------|
     |--- 3. REQUEST (src 0.0.0.0 -> UDP 67) -------->|
     |<-- 4. ACK (broadcast: it's yours) -------------|
   Client's IP is updated only now, after step 4
```

| Step | Meaning | Sent by |
|---|---|---|
| **D**iscover | "Any DHCP servers out there?" | Client, broadcast |
| **O**ffer | "You can have this address" | Server, broadcast (may be several, from several servers) |
| **R**equest | "I'll take that one" | Client, broadcast |
| **A**cknowledge | "It's yours for the lease" | Server, broadcast |

**Why broadcast throughout:** the client has **no usable IP address** until the process finishes, so nothing can be addressed to it directly.

## Scope, pool, exclusion, reservation

| Term | Meaning |
|---|---|
| **Scope** | A DHCP server's full configuration for a subnet: address range, exclusions, subnet mask, lease duration, DNS/gateway options |
| **Pool** | The addresses actually available for **dynamic** assignment within a scope |
| **Exclusion** | An address inside the range that's **never** handed out (e.g. a statically configured router) — can sit anywhere in the pool, not just the edges |
| **Reservation** | A specific **MAC address** always gets a specific **IP address** — configured once, centrally, on the DHCP server |

**Worked example (home router):** pool `192.168.1.2`–`.254`; reservations tie **Prometheus → .6** and **Odyssey → .9** by MAC address; everyone else gets the next free address from the pool.

---

## 🔐 Security notes

- **DHCP has no built-in authentication** — a **rogue DHCP server** can hand out a malicious gateway or DNS server. **DHCP snooping** on managed switches only trusts replies from approved ports.
- **DHCP traffic is broadcast**, so it's visible (and spoofable) to everyone on the local segment.
- **Reservation config is worth protecting** — it controls which device gets which address.
- **Lease duration is a trade-off:** short leases recycle addresses fast (good for guest Wi-Fi); long leases mean less renewal traffic but slower recovery of stale addresses.

---

## Practice drills

<details>
<summary>1. What source IP does a DHCP Discover use, and why?</summary>

0.0.0.0 — the device has no IP address yet.
</details>

<details>
<summary>2. Why is the DHCP Offer broadcast instead of sent directly to the client?</summary>

The client still has no usable IP address to be addressed to directly.
</details>

<details>
<summary>3. At which DORA step does the client finally update its own IP configuration?</summary>

Step 4 — Acknowledge.
</details>

<details>
<summary>4. A router already uses 192.168.1.1 statically. How do you stop DHCP handing it out?</summary>

Add it as an exclusion within the scope.
</details>

<details>
<summary>5. A file server must always get the same IP address without being manually configured. What do you use?</summary>

A DHCP reservation, tied to the server's MAC address.
</details>

<details>
<summary>6. Can an exclusion sit in the middle of a pool's address range?</summary>

Yes — exclusions aren't limited to the start or end of the range.
</details>

<details>
<summary>7. Why is a rogue DHCP server dangerous?</summary>

It can hand out a false gateway or DNS server, silently redirecting network traffic.
</details>

---

## Key takeaways

- **DHCP (1997)** replaced manual IP configuration at scale.
- **DORA:** Discover → Offer → Request → Acknowledge, all broadcast; the client's config only updates after the final Ack.
- **Scope** = full subnet config; **pool** = addresses available for dynamic assignment; **exclusion** = an address in-range that's never handed out; **reservation** = a fixed IP tied to a MAC address.
- **No authentication in DHCP** → rogue servers are a real risk; DHCP snooping defends against it.
