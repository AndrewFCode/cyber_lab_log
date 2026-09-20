---
title: "A+ Core 1: Networking"
description: "Data sent across a network is wrapped in layers, like envelopes inside envelopes ("
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Section 2 (objectives 2.1–2.8)__

__Quick reference:__ the short version of this section is the Section 2 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain how IP, TCP and UDP work together, and identify common ports (2.1).
2. Describe wireless frequencies, channels, Bluetooth, RFID and NFC (2.2).
3. Describe the purpose of common network services (2.3).
4. Explain DNS records (including SPF, DKIM, DMARC), DHCP, VLANs and VPNs (2.4).
5. Describe network devices and PoE (2.5).
6. Explain IPv4 and IPv6 addressing, and static, dynamic and APIPA assignment (2.6).
7. Compare internet connection types and network types (2.7).
8. Choose the right network tool for a job (2.8).
9. Use command-line tools to check addressing, DNS and connectivity.

## 1. IP, TCP, UDP and ports (2.1)

## 1.1 How data is packaged

Data sent across a network is wrapped in layers, like envelopes inside envelopes (

__encapsulation__):

 \+-----------------------------------------------------------------\+
 | Ethernet frame (MAC addresses — gets it across the local link)  |
 |  \+-----------------------------------------------------------\+  |
 |  | IP packet (IP addresses — gets it to the right computer)  |  |
 |  |  \+-----------------------------------------------------\+  |  |
 |  |  | TCP or UDP segment (ports — gets it to the right app)| |  |
 |  |  |  \+-----------------------------------------------\+   |  |  |
 |  |  |  | Application data (web page, email, DNS query) |   |  |  |
 |  |  |  \+-----------------------------------------------\+   |  |  |
 |  |  \+-----------------------------------------------------\+  |  |
 |  \+-----------------------------------------------------------\+  |
 \+-----------------------------------------------------------------\+- __IP__ delivers packets between devices using __IP addresses__. It doesn't guarantee delivery.
- __TCP__ and __UDP__ sit on top of IP and use __port numbers__ to reach the right application.
- An __IP address plus a port__ identifies one end of a connection, e.g. 93.184.215.14:443.

## 1.2 TCP vs UDP

__TCP__

__UDP__

Connection

Connection-oriented: sets up a connection first

Connectionless: just sends

Reliability

Acknowledges data; retransmits losses; keeps order

No acknowledgements or retransmission

Overhead

Higher

Lower — faster

Used for

Web (HTTPS), email, file transfer, SSH, RDP

DNS queries, DHCP, streaming, VoIP, online gaming

