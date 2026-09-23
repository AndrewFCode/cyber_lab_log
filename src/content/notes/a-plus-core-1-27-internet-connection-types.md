---
title: "A+ Core 1 2.7: Internet Connection Types — Class Notes"
description: "Full class notes for A+ Core 1: satellite, fibre, cable/DOCSIS, DSL, cellular tethering/hotspots and WISPs."
pubDate: 2026-09-23
tags: ["class-notes", "a-plus", "comptia", "messer", "internet-connections", "satellite", "fibre", "dsl", "cable", "wisp"]
draft: false
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 2, lesson 2.7**

> This lesson maps to CompTIA A+ Core 1 objective 2.7, "Compare and contrast Internet connection types, network types, and their features." Full reference: [Section 2](/cyber_lab_log/resources/a-plus-core-1/2/).

## Learning objectives

By the end of these notes you should be able to:

1. Describe how satellite internet works and explain why latency and "rain fade" occur.
2. Explain why fibre optic connections outperform copper for both speed and distance.
3. Describe broadband cable internet and the role of DOCSIS.
4. Explain DSL, why it is "asymmetric," and how distance from the central office affects speed.
5. Distinguish cellular tethering from a mobile hotspot.
6. Explain what a WISP is and when it is the right choice.
7. Compare all these connection types by typical speed, cost and use case.

## 1. Satellite internet

Satellite internet works by sending a signal from a ground station or dish up to a satellite orbiting the Earth, which then relays the signal back down to another point on the ground. This lets people get online almost anywhere, including remote areas with no other wired infrastructure.

Because launching and operating satellites is expensive, satellite internet costs more than most terrestrial options. In exchange, a typical satellite connection offers speeds around 100 Mbps down and 5 Mbps up — perfectly usable for general browsing, though the upload side is comparatively weak.

### 1.1 Latency and rain fade

The biggest drawback of traditional (older, higher-orbit) satellite internet is latency. Because the signal has to travel such a long physical distance into space and back, older systems see roughly a quarter of a second of delay in each direction — around half a second round trip. This makes latency-sensitive activities like real-time gaming or video calls noticeably laggy.

Newer low-Earth-orbit systems, such as Starlink, fly much closer to the planet, cutting that latency dramatically — down to roughly 25–60 milliseconds, with ongoing work to reduce it further.

Satellite links also require line of sight between the dish and the satellite, so obstructions (trees, buildings) can break the connection. Heavy weather, particularly large storms, can degrade or interrupt the signal — a phenomenon known as **rain fade**.

```text
                 satellite
                    ___
                   /   \
                  | SAT |
                   \___/
                  /     \
                 /       \
          uplink/         \downlink
               /           \
              /             \
        dish (you)      ground station
```

> **Exam tip:** If a question mentions "rain fade" or long-distance latency for internet access in a remote area, the answer is satellite.

## 2. Fibre optic connections

Fibre optic internet transmits data as pulses of light through thin glass or plastic fibres, rather than as electrical signals over copper. This gives it two big advantages: very high bandwidth and the ability to travel much longer distances without the signal degrading, compared to copper cabling.

The trade-off is cost. Fibre and the equipment needed to connect to it (transceivers, specialised installation, splicing tools) are more expensive than copper equivalents, and repairs cost more too.

Because a single fibre pair can carry enormous amounts of data over long distances, fibre is the backbone technology for wide area networks — connecting cities to each other or linking sites within a metropolitan area, often using technologies like SONET rings or multi-wavelength (DWDM-style) fibre links.

Fibre used to be confined to these large-scale backbone and corporate core uses, but it is now commonly run directly to homes ("fibre to the premises"). Often there is a media converter just outside the home that converts the incoming fibre signal to copper (Ethernet) for use inside the house.

> **In the real world:** the box on the outside wall converting fibre to Ethernet is usually called an ONT (Optical Network Terminal) — this term itself is not from this transcript, but it is the standard name for that device.

> **Note (beyond this lesson):** this lesson does not name the ONT explicitly; that label is added here for reference since it is the industry-standard term for the device described.

## 3. Broadband cable

Cable internet reuses the same coaxial cable used for cable television. A cable modem connects to this line and provides a standard Ethernet connection to your router or devices.

The cable carries many different frequencies simultaneously — this is what makes it "broadband": multiple signal types (voice, video, data) can travel down the same physical wire at once, each on its own frequency band, without interfering with each other.

The standard governing how data is transmitted over these cable networks is **DOCSIS** (Data Over Cable Service Interface Specification). Different DOCSIS versions provide different maximum speeds and features.

Typical cable internet speeds range from around 50 Mbps up to 1 Gbps or higher, and because it shares the cable company's infrastructure, the same connection can also deliver TV and telephone service.

