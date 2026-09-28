---
title: "A+ Core 1 3.5: Motherboard Form Factors"
description: "A+ Core 1 3.5 — ATX vs micro-ATX vs Mini-ITX: size, slots, power (20/24-pin) and shared ATX mounting."
tags: ["a-plus", "comptia", "messer", "hardware", "motherboard", "form-factors", "atx", "micro-atx", "mini-itx"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "Motherboard Form Factors"
moduleOrder: 73
unit: 3
---

> **In one line:** three boards to know — ATX (largest, most slots), micro-ATX (smaller, ATX-compatible), Mini-ITX (smallest) — all sharing ATX mounting points.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the Motherboard Form Factors class notes; the section overview is the Section 3 sheet.

## The three form factors

| | ATX | micro-ATX | Mini-ITX |
| --- | --- | --- | --- |
| Size | Largest | Middle | Smallest |
| Full name | Advanced Technology Extended | Micro-ATX | Mini-ITX |
| Appeared | 1995 | From ATX | From ITX |
| Expansion slots | Most | Fewer | Fewest (often one) |
| Memory slots | Most (e.g. 4) | Fewer (e.g. 2) | Fewest |
| Main power | 20-pin → 24-pin | Same as ATX | Same family |
| Mounting points | ATX standard | Same as ATX | ATX-compatible |
| Fits ATX case | Yes | Yes | Yes |
| Dimensions* | ~305 × 244 mm | ~244 × 244 mm | ~170 × 170 mm |

\*Dimensions are for reference — the exam leans on the relative ordering, not the millimetres.

## Choosing by scenario (objective 3.5 is scenario-based)

| Job | Pick | Why |
| --- | --- | --- |
| 4K video-editing desktop | ATX | Most slots, most RAM, best cooling room |
| Small office, room to grow | micro-ATX | ATX-compatible, smaller, a slot or two spare |
| Media box beside the TV | Mini-ITX | Smallest, quiet, single task |

- **Rule:** pick the **smallest** board that still gives the expansion and cooling the job needs.
- **More slots is a tendency of size**, not a guaranteed spec — the maker decides how many to fit.

## 🔐 Security notes

- **A standard footprint helps an attacker too:** a tampered same-form-factor board drops into the same chassis and looks right (supply-chain / evil-maid). Physical asset checks — expected board, slot count, populated headers — catch it.
- **Small single-purpose boxes are still endpoints:** Mini-ITX appliances by a TV, at reception or in a cupboard are exposed and often unpatched. Inventory, patch and segment them; don't leave "just the media box" unmanaged on the LAN.

## Practice drills

<details>
<summary>1. Name the three form factors in size order.</summary>

ATX (largest) > micro-ATX (middle) > Mini-ITX (smallest).
</details>

<details>
<summary>2. What does ATX stand for, and when did it appear?</summary>

Advanced Technology Extended, 1995.
</details>

<details>
<summary>3. How did the ATX main power connector change?</summary>

From a 20-pin connector on early boards to a 24-pin on modern ones.
</details>

<details>
<summary>4. Two things micro-ATX keeps the same as ATX?</summary>

The mounting points and the power connectors.
</details>

<details>
<summary>5. Why does a Mini-ITX board fit an ATX case?</summary>

It keeps ATX-compatible mounting screw points, so the holes line up with the case standoffs.
</details>

<details>
<summary>6. A customer wants a quiet streaming box for the living room. Which board?</summary>

Mini-ITX — smallest footprint, fits a tight space, needs almost no expansion.
</details>

<details>
<summary>7. True or false: a bigger board guarantees more expansion slots.</summary>

False — a bigger board makes more slots possible, but the manufacturer decides how many to fit.
</details>

## Key takeaways

- **Three to know:** ATX (largest, most slots) → micro-ATX (smaller, ATX-compatible) → Mini-ITX (smallest).
- **ATX** = Advanced Technology Extended, 1995; main power **20-pin → 24-pin**.
- **micro-ATX** shares ATX's **mounting points and power**; fewer slots.
- **Mini-ITX** keeps **ATX-compatible mounting**, so it fits an ATX case; ideal for single-task builds.
- **Objective 3.5 is scenario-based:** choose the smallest board that meets the job's expansion and cooling needs.
