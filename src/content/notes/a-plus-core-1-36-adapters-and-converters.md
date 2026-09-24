---
title: "A+ Core 1 3.2: Adapters and Converters — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: DVI-D to HDMI and DVI-A to VGA compatibility, USB-to-Ethernet and USB-C-to-USB-A adapters, and USB hubs."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "adapters", "converters", "dvi", "usb"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (Adapters and Converters)**

> **Quick reference:** the short version of this lesson is the Adapters and Converters cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It is the closing lesson of objective 3.2, drawing together the video cables, peripheral cables, network cables and storage cables lessons earlier in this section — this one is about bridging between them when the exact cable you need is not in the bag.

## Learning objectives

By the end of these notes you should be able to:

1. Explain the difference between an adapter and a converter, in the sense this lesson uses the terms.
2. Explain why DVI-D and HDMI can be joined with a simple cable, with no active conversion.
3. Explain why DVI-A and VGA are compatible, and the resolution limitation involved.
4. Explain why moving from analogue VGA to digital DVI needs real signal conversion.
5. Explain why USB-to-Ethernet adapters exist and when you would reach for one.
6. Explain why USB-C-to-USB-A adapters exist and what problem they solve.
7. Describe what a USB hub offers beyond a single adapter.
8. Choose the right adapter or converter for a described connectivity gap.

## 1. Bridging the gap

### 1.1 The everyday problem

In IT work, you will regularly need a particular cable or connector that is not in your toolbag. Rather than carrying every possible cable, you can often combine devices, cables and adapters to build the interface you actually need.

### 1.2 Two different situations

The lesson draws a useful distinction, even though it uses "adapter" and "converter" somewhat loosely throughout:

| Situation | What is happening |
|---|---|
| **Electrically compatible** | The two ends speak the same underlying signal; you only need a cable or plug with the right shape on each end |
| **Format conversion** | The two ends use genuinely different signal types; something has to do real processing — and may need power — to translate between them |

The first case is just a shape problem. The second is a real translation job, and that distinction is what determines whether a simple, cheap, passive adapter will do the work or whether you need something active.

### 1.3 Temporary, but not always

Most of these adapters and converters are meant for **temporary use** — bridging a gap until the right cable or the right device turns up. In practice, some end up staying in place permanently, simply because they work and nobody replaces them.

## 2. DVI to HDMI

### 2.1 Why this pairing is easy

During the transition from DVI to HDMI, **DVI-to-HDMI cables and adapters** were extremely common. The reason they work so simply is that **DVI-D** (the digital variant of DVI) and **HDMI** are **electrically compatible** — both are digital standards built on the same underlying signalling.

That means a cable with DVI-D on one end and HDMI on the other carries the video signal across with **no conversion at all**. It is purely a connector-shape problem, not a format problem.

### 2.2 Cable versus small adapter

The lesson notes that a compact DVI-to-HDMI **adapter** does the same job as the **cable**, just in a much smaller physical form — a short adapter block rather than a full cable run. Functionally they are equivalent; which one you use is a matter of convenience and the distance involved.

> **Caution:** this compatibility is specifically **DVI-D** to HDMI. DVI-A carries no digital signal at all, so a DVI-A source cannot be adapted to HDMI this way — there is nothing digital to pass through. Check which DVI variant you are actually working with before assuming an adapter will help; the peripheral cables and video cables lessons cover the DVI-A/D/I distinction in detail.

> **Note (beyond this lesson):** because HDMI also carries audio and DVI does not, a DVI-to-HDMI link carries **video only**, even though the far end is an HDMI socket. Anyone expecting sound over that connection needs a separate audio cable.

## 3. DVI to VGA

### 3.1 Why DVI-A and VGA get along

**DVI-A**, the analogue variant of DVI, is compatible with **VGA** because both are **analogue** signals of the same underlying type. A simple adapter — changing the physical connector from the 15-pin VGA shape to the larger DVI shape — is generally enough, without any active signal conversion.

### 3.2 The resolution limitation

This compatibility comes with a specific limit: **officially, only 640 × 480 resolution is supported** when adapting between DVI-A and VGA this way.

> **Note (beyond this lesson):** 640 × 480 is the figure from the formal specification and from Professor Messer's own published course material. In practice, many real DVI-A-to-VGA and DVI-I-to-VGA adapters and cables on the market advertise and deliver considerably higher resolutions — figures like 1600 × 1200 are commonly quoted by cable manufacturers — because the analogue signal itself is not actually limited to 640 × 480; the formal DVI specification's guarantee is what is capped there. For the exam, know the specified figure of **640 × 480**; in the field, treat the true ceiling on any given adapter as whatever its documentation states, and test it.

