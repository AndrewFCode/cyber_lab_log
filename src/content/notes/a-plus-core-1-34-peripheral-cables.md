---
title: "A+ Core 1 3.2: Peripheral Cables — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: USB versions and speeds, USB connector types and USB-C, DB-9 serial and RS-232 console access, and Thunderbolt 1 to 4."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "usb", "usb-c", "thunderbolt", "serial"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (Peripheral Cables)**

> **Quick reference:** the short version of this lesson is the Peripheral Cables cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It sits alongside the other objective 3.2 lessons — network cables, the 568A/568B colour schemes and optical fibre — but covers the cables that connect devices to a computer rather than to a network.

## Learning objectives

By the end of these notes you should be able to:

1. State what USB stands for and give the speed of each version covered.
2. Explain why USB cable lengths are described as approximate.
3. Identify the USB connector types used by USB 1.1/2.0 and USB 3.0.
4. Explain what USB-C is — and, importantly, what it is not.
5. Describe DB-9 and DB-25 serial connectors, and explain the DB-9 / DE-9 naming.
6. Explain what RS-232 is and why console connections still matter.
7. Describe the adapter chain used to reach a console port from a modern laptop.
8. Compare Thunderbolt 1 to 4 on connector, throughput and capability, and explain daisy chaining.

## 1. USB

### 1.1 The standard peripheral connection

**USB** — **Universal Serial Bus** — has become the standard way of connecting things to a computer. Keyboards, mice and nearly any other directly attached peripheral use it.

### 1.2 Versions and speeds

| Version | Name | Maximum speed | Approximate cable |
|---|---|---|---|
| USB 1.1 | Low speed | 1.5 Mbps | 3 m |
| USB 1.1 | Full speed | 12 Mbps | 5 m |
| USB 2.0 | High speed | 480 Mbps | 5 m |
| USB 3.0 | **SuperSpeed** | 5 Gbps | 3 m |
| USB 3.1 | — | 10 Gbps | — |
| USB 3.2 | — | 20 Gbps | — |

USB 2.0 was a large jump over 1.1, and USB 3.0 — the version branded **SuperSpeed** — another. The later 3.1 and 3.2 revisions doubled and doubled again.

> **Exam tip:** the four numbers worth committing are **1.5/12 Mbps (1.1), 480 Mbps (2.0), 5 Gbps (3.0), 10 Gbps (3.1), 20 Gbps (3.2)**. Notice that each generation is roughly an order of magnitude or a doubling — the pattern makes them easier to hold.

### 1.3 Why lengths are "approximately"

The USB specification **does not state an exact maximum cable length**. The figures above are practical limits: roughly the longest you can go and still reliably get that throughput. Faster signalling is less tolerant of cable loss, which is why USB 3.0's practical length is shorter than USB 2.0's despite being the newer standard.

> **In the real world:** if a USB device behaves erratically on a long or cheap cable, shorten the cable before troubleshooting anything else. A powered hub partway along is the supported way to extend the distance; a longer passive cable is not.

> **Note (beyond this lesson):** the USB Implementers Forum has renamed the 3.x generations more than once — you will see USB 3.0 marketed as **USB 3.2 Gen 1**, USB 3.1 as **3.2 Gen 2**, and the 20 Gbps version as **3.2 Gen 2x2**. **USB4** goes to 40 Gbps and builds on the Thunderbolt 3 protocol. The speeds are the same; only the names changed.

### 1.4 Connectors for USB 1.1 and 2.0

| Connector | Typically used for |
|---|---|
| **Standard-A** | The familiar rectangular plug at the computer end; still in use today |
| **Standard-B** | The squarer plug on printers and external peripherals |
| **Mini-B** | Smaller plug on mobile devices |
| **Micro-B** | Smaller still, on mobile devices |

### 1.5 Connectors for USB 3.0

USB 3.0 changed the connectors somewhat:

