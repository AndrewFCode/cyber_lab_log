---
title: "A+ Core 1 2.7: VLANs and VPNs"
description: "A LAN (Local Area Network) is a group of devices connected together into a single broadcast domain. Send a broadcast from one device on that LAN, and every other device on that same LAN sees it."
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 2.4__

__Quick reference:__ the short version of this lesson is the VLANs and VPNs cheat sheet, part of Section 2.

## Learning objectives

By the end of these notes you should be able to:

1. Define a LAN in terms of a broadcast domain, and explain why separate switches create separate broadcast domains.
2. Explain the inefficiency of using one physical switch per network, and how VLANs solve it.
3. Describe how VLANs assign switch interfaces to logically separate broadcast domains.
4. Explain why devices on different VLANs need a router to communicate.
5. Explain what a VPN does, and the role of a VPN concentrator.
6. Distinguish client-to-site VPNs from site-to-site VPNs, and describe how each is typically implemented.

## 1. LANs and broadcast domains

## 1.1 What defines a LAN

A __LAN (Local Area Network)__ is a group of devices connected together into a __single broadcast domain__. Send a __broadcast__ from one device on that LAN, and __every other device on that same LAN__ sees it.

## 1.2 Separate switches, separate broadcast domains

A __separate switch__ creates a __separate broadcast domain__. A broadcast sent on one switch's network (call it the __red__ network) is __not__ seen by devices connected to a different switch's network (the __blue__ network) — they're entirely separate.

__From a security and organisational standpoint, this is a good design.__ Everyone on red connects to the red switch; everyone on blue connects to the blue switch — clean separation.

## 1.3 The inefficiency problem

__Worked example — wasted switch capacity.__ A 24-port switch has only __two devices__ connected. A second, separate 24-port switch also has only __two devices__ connected.

- __22 ports sit unused__ on each switch.
- To save money and rack space, you'd want to put __all four devices on one physical switch__.
- But doing that naively would put every device into __one shared broadcast domain__, losing the separation between red and blue.

## 2. VLANs

## 2.1 What a VLAN is

A __VLAN (Virtual Local Area Network)__ solves this: modern switches let you assign __different interfaces (ports)__ on a __single physical switch__ to __different VLANs__. Each VLAN is still its __own separate broadcast domain__ — logically separated, even though the devices share one piece of hardware.

__Worked example — combining two switches into one.__ Instead of two separate 24-port switches, use __one__ 24-port switch:

- Some interfaces are assigned to the __red VLAN__.
- Other interfaces are assigned to the __blue VLAN__.
- A broadcast sent by a device on a __blue__ interface is only seen by __other blue-VLAN interfaces__.
- A broadcast sent on a __red__ interface is only seen by __other red-VLAN interfaces__.

__The result:__ a single switch, a single power source, taking up the space of one device in the rack — while still fully separating red and blue traffic. Two physical switches become __one physical device with logical separation__.

## 2.2 Multiple VLANs on one switch

A switch can support __many__ VLANs, not just two. __Worked example — a three-VLAN switch:__

__VLAN__

__Name__

VLAN 1

Gate room

VLAN 2

Dining room

VLAN 3

Infirmary

Devices on __VLAN 1__ cannot communicate with devices on __VLAN 2__ or __VLAN 3__ — each is a __completely separate broadcast domain__, exactly as if they were on entirely separate physical switches.

## 2.3 Letting VLANs talk to each other

Sometimes there's a legitimate networking reason for devices on different VLANs to communicate. Because VLANs are separate broadcast domains (and separate IP subnets), this requires a __router__ to move traffic between them.

__Option__

__How it works__

Routing built into the switch

Some switches include routing functionality, letting them route between their own VLANs directly

External router

A separate router is connected to route traffic between VLANs

## 3. VPNs

## 3.1 What a VPN does

A __VPN (Virtual Private Network)__ lets devices communicate across a network while __encrypting all of the data__ sent between them. If someone captured that traffic in a packet-capture tool, the encrypted contents would be __unreadable__.

## 3.2 The concentrator

The device that handles this encryption and decryption in real time is called a __concentrator__.

__Feature__

__Detail__

Where it lives

