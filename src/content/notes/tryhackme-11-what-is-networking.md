---
title: "TryHackMe 5.1: What is Networking? — Class Notes"
description: "Full class notes for TryHackMe Pre Security (2026 path) module 5, What is Networking?: networks and the internet, IP and MAC addresses, and ping."
pubDate: 2026-09-22
tags: ["class-notes", "tryhackme", "networking", "ip-addresses", "mac-addresses", "ping"]
draft: false
---

**Class notes · TryHackMe Pre Security (2026 path) · Module 5, room 1: What is Networking?**

> **Quick reference:** the short version of this room is the [What is Networking? cheat sheet](/cyber_lab_log/resources/tryhackme/5/), the first sheet in Module 5. Several ideas here are covered in more depth in the A+ lessons on [IPv4, IPv6 and assigning addresses](/cyber_lab_log/resources/a-plus-core-1/2/).

## Learning objectives

By the end of these notes you should be able to:

1. Explain what a network is, in everyday life and in computing.
2. Describe the internet as a network of networks, and outline where it came from.
3. Tell private networks and addresses from public ones.
4. Explain the two ways a device is identified: its IP address and its MAC address.
5. Read a MAC address, and explain what MAC spoofing is and why it matters.
6. Explain why IPv4 addresses ran short and how IPv6 answers that.
7. Use ping, and read its output.

## 1. What is a network?

### 1.1 Things that are connected

A network is simply a set of things that are connected. Your circle of friends is a network, joined by shared interests. So are a city's buses and trains, the national electricity grid, the postal system, and the neighbours you chat to over the fence.

Computer networks are the same idea applied to devices. A network can be as small as two devices or as large as billions, and the devices range from laptops and phones to security cameras, traffic lights and farm equipment. Networks gather weather data, deliver electricity and decide who has right of way at a junction.

Because networks run through almost everything, understanding them is essential for cyber security. Nearly every attack either travels over a network or targets one.

### 1.2 A small network

The room introduces three friends, Alice, Bob and Jim, who together form a small network: each can talk directly to the others. Computers on a home network work the same way.

## 2. The internet

### 2.1 A network of networks

The **internet** is one giant network made of many, many smaller networks joined together.

The room extends its example. Alice makes two new friends, Zayn and Toby, and wants to introduce them to Bob and Jim. The catch is that only Alice speaks both their language and Bob and Jim's, so every message between the two groups has to pass through her. In doing so, Alice joins two separate networks into a bigger one.

```text
  NETWORK A (Alice's friends)                 NETWORK B (Alice's new friends)
                                                                             
   Bob ----+                                         +---- Zayn              
           |          +---------------------+        |                       
           +----------+ Alice: speaks both  +--------+                       
           |          | (in networking, a   |        |                       
   Jim ----+          |  router)            |        +---- Toby              
                      +---------------------+                                
                                                                             
  Bob and Jim can reach Zayn and Toby only through Alice.                    
  The internet is this idea repeated millions of times: networks joined      
  by routers into one giant network of networks.                             
```

> **Note (beyond this lesson):** in real networks, Alice's job is done by a **router**. A router connects two or more networks and passes traffic between them, and the internet is built from routers joining networks together.

### 2.2 Where the internet came from

The internet began with **ARPANET** in the late 1960s, a project funded by the US Department of Defense. Two decades later, in 1989, Tim Berners-Lee proposed the **World Wide Web**, which turned the internet into the everyday place for publishing and sharing information that we know now.

> **Correction:** the room says ARPANET was "the first documented network" and that Tim Berners-Lee invented the internet in 1989 by creating the Web. ARPANET was one of the first **packet-switched** networks and the forerunner of the internet, but it was not the first network of any kind. And the Web is not the internet: the internet is the global network itself, running on TCP/IP (which ARPANET adopted in 1983), while the Web is a service that runs on top of it, like email. Berners-Lee invented the Web, not the internet.

### 2.3 Private and public networks

The small networks that make up the internet, such as your home network or an office network, are **private networks**. The networks that connect those private networks together are **public networks**, which together form the internet.

So every network falls into one of two types:

| Type | What it is | Example |
|---|---|---|
| Private network | A local network belonging to one home or organisation | Your home Wi-Fi |
| Public network | The shared networks that join private networks together | The internet |

## 3. Identifying devices

### 3.1 A name and a fingerprint

For devices to talk to each other, each one must be able to identify itself and be identified by others. There is no point sending a message if you can't say who it's for.

The room compares this to people, who can be identified by their **name** and their **fingerprints**. You can change your name (by deed poll, for example), but not your fingerprints, so there is always a fixed identity behind the name. Devices likewise have two identifiers, one that can change and one that normally doesn't:

| Identifier | Like a person's | Changes? |
|---|---|---|
| IP address | Name | Yes: a device's IP address can change, and addresses get reused |
| MAC address | Fingerprints | Set at the factory; normally fixed, but can be faked (section 5) |

