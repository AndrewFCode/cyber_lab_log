---
title: "A+ Core 1 3.2: Video Cables"
description: "Professor Messer A+ 220-1201 objective 3.2 — HDMI, DisplayPort and its locking connector, DVI variants and single/dual link, VGA, and video over USB-C."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "hdmi", "displayport", "dvi", "vga"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Video Cables"
moduleOrder: 63
unit: 3
---

> **In one line:** HDMI and DisplayPort carry audio and video together (DisplayPort locks in place and can adapt passively to HDMI/DVI with DP++), DVI and VGA carry video only, and USB-C is just a connector that can carry any of these signals depending on the port and cable.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (Video Cables).* The full version is the Video Cables class notes; the section overview is the Section 3 sheet.

---

## At a glance

| Standard | Audio? | Signal | Connector | Practical range |
|---|---|---|---|---|
| **HDMI** | Yes | Digital | 19-pin **Type A** | ~15–25 m passive (roughly 20 m) |
| **DisplayPort** | Yes | Digital, **packetised** | Locking, one slanted corner | Similar; varies by cable |
| **DVI** | No | Digital / analogue (by type) | Multiple pin layouts | Short — copper-length sensitive |
| **VGA** | No | Analogue | **DB-15 / DE-15**, blue | Degrades from ~5 m onward |

## HDMI

- **High Definition Multimedia Interface** — audio + video together.
- **19-pin Type A** connector; bottom corners indented so only HDMI fits.
- Practical passive range commonly cited **15–25 m** — treat ~20 m as a rule of thumb, not a hard spec; go active/optical beyond that or for demanding HDMI 2.1 resolutions.

## DisplayPort

- Audio + video, sent **packetised** (conceptually like Ethernet frames).
- **Passive** adapter to HDMI/DVI works only if the port supports **DP++** (Dual-Mode DisplayPort); otherwise needs an **active** adapter.
- **Full-size** on desktops/cards; **Mini DisplayPort** on some devices.
- **Locks in place** — small tabs along the top. **Press the release button** before pulling it out.
- Shape: one corner slanted — can't be mistaken for HDMI despite similar size.

## DVI

| Variant | Signal | Notes |
|---|---|---|
| **DVI-A** | Analogue only | Backwards-compatible with VGA |
| **DVI-D** | Digital only | Single or dual link |
| **DVI-I** | Digital **and** analogue | "Integrated" |

**Letter = signal type: A**nalogue, **D**igital, **I**ntegrated.

| | Single link | Dual link |
|---|---|---|
| Throughput | ~**3.96 Gbps** | ~roughly double |
| Max resolution | **1920 × 1200** | Higher |

**No audio.** Connectors are pin-count specific — a dual-link plug won't fit a single-link-only port, even though both are digital. Always match signal type **and** link type at both ends.

## VGA

- **Video Graphics Array** — legacy, **video only**, **analogue**.
- Connector: **DB-15** (properly **DE-15** — E-size shell, DB name stuck), conventionally **blue** (PC System Design Guide colour scheme).
- **Analogue signal degrades with distance** — the lesson flags around **5 m** as a caution point; real-world tolerance varies with resolution/refresh rate.

## Telling them apart

HDMI, DisplayPort, DVI and VGA all have **distinctly different connector shapes** — misidentifying the port on the back of a machine is uncommon once you know what to look for.

## Video over USB-C

- **USB-C is a connector, not a signal.** It can carry: USB data, power, serial, **Thunderbolt**, **DisplayPort** (Alt Mode), **HDMI**, or **MHL** (Mobile High-definition Link, mobile devices).
- **Charging ≠ video capability.** A cable that charges fine may carry no video signal — both the **port** and the **cable** need to support it.
- Check for DisplayPort Alt Mode / Thunderbolt support on the specific port before assuming video will work.

## 🔐 Security notes

- **A tapped video link discloses exactly what's on screen** — passwords, OTPs, documents — without touching the endpoint's OS.
- **USB-C's multi-signal nature widens the attack surface:** a malicious "charging" cable or dock can carry video and data at once. Treat unfamiliar docks and cables as untrusted.
- **DisplayPort's lock is a minor physical plus** — resists accidental disconnection of a shared display, not a real access control.
- **Adapters and converters are active devices in the path** — source them from trusted supply, especially in shared/hot-desk equipment.
- **Analogue (VGA) is easier to intercept passively** than modern digital links — prefer digital where content sensitivity matters.

## Practice drills

<details>
<summary>1. What does HDMI carry, and over what connector?</summary>

**Audio and video together,** over a **19-pin Type A** connector.
</details>

<details>
<summary>2. How does DisplayPort send its data, conceptually?</summary>

**Packetised** — similar in concept to Ethernet.
</details>

<details>
<summary>3. A monitor cable won't unplug no matter how hard you pull. What is it, and the fix?</summary>

**DisplayPort.** Press the **release button** before pulling.
</details>

<details>
<summary>4. DVI-A, DVI-D, DVI-I — what do the letters mean?</summary>

**A**nalogue, **D**igital, **I**ntegrated (both).
</details>

<details>
<summary>5. Single-link DVI: throughput and max resolution?</summary>

**~3.96 Gbps, up to 1920 × 1200.** Dual-link roughly doubles it.
</details>

<details>
<summary>6. Does VGA carry audio? Digital or analogue?</summary>

**No audio. Analogue** — signal degrades with cable length.
</details>

<details>
<summary>7. A USB-C cable charges a laptop but the monitor shows nothing. Why?</summary>

**USB-C is just a connector** — charging works independently of video. The port or cable likely lacks DisplayPort Alt Mode / video support.
</details>

<details>
<summary>8. DVI-D dual-link cable, DVI-D single-link port — will it work?</summary>

**No.** Dual-link needs extra pins the single-link port physically lacks, regardless of both being digital.
</details>

## Key takeaways

- HDMI and DisplayPort carry audio + video; DVI and VGA carry video only.
- DisplayPort locks — press the button to release — and can passively adapt to HDMI/DVI only with DP++.
- DVI letter = signal type (A/D/I); single vs dual link changes throughput and max resolution (3.96 Gbps / 1920×1200 for single).
- VGA is analogue, blue DB-15 (DE-15), and degrades with distance.
- USB-C is a connector, not a promise of video — check the port and cable both support it.
