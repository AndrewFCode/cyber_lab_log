---
title: "TryHackMe: Introduction to Cyber Security"
description: "Note: these notes are written from the module's topic outline, not from the rooms themselves. Room names and exercise specifics aren't reproduced — cross-check against the rooms as you work through them."
tags: ["tryhackme", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TryHackMe Pre Security (2026 path) · Module 1__

__Quick reference:__ the short version of this module is the Module 1 cheat sheet.

__Note:__ these notes are written from the module's topic outline, not from the rooms themselves. Room names and exercise specifics aren't reproduced — cross-check against the rooms as you work through them.

## Learning objectives

By the end of these notes you should be able to:

1. Define cyber security and explain the CIA triad with examples.
2. Distinguish assets, vulnerabilities, threats, exploits and risk, and rate a risk.
3. Describe the main types of threat actor and common attack types.
4. Explain the difference between offensive and defensive security, and the red, blue and purple team roles.
5. Walk through the phases of a penetration test and of incident response.
6. Use the Cyber Kill Chain and MITRE ATT&CK to describe an attack.
7. Describe the main cyber security careers and entry routes.
8. Explain what the UK Computer Misuse Act 1990 means for anyone learning security.

## 1. What is cyber security?

__Cyber security__ is protecting systems, networks, data and people from digital attack, damage and unauthorised access. It's not just technology: it's also __people__ (training, awareness) and __process__ (policies, procedures, response plans).

## 1.1 The CIA triad

The three core properties security protects:

__Principle__

__Means__

__Attack against it__

__Example controls__

__Confidentiality__

Only authorised people can see the data

Data breach, eavesdropping

Encryption, access control, MFA

__Integrity__

Data isn't altered without authorisation

Tampering, fraud, malware changing files

Hashing, digital signatures, change control, backups

__Availability__

Systems and data work when needed

DDoS, ransomware, sabotage

Redundancy, backups, DDoS protection, patching

Two related ideas you'll meet:

- __Authenticity__ — data or a user really is who or what it claims to be.
- __Non-repudiation__ — someone can't deny an action they took, e.g. thanks to digital signatures and audit logs.

## 1.2 Worked example — classifying incidents by CIA

__Incident__

__Main property hit__

__Why__

A database of customer emails is posted online

Confidentiality

Data exposed to unauthorised people

An attacker changes the bank details on supplier invoices

Integrity

Data altered to redirect payments

A website is flooded with traffic and goes offline

Availability

Legitimate users can't reach it

Ransomware encrypts file servers __and__ leaks copies

Availability __and__ confidentiality

Files unusable, and stolen ("double extortion")

## 2. Core vocabulary

__Term__

__Definition__

__Example__

Asset

Anything of value to protect

Customer database, laptops, reputation

Vulnerability

A weakness that could be exploited

Unpatched VPN appliance; reused password

Threat

Anything that could exploit a vulnerability

Ransomware gang, malicious insider

Threat actor

The person or group behind a threat

Cybercriminal, nation-state

Exploit

The technique or code that takes advantage of a vulnerability

A public exploit for the VPN flaw

Risk

The likelihood and impact of a threat exploiting a vulnerability

"High: likely to be exploited, would expose the network"

Control

A measure that reduces risk

Patch, MFA, firewall rule, training

Attack surface

All the points where an attacker could try to get in

Internet-facing services, email, users

## 2.1 Worked example — rating risk

A simple __risk matrix__ multiplies likelihood (1–5) by impact (1–5):

__Scenario__

__Likelihood__

__Impact__

__Score__

__Rating__

Internet-facing VPN with a known, actively exploited flaw, unpatched

5

5

25

Critical — patch now

Staff laptop without disk encryption

3

4

12

High

Printer on the internal network with a default admin password

3

2

6

Medium

Unused test account with a strong password, MFA enforced

1

2

2

Low

__What you can do with a risk:__

- __Mitigate__ — add a control.
- __Transfer__ — e.g. insurance.
- __Avoid__ — stop the activity.
- __Accept__ — document it and live with it.

## 3. Who attacks, and how

## 3.1 Threat actors

__Actor__

__Motivation__

__Capability__

Script kiddie

Curiosity, bragging rights

Low — uses others' tools

Hacktivist

Political or social cause

Low to medium — defacements, DDoS, leaks

Cybercriminal / organised crime

Money

Medium to high — ransomware, fraud, phishing kits

Nation-state (APT)

Espionage, disruption, strategic advantage

Very high — patient, well funded

Insider

Revenge, money, carelessness

Varies — already has access

__APT__ means advanced persistent threat: a skilled, well-resourced group that stays hidden in a network for a long time.

## 3.2 Common attack types

__Attack__

__What happens__

Phishing

Deceptive messages trick users into clicking links, opening files or entering credentials. Spear phishing targets specific people

Malware

Malicious software: viruses, worms, trojans, spyware, ransomware

Ransomware

Encrypts data and demands payment; often steals data first

Credential attacks

Password spraying, brute force, and credential stuffing (reusing leaked passwords)

Denial of service (DoS / DDoS)

Overwhelms a service so legitimate users can't use it

Exploiting vulnerabilities

Using unpatched flaws in internet-facing systems

Social engineering

Manipulating people — phone calls to the help desk, pretexting, tailgating

Supply chain

Compromising a supplier or software update to reach its customers

## 4. Offensive vs defensive security

## 4.1 The teams

__Team__

__Role__

__Mindset__

__Red__

Emulates attackers, with permission, to find weaknesses

"How would I get in?"

__Blue__

Defends: monitors, detects, responds, hardens

"How would I spot and stop it?"

__Purple__

Red and blue working together, so each attack improves a detection

"Did we catch that? How do we make sure we do next time?"

## 4.2 Offensive security

__Activity__

__What it is__

Vulnerability assessment

Scanning systems to list known weaknesses — breadth, not depth

Penetration test

Authorised, scoped attempt to exploit weaknesses and show impact

Red team exercise

A longer, stealthier simulation of a real adversary, testing detection and response

Bug bounty

Public or private programmes paying researchers for responsibly reported bugs

__Phases of a penetration test:__

 Planning &     Recon-      Scanning &     Exploit-    Post-          Reporting
 scoping   -->  naissance -> enumeration -> ation   --> exploitation -> (findings,
 (rules of      (OSINT,      (ports,        (gain       (privilege      risk, fixes)
 engagement)    footprint)   services)      access)     escalation,
                                                        pivoting)

The __rules of engagement__ and __scope__ define exactly what may be tested, when, and how. Anything outside them is off limits, and possibly illegal.

## 4.3 Defensive security

__Function__

__What it does__

__Tools__

Security operations centre (SOC)

Monitors alerts around the clock; triages and escalates

SIEM, EDR, ticketing

Incident response (IR)

Contains, eradicates and recovers from incidents

Playbooks, forensic tools

Threat intelligence

Tracks attacker groups, tools and indicators

Threat feeds, MITRE ATT&CK

Digital forensics

Recovers and analyses evidence from disks, memory and logs

Disk and memory analysis tools

Malware analysis

Works out what a malicious file does

Sandboxes, disassemblers

Security engineering

Designs and runs security controls

Firewalls, identity, EDR platforms

Vulnerability management

Finds and prioritises patching

Scanners, asset inventories

__Key tools defined:__

- __SIEM__ (security information and event management) — collects and correlates logs from across the organisation and raises alerts.
- __EDR__ (endpoint detection and response) — watches processes, files and network activity on each machine, and can isolate a host.
- __IDS / IPS__ — detects / blocks suspicious network traffic.

__The incident response lifecycle__ (NIST SP 800-61):

  Preparation --> Detection & --> Containment, Eradication --> Post-incident
       ^          Analysis         & Recovery                  activity
       |                                                           |
       \+---------------------- lessons learned --------------------\+

## 5. Frameworks for describing attacks

## 5.1 The Cyber Kill Chain

Lockheed Martin's seven stages of an intrusion:

__Stage__

__Attacker does__

__Defender opportunity__

1. Reconnaissance

Researches the target

Limit public information; monitor scanning

2. Weaponisation

Builds the payload, e.g. a malicious document

(Mostly invisible to the defender)

3. Delivery

Sends it — email, web, USB

Email filtering, web filtering

4. Exploitation

Payload runs and exploits a weakness

Patching, application control

5. Installation

Installs persistence (malware, backdoor)

EDR, allow-listing

6. Command and control (C2)

Opens a channel back to the attacker

Egress filtering, DNS monitoring

7. Actions on objectives

Steals, encrypts or destroys

DLP, backups, segmentation

Break any link and the attack fails.

## 5.2 MITRE ATT&CK

__ATT&CK__ is a free knowledge base of real attacker behaviour, organised as __tactics__ (the *why*: the goal at each stage) and __techniques__ (the *how*). The 14 Enterprise tactics:

Reconnaissance → Resource Development → Initial Access → Execution → Persistence → Privilege Escalation → Defense Evasion → Credential Access → Discovery → Lateral Movement → Collection → Command and Control → Exfiltration → ImpactBlue teams use it to map detections; red teams use it to plan realistic tests. It's the common language of purple teaming.

## 5.3 Worked example — mapping a phishing attack

A finance employee receives an email "from the CEO" with a link to a fake Microsoft 365 login page. They enter their password; the attacker logs in and creates a mail rule that forwards invoices to an external address.

__Step__

__Kill Chain__

__ATT&CK tactic__

Researching the finance team on LinkedIn

Reconnaissance

Reconnaissance

Setting up the fake login page

Weaponisation

Resource Development

Sending the email

Delivery

Initial Access (phishing)

User enters credentials; attacker signs in

Exploitation

Credential Access → Initial Access (valid accounts)

Creating the forwarding rule

Installation

Persistence / Collection

Invoices sent out

Actions on objectives

Exfiltration

__Defences that break the chain:__

- __Phishing-resistant MFA__ — stops the attacker using the captured password.
- __Email authentication (SPF, DKIM, DMARC)__ — makes the spoofed CEO address harder to pass off.
- __Alerting on new external forwarding rules__ — catches the persistence step.
- __User awareness training__ — makes the click less likely.

## 6. Careers in cyber security

__Role__

__What you'd do__

__Typical entry route__

SOC analyst (Tier 1–3)

Triage and investigate alerts

Help desk or IT support → SOC Tier 1

Incident responder

Lead containment and recovery

SOC experience

Penetration tester

Authorised hacking of networks and apps

IT, networking or development background plus offensive training

Red teamer

Adversary simulation

Pentesting experience

Security engineer

Build and run security controls

Sysadmin or network background

Detection engineer

Write and tune detection rules

SOC plus scripting

Threat intelligence analyst

Research attackers and campaigns

Analysis or SOC background

Digital forensics analyst

Evidence recovery and analysis

IT plus forensics training

GRC analyst

Governance, risk, compliance, audit

Audit, IT or business background

Cloud security engineer

Secure cloud platforms

Cloud or sysadmin experience

__In the real world:__ most people don't start in security. A common, proven route is help desk → sysadmin or network → security, or help desk → SOC. Hands-on labs (TryHackMe, a home lab) plus foundational certifications (A\+, Network\+, Security\+) make that transition faster.

## 7. The law and ethics

## 7.1 The Computer Misuse Act 1990 (UK)

__Section__

__Offence__

s1

Unauthorised access to computer material — simply getting in without permission

s2

Unauthorised access with intent to commit or facilitate further offences

s3

Unauthorised acts intended to impair a computer's operation (e.g. malware, DoS)

s3ZA

Unauthorised acts causing, or creating a risk of, serious damage

s3A

Making, supplying or obtaining articles (tools) for use in these offences

Penalties rise with seriousness, up to life imprisonment for the gravest s3ZA cases.

__What this means for you:__

- __"Just looking" is an offence__ under s1. So is trying default passwords, or logging in with credentials you found.
- __Permission must be explicit and scoped__, ideally in writing — a signed authorisation for pentests.
- __Practise only__ on platforms built for it (TryHackMe, deliberately vulnerable VMs) and on systems you own.
- __If you stumble on a vulnerability,__ report it through the organisation's vulnerability disclosure policy (often security.txt on their website). Don't test further.

Other countries have similar laws, e.g. the US Computer Fraud and Abuse Act.

## 7.2 Ethics

- Use skills only with authorisation, and to protect.
- Protect any data you encounter; don't copy or keep it.
- Disclose responsibly and give time to fix.
- Stay within scope, even when you could go further.

## 8. Security perspective — bringing it together

- __Security is layered: defence in depth.__ No single control is perfect, so combine people, process and technology across the attack chain.
- __Most attacks start simply__ — phishing, stolen passwords, unpatched internet-facing systems. The basics (MFA, patching, backups, training) stop a large share of real incidents.
- __Defenders need attacker knowledge.__ Understanding how attacks work is what makes detections good. That's the purple-team idea.
- __Help desk is part of security.__ Identity verification, spotting phishing reports and escalating odd behaviour are real security work.

# Summary

- Cyber security protects confidentiality, integrity and availability, across people, process and technology.
- __Risk__ = likelihood × impact of a threat exploiting a vulnerability. Treat it by mitigating, transferring, avoiding or accepting.
- __Threat actors__ range from script kiddies to nation-states. Common attacks are phishing, malware/ransomware, credential attacks, DoS, exploitation and social engineering.
- __Teams:__ red attacks (with permission), blue defends, purple joins them.
- __Pentests__ follow scope → recon → scanning → exploitation → post-exploitation → report. __Incident response__ follows preparation → detection → containment/eradication/recovery → lessons learned.
- __The Kill Chain and MITRE ATT&CK__ give a shared language for attacks and defences.
- __The Computer Misuse Act__ makes any unauthorised access an offence. Practise only where you're allowed.

# Glossary

__Term__

__Definition__

CIA triad

Confidentiality, integrity, availability

Non-repudiation

Assurance that someone can't deny an action they took

Vulnerability

A weakness that could be exploited

Threat / threat actor

A potential cause of harm / the person or group behind it

Exploit

A technique or code that uses a vulnerability

Risk

Likelihood × impact

Attack surface

All points where an attacker could attempt entry

APT

Advanced persistent threat — a skilled, long-term attacker

Phishing

Deceptive messages aimed at stealing credentials or delivering malware

Ransomware

Malware that encrypts data for extortion

Penetration test

An authorised, scoped attempt to exploit weaknesses

Rules of engagement

The agreed limits and conditions of a security test

Red / blue / purple team

Attack / defence / collaborative improvement

SOC

Security operations centre

SIEM

Collects and correlates logs to detect threats

EDR

Endpoint detection and response

Cyber Kill Chain

Seven-stage model of an intrusion

MITRE ATT&CK

Knowledge base of attacker tactics and techniques

Defence in depth

Layered security controls

Computer Misuse Act 1990

UK law criminalising unauthorised access and related acts

# Review questions

1. An attacker alters the amounts in a payroll file. Which CIA property is violated?
2. What's the difference between a vulnerability and a threat?
3. Rate this: an unpatched, internet-facing server with a known exploit being used in the wild. Likelihood, impact, and action?
4. Which threat actor is most associated with long-term, stealthy espionage?
5. List the phases of a penetration test in order.
6. What distinguishes a red team exercise from a vulnerability assessment?
7. Name the four phases of the NIST incident response lifecycle.
8. At which Kill Chain stage does an attacker establish a channel back to their server?
9. What does MITRE ATT&CK organise attacker behaviour into?
10. You find an admin login page on a company website. Under the Computer Misuse Act, can you try "admin/admin"?
11. Give two controls that would break a credential-phishing attack.
12. Describe a common route from help desk into cyber security.

# Answer key

1. __Integrity__ — data was altered without authorisation.
2. __A vulnerability is a weakness; a threat is something that could exploit it.__ An unpatched server is a vulnerability; a ransomware gang is a threat.
3. __Likelihood 5, impact 5 — critical.__ Patch or mitigate immediately; isolate the server if it can't be patched.
4. __A nation-state APT.__
5. __Planning/scoping → reconnaissance → scanning/enumeration → exploitation → post-exploitation → reporting.__
6. __A vulnerability assessment lists weaknesses broadly;__ a red team exercise simulates a real adversary stealthily over time to test detection and response.
7. __Preparation; Detection and Analysis; Containment, Eradication and Recovery; Post-incident Activity.__
8. __Command and control (C2)__ — stage 6.
9. __Tactics__ (the attacker's goals) __and techniques__ (how they achieve them).
10. __No.__ Attempting access without authorisation is an offence under s1. Report it via their disclosure process instead.
11. __Any two of:__ phishing-resistant MFA; email filtering with SPF/DKIM/DMARC; user training; alerting on suspicious sign-ins or new forwarding rules.
12. __Help desk → SOC Tier 1 analyst__, often supported by home-lab practice and certifications such as A\+, Network\+ and Security\+.
