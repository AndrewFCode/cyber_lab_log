---
title: IP, Gateway, DNS Definitions and use
description: "Revising on what IP, Gateways, DNS are and their use case. "
draft: false
pubDate: 2026-09-27
---
**IP address** — your device's unique address on the local network (e.g. `192.168.1.42`). It's how other devices and the router know where to send data to and from you. Comes with a **subnet mask** (e.g. `255.255.255.0`) that defines which addresses count as "local."

**Default gateway** — the address of your router (e.g. `192.168.1.1`). Anything not on your local network (i.e. the whole internet) gets handed off to the gateway to forward onward. It's the door out of your local network.

**DNS server** — translates names into IP addresses (e.g. `google.com` → `142.250.…`). When you type a website, your device asks the DNS server for the matching IP before it can connect. Often set to your router or a public resolver like `8.8.8.8`.