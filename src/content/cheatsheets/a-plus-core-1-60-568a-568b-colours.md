---
title: "A+ Core 1 3.2: 568A and 568B Colours"
description: "Professor Messer A+ 220-1201 objective 3.2 — ANSI/TIA-568 and ISO/IEC 11801, the T568A and T568B pinouts, the four pins that differ, crimping checks and keystone jacks."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "t568a", "t568b", "rj45"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "568A and 568B Colours"
moduleOrder: 60
unit: 3
---

> **In one line:** ANSI/TIA-568 defines two pin-and-colour schemes for the same RJ45 connector — T568A and T568B — which differ only on pins 1, 2, 3 and 6 where orange and green swap, and the only rule that really matters is to pick one and use it at both ends of every cable.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (568A and 568B Colours).* The full version is the 568A and 568B Colours class notes; the section overview is the Section 3 sheet.

---

## The standards

| Body | Document | Covers |
|---|---|---|
| ISO/IEC | **ISO/IEC 11801** | International cabling standard — classes of cabling |
| TIA (US) | **ANSI/TIA-568** | Commercial building cabling installation — contains T568A and T568B |

Same **RJ45** connector for both schemes; only the colour-to-pin assignment differs.

## The pinouts

| Pin | T568A | T568B | |
|---|---|---|---|
| 1 | White/green | **White/orange** | differ |
| 2 | Green | **Orange** | differ |
| 3 | White/orange | **White/green** | differ |
| 4 | Blue | Blue | same |
| 5 | White/blue | White/blue | same |
| 6 | Orange | **Green** | differ |
| 7 | White/brown | White/brown | same |
| 8 | Brown | Brown | same |

- **Only pins 1, 2, 3 and 6 differ** — the orange and green pairs swap. Pins 4, 5, 7, 8 are identical.
- **Memorise B only:** W/Or, Or, W/Gn, Bl, W/Bl, Gn, W/Br, Br. Swap orange ↔ green for A.
- **Mnemonic:** A starts **green**, B starts **orange**.
- **T568B is the common choice** in the US and most places. Consistency across a site matters more than which one.

## Reading a finished cable

| Step | Do |
|---|---|
| 1 | Hold the plug with the **clip away from you**, contacts facing you — pin 1 is on the left |
| 2 | Read colours left to right |
| 3 | Ignore pins 4, 5, 7, 8 — both schemes agree |
| 4 | **Pin 1 white/orange → B · white/green → A** |
| 5 | Check the **other end matches** |

## Crimping

Insert the wires and **look through the connector before you squeeze** — nothing is lost by pulling them out and rearranging, and a crimp can't be undone.

| Step | Detail |
|---|---|
| Strip and fan | Expose the four pairs |
| Untwist minimally | Only as far as the connector needs |
| Order and trim square | All eight reach the front together |
| Insert and **inspect** | Read the colour order through the plug |
| Crimp, then test | Continuity test both ends |

| Tester result | Likely cause |
|---|---|
| Two pins never light | That pair didn't reach the front, or was trimmed short |
| Lights out of sequence | Wires in the wrong order — wrong scheme or a crossed pair |
| Works at 100, fails gigabit | Pins **4, 5, 7, 8** (blue/brown) — unused by 10/100, required by gigabit |

## Don't mix A and B

- Wire **both ends the same**. Never A on one end, B on the other.
- You'll see it called a crossover online. It **is** the classic **10/100** crossover (crosses 1/2 with 3/6) — but it is **not** a gigabit crossover, which must also cross 4/5 with 7/8.
- **Auto-MDI-X** on modern equipment corrects crossovers in hardware anyway, so crossover cables aren't needed.

## Keystone jacks

| Point | Detail |
|---|---|
| Printed guide | **A colours on one edge, B colours on the other** — pick your scheme, ignore the other row |
| Layout | Often four wires each side of the jack |
| A example | Green, white/green, blue, white/blue on one side |
| B example | Orange, white/orange, blue, white/blue on one side |
| **The catch** | The jack's printed order **deliberately doesn't match the pinout** — it's arranged for easy punching, and the jack routes contacts internally |

**Follow the label on the jack, not the pinout table.** The table is for plugs you crimp yourself.

## 🔐 Security notes

- **Consistency makes anomalies visible:** on an all-B site, a non-standard cable raises a question. Where everything is arbitrary, an added or spliced run goes unnoticed.
- **Hand-made cables deserve scrutiny** — a plug can be crimped onto a cable cut and rejoined mid-run. Neat, labelled terminations make inserted devices easier to spot.
- **Bad terminations create intermittent faults,** and teams that learn to ignore flapping alerts lose the signal that matters.
- **Documentation is incident-response speed:** knowing the standard, panel position and room turns "trace this cable" into a lookup.
- **Unused punched-down runs are latent network access** — patch only what's in use, and keep the record current.
- **Test what you install.** A continuity test verifies the wiring rather than assuming the installer got it right.

## Practice drills

<details>
<summary>1. Write out T568B.</summary>

**White/orange, orange, white/green, blue, white/blue, green, white/brown, brown.**
</details>

<details>
<summary>2. Which pins are identical between A and B?</summary>

**4, 5, 7 and 8** — blue, white/blue, white/brown, brown.
</details>

<details>
<summary>3. In one sentence, how do A and B differ?</summary>

On pins **1, 2, 3 and 6**, the **orange and green pairs swap**.
</details>

<details>
<summary>4. A cable's first two wires are white/green then green. Which scheme?</summary>

**T568A.**
</details>

<details>
<summary>5. Why not wire A on one end and B on the other?</summary>

Both ends should match. It crosses 1/2 with 3/6 — the old 10/100 crossover, **not** a gigabit crossover — and **Auto-MDI-X** makes crossover cables unnecessary anyway.
</details>

<details>
<summary>6. What's the single most useful habit when crimping?</summary>

**Insert the wires and inspect the colour order through the connector before crimping.**
</details>

<details>
<summary>7. New cable, tester shows pins 3 and 6 open. Which pair, and the fix?</summary>

The **green** pair in T568B. Those wires didn't reach the front of the plug — cut the connector off and re-terminate.
</details>

<details>
<summary>8. Why doesn't a keystone jack's printed colour order match the pinout?</summary>

The layout is arranged for **easy punching**; the jack routes each contact internally to the correct RJ45 pin. Follow the printed guide.
</details>

## Key takeaways

- ANSI/TIA-568 (US) and ISO/IEC 11801 (international) standardise cabling; both schemes use the same RJ45.
- T568B: W/Or, Or, W/Gn, Bl, W/Bl, Gn, W/Br, Br. T568A swaps orange and green.
- Only pins 1, 2, 3, 6 differ; 4, 5, 7, 8 are identical.
- Pick one scheme per site (usually B) and wire both ends of every cable the same.
- Inspect through the connector before crimping; follow the jack's printed guide when punching down.
