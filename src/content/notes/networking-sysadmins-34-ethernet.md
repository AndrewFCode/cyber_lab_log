---
title: "Networking for Sysadmins 2: Ethernet — Class Notes"
description: "Full class notes for Lucas, Networking for System Administrators (2nd ed.) ch. 2: interfaces, autonegotiation, MTU, ARP and Neighbor Discovery, VLANs and datalink errors."
pubDate: 2026-09-22
tags: ["class-notes", "networking", "ethernet", "mtu", "arp", "vlans"]
draft: false
---

**Class notes · Michael W Lucas, *Networking for System Administrators* (2nd ed.) · Chapter 2**

> **Quick reference:** the short version of this chapter is the [Chapter 2 cheat sheet](/cyber_lab_log/resources/networking-sysadmins/2/). It builds on the layer model in [Chapter 1](/cyber_lab_log/resources/networking-sysadmins/1/).

> **Note:** these notes follow the section headings of Chapter 2, but they are written from general networking knowledge, not from the book's text. Where the book's own examples or wording differ, go with the book. Commands cover the book's three platforms: Windows with PowerShell, Debian and FreeBSD. Sample output comes from a real Debian test machine whose network happens to use an MTU of 1,400, which turns out to be handy in section 4.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what the loopback interface is for, and what pinging it does and does not prove.
2. List a host's interfaces and read their state, addresses and MTU on Windows, Debian and FreeBSD.
3. Explain autonegotiation, and diagnose a duplex mismatch.
4. Explain MTU, fragmentation and path MTU discovery, and measure an MTU with ping.
5. Compare copper, fibre, wireless and SFP-based Ethernet.
6. Use ping and the ARP cache together to test a local network, including what a missing or empty cache means.
7. Explain IPv6 Neighbor Discovery and VLANs, including tagged and untagged ports.
8. Tell current datalink errors from old ones, and configure Ethernet persistently on all three platforms.

## 1. The loopback interface

Every TCP/IP host has a **loopback interface**: a virtual interface that sends traffic straight back to the same machine. Nothing sent to it ever reaches a cable. It carries `127.0.0.1` (with the whole `127.0.0.0/8` block reserved for it) for IPv4 and `::1` for IPv6, and the name `localhost` normally resolves to both.

| Platform | Loopback interface | Notes |
|---|---|---|
| Windows | Loopback Pseudo-Interface 1 | Shown by `Get-NetIPInterface`, not by `Get-NetAdapter`, because it is not a real adapter |
| Debian | `lo` | Any address in `127.0.0.0/8` answers, not just `127.0.0.1` |
| FreeBSD | `lo0` | Shown by `ifconfig lo0` |

On Debian, the local routing table shows why the whole block answers:

```text
local 127.0.0.0/8 dev lo proto kernel scope host src 127.0.0.1
```

(That line is from `ip route show table local`; `ping 127.42.0.7` really does get replies.)

Programs use loopback to talk to each other on the same machine, and a service bound to it is invisible from the network. Pinging `127.0.0.1` proves the TCP/IP stack works, and nothing about the network card or cable.

> **In the real world:** `localhost` often resolves to `::1` before `127.0.0.1`. A service listening only on `127.0.0.1` can then look "down" to a client that tries IPv6 first. If `localhost` fails but `127.0.0.1` works, this is why.

## 2. Viewing interfaces

### 2.1 Interface names

Each platform names interfaces differently, and recognising the pattern tells you what kind of hardware you are looking at.

| Platform | Naming pattern | Examples |
|---|---|---|
| Windows | A friendly alias, which you can rename | `Ethernet`, `Ethernet 2`, `Wi-Fi` |
| Debian | "Predictable" names based on where the device is | `eno1` (on board), `enp3s0` (PCI bus 3, slot 0), `ens18` (hot-plug slot, common in VMs), `wlp2s0` (wireless); `eth0` on older systems and containers |
| FreeBSD | Driver name plus a unit number | `em0` and `igb0` (Intel), `ix0` (Intel 10G), `re0` (Realtek), `vtnet0` (VirtIO in VMs) |

### 2.2 Windows

```powershell
Get-NetAdapter                  # physical and virtual adapters: status, MAC, link speed
Get-NetIPConfiguration          # per adapter: IP address, gateway, DNS servers
Get-NetIPInterface              # per IP interface, incl. loopback: MTU (NlMtu), DHCP
ipconfig /all                   # the classic all-in-one view
```

