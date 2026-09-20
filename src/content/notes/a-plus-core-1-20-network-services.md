---
title: "A+ Core 1 2.4: Network Services"
description: "A typical data centre holds rack after rack of equipment, with many different services running across those racks. This lesson works through the services you'd expect to find there — and several you'll meet…"
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 2.3__

__Quick reference:__ the short version of this lesson is the Network Services cheat sheet, part of Section 2.

## Learning objectives

By the end of these notes you should be able to:

1. List the services commonly found in a data centre and explain what each does.
2. Explain DNS, its distributed and cached design, and DHCP's role and redundancy.
3. Compare file-sharing protocols (SMB, AFP) and describe print services and their protocols.
4. Explain why email needs high uptime, and how syslog and a SIEM centralise log data.
5. Describe a web server's role, and an AAA/authentication server's role and redundancy.
6. Explain database servers, relational tables and SQL.
7. Explain NTP, and why accurate time matters for logs and encryption.
8. Describe a spam gateway, an all-in-one security appliance (UTM), a load balancer and a proxy server.
9. Explain SCADA/ICS, legacy systems, embedded systems and IoT devices, and their common security theme.

## 1. The data centre

A typical data centre holds __rack after rack__ of equipment, with many different services running across those racks. This lesson works through the services you'd expect to find there — and several you'll meet everywhere else too.

## 2. DNS

__DNS (Domain Name System)__ converts a __fully qualified domain name__ (like professormesser.com) into an __IP address__ — and can work in reverse too, plus provide other services.

__Feature__

__Detail__

Scale

A __distributed platform__ — thousands of DNS servers running on the internet at any time

Load distribution

Primarily __by domain name__ — a group of servers supports one domain, another group supports a different domain

Caching

Lookups are often served from a __cached__ copy rather than querying the authoritative servers every time

Who manages it

Often your __service provider__, or __internal DNS servers__ run by your own organisation

## 3. DHCP

__DHCP (Dynamic Host Configuration Protocol)__ automatically assigns an __IP address and other configuration settings__ whenever a computer starts up — no addresses to remember or type in.

- __Used everywhere:__ home networks and enterprise networks alike.
- __Redundancy in the enterprise:__ organisations typically run __multiple DHCP servers__, so if one becomes unavailable, others can still hand out addresses.

## 4. File sharing

__File sharing__ centrally stores information so people across (or outside) the organisation can access it — spreadsheets, documents, anything that needs sharing.

__Platform__

__Common protocol__

Windows

__SMB__ — Server Message Block

macOS

__AFP__ — Apple Filing Protocol

__You usually don't notice which protocol is in use.__ The operating system hides it behind an ordinary file-management interface — drag, drop, rename, edit — regardless of whether SMB, AFP or something else is doing the work underneath.

## 5. Print services

Even in a mostly digital workplace, some things still need to be __printed__. A __print service__ manages that process: receiving print jobs, __queuing__ them, and making sure they print successfully.

__Where the print service runs:__

- A __separate computer__ connected to the printer, running the print service software.
- __Built into the printer itself__ — sometimes on a network card that slots into the printer, providing both the network interface and the print service.

__Common network printing protocols:__

__Protocol__

__Full name__

SMB

Server Message Block

IPP

Internet Printing Protocol

LPD

Line Printer Daemon

## 6. Email

__Email servers__ send and receive messages — either __in the cloud__ (run by your internet or cloud service provider) or __on-premises__, in your own data centre.

__Email demands very high uptime.__ Users expect it to always be flowing and always accessible, so administrators must __plan, design and implement__ email services for maximum availability.

## 7. Syslog and the SIEM

If you manage switches, routers, servers and firewalls, you're generating __log files__ on all of them. __Syslog__ is the protocol that lets you __consolidate__ those logs into one central place.

__Term__

__Role__

__Syslog__

The protocol used to send log data to a central collector

__SIEM__ (Security Information and Event Manager)

The __central server__ that consolidates logs and lets you __correlate__ information across very different systems

__Storage needs:__ because a SIEM pulls in log data from many systems and typically keeps it for a __long time__, it needs a lot of available log space.

## 8. Web server

A __web server__ answers browser requests, generally over __HTTP__ or __HTTPS__.

