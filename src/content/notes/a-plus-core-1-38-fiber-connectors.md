---
title: "A+ Core 1 3.2: Fiber Connectors — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: ST bayonet connectors, SC push-pull connectors, and compact LC connectors for optical fibre."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "fibre", "st", "sc", "lc"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (Fiber Connectors)**

> **Quick reference:** the short version of this lesson is the Fiber Connectors cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It is a short, focused companion to the Optical Fibre lesson in this section, which covers the core, cladding, ferrule and multimode/single-mode distinction; this lesson names the three physical connectors — ST, SC and LC — that terminate that fibre.

## Learning objectives

By the end of these notes you should be able to:

1. Describe an ST connector, its locking mechanism, and where its name comes from.
2. Describe an SC connector, its locking mechanism, and its alternative names.
3. Describe an LC connector, its locking mechanism, and its alternative names.
4. Compare the three connectors by physical size.
5. Explain why matching connector types at both ends of a fibre link matters.

## 1. ST connectors

### 1.1 What ST stands for

**ST** stands for **Straight Tip**, describing the connector's straight ceramic ferrule tip at the point of connection — the same ferrule concept covered in the Optical Fibre lesson, here in its specific ST housing.

### 1.2 How it locks: bayonet

ST is a **bayonet** connector. You **push it in and give it a slight twist** to lock it into place, exactly like the twist-lock mechanism found on some camera lenses or older coaxial connectors. To remove it, you **untwist** first, then pull the connector free.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   ST connector: push and turn                                                |
|                                                                              |
|   [ connector ] ---push---> [ socket ]                                       |
|                                  |                                           |
|                                  v  twist to engage the bayonet lugs         |
|                            [ LOCKED ]                                        |
|                                  |                                           |
|                                  v  twist the opposite way to disengage      |
|                            [ connector pulls free ]                          |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 1.3 Why the bayonet matters

The push-and-turn bayonet action is what **keeps the fibre seated** — it resists being pulled straight out accidentally, which is exactly the failure mode a loose connector would otherwise invite. Deliberate action in both directions (turning to lock, turning to unlock) is required before the connector moves at all.

> **Note (beyond this lesson):** ST connectors were developed by AT&T and were once extremely common in fibre installations, particularly multimode. They have become less common in new installations as SC and, especially, LC have taken over — but ST connectors are still found on a great deal of existing infrastructure, so recognising the bayonet action remains a practical skill.

## 2. SC connectors

### 2.1 What SC stands for

**SC** stands for **Subscriber Connector**. You will also hear it called a **Square Connector** or a **Standard Connector** — several names circulate for the same connector, reflecting both its shape and its once-dominant status as the standard choice.

### 2.2 How it locks: push-pull

Unlike ST's twisting bayonet, SC uses a simple **push-pull** action. Push the connector straight in and it **locks** without any twisting motion. To remove it, you **pull gently on the outer housing** of the connector, which releases the lock, and the connector comes free.

### 2.3 Where it is used, and duplex form

SC is a genuinely popular connector, turning up across **many devices, patch panels, and other components within the data centre**. A useful feature of SC is that it can be used with a **single fibre**, or two SC connectors can be **combined into one unit**, holding a pair of fibres — one for transmit, one for receive. That paired, **duplex** form lets you connect or disconnect both directions of a link **simultaneously**, with one physical action instead of two.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   SC connector: push straight in, pull the housing to release                |
|                                                                              |
|   Simplex (one fibre)              Duplex (a pair, joined as one unit)       |
|                                                                              |
|      [ SC ]                          [ SC ][ SC ]                            |
|        |                               |      |                              |
|      one fibre                     transmit  receive                         |
|                                     both connect/disconnect together         |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **Exam tip:** SC's push-pull action is the detail most worth remembering against ST's bayonet twist — a scenario describing "push it in, it clicks, and you pull the sleeve back to remove it" is describing SC, not ST.

## 3. LC connectors

### 3.1 What LC stands for

**LC** stands for **Lucent Connector**, named for Lucent Technologies. You will also see it called a **Local Connector** or a **Little Connector** — informal names that both point at the same defining feature: it is small.

### 3.2 Why LC exists

There is a constant need to fit **more connections into a smaller amount of space**, particularly in dense patch panels and equipment with many fibre ports close together. LC answers that need directly — it is a **much smaller, more compact** connector than either ST or SC.

### 3.3 How it locks: a clip

LC holds in place with a small **clip on the top** of the connector body, similar in spirit to the retention clip on a common RJ45 network plug. Press the clip to release the connector for removal.

### 3.4 Duplex form

Like SC, LC connectors are commonly seen **joined as a pair** — both sides of the connection held together as one assembly — letting you connect or disconnect a transmit/receive pair of fibres **simultaneously** with a single action.

## 4. Comparing the three

### 4.1 Size