Windows shows MAC addresses with hyphens (`02-FC-00-00-00-01`), while Unix-like systems use colons.

### 2.3 Debian

```bash
ip link                         # layer 2: interfaces, flags, MTU, MAC
ip addr                         # adds layer 3 addresses
ip -br addr                     # one line per interface
```

Real output of `ip addr show dev eth0` (the long first line is wrapped here for print):

```text
4: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1400 qdisc pfifo_fast state UP
   group default qlen 1000
    link/ether 02:fc:00:00:00:01 brd ff:ff:ff:ff:ff:ff
    inet 192.0.2.2/24 brd 192.0.2.255 scope global eth0
       valid_lft forever preferred_lft forever
```

In order: index and name; flags (`LOWER_UP` means a carrier); `mtu`; `state`; the MAC address after `link/ether`; then the IPv4 address and prefix, the subnet's broadcast address, and `scope global` (usable beyond this host).

### 2.4 FreeBSD

```sh
ifconfig -l                     # just the interface names
ifconfig em0                    # one interface in full
ifconfig -a                     # every interface
```

The first line of `ifconfig em0` shows the flags and the `mtu`. Below it, look for `ether` (the MAC address), `inet` lines (FreeBSD shows the netmask in hex, such as `0xffffff00` for `/24`), `media` (speed and duplex) and `status` (`active` or `no carrier`).

## 3. Speed and autonegotiation

When a link comes up, the two ends use **autonegotiation** to advertise what they support and settle on the best speed and duplex they have in common. Gigabit and faster copper Ethernet requires autonegotiation to work at all.

Trouble starts when one end is hard-set and the other left on auto. The auto side can usually detect the speed but not the duplex, so it falls back to **half duplex** while the hard-set side runs full. The result is a **duplex mismatch**: the link works, but slowly, with errors and late collisions that worsen under load. Leave both ends on auto, or hard-set both identically and document why.

| Symptom | Likely cause |
|---|---|
| Link at 100 Mb/s on gigabit kit | Damaged cable pair, or a hard-set 100 Mb/s port |
| Works, but slow and error counts climb under load | Duplex mismatch |
| Late collisions on a link that should be full duplex | Duplex mismatch (full duplex has no collisions) |
| No link at all after a manual change | Speeds forced to different values at each end |

Checking and setting it:

```powershell
Get-NetAdapter | Select-Object Name, LinkSpeed, FullDuplex
Get-NetAdapterAdvancedProperty -Name 'Ethernet'     # look for "Speed & Duplex" or similar
```

```bash
sudo ethtool eth0                                   # Speed, Duplex, Auto-negotiation
sudo ethtool -s eth0 speed 100 duplex full autoneg off   # hard-set (think twice)
```

```sh
ifconfig em0 | grep media       # current speed and duplex
ifconfig -m em0                 # every media type the card supports
ifconfig em0 media 1000baseT mediaopt full-duplex    # hard-set (think twice)
```

The name of the Windows property depends on the network driver, so check the list rather than assuming.

> **In the real world:** virtual network cards have no physical link to negotiate. On the Debian test VM, `ethtool eth0` reports `Speed: Unknown!` and `Duplex: Unknown! (255)`, which is normal for a VM and not a fault.

## 4. Fragments and MTU

### 4.1 MTU

The **maximum transmission unit (MTU)** is the largest packet an interface will put in a single frame. Standard Ethernet's MTU is 1,500 bytes. Some links are smaller: PPPoE broadband is typically 1,492, and VPNs and tunnels lose space to their own headers. Storage and virtualisation networks often use **jumbo frames**, commonly an MTU of 9,000, but only when every device on that network segment is set to match.

```text
|<------------------- Ethernet MTU: 1,500 bytes of payload ------------------->|
+------------+-----------+-----------------------------------------------------+
| IPv4       | ICMP      | Ping data                                           |
| header     | header    |                                                     |
| 20 bytes   | 8 bytes   | 1,472 bytes  (ping -s 1472)                         |
+------------+-----------+-----------------------------------------------------+
                                                                                
IPv6: 1,500 - 40 (IPv6 header) - 8 (ICMPv6 header) = 1,452 bytes of ping data   
```

