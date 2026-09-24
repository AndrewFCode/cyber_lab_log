---
title: "A+ Core 1 3.4: Storage Devices — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.4: hard drives and RPM, SSDs, PCIe and NVMe, SAS, mSATA and M.2 keying, flash memory formats, and optical drives."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "storage", "ssd", "nvme", "hard-drive", "flash"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.4 (Storage Devices)**

> **Quick reference:** the short version of this lesson is the Storage Devices cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It opens objective 3.4, following the memory lessons (objective 3.3) in this section — where memory was volatile working storage, this lesson covers the non-volatile devices that keep data after power is removed.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why non-volatile storage is needed and name the main device categories.
2. Describe a hard drive's mechanical construction and how RPM affects latency.
3. Compare hard drive form factors and explain why laptops use smaller drives.
4. Describe an SSD and explain its main advantage over a hard drive.
5. Explain why SSDs outgrew SATA, and describe PCIe-connected storage and NVMe.
6. Describe Serial Attached SCSI (SAS) and how it differs physically from SATA.
7. Describe mSATA and M.2, including M.2 keying.
8. Describe flash memory, EEPROM's write limitation, and common flash card formats.
9. Describe optical drives and their place in modern systems.

## 1. Why non-volatile storage exists

Memory (RAM) is **volatile** — when a system powers off, everything held in memory disappears. To keep data available afterwards, a system needs storage that survives without power. Many technologies fill this role: hard drives, solid-state drives, flash drives, memory cards, optical drives, and others covered in this lesson.

## 2. Hard drives

### 2.1 What they are

A **hard drive** is a magnetic storage device with **rapidly spinning platters** inside, where data is physically stored. It uses **random access**: data can be stored anywhere on the drive and retrieved immediately by addressing the location directly, rather than reading through everything before it.

### 2.2 Mechanical construction

Opening a hard drive (something you should never do outside a dust-free environment) reveals several moving parts:

| Component | Role                                                             |
|---|---                                                                       |
| **Platter** | The spinning disk where data is magnetically stored            |
| **Spindle** | The motor assembly that spins the platter(s)                   |
| **Actuator** | Moves the arm across the platter                              |
| **Arm** | Carries the read/write head                                        |
| **Read/write head** | Reads and writes data on the platter surface just benea|

Because these are mechanical, moving components, **any one of them can fail** at any time — a hard drive's mechanical nature is its central reliability weakness compared with solid-state alternatives.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Hard drive, simplified cutaway view                                        |
|                                                                              |
|        ____________________________                                          |
|       /                            \                                         |
|      |    platter (spinning)        |  <-- spindle motor underneath          |
|      |         .  .  .  .           |                                        |
|      |                              |                                        |
|      |___________  ________ ________|                                        |
|                   \/                                                         |
|              [ actuator arm ]                                                |
|                   |                                                          |
|              [ read/write head ]  <-- rides just above the surface           |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 2.3 Rotational speed and latency

Drives spin at different rates, most commonly **5,400, 7,200, 10,000, or 15,000 RPM** (revolutions per minute). The read/write head stays in one position while the platter spins beneath it, so the drive must wait for the platter to rotate the wanted data underneath the head. **Faster rotation means lower latency** — a 15,000 RPM drive reaches the data it needs sooner than a 5,400 RPM drive, because the wait for the right part of the platter to come around is shorter.

### 2.4 Multiple platters, multiple heads

Many drives contain **more than one platter**, stacked together, and there is a read/write head and actuator arm on **both the top and bottom surface** of each platter — multiplying the storage capacity and the read/write hardware working in parallel within one drive.

### 2.5 Form factors

Desktop systems have plenty of internal room, so drive size matters less there. Mobile devices benefit directly from smaller, lighter drives:

| Form factor | Width | Typical use                                            |
|---|---|---                                                                   |
| **3.5 inch** | 3.5 in | Desktop computers                                    |
| **2.5 inch** | 2.5 in | Laptops, mobile devices                              |
| SSD (non-2.5"/3.5" form) | 22 mm | Modern compact systems                    |

> **Note (beyond this lesson):** 3.5-inch and 2.5-inch both refer to standardised width dimensions defined for the drive bay the device sits in, not to storage capacity — a 2.5-inch drive is not automatically lower capacity than a 3.5-inch one, just physically smaller.

## 3. Solid-state drives (SSDs)

