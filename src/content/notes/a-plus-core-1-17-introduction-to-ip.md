---
title: "A+ Core 1 2.1: Introduction to IP"
description: "Note: this video doesn't map directly to an exam objective. Messer presents it as a primer: everything in the networking domain builds on it, so it's worth learning well."
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Section 2 primer (supports objective 2.1)__

__Quick reference:__ the short version of this lesson is the Introduction to IP cheat sheet, part of Section 2.

__Note:__ this video doesn't map directly to an exam objective. Messer presents it as a __primer__: everything in the networking domain builds on it, so it's worth learning well.

## Learning objectives

By the end of these notes you should be able to:

1. Explain the roles of the network, IP, TCP/UDP and application data using the road, truck and box analogy.
2. Describe encapsulation and decapsulation, and name the headers and trailers in an Ethernet frame carrying web traffic.
3. Compare TCP and UDP: connections, reliability, acknowledgements, retransmission and flow control.
4. Choose TCP or UDP for an application, and explain why real-time traffic prefers UDP.
5. Explain multiplexing, and how IP addresses and port numbers direct data to the right service.
6. Distinguish non-ephemeral (well-known) server ports from ephemeral client ports.
7. Read a simple protocol decode and identify the client, the server and each application.
8. Explain why port numbers are not a security mechanism.

## 1. The big picture

## 1.1 Many networks, one protocol

Networks move information from one device to another over many kinds of link: __Ethernet__, __wireless__, __DSL__ and others. From the Internet Protocol's point of view, __it doesn't matter which one carries it__. What matters is the information inside the packets.

## 1.2 The analogy: road, truck, boxes

__Networking__

__Analogy__

__Job__

The network (Ethernet, wireless, DSL…)

The __road__

Carries traffic from place to place

__IP__ (Internet Protocol)

The __truck__

Carries the data between devices, using addresses

__TCP or UDP__

The __boxes__ in the truck

Package the data, and label which service it's for

Application data

The __contents__ of each box

The information that matters: a web page, an email, a voice call

We load the truck, drive it across the road, and unpack it at the other end.

## 2. Encapsulation

## 2.1 Nesting data inside data

Each layer wraps the one inside it — boxes inside the truck, contents inside the boxes.

- __Encapsulation__ is wrapping data in more layers as it's sent.
- __Decapsulation__ is unwrapping it at the receiving end.

## 2.2 Worked example — a web request on Ethernet

A laptop sends a request to a web server over Ethernet:

 \+----------\+--------\+--------\+---------------------\+----------\+
 | Ethernet | IP     | TCP    | HTTP data           | Ethernet |
 | header   | header | header | (the web request)   | trailer  |
 \+----------\+--------\+--------\+---------------------\+----------\+
            |<--------- Ethernet payload ---------->|
                     |<-------- IP payload -------->|
                              |<--- TCP payload --->|Unwrapping from the outside in:

1. __Ethernet frame:__ an Ethernet __header__ at the start and a __trailer__ at the end mark exactly where the data starts and stops. Everything between them is the __Ethernet payload__.
2. __Inside the Ethernet payload:__ an __IP header__ plus the __IP payload__ — because this frame carries IP traffic.
3. __Inside the IP payload:__ a __TCP header__ plus the __TCP payload__.
4. __Inside the TCP payload:__ __HTTP__ (Hypertext Transfer Protocol) data — the actual web communication.

The web server decapsulates in the same order: Ethernet, then IP, then TCP, then HTTP to the web server software. Other protocols can have even more layers to drill into.

## 3. TCP and UDP

## 3.1 Two ways to carry data

__TCP__ and __UDP__ both transport data inside IP, but they behave very differently.

__Note:__ networking professionals (and Network\+ material) call TCP and UDP __OSI Layer 4__ protocols. The A\+ exam doesn't require the OSI model, but you'll see the term in books and other study material.

### 3.2 Multiplexing

TCP and UDP allow __multiplexing__: communicating with multiple devices, and running many different kinds of traffic, __at the same time__ — with everything arriving at the right place on the other side. Your browser, email and a voice call can all share one network connection simultaneously.

## 3.3 TCP — Transmission Control Protocol

TCP is __connection-oriented__: there's a __formal setup__ before data flows, and a __formal teardown__ at the end.

__The phone-call analogy:__

1. You dial, it rings, the other person says hello, and you say hello back — setup.
2. You have the conversation.
3. You say goodbye, they say goodbye, and you hang up — teardown.

  Client                            Server
   |-- setup: hello? ---------------->|
   |<- setup: hello\! -----------------|
   |-- data ------------------------->|
   |<- acknowledgement ---------------|
   |-- data ------------------------->|
   |<- acknowledgement ---------------|
   |-- teardown: goodbye ------------>|
   |<- teardown: goodbye -------------|