### 4.2 Fragmentation

When a packet is too big for the next link, something has to give. In **IPv4**, a router may split the packet into **fragments**, which the destination reassembles, unless the sender has set the **Don't Fragment (DF)** bit. In **IPv6**, routers never fragment. Only the sending host may, and every IPv6 link must carry at least 1,280 bytes.

Fragmentation costs performance, and losing one fragment loses the whole packet. Only the first fragment carries the TCP or UDP header, so firewalls can't see ports in the rest, and many simply drop fragments.

### 4.3 Path MTU discovery and black holes

Modern hosts avoid fragmentation with **path MTU discovery**. They send packets with DF set; if a packet is too big for some link on the path, the router drops it and returns an ICMP "fragmentation needed" message (in IPv6, "packet too big"), and the sender shrinks its packets.

If a firewall blocks those ICMP messages, the sender never finds out. The result is a **PMTU black hole**, with a recognisable signature: ping and SSH logins work, but file transfers and large web pages stall.

### 4.4 Worked example — measuring the MTU with ping

Ping can send packets of a chosen size with DF set, which makes it an MTU probe. The data size is the MTU minus 28 bytes (a 20-byte IPv4 header plus an 8-byte ICMP header).

| Platform | Don't-fragment ping for a 1,500 MTU |
|---|---|
| Windows | `ping -f -l 1472 host` |
| Debian | `ping -M do -s 1472 host` |
| FreeBSD | `ping -D -s 1472 host` |

On the Debian test machine, `ip link` reports an MTU of 1,400, so the largest ping should carry 1,400 - 28 = 1,372 bytes of data. Testing it:

```text
$ ping -c 1 -M do -s 1372 192.0.2.1
PING 192.0.2.1 (192.0.2.1) 1372(1400) bytes of data.
1380 bytes from 192.0.2.1: icmp_seq=1 ttl=64 time=0.136 ms

$ ping -c 1 -M do -s 1373 192.0.2.1
PING 192.0.2.1 (192.0.2.1) 1373(1401) bytes of data.
ping: local error: message too long, mtu=1400
```

1,372 bytes of data make a 1,400-byte packet; one byte more makes 1,401, which Linux refuses to send. To find an unknown *path* MTU, lower the size until replies return: the largest size that works, plus 28, is the path MTU. Windows reports "Packet needs to be fragmented but DF set."

Viewing and setting the MTU:

```powershell
Get-NetIPInterface -AddressFamily IPv4                     # NlMtu column
Set-NetIPInterface -InterfaceAlias 'Ethernet' -NlMtuBytes 9000
```

```bash
ip link show dev eth0                                      # "mtu" on the first line
sudo ip link set dev eth0 mtu 9000                         # until reboot
```

```sh
ifconfig em0 mtu 9000                                      # until reboot
```

## 5. Ethernet physical media

### 5.1 Wired Ethernet

Copper Ethernet runs over twisted-pair cable with RJ45 connectors, up to 100 metres per run. Standards are named for speed and medium: in `1000BASE-T`, `1000` is the speed in Mb/s, `BASE` means baseband signalling, and `T` means twisted pair.

| Cable | Typical use |
|---|---|
| Cat 5e | 1 Gb/s at 100 m; usually 2.5 Gb/s too |
| Cat 6 | 1 Gb/s at 100 m; 10 Gb/s only on shorter runs (up to about 55 m) |
| Cat 6a | 10 Gb/s at 100 m |
| Cat 8 | 25 or 40 Gb/s, but only up to 30 m, inside data centres |

### 5.2 Fibre Ethernet

Fibre carries light, so it covers longer distances and ignores electrical interference.

| | Single-mode | Multimode |
|---|---|---|
| Core | Very thin: one path for the light | Wider: many paths |
| Distance | Kilometres | Hundreds of metres |
| Jacket colour (usual) | Yellow | Aqua (OM3 and OM4) |
| Example 10 Gb/s standard | 10GBASE-LR, up to 10 km | 10GBASE-SR, about 300 m on OM3 |

Both ends of a fibre link must use matching transceivers: single-mode with single-mode, and the same wavelength. Fibre also has a direction. Each end's transmit strand must reach the other end's receive strand, so a link that stays down with good optics on both sides may simply have its strands swapped. LC is the most common connector today, with SC and ST on older kit.

