---
title: "A+ Core 1 3.2: Storage Cables — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: SATA revisions and speeds, the one-to-one SATA power and data connectors, and eSATA."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "sata", "esata", "storage"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (Storage Cables)**

> **Quick reference:** the short version of this lesson is the Storage Cables cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It completes the objective 3.2 cabling set in this section, alongside network cables, the 568A/568B colour schemes, optical fibre, peripheral cables and video cables — this one is the shortest of them, since SATA is a comparatively simple standard.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what SATA stands for and state the speed of each revision covered.
2. Describe the two SATA connectors, their pin counts, and what each carries.
3. Explain what "one-to-one" means for SATA and why it limits drive count to port count.
4. Identify SATA connectors on a motherboard and match them to drives correctly.
5. Describe eSATA and how it differs physically from internal SATA.
6. Diagnose a drive that is present but not detected because of a cabling fault.

## 1. SATA

### 1.1 What it is

If you are connecting a hard drive inside a desktop computer, you are almost certainly using **SATA** — **Serial AT Attachment**. It is the standard interface for internal storage drives.

### 1.2 Revisions and speeds

| Revision | Maximum speed |
|---|---|
| SATA 1.0 | 1.5 Gbps |
| SATA 2.0 | 3 Gbps |
| SATA 3.0 | 6 Gbps |
| SATA 3.2 | 16 Gbps |

Each of the first three revisions **doubles** the speed of the one before it: 1.5, then 3, then 6 Gbps.

> **Caution:** the jump to 16 Gbps at revision 3.2 is not a further doubling of the same native SATA signalling — the pattern breaks there. Revision 3.2 introduced **SATA Express**, which reaches 16 Gbps by running the connection over **two PCI Express lanes** rather than by speeding up SATA's own signalling further. The connector is also different: SATA Express uses a combined connector that is backward compatible with a standard SATA data connector but adds a PCIe connection alongside it. Ordinary SATA drives and cables, as described in the rest of this lesson, remain at the 6 Gbps of SATA 3.0 — 3.2's 16 Gbps applies specifically to SATA Express devices, which are a different (and in practice, rare) proposition from the plain SATA drives this lesson otherwise describes.

> **Exam tip:** for the everyday SATA drives you will actually be installing and troubleshooting, the number to know is **SATA 3.0 at 6 Gbps** — that is the ceiling for essentially every SATA hard drive and SSD in current use.

### 1.3 The two connectors

SATA storage devices present **two physical connections** on the back:

| Connector | Pins | Carries | Shape |
|---|---|---|---|
| Power | 15 | Power | The longer of the two |
| Data | 7 | Data | The shorter of the two |

The **longer, 15-pin** connector supplies power; the **shorter, 7-pin** connector carries data. Some drives additionally support the older-style **Molex** power connector as a fallback alongside the SATA power connector.

### 1.4 One-to-one, no daisy chaining

SATA is strictly **one-to-one**. The power cable runs from a single power source connector to a single drive; the data cable runs from a single motherboard connector to a single drive. SATA has **no daisy chaining** and does not support multiple drives sharing one cable.

This makes capacity planning simple: a motherboard with eight SATA connectors can support a maximum of **eight** SATA drives, full stop. Count the ports, and you know the ceiling.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   [ Motherboard SATA port 1 ] ---- one data cable ---- [ Drive 1 ]           |
|   [ Motherboard SATA port 2 ] ---- one data cable ---- [ Drive 2 ]           |
|   [ Motherboard SATA port 3 ] ---- one data cable ---- [ Drive 3 ]           |
|                                                                              |
|   [ Power supply ] ---- one power cable each ----> [ Drive 1 ] [ Drive 2 ]   |
|                                                             [ Drive 3 ]      |
|                                                                              |
|   No daisy chaining: one cable, one port, one drive, every time              |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 1.5 Identifying SATA on a motherboard

SATA connectors are easy to pick out on a motherboard — typically grouped together, often near an edge, and coloured to help distinguish generations or channels. A board might carry a mixture of **SATA 2** and **SATA 3** connectors side by side, and boards differ in exactly how many ports they offer and how those ports are arranged.

Because the relationship is one-to-one, coloured cables (for example blue, orange and black) running from motherboard ports to drives make it straightforward to trace which cable belongs to which drive — useful when a system has several drives installed and you need to identify one without powering everything down to trace it by touch.

### 1.6 Connecting a drive

Connecting a SATA drive is genuinely simple, which is part of the appeal of the standard:

1. **Data cable** — one end into the drive's 7-pin data connector, the other into a free SATA port on the motherboard.
2. **Power cable** — the drive's 15-pin power connector into a SATA power lead from the power supply (or Molex, on drives that support it).

Both connections are physically keyed so they can only go in one way round, which removes one common source of installation error.

> **In the real world:** the two SATA connectors — power and data — are shaped differently enough that you cannot confuse them with each other, but a **loose or partially seated** data connector is one of the most common causes of a drive that appears in the BIOS one boot and vanishes the next. Reseating the cable, or trying a different cable, is the first troubleshooting step before assuming the drive itself has failed.