## 4. IP addresses

### 4.1 What an IP address is

An **IP address** (Internet Protocol address) identifies a host on a network for a period of time. When a device leaves, its address can later be given to a different device, without the address itself changing.

An IPv4 address is written as four numbers separated by dots, such as `192.168.1.77`. Each number is an **octet** (8 bits). Working out which part of an address identifies the network and which the host is called **subnetting**, which a later room covers.

What matters now is the rule of uniqueness: a device's address can change over time, but **no address can be in use by two devices at once on the same network**.

IP addresses, like everything in networking, follow agreed rules called **protocols**. Protocols let devices from different makers talk the same "language", and later rooms look at them in detail.

### 4.2 Private and public addresses

A device's address depends on which network it's on:

- A **private address** identifies a device among the other devices on its private network.
- A **public address** identifies a device (or, in practice, a whole private network) on the internet.

Your internet service provider (ISP) gives your network its public address as part of the service you pay for.

### 4.3 Worked example — two PCs, one public address

The room shows two PCs on the same home network. The public address here is changed to a documentation address.

| Device | Private address | Public address |
|---|---|---|
| DESKTOP-KJE57FD | 192.168.1.77 | 203.0.113.21 |
| CMNatic-PC | 192.168.1.74 | 203.0.113.21 |

1. **Inside the network,** each PC has its own private address, and they use those to reach each other directly.
2. **Towards the internet,** both share one public address. A website visited from either PC sees the same address, `203.0.113.21`.
3. **What joins the two** is the home router, which translates between the private addresses inside and the public address outside.

```text
  PRIVATE NETWORK                                       THE INTERNET      
                                                                          
  DESKTOP-KJE57FD  192.168.1.77 --+                                       
                                  |    +--------+                         
                                  +--->+ Router +---> 203.0.113.21        
                                  |    +--------+     (one public address,
  CMNatic-PC       192.168.1.74 --+                    from the ISP)      
                                                                          
  Inside, the PCs use their private addresses to reach each other.        
  Outside, websites see both of them as 203.0.113.21.                     
```

> **Note (beyond this lesson):** the translation is **Network Address Translation (NAT)**. Private addresses come from reserved ranges such as `192.168.0.0/16`, which is why so many home networks use `192.168.x.x`. Both topics are covered in the A+ 2.6 IPv4 and IPv6 notes.

### 4.4 Running out: IPv4 and IPv6

Everything so far has been **IPv4**, which uses 32-bit addresses. That allows 2 to the power 32, about 4.29 billion, addresses. As more and more devices come online, a free public IPv4 address gets harder to find. The room quotes a Cisco estimate of about 50 billion connected devices by the end of 2021.

> **Correction:** Cisco's widely quoted figure was a forecast, made years earlier, of about 50 billion devices by 2020. It turned out well above the counts reported later. The point stands, though: there are far more devices than IPv4 addresses.

**IPv6** is the newer version of the Internet Protocol, designed to fix the shortage. Its addresses are 128 bits long, allowing 2 to the power 128 addresses.

> **Correction:** the room describes 2 to the power 128 as "340 trillion-plus". It is about **340 undecillion**: 340 followed by 36 zeros, or 340 trillion trillion trillion. That is roughly a trillion trillion (10 to the power 24) times larger than 340 trillion.

The room also says IPv6 is "more efficient due to new methodologies" without saying how.

> **Note (beyond this lesson):** examples of what it means include a simpler, fixed-size packet header, no fragmentation by routers along the way, and hosts that can configure their own addresses automatically.

## 5. MAC addresses

### 5.1 The hardware address

Every networked device has a physical **network interface**, built into the motherboard or added as a card. At the factory, each interface is given a unique **MAC address** (Media Access Control address), which works like a serial number.

A MAC address is **12 hexadecimal digits** (hexadecimal is base 16, using 0 to 9 and a to f), written in pairs separated by colons, such as `a4:c3:f0:85:ac:2d`. The first six digits identify the **manufacturer** of the interface, and the last six are unique to that interface.

```text
    a4  :  c3  :  f0  :  85  :  ac  :  2d  
  |<- manufacturer ->| |< this interface >|
  |   OUI: 24 bits   | |     24 bits      |
  |<------ 48 bits = 12 hex digits ------>|
```

> **Note (beyond this lesson):** the manufacturer part is called the **OUI** (organisationally unique identifier), and 12 hex digits make 48 bits. The same address is written differently on different systems: `a4:c3:f0:85:ac:2d` on Linux, `A4-C3-F0-85-AC-2D` on Windows, and `a4c3.f085.ac2d` on Cisco equipment.

### 5.2 MAC spoofing

Although a MAC address is set at the factory, software can override it. A device pretending to be another by copying its MAC address is **MAC spoofing**.