### 5.3 Wireless Ethernet

Wi-Fi (802.11) is not strictly Ethernet, but it carries the same MAC addresses and payloads, and access points bridge it onto wired Ethernet, so hosts treat it as another Ethernet-style interface. But the airwaves are a shared, half-duplex medium, speeds change with signal quality, and retried frames are normal. A few errors are healthy on wireless and a warning sign on copper.

### 5.4 SFP modules

Switches and server cards with fibre or high-speed ports usually take **SFP-family transceivers**: small pluggable modules that set the medium, wavelength and reach.

| Module | Speed |
|---|---|
| SFP | 1 Gb/s |
| SFP+ | 10 Gb/s |
| SFP28 | 25 Gb/s |
| QSFP+ | 40 Gb/s |
| QSFP28 | 100 Gb/s |

Copper SFPs with RJ45 sockets exist, and **direct attach copper (DAC)** cables, with a module fixed to each end, cheaply connect kit a few metres apart. Some vendors only accept their own coded modules. On Linux, `sudo ethtool -m eth0` reads a module's details and, if supported, its light levels, the quickest way to spot a dirty or failing fibre.

## 6. Testing Ethernet: ping

Ping to a *local* address tests layers 1 to 3 between you and that neighbour. Checking the ARP cache afterwards shows whether layer 2 worked, even if the ping itself failed. Test in order, and stop at the first failure:

| Step | Ping | A failure here means |
|---|---|---|
| 1 | `127.0.0.1` | The host's own TCP/IP stack is broken |
| 2 | Your own IP address | The interface's address is not configured |
| 3 | The default gateway | A problem on the local network (layers 1 to 3) |
| 4 | Another host on the subnet | That host is down or filtered, if the gateway works |
| 5 | A remote IP address | Routing beyond the gateway, or a firewall |

Real output of a successful local test on Debian:

```text
$ ping -c 2 192.0.2.1
PING 192.0.2.1 (192.0.2.1) 56(84) bytes of data.
64 bytes from 192.0.2.1: icmp_seq=1 ttl=64 time=0.162 ms
64 bytes from 192.0.2.1: icmp_seq=2 ttl=64 time=0.200 ms

--- 192.0.2.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1011ms
```

Debian and FreeBSD ping until `Ctrl+C` unless you add `-c`; Windows `ping` and `Test-Connection` send four. Ping by IP address, not name, so DNS problems don't muddy the result.

> **Note (beyond this lesson):** a host whose firewall drops ping will still answer ARP, because it has to in order to use the network at all. On Debian, `sudo arping -c 3 -I eth0 192.0.2.1` (from the `iputils-arping` package) tests a neighbour at layer 2 directly.

## 7. The Address Resolution Protocol

### 7.1 How ARP works

To reach a local IPv4 address, a host broadcasts an ARP request ("who has 192.0.2.1?") and the owner replies with its MAC address. Hosts also send **gratuitous ARP**, an unrequested announcement of their own address, at start-up and during failover, so neighbours update their caches at once.

### 7.2 The ARP cache

Answers go into the **ARP cache**, where they expire after a period and are refreshed as needed. The cache only ever holds *local* hosts. Traffic to remote addresses is sent to the gateway's MAC, so a busy server's cache is usually just its gateway and a few neighbours.

### 7.3 Viewing and clearing it: Windows, Debian and FreeBSD

| Task | Windows | Debian | FreeBSD |
|---|---|---|---|
| View | `Get-NetNeighbor -AddressFamily IPv4`, `arp -a` | `ip -4 neigh` | `arp -an` |
| Delete one entry | `Remove-NetNeighbor -IPAddress 192.0.2.1` | `sudo ip neigh del 192.0.2.1 dev eth0` | `arp -d 192.0.2.1` |
| Clear everything | `arp -d *` (as admin) | `sudo ip neigh flush dev eth0` | `arp -d -a` |

Real Debian output:

```text
192.0.2.1 dev eth0 lladdr 02:fc:00:00:00:05 REACHABLE
```

Clearing an entry is safe: it forces a fresh lookup, which helps after replacing hardware or moving an IP address. The `-n` in FreeBSD's `arp -an` skips hostname lookups.

### 7.4 Missing ARP

