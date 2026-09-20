---
title: "Code: Peripherals"
description: "Code ch. 25 — getting data in and out: I/O ports vs memory-mapped I/O, polling vs interrupts, DMA, and device controllers."
tags: ["code", "petzold", "computing", "io", "hardware"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 25"
moduleOrder: 25
unit: 25
---
> **In one line:** a CPU alone is deaf and mute — peripherals and the I/O methods that connect them (ports, interrupts, DMA) are how it senses and acts on the world.

*Companion to: Charles Petzold, Code (2nd edition), chapter 25.*

---

## Reaching the outside world

| Method | How the CPU talks to a device |
|---|---|
| I/O ports | Special `IN` / `OUT` instructions to numbered ports, separate from memory (x86 style) |
| Memory-mapped I/O | The device appears at ordinary memory addresses; normal load/store reaches it (ARM, RISC-V) |

A **device controller** sits between the CPU and each peripheral, translating and buffering.

---

## Knowing when a device is ready

| Approach | How it works | Cost |
|---|---|---|
| Polling | The CPU keeps asking "ready yet?" | Wastes CPU time |
| **Interrupts** | The device raises a signal; the CPU stops, runs an **interrupt handler**, then resumes | Efficient — the standard approach |
| **DMA** | A DMA controller moves data between device and memory **without** the CPU, then interrupts when done | Frees the CPU for big transfers (disk, network) |

**Handling an interrupt:** the CPU saves its state (using the stack, [ch. 24](/resources/code/24/)), jumps via the **interrupt vector table** to the handler, does the work, then restores state and carries on.

---

## Common peripherals and buses

| Peripheral | Notes |
|---|---|
| Keyboard, mouse | Send interrupts on each event |
| Display / GPU | Framebuffer memory mapped into address space |
| Storage | Disks and SSDs, via SATA or NVMe |
| Network card | Sends and receives frames; uses DMA |
| USB | A host-controlled bus for a huge range of devices |

---

## Try it

```powershell
Get-PnpDevice | Where-Object Status -eq 'OK' | Select-Object Class, FriendlyName -First 20
Get-PnpDevice -PresentOnly | Where-Object Status -ne 'OK'      # problem devices
```

```bash
lspci          # devices on the PCI bus
lsusb          # USB devices
cat /proc/interrupts | head    # interrupt counts per device
```

---

## 🔐 Security and IT connections

- **DMA is a double-edged sword.** Because DMA devices reach memory directly, a malicious device on a DMA-capable port (Thunderbolt, older FireWire) can read RAM — keys and all — bypassing the OS. **DMA attacks** are countered by the **IOMMU** and by settings like Windows Kernel DMA Protection. Don't plug untrusted peripherals into Thunderbolt ports.
- **USB is a top attack vector.** A "USB stick" can register itself as a keyboard and type commands (BadUSB / Rubber Ducky). Disable autorun, and don't plug in found drives.
- **Malicious drivers run in the kernel.** A signed-but-vulnerable driver ("bring your own vulnerable driver") gives attackers kernel access — which is why driver allow-listing and HVCI exist.

---

## Practice drills

<details>
<summary>1. Why are interrupts better than polling?</summary>

The CPU does other work until the device signals it's ready, instead of wasting cycles asking.
</details>

<details>
<summary>2. What does DMA let a device do?</summary>

Transfer data straight to and from memory without the CPU copying each byte.
</details>

<details>
<summary>3. Why is DMA a security concern, and what mitigates it?</summary>

A malicious DMA device can read RAM directly. The IOMMU (and Kernel DMA Protection) restricts which memory a device can reach.
</details>

---

## Key takeaways

- I/O is done through ports or memory-mapped addresses, via device controllers.
- Interrupts beat polling; DMA moves bulk data without the CPU.
- Direct hardware access (DMA, USB, drivers) is powerful and dangerous — the IOMMU and USB caution are the defences.