## 4. DSL (Digital Subscriber Line)

DSL delivers internet access over the same copper telephone line already used for voice calls, by adding a digital data signal onto that line. The most common variant is **ADSL** — Asymmetric Digital Subscriber Line.

It is called "asymmetric" because download speed is significantly higher than upload speed. A typical example given is around 200 Mbps download but only 20 Mbps upload.

DSL performance also depends heavily on distance from the telephone company's central office: the further away the subscriber is, the slower the achievable speed. DSL generally requires the subscriber to be within about 10,000 feet of the central office to get usable service.

> **Exam tip:** if a question emphasises "different upload vs download speeds," think DSL (or ADSL specifically). If it emphasises "distance from the central office matters," that is also a DSL giveaway.

## 5. Cellular internet: tethering and hotspots

Cellular data internet uses the same cell-tower infrastructure as mobile phone networks — geography is divided into cells, each served by an antenna, and the cells are linked together to provide continuous coverage.

Two ways to share a phone's cellular data connection with other devices:

- **Tethering**: a one-to-one connection, where a single other device (e.g. a laptop) is connected to the phone (via cable, Bluetooth or Wi-Fi) and uses the phone's data connection.
- **Mobile hotspot**: the phone shares its cellular data connection with multiple devices at once, typically over Wi-Fi.

Carriers may restrict or charge extra for either feature, so it is worth checking with the mobile provider about availability and cost before relying on it.

## 6. WISPs (Wireless Internet Service Providers)

In areas where wired options (cable, DSL, fibre) are not available or practical, a WISP provides internet access wirelessly. This is a common solution for rural or remote locations.

Setting up a WISP connection is comparatively simple: an outdoor antenna pointed at the WISP's transmission equipment is usually all that is needed to establish a link.

The underlying wireless technology can vary:

- A meshed 802.11 (standard Wi-Fi) network.
- A 5G home internet connection, where a mobile carrier acts as the ISP.
- Other proprietary wireless technologies specific to that WISP.

Typical WISP speeds range from around 10 Mbps up to 1,000 Mbps (1 Gbps), depending on the technology and equipment used.

## 7. Comparing connection types

| Type      | Typical speed              | Latency          | Best for                          |
|-----------|-----------------------------|-------------------|-------------------------------------|
| Satellite | ~100 Mbps down / 5 Mbps up  | High (older); low with LEO (Starlink) | Remote areas, no other option available |
| Fibre     | Very high (multi-Gbps)      | Low               | Homes and backbone/WAN links       |
| Cable     | 50 Mbps – 1 Gbps+            | Low               | Homes and businesses with cable infrastructure |
| DSL       | Up to ~200 Mbps down (asymmetric) | Low          | Areas with phone lines, close to central office |
| Cellular  | Varies by carrier and generation | Low–moderate | Mobile use, tethering/hotspot backup |
| WISP      | ~10–1000 Mbps                | Low–moderate     | Rural areas without wired options  |

## 8. Security perspective

Internet connection type affects the attack surface and risk profile in a few practical ways relevant to a help desk technician or defender:

- **Shared infrastructure (cable, WISP):** because cable broadband and some WISP setups share physical medium or spectrum among many subscribers, misconfigured or older equipment can occasionally expose traffic to neighbours; modern DOCSIS and encrypted wireless links mitigate this, but it is a reason to verify encryption is enabled end to end rather than relying purely on the link layer.
- **Mobile hotspots and tethering:** when a technician troubleshoots a "no internet" ticket and finds the user has bypassed a locked-down corporate network by tethering to a personal phone, that is a policy and security concern — it routes traffic outside monitored, filtered corporate infrastructure.
- **WISP and satellite line-of-sight equipment:** physical exposure of outdoor antennas makes them a target for tampering or theft; also worth remembering that these outdoor links are visible and identifiable, which can leak information about a site's location and connectivity to anyone surveying the area.
- **Central office distance (DSL):** knowing that DSL degrades with distance helps a technician distinguish a genuine outage from an expected slow link, avoiding wasted troubleshooting time and unnecessary escalations.

## Summary

- Satellite internet reaches almost anywhere but has higher cost, and historically higher latency (roughly half a second round trip); newer low-orbit systems like Starlink cut latency to tens of milliseconds. Rain fade and line-of-sight requirements are its main weaknesses.
- Fibre optic uses light to carry data, offering very high speed over long distances; it costs more to install and repair than copper but is now common even for home connections, often converted to copper just outside the building.
- Broadband cable reuses coaxial TV cable and carries multiple frequencies (voice, video, data) simultaneously; DOCSIS is the governing standard, with speeds from 50 Mbps to over 1 Gbps.
- DSL runs data over standard phone lines; ADSL is asymmetric (much faster download than upload) and its speed drops the further the subscriber is from the central office (roughly 10,000 feet as a practical limit).
- Cellular data can be shared via tethering (one device) or a mobile hotspot (multiple devices); carriers may charge extra for either.
- WISPs provide wireless internet access, often to rural or remote locations, using technologies such as meshed 802.11, 5G home internet, or proprietary wireless links, with speeds from roughly 10 to 1,000 Mbps.