### 3.1 What they are

**SSDs** — **solid-state drives** — use **non-volatile memory** rather than spinning platters, so they have **no moving parts**. Open one up and you will mostly see **memory modules**, not mechanical components.

### 3.2 The main benefit: speed

SSDs are **many times faster** at reading and writing than a traditional hard drive. Replacing a hard drive with an SSD, with no other changes, typically produces a **substantial improvement** in overall system throughput — this is one of the most effective single upgrades available for an ageing system.

## 4. PCIe-connected storage and NVMe

### 4.1 Outgrowing SATA

Moving from hard drives to SSDs was itself a large performance gain, but it soon exposed a new limit: the traditional **SATA connection's maximum throughput** was itself becoming the bottleneck. SSDs were capable of more than SATA could deliver.

### 4.2 Connecting directly to PCI Express

One solution was to connect the SSD **directly to the PCI Express bus** rather than through SATA — commonly via an **adapter card** that plugs into a PCIe slot, with the SSD installed on the card itself. The motherboard supplies both power and the much higher throughput of the PCIe bus.

### 4.3 The throughput comparison

SATA tops out at **6 Gbps** (SATA revision 3, as covered in the network cables lesson). PCI Express offers considerably more.

> **Caution:** the transcript states PCI Express provides "around 64 gigabits per second per lane." This overstates a single lane's throughput. A single **PCIe 4.0** lane runs at roughly **16 Gbps**, and a single **PCIe 3.0** lane at roughly **8 Gbps** — nowhere near 64 Gbps per lane. The **64 Gbps figure is close to the *aggregate* throughput of a PCIe 4.0 x4 link** (four lanes together, the configuration most NVMe SSDs actually use) rather than one lane on its own. The comparison against SATA's 6 Gbps still stands — PCIe storage is genuinely much faster — but the "per lane" attribution needs correcting to "aggregate, over the typical four-lane link."

### 4.4 AHCI

Traditional SATA storage uses a standard called **AHCI** — **Advanced Host Controller Interface** — which governs how data moves between the drive and memory. AHCI was designed around the assumptions and limitations of spinning-disk, SATA-connected storage.

### 4.5 NVMe

To take proper advantage of the PCI Express bus, a new communication method was created: **NVMe** — **Non-Volatile Memory Express**. NVMe offers **very low latency** and **higher throughput**, because it connects directly to the PCIe bus rather than routing through the older AHCI/SATA model — and it works this way even inside a laptop, where a full-size PCIe adapter card would not fit.

### 4.6 M.2 as the common interface

The most common way to reach the PCIe bus in laptops and modern desktops is the **M.2** interface (covered in more depth in section 6). An **NVMe drive on M.2** offers a theoretical transfer speed in the region of **20 Gbps** — well beyond SATA's 6 Gbps ceiling.

## 5. Serial Attached SCSI (SAS)

### 5.1 What it is

Some systems still use traditional spinning hard drives and need better throughput than SATA provides for them. **Serial Attached SCSI (SAS)** is a **serialised version of the long-established SCSI** protocol, letting systems retain SCSI's protocol advantages for controlling and managing drive data while gaining the benefits of a modern serial connection.

### 5.2 Speed

SAS reaches approximately **22.5 Gbps** — substantially faster than SATA's 6 Gbps — and future SAS revisions are expected to increase this further. I checked this figure: it matches the published line rate for **24G SAS (SAS-4)**, which is documented at 22.5 Gb/s per lane, so the transcript's number is accurate.

### 5.3 Connectors: similar, but deliberately different

A SAS drive's interface looks a great deal like a SATA drive's: two separate connectors, **data on one side, power on the other**, in essentially the same physical arrangement. Placed side by side, a SATA drive and a SAS drive look very alike in **form factor**.

The **connectors themselves are slightly different**, though — a deliberate design choice to **prevent accidentally plugging a SATA drive into a SAS configuration**, or vice versa.

> **Exam tip:** SAS drives are typically found in **large storage arrays** of spinning hard drives, where the SCSI protocol's array-management strengths and the higher throughput over SATA both matter at scale.

## 6. mSATA and M.2

### 6.1 The problem: shrinking form factors, faster interfaces

As storage devices got smaller and the interfaces connecting them needed to get faster, two additional interface technologies emerged alongside standard SATA: **mSATA** and **M.2**.

