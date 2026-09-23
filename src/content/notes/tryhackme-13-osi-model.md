---
title: "TryHackMe 5.3: OSI Model — Class Notes"
description: "Full class notes for TryHackMe Pre Security (2026 path) module 5, OSI Model: the seven layers, what each one does, TCP versus UDP, and encapsulation."
pubDate: 2026-09-22
tags: ["class-notes", "tryhackme", "networking", "osi-model", "tcp", "udp"]
draft: false
---

**Class notes · TryHackMe Pre Security (2026 path) · Module 5, room 3: OSI Model**

> **Quick reference:** the short version of this room is the [OSI Model cheat sheet](/cyber_lab_log/resources/tryhackme/5/), the third sheet in Module 5, after What is Networking? and Intro to LAN. [Networking for Sysadmins chapter 1](/cyber_lab_log/resources/networking-sysadmins/1/) covers the same layers from a working sysadmin's point of view.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what the OSI model is for and why a shared model matters.
2. Name the seven layers in order and say what each one does.
3. Say which addresses and devices belong to layers 2 and 3.
4. Compare TCP and UDP, and choose the right one for a situation.
5. Explain encapsulation and decapsulation, and name the unit of data at each layer.
6. Match a fault or an attack to the layer it belongs to.

## 1. What the OSI model is

The **OSI model** (Open Systems Interconnection model) is a framework that describes how networked devices send, receive and interpret data. It splits the whole job into **seven layers**, each with its own responsibilities, numbered from 7 at the top down to 1 at the bottom.

Its main benefit is interoperability. Devices can be built by different manufacturers, run different software and do completely different jobs, yet still understand each other, because they all follow the same layered rules. A network card from one company works with a switch from another and a web server from a third.

As data travels down the layers, each one adds its own piece of information to it. That process is **encapsulation**, and section 9 follows it end to end.

```text
  +---+--------------+-----------------------------------+---------+
  | 7 | Application  | HTTP, DNS, SMTP, FTP              | Data    |
  | 6 | Presentation | Formats, encoding, encryption     | Data    |
  | 5 | Session      | Opens, maintains, closes sessions | Data    |
  +---+--------------+-----------------------------------+---------+
  | 4 | Transport    | TCP and UDP, port numbers         | Segment |
  | 3 | Network      | IP addresses, routers             | Packet  |
  | 2 | Data link    | MAC addresses, switches           | Frame   |
  | 1 | Physical     | Cables, signals, bits             | Bits    |
  +---+--------------+-----------------------------------+---------+
```

> **Exam tip:** two common mnemonics. Bottom-up (1 to 7): "Please Do Not Throw Sausage Pizza Away". Top-down (7 to 1): "All People Seem To Need Data Processing".

## 2. Layer 1: Physical

The **physical layer** is the hardware itself: cables, connectors and the signals travelling along them. Devices send data to each other as electrical signals (or light, or radio waves) representing the binary ones and zeros underneath everything else.

An Ethernet cable between two devices is a physical layer component. So is the socket it plugs into, and the signal running through it.

## 3. Layer 2: Data link

The **data link layer** deals with physical addressing. It takes the packet handed down by the network layer, which carries the IP address of the destination computer, and adds the **MAC address** (Media Access Control address) of the interface the data should be delivered to. It also presents the data in a form suitable for transmission on the medium below.

Every network-enabled computer has a **network interface card (NIC)** with its own MAC address to identify it.

> **Correction:** the room says MAC addresses are "literally burnt into the card; they can't be changed – although they can be spoofed", which contradicts itself. The address is assigned by the manufacturer and stored on the card, but the operating system can override the address it uses, in one command. Spoofing *is* changing it, as far as the network can tell. Many phones and laptops now use a randomised MAC address on Wi-Fi by default.

> **Note (beyond this lesson):** the MAC address added here is that of the **next device on the way**, not the final destination. If the destination is on another network, the frame is addressed to the router, which strips it off and builds a new frame for the next hop. MAC addresses are local to each link; the IP address inside stays the same end to end.

## 4. Layer 3: Network

The **network layer** is where **routing** happens: working out the best path for data to take across networks to reach the destination.

Routing protocols decide what "best" means. Two you should recognise at this stage are **OSPF** (Open Shortest Path First) and **RIP** (Routing Information Protocol). The factors they weigh include:

| Factor | Question it answers |
|---|---|
| Distance | Which path crosses the fewest devices? |
| Reliability | Has this path lost packets before? |
| Speed | Is this link copper (slower) or fibre (much faster)? |

