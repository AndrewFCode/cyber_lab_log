---
title: "TryHackMe 5.4: Packets and Frames — Class Notes"
description: "Full class notes for TryHackMe Pre Security (2026 path) module 5, Packets & Frames: packets vs frames, the TCP/IP model, TCP headers and the three-way handshake, UDP and ports."
pubDate: 2026-09-22
tags: ["class-notes", "tryhackme", "networking", "tcp", "udp", "ports"]
draft: false
---

**Class notes · TryHackMe Pre Security (2026 path) · Module 5, room 4: Packets & Frames**

> **Quick reference:** the short version of this room is the [Packets and Frames cheat sheet](/cyber_lab_log/resources/tryhackme/5/), the fourth sheet in Module 5, after the OSI Model room. The A+ lesson on [common ports](/cyber_lab_log/resources/a-plus-core-1/2/) covers the port list in more depth.

## Learning objectives

By the end of these notes you should be able to:

1. Explain the difference between a packet and a frame, and where each belongs in the OSI model.
2. Name the main IP header fields and say what each is for.
3. Map the four layers of the TCP/IP model onto the seven OSI layers.
4. Describe the TCP headers, including sequence and acknowledgement numbers.
5. Walk through the three-way handshake and the closing sequence, naming the flags.
6. Compare UDP with TCP, and say what a UDP header carries.
7. Explain port numbers, their ranges, and the common ports and their protocols.

## 1. Packets and frames

### 1.1 Two names for two layers

Packets and frames are both small pieces of a larger message, but they belong to different layers of the OSI model.

- A **packet** belongs to **layer 3** (network). It carries an IP header, with the source and destination IP addresses, and a payload.
- A **frame** belongs to **layer 2** (data link). It wraps the packet and adds its own information, above all the source and destination **MAC addresses**.

The room's analogy is the post. The frame is the envelope, used to carry the contents to the next place; the packet is the letter inside. When the recipient opens the envelope, the letter tells them where it should go next.

```text
  +---------------------------------------------------------------+ 
  | FRAME (layer 2) - the envelope: source and destination MAC     |
  |  +----------------------------------------------------------+ | 
  |  | PACKET (layer 3) - the letter: source and destination IP  | |
  |  |  +-----------------------------------------------------+ | | 
  |  |  | SEGMENT (layer 4) - ports, sequence numbers, flags   | | |
  |  |  |  +------------------------------------------------+ | | | 
  |  |  |  | DATA - the bytes the application actually sent  | | | |
  |  |  |  +------------------------------------------------+ | | | 
  |  |  +-----------------------------------------------------+ | | 
  |  +----------------------------------------------------------+ | 
  | frame trailer: checksum for the frame                          |
  +---------------------------------------------------------------+ 
                                                                    
  The router opens the envelope (frame) and writes a new one for the
  next hop; the letter (packet) inside travels unchanged.           
```

Adding those wrappers is **encapsulation**, which the OSI Model room covered. A useful rule of thumb: when you are talking about IP addresses, you are talking about packets; strip the encapsulating information away and you are talking about the frame.

### 1.2 Why send data in pieces at all

Splitting a message into many small pieces is more efficient than sending it in one lump. Small pieces share the network fairly, so one large transfer is less likely to block everything else, and a lost piece costs only that piece.

When you load an image from a website, it doesn't arrive as a single object. It arrives as a series of packets that your computer reassembles into the picture.

## 2. Packet structure and IP headers

Packets have different structures depending on the protocol in use. Networking runs on standards precisely because, with billions of devices connected, nothing would work if every device invented its own format.

Taking the Internet Protocol as the example, a packet carries a set of **headers** alongside the data:

| Header | What it does |
|---|---|
| Time to Live (TTL) | Limits how far the packet may travel, so undeliverable packets don't circulate forever |
| Checksum | Lets the receiver detect whether the header has been corrupted in transit |
| Source address | The IP address it came from, so replies know where to go |
| Destination address | The IP address it is going to, so each router knows where to send it next |

> **Correction:** the name "time to live" suggests a timer, and the room describes it as an expiry timer. In practice TTL is a **hop count**: every router that forwards the packet reduces it by one, and when it reaches zero the packet is dropped and an error message goes back to the sender. IPv6 renamed the field "hop limit" for exactly this reason.