### 6.2 mSATA

**mSATA** stands for **mini SATA**. It took the same underlying SATA connections and repackaged them into a smaller physical form factor. mSATA served as a **useful stopgap** between full-size SATA connectivity and the eventual move to M.2 — it addressed board-space constraints and offered a path to a somewhat higher-speed bus, without yet being the final answer.

### 6.3 M.2

**M.2** has become the dominant interface for modern storage devices, particularly SSDs. It needs **no separate data or power cables** — the M.2 drive plugs **directly into the M.2 slot** on the system board. Because M.2 connects directly to the system bus, it can take full advantage of **PCI Express speeds**.

### 6.4 M.2 keying

Not every M.2 interface supports the same type of connectivity, and the way this is indicated is through small **keys** — notches at the connection end of the drive. The two commonly referenced keys are:

| Key | Note                                                                   |
|---|---                                                                       |
| **B key** | One keying position                                              |
| **M key** | Another keying position                                          |
| **B+M key** | Some drives support both, fitting either type of slot          |

Checking motherboard documentation for which key (or keys) its M.2 slots support is necessary before assuming any given M.2 drive will work in it — the interface may otherwise support only SATA-style throughput, or genuinely fast NVMe throughput, depending on how the slot and drive are keyed and wired.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   M.2 drive, connector end (simplified)                                      |
|                                                                              |
|   [==============contacts==============]                                     |
|                    ^          ^                                              |
|                  B key      M key       (positions of the notch/notches)     |
|                                                                              |
|   B-keyed only:    notch at the B position                                   |
|   M-keyed only:    notch at the M position                                   |
|   B+M keyed:       notches at BOTH positions -- fits either type of slot     |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 6.5 Installing an M.2 drive

Installation is simple and fast: **slide the drive into the M.2 slot** at an angle, then **fasten it down** to the system board with a small retaining screw. No separate cabling is involved at all.

### 6.6 Worked example — choosing between mSATA, SATA and M.2 for an older laptop upgrade

**Scenario:** you are asked to add or upgrade storage in an older laptop and are not sure which interfaces it actually supports.

1. **Check the laptop's documentation or physically inspect the board** — an older system may only have a 2.5-inch SATA bay, an mSATA slot, or (on somewhat newer hardware) an M.2 slot.
2. **If it has an mSATA slot,** treat this as a genuine but limited option — it will improve on a 2.5-inch spinning drive but will not reach modern NVMe speeds.
3. **If it has an M.2 slot, check the key type** the slot supports (B, M, or both) before buying a drive, since a mismatched key means the drive cannot be installed at all.
4. **If the M.2 slot is B-keyed only,** it very likely only supports SATA-speed throughput over M.2, not NVMe — check documentation rather than assuming M.2 automatically means NVMe speed.
5. **When in doubt, the 2.5-inch SATA bay is the safest fallback** — nearly universal compatibility, even if it forgoes the speed benefits of the newer interfaces.

## 7. Flash memory

### 7.1 What it is

**Flash drives** store information in a very small physical form using **EEPROM** — **Electrically Erasable Programmable Read-Only Memory**. This is **non-volatile**: remove the drive from power entirely, and the stored data remains available.

### 7.2 A limited number of writes

EEPROM supports only a **certain number of write cycles**. Beyond that limit, the memory **stops accepting new writes** — though it may still be readable. This is a genuine, permanent limitation of the technology, not a fault.

### 7.3 Not a reliable archive on its own

Flash drives are **not recommended as sole archival or backup media**, for two compounding reasons: the **limited write endurance** described above, and their **small physical size**, which makes them easy to lose. The practical guidance is straightforward — if information matters, keep a **backup in another location** as well as (or instead of) a flash drive.

### 7.4 Flash formats

| Format | Note                                                                |
|---|---                                                                       |
| **USB flash drive** | The most common and widely seen form                   |
| **CF (CompactFlash)** | One of the original, comparatively large flash format|
| **SD (Secure Digital)** | Common in mobile devices                           |
| **miniSD / microSD** | Smaller variants for very compact devices             |
| **xD-Picture Card** | Found in some older digital cameras                    |

## 8. Optical drives

### 8.1 Declining, but not gone

**Optical drives** see little use in production systems today, but a substantial amount of historically stored information exists on optical media, making the ability to read it still relevant.

### 8.2 How they store data

