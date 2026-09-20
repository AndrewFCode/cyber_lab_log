---
title: "A+ Core 1 2.6: Dynamic Host Configuration Protocol (DHCP)"
description: "Before automatic addressing, every device's IP configuration — IP address, subnet mask, default gateway, DNS servers and other settings — had to be entered manually. That was manageable with a small number of devices…"
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 2.4__

__Quick reference:__ the short version of this lesson is the DHCP cheat sheet, part of Section 2.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why DHCP was created and what it replaced.
2. Describe the four-step DORA process, including the exact source/destination addresses and ports at each step.
3. Explain why DHCP messages are sent as broadcasts.
4. Describe a DHCP scope, and the difference between a pool and an exclusion.
5. Explain how a DHCP scope is configured, using a real console as an example.
6. Explain DHCP reservations, how they're matched to a device, and why they're useful.

## 1. Why DHCP exists

## 1.1 Before DHCP

Before automatic addressing, every device's IP configuration — __IP address, subnet mask, default gateway, DNS servers__ and other settings — had to be __entered manually__. That was manageable with a __small number of devices__ using unchanging static addresses, but becomes impractical with __thousands of devices__ on a modern network.

## 1.2 DHCP's origin and purpose

__DHCP (Dynamic Host Configuration Protocol)__ was created in __1997__ to let a system administrator __automatically__ assign this configuration across an entire infrastructure. It's the reason you can open a laptop in a coffee shop and start browsing immediately, with no manual setup at all.

## 2. The DORA process

The automated exchange that gets a device its IP address is commonly called __DORA__: __D

__iscover, __O

__ffer, __R

__equest, __A

__cknowledge. It runs every time a device connects to a network and needs an address from a DHCP server.

## 2.1 The scenario

Two devices join the network: __Sam's laptop__ and __Jack's laptop__, both with __no IP address yet__. The default behaviour of almost every OS is to request an address via DHCP automatically. This walkthrough follows __Sam's__ laptop; __Jack's__ goes through the identical four steps separately.

__Network in this example:__

- DHCP server: __10.10.10.99__
- Sam's laptop, once assigned: __10.10.10.42__

## 2.2 Step 1 — Discover

Sam's laptop doesn't know where any DHCP server is, so it __broadcasts__ a __DHCP Discover__ message to find out.

__Field__

__Value__

Source IP

0.0.0.0 (Sam has no address yet)

Source port

UDP __68__

Destination

Broadcast — reaches __every device__ on the local subnet

The switch forwards this broadcast to __every device__ on the local subnet, including the DHCP server.

## 2.3 Step 2 — Offer

The DHCP server (__10.10.10.99__) responds with a __DHCP Offer__, proposing an IP address Sam's laptop could use.

__Field__

__Value__

Source

The DHCP server, 10.10.10.99

Destination

Broadcast, 255.255.255.255 — Sam has no address to send directly to yet

__If more than one DHCP server exists on the network,__ Sam's laptop could receive __multiple offers__ to choose between.

## 2.4 Step 3 — Request

Sam's laptop picks one offer, and __broadcasts a Request__ for that specific address back to the network.

__Field__

__Value__

Source IP

0.0.0.0 (still no address)

Source port

UDP __68__

Destination

255.255.255.255, UDP __67__

Because it's a broadcast, __every device on the subnet receives it__, including the DHCP server — and, if there were more than one, every other DHCP server too (so they know their offer wasn't chosen).

## 2.5 Step 4 — Acknowledge

The DHCP server sends an __Acknowledgment__, confirming the address is now __locked in__ for Sam's device for the duration of the __lease__ — it won't be handed to anyone else during that time.

__Field__

__Value__

Source

The DHCP server, 10.10.10.99

Destination

Broadcast, 255.255.255.255, UDP __68__

__Once Sam's laptop receives this acknowledgment, it finally updates its own configuration__ — Sam's laptop is now 10.10.10.42.

