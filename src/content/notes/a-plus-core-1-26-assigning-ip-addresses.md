---
title: "A+ Core 1 2.6: Assigning IP Addresses — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 2.6: IP address, subnet mask and gateway; static addressing vs DHCP reservations; APIPA."
pubDate: 2026-09-22
tags: ["class-notes", "a-plus", "comptia", "messer", "networking", "ip-addressing", "dhcp", "apipa"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 2, objective 2.6**

> **Quick reference:** the short version of this lesson is the [Assigning IP Addresses cheat sheet](/cyber_lab_log/resources/a-plus-core-1/2/), part of Section 2. It follows the IPv4 and IPv6 lesson, which also covers objective 2.6, and builds on the DHCP lesson from objective 2.4.

## Learning objectives

By the end of these notes you should be able to:

1. List the settings a device needs to communicate, and explain what each one does.
2. Use a subnet mask to decide whether a destination is local or reached through the gateway.
3. Compare static addressing, dynamic addressing and DHCP reservations, and choose between them.
4. Explain when and why a device gives itself an APIPA address, and what range it uses.
5. Describe how a device checks that a self-chosen address is free.
6. Configure and inspect IPv4 settings on Windows and Linux.
7. Troubleshoot a device that has an APIPA address.

## 1. The settings every device needs

### 1.1 IP address

Every device on a network needs its own IP address, such as `192.168.1.165`. No two devices on the same network can share one. The address is either typed in by hand or supplied automatically.

### 1.2 Subnet mask

An IP address on its own is not enough. The device also needs a **subnet mask**, such as `255.255.255.0`, which tells it which part of the address identifies the network and which part identifies the host. The combination of an address and a mask defines the device's **IP subnet**: the range of addresses it can reach directly.

The mask is not something you can discover by watching traffic, because it is not carried in packets. It comes either from the network administrator or from the DHCP server, so if you configure it by hand, confirm it with whoever runs that subnet.

### 1.3 Default gateway

To reach anything outside its own subnet, a device needs the address of its local router, known as the **default gateway**, such as `192.168.1.1`. The gateway must itself be inside the device's subnet, because the device has to be able to reach it directly.

The address, mask and gateway together are the minimum for a device to talk both to its own subnet and beyond it. An administrator will usually give you all three at once.

### 1.4 Other settings

Many networks need more than the basic three:

| Setting | Why the device needs it |
|---|---|
| DNS servers | To turn names into IP addresses; without them, nothing works by name |
| NTP servers | To keep the clock accurate, which authentication and logging depend on |
| VoIP servers | So IP phones can find their call server |
| Others | Anything the network needs devices to know about, such as boot or proxy servers |

### 1.5 Worked example — how the mask and gateway are used

A device is configured with `192.168.1.165`, mask `255.255.255.0` and gateway `192.168.1.1`. For every packet, it performs a bitwise AND of an address with the mask, which keeps the network part and zeroes the host part.

```text
  This host: 192.168.1.165   mask 255.255.255.0   gateway 192.168.1.1      
  My network = 192.168.1.165 AND 255.255.255.0 = 192.168.1.0               
                                                                           
  Destination 192.168.1.20                Destination 192.168.2.20         
  AND 255.255.255.0 = 192.168.1.0         AND 255.255.255.0 = 192.168.2.0  
  Same as my network: LOCAL               Different network: REMOTE        
            |                                       |                      
            v                                       v                      
  ARP for 192.168.1.20's MAC              ARP for the gateway's MAC        
  and send the frame straight to it       and send the frame to 192.168.1.1
```

1. **Its own network:** `192.168.1.165` AND `255.255.255.0` = `192.168.1.0`.
2. **Destination `192.168.1.20`:** AND the mask gives `192.168.1.0`, the same network. It is local, so the device finds its MAC address with ARP and sends to it directly.
3. **Destination `192.168.2.20`:** AND the mask gives `192.168.2.0`, a different network. It is remote, so the device sends the frame to the gateway, which routes it onward.

A mask of `255.255.255.0` (a `/24`) leaves 8 bits for hosts: 256 addresses, of which 254 can be used by devices (`192.168.1.1` to `192.168.1.254`). The first is the network address and the last, `192.168.1.255`, is the broadcast address.

### 1.6 Worked example — one wrong digit

The administrator's settings are mask `255.255.255.0`, but a technician types `255.255.0.0`.

1. The device now calculates its network as `192.168.1.165` AND `255.255.0.0` = `192.168.0.0`, a `/16`.
2. It tries to reach a server at `192.168.2.20`. With the wrong mask, `192.168.2.20` AND `255.255.0.0` = `192.168.0.0`, so the device believes the server is **local**.
3. It sends an ARP request for `192.168.2.20` instead of sending the traffic to the gateway. The server is on another subnet, so nobody answers.
4. The result: the device can reach its own subnet and nothing else on `192.168.x.x`, while other devices work fine. The only cure is to find and fix the typing mistake.

This is why static settings must be entered exactly: nothing checks them for you.

## 2. Static addressing

### 2.1 What a static address is

Most devices get their settings from **DHCP** (the Dynamic Host Configuration Protocol, covered in the 2.4 DHCP lesson), which hands out addresses from a pool. Sometimes, though, a device should always have the same address. An address that never changes is a **static IP address**.

The most direct way to set one is to type it into the device's network settings: the IP address, subnet mask, default gateway, preferred DNS server and anything else the network needs. On Windows, that is the adapter's properties (reached with `ncpa.cpl`), PowerShell or `netsh`; section 6 has the commands.

### 2.2 The problems with typing it in

Manual configuration has two weaknesses:

- **Mistakes.** Nothing supplies or checks the settings, so one wrong digit (as in section 1.6) breaks connectivity.
- **Scale.** If the gateway or DNS server addresses change, someone has to visit every manually configured device and retype the settings. That is fine for a handful of devices at home, but not for hundreds or thousands in a company.

For those reasons, typing static settings into every device is generally not best practice.

## 3. DHCP reservations

### 3.1 Static addresses, managed centrally

A **DHCP reservation** gives a device a fixed address without configuring the device itself. On the DHCP server, an administrator links the device's **MAC address** to a specific IP address. The device stays set to DHCP. When it asks for an address, the server recognises its MAC address and always hands out the reserved one, along with the current gateway, DNS and other settings.

The result is the best of both: the address never changes, but everything is managed in one place. If the gateway or DNS servers change, you update the DHCP server, and every device picks up the new settings automatically.

> **Correction:** the lesson says devices pick up new settings the next time they start. They also pick them up when they **renew their lease**, which clients normally try to do when half the lease time has passed, or immediately with `ipconfig /renew`. A restart is not required.

### 3.2 Worked example — choosing the method for each device

A small office is reorganising its addressing. For each device, pick static, reservation or dynamic.

| Device | Choice | Reasoning |
|---|---|---|
| Staff laptops | Dynamic | Nobody needs to know their address; they move between networks |
| Network printer | Reservation | People and print servers need a fixed address, but settings should be central |
| IP phones | Dynamic (or reservation) | They find their call server through DHCP settings; a fixed address is optional |
| DHCP server | Static | It cannot get its own address from itself |
| Router (default gateway) | Static | Every device depends on it, often including DHCP itself |
| DNS server | Static | Clients are given its address, so it must never move |

> **Caution:** the lesson suggests reservations are the more common choice for routers and switches. That suits many devices, but anything DHCP itself depends on, such as the DHCP server, the routers that relay DHCP requests, and DNS servers, is normally configured statically. Otherwise a DHCP outage could stop the very devices needed to fix it.

## 4. Dynamic addressing and what happens when it fails

### 4.1 DHCP everywhere

Most devices rely on DHCP. At home, at work, in a hotel or a coffee shop, your device almost certainly received its address automatically. The full sequence is shown here: what normally happens, and what the device does when no DHCP server answers.

```text
  Device starts, set to obtain an address automatically                
                 |                                                     
                 v                                                     
  Does a DHCP server answer? ---- no ----> Pick 169.254.x.y at random  
                 |                                    |                
                yes                                   v                
                 |                     ARP probe: is anyone using it?  
                 v                            |                 |      
  Reservation for this MAC?                 reply            silence   
         |                |                   |                 |      
        yes              no                   v                 v      
         |                |             pick another      use it: APIPA
         v                v             and try again     (local only) 
   Same reserved      Next free address                                
  address, always       from the pool                                  
```

### 4.2 No DHCP server

If a device is set to use DHCP but no DHCP server responds, it has to decide what to do on its own. Most operating systems give themselves an **APIPA** address.

## 5. APIPA

### 5.1 What APIPA is

**APIPA** stands for **Automatic Private IP Addressing**. It is Microsoft's name for what the standards call an **IPv4 link-local address**. With it, a device can talk to other devices on the same network segment that are also using link-local addresses, but it cannot be routed beyond that segment. There is no default gateway, so there is no internet access.

That limited connectivity is still useful. Devices on the same segment can reach each other, which helps with basic troubleshooting while you work out why DHCP isn't answering.

> **Note (beyond this lesson):** Windows keeps trying to reach a DHCP server in the background, about every five minutes. If one appears, the device swaps its APIPA address for a proper one without any action from you. Other operating systems implement the same standard (RFC 3927), though not all enable it by default.

### 5.2 The APIPA range

The standard reserves the whole `169.254.0.0/16` block for link-local addressing, but keeps the first and last 256 addresses back.

| Addresses | Status |
|---|---|
| `169.254.0.0` to `169.254.0.255` | Reserved (first 256) |
| `169.254.1.0` to `169.254.254.255` | Used for APIPA: 65,024 addresses |
| `169.254.255.0` to `169.254.255.255` | Reserved (last 256) |

The usable range works out as 254 blocks of 256 addresses: 254 x 256 = 65,024.

> **Exam tip:** any address starting `169.254` means the device asked for DHCP and got no answer. Treat it as a symptom to investigate, not a configuration to keep.

### 5.3 Checking the address is free

A device picks its APIPA address at random from that large range, say `169.254.77.77`. Before using it, it must make sure no other device already has it. It broadcasts an ARP request to the local subnet, effectively asking "is anyone using 169.254.77.77?" If nobody replies, it takes the address; if someone does, it picks another and tries again.

> **Note (beyond this lesson):** these checks are called **ARP probes**. The device sends them with a sender IP address of `0.0.0.0`, because it doesn't yet own an address, and sends several (the standard specifies three) before deciding the address is free.

> **In the real world:** Linux's `arping -D` performs exactly this check. On a Debian test machine, probing a free address and then an address in use gave:
>
> ```text
> ARPING 192.0.2.77 from 0.0.0.0 eth0
> Sent 2 probes (2 broadcast(s))
> Received 0 response(s)
> ```
>
> ```text
> ARPING 192.0.2.1 from 0.0.0.0 eth0
> Unicast reply from 192.0.2.1 [02:FC:00:00:00:05]  0.652ms
> Sent 1 probes (1 broadcast(s))
> Received 1 response(s)
> ```
>
> Silence means the address is free; a reply means it is taken. The addresses differ from APIPA's, but the mechanism is the same.

### 5.4 Recognising APIPA

On Windows, `ipconfig /all` labels a self-assigned address as an **Autoconfiguration IPv4 Address** rather than an ordinary IPv4 address, and it will be in the `169.254` range with no default gateway. On Linux, `ip addr` shows it like any other address, so the `169.254` prefix is the giveaway.

### 5.5 Worked example — a laptop with a 169.254 address

A user reports "no internet". `ipconfig /all` shows `169.254.41.203` with no default gateway.

1. **Read the symptom.** A `169.254` address means DHCP failed, so the problem is between the laptop and the DHCP server, not with the internet.
2. **Check the link.** Is the cable plugged in, or the Wi-Fi connected to the right network? No link means no DHCP.
3. **Ask again.** Run `ipconfig /release` then `ipconfig /renew`. If a server answers now, the fault was temporary.
4. **Compare with neighbours.** If other devices on the same network also have `169.254` addresses, the DHCP server itself (or the path to it) is down. If only this laptop does, look at its port, cable, VLAN or adapter.
5. **Check the server.** Is the DHCP service running? Has its pool run out of addresses? A full pool produces exactly this symptom on new devices.

## 6. Configuring addresses in practice

Windows PowerShell, static address:

```powershell
New-NetIPAddress -InterfaceAlias 'Ethernet' -IPAddress 192.168.1.165 -PrefixLength 24 `
  -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceAlias 'Ethernet' -ServerAddresses 192.168.1.1
```

PowerShell takes the mask as a prefix length: `255.255.255.0` is `/24`, so `-PrefixLength 24`.

Windows command prompt, static and back to DHCP (`^` continues a long line):

```bat
netsh interface ip set address name="Ethernet" static ^
  192.168.1.165 255.255.255.0 192.168.1.1
netsh interface ip set dns name="Ethernet" static 192.168.1.1
netsh interface ip set address name="Ethernet" dhcp
netsh interface ip set dns name="Ethernet" dhcp
ipconfig /release
ipconfig /renew
```

Linux, temporary static settings (lost at reboot; permanent settings go in the distribution's network configuration):

```bash
sudo ip addr add 192.168.1.165/24 dev eth0
sudo ip route add default via 192.168.1.1
ip addr show dev eth0          # check the result
```

The GUI route on Windows is `ncpa.cpl`: open the adapter's properties, then Internet Protocol Version 4, and choose between "Obtain an IP address automatically" and "Use the following IP address".

## 7. Choosing an approach

| Method | Set where | Best for | Watch out for |
|---|---|---|---|
| Static (manual) | On the device | Core infrastructure: routers, DHCP and DNS servers | Typos; every change means visiting the device |
| DHCP reservation | On the DHCP server | Printers and other devices that need a fixed address | Depends on DHCP; tied to the MAC address, so replacing the NIC breaks it |
| Dynamic (DHCP) | On the DHCP server | Laptops, desktops, phones: most devices | The address may change over time |
| APIPA | The device itself | Nothing: it is an automatic fallback | A sign that DHCP failed |

## 8. Security perspective

- **Rogue DHCP servers.** Devices accept whichever DHCP offer arrives first. An attacker running their own DHCP server can hand out their own address as the gateway or DNS server and quietly sit in the middle of victims' traffic. DHCP snooping on managed switches only allows offers from trusted ports.
- **DHCP starvation.** An attacker can claim every address in the pool with fake MAC addresses. New devices then fall back to APIPA, or accept a rogue server's offer. A sudden rise in `169.254` addresses is worth investigating as a possible attack, not just an outage.
- **Reservations trust MAC addresses.** A reservation is keyed on a MAC address, which can be changed in software. A device that copies a printer's MAC can take the printer's address, and any firewall rule that trusts that address. Treat IP addresses as location, not identity.
- **No DHCP does not mean no access.** On a network without DHCP, anyone can type in a static address. Port security or 802.1X, not the absence of DHCP, controls who connects.
- **Gateway and DNS settings are attack targets.** Whoever controls a device's gateway or DNS settings controls where its traffic goes, and malware has historically changed DNS settings to redirect victims. Watch for unexpected changes to these settings on managed devices.
- **APIPA hosts are not isolated.** A device on APIPA can still talk to other link-local devices on the same segment, so losing DHCP does not take it off the network.

## Summary

- A device needs an IP address, a subnet mask and a default gateway, plus usually DNS and other settings.
- The mask decides which destinations are local; anything else goes to the gateway, which must be inside the local subnet.
- Static addresses are typed on the device: exact, but error-prone and hard to change at scale.
- DHCP reservations give a device a fixed address from the DHCP server, keyed on its MAC address, while keeping settings central.
- Devices pick up changed DHCP settings when they renew their lease, typically at half the lease time.
- Infrastructure that DHCP depends on (DHCP and DNS servers, gateways) is normally configured statically.
- With no DHCP server, most systems self-assign an APIPA address from `169.254.1.0` to `169.254.254.255`, after checking with ARP that it is free.
- APIPA allows local-subnet communication only; a `169.254` address means DHCP failed.

## Glossary

| Term | Meaning |
|---|---|
| APIPA | Automatic Private IP Addressing: a self-assigned `169.254` address used when DHCP fails |
| ARP probe | An ARP request sent to check whether an address is already in use |
| Default gateway | The local router a device sends traffic to for other subnets |
| DHCP | Dynamic Host Configuration Protocol: automatically hands out IP settings |
| DHCP reservation | A DHCP setting that always gives a particular MAC address the same IP address |
| DHCP pool | The range of addresses a DHCP server can hand out |
| Dynamic address | An address assigned by DHCP that may change over time |
| IP subnet | The range of addresses defined by an IP address and subnet mask together |
| IPv4 link-local address | The standard name for an APIPA-style `169.254` address |
| Lease | The period a DHCP-assigned address is valid before it must be renewed |
| MAC address | The hardware address of a network interface, used to identify a device for reservations |
| NTP | Network Time Protocol: keeps device clocks accurate |
| Prefix length | The number of network bits, such as `/24` for `255.255.255.0` |
| Static address | An address that does not change, set manually or by reservation |
| Subnet mask | A value that marks which part of an address is the network, such as `255.255.255.0` |

## Review questions

1. What three settings give a device basic connectivity inside and outside its subnet?
2. Why can't you learn a subnet's mask by capturing its traffic?
3. A host is `192.168.1.165/24`. Is `192.168.1.200` local or remote? What about `192.168.3.1`?
4. A technician types a mask of `255.255.0.0` instead of `255.255.255.0`. What symptom might the user see?
5. Give two drawbacks of typing static settings into every device.
6. What is a DHCP reservation, and what device detail is it linked to?
7. The DNS server's address changes. How do devices with reservations get the new address?
8. Why should the DHCP server itself use a manually configured static address?
9. A laptop shows `169.254.10.5`. What happened, and can it reach the internet?
10. What range of addresses can APIPA actually assign?
11. How does a device make sure its randomly chosen APIPA address isn't already in use?
12. Every device on one floor suddenly has a `169.254` address. Where do you look first?
13. What is `/24` as a dotted subnet mask, and how many usable host addresses does it give?
14. Why is a DHCP reservation not a reliable way to identify a trusted device?

## Answer key

1. **IP address, subnet mask and default gateway.** DNS is usually needed as well, for names.
2. **The mask is not carried in packets.** It comes from the administrator or from DHCP.
3. **`192.168.1.200` is local; `192.168.3.1` is remote.** Only addresses in `192.168.1.0/24` are on the same subnet.
4. **They can reach their own subnet but not other `192.168.x.x` subnets.** The device thinks those are local and never uses the gateway.
5. **Typing mistakes, and having to revisit every device when settings change.** It does not scale.
6. **A DHCP server setting that always gives one device the same IP address, linked to its MAC address.** The device stays set to DHCP.
7. **Update it on the DHCP server; devices receive it when they renew their lease or restart.** No one visits the devices.
8. **It cannot obtain an address from itself.** Infrastructure DHCP depends on is configured statically.
9. **DHCP failed, and it gave itself an APIPA address; no, it can only reach its local subnet.** There is no default gateway.
10. **`169.254.1.0` to `169.254.254.255`.** The first and last 256 addresses of `169.254.0.0/16` are reserved.
11. **It broadcasts ARP probes for the address and uses it only if nobody replies.** A reply means it picks another.
12. **The DHCP server, or the network path to it.** Many devices failing at once rules out one faulty laptop.
13. **`255.255.255.0`; 254 usable hosts.** 256 addresses, minus the network and broadcast addresses.
14. **It is keyed on a MAC address, which can be spoofed.** An attacker copying the MAC gets the address too.