If the address you are trying to reach has no entry, or one marked `INCOMPLETE` or `FAILED` (Windows: `Incomplete` or `Unreachable`), then the host asked and nobody answered. Check that the target is up, that it is really on this subnet (a wrong prefix length on either end is a classic cause), and that both machines are in the same VLAN. And remember that a *remote* address never appears in the cache: look for the gateway instead.

### 7.5 Empty ARP

A cache with no working entries, on a host that has been trying to talk, means it hears nobody. Suspect layer 1 (no link), the wrong VLAN, or the network card. Windows always lists permanent broadcast and multicast entries, so look for dynamic ones. A quiet host's entries may simply have expired: ping the gateway and look again.

> **In the real world:** if an entry flips between two different MAC addresses, two machines are claiming the same IP address. Debian's `sudo arping -D -I eth0 192.0.2.10` checks whether anyone else answers for an address before you use it. Windows records address conflicts in the System event log.

## 8. Neighbour Discovery

IPv6 has no ARP and no broadcast. Its replacement is **Neighbor Discovery Protocol (NDP)**, which runs over ICMPv6 and uses multicast. NDP does more than ARP did:

| ICMPv6 type | Message | Job |
|---|---|---|
| 133 | Router Solicitation | "Are there any routers here?" |
| 134 | Router Advertisement | A router announces itself, the network prefix and how hosts should configure |
| 135 | Neighbor Solicitation | "Who has this IPv6 address?" (and duplicate address checks) |
| 136 | Neighbor Advertisement | "I do: here is my MAC address" |
| 137 | Redirect | "Use a better router for that destination" |

Every IPv6 interface has a **link-local address** in `fe80::/10`, even with no other IPv6 configuration, and routers advertise from theirs, so neighbour tables often show `fe80::` entries.

```powershell
Get-NetNeighbor -AddressFamily IPv6       # Windows
```

```bash
ip -6 neigh                               # Debian; routers are flagged "router"
```

```sh
ndp -an                                   # FreeBSD; ndp -c clears the table
```

Because a link-local address exists on every interface, pinging one needs a **zone ID** naming the interface: `ping fe80::1%eth0` on Debian, or `ping fe80::1%12` on Windows, where 12 is the interface index from `Get-NetAdapter`.

## 9. Broadcast domains and virtual LANs

### 9.1 LANs and virtual LANs

A LAN is a broadcast domain: every host hears every other host's broadcasts, including ARP. A large, flat one is noisy, and a problem in one corner (a broadcast storm, a rogue DHCP server, ARP spoofing) reaches every host.

**Virtual LANs (VLANs)** divide one physical network into several separate broadcast domains. Hosts in different VLANs cannot talk directly, even on the same switch. Their traffic has to go through a router or firewall, which is exactly where you want to control it.

```text
   Web server              DB server                Router / firewall         
   192.0.2.10              198.51.100.10            routes VLAN 10 <-> 20     
   (VLAN 10)               (VLAN 20)                (and can filter it)       
       |                       |                            |                 
   access port             access port                 trunk port             
   VLAN 10, untagged       VLAN 20, untagged           VLANs 10 and 20, tagged
       |                       |                            |                 
  +----+-----------------------+----------------------------+----+            
  |                     One physical switch                      |            
  +--------------------------------------------------------------+            
                                                                              
  The web and DB servers share a switch but not a LAN: every packet           
  between them has to pass through the router, where it can be filtered.      
```

### 9.2 VLAN terminology

| Term | Meaning |
|---|---|
| VLAN ID | A number from 1 to 4094 (0 and 4095 are reserved) |
| 802.1Q | The standard that adds a 4-byte VLAN tag to frames |
| Tagged | A frame carrying an 802.1Q tag that says which VLAN it belongs to |
| Untagged | An ordinary frame; the switch knows its VLAN from the port it arrived on |
| Access port | Carries one VLAN, untagged. Most servers and desktops plug into these |
| Trunk port | Carries many VLANs, tagged. Used between switches, and to hosts that handle VLANs themselves |
| Native VLAN | The one VLAN on a trunk that is sent untagged |
| Inter-VLAN routing | A router or layer 3 switch forwarding traffic between VLANs |

Vendors do not all use these words. "Access" and "trunk" are Cisco's terms; others describe ports as tagged or untagged members of a VLAN. The idea is the same.

