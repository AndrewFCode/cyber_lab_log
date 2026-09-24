---
title: "A+ Core 1 3.2: Fiber Connectors"
description: "Professor Messer A+ 220-1201 objective 3.2 — ST bayonet, SC push-pull, and LC clip connectors for optical fibre, compared by mechanism and size."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "fibre", "st", "sc", "lc"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Fiber Connectors"
moduleOrder: 67
unit: 3
---

> **In one line:** ST locks with a bayonet twist, SC locks with a push-pull, and LC — the smallest of the three, for dense installs — locks with a clip; all three do the same job of connecting and disconnecting a fibre link.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (Fiber Connectors).* The full version is the Fiber Connectors class notes; the section overview is the Section 3 sheet. Core, cladding, ferrule and multimode/single-mode are covered in the Optical Fibre lesson.

---

## The three connectors

| Connector | Full name | Also called | Lock | Size |
|---|---|---|---|---|
| **ST** | Straight Tip | — | **Bayonet** — push and twist | **Largest** |
| **SC** | Subscriber Connector | Square Connector, Standard Connector | **Push-pull** | Middle |
| **LC** | Lucent Connector | Local Connector, Little Connector | **Clip** | **Smallest** |

## How each one works

**ST** — push in, **twist to lock**. Untwist, then pull to remove. Resists accidental disconnection by requiring deliberate rotation both ways.

**SC** — push straight in, it **locks with no twist**. Pull the outer housing to release. Very common across data centre devices and patch panels. Comes as **simplex** (one fibre) or **duplex** (a transmit/receive pair joined as one unit, connecting or disconnecting together).

**LC** — held by a small **clip on top** of the connector, press to release. By far the **smallest** — built for dense terminations where space is tight. Also commonly seen in **duplex** form.

## Identify by mechanism

| Behaviour | Connector |
|---|---|
| Won't budge until you twist it | **ST** (bayonet) |
| Pulls free with a straight tug on the outer sleeve, no twist | **SC** (push-pull) |
| Small clip on top releases it; noticeably tiny | **LC** (clip) |

## Matching cables to ports

- **Connector shape must physically match** on both ends.
- **Shape matching ≠ fibre-type matching.** An ST connector fits an ST port whether the fibre inside is multimode or single-mode — check the fibre type and transceiver separately (see Optical Fibre lesson).
- **Hybrid patch cords** (e.g. ST-to-LC) bridge connector generations without re-terminating a whole run.

## 🔐 Security notes

- **An out-of-place connector type is a visible anomaly** — a stray ST cable in an all-LC room is worth a second look during a walkthrough.
- **Bayonet and push-pull locks resist accidental disconnection** better than plain friction — a real factor for critical, no-downtime links.
- **Dust caps on unused ports matter** — a contaminated ferrule face is a leading cause of link failure regardless of connector type (see Optical Fibre lesson).
- **Density concentrates risk:** a dense LC patch panel packs far more connectivity into the same space than ST ever could — secure it accordingly.

## Practice drills

<details>
<summary>1. What does ST stand for, and how does it lock?</summary>

**Straight Tip.** A **bayonet** — push in and twist to lock; twist back and pull to remove.
</details>

<details>
<summary>2. What does SC stand for, and its other names?</summary>

**Subscriber Connector.** Also **Square Connector** or **Standard Connector**.
</details>

<details>
<summary>3. How do you release an SC connector?</summary>

**Pull gently on the outer housing** — no twisting.
</details>

<details>
<summary>4. What does LC stand for, and its other names?</summary>

**Lucent Connector.** Also **Local Connector** or **Little Connector**.
</details>

<details>
<summary>5. How does an LC connector lock?</summary>

A **clip** on top of the connector body.
</details>

<details>
<summary>6. Rank ST, SC, LC by size, largest to smallest.</summary>

**ST largest, SC middle, LC smallest.**
</details>

<details>
<summary>7. What does "duplex" mean for an SC or LC connector?</summary>

**Transmit and receive fibres joined as one unit,** connecting/disconnecting together in a single action.
</details>

<details>
<summary>8. Why might a dense patch panel favour LC over ST?</summary>

LC is **by far the smallest**, fitting the most terminations into a given amount of rack space.
</details>

## Key takeaways

- ST = bayonet twist-lock, largest. SC = push-pull, middle. LC = spring clip, smallest.
- SC and LC both come in duplex form, joining transmit and receive as one connect/disconnect action.
- Connector shape matching is not the same as fibre-type matching — check both.
- Hybrid patch cords bridge connector generations without re-terminating a whole run.
- All three do the same job; the differences are mechanism and size, not function.