- Developers build pages in __HTML__ (Hypertext Markup Language).
- The browser fetches those HTML files from the web server, __interprets__ them, and presents the graphical page you see.

## 9. Authentication (AAA) server

An __authentication server__ — often called a __AAA server__ (

__Authentication, Authorization and Accounting__) — checks your __username and password__, then grants access to the services you need.

__Feature__

__Detail__

Central database

Makes it easy to __administer every user__ from one place

Home networks

Rarely have one — fewer services to reach, and families often share simple credentials

Enterprise networks

Need it for __security__: everyone gets their own credentials

Redundancy

Authentication is a __gateway to everything else__, so organisations run __redundant__ authentication servers

## 10. Database server

__Database servers__ store information in __database tables__ — think of a table as a very large spreadsheet.

- __Relational databases__ link tables together, so different types of data can have __relationships__ to each other, making it easy to connect and find related information.
- __SQL (Structured Query Language)__ is the standard language used to store and retrieve that data.
- __Common database products:__ Microsoft SQL Server, MySQL, and others.

## 11. NTP

__NTP (Network Time Protocol)__ is why your computer's clock is reliably accurate. Your device runs an __NTP client__, which periodically checks in with an __NTP server__ referencing a __central, accurate clock__.

__Why time accuracy matters:__

__Use__

__Why it needs the right time__

Comparing log files

Events from multiple systems only line up correctly if their clocks agree

Encryption technologies

Many rely on all systems running the __correct date and time__ to work properly

__Design:__ organisations run one or more NTP servers, referencing a central clock, and every OS (Windows, macOS, Linux, and more) has an NTP client to stay in sync.

## 12. Spam gateway

Everyone gets __spam__ — unsolicited email. A __spam gateway__ evaluates every incoming message, decides whether it looks legitimate or like spam, and files it accordingly (inbox, or a spam/junk folder).

- Often a __separate service__, in the cloud or on its own server.
- __Not 100% accurate__ — you'll sometimes need to check the spam folder for a legitimate message that was miscategorised.

## 13. All-in-one security appliance (UTM)

Many organisations put an __all-in-one security appliance__ at the edge of their network, between them and the internet. It goes by several names:

- __Next-generation firewall__
- __UTM__ — Unified Threat Management
- __Web security gateway__

__Functions bundled into one device can include:__

__Function__

__Purpose__

URL filtering / content inspection

Controls which sites and content users can reach

Malware scanning

On email and/or real-time network traffic

Spam filtering

Built in, rather than a separate gateway

CSU/DSU

Connecting to older WAN links

Router / switch interfaces

Basic network connectivity

Firewall / IPS

Blocking and intrusion prevention

Bandwidth shaping

Limiting the network impact of certain applications

VPN

Secure site-to-site links, or direct user connections

## 14. Load balancer

A __load balancer__ keeps services __up and available__ by spreading incoming requests across __multiple devices__ at once — for example a __web server farm__ of several web servers behind one load balancer.

__Worked example — a server failing behind a load balancer:__

1. Requests arrive and are __distributed evenly__ across the web servers.
2. __One server stops responding.__ The load balancer detects this and __removes it from rotation__ automatically.
3. __The remaining servers absorb the load__ while technicians investigate.
4. Technicians __fix the problem__ and put the server back into service.
5. The __load balancer automatically detects__ the server is healthy again and resumes sending it requests.

__This all happens quickly__ — end users typically never notice the outage occurred at all.

## 15. Proxy server

A __proxy server__ sits between a client and the service it wants to reach:

1. The client sends a request __to the proxy__.
2. The proxy makes that request __on the client's behalf__.
3. The proxy receives the response, and __evaluates__ it — checking it looks appropriate and safe.
4. If it passes, the proxy __forwards the response__ to the end user.

__Uses:__

- __Security__ — the primary purpose.
- __Access control__ — restrict what users can reach.
- __Caching__ — store frequently requested content for faster future access.
- __Content scanning__ — limit what kind of information can pass through.

__Users often don't know it's there.__ A proxy commonly sits invisibly in the network path, evaluating traffic without the end user realising.

## 16. SCADA / ICS

__SCADA (Supervisory Control and Data Acquisition)__ — also called __ICS (Industrial Control System)__ — is used to __view, manage, control and maintain__ large-scale industrial equipment __remotely__, over a network.

