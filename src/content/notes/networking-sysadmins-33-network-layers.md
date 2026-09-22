---
title: "Networking for Sysadmins 1: Network Layers — Class Notes"
description: "Full class notes for Lucas, Networking for System Administrators (2nd ed.) ch. 1: the four network layers, encapsulation and troubleshooting layer by layer."
pubDate: 2026-09-22
tags: ["class-notes", "networking", "network-layers", "osi-model", "tcp-ip", "troubleshooting"]
draft: false
---

**Class notes · Michael W Lucas, *Networking for System Administrators* (2nd ed.) · Chapter 1**

> **Quick reference:** the short version of this chapter is the [Chapter 1 cheat sheet](/cyber_lab_log/resources/networking-sysadmins/1/).

> **Note:** these notes follow the section headings of Chapter 1, but they are written from general networking knowledge, not from the book's text. Where the book's own examples or wording differ, go with the book. Commands are shown for the same three platforms the 2nd edition uses: Windows with PowerShell, Debian with `ip`, and FreeBSD.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why networks are described in layers, and compare the OSI, TCP/IP and four-layer models.
2. Check a link's state and error counters at the physical layer.
3. Explain frames, MAC addresses, switches and ARP at the datalink layer.
4. Explain IP addresses, routing and the default gateway at the network layer.
5. Compare TCP and UDP, and explain how ports reach the right program.
6. Describe what "higher layers" covers.
7. Trace a request through encapsulation and across a router.
8. Troubleshoot a connection layer by layer on Windows, Debian and FreeBSD, and name the main attacks at each layer.

## 1. Common network layers

### 1.1 Why layers?

Sending one web page involves several separate jobs: turning data into electrical, light or radio signals; getting those signals to the next device; finding a route across many networks to the right computer; handing the data to the right program; and that program making sense of it.

A layered model gives each job to one layer. Each layer relies on the one below and serves the one above, without caring how the others work. A browser does not care whether the laptop is on Wi-Fi or copper, and a cable does not care whether it carries email or video. That is why you can swap a network card or move a server to a new subnet without redesigning everything else.

For a sysadmin, the real payoff is diagnostic. A layer model is a checklist: when someone says "the network is down", you can ask *which layer* is broken, and each layer has its own evidence and tools.

### 1.2 Three models you will meet

**The OSI model** is the seven-layer reference model from the International Organization for Standardization. It supplies the layer *numbers* everyone uses: "a layer 2 problem" or "a layer 3 switch" means OSI numbering.

**The TCP/IP model** describes the protocols the Internet actually runs on. RFC 1122 describes four layers: link, internet, transport and application.

**The model this chapter uses** keeps the OSI numbers for the bottom four layers (physical, datalink, network, transport) and groups everything above as "higher layers". That matches how most admins work, because the top three OSI layers rarely map cleanly onto real protocols.

```text
+----------------------+  +------------------------+  +------------------------+
| OSI model            |  | TCP/IP (RFC 1122)      |  | Chapter 1 layers       |
+----------------------+  +------------------------+  +------------------------+
| 7 Application        |  |                        |  |                        |
| 6 Presentation       |  | Application            |  | Higher layers          |
| 5 Session            |  |                        |  |                        |
+----------------------+  +------------------------+  +------------------------+
| 4 Transport          |  | Transport              |  | 4 Transport            |
+----------------------+  +------------------------+  +------------------------+
| 3 Network            |  | Internet               |  | 3 Network              |
+----------------------+  +------------------------+  +------------------------+
| 2 Data link          |  |                        |  | 2 Datalink             |
+----------------------+  | Link                   |  +------------------------+
| 1 Physical           |  |                        |  | 1 Physical             |
+----------------------+  +------------------------+  +------------------------+
```

> **Exam tip:** certification exams (Network+, Security+) still test the full OSI model. A common memory aid, bottom to top, is "Please Do Not Throw Sausage Pizza Away": Physical, Data link, Network, Transport, Session, Presentation, Application.

### 1.3 Names for data at each layer

Each layer has its own name for a unit of data (a protocol data unit, or PDU). People say "packet" for everything, but the precise names help when reading captures or talking to a network team.