### 3.3 Going the other direction: analogue to digital

Moving from **VGA (analogue) to DVI-D or DVI-I on the digital side (digital)** is a different problem entirely. Because the source and destination use fundamentally different kinds of signal, this direction genuinely needs **signal conversion** — an active device doing real electrical translation, not just a shape change.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   DVI-D  <---- electrically compatible ---->  HDMI                           |
|            (digital to digital: passive)                                     |
|                                                                              |
|   DVI-A  <---- electrically compatible ---->  VGA                            |
|            (analogue to analogue: passive, capped at 640x480 officially)     |
|                                                                              |
|   VGA (analogue) ----X---- DVI-D (digital)                                   |
|            (different signal types: needs ACTIVE conversion)                 |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **Exam tip:** the pattern to remember is **"same signal type, different shape" = passive adapter is enough; "different signal type" = needs active conversion.** Apply that rule and most adapter questions in this section resolve themselves without memorising every individual pairing.

### 3.4 Worked example — choosing the right converter

**Scenario:** you have three separate connectivity gaps to fix in one afternoon: (1) a DVI-D graphics output needs to reach an HDMI-only projector; (2) an old VGA monitor needs to connect to a DVI-A output on a video card; (3) a modern laptop with only DisplayPort needs to drive that same old VGA monitor.

1. **Gap 1 (DVI-D to HDMI):** both digital — a simple passive cable or adapter works, full video quality, no conversion electronics needed.
2. **Gap 2 (DVI-A to VGA):** both analogue — a simple passive adapter works, but remember the officially supported 640 × 480 ceiling; check the specific adapter's documentation if higher resolution is wanted.
3. **Gap 3 (DisplayPort to VGA):** DisplayPort is digital, VGA is analogue — this needs an **active** DisplayPort-to-VGA adapter that genuinely converts the signal, not a passive one. A passive adapter here simply will not produce an image.
4. **General lesson:** always identify whether both ends are the same fundamental signal type before reaching for a cheap passive adapter — it is the single question that predicts whether the fix will actually work.

## 4. USB to Ethernet

### 4.1 Why this adapter exists

Newer laptops keep getting thinner, and a full-size RJ45 Ethernet port no longer fits in many of their chassis. Wired connectivity is still often needed, though — for reliability, for network troubleshooting, or simply because wireless is not available or not desired. A **USB-to-Ethernet adapter** solves exactly this: it converts a USB connection on the laptop into a standard Ethernet port.

### 4.2 When you would reach for one

The lesson specifically calls out **network troubleshooting** as a use case. A technician who needs a guaranteed wired connection to directly diagnose a switch port, VLAN or cabling issue cannot rely on Wi-Fi for that diagnosis — Wi-Fi introduces its own variables into exactly the kind of problem being investigated. Carrying a USB-to-Ethernet adapter means wired connectivity is available regardless of what ports the laptop physically has.

> **Note (beyond this lesson):** most USB-to-Ethernet adapters present themselves to the operating system as a standard network interface and need no special driver on modern systems, though older or unusual chipsets sometimes do. Gigabit-capable adapters generally need USB 3.0 or better to avoid the USB link itself becoming the bottleneck — a USB 2.0 port tops out well below a gigabit.

## 5. USB-C to USB-A

### 5.1 Why this adapter exists

The same thinning trend applies to USB ports: many modern laptops have dropped the larger **USB-A** connector entirely in favour of **USB-C** only. But a great deal of existing peripheral hardware — mice, keyboards, flash drives, printers — still uses USB-A plugs. A **USB-C-to-USB-A adapter** bridges that gap.

### 5.2 Two physical forms

These come in more than one shape:

- A **longer cable** with USB-C on one end and USB-A on the other, useful when you also want to move the connection point away from the laptop's small port.
- A **simple compact adapter** plugged directly into the USB-C port, presenting a USB-A socket right there.

Which form suits better depends on whether the priority is convenience at the port or flexibility of positioning.

## 6. USB hubs

### 6.1 Planning for any contingency

When you are not certain exactly what connector type you will need, or simply want to be prepared for a range of possibilities, a **USB hub** is the broader solution. It connects to the laptop over a single USB connection and offers a **number of different outputs** from that one hub.

