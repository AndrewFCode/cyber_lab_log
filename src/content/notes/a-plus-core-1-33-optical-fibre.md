---
title: "A+ Core 1 3.2: Optical Fibre — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.2: how light travels through a fibre core and cladding, ferrules and connectors, and multimode versus single-mode fibre."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cabling", "fibre", "multimode", "single-mode"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.2 (Optical Fiber)**

> **Quick reference:** the short version of this lesson is the Optical Fibre cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It completes the objective 3.2 cabling material alongside the Network Cables and 568A/568B lessons in the same section, and connects back to the fibre points in the internet connection types lesson in [section 2](/cyber_lab_log/resources/a-plus-core-1/2/).

## Learning objectives

By the end of these notes you should be able to:

1. Explain what fibre carries instead of electricity, and what that changes.
2. List fibre's advantages over copper, and its practical drawbacks.
3. Describe the core, cladding and buffer coating, and explain how light stays inside the fibre.
4. Explain what a ferrule is and why it matters.
5. Compare multimode and single-mode fibre on distance, light source, core size and use.
6. Explain what "mode" actually means and why it limits multimode's distance.
7. Choose the right fibre type for a described situation.

## 1. Why organisations use fibre

### 1.1 Light instead of electricity

Walk into a data centre and a great deal of the equipment is running on **optical fibre**. Instead of pushing electrical signals down copper, fibre sends **light** through a glass strand to carry the same information from one point to another.

That single change has consequences throughout the rest of this lesson.

### 1.2 What it buys you

| Advantage | Why |
|---|---|
| Immune to interference | Light is not affected by nearby motors, radios or electrical equipment |
| Hard to tap | You cannot pick up light inductively from outside the cable |
| Very long distances | Signals can travel many kilometres without regeneration |

Copper signals degrade over comparatively short distances. Fibre can run for kilometres before the signal needs regenerating, which is why organisations use it to link locations and build high-speed network topologies between sites.

The interference point is worth dwelling on. In an industrial environment full of machinery and radio-frequency noise — the kind of place where twisted pair struggles even when shielded — fibre simply is not affected. There is no electrical signal to interfere with.

### 1.3 The drawbacks

The lesson is even-handed about the costs:

- **Specialised equipment is required.** Transceivers, test gear, splicing kit and the skills to use them are all specific to fibre.
- **Monitoring and tapping are harder.** This is a security advantage and an operational inconvenience at the same time — the port-mirroring and tap techniques from the network tools lesson need fibre-specific hardware.
- **Many types and many connectors.** Fibre is not one thing; choosing the right fibre and the right connector for the situation is a real part of the job.

> **Note (beyond this lesson):** the fibre connectors you will meet on the A+ objectives are **ST**, **SC** and **LC**, with **MTP/MPO** multi-fibre connectors common in data centres. The physical connector is a separate choice from the fibre type covered here.

## 2. Inside the fibre

### 2.1 Core, cladding and buffer

A fibre optic cable is built in layers around an extremely thin strand of glass:

| Layer | Job |
|---|---|
| **Core** | The high-index centre the light actually travels through |
| **Cladding** | A lower-index layer surrounding the core, which keeps the light inside |
| **Buffer coating** | Protects the fragile core and cladding from damage |

### 2.2 How the light stays in