Everything at this layer is addressed by **IP address**, such as `192.168.1.100`. Devices that can deliver packets using IP addresses, routers above all, are called **layer 3 devices**, because they work at the third layer of the model.

> **Correction:** the room describes the network layer as handling "re-assembly of data (from these small chunks to the larger chunk)". Splitting data into chunks and putting them back in order is the **transport** layer's job (section 5). The network layer can split an oversized packet into fragments and the destination reassembles those, but the chunking the room is describing belongs one layer up.

> **Note (beyond this lesson):** the protocols differ in how they measure a path. RIP simply counts hops, so it treats a slow link the same as a fast one. OSPF works out a cost based on bandwidth, which is why it is the one used inside serious networks.

## 5. Layer 4: Transport

The **transport layer** moves data between devices using one of two protocols, chosen to suit the job: **TCP** or **UDP**.

### 5.1 TCP

**TCP** (Transmission Control Protocol) is built for reliability. It establishes a connection between the two devices and keeps it for as long as the exchange lasts. It also includes error checking, which is how it can guarantee that the chunks it sent arrive and are reassembled in the right order.

| Advantages of TCP | Disadvantages of TCP |
|---|---|
| Guarantees the data is accurate and complete | Needs a working connection between both devices throughout |
| Can pace the sender so the receiver isn't flooded | A slow connection holds resources open on the other device |
| Does the extra work of acknowledging and re-sending | Slower than UDP, because of all that extra work |

TCP suits file sharing, web browsing and email: anything where the data has to arrive complete and in order. Half a file is no use to anyone.

> **Correction:** the room says TCP "reserves a constant connection", and that if one chunk is not received, the whole thing cannot be used. Both overstate it. A TCP connection is a logical agreement between the two ends, not reserved capacity on the network; nothing in between is set aside. And a missing chunk is simply **re-sent**: TCP notices the gap and retransmits, so the application waits a little rather than losing the data.

### 5.2 UDP

**UDP** (User Datagram Protocol) does far less. There is no connection, no error checking and no guarantee: data is sent whether or not it arrives.

| Advantages of UDP | Disadvantages of UDP |
|---|---|
| Much faster, with far less overhead | No check that anything arrived |
| Leaves the application in control of how fast to send | Unstable connections give a poor experience |
| Holds no continuous connection on either device | The application has to cope with loss itself |

```text
  TCP: numbered, acknowledged, anything missing is re-sent             
                                                                       
      sent  [1][2][3][4]   ->   received  [1][2][3][4]   whole picture 
                                                                       
  UDP: sent once, with no check that it arrived                        
                                                                       
      sent  [1][2][3][4]   ->   received  [1][ ][3][ ]   gaps stay gaps
```

UDP suits small exchanges and real-time traffic, where a late packet is worth less than a missing one. Live video is the classic case: a few lost pixels matter less than the picture stopping to wait.

> **Correction:** the room gives ARP and DHCP as examples of UDP protocols. **DHCP does use UDP**, but **ARP does not**. ARP works at layer 2, below IP entirely, so it has no ports and no UDP header. Other genuine UDP examples are DNS queries, NTP and VoIP.

> **Note (beyond this lesson):** on-demand video, such as a streaming service or a video site, is usually delivered over TCP or over QUIC (which adds reliability on top of UDP). It is live and interactive traffic, like video calls, that most benefits from plain UDP.

### 5.3 Worked example — TCP or UDP?

For each case, decide which protocol fits and why.

1. **Downloading a software installer.** Every byte must arrive, in order, or the file won't run. **TCP.**
2. **A video call.** A packet that arrives late is useless; waiting for it would freeze the picture. **UDP.**
3. **Loading a web page.** Missing characters would break the page. **TCP.**
4. **A DNS lookup.** One small question, one small answer, and asking again is cheap. **UDP** (DNS falls back to TCP for large answers).
5. **Synchronising a clock over NTP.** Tiny, frequent, and a late reply is worse than none. **UDP.**

The rule of thumb: if losing a piece breaks the result, use TCP. If being slow breaks the result, use UDP.

## 6. Layer 5: Session

Once the layer above has formatted the data, the **session layer** creates and maintains the connection to the other computer. While that connection is alive, it is a **session**.

The session layer also closes connections that have been unused for a while or have been lost, and it can place **checkpoints** in a transfer. If something goes wrong, only the data after the last checkpoint needs sending again, which saves bandwidth.

Sessions are separate from each other: data belongs to one session and does not cross into another.

## 7. Layer 6: Presentation

