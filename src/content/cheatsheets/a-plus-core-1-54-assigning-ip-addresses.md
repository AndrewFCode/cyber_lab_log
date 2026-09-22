---
title: "A+ Core 1 2.6: Assigning IP Addresses"
description: "Professor Messer A+ 220-1201 objective 2.6 — IP address, subnet mask and gateway; static vs dynamic vs DHCP reservation; APIPA range and its ARP check."
tags: ["a-plus", "comptia", "messer", "networking", "ip-addressing", "dhcp", "apipa"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "a-plus-core-1"
module: "Assigning IP Addresses"
moduleOrder: 54
unit: 2
---
> **In one line:** every device needs an IP address, subnet mask and default gateway (plus DNS), set by hand, by DHCP, or by a DHCP reservation — and if DHCP fails, it gives itself a local-only APIPA address in 169.254.x.x.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.6 (Assigning IP Addresses).* The full version is the Assigning IP Addresses class notes; the section overview is the Section 2 sheet.

---

## The settings

| Setting | Example | Job |
|---|---|---|
| IP address | `192.168.1.165` | Unique address of this device |
| Subnet mask | `255.255.255.0` (`/24`) | Which part is the network; defines the **IP subnet** |
| Default gateway | `192.168.1.1` | Local router for anything off-subnet; must be inside the subnet |
| DNS servers | `192.168.1.1` | Names to addresses |
| Others | NTP, VoIP servers | Time, phones and similar |

The mask isn't carried in packets: get it from the administrator or DHCP.

## Local or remote?

| Destination | AND `255.255.255.0` | Result for host `192.168.1.165` |
|---|---|---|
| `192.168.1.20` | `192.168.1.0` | Same network → **local**: ARP for it and send directly |
| `192.168.2.20` | `192.168.2.0` | Different → **remote**: send to the gateway |

A `/24` = 256 addresses, **254 usable** (minus network and broadcast). Typo `255.255.0.0` instead → the host treats `192.168.2.20` as local, ARPs for it, and gets no answer.

## Static vs reservation vs dynamic

| Method | Set where | Use for | Catch |
|---|---|---|---|
| Static (manual) | On the device | Routers, DHCP and DNS servers | Typos; change = revisit every device |
| DHCP reservation | DHCP server (MAC → IP) | Printers, anything needing a fixed address | Depends on DHCP; new NIC = new MAC |
| Dynamic (DHCP) | DHCP server pool | Laptops, desktops, phones | Address may change |
| APIPA | The device itself | Nothing — fallback only | Means DHCP failed |

Changed DHCP settings reach clients at **lease renewal** (usually at half the lease) or `ipconfig /renew` — not only on restart. Anything DHCP itself depends on should be **static**, not reserved.

## APIPA

| Fact | Detail |
|---|---|
| Stands for | Automatic Private IP Addressing (standard name: IPv4 link-local) |
| When | Set to DHCP, but no DHCP server answers |
| Reserved block | `169.254.0.0/16` |
| Actually assigned | `169.254.1.0` – `169.254.254.255` (first and last 256 held back) = 65,024 addresses |
| Reach | Other link-local devices on the same segment only; no gateway, no internet |
| Duplicate check | ARP probes (from `0.0.0.0`): no reply → use it; reply → pick again |
| On Windows | `ipconfig /all` shows **Autoconfiguration IPv4 Address**; retries DHCP about every 5 minutes |

**Seeing 169.254?** Check the link → `ipconfig /release` then `/renew` → are neighbours on 169.254 too (server or path down) or just this device (port, cable, VLAN, adapter)? → is the DHCP pool full?

## Commands

```powershell
New-NetIPAddress -InterfaceAlias 'Ethernet' -IPAddress 192.168.1.165 -PrefixLength 24 `
  -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceAlias 'Ethernet' -ServerAddresses 192.168.1.1
```

```bat
netsh interface ip set address name="Ethernet" static ^
  192.168.1.165 255.255.255.0 192.168.1.1
netsh interface ip set address name="Ethernet" dhcp
ipconfig /release
ipconfig /renew
```

```bash
sudo ip addr add 192.168.1.165/24 dev eth0      # until reboot
sudo ip route add default via 192.168.1.1
sudo arping -D -I eth0 192.168.1.165            # is anyone else using it? (0 replies = free)
```

GUI: `ncpa.cpl` → adapter properties → Internet Protocol Version 4 → "Obtain an IP address automatically" or "Use the following IP address".

## 🔐 Security notes

- **Rogue DHCP:** clients take the first offer, so a rogue server can hand out its own gateway or DNS and sit in the middle. Use DHCP snooping.
- **DHCP starvation:** fake MACs empty the pool; new devices fall back to APIPA. A spike in 169.254 addresses may be an attack, not just an outage.
- **Reservations trust MACs,** and MACs can be spoofed — don't treat a reserved IP as identity in firewall rules.
- **No DHCP ≠ no access:** anyone can type a static address. Use port security or 802.1X.
- **Watch gateway and DNS settings:** whoever controls them controls where traffic goes; malware has changed them before.

## Practice drills

<details>
<summary>1. What three settings give a device connectivity inside and outside its subnet?</summary>

**IP address, subnet mask and default gateway.** DNS is usually needed too.
</details>

<details>
<summary>2. Host <code>192.168.1.165/24</code>: is <code>192.168.1.200</code> local? Is <code>192.168.3.1</code>?</summary>

**192.168.1.200 is local; 192.168.3.1 is remote** and goes via the gateway.
</details>

<details>
<summary>3. What is a DHCP reservation keyed on?</summary>

The device's **MAC address**. The device stays on DHCP but always gets the same IP.
</details>

<details>
<summary>4. Why should the DHCP server have a manual static address?</summary>

It **can't get an address from itself**. Infrastructure that DHCP depends on is configured statically.
</details>

<details>
<summary>5. A laptop shows <code>169.254.10.5</code>. What happened, and can it browse the web?</summary>

**DHCP failed** and it self-assigned an APIPA address. **No** — it can only reach its local segment.
</details>

<details>
<summary>6. Which APIPA addresses can actually be assigned?</summary>

**169.254.1.0 to 169.254.254.255** — the first and last 256 of 169.254.0.0/16 are reserved.
</details>

<details>
<summary>7. How does a device check its APIPA address is free?</summary>

It sends **ARP probes** for the address; if nobody replies, it uses it.
</details>

<details>
<summary>8. The whole floor is on 169.254 addresses. Where do you look first?</summary>

The **DHCP server** or the path to it (relay, VLAN, link) — many devices failing at once rules out a single laptop.
</details>

## Key takeaways

- IP address + subnet mask + default gateway (+ DNS) = working connectivity.
- The mask decides local vs remote; the gateway must sit inside the subnet.
- Reservations give fixed addresses with central management; core infrastructure stays manually static.
- `169.254.1.0`–`169.254.254.255` = APIPA = DHCP failed; local segment only.
- Devices pick up DHCP changes at lease renewal.
