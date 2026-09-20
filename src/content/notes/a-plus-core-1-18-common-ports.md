---
title: "A+ Core 1 2.2: Common Ports"
description: "You'll use these port numbers in two everyday situations:"
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 2.1__

__Quick reference:__ the short version of this lesson is the Common Ports cheat sheet, part of Section 2. Port fundamentals (well-known vs ephemeral) are in the Section 2 primer.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why knowing port numbers matters for troubleshooting and firewall configuration.
2. State the port and protocol (TCP/UDP) for each service in this lesson, and explain what each service does.
3. Distinguish encrypted protocols from their unencrypted equivalents (SSH/Telnet, HTTP/HTTPS, LDAP/LDAPS).
4. Distinguish protocols that send mail from protocols that receive it.
5. Explain DNS and DHCP's roles, and why each commonly needs redundancy.
6. Describe SMB, NetBIOS and direct (NetBIOS-less) communication on Windows networks.
7. Explain what a directory service is, and how LDAP is used to query one.
8. Describe RDP and what it's used for.

## 1. Why port numbers matter

You'll use these port numbers in two everyday situations:

__Situation__

__Why the port matters__

Troubleshooting communication

Knowing the expected port tells you what "should" be happening, and where to look when it isn't

Firewall configuration

Firewalls commonly use __TCP/UDP port number__ as one of the criteria for allowing or blocking traffic

Memorising this list can feel tedious at first, but using these applications, configuring firewalls and troubleshooting networks makes them second nature. For the exam, know __the port, the protocol (TCP/UDP), and why the service matters__ — not just the number.

## 2. File transfer — FTP

__Port__

__Protocol__

__Service__

__20__

TCP

FTP — __active data transfer__

__21__

TCP

FTP — __control / administration__

__FTP (File Transfer Protocol)__ is a generic protocol, usable from many operating systems, for moving files between devices.

- __Authentication:__ FTP usually asks for a username, password or other credential — but it can also be configured for __anonymous__ login, open to anyone.
- __More than transfer:__ FTP can also __list files in a directory__, and perform administrative actions — add, delete, and rename files.
- __Two ports, different roles:__ different FTP implementations may use one or both — 20 for moving the actual data, 21 for the control connection that manages the session.

## 3. Remote command line — SSH and Telnet

## 3.1 SSH — Secure Shell

__Port__

__Protocol__

__Service__

__22__

TCP

SSH

To administer a remote device at the command line __securely__, the whole session must be __encrypted__. __SSH__ provides this encrypted link, and is the modern standard for remote command-line administration.

## 3.2 Telnet

__Port__

__Protocol__

__Service__

__23__

TCP

Telnet

__Telnet__ (telecommunications network) does the same visible job as SSH — a remote command-line login — but with __no encryption at all__. Everything, including your username and password, is sent __in the clear__.

__Exam tip:__ Telnet and SSH look and feel identical to the user. The difference that matters is __encryption__. Most organisations block Telnet and require SSH — but some very old devices only support Telnet, so you may still meet it.

### 3.3 Worked example — choosing between them

A technician needs to reconfigure an old network switch from the command line, and the switch's manual only mentions Telnet.

1. __Try SSH first__, in case the firmware supports it even if undocumented.
2. __If only Telnet works,__ treat the session as insecure: don't send it over an untrusted network, and change any credentials used over it as soon as a secure method is available.
3. __Recommend a plan to replace or upgrade__ the device, since it can't be administered securely.

## 4. Email

## 4.1 Sending mail — SMTP

__Port__

__Protocol__

__Service__

__25__

TCP

SMTP

__SMTP (Simple Mail Transfer Protocol)__ sends email — both __server to server__, and sometimes from a __local device to its mail server__ when it first submits a message. You may configure SMTP with its port number both on a mail server and on individual devices.

## 4.2 Receiving mail — POP3 and IMAP

__Port__

__Protocol__

__Service__

__110__

TCP

POP3

__143__

TCP

IMAP

__POP3 (Post Office Protocol v3)__

__IMAP4 (Internet Message Access Protocol v4)__

Function

Downloads mail to one device

Manages the inbox on the server

