---
title: "A+ Core 1 3.2: Network Cables — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: twisted pair and why it is twisted, cable categories and distances, coax, UTP vs STP shielding codes, direct burial and plenum-rated cable."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "twisted-pair", "plenum", "coaxial"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (Network Cables)**

> **Quick reference:** the short version of this lesson is the Network Cables cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It follows the display lessons in the same section, and pairs with the network tools lesson in [section 2](/cyber_lab_log/resources/a-plus-core-1/2/), which covers the crimpers, punch-down tools and testers used to terminate everything described here.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why cabling is the foundation of every network, wireless ones included.
2. Explain why the wires in a twisted pair cable are twisted, and why each pair has a different twist rate.
3. Explain why a cable does not have a speed, and what actually determines throughput.
4. State the minimum cable category and maximum distance for 1000BASE-T and 10GBASE-T.
5. Describe coaxial cable and where it is used on networks.
6. Read a shielding code such as S/FTP or F/UTP.
7. Describe direct burial STP cable and what a drain wire is for.
8. Explain what plenum space is and why plenum-rated cable exists.

## 1. Cabling is the foundation

It is easy to focus on the specification of a new laptop or desktop and assume the network will simply work when you plug it in. It works because someone installed the right cable for the job. Cables and fibre carry everything the network sends, and bad cabling means applications that do not behave as expected — so the cabling has to be planned and installed for the network you intend to run.

This applies to wireless too. A client may reach the access point over radio, but **the access point itself is connected to the rest of the network by cable**. There is copper or fibre somewhere in every path.

## 2. Twisted pair

### 2.1 What it is

The great majority of wired Ethernet runs on **twisted pair copper**. Inside the jacket are four pairs of wires — conventionally blue, green, orange and brown — each pair twisted together along the length of the cable.

### 2.2 Equal and opposite signals

Each pair carries the same signal twice, in opposite polarity: one wire carries Transmit+, the other Transmit−. Interference from the surrounding environment hits both wires, but the wanted signal is only the *difference* between them, so the receiver can subtract out what is common to both and recover the real data.

The twisting is what makes this work reliably. As the pair twists, each wire is continually swapping position relative to any nearby source of noise, so over the length of the run both wires pick up very nearly the same amount of interference. Without the twist, one wire could sit closer to the noise source for the whole run and the two would no longer be comparable.

```text
+------------------------------------------------------------------------------+
|  Why twisting works                                                          |
|                                                                              |
|   Untwisted:   wire A ------------------------  always nearer the noise      |
|                wire B ------------------------                               |
|                 ^^^ interference source above A only                         |
|                                                                              |
|   Twisted:     A/B alternate position constantly along the run               |
|                 \  /\  /\  /\  /\  /\  /\  /\  /                             |
|                  \/  \/  \/  \/  \/  \/  \/  \/                              |
|                so BOTH wires pick up the same noise, and the                 |
|                receiver subtracts what is common to both                     |
+------------------------------------------------------------------------------+
```

### 2.3 Different twist rates

Look closely at a cable and each of the four pairs is twisted at a **different rate**. That lets the receiving device compare interference across all four pairs at once: because the pairs respond to noise differently, it becomes much easier to separate interference from wanted signal.

> **Note (beyond this lesson):** the technical name for sending equal and opposite signals on a pair is **differential signalling**, and noise that affects both wires identically is **common-mode noise**, which the receiver rejects. Differing twist rates also reduce **crosstalk** between the pairs inside one cable.

> **In the real world:** this is why the punch-down and crimping lesson insists on keeping the twists right up to the termination. Untwist 25 mm at the connector and you have removed the protection for that part of the run.

## 3. Categories and standards

### 3.1 A cable does not have a speed

People talk about a "gigabit cable", but a cable sitting on a desk is just copper — it has no speed. **The signals sent over the cable have a speed**, and that comes from the signalling and coding used by the equipment at each end.