That breaks any security design that trusts a MAC address as proof of identity. The room's example is a firewall that allows traffic to and from the administrator's MAC address. A device that copies that address gets treated as the administrator.

### 5.3 Worked example — the hotel Wi-Fi

The room's interactive lab is based on this scenario. Cafés and hotels often control guest Wi-Fi by MAC address: once a device has paid (or signed in), its MAC address is allowed through, and a faster service can be sold per device.

1. **Alice pays.** The Wi-Fi system adds Alice's MAC address to its list of allowed devices.
2. **Bob doesn't pay.** His device's MAC address isn't on the list, so he is blocked.
3. **Bob spoofs.** He sets his device's MAC address to match Alice's.
4. **The system is fooled.** It sees an allowed MAC address and lets Bob's traffic through. The network cannot tell the two devices apart by MAC alone.

On Linux, changing an interface's MAC address takes one command, which shows how weak MAC-based control is:

```bash
sudo ip link set dev eth0 down
sudo ip link set dev eth0 address 02:11:22:33:44:55
sudo ip link set dev eth0 up
```

> **Note (beyond this lesson):** modern phones and computers increasingly use a **randomised MAC address** for each Wi-Fi network, for privacy. You can often recognise one: if the second hex digit is 2, 6, a or e (as in `02:...` or `da:...`), the address was set locally rather than at the factory. `a4:c3:f0:85:ac:2d` has 4 as its second digit, so it is a factory address.

### 5.4 IP and MAC side by side

| | IP address | MAC address |
|---|---|---|
| Identifies | A host on a network, for a period of time | A network interface |
| Assigned by | The network (by hand or automatically) | The manufacturer |
| Changes | Often, and gets reused | Normally fixed, but can be spoofed or randomised |
| Format (example) | `192.168.1.77` | `a4:c3:f0:85:ac:2d` |
| Size | 32 bits (IPv4) or 128 bits (IPv6) | 48 bits |

## 6. Ping

### 6.1 What ping does

**Ping** is one of the most basic network tools. It sends an **ICMP echo request** (ICMP is the Internet Control Message Protocol) to a device, and the device answers with an **ICMP echo reply**. Ping measures how long each round trip takes, which shows whether the connection exists and how reliable it is.

You can ping devices on your own network, such as your router, or hosts on the internet by address or name. It is built into Windows, Linux and macOS, and the basic syntax is simply `ping` followed by an IP address or hostname:

```bash
ping -c 4 8.8.8.8          # Linux and macOS: -c sets the count (else runs to Ctrl+C)
```

```powershell
ping 8.8.8.8               # Windows: sends four by default
Test-Connection 8.8.8.8    # the PowerShell equivalent
```

`8.8.8.8` is Google's public DNS server, a common target for checking internet connectivity.

### 6.2 Worked example — reading ping output

The room shows a ping to a router at `192.168.1.254`: six packets sent, all received, with an average time of 4.16 ms. Here is the same kind of test from a Linux machine to its router:

```text
PING 192.0.2.1 (192.0.2.1) 56(84) bytes of data.
64 bytes from 192.0.2.1: icmp_seq=1 ttl=64 time=0.180 ms
64 bytes from 192.0.2.1: icmp_seq=2 ttl=64 time=0.262 ms
64 bytes from 192.0.2.1: icmp_seq=3 ttl=64 time=0.203 ms
64 bytes from 192.0.2.1: icmp_seq=4 ttl=64 time=0.212 ms

--- 192.0.2.1 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3056ms
rtt min/avg/max/mdev = 0.180/0.214/0.262/0.029 ms
```

1. **Each reply line** shows the replying address, a sequence number (`icmp_seq`) so you can spot gaps, a TTL, and the round-trip `time`.
2. **Packet loss** of 0% means every request got a reply: the connection is up and reliable.
3. **The last line** gives the minimum, average and maximum round-trip times. An average of 0.214 ms is typical for a device on the same network; hosts across the internet usually take tens of milliseconds.
4. **If nothing came back,** that would not prove the device is down. Many devices and firewalls ignore ping on purpose.

## 7. Security perspective

- **MAC addresses are not identity.** They can be changed with one command, so MAC-based allow-lists, whether a guest Wi-Fi paywall or an "admin only" firewall rule, are easy to bypass. Use real authentication, such as 802.1X or WPA2/WPA3-Enterprise, where access matters.
- **Randomised MACs cut both ways.** They protect users from being tracked, but they also break asset inventories and controls that expect one fixed MAC per device.
- **Unknown manufacturers can flag rogue devices.** The OUI in a MAC address reveals the maker, so an unexpected vendor on a corporate network (a consumer Wi-Fi router, say) is worth investigating.
- **A public address identifies a network, not a person.** Every device behind a home or office router shares its public address, so an address in a log narrows things to a network, not a specific machine or user.
- **Private addressing is not a security boundary.** It hides internal addresses from the internet, but traffic started from inside, such as malware calling home, passes straight out.
- **Ping is also reconnaissance.** Attackers ping ranges of addresses to find live hosts, and many networks block ICMP echo in response. Defenders should remember the flip side: no reply does not mean nothing is there.