Often built into a __firewall__, or another purpose-built appliance

What it does

Everyone connects to the central concentrator, which __decrypts__ incoming traffic for use inside the network, and __encrypts__ traffic heading back out to the remote station

Form

Usually __hardware__, but __software-only__ concentrator solutions exist too, runnable on an existing server

Client side

Many operating systems include __built-in VPN client software__; __third-party VPN software__ can also be installed

## 4. Client-to-site VPN

## 4.1 The "working from home" scenario

If you've ever worked from home, you've likely used a __client-to-site VPN__:

- __The client__ — you, the remote user at home.
- __The site__ — a concentrator at a central point, typically at the __edge of the corporate network__.

__All remote users and devices outside the building__ connect to that __one central concentrator__, across the internet. The concentrator is, in turn, connected to the __internal corporate network__.

## 4.2 What this achieves

- __All communication between the remote user and the concentrator is always encrypted__ — the data is fully protected in transit.
- __The concentrator decrypts__ the traffic and sends it on to the appropriate resources inside the corporate network.

## 4.3 Always-on VPN

A client-to-site VPN can be configured as __always-on__:

1. The moment the remote user's laptop __turns on and logs in__, the VPN link to the concentrator is created __automatically__.
2. __No manual VPN software step is needed.__
3. Anytime the device is on and connected to the internet, it has an __encrypted channel back to the concentrator__ — continuously.

## 5. Site-to-site VPN

## 5.1 Connecting whole locations

Large organisations often have a __central corporate network__ plus __remote sites__ at other physical locations. One way to connect those sites together is over an __existing internet link__ — but that raises the same concern: anyone able to observe internet traffic could potentially see what's being sent.

The solution is a __site-to-site VPN__.

## 5.2 How it's implemented

__Component__

__Role__

Firewall at the corporate network

Connects to the internal network, the internet, and the VPN

Firewall at the remote site

Connects to that site's network, the internet, and the VPN

Site-to-site VPN

Configured __between the two firewalls__

__The firewalls act as the VPN concentrators__ for this connection.

## 5.3 What's encrypted, and what isn't

__Traffic__

__Encryption__

Inside either site's own network

__In the clear__ — no VPN involved

Between the two sites, over the internet

__Always encrypted__, via the site-to-site VPN

Every time information travels from the remote site back to the corporate network (or vice versa) across the internet, it goes through the __encrypted channel__ automatically — with no individual user action required.

## 5.4 Client-to-site vs site-to-site

__Client-to-site__

__Site-to-site__

Connects

One remote user's device to the network

Two whole networks (sites) to each other

Endpoint at the user's end

VPN client software on the user's device

A firewall at the remote site

Endpoint at the corporate end

A concentrator

A firewall at the corporate network

Typical use

Working from home, travelling staff

Branch offices, remote facilities

## 6. Security perspective

- __VLANs are a segmentation tool, not encryption.__ Traffic within a VLAN is not encrypted by the VLAN itself — VLANs control __which devices can see which broadcast traffic and reach each other directly__, not confidentiality of the data.
- __Inter-VLAN routing reintroduces reachability — and risk.__ Any router connecting VLANs should apply __firewall rules or access control lists__ between them; otherwise, segmenting into VLANs achieves little if every VLAN can freely route to every other.
- __A misconfigured switch port can put a device on the wrong VLAN,__ potentially exposing it to traffic (like the infirmary or gate room example) it should never see. Port-level VLAN assignment should be checked, not assumed.
- __The VPN concentrator is a high-value target.__ It's the single point where encrypted traffic becomes readable — compromising it exposes everything passing through, so it needs strong patching, monitoring and access control.
- __Always-on VPN reduces user error__ (forgetting to connect) but also means a compromised or lost device retains a live, automatic path into the corporate network — device security and remote-wipe capability matter more as a result.
- __Site-to-site VPNs protect data between sites, not inside them.__ Traffic is "in the clear" once it's inside either network, so internal security controls at both ends still matter.

# Summary