```text
Untagged Ethernet frame                                                       
+----------+----------+-----------+------------------------+-----+            
| Dest MAC | Src MAC  | EtherType | Payload (up to 1,500)  | FCS |            
| 6 bytes  | 6 bytes  | 2 bytes   |                        | 4   |            
+----------+----------+-----------+------------------------+-----+            
                                                                              
802.1Q tagged frame: a 4-byte tag goes in after the source MAC                
+----------+----------+-----------+-----------+------------------------+-----+
| Dest MAC | Src MAC  | 802.1Q    | EtherType | Payload (up to 1,500)  | FCS |
|          |          | tag       |           |                        |     |
+----------+----------+-----------+-----------+------------------------+-----+
                      |           |                                           
       +--------------+           +--------------------------+                
       |                                                     |                
       +------------+------------+-----------+---------------+                
       | TPID       | PCP        | DEI       | VLAN ID (VID) |                
       | 0x8100     | priority   | drop      | 12 bits:      |                
       | 16 bits    | 3 bits     | 1 bit     | 1-4094        |                
       +------------+------------+-----------+---------------+                
```

The tag makes a full frame 4 bytes longer (1,522 bytes rather than 1,518), but the MTU stays 1,500.

### 9.3 VLANs on the server

A server plugged into an access port needs no VLAN configuration at all. A server that needs several VLANs, such as a hypervisor host, connects to a trunk port and creates one virtual interface per VLAN:

```bash
sudo ip link add link eth0 name eth0.20 type vlan id 20      # Debian
```

```sh
ifconfig vlan20 create vlan 20 vlandev em0                   # FreeBSD
```

```powershell
Set-NetAdapter -Name 'Ethernet' -VlanID 20                   # if the driver supports it
```

Windows servers more often set VLANs on Hyper-V virtual switch ports. On any platform, the switch port must be a trunk carrying those VLANs, or tagged frames are dropped.

## 10. Datalink errors

### 10.1 Kinds of error

| Counter | What it usually means |
|---|---|
| CRC / FCS errors | Frames damaged in transit: cabling, connectors, interference, or a duplex mismatch |
| Frame or alignment errors | Malformed frames, with the same causes as CRC errors |
| Runts / giants | Frames shorter than 64 bytes or longer than allowed; often an MTU mismatch or a faulty card |
| Collisions / late collisions | Expected on half duplex; on a full-duplex link they point to a duplex mismatch |
| Drops / discards / overruns | Frames that arrived intact but had nowhere to go: buffers were full, usually from load, not a fault on the wire |
| Carrier errors | The link itself went away while sending |

### 10.2 Windows

```powershell
Get-NetAdapterStatistics -Name 'Ethernet' | Format-List *Errors, *Discarded*
netstat -e                      # Errors and Discards, for all adapters together
```

### 10.3 Unix

Real output of `ip -s -s link show dev eth0` on the Debian test machine, after the two header lines (the doubled `-s` adds the detailed error breakdown):

```text
    RX:  bytes packets errors dropped  missed   mcast
        264532     154      0       6       0       0
    RX errors:  length    crc   frame    fifo overrun
                     0      0       0       0       0
    TX:  bytes packets errors dropped carrier collsns
         25141     155      0       0       0       0
    TX errors: aborted   fifo  window heartbt transns
                     0      0       0       0       2
```

This link is healthy: no errors, and a few drops, which on a quiet system are usually just frames for protocols the host doesn't run. `sudo ethtool -S eth0` shows the card's own detailed counters.

On FreeBSD, `netstat -i` gives a table per interface, with `Ierrs`, `Idrop`, `Oerrs` and `Coll` columns. `sysctl dev.em.0` shows driver-level detail for an `em` card.

### 10.4 Current or old errors

Error counters are cumulative: they count everything since the system started or the driver loaded. A large number might come from a cable someone knocked last month, so what matters is whether the numbers are rising *now*.

Take two readings and compare:

```powershell
$a = Get-NetAdapterStatistics -Name 'Ethernet'
Start-Sleep -Seconds 60
$b = Get-NetAdapterStatistics -Name 'Ethernet'
$b.ReceivedPacketErrors - $a.ReceivedPacketErrors     # errors in the last minute
```

```bash
watch -n 10 ip -s link show dev eth0       # Debian: refreshes every 10 seconds
```