What the cable determines is whether it can carry those signals cleanly. A **category** is the standard describing a cable's minimum tested capabilities, and it is printed on the jacket. Match the category to the Ethernet standard you are running.

### 3.2 Where the requirement is written down

The minimum category for each Ethernet standard is defined in the **IEEE 802.3** standards documents. If you are unsure what a network needs, that is the authority to check — not a supplier's marketing.

| Ethernet standard | Minimum category | Maximum distance |
|---|---|---|
| 1000BASE-T (gigabit) | Category 5 | 100 m |
| 1000BASE-T on new cable | Category 5e | 100 m |
| 10GBASE-T, unshielded | Category 6 | 55 m |
| 10GBASE-T, shielded | Category 6 | 100 m |
| 10GBASE-T | Category 6A | 100 m |

### 3.3 Cat 5 and Cat 5e

**Category 5 is deprecated**, so new cable you buy will be **Cat 5e** — the "e" is for **Enhanced**, reflecting extra tests added to the qualification. An existing Cat 5 installation will still run 1000BASE-T at up to 100 m; you simply cannot buy plain Cat 5 any more.

### 3.4 Cat 6 and Cat 6A

**10GBASE-T** is 10-gigabit Ethernet over twisted pair, and needs a minimum of **Category 6**. Here the shielding changes the distance: unshielded Cat 6 is limited to **55 m**, while shielded Cat 6 reaches the full **100 m**. **Category 6A** — the A is for **Augmented** — carries 10GBASE-T to 100 m either way.

I checked these against the standards material. The 55 m figure for unshielded Cat 6 comes from TIA TSB-155 and the IEEE work on 802.3an, and vendor guidance confirms screened (shielded) Category 6 supporting 10GBASE-T to 100 m. The transcript's figures are correct.

> **Note (beyond this lesson):** TSB-155 is more nuanced than a single number. 10GBASE-T should work to 37 m on Category 6 in any conditions, and somewhere between 37 m and 55 m depending on how bad the **alien crosstalk** environment is — the interference from neighbouring cables in the same bundle. Shielding largely eliminates that, which is why the shielded figure jumps to 100 m. For a new 10-gigabit installation, Cat 6A is the sensible specification regardless.

> **Exam tip:** two pairs of numbers are worth memorising. **1000BASE-T: Cat 5 minimum, 100 m.** **10GBASE-T: Cat 6 minimum, 55 m unshielded / 100 m shielded, or Cat 6A for 100 m.**

### 3.5 Worked example — specifying a floor of cabling

**Scenario:** an office floor is being rewired. Desks are up to 70 m of cable run from the comms room, and the business wants 10-gigabit to the desk within five years.

1. **Start with the standard.** 10 gigabit over copper is 10GBASE-T, so consult IEEE 802.3 for the minimum category.
2. **Rule out Cat 5e.** It will carry gigabit to 100 m, but not 10GBASE-T at all — it would mean rewiring again later.
3. **Check Cat 6 against the distance.** Unshielded Cat 6 tops out at 55 m for 10GBASE-T, and the runs are 70 m. That fails.
4. **Two options remain:** shielded Cat 6 (100 m) or Cat 6A (100 m either way).
5. **Choose Cat 6A.** It meets the distance without depending on shielding being installed and grounded correctly, and it is the standard written for 10GBASE-T. Specify the same category for the patch panels and patch leads — a channel is only as good as its weakest component.

## 4. Coaxial cable

Twisted pair is not the only copper. **Coaxial cable** — "co-axial", meaning two or more forms sharing a common axis — has an inner conductor carrying the signal, surrounded by an outer shield that protects it.