The **presentation layer** is where standardisation happens. Software developers can build an email client (or anything else) however they like, but the data still has to be handled in a way everyone agrees on, so it acts as a **translator** between the application layer above and the rest of the stack.

That is why you can send an email from one client and have it display correctly in a completely different one. Character encoding, file formats and compression sit here, and so does **encryption**, such as the HTTPS that protects a secure website.

> **Note (beyond this lesson):** TLS, the encryption behind HTTPS, is usually taught as a presentation-layer job, but it doesn't fit the model cleanly: it sits between the application and transport layers and is often described as spanning layers 5 and 6. The OSI model is a map, not a rulebook.

## 8. Layer 7: Application

The **application layer** is the one you see. It holds the protocols and rules that decide how the user interacts with data being sent and received. Email clients, browsers and file transfer software such as FileZilla give you a graphical interface on top of it, and protocols such as **DNS** (which turns website names into IP addresses), HTTP, SMTP and FTP live here.

> **Note (beyond this lesson):** strictly, the application layer is the *protocols*, not the program's buttons and menus. The browser window is software; HTTP and DNS are what layer 7 defines.

## 9. Encapsulation

### 9.1 Down and back up

Every layer adds its own header as data travels down the stack, and the receiving device strips them off on the way up. The unit of data gets a different name at each stage.

```text
  DOWN the stack (sender)              UP the stack (receiver)         
                                                                       
  7-5  the application's data          data handed to the application  
   4   + TCP or UDP header  = segment  transport header removed        
   3   + IP header          = packet   IP header removed               
   2   + MAC header/trailer = frame    frame header and trailer removed
   1   sent as bits  -------------->   bits read back in               
                                                                       
  Adding the headers is encapsulation; stripping them is decapsulation.
```

| Layer | Unit of data | Header added |
|---|---|---|
| 7 to 5 | Data | The application's own formatting |
| 4 Transport | Segment (TCP) or datagram (UDP) | Port numbers, sequence numbers |
| 3 Network | Packet | Source and destination IP addresses |
| 2 Data link | Frame | Source and destination MAC addresses, plus a trailer for error checking |
| 1 Physical | Bits | None: the frame becomes signals |

### 9.2 Worked example — a web request through the layers

You type an address into a browser and press Enter.

1. **Layer 7:** the browser builds an HTTP request for the page.
2. **Layer 6:** the data is encoded in an agreed format, and encrypted if the site uses HTTPS.
3. **Layer 5:** a session with the web server is set up and tracked.
4. **Layer 4:** TCP splits the data into segments, numbers them, and addresses them to port 443.
5. **Layer 3:** each segment is wrapped in a packet carrying your IP address and the server's.
6. **Layer 2:** each packet is wrapped in a frame addressed to the MAC address of your router.
7. **Layer 1:** the frame goes out as signals on the cable or as radio waves.
8. **At the server,** the same steps run in reverse: the frame, packet and segment headers are removed in turn, and the web server receives the request exactly as the browser wrote it.

### 9.3 Worked example — which layer is this?

Matching a symptom to a layer tells you where to look next.

| What you see | Layer | Why |
|---|---|---|
| No link light on the switch port | 1 | No signal on the cable |
| Two devices claiming one IP address | 2 and 3 | The IP address clashes; ARP exposes it |
| Can ping the server but not connect to port 443 | 4 | Layers 1 to 3 work; the transport layer or a firewall is blocking |
| The site loads by IP address but not by name | 7 | DNS is an application layer protocol |
| Certificate warning in the browser | 6 (in OSI terms) | Encryption and formatting sit here |

## 10. Security perspective

- **Attacks pick a layer too.** Cable taps and rogue devices sit at layer 1, ARP spoofing at layer 2, IP spoofing and route manipulation at layer 3, SYN floods and UDP amplification at layer 4, session hijacking at layer 5, and phishing and application exploits at layer 7. Naming the layer tells you which control should have stopped it.
- **Defences work at layers too.** A packet filter sees addresses and ports (layers 3 and 4) and cannot judge what the traffic actually contains. A web application firewall reads layer 7 and can. Knowing what a control can see tells you what it will miss.
- **UDP is easy to forge.** With no handshake, an attacker can put someone else's address in the source field, which is what makes UDP services useful for reflection and amplification attacks. Don't expose UDP services that answer anyone, and rate-limit the ones you must.
- **A completed TCP handshake is weak evidence, but evidence.** Because the three-way handshake requires replies to reach the claimed address, TCP-based logs are harder to forge than UDP-based ones.
- **Encryption at one layer doesn't hide the others.** HTTPS protects the content, but the IP addresses and ports in the layers below stay visible to anyone on the path.
- **"Session" means two things.** OSI's session layer is not the same as the login session a website tracks with a cookie. Both can be hijacked, but by different means and with different defences.