- __A LAN is a single broadcast domain.__ Separate switches create separate broadcast domains, which is good for security and organisation but wastes switch capacity when few devices use each one.
- __VLANs__ let a single physical switch host multiple __logically separate broadcast domains__, by assigning different interfaces to different VLANs — combining hardware without losing separation.
- __Devices on different VLANs can't communicate directly.__ A __router__ (built into the switch, or external) is needed to route between VLANs when required.
- __A VPN encrypts data in transit,__ so captured traffic is unreadable. A __concentrator__ — often built into a firewall, hardware or software — handles the real-time encryption and decryption.
- __Client-to-site VPN__ connects an individual remote user to a central concentrator at the network's edge, encrypting all traffic between them — often configured __always-on__.
- __Site-to-site VPN__ connects two whole networks together over the internet, typically implemented __firewall to firewall__, with each firewall acting as a concentrator. Traffic between the sites is always encrypted; traffic within each site is not.

# Glossary

__Term__

__Definition__

LAN

Local Area Network — a single broadcast domain

Broadcast domain

The set of devices that receive a broadcast sent within it

Broadcast

A message sent to every device within a broadcast domain

VLAN

Virtual Local Area Network — a logically separate broadcast domain on shared switch hardware

Interface (port)

A physical connection point on a switch, assignable to a VLAN

Inter-VLAN routing

Routing traffic between different VLANs

VPN

Virtual Private Network — encrypts data sent across a network

Concentrator

A device that encrypts and decrypts VPN traffic in real time

VPN client

Software on a user's device that connects to a VPN concentrator

Client-to-site VPN

A VPN connecting one remote user's device to a central network

Site-to-site VPN

A VPN connecting two whole networks (sites) together

Always-on VPN

A VPN that connects automatically as soon as the device is online

Firewall

A device controlling traffic, often also hosting VPN or concentrator functionality

# Review questions

1. What defines a LAN in terms of broadcast traffic?
2. Why doesn't a broadcast on one switch's network reach devices on a completely separate switch?
3. Describe the inefficiency problem with using one 24-port switch per small group of devices.
4. How does a VLAN solve that inefficiency without losing the separation between networks?
5. In the three-VLAN example (gate room, dining room, infirmary), can a device on VLAN 1 communicate directly with a device on VLAN 2? Why or why not?
6. What's needed to let devices on different VLANs communicate, and name two ways to provide it?
7. What does a VPN do to data sent across a network?
8. What is a VPN concentrator, and where is it often built into?
9. In a client-to-site VPN, what are the "client" and the "site"?
10. What does an always-on VPN configuration do for the user?
11. How is a site-to-site VPN typically implemented?
12. In a site-to-site VPN, which traffic is encrypted and which isn't?
13. Why is a VPN concentrator considered a high-value security target?
14. Why don't VLANs alone provide confidentiality for the data crossing them?

# Answer key

1. __A LAN is a single broadcast domain__ — a broadcast sent by any device on it is seen by every other device on it.
2. __Each switch forms its own separate broadcast domain__, so broadcasts don't cross between physically separate switches.
3. __Each switch might only have a couple of devices connected out of 24 ports__, wasting most of its capacity, cost and rack space.
4. __A VLAN lets different interfaces on one physical switch belong to different, logically separate broadcast domains__, so one switch can do the job of several without merging the networks.
5. __No.__ Each VLAN is a completely separate broadcast domain, just as if they were on separate physical switches.
6. __A router__ — either routing functionality built into the switch itself, or a separate external router.
7. __It encrypts the data__, so anyone capturing the traffic can't read its contents.
8. __A device that encrypts and decrypts VPN traffic in real time__, often built into a firewall or another purpose-built appliance (hardware or software).
9. __The client is the remote user's device; the site is the concentrator at the edge of the corporate network.__
10. __It automatically creates the VPN connection to the concentrator as soon as the device turns on and logs in__, with no manual step needed.
11. __Firewall to firewall__ — one firewall at the corporate network, one at the remote site, with the VPN configured between them.
12. __Traffic between the two sites, over the internet, is always encrypted. Traffic inside either site's own network is in the clear.__
13. __It's the single point where encrypted traffic becomes readable__, so compromising it would expose everything passing through it.
14. __VLANs control which devices can see broadcasts and reach each other — they're a segmentation mechanism, not an encryption mechanism.__ Data within a VLAN isn't encrypted by the VLAN itself.