```text
+------------------------------------------------------------------------------+
|  Coaxial cable, in cross-section                                             |
|                                                                              |
|            .-----------------------.                                         |
|          .'    outer jacket         '.                                       |
|         /   .-------------------.     \                                      |
|        |   |  braided shield     |     |                                     |
|        |   |   .-------------.   |     |                                     |
|        |   |  | dielectric   |  |      |                                     |
|        |   |  |   ( O )      |  |      |   ( O ) = inner conductor           |
|        |   |   '-------------'   |     |           carries the signal        |
|         \   '-------------------'     /                                      |
|          '.                         .'                                       |
|            '-----------------------'                                         |
+------------------------------------------------------------------------------+
```

Coax has many uses, but on networks you will most often meet it with **cable modems and digital cable** — high-speed internet delivered over a cable provider's infrastructure almost always arrives on coax.

## 5. Shielding: UTP and STP

### 5.1 The two families

**UTP — unshielded twisted pair** has no shielding at all: none around the four pairs as a group, and none around the individual pairs.

**STP — shielded twisted pair** adds a shield inside the cable to protect against interference. That shield may be around **all four pairs** together, around **each individual pair**, or both.

Which you choose depends on the standard you are running and the distance you need — as section 3 showed, shielding is what takes Cat 6 from 55 m to 100 m at 10 gigabit.

### 5.2 Reading the code on the jacket

The jacket tells you exactly what shielding is inside, using a compact code. Three letters do the work:

| Letter | Meaning |
|---|---|
| U | Unshielded |
| S | Braided shielding |
| F | Foil shielding |

The format is **overall shielding / individual pair shielding, then TP** for twisted pair:

```text
+------------------------------------------------------------------------------+
|                    S  /  F  TP                                               |
|                    |     |  |                                                |
|                    |     |  '--- twisted pair                                |
|                    |     '------ shielding around EACH PAIR                  |
|                    '------------ shielding around the WHOLE cable            |
|                                                                              |
|   U/UTP    nothing shielded at all (plain UTP)                               |
|   F/UTP    foil around the whole cable, pairs unshielded                     |
|   S/FTP    braid around the whole cable, foil around each pair               |
+------------------------------------------------------------------------------+
```

The lesson shows a **Category 7** cable printed **S/FTP**: a braided shield around everything inside, plus foil around each individual pair — visible when the jacket is cut back.

> **Note (beyond this lesson):** Category 7 is an **ISO/IEC** specification rather than a TIA one, and was never adopted by TIA for structured cabling in North America. It is not on the A+ objectives list; treat it here as an example of the shielding notation rather than a category to memorise.

> **Caution:** a shield only works if it is properly bonded and grounded at the correct point. A shielded cable terminated to unshielded connectors, or grounded at both ends, can perform worse than plain UTP — shielded installations need shielded jacks, patch panels and patch leads throughout.

### 5.3 Worked example — decoding a jacket

**Scenario:** you pull a cable out of a store cupboard and the jacket reads `CAT 6A F/UTP`.

1. **Split the code at the slash.** `F` is the overall shielding; `UTP` describes the pairs.
2. **`F` overall** means a foil shield wraps all four pairs together.
3. **`U` for the pairs** means no individual pair shielding.
4. **So:** a shielded (screened) Cat 6A cable — good for 10GBASE-T to 100 m and better in electrically noisy areas than plain U/UTP.
5. **Check what it terminates into.** This cable needs shielded jacks and panels to be worth anything; used with unshielded hardware you gain nothing.

## 6. Direct burial cable

An organisation with several buildings, or a campus, may run cable between them. That can go overhead, but putting it underground is often simpler and protects the cable better.

**Direct burial STP** is made for exactly this: designed to be installed in the ground, usually waterproofed, and often filled with a **gel** that repels water — so it can go straight into the ground without a conduit.

It is normally **shielded** twisted pair for three reasons: interference protection, grounding, and the extra physical strength that matters when the cable is buried without a conduit.

Structurally it resembles ordinary shielded Ethernet: four pairs, a shield around them, and a waterproof gel inside. It also carries a **drain wire** — a wire running the full length of the cable, used as an electrical ground.