### 1.7 Worked example — planning drive bays for a build

**Scenario:** you are speccing a small file server. The motherboard has six SATA ports, and the client wants four data drives plus a boot SSD, with one port spare for future expansion.

1. **Count the requirement.** Four data drives + one boot drive = five SATA devices.
2. **Count the ports.** Six SATA ports available.
3. **Check the one-to-one rule applies as expected.** No daisy chaining means five drives need exactly five ports — there is no way to fit more devices onto fewer ports.
4. **Confirm the spare port requirement is met.** 5 used, 1 spare, matching the six available — the build fits with no port left unaccounted for and no drive left unconnected.
5. **Check port generation if performance matters.** If some of the six ports are SATA 2 and others SATA 3, put the boot SSD and any high-throughput drives on the SATA 3 ports — a fast SSD on a SATA 2 port is capped at that port's lower speed regardless of the drive's own capability.

## 2. eSATA

### 2.1 What it is

**eSATA** is the external version of SATA. Functionally it behaves much like internal SATA — the signal travelling across the wire is effectively the same — but it is built for connecting an **external** drive, over a cable of roughly **2 metres**.

### 2.2 A different connector, not a different signal

The important distinction is physical, not electrical. SATA and eSATA send effectively the same kind of signal, but the **connectors are different shapes**, and one will not plug into the other's socket.

- **Internal SATA connectors** have a distinctive **L shape**.
- **eSATA connectors** use a **different style** entirely, built for external use and for more insertion cycles than an internal connector is designed to handle.

Because internal SATA lives inside the case and eSATA lives on the outside, it is unusual to see the two side by side — but they are not interchangeable, and a cable made for one will not serve the other.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Internal SATA data connector          eSATA connector                      |
|                                                                              |
|      distinctive L-shaped body           different external-rated shape      |
|      designed for inside the case        designed for repeated external use  |
|      not weatherproofed or rugged         built to be plugged in and out     |
|                                            from outside the computer         |
|                                                                              |
|   Same signal on the wire. Different connector. Not interchangeable.         |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 2.3 Spotting eSATA on the back of a machine

If you look at the back of a computer and see connectors you do not immediately recognise, they may well be eSATA. It is worth learning to recognise the shape, since it is easy to mistake for something else at a glance, particularly on a case with several rear ports.

> **Note (beyond this lesson):** a variant called **eSATAp** (also called "Power over eSATA" or "eSATA/USB combo") combines an eSATA connector with USB power pins in one socket, letting a single port serve either an eSATA or a USB device and power a bus-powered external drive at the same time. It is not universal, but it is worth recognising if you meet it, since it looks like a modified eSATA port rather than a standard one.

### 2.4 Worked example — an external drive that will not connect

**Scenario:** a technician has an external hard drive with what looks like a SATA-style connector, and it will not fit any port on the workstation's rear panel.

1. **Check what connector the drive actually has.** "SATA-style" often means eSATA on an external enclosure — confirm by comparing the connector's shape against the internal SATA and eSATA references.
2. **Check what the workstation offers.** Not every machine has an eSATA port; many external drives instead use USB, and confusing the two connector families at a glance is common.
3. **If the machine has no eSATA port,** the options are a USB-connected enclosure or drive instead, or an eSATA expansion card if the workstation has a free slot.
4. **Never force a connector.** SATA and eSATA connectors are shaped to prevent mis-insertion; resistance means the wrong port or the wrong orientation, not a connector that needs more force.

## 3. Security perspective

SATA and eSATA are internal, close-range interfaces, but they still carry real security implications.

- **Physical access to SATA is physical access to raw storage.** Anyone who can open a case and connect a drive by SATA can read it directly with another machine, entirely bypassing operating system access controls, account passwords and file permissions. **Full-disk encryption** is the control that survives this scenario; a locked Windows or macOS account does not.
- **eSATA is a hot, low-friction exfiltration path.** An eSATA port on the back of a machine allows an external drive to be connected and disconnected in seconds, without opening the case, and (unlike many USB storage policies) eSATA ports are sometimes overlooked by device-control software that focuses on USB. Where data loss prevention matters, eSATA ports deserve the same policy attention as USB ports — disable unused ones, and include eSATA explicitly in device-control rules rather than assuming USB coverage is enough.
- **A drive swapped for an identical-looking one is hard to notice by inspection alone.** Because SATA connections are simple and standard, physically substituting or adding a drive inside a case — for interception, for data collection, or to install a hardware keylogger disguised as a drive — is straightforward for anyone with brief physical access. Case intrusion detection and asset tracking of drive serial numbers are the relevant controls.
- **One-to-one cabling makes tampering more visible, not less.** Because each drive has its own dedicated cable, an unexpected extra drive or an unfamiliar cable run is more conspicuous during a physical inspection than it would be on a shared bus — a small advantage worth using during periodic hardware audits.
- **Decommissioned drives are still readable over SATA.** A drive pulled from a retired machine and connected via a USB-to-SATA adapter is trivially readable unless it was encrypted or securely wiped before removal. Destruction or certified wiping is the appropriate control for end-of-life storage, not simply pulling the drive and setting it aside.

