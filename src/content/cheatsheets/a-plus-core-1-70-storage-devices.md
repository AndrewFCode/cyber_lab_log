---
title: "A+ Core 1 3.4: Storage Devices"
description: "Professor Messer A+ 220-1201 objective 3.4 — hard drives and RPM, SSDs, PCIe and NVMe, SAS, mSATA and M.2 keying, flash memory formats, and optical drives."
tags: ["a-plus", "comptia", "messer", "hardware", "storage", "ssd", "nvme", "hard-drive", "flash"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Storage Devices"
moduleOrder: 70
unit: 3
---

> **In one line:** non-volatile storage ranges from mechanical hard drives (platters, RPM-driven latency) through SSDs and PCIe-connected NVMe (far past SATA's 6 Gbps ceiling), SAS for fast drive arrays, M.2 as the now-dominant cable-free interface, to flash memory and optical discs for portable and archival storage.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.4 (Storage Devices).* The full version is the Storage Devices class notes; the section overview is the Section 3 sheet.

---

## Hard drives

| Component | Role |
|---|---|
| Platter | Spinning disk holding the data |
| Spindle | Motor spinning the platter(s) |
| Actuator + arm | Moves the read/write head |
| Read/write head | Reads/writes the platter surface |

- **RPM:** 5,400 / 7,200 / 10,000 / 15,000 — **higher RPM = lower latency**.
- **Multiple platters** = a head/arm on **both sides** of each.
- **Form factors:** 3.5" (desktop) · 2.5" (laptop) · SSDs use a different 22 mm form.
- **All mechanical parts can fail** — the core hard-drive reliability weakness.

## SSD → PCIe → NVMe

| Step | What changed |
|---|---|
| HDD → SSD | Non-volatile memory, **no moving parts**, many times faster |
| SSD outgrows SATA | SATA's **6 Gbps** ceiling becomes the bottleneck |
| PCIe-connected storage | SSD wired directly to **PCI Express** (adapter card or M.2) for far more throughput |
| **AHCI** | Advanced Host Controller Interface — the older, SATA-era data-movement standard |
| **NVMe** | Non-Volatile Memory Express — low latency, connects **directly to PCIe**, works even in laptops |
| M.2 NVMe | ~**20 Gbps** theoretical, vs SATA's 6 Gbps |

**Watch the numbers:** a single PCIe lane runs ~8 Gbps (gen 3) or ~16 Gbps (gen 4) — **not** tens of Gbps per lane. High aggregate figures (e.g. ~64 Gbps) come from a **4-lane (x4) link**, the typical NVMe configuration, not one lane alone.

## SAS (Serial Attached SCSI)

| Point | Detail |
|---|---|
| What | Serialised **SCSI** protocol for spinning hard drives |
| Speed | ~**22.5 Gbps** (matches 24G SAS / SAS-4's published line rate) |
| Connector | **Looks like SATA** (data one side, power the other, same form factor) but is **deliberately different** — can't be cross-plugged |
| Use case | **Large arrays** of spinning hard drives |

## mSATA and M.2

| | mSATA | M.2 |
|---|---|---|
| Full name | Mini SATA | — |
| Role | Stopgap, smaller SATA form factor | **Now dominant** interface |
| Cables | Still SATA cabling, smaller | **None** — plugs directly into the slot |
| Speed ceiling | SATA-level | Full **PCIe** speed available |

**M.2 keying:** notches at the connector end —

| Key | Meaning |
|---|---|
| **B key** | One position |
| **M key** | Another position |
| **B+M** | Fits either type of slot |

**Check the slot's supported key before buying a drive** — a B-keyed-only slot often means SATA-level speed over M.2, not NVMe.

## Flash memory

- Based on **EEPROM** — non-volatile, but with a **limited number of write cycles**; once exhausted, no more writes (may still read).
- **Not reliable as sole backup/archive media** — limited writes plus easy to lose. Keep a second copy elsewhere.
- Formats: **USB flash drive** (most common) · **CF** (CompactFlash, original/larger) · **SD** · **miniSD / microSD** · **xD-Picture Card** (older cameras).

## Optical drives

- Store data as microscopic **laser-written bumps**.
- **Slow** vs HDD/SSD, but compact and good for **archiving**.
- Formats: **CD-ROM, DVD-ROM, Blu-ray**. Built-in or external (usually **USB**) readers.

## 🔐 Security notes

- **Physical destruction is the defensible end-of-life method for mechanical HDDs** — moving parts fail unpredictably, but a destroyed platter is very hard to recover data from.
- **NVMe doesn't automatically inherit SATA-era security assumptions** — confirm full-disk encryption and secure-erase are genuinely supported and configured for NVMe specifically.
- **EEPROM write exhaustion is a silent failure mode** — a flash drive can stop accepting new data while still reading fine.
- **Small flash media cuts both ways:** easy to lose (data-loss risk) and easy to smuggle (exfiltration risk) — port control and removable-media policy apply directly.
- **SAS/SATA's deliberate connector mismatch is a "fail safe" design pattern** worth recognising elsewhere.
- **Old optical archives can hold forgotten sensitive data**, well outside live-system data governance tooling.

## Practice drills

<details>
<summary>1. How does RPM affect a hard drive's performance?</summary>

**Higher RPM = lower latency** — the wanted data on the platter reaches the read/write head sooner.
</details>

<details>
<summary>2. Why did SSDs need to move beyond SATA?</summary>

**SATA's 6 Gbps ceiling became the bottleneck** — SSDs were capable of more.
</details>

<details>
<summary>3. What does NVMe stand for, and why is it faster?</summary>

**Non-Volatile Memory Express.** It connects **directly to PCIe**, bypassing the older AHCI/SATA model, for lower latency and higher throughput.
</details>

<details>
<summary>4. Roughly how fast is SAS, and what protocol does it serialise?</summary>

**~22.5 Gbps**, serialising the **SCSI** protocol.
</details>

<details>
<summary>5. Why are SAS and SATA connectors different if the drives look so similar?</summary>

**Deliberately**, to prevent accidentally plugging a SATA drive into a SAS setup or vice versa.
</details>

<details>
<summary>6. What does M.2 keying (B key / M key) actually indicate?</summary>

**Which type of connectivity the slot and drive support** — a mismatched key means the drive physically won't work in that slot.
</details>

<details>
<summary>7. What's EEPROM's core limitation?</summary>

**A limited number of write cycles** — beyond that, no more writes (though it may still read).
</details>

<details>
<summary>8. Why shouldn't a flash drive be your only backup?</summary>

**Limited write endurance and easy to lose** — both argue for a second copy elsewhere.
</details>

## Key takeaways

- Hard drives: platters + RPM-driven latency; SSDs: no moving parts, much faster.
- SATA's 6 Gbps ceiling pushed storage onto PCIe directly — that's NVMe, reaching ~20 Gbps over M.2.
- SAS (~22.5 Gbps) serialises SCSI for fast hard drive arrays, with connectors deliberately different from SATA.
- M.2 is now dominant, cable-free — but check B/M keying before buying a drive.
- Flash (EEPROM) has a write limit; optical is slow but good for archiving.
