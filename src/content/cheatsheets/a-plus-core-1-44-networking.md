---
title: "A+ Core 1: Networking"
description: "Professor Messer A+ 220-1201 section 2 — IP, TCP/UDP and ports, wireless, network services, DNS/DHCP/VLAN/VPN, devices, IP addressing, connection types and tools."
tags: ["a-plus", "comptia", "messer", "networking"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "a-plus-core-1"
module: "Networking"
moduleOrder: 44
unit: 2
---
> **In one line:** IP gets packets to the right machine, ports get them to the right program, and a handful of services (DNS, DHCP) make it all automatic.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1 course, section 2 (objectives 2.1–2.8).*

---

## 2.1 IP, TCP, UDP and ports

- **IP** moves packets between addresses.
- **TCP** and **UDP** ride on IP, and **ports** pick the application.
- IP address + port = a **socket**, e.g. `192.168.1.10:443`.

| TCP | UDP |
|---|---|
| Connection-oriented — three-way handshake: SYN → SYN-ACK → ACK | Connectionless — just sends |
| Reliable: acknowledgements, retransmits, ordering, flow control | No delivery guarantee; low overhead |
| Web, email, SSH, file transfer, RDP | DNS queries, DHCP, streaming, VoIP, gaming |

| Port range | Use |
|---|---|
| 0–1023 | Well-known (non-ephemeral) — servers listen here |
| Higher ports | Ephemeral — temporary client ports (Windows uses 49152–65535) |

### Common ports (220-1201 list)

| Port | Protocol | Transport | Use |
|---|---|---|---|
| 20 / 21 | FTP | TCP | File transfer (data / control) — cleartext |
| 22 | SSH | TCP | Encrypted remote shell; SFTP and SCP too |
| 23 | Telnet | TCP | Cleartext remote shell — legacy |
| 25 | SMTP | TCP | Mail between servers |
| 53 | DNS | UDP / TCP | Name resolution (TCP for zone transfers and large replies) |
| 67 / 68 | DHCP | UDP | Automatic IP configuration (server / client) |
| 80 | HTTP | TCP | Web — cleartext |
| 110 | POP3 | TCP | Download mail |
| 143 | IMAP | TCP | Mail kept in sync on the server |
| 389 | LDAP | TCP / UDP | Directory queries (Active Directory) |
| 443 | HTTPS | TCP | Web over TLS |
| 445 | SMB | TCP | Windows file and printer sharing |
| 636 | LDAPS | TCP | LDAP over TLS |
| 3389 | RDP | TCP | Remote Desktop |

**Real-world extras** not on this exam's list: 587 SMTP submission · 993 IMAPS · 995 POP3S · 137–139 NetBIOS · 161/162 SNMP · 514 syslog.

| Check a port | Command |
|---|---|
| Can I reach it? | `Test-NetConnection server01 -Port 443` · Linux: `nc -zv server01 443` |
| What's listening here? | `Get-NetTCPConnection -State Listen` · `netstat -ano` · Linux: `ss -tulpn` |

---

## 2.2 Wireless

| Band | Traits |
|---|---|
| 2.4 GHz | Longer range, more interference, few channels — non-overlapping **1, 6, 11** |
| 5 GHz | Faster, many more channels, shorter range; some channels need radar detection (DFS) |
| 6 GHz | Wi-Fi 6E / 7 — lots of clean spectrum, shortest range |

- **Channel width:** 20 / 40 / 80 / 160 MHz (320 MHz on Wi-Fi 7). Wider is faster but more prone to interference.
- **Regulations:** allowed channels and power vary by country.

| Standard | Name | Bands |
|---|---|---|
| 802.11n | Wi-Fi 4 | 2.4 / 5 GHz |
| 802.11ac | Wi-Fi 5 | 5 GHz |
| 802.11ax | Wi-Fi 6 / 6E | 2.4 / 5 GHz (6E adds 6 GHz) |
| 802.11be | Wi-Fi 7 | 2.4 / 5 / 6 GHz |

| Other wireless | Notes |
|---|---|
| Bluetooth | 2.4 GHz personal area network; around 10 m |
| RFID | Tags read by radio — badges, inventory, tolls. Passive tags are powered by the reader |
| NFC | 13.56 MHz, a few cm — payments, pairing, access control |

```powershell
netsh wlan show interfaces                 # connected SSID, signal, band, channel
netsh wlan show networks mode=bssid        # nearby networks with channels — a quick Wi-Fi survey
```

```bash
nmcli dev wifi list                        # Linux equivalent
```

---

## 2.3 Network services

| Service | Job |
|---|---|
| DNS server | Names → IP addresses |
| DHCP server | Hands out IP configuration automatically |
| File share | Central storage (SMB on Windows, NFS on Linux) |
| Print server | Central print queues and drivers |
| Mail server | Sends (SMTP) and stores (IMAP/POP3) email |
| Syslog | Collects logs from many devices in one place |
| Web server | Serves websites and web apps |
| AAA | Authentication, authorisation, accounting — e.g. RADIUS, TACACS+ |
| Spam gateway | Filters email before it reaches users |
| All-in-one security appliance (UTM) | Firewall, IPS, URL filter, anti-malware and VPN in one box |
| Load balancer | Spreads traffic across servers; removes failed ones |
| Proxy server | Makes requests on users' behalf — caching, filtering, logging |
| SCADA / ICS | Controls industrial equipment — keep it isolated |
| Legacy and embedded systems | Old or single-purpose systems that can't be easily patched |
| IoT | Smart devices: cameras, sensors, thermostats |

---

## 2.4 DNS, DHCP, VLANs and VPNs

### DNS records

| Record | Maps |
|---|---|
| A | Name → IPv4 |
| AAAA | Name → IPv6 |
| CNAME | Name → another name (alias) |
| MX | Domain → its mail servers |
| TXT | Free text — used for email authentication, below |

| Email authentication (TXT) | Does | Example |
|---|---|---|
| SPF | Lists servers allowed to send for the domain | `v=spf1 include:spf.protection.outlook.com -all` |
| DKIM | Publishes the public key that verifies mail signatures | At `<selector>._domainkey.example.com` |
| DMARC | Tells receivers what to do when SPF/DKIM fail, and where to send reports | `v=DMARC1; p=reject; rua=mailto:dmarc@example.com` |

- **SPF endings:** `-all` = hard fail, `~all` = soft fail.
- **DMARC policies:** `p=none`, `quarantine` or `reject`.

```powershell
nslookup example.com
nslookup -type=mx example.com
nslookup -type=txt _dmarc.example.com
Resolve-DnsName example.com -Type TXT
ipconfig /displaydns          # local DNS cache
ipconfig /flushdns            # clear it
```

```bash
dig example.com MX +short
dig TXT _dmarc.example.com +short
```

### DHCP

| Term | Meaning |
|---|---|
| DORA | **D**iscover → **O**ffer → **R**equest → **A**cknowledge (broadcast; UDP 67 / 68) |
| Scope / pool | The range of addresses handed out, plus options (gateway, DNS, domain) |
| Exclusion | Addresses inside the scope that are never handed out |
| Reservation | A fixed address always given to one MAC address |
| Lease | How long the client keeps the address; renewal is attempted at 50 % |

```powershell
ipconfig /all                        # DHCP server, lease obtained and expires
ipconfig /release
ipconfig /renew
```

### VLANs and VPNs

- **VLAN:** splits one physical switch into separate broadcast domains — e.g. staff, guests, IoT. Traffic between VLANs needs a router or layer-3 switch.
- **VPN:** an encrypted tunnel over an untrusted network.
  - **Client-to-site:** a remote worker's VPN client connects to a concentrator or firewall.
  - **Site-to-site:** a permanent tunnel between two offices' firewalls.

---

## 2.5 Network devices

| Device | Role |
|---|---|
| Router | Forwards traffic between networks by IP address; home routers also do NAT, DHCP and Wi-Fi |
| Unmanaged switch | Plug-and-play; forwards by MAC address; no configuration |
| Managed switch | Configurable: VLANs, QoS, port mirroring, monitoring |
| Access point | Bridges wireless clients onto the wired network |
| Patch panel | Cable runs punched down at the back, patch leads at the front |
| Firewall | Allows or blocks traffic by rule; next-gen firewalls understand applications |
| PoE | Power over the Ethernet cable — APs, phones, cameras |
| Cable modem | ISP handoff over coax (DOCSIS) |
| DSL modem | ISP handoff over the phone line |
| ONT | Optical network terminal — fibre in, Ethernet out |
| NIC | The host's network interface; holds the MAC address |

| PoE standard | At the switch | At the device |
|---|---|---|
| 802.3af (PoE) | 15.4 W | 12.95 W |
| 802.3at (PoE+) | 30 W | 25.5 W |
| 802.3bt (PoE++) | 60 W / 90 W | 51 W / 71.3 W |

---

## 2.6 IPv4, IPv6 and assigning addresses

| IPv4 | Detail |
|---|---|
| Structure | 32 bits as four octets (0–255), e.g. `192.168.1.20` |
| Subnet mask | Splits network from host: `255.255.255.0` = `/24` |
| Private ranges | `10.0.0.0/8` · `172.16.0.0/12` (172.16–172.31) · `192.168.0.0/16` — NAT translates them to a public IP |
| Loopback | `127.0.0.1` — "this machine" |
| APIPA | `169.254.x.x` — self-assigned when **DHCP failed**; only reaches the local segment |

| IPv6 | Detail |
|---|---|
| Structure | 128 bits, eight groups of four hex digits |
| Shortening | Drop leading zeros; replace **one** run of all-zero groups with `::`. `2001:0db8:0000:0000:0000:0000:0000:0001` → `2001:db8::1` |
| Link-local | Starts `fe80::` — every interface has one |
| Loopback | `::1` |

| Assignment | When |
|---|---|
| Static | Servers, printers, network gear — set IP, mask, gateway and DNS by hand |
| Dynamic (DHCP) | Clients — automatic |
| DHCP reservation | Static-like, but managed centrally |
| APIPA | Automatic fallback when DHCP doesn't answer — a symptom, not a fix |

```powershell
Get-NetIPConfiguration
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.1.50 -PrefixLength 24 -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 192.168.1.1
ncpa.cpl                                   # the GUI route
```

```bash
ip a                                       # addresses
ip route                                   # default gateway
resolvectl status                          # DNS servers (systemd systems)
```

---

## 2.7 Internet connection and network types

| Connection | Notes |
|---|---|
| Fibre | Fastest; ONT at the premises |
| Cable | Coax (DOCSIS); bandwidth shared with the neighbourhood |
| DSL | Phone line; download faster than upload; slows with distance from the exchange |
| Satellite | Geostationary: high latency. Low-earth-orbit constellations: much lower |
| Cellular | 4G / 5G routers and hotspots |
| WISP | Wireless ISP — fixed antenna, line of sight to a tower |

| Network type | Scale |
|---|---|
| PAN | Personal — Bluetooth around one person |
| LAN | One building or site |
| WLAN | Wireless LAN |
| WAN | Connects distant sites — the internet is the largest |
| SAN | Storage area network — block storage for servers |

---

## 2.8 Network tools

| Tool | Use |
|---|---|
| Crimper | Attaches RJ45 connectors to cable |
| Cable tester | Checks continuity and pinout |
| Punch-down tool | Seats wires into patch panels and keystone jacks |
| Tone generator and probe | Traces a cable to its other end through walls or a patch panel |
| Loopback plug | Tests a port or NIC by looping its signal back |
| Wi-Fi analyzer | Shows networks, channels, signal strength and interference |
| Network tap | Copies traffic for monitoring or analysis |

---

## 🔐 Security notes

- **Cleartext protocols expose credentials:**

  | Insecure | Use instead |
  |---|---|
  | Telnet 23 | SSH 22 |
  | FTP 20/21 | SFTP 22 |
  | HTTP 80 | HTTPS 443 |
  | LDAP 389 | LDAPS 636 |

- **Never expose RDP 3389 or SMB 445 to the internet.** Both are leading ransomware entry points. Put RDP behind a VPN or gateway.
- **Rogue DHCP servers** can hand out an attacker's gateway or DNS server. Managed switches block them with DHCP snooping. Check `ipconfig /all` shows the expected DHCP and DNS servers.
- **SPF, DKIM and DMARC** are the first things to check on a spoofed-email ticket. A domain with no DMARC record is easy to impersonate.
- **Segment with VLANs.** IoT devices, cameras, guests and SCADA shouldn't share a network with staff PCs.
- **Change default credentials** on routers, APs, cameras and IoT devices, and keep their firmware updated.
- **Know what's listening:** `Get-NetTCPConnection -State Listen` or `ss -tulpn`. Unexpected listeners are worth investigating.

---

## Practice drills

<details>
<summary>1. A PC shows 169.254.33.7. What happened and what's your first step?</summary>

APIPA — DHCP didn't answer. Check the cable or Wi-Fi link, then `ipconfig /release` and `ipconfig /renew`. Then check the DHCP server or scope.
</details>

<details>
<summary>2. Which ports would you allow for secure web, remote shell and Remote Desktop?</summary>

443, 22 and 3389 — with RDP only over a VPN.
</details>

<details>
<summary>3. Mail from your domain is landing in spam at other companies. Which records do you check?</summary>

SPF, DKIM and DMARC — e.g. `nslookup -type=txt example.com` and `nslookup -type=txt _dmarc.example.com`.
</details>

<details>
<summary>4. Shorten <code>fe80:0000:0000:0000:0a1b:0000:0000:0042</code>.</summary>

`fe80::a1b:0:0:42` — only one `::` is allowed, so the second zero run is written out.
</details>

<details>
<summary>5. A printer's address keeps changing. Two fixes?</summary>

A DHCP reservation for its MAC address, or a static IP outside the DHCP scope.
</details>

<details>
<summary>6. You need to find which wall port a cable in the comms room goes to. Which tool?</summary>

Tone generator and probe.
</details>

---

## Key takeaways

- TCP is reliable and connection-based; UDP is fast and fire-and-forget. Ports pick the application.
- Memorise the 220-1201 port list — and know the secure alternatives.
- 2.4 GHz = range and 1/6/11; 5 and 6 GHz = speed.
- DNS records (A, AAAA, CNAME, MX, TXT plus SPF/DKIM/DMARC), DHCP (DORA, scope, reservation, lease), VLANs split networks, VPNs tunnel them.
- 169.254.x.x means DHCP failed. Private ranges are 10/8, 172.16/12 and 192.168/16.