## Summary

- **SATA** — **Serial AT Attachment** — is the standard internal storage interface. **1.0:** 1.5 Gbps. **2.0:** 3 Gbps. **3.0:** 6 Gbps. **3.2:** 16 Gbps via **SATA Express**, which runs over PCI Express lanes rather than doubling native SATA signalling again.
- Each drive has **two connectors**: a **15-pin power** connector (the longer one) and a **7-pin data** connector (the shorter one). Some drives also accept the older **Molex** power connector.
- SATA is **one-to-one, with no daisy chaining** — one cable, one port, one drive. A motherboard with N SATA ports supports at most N drives.
- SATA connectors are easy to spot on a motherboard, and boards commonly mix SATA 2 and SATA 3 ports.
- **eSATA** is the external counterpart, carrying effectively the same signal over a cable of roughly **2 m**, but with a **different connector shape** from internal SATA — the two are not interchangeable. Internal SATA data connectors have a distinctive **L shape**.

## Glossary

| Term | Meaning |
|---|---|
| SATA | Serial AT Attachment; the standard internal drive interface |
| Revision | A numbered version of the SATA standard with its own maximum speed|
| SATA Express | The SATA 3.2 mechanism reaching 16 Gbps via PCI Express lanes |
| Power connector | SATA's 15-pin connector supplying power to the drive |
| Data connector | SATA's 7-pin connector carrying data to and from the drive |
| Molex | An older style of power connector some drives can also accept |
| One-to-one | SATA's design: one cable serves exactly one port and one drive |
| Daisy chaining | Connecting multiple devices along one cable; not supported by SATA |
| eSATA | The external version of SATA, using a different connector |
| L shape | The distinctive body shape of an internal SATA data connector |
| eSATAp | A combined eSATA/USB power port, also called Power over eSATA |
| Full-disk encryption | Encrypting an entire drive so raw access without the key is unreadable |

## Review questions

1. What does SATA stand for?
2. Give the maximum speed of SATA revisions 1.0, 2.0 and 3.0.
3. Why is SATA 3.2's jump to 16 Gbps not simply another doubling of native SATA speed?
4. How many pins does the SATA power connector have, and how many does the data connector have?
5. Which SATA connector is physically longer?
6. What older-style power connector do some SATA drives also accept?
7. What does "one-to-one" mean for SATA, and what does it imply about drive count versus port count?
8. Can two drives share one SATA data cable? Why or why not?
9. What is eSATA, and how does its signal compare with internal SATA's?
10. What is the practical cable length for eSATA?
11. What shape is distinctive about an internal SATA data connector?
12. Can an eSATA cable be plugged into an internal SATA port, or vice versa?
13. **Scenario:** a motherboard has six SATA ports and a client wants to install seven drives. What do you tell them?
14. **Scenario:** a drive shows in the BIOS on one boot but not the next, with no other symptoms. What is the first thing to check?
15. **Scenario:** you find two unfamiliar connectors on the back of a desktop that don't look like USB. What might they be, and how would you confirm it?
16. **Scenario:** a decommissioned drive is pulled from a retired desktop and set aside without encryption or wiping. What is the risk, and what should have happened instead?

## Answer key

1. **Serial AT Attachment.**
2. **1.0: 1.5 Gbps. 2.0: 3 Gbps. 3.0: 6 Gbps** — each one double the last.
3. **It reaches 16 Gbps via SATA Express, running over PCI Express lanes,** not by further speeding up native SATA signalling.
4. **Power: 15 pins. Data: 7 pins.**
5. **The power connector** — it is the longer of the two.
6. **Molex.**
7. **Each cable serves exactly one port and one drive — no daisy chaining.** A motherboard with N SATA ports supports a maximum of N drives.
8. **No.** SATA does not support daisy chaining; each data cable runs from one motherboard port to one drive only.
9. **The external version of SATA.** The signal on the wire is effectively the same as internal SATA.
10. **Approximately 2 metres.**
11. **An L shape.**
12. **No.** The connectors are physically different shapes and are not interchangeable.
13. **Not with those six ports.** SATA is one-to-one with no daisy chaining, so six ports support a maximum of six drives; a seventh drive needs an additional SATA controller card or a different storage approach (such as external USB or an enclosure).
14. **The data cable connection** — reseat it, or try a different cable, before suspecting the drive itself has failed.
15. **eSATA ports.** Confirm by comparing their shape against known eSATA and internal SATA connector references, and check the machine's documentation.
16. **The drive is trivially readable by anyone who connects it,** for example via a USB-to-SATA adapter, since nothing protects the data at rest. It should have been securely wiped or destroyed — or encrypted from the start — before being set aside.