Multiple devices

Not designed for it

__Synchronises across every client__ — folders, read status and moves all stay consistent

Newer / more features

No

__Yes__

__Exam tip:__ SMTP __sends__; POP3 and IMAP __receive__. IMAP is the one that keeps multiple devices in sync.

## 5. Name resolution — DNS

__Port__

__Protocol__

__Service__

__53__

UDP

DNS

Devices communicate using __IP addresses__ — like 162.159.246.164. But people don't type IP addresses into a browser; they type a __fully qualified domain name (FQDN)__, such as www.professormesser.com. __DNS (Domain Name System)__ translates the FQDN into the IP address needed for the actual communication.

Because almost no one memorises IP addresses, DNS is one of the __most important services on any network__. It's common to run __multiple DNS servers for redundancy__, so name resolution keeps working even if one server is unavailable.

## 6. Automatic addressing — DHCP

__Port__

__Protocol__

__Service__

__67__

UDP

DHCP (server)

__68__

UDP

DHCP (client)

Your computer's IP address, subnet mask, default gateway and DNS servers almost certainly weren't typed in by hand — __DHCP (Dynamic Host Configuration Protocol)__ configures them automatically and seamlessly when the device starts up.

__DHCP concept__

__What it means__

Pool

A range of available IP addresses held by the DHCP service

Lease

A device is given an address for a set period of time

Renew

The device can ask to keep the address when the lease is due to expire

Release

The device can give the address back to the pool instead

Reservation

An administrator can configure a device (e.g. a printer or server) to always receive the __same__ IP address

DHCP can run on a __standalone server or appliance__, or be built into a small office/home office (SOHO) wireless router.

## 7. The web — HTTP and HTTPS

__Port__

__Protocol__

__Service__

__80__

TCP

HTTP

__443__

TCP

HTTPS

__HTTP__

__HTTPS__

Full name

Hypertext Transfer Protocol

Hypertext Transfer Protocol __Secure__

Encryption

__None__ — sent in the clear

__Encrypted__

Most sites you browse today use HTTPS, but plenty of services still use plain HTTP over port 80.

## 8. Windows file sharing — SMB, CIFS and NetBIOS

## 8.1 SMB / CIFS

__SMB (Server Message Block)__ — also known as __CIFS (Common Internet File System)__ — is Windows's protocol for transferring data between devices: files, print queue traffic, and other information Windows systems exchange.

## 8.2 NetBIOS

__Port__

__Protocol__

__Service__

__137__

UDP

NetBIOS Name Service

__139__

TCP

NetBIOS Session Service (file transfer)

Older Windows systems used __NetBIOS__ alongside TCP/IP:

- __NetBIOS Name Service (UDP 137)__ resolves NetBIOS names — similar in purpose to DNS, but for the older Windows naming system.
- __NetBIOS session (TCP 139)__ sets up the sessions used to transfer files.

## 8.3 Direct (NetBIOS-less) communication

__Port__

__Protocol__

__Service__

__445__

TCP

SMB direct / NetBIOS-less

Most modern Windows versions connect __directly between IP addresses__, without going through NetBIOS at all — called __direct__ or __NetBIOS-less__ communication, over TCP port 445.

## 8.4 Worked example — mapping a network drive

A user maps \\\\fileserver\\share on a modern Windows 11 PC.

1. __Traffic mostly uses TCP 445__ — direct SMB, no NetBIOS involved.
2. __If a very old device is on the network__ and still relies on NetBIOS name resolution, UDP 137 and TCP 139 may still appear in captures.
3. __If 445 is blocked by a firewall__ between the PC and the server, the mapped drive fails, even though the server is reachable by other means (like a ping).

## 9. Directory services — LDAP

__Port__

__Protocol__

__Service__

__389__

TCP

LDAP

Most organisations keep a __central database__ — a __directory service__ — describing devices, users and resources on the network. __LDAP (Lightweight Directory Access Protocol)__ — or its secure form, __LDAPS__ — is used to query it.

__How a directory is structured:__

- An __organisation__.
- __Organisational units__ within it — for example Production, Support and Engineering.
- __Common names__ for individuals within those units — for example Sam or Daniel.
- Named resources, such as a database called "tech docs".