- The **Standard-A** plug kept the same form factor, so it still fits an older port.
- The **Standard-B** plug was updated — slightly taller than the 2.0 version.
- The **Micro-B** plug is a **completely different form factor** from the 1.1/2.0 Micro-B.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   USB 1.1 / 2.0            USB 3.0                    USB-C                  |
|                                                                              |
|   Standard-A  [====]       Standard-A  [====]         [ ~~~~ ]               |
|      same form factor         same form factor        reversible,            |
|                                                       one connector          |
|   Standard-B  [ [] ]       Standard-B  [ [] ]         for everything         |
|      squarer                  taller than 2.0                                |
|                                                                              |
|   Mini-B / Micro-B         Micro-B  [==][==]                                 |
|      small, mobile            DIFFERENT shape                                |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **Caution:** the 3.0 Micro-B being a different shape is what people meet in practice. A USB 2.0 Micro-B cable will plug into part of a 3.0 Micro-B socket on an external drive and work — at 2.0 speeds — which looks like a slow drive rather than a wrong cable.

### 1.6 USB-C

All those connector types accumulated over the years, and the industry eventually standardised on one: **USB-C**. It solves two problems at once — a single connector that can replace all the earlier types, and one you can plug in **either way round**, with no correct orientation to find.

The key conceptual point, and one the exam likes: **USB-C describes the physical connector, not the signal travelling over it.** Many different kinds of signal can run through a cable that ends in a USB-C plug — USB data at various speeds, DisplayPort video, Thunderbolt, power delivery. Seeing a USB-C plug tells you the shape of the connector and nothing about the capability.

For size, USB-C is close to the old Micro-B plug, and considerably smaller than Standard-A.

> **Caution:** because the connector says nothing about the signal, two identical-looking USB-C cables can behave very differently. One may carry 40 Gbps and 100 W of power; another may charge slowly and carry no video at all. When a USB-C dock or monitor "does not work", the cable is a prime suspect.

### 1.7 Worked example — a USB-C monitor that will not display

**Scenario:** a laptop charges fine from a USB-C dock but the attached monitor shows nothing.

1. **Separate connector from capability.** Charging proves the cable carries power, not that it carries video.
2. **Check the cable's specification** — it may be a charge-only or USB 2.0-class cable with no high-speed data or DisplayPort Alt Mode support.
3. **Check the laptop port.** Not every USB-C port on a machine supports video output; manufacturers often mark the ones that do.
4. **Swap in a cable known to carry video** (a Thunderbolt-branded cable, for example) and retest.
5. **Then look at the dock and drivers** — but only after ruling out the cable, which is the cheapest and most common cause.

## 2. Serial cables

### 2.1 Before USB

Long before the Universal Serial Bus there was simply the **serial cable**, in many styles and formats. The two most common connectors were the **DB-25** and the **DB-9**.

### 2.2 DB-9 and DE-9

The naming is a small piece of historical untidiness worth understanding. In the D-subminiature family, the letter after the D is the **shell size** and the number is the **pin count**. The 25-pin connector uses a **B**-size shell, making it a genuine **DB-25**. The 9-pin connector uses the smaller **E**-size shell, so it should properly be a **DE-9** — but because everyone was already saying "DB" for the 25-pin version, the 9-pin one inherited the name and is universally called a **DB-9**.

Both names are in use. If you buy an older serial cable, expect to see it listed as DB-9 or DE-9; they are the same thing.

### 2.3 RS-232

These connections carry signals using **RS-232** — **Recommended Standard 232**. It long predates USB, and predates the standards for mice and keyboards too. In its day, a modem, keyboard, mouse or other peripheral might well have connected over a standard serial cable and interface.

> **Caution:** the transcript dates RS-232 to 1969. More precisely, RS-232 was **first introduced in 1960**; the widely adopted **RS-232-C revision was published in 1969**, which is where that date comes from. Either way, the point stands — it is one of the oldest standards still in everyday use.

### 2.4 Console connections

Today, a DB-9 connector usually means **legacy equipment**: an older switch or router, connected to for configuration. The port you are reaching is the device's **serial or console port**.

Console interfaces come in several physical forms:

| Console interface | Note |
|---|---|
| **RJ45** | Looks like Ethernet, but carries **serial**, not Ethernet |
| **DB-9** | The traditional serial connector |
| **USB** | Common on newer switches and routers |

> **Caution:** an RJ45 console port is the classic trap. The connector is identical to an Ethernet port, but the signalling is serial. Plugging a normal patch lead between a console port and a switch port does nothing useful, and the port is often labelled only as "CONSOLE".

