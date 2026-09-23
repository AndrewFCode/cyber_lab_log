---
title: "TryHackMe 5.5: Extending Your Network — Class Notes"
description: "Full class notes for TryHackMe Pre Security (2026 path) module 5, Extending Your Network: port forwarding, stateful and stateless firewalls, VPNs, routers, switches and VLANs."
pubDate: 2026-09-22
tags: ["class-notes", "tryhackme", "networking", "firewalls", "vpn", "vlans"]
draft: false
---

**Class notes · TryHackMe Pre Security (2026 path) · Module 5, room 5: Extending Your Network**

> **Quick reference:** the short version of this room is the [Extending Your Network cheat sheet](/cyber_lab_log/resources/tryhackme/5/), the fifth sheet in Module 5, after Packets & Frames. The A+ lesson on [network devices](/cyber_lab_log/resources/a-plus-core-1/2/) covers firewalls and switches from the exam's angle, and [Networking for Sysadmins chapter 2](/cyber_lab_log/resources/networking-sysadmins/2/) goes deeper on VLANs.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what port forwarding does and where it is configured.
2. Explain what a firewall decides, and on what information.
3. Compare stateful and stateless firewalls, and say when each suits.
4. Describe what a VPN is, what it protects, and what it does not.
5. Compare PPP, PPTP and IPsec, and say which should not be used today.
6. Describe what routers and switches do, and the difference between a layer 2 and a layer 3 switch.
7. Explain what VLANs separate, and what that does and doesn't guarantee.

## 1. Port forwarding

### 1.1 Making an internal service reachable

A service running inside a network is, by default, only reachable from inside that network. A web server on `192.168.1.10` listening on port 80 can be used by the other machines on `192.168.1.x` — an **intranet** — and by nobody else, because its address is private and the internet cannot route to it.

**Port forwarding** changes that. It is configured on the network's **router**, and it says: traffic arriving at the public address on a given port should be handed to a particular internal machine and port. Visitors then reach the service through the network's public IP address.

```text
  THE INTERNET                    ROUTER                 NETWORK 1       
                                                                         
  Visitor  --- to 203.0.113.70:80 --->  +----------+                     
                                        | Port     |                     
                                        | forward: |--- 192.168.1.10:80  
                                        | 80 ->    |     (web server)    
                                        | .1.10:80 |                     
                                        +----------+--- 192.168.1.11     
                                                        (PC, not exposed)
                                                                         
  Without the forward, only 192.168.1.x could reach the web server.      
```

> **Note (beyond this lesson):** port forwarding is really a NAT rule. The router rewrites the destination address (and often the port) of arriving packets so they land on the internal host, and rewrites the replies on the way back. That is why it is sometimes called destination NAT.

### 1.2 Port forwarding is not a firewall

It is easy to confuse the two. Port forwarding **exposes** a service: it creates a path from the outside world to one internal machine and port. A **firewall decides whether traffic is allowed** along a path. A port can be forwarded and still be blocked by firewall rules, and on many home routers the two settings live side by side.

### 1.3 Worked example — publishing a web server

The web server at `192.168.1.10:80` should be reachable from the internet at the router's public address `203.0.113.70`.

1. **Give the server a fixed address,** either statically or with a DHCP reservation. A forward points at one address, so it must not change.
2. **Add the forward on the router:** external port 80 to `192.168.1.10` port 80.
3. **Check the server's own firewall** allows inbound port 80. Forwarding gets the traffic to the machine; the machine still decides.
4. **Test from outside the network,** such as from a phone on mobile data. Testing from inside often doesn't work, because the traffic never leaves the network.
5. **Consider what you have done.** Port 80 on that machine is now reachable by the entire internet, scanners included. Only forward what needs to be public, and prefer HTTPS on 443.

## 2. Firewalls

### 2.1 What a firewall decides

A **firewall** controls what traffic may enter and leave a network: border control for the network. An administrator writes rules that permit or deny traffic based on questions such as:

| Question | Example rule |
|---|---|
| Where is the traffic from? | Deny anything from this network range |
| Where is it going? | Allow traffic to the web server only |
| Which port is it for? | Allow port 80, deny everything else |
| Which protocol? | Allow TCP, deny UDP |

The firewall inspects packets to answer those questions.

Firewalls come in all sizes: dedicated hardware in large organisations, the firewall built into a home router, and software running on a host, such as Windows Defender Firewall, `nftables` on Linux or `pf` on BSD.

> **Correction:** the room gives Snort as an example of a software firewall. Snort is an **intrusion detection and prevention system**: it inspects traffic and alerts on (or blocks) patterns that look like attacks. That is a related but different job from a firewall's allow-and-deny rules.