__TCP feature__

__What it means__

Reliable delivery

You know the data was received, because the receiver acknowledges it

Acknowledgements

Every piece of data sent is confirmed back to the sender

Retransmission

If data arrives damaged or corrupted, the receiver tells the sender, and it's resent

Flow control

The receiver can tell the sender to __speed up or slow down__, depending on how much it can handle

This constant cycle of send and acknowledge is what gives TCP its reliability — like sending post with a __return receipt__.

__Note (beyond this lesson):__ the setup is the __three-way handshake__ — SYN, SYN-ACK, ACK — covered in the Section 2 networking notes.

### 3.4 UDP — User Datagram Protocol

UDP is __connectionless__: no formal setup, no formal teardown — it just sends.

  Client                            Server
   |-- data ------------------------->|
   |-- data ------------------------->|
   |-- data ------------------------->|
   (no setup, no acknowledgements, no teardown)

__UDP characteristic__

__What it means__

"Unreliable" delivery

There's no way to know whether the data was received

No acknowledgements

The receiver never replies to confirm

No error recovery or retransmission

Lost or damaged data is simply gone — at the UDP level

No flow control

The receiver can't ask the sender to speed up or slow down

Very little overhead

No setup, and no acknowledgement traffic. It's __best effort__

"Unreliable" doesn't mean bad — it means UDP doesn't __guarantee__ delivery.

## 3.5 Why use UDP?

__Real-time communication__ — voice over IP (VoIP) and live video. If part of a conversation is lost, you can't rewind time and replay that moment through the same connection. Resending old audio would only arrive too late to be useful. So real-time apps prefer UDP's low overhead, and simply carry on. If someone missed a word, they ask you to repeat it.

__Simple request-and-response protocols__ — they need low overhead, and if something fails the application just tries again:

- __DHCP__ (Dynamic Host Configuration Protocol): automatically assigns IP addresses.
- __TFTP__ (Trivial File Transfer Protocol): sends small amounts of data, without needing retransmission.

__The application can take over reliability.__ UDP doesn't retransmit, but an application using UDP can track what it sent and decide for itself whether to resend. Some apps (like DHCP retrying) do; others (like VoIP) deliberately don't.

## 3.6 Why use TCP?

Applications that __must__ get every byte right rely on TCP to handle delivery, so the application doesn't have to:

- __HTTPS__ (Hypertext Transfer Protocol Secure) — web communication.
- __SSH__ (Secure Shell) — encrypted terminal sessions.

TCP maintains the whole data flow, confirms receipt and resends anything missing.

## 3.7 TCP vs UDP at a glance

__TCP__

__UDP__

Connection

Connection-oriented (formal setup and teardown)

Connectionless

Delivery

Reliable — acknowledged

"Unreliable" — best effort

Retransmission

Yes, by TCP

No (the application may do it)

Flow control

Yes

No

Overhead

Higher

Very low

Examples

HTTPS, SSH, web, email

VoIP, video, DHCP, TFTP

## 3.8 Worked example — TCP or UDP?

__Application__

__Protocol__

__Reasoning__

Downloading a software update

TCP

Every byte must arrive intact

A live video call

UDP

Real-time; late data is useless, so don't retransmit

Getting an IP address when a laptop joins a network

UDP (DHCP)

Small and simple; if it fails, just ask again

Remote admin of a Linux server

TCP (SSH)

Commands and output must be exact

Streaming a live football match

UDP (typically)

Real-time; a dropped frame is better than a pause

## 4. Addresses and ports

## 4.1 IP addresses — the street address

A removal company needs an address to collect from and an address to deliver to. In networking, these are __IP addresses__. __Every device on the network has one__, just as every house on a street has an address.

## 4.2 Port numbers — the room

A house has many rooms, and a server runs many services. One server might be a __web server__, a __DNS__ (Domain Name System) server, a __file server__ and a __VoIP__ server all at once. When data arrives at the server's IP address, the server still has to decide __which service__ gets it.

In the house analogy:

- __The operating system__ stands at the front door, reading the label on each box.
- __Each box__ is labelled with its destination room: bedroom, living room, kitchen.
- __TCP and UDP__ label boxes with a __port number__ instead of a room name. Each service is assigned its own number, so incoming data reaches the right application.

## 4.3 What identifies a communication

Every flow involves, __at each end__:

__Server side__

__Client side__

IP address

The server's IP

The client's IP

Protocol

TCP or UDP

TCP or UDP

Port number

The service's port

The client's own port — so replies find their way back

## 4.4 Non-ephemeral (well-known) ports

- __Services tend to use the same port every time.__ These are __non-ephemeral__ (permanent) ports, usually in the range __0–1,023__, although a service can be configured with any available port.
- __The port is part of the service's configuration.__ A web server, email server or file server is set to a port, so clients always know where to send data.
- __They're also called well-known ports:__ the client needs to know the port in advance to communicate with the service.

