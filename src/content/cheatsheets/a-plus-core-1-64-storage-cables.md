---
title: "A+ Core 1 3.2: Storage Cables"
description: "Professor Messer A+ 220-1201 objective 3.2 — SATA revisions and speeds, the one-to-one power and data connectors, no daisy chaining, and eSATA."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "sata", "esata", "storage"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Storage Cables"
moduleOrder: 64
unit: 3
---

> **In one line:** SATA is a simple one-to-one interface — one 15-pin power cable and one 7-pin data cable per drive, no daisy chaining, so port count is drive count — with eSATA as its externally-connectored twin.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (Storage Cables).* The full version is the Storage Cables class notes; the section overview is the Section 3 sheet.

---

## SATA speeds

| Revision | Max speed |
|---|---|
| SATA 1.0 | 1.5 Gbps |
| SATA 2.0 | 3 Gbps |
| SATA 3.0 | **6 Gbps** — the number to know |
| SATA 3.2 | 16 Gbps (via **SATA Express**, over PCIe lanes) |

1.0 → 2.0 → 3.0 each **doubles** the last. 3.2's 16 Gbps breaks that pattern — it's PCI Express, not faster native SATA signalling, and applies to SATA Express devices specifically, not ordinary SATA drives.

## The two connectors

| Connector | Pins | Carries | Shape |
|---|---|---|---|
| Power | **15** | Power | Longer |
| Data | **7** | Data | Shorter |

- Some drives also accept the older **Molex** power connector as a fallback.
- Both connectors are keyed — only fit one way round.

## One-to-one, no daisy chaining

- **One cable, one port, one drive.** Always.
- **No daisy chaining** — SATA cannot share a cable across multiple drives.
- **Port count = maximum drive count.** Six SATA ports on a motherboard support at most **six** drives, full stop.
- Mixed SATA 2 / SATA 3 ports on one board are common — put fast SSDs on the SATA 3 ports, since a fast drive on a slow port is capped at the port's speed.

## eSATA

| Point | Detail |
|---|---|
| What | The external version of SATA |
| Signal | Effectively the **same** as internal SATA |
| Connector | **Different shape** from internal SATA — not interchangeable |
| Cable length | Approximately **2 m** |
| Internal SATA shape | Distinctive **L shape** |
| Unfamiliar rear-panel connectors | Worth checking whether they're eSATA |

Beyond the exam: **eSATAp** (Power over eSATA) combines eSATA with USB power in one port, serving either device type and powering a bus-powered external drive.

## Troubleshooting

| Symptom | Check first |
|---|---|
| Drive shows one boot, vanishes the next | **Data cable seating** — reseat or swap before suspecting the drive |
| External "SATA-style" connector won't fit any port | Probably **eSATA**, not USB — confirm the shape, check for an eSATA port or expansion card |
| Fast SSD underperforming | Confirm it's on a **SATA 3** port, not SATA 2 |
| Connector resists insertion | Wrong port or orientation — SATA/eSATA connectors are keyed; never force it |

## 🔐 Security notes

- **Physical SATA access = raw disk access,** bypassing every OS-level control. **Full-disk encryption** is the control that survives an opened case; a locked user account is not.
- **eSATA is a fast, low-friction exfiltration path** — often overlooked by device-control policy that only covers USB. Disable unused eSATA ports and name them explicitly in DLP rules.
- **A swapped or added drive is easy to miss on a simple bus.** Case-intrusion detection and drive-serial asset tracking are the relevant controls.
- **One-to-one cabling actually helps here:** an unexpected extra drive or unfamiliar cable run is more conspicuous during inspection than on a shared bus.
- **Decommissioned drives stay readable over SATA** via a cheap USB-to-SATA adapter — certified wipe or physical destruction before disposal, never just "pull and set aside."

## Practice drills

<details>
<summary>1. SATA 1.0, 2.0, 3.0 maximum speeds?</summary>

**1.5 Gbps, 3 Gbps, 6 Gbps** — each one double the last.
</details>

<details>
<summary>2. Why does SATA 3.2's 16 Gbps break that doubling pattern?</summary>

It's reached via **SATA Express, running over PCI Express lanes** — not further native SATA signalling — and applies to SATA Express devices, not ordinary SATA drives.
</details>

<details>
<summary>3. Pin counts for SATA power and data connectors?</summary>

**Power: 15 pins (the longer connector). Data: 7 pins (the shorter one).**
</details>

<details>
<summary>4. Can two drives share one SATA data cable?</summary>

**No.** SATA is strictly **one-to-one** — no daisy chaining.
</details>

<details>
<summary>5. A motherboard has six SATA ports. Maximum drives?</summary>

**Six.** Port count is the hard ceiling.
</details>

<details>
<summary>6. How does eSATA's connector compare to internal SATA's?</summary>

**Different shape entirely** — not interchangeable, even though the signal on the wire is effectively the same.
</details>

<details>
<summary>7. A drive appears in BIOS one boot, not the next. First check?</summary>

**Reseat or swap the data cable** before suspecting the drive itself.
</details>

<details>
<summary>8. eSATA's approximate cable length?</summary>

**About 2 metres.**
</details>

## Key takeaways

- SATA 1.0/2.0/3.0 double each time: 1.5 → 3 → 6 Gbps. 3.2's 16 Gbps is SATA Express over PCIe, a different mechanism.
- 15-pin power, 7-pin data, both keyed — and strictly one-to-one with no daisy chaining.
- Port count is drive count, full stop; mix SATA 2/3 ports deliberately, fast drives on SATA 3.
- eSATA = same signal, different connector, ~2 m cable — not interchangeable with internal SATA.
- A loose data cable, not the drive, is the first suspect for an intermittently missing drive.