Light enters one end of the fibre from an **LED** or a **laser**, depending on the type of fibre. It travels down the core, and the difference in **refractive index** between the core and the cladding makes the light reflect back into the core each time it reaches the boundary. It bounces along the inside of the fibre until it emerges at the far end.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   LED or laser                                                               |
|        |                                                                     |
|        v     buffer coating (protection)                                     |
|   ==========================================================                 |
|   ~~~~~~~~~~ cladding: LOW refractive index ~~~~~~~~~~~~~~~~                 |
|        \    /\    /\    /\    /\    /\    /\    /\                           |
|         \  /  \  /  \  /  \  /  \  /  \  /  \  /   core: HIGH index          |
|          \/    \/    \/    \/    \/    \/    \/          --> out             |
|   ~~~~~~~~~~ cladding: LOW refractive index ~~~~~~~~~~~~~~~~                 |
|   ==========================================================                 |
|                                                                              |
|   The index difference reflects the light back in at every boundary          |
|                                                                              |
+------------------------------------------------------------------------------+
```

The glass itself is very thin and very fragile, which is what the buffer coating is for — without it, normal handling would break the core.

> **Caution:** the transcript describes a "high reflective index core" and "low reflective index cladding". The correct term is **refractive index** — a measure of how much a material slows and bends light. The mechanism described is right; the word is the thing to get correct. The effect at the boundary is **total internal reflection**.

> **Caution:** fibre has a **minimum bend radius**. Bend it too tightly and light escapes at the bend instead of reflecting, so the signal is attenuated or lost — and the glass can crack. Cable ties pulled tight around fibre are a common, avoidable cause of failing links.

### 2.3 The ferrule

Look at the end of a fibre connector and you see a square-ish connector body with a white **ceramic ferrule** in the centre. The ferrule holds and protects the fibre, aligning it precisely so the light passes into the fibre on the other side of the join.

Look very closely at the polished face of the ferrule and there is a tiny discoloured spot near the middle — that is the fibre itself, coated and protected inside the ferrule. The glass carrying all that data is far smaller than the hardware around it.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   End of a fibre connector, looking at the face                              |
|                                                                              |
|          +-----------------------------+                                     |
|          |       connector body        |                                     |
|          |        .-----------.        |                                     |
|          |      .'   ceramic   '.      |                                     |
|          |     (      ferrule    )     |                                     |
|          |      '.     ( o )   .'      |   ( o ) = the fibre itself,         |
|          |        '-----------'        |           a tiny discoloured spot   |
|          |                             |                                     |
|          +-----------------------------+                                     |
|                                                                              |
+------------------------------------------------------------------------------+
```

> **In the real world:** a contaminated ferrule end face is one of the most common causes of a fibre link failing. A fingerprint or speck of dust on a surface that small blocks a meaningful share of the light. Fibre is cleaned with proper cleaning tools before every connection, and unused connectors keep their dust caps on.

> **Caution:** never look into the end of a fibre or a transceiver port. The light may be infrared — invisible, and in the case of laser sources, capable of damaging your eyes.

## 3. Multimode and single-mode

### 3.1 Multimode

**Multimode fibre** is used inside a building and for short-range communication generally. Distances vary with the standard in use, but it will usually reach around **2 km**.

Because the distances are short, the light source can be cheap, so multimode commonly uses an **LED**.

The name describes the physics. The fibre's core is relatively **large**, so light can take several different paths — **modes** — through it. Each ray effectively travels a slightly different route from one end to the other.

### 3.2 Single-mode

**Single-mode fibre** is built for long-range communication. Some Ethernet standards run for **kilometres** over single-mode without regenerating the signal.

Covering that distance needs a stronger, more precise light source, so single-mode generally uses a **laser**. Its core is **much narrower** than multimode's, narrow enough that light has effectively **one path** through the fibre.

### 3.3 Side by side

| | Multimode | Single-mode |
|---|---|---|
| Distance | Short range, usually up to about 2 km | Long range, many kilometres |
| Typical use | Inside a building, within a campus | Between sites, telecom links |
| Light source | **LED** (inexpensive) | **Laser** |
| Core | Relatively large | Much narrower |
| Paths for light | Several **modes** | A **single** mode |

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Multimode: wide core, several paths            Single-mode: one path       |
|                                                                              |
|   ~~~~~~~~~~~~ cladding ~~~~~~~~~~~~~            ~~~~~~ cladding ~~~~~~      |
|    \   /\    /\    /\     /\    /                                            |
|     \ /  \  /  \  /  \   /  \  /                 -------------------->       |
|      X    \/    \/    \ /    \                                               |
|     / \   /\    /\    / \    / \                 narrow core, light          |
|    /   \ /  \  /  \  /   \  /   \                travels essentially         |
|   ~~~~~~~~~~~~ cladding ~~~~~~~~~~~~~            ~~~~~~ cladding ~~~~~~      |
|                                                                              |
|   Different paths = different arrival times      One path = no spreading     |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.4 Why multiple modes limit distance

The diagram above contains the reason multimode does not go as far. If light can take several paths, the ray that bounces most travels further than the ray going straight down the middle — so rays that left together arrive at slightly different times. Over a short run that hardly matters. Over a long one, the pulse spreads out until one pulse blurs into the next and the receiver can no longer tell them apart.

Single-mode's narrow core removes the problem by removing the alternative paths.