```sh
netstat -I em0 -w 5                        # FreeBSD: new packets and errors every 5 s
```

Judge against the traffic: twelve CRC errors in a billion packets is noise; twelve a minute on a quiet link means replacing a cable, port or transceiver.

### 10.5 Worked example — old errors or a live fault?

A Debian server shows 48,210 receive CRC errors, and a colleague wants to replace the switch.

1. **Check the uptime.** 200 days, so the count could be ancient history.
2. **Take a rate.** Two readings ten minutes apart both show 48,210: nothing is failing now.
3. **Correlate.** The change log shows the patch cable was replaced three months ago.
4. **Conclusion.** Nothing to replace. Record 48,210 as a baseline for next time.

## 11. Configuring Ethernet

Commands such as `ip addr add` change only the running system and are lost at reboot. Persistent settings live in each platform's configuration.

**Windows** (PowerShell settings persist):

```powershell
New-NetIPAddress -InterfaceAlias 'Ethernet' -IPAddress 192.0.2.10 -PrefixLength 24 `
  -DefaultGateway 192.0.2.1
Set-DnsClientServerAddress -InterfaceAlias 'Ethernet' -ServerAddresses 192.0.2.53
Rename-NetAdapter -Name 'Ethernet' -NewName 'LAN'
```

**Debian** servers traditionally use `/etc/network/interfaces` (desktops usually use NetworkManager and `nmcli` instead):

```text
auto eno1
iface eno1 inet static
    address 192.0.2.10/24
    gateway 192.0.2.1
    mtu 1500