### 2.2 Stateful firewalls

A **stateful** firewall tracks whole connections rather than judging each packet alone. It remembers that a connection was established and treats later packets in the light of that: replies to traffic you allowed out are allowed back in, and packets that don't belong to any known connection can be dropped.

That knowledge costs memory and processing, since the firewall keeps a table of every live connection, but it makes far better decisions than rules alone.

> **Correction:** the room says a stateful firewall blocks the entire device if "a connection from a host is bad". That is not what stateful means. Statefulness is about tracking connection state (new, established, related) and judging packets against it. Blocking a whole host after bad behaviour is a different feature, usually from an intrusion prevention system or a blocklist.

### 2.3 Stateless firewalls

A **stateless** firewall applies a static set of rules to each packet on its own, with no memory of what came before. It uses far fewer resources, which is why it copes well with huge volumes of traffic, such as absorbing a distributed denial-of-service attack at the edge of a network.

The trade-off is that it is only as good as its rules. It cannot tell a reply from an unsolicited packet, so rules must be written to cover both directions, and anything the rules don't match exactly slips through or is blocked by accident.

| | Stateful | Stateless |
|---|---|---|
| Decides on | The whole connection | One packet at a time |
| Remembers | Every live connection | Nothing |
| Resource use | Higher | Very low |
| Return traffic | Allowed automatically | Needs its own rule |
| Best at | Normal traffic, accurate decisions | Huge volumes, simple filtering |

### 2.4 Worked example — reading two rule sets

A company wants staff to browse the web, but nothing from the internet to start a connection inward.

1. **With a stateful firewall:** one rule allows outbound traffic to ports 80 and 443; return traffic is allowed automatically because it belongs to established connections. Inbound new connections are denied by default.
2. **With a stateless firewall:** you need a rule for the outbound traffic and a second for the replies, typically matching traffic from ports 80 and 443 back to the high-numbered ephemeral ports.
3. **The weakness of the stateless version:** anyone can craft a packet that *looks* like a reply, with source port 443, and it matches the rule. The stateful firewall would drop it, because it belongs to no connection it has seen.

## 3. VPNs

### 3.1 What a VPN is

A **VPN** (virtual private network) lets devices on separate networks communicate securely by creating a dedicated encrypted path between them across the internet, called a **tunnel**. The devices inside the tunnel form their own private network.

In the room's example, two offices each have their own network, and the VPN forms a third network across them. Machines on it remain part of their own office networks, but also share a private network that only VPN-connected devices can use.

```text
   OFFICE 1 (network 1)                        OFFICE 2 (network 2)  
   192.168.1.0/24                              192.168.2.0/24        
        |                                             |              
   +----+----+                                   +----+----+         
   | Router  |=========== VPN tunnel ============| Router  |         
   +----+----+      encrypted, over the          +----+----+         
        |           public internet                   |              
     servers                                        staff PCs        
                                                                     
   Inside the tunnel the two offices behave like one private network;
   anyone in between sees only encrypted traffic.                    
```

### 3.2 What VPNs are good for

| Benefit | What it means |
|---|---|
| Joining locations | Offices in different places share servers and infrastructure as if they were on one network |
| Privacy | The tunnel is encrypted, so the traffic can't be read in transit. This matters most on public Wi-Fi, where the network provides no encryption of its own |
| Anonymity | Traffic reaches the internet from the VPN provider, not from you, which is why journalists and activists rely on VPNs where speech is restricted |

The anonymity point comes with a condition the room makes well: it only goes as far as the provider's respect for privacy. A VPN that logs everything you do gives you no more anonymity than not using one.

TryHackMe itself uses a VPN to connect you to its deliberately vulnerable machines. That keeps those machines off the public internet, keeps your practice traffic inside the tunnel, and means your ISP doesn't see what looks like you attacking things.

> **Note (beyond this lesson):** a VPN moves the point at which your traffic joins the internet; it does not make you anonymous. Logging in to an account, browser fingerprinting and cookies identify you just as well inside a tunnel as outside it.

### 3.3 VPN technologies

| Technology | What it is |
|---|---|
| PPP | Point-to-Point Protocol: carries traffic over a single link and handles authentication. It is not routable on its own, so it cannot leave a network unaided |
| PPTP | Point-to-Point Tunneling Protocol: wraps PPP so it can travel across networks. Easy to set up and widely supported, but weakly protected |
| IPsec | Internet Protocol Security: encrypts and authenticates traffic within the existing IP framework. Harder to configure, but strong and widely supported |