### 2.5 Why console access still matters

The console connection is the best way in **when no other method is available**. If you cannot reach a switch, router or firewall through its normal network interfaces — a misconfiguration, a failed upgrade, a network you have just taken down — the console still works, because it does not depend on the network at all.

Connect over serial and you are generally dropped at a **command prompt**, typing configuration commands directly.

### 2.6 The adapter chain

Most modern machines no longer have a DB-9 port, so technicians carry adapters. A typical chain converts **USB (or USB-C) to DB-9**, and then **DB-9 to RJ45**, to reach a console port.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   [ Laptop ]                                                                 |
|       | USB-C or USB-A                                                       |
|       v                                                                      |
|   [ USB-to-serial adapter ]   <- needs a driver; presents a COM port         |
|       | DB-9 (DE-9)                                                          |
|       v                                                                      |
|   [ DB-9-to-RJ45 console cable ]                                             |
|       | RJ45 -- SERIAL signalling, not Ethernet                              |
|       v                                                                      |
|   [ CONSOLE port on switch / router / firewall ]                             |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **Note (beyond this lesson):** a USB-to-serial adapter presents itself to the operating system as a **COM port** (Windows) or a `/dev/tty…` device (Linux and macOS), and you connect to it with terminal software. The near-universal default settings are **9600 baud, 8 data bits, no parity, 1 stop bit** — usually written 9600 8N1 — though the device's documentation is the authority.

### 2.7 Worked example — recovering an unreachable switch

**Scenario:** a change to a switch's management VLAN has left it unreachable over the network. Nobody can SSH to it.

1. **Stop trying the network.** The management path is exactly what the change broke.
2. **Go to the device physically** and find the port marked CONSOLE — RJ45 on most switches, DB-9 on older ones, USB on newer.
3. **Build the chain** from your laptop: USB-to-serial adapter, then the console cable that matches the port.
4. **Confirm the adapter enumerated** — a COM port in Device Manager, or a new `/dev/tty` device.
5. **Open a terminal session** at the documented settings and press Enter; you should get a prompt.
6. **Fix the configuration** from the console, then verify network management works again before you unplug.

## 3. Thunderbolt

### 3.1 What it is

**Thunderbolt** is a high-speed serial connection carrying **data and power on the same cable**. That makes it simple to run a peripheral from one cable, with no separate power supply.

### 3.2 Versions

| Version | Connector | Throughput | Notes |
|---|---|---|---|
| Thunderbolt 1 | **Mini DisplayPort** | 10 Gbps per channel, two channels = 20 Gbps total | Reused an existing connector |
| Thunderbolt 2 | Mini DisplayPort | 20 Gbps aggregated | Channels combined |
| Thunderbolt 3 | **USB-C** | 40 Gbps aggregated | 3 m copper, up to 60 m optical |
| Thunderbolt 4 | USB-C | 40 Gbps aggregated | Dual-4K video, more PCI Express bandwidth |

Thunderbolt 1 and 2 used the **Mini DisplayPort** connector that many systems already had. Thunderbolt 3 moved to **USB-C** — a good illustration of the earlier point that USB-C is a connector, not a signal. Thunderbolt 4 keeps 40 Gbps but improves video output to support **dual 4K displays** and increases bandwidth to the **PCI Express bus**, so more data can move between the motherboard and peripherals.

> **Note (beyond this lesson):** Thunderbolt 3 could already drive dual 4K displays on many implementations; what Thunderbolt 4 changed is making that a **required minimum** for certification, along with a minimum of 32 Gbps of PCIe bandwidth. TB4's headline is consistency across devices rather than raw speed.

### 3.3 Distance

Thunderbolt 3 supports up to **3 m over copper**, but also supports **optical** cabling up to **60 m** — a striking difference, and the same trade-off seen in the optical fibre lesson: light goes much further than copper.

### 3.4 Daisy chaining

Thunderbolt lets you **daisy chain** devices — each device connects to the next rather than every device connecting back to the computer. A laptop can connect to a monitor, that monitor to a second monitor, and the second monitor to external storage. Thunderbolt 3 tracks which devices are in the chain and sends and receives data to and from the right one.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Daisy chain                                                                |
|                                                                              |
|   [ Laptop ] -- [ Monitor 1 ] -- [ Monitor 2 ] -- [ External storage ]       |
|                                                                              |
|   One port on the laptop; Thunderbolt knows which device is which            |
|                                                                              |
|   Compare with a star: every device needs its own port on the computer       |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.5 Worked example — planning a single-cable desk