LDAP lets you __look up where these components are__, and in some cases provides extra details, such as authentication information for a user. The most common real-world use of LDAP is __Microsoft's Active Directory__, which is queried using the LDAP protocol.

__Note (beyond this lesson):__ the lesson names LDAPS but doesn't give its port. __LDAPS (LDAP over TLS) uses TCP 636__ — the encrypted counterpart to LDAP's 389, matching the HTTP/HTTPS pattern in section 7.

## 10. Remote desktop — RDP

__Port__

__Protocol__

__Service__

__3389__

TCP

RDP

__RDP (Remote Desktop Protocol)__ lets you __view and share the desktop__ of a remote device, primarily Windows.

- __You can control the whole computer__, or just __run a single application__ remotely.
- __The RDP client isn't limited to Windows.__ Clients exist for macOS, Linux/Unix, iPhone and other platforms, letting you reach a Windows machine from almost anywhere.
- __This is one reason remote support works at scale:__ with users spread around the world, RDP means you don't have to visit every desk in person.

## 11. All the ports at a glance

__Port__

__Protocol__

__Service__

__Encrypted?__

20

TCP

FTP (data)

No

21

TCP

FTP (control)

No

22

TCP

SSH

Yes

23

TCP

Telnet

No

25

TCP

SMTP

No

53

UDP

DNS

No

67

UDP

DHCP (server)

No

68

UDP

DHCP (client)

No

80

TCP

HTTP

No

110

TCP

POP3

No

137

UDP

NetBIOS Name Service

No

139

TCP

NetBIOS Session Service

No

143

TCP

IMAP

No

389

TCP

LDAP

No

443

TCP

HTTPS

Yes

445

TCP

SMB (direct)

Supports encryption (SMB 3)

3389

TCP

RDP

Yes

__Note (beyond this lesson):__ this lesson doesn't cover LDAPS (636), SMTP submission (587), or the secure forms of POP3 and IMAP (995, 993). These are common exam and real-world extras.

## 12. Security perspective

- __Prefer the encrypted version whenever one exists:__ SSH (22) over Telnet (23); HTTPS (443) over HTTP (80); LDAPS over LDAP (389).
- __Never expose RDP (3389) directly to the internet.__ It's one of the most attacked services in existence. Use a VPN, a remote desktop gateway, or a broker service instead, and enforce MFA.
- __Telnet's cleartext credentials__ can be captured by anyone able to see the traffic. If a legacy device forces its use, isolate it on its own network segment.
- __DHCP and DNS are trust points.__ A rogue DHCP server can hand out a malicious gateway or DNS server; managed switches defend against this with __DHCP snooping__. A hijacked or incorrect DNS setting can silently redirect users to fake sites.
- __FTP's anonymous login__ is convenient but risky if used for anything sensitive — prefer authenticated FTP, or SFTP/FTPS, for real data.
- __SMB (445) shouldn't be exposed to the internet either.__ It's been the entry point for major worm outbreaks (e.g. EternalBlue/WannaCry) when left open.
- __Know what's listening.__ netstat -an (or Get-NetTCPConnection -State Listen) shows which of these ports are actually open on a machine — compare against what you expect.

# Summary

- __Ports matter for troubleshooting and firewall rules__ — know the number, the protocol and why the service matters.
- __File transfer:__ FTP, TCP 20 (data) and 21 (control); can list, add, delete and rename files; supports authenticated or anonymous login.
- __Remote command line:__ SSH (TCP 22, encrypted) is the modern standard; Telnet (TCP 23) is unencrypted and largely retired.
- __Email:__ SMTP (TCP 25) sends; POP3 (TCP 110) downloads to one device; IMAP (TCP 143) synchronises across many devices.
- __DNS (UDP 53)__ resolves names to IP addresses; run redundant servers.
- __DHCP (UDP 67/68)__ automatically configures IP settings, using pools, leases, renewals and reservations.
- __Web:__ HTTP (TCP 80, unencrypted) and HTTPS (TCP 443, encrypted).
- __Windows sharing:__ SMB/CIFS; legacy NetBIOS (UDP 137 name service, TCP 139 sessions); modern __direct/NetBIOS-less__ communication over TCP 445.
- __LDAP (TCP 389)__ queries a directory service such as Active Directory, organised into organisations, organisational units and common names.
- __RDP (TCP 3389)__ shares or controls a remote desktop, from many client operating systems.