| Layer | Unit of data | Addressed by | Typical device |
|---|---|---|---|
| 1 Physical | Bits (signals) | Nothing: no addresses | Cable, transceiver, hub, repeater |
| 2 Datalink | Frame | MAC address | Switch, wireless access point |
| 3 Network | Packet | IP address | Router |
| 4 Transport | Segment (TCP) or datagram (UDP) | Port number | Host firewall, layer 4 load balancer |
| Higher layers | Data or message | Names, URLs, usernames | Web server, proxy, DNS server |

## 2. Layer 1: Physical

### 2.1 What the physical layer does

The physical layer moves raw bits as signals: voltages on copper, pulses of light in fibre, or radio waves for Wi-Fi. Its concerns are cables, connectors, transceivers, the network interface card (NIC), link speed and duplex. It has no addresses and no idea what the bits mean. It only answers two questions: is there a signal, and is it clean?

### 2.2 What goes wrong at layer 1

Most layer 1 faults are mundane: an unplugged or damaged cable, a dead switch or patch-panel port, the wrong fibre or transceiver, or radio interference. Two quieter faults are worth knowing:

- **Speed negotiated down.** Gigabit copper (1000BASE-T) uses all four wire pairs; 100 Mb/s (100BASE-TX) needs only two. A cable with one damaged pair can still link, but only at 100 Mb/s, so a server that is suddenly slow may have a cable problem, not a software one.
- **Duplex mismatch.** If one end runs full duplex and the other half duplex, the link works, but slowly and with constant errors. It is rare with autonegotiation, but still happens when one side has been set by hand.

### 2.3 Checking layer 1 from the server

You cannot see the link light on a switch in another building, but the operating system knows whether it has a carrier signal. On Debian:

```bash
ip -br link                  # one line per interface: name, state, MAC, flags
ip -s link show dev eth0     # adds RX/TX counters: errors, dropped, missed
sudo ethtool eth0            # Speed, Duplex and "Link detected: yes"
```

Example `ip -br link` output from a test machine:

```text
lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP>
eth0             UP             02:fc:00:00:00:01 <BROADCAST,MULTICAST,UP,LOWER_UP>
```

In the flags, `UP` means the interface has been administratively enabled, and `LOWER_UP` means there is a physical carrier. An interface showing `NO-CARRIER` is enabled but has no link: the classic unplugged cable.

On Windows, in PowerShell:

```powershell
Get-NetAdapter                              # Status (Up, Disconnected) and LinkSpeed
Get-NetAdapterStatistics -Name 'Ethernet'   # byte and packet counters for one adapter
```

On FreeBSD:

```sh
ifconfig em0     # look for "status: active" and the "media:" line (speed and duplex)
netstat -i       # the Ierrs and Oerrs columns count input and output errors
```

> **In the real world:** one snapshot of the counters tells you little. Run the command twice, a minute apart. A link that is up but racking up errors usually means a failing cable, port or transceiver.

## 3. Layer 2: Datalink

### 3.1 Frames and MAC addresses

The datalink layer moves **frames** between devices on the same local network. Every Ethernet or Wi-Fi interface has a **MAC address**: 48 bits, written as six pairs of hex digits such as `02:fc:00:00:00:01`. The first half traditionally identifies the manufacturer (the organisationally unique identifier, or OUI).

An Ethernet frame carries:

| Field | Purpose |
|---|---|
| Destination MAC | Which interface on this local network should take the frame |
| Source MAC | Which interface sent it |
| EtherType | What is inside: `0x0800` IPv4, `0x86DD` IPv6, `0x0806` ARP |
| Payload | The layer 3 packet, up to 1,500 bytes on standard Ethernet (the MTU) |
| Frame check sequence (FCS) | A checksum so the receiver can discard frames damaged in transit |

MAC addresses only matter locally. A frame never crosses a router: traffic leaving the local network travels in a *new* frame on every link.

### 3.2 Switches and broadcast domains

A switch learns where devices are by reading the *source* MAC address of each frame and noting which port it arrived on, in its MAC address table (or CAM table). It then forwards each frame only to the port where the destination lives. Frames for unknown destinations, and broadcasts to `ff:ff:ff:ff:ff:ff`, are flooded out of every other port.