## Summary

- The OSI model describes networking in seven layers, so devices from different makers interoperate.
- Bottom to top: physical, data link, network, transport, session, presentation, application.
- Layer 1 is cables and signals; layer 2 adds MAC addresses; layer 3 routes with IP addresses; layer 4 is TCP and UDP.
- Layer 5 opens, maintains and closes sessions; layer 6 formats and encrypts; layer 7 is the protocols users meet, such as HTTP and DNS.
- TCP is connection-oriented, ordered and reliable, at the cost of speed; UDP is fast and has no guarantees.
- Choose TCP when losing data breaks the result, UDP when waiting breaks it.
- Encapsulation adds a header at each layer: data, segment, packet, frame, bits. The receiver strips them off in reverse.
- Attacks and defences belong to layers too, which is why naming the layer is the fastest way to know where to look.

## Glossary

| Term | Meaning |
|---|---|
| Decapsulation | Stripping each layer's header off as data travels up the stack |
| Encapsulation | Adding each layer's header as data travels down the stack |
| Frame | The unit of data at layer 2, addressed by MAC address |
| Layer 3 device | A device such as a router that forwards using IP addresses |
| MAC address | The hardware address of a network interface |
| NIC | Network interface card: the hardware that connects a device to the network |
| OSI model | A seven-layer framework describing how devices communicate |
| OSPF | Open Shortest Path First: a routing protocol that costs paths by bandwidth |
| Packet | The unit of data at layer 3, addressed by IP address |
| RIP | Routing Information Protocol: an older routing protocol that counts hops |
| Routing | Choosing the path data takes across networks |
| Segment | The unit of data at layer 4 when TCP is used |
| Session | An active connection between two devices, created at layer 5 |
| Checkpoint | A marker in a transfer so only newer data need be re-sent |
| TCP | Transmission Control Protocol: connection-oriented and reliable |
| UDP | User Datagram Protocol: fast, connectionless and unguaranteed |

## Review questions

1. What problem does the OSI model solve?
2. List the seven layers in order, from 1 to 7.
3. Which layer adds MAC addresses, and which adds IP addresses?
4. What is a layer 3 device? Give an example.
5. Name two routing protocols and one factor they use to choose a path.
6. Give two advantages of TCP and two of UDP.
7. A file transfer loses one chunk of data. What does TCP do about it?
8. Which protocol would you choose for a video call, and why?
9. The room lists ARP as a UDP protocol. Why is that wrong?
10. What does the session layer do, and what is a checkpoint for?
11. Which layer handles encryption and format translation?
12. Name three protocols that live at the application layer.
13. What is the unit of data called at layers 4, 3 and 2?
14. A user can ping a server but cannot connect to its web port. Which layer should you look at?
15. Why is a UDP source address easier to forge than a TCP one?

## Answer key

1. **It gives every device a shared framework, so devices from different makers and with different jobs can communicate.** Each layer has defined responsibilities.
2. **Physical, data link, network, transport, session, presentation, application.** "Please Do Not Throw Sausage Pizza Away".
3. **Layer 2 (data link) adds MAC addresses; layer 3 (network) adds IP addresses.** MACs are local; IPs are end to end.
4. **A device that forwards data using IP addresses, such as a router.** It works at the third layer.
5. **OSPF and RIP; distance, reliability or link speed.** RIP counts hops; OSPF costs paths by bandwidth.
6. **TCP: accuracy and ordering, plus pacing the sender. UDP: speed and no reserved connection.** Each trades against the other.
7. **It re-sends it.** TCP notices the gap and retransmits, so nothing is lost.
8. **UDP, because a late packet is useless and waiting would freeze the call.** Small losses are acceptable.
9. **ARP works at layer 2, below IP.** It has no ports and no UDP header. DHCP, though, does use UDP.
10. **It creates, maintains and closes the connection (the session); a checkpoint means only data after it must be re-sent.** That saves bandwidth.
11. **The presentation layer (layer 6).** It translates formats and handles encryption such as HTTPS.
12. **Any three of HTTP, HTTPS, DNS, SMTP, FTP.** These are the protocols users meet through their software.
13. **Segment (4), packet (3), frame (2).** At layer 1 it is just bits.
14. **Layer 4.** Ping proves layers 1 to 3; the port is blocked or nothing is listening.
15. **UDP has no handshake, so nothing proves the sender can receive replies at the address it claims.** TCP's three-way handshake does.