```text
+------------------------------------------------------------------------------+
|  Direct burial STP, inside the jacket                                        |
|                                                                              |
|   +--------------------------------------------------------+                 |
|   |  tough outer jacket, rated for burial                   |                |
|   |   +------------------------------------------------+   |                 |
|   |   |  shield around all four pairs                   |   |                |
|   |   |   (BL)  (GN)  (OR)  (BR)   four twisted pairs   |   |                |
|   |   |   waterproof gel fills the gaps                 |   |                |
|   |   |   --- drain wire runs the whole length (ground) |   |                |
|   |   +------------------------------------------------+   |                 |
|   +--------------------------------------------------------+                 |
+------------------------------------------------------------------------------+
```

> **Caution:** copper between buildings carries a real risk of different ground potentials and lightning-induced surges. Proper grounding, bonding and surge protection at each end are part of the job — and where the run is long or the risk is high, **fibre** avoids the problem entirely by carrying no electricity.

## 7. Plenum-rated cable

### 7.1 What plenum space is

Look up in a commercial building and you are usually seeing the top of a **drop ceiling**, not the underside of the roof. Above it there may be ductwork feeding fresh air into the building, and ductwork carrying return air back to the air conditioning.

In many buildings the supply air is ducted but the **return air simply flows through the open space above the drop ceiling**. That open, air-circulating area is called **plenum space**. If the air above the ceiling is not circulating, there is no plenum.

```text
+------------------------------------------------------------------------------+
|  Plenum return                        Ducted return (no plenum)              |
|                                                                              |
|   ===== roof/floor above =====         ===== roof/floor above =====          |
|    [supply duct]    air flows           [supply duct] [return duct]          |
|        |            freely here             |             |                  |
|   ----- drop ceiling -----------       ----- drop ceiling --------           |
|        |                                    |                                |
|     office space                         office space                        |
|                                                                              |
|   Cables above the ceiling MUST         Standard PVC-jacketed cable          |
|   be plenum-rated                       may be acceptable                    |
+------------------------------------------------------------------------------+
```

### 7.2 Why it matters

The concern is **fire**. All that open space makes it easy for fire, smoke and toxic fumes to travel freely from one part of a building to another — and the plenum is feeding air back into the air conditioning that serves the whole floor. Cable run above the ceiling in a plenum must therefore be built for it.

Pull a ceiling tile and you will typically find a mix of electrical wiring, fire-system cabling and network runs sharing that space.

### 7.3 The jacket material

| Cable | Jacket | Where |
|---|---|---|
| Standard Ethernet | **PVC** (polyvinyl chloride) | Ordinary indoor runs, not in a plenum |
| Plenum-rated | **FEP** (fluorinated ethylene polymer) or **low-smoke PVC** | Above a drop ceiling in plenum space |

Plenum-rated cable is a fire-rated jacket. Electrically it is **functionally the same** as any other Ethernet cable, but it can be harder to work with because the jacket is typically less flexible.

> **Exam tip:** the trigger phrase is "above a drop ceiling" or "in the air return space" — the answer is **plenum-rated cable**, and the jacket materials to recognise are **FEP** and **low-smoke PVC** as against ordinary **PVC**.

> **In the real world:** this is a building code requirement, not a preference. Non-plenum cable found in plenum space is a failed inspection and, in a fire, a genuine hazard — the PVC jacket is what produces the toxic smoke. It is also an expensive mistake to fix after the fact, since the cable has to come out.

### 7.4 Worked example — a cheap cable run that has to come out

**Scenario:** a contractor has run twenty new Cat 6 cables above the drop ceiling of an office floor. The jackets say `CAT 6 CM`, and the building uses the ceiling void for return air.

1. **Identify the space.** Return air flowing through the void means this is **plenum space**.
2. **Read the jacket rating.** A general-purpose rating is not a plenum rating; plenum cable is marked as such (and uses FEP or low-smoke PVC).
3. **The verdict:** the wrong cable is installed. Fire and building regulations require plenum-rated cable in this space.
4. **The fix is replacement, not patching** — every run in the plenum has to come out and be replaced with plenum-rated cable.
5. **Prevent the repeat.** Specify the cable rating in the contract, and check jacket markings on delivery rather than after installation.

