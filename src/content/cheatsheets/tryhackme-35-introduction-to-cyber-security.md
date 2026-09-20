---
title: "TryHackMe: Introduction to Cyber Security"
description: "Pre Security module 1 — what cyber security is, offensive vs defensive work, core terms, career paths, and staying on the right side of the law."
tags: ["tryhackme", "cyber-security", "careers"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tryhackme"
module: "Module 1"
moduleOrder: 35
unit: 1
---
> **In one line:** cyber security is protecting systems and data — attackers look for the weak spot, defenders find and fix it first, and both need permission and method.

*Companion to: TryHackMe Pre Security (2026 path), module 1.*

> ⚠ Built from the module's topic outline — room names and room-specific details aren't listed. Cross-check against your notes.

---

## Core terms

| Term | Meaning |
|---|---|
| Asset | Anything worth protecting — data, systems, people, reputation |
| Vulnerability | A weakness: an unpatched bug, a weak password, a misconfiguration |
| Threat | Something that could exploit a vulnerability — a criminal group, malware, an insider |
| Exploit | The method or code that takes advantage of a vulnerability |
| Risk | Likelihood × impact of a threat exploiting a vulnerability |
| Attack surface | Every point where an attacker could get in |

### The CIA triad

| Principle | Protects against | Example control |
|---|---|---|
| **C**onfidentiality | Unauthorised disclosure | Encryption, access control |
| **I**ntegrity | Unauthorised change | Hashing, digital signatures, change control |
| **A**vailability | Disruption | Backups, redundancy, DDoS protection |

---

## Offensive vs defensive

| | Offensive (red) | Defensive (blue) |
|---|---|---|
| Goal | Find weaknesses before criminals do | Prevent, detect and respond to attacks |
| Typical work | Penetration tests, red team exercises, bug bounties | SOC monitoring, incident response, threat hunting, hardening |
| Output | A report of findings and fixes | Alerts triaged, incidents contained, lessons applied |
| Key rule | **Written permission and an agreed scope** | Visibility — you can't defend what you can't see |

**Purple teaming** = red and blue working together, so every simulated attack turns into a tested detection.

---

## Defensive building blocks

| Term | What it is |
|---|---|
| SOC | Security operations centre — the team watching alerts around the clock |
| SIEM | Collects and correlates logs from across the organisation (Splunk, Microsoft Sentinel, Wazuh, Elastic) |
| EDR | Endpoint detection and response — watches and acts on each machine |
| IDS / IPS | Detects / blocks suspicious network traffic |
| Threat intelligence | Knowledge of attackers' tools, infrastructure and behaviour |
| DFIR | Digital forensics and incident response — what happened, and how to clean up |

---

## Tools you'll meet later

| Tool | Side | Purpose |
|---|---|---|
| Nmap | Both | Discover hosts, open ports and services |
| Wireshark | Both | Capture and inspect network traffic |
| Burp Suite | Offensive | Intercept and modify web traffic |
| Gobuster | Offensive | Find hidden web directories and files |
| Wazuh / Splunk | Defensive | SIEM — search and alert on logs |

---

## Careers

| Role | Day to day | Typical route in |
|---|---|---|
| SOC analyst | Triage alerts, investigate, escalate | Help desk / IT support → SOC Tier 1 |
| Incident responder | Contain and recover from attacks | SOC experience |
| Penetration tester | Authorised attacks on systems and apps | IT or dev background plus offensive training |
| Red teamer | Long, stealthy adversary simulations | Pentesting experience |
| Security engineer | Build and tune security controls | Sysadmin or network background |
| Detection engineer | Write and test detection rules | SOC plus scripting |
| Threat intelligence analyst | Track attacker groups and campaigns | Analysis, research, SOC |
| Digital forensics analyst | Recover and analyse evidence | IT plus forensics training |
| GRC analyst | Governance, risk, compliance, policy | Audit, IT or business background |

---

## 🔐 Security notes

- **Only test what you own or have written permission to test.** In the UK, the **Computer Misuse Act 1990** makes unauthorised access an offence — "just looking" counts, and so does using found credentials.
- **TryHackMe and your own lab are the right places to practise.** Real targets need a signed scope.
- **Stay inside the scope** of any engagement or bug bounty — out-of-scope testing can still be illegal.

---

## Practice drills

<details>
<summary>1. An unpatched VPN appliance is exposed to the internet. Name the vulnerability, a threat, and the risk.</summary>

Vulnerability: the missing patch. Threat: a ransomware group scanning for it. Risk: high likelihood × high impact (network-wide compromise).
</details>

<details>
<summary>2. Ransomware encrypts file servers. Which part of the CIA triad is hit hardest?</summary>

Availability — and confidentiality too, if data was stolen first ("double extortion").
</details>

<details>
<summary>3. What's the difference between a SIEM and an EDR?</summary>

A SIEM centralises and correlates logs from everywhere. An EDR monitors and responds on individual endpoints.
</details>

<details>
<summary>4. You find a login page for a company's admin portal. Can you try default passwords "just to check"?</summary>

No — that's unauthorised access under the Computer Misuse Act. Report it through their disclosure process instead.
</details>

---

## Key takeaways

- Assets have vulnerabilities; threats exploit them; risk = likelihood × impact.
- CIA triad: confidentiality, integrity, availability.
- Red finds weaknesses, blue detects and responds, purple makes each improve the other.
- Help desk → SOC is a well-worn route in.
- Permission and scope aren't optional — the Computer Misuse Act applies to curiosity too.