## Glossary

| Term | Definition |
|---|---|
| ADSL | Asymmetric Digital Subscriber Line — DSL variant with faster download than upload |
| Broadband | Transmitting multiple signal frequencies over one shared medium simultaneously |
| Central office | The telephone company facility that DSL performance depends on distance from |
| Cellular network | Internet/phone service delivered via geographically divided cell towers |
| Coaxial cable | Copper cable used by cable TV/internet providers |
| DOCSIS | Data Over Cable Service Interface Specification — standard for cable internet |
| DSL | Digital Subscriber Line — internet delivered over telephone lines |
| Fibre optic | Data transmission using light through glass or plastic fibre |
| Latency | The time delay for data to travel from sender to receiver and back |
| Line of sight | Unobstructed visual/signal path, required for satellite and some WISP links |
| Mobile hotspot | Sharing a phone's cellular data with multiple devices at once |
| Rain fade | Satellite signal degradation caused by heavy weather |
| Satellite internet | Internet access via signals relayed through an orbiting satellite |
| SONET | A fibre-based standard used for high-speed metropolitan/wide area networking |
| Starlink | A low-Earth-orbit satellite internet service with lower latency than traditional satellite |
| Tethering | Sharing a phone's cellular data connection with a single other device |
| WISP | Wireless Internet Service Provider — delivers internet via wireless links, often to remote areas |

## Review questions

1. Why does satellite internet typically have higher latency than fibre or cable?
2. What is "rain fade," and which connection type is it associated with?
3. Roughly how much latency did Starlink advertise, compared to traditional satellite systems?
4. Why is fibre described as "asymmetric" — or is it? Compare with DSL.
5. What does DOCSIS stand for, and what technology does it govern?
6. Why is cable internet called "broadband"?
7. What does "asymmetric" mean in the context of ADSL, and give an example speed pair.
8. How does distance from the central office affect DSL performance?
9. What is the difference between tethering and a mobile hotspot?
10. Name three underlying wireless technologies a WISP might use.
11. Why is fibre more expensive than copper, despite offering better performance?
12. A remote farmhouse has no cable or phone line access but has clear sky visibility. Which two connection types from this lesson might work, and what is the key trade-off between them?
13. A user complains their DSL is much slower than advertised. What two DSL-specific factors should a technician check first?
14. What typical speed range would you expect from a satellite connection, and how does it compare to a typical cable connection?

## Answer key

1. **Because the signal must travel a very long physical distance up to a satellite and back down.** This adds significant round-trip delay compared to terrestrial links.
2. **Rain fade — associated with satellite internet.** Heavy storms can disrupt the satellite signal.
3. **Roughly 25–60 milliseconds, versus about half a second (500 ms) for traditional satellite.** Starlink's lower orbit reduces the distance the signal must travel.
4. **Fibre is not described as asymmetric in this lesson — DSL is.** Fibre's main trade-off is cost and installation complexity, not upload/download imbalance.
5. **Data Over Cable Service Interface Specification — it governs how data is sent over cable (coaxial) internet connections.**
6. **Because multiple frequencies carrying different traffic (voice, video, data) run simultaneously over the same cable.**
7. **Download speed is much higher than upload speed; the example given was 200 Mbps down versus 20 Mbps up.**
8. **The further from the central office, the slower the DSL connection; DSL generally needs to be within about 10,000 feet of the central office.**
9. **Tethering shares a phone's data connection with one other device; a mobile hotspot shares it with multiple devices at once.**
10. **Meshed 802.11 Wi-Fi, 5G home internet, and proprietary wireless technology.**
11. **Because fibre and its connecting equipment cost more to buy and repair than copper, even though it offers much higher speed and distance capability.**
12. **Satellite or WISP.** Satellite works almost anywhere with sky visibility but costs more and (for traditional systems) has higher latency; a WISP is cheaper and lower latency but requires an antenna with line of sight to a WISP transmitter, which may not exist in every remote area.
13. **Distance from the central office, and confirm nothing is degrading the copper line itself** — both directly affect achievable DSL speed.
14. **Around 100 Mbps down / 5 Mbps up for satellite, versus 50 Mbps up to 1 Gbps or higher for cable** — cable generally offers substantially higher throughput where available.