The devices that receive each other's broadcasts form a **broadcast domain**, and routers mark its edge. VLANs split one physical switch into several broadcast domains, which is why a server plugged into a port in the wrong VLAN can have a perfect cable and still be on the wrong network.

### 3.3 ARP: joining layer 3 to layer 2

To send an IPv4 packet to a device on the same network, a host needs that device's MAC address. The **Address Resolution Protocol (ARP)** finds it: the host broadcasts "who has 192.0.2.1?", the owner replies with its MAC address, and the host caches the answer. IPv6 does the same job with **Neighbor Discovery (NDP)**, using multicast instead of broadcast.

The cache of these answers is the neighbour table, and it is one of the most useful things a sysadmin can look at:

```bash
ip neigh show                         # Debian
```

```text
192.0.2.1 dev eth0 lladdr 02:fc:00:00:00:05 REACHABLE
```

```powershell
Get-NetNeighbor -AddressFamily IPv4   # Windows: State is Reachable, Stale, Unreachable...
```

```sh
arp -a                                # FreeBSD (use ndp -a for IPv6)
```

`REACHABLE` means the neighbour answered recently, and `STALE` just means it will be rechecked when next used. `FAILED` means nothing answered.

### 3.4 Worked example — reading a neighbour table

A Debian server can reach machines on its own subnet but nothing beyond it.

1. **Check the route.** `ip route show` includes `default via 192.0.2.1 dev eth0`, so the gateway is configured.
2. **Check the neighbour.** `ip neigh show 192.0.2.1` returns `192.0.2.1 dev eth0 FAILED`: the server keeps asking for the gateway's MAC address and gets no reply.
3. **Reason about it.** Local machines answer, so the server's link and NIC work; only the gateway is silent at layer 2. Either the gateway is down, or it sits in a different VLAN from the server's switch port.
4. **Conclusion.** Pinging Internet hosts is pointless until this is fixed. Tell the network team: "our link is up, local hosts answer ARP, the gateway at 192.0.2.1 does not."

## 4. Layer 3: Network

### 4.1 IP addresses and packets

The network layer moves **packets** from the source host to the destination host, across any number of networks in between. IPv4 addresses are 32 bits, written in dotted decimal (`192.0.2.2`). IPv6 addresses are 128 bits, written in hex groups (`2001:db8::2`).

The prefix length (the `/24` in `192.0.2.2/24`) tells the host which addresses are local, reached directly, and which are remote, reached through a router. Three header fields are worth knowing:

| Field | What it tells you |
|---|---|
| Source and destination address | Where the packet came from and where it is going, end to end |
| Protocol (IPv4) / Next header (IPv6) | What is inside: 6 = TCP, 17 = UDP, 1 = ICMP (58 = ICMPv6) |
| TTL (IPv4) / Hop limit (IPv6) | Reduced by one at every router. At zero the packet is dropped and an ICMP "time exceeded" message is sent back. `traceroute` uses this to map the path |

### 4.2 Routing and the default gateway

For every packet, a host decides: if the destination is on a local network, deliver it directly (using ARP for the MAC address); if not, send it to a router from the routing table. The **default route** (`0.0.0.0/0`, shown as `default` on Linux) catches anything no more specific route matches, and its router is the **default gateway**. Every router on the path decides again.

On Debian:

```bash
ip -br addr                      # addresses and prefix lengths, one line per interface
ip route show                    # the routing table
ip route get 198.51.100.20       # which route, interface and source address would be used
```

Example output from a test machine:

```text
default via 192.0.2.1 dev eth0
192.0.2.0/24 dev eth0 proto kernel scope link src 192.0.2.2
```

On Windows:

```powershell
Get-NetIPAddress -AddressFamily IPv4
Get-NetRoute -DestinationPrefix '0.0.0.0/0'        # the default route and its NextHop
Find-NetRoute -RemoteIPAddress '198.51.100.20'     # which route would be used
Test-Connection 198.51.100.20 -Count 4             # ping
```

On FreeBSD:

```sh
ifconfig em0                    # addresses (FreeBSD shows the netmask in hex)
netstat -rn                     # the routing table, numeric
route -n get 198.51.100.20      # which route would be used
ping -c 4 198.51.100.20
```

### 4.3 ICMP, and what ping really proves

