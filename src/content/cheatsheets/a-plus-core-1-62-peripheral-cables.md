---
title: "A+ Core 1 3.2: Peripheral Cables"
description: "Professor Messer A+ 220-1201 objective 3.2 — USB versions and speeds, connector types and USB-C, DB-9 serial, RS-232 console access, and Thunderbolt 1 to 4."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "usb", "usb-c", "thunderbolt", "serial"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Peripheral Cables"
moduleOrder: 62
unit: 3
---

> **In one line:** USB speeds climb from 1.5 Mbps to 20 Gbps across versions 1.1 to 3.2, USB-C is one reversible connector that says nothing about the signal on it, DB-9 serial survives for console access when nothing else works, and Thunderbolt carries 40 Gbps plus power on a daisy-chainable USB-C cable.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (Peripheral Cables).* The full version is the Peripheral Cables class notes; the section overview is the Section 3 sheet.

---

## USB speeds

| Version | Name | Max speed | Approx. cable |
|---|---|---|---|
| 1.1 | Low speed | 1.5 Mbps | 3 m |
| 1.1 | Full speed | 12 Mbps | 5 m |
| 2.0 | High speed | 480 Mbps | 5 m |
| 3.0 | **SuperSpeed** | 5 Gbps | 3 m |
| 3.1 | — | 10 Gbps | — |
| 3.2 | — | 20 Gbps | — |

**Lengths are approximate** — the USB spec sets no exact maximum; these are the practical limits for that throughput. Extend with a **powered hub**, not a longer passive cable.

Beyond the exam: 3.0 is now marketed as **3.2 Gen 1**, 3.1 as **3.2 Gen 2**, 20 Gbps as **3.2 Gen 2x2**; **USB4** = 40 Gbps, built on Thunderbolt 3.

## USB connectors

| Connector | USB 1.1 / 2.0 | USB 3.0 |
|---|---|---|
| **Standard-A** | Familiar rectangular plug | **Same form factor** |
| **Standard-B** | Squarer — printers, peripherals | Slightly **taller** |
| **Mini-B** | Small, mobile devices | — |
| **Micro-B** | Smaller still | **Completely different shape** |

A 2.0 Micro-B cable fits part of a 3.0 Micro-B socket and works — at 2.0 speeds. Looks like a slow drive, is actually the wrong cable.

## USB-C

| Point | Detail |
|---|---|
| What | One connector replacing all the earlier types |
| Reversible | No correct orientation — plug it in either way |
| **Critical** | It describes the **physical interface only**, **not the signal** — USB data, DisplayPort, Thunderbolt or power can all run over it |
| Size | Similar to Micro-B; much smaller than Standard-A |

Two identical-looking USB-C cables can differ wildly: 40 Gbps + 100 W versus charge-only. **The cable is always a prime suspect** when a USB-C dock or monitor misbehaves.

## Serial and console

| Term | Detail |
|---|---|
| Connectors | **DB-25** (25 pins, B-size shell) · **DB-9** (9 pins, properly **DE-9** — E-size shell, but the DB name stuck) |
| Signalling | **RS-232** (Recommended Standard 232) — predates USB, mice and keyboards |
| Today | Legacy switches, routers, firewalls — the **console port** |
| Why it matters | Works **when no other method does** — it doesn't depend on the network. Drops you at a command prompt |

| Console interface | Note |
|---|---|
| **RJ45** | Looks like Ethernet, carries **serial** — the classic trap |
| **DB-9** | Traditional serial connector |
| **USB** | Common on newer switches and routers |

**Adapter chain from a modern laptop:** USB/USB-C → **USB-to-serial adapter** (enumerates as a COM port) → **DB-9** → **DB-9-to-RJ45 console cable** → CONSOLE port. Terminal defaults are usually **9600 8N1**.

## Thunderbolt