> **Note (beyond this lesson):** the IPv4 header checksum covers the header only, not the data, and IPv6 dropped the header checksum altogether, leaving the job to the layers above.

## 3. The TCP/IP model

The **TCP/IP model** describes the protocols the internet actually runs on, and it is essentially a condensed version of the OSI model, with four layers instead of seven:

| TCP/IP layer | OSI layers it covers | Examples |
|---|---|---|
| Application | 7, 6, 5 | HTTP, DNS, SMTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP |
| Network interface | 2, 1 | Ethernet, Wi-Fi, cabling |

As data passes down these layers, each one adds its information, exactly as in the OSI model: encapsulation on the way down, decapsulation on the way back up.

> **Correction:** the room introduces this section with "TCP is another one of these rules" and then describes the four-layer model. They are two different things. **TCP** is a single transport protocol. The **TCP/IP model** is the four-layer model named after its two best-known protocols, TCP and IP, and it includes UDP, ICMP and everything else as well.

## 4. TCP

### 4.1 Connection-based

TCP is **connection-based**: before any data moves, the client and the server establish a connection through the three-way handshake (section 5). Because both ends agree on the connection and acknowledge what they receive, TCP can guarantee that data arrives, and arrives in order, or tell the sender that it could not.

| Advantages of TCP | Disadvantages of TCP |
|---|---|
| Guarantees the integrity and order of the data | Needs a working connection between the two devices throughout |
| Paces the sender so the receiver isn't flooded, or fed data out of order | Keeps state on both devices for as long as the connection lasts |
| Does extra work (acknowledging, retransmitting) for reliability | Slower than UDP, because of all that extra work |

> **Correction:** the room says that if one small chunk is not received, "the entire chunk of data cannot be used and must be re-sent". TCP re-sends only the **missing segment**, not the whole transfer. It also describes the connection as "reserved on the other device": both ends keep track of the connection, but nothing on the network in between is reserved for it.

### 4.2 TCP headers

A TCP segment carries these fields, among others:

| Header | What it does |
|---|---|
| Source port | The port the sender opened for this connection, chosen from the free ports |
| Destination port | The port the service is listening on at the other end, such as 80 for a web server. Never random |
| Sequence number | Numbers the bytes in the stream, starting from a random initial value |
| Acknowledgement number | Tells the other end which byte is expected next, confirming everything before it |
| Checksum | A calculation over the segment, so the receiver can detect corruption |
| Flags | Control bits such as SYN, ACK, FIN and RST that say how to handle this segment |
| Data | The bytes being carried, such as part of a file |

> **Correction:** the room lists "Source IP" and "Destination IP" as TCP headers. IP addresses live in the **IP header**, one layer down, not in the TCP header. TCP deals in ports; IP deals in addresses. The same applies to the UDP table later in the room, which lists TTL and the source and destination addresses as UDP headers: those are all IP header fields.

> **Correction:** the room says the acknowledgement number is "the sequence number + 1". That is only true for the handshake, where SYN and FIN each count as one. During data transfer, sequence numbers advance by the **number of bytes sent**, and the acknowledgement number is the next byte expected: send 500 bytes starting at 1 and the other end acknowledges 501.

## 5. The three-way handshake

### 5.1 The flags

| Flag | Meaning |
|---|---|
| SYN | Synchronise: start a connection and share an initial sequence number |
| SYN/ACK | The server's synchronise, plus an acknowledgement of the client's |
| ACK | Acknowledges what has been received; set on almost every segment after the handshake |
| FIN | Finish: close this side of the connection cleanly |
| RST | Reset: abort the connection immediately, because something is wrong |

> **Correction:** the room's table lists "DATA" as one of these messages. There is no DATA flag. Once the handshake is done, data simply travels in ordinary segments, which normally carry the ACK flag. The real TCP flags also include PSH and URG.

### 5.2 Sequence numbers

Each side picks a random **initial sequence number (ISN)** and tells the other about it during the handshake, so both ends agree on how the bytes are numbered and can reassemble them in order:

