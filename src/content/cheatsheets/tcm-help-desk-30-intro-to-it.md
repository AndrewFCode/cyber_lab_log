---
title: "Help Desk: Intro to IT"
description: "TCM Practical Help Desk section 2 — what IT does, the IT org chart and roles, help desk tiers and responsibilities, and reading job postings."
tags: ["help-desk", "tcm", "it-fundamentals", "careers"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tcm-help-desk"
module: "§2"
moduleOrder: 30
unit: 2
---
> **In one line:** IT keeps the business's technology working, and the help desk is its front door — the first to hear about every problem.

*Companion to: TCM Security, Practical Help Desk, section 2.*

---

## What IT does

| Function | Examples |
|---|---|
| Support users | Tickets, password resets, new-starter setups |
| Run infrastructure | Servers, networks, cloud, identity (Active Directory, Entra ID) |
| Protect data | Backups, security controls, access management |
| Enable the business | New software, integrations, automation |

---

## The IT org chart

```
            CIO / CTO                 (CISO often alongside, for security)
                |
        IT Director / Manager
                |
 ┌──────────┬───────────┬──────────┬────────────┬──────────┐
Help Desk  Desktop    Systems    Network     Security    Cloud /
/ Service  Support    Admins     Engineers   Team        DevOps
 Desk
```

Smaller companies squash this down — one person may be the whole chart.

---

## IT roles

| Role | Focus |
|---|---|
| Help desk / service desk | First contact: tickets, triage, common fixes, escalation |
| Desktop support | Hands-on hardware and software at the user's desk |
| Systems administrator | Servers, Active Directory, patching, backups |
| Network administrator / engineer | Switches, routers, firewalls, Wi-Fi, VPN |
| Security analyst (SOC) | Monitoring alerts, investigating incidents |
| Cloud / DevOps engineer | Cloud infrastructure, automation, deployment pipelines |
| Database administrator | Databases: performance, backups, access |
| IT manager | People, budgets, priorities, vendors |

---

## The help desk

### Tiers

| Tier | Handles |
|---|---|
| Tier 0 | Self-service: knowledge base, password-reset portal |
| Tier 1 | Front line: log, triage, fix common issues, escalate |
| Tier 2 | Deeper technical problems, desk-side visits |
| Tier 3 | Specialists and engineers; vendor escalation beyond that |

### Core responsibilities

- **Log every contact** as a ticket.
- **Triage and prioritise** — see the matrix below.
- **Fix the common things:** account lockouts, password and MFA resets, printers, email, software installs.
- **Escalate** with a clean summary, so the next tier doesn't start from zero.
- **Document** fixes in the knowledge base.
- **Communicate:** set expectations, update the user, close the loop.

### Ticket types (ITIL terms)

| Type | Meaning | Example |
|---|---|---|
| Incident | Something broke | "Outlook won't open" |
| Service request | A standard ask | "New starter needs a laptop" |
| Problem | The root cause behind repeat incidents | "Why does the VPN drop every Monday?" |
| Change | A planned modification | "Upgrade the print server" |

### Priority = impact × urgency

| | High urgency | Low urgency |
|---|---|---|
| **High impact** (many users or a critical system) | P1 | P2 |
| **Low impact** (one user, with a workaround) | P3 | P4 |

**SLA** (service level agreement) = the response and resolution times promised for each priority.

---

## Reading job postings

| Posting says | Means |
|---|---|
| Required | Screening criteria — though a close match is often enough |
| Preferred / nice to have | Differentiators, not blockers |
| Active Directory, Microsoft 365, Entra ID | Account and identity administration — most common day-to-day tasks |
| Ticketing (ServiceNow, Jira Service Management, Zendesk, Freshservice) | You'll live in one; learning any one transfers |
| Windows 10/11, macOS, mobile | The fleet you'll support |
| A+ / PHDA / Network+ | Certifications that clear HR filters |
| "Excellent communication" | Genuinely weighted — help desk is a people job |

---

## 🔐 Security notes

- **The help desk is a prime social-engineering target.** Attackers phone in pretending to be staff, asking for a password or MFA reset. The 2023 MGM Resorts breach reportedly began with a call to the help desk.
- **Always verify identity** with the approved method (call back on the number on record, manager approval, identity verification tool) before any reset. Urgency and pressure are warning signs, not reasons to skip it.
- **Least privilege:** help desk accounts get what the job needs — reset rights, not domain admin.
- **Log everything in the ticket.** It's your audit trail when something goes wrong.

---

## Practice drills

<details>
<summary>1. Email is down for the whole finance team at month-end. Priority?</summary>

High impact and high urgency — P1.
</details>

<details>
<summary>2. A user asks for a second monitor. Incident or service request?</summary>

Service request — nothing is broken.
</details>

<details>
<summary>3. A caller says they're the CFO, locked out before a board meeting, and needs MFA reset now. What do you do?</summary>

Follow the identity verification process regardless of title or urgency — e.g. call back on the number on record. Pressure is a red flag.
</details>

<details>
<summary>4. What makes an escalation note good?</summary>

Symptoms, exact errors, what was tried and the results, user impact, and environment — so Tier 2 can start straight away.
</details>

---

## Key takeaways

- IT supports users, runs infrastructure, protects data and enables the business. The help desk is the front door.
- Tiers 0–3 escalate by complexity; priority = impact × urgency; SLAs set the clock.
- Incident, service request, problem and change are different things.
- Verify identity before every reset — the help desk is where attackers knock first.
