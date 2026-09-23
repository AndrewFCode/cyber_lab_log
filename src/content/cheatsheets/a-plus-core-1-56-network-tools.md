---
title: "A+ Core 1 2.8: Network Tools"
description: "Professor Messer A+ 220-1201 objective 2.8 — crimpers, Wi-Fi and spectrum analysers, tone generator and probe, punch-down tools, cable testers, loopback plugs, taps and SPAN."
tags: ["a-plus", "comptia", "messer", "networking", "network-tools", "cabling", "troubleshooting"]
draft: false
updated: "2026-09-23"
kind: "resource"
resource: "a-plus-core-1"
module: "Network Tools"
moduleOrder: 56
unit: 2
---

> **In one line:** crimpers and punch-down tools build the copper, cable testers and loopback plugs tell you whether the cable or the interface is at fault, tone generators find which cable is which, Wi-Fi and spectrum analysers make radio visible, and taps or port mirrors get you the packets.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 2.8 (Network Tools).* The full version is the Network Tools class notes; the section overview is the Section 2 sheet.

---

## The toolbag at a glance

| Tool | Use it to | Key fact |
|---|---|---|
| Cable crimper | Fit a connector (usually RJ45) to copper | Contacts pierce the insulation; crimp also clamps the cable stay |
| Wi-Fi analyser | See channels, signal strength, interference, clients | 802.11 only |
| Spectrum analyser | See **all** radio energy in the band | Finds non-Wi-Fi interference |
| Tone generator + inductive probe | Find one cable among hundreds | Probe hears it without touching the copper |
| Punch-down tool | Terminate wires onto a punch-down block | Seats **and** trims in one push |
| Cable tester | Check pin 1→1, 2→2 … 8→8 | **Continuity only**, not quality |
| Loopback plug | Test one interface in isolation | **Not** a crossover cable |
| Physical tap | Copy traffic in line | Fibre taps often passive (no power) |
| Port mirror / SPAN | Copy a switch port's frames to an analyser | No cabling change needed |

## Crimping copper

| Item | Why |
|---|---|
| Crimper | Presses the connector on permanently |
| Snips / electrician's scissors | Cut and square the wires |
| Wire stripper | Remove the jacket without nicking pairs |
| Cable tester | Prove it before you install it |

- Contacts are **pointed** and pierce each wire's insulation — no stripping of individual wires.
- The crimp also presses a **cable stay** onto the jacket so a tug can't pull the wires out.
- **T568B:** W-Or, Or, W-Gn, Bl, W-Bl, Gn, W-Br, Br — same standard at both ends for a patch cable.
- Untwist as little as possible (~13 mm max).

## Wireless: which analyser?

| Symptom | Tool |
|---|---|
| Neighbouring SSID on my channel; weak signal; who's connected | **Wi-Fi analyser** |
| Channel looks clear but performance is terrible | **Spectrum analyser** (microwave, cordless phone, Bluetooth, camera) |

Signal close to the noise floor = little headroom = poor throughput. The gap is the **SNR**.

## Tracing a cable

1. Clip the **tone generator** to the cable — RJ45, coax, or straight onto the punch-down block.
2. Take the **inductive probe** to the other end; sweep the bundle in halves until it sings.
3. Confirm end to end with a **cable tester**, then **document** the position.

Don't tone a cable that's still plugged into live equipment (PoE, phone lines).

## Punch-down blocks

| Point | Detail |
|---|---|
| What | Where many cables land so cross-connects are short jumpers |
| Tool | Seats the wire, contacts cut the insulation, excess is trimmed — one push |
| Craft | Keep the **twists** right to the block; they cancel interference |
| Admin | Blocks are **numbered** — record which number goes where |
| Types | 66 (telephone) · 110 (data); blades differ, one edge cuts |

## Cable tester vs loopback plug

| | Cable tester | Loopback plug |
|---|---|---|
| Tests | The **cable** | One **interface** |
| Finds | Opens, crossed pairs, shorts | A faulty NIC or port |
| How | Continuity, pin by pin, 1–8 | TX wired back into RX; interface in diagnostic mode |
| Doesn't tell you | Bandwidth, crosstalk, attenuation (that's a **certifier**) | Anything about the cable |
| Watch out | "Tests fine" ≠ good cable | Not a crossover cable |