1. **SYN, client to server:** "here is my initial sequence number (0)".
2. **SYN/ACK, server to client:** "here is mine (5000), and I acknowledge yours".
3. **ACK, client to server:** "I acknowledge yours (5000); here is my next byte".

```text
  Client                                                Server    
     |                                                     |      
     |  1. SYN          seq = 0 (my ISN)                   |      
     |---------------------------------------------------->|      
     |  2. SYN/ACK      seq = 5000 (my ISN), ack = 1       |      
     |<----------------------------------------------------|      
     |  3. ACK          seq = 1, ack = 5001                |      
     |---------------------------------------------------->|      
     |                                                     |      
     |  ===== connection open: data segments both ways =====      
     |                                                     |      
     |  4. FIN          I have finished sending            |      
     |---------------------------------------------------->|      
     |  5. ACK                                             |      
     |<----------------------------------------------------|      
     |  6. FIN          so have I                          |      
     |<----------------------------------------------------|      
     |  7. ACK                                             |      
     |---------------------------------------------------->|      
                                                                  
  RST instead of FIN means the connection was aborted, not closed.
```

### 5.3 Worked example — reading the numbers

Using the numbers in the diagram:

1. **The client sends SYN with sequence 0.** That is its ISN, picked at random. The SYN itself counts as one byte for numbering purposes.
2. **The server replies SYN/ACK with sequence 5000 and acknowledgement 1.** The acknowledgement says "I have everything up to byte 0, send me byte 1 next", which confirms the client's SYN. The server also announces its own ISN, 5000.
3. **The client sends ACK with sequence 1 and acknowledgement 5001.** It confirms the server's SYN in the same way.
4. **Both ends are now synchronised.** Data flows, each side numbering its bytes onward from its own sequence number and acknowledging the other's.
5. **If a segment goes missing,** the receiver keeps acknowledging the last byte it has in order, and the sender re-sends the missing part.

> **Note (beyond this lesson):** ISNs are random for a reason. If an attacker could guess the sequence numbers, they could inject data into, or forcibly reset, someone else's connection without seeing it. Predictable ISNs were a real weakness in older systems.

## 6. Closing a connection

TCP closes a connection once each side has finished and everything has been acknowledged. Because a connection uses resources on both devices, it is good practice to close it as soon as the exchange is done.

The device that finishes first sends a **FIN**, which the other end acknowledges. When the other end has also finished, it sends its own FIN, and that is acknowledged too. Four messages in all: FIN, ACK, FIN, ACK.

A **RST** is the other way a connection can end. It is not a polite close but an abrupt stop, sent when something is wrong: no service listening on that port, a crashed application, or a device that refuses the connection.

> **In the real world:** this is why "connection refused" and "connection timed out" mean different things. Refused means a RST came back, so the host is reachable but nothing is listening. Timed out means nothing came back at all, which usually means a firewall dropped the traffic.

## 7. UDP

**UDP** (User Datagram Protocol) is **stateless**: no connection, no handshake, no synchronisation. Data is sent whether or not the other end is ready, and nothing confirms it arrived.

That suits anything where losing a little data matters less than waiting: video streaming, voice chat and similar traffic, and small exchanges where asking again is cheaper than setting up a connection.

| Advantages of UDP | Disadvantages of UDP |
|---|---|
| Much faster, with far less overhead | No guarantee anything arrives |
| Leaves the application to decide how fast to send, which is flexible | The application must handle loss itself |
| Holds no continuous connection on either device | An unstable connection gives a poor user experience |

> **Correction:** the room's UDP table has the flexibility point in the disadvantages column. Leaving pacing to the application is one of UDP's advantages, which is how the transcript describes it in the surrounding text.

A UDP header is much simpler than a TCP one: source port, destination port, length, checksum, and then the data. There are no sequence numbers, acknowledgements or flags, because there is nothing to keep track of.

## 8. Ports

### 8.1 What a port is

A **port** is a numbered point where data enters or leaves a device, and the room's analogy is a harbour: a ship can only dock where the berth fits it. Once a connection is established, everything sent or received travels through these ports. Port numbers run from **0 to 65535**.

With that many ports, standards keep things orderly. Because web traffic is agreed to use port 80, anyone writing a browser knows where to send it, and any web server knows where to listen. The browser's looks and features are up to its designers; the port is not.