Lined up together, the size difference is immediately visible: **ST is the largest** of the three, **SC sits in the middle**, and **LC is by far the smallest**.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   ST            [==========]        Largest — bayonet twist-lock             |
|                                                                              |
|   SC              [========]        Middle — push-pull lock                  |
|                                                                              |
|   LC                 [====]         Smallest — spring clip                   |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 4.2 Side-by-side summary

| Connector | Full name | Also called | Locking mechanism | Relative size |
|---|---|---|---|---|
| **ST** | Straight Tip | — | **Bayonet** — push and twist | Largest |
| **SC** | Subscriber Connector | Square Connector, Standard Connector | **Push-pull** | Middle |
| **LC** | Lucent Connector | Local Connector, Little Connector | **Clip** | Smallest |

### 4.3 What they have in common

All three connectors do fundamentally the **same job**: they let you connect and disconnect a fibre link. The differences are in **mechanism and size**, not in the fibre technology itself — the same underlying fibre (multimode or single-mode, as covered in the Optical Fibre lesson) can be terminated in any of these connector styles.

### 4.4 Matching connectors at both ends

The connectors you use have to **match** — the connector on your patch cable must physically fit the port on the device you are connecting to. Whenever you are working with fibre, you will most commonly encounter **ST, SC, or LC** as the connector type, so being able to identify all three at a glance is a practical, everyday skill.

> **Caution:** matching *connector shape* is not the same as matching *fibre type*. An ST-terminated multimode patch cable and an ST-terminated single-mode patch cable share the same connector shape and will physically mate — but the fibre itself, and the transceiver it needs, are different. Confirm the fibre type (multimode versus single-mode) as well as the connector type before assuming a cable is the right one for a link.

> **In the real world:** in a mixed environment with legacy ST runs and newer LC-terminated equipment, keep a small stock of **hybrid patch cables or adapters** (for example ST-to-LC) so that a cross-generation connection does not require re-terminating a whole run just to bridge two connector styles.

### 4.5 Worked example — identifying a connector by feel and behaviour

**Scenario:** you are working in a poorly lit comms room and need to identify three unlabelled fibre patch cables by touch and by how they release, without being able to see them clearly.

1. **Cable A** requires you to turn it before it comes free, and it does not budge at all when pulled straight. This is the **bayonet** action — **ST**.
2. **Cable B** comes free with a firm pull on a movable outer sleeve, no turning involved, and there is a small clip you can feel with your thumb on top of the connector body. This is **LC** — the smallest of the three, and the clip is distinctive under a fingertip even when the connector's overall size is hard to judge by feel alone.
3. **Cable C** releases with a straight pull on the outer housing, no clip and no twist. This is **SC**.
4. **Confirm afterwards with a light source or by feel for relative size** once conditions allow, since mechanism alone (as in this example) is usually enough to distinguish the three, but a second check costs little and avoids an embarrassing mistake in a live environment.

### 4.6 Worked example — planning a patch panel refresh

**Scenario:** a comms room currently uses ST connectors throughout, on a mix of multimode links to nearby floors and one single-mode link to a neighbouring building. The organisation wants to modernise and increase port density without disrupting the existing single-mode long-haul link during the transition.

1. **Prioritise density where it is actually needed.** The multimode runs to nearby floors are the higher-count, space-constrained connections — moving these to **LC** frees the most rack space.
2. **Leave the single-mode long-haul run on ST for now**, or migrate it separately and deliberately, since it is a single critical link rather than a dense group, and disrupting it briefly for reterminating is a bigger operational risk than the space saved.
3. **Use ST-to-LC hybrid patch cords** during the transition period, so devices still expecting ST connectors on one side can connect to newly terminated LC runs on the other, without forcing a single flag-day cutover.
4. **Re-terminate the long-haul single-mode run last**, once the pattern of hybrid cords has proven itself on the lower-risk multimode runs, and schedule it for a maintenance window given its criticality.
5. **Document the connector type per run** as the transition proceeds, so nobody has to identify connectors by touch in a poorly lit room, as in the previous example, to know what they are dealing with.

## 5. Security perspective

Connector choice does not change fibre's fundamental security properties — covered in depth in the Optical Fibre lesson — but a few points are specific to the physical connectors themselves.

- **Connector type is a visible fingerprint of an installation's age and standard.** A comms room where every port is LC, with a stray ST-terminated cable plugged in somewhere, is a small but genuine anomaly worth noticing during a physical walkthrough — it may simply be legacy equipment, or it may be something that should not be there.
- **Bayonet and push-pull connectors resist accidental disconnection better than a simple friction fit,** which matters for availability on links that genuinely cannot afford an unplanned outage. This is a minor but real factor in choosing connector type for critical runs, alongside density and cost.
- **Dust caps matter more than they look like they should.** As covered in the Optical Fibre lesson, a contaminated ferrule end face is one of the most common causes of a failing link, regardless of whether the connector is ST, SC or LC. Leaving unused ports capped is cheap insurance against both accidental contamination and, in principle, against a passing fibre end being an easy, unprotected target for casual inspection or tampering.
- **Connector density is itself a consideration.** LC's compactness allows far more fibre terminations in the same physical rack space than ST ever did — which means a single dense LC patch panel represents a correspondingly larger concentration of connectivity, and by extension a more attractive single point of physical compromise or disruption if it is not adequately secured.