__The TCP three-way handshake:__

  Client                                Server
    |  ---- SYN (let's talk) ---------->  |
    |  <--- SYN-ACK (ok, let's talk) ---  |
    |  ---- ACK (confirmed) ----------->  |
    |        connection established       |

### 1.3 Port numbers

Ports run from 0 to 65,535.

- __Well-known (non-ephemeral) ports, 0–1023,__ are where standard server services listen.
- __Ephemeral ports__ are temporary high-numbered ports that clients pick for their end of a connection (Windows uses 49152–65535).

## 1.4 Common ports (220-1201 list)

__Port__

__Protocol__

__TCP/UDP__

__Purpose__

__Secure?__

20, 21

FTP

TCP

File transfer (21 control, 20 data)

No — cleartext

22

SSH

TCP

Encrypted remote shell; also SFTP and SCP

Yes

23

Telnet

TCP

Remote shell

No — cleartext, legacy

25

SMTP

TCP

Sending mail between servers

Plain by default; STARTTLS adds encryption

53

DNS

UDP (TCP for large replies and zone transfers)

Name resolution

—

67, 68

DHCP

UDP

Automatic IP configuration (67 server, 68 client)

—

80

HTTP

TCP

Web

No

110

POP3

TCP

Download mail

No (995 for POP3S)

143

IMAP

TCP

Access mail kept on the server

No (993 for IMAPS)

389

LDAP

TCP/UDP

Directory queries (Active Directory)

No

443

HTTPS

TCP

Web over TLS

Yes

445

SMB

TCP

Windows file and printer sharing

Supports encryption (SMB 3)

636

LDAPS

TCP

LDAP over TLS

Yes

3389

RDP

TCP

Remote Desktop

Encrypted — but a major attack target

__Useful extras outside the exam list:__ 587 (mail submission), 993 (IMAPS), 995 (POP3S), 137–139 (NetBIOS), 161/162 (SNMP), 514 (syslog).

## 1.5 Worked example — which port?

__Scenario__

__Port(s)__

A user can browse http:// sites but not https:// sites

443 is blocked

An admin needs an encrypted command-line session to a Linux server

22 (SSH)

An email client downloads mail and removes it from the server

110 (or 995 secure) — POP3

An email client keeps mail synced on the server across devices

143 (or 993 secure) — IMAP

PCs get no IP address automatically

67/68 (DHCP)

A PC can reach 8.8.8.8 but not google.com

53 (DNS)

Mapping a network drive to \\\\fileserver\\share

445 (SMB)

Test-NetConnection fileserver -Port 445        \

# TcpTestSucceeded : True/False
Get-NetTCPConnection -State Listen             \

# what's listening on this machine
netstat -ano                                   \

# all connections, with process IDs
nc -zv fileserver 445
ss -tulpn

## 2. Wireless networking (2.2)

## 2.1 Frequencies

__Band__

__Range__

__Speed__

__Interference__

__Channels__

2.4 GHz

Longest

Lowest

Highest (microwaves, Bluetooth, neighbours)

Few; only 3 non-overlapping

5 GHz

Medium

Higher

Lower

Many more

6 GHz (Wi-Fi 6E / 7)

Shortest

Highest

Lowest

Lots of clean spectrum

## 2.2 Channels in 2.4 GHz

Each 20 MHz channel overlaps its neighbours. Only __1, 6 and 11__ don't overlap each other:

 Ch:  1    2    3    4    5    6    7    8    9   10   11
     \[=========\]         \[=========\]         \[=========\]
          1                   6                   11- Neighbouring access points should use different non-overlapping channels.
- __Channel width:__ wider channels (40/80/160 MHz, 320 MHz on Wi-Fi 7) carry more data but interfere more easily.
- __Regulations:__ allowed channels and power vary by country.
- __DFS:__ some 5 GHz channels must avoid radar, using dynamic frequency selection.

## 2.3 Wi-Fi standards (for reference)

__Standard__

__Name__

__Bands__

802.11n

Wi-Fi 4

2.4 / 5 GHz

802.11ac

Wi-Fi 5

5 GHz

802.11ax

Wi-Fi 6 / 6E

2.4 / 5 GHz (6E adds 6 GHz)

802.11be

Wi-Fi 7

2.4 / 5 / 6 GHz

## 2.4 Other wireless technologies

__Technology__

__Frequency / range__

__Use__

Bluetooth

2.4 GHz, around 10 m

Personal area network: headsets, keyboards, speakers

RFID

Various frequencies

Tags read by radio: access badges, inventory, toll tags. Passive tags are powered by the reader's signal

NFC

13.56 MHz, a few cm

A subset of RFID: payments, pairing, access control

netsh wlan show interfaces              \

# SSID, signal %, band, channel, speed
netsh wlan show networks mode=bssid     \

# nearby networks and their channels

## 3. Network services (2.3)

__Service__

__What it does__

__Example__

DNS server

Translates names to IP addresses

mail.example.com → 203.0.113.10

DHCP server

Hands out IP configuration automatically

Address, mask, gateway, DNS

File share

Central storage

SMB shares on Windows, NFS on Linux

Print server

Manages print queues and drivers centrally

One queue per printer for the whole office

Mail server

Sends (SMTP) and stores (IMAP/POP3) email

Exchange, Postfix

Syslog

Collects log messages from many devices centrally

Firewall and switch logs into a SIEM

Web server

Serves websites and web applications

IIS, Apache, Nginx

AAA server

Authentication, authorisation and accounting for network access

RADIUS, TACACS\+

Spam gateway

Filters email for spam and malware before delivery

Email security appliance or cloud service

All-in-one security appliance (UTM)

Firewall, IPS, content filtering, anti-malware, VPN in one box

Small-office firewall

Load balancer

Spreads requests across servers; removes failed ones

Web server farm

Proxy server

Makes requests on clients' behalf — filtering, caching, logging

Web proxy

SCADA / ICS

Monitors and controls industrial equipment

Power, water, manufacturing

Legacy and embedded systems

Old or single-purpose systems that can't easily be updated

Old OS running a machine tool

IoT devices

Networked smart devices

Cameras, thermostats, sensors

## 4. Network configuration (2.4)

## 4.1 DNS and how a name is resolved

 PC --(1) "www.example.com?"--> Recursive resolver (ISP or company DNS)
                                 |
                                 \+-(2) root server:          "ask .com"
                                 \+-(3) .com TLD server:      "ask example.com's"
                                 \+-(4) authoritative server: 93.184.215.14
 PC <--(5) "93.184.215.14" ------\+  (answer cached for its TTL)

__The TTL (time to live)__ controls how long the answer is cached. That's why DNS changes aren't instant, and why ipconfig /flushdns sometimes fixes stale results.

__Record__

__Purpose__

__Example__

A

Name → IPv4 address

www → 93.184.215.14

AAAA

Name → IPv6 address

www → 2606:2800:21f:cb07:6820:80da:af6b:8b2c

CNAME

Alias: one name points to another name

shop → shops.myplatform.com

MX

Mail servers for the domain, with priority

10 mail.example.com

TXT

Free-form text — used for verification and email security

SPF, DKIM, DMARC

## 4.2 Email authentication records

__Record__

__Answers__

__Lives at__

SPF

Which servers may send mail for this domain?

TXT on the domain itself

DKIM

Is this message's signature valid? (Publishes the public key)

TXT at <selector>.\_domainkey.<domain>

DMARC

What should receivers do if SPF/DKIM fail — and where to report?

TXT at \_dmarc.<domain>

__Worked example — reading the records:__

example.com.         TXT  "v=spf1 include:spf.protection.outlook.com -all"
\_dmarc.example.com.  TXT  "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"- __SPF:__ Microsoft 365's servers may send for example.com. -all means __hard fail__ — every other sender is unauthorised. (~all would be a soft fail.)
- __DMARC:__ mail failing authentication should be __quarantined__ (sent to spam). Aggregate reports go to dmarc@example.com. Policies escalate none → quarantine → reject.

nslookup -type=txt example.com
nslookup -type=txt \_dmarc.example.com
Resolve-DnsName example.com -Type MX

### 4.3 DHCP

__DORA:__

 Client                                   DHCP server
   | --- DISCOVER (broadcast: any DHCP?) ---> |
   | <-- OFFER    (you can have .50) -------- |
   | --- REQUEST  (I'll take .50) ----------> |
   | <-- ACK      (it's yours for 8 hours) -- |

__Term__

__Meaning__

Scope

The range of addresses the server can hand out, plus options

Pool

The available addresses within the scope

Exclusion

Addresses inside the scope that are never handed out (e.g. for static devices)

Reservation

A specific address always given to a specific MAC address

Lease

How long the client may keep its address; it tries to renew at 50 % of the lease

Options

Extra settings sent to clients: default gateway, DNS servers, domain name

__Worked example — designing a small office scope:__

1. __Network:__ 192.168.10.0/24 (usable addresses 1–254).
2. __Router (gateway):__ 192.168.10.1, static.
3. __Servers and printers:__ statically set in .2–.19, so __exclude__ .1–.19.
4. __Scope:__ .20–.240 for clients. The printer at .15 could instead get a __reservation__ tied to its MAC address.
5. __Options:__ gateway 192.168.10.1; DNS 192.168.10.2; lease 8 hours.

ipconfig /all          \

# DHCP enabled?, DHCP server, lease obtained/expires
ipconfig /release
ipconfig /renew

### 4.4 VLANs

A __VLAN (virtual LAN)__ splits one physical switch into several separate logical networks — separate __broadcast domains__. Devices in different VLANs can't talk directly; traffic between them must go through a router or layer 3 switch, where it can be filtered.

            One managed switch
 \+---------------------------------------------\+
 | VLAN 10 Staff  | VLAN 20 Guests | VLAN 30 IoT |
 |  PC  PC  PC    |  Laptop  Phone |  Cam  Cam   |
 \+---------------------------------------------\+
        \\               |               /
          \+---- Router / firewall ----\+   (controls traffic between VLANs)

### 4.5 VPNs

A __VPN (virtual private network)__ creates an __encrypted tunnel__ across an untrusted network such as the internet.

__Type__

__Connects__

__Example__

Client-to-site (remote access)

One user's device to the organisation's network

A remote worker's VPN client connects to the office firewall or VPN concentrator

Site-to-site

Two networks permanently

Head office ↔ branch office, between firewalls

## 5. Network devices (2.5)

## 5.1 The devices

__Device__

__Works with__

__Behaviour__

Router

IP addresses (layer 3)

Forwards traffic __between__ networks; connects the LAN to the internet. Home routers add NAT, DHCP, Wi-Fi and a firewall

Unmanaged switch

MAC addresses (layer 2)

Plug and play. Learns which MAC is on which port and forwards frames only there; no configuration

Managed switch

MAC (layer 2) and sometimes IP

Configurable: VLANs, port settings, QoS, port mirroring, monitoring

Access point

Layer 2

Bridges wireless clients onto the wired network

Patch panel

—

Cable runs punched down at the back; short patch cables at the front connect to switches

Firewall

Layer 3–7

Allows or blocks traffic by rules (IP, port, application)

Cable modem

—

Connects to the ISP over coax (DOCSIS)

DSL modem

—

Connects to the ISP over the telephone line

ONT

—

Optical network terminal: converts the ISP's fibre to Ethernet

NIC

Layer 2

The device's network interface; each has a unique MAC address

__Worked example — how a switch learns:__

1. PC A (port 1) sends a frame to PC B. The switch records "MAC A is on port 1".
2. It doesn't yet know where MAC B is, so it __floods__ the frame to all ports.
3. PC B replies from port 5. The switch records "MAC B is on port 5".
4. From now on, frames between A and B go only to ports 1 and 5.

(A hub, by contrast, always repeats everything to every port.)

## 5.2 Power over Ethernet

__PoE__ sends power and data over one Ethernet cable — ideal for access points, IP phones and cameras mounted where there's no power socket.

__Standard__

__Name__

__Max power per port__

802.3af

PoE

15.4 W

802.3at

PoE\+

30 W

802.3bt

PoE\+\+ (Type 3 / Type 4)

60 W / 100 W

Power can come from a __PoE switch__ or a __PoE injector__ placed between a normal switch and the device.

## 6. IP addressing (2.6)

## 6.1 IPv4

An IPv4 address is __32 bits__, written as four __octets__ (0–255): 192.168.1.50.

The __subnet mask__ shows which part identifies the __network__ and which identifies the __host__:

__Notation__

__Mask__

__Network part__

__Host part__

/8

255.0.0.0

First octet

Last three octets

/16

255.255.0.0

First two octets

Last two octets

/24

255.255.255.0

First three octets

Last octet

__Worked example — 192.168.1.50 /24:__

__Item__

__Value__

Network address

192.168.1.0

Usable host range

192.168.1.1 – 192.168.1.254 (254 hosts)

Broadcast address

192.168.1.255

This host

.50

Two devices can talk directly only if they're on the same network. Otherwise traffic goes to the __default gateway__ (the router), usually .1.

## 6.2 Public, private and special addresses

__Range__

__Type__

10.0.0.0/8

Private

172.16.0.0/12 (172.16.x.x – 172.31.x.x)

Private

192.168.0.0/16

Private

169.254.0.0/16

APIPA / link-local — self-assigned when DHCP fails

127.0.0.1

Loopback ("this computer")

Everything else (mostly)

Public — routable on the internet

__Private addresses__ aren't routed on the internet. __NAT__ on the router translates them to the router's public IP for outbound traffic.

## 6.3 IPv6

- __128 bits__, written as eight groups of four hex digits.
- __Shortening rules:__
	1. Drop the leading zeros in each group.
	2. Replace __one__ run of consecutive all-zero groups with ::.
- __Special addresses:__ ::1 is loopback; fe80::/10 is __link-local__ (every interface has one); addresses beginning 2 or 3 are global unicast.

__Worked example — shortening:__

1. Start: 2001:0db8:0000:0000:0000:ff00:0042:8329
2. Drop leading zeros: 2001:db8:0:0:0:ff00:42:8329
3. Collapse the zero run: 2001:db8::ff00:42:8329

## 6.4 Assigning addresses

__Method__

__How__

__Best for__

Static

Manually set IP, subnet mask, default gateway and DNS servers

Servers, printers, network devices

Dynamic (DHCP)

Automatically leased from a DHCP server

Client PCs, phones, laptops

DHCP reservation

DHCP always gives the same IP to a given MAC

Printers that need a fixed address but central management

APIPA

The OS gives itself 169.254.x.x when no DHCP server answers

A __symptom__, not a solution — it only reaches the local segment, with no gateway

__Worked example — an APIPA ticket:__

1. A user has "no internet"; ipconfig shows 169.254.23.7, so DHCP failed.
2. __Check the physical connection:__ cable and port lights, or Wi-Fi association.
3. __Retry DHCP:__ ipconfig /release then ipconfig /renew.
4. __Still APIPA?__ Check whether others are affected (DHCP server down or scope exhausted), and check the switch port or VLAN.
5. __Record the cause__ in the ticket — e.g. "scope full; extended scope; lease shortened".

__Setting a static address:__

Get-NetIPConfiguration
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.10.15 -PrefixLength 24 -DefaultGateway 192.168.10.1
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 192.168.10.2

## 7. Connection types and network types (2.7)

## 7.1 Internet connection types

__Type__

__Medium__

__Traits__

Fibre

Light through glass; ONT at the premises

Fastest; symmetric options; low latency

Cable

Coax (DOCSIS)

Fast; bandwidth shared with the neighbourhood

DSL

Telephone line

Slower; download faster than upload; slows with distance from the exchange

Satellite

Radio to satellites

Geostationary: high latency. Low-earth-orbit constellations: much lower latency

Cellular

4G/5G

Mobile routers and hotspots; good backup links

WISP

Fixed wireless to a tower

Rural areas; needs line of sight

## 7.2 Network types

__Type__

__Scale__

__Example__

PAN

Personal — around one person

Bluetooth headset and phone

LAN

A building or site

Office network

WLAN

Wireless LAN

Office Wi-Fi

WAN

Connects distant sites

Offices linked across the country; the internet

SAN

Dedicated high-speed storage network

Servers accessing shared block storage

## 8. Network tools (2.8)

__Tool__

__Use__

__Scenario__

Crimper

Attaches RJ45 connectors to cable

Making a patch cable

Cable stripper

Removes the outer jacket cleanly

Preparing cable for crimping or punching down

Cable tester

Checks continuity and correct pin-out

"Is this new cable wired right?"

Punch-down tool

Seats wires into patch panels and keystone jacks

Terminating a wall-port cable run

Tone generator and probe

Traces a cable to its other end

"Which patch panel port goes to desk 14?"

Loopback plug

Loops a port's transmit back into its receive

Testing a NIC or switch port

Wi-Fi analyzer

Shows networks, channels, signal and interference

Choosing the least congested channel

Network tap

Copies traffic passing through a link

Feeding a monitoring or IDS system

## 9. Security perspective

- __Prefer encrypted protocols:__ SSH (22) over Telnet (23); SFTP over FTP; HTTPS (443) over HTTP (80); LDAPS (636) over LDAP (389).
- __Never expose RDP (3389) or SMB (445) directly to the internet.__ Both are among the most attacked services. Use a VPN or gateway, with MFA.
- __Rogue DHCP servers__ can hand out an attacker's gateway or DNS server. Managed switches use __DHCP snooping__ to allow DHCP offers only from trusted ports.
- __DNS matters:__ a hijacked DNS server setting sends users to fake sites. Check ipconfig /all shows the expected DNS servers.
- __SPF, DKIM and DMARC__ are the first things to check on a spoofed-email ticket. Without DMARC, a domain is easy to impersonate.
- __Segment with VLANs.__ IoT, cameras, guests and legacy or SCADA systems belong on separate VLANs, with firewall rules between them.
- __Change default credentials__ on routers, APs, cameras and IoT devices, and keep their firmware updated.
- __Know what's listening:__ unexpected open ports (Get-NetTCPConnection -State Listen, ss -tulpn) are worth investigating.

# Summary

- __Encapsulation:__ data rides inside TCP/UDP (ports) inside IP (addresses) inside Ethernet (MACs).
- __TCP vs UDP:__ TCP is reliable and connection-oriented (SYN, SYN-ACK, ACK); UDP is fast and connectionless.
- __Ports to memorise:__ 20/21, 22, 23, 25, 53, 67/68, 80, 110, 143, 389, 443, 445, 636, 3389.
- __Wireless:__ 2.4 GHz = range and interference, channels 1/6/11; 5 and 6 GHz = speed. Bluetooth, RFID and NFC are short-range.
- __DNS:__ A, AAAA, CNAME, MX, TXT, with SPF/DKIM/DMARC for email. Resolution goes resolver → root → TLD → authoritative.
- __DHCP__ uses DORA, with scope, pool, exclusions, reservations and leases. __VLANs__ split networks; __VPNs__ tunnel securely.
- __Devices:__ a router joins networks; switches learn MACs; APs bridge wireless; PoE = 15.4 / 30 / 60–100 W.
- __IPv4:__ /24 = 254 hosts. Private ranges are 10/8, 172.16/12 and 192.168/16; 169.254 = APIPA. IPv6 is 128-bit, shortened with :: once.

# Glossary

__Term__

__Definition__

Encapsulation

Wrapping data in successive protocol headers

IP address

A logical address identifying a device on a network

Port

A number identifying an application or service on a host

TCP / UDP

Reliable connection-oriented / fast connectionless transport

Three-way handshake

SYN, SYN-ACK, ACK — how TCP opens a connection

Ephemeral port

A temporary high-numbered client port

Non-overlapping channels

2.4 GHz channels 1, 6 and 11

RFID / NFC

Radio tags / very short-range wireless communication

DNS

Translates names to IP addresses

TTL

Time to live — how long a DNS answer is cached

SPF / DKIM / DMARC

Email sender authorisation / signing / policy and reporting

DHCP / DORA

Automatic IP configuration / Discover, Offer, Request, Acknowledge

Scope / reservation / exclusion

DHCP range / fixed MAC-to-IP mapping / addresses kept out of the pool

VLAN

A logical network separated on shared switch hardware

VPN

An encrypted tunnel over an untrusted network

Router / switch

Forwards between networks by IP / within a network by MAC

PoE

Power over Ethernet

ONT

Optical network terminal

Subnet mask / CIDR

Network/host split, e.g. 255.255.255.0 = /24

APIPA

Self-assigned 169.254.x.x address when DHCP fails

NAT

Translates private addresses to a public address

Link-local (IPv6)

An fe80:: address valid only on the local link

# Review questions

1. Which transport protocol would you expect a video call to use, and why?
2. What are the three steps of the TCP handshake?
3. A user can reach websites by IP address but not by name. Which service is failing, and on which port?
4. Which port does LDAPS use?
5. Why should 2.4 GHz access points use channels 1, 6 and 11?
6. What does an MX record do?
7. Interpret v=spf1 include:\_spf.google.com ~all.
8. Put the DHCP process in order, and name the ports used.
9. What's the difference between a DHCP reservation and an exclusion?
10. A PC shows 169.254.10.4. What does that mean?
11. For 10.20.30.40/24, what are the network and broadcast addresses?
12. Shorten fe80:0000:0000:0000:0204:61ff:fe9d:f156.
13. Which device do you need to find which wall port a cable in the comms room goes to?
14. What's the difference between client-to-site and site-to-site VPNs?

# Answer key

1. __UDP__ — low latency matters more than retransmitting lost packets, which would arrive too late anyway.
2. __SYN → SYN-ACK → ACK.__
3. __DNS, port 53.__
4. __636.__
5. __They're the only non-overlapping 20 MHz channels__, so neighbouring APs don't interfere.
6. __It lists the mail servers that accept email for a domain__, with priorities.
7. __Google's mail servers may send for the domain; mail from other servers is a soft fail__ (~all), usually marked rather than rejected.
8. __Discover → Offer → Request → Acknowledge;__ UDP 67 (server) and 68 (client).
9. __A reservation always gives a specific IP to a specific MAC; an exclusion keeps addresses out of the pool entirely__ (e.g. for static devices).
10. __APIPA — the PC couldn't reach a DHCP server__ and gave itself a link-local address. It has no internet or routed access.
11. __Network 10.20.30.0, broadcast 10.20.30.255__ (usable hosts .1–.254).
12. __fe80::204:61ff:fe9d:f156.__
13. __A tone generator and probe.__
14. __Client-to-site connects one user's device to a network; site-to-site permanently links two networks.__