## Summary

- A network is things connected; computer networks range from two devices to billions.
- The internet is a network of networks, joined by routers (Alice in the room's example).
- ARPANET, from the late 1960s, was the internet's forerunner; Tim Berners-Lee invented the World Wide Web, which runs on the internet, in 1989.
- Networks are private (homes, organisations) or public (the internet that joins them).
- Devices have an IP address, which can change, and a MAC address, set at the factory.
- Private addresses work inside a network; many devices share one public address, supplied by the ISP.
- IPv4 has about 4.29 billion addresses, too few; IPv6 has about 340 undecillion.
- A MAC address is 12 hex digits: six for the manufacturer, six for the interface. It can be spoofed, so it is not proof of identity.
- Ping uses ICMP echo request and reply to test reachability and measure round-trip time.

## Glossary

| Term | Meaning |
|---|---|
| ARPANET | The late-1960s US research network that was the forerunner of the internet |
| Hexadecimal | Base-16 numbering, using 0 to 9 and a to f |
| ICMP | Internet Control Message Protocol: carries control messages such as ping |
| Internet | The global network of networks |
| IP address | An address identifying a host on a network, which can change and be reused |
| IPv4 | The 32-bit version of IP, with about 4.29 billion addresses |
| IPv6 | The 128-bit version of IP, with about 340 undecillion addresses |
| ISP | Internet service provider: supplies your connection and public address |
| MAC address | A 48-bit hardware address assigned to a network interface at the factory |
| MAC spoofing | Making a device use another device's MAC address |
| Network | Two or more connected devices |
| OUI | Organisationally unique identifier: the manufacturer part of a MAC address |
| Ping | A tool that tests reachability using ICMP echo request and reply |
| Private address | An address used inside a private network |
| Protocol | An agreed set of rules for how devices communicate |
| Public address | An address used to identify a network on the internet |
| Router | A device that joins networks together and forwards traffic between them |
| World Wide Web | The system of linked web pages that runs on the internet |

## Review questions

1. In your own words, what is a network?
2. What is the internet, and what role does Alice play in the room's example?
3. Did Tim Berners-Lee invent the internet? Explain.
4. What is the difference between a private network and a public network?
5. Which of a device's two identifiers is like a name, and which like a fingerprint? Why?
6. Can two devices on the same network use the same IP address at the same time?
7. Two PCs at home have addresses `192.168.1.77` and `192.168.1.74`. What address does a website see when either of them visits it?
8. Why is it hard to get an unused public IPv4 address, and how does IPv6 help?
9. How many addresses does IPv6 allow, roughly?
10. Split `a4:c3:f0:85:ac:2d` into its two parts and say what each identifies.
11. A café lets paying customers' devices online by MAC address. How could a non-paying customer get online, and what is the attack called?
12. Which protocol does ping use, and which two messages does it send and receive?
13. A ping shows 4 packets transmitted, 4 received, average 0.2 ms. What does that tell you?
14. A server doesn't reply to ping. Does that prove it is offline?

## Answer key

1. **A set of connected things; in computing, connected devices.** From two devices up to billions.
2. **A giant network of networks; Alice joins two networks, as a router does.** Traffic between the two groups passes through her.
3. **No. He invented the World Wide Web, which runs on the internet.** The internet grew from ARPANET and TCP/IP.
4. **A private network belongs to one home or organisation; public networks join private networks together.** Together, public networks form the internet.
5. **The IP address is like a name (it can change); the MAC address is like a fingerprint (set at the factory).** Though unlike fingerprints, MACs can be spoofed.
6. **No.** An address can move between devices over time, but only one device may use it at once.
7. **The home's single public address.** Both PCs share it when talking to the internet.
8. **IPv4 has only about 4.29 billion addresses for far more devices; IPv6's 128-bit addresses remove the shortage.** 2 to the power 128 addresses.
9. **About 340 undecillion (340 followed by 36 zeros).** Not "340 trillion", as the room says.
10. **`a4:c3:f0` identifies the manufacturer (the OUI); `85:ac:2d` identifies the interface.** Six hex digits each.
11. **Copy a paying customer's MAC address: MAC spoofing.** The system can't tell the two devices apart by MAC.
12. **ICMP: echo request out, echo reply back.** Ping times the round trip.
13. **The host is reachable, with no packet loss and a very short round trip, typical of the same local network.** 0% loss means every request was answered.
14. **No.** Many devices and firewalls ignore ping deliberately.