**Scenario:** a user wants one cable to their laptop, driving two 4K monitors plus an external SSD, and charging the laptop.

1. **Check the laptop's port.** It must be **Thunderbolt**, not merely USB-C — same shape, different capability.
2. **Dual 4K is the deciding requirement.** **Thunderbolt 4** guarantees it; a Thunderbolt 3 setup may manage it but is not required to.
3. **Plan the chain.** Monitor, then monitor, then storage — or a Thunderbolt dock with everything hanging off it.
4. **Power comes down the same cable,** which is the point of the single-cable desk, but check the laptop's power requirement against what the dock supplies.
5. **Use a certified Thunderbolt cable** and keep copper runs within 3 m; go optical only if the distance genuinely demands it.

## 4. Security perspective

Peripheral ports are direct, physical routes into a machine, and some of them bypass the operating system entirely.

- **USB is the classic physical attack surface.** A device can present itself as a keyboard and type commands the instant it is plugged in, whatever it looks like on the outside. Port control through endpoint policy, disabling unused ports, and never connecting found or untrusted devices are the standard defences.
- **Thunderbolt exposes PCI Express directly.** That is precisely what gives it its speed — and it means a malicious Thunderbolt device can potentially reach system memory over **DMA**, bypassing the OS. Modern systems mitigate this with an IOMMU and by requiring user approval for new Thunderbolt devices. Never leave the approval prompt on "always allow", and do not connect unknown Thunderbolt docks.
- **Console ports are unauthenticated physical access by design.** The whole point is to work when nothing else does, which means anyone who can touch the device can usually reach a prompt — and on many platforms, a password recovery procedure. Network equipment belongs in locked rooms and cabinets; that lock is the console port's only real access control.
- **A USB-C plug tells you nothing about what the cable does.** A cable or dock can carry data, video and power while also being a device in its own right. Treat public charging cables and borrowed docks as untrusted; use a charge-only cable or your own power adapter where it matters.
- **Daisy chains extend trust.** In a Thunderbolt chain, everything downstream is attached to the same high-speed path. One untrusted device in the chain is one too many.
- **Adapters are devices too.** A USB-to-serial adapter installs a driver and enumerates as hardware. Use adapters from known sources, particularly the ones that live in a technician's bag and touch every switch in the estate.

## Summary

- **USB (Universal Serial Bus)** is the standard peripheral connection. Speeds: **1.1** low 1.5 Mbps / full 12 Mbps, **2.0** 480 Mbps, **3.0 (SuperSpeed)** 5 Gbps, **3.1** 10 Gbps, **3.2** 20 Gbps.
- Cable lengths are **approximate** — roughly 3 m for low speed and USB 3.0, 5 m for full speed and USB 2.0 — because the specification sets no exact maximum.
- **USB 1.1/2.0 connectors:** Standard-A, Standard-B, Mini-B, Micro-B. **USB 3.0:** Standard-A unchanged, Standard-B slightly taller, Micro-B a completely different shape.
- **USB-C** is one reversible connector replacing them all, and it describes **only the physical interface** — many different signals can travel over it.
- **Serial:** DB-25 and DB-9 (properly **DE-9**, since 9 pins use an E-size shell), carrying **RS-232**.
- **Console ports** — RJ45 (serial, not Ethernet), DB-9 or USB — are how you reach a switch, router or firewall when nothing else works, dropping you at a command prompt. Modern laptops need a **USB-to-DB-9 and DB-9-to-RJ45** adapter chain.
- **Thunderbolt** carries data and power on one cable and supports **daisy chaining**. **TB1:** Mini DisplayPort, 2 × 10 Gbps = 20 Gbps. **TB2:** Mini DisplayPort, 20 Gbps aggregated. **TB3:** USB-C, 40 Gbps, 3 m copper / 60 m optical. **TB4:** USB-C, 40 Gbps, dual 4K, more PCIe bandwidth.

## Glossary