> **Correction:** the room says PPP provides encryption and works "by using a private key and public certificate (similar to SSH)". PPP itself provides framing and authentication (with PAP, CHAP or EAP), not encryption; in a PPTP tunnel the encryption comes from a separate protocol, MPPE. The key-and-certificate description belongs to TLS-based and IPsec-based VPNs, not to PPP.

> **Caution:** PPTP is not merely "weakly encrypted": its authentication and encryption have been broken for years and it is considered obsolete. Treat finding it in use as something to replace, not to configure.

> **Note (beyond this lesson):** the technologies in common use today are **IPsec** (often with IKEv2), **OpenVPN** and **WireGuard**, the last being much simpler and faster than the older options.

## 4. Routers

A **router** connects networks and passes data between them, which is **routing**. It works at **layer 3** of the OSI model, and it usually has a management interface, a web page or a console, where an administrator configures things like port forwarding and firewall rules.

Where two networks are joined by more than one path, the router chooses which to use. The factors are the ones from the OSI Model room: which path is shortest, which is most reliable, and which uses the faster medium, such as fibre rather than copper.

## 5. Switches

### 5.1 Layer 2 switches

A **switch** connects many devices over Ethernet. A **layer 2** switch forwards **frames** to the right device using **MAC addresses**, with the IP packets sitting untouched inside those frames. That is its whole job: get each frame to the correct port.

> **Correction:** the room says switches handle "from 3 to 63" devices. Real port counts are 5, 8, 16, 24 or 48 on ordinary switches, and chassis switches in the core of a large network run to hundreds of ports. The earlier Intro to LAN room gives the more usual figures.

### 5.2 Layer 3 switches

A **layer 3** switch does the layer 2 job *and* some of a router's: it forwards frames by MAC address and routes packets by IP address. This is what lets one switch hold several networks, each with its own gateway address on the switch, and move traffic between them at switching speed.

A layer 2 switch cannot work at layer 3: the capability is either in the hardware or it isn't.

## 6. VLANs

A **VLAN** (virtual local area network) splits the devices on a switch into separate virtual networks. Each VLAN behaves like its own network, even though the devices share the same physical switch, which is why a single switch can serve a Sales department and an Accounting department that both reach the internet but are kept apart from each other.

```text
                    +-------------------------+                       
                    |   Layer 3 switch        |                       
   Internet --------+  VLAN 10: 192.168.1.1   |                       
                    |  VLAN 20: 192.168.2.1   |                       
                    +----+---------------+----+                       
                         |               |                            
                    VLAN 10          VLAN 20                          
                    Sales            Accounting                       
                    192.168.1.x      192.168.2.x                      
                                                                      
   Both reach the internet. Whether Sales can reach Accounting depends
   on the rules on the switch, not on the VLANs alone.                
```

> **Correction:** the room says VLANs mean the two departments "are not able to communicate with each other". Separation is the starting point, but if the switch routes between the VLANs, as a layer 3 switch does, traffic will pass unless rules stop it. The security comes from the VLAN **plus** the access rules or firewall between them.

### 6.1 Worked example — separating two departments

Sales and Accounting share one 48-port switch, and Accounting's systems must not be reachable from Sales.

1. **Create two VLANs** on the switch, say VLAN 10 for Sales and VLAN 20 for Accounting.
2. **Assign the ports:** each desk's port becomes an untagged member of its department's VLAN.
3. **Give each VLAN its own subnet and gateway,** such as `192.168.1.0/24` and `192.168.2.0/24`.
4. **Write the rules.** Both VLANs may reach the internet; deny traffic from VLAN 10 to VLAN 20. Without this step, the switch happily routes between them.
5. **Check it.** From a Sales PC, try to reach an Accounting machine by IP address. It should fail, while a website still loads.

## 7. Security perspective

- **Every port forward is a permanent doorway.** Once a port is forwarded, anyone on the internet can reach that service, and scanners find it within hours. Forward only what must be public, and reach internal services through a VPN instead. Forwarded RDP (3389) and SMB (445) are two of the most common ways organisations get ransomware.
- **Default deny beats default allow.** A firewall is only as good as its rules, so start by denying everything inbound and permit the few things that need to work, rather than blocking the things you happen to think of.
- **Stateless rules can be forged.** Because a stateless firewall cannot tell a genuine reply from a crafted packet, rules written to allow "replies" can be abused. Where traffic volume allows, stateful filtering is the safer default.
- **A VPN is encryption, not anonymity or safety.** It protects traffic from the network it crosses, which is genuinely valuable on public Wi-Fi. It does not hide you from the sites you log into, and it shifts your trust onto the VPN provider, who can see and log what your ISP would have seen.
- **Old tunnels are worse than none.** PPTP's protections are broken. A VPN people trust but that doesn't actually protect them is more dangerous than an obviously open connection.
- **VLANs are a boundary only with rules.** Segmentation limits how far an intruder can move, but only if something filters between the segments. Check by testing from one VLAN to another, not by assuming.