## 4.5 Ephemeral ports

- __The client picks a temporary port for its own end,__ usually somewhere from __1,024 to 65,535__.
- __It's used for a single communication.__ When the conversation ends, the port is released.
- __A new connection gets a new random port.__

__Note (beyond this lesson):__ the official split (IANA) is 0–1,023 well-known, 1,024–49,151 registered and 49,152–65,535 dynamic. Windows picks ephemeral ports from __49,152–65,535__ by default. For the exam, Messer's "1,024–65,535" is the idea to know: clients use temporary high-numbered ports.

### 4.6 Port facts to remember

__Fact__

__Detail__

Range

__0–65,535__ for TCP, and separately __0–65,535__ for UDP

TCP and UDP are separate

__TCP port 80 is not the same as UDP port 80__ — same numbering scheme, different protocols

Ports aren't security

A port is just a reference number. Moving a service to an unusual port doesn't hide it — it's easy to find

## 5. Many conversations at once — a worked example

## 5.1 The setup

- __Client:__ 10.0.0.1
- __Server:__ 10.0.0.2, running three services:

__Service__

__Protocol and port__

Web server

TCP 80

VoIP server

UDP 5004

Email server

TCP 143

All three conversations run at the same time over Ethernet (Ethernet header and trailer), each carrying IP, and inside that either TCP or UDP.

## 5.2 Reading the protocol decode

A packet capture shows three flows:

__Flow__

__Source IP__

__Destination IP__

__Protocol__

__Source port__

__Destination port__

__Application__

1

10.0.0.1

10.0.0.2

TCP

51,734 (random)

__80__

Web (HTTP)

2

10.0.0.1

10.0.0.2

UDP

62,208 (random)

__5004__

VoIP

3

10.0.0.1

10.0.0.2

TCP

49,915 (random)

__143__

Email

The source ports are illustrative — the point is that they're random and different.

__How to read it:__

1. __Same IP addresses in every flow.__ One client (10.0.0.1) talking to one server (10.0.0.2).
2. __Destination ports are the well-known service ports__ (80, 5004, 143). That tells you which application each flow is for.
3. __Source ports are random and all different.__ They're the client's __ephemeral__ ports, one per conversation, so replies return to the right place.
4. __The protocol column__ shows the TCP/UDP split. The two ports numbered 80 on a network would still be different things if one were TCP and one UDP.

If the client opened a fourth connection — say, a second browser tab to the same server — it would pick __another random source port__. That's multiplexing in action.

## 5.3 Seeing it on your own machine

netstat -an                                 \

# Proto, Local Address, Foreign Address, State
Get-NetTCPConnection -State Established |
    Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePortExample netstat line:

  Proto  Local Address          Foreign Address        State
  TCP    10.0.0.1:51734         10.0.0.2:80            ESTABLISHED

__Reading it:__ the local (client) side uses ephemeral port 51734; the remote (server) side uses well-known port 80. That's an HTTP connection.

ss -tun          \

# TCP and UDP sockets, numeric addresses and ports

## 6. Security perspective

- __Ports are not security.__ Changing a service to a non-standard port ("security through obscurity") doesn't protect it. Port scanners find open ports in seconds. Real protection comes from firewalls, authentication and patching.
- __Ports are how firewalls make decisions.__ Firewall rules filter by IP address, protocol (TCP/UDP) and port. Knowing that TCP 80 ≠ UDP 80 matters when you read or write rules.
- __Unexpected listening ports are a warning sign.__ If netstat shows a service listening that you don't recognise, investigate — it could be unwanted software or malware.
- __Encapsulation isn't encryption.__ A protocol decode shows every layer. Unencrypted HTTP data can be read by anyone capturing the traffic; HTTPS and SSH encrypt the application data inside the TCP payload.
- __UDP's lack of a handshake__ makes it easier to fake the source of traffic. This is one reason UDP-based services are sometimes abused in denial-of-service attacks (beyond this lesson).

# Summary

- __IP doesn't care about the link__ (Ethernet, wireless, DSL). Network = road, IP = truck, TCP/UDP = boxes, application data = contents.
- __Encapsulation__ nests data: Ethernet header \+ \[IP header \+ \[TCP header \+ HTTP data\]\] \+ Ethernet trailer. __Decapsulation__ unwraps it at the other end.
- __TCP and UDP__ (OSI Layer 4) enable __multiplexing__ — many conversations at once.
- __TCP:__ connection-oriented (formal setup and teardown), reliable (acknowledgements), retransmission, flow control. Used by HTTPS and SSH.
- __UDP:__ connectionless, "unreliable", no acknowledgements, retransmission or flow control, and very low overhead. Used for real-time VoIP and video, DHCP and TFTP; the application can handle retries itself.
- __Each end of a flow__ has an IP address, a protocol and a port number.
- __Ports:__
	- Non-ephemeral (well-known) server ports are usually 0–1,023.
	- Ephemeral client ports are usually 1,024–65,535 (Windows: 49,152–65,535) — random and temporary.
	- The range is 0–65,535 for each protocol, and TCP 80 ≠ UDP 80.
	- Ports aren't a security mechanism.