ICMP carries layer 3 control and error messages: echo request and reply (ping), destination unreachable and time exceeded. A successful ping proves layers 1 to 3 work end to end, *in both directions*. It proves nothing about transport or the application. A failed ping proves less than people think: many firewalls drop echo requests, so "I can't ping it" does not mean "it's down".

> **Note (beyond this lesson):** blocking *all* ICMP causes subtle breakage. Path MTU discovery depends on ICMP "fragmentation needed" (IPv4) and "packet too big" (IPv6) messages, and IPv6 cannot work at all without ICMPv6, because Neighbor Discovery runs over it. If policy demands, block echo requests, not ICMP as a whole.

## 5. Layer 4: Transport

### 5.1 Ports: reaching the right program

IP gets a packet to the right *host*. The transport layer gets the data to the right *program* on that host, using **port numbers**. TCP and UDP each have their own range of ports, from 0 to 65,535. A server program listens on a well-known port (22 for SSH, 443 for HTTPS), and the client uses a temporary, high-numbered **ephemeral** port for its end.

Each connection is identified by the **5-tuple**: protocol, source IP, source port, destination IP and destination port. That is how one server holds thousands of connections on port 443 at once: each differs in the client's address or port.

### 5.2 TCP and UDP

| | TCP | UDP |
|---|---|---|
| Setup | Three-way handshake: SYN, SYN-ACK, ACK | None: just send |
| Reliability | Acknowledgements, retransmission, in-order delivery | None; the application copes |
| Speed control | Flow and congestion control | None |
| Unit of data | Segment | Datagram |
| Typical uses | SSH, HTTPS, SMTP, database connections | DNS queries, DHCP, NTP, VoIP |

DNS uses both: most queries go over UDP, while large answers and zone transfers use TCP.

### 5.3 Listening sockets

A server program **listens** on an address and a port. The address matters as much as the port:

- `0.0.0.0` (IPv4) or `::` (IPv6) means *every interface*. The service is reachable from the network, firewall permitting.
- `127.0.0.1` or `::1` means *loopback only*. Only programs on the same machine can connect.

On Debian, `ss` lists sockets. Here, two test servers are listening, one on all interfaces and one on loopback only:

```bash
sudo ss -tlnp     # TCP (-t), listening (-l), numeric (-n), process (-p; root sees all)
```

```text
State  Recv-Q Send-Q Local Address:Port Peer Address:PortProcess
LISTEN 0      5            0.0.0.0:8080      0.0.0.0:*    users:(("python3",pid=581,fd=3))
LISTEN 0      5          127.0.0.1:8443      0.0.0.0:*    users:(("python3",pid=583,fd=3))
```

On Windows:

```powershell
Get-NetTCPConnection -State Listen | Sort-Object LocalPort   # includes OwningProcess
Test-NetConnection app01 -Port 443     # TcpTestSucceeded : True/False
```

On FreeBSD:

```sh
sockstat -4l          # listening IPv4 sockets, with the owning user and process
netstat -an -p tcp    # all TCP sockets, numeric
```

## 6. Higher layers

Everything above transport is the application's business: HTTP, DNS, SSH, SMTP, LDAP, and the TLS encryption that many of them now sit inside. The OSI model splits this area into session, presentation and application layers, but in real software one program usually does all three.

This is where sysadmins spend most of their time, and where many so-called network problems really live: a wrong DNS answer, an expired certificate, a service listening on the wrong address, or failed authentication. The tools are application tools: `curl -v`, `fetch` on FreeBSD, `Invoke-WebRequest` and `Resolve-DnsName` in PowerShell, and each service's own logs.

> **Caution:** in Windows PowerShell 5.1, `curl` is an alias for `Invoke-WebRequest`, which behaves very differently from real curl. Type `curl.exe` to get the real one. PowerShell 7 removed that alias.

> **In the real world:** "it works by IP address but not by name" is a DNS fault, which makes it a higher-layer problem, even though it looks like a connectivity one.

## 7. Layering in practice

### 7.1 Encapsulation and decapsulation

On the way out, each layer wraps the data from the layer above in its own header (the datalink layer adds a trailer too). This is **encapsulation**. The receiver unwraps it in reverse, each layer reading only its own header: **decapsulation**.

