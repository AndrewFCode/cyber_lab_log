---
title: "A+ Core 1 2.7: Internet Connection Types — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 2.7: satellite (GEO vs LEO), fibre, cable and DOCSIS, DSL, cellular tethering and hotspots, and WISPs."
pubDate: 2026-09-23
tags: ["class-notes", "a-plus", "comptia", "messer", "networking", "internet-connection-types", "satellite", "fibre", "dsl", "cellular"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 2, lesson 2.7 (Internet Connection Types)**

> **Quick reference:** the short version of this lesson is the Internet Connection Types cheat sheet in [A+ Core 1 section 2](/cyber_lab_log/resources/a-plus-core-1/2/). These notes sit alongside the earlier Section 2 lessons (ports, wireless, network services, DNS, DHCP, VLANs and VPNs, network devices, and IP addressing). Objective 2.7 also covers network types (LAN, WAN, PAN and so on), which are taught in a separate lesson.

## Learning objectives

By the end of these notes you should be able to:

1. Name the six connection types in this objective — satellite, fibre, cable, DSL, cellular and WISP — and the medium each one uses.
2. Explain and roughly calculate satellite latency, and why LEO services such as Starlink are faster to respond than GEO.
3. Describe line of sight and rain fade.
4. Explain broadband on a cable network, DOCSIS, and why DSL is asymmetric and distance-limited.
5. Tell tethering apart from a mobile hotspot, and describe a WISP.
6. Choose a connection type for a scenario and identify its security implications.

## 1. The big picture

### 1.1 What a "connection type" actually describes

This lesson is about the link between a home or office network and the internet service provider (ISP), often called the **last mile**. Every type follows the same pattern: customer equipment at the premises converts the LAN's Ethernet into whatever signal the medium needs, and the ISP does the reverse at its end.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|  [Laptop, phone, TV] --- LAN (Ethernet / Wi-Fi) --- [Router]                 |
|                                                        |                     |
|                                               [Customer equipment]           |
|                                     cable modem / ONT / DSL modem / antenna  |
|                                                        |                     |
|                        last mile: satellite, fibre, coax, phone line, radio  |
|                                                        |                     |
|                                                  [ISP network] --- Internet  |
|                                                                              |
+------------------------------------------------------------------------------+
```

The router and modem are often one ISP-supplied box, but they are separate jobs: the router joins networks, and the modem (or ONT, or antenna) handles the physical link.

### 1.2 How to compare them

Four measures separate the types, and exam scenarios nearly always turn on one of them: **bandwidth** (download and upload, quoted separately), **latency** (round-trip time in milliseconds, which matters for calls, gaming and remote desktop), **availability** (does it reach the site at all) and **cost and reliability**. Section 8 compares all six side by side.

## 2. Satellite

### 2.1 How it works

A satellite connection sends data from a dish at the customer's site up to a satellite, which relays it down to a ground station connected to the ISP's network, and the reply comes back the same way. Because the satellite can "see" a huge area of the Earth, this is the connection that works almost anywhere: ships, remote farms, research stations, disaster areas, and places with no cables at all.

### 2.2 Speed and cost

Launching and running satellites is expensive, so satellite internet usually costs more than a comparable terrestrial service. In return you get a perfectly usable connection. The lesson gives around 100 Mbps down and 5 Mbps up as a common figure; newer low-orbit services often do better than that on upload. It is the natural choice wherever cable, phone lines and mobile coverage don't reach.

### 2.3 Latency: why traditional satellite is slow to respond

Latency is where satellite has historically struggled. Traditional satellite services use **geostationary (GEO)** satellites, which orbit at about 35,786 km — the height at which a satellite takes exactly one day to orbit, so it appears fixed in the sky and a dish can be pointed at it permanently. That distance is enormous, and even radio waves travelling at the speed of light take a noticeable time to cover it.

Newer services such as Starlink use **low Earth orbit (LEO)** satellites, around 550 km up. The satellites move across the sky, so the dish tracks them electronically and hands over from one to the next, and many more satellites are needed to cover the planet. The payoff is far lower latency. Starlink advertises roughly 25 to 60 ms and is working to reduce that further.

```text
+------------------------------------------------------------------------------+
|  GEO (traditional)                      LEO (for example Starlink)           |
|                                                                              |
|  [satellite]  ~35,786 km up             [satellite]  ~550 km up              |
|     /     \   fixed in the sky             /     \   moves across the sky    |
|    /       \                              /       \                          |
| [dish]   [ground station]              [dish]   [ground station]             |
|                                                                              |
|  Dish to ground: ~239 ms                Dish to ground: ~4 ms                |
|  Request + reply: ~480 ms minimum       Advertised total: ~25-60 ms          |
+------------------------------------------------------------------------------+
```

### 2.4 Worked example — how much delay does GEO add?

**Question:** roughly how long does a GEO satellite add to a web request?

1. **One leg.** Radio travels at about 300,000 km per second. One leg (dish up to satellite, or satellite down to ground station) is at least 35,786 km: 35,786 / 300,000 = about 0.119 seconds, or **119 ms**.
2. **One direction.** Your request goes up and then down: 2 × 119 = about **239 ms**. That is the "quarter of a second" figure.
3. **There and back.** The reply has to make the same trip in reverse: 2 × 239 = about **477 ms**.
4. **Reality.** Those numbers assume the satellite is directly overhead and ignore processing, queueing and the distance from the ground station to the actual server. Real GEO round trips are commonly around 600 ms.

The same sum for LEO at 550 km gives about 3.7 ms each way — the rest of Starlink's 25 to 60 ms is routing, processing and the terrestrial part of the path.

> **Exam tip:** satellite means **high latency** (GEO around half a second or more), **line of sight** needed, and **rain fade**. If a scenario says "remote location, VoIP calls are laggy", satellite latency is the likely cause.

> **Note (beyond this lesson):** the lesson describes the delay as "a quarter of a second up and a quarter of a second down". More precisely, a quarter of a second is the whole one-way trip (dish, satellite, ground station); the single hop up to the satellite is only about 120 ms. The half-second total is right for a request and its reply.

### 2.5 Line of sight and rain fade

A satellite dish needs a clear, unobstructed view of the sky in the satellite's direction. Trees, buildings and hills can block the signal — this requirement is called **line of sight**. For GEO that means one fixed direction; for LEO it means a wide patch of open sky, because the satellites move.

Heavy rain and storms can also weaken the signal enough to slow or drop the connection. This is called **rain fade**.

> **Note (beyond this lesson):** rain fade happens because the high radio frequencies satellite internet uses (the Ku and Ka bands) are absorbed and scattered by water droplets. The heavier the rain, the bigger the loss.

> **In the real world:** when a satellite customer reports that the internet "drops out when it pours", that is rain fade, not a faulty router. Check the dish's alignment and for new obstructions, such as a tree that has grown, before replacing equipment.

## 3. Fibre

### 3.1 Light in glass

Fibre optic cable carries data as pulses of light through strands of glass thinner than a hair. It is one of the fastest and most efficient ways to move very large amounts of data, and it does so over much longer distances than copper can manage.

### 3.2 The trade-offs

Fibre costs more than copper: the cable, the equipment at each end, and repairs (splicing a broken fibre needs specialist tools and training) are all dearer. In exchange you get more bandwidth and longer runs.

### 3.3 Fibre in wide area networks

Because a single pair of fibres can carry so much, fibre is the standard for **wide area networks (WANs)** — links across a city or between cities. The lesson mentions two technologies here:

- **SONET rings** — a standard for carrying data over fibre, usually laid out as a ring so that if the fibre is cut at one point, traffic can go round the other way.
- **Multi-wavelength fibre** — sending several different colours (wavelengths) of light down the same fibre at once, each carrying its own stream of data. This multiplies the capacity of fibre that is already in the ground.

> **Note (beyond this lesson):** SONET is the North American standard; Europe and much of the world use the closely related **SDH**. Multi-wavelength fibre is usually called **wavelength division multiplexing**, and the dense form (**DWDM**) can put dozens of wavelengths on one fibre.

### 3.4 Fibre to the home

Fibre used to belong to ISPs, telecoms backbones and big corporate networks. Now it often runs all the way to the house. At the premises, a device converts the light signal into electrical Ethernet that the router and the rest of the home network use. That device is the **optical network terminal (ONT)**, covered in the network devices lesson, and it usually marks the demarcation point between the ISP's equipment and yours.

The lesson describes the conversion happening outside the home. In practice the ONT may be outside or inside; in many UK installations it is a small box on an inside wall, fed by a fibre that comes through the wall.

```text
+------------------------------------------------------------------------------+
|  FTTP (fibre to the premises): fibre all the way                             |
|  [Exchange] ===============fibre=============== [ONT] --Ethernet-- [Router]  |
|                                                                              |
|  FTTC (fibre to the cabinet): fibre to the street, copper for the last bit   |
|  [Exchange] ======fibre====== [Street cabinet] --copper phone line-- [Modem] |
|                                                                              |
|  ADSL: copper phone line all the way from the exchange                       |
|  [Exchange] -----------------copper phone line------------------- [Modem]    |
+------------------------------------------------------------------------------+
```

> **Note (beyond this lesson):** in the UK, much of what is sold as "fibre broadband" is actually **FTTC**: fibre to a green street cabinet, then VDSL2 (a fast form of DSL) over the copper phone line to the home. Only **FTTP** is fibre to the building. The distinction matters because FTTC still slows down with distance, just like DSL (section 5).

> **Exam tip:** fibre = highest bandwidth, longest distances, immune to electrical interference, but most expensive to install and repair.

## 4. Cable broadband

### 4.1 Data over the TV cable

Cable internet uses the same coaxial ("coax") cable that brings cable television into a home. The coax plugs into a **cable modem**, which turns the signal into Ethernet for the router and the rest of the network.

### 4.2 What "broadband" means here

The cable company's coax carries many different frequencies at the same time, each one a separate channel. This technique of running multiple signals at different frequencies over one wire is called **broadband**. Some frequencies carry TV channels, some carry voice, and some carry internet data, all on the same copper cable at once — which is why one cable can deliver television, phone and internet to a whole household.

```text
+------------------------------------------------------------------------------+
|  One coax cable, many frequency channels at the same time (simplified)       |
|                                                                              |
|  low frequency ---------------------------------------------> high frequency |
|  [upstream data] [ TV channels ....... ] [ downstream data ] [ more TV ... ] |
|                                                                              |
|  The cable modem tunes to the data channels and hands them over as Ethernet  |
+------------------------------------------------------------------------------+
```

### 4.3 DOCSIS

The standard that defines how data travels over cable networks is **DOCSIS**: the **Data Over Cable Service Interface Specification**. It has been through several versions, each faster than the last, and your cable modem must support the version (or a later one) that your provider uses to get the full speed.

> **Note (beyond this lesson):** the versions you are likely to meet are DOCSIS 3.0 (bonded channels, around 1 Gbps down in practice), DOCSIS 3.1 (up to about 10 Gbps down and 1–2 Gbps up), and DOCSIS 4.0 (up to about 10 Gbps down and 6 Gbps up). Home plans are usually well below these ceilings.

### 4.4 Speeds

Cable plans typically range from around 50 Mbps to 1 Gbps and beyond, with TV and phone services on the same wire.

> **Note (beyond this lesson):** the coax in a street is shared, so homes in one area share capacity and speeds can dip at busy times.

## 5. DSL

### 5.1 Data over the phone line

**DSL (Digital Subscriber Line)** uses the copper telephone line that already runs to most homes. The phone company adds digital data at frequencies above those used for voice, so the same line can carry calls and internet at the same time. You will often see it called **ADSL (Asymmetric Digital Subscriber Line)**.

### 5.2 Why "asymmetric"?

It is asymmetric because the download speed is much higher than the upload speed. That suits typical home use — people download far more than they upload — but it hurts anyone who sends large files, backs up to the cloud or uploads video.

### 5.3 Worked example — the cost of a slow upload

**Question:** on a line that downloads at 200 Mbps and uploads at 20 Mbps, how long does it take to download and to upload a 2 GB video file? (Ignore overheads.)

1. **Convert to bits.** 2 GB = 2,000 MB, and 2,000 MB × 8 = **16,000 megabits**. Line speeds are quoted in bits; file sizes in bytes.
2. **Download.** 16,000 / 200 = **80 seconds**.
3. **Upload.** 16,000 / 20 = **800 seconds**, or 13 minutes 20 seconds.

The same file takes ten times longer to upload. That ratio, not the headline download figure, is what a video creator or a small office sending backups offsite should look at.

> **Caution:** the 200 Mbps down / 20 Mbps up example in the lesson is a VDSL2-class figure, not ADSL. Classic ADSL tops out at around 8 Mbps down, and ADSL2+ at around 24 Mbps down with roughly 1 Mbps up (up to about 3 Mbps with an extended-upload variant). The asymmetry principle is identical; the numbers just belong to a newer member of the DSL family.

### 5.4 Distance from the central office

DSL speed falls the further the customer is from the **central office** — the telephone company's local building where the lines terminate (in the UK, the **telephone exchange**). The lesson's rule of thumb is that DSL needs you to be within about 10,000 feet of the central office, which is roughly 3 km.

> **Note (beyond this lesson):** 10,000 feet is the exam's working figure. Basic ADSL can work at greater distances, at low speeds, while the fastest VDSL2 speeds need a copper run of well under a kilometre. That is why FTTC puts the DSL equipment in a street cabinet: it shortens the copper.

## 6. Cellular

### 6.1 Using the mobile network

Cellular internet uses the same infrastructure as mobile phones. The country is divided into small areas called **cells**, each served by an antenna, and the cells are linked together so a device can move between them without losing its connection.

### 6.2 Tethering and mobile hotspots

A phone with mobile data can share that connection with other devices. The lesson draws a clear distinction:

| | Tethering | Mobile hotspot |
|---|---|---|
| Devices served | One (one-to-one) | Several at once |
| Typical link | USB cable, Bluetooth or Wi-Fi | Wi-Fi |
| What the phone acts as | A modem for one device | A small Wi-Fi access point and router |

```text
+------------------------------------------------------------------------------+
|  Tethering (one-to-one)                Mobile hotspot (one-to-many)          |
|                                                                              |
|  [Laptop] --USB/BT/Wi-Fi-- [Phone]     [Laptop]   [Tablet]   [Console]       |
|                               |             \         |         /            |
|                         cellular network     \----- [Phone] ---/             |
|                               |                       |                      |
|                           Internet              cellular network             |
|                                                       |                      |
|                                                   Internet                   |
+------------------------------------------------------------------------------+
```

Not every mobile plan allows tethering or hotspot use, and some carriers charge extra or cap it separately. Check with the carrier before relying on it.

> **Exam tip:** "tethering" = one device; "hotspot" = many devices at once. In everyday speech people use "tethering" for both, but the exam draws the line.

> **Note (beyond this lesson):** many mobile networks use **carrier-grade NAT (CGNAT)**, where lots of customers share one public IPv4 address. It is one reason a mobile connection usually can't accept incoming connections (no port forwarding), and it makes an IP address in a log much less useful for identifying a single user.

## 7. Wireless internet service providers (WISPs)

### 7.1 When cables won't reach

In some places it is hard to get a cable from the cable company or even a phone line from the telephone company. A **wireless internet service provider (WISP)** fills that gap by delivering internet over radio instead of cables. It is ideal for remote locations with no other provider, and it is simple to set up: the customer mostly needs an antenna pointed at the WISP's network.

### 7.2 What the WISP network might use

The lesson names three possibilities:

- **Meshed 802.11** — the same Wi-Fi standards used in homes and offices, with access points linked together into a mesh that covers a wide area.
- **5G home internet** — a mobile network operator acting as the ISP, delivering fixed home broadband over its 5G network.
- **Proprietary wireless** — the WISP's own radio technology.

### 7.3 Equipment and speed

An antenna is mounted outside the building and pointed at the WISP's tower or access point; a cable runs from it to the router inside. Speeds vary widely, from about 10 Mbps up to 1,000 Mbps, depending on the technology, the distance and what is in the way.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|  [Router] --cable-- [Outdoor antenna]  ))) radio link (((  [WISP tower]      |
|    inside            on roof or wall                            |            |
|                                                          WISP backbone       |
|                                                                 |            |
|                                                             Internet         |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **Note (beyond this lesson):** fixed wireless links usually also need line of sight, or something close to it, between the customer's antenna and the tower. Hills, new buildings and even trees coming into leaf can reduce performance.

## 8. Comparing and choosing

### 8.1 Side by side

| Type | Medium | Speeds from the lesson | Latency | Main weakness | Typical use |
|---|---|---|---|---|---|
| Satellite (GEO) | Radio to a satellite ~35,786 km up | ~100 / 5 Mbps | ~600 ms | Latency, rain fade, line of sight, cost | Anywhere nothing else reaches |
| Satellite (LEO) | Radio to satellites ~550 km up | Varies by plan | ~25–60 ms | Needs open sky, cost | Remote homes and sites |
| Fibre | Light in glass | Highest of all | Very low | Cost to install and repair | WANs, businesses, FTTP homes |
| Cable | Coax, DOCSIS | ~50 Mbps to 1 Gbps+ | Low | Shared with the neighbourhood | Homes and small offices |
| DSL | Copper phone line | e.g. 200 / 20 Mbps (VDSL2) | Low | Asymmetric; slows with distance | Homes near an exchange or cabinet |
| Cellular | Mobile network | Varies with signal | Low to moderate | Coverage, data caps, carrier rules | On the move, backup links |
| WISP | Radio to a local tower | ~10–1,000 Mbps | Low to moderate | Line of sight, weather, range | Rural areas without cables |

### 8.2 Worked example — choosing for three sites

**Site A:** a hill farm with no cable TV, no usable phone line, no mobile signal, but clear sky and a view of a WISP mast 6 km away on a neighbouring hill.
- **WISP**: usually cheaper than satellite, lower latency than GEO, and only an outdoor antenna to install. LEO satellite is the fallback if the radio path is blocked.

**Site B:** a video production office in a town centre that uploads large files to clients every day.
- Upload speed matters most, so asymmetric DSL is a poor fit. **Fibre (FTTP)**, often symmetric, is the answer; a high-tier cable plan is second choice.

**Site C:** a remote research station with no terrestrial links at all, where staff make daily video calls.
- Only **satellite** reaches. Video calls need low latency, so choose **LEO** (25 to 60 ms) over GEO (around 600 ms).

### 8.3 Worked example — measuring latency yourself

You can see the difference between connection types with a plain ping to a well-known server. The time on each reply is the round-trip latency in milliseconds.

```powershell
Test-Connection 1.1.1.1 -Count 4      # PowerShell (Latency or ResponseTime column)
ping -n 4 1.1.1.1                     # Windows Command Prompt
```

```bash
ping -c 4 1.1.1.1                     # Linux and macOS
```

Fibre and cable typically show a few milliseconds to a nearby server; LEO satellite shows tens of milliseconds that jump around as the dish hands over between satellites; GEO satellite shows around 600 ms whatever the server, because the satellite hop dominates. `tracert` (Windows) or `traceroute` (Linux) shows where along the path the delay begins.

## 9. Security perspective

Each connection type changes where your network's edge is, who controls the equipment on it, and what an attacker or outage can do to it.

- **The customer equipment is your perimeter.** Cable modems, ONTs, DSL routers and WISP antennas are all network devices exposed to the ISP side, and many are managed remotely by the ISP. Change default passwords on anything you control, keep firmware updated, and know which box is yours and which belongs to the ISP (the demarcation point).
- **Don't assume the link is encrypted.** The connection type is only transport. Researchers have repeatedly found traffic crossing some GEO satellite links unencrypted, and cable, DSL and WISP providers can all see unencrypted traffic on their networks. Rely on end-to-end encryption (HTTPS, TLS, a VPN) rather than the carrier.
- **Tethering and hotspots bypass the corporate edge.** A work laptop on a phone's hotspot skips the office firewall, web filter, data loss prevention and logging. A laptop connected to the wired LAN and a hotspot at the same time can bridge the corporate network to an unmonitored path. Control it with policy and device management, and watch for unexpected Wi-Fi networks near sensitive areas.
- **A hotspot is an access point.** It needs WPA2 or WPA3, a strong passphrase, and switching off when not in use; an open hotspot lets anyone nearby join the same network as your laptop.
- **CGNAT muddies attribution.** On mobile and some other networks, one public IP address may represent hundreds of customers, so blocking or investigating by IP address can hit the wrong people or miss the right one.
- **Availability is security too.** Rain fade, a cut fibre or a failed modem take the business offline. A second connection of a *different* type (for example fibre plus cellular failover) on a different physical path is the defence; two services on the same duct share the same single point of failure.
- **Latency breaks things quietly.** GEO latency can push VPN, VoIP and remote desktop sessions past their timeouts; measure it before blaming the application.

## Summary

- Internet connection types are the last-mile links between a premises and the ISP; compare them on bandwidth, latency, availability and cost.
- **Satellite** reaches almost anywhere but costs more. GEO adds roughly half a second or more of round-trip latency; LEO (Starlink) advertises around 25 to 60 ms. It needs line of sight and suffers rain fade.
- **Fibre** carries data as light: the highest bandwidth over the longest distances, but the most expensive to install and repair. SONET rings and multi-wavelength fibre carry WAN traffic; FTTP ends at an ONT.
- **Cable** uses coax and broadband (many frequencies on one wire) to deliver TV, voice and data. DOCSIS is the data standard; speeds run from about 50 Mbps to 1 Gbps and beyond.
- **DSL** puts data on the phone line. ADSL is asymmetric (download much faster than upload), and speed falls with distance from the central office — the exam figure is about 10,000 feet.
- **Cellular** uses the mobile network. Tethering shares a phone's connection with one device; a mobile hotspot shares it with several.
- **WISPs** deliver internet by radio to an outdoor antenna using meshed 802.11, 5G home internet or proprietary links, at roughly 10 to 1,000 Mbps.

## Glossary

| Term | Meaning |
|---|---|
| Last mile | The link between a customer's premises and the ISP's network |
| Latency | The time a packet takes to reach its destination and come back, in milliseconds |
| GEO | Geostationary orbit, about 35,786 km up; the satellite appears fixed in the sky |
| LEO | Low Earth orbit, a few hundred kilometres up; used by Starlink at about 550 km |
| Line of sight | An unobstructed path between a transmitter and a receiver |
| Rain fade | Loss of satellite signal strength caused by rain and storms |
| Fibre optics | Transmitting data as pulses of light through glass fibre |
| SONET | A standard for carrying data over fibre, often in self-healing rings (SDH in Europe) |
| Multi-wavelength fibre | Several colours of light on one fibre, each carrying its own data (WDM / DWDM) |
| ONT | Optical network terminal; converts fibre to Ethernet at the premises |
| Broadband | Many signals at different frequencies on one cable at the same time |
| DOCSIS | Data Over Cable Service Interface Specification; the standard for data over cable TV networks |
| Cable modem | The device that converts the coax signal to Ethernet |
| DSL | Digital Subscriber Line; data carried over a copper telephone line |
| ADSL | Asymmetric DSL; download much faster than upload |
| Central office | The telephone company's local building where lines terminate (the exchange, in the UK) |
| Tethering | Sharing a phone's mobile data with one other device |
| Mobile hotspot | A phone sharing its mobile data with several devices over Wi-Fi |
| WISP | Wireless internet service provider; internet delivered by radio to an outdoor antenna |
| CGNAT | Carrier-grade NAT; many customers sharing one public IPv4 address |

## Review questions

1. What two problems does a satellite connection have that a fibre connection does not, apart from latency?
2. Why does a traditional GEO satellite connection add about half a second of latency to a request and its reply?
3. What latency range does Starlink advertise, and why is it so much lower than GEO?
4. What does DOCSIS stand for, and which connection type uses it?
5. In the context of cable internet, what does "broadband" mean?
6. Why is ADSL described as asymmetric?
7. What is the difference between tethering and a mobile hotspot?
8. Name the three technologies the lesson says a WISP network might use.
9. A line downloads at 200 Mbps and uploads at 20 Mbps. Roughly how long does uploading a 1 GB file take?
10. **Scenario:** a satellite customer says the connection works fine most of the time but drops during heavy storms. What is the cause, and what should you check before replacing any equipment?
11. **Scenario:** two neighbours pay for the same DSL package, and one is much slower. The routers and internal wiring are fine. What is the most likely reason?
12. **Scenario:** a small business in a rural valley has no cable or phone line, but it has a clear view of a hilltop radio mast run by a local provider. Which connection type fits best?
13. **Scenario:** a user's work laptop is plugged into the office network and also connected to their phone's hotspot. Why is the security team concerned?
14. **Scenario:** a company wants its internet connection to survive a cut fibre in the street. What should it add?

## Answer key

1. **Line of sight and rain fade.** The dish needs a clear view of the sky, and heavy rain weakens the signal.
2. **Distance.** The signal travels about 35,786 km up and the same back down each way — about 239 ms in each direction, so about 480 ms for a request and reply before any processing.
3. **About 25 to 60 ms.** Starlink's LEO satellites orbit only about 550 km up, so the radio path is far shorter.
4. **Data Over Cable Service Interface Specification;** it is used by cable (coax) internet.
5. **Many frequencies carrying different signals on the same cable at once,** so TV, voice and data can share one coax.
6. **The download speed is much higher than the upload speed.**
7. **Tethering shares the phone's connection with one device; a hotspot shares it with several at once,** usually over Wi-Fi.
8. **Meshed 802.11, 5G home internet, and proprietary wireless.**
9. **About 400 seconds (6 minutes 40 seconds):** 1 GB = 8,000 megabits, and 8,000 / 20 = 400.
10. **Rain fade.** Check the dish alignment and for new obstructions to line of sight; the router is not the fault.
11. **A longer or poorer copper run to the exchange or cabinet.** DSL speed depends on distance, and neighbours can be on different cables.
12. **A WISP** — an outdoor antenna pointed at the provider's mast, with no cables needed.
13. **The hotspot bypasses the corporate firewall, filtering and logging,** and a dual-connected laptop can bridge the office network to an unmonitored path.
14. **A second connection of a different type on a different physical path,** such as cellular failover, so one cut doesn't take both down.
