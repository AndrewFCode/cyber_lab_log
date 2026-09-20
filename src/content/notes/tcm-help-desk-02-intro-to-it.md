---
title: "Help Desk: Intro to IT"
description: "Information Technology (IT) is the people, processes and technology an organisation uses to create, store, move and protect information. In practice, IT exists to keep the business working. The payroll team needs…"
tags: ["help-desk", "tcm", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TCM Security, Practical Help Desk · Section 2__

__Quick reference:__ the short version of this section is the Section 2 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what an IT department does for a business, and the different ways IT can be delivered.
2. Read an IT org chart and describe the main IT roles.
3. Describe the help desk tiers, the ticket lifecycle, and the difference between incidents, requests, problems and changes.
4. Prioritise tickets using impact and urgency, and explain what an SLA is.
5. Write clear ticket notes and escalations.
6. Break down a help desk job posting.
7. Explain why the help desk is a prime target for social engineering, and how identity verification defends it.

## 1. What is IT?

__Information Technology (IT)__ is the people, processes and technology an organisation uses to create, store, move and protect information. In practice, IT exists to __keep the business working__. The payroll team needs payroll software that runs; sales needs laptops, email and a CRM; everyone needs to sign in securely.

## 1.1 What IT does

__Function__

__Examples__

Support people

Answering tickets, resetting passwords, setting up new starters, fixing laptops

Run infrastructure

Servers, networks, Wi-Fi, cloud services, identity (Active Directory, Entra ID)

Protect information

Backups, security tools, access control, patching

Enable change

Rolling out new software, integrating systems, automating manual work

Plan and budget

Hardware refresh cycles, licences, vendor contracts

## 1.2 How IT is delivered

__Model__

__What it means__

__Typical in__

In-house IT

The organisation employs its own IT staff

Medium and large organisations

Managed service provider (MSP)

An outside company runs some or all IT for a monthly fee

Small businesses; also used to cover gaps

Outsourced / offshore service desk

Tier 1 support handled by a third party, often in another country

Large enterprises cutting costs

Hybrid

In-house team plus MSP or cloud providers

Very common today

__In the real world:__ many first help desk jobs are at MSPs. You see many different clients, environments and problems — a fast way to learn, often at a fast pace.

### 1.3 Shadow IT

__Shadow IT__ is technology staff use without IT's knowledge — a personal Dropbox for work files, an unapproved browser extension, a team buying its own SaaS tool. It happens because people want to get work done. It matters because IT can't secure, back up or support what it doesn't know exists.

## 2. The IT department org chart

## 2.1 A typical mid-sized organisation

                         \+----------------------\+
                         |  CIO / IT Director   |
                         \+----------\+-----------\+
                                    |
      \+-------------\+---------------\+---------------\+---------------\+
      |             |               |               |               |
 \+----\+----\+  \+-----\+-----\+  \+------\+------\+  \+-----\+-----\+  \+------\+------\+
 | Service |  |  Desktop  |  | Infrastruc- |  | Security  |  | Development |
 |  Desk   |  |  Support  |  | ture / Ops  |  |  (CISO)   |  |  / DevOps   |
 \+---------\+  \+-----------\+  \+-------------\+  \+-----------\+  \+-------------\+
  Tier 1       Tier 2         Sysadmins,       SOC analysts,   Developers,
  analysts     technicians    network, cloud   engineers       DevOps

### 2.2 Leadership titles

__Title__

__Focus__

CIO (Chief Information Officer)

IT strategy and how technology serves the business

CTO (Chief Technology Officer)

Technology direction — often product-facing in tech companies

CISO (Chief Information Security Officer)

Security strategy, risk and compliance

IT Director / Head of IT

Running the IT department day to day

IT Manager / Team Lead

People, priorities and escalations for one team

In a __small business__ this collapses: one "IT person" may be the help desk, sysadmin and security team at once. In a __large enterprise__, each box above may be a department of dozens.

## 3. IT roles in depth

__Role__

__Day-to-day work__

__Common tools__

__Typical next step__

Help desk / service desk analyst

Answer calls, chats and tickets; reset passwords; triage; escalate

Ticketing system, Active Directory, remote support tool

Desktop support, sysadmin, SOC

Desktop support technician

Hardware repairs, desk visits, imaging and deploying laptops

Imaging tools, Intune/MDM, spare parts

Sysadmin, endpoint engineer

Systems administrator

Servers, Active Directory, Group Policy, patching, backups

Windows Server, PowerShell, backup software

Systems engineer, cloud engineer

Network administrator / engineer

Switches, routers, firewalls, Wi-Fi, VPN

Vendor consoles, monitoring tools

Network architect, security engineer

Cloud engineer

Cloud infrastructure and automation

Azure, AWS, infrastructure-as-code

Cloud architect

Security analyst (SOC)

Monitor alerts, investigate, respond

SIEM, EDR, threat intelligence

Incident responder, threat hunter

Database administrator (DBA)

Database performance, backups, access

SQL Server, PostgreSQL

Data engineer

IT manager

Priorities, people, budgets, vendors

Everything above, plus spreadsheets

Director, CIO

## 4. The help desk

## 4.1 Tiers

__Tier__

__Who__

__Handles__

0

Self-service

Knowledge-base articles, password-reset portals, chatbots

1

Help desk analysts

Logging, triage, common fixes, first-contact resolution, escalation

2

Desktop support, senior analysts

Deeper troubleshooting, hardware, desk-side visits

3

Engineers and specialists

Server, network or application problems; root-cause fixes

(4)

Vendors

Problems only the manufacturer or software vendor can fix

## 4.2 Tier 1 responsibilities

- __Be the single point of contact.__ Every problem, whatever it is, starts with you.
- __Log everything.__ No ticket, no record — even for a 30-second fix.
- __Triage:__ work out what's wrong, how bad it is and who should fix it.
- __Resolve what you can.__ Typical Tier 1 fixes:
	- Account lockouts, password and MFA resets
	- Printer issues, email and Outlook problems
	- Software installs, VPN connection problems
- __Escalate cleanly__ with everything the next tier needs.
- __Communicate:__ acknowledge, set expectations, update, confirm resolution.
- __Document fixes__ in the knowledge base, so the next person — or the user — can self-serve.

## 4.3 Ticket types (ITIL)

__ITIL__ is the most widely used framework for IT service management. Its vocabulary is standard across help desks:

__Type__

__Definition__

__Example__

__Goal__

Incident

An unplanned interruption or loss of quality in a service

"Outlook crashes on start-up"

Restore service fast

Service request

A standard, pre-approved ask

"New starter needs a laptop"

Fulfil it efficiently

Problem

The underlying cause of one or more incidents

"Why does the VPN drop every Monday?"

Find and remove the root cause

Change

A planned addition, modification or removal

"Upgrade the print server on Saturday"

Make it with minimal risk

__Exam tip:__ an __incident__ is about restoring service now; a __problem__ is about preventing it happening again. Ten users with the same crash are ten incidents linked to __one__ problem.

### 4.4 The ticket lifecycle

  New --> Assigned --> In progress --> Resolved --> Closed
                           |   ^
                           v   |
                  Pending (waiting on user / vendor)- __Pending__ pauses the SLA clock in most tools, while you wait on someone else.
- __Resolved__ means you believe it's fixed; __closed__ means the user has confirmed it, or the confirmation window has passed.

## 4.5 Prioritisation: impact × urgency

- __Impact:__ how many people or how much of the business is affected.
- __Urgency:__ how quickly it must be fixed.

__High urgency__

__Medium urgency__

__Low urgency__

__High impact__ (many users, critical system)

P1 Critical

P2 High

P3 Medium

__Medium impact__ (a team)

P2 High

P3 Medium

P4 Low

__Low impact__ (one user, workaround exists)

P3 Medium

P4 Low

P4 Low

## 4.6 SLAs and KPIs

A __service level agreement (SLA)__ is a promise about response and resolution times for each priority, for example:

__Priority__

__Respond within__

__Resolve within__

P1

15 minutes

4 hours

P2

1 hour

8 business hours

P3

4 hours

3 business days

P4

1 business day

5 business days

(These are typical figures; every organisation sets its own.)

__KPI (key performance indicator)__

__Measures__

First contact resolution (FCR)

% of tickets fixed on the first contact

Mean time to resolve (MTTR)

Average time from ticket open to resolution

SLA compliance

% of tickets meeting their SLA

CSAT

Customer satisfaction score from post-ticket surveys

Backlog

Open tickets waiting

## 4.7 Escalation

__Type__

__Meaning__

__Example__

Functional

Pass to someone with more __expertise__

Tier 1 → network team for a switch fault

Hierarchical

Raise to someone with more __authority__

Notify a manager because a P1 is at risk of missing its SLA

## 4.8 Worked example — triaging a morning queue

Three tickets arrive at 09:00:

__Ticket__

__Details__

A

CEO's assistant: "Second monitor flickers."

B

Finance team (12 people): "Can't open the payroll system — payroll runs at noon."

C

One user: "New keyboard please, the E key sticks."

__Assessment:__

- __B:__ high impact (a whole team, a critical system) \+ high urgency (noon deadline) → __P1__. Work it now, update the team, and escalate to the application owner if it isn't solved quickly.
- __A:__ low impact (one user, a working screen remains) \+ medium urgency → __P3/P4__. Seniority doesn't change priority — though many organisations do have a VIP process, so follow local policy.
- __C:__ a __service request__, not an incident → __P4__, fulfilled from stock.

## 4.9 Worked example — writing ticket notes

__Weak note:__

"Fixed it."

__Strong note:__

"User unable to connect to VPN since 08:40; error 'authentication failed'. Checked AD: account locked out after 5 failed attempts (source: user's phone with an old saved password). Verified identity via call-back to the number on file. Unlocked account; user removed the old password from the phone's mail app. VPN connects. Advised the user to update saved passwords after changes. Resolved."

__A strong note records:__

- the symptom and when it started;
- what you checked;
- the cause;
- identity verification, if you made any account change;
- the fix;
- the result;
- any advice given.

Written well, the next technician — or an auditor — understands it with no context.

## 5. Soft skills

Technical skill gets you hired; communication makes you good at the job.

__Skill__

__In practice__

Active listening

Let the user finish; repeat the problem back in your own words

Empathy

Acknowledge the impact ("that's frustrating with a deadline today")

Plain language

"Your password expired" not "your AD credential object reached its maxPwdAge"

Setting expectations

"I'm escalating this to the network team; you'll hear back within 2 hours"

Ownership

Follow up even after escalating — the user remembers who kept them informed

Calm under pressure

Slow down when the user speeds up

__A simple call structure:__

1. __Greet:__ your name, the service desk, and "how can I help?"
2. __Verify identity__ — every time an account is involved.
3. __Listen and clarify:__ what, when, what's changed, how many are affected.
4. __Fix or escalate__, and explain what happens next.
5. __Confirm__ it works; ask if there's anything else.
6. __Document__ in the ticket.

## 6. Reading job postings

## 6.1 Worked example — decoding a posting

*IT Service Desk Analyst (1st Line). Responsibilities: provide first-line support via phone, email and ticketing system; manage user accounts in Active Directory and Microsoft 365; troubleshoot Windows 11, Outlook and Teams; escalate to 2nd line; document in knowledge base. Required: customer service experience, basic Windows troubleshooting. Desirable: CompTIA A\+, ITIL Foundation, experience with ServiceNow or Freshservice.*

__Phrase__

__What it tells you__

__How to prepare__

Phone, email, ticketing

Multi-channel support; communication matters

Practise explaining fixes out loud

Active Directory and Microsoft 365

Account work — resets, groups, licences, mailboxes

Build the AD lab; learn the M365 admin centre

Windows 11, Outlook, Teams

The everyday apps you'll support

Know common Outlook and Teams fixes

Escalate to 2nd line

They want clean hand-offs

Practise writing escalation notes

Required: customer service

Retail or hospitality experience counts

Put it on your CV with support-style examples

Desirable: A\+, ITIL

Differentiators, not blockers

A\+ Core 1 and 2; ITIL Foundation vocabulary (section 4)

"1st line", "service desk" and "Tier 1 help desk" are the same job. UK postings tend to use "line", US postings "tier".

## 6.2 Common tools in postings

__Category__

__Examples__

Ticketing / ITSM

ServiceNow, Jira Service Management, Freshservice, Zendesk, osTicket

Identity

Active Directory, Entra ID (Azure AD), Okta

Endpoint management

Intune, SCCM/ConfigMgr, Jamf (Mac)

Remote support

TeamViewer, AnyDesk, Quick Assist, ConnectWise

Productivity

Microsoft 365, Google Workspace

## 7. Security perspective

The help desk holds the keys: it can reset passwords and MFA. That makes it one of the most targeted parts of any organisation.

## 7.1 Help desk social engineering

1. The attacker researches a real employee (LinkedIn, company website).
2. They call the help desk, posing as that employee — often stressed, travelling, or "senior and in a hurry".
3. They ask for a password reset, or for MFA to be moved to a "new phone".
4. If it works, they log in as that employee. The 2023 MGM Resorts breach was widely reported to have started exactly this way.

## 7.2 Defences

__Control__

__How it helps__

Identity verification procedure

Call back on the number already on file; manager approval; a verification tool — never "knowing the employee ID" alone

No exceptions for urgency or seniority

Pressure is a red flag, not a reason to skip steps

Never ask for passwords

Legitimate IT never needs a user's password

Least privilege

Help desk accounts can reset standard users, not administrators

Logging and review

Every reset is recorded in the ticket and audit log

Alerting

Unusual reset patterns (many resets, admin accounts) trigger security review

__In the real world:__ if a caller becomes angry when you insist on verification, that isn't evidence they're genuine. Attackers use anger and urgency deliberately. Follow the process and escalate to your team lead if needed.

## Summary

- __IT keeps the business working:__ it supports people, runs infrastructure, protects information and enables change. It's delivered in-house, through MSPs, or both.
- __Structure:__ CIO/CTO/CISO at the top; service desk, desktop support, infrastructure, security and development teams below.
- __Help desk tiers:__ Tier 0 is self-service, Tier 1 is first contact, Tier 2 goes deeper, Tier 3 is specialists.
- __Ticket types:__ incidents restore service; problems remove root causes; requests fulfil standard asks; changes are planned.
- __Priority__ = impact × urgency. SLAs define response and resolution times; FCR, MTTR and CSAT measure performance.
- __Good ticket notes__ are the job: symptom, checks, cause, verification, fix, result.
- __Verify identity before every account change.__ The help desk is a favourite social-engineering target.

# Glossary

__Term__

__Definition__

IT

The people, processes and technology used to manage information

MSP

Managed service provider — an outside company that runs IT for clients

Shadow IT

Technology used without IT's knowledge or approval

CIO / CTO / CISO

Chief Information / Technology / Information Security Officer

Service desk

The single point of contact between IT and users

Tier 0–3

Levels of support, from self-service to specialists

ITIL

A widely used framework of IT service management practices

Incident

An unplanned interruption to a service

Service request

A standard, pre-approved request (e.g. new hardware)

Problem

The root cause of one or more incidents

Change

A planned modification to IT services or infrastructure

Impact / urgency

Breadth of effect / how soon it must be fixed — together they set priority

SLA

Service level agreement — agreed response and resolution times

KPI

Key performance indicator — a measure of performance

FCR

First contact resolution

MTTR

Mean time to resolve

Functional escalation

Passing work to someone with more expertise

Hierarchical escalation

Raising an issue to someone with more authority

Knowledge base

A library of documented fixes and how-tos

Social engineering

Manipulating people into giving access or information

# Review questions

1. What is the difference between an incident and a problem?
2. Twelve users can't reach a critical system and there's a deadline at noon. What priority, and why?
3. A user asks for a new mouse. Which ITIL ticket type is this?
4. What does FCR measure, and why do help desks care about it?
5. Name the two types of escalation and give an example of each.
6. What should a ticket note contain? List at least five elements.
7. A caller claims to be the finance director and demands an MFA reset immediately. Describe your response.
8. What is shadow IT, and why is it a security concern?
9. In a posting, what's the difference between "required" and "desirable"?
10. Which ticket status usually pauses the SLA clock?
11. Why might a new technician choose an MSP for their first job?
12. Which tier handles knowledge-base articles and password-reset portals?

# Answer key

1. __An incident is a single interruption, fixed by restoring service; a problem is the underlying cause behind one or more incidents, fixed by removing the root cause.__
2. __P1 (critical).__ High impact (a whole team, a critical system) combined with high urgency (a fixed deadline).
3. __A service request__ — nothing is broken; it's a standard ask.
4. __The share of tickets resolved on first contact.__ High FCR means less waiting for users and less work passing between teams.
5. __Functional:__ passing to the network team for a switch fault. __Hierarchical:__ alerting a manager that a P1 may miss its SLA.
6. __Any five of:__ symptom, when it started, what was checked, cause, identity verification (for account changes), fix, result, advice given.
7. __Follow the identity verification procedure regardless of title or urgency__ — e.g. call back on the number on file, or get manager approval. Never skip it because of pressure; escalate to a team lead if the caller refuses.
8. __Technology used without IT's knowledge.__ IT can't secure, back up, patch or monitor it, and data may leak into unmanaged services.
9. __Required items are screening criteria; desirable items are nice-to-haves.__ Candidates often apply without every desirable item.
10. __Pending__ (waiting on the user or a vendor).
11. __Exposure to many environments and problems very quickly__ — broad experience in a short time.
12. __Tier 0 (self-service).__