### 8.2 Port ranges

> **Correction:** the room says "any port within 0 and 1024 is known as a common port". The usual name and boundary are different: **0 to 1023** are the **well-known ports**, assigned to standard services and, on Unix-like systems, usable only by administrative accounts.

| Range | Name | Used for |
|---|---|---|
| 0 to 1023 | Well-known | Standard services: HTTP, SSH, DNS and the rest |
| 1024 to 49151 | Registered | Applications registered with IANA, such as databases |
| 49152 to 65535 | Dynamic or ephemeral | Temporary source ports for outgoing connections |

> **Note (beyond this lesson):** the "random" source port a client picks comes from the ephemeral range. Different systems use slightly different ranges: Linux commonly uses 32768 to 60999.

### 8.3 Common ports

| Protocol | Port | What it does |
|---|---|---|
| FTP | 21 | File transfer between a client and a central server |
| SSH | 22 | Secure, text-based remote login and management |
| HTTP | 80 | The web: text, images and video of web pages |
| HTTPS | 443 | The same, encrypted |
| SMB | 445 | File sharing, and shared devices such as printers |
| RDP | 3389 | Remote login to a graphical desktop |

The full list of assignments is kept in IANA's Service Name and Transport Protocol Port Number Registry.

### 8.4 Standard, not compulsory

These are conventions, not rules enforced by the network. You can run a web server on port 8080 instead of 80. Because software assumes the standard, you then have to name the port explicitly, after a colon: `http://example.com:8080`.

### 8.5 Worked example — reading an address and a port

A colleague sends you `http://192.168.1.50:8080/admin` and says "the dashboard is up".

1. **`http://`** means plain HTTP, which is unencrypted, so anything sent, including a login, is readable on the path.
2. **`192.168.1.50`** is a private address, so this is reachable only from inside the network.
3. **`:8080`** is the non-standard port. Without it, the browser would try port 80 and fail.
4. **What you would change:** move the dashboard to HTTPS so credentials are encrypted. The port number itself is not a security measure; anyone scanning the host will find 8080 in seconds.

## 9. Security perspective

- **The handshake is something to exhaust.** Every half-open connection costs the server memory, which is what a **SYN flood** abuses: send SYNs, never send the final ACK, and fill the table. SYN cookies let a server defer that state until the handshake completes.
- **Scanning lives in the same mechanics.** A SYN scan sends SYN and never finishes the handshake, so it is fast and leaves little trace in application logs. The replies are the giveaway: SYN/ACK means open, RST means closed, and silence usually means a firewall dropped it. That is also why a firewall that drops traffic tells an attacker less than one that rejects it.
- **Checksums detect accidents, not attackers.** A checksum catches corruption in transit, but anyone who alters a packet can recalculate it. Integrity against a deliberate attacker needs cryptography, which is what TLS provides.
- **Random sequence numbers are a security control.** They make it hard to inject data into or reset a connection you cannot see. This is one of the few places where "random" directly prevents an attack.
- **Ports are not access control.** Moving a service to a non-standard port hides it from casual traffic, not from a scan. Equally, do not assume port 80 is HTTP: malware often uses common ports for something else entirely, so a protocol that doesn't match its port is worth investigating.
- **The well-known ports are the well-known targets.** SMB on 445 and RDP on 3389 exposed to the internet are two of the most common ways organisations get ransomware. Keep them behind a VPN.

## Summary

- A packet is layer 3 (IP addresses); a frame is layer 2 (MAC addresses) and wraps the packet, like an envelope round a letter.
- Data travels in small pieces so the network is shared fairly and losses are cheap.
- IP headers carry TTL (a hop count), a checksum, and the source and destination addresses.
- The TCP/IP model has four layers: application, transport, internet, network interface.
- TCP is connection-based, ordered and acknowledged; a missing segment is re-sent, not the whole transfer.
- TCP headers carry ports, sequence and acknowledgement numbers, flags, a checksum and data. IP addresses are not in them.
- The three-way handshake is SYN, SYN/ACK, ACK, exchanging random initial sequence numbers; closing is FIN, ACK, FIN, ACK, and RST aborts.
- UDP is stateless: ports, length, checksum and data, with no handshake or acknowledgements.
- Ports run 0 to 65535: 0 to 1023 well-known, 1024 to 49151 registered, 49152 upward ephemeral.
- Common ports: FTP 21, SSH 22, HTTP 80, HTTPS 443, SMB 445, RDP 3389. Non-standard ports need `host:port`.