Optical drives store data as tiny **microscopic bumps** on the disc, written and later read using a **laser beam**. This method can store a great deal of information in physically compact media.

### 8.3 Speed trade-off

Reading and writing via a laser is comparatively **slow** next to a hard drive or SSD. In exchange, optical media takes up **very little room** while storing substantial data, which made it a genuinely good choice for **archiving** data for later retrieval, even if not for active working storage.

### 8.4 Formats and access

Common optical formats include **CD-ROM, DVD-ROM, and Blu-ray**. Some systems have a **built-in** optical drive; others require an **external** reader, which typically connects over **USB** — a practical option if you need to retrieve information from older optical archives on a modern system without a built-in drive.

## 9. Security perspective

Storage device choice affects several defender-relevant concerns beyond raw speed and capacity.

- **Mechanical hard drives are a reliability and a disposal concern together.** Their moving parts fail unpredictably, and unlike flash memory, a spinning-platter drive that is physically destroyed (rather than merely wiped) is very difficult to recover data from — physical destruction remains one of the most defensible end-of-life data destruction methods for magnetic media specifically.
- **NVMe and PCIe-connected storage bypass some of the assumptions built into older security tooling.** AHCI-era disk encryption, secure-erase commands, and monitoring tools designed around SATA behaviour do not always translate cleanly to NVMe; confirm that full-disk encryption and secure-erase features are genuinely supported and correctly configured for NVMe storage specifically, rather than assuming SATA-era practice carries over unchanged.
- **EEPROM's limited write endurance is itself a reliability, not just a performance, issue.** A flash drive nearing its write limit can begin silently failing to store new data while still appearing to function for reads — a subtle failure mode worth remembering when flash media is used for anything beyond short-term, disposable transport of non-critical data.
- **Small flash media is a data-loss and exfiltration risk in the same breath.** The lesson's own warning — flash drives are easy to lose — cuts both ways: a lost drive is an accidental disclosure risk, and the same small size and simplicity make flash media an easy, low-visibility way to carry data out of an environment deliberately. Physical port control and policy around removable media apply here directly.
- **SAS/SATA connector incompatibility is a safety feature worth recognising, not an inconvenience.** The deliberate physical difference between SAS and SATA connectors exists specifically to prevent a class of installation mistake — a useful example of "designed to fail safely" thinking that is worth applying more broadly when specifying or auditing hardware.
- **Old optical media can be an overlooked source of stale sensitive data.** Archived CDs, DVDs or Blu-ray discs from years or decades past can still hold sensitive information nobody remembers exists, well outside the reach of modern data governance tools that focus on live systems. Physical archive inventories matter for exactly this reason.

## Summary

- Non-volatile storage exists because RAM loses its contents on power-off. Hard drives, SSDs, flash drives, and optical drives are the main categories covered here.
- **Hard drives** use spinning **platters**, a **spindle**, an **actuator arm**, and a **read/write head**; faster rotation (up to 15,000 RPM) means lower latency. Form factors: **3.5-inch** (desktop) and **2.5-inch** (laptop).
- **SSDs** use non-volatile memory with **no moving parts**, and are dramatically **faster** than hard drives.
- SSDs quickly outran **SATA's 6 Gbps** ceiling, leading to **PCI Express**-connected storage (via adapter card or **M.2**) and **NVMe** (Non-Volatile Memory Express), which offers low latency and high throughput by connecting directly to PCIe.
- **SAS (Serial Attached SCSI)** serialises the SCSI protocol, reaching about **22.5 Gbps**, with connectors deliberately different from SATA's to prevent mis-installation.
- **mSATA** (mini SATA) was a stopgap smaller form factor; **M.2** is now the dominant interface, needing no cables, and using **B/M key** notches to indicate supported connectivity.
- **Flash memory** uses non-volatile **EEPROM**, which has a **limited number of writes** and should not be relied on as sole backup or archival media. Common formats: USB, **CF, SD, miniSD/microSD, xD**.
- **Optical drives** write microscopic bumps with a laser; slower than hard drives or SSDs, but compact and historically useful for archiving, in **CD-ROM, DVD-ROM, and Blu-ray** formats.

## Glossary