| Version | Connector | Throughput | Notes |
|---|---|---|---|
| **TB1** | Mini DisplayPort | 10 Gbps × 2 channels = **20 Gbps** | Reused an existing connector |
| **TB2** | Mini DisplayPort | **20 Gbps** aggregated | Channels combined |
| **TB3** | **USB-C** | **40 Gbps** | 3 m copper · up to **60 m optical** |
| **TB4** | USB-C | **40 Gbps** | **Dual-4K** video, more **PCIe** bandwidth |

- **Data and power on one cable** — a peripheral runs from a single connection.
- **Daisy chaining:** laptop → monitor → monitor → storage. Thunderbolt tracks which device is which; no need for a port each.
- TB3 could often drive dual 4K already; **TB4 makes it a required minimum** (plus ≥32 Gbps PCIe). TB4's story is consistency, not raw speed.
- A Thunderbolt port is USB-C shaped — **same shape, different capability**.

## 🔐 Security notes

- **USB is the classic physical attack surface:** a device can present as a keyboard and type commands on insertion. Port control policy, disable unused ports, never plug in found devices.
- **Thunderbolt exposes PCI Express directly** — that's the speed, and it means a malicious device may reach memory over **DMA**. IOMMU plus device approval prompts mitigate it; never set "always allow", never plug in unknown docks.
- **Console ports are unauthenticated physical access by design** — the cabinet lock is the access control. Network gear belongs in locked rooms.
- **A USB-C plug says nothing about what the cable does** — treat public charging cables and borrowed docks as untrusted; use a charge-only cable or your own adapter.
- **Daisy chains extend trust** — everything downstream shares the same high-speed path.
- **Adapters are devices too,** and a technician's USB-to-serial adapter touches every switch in the estate. Known sources only.

## Practice drills

<details>
<summary>1. USB 1.1, 2.0, 3.0, 3.1, 3.2 speeds?</summary>

**1.5/12 Mbps · 480 Mbps · 5 Gbps · 10 Gbps · 20 Gbps.** 3.0 is branded **SuperSpeed**.
</details>

<details>
<summary>2. Why are USB cable lengths "approximate"?</summary>

The **specification sets no exact maximum** — the figures are the practical limits for maintaining that throughput.
</details>

<details>
<summary>3. Which USB 3.0 connector changed shape completely?</summary>

**Micro-B.** Standard-A kept its form factor; Standard-B just got taller.
</details>

<details>
<summary>4. What does a USB-C connector tell you about the signal?</summary>

**Nothing.** It's a physical interface only — USB, DisplayPort, Thunderbolt or power can all run over it.
</details>

<details>
<summary>5. Why is DB-9 really DE-9?</summary>

The letter is the **shell size** in the D-subminiature family. Nine pins use the **E** shell; the "DB" name carried over from the 25-pin DB-25.
</details>

<details>
<summary>6. Why does console access still matter?</summary>

It **works when nothing else does** — it doesn't depend on the network. You get a command prompt on a switch, router or firewall.
</details>

<details>
<summary>7. What's the trap with an RJ45 console port?</summary>

It looks like Ethernet but carries **serial** signalling. A normal patch lead accomplishes nothing.
</details>

<details>
<summary>8. Thunderbolt 3: connector, speed, distances?</summary>

**USB-C, 40 Gbps, 3 m copper or up to 60 m optical.** Supports daisy chaining, and carries power on the same cable.
</details>

## Key takeaways

- USB: 1.5/12 Mbps → 480 Mbps → 5 → 10 → 20 Gbps; lengths approximate, ~3–5 m.
- Connectors: Standard-A/B, Mini-B, Micro-B — 3.0's Micro-B is a different shape entirely.
- USB-C = one reversible connector, and it says nothing about the signal carried.
- DB-9 (DE-9) / RS-232 lives on as console access — RJ45 console ports are serial, not Ethernet.
- Thunderbolt: data + power, daisy chains, Mini DisplayPort on TB1/2 and USB-C at 40 Gbps on TB3/4.
