---
title: "A+ Core 1 3.8: Impact Printers"
description: "A+ Core 1 3.8 — dot-matrix print heads, ribbons, tractor-feed paper, green bar paper, and multi-part carbonless copies."
tags: ["a-plus", "comptia", "messer", "hardware", "impact-printer", "dot-matrix", "tractor-feed", "multipart-paper"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "Impact Printers"
moduleOrder: 89
unit: 3
---

> **In one line:** a dot-matrix printer strikes a pin matrix through a ribbon onto tractor-fed paper — noisy and low-res, but cheap per page and the only type that produces carbon-copy multi-part output in one pass.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.8.* The full version is the Impact Printers class notes; the section overview is the Section 3 sheet.

## How it works

| Component | Role |
| --- | --- |
| Print head | Moves back and forth per line; holds the **pin matrix**; runs warm (large heat sink) |
| Ribbon | Continuous loop in a **replaceable cartridge**; full page width; size varies by make/model |
| Tractor feed | Sprockets engage **edge holes**; misalignment/missed holes → **jam** |
| Paper | **Tractor/fanfold** paper (continuous or perforated); **green bar paper** was common for source-code printouts |

## Strengths vs weaknesses

| Strength | Weakness |
| --- | --- |
| Can produce **carbon copies** (multi-part) | **Noisy** |
| Low cost per page | **Low resolution** |

→ mostly **niche use** today (multi-part forms, high-volume plain text).

## Multi-part paper

- **Carbon paper** (traditional) or **micro-encapsulated ink + clay reaction** (modern, cheaper): ink capsules on the back of sheet 1 react with clay on sheet 2, creating a copy without the head touching sheet 2.
- **Caution:** the inks/dyes and clay can **irritate skin** with extended handling.
- Many orgs now just **print a separate copy** on another printer instead — cheaper and easier than maintaining ribbons/paper/mechanics.

## 🔐 Security notes

- **Legacy printers = legacy connectivity:** often on old parallel/serial links to unpatched hosts — isolate/segment rather than leave exposed on the network.
- **Physical simultaneity has value:** multi-part carbon-style copies are harder to selectively forge after the fact than two separately printed pages — understand why a process may still rely on one.
- **Spent ribbons hold data:** every character struck is physically imprinted (in reverse) and can in principle be read back — dispose of sensitive ribbons securely, like printed waste.

## Practice drills

<details>
<summary>1. How does a dot-matrix printer form characters?</summary>

A matrix of pins in the print head strikes a ribbon, transferring ink to the paper as small dots.
</details>

<details>
<summary>2. One advantage and two disadvantages of impact printers?</summary>

Advantage: can produce carbon copies (and low cost per page); disadvantages: noisy and low resolution.
</details>

<details>
<summary>3. Why does the print head need a heat sink?</summary>

Repeated pin strikes make it run warm; the heat sink dissipates that heat.
</details>

<details>
<summary>4. What is a tractor feed, and what happens if the holes misalign?</summary>

Sprockets pull paper via edge holes; misaligned or missed holes cause a paper jam.
</details>

<details>
<summary>5. What was green bar paper commonly used for?</summary>

Printing source code, giving programmers an easier-to-review printout.
</details>

<details>
<summary>6. How does carbonless multi-part paper create a copy?</summary>

Micro-encapsulated ink on the back of the top sheet reacts with a clay coating on the sheet below.
</details>

<details>
<summary>7. Why have many organisations moved away from multi-part impact printing?</summary>

Printing a separate copy on another printer is now cheaper and easier than maintaining a dot-matrix printer's ribbons, paper and moving parts.
</details>

## Key takeaways

- **Pin matrix + ribbon = dots on the page**; head sweeps per line, page advances.
- **Ribbon** = one continuous loop in a quick-swap cartridge; **tractor feed** needs holes aligned or it jams.
- **Green bar / fanfold** paper is the classic tractor-feed look.
- **Multi-part paper** (carbon or ink+clay) makes copies in one pass — but can irritate skin, and reprinting elsewhere is now often simpler.
- **Security:** legacy connectivity to isolate; spent ribbons carry a physical data imprint — dispose securely.
