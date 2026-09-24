---
title: "A+ Core 1 3.2: Adapters and Converters"
description: "Professor Messer A+ 220-1201 objective 3.2 — DVI-D to HDMI and DVI-A to VGA compatibility, USB-to-Ethernet and USB-C-to-USB-A adapters, and USB hubs."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "adapters", "converters", "dvi", "usb"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Adapters and Converters"
moduleOrder: 65
unit: 3
---

> **In one line:** when both ends share the same signal type — DVI-D↔HDMI (digital), DVI-A↔VGA (analogue) — a simple passive adapter is enough; when the signal types differ, like VGA to DVI-D, you need real active conversion, and USB adapters and hubs fill the same kind of gap for network, USB-A and multi-port needs.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (Adapters and Converters).* The full version is the Adapters and Converters class notes; the section overview is the Section 3 sheet.

---

## The one rule that predicts everything

| Situation | What's needed |
|---|---|
| **Same signal type, different shape** | A simple **passive** adapter or cable |
| **Different signal type** | **Active** conversion — real processing, sometimes power |

## Video pairings

| Pairing | Signal types | Works how | Limit |
|---|---|---|---|
| **DVI-D ↔ HDMI** | Both digital | Passive cable/adapter, no conversion | Video only — no audio |
| **DVI-A ↔ VGA** | Both analogue | Passive adapter | Officially **640 × 480**; many real adapters do more — check the specific product |
| **VGA → DVI-D/DVI-I** | Analogue → digital | Needs **active** conversion | — |

**The trap:** DVI-A cannot adapt to HDMI — there's no digital signal to carry. Check which DVI variant (A/D/I) you actually have before reaching for an adapter.

## USB adapters

| Adapter | Solves | Notes |
|---|---|---|
| **USB-to-Ethernet** | Thin laptops with no RJ45 port | Especially useful for **network troubleshooting** — wired avoids Wi-Fi as a variable. Gigabit needs USB 3.0+ |
| **USB-C-to-USB-A** | Thin laptops with no USB-A port | Comes as a **longer cable** or a **compact plug-in adapter** |

## USB hubs

- One USB connection to the laptop, **many outputs** from the hub.
- Example in the lesson: USB, **SD** card slot, **HDMI**, **Ethernet**.
- Trade-off vs single-purpose adapters: broader coverage from one device, but **one point of failure** for several capabilities at once.
- Sensible bag: a hub for general coverage, plus a couple of single-purpose adapters for the connectors that come up most often.

## 🔐 Security notes

- **An adapter or hub is an active device on the path, not passive plastic.** USB hubs, USB-to-Ethernet adapters and active video converters have their own chips and sometimes firmware — a compromised one can inject keystrokes, tap traffic, or exfiltrate data, exactly like any other USB device.
- **A USB-to-Ethernet adapter is a new, possibly unmonitored NIC.** Confirm NAC, 802.1X and monitoring cover it the same as the built-in port — don't assume they do.
- **Unknown found adapters deserve the same suspicion as a found USB drive.** A DVI-to-HDMI adapter is low risk; anything with active electronics (a hub, a USB-Ethernet adapter) is not.
- **Passive video adapters carry essentially no data-security risk** — no processing means nothing to compromise. A genuine reason to prefer simple/passive when it's available.
- **Active converters and hubs are supply-chain items** — procure them for sensitive networks the way you'd procure any other data-capable device, not as an afterthought purchase.
- **A hub concentrates risk with convenience:** one bad hub can hit video, network and storage connections all at once.

## Practice drills

<details>
<summary>1. Why can DVI-D join to HDMI with just a cable?</summary>

Both are **digital** — electrically compatible, so no conversion is needed, only a connector shape change.
</details>

<details>
<summary>2. Official resolution limit for a DVI-A-to-VGA adapter?</summary>

**640 × 480.** (Many real-world adapters exceed this — check the specific product.)
</details>

<details>
<summary>3. Why does VGA-to-DVI-D need more than a shape adapter?</summary>

**Different signal types** — analogue to digital — need genuine **active** conversion.
</details>

<details>
<summary>4. Does a DVI-D-to-HDMI adapter carry audio?</summary>

**No.** DVI carries video only, regardless of the socket on the far end.
</details>

<details>
<summary>5. Why carry a USB-to-Ethernet adapter for network troubleshooting specifically?</summary>

Wired connectivity avoids introducing **Wi-Fi as a variable** into a diagnosis that's about the wired network itself.
</details>

<details>
<summary>6. Two physical forms a USB-C-to-USB-A adapter can take?</summary>

**A longer cable, or a compact plug-in adapter.**
</details>

<details>
<summary>7. Main trade-off of a USB hub vs several single-purpose adapters?</summary>

Broader coverage from one device, but a **single point of failure** for several capabilities at once.
</details>

<details>
<summary>8. What's the one rule that predicts whether a passive adapter is enough?</summary>

**Same signal type on both ends → passive is enough. Different signal types → active conversion needed.**
</details>

## Key takeaways

- Same signal type = passive adapter; different signal type = active conversion. That's the whole logic of this lesson.
- DVI-D↔HDMI: passive, video only. DVI-A↔VGA: passive, officially capped at 640×480.
- VGA→DVI-D needs active conversion — analogue to digital.
- USB-to-Ethernet and USB-C-to-USB-A adapters exist because thin laptops dropped RJ45 and USB-A.
- A USB hub trades single-point-of-failure risk for broad, unpredictable-need coverage.
