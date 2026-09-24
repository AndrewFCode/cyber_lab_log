---
title: "A+ Core 1 3.1: Display Attributes"
description: "Professor Messer A+ 220-1201 objective 3.1 — pixel density and PPI maths, refresh rate vs FPS and V-sync, resolution and aspect ratio, and colour gamut percentages."
tags: ["a-plus", "comptia", "messer", "hardware", "displays", "resolution", "refresh-rate", "colour-gamut"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Display Attributes"
moduleOrder: 58
unit: 3
---

> **In one line:** pick the display from the job — pixel density for sharpness, hertz for motion, resolution and aspect ratio for how much fits on screen, and colour gamut percentages for anything colour-critical.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.1 (Display Attributes).* The full version is the Display Attributes class notes; the section overview is the Section 3 sheet.

---

## Match the spec to the job

| Use | What matters |
|---|---|
| Gaming, sport | High refresh rate (Hz), fast response |
| Graphics, video editing | Colour gamut, panel type (IPS/OLED) |
| Video watching | Resolution, colour |
| Lobby signage | Size and brightness — PPI barely matters at distance |
| Presentations | Resolution, viewing angle |

## Pixel density (PPI)

| Point | Detail |
|---|---|
| What | Pixels per inch of display area (or per cm outside the US) |
| Why | Higher PPI = sharper, crisper image |
| Maths | **horizontal pixels ÷ width in inches** |
| Trap | Advertised size is the **diagonal**, not the width |
| Printing | Check the printer's **DPI** separately — different measurement |

| Display | Width | Pixels across | PPI |
|---|---|---|---|
| 27-inch 4K monitor | ~24 in | 3,840 | **160** |
| 65-inch 4K TV | ~57 in | 3,840 | **67** |

Same resolution, very different sharpness — **resolution alone says nothing about clarity**.

## Refresh rate

| Term | Meaning |
|---|---|
| Hertz (Hz) | Cycles per second — how often the **display** redraws |
| FPS | Frames per second — how many images the **content** supplies |
| V-sync | Locks frame rate to refresh rate, so Hz = FPS |
| Stutter | Motion looks jerky when the refresh rate can't keep up |

| Content | Typical FPS |
|---|---|
| Films (US) | 24 |
| TV shows, online video | 30 |
| Sport, gaming | 60+ |

**The whole chain must support it** — display **and** graphics card **and** cable/port:

| Connection | Capability (per the lesson) |
|---|---|
| HDMI 2.1 | 4K at up to 144 Hz (uncompressed headline is 4K120; 144 Hz uses **DSC**) |
| DisplayPort 2.1 | **Dual** 4K displays, each up to 144 Hz |

144 Hz monitor stuck at 60 Hz? Check, in order: **cable → which port → graphics card → OS display settings → the monitor's own high-bandwidth input mode**.

## Resolution and aspect ratio

| Standard | Pixels | Note |
|---|---|---|
| HD (1080p) | 1,920 × 1,080 | 2,073,600 pixels |
| 4K | 3,840 × 2,160 | 8,294,400 — **four times** HD |

- Most standards are **16:9** (1,920÷1,080 and 3,840÷2,160 both reduce to 16:9).
- Some displays use non-standard resolutions or other ratios (ultrawide 21:9).
- Aspect ratio from a resolution: divide both numbers by their greatest common divisor.

## Colour gamut

| Point | Detail |
|---|---|
| What | The range of colours a display can reproduce — the eye sees far more |
| Measured on | The **CIE 1931** colour space; each standard is a triangle on it |
| Standards | **sRGB** (Standard Red Green Blue) · **Adobe RGB** · **ITU / Rec. 709** · **DCI-P3** |
| On the spec sheet | Percentages, e.g. 100% Rec. 709 / 100% sRGB / 98% DCI-P3 |
| Reading it | Higher % = closer to that standard. 95% sRGB fine for email; colour work wants 100% |
| Best gamut | **OLED** generally beats LCD; among LCDs, **IPS** (some variants reach deeper blacks and higher sRGB coverage) |

## 🔐 Security notes

- **High PPI makes shoulder surfing and camera capture easier** — sharper screens stay legible from further away.
- **Lobby signage is an unattended endpoint:** the media player behind it needs unique credentials, patching and an isolated VLAN.
- **Unexplained resolution or refresh-rate changes** are usually a cable or driver fault — but confirm that rather than assuming, since remote-control tools cause the same symptom.
- **Resolution and colour depth feed browser fingerprinting** — an unusual combination makes a user more identifiable.
- **A cheap "HDMI 2.1" cable that negotiates a lower mode** is the small version of a general rule: verify what the hardware does, not what the box claims.

## Practice drills

<details>
<summary>1. How do you calculate PPI, and what's the trap?</summary>

**Horizontal pixels ÷ width in inches.** The trap: advertised size is the **diagonal**, so convert to width first.
</details>

<details>
<summary>2. Why does 4K look sharper on a 27-inch monitor than a 65-inch TV?</summary>

Same 3,840 pixels over a much bigger area: ~**160 PPI** vs ~**67 PPI**.
</details>

<details>
<summary>3. Hz vs FPS, and what links them?</summary>

Hz = how often the **display** refreshes; FPS = how many images the **content** has. **V-sync** locks them together.
</details>

<details>
<summary>4. Typical frame rates for film, TV and gaming?</summary>

**24 / 30 / 60+ FPS.**
</details>

<details>
<summary>5. You buy a 144 Hz monitor. What else must support 144 Hz?</summary>

The **graphics card** and the **connection type** (cable and port) — e.g. HDMI 2.1 or DisplayPort 2.1.
</details>

<details>
<summary>6. How many more pixels does 4K have than HD?</summary>

**Four times** — twice as many across and twice as many down.
</details>

<details>
<summary>7. What is the CIE 1931 colour space used for?</summary>

Plotting what the human eye can see, so each display standard's coverage (sRGB, Adobe RGB, DCI-P3) can be drawn on it and compared.
</details>

<details>
<summary>8. 100% sRGB vs 95% sRGB — when does it matter?</summary>

For **graphics and video editing**, yes. For **web and email**, 95% is fine.
</details>

## Key takeaways

- PPI = pixels ÷ width in inches; the advertised size is the diagonal. Same resolution ≠ same sharpness.
- Hz is the display's refresh rate, FPS is the content's; V-sync ties them. 24 film / 30 TV / 60+ gaming.
- The card and the cable must support the refresh rate too — not just the monitor.
- HD 1,920 × 1,080; 4K 3,840 × 2,160 (four times the pixels); most standards are 16:9.
- Colour gamut is quoted as % of sRGB / Adobe RGB / Rec. 709 / DCI-P3 on the CIE 1931 space; OLED generally widest.