## 8. Security perspective

Cabling is physical infrastructure, and its security properties are mostly about availability, physical access and what a cable discloses.

- **Copper radiates; fibre does not.** A twisted pair cable emits a weak electromagnetic signal that can, in principle, be picked up without touching it — the same physics the inductive probe in the network tools lesson relies on. Shielded cable reduces the emission. For genuinely sensitive links, fibre is the answer, since it emits nothing and cannot be tapped without interrupting the light.
- **Cable routes are attack surface.** Runs through unlocked ceiling voids, risers and shared spaces can be reached, tapped or cut by anyone with access to the room. Treat cable paths the way you treat the comms room: locked, documented, and inspected.
- **Inter-building runs leave your perimeter.** A buried or overhead cable between buildings may cross ground you do not control. Physical protection matters, and so does not trusting the far end implicitly — the segment on the other side of that cable deserves its own controls.
- **Wrong cable is a slow-burn availability problem.** Cat 5e where 10GBASE-T is needed, or Cat 6 stretched past 55 m, produces errors and retransmissions that look like an application fault and cost days of investigation. Specifying and certifying the category is a reliability control.
- **Plenum ratings are life safety.** Non-plenum cable in a plenum is a fire and toxic-smoke hazard, and a code violation. This is one of the few "IT" decisions that can directly endanger people in the building.
- **Grounding and surges take out equipment.** Shields grounded at both ends, or an unprotected copper run between buildings, can carry surges straight into switches. That is an availability incident with a physical cause, and fibre or proper surge protection is the mitigation.

## Summary

- Cabling is the foundation of every network, including wireless — the access point is wired to everything else.
- **Twisted pair** carries equal and opposite signals on each pair; twisting means both wires pick up the same interference so the receiver can cancel it, and **different twist rates** per pair help further.
- **Cables have no speed.** The signalling does. A **category** states the cable's tested capability, and **IEEE 802.3** defines the minimum category for each Ethernet standard.
- **1000BASE-T:** Cat 5 minimum, 100 m. Cat 5 is deprecated, so buy **Cat 5e** (Enhanced).
- **10GBASE-T:** Cat 6 minimum — **55 m unshielded, 100 m shielded** — or **Cat 6A** (Augmented) for 100 m.
- **Coaxial** cable has an inner conductor and an outer shield sharing one axis; on networks it means cable modems and digital cable.
- **Shielding codes:** U unshielded, S braided, F foil, written as overall/per-pair then TP — so **S/FTP** is braid overall with foil on each pair, and **F/UTP** is foil overall with unshielded pairs.
- **Direct burial STP** is waterproofed, often gel-filled, usually shielded for interference, grounding and strength, and carries a **drain wire** for ground.
- **Plenum space** is an open ceiling void used for return air. Cable there must be **plenum-rated** — **FEP** or **low-smoke PVC** rather than ordinary **PVC** — and is less flexible to work with.

## Glossary