| Term | Meaning |
|---|---|
| USB | Universal Serial Bus; the standard peripheral connection |
| Low speed / full speed | USB 1.1's two rates, 1.5 Mbps and 12 Mbps |
| SuperSpeed | The branding for USB 3.0, at 5 Gbps |
| Standard-A | The familiar rectangular USB plug at the computer end |
| Standard-B | The squarer USB plug used on printers and peripherals |
| Mini-B / Micro-B | Smaller USB plugs used on mobile devices |
| USB-C | The single reversible connector that replaces the earlier types |
| Serial cable | A pre-USB cable carrying serial data, in many formats |
| DB-25 | The 25-pin serial connector, in a B-size shell |
| DB-9 / DE-9 | The 9-pin serial connector; E-size shell, commonly called DB-9 |
| D-subminiature | The connector family whose letter denotes shell size |
| RS-232 | Recommended Standard 232; the serial signalling standard |
| Console port | The serial management port on a switch, router or firewall |
| COM port | How a serial interface appears to Windows |
| Thunderbolt | High-speed serial connection carrying data and power together |
| Mini DisplayPort | The connector used by Thunderbolt 1 and 2 |
| Daisy chain | Connecting devices one to the next rather than each to the computer |
| PCI Express | The motherboard bus Thunderbolt extends to peripherals |
| DMA | Direct memory access; why Thunderbolt devices need approval |

## Review questions

1. What does USB stand for?
2. Give the two USB 1.1 speeds and their names.
3. What is the maximum speed of USB 2.0, 3.0, 3.1 and 3.2?
4. Which USB version is branded SuperSpeed?
5. Why are USB cable lengths given as approximate?
6. Name the four connector types used by USB 1.1 and 2.0.
7. Which USB 3.0 connector is a completely different shape from its 2.0 equivalent?
8. What two problems does USB-C solve?
9. What does USB-C tell you about the signal on the cable?
10. Why is a DB-9 more properly called a DE-9?
11. What does RS-232 stand for, and what is it used for today?
12. What three physical forms can a console interface take?
13. Give the connector and throughput for each of Thunderbolt 1 to 4.
14. What are Thunderbolt 3's maximum copper and optical distances?
15. **Scenario:** a switch is unreachable after a management VLAN change. Describe how you would get in from a modern laptop with only USB-C ports.
16. **Scenario:** a user's USB-C cable charges their laptop but the attached monitor stays blank. What is the most likely cause and how would you confirm it?

## Answer key

1. **Universal Serial Bus.**
2. **Low speed at 1.5 Mbps and full speed at 12 Mbps.**
3. **480 Mbps, 5 Gbps, 10 Gbps and 20 Gbps** respectively.
4. **USB 3.0.**
5. **The USB specification does not define an exact maximum length.** The figures are the practical limits for maintaining that throughput.
6. **Standard-A, Standard-B, Mini-B and Micro-B.**
7. **Micro-B** — the 3.0 version has a completely different form factor from the 1.1/2.0 one.
8. **One connector replacing all the earlier types, and a reversible plug** with no correct orientation.
9. **Nothing.** It describes only the physical interface; many different signals can run over it.
10. **In the D-subminiature family the letter is the shell size.** Nine pins use the smaller E shell, but the DB name carried over from the 25-pin connector.
11. **Recommended Standard 232.** Today it is mainly used for **console connections** to legacy switches, routers and firewalls.
12. **RJ45 (carrying serial, not Ethernet), DB-9, or USB.**
13. **TB1: Mini DisplayPort, 10 Gbps per channel over two channels = 20 Gbps. TB2: Mini DisplayPort, 20 Gbps aggregated. TB3: USB-C, 40 Gbps. TB4: USB-C, 40 Gbps with dual-4K video and more PCIe bandwidth.**
14. **3 m over copper, up to 60 m over optical.**
15. **Use the console port.** Chain a USB-to-serial adapter to a DB-9-to-RJ45 console cable, confirm the adapter enumerates as a COM port, open a terminal session and fix the configuration at the prompt.
16. **The cable.** A USB-C connector says nothing about capability, so it may be a charge-only or low-speed cable with no video support. Confirm by swapping in a cable known to carry video, and check that the laptop's port supports video output.