## Summary

- Port forwarding, configured on the router, makes an internal service reachable through the public IP address. It exposes a path; the firewall still decides what is allowed along it.
- Firewalls permit or deny traffic by source, destination, port and protocol.
- Stateful firewalls track whole connections and allow return traffic automatically; stateless ones judge each packet against static rules, cheaply but crudely.
- A VPN builds an encrypted tunnel across the internet so separate networks or users act as one private network.
- VPNs give privacy on untrusted networks and some anonymity, limited by what the provider logs.
- PPP carries and authenticates traffic on a link; PPTP tunnels it and is obsolete; IPsec is strong but harder to configure.
- Routers connect networks at layer 3 and choose paths; layer 2 switches forward frames by MAC address; layer 3 switches also route by IP address.
- VLANs split one switch into separate virtual networks, and become a security boundary once rules control traffic between them.

## Glossary

| Term | Meaning |
|---|---|
| Firewall | A device or software that permits or denies traffic by rule |
| Intranet | A network's internal services, reachable only from inside |
| IPsec | A VPN technology that encrypts and authenticates IP traffic |
| Layer 2 switch | A switch that forwards frames using MAC addresses |
| Layer 3 switch | A switch that also routes packets using IP addresses |
| MPPE | The protocol that encrypts data inside a PPTP tunnel |
| Packet inspection | Examining a packet's headers (and sometimes contents) to decide what to do with it |
| Port forwarding | A router rule sending traffic from a public port to an internal host and port |
| PPP | Point-to-Point Protocol: framing and authentication over a single link |
| PPTP | Point-to-Point Tunneling Protocol: an old, insecure VPN protocol |
| Router | A device that connects networks and forwards between them at layer 3 |
| Stateful firewall | One that tracks connections and judges packets in that context |
| Stateless firewall | One that judges each packet against static rules alone |
| Tunnel | An encrypted path across a public network carrying private traffic |
| VLAN | A virtual LAN: a separate network sharing physical switch hardware |
| VPN | Virtual private network: devices on separate networks joined by a tunnel |

## Review questions

1. Why can't the internet reach a web server on `192.168.1.10` by default?
2. Where is port forwarding configured, and what does it do?
3. What is the difference between port forwarding and a firewall?
4. Name four things a firewall can base a decision on.
5. What does "stateful" actually mean for a firewall?
6. Why does a stateless firewall need a rule for return traffic?
7. Which type of firewall suits absorbing a flood of traffic, and why?
8. What is a VPN tunnel, and what does the encryption protect against?
9. Someone says a VPN makes them anonymous. What would you add?
10. Which of PPP, PPTP and IPsec should not be used today, and why?
11. At which OSI layer does a router work?
12. What does a layer 3 switch do that a layer 2 switch cannot?
13. Sales and Accounting are on separate VLANs on one switch. Can they reach each other?
14. Your company wants staff to reach an internal file server from home. Port forward it or use a VPN?

## Answer key

1. **Its address is private, so the internet cannot route to it.** Only devices on the same network can reach it.
2. **On the router; it sends traffic arriving at the public address on a given port to a chosen internal host and port.** That makes the service reachable from outside.
3. **Port forwarding opens a path to an internal service; a firewall decides whether traffic may travel.** A forwarded port can still be blocked.
4. **Source, destination, port and protocol.** The firewall inspects packets to check them.
5. **It tracks whole connections, so it knows whether a packet belongs to one it has already allowed.** New, established and related traffic are treated differently.
6. **It has no memory of the outbound connection.** Each packet is judged alone, so the reply needs its own rule.
7. **Stateless, because it uses very few resources per packet.** It holds no connection table to exhaust.
8. **An encrypted path across the internet joining separate networks; it stops anyone in between reading or altering the traffic.** Useful above all on public Wi-Fi.
9. **It only shifts trust to the VPN provider, and it doesn't hide you from services you log in to.** A provider that logs everything gives no anonymity.
10. **PPTP: its encryption and authentication are broken.** IPsec is the strong option of the three; PPP alone can't leave the network.
11. **Layer 3, the network layer.** It forwards using IP addresses.
12. **Route packets between networks using IP addresses.** A layer 2 switch only forwards frames by MAC address.
13. **Only if the rules allow it.** A layer 3 switch will route between VLANs unless something denies it.
14. **Use a VPN.** Port forwarding would expose the file server to the whole internet.