### 6.2 What a hub can offer

The example in the lesson supports USB, an **SD memory card** slot, **HDMI**, **Ethernet**, and other connection types — all from one hub plugged into one USB port. Rather than carrying several single-purpose adapters, one hub covers a broad range of likely needs.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|                       [ Laptop ] -- single USB / USB-C port                  |
|                              |                                               |
|                              v                                               |
|                        [ USB hub ]                                           |
|                        /   |   |   \                                         |
|                       /    |   |    \                                        |
|                    USB-A  SD   HDMI  Ethernet                                |
|                    ports  slot  out   (RJ45)                                 |
|                                                                              |
|   One connection to the laptop; several outputs available from the hub       |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 6.3 Worked example — packing a technician's bag

**Scenario:** a field technician visits varied client sites and cannot predict in advance what connectivity each site will need — sometimes an old VGA projector, sometimes wired Ethernet for troubleshooting, sometimes a client's USB-A peripheral on a USB-C-only laptop.

1. **Single-purpose adapters** (DVI-to-HDMI, USB-to-Ethernet, USB-C-to-USB-A) are cheap, reliable, and each does exactly one job well — good for a predictable, recurring need.
2. **A well-equipped USB hub** covers several of these needs from one device, at the cost of being a single point of failure — if the hub itself breaks, several capabilities disappear at once.
3. **A sensible bag** carries both: a hub for general-purpose coverage, plus one or two single-purpose adapters for the specific connector types that come up most often at this technician's usual sites.
4. **Label and test everything** before it is needed under time pressure — an adapter that has not been checked in months is a poor thing to discover is faulty in front of a client.

## 7. Security perspective

Adapters and converters are small, easily overlooked devices sitting directly in a data or video path, which makes them worth thinking about defensively.

- **An adapter or hub is an active device on the path, not a passive lump of plastic.** Modern USB hubs, USB-to-Ethernet adapters and active video converters contain their own chips and, in some cases, firmware. A malicious or compromised hub can behave as a keystroke injector, a network tap, or a data-exfiltration point, exactly like any other USB device discussed in the peripheral cables lesson's security section.
- **A USB-to-Ethernet adapter is a new, unmonitored network interface.** It is easy for endpoint security tooling built around a laptop's built-in NIC to treat a USB Ethernet adapter as an unexpected or lower-trust interface. Confirm that network access control, 802.1X and monitoring apply to it the same way they do to the built-in port, rather than assuming coverage.
- **Unknown adapters found lying around should be treated as unknown USB devices,** because that is exactly what they are. A found DVI-to-HDMI adapter is low risk; a found USB hub, USB-to-Ethernet adapter or any adapter with active electronics deserves the same suspicion as a found USB drive.
- **Passive video adapters carry essentially no data-security risk** — a DVI-D-to-HDMI or DVI-A-to-VGA adapter has no processing to compromise, since it does no active conversion. This is a genuine reason to prefer a simple, cheap, passive solution when one is available, beyond mere cost: fewer components capable of misbehaving.
- **Active converters and hubs are supply-chain items.** Buying cheap, unbranded adapters and hubs from unverified sources for use on sensitive networks trades a small cost saving for an unverifiable device sitting in the data path. Procure this category of hardware the same way you would procure any other network- or data-capable device.
- **A hub concentrates risk as well as convenience.** One compromised or faulty hub can simultaneously affect video, network and storage connections at once, since several capabilities run through the single device.

## Summary

- Some connectivity gaps are **electrically compatible** — a simple cable or adapter with the right shapes on each end is enough. Others need genuine **format conversion**, with real processing and sometimes power.
- **DVI-D and HDMI** are electrically compatible (both digital) — a simple cable or small adapter joins them with no conversion, video only.
- **DVI-A and VGA** are electrically compatible (both analogue) — a simple adapter suffices, officially capped at **640 × 480**.
- **VGA (analogue) to DVI-D/DVI-I (digital)** genuinely needs **active signal conversion**, because the underlying signal types differ.
- **USB-to-Ethernet adapters** solve the disappearance of RJ45 ports on thin laptops, and matter especially for **network troubleshooting**, where wired connectivity avoids introducing wireless variables.
- **USB-C-to-USB-A adapters** solve the disappearance of USB-A ports, in either a longer-cable or compact-adapter form.
- A **USB hub** offers several output types — the example covered USB, SD, HDMI and Ethernet — from a single USB connection, good preparation when the exact need is unpredictable.
- Most adapters and converters are meant to be temporary, though some end up permanent by default.