> **Note (beyond this lesson):** the spreading is called **modal dispersion**. It is also why multimode's distance figure depends heavily on speed: around 2 km at 100 Mbps, but only a few hundred metres for 10-gigabit standards such as 10GBASE-SR. "Up to 2 km" is the general figure; always check the distance for the specific Ethernet standard.

> **Note (beyond this lesson):** typical core diameters make the size difference concrete — multimode cores are around **50 or 62.5 micrometres**, single-mode around **9 micrometres**, with both using 125-micrometre cladding. Multimode is graded **OM1** to **OM5** and single-mode **OS1**/**OS2**.

> **Exam tip:** the four-part association is what gets tested. **Multimode: short, LED, wide core, many modes. Single-mode: long, laser, narrow core, one mode.** Fix those together and most fibre questions resolve themselves.

### 3.5 Worked example — choosing fibre for a campus

**Scenario:** an organisation has three buildings. Two are 300 m apart on the same site; the third is 8 km away across town. Each building also needs fibre between its own comms rooms, a run of about 150 m.

1. **Inside each building (150 m):** short range, so **multimode** with LED or VCSEL-based transceivers. Cheaper optics, plenty of margin.
2. **Between the two close buildings (300 m):** still within multimode's range, but check the standard. At 10 gigabit, 10GBASE-SR on modern multimode is fine at 300 m; at higher speeds the margin shrinks.
3. **To the building 8 km away:** far beyond multimode. **Single-mode** with laser transceivers is the only option.
4. **Match the transceivers to the fibre.** A single-mode transceiver on multimode fibre, or the reverse, will not work correctly — the optics and the core are designed together.
5. **Think about future speed.** Fibre installation is expensive and disruptive; single-mode between buildings gives more headroom for later upgrades even where multimode would do today.

### 3.6 Worked example — diagnosing a fibre link that will not come up

**Scenario:** a new multimode run between two switches shows no link at either end.

1. **Check the obvious pairing first.** Fibre is usually two strands — transmit on one, receive on the other. If both ends are wired straight through, each switch is transmitting into the other's transmitter. **Swap the strands at one end.**
2. **Clean the connector end faces** with proper fibre cleaning tools. Contamination on the ferrule is a leading cause of failure.
3. **Confirm the transceivers match the fibre** — multimode optics on multimode fibre, single-mode on single-mode, and the same standard at both ends.
4. **Check the distance against the standard's specification,** not against "fibre goes a long way".
5. **Inspect the route for tight bends,** especially where cable ties or trays force a sharp turn.
6. **Then test the fibre itself** with fibre-specific test equipment — this is one of those situations where the specialised equipment mentioned at the start of the lesson becomes unavoidable.

## 4. Security perspective

Fibre changes the physical-security picture more than any other cabling decision in this section.

- **It emits nothing.** Twisted pair radiates a field that an inductive probe can read without touching the cable. Fibre carries no electrical signal, so there is nothing to pick up from outside it. For links crossing space you do not fully control, that is the strongest argument for fibre.
- **Tapping requires interrupting the link.** Getting at the light generally means bending or splitting the fibre, which costs optical power — so a well-monitored link can reveal a tap as a change in received signal level. Copper gives you no such signal.
- **The same property cuts both ways for defenders.** Monitoring a fibre link needs fibre-capable taps or mirror ports, and passive fibre taps sit in line permanently. Plan and budget monitoring points when the fibre goes in, not afterwards.
- **No electrical path between buildings.** Fibre carries no current, so it cannot conduct a lightning surge or a ground-potential difference into a switch. Inter-building fibre removes an entire class of availability incident that copper creates.
- **Immunity to interference is an availability control.** In industrial and electrically noisy environments, fibre removes a whole category of intermittent, hard-to-diagnose faults — and intermittent faults are exactly the noise that real problems hide in.
- **Physical protection still matters.** Fibre cannot be tapped remotely, but it can be cut, and a cut is a total outage. Diverse routing for critical links matters more with fibre precisely because so much capacity rides on one strand.
- **Handle safely.** Never look into a fibre end or a transceiver port; the light can be invisible and, from a laser source, harmful.

## Summary

- Fibre sends **light** through glass instead of electrical signals through copper, so it is **immune to interference**, **difficult to tap**, and can run **many kilometres without regeneration**.
- It needs **specialised equipment**, is harder to monitor, and comes in many types and connectors.
- A fibre has a **core** (high refractive index), surrounded by **cladding** (low refractive index) which reflects the light back in, all protected by a **buffer coating**.
- Light is generated by an **LED** or a **laser** and bounces along the core to the far end.
- Connectors hold the fibre in a **ceramic ferrule**; the fibre itself is the tiny discoloured spot at its centre.
- **Multimode:** short range (usually up to about 2 km), **LED** source, relatively **large core**, light takes **several modes** — used inside buildings.
- **Single-mode:** long range (kilometres), **laser** source, much **narrower core**, a **single** path — used between sites.
- Multiple modes mean rays arrive at slightly different times, which is what limits multimode's distance.

## Glossary

| Term | Meaning |
|---|---|
| Optical fibre | Cable carrying data as light through a glass strand |
| Core | The centre of the fibre, with a high refractive index, that carries the light |
| Cladding | The lower-index layer around the core that keeps light inside |
| Refractive index | A measure of how much a material slows and bends light |
| Total internal reflection | Light reflecting back into the core at the cladding boundary |
| Buffer coating | The protective layer around the fragile core and cladding |
| LED | Light emitting diode; the inexpensive light source used by multimode |
| Laser | The precise, powerful light source used by single-mode |
| Ferrule | The ceramic sleeve in a connector that holds and aligns the fibre |
| End face | The polished tip of the ferrule, where contamination causes failures |
| Mode | A path light can take through the fibre core |
| Multimode | Wide-core fibre allowing several modes; short range, LED |
| Single-mode | Narrow-core fibre with one path; long range, laser |
| Modal dispersion | Pulse spreading caused by rays taking different-length paths |
| Regeneration | Rebuilding a signal that has degraded over distance |
| Bend radius | The tightest curve a fibre can take before light escapes |
| Transceiver | The module that converts between electrical signals and light |

## Review questions

1. What does fibre send down the cable instead of electrical signals?
2. Give three advantages of fibre over copper.
3. Name two practical drawbacks of using fibre.
4. Name the three layers of a fibre optic cable and what each does.
5. What property of the core and cladding keeps the light inside the fibre?
6. What two kinds of light source are used with fibre?
7. What is a ferrule made of, and what does it do?
8. What is the typical maximum distance for multimode fibre?
9. Which light source is normally used with multimode, and why?
10. What does "multimode" actually refer to?
11. How does single-mode fibre's core compare with multimode's, and what does that achieve?
12. Why can single-mode run for kilometres when multimode cannot?
13. **Scenario:** a factory floor full of industrial machinery has a network link that keeps producing errors on shielded twisted pair. What would you propose and why?
14. **Scenario:** two buildings 8 km apart need a connection. Which fibre type, which light source, and why not the other?
15. **Scenario:** a new multimode link between two switches shows no link at either end. Give three things to check, in order.
16. **Scenario:** a critical fibre link between two buildings runs through a single duct. What is the risk that fibre does not remove, and what is the mitigation?

## Answer key

1. **Light.**
2. **Immunity to electrical and radio-frequency interference, difficulty of tapping, and very long distances without regeneration.**
3. **It needs specialised equipment, and it is harder to monitor or tap** — plus the many types and connectors to choose between.
4. **Core** carries the light; **cladding** reflects it back into the core; **buffer coating** protects the fragile glass.
5. **The difference in refractive index between them** — the higher-index core and lower-index cladding cause total internal reflection.
6. **LEDs and lasers.**
7. **Ceramic.** It holds, protects and precisely aligns the fibre so light passes into the fibre on the other side of the connection.
8. **Usually up to about 2 km,** though it varies with the Ethernet standard in use.
9. **An LED,** because the short distances involved do not need a more expensive light source.
10. **The several different paths — modes — that light can take** through multimode's relatively large core.
11. **Single-mode's core is much narrower,** so light takes effectively a single path through the fibre.
12. **Because there is only one path.** In multimode, rays taking different paths arrive at slightly different times and the pulse spreads, which limits distance.
13. **Fibre.** It carries light rather than electricity, so industrial and radio-frequency interference does not affect it — shielding only reduces the problem, whereas fibre removes it.
14. **Single-mode with a laser.** Multimode tops out around 2 km, far short of 8 km, and lacks the reach a laser over a narrow core provides.
15. **Swap the transmit and receive strands at one end; clean the ferrule end faces; confirm the transceivers match the fibre type and standard.** Then check distance and bends.
16. **A cut** — fibre is immune to interference and surges, but a single duct is still a single point of failure. **Mitigation: diverse routing** for the second link.