```text
Higher layers: the                              +----------------+      
application's data                              |  HTTP request  |      
                                                +----------------+      
Layer 4 adds a TCP                    +---------+----------------+      
header = a segment                    | TCP hdr |  HTTP request  |      
                                      +---------+----------------+      
Layer 3 adds an IP              +-----+---------+----------------+      
header = a packet               | IP  | TCP hdr |  HTTP request  |      
                                +-----+---------+----------------+      
Layer 2 adds a header     +-----+-----+---------+----------------+-----+
and trailer = a frame     | Eth | IP  | TCP hdr |  HTTP request  | FCS |
                          +-----+-----+---------+----------------+-----+
Layer 1 sends the whole frame as signals: 0110100001110100...           
```

This shows plain HTTP for clarity. With HTTPS, the HTTP request is itself wrapped in TLS before TCP sees it.

### 7.2 Worked example — a web request leaving a laptop

A laptop at `192.0.2.2/24`, with default gateway `192.0.2.1`, opens `https://198.51.100.20/`.

1. **Higher layers.** The browser builds an HTTP request and encrypts it with TLS.
2. **Transport.** TCP puts it in a segment from an ephemeral port (say 50514) to port 443. The three-way handshake has already set up the connection.
3. **Network.** IP wraps the segment in a packet from `192.0.2.2` to `198.51.100.20`. The laptop checks its routing table: `198.51.100.20` is not inside `192.0.2.0/24`, so the packet must go to the default gateway.
4. **Datalink.** The laptop needs the *gateway's* MAC address, not the server's, because the server is not on the local network. It takes it from the ARP cache, or sends an ARP request first. The frame is addressed to the gateway's MAC, even though the packet inside is addressed to the server.
5. **Physical.** The NIC sends the frame as signals on the wire.
6. **At the router.** The router checks the FCS, strips the frame, reads the destination IP, reduces the TTL by one, looks up its own routes and builds a brand-new frame for the next link.
7. **At the server.** Each layer peels off its header until the web server listening on port 443 gets the request.

### 7.3 What changes at each hop

```text
  Laptop                    Router                         Server       
  192.0.2.2         192.0.2.1 | 198.51.100.1               198.51.100.20
  MAC-L                MAC-R1 | MAC-R2                     MAC-S        
     |                        |                              |          
     +------ frame 1 -------->+-------- frame 2 ------------>+          
                                                                        
  Frame 1 (laptop's LAN):  src MAC-L    dst MAC-R1                      
  Frame 2 (server's LAN):  src MAC-R2   dst MAC-S                       
  IP packet in both:       src 192.0.2.2  dst 198.51.100.20  (unchanged)
  TTL:                     one lower after the router, e.g. 64 -> 63    
```

MAC addresses are local to each link, so they are rewritten at every router. IP addresses stay the same from end to end. The TCP ports are untouched by ordinary routers.

> **Note (beyond this lesson):** network address translation (NAT) is the big exception. A NAT device rewrites IP addresses, and often ports too. The book covers NAT in Chapter 3.

### 7.4 Where the model blurs

The model is a map, not a law. ARP sits between layers 2 and 3, TLS fits nowhere neatly, and tunnels and VPNs carry whole packets inside other packets, so the layers repeat. When a protocol does not fit the diagram, ask what job it is doing and troubleshoot it as that job.

## 8. Layers and troubleshooting

### 8.1 Three strategies

| Strategy | How it works | Best when |
|---|---|---|
| Bottom-up | Confirm layer 1, then 2, then 3, and so on | Nothing works at all |
| Top-down | Start at the application and work down | One application fails while others work |
| Divide and conquer | Start in the middle, usually with ping: success means look up, failure means look down | You want the answer quickly |

Whichever you pick, the goal is to find the *lowest* broken layer: nothing above it can work until it does.

### 8.2 Commands by layer