| Term | Meaning                                                               |
|---|---                                                                       |
| Volatile | Loses its contents when power is removed (describes RAM)          |
| Non-volatile | Retains its contents without power (describes storage)        |
| Platter | The spinning disk inside a hard drive where data is stored         |
| Spindle | The motor assembly spinning a hard drive's platters                |
| Actuator | The mechanism moving the read/write arm across the platter        |
| RPM | Revolutions per minute; a hard drive's rotational speed                |
| SSD | Solid-state drive; non-volatile memory storage with no moving parts    |
| PCIe | PCI Express; a high-throughput bus SSDs can connect to directly       |
| AHCI | Advanced Host Controller Interface; the standard for SATA storage     |
| NVMe | Non-Volatile Memory Express; low-latency storage over PCIe            |
| SAS | Serial Attached SCSI; a fast, serialised SCSI-based storage interface  |
| mSATA | Mini SATA; a smaller SATA form factor, a stopgap before M.2          |
| M.2 | A cable-free storage interface connecting directly to the system bus   |
| M.2 keying | Notches (B key, M key, or both) indicating an M.2 slot's support|
| Flash memory | Non-volatile memory used in compact removable storage devices |
| EEPROM | Electrically Erasable Programmable Read-Only Memory; the basis of fl|
| Optical drive | A drive reading/writing data as laser-etched marks on a disc |

## Review questions

1. Why does a computer need non-volatile storage at all?
2. Name the main mechanical components inside a hard drive.
3. How does a hard drive's rotational speed affect its performance?
4. What are the two common hard drive form factors, and where is each typically used?
5. What is the main advantage of an SSD over a traditional hard drive?
6. Why did SSDs eventually need to move beyond SATA?
7. What does AHCI stand for, and what is it associated with?
8. What does NVMe stand for, and why does it offer lower latency than SATA-based storage?
9. What is SAS, and roughly how fast is it?
10. Why are SAS and SATA connectors deliberately different from each other?
11. What does mSATA stand for, and what role did it play?
12. What is M.2 keying, and what do the B and M keys indicate?
13. What is EEPROM's main limitation as a storage technology?
14. **Scenario:** a large storage array uses spinning hard drives and needs the highest throughput achievable for that technology. What interface would you specify, and why?
15. **Scenario:** a laptop has an M.2 slot that is keyed for B only. What does that likely mean for the speeds achievable, and what should you check before buying a drive?
16. **Scenario:** a business is relying solely on a single USB flash drive as its only backup of critical files. What two specific risks does this lesson raise about that approach?

## Answer key

1. **RAM is volatile and loses everything when power is removed.** Non-volatile storage is needed to keep data available afterwards.
2. **The platter, spindle, actuator, arm, and read/write head.**
3. **Faster rotation (higher RPM) reduces latency,** because the wanted data reaches the read/write head sooner as the platter spins.
4. **3.5-inch (desktop) and 2.5-inch (laptops and mobile devices).**
5. **Speed** — SSDs are many times faster at reading and writing than a mechanical hard drive, with no moving parts to limit performance.
6. **SATA's throughput ceiling (6 Gbps) became the bottleneck** once SSDs were capable of more than that.
7. **Advanced Host Controller Interface** — the standard governing data movement for traditional SATA storage.
8. **Non-Volatile Memory Express.** It connects directly to the PCI Express bus, bypassing the older AHCI/SATA model, which gives it lower latency and higher throughput.
9. **Serial Attached SCSI,** a serialised version of the SCSI protocol, reaching approximately **22.5 Gbps**.
10. **To prevent accidentally plugging a SATA drive into a SAS configuration, or the reverse** — a deliberate design safeguard.
11. **Mini SATA.** It repackaged SATA's connections into a smaller form factor and served as a stopgap before M.2 became dominant.
12. **Small notches on the M.2 drive indicating which type of connectivity the slot and drive support.** A B key, an M key, or both, determine what will physically fit and what throughput is available.
13. **A limited number of write cycles** — beyond that limit, it can no longer be written to, though it may still be readable.
14. **SAS (Serial Attached SCSI).** It offers substantially higher throughput than SATA for spinning hard drives, and is the standard choice for large hard drive arrays.
15. **It likely means SATA-level throughput over M.2 rather than full NVMe speed.** Check the motherboard/laptop documentation for the slot's supported key and speed before purchasing a drive.
16. **Limited write endurance (EEPROM can wear out and stop accepting writes) and small size making the drive easy to lose** — both of which argue against relying on a single flash drive as the sole backup.
