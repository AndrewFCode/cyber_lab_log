---
title: "A+ Core 1 2.3: Network Services"
description: "Professor Messer A+ 220-1201 objective 2.3 — DNS, DHCP, file/print sharing, email, syslog/SIEM, web, AAA, database, NTP, spam gateway, UTM, load balancer, proxy, SCADA/ICS, legacy, embedded and IoT."
tags: ["a-plus", "comptia", "messer", "networking", "servers", "scada", "iot"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Network Services"
moduleOrder: 48
unit: 2
---
> **In one line:** every data centre runs a common set of services — naming, addressing, sharing, security, monitoring and control — and knowing what each does is core troubleshooting knowledge.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.3 (network services).* The full version is the Network Services class notes; the section overview is the Section 2 sheet.

---

## The services

| Service | Does | Key facts |
|---|---|---|
| **DNS** | Name → IP address (and reverse) | Distributed, load split by domain, often cached |
| **DHCP** | Auto-assigns IP config | Enterprises run **multiple** for redundancy |
| **File sharing** | Central storage | **SMB** (Windows), **AFP** (macOS) — hidden behind the OS UI |
| **Print service** | Queues and manages print jobs | Protocols: **SMB, IPP, LPD** |
| **Email server** | Sends/receives mail | **Very high uptime** expectation |
| **Syslog → SIEM** | Centralise and correlate logs | SIEM = **Security Information and Event Manager**; needs lots of storage |
| **Web server** | Serves pages | HTTP/HTTPS, pages built in **HTML** |
| **AAA / authentication server** | Checks credentials, grants access | AAA = Authentication, Authorization, Accounting; **redundant** (everything depends on it) |
| **Database server** | Stores relational tables | Queried with **SQL** (MS SQL Server, MySQL…) |
| **NTP** | Keeps clocks accurate | Matters for **log correlation** and **encryption** |
| **Spam gateway** | Filters unwanted email | Not 100% accurate |
| **UTM / next-gen firewall / web security gateway** | All-in-one edge security | URL filtering, malware scan, spam filter, firewall, IPS, bandwidth shaping, VPN |
| **Load balancer** | Spreads traffic across servers | Auto-detects and routes around a failed server |
| **Proxy server** | Requests on the client's behalf | Security, access control, caching, content scanning |
| **SCADA / ICS** | Remote control of industrial equipment | Needs a **fully segmented** network |
| **Legacy system** | Old but still running | Often still critical — that's often *why* it's still there |
| **Embedded system** | Purpose-built device | **No direct OS access**; manufacturer supports it |
| **IoT device** | Networked smart devices | Vendors often weak on security → **segment its network** |

## Load balancer failover

1. Requests spread evenly across a server farm.
2. A server fails → load balancer **removes it from rotation** automatically.
3. Remaining servers absorb the load.
4. Server is fixed → load balancer **detects and resumes** sending traffic.
5. **Users typically never notice.**

## Proxy server flow

Client → **proxy** (on the client's behalf) → service → response evaluated by proxy → forwarded to client, if safe.

---

## 🔐 Security notes

- **Redundant authentication servers are essential** — a single point of failure there blocks access to everything.
- **SIEM correlation is how multi-system attacks get noticed** — not just storage, a detection tool.
- **Accurate time (NTP)** underpins both log investigations and many encryption protocols.
- **A proxy/UTM only protects what's forced through it** — bypasses (e.g. a personal hotspot) undermine the control.
- **Segment what you can't fully secure directly:** SCADA/ICS and IoT share this exact lesson.
- **Legacy and embedded systems** often can't be patched normally — isolate and monitor them.

---

## Practice drills

<details>
<summary>1. Which service resolves professormesser.com to an IP address, and how is its load spread?</summary>

DNS — load is distributed primarily by which domain names a group of servers supports.
</details>

<details>
<summary>2. Why does an enterprise run more than one DHCP server?</summary>

Redundancy — if one is unavailable, others still hand out addresses.
</details>

<details>
<summary>3. A user maps a network drive on Windows and shares files on a Mac. Which two protocols are likely at work?</summary>

SMB (Windows) and AFP (macOS).
</details>

<details>
<summary>4. What's the difference between syslog and a SIEM?</summary>

Syslog is the protocol that sends logs to a central point; the SIEM is the server that consolidates and correlates them.
</details>

<details>
<summary>5. One web server in a farm crashes. What does the load balancer do?</summary>

Detects the failure, removes the server from rotation, and spreads the load across the rest — automatically restoring it once it's healthy again.
</details>

<details>
<summary>6. Why are SCADA/ICS networks usually completely segmented?</summary>

They control valuable, often critical physical equipment, so unauthorised remote access must be very hard to achieve.
</details>

<details>
<summary>7. Why should IoT devices go on their own network segment?</summary>

Their manufacturers are often not network-security experts, so isolating them limits the blast radius of a compromise.
</details>

---

## Key takeaways

- **DNS** (name→IP, distributed/cached) and **DHCP** (auto IP config, redundant) are foundational.
- **File/print sharing:** SMB/AFP, IPP/LPD — hidden behind the OS.
- **Email needs high uptime; syslog + SIEM centralise and correlate logs.**
- **Web = HTTP/HTTPS + HTML. AAA = auth, authorization, accounting — always redundant.**
- **Database servers** use relational tables and **SQL**. **NTP** keeps time accurate for logs and encryption.
- **Spam gateway, UTM, load balancer, proxy** each defend or scale services in a distinct way.
- **SCADA/ICS, legacy, embedded and IoT** all share one theme: isolate what's hard to secure directly.
