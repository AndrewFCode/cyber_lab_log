---
title: "A+ Core 1 2.1: Common Ports"
description: "Professor Messer A+ 220-1201 objective 2.1 — FTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP/HTTPS, POP3, IMAP, SMB/CIFS, NetBIOS, LDAP and RDP port numbers."
tags: ["a-plus", "comptia", "messer", "networking", "ports"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "a-plus-core-1"
module: "Common Ports"
moduleOrder: 46
unit: 2
---
> **In one line:** know the port, the protocol (TCP/UDP), and why each service matters — for troubleshooting and for firewall rules.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.1 (common ports).* The full version is the Common Ports class notes; port fundamentals are in the Section 2 primer sheet.

---

## The port list

| Port | Proto | Service | One-line role |
|---|---|---|---|
| 20 | TCP | FTP (data) | Active data transfer |
| 21 | TCP | FTP (control) | Administration / control connection |
| 22 | TCP | **SSH** | Encrypted remote command line |
| 23 | TCP | Telnet | **Unencrypted** remote command line — avoid |
| 25 | TCP | SMTP | **Sends** email, server-to-server and device-to-server |
| 53 | UDP | DNS | Resolves FQDN → IP address |
| 67 | UDP | DHCP (server) | Hands out IP configuration |
| 68 | UDP | DHCP (client) | Client side of DHCP |
| 80 | TCP | HTTP | Web, unencrypted |
| 110 | TCP | POP3 | **Downloads** mail to one device |
| 137 | UDP | NetBIOS Name Service | Legacy Windows name resolution |
| 139 | TCP | NetBIOS Session Service | Legacy Windows file-transfer sessions |
| 143 | TCP | IMAP4 | **Syncs** mail inbox across devices |
| 389 | TCP | LDAP | Queries a directory service (e.g. Active Directory) |
| 443 | TCP | HTTPS | Web, **encrypted** |
| 445 | TCP | SMB (direct) | Modern Windows file sharing, no NetBIOS |
| 3389 | TCP | RDP | Remote desktop view/control |

**Beyond this lesson:** LDAPS = **636**; secure POP3/IMAP = 995/993; SMTP submission = 587.

## Pairs worth remembering

| Unencrypted | Encrypted |
|---|---|
| Telnet (23) | **SSH (22)** |
| HTTP (80) | **HTTPS (443)** |
| LDAP (389) | LDAPS (636 — beyond this lesson) |

| Sends mail | Receives mail |
|---|---|
| SMTP (25) | POP3 (110, one device) / IMAP (143, synced across devices) |

## DHCP terms

**Pool** (available addresses) → **lease** (temporary assignment, renew or release) → **reservation** (always the same IP for one device, e.g. a printer).

## Windows file sharing

**SMB / CIFS** = Windows's sharing protocol. Legacy **NetBIOS**: UDP 137 (names), TCP 139 (sessions). Modern **direct / NetBIOS-less**: TCP **445**.

## LDAP structure

Organisation → **organisational units** (e.g. Production, Support, Engineering) → **common names** (e.g. Sam, Daniel) → named resources (e.g. a database). Classic example: **Microsoft Active Directory**.

---

## 🔐 Security notes

- **Always prefer the encrypted option:** SSH > Telnet; HTTPS > HTTP; LDAPS > LDAP.
- **Never expose RDP (3389) to the internet** — one of the most attacked ports. Use a VPN or gateway, and MFA.
- **Telnet sends credentials in the clear** — isolate any legacy device that still needs it.
- **DHCP and DNS are trust points:** rogue DHCP servers and hijacked DNS settings redirect users silently. Managed switches use DHCP snooping.
- **Don't expose SMB (445) to the internet** — a common worm entry point historically.
- **Check what's actually listening:** `netstat -an` or `Get-NetTCPConnection -State Listen`.

---

## Practice drills

<details>
<summary>1. A user can browse http:// sites but not https:// sites. Which port is blocked?</summary>

443 (HTTPS is blocked; HTTP/80 still works).
</details>

<details>
<summary>2. An admin needs an encrypted command-line session to a Linux server. Which protocol and port?</summary>

SSH, TCP 22.
</details>

<details>
<summary>3. An email client downloads mail and removes it from the server. Which protocol?</summary>

POP3 (TCP 110).
</details>

<details>
<summary>4. An email client keeps mail synced across a phone, laptop and webmail. Which protocol?</summary>

IMAP4 (TCP 143).
</details>

<details>
<summary>5. PCs on a network get no IP address automatically. Which ports would you check?</summary>

UDP 67 (DHCP server) and 68 (DHCP client).
</details>

<details>
<summary>6. A PC can reach 8.8.8.8 but not google.com. Which port/service?</summary>

UDP 53 — DNS.
</details>

<details>
<summary>7. Mapping \\fileserver\share fails only when a firewall rule blocks one port. Which port?</summary>

TCP 445 (direct SMB).
</details>

<details>
<summary>8. What port does Active Directory get queried on via LDAP?</summary>

TCP 389.
</details>

---

## Key takeaways

- **FTP:** 20 (data) / 21 (control). **SSH 22** beats **Telnet 23** (unencrypted).
- **SMTP 25 sends; POP3 110 downloads; IMAP4 143 syncs.**
- **DNS UDP 53** resolves names; **DHCP UDP 67/68** auto-configures IPs (pool → lease → reservation).
- **HTTP 80 vs HTTPS 443** — encryption is the difference.
- **SMB/CIFS** for Windows sharing; legacy **NetBIOS 137/139**; modern **direct 445**.
- **LDAP 389** queries a directory service like Active Directory.
- **RDP 3389** — never expose to the internet directly.