# Glossary

__Term__

__Definition__

IP (Internet Protocol)

Carries data between devices using IP addresses

Packet

A unit of data sent across a network

Ethernet frame

The unit of data on an Ethernet network, with a header and trailer

Header / trailer

Control information at the start / end of a unit of data

Payload

The data carried inside a frame, packet or segment

Encapsulation

Wrapping data inside successive protocol layers when sending

Decapsulation

Unwrapping those layers when receiving

HTTP / HTTPS

Hypertext Transfer Protocol / its secure, encrypted version

TCP

Transmission Control Protocol — connection-oriented and reliable

UDP

User Datagram Protocol — connectionless, best effort

OSI Layer 4

The transport layer of the OSI model, where TCP and UDP sit

Multiplexing

Carrying many simultaneous conversations over one network

Connection-oriented

Having a formal setup and teardown

Connectionless

Sending without any setup or teardown

Acknowledgement

Confirmation from the receiver that data arrived

Retransmission

Resending data that was lost or damaged

Flow control

The receiver regulating how fast the sender transmits

Overhead

Extra traffic and processing beyond the data itself

VoIP

Voice over IP — real-time voice communication

DHCP

Protocol that automatically assigns IP addresses (uses UDP)

TFTP

Trivial File Transfer Protocol — simple file transfer over UDP

SSH

Secure Shell — encrypted terminal communication over TCP

Port number

A number (0–65,535) identifying a service or connection endpoint

Non-ephemeral / well-known port

A permanent service port, usually 0–1,023

Ephemeral port

A temporary client port, chosen randomly for one connection

Protocol decode

A breakdown of captured traffic, showing each layer's fields

# Review questions

1. In the road and truck analogy, what are the road, the truck and the boxes?
2. Why doesn't IP care whether it travels over Ethernet, wireless or DSL?
3. What do the Ethernet header and trailer do?
4. List the layers, outermost first, of a web request sent over Ethernet.
5. What's the difference between encapsulation and decapsulation?
6. What is multiplexing?
7. Give three features that make TCP "reliable".
8. What does flow control allow the receiver to do?
9. Why does voice over IP prefer UDP?
10. Name two protocols, other than VoIP, that use UDP.
11. UDP has no retransmission. How can an application using UDP still recover lost data?
12. What three pieces of information identify each end of a network communication?
13. What are the typical ranges for non-ephemeral and ephemeral ports?
14. Is TCP port 80 the same as UDP port 80? Explain.
15. A decode shows three flows from 10.0.0.1 to 10.0.0.2, with destination ports 80, 5004 and 143 and three different high source ports. Explain what you're seeing.
16. An administrator moves a service to port 8443 "so attackers can't find it". Is this effective?

# Answer key

1. __The road is the network, the truck is IP, and the boxes are TCP or UDP__ (holding the application data).
2. __IP only cares about what's inside the packets and where they're going.__ The underlying network type is just the road it travels on.
3. __They mark exactly where the frame's data begins (header) and ends (trailer).__
4. __Ethernet (header and trailer) → IP → TCP → HTTP data.__
5. __Encapsulation wraps data in protocol layers for sending; decapsulation unwraps them on receipt.__
6. __Running many different conversations and kinds of traffic simultaneously__ over the network, each reaching the right destination.
7. __Any three of:__ connection setup and teardown; acknowledgements; retransmission of damaged or lost data; flow control.
8. __Tell the sender to speed up or slow down__, depending on how much data it can handle.
9. __It's real-time.__ Lost audio can't usefully be replayed later, so UDP's low overhead and lack of retransmission suit it.
10. __DHCP and TFTP.__
11. __The application itself tracks what it sent and resends if needed__ — UDP leaves reliability to the application.
12. __IP address, protocol (TCP or UDP) and port number.__
13. __Non-ephemeral (well-known): usually 0–1,023. Ephemeral: usually 1,024–65,535__ (Windows defaults to 49,152–65,535).
14. __No.__ TCP and UDP each have their own 0–65,535 range; the same number on each protocol refers to different things.
15. __One client talking to one server using three services at once:__ web (TCP 80), VoIP (UDP 5004) and email (TCP 143). The random high source ports are the client's ephemeral ports — one per conversation.
16. __No.__ Ports are only reference numbers, and scanning quickly finds services on any port. Use firewalls, authentication and patching instead.