| Term | Meaning |
|---|---|
| Twisted pair | Copper cable whose wires are twisted together in pairs |
| Transmit+ / Transmit− | The equal and opposite signals carried on the two wires of a pair |
| Twist rate | How tightly a pair is twisted; deliberately different for each pair |
| Crosstalk | Interference between pairs inside a cable |
| Alien crosstalk | Interference from pairs in neighbouring cables in the same bundle |
| Category | The standard stating a cable's minimum tested capabilities |
| IEEE 802.3 | The standards family defining Ethernet and its cabling requirements |
| 1000BASE-T | Gigabit Ethernet over twisted pair; Cat 5 minimum, 100 m |
| 10GBASE-T | 10-gigabit Ethernet over twisted pair; Cat 6 minimum |
| Cat 5e | Enhanced Category 5; what replaced the deprecated Cat 5 |
| Cat 6A | Augmented Category 6; 10GBASE-T to 100 m |
| Coaxial | Cable with an inner conductor and outer shield on a common axis |
| UTP | Unshielded twisted pair; no shielding at all |
| STP | Shielded twisted pair; a shield around the pairs, individually or as a group |
| U / S / F | Shielding codes: unshielded, braided, foil |
| Direct burial | Cable built to go straight into the ground, often gel-filled |
| Drain wire | A wire running the length of a cable, used as an electrical ground |
| Plenum space | An open ceiling void through which return air circulates |
| Plenum-rated | Fire-rated cable for plenum space, jacketed in FEP or low-smoke PVC |
| PVC | Polyvinyl chloride; the standard, non-plenum cable jacket |

## Review questions

1. Why is there cabling involved even in a wireless network?
2. Why are the wires in a twisted pair cable twisted together?
3. What signals does each pair carry, and how does that help the receiver?
4. Why is each pair twisted at a different rate?
5. Why is it wrong to say a cable has a speed?
6. Which standards document tells you the minimum cable category for an Ethernet standard?
7. What is the minimum category and maximum distance for 1000BASE-T?
8. What does the "e" in Cat 5e stand for, and why does it exist?
9. Give the three category-and-distance combinations for 10GBASE-T.
10. What does the "A" in Cat 6A stand for?
11. What does coaxial mean, and where do you meet it on a network?
12. Decode the cable markings `S/FTP` and `F/UTP`.
13. What is a drain wire, and on what kind of cable would you find one?
14. **Scenario:** cable is being run above a drop ceiling that carries return air. What must you specify, and which jacket materials qualify?
15. **Scenario:** an existing Cat 6 unshielded installation with 80 m runs is being upgraded to 10 gigabit. What is the problem and what are the options?
16. **Scenario:** a link between two buildings 60 m apart keeps failing during storms, and a switch port has been damaged twice. What would you consider changing?

## Answer key

1. **The access point still has to be cabled to the rest of the network** — the wireless part is only the last hop.
2. **So both wires in a pair pick up the same interference,** letting the receiver subtract what is common to both and recover the signal.
3. **Equal and opposite signals — Transmit+ and Transmit−.** The wanted data is the difference between them, so common interference cancels out.
4. **So the receiver can compare interference across all four pairs** and tell noise from signal more easily; it also reduces crosstalk between pairs.
5. **The cable is passive copper.** The **signalling and coding** used by the equipment determines speed; the category determines whether the cable can carry it cleanly.
6. **IEEE 802.3.**
7. **Category 5 minimum, 100 m** (Cat 5e in practice, since Cat 5 is deprecated).
8. **Enhanced.** Additional tests were added to the Category 5 qualification, so the improved cable got a new name.
9. **Cat 6 unshielded: 55 m. Cat 6 shielded: 100 m. Cat 6A: 100 m.**
10. **Augmented.**
11. **Two or more forms sharing a common axis** — an inner signal conductor inside an outer shield. On networks it means **cable modems and digital cable**.
12. **S/FTP: braided shield around the whole cable, foil around each pair. F/UTP: foil around the whole cable, pairs unshielded.**
13. **A wire running the whole length of the cable used as an electrical ground,** found on direct burial STP.
14. **Plenum-rated cable,** jacketed in **FEP** or **low-smoke PVC** rather than ordinary PVC.
15. **Unshielded Cat 6 only supports 10GBASE-T to 55 m,** so 80 m runs will not work reliably. Options: re-pull as **Cat 6A**, use **shielded Cat 6** with fully shielded terminations, or shorten the runs — and for new work, Cat 6A is the right specification.
16. **Grounding and surge protection on the inter-building copper run** — differing ground potentials and lightning-induced surges damage switch ports. **Fibre** between the buildings removes the electrical path entirely.