| Layer | Question | Windows (PowerShell) | Debian | FreeBSD |
|---|---|---|---|---|
| 1 | Is there a link? | `Get-NetAdapter` | `ip -br link` | `ifconfig em0` |
| 2 | Do neighbours answer? | `Get-NetNeighbor` | `ip neigh` | `arp -a` |
| 3 | Address and route? | `Get-NetIPAddress`, `Get-NetRoute` | `ip -br addr`, `ip route` | `ifconfig`, `netstat -rn` |
| 3 | Can I reach the host? | `Test-Connection host` | `ping -c 4 host` | `ping -c 4 host` |
| 3 | Where does the path stop? | `Test-NetConnection host -TraceRoute` | `traceroute host` | `traceroute host` |
| 4 | Is the service listening? | `Get-NetTCPConnection -State Listen` | `ss -tlnp` | `sockstat -4l` |
| 4 | Can I reach the port? | `Test-NetConnection host -Port 443` | `nc -zv host 443` | `nc -zv host 443` |
| Higher | Does the application answer? | `Invoke-WebRequest`, `Resolve-DnsName` | `curl -v`, `dig` | `fetch`, `host` |

On a minimal Debian install, some of these come from extra packages: `traceroute`, `dnsutils` (for `dig`) and `netcat-openbsd` (for `nc`).

### 8.3 Worked example — "the app is down"

Users report that the web app on `app01` (`198.51.100.20`) will not load, but an admin can still SSH in.

1. **Divide and conquer.** SSH working proves layers 1 to 4 are fine to `app01`, at least for port 22. The fault is probably specific to the web service, so start at layer 4 on port 443.
2. **Test the port from a client.** `Test-NetConnection app01 -Port 443` shows `PingSucceeded : True` but `TcpTestSucceeded : False`.
3. **Check the listener on the server.** `sudo ss -tlnp` shows the web server on `127.0.0.1:443`, not `0.0.0.0:443`: it only accepts local connections.
4. **Fix and verify.** Correct the listen address in the web server's configuration, restart it, and repeat steps 2 and 3 until `TcpTestSucceeded` is `True`.
5. **Had it been listening correctly,** the next suspect would be a firewall: on the host (Windows Defender Firewall, nftables on Debian, pf on FreeBSD) or on the network.

> **In the real world:** *how* a TCP connection fails is a clue. **Connection refused** means a host answered with a reset: the network path works, but nothing is listening on that port. A **timeout** means nothing answered at all, which usually points to a firewall silently dropping the traffic, or a routing problem.

### 8.4 Talking to the network team

Layers give you a shared vocabulary. "The network is broken" gets a slow reply; "link up at 1 Gb/s, gateway answers ARP, ping to `198.51.100.20` works, TCP 443 times out from two subnets, and the server is listening on `0.0.0.0:443`" tells the network team exactly where to look.

## 9. Security perspective

Every layer has its own attacks, and its own places to look for evidence.

- **Layer 1.** Anyone who can plug into a live wall port is on your network. Disable unused switch ports, use 802.1X where you can, and treat unexpected link up/down events in switch logs as worth a look.
- **Layer 2.** ARP has no authentication: any host can claim any IP address. **ARP spoofing** tells victims that the attacker's MAC address belongs to the gateway, putting the attacker in the middle of their traffic. Watch the neighbour table: a gateway MAC address that changes without a hardware swap, or two IP addresses sharing one MAC, is worth investigating. Dynamic ARP Inspection, DHCP snooping and port security are the switch-side defences. MAC addresses are trivial to change, so never treat one as proof of identity.
- **Layer 3.** Source addresses can be forged in UDP and ICMP traffic, as no handshake proves them. An unexpected default or specific route can quietly redirect traffic, so `ip route` and `Get-NetRoute` belong in incident-response checklists. Blocking ping does not hide a host: scanners just try ports.
- **Layer 4.** Every listening port is attack surface. Regularly audit listeners *and the process that owns each one*, and bind internal-only services to loopback. A completed TCP handshake proves the client can really receive traffic at its source IP address, which makes TCP-based logs more trustworthy than UDP-based ones.
- **Higher layers.** TLS protects the application's data, but not the layers below. IP addresses and ports stay visible to anyone on the path, and so, usually, does the server name the client asked for. Encryption at one layer does not hide the others.

## Summary