RJ45 loopback: pin 1→3, 2→6. Serial (DB9) loopback: pin 2→3. Software loopback (`127.0.0.1` / `::1`) is a different idea entirely — it tests the stack, not the hardware.

## Capturing traffic: tap vs SPAN

| | Physical tap | Port mirror (SPAN) |
|---|---|---|
| Install | **Breaks the link** — needs a window | Switch config change |
| Needs | Tap hardware; copper taps need power, fibre taps often passive | Managed switch |
| Fidelity | Everything on the wire, errors included | Can drop frames when the switch is busy |
| Also called | — | Port redirection, SPAN (Switched Port ANalyzer) |

## Pick the tool

| Clue | Tool |
|---|---|
| No connector on the cable | Crimper |
| Which of these 200 cables is it? | Tone generator + inductive probe |
| Terminating onto a block in the comms room | Punch-down tool |
| Did I get the eight wires in the right order? | Cable tester |
| Is it the cable or the NIC? | Cable tester, then loopback plug |
| Clear channel, awful Wi-Fi | Spectrum analyser |
| Need every frame, nothing dropped | Physical tap |
| Need a capture without touching the cabling | Port mirror / SPAN |

## 🔐 Security notes

- **A tap or a SPAN port is a wiretap:** every unencrypted packet on that link — HTTP, Telnet, FTP, SNMP v1/v2c credentials included. Comms room access and switch admin access are equally sensitive.
- **Mirroring needs no physical access,** just a switch login. Management on its own VLAN, authenticated accounts, and log changes to mirror config.
- **Passive fibre taps are undetectable from the network side** — no power draw, no change in behaviour. Locked rooms and inspected cable paths are the control.
- **An unused live wall socket is an open door:** patch only what's in use, disable unused ports, use 802.1X.
- **Encryption survives a tap;** obscurity doesn't. HTTPS, SSH, LDAPS, SNMPv3.
- **Same tools, blue team:** a permanent tap or mirror port is how an IDS or network sensor gets fed.

## Practice drills

<details>
<summary>1. How do RJ45 contacts connect to the copper?</summary>

The pointed contacts are driven **through the insulation** into the copper (insulation displacement). No stripping of individual wires.
</details>

<details>
<summary>2. Why do you need an inductive probe as well as a tone generator?</summary>

You can't hear a tone travelling down copper. The probe picks it up **inductively**, without touching the conductor.
</details>

<details>
<summary>3. What two things does a punch-down tool do at once?</summary>

**Seats** the wire in the block and **trims** the excess.
</details>

<details>
<summary>4. A cable passes the tester but throughput is poor. What's the tester not telling you?</summary>

It's a **continuity** test only — nothing about quality: length, crosstalk, attenuation, untwisted pairs. A **certifier** measures those.
</details>

<details>
<summary>5. Loopback plug vs crossover cable?</summary>

A loopback folds **one interface's** TX back into its own RX for isolation testing; a crossover joins **two different devices**.
</details>

<details>
<summary>6. What does SPAN stand for, and when do you use it over a tap?</summary>

**Switched Port ANalyzer.** Use it when you can't break the link — it needs only a config change on a managed switch.
</details>

<details>
<summary>7. Why are fibre taps often passive?</summary>

They split off a fraction of the light, so they need **no power** and can't drop the link by losing it.
</details>

<details>
<summary>8. Clear Wi-Fi channel, terrible performance. Which tool?</summary>

A **spectrum analyser** — the interference isn't 802.11 (microwave oven, cordless phone, camera).
</details>

## Key takeaways

- Crimper and punch-down tool build copper; keep the twists and document the block numbers.
- Cable tester = continuity (opens, crossed pairs); loopback plug = one interface in isolation. Neither is the other.
- Tone generator + inductive probe find one cable among hundreds without touching the copper.
- Wi-Fi analyser sees 802.11; spectrum analyser sees everything else in the band.
- Tap = in-line, complete, breaks the link to fit; SPAN = switch-copied, no rewiring, can drop frames.
