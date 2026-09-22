---
title: "Networking for Sysadmins 2: Ethernet"
description: "Lucas, Networking for System Administrators (2nd ed.) ch. 2 — interfaces, autonegotiation, MTU and DF ping, ARP and NDP, VLAN terms and datalink error counters."
tags: ["networking", "ethernet", "mtu", "arp", "vlans", "networking-for-sysadmins"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "networking-sysadmins"
module: "Ch. 2"
moduleOrder: 65
unit: 2
---
> **In one line:** Ethernet is where cables, MTUs, ARP and VLANs live — check the link, the MTU, the neighbour table and the error *rate* before blaming anything higher up.

*Companion to: Michael W Lucas, Networking for System Administrators (2nd ed.), chapter 2 — written from general networking knowledge, following the chapter's headings.* The full version is the Ethernet class notes.

---

## Interfaces at a glance

| Task | Windows (PowerShell) | Debian | FreeBSD |
|---|---|---|---|
| List interfaces | `Get-NetAdapter` | `ip -br link` | `ifconfig -l` |
| Addresses | `Get-NetIPConfiguration` | `ip -br addr` | `ifconfig em0` |
| Loopback | Loopback Pseudo-Interface 1 (`Get-NetIPInterface`) | `lo` | `lo0` |
| Speed and duplex | `Get-NetAdapter \| Select-Object Name, LinkSpeed, FullDuplex` | `sudo ethtool eth0` | `ifconfig em0 \| grep media` |
| MTU | `Get-NetIPInterface` (NlMtu) | `ip link` | `ifconfig em0` (first line) |
| Set MTU (until reboot on Unix) | `Set-NetIPInterface -InterfaceAlias 'Ethernet' -NlMtuBytes 9000` | `sudo ip link set dev eth0 mtu 9000` | `ifconfig em0 mtu 9000` |

**Interface names:** Debian `eno1` (on board) · `enp3s0` (PCI slot) · `ens18` (VMs) · `wlp2s0` (wireless). FreeBSD driver + number: `em0`/`igb0` Intel · `ix0` Intel 10G · `re0` Realtek · `vtnet0` VirtIO. MAC notation: Windows `02-FC-00-00-00-01`, Unix `02:fc:00:00:00:01`.

**Loopback:** `127.0.0.0/8` and `::1`. Pinging it proves the local TCP/IP stack only. `localhost` may resolve to `::1` first.

## Autonegotiation

| Symptom | Likely cause |
|---|---|
| 100 Mb/s on gigabit kit | Damaged pair, or a port hard-set to 100 |
| Slow, errors climb under load | Duplex mismatch |
| Late collisions on full duplex | Duplex mismatch |
| No link after a manual change | Different forced speeds at each end |

**Rule:** auto at both ends, or hard-set both identically. Hard-set one side and the auto side falls back to half duplex. VMs report `Speed: Unknown!`, which is normal.

## MTU and fragments

| Fact | Value |
|---|---|
| Standard Ethernet MTU | 1,500 bytes |
| Jumbo frames | Usually 9,000; every device on the segment must match |
| PPPoE | Typically 1,492 |
| IPv6 minimum link MTU | 1,280 |
| DF ping data size | MTU − 28 (IPv4) or MTU − 48 (IPv6) → 1,472 / 1,452 |

| Platform | Don't-fragment ping (1,500 MTU) |
|---|---|
| Windows | `ping -f -l 1472 host` (too big: "Packet needs to be fragmented but DF set.") |
| Debian | `ping -M do -s 1472 host` (too big: "message too long, mtu=…") |
| FreeBSD | `ping -D -s 1472 host` |

- **IPv4:** routers may fragment unless DF is set. **IPv6:** routers never fragment; they send ICMPv6 "packet too big".
- **PMTU black hole:** ping and SSH logins work, big transfers stall → ICMP "fragmentation needed" is being blocked.
- **Find a path MTU:** lower the DF ping size until replies return; largest working size + 28 = path MTU.

## Physical media

| Medium | Reach | Notes |
|---|---|---|
| Cat 5e | 100 m | 1 Gb/s (usually 2.5 Gb/s too) |
| Cat 6 | 100 m (10 Gb/s: ~55 m) | |
| Cat 6a | 100 m | 10 Gb/s |
| Multimode fibre | Hundreds of metres | Often aqua; 10GBASE-SR ~300 m on OM3 |
| Single-mode fibre | Kilometres | Usually yellow; 10GBASE-LR 10 km |
| Wi-Fi | Varies | Shared, half duplex; retries are normal |

| SFP family | SFP | SFP+ | SFP28 | QSFP+ | QSFP28 |
|---|---|---|---|---|---|
| Speed | 1 Gb/s | 10 Gb/s | 25 Gb/s | 40 Gb/s | 100 Gb/s |

Fibre: both ends need matching optics, and transmit must meet receive (swapped strands = no link). DAC = copper cable with modules fixed on, for short rack runs. `sudo ethtool -m eth0` reads module details and light levels.

## Testing with ping — stop at the first failure

| Ping | Failure means |
|---|---|
| `127.0.0.1` | Local TCP/IP stack broken |
| Own IP | Address not configured |
| Default gateway | Local network problem (layers 1–3) |
| Another local host | That host is down or filtered |
| Remote IP | Routing beyond the gateway, or a firewall |

Ping by IP, not name. Then check the ARP cache: an entry means layer 2 worked even if ping was blocked.

## ARP (IPv4)

| Task | Windows | Debian | FreeBSD |
|---|---|---|---|
| View | `Get-NetNeighbor -AddressFamily IPv4`, `arp -a` | `ip -4 neigh` | `arp -an` |
| Delete one | `Remove-NetNeighbor -IPAddress 192.0.2.1` | `sudo ip neigh del 192.0.2.1 dev eth0` | `arp -d 192.0.2.1` |
| Clear all | `arp -d *` (admin) | `sudo ip neigh flush dev eth0` | `arp -d -a` |

| You see | It means |
|---|---|
| Target missing, `INCOMPLETE` or `FAILED` | Nobody answered: host down, wrong subnet or wrong VLAN |
| Remote address not in cache | Normal: remote traffic goes to the gateway's MAC |
| No dynamic entries at all | Host hears nobody: link, VLAN or NIC |
| One IP flipping between two MACs | Duplicate IP address (or ARP spoofing) |

## Neighbour Discovery (IPv6)

| ICMPv6 | Message |
|---|---|
| 133 / 134 | Router Solicitation / Advertisement |
| 135 / 136 | Neighbor Solicitation / Advertisement (ARP's replacement) |
| 137 | Redirect |

View: `Get-NetNeighbor -AddressFamily IPv6` · `ip -6 neigh` · `ndp -an` (`ndp -c` clears). Every IPv6 interface has an `fe80::` link-local address; pinging one needs a zone: `ping fe80::1%eth0` (Debian), `ping fe80::1%12` (Windows ifIndex).

## VLANs

| Term | Meaning |
|---|---|
| VLAN ID | 1–4094 |
| 802.1Q tag | 4 bytes after the source MAC: TPID `0x8100`, priority, VLAN ID (12 bits) |
| Access port | One VLAN, untagged (servers, desktops) |
| Trunk port | Many VLANs, tagged (switches, hypervisors) |
| Native VLAN | The untagged VLAN on a trunk |
| Inter-VLAN routing | A router or layer 3 switch joining VLANs (and the place to filter) |

| Create VLAN 20 on a trunked NIC | Command |
|---|---|
| Debian | `sudo ip link add link eth0 name eth0.20 type vlan id 20` |
| FreeBSD | `ifconfig vlan20 create vlan 20 vlandev em0` |
| Windows | `Set-NetAdapter -Name 'Ethernet' -VlanID 20` (driver permitting) or a Hyper-V switch port |

## Datalink errors

| Counter | Usually means |
|---|---|
| CRC / FCS, frame | Damaged frames: cable, connector, interference, duplex |
| Runts / giants | Too short / too long: MTU mismatch or faulty card |
| Late collisions | Duplex mismatch |
| Drops / discards / overruns | Buffers full (load), not a wire fault |

| Platform | Show counters | Watch the rate |
|---|---|---|
| Windows | `Get-NetAdapterStatistics -Name 'Ethernet' \| Format-List *Errors, *Discarded*` · `netstat -e` | Two snapshots, subtract |
| Debian | `ip -s -s link show dev eth0` · `sudo ethtool -S eth0` | `watch -n 10 ip -s link show dev eth0` |
| FreeBSD | `netstat -i` · `sysctl dev.em.0` | `netstat -I em0 -w 5` |

**Counters are cumulative since boot.** Only a rising count is a current fault.

## Persistent configuration

| Platform | Where | Example |
|---|---|---|
| Windows | PowerShell (persists) | `New-NetIPAddress -InterfaceAlias 'Ethernet' -IPAddress 192.0.2.10 -PrefixLength 24 -DefaultGateway 192.0.2.1` |
| Debian | `/etc/network/interfaces` | `iface eno1 inet static` + `address 192.0.2.10/24` + `gateway 192.0.2.1`; apply with `ifdown`/`ifup` |
| FreeBSD | `/etc/rc.conf` via `sysrc` | `sysrc ifconfig_em0="inet 192.0.2.10/24"` · `sysrc defaultrouter="192.0.2.1"` · `service netif restart` |

Changing network config over SSH can cut you off: use a console or a scheduled rollback.

## 🔐 Security notes

- **Rogue IPv6 Router Advertisements / DHCPv6** can make hosts on "IPv4-only" networks route or resolve through an attacker (mitm6). Use RA Guard and manage IPv6 deliberately.
- **VLAN hopping:** disable automatic trunk negotiation, don't use VLAN 1 as native, park unused ports in a dead VLAN. VLANs only protect if traffic between them is filtered.
- **ARP spoofing:** a changing gateway MAC or a burst of gratuitous ARPs is suspicious; `arpwatch` alerts on changed pairings.
- **Fragments** can be used to slip past firewalls and IDS, which is why many firewalls drop them. Blocking all ICMP mostly just creates PMTU black holes.
- **Loopback limits exposure but isn't authentication:** local users and SSRF can still reach `127.0.0.1` services.
- **Rogue DHCP servers** hand out malicious gateways or DNS; DHCP snooping blocks them.

## Practice drills

<details>
<summary>1. What is the largest ping data size that fits a 1,500-byte MTU over IPv4 with DF set, and why?</summary>

**1,472 bytes.** 1,500 minus the 20-byte IPv4 header and the 8-byte ICMP header.
</details>

<details>
<summary>2. Users can SSH to a server, but file transfers stall. What do you suspect, and how do you test it?</summary>

A **PMTU black hole**. Send don't-fragment pings of decreasing size (`ping -M do -s 1472 host`) to find the largest size that gets through.
</details>

<details>
<summary>3. A server is hard-set to 1 Gb/s full duplex and the switch port is on auto. What happens?</summary>

A **duplex mismatch**: the switch falls back to half duplex, and the link runs slowly with late collisions and CRC errors.
</details>

<details>
<summary>4. Ping to a neighbour fails, but <code>ip neigh</code> shows it as <code>REACHABLE</code>. What does that tell you?</summary>

Layer 2 works and the host is there: it is **dropping ping**, probably with a host firewall.
</details>

<details>
<summary>5. Which command lists IPv6 neighbours on FreeBSD, and which ICMPv6 types replace an ARP request and reply?</summary>

`ndp -an`. **Neighbor Solicitation (135)** and **Neighbor Advertisement (136)**.
</details>

<details>
<summary>6. What is the difference between an access port and a trunk port?</summary>

An **access** port carries one VLAN, untagged. A **trunk** carries several VLANs, tagged with 802.1Q.
</details>

<details>
<summary>7. <code>ip -s link</code> shows 48,210 RX errors. Do you replace the cable?</summary>

**Not yet.** Counters are cumulative since boot. Take two readings a few minutes apart: only a rising count is a live fault.
</details>

## Key takeaways

- Loopback proves the stack, not the network.
- Leave autonegotiation on at both ends.
- MTU − 28 is your DF ping size; "small works, big stalls" is a PMTU black hole.
- The ARP cache shows only local neighbours, and tells you whether layer 2 worked.
- VLANs split broadcast domains; filter what's routed between them.
- Watch error *rates*, not totals.