```

Apply it with `sudo ifdown eno1 && sudo ifup eno1`. DNS servers go in `/etc/resolv.conf` as `nameserver` lines. For DHCP, the stanza is just `iface eno1 inet dhcp`.

**FreeBSD** keeps network settings in `/etc/rc.conf`, which `sysrc` edits safely:

```sh
sysrc ifconfig_em0="inet 192.0.2.10/24"
sysrc defaultrouter="192.0.2.1"
sysrc vlans_em0="20"                              # creates em0.20
sysrc ifconfig_em0_20="inet 198.51.100.10/24"
service netif restart && service routing restart
```

For DHCP, use `ifconfig_em0="DHCP"`.

> **Caution:** changing a network configuration over SSH can cut off your own connection halfway through. Work from a console where possible, or schedule an automatic rollback before you start.

## 12. Security perspective

- **Loopback.** Services on `127.0.0.1` are hidden from the network, but not from local users, or from a web app tricked into making requests for an attacker (server-side request forgery). Loopback limits exposure; it is not authentication.
- **Fragments.** Crafted fragmented or overlapping packets can slip past firewalls and intrusion detection that don't reassemble traffic, which is why many firewalls drop fragments. Blocking ICMP, by contrast, mostly just causes PMTU black holes.
- **Physical media.** Wireless reaches anyone in range, so it needs WPA2 or WPA3, ideally with per-user 802.1X. Fibre is harder to tap than copper, but not impossible.
- **ARP.** Watch for a gateway MAC that changes, or for a flood of gratuitous ARPs: both are signs of ARP spoofing. Tools such as `arpwatch` alert on new or changed IP-to-MAC pairings.
- **Neighbor Discovery.** Most operating systems enable IPv6 by default, even on "IPv4-only" networks. An attacker can send rogue Router Advertisements (or answer DHCPv6) and make hosts route or resolve through them; tools such as mitm6 automate this against Windows networks. Defences: RA Guard on switches, and IPv6 managed on purpose rather than ignored.
- **VLANs.** VLANs are only a boundary if the switch is configured well. **VLAN hopping** abuses automatic trunk negotiation (switch spoofing) or the native VLAN (double tagging): disable automatic trunking, avoid VLAN 1 as native, and park unused ports in an unused VLAN. And separation only helps if something *filters* traffic between VLANs.
- **Configuration.** A rogue DHCP server can hand out a malicious gateway or DNS server. DHCP snooping on switches blocks this, and static addressing keeps critical servers independent of DHCP.

## Summary

- Loopback never touches the wire; pinging it tests only the local stack.
- `Get-NetAdapter`, `ip addr` and `ifconfig` show interfaces, and names reveal the hardware (`enp3s0`, `em0`).
- Leave autonegotiation on at both ends; hard-setting one end causes duplex mismatches.
- Standard MTU is 1,500; a DF ping with 1,472 bytes of data tests it. "Small works, big stalls" means a PMTU black hole.
- Copper runs 100 m, multimode fibre hundreds of metres, single-mode kilometres; SFP modules set the medium.
- The ARP cache holds only local hosts: a missing entry means nobody answered, an empty cache means the host hears nobody.
- IPv6 replaces ARP with Neighbor Discovery over ICMPv6, using `fe80::` link-local addresses.
- VLANs split broadcast domains: access ports carry one untagged VLAN, trunks carry many tagged ones.
- Error counters are cumulative: compare two readings before blaming hardware.
- Persistent settings live in PowerShell, `/etc/network/interfaces` or `/etc/rc.conf`.

## Glossary

| Term | Meaning |
|---|---|
| 802.1Q | The standard for VLAN tagging: a 4-byte tag carrying a 12-bit VLAN ID |
| Access port | A switch port carrying a single VLAN, untagged |
| Autonegotiation | Two link partners agreeing on the best common speed and duplex |
| CRC error | A frame whose checksum fails because it was damaged in transit |
| DF bit | Don't Fragment: an IPv4 flag telling routers not to fragment a packet |
| Duplex mismatch | One end running full duplex and the other half duplex |
| Gratuitous ARP | An unrequested ARP announcement of a host's own address |
| Jumbo frames | Frames with an MTU above 1,500 bytes, commonly 9,000 |
| Link-local address | An IPv6 address in `fe80::/10`, valid only on one link |
| Neighbor Discovery (NDP) | IPv6's replacement for ARP, carried over ICMPv6 |
| Path MTU discovery | Finding the smallest MTU on a path, using DF and ICMP feedback |
| SFP | A small pluggable transceiver that sets a port's medium and reach |
| Trunk port | A switch port carrying several VLANs, tagged |
| VLAN | A virtual LAN: a separate broadcast domain on shared switches |

## Review questions

1. What does a successful ping to `127.0.0.1` prove, and what doesn't it prove?
2. Why does `Get-NetAdapter` not show the Windows loopback interface?
3. A server's port is hard-set to 1 Gb/s full duplex, and the switch is on auto. What goes wrong, and why?
4. How many bytes of ping data fill a 1,500-byte MTU over IPv4 with DF set, and why that number?
5. Users can ping a server and log in over SSH, but large downloads stall. What is the likely cause?
6. How does IPv6 handle a packet too big for the next link, differently from IPv4?
7. Name the likely jacket colour and typical reach of single-mode and multimode fibre.
8. You ping a host on your own subnet and it fails. What does checking the ARP cache afterwards tell you?
9. Why will a remote server's IP address never appear in your ARP cache?
10. Which ICMPv6 messages replace an ARP request and reply?
11. What is the difference between an access port and a trunk port?
12. A server shows 30,000 CRC errors. What should you do before replacing anything?

## Answer key

1. **That the local TCP/IP stack works; nothing about the card, cable or beyond.** Loopback traffic never leaves the machine.
2. **It is not a real adapter.** It appears in `Get-NetIPInterface` as Loopback Pseudo-Interface 1.
3. **A duplex mismatch.** The switch detects the speed but not the duplex, so runs half duplex against the server's full.
4. **1,472 bytes.** 1,500 minus the 20-byte IPv4 header and 8-byte ICMP header.
5. **A PMTU black hole.** Big packets are dropped, and blocked ICMP stops the sender learning to shrink them.
6. **Routers never fragment IPv6; they drop it and send "packet too big".** Only the sending host may fragment.
7. **Single-mode: yellow, kilometres. Multimode: aqua, hundreds of metres.** For example 10GBASE-LR (10 km) and 10GBASE-SR (about 300 m on OM3).
8. **Whether layer 2 worked.** A valid entry means the host exists but drops ping; `FAILED` means nothing answered ARP.
9. **Remote traffic goes to the gateway's MAC.** The cache only holds local neighbours.
10. **Neighbor Solicitation (135) and Neighbor Advertisement (136).** Both are NDP messages over ICMPv6.
11. **Access: one VLAN, untagged. Trunk: several VLANs, tagged.** Servers normally use access ports.
12. **Check whether the count is still rising.** Counters are cumulative, so compare two readings.