- Layers split networking into separate jobs, so each can be built, changed and diagnosed on its own.
- OSI supplies the layer numbers; TCP/IP describes the real protocols; this chapter uses layers 1 to 4 plus "higher layers".
- Layer 1 moves signals (check link, speed, errors). Layer 2 moves frames by MAC address (check the neighbour table). Layer 3 moves packets by IP address (check addresses, routes, ping). Layer 4 reaches the right program by port (check listeners, test the port).
- MAC addresses change at every hop; IP addresses stay the same end to end, unless NAT rewrites them.
- Ping proves layers 1 to 3 only. "Refused" means nothing is listening; a timeout usually means something dropped the traffic.
- Troubleshoot by finding the lowest broken layer, and report findings layer by layer.
- Each layer has its own attacks, from rogue devices and ARP spoofing to exposed listeners.

## Glossary

| Term | Meaning |
|---|---|
| ARP | Address Resolution Protocol: finds the MAC address that owns a local IPv4 address |
| Broadcast domain | All devices that receive each other's layer 2 broadcasts; bounded by routers |
| Default gateway | The router a host sends packets to when no more specific route matches |
| Encapsulation | Wrapping data in each layer's header (and trailer) on the way down the stack |
| FCS | Frame check sequence: a checksum at the end of a frame for detecting damage |
| Frame | A unit of layer 2 data, addressed by MAC address |
| ICMP | Internet Control Message Protocol: layer 3 control and error messages, including ping |
| MAC address | A 48-bit hardware address used at layer 2 |
| MTU | Maximum transmission unit: the largest payload a link carries, 1,500 bytes on standard Ethernet |
| Neighbor Discovery (NDP) | IPv6's replacement for ARP, running over ICMPv6 |
| OSI model | The seven-layer reference model that supplies the layer numbers |
| Packet | A unit of layer 3 data, addressed by IP address |
| Port | A number from 0 to 65,535 that identifies a program's endpoint for TCP or UDP |
| TTL | Time to live: a counter reduced at each router; the packet is dropped at zero |
| VLAN | A virtual LAN: one switch divided into separate broadcast domains |

## Review questions

1. Name the four numbered layers used in Chapter 1, from the bottom, and say what the rest are called.
2. What is the unit of data called at layers 2, 3 and 4?
3. In `ip link` output, what is the difference between `UP` and `LOWER_UP`?
4. A server that linked at 1 Gb/s yesterday now links at 100 Mb/s. What is the likely cause?
5. What does ARP do, and what replaces it in IPv6?
6. `ip neigh` shows the gateway as `FAILED`. Which layers should you check first?
7. A host at `192.0.2.2/24` sends a packet to `198.51.100.20`. Whose MAC address goes in the frame's destination field?
8. Ping to a server succeeds. Which layers has that proved, and which has it not?
9. A service is listening on `127.0.0.1:5432`. Can another machine connect to it?
10. `Test-NetConnection web01 -Port 443` fails, but ping works. Name two likely causes.
11. What is the difference between "connection refused" and a timeout?
12. Name one layer 2 attack, and one sign of it you could spot from a server.

## Answer key

1. **Physical, datalink, network, transport; everything above is "higher layers".** The chapter keeps OSI's numbers for the bottom four.
2. **Frame (2), packet (3), and segment for TCP or datagram for UDP (4).** Each name tells you which header you are looking at.
3. **`UP` means administratively enabled; `LOWER_UP` means a physical carrier is present.** Enabled with no link shows as `NO-CARRIER`.
4. **A damaged cable or port.** Gigabit needs all four pairs; 100 Mb/s needs only two.
5. **It finds the MAC address for a local IPv4 address; IPv6 uses Neighbor Discovery (NDP).** NDP runs over ICMPv6 using multicast.
6. **Layers 1 and 2: the link, the switch port's VLAN, and whether the gateway is up.** Nothing on layer 2 is answering for that address.
7. **The default gateway's.** The server is not local, so the frame goes to the router while the packet inside stays addressed to the server.
8. **Layers 1 to 3, both ways; not layer 4 or the application.** Ping uses ICMP, not TCP or UDP ports.
9. **No.** It is bound to loopback, so only programs on the same machine can connect.
10. **Nothing listening on 443 (or only on loopback), or a firewall blocking it.** Working ping rules out layers 1 to 3.
11. **Refused: the host sent a reset because nothing is listening. Timeout: nothing answered, usually a firewall dropping traffic.** It tells you where to look next.
12. **ARP spoofing; the gateway's MAC address changing in the neighbour table.** ARP has no authentication.
