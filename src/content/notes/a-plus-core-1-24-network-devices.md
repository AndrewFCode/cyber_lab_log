---
title: "A+ Core 1 2.5: Network Devices — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 2.5: routers, managed and unmanaged switches, access points, firewalls, PoE and ISP devices."
pubDate: 2026-09-22
tags: ["class-notes", "a-plus", "comptia", "messer", "networking", "network-devices", "poe"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 2, objective 2.5**

> **Quick reference:** the short version of this lesson is the [Network Devices cheat sheet](/cyber_lab_log/resources/a-plus-core-1/2/), part of Section 2 alongside the lessons on ports, wireless, network services, DNS, DHCP, VLANs and VPNs.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why one home "router" is really several devices in one box.
2. Describe how routers, switches and access points each decide where to send traffic.
3. Compare managed and unmanaged switches, and choose between them for a scenario.
4. Explain how a patch panel separates permanent cabling from changeable connections.
5. Compare traditional and next-generation firewalls, and list the extra jobs firewalls often do.
6. Describe Power over Ethernet, its standards and power levels, and the difference between endspan and midspan.
7. Compare cable modems, DSL and ONTs, and explain the demarcation point.
8. Describe what a network interface card provides.

## 1. One box, many devices

Walk into any data centre or wiring closet and you see racks of separate devices, each with one job. At home, most of those jobs are squeezed into a single box. The typical home or small-office "wireless router" is really a router, a switch, a wireless access point and a firewall sharing one case and one power supply.

For the exam and for troubleshooting, pull those roles apart: each device decides using different information, which tells you what it can and cannot do.

```text
  ISP: fibre, coax or phone line                                         
          |                                                              
          v                                                              
  +------------------+    +-----------------+    +---------------------+ 
  | ONT, cable modem |    | Firewall        |    | Switch (PoE)        | 
  | or DSL modem     +--->+ also routes     +--->+ forwards by MAC     | 
  | = the demarc     |    | between subnets |    | managed: VLANs etc. | 
  +------------------+    +-----------------+    +--+-------+-------+--+ 
                                                    |       |       |    
                                                    v       v       v    
                                               Access    IP phone Desk PC
                                               point     (PoE)    (NIC)  
                                               (PoE)                     
```

| Device | Works at | Decides using |
|---|---|---|
| Router | Layer 3 (network) | Destination IP address |
| Switch | Layer 2 (datalink) | Destination MAC address |
| Access point | Layer 2 (datalink) | Destination MAC address |
| Traditional firewall | Layers 3 and 4 | IP addresses, protocol and port numbers |
| Next-generation firewall | Up to the application | The application itself |

## 2. Routers

### 2.1 What a router does

To get from one IP subnet to another, traffic needs a **router**. A router reads the destination IP address in each packet, looks it up in its **routing table**, and sends the packet out of whichever interface leads towards that destination. Routers operate at OSI layer 3.

### 2.2 Layer 3 switches

Some devices combine switching and routing in one chassis. Because routing is a layer 3 job, these are called **layer 3 switches** or **multilayer switches**. They are common inside larger networks, where they route between VLANs at switching speeds.

### 2.3 Joining different kinds of network

Routers also connect networks built on different media: Ethernet to wireless, copper to fibre, or a LAN to a serial or broadband WAN link. So a router may move traffic between subnets and between physical network types at once.

## 3. Switches

### 3.1 What a switch does

If you plug a computer into a wall socket at work, the other end is almost certainly a **switch**. A switch connects end devices on the same network and forwards each frame based on its **destination MAC address**.

Switches are fast because the forwarding happens in hardware rather than software, usually in an **ASIC** (application-specific integrated circuit): a chip designed to do one job very quickly. That is what lets a switch keep up with every port running at full speed.

Because most wired devices connect to one, switches have lots of ports. A workgroup switch serving one area might have 24 or 48. A core switch at the centre of a large network can have hundreds. Many switches also provide **Power over Ethernet** (section 7), and, as above, some also route.

### 3.2 Unmanaged switches

An **unmanaged switch** is plug-and-play: connect power, plug in devices, and it works. There is nothing to configure, which also means there is nothing you *can* configure:

- **No VLANs.** Every port is in the same broadcast domain: effectively one big VLAN.
- **No remote management.** There is usually no SNMP (Simple Network Management Protocol) to report back to a monitoring system, and no logs are kept.
- **Lower price.** The lack of features keeps them cheap.

They suit simple jobs, such as adding a few ports to a home office, where nobody needs to manage or monitor the switch.

### 3.3 Managed switches

Enterprise networks need switches they can configure and watch remotely. A **managed switch** is usually larger and adds features such as:

| Feature | What it gives you |
|---|---|
| VLANs | Different ports in different, separate networks |
| Traffic prioritisation (QoS) | Important traffic, such as voice or web, goes ahead of bulk traffic, such as file transfers |
| Redundancy | Several switches configured to back each other up, so a failed switch or power supply doesn't take the network down |
| Port mirroring | A copy of one port's traffic sent to another port, where a protocol analyser or security monitor can see it |
| Remote management | Configuration over the network, SNMP monitoring and logging |

> **Note (beyond this lesson):** switch redundancy relies on loops in the cabling, and loops at layer 2 would flood the network forever. The **Spanning Tree Protocol** (STP) prevents this by blocking redundant links until they are needed.

### 3.4 Worked example — which switch?

Three requests arrive in one week. For each, decide between managed and unmanaged.

1. **A home worker wants four more wired ports on their desk.** Nothing needs separating or monitoring, and cost matters. An **unmanaged** switch is right.
2. **An office wants guest Wi-Fi traffic kept away from staff PCs, on the same cabling.** That needs VLANs, which only a **managed** switch provides.
3. **The security team wants to run an intrusion detection sensor on the link to the finance server.** That needs port mirroring, so again a **managed** switch.

The rule of thumb: if anyone needs to separate, prioritise, monitor or remotely manage traffic, the switch must be managed.

## 4. Access points

A wireless **access point (AP)** connects wireless devices to the wired network. It is not the same as the wireless router most homes have. An access point does no routing and no address translation: it simply passes traffic between the wireless network on one side and the wired network on the other. This is called **bridging**.

Because it is a bridge, an access point decides where to send each frame the same way a switch does, by destination MAC address. A frame for a wireless client goes out over the air; a frame for anything else goes onto the wired network.

> **Exam tip:** a SOHO "wireless router" routes, switches, bridges and filters; an enterprise **access point** only bridges.

## 5. Patch panels

### 5.1 Permanent runs and flexible patching

In an office, each desk's network socket is connected by a long cable run, through walls and ceilings, back to a central wiring closet. Once installed, that run should never move.

In the closet, each run is terminated on the back of a **patch panel**, where the individual wires are pressed into place with a punch-down tool. The front of the patch panel has numbered RJ45 sockets, one for each desk. Short **patch leads** then connect those sockets to switch ports.

> **Correction:** the lesson describes the cable being terminated "onto a punch-down block" and the RJ45 connectors being "on the other side of the patch panel". These are the same device: the punch-down connections are on the back of the patch panel and the RJ45 sockets are on the front. Separate punch-down blocks (such as 66 and 110 blocks) also exist, mainly for telephone wiring.

```text
  DESK                     CEILING / WALL            WIRING CLOSET         
                                                                           
  PC --patch lead--> wall  ==== permanent run ====>  back of patch panel   
                     plate      (never moved)        (punched down, port 9)
                                                           |               
                                                     front of patch panel  
                                                     (RJ45, labelled 9)    
                                                           |               
                                                      short patch lead     
                                                      (move this to change 
                                                       switch or VLAN)     
                                                           |               
                                                      switch port          
```

### 5.2 Why this design works

The hard-to-replace run through the building is installed once and left alone, so it rarely develops faults. Every change happens with short, cheap patch leads in the closet: a failed lead is swapped in seconds, and a new switch is simply patched in.

### 5.3 Worked example — moving a desk to another VLAN

A user at desk 9 moves to the finance team, whose PCs connect to a separate switch configured for the finance VLAN.

1. Find the patch panel port labelled **9**.
2. Unplug its patch lead from the general staff switch.
3. Plug it into a free port on the finance switch.
4. The desk is now on the finance network. Nobody has touched the desk, the wall socket or the cable run.

With one managed switch, the same move needs no cable at all: just change that port's VLAN. Patch panels give physical flexibility; managed switches give logical flexibility.

## 6. Firewalls

### 6.1 Traditional and next-generation firewalls

A **firewall** allows or blocks traffic according to a set of rules, often called access control lists. A **traditional firewall** matches traffic on port numbers, so it can, for example, allow TCP port 443 and block TCP port 3389.

> **Correction:** the lesson describes traditional firewalls as deciding by port number alone. In practice they match on source and destination IP addresses, the protocol (TCP, UDP, ICMP) and port numbers together, and most are stateful: they track connections and allow the replies to traffic that was permitted out.

A **next-generation firewall (NGFW)** identifies the application itself, whatever port it uses. It can allow web browsing but block remote access software, even though both may use HTTPS on port 443. The decision is based on what the traffic actually is, not just which port it arrived on.

### 6.2 Other jobs firewalls do

| Role | What it means |
|---|---|
| VPN concentrator | Terminates site-to-site VPNs, and remote access VPNs from users working elsewhere |
| Proxy | Sits in the middle of a conversation: takes the client's request, makes it to the server itself, checks the response, and only then passes it back |
| Router | Routes between subnets, so every packet between them passes through the firewall's rules |

Large firewalls can have many interfaces, connecting tens or even hundreds of networks, all controlled by one security policy.

## 7. Power over Ethernet

### 7.1 Data and power on one cable

**Power over Ethernet (PoE)** sends DC power along the same Ethernet cable that carries the data. It is used for desk phones, ceiling-mounted access points, security cameras and, with the newest standard, even laptops. The big advantage is installation: an access point in an awkward spot in the ceiling needs only one cable, not a cable and a power socket.

> **Note (beyond this lesson):** the device supplying power is the **power sourcing equipment (PSE)**, and the device receiving it is the **powered device (PD)**. Standards-based PoE checks for a PoE device before sending any power, so plugging an ordinary laptop into a PoE port is safe. Some cheap kit uses non-standard "passive PoE", which is always on and can damage equipment that isn't expecting it.

### 7.2 Endspan and midspan

Many switches supply PoE themselves. If yours doesn't, a **PoE injector** can sit in the middle of the cable run: data goes in from the switch, mains power goes into the injector, and data plus power come out to the device.

- **Endspan:** power comes from the switch at the end of the run.
- **Midspan:** power is added partway along, by an injector.

```text
  Endspan: the switch itself supplies power                             
                                                                        
  +---------------+          data + power           +-------------+     
  | PoE switch    +-------------------------------->+ IP camera   |     
  +---------------+                                 +-------------+     
                                                                        
  Midspan: an injector adds power partway along                         
                                                                        
  +---------------+   data   +----------+  data + power  +-------------+
  | Normal switch +--------->+ Injector +--------------->+ IP camera   |
  +---------------+          +----+-----+                +-------------+
                                  |                                     
                             mains power                                
```

PoE-capable switches are usually labelled as such, sometimes with the PoE ports marked, and the documentation says which standard they support.

### 7.3 The PoE standards

Power figures are quoted in two places: what the switch sends, and what is left for the device after losses in the cable. The lesson mixes the two, so both are shown here.

| Name | Standard | Power at the switch (PSE) | Power at the device (PD) | Max current |
|---|---|---|---|---|
| PoE | IEEE 802.3af | 15.4 W | 12.95 W | 350 mA |
| PoE+ | IEEE 802.3at | 30 W | 25.5 W | 600 mA |
| PoE++ Type 3 | IEEE 802.3bt | 60 W | 51 W | 600 mA per pair set |
| PoE++ Type 4 | IEEE 802.3bt | 90 W | 71.3 W | 960 mA per pair set |

A quick check shows the first two rows are at the switch end: 15.4 W at 350 mA works out to 44 V, and 30 W at 600 mA to 50 V, the minimum voltages each standard's power supply must deliver.

> **Correction:** the lesson gives 15.4 W for PoE (the switch figure) but 25.5 W for PoE+ (the device figure). The matching figures are 15.4 W and 30 W at the switch, or 12.95 W and 25.5 W at the device. The lesson also says PoE++ was introduced with 10-gigabit copper Ethernet. 10GBASE-T dates from 2006; 802.3bt (2018) was simply the first PoE standard to support it, along with 2.5 and 5 Gb/s. PoE++ reaches its higher power by using all four wire pairs, where the earlier standards use two.

Original PoE suits phones and small devices. PoE+ powers bigger devices such as pan-tilt-zoom (PTZ) cameras. PoE++ powers the most demanding kit, including some laptops.

The standards are **backward compatible**: a PoE++ switch can power a PoE phone. They are not forward compatible: a device that needs PoE++ cannot be fully powered by a PoE+ or PoE port.

### 7.4 Worked example — a PoE power budget

> **Note (beyond this lesson):** a PoE switch has a total power budget shared by all its ports, as well as a per-port limit. The figures below are illustrative.

A 24-port PoE+ switch has a 370 W PoE budget. The plan is 16 desk phones, each allocated up to 15.4 W, and 4 access points, each allocated up to 30 W.

1. Phones: 16 x 15.4 W = 246.4 W.
2. Access points: 4 x 30 W = 120 W.
3. Total: 366.4 W, which fits, with 3.6 W to spare.
4. Someone then adds a PTZ camera allocated 30 W. The total becomes 396.4 W, which is 26.4 W over budget. Depending on the switch, a device will fail to power up, or a lower-priority port will be switched off.
5. Fixes: power the camera from a midspan injector, set port priorities so critical devices keep power, or buy a switch with a bigger budget.

## 8. Connecting to the internet: modems and ONTs

### 8.1 Cable modems

If your internet comes from a cable TV provider, you connect with a **cable modem**. It takes a broadband signal over **coaxial cable** and provides an Ethernet connection on your side. The same cable network carries television and data at the same time.

Cable modems follow a standard called **DOCSIS** (Data Over Cable Service Interface Specification), so they are sometimes called DOCSIS devices. Speeds of 1 Gb/s and more are common, so businesses use cable too, even without the TV or phone services.

> **Note (beyond this lesson):** cable bandwidth is shared between the homes and businesses on the same part of the provider's network, so speeds can drop at busy times.

### 8.2 DSL

Where there is no cable network, internet access can run over the telephone line using **DSL** (Digital Subscriber Line). DSL sends digital signals over the same copper pair as the phone, at the same time. It is **asymmetric**: much faster downstream than upstream.

DSL speed depends heavily on distance. The further the line is from the provider's equipment (the central office, or telephone exchange in the UK), the lower the speed, and beyond a certain distance DSL does not work at all.

> **Correction:** the lesson quotes up to about 200 Mb/s down and 20 Mb/s up, and a limit of about 10,000 ft (about 3 km). Treat those as best-case figures. ADSL2+ tops out around 24 Mb/s down and can reach about 18,000 ft (5.5 km). VDSL2, which is what UK "fibre to the cabinet" broadband uses, typically gives up to 80 Mb/s down and 20 Mb/s up. Only the newest VDSL2 variants, on very short lines of a few hundred metres, reach 200 to 300 Mb/s. With VDSL, the distance that matters is to the street cabinet, not the exchange.

### 8.3 ONTs and the demarcation point

Where fibre reaches the building, it ends at an **ONT** (optical network terminal), which converts the light signal to electrical connections that ordinary network equipment can use. The ONT sits at the **demarcation point** (the **demarc**). This may be in the data centre, in a box on the outside wall, or just inside the building.

The demarc is where responsibility changes hands. Everything on the provider's side of it is the provider's problem to fix. Everything on your side, including all the wiring inside the building, is yours.

An ONT may offer several kinds of connection:

| Port | Connector | Used for |
|---|---|---|
| Data | RJ45 | Ethernet to your router |
| Voice | RJ11 | Telephones, usually voice over IP |
| Video | F-connector (coax) | A TV set-top box or television |

> **Exam tip:** remember the pairing. Cable modem = coax, DOCSIS. DSL = telephone line, asymmetric, distance-limited. ONT = fibre, and marks the demarc.

## 9. Network interface cards

Every device on the network needs a **network interface card (NIC)**. Most laptops and desktops have one built into the motherboard. Expansion cards add network connections where there are none, or add more: a server card might offer two or four Ethernet ports on one card.

NICs come for different speeds and media, such as 100 Mb/s or gigabit Ethernet over copper, or fibre, so the card must match the network it connects to. Every interface on every NIC has its own **MAC address**, so each can be addressed individually on the network.

You can list each interface and its MAC address like this:

```powershell
Get-NetAdapter        # Windows PowerShell: MacAddress column
getmac /v             # Windows command prompt
```

```bash
ip link               # Linux: the MAC address follows "link/ether"
```

## 10. Security perspective

- **Routers and firewalls are chokepoints.** Route traffic between subnets and VLANs through a firewall, and every flow between them can be filtered and logged. Next-generation firewalls also catch applications hiding on permitted ports, such as remote access tools tunnelling over 443.
- **Unmanaged switches are blind spots.** No logs, no VLANs, no port security: anything plugged in is on the whole LAN, unseen. A small unmanaged switch hidden under a desk quietly adds extra ports to the network.
- **Use managed switches' security features.** Port security, 802.1X authentication and disabled unused ports stop unknown devices joining. Port mirroring feeds intrusion detection and packet capture. Put management interfaces on their own VLAN, use SNMPv3 (SNMPv1 and v2c send their community strings in clear text), and keep firmware updated.
- **Rogue access points.** Because an AP simply bridges, anyone who plugs a cheap AP into a live wall socket puts the internal wired network on the air. Wireless scanning and port security find and stop this.
- **Wiring closets are physical security.** Whoever can reach the patch panel can move any desk onto any network. Lock closets, label ports, and investigate patches nobody can explain.
- **PoE devices are often IoT.** Cameras, phones and APs in public areas are easy to unplug; a laptop plugged into the same socket should not get the same access. Put PoE devices on their own VLANs and apply port security.
- **The demarc marks your responsibility.** The provider secures its side. Everything on your side, including any ISP-supplied router with default credentials, is yours to lock down.
- **MAC addresses identify NICs, but can be changed in software.** Never treat a MAC address as proof of identity.

## Summary

- A home "wireless router" is a router, switch, access point and firewall in one box.
- Routers forward by IP address at layer 3; layer 3 switches also route.
- Switches forward by MAC address in hardware (ASICs). Managed switches add VLANs, QoS, redundancy, port mirroring and remote management; unmanaged ones are plug-and-play.
- Access points bridge wireless to wired, forwarding by MAC address, with no routing.
- Patch panels keep the permanent desk-to-closet runs untouched; changes happen with short patch leads.
- Traditional firewalls filter by addresses and ports; next-generation firewalls identify applications. Firewalls also act as VPN concentrators, proxies and routers.
- PoE carries power with data: 15.4 W (af), 30 W (at, PoE+), 60 or 90 W (bt, PoE++) at the switch. Switch power is endspan; an injector is midspan.
- Cable modems use coax and DOCSIS; DSL uses the phone line, is asymmetric and slows with distance; an ONT terminates fibre at the demarc.
- NICs connect devices to the network, and every interface has its own MAC address.

## Glossary

| Term | Meaning |
|---|---|
| Access point (AP) | A device that bridges wireless clients onto the wired network |
| ASIC | Application-specific integrated circuit: a chip built for one job, such as switching |
| Demarcation point (demarc) | Where responsibility passes from the service provider to the customer |
| DOCSIS | Data Over Cable Service Interface Specification: the cable modem standard |
| DSL | Digital Subscriber Line: broadband over a telephone line |
| Endspan | PoE supplied by the switch itself |
| Layer 3 switch | A switch that can also route; also called a multilayer switch |
| Managed switch | A configurable switch with VLANs, QoS, monitoring and remote management |
| Midspan | PoE added partway along a cable by an injector |
| Next-generation firewall (NGFW) | A firewall that identifies and controls applications, not just ports |
| NIC | Network interface card: connects a device to the network |
| ONT | Optical network terminal: converts the provider's fibre to Ethernet and other connections |
| Patch panel | A panel where permanent cable runs are punched down at the back, with RJ45 sockets at the front |
| PoE | Power over Ethernet: DC power carried on the Ethernet cable |
| Port mirroring | Copying one switch port's traffic to another port for monitoring |
| Router | A device that forwards packets between subnets by destination IP address |
| SNMP | Simple Network Management Protocol: used to monitor and manage network devices |
| Unmanaged switch | A plug-and-play switch with no configuration options |
| VPN concentrator | A device that terminates many VPN connections |

## Review questions

1. A home "wireless router" combines which separate devices?
2. What information does a router use to forward traffic, and at which OSI layer does it work?
3. Why can a switch forward traffic so quickly?
4. Name three things a managed switch can do that an unmanaged one cannot.
5. A small office wants its guest devices kept separate from staff PCs on the same switch. What kind of switch does it need?
6. How does an access point decide whether to send a frame over the air or onto the wired network?
7. A user at desk 14 needs to join a different department's switch. What do you change, and what do you leave alone?
8. A firewall blocks a remote access tool that uses HTTPS on port 443, while allowing normal web browsing. What kind of firewall is it?
9. Name two jobs a firewall often does besides filtering traffic.
10. Your switch has no PoE, but a new ceiling access point needs power. What can you use, and what is that arrangement called?
11. How much power does PoE+ provide at the switch, and how much reaches the device?
12. A camera needs PoE++. Will it be fully powered from a PoE+ switch? Why?
13. Which internet connection uses coax and a standard called DOCSIS?
14. A DSL customer far from the exchange complains of slow speeds. What is the likely reason?
15. What is the demarcation point, and which device usually marks it on a fibre connection?
16. A server has a four-port network card. How many MAC addresses does that card provide?

## Answer key

1. **A router, a switch, an access point and a firewall.** They share one box and one power supply.
2. **The destination IP address, at layer 3.** It looks the address up in its routing table.
3. **It switches in hardware, using an ASIC.** Dedicated chips forward frames far faster than software.
4. **Any three of: VLANs, QoS prioritisation, redundancy, port mirroring, SNMP and remote management, logging.** Unmanaged switches have no configuration at all.
5. **A managed switch.** Separation on one switch needs VLANs.
6. **By destination MAC address, like a switch.** It bridges wireless and wired without routing.
7. **Move desk 14's patch lead to the other switch; leave the desk, wall socket and cable run alone.** All changes happen in the closet.
8. **A next-generation firewall.** It identifies the application rather than relying on the port.
9. **Any two of: VPN concentrator, proxy, router.** Many firewalls also route between subnets.
10. **A PoE injector: a midspan arrangement.** Power supplied by the switch itself would be endspan.
11. **30 W at the switch, 25.5 W at the device.** The difference is lost in the cable.
12. **No.** PoE is backward compatible but not forward compatible; PoE+ cannot supply PoE++ power levels.
13. **A cable modem.** DOCSIS is the Data Over Cable Service Interface Specification.
14. **Distance.** DSL speed falls as the line gets longer.
15. **The point where responsibility passes from the provider to the customer; the ONT.** Everything on the customer side is the customer's responsibility.
16. **Four.** Every interface has its own MAC address.