## 2.6 The full sequence

 Sam's laptop (no IP yet)                    DHCP server (10.10.10.99)
        |                                               |
        |--- 1. DISCOVER (broadcast, src 0.0.0.0) ----->|
        |                                               |
        |<-- 2. OFFER (broadcast to 255.255.255.255) ---|
        |                                               |
        |--- 3. REQUEST (broadcast, "I'll take it") --->|
        |                                               |
        |<-- 4. ACK (broadcast: it's yours) ------------|
        |                                               |
   Sam's laptop now configured as 10.10.10.42

__Exam tip:__ notice that __every message in DORA is a broadcast__. Even the server's replies go to 255.255.255.255, because the requesting device doesn't have a usable IP address to be addressed directly until the very last step completes.

## 3. DHCP scope

## 3.1 What a scope is

How did the server know __which__ address to offer Sam? It had a __predefined list of IP addresses and settings__ already configured — this is the __DHCP scope__.

A scope typically defines:

__Element__

__Purpose__

Available addresses

The full range that could be assigned

__Exclusions__

Addresses __within that range__ that must __never__ be handed out — e.g. because a switch or router already uses them statically

Subnet mask

Sent to clients along with their address

Lease duration

How long an assigned address is valid before renewal is needed

Other options

DNS server, default gateway, VoIP server addresses, and more

__Why exclusions matter:__ if a static device (like a router) already uses an address inside the scope's range, and DHCP handed that same address to someone else, you'd get an __IP address conflict__. Excluding it prevents that.

## 3.2 Pools

Within a scope are __pools__ — the actual groups of addresses the server draws from when assigning a dynamic address. These are usually __large, contiguous__ ranges, for example:

192.168.1.0/24
192.168.2.0/24
192.168.3.0/24A device connecting from any of those subnets gets an address pulled from the __matching pool__.

__Pools don't have to be one single unbroken block.__ You can define different sections within a pool, with __exclusions placed in the middle__ of the range — for instance, reserving a block for statically configured devices while leaving the rest available for dynamic assignment.

## 3.3 Worked example — a Windows Server scope

On a __Windows Server__ running the DHCP role, viewed in Server Manager:

- A scope is configured, for example named __165.245.44.0__, covering that subnet.
- The administrator adds the full range of __available addresses__ into the address pool for that scope.
- The console also lets you __view current leases__ — which addresses are assigned, and to whom.
- __Reservations__ (section 4) and any additional __scope options__ are configured in their own sections of the same interface.

## 4. DHCP reservations

## 4.1 Why some devices need a fixed address

DHCP is often thought of as handing out __any available address at random__. But some devices — a __file server__, a __web server__, or a __router__ — need to keep the __same address every time__ they start up.

## 4.2 The alternative to static configuration

You *could* visit each of those devices and configure a __static IP address__ by hand. But if your addressing scheme ever changes, you'd have to __revisit every single device__ to update it manually.

A __DHCP reservation__ solves this from one place: you configure the fixed assignment on the __DHCP server itself__, and never have to touch the device directly.

## 4.3 How a reservation is matched to a device

The DHCP server is told: __"this MAC address always receives this IP address."__ The device's __MAC address__ is the unique identifier used to recognise it and hand out the same address every time.

__Other names for this:__ static DHCP assignment, static DHCP, or simply an __IP reservation__.

## 4.4 Worked example — reservations on a home router

A router's DHCP configuration shows:

__Setting__

__Value__

Address pool

192.168.1.2 – 192.168.1.254

Reservation 1

Device "Prometheus" → always __192.168.1.6__

Reservation 2

Device "Odyssey" → always __192.168.1.9__

- These two addresses (.6 and .9) sit __inside__ the pool range, but are __never handed out dynamically__ — they're reserved for those two specific MAC addresses.
- __Every other device__ that connects receives whatever address is next available from the rest of the pool.
- Every time __Prometheus__ or __Odyssey__ is turned on, it gets its __same, predictable address__, without anyone touching the device itself.

## 5. Security perspective

- __DHCP has no built-in authentication.__ Any device that can broadcast on the local network can request an address — and, more importantly, __any device can pretend to be a DHCP server__. A __rogue DHCP server__ can hand out a malicious default gateway or DNS server, silently redirecting traffic. Managed switches defend against this with __DHCP snooping__, which only trusts DHCP replies from approved ports.
- __Broadcasts mean everyone on the segment sees DHCP traffic__, including the offers and acknowledgments meant for other devices. This is normal — but it's also why DHCP traffic is easy to observe (and spoof) on a shared local network.
- __Reservations are a configuration record worth protecting.__ Access to the DHCP server's configuration is access to control over which device gets which address — including the ability to quietly reassign a sensitive server's address to another machine.
- __Exclusions prevent conflicts, not attacks.__ They stop the DHCP server from accidentally handing out an address already in static use — they don't stop a rogue device from manually claiming an address that's excluded from the pool.
- __Lease duration is a security and management trade-off.__ Short leases mean addresses get reclaimed and reused quickly (useful in high-turnover environments like guest Wi-Fi), while longer leases mean less renewal traffic but slower recovery of "lost" addresses when devices disappear.

# Summary

- __Before DHCP,__ every device's IP settings were configured by hand — unworkable at modern scale. __DHCP (1997)__ automates this.
- __DORA:__ Discover (broadcast, from 0.0.0.0) → Offer (broadcast, from the server) → Request (broadcast, "I'll take that one") → Acknowledge (broadcast, locks in the lease). Every step is a broadcast, because the client has no usable address until the process completes.
- __A scope__ is the DHCP server's configuration for a subnet: available addresses, __exclusions__, subnet mask, lease duration and other options (DNS, gateway, etc.).
- __Pools__ are the groups of addresses drawn from for dynamic assignment — usually large contiguous ranges, but they can have exclusions carved out of the middle.
- __Reservations__ tie a specific __MAC address__ to a specific __IP address__, so a server, router or other fixed device always gets the same address — configured once, centrally, on the DHCP server.

# Glossary

__Term__

__Definition__

DHCP

Dynamic Host Configuration Protocol — automatic IP configuration

DORA

Discover, Offer, Request, Acknowledge — the DHCP process

Broadcast

A message sent to every device on the local subnet

Lease

The period an assigned IP address remains valid

DHCP scope

A DHCP server's configuration for a subnet: addresses, exclusions and options

Pool

The group of addresses available for dynamic assignment within a scope

Exclusion

An address within a scope's range that is never dynamically assigned

DHCP reservation

A fixed IP address permanently tied to a specific device's MAC address

Static DHCP assignment / IP reservation

Other names for a DHCP reservation

MAC address

The unique hardware address used to identify a device for a reservation

DHCP snooping

A switch feature that only trusts DHCP replies from approved ports

Rogue DHCP server

An unauthorised server handing out (potentially malicious) DHCP configuration

# Review questions

1. Why did DHCP become necessary as networks grew?
2. What year was DHCP created?
3. What do the letters in DORA stand for?
4. What source IP address does a device use when sending a DHCP Discover, and why?
5. Why is the DHCP Offer sent as a broadcast rather than directly to the requesting device?
6. At which DORA step does the client's IP address configuration actually get updated?
7. What is a DHCP scope, and name three things it can define.
8. Why would an administrator configure an exclusion within a scope?
9. What's the difference between a pool and a scope?
10. Can a pool have exclusions placed in the middle of its range rather than only at the edges?
11. Why might an administrator use a DHCP reservation instead of a static IP configured on the device itself?
12. What identifies a device for a DHCP reservation?
13. In the router example, why don't Prometheus and Odyssey's addresses ever get handed to another device?
14. Why is a rogue DHCP server a security risk?

# Answer key

1. __Manually configuring IP settings on every device became impractical__ once networks grew to thousands of devices.
2. __1997.__
3. __Discover, Offer, Request, Acknowledge.__
4. __0.0.0.0, because the device doesn't have an IP address yet.__
5. __The client doesn't yet have a usable IP address to be addressed directly__, so the server must broadcast the offer to reach it.
6. __The final step — Acknowledge.__ The client updates its configuration only once it receives the server's acknowledgment.
7. __A scope is the DHCP server's configuration for a subnet.__ Any three of: available address range, exclusions, subnet mask, lease duration, DNS servers, default gateway, other options.
8. __To prevent handing out an address already used statically__ by another device (such as a switch or router), which would otherwise cause an IP address conflict.
9. __A scope is the whole configuration for a subnet (including exclusions and options); a pool is specifically the set of addresses available for dynamic assignment within that scope.__
10. __Yes__ — exclusions can sit anywhere within a pool's range, not just at the start or end.
11. __So that changes to the addressing scheme only need to be made once, on the DHCP server,__ rather than by visiting every device individually.
12. __Its MAC address.__
13. __Those two addresses are configured as reservations tied to Prometheus's and Odyssey's specific MAC addresses__, so the DHCP server never offers them to any other device.
14. __It can hand out malicious configuration__ — such as a false default gateway or DNS server — silently redirecting traffic on the network.