# Glossary

__Term__

__Definition__

FTP

File Transfer Protocol

Anonymous login

Logging in without a specific username or password

SSH

Secure Shell — encrypted remote command-line access

Telnet

Unencrypted remote command-line protocol

SMTP

Simple Mail Transfer Protocol — sends email

POP3

Post Office Protocol v3 — downloads mail to one device

IMAP4

Internet Message Access Protocol v4 — synchronises mail across devices

DNS

Domain Name System — resolves names to IP addresses

FQDN

Fully qualified domain name, e.g. [www.example.com](http://www.example.com)

Redundancy

Having more than one server so service continues if one fails

DHCP

Dynamic Host Configuration Protocol — automatic IP configuration

Pool / lease / reservation

DHCP terms for available addresses / a temporary assignment / a fixed assignment

HTTP / HTTPS

Hypertext Transfer Protocol / its encrypted, secure form

SMB

Server Message Block — Windows file and resource sharing

CIFS

Common Internet File System — another name for SMB

NetBIOS

An older Windows name resolution and session protocol

Direct / NetBIOS-less

Modern SMB communication directly over IP, without NetBIOS

Directory service

A central database of network users, devices and resources

LDAP / LDAPS

Lightweight Directory Access Protocol / its secure form

Active Directory

Microsoft's directory service, queried using LDAP

RDP

Remote Desktop Protocol

# Review questions

1. Give two reasons knowing common port numbers matters in practice.
2. What are TCP ports 20 and 21 used for, and how do their roles differ?
3. What port and protocol does SSH use? What's its key advantage over Telnet?
4. Why do most organisations block Telnet?
5. Which protocol sends email, and which receive it?
6. What's the key difference between POP3 and IMAP for someone using two devices?
7. Which port and protocol does DNS use, and why is DNS redundancy common?
8. List the four things DHCP typically configures automatically.
9. What's the difference between a DHCP lease and a DHCP reservation?
10. Which ports distinguish HTTP from HTTPS, and what's the difference between them?
11. What port does modern Windows use for direct SMB communication, without NetBIOS?
12. What are the two NetBIOS ports, and what does each do?
13. What does LDAP do, and what's a well-known example of a directory it can query?
14. What port does RDP use, and name two operating systems, other than Windows, that can run an RDP client.

# Answer key

1. __Troubleshooting communication problems, and configuring firewalls,__ which commonly filter by port number.
2. __TCP 20 is the active data transfer; TCP 21 is the control/administration connection.__ Different FTP implementations may use one or both.
3. __TCP port 22. It's encrypted__, unlike Telnet, which sends everything in the clear.
4. __Because Telnet sends all communication, including credentials, unencrypted.__
5. __SMTP sends; POP3 and IMAP receive.__
6. __IMAP synchronises the inbox (folders, read status, moves) across every device; POP3 simply downloads mail to one device.__
7. __UDP port 53. Redundancy__ ensures name resolution keeps working even if one DNS server is unavailable — and almost everything depends on DNS.
8. __IP address, subnet mask, default gateway and DNS servers.__
9. __A lease is temporary and can be renewed or released; a reservation always assigns the same IP address to a specific device__ (e.g. a printer or server).
10. __HTTP uses TCP 80 (unencrypted); HTTPS uses TCP 443 (encrypted).__
11. __TCP port 445__ — direct, or NetBIOS-less, communication.
12. __UDP 137 (NetBIOS Name Service) and TCP 139 (NetBIOS session service, used to set up file transfers).__
13. __It queries a directory service__ — a central database of users, devices and resources, organised into organisations, organisational units and common names. __Microsoft Active Directory__ is a well-known example.
14. __TCP port 3389. Any two of:__ macOS, Linux/Unix, iPhone (and other RDP client platforms).