__Where you'll find it:__ power utilities, oil and gas, manufacturing, and similar industries controlling large-scale physical equipment.

__Security implication:__ because SCADA/ICS controls valuable and often critical physical systems, these networks need to be __very secure__. Most organisations use a __completely segmented network__, accessible only by physically visiting that part of the network, or through a __very controlled__ access system.

## 17. Legacy systems

Once technology is installed and running, it tends to __keep running__ as long as it has power and keeps working. It's common to find data centre equipment that's __10, 15, 20 years old or more__ — a __legacy system__.

__Old doesn't mean unimportant.__ A legacy system is often still critical — frequently the very reason it hasn't been replaced yet. Knowing how to __manage and maintain__ legacy systems is just as valuable a skill as managing current ones.

## 18. Embedded systems

An __embedded system__ is a __purpose-built device__ where you typically have __no direct access__ to its underlying operating system.

__Examples:__ a fire alarm system, a time clock system — self-contained units you interact with daily, without ever touching the OS underneath.

- __Support comes from the manufacturer:__ they provide whatever tools are needed to keep the system running.
- __Low ongoing maintenance__ is typical for these systems.

## 19. IoT devices

__IoT (Internet of Things)__ covers a broad category of network-connected devices, including:

- Appliances — refrigerators, coffee makers.
- Voice-controlled "smart" devices.
- Heating and air-conditioning controls.
- Doorbells and garage door access.

__The challenge:__ manufacturers of these products are often experts in the appliance itself, but __not necessarily experts in network security__. That mismatch is a real risk.

__The mitigation:__ put IoT devices on their __own segmented network__, limiting what an attacker could reach even if one IoT device were compromised.

## 20. Security perspective

- __Redundancy protects critical services.__ DHCP, DNS and especially authentication servers should run in pairs (or more) — a single point of failure for authentication takes down access to everything else.
- __Centralised logging (syslog/SIEM) is a detection tool, not just storage.__ Correlating events across many systems is how attacks that touch multiple devices get noticed.
- __Time matters for security, not just convenience.__ Correct, synchronised time (NTP) is essential for making sense of logs during an investigation, and for encryption protocols that depend on accurate timestamps.
- __A proxy and a UTM are both chokepoints you can trust__ — but only if traffic is actually forced through them. Devices that bypass the proxy or firewall (e.g. using a personal hotspot) undermine every control behind it.
- __Segment what you can't fully trust.__ SCADA/ICS and IoT devices share the same lesson: isolate systems that are hard to secure directly, so a compromise there doesn't spread.
- __Legacy and embedded systems are common weak points.__ They often can't be patched like a normal server, so isolation and monitoring matter even more.
- __A load balancer's automatic failover is a resilience feature — not a substitute for fixing the underlying fault.__ Removing a failed server from rotation buys time; it doesn't resolve the cause.

# Summary

- __DNS__ resolves names to addresses, is distributed and cached, and is managed by a provider or internally.
- __DHCP__ automatically configures IP settings; enterprises run it redundantly.
- __File sharing__ uses SMB (Windows) or AFP (macOS), hidden behind the OS's file interface.
- __Print services__ queue and manage jobs, over SMB, IPP or LPD.
- __Email__ demands very high uptime.
- __Syslog__ consolidates logs to a central __SIEM__ for correlation, which needs plenty of storage.
- __Web servers__ serve HTTP/HTTPS and HTML pages.
- __AAA/authentication servers__ check credentials centrally, and run redundantly since everything else depends on them.
- __Database servers__ store data in relational tables, queried with __SQL__.
- __NTP__ keeps clocks accurate — vital for logs and encryption.
- __Spam gateways__ filter unwanted email, imperfectly.
- __UTM / next-gen firewall / web security gateway__ bundles filtering, malware scanning, firewall, IPS, bandwidth shaping and VPN into one device.
- __Load balancers__ spread traffic across servers and automatically route around failures.
- __Proxy servers__ make requests on a client's behalf, for security, access control, caching and content scanning.
- __SCADA/ICS__ controls industrial equipment remotely, on a tightly segmented network.
- __Legacy systems__ are old but often still critical.
- __Embedded systems__ are purpose-built, with no direct OS access and manufacturer-provided support.
- __IoT devices__ cover smart appliances and controls; put them on their own segmented network.