## Summary

- **ST (Straight Tip)** is a **bayonet** connector — push and twist to lock, twist and pull to remove. It is the **largest** of the three connectors covered here.
- **SC (Subscriber Connector)**, also called Square or Standard Connector, uses a **push-pull** lock — push to engage, pull the outer housing to release. It is **middle-sized**, very common in data centres, and available in single or **duplex** (paired) form.
- **LC (Lucent Connector)**, also called Local or Little Connector, is held by a **clip** and is the **smallest** of the three, designed for dense terminations. It also commonly comes in **duplex** form.
- All three connectors perform the same basic function — connecting and disconnecting a fibre link — and differ in locking mechanism and physical size, not in the underlying fibre technology.
- **Connector shape must match at both ends**, and matching the fibre type (multimode versus single-mode) is a separate check from matching the connector shape.

## Glossary

| Term | Meaning |
|---|---|
| ST | Straight Tip; a bayonet-locking fibre connector |
| Bayonet | A push-and-twist locking mechanism |
| SC | Subscriber Connector; a push-pull locking fibre connector |
| Square Connector / Standard Connector | Alternative names for SC |
| Push-pull | A locking mechanism engaged by pushing in, released by pulling |
| LC | Lucent Connector; a small, clip-locking fibre connector |
| Local Connector / Little Connector | Alternative names for LC |
| Duplex | A connector holding a transmit and receive fibre pair as one unit |
| Simplex | A connector holding a single fibre |
| Ferrule | The ceramic sleeve inside a connector that holds and aligns the fibre |
| Patch panel | A panel of fibre or copper terminations used for cross-connections |
| Transceiver | The module converting between electrical signals and light for a given fibre type |

## Review questions

1. What does ST stand for, and what locking mechanism does it use?
2. How do you unlock and remove an ST connector?
3. What does SC stand for, and what other names is it known by?
4. How does SC's locking mechanism differ from ST's?
5. What does duplex mean in the context of an SC or LC connector?
6. What does LC stand for, and what other names is it known by?
7. What locking mechanism does LC use?
8. Rank ST, SC and LC from largest to smallest.
9. What do all three connectors have in common, functionally?
10. Why does connector shape alone not guarantee a cable is right for a given link?
11. Why might LC be preferred over ST or SC in a dense patch panel?
12. **Scenario:** you are removing a fibre connector and it will not come free no matter how hard you pull straight out, but it turns slightly. Which connector type is this, and what should you do?
13. **Scenario:** a fibre connector releases when you pull gently on its outer sleeve, with no twisting involved. Which connector type is this?
14. **Scenario:** a data centre needs to fit as many fibre terminations as possible into a limited amount of rack space. Which connector type suits that best, and why?
15. **Scenario:** you have an ST-terminated single-mode patch cable and need to connect it to a device with an ST port that is expecting multimode. Does the connector matching solve this problem?
16. **Scenario:** a device has a duplex SC port, and you only have two separate simplex ST patch cables. What do you need to make the connection work?

## Answer key

1. **Straight Tip.** It uses a **bayonet** — push in and twist to lock.
2. **Twist it in the opposite direction to unlock, then pull it free.**
3. **Subscriber Connector.** Also called a **Square Connector** or a **Standard Connector**.
4. **SC uses push-pull** — push straight in to lock, pull the outer housing to release — with no twisting involved, unlike ST's bayonet.
5. **A connector holding both the transmit and receive fibres as one unit,** so both can be connected or disconnected together in a single action.
6. **Lucent Connector.** Also called a **Local Connector** or a **Little Connector**.
7. **A clip** on top of the connector body.
8. **ST largest, SC in the middle, LC smallest.**
9. **They all connect and disconnect a fibre link** — the differences are in locking mechanism and size, not in what they fundamentally do.
10. **Connector shape only confirms physical fit,** not that the fibre type (multimode versus single-mode) or the transceiver matches — those need checking separately.
11. **Because it is by far the smallest of the three,** allowing far more terminations in the same physical space.
12. **ST.** Twist it further in the unlocking direction (rather than continuing to pull straight out) and it will release.
13. **SC** — the push-pull mechanism has no twisting step.
14. **LC**, because it is the smallest connector of the three, fitting the most terminations into a given amount of space.
15. **No.** The ST connector shape will physically fit, but multimode and single-mode fibre and their transceivers are different — connector matching alone does not confirm fibre-type compatibility.
16. **A way to combine or adapt the two simplex ST cables into the duplex SC port** — for example, an SC-to-ST adapter cable or patch cord pairing transmit and receive appropriately, since a single simplex connector cannot mate directly with a duplex SC port.
