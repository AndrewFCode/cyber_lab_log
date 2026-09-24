---
title: "A+ Core 1 3.2: Network Cables"
description: "Professor Messer A+ 220-1201 objective 3.2 — twisted pair and why it is twisted, categories and distances, coax, UTP vs STP shielding codes, direct burial and plenum-rated cable."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "twisted-pair", "plenum", "coaxial"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Network Cables"
moduleOrder: 59
unit: 3
---

> **In one line:** twisted pair cancels interference by twisting equal-and-opposite pairs at differing rates, the category and IEEE 802.3 decide what speed runs how far, the shielding code on the jacket tells you what's inside, and where the cable goes — buried or above a drop ceiling — decides what jacket it needs.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (Network Cables).* The full version is the Network Cables class notes; the section overview is the Section 3 sheet.

---

## Twisted pair: why twisted

| Point | Detail |
|---|---|
| Pairs | Four: blue, green, orange, brown |
| Signals | Equal and opposite — **Transmit+** and **Transmit−** on the two wires |
| Why twisted | Both wires pick up the **same** interference, so the receiver subtracts what's common and keeps the difference |
| Twist rates | **Different for every pair**, so the receiver can compare across all four and separate noise from signal (also cuts crosstalk) |
| Practical | Keep the twists right up to the termination — untwisting undoes the protection |

## Categories and distances

**A cable has no speed** — the signalling and coding do. The category states what the cable was tested to carry, and **IEEE 802.3** defines the minimum category per Ethernet standard.

| Standard | Minimum category | Max distance |
|---|---|---|
| 1000BASE-T | Cat 5 | 100 m |
| 1000BASE-T (new cable) | Cat 5e | 100 m |
| 10GBASE-T | Cat 6 **unshielded** | **55 m** |
| 10GBASE-T | Cat 6 **shielded** | **100 m** |
| 10GBASE-T | Cat 6A | 100 m |

- **Cat 5 is deprecated** — new purchases are **Cat 5e** ("e" = **Enhanced**, extra qualification tests). Existing Cat 5 still runs gigabit to 100 m.
- **Cat 6A** — "A" = **Augmented**.
- The category is **printed on the jacket**.
- Beyond the exam: TSB-155 puts unshielded Cat 6 at 37–55 m depending on **alien crosstalk** (interference from neighbouring cables in the bundle). Specify Cat 6A for any new 10G install.

## Coaxial

| Point | Detail |
|---|---|
| Name | "Co-axial" — two or more forms sharing a common axis |
| Build | Inner conductor carries the signal; outer shield protects it |
| On networks | **Cable modems and digital cable** — high-speed internet over cable infrastructure |

## Shielding: UTP vs STP

| Code | Meaning |
|---|---|
| **U** | Unshielded |
| **S** | **S**hield — braided |
| **F** | **F**oil |

Format: **overall shielding / per-pair shielding + TP**

| Marking | Overall | Each pair |
|---|---|---|
| U/UTP | None | None — plain UTP |
| F/UTP | Foil | None |
| S/FTP | Braid | Foil |

A shield needs **shielded jacks, panels and patch leads** throughout, and grounding at the correct point — badly terminated STP can perform worse than plain UTP.

## Direct burial STP

| Feature | Why |
|---|---|
| Built for burial | Goes straight into the ground, often **without conduit** |
| Waterproof **gel** inside | Repels water around the pairs |
| **Shielded** | Interference protection, grounding, and extra strength |
| **Drain wire** | Runs the whole length of the cable as an electrical ground |
| Structure | Same four pairs as indoor STP, plus the gel and tougher jacket |

Inter-building copper carries surge and ground-potential risk — **fibre** avoids it entirely.

## Plenum-rated cable

| Term | Meaning |
|---|---|
| **Plenum space** | Open void above a drop ceiling where **return air circulates** |
| Not a plenum | Return air is ducted; the void air isn't circulating |
| The risk | Fire, smoke and toxic fumes travel freely through that open space — and into the air handling |
| Standard jacket | **PVC** (polyvinyl chloride) — not for plenum |
| Plenum jacket | **FEP** (fluorinated ethylene polymer) or **low-smoke PVC** |
| Trade-off | Electrically identical, but the jacket is **less flexible** and harder to work with |

Above a drop ceiling used for return air → **plenum-rated cable**, no exceptions. It's a building code requirement.

## 🔐 Security notes

- **Copper radiates, fibre doesn't.** Twisted pair emits a weak field (the same physics an inductive probe uses); shielding reduces it, fibre eliminates it and can't be tapped without breaking the light.
- **Cable routes are attack surface:** ceiling voids, risers and shared spaces can be reached, tapped or cut. Lock and document cable paths like comms rooms.
- **Inter-building runs leave your perimeter** — physical protection at both ends, and don't implicitly trust the far segment.
- **Wrong category is a slow-burn availability fault:** Cat 6 stretched past 55 m produces errors that look like an application problem.
- **Plenum ratings are life safety,** not preference — PVC jacket is what produces the toxic smoke.
- **Grounding and surges kill switch ports:** shields grounded at both ends, or unprotected copper between buildings, carry surges inside.

## Practice drills

<details>
<summary>1. Why are the wires twisted?</summary>

So **both wires pick up the same interference**; the receiver subtracts what's common to both (they carry equal and opposite signals) and keeps the real data.
</details>

<details>
<summary>2. Why is each pair twisted at a different rate?</summary>

So the receiver can compare interference **across all four pairs** and separate noise from signal — and to reduce crosstalk between pairs.
</details>

<details>
<summary>3. Does a cable have a speed?</summary>

**No.** The signalling and coding at each end have a speed; the **category** says whether the cable can carry it cleanly. IEEE 802.3 defines the minimum.
</details>

<details>
<summary>4. Minimum category and distance for 1000BASE-T?</summary>

**Cat 5, 100 m** — though Cat 5 is deprecated, so new cable is **Cat 5e** (Enhanced).
</details>

<details>
<summary>5. The three 10GBASE-T combinations?</summary>

**Cat 6 unshielded 55 m · Cat 6 shielded 100 m · Cat 6A 100 m** ("A" = Augmented).
</details>

<details>
<summary>6. Decode S/FTP and F/UTP.</summary>

**S/FTP** = braided shield overall, foil on each pair. **F/UTP** = foil overall, pairs unshielded.
</details>

<details>
<summary>7. What's a drain wire?</summary>

A wire running the full length of the cable used as an **electrical ground** — found on direct burial STP.
</details>

<details>
<summary>8. Cable above a drop ceiling carrying return air — what do you specify?</summary>

**Plenum-rated cable**: **FEP** or **low-smoke PVC** jacket, not ordinary PVC.
</details>

## Key takeaways

- Twisted pair cancels interference: equal and opposite signals, both wires exposed equally, different twist rate per pair.
- Cables have no speed — the category plus IEEE 802.3 tell you what will run how far.
- 1000BASE-T: Cat 5/5e, 100 m. 10GBASE-T: Cat 6 (55 m UTP / 100 m shielded) or Cat 6A (100 m).
- Shielding code = overall / per-pair + TP, with U unshielded, S braid, F foil.
- Direct burial = waterproof, gel-filled, shielded, with a drain wire. Plenum space = FEP or low-smoke PVC.