## Glossary

| Term | Meaning |
|---|---|
| Adapter | A device changing a connector's shape between compatible signal types |
| Converter | A device performing real signal translation between different signal types |
| Electrically compatible | Two standards sharing the same underlying signal, needing only a shape change |
| DVI-D | The digital-only variant of DVI |
| DVI-A | The analogue-only variant of DVI |
| DVI-I | The DVI variant carrying both digital and analogue signal |
| Passive adapter | An adapter requiring no active electronics or power |
| Active converter | A device performing genuine signal conversion, often needing power |
| USB-to-Ethernet adapter | Device converting a USB connection into a wired Ethernet port |
| USB-C-to-USB-A adapter | Device or cable letting a USB-C port accept USB-A peripherals |
| USB hub | Device offering several output types from one USB connection |
| SD | Secure Digital; a memory card format some USB hubs can read |
| RJ45 | The connector used for wired Ethernet |

## Review questions

1. What is the difference, as this lesson uses the terms, between an "adapter" situation and a "converter" situation?
2. Why can DVI-D and HDMI be joined with a simple cable and no signal conversion?
3. What resolution limitation applies to a DVI-A-to-VGA adapter, officially?
4. Why is going from VGA to DVI-D genuinely more complicated than DVI-A to VGA?
5. What general rule predicts whether a passive adapter will be enough?
6. Why do USB-to-Ethernet adapters exist?
7. Name a specific IT task where wired connectivity via a USB-to-Ethernet adapter is preferable to relying on Wi-Fi.
8. Why do USB-C-to-USB-A adapters exist?
9. Name two physical forms a USB-C-to-USB-A adapter can take.
10. What did the example USB hub in the lesson support, beyond plain USB?
11. Are most of these adapters meant for permanent or temporary use?
12. Does a DVI-D-to-HDMI adapter carry audio? Why or why not?
13. **Scenario:** a technician needs to connect a DisplayPort laptop output to an old VGA monitor. Will a simple passive adapter work? Why or why not?
14. **Scenario:** a thin ultrabook has no RJ45 port, and the technician needs to troubleshoot a suspected switch port fault. What should be in the bag?
15. **Scenario:** an unfamiliar USB hub is found plugged into a workstation in a shared office. What is the appropriate response?
16. **Scenario:** you need the highest possible resolution from a DVI-A output going to a VGA monitor. What should you do beyond just buying any DVI-A-to-VGA adapter?

## Answer key

1. **"Adapter" describes a shape change between electrically compatible signals; "converter" describes real signal processing between genuinely different signal types,** which may also need power.
2. **They are both digital signals and are electrically compatible,** so no conversion is needed — only a connector shape change.
3. **640 × 480,** officially.
4. **VGA is analogue and DVI-D is digital — different signal types** — so genuine active conversion is required, unlike the analogue-to-analogue DVI-A/VGA pairing.
5. **Same fundamental signal type on both ends = a passive adapter is enough; different signal types = active conversion is needed.**
6. **Thinner modern laptops often no longer have room for a full-size RJ45 port,** but wired connectivity is still sometimes required.
7. **Network troubleshooting** — diagnosing a switch, VLAN or cabling issue needs a guaranteed wired connection, since Wi-Fi would introduce its own variables into that diagnosis.
8. **Many modern laptops have dropped USB-A entirely in favour of USB-C,** but plenty of existing peripherals still use USB-A plugs.
9. **A longer cable with USB-C on one end and USB-A on the other, or a compact adapter plugged directly into the USB-C port.**
10. **SD memory card slot, HDMI, and Ethernet,** among other connection types.
11. **Mostly temporary,** though some remain in permanent use.
12. **No.** DVI carries video only, so even joined to an HDMI socket, the link carries no audio.
13. **No, not a passive one.** DisplayPort is digital and VGA is analogue — different signal types — so this needs an **active** DisplayPort-to-VGA converter.
14. **A USB-to-Ethernet adapter,** so a guaranteed wired connection is available for the diagnosis regardless of the laptop's ports.
15. **Treat it as an unknown, potentially active USB device** — the same caution as a found USB drive, since a hub can contain its own electronics capable of malicious behaviour.
16. **Check the specific adapter's actual documented resolution** rather than assuming the official 640 × 480 figure is the true ceiling — many real adapters support considerably more, but this varies by product and should be verified rather than assumed.