# Glossary

__Term__

__Definition__

Data centre

A facility housing racks of servers and network equipment

DNS

Domain Name System — resolves domain names to IP addresses

FQDN

Fully qualified domain name

DHCP

Dynamic Host Configuration Protocol — automatic IP configuration

SMB

Server Message Block — Windows file/print sharing

AFP

Apple Filing Protocol — macOS file sharing

IPP

Internet Printing Protocol

LPD

Line Printer Daemon

Syslog

A protocol for sending log messages to a central collector

SIEM

Security Information and Event Manager

Web server

Serves HTTP/HTTPS requests and HTML pages

HTML

Hypertext Markup Language — the language web pages are written in

AAA server

Authentication, Authorization and Accounting server

Database server

Stores data in relational tables

SQL

Structured Query Language — used to query databases

NTP

Network Time Protocol

Spam gateway

Filters unsolicited email

UTM

Unified Threat Management — an all-in-one security appliance

Load balancer

Distributes traffic across multiple servers

Server farm

A group of servers performing the same role behind a load balancer

Proxy server

Makes requests on behalf of a client, inspecting the response

SCADA

Supervisory Control and Data Acquisition

ICS

Industrial Control System — another name for SCADA-controlled environments

Legacy system

Old equipment or software still in use

Embedded system

A purpose-built device with no direct OS access

IoT

Internet of Things — network-connected everyday devices

# Review questions

1. What does DNS do, and how is load distributed across its servers?
2. Why do enterprises typically run multiple DHCP servers?
3. Which file-sharing protocol is associated with Windows, and which with macOS?
4. Name three protocols a network printer might support.
5. Why does email require an especially high uptime expectation?
6. What's the difference between syslog and a SIEM?
7. What language is used to build web pages, and what protocol serves them?
8. What does AAA stand for, and why do enterprises run redundant authentication servers?
9. What is a relational database, and what language is used to query it?
10. Give two reasons accurate time (NTP) matters on a network.
11. Name three functions commonly bundled into a UTM/all-in-one security appliance.
12. Describe what happens when a server fails behind a load balancer.
13. What are the two main purposes of a proxy server described in this lesson?
14. Why are SCADA/ICS networks usually completely segmented?
15. What's the defining trait of an embedded system?
16. Why are IoT devices often put on their own network segment?

# Answer key

1. __DNS resolves fully qualified domain names to IP addresses (and can work in reverse).__ Load is distributed primarily by which domain names a group of servers supports.
2. __For redundancy__ — if one DHCP server becomes unavailable, others can still assign addresses.
3. __SMB (Server Message Block) for Windows; AFP (Apple Filing Protocol) for macOS.__
4. __Any three of:__ SMB, IPP (Internet Printing Protocol), LPD (Line Printer Daemon).
5. __Users expect email to always be available__, so it must be planned, designed and implemented for maximum uptime.
6. __Syslog is the protocol that sends log data to a central point; a SIEM is the central server that consolidates and correlates that data.__
7. __HTML (Hypertext Markup Language), served over HTTP or HTTPS.__
8. __Authentication, Authorization and Accounting.__ Because the authentication server gates access to every other resource, its failure would block everything — so redundancy is essential.
9. __A database where tables are linked together so related data can be connected.__ SQL (Structured Query Language) is used to query it.
10. __Any two of:__ comparing log files across systems only works if their clocks agree; many encryption technologies require the correct date and time to function.
11. __Any three of:__ URL filtering/content inspection, malware scanning, spam filtering, firewall, IPS, bandwidth shaping, VPN, router/switch interfaces, CSU/DSU.
12. __The load balancer detects the failed server, removes it from rotation, and distributes the load across the remaining servers.__ Once fixed, the load balancer automatically detects it's healthy and resumes sending it traffic — usually with no visible outage to users.
13. __Security, and access control__ (the lesson also mentions caching and content scanning as additional benefits).
14. __Because they control valuable, often critical physical equipment__, so unauthorised access must be very difficult — hence segmentation and controlled access.
15. __It's purpose-built, and you typically have no direct access to its operating system.__
16. __Their manufacturers are often not experts in network security,__ so isolating them limits what an attacker could reach if one were compromised.