## Glossary

| Term | Meaning |
|---|---|
| ACK | The TCP flag acknowledging data received |
| Checksum | A calculated value used to detect corruption in transit |
| Ephemeral port | A temporary high-numbered port a client uses as its source |
| Encapsulation | Wrapping data in each layer's header on the way down the stack |
| FIN | The TCP flag that closes one side of a connection cleanly |
| Frame | A layer 2 unit of data, addressed by MAC address |
| Initial sequence number (ISN) | The random starting number each side picks for its byte numbering |
| Packet | A layer 3 unit of data, addressed by IP address |
| Port | A number from 0 to 65535 identifying a service or a connection endpoint |
| RST | The TCP flag that aborts a connection immediately |
| Sequence number | The number identifying where a segment's bytes sit in the stream |
| Stateless | Keeping no record of a connection, as UDP does |
| SYN | The TCP flag that starts a connection and shares a sequence number |
| TCP/IP model | The four-layer model: application, transport, internet, network interface |
| Three-way handshake | SYN, SYN/ACK, ACK: how a TCP connection is established |
| Time to live (TTL) | A hop count that stops undeliverable packets circulating forever |
| Well-known ports | Ports 0 to 1023, assigned to standard services |

## Review questions

1. What is the difference between a packet and a frame?
2. In the postal analogy, which is the envelope and which the letter?
3. Why is data sent in many small pieces instead of one large message?
4. What does the TTL field actually count?
5. Name the four layers of the TCP/IP model, and say which OSI layers the top one covers.
6. Why is "Source IP" not a TCP header field?
7. A TCP transfer loses one segment. What is re-sent?
8. Name the three messages of the three-way handshake, in order.
9. What is an initial sequence number, and why is it random?
10. Which four messages close a TCP connection cleanly, and what does RST mean instead?
11. Which headers does a UDP datagram carry?
12. What range are the well-known ports, and what is in the range above 49151?
13. Give the port numbers for SSH, HTTPS, SMB and RDP.
14. A web server runs on port 8080. What must a user type to reach it?
15. Why does moving a service to an unusual port not make it secure?

## Answer key

1. **A packet is layer 3 and carries IP addresses; a frame is layer 2, carries MAC addresses and wraps the packet.** Frames change at every hop; the packet does not.
2. **The frame is the envelope; the packet is the letter.** The envelope gets it to the next place.
3. **It shares the network fairly and limits the cost of a loss.** Only the missing piece needs re-sending.
4. **Hops: it is reduced by one at each router, and the packet is dropped at zero.** IPv6 calls it the hop limit.
5. **Application, transport, internet, network interface; the application layer covers OSI 7, 6 and 5.** It is a condensed version of the OSI model.
6. **IP addresses belong to the IP header at layer 3.** TCP headers deal in ports, sequence numbers and flags.
7. **Just the missing segment.** The sender retransmits it, and the rest of the transfer stands.
8. **SYN, SYN/ACK, ACK.** The two ends exchange and acknowledge initial sequence numbers.
9. **The random number each side starts its byte numbering from; randomness stops an attacker guessing it and injecting or resetting traffic.** Both ends must agree on the numbering.
10. **FIN, ACK, FIN, ACK; RST aborts the connection instead of closing it.** RST means something went wrong.
11. **Source port, destination port, length, checksum and data.** No sequence numbers, acknowledgements or flags.
12. **0 to 1023 are well-known; 49152 to 65535 are dynamic or ephemeral.** In between, 1024 to 49151, are registered ports.
13. **SSH 22, HTTPS 443, SMB 445, RDP 3389.** FTP is 21 and HTTP is 80.
14. **The address with the port after a colon, such as `http://example.com:8080`.** Otherwise the browser tries port 80.
15. **A scan finds it in seconds.** It hides a service from casual traffic, not from anyone looking.
