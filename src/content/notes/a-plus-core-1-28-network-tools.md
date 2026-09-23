---
title: "A+ Core 1 2.8: Network Tools — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 2.8: crimpers, Wi-Fi and spectrum analysers, tone generator and probe, punch-down tools, cable testers, loopback plugs, taps and port mirrors."
pubDate: 2026-09-23
tags: ["class-notes", "a-plus", "comptia", "messer", "networking", "network-tools", "cabling", "troubleshooting"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 2, lesson 2.8 (Network Tools)**

> **Quick reference:** the short version of this lesson is the Network Tools cheat sheet in [A+ Core 1 section 2](/cyber_lab_log/resources/a-plus-core-1/2/). It follows the section's earlier lessons on ports, wireless protocols, network services, DNS, DHCP, VLANs and VPNs, network devices, IP addressing and internet connection types — the tools here are how you build and fix the physical layer those lessons depend on.

## Learning objectives

By the end of these notes you should be able to:

1. Describe what a cable crimper does and what else you need to terminate your own twisted-pair cables.
2. Explain what a Wi-Fi analyser shows and how a spectrum analyser differs from it.
3. Use a tone generator and inductive probe to trace one cable among hundreds.
4. Explain what a punch-down block and punch-down tool are for, and why the twists matter right up to the block.
5. Say what a cable tester proves and, just as importantly, what it does not prove.
6. Explain how a loopback plug isolates a faulty interface from a faulty cable.
7. Compare a physical tap with a port mirror (SPAN) for capturing traffic.
8. Choose the right tool for a described symptom, and describe the security implications of owning and using these tools.

## 1. Terminating copper: crimpers

### 1.1 The job

Sooner or later you are handed a bare cable with no connector on it — coax, twisted pair or fibre — and asked to put the right connector on the end. For copper, the tool is a **cable crimper**: it squeezes a connector permanently onto the cable so the two become one piece. The classic example is fitting an **RJ45** connector to a twisted-pair cable.

### 1.2 How an RJ45 crimp actually works

Inside an un-crimped RJ45 connector, the eight metal contacts sit slightly proud of the body and each one has a sharp, pointed end. You slide the eight untwisted wires into the connector in order, and when the crimper closes, those points are forced down **through the plastic insulation** on each wire until they bite into the copper underneath. This is an *insulation displacement* connection: you never strip the individual wires.

The same squeeze also pushes a small plastic **cable stay** down onto the outer jacket, so a tug on the cable pulls against the jacket rather than against the eight delicate wires.

```text
+------------------------------------------------------------------------------+
|  Before the crimp                       After the crimp                      |
|                                                                              |
|   contacts stand proud                   contacts driven down                |
|        v v v v                                | | | |                        |
|     +---------+                            +---------+                       |
|     | RJ45    |                            | RJ45    |                       |
|  ===|  wires  |                         ===|  wires  |                       |
|     +---------+                            +---------+                       |
|        ^                                       ^                             |
|   stay not yet pressed                  stay clamps the jacket               |
+------------------------------------------------------------------------------+
```

### 1.3 What else you need

A crimper alone is not enough. A realistic kit is:

| Tool | Job |
|---|---|
| Cable crimper | Presses the connector onto the cable |
| Electrician's scissors or cable snips | Cutting the cable and trimming the wires square |
| Wire stripper | Removing the outer jacket without nicking the pairs inside |
| RJ45 connectors | One per end, plus spares for the ones you get wrong |
| Cable tester | Proving the result before you install it (section 5) |

The first few attempts are slow, mostly spent getting eight wires into the right order and fully seated. After a few goes it becomes routine, and the payoff is being able to make cables to exactly the length you need instead of living with 3 m patch leads behind a rack.

> **Note (beyond this lesson):** the wire order is a standard, not a preference. **T568B** is W-Or, Or, W-Gn, Bl, W-Bl, Gn, W-Br, Br. Use the same standard at both ends for a normal patch cable, and pick one standard for the whole site.

> **Caution:** untwist as little as possible — no more than about 13 mm (half an inch) at the connector. The twists are what cancel interference; undo too many and a cable that passes a continuity test can still perform badly.

> **In the real world:** many installers now use *pass-through* RJ45 connectors, where the wires poke out of the front and the crimper trims them flush. They are far easier to get right, but need a crimper designed for them.

## 2. Wireless tools

### 2.1 Wi-Fi analyser

Going wireless removes the cables but adds a different set of problems, and you cannot see radio. A **Wi-Fi analyser** makes it visible. It shows:

- which **frequencies and channels** are in use, by your network and by the neighbouring ones
- the **signal strength** you are getting from your access point
- **interference** affecting the network
- the **wireless devices** connected to the access point

### 2.2 Spectrum analyser

A Wi-Fi analyser only understands Wi-Fi. If you need to know what else is using the same frequencies, you need a **spectrum analyser**, which looks at the whole radio spectrum and shows every signal in the area, 802.11 or not.

| | Wi-Fi analyser | Spectrum analyser |
|---|---|---|
| Sees | 802.11 networks, channels, clients | All radio energy in the band |
| Finds | Channel overlap, weak signal, busy channels | Non-Wi-Fi interference from any source |
| Typically | An app on a laptop or phone | A dedicated device or USB probe |
| Costs | Little or nothing | Considerably more |

> **Exam tip:** "another network is on my channel" is a **Wi-Fi analyser** problem. "Something that isn't Wi-Fi at all is jamming the band" is a **spectrum analyser** problem.

> **Note (beyond this lesson):** common non-Wi-Fi sources on 2.4 GHz are microwave ovens, older cordless phones, Bluetooth devices, baby monitors and wireless cameras. A Wi-Fi analyser cannot see any of them; it just reports poor performance on a channel that looks empty.

### 2.3 Reading the output

A Wi-Fi analyser plots signal against noise. Far from the access point, the noise floor sits close to the level of your own signal, so there is little headroom and throughput suffers. Walk towards the access point and the signal rises clearly above the noise, which you can watch happening on the display.

```text
+------------------------------------------------------------------------------+
|  Far from the AP                        Close to the AP                      |
|                                                                              |
|  strength                               strength                             |
|    |                                      |   #####  signal                  |
|    |  ####  signal                        |   #####                          |
|    |  ~~~~  noise                         |   #####                          |
|    |  ~~~~                                |   ~~~~~  noise                   |
|    +---------------                       +---------------                   |
|    little headroom -> poor throughput     clear headroom -> good             |
+------------------------------------------------------------------------------+
```

> **Note (beyond this lesson):** the gap between the two is the **signal-to-noise ratio (SNR)**. Roughly 20 dB or more of SNR supports the fastest rates; below about 10 dB the link drops to slow rates or fails. That is why a survey records signal *and* noise, not signal alone.

## 3. Finding a cable: tone generator and probe

### 3.1 The problem

In a building with hundreds or thousands of cables, the hard part is not making a connection — it is working out which of the many identical cables in the comms room is the one that ends at the desk you just left.

### 3.2 Two devices, not one

The kit is a pair:

1. The **tone generator** clips onto the cable at one end and puts a continuous analogue tone onto the copper.
2. The **inductive probe** is what you carry to the other end. Since human ears cannot hear a tone travelling down a wire, the probe picks it up inductively — from the magnetic field around the cable — and plays it through a small speaker, usually with a light as well.

The important point is that the probe never has to touch the copper. You wave it along the outside of the cable jackets and listen for the one that sings.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   [Tone generator] --- clipped to the cable, injects an audio tone           |
|          |                                                                   |
|          |  ===============================================                  |
|          |   the cable runs through walls, trays and ducts                   |
|          |  ===============================================                  |
|                                        )))  field around the wire            |
|                                     [Inductive probe] -> speaker             |
|                                     move it across the bundle                |
+------------------------------------------------------------------------------+
```

### 3.3 Where you connect it

The generator can attach in whatever way the cable presents itself: a modular **RJ45** connection, a **coax** connector, or clips straight onto a **punch-down block**. Then you take the probe to the far end and move from cable to cable until one makes a noise.

> **In the real world:** work methodically. Split a large bundle into halves, probe each half, and keep halving the noisy one. Sweeping randomly across two hundred cables wastes far more time than a few deliberate passes.

> **Caution:** do not connect a tone generator to a cable that is still plugged into live equipment, especially anything carrying PoE or a telephone line. Unplug the far end first.

## 4. Punch-down blocks and the punch-down tool

### 4.1 What a punch-down block is

Where a lot of cabling arrives in one place — the back wall of a comms room or data centre — the cables are terminated onto a **punch-down block** rather than fitted with plugs. Cross-connecting one cable to another then becomes a short jumper between block positions instead of a re-run of cable.

### 4.2 What the tool does

The **punch-down tool** does two things in one push: it seats each wire into the block's slot, where the metal contacts cut through the insulation to reach the copper and hold the wire so it cannot easily be pulled out, and it **trims off the excess wire** in the same movement, leaving a tidy termination.

### 4.3 Craft: keep the twists

A well-punched block shows the twists maintained right up to the point of termination. Those twists are what cancel interference, so untwisting a long tail before punching it down weakens the signal even though the connection is electrically fine. The lesson makes exactly this point about a good installation.

### 4.4 Numbering and documentation

Blocks are numbered so that each terminated cable has an address. Record which number a cable is punched into and where its other end goes. When you later need to connect that run to a switch, the documentation, not a probe, should be the first thing you reach for.

```text
+------------------------------------------------------------------------------+
|  Punch-down block, numbered positions                                        |
|                                                                              |
|   01 |=| ==== to desk 12, port A     (twists kept to the block)              |
|   02 |=| ==== to desk 12, port B                                             |
|   03 |=| ==== to meeting room camera                                         |
|   04 |=| ==== spare                                                          |
|                                                                              |
|   Jumper 01 --> switch port 1/0/7    (record it, don't re-trace it)          |
+------------------------------------------------------------------------------+
```

> **Note (beyond this lesson):** the two families you will meet are the older **66 block** (mostly telephone) and the **110 block** (data). Punch-down tools take interchangeable blades for each, and one side of the blade cuts while the other does not — put it in the wrong way round and you cut off the wire you meant to keep.

## 5. Cable testers

### 5.1 What it proves

After crimping a plug or punching down a block, a **cable tester** checks that the cable is wired the way you intended: pin 1 at one end reaches pin 1 at the other, pin 2 reaches pin 2, and so on through all eight. It finds:

- **open pins** — a wire you missed, or one not seated in the connector
- **crossed pairs** — wires in the wrong order, which show as lights jumping out of sequence
- **shorts** between conductors

### 5.2 What it does not prove

A cable tester is a **continuity** test. It tells you the copper goes where it should; it says nothing about the *quality* of the link — bandwidth, crosstalk, attenuation or noise. A cable can pass a continuity test and still be far too long, badly untwisted, or run alongside a fluorescent light.

> **Exam tip:** continuity is the key word. If a scenario says the cable "tests fine" but throughput is poor or errors are high, the answer is not another continuity test — think length, interference, untwisted pairs, or a certifier.

> **Note (beyond this lesson):** the tool that does measure quality is a **cable certifier**, which tests against the TIA category standards (Cat 5e, Cat 6a and so on) and produces a pass or fail report. It costs orders of magnitude more than a continuity tester.

### 5.3 Using one

Many tone generators double as a continuity tester. In testing mode with nothing connected, the unit flashes to show it sees no wires. Plug one end of the cable into the main unit and the other into the remote end, and it steps through pins 1 to 8 in turn: a light for each pin that is connected, no light for one that is not, and lights out of order where wires are crossed. It is a simple test, but it answers the question "did I get the eight wires in the right order?" in a couple of seconds.

```text
+------------------------------------------------------------------------------+
|  Cable tester walking the pins                                               |
|                                                                              |
|   Main unit                                     Remote unit                  |
|   [1][2][3][4][5][6][7][8]  ==== cable ====  [1][2][3][4][5][6][7][8]        |
|                                                                              |
|   all eight light in order   = wired straight through                        |
|   one pin never lights       = open (missed or unseated wire)                |
|   lights out of sequence     = crossed pair, wires in wrong order            |
+------------------------------------------------------------------------------+
```

## 6. Loopback plugs

### 6.1 The question they answer

A device reports a lot of errors on a link. Is the **cable** at fault, or the **interface** on the device? A **loopback plug** answers that by removing everything else from the picture.

### 6.2 What it is

A loopback plug is a short connector that wires the interface's transmit path straight back into its own receive path. There are different plugs for serial, RJ45 and fibre connections. They are **not crossover cables** — a crossover joins two different devices; a loopback folds one interface back on itself.

### 6.3 How you use it

1. Plug the loopback into the interface under test.
2. Put that interface into its **diagnostic** or loopback mode.
3. The interface transmits a known pattern, which comes straight back into its receiver.
4. Compare what came back with what went out. Identical means the physical interface is doing its job. Any difference points at the interface itself.

```text
+------------------------------------------------------------------------------+
|  Normal link                            Loopback test                        |
|                                                                              |
|  [Device A] TX ------> RX [Device B]    [Device] TX ---+                     |
|             RX <------ TX                        RX <--+                     |
|                                                                              |
|  A fault could be at either end         Only this one interface and          |
|  or anywhere in the cable between       its own signalling are tested        |
+------------------------------------------------------------------------------+
```

> **Exam tip:** loopback plug = test **one interface in isolation**. Cable tester = test **the cable**. Between them you can say which half of the problem you have.

> **Note (beyond this lesson):** an RJ45 Ethernet loopback plug joins pin 1 to pin 3 and pin 2 to pin 6 (the transmit pair to the receive pair); a 9-pin serial loopback joins pin 2 to pin 3. There is also a software loopback — `127.0.0.1` and `::1` — which tests the TCP/IP stack rather than the hardware. The two ideas share a name and nothing else.

## 7. Capturing traffic: taps and port mirrors

### 7.1 Physical taps

Eventually you will need to collect the actual packets crossing a link. A **physical tap** is inserted into the middle of the link: you break the connection and put the tap in line, so traffic passes through it and a copy goes out to your monitoring port.

Breaking a link means an outage, so this is rarely something you do to a production network during working hours. If a link is going to be captured often, the usual answer is to install the tap permanently while you have a maintenance window.

**Fibre taps** are commonly **passive** — they split off a small fraction of the light and need no power at all, so they cannot fail the link by losing power. **Copper taps** generally do need a power source.

### 7.2 Port mirroring (SPAN)

When you cannot interrupt the link, use a feature built into enterprise switches: a **port mirror**, also called **port redirection** or **SPAN** (Switched Port ANalyzer). You plug your protocol analyser into one switch port and tell the switch to copy every frame from another port to it. You get the same copy of the traffic without touching the cabling — the switch itself acts as your tap.

```text
+------------------------------------------------------------------------------+
|  Physical tap (link broken, tap inserted)                                    |
|                                                                              |
|   [Host] ==== [ TAP ] ==== [Switch]                                          |
|                  ||                                                          |
|                  \/  copy of both directions                                 |
|             [Analyser]                                                       |
|                                                                              |
|  Port mirror / SPAN (no cabling changed)                                     |
|                                                                              |
|   [Host] ==== [Switch port 1] --- traffic flows as normal                    |
|                     ||  switch copies frames internally                      |
|               [Switch port 9] ==== [Analyser]                                |
+------------------------------------------------------------------------------+
```

### 7.3 Choosing between them

| | Physical tap | Port mirror (SPAN) |
|---|---|---|
| Installing it | Breaks the link; needs a maintenance window | Configuration change only |
| Needs | The tap hardware; power for copper taps | A managed switch that supports it |
| Fidelity | Sees everything on the wire, including errors | Can drop frames when the switch is busy |
| Affects the switch | No | Uses switch resources |
| Good for | Permanent monitoring points, forensics | Ad-hoc capture, anywhere you already have a managed switch |

> **In the real world:** a mirror port can be oversubscribed. Mirroring two busy gigabit ports into one gigabit analyser port means frames get dropped, and the gaps are silent. If a capture must be complete, use a tap.

### 7.4 Worked example — which tool, in order

**Scenario:** a user's desktop is connected but the switch reports thousands of errors on that port. The cable was made on site.

1. **Check the cable's wiring** with a **cable tester**: a home-made cable with a crossed or open pair is the likeliest cause, and the test takes seconds.
2. **If the cable tests good, suspect the endpoints.** Fit a **loopback plug** to the desktop's NIC and run its diagnostic mode; a failure there points at the NIC.
3. **Swap the patch lead** for a known-good factory cable. If the errors stop, the original cable is electrically continuous but poor quality — untwisted at the plug, or too long.
4. **Still failing?** Move to the switch: try another port, then compare **interface error counters** on two readings a few minutes apart, since the counters are cumulative since boot.
5. **If you need to see what the traffic itself looks like,** set up a **port mirror** of that switch port rather than breaking the link with a tap.

### 7.5 Worked example — tracing an unlabelled run

**Scenario:** a meeting room has a live wall socket, and nobody knows which patch panel position it lands on. The comms room has around 200 identical cables.

1. **Documentation first.** Check the patch panel numbering and any cabling records — the tool you need may be a spreadsheet.
2. **If there is no record,** plug the **tone generator** into the wall socket in the meeting room.
3. **Take the inductive probe** to the comms room and work across the punch-down block or patch panel in halves, listening for the tone.
4. **Confirm** with a **cable tester** end to end once you think you have found it, rather than trusting one noisy reading.
5. **Then document it** — number the position and record the room, so nobody repeats this.

## 8. Security perspective

These are physical-layer tools, and the physical layer is where a lot of defensive assumptions quietly break.

- **A tap or mirror is a wiretap.** Anyone who can insert a tap or configure a SPAN port sees every unencrypted packet on that link — credentials on plain HTTP, Telnet, FTP and SNMP v1/v2c included. Treat comms room access, and switch administrative access, as being as sensitive as a domain admin account.
- **Restrict and log port mirroring.** A mirror needs no physical access at all, just a switch login. Management should be on its own VLAN, configured through authenticated accounts, and changes to mirror configuration should be logged and reviewed.
- **Passive fibre taps are essentially undetectable** from the network side: they neither draw power nor change the link's behaviour. Physical inspection of the cable path is the only real defence, which is why cabling should run through locked rooms and trays rather than open ceilings.
- **An unused live wall socket is an open door.** If a tone generator can find a live run into a public meeting room, so can an attacker with a laptop. Patch only the positions that are in use, disable unused switch ports, and use 802.1X where it matters.
- **Rely on encryption, not on the cable.** A tap defeats every control that depends on traffic being unseen. HTTPS, SSH, LDAPS and SNMPv3 keep working even when someone is copying the frames.
- **Poor terminations become availability incidents.** Untwisted pairs and bad crimps produce intermittent errors and retransmissions that look like an application fault and can consume days of investigation.
- **These tools belong to the blue team too.** A permanently installed tap feeding an IDS, or a mirror port feeding a network sensor, is exactly how network detection is deployed. The same capability is defensive or offensive depending entirely on who controls it.

## Summary

- A **crimper** presses a connector, typically RJ45, onto a copper cable; its pointed contacts pierce the insulation, and the crimp also clamps a cable stay onto the jacket. You also need snips and a wire stripper.
- A **Wi-Fi analyser** shows channels, signal strength, interference and connected devices; a **spectrum analyser** shows everything using the frequencies, Wi-Fi or not.
- A **tone generator** puts an audible tone on a cable and an **inductive probe** finds it at the other end without touching the copper — the way to identify one cable among hundreds.
- A **punch-down tool** seats wires into a numbered **punch-down block** and trims them in the same push. Keep the twists right up to the block, and document what lands where.
- A **cable tester** proves continuity pin by pin, finding opens and crossed pairs. It says nothing about link quality.
- A **loopback plug** folds an interface's transmit back into its own receive so you can test one interface in isolation. It is not a crossover cable.
- A **physical tap** sits in the middle of a link (fibre taps are often passive and unpowered); a **port mirror**, or **SPAN**, makes the switch copy one port's frames to your analyser with no cabling change.

## Glossary

| Term | Meaning |
|---|---|
| Crimper | Tool that presses a connector permanently onto a copper cable |
| RJ45 | The eight-pin modular connector used on twisted-pair Ethernet |
| Insulation displacement | Contacts piercing a wire's insulation to reach the copper, with no stripping |
| Cable stay | The part of a connector that clamps the outer jacket so the wires take no strain |
| Wire stripper | Tool for removing the outer jacket without damaging the pairs |
| Wi-Fi analyser | Tool showing 802.11 channels, signal strength, interference and clients |
| Spectrum analyser | Tool showing all radio energy in a band, including non-Wi-Fi sources |
| Tone generator | Device that injects an analogue tone onto a cable for tracing |
| Inductive probe | Handheld receiver that hears the tone through a cable's insulation |
| Punch-down block | Terminating block where many cables land for cross-connection |
| Punch-down tool | Tool that seats a wire into a block and trims the excess in one push |
| Cable tester | Continuity tester that checks each pin reaches the matching pin |
| Continuity | Whether an unbroken electrical path exists; not a measure of quality |
| Loopback plug | Connector that feeds an interface's transmit back into its own receive |
| Diagnostic mode | Interface mode that sends a test pattern and checks what returns |
| Physical tap | Device inserted into a link to copy traffic to a monitoring port |
| Passive tap | A tap, usually fibre, that needs no power to work |
| Port mirror | Switch feature that copies one port's frames to another port |
| SPAN | Switched Port ANalyzer; another name for port mirroring |
| Protocol analyser | Software or hardware that captures and decodes network traffic |

## Review questions

1. What does a cable crimper do, and how do the contacts inside an RJ45 connector make contact with the copper?
2. Besides the crimper and connectors, name two tools needed to make your own patch cables.
3. What four kinds of information does a Wi-Fi analyser give you?
4. How does a spectrum analyser differ from a Wi-Fi analyser?
5. Why do you need an inductive probe as well as a tone generator?
6. Name three ways a tone generator can be connected to a cable.
7. What two things does a punch-down tool do in a single push?
8. Why should the twists in a twisted pair be maintained right up to the punch-down block?
9. What faults will a cable tester find, and what can it not tell you?
10. How is a loopback plug different from a crossover cable?
11. Why are fibre taps often described as passive?
12. What does SPAN stand for, and what does it do?
13. **Scenario:** a port shows thousands of errors on a link with a home-made patch cable. Which tool do you use first, and which one next if that test passes?
14. **Scenario:** users near the staff kitchen lose their Wi-Fi connection at lunchtime, but the Wi-Fi analyser shows a clear channel. What tool would identify the cause?
15. **Scenario:** you must capture every frame on a critical link, including errors, and nothing may be missed. Tap or port mirror, and why?
16. **Scenario:** a live network socket is found in a public meeting room and nobody knows where it terminates. Describe how you would trace it and what you would do afterwards.

## Answer key

1. **It presses the connector permanently onto the cable.** The pointed contacts are driven through each wire's insulation into the copper inside (insulation displacement), and the crimp also clamps a stay onto the jacket.
2. **Electrician's scissors or cable snips, and a wire stripper** (plus a cable tester to check the result).
3. **Frequencies and channels in use, signal strength, interference, and the devices connected to the access point.**
4. **A spectrum analyser sees all radio energy in the band, not just 802.11,** so it finds non-Wi-Fi interference a Wi-Fi analyser cannot.
5. **The tone travels along the copper and you cannot hear it.** The probe picks it up inductively from outside the cable and plays it aloud.
6. **A modular RJ45 connection, a coax connector, or directly onto a punch-down block.**
7. **It seats the wire into the block and trims off the excess wire.**
8. **The twists cancel interference.** Untwisting a long tail weakens the signal even if the connection is electrically fine.
9. **It finds opens, crossed pairs and shorts — a continuity test only.** It does not measure link quality such as bandwidth, crosstalk or attenuation.
10. **A loopback folds one interface's transmit back into its own receive;** a crossover connects two different devices.
11. **They split off part of the light and need no power,** so they cannot take the link down by losing power.
12. **Switched Port ANalyzer.** The switch copies frames from one port to another so an analyser can see the traffic without a physical tap.
13. **A cable tester first** (continuity on a home-made cable is the likeliest fault); **a loopback plug next** to test the interface in isolation.
14. **A spectrum analyser.** The symptom points at non-Wi-Fi interference — most likely the microwave oven — which a Wi-Fi analyser cannot see.
15. **A tap.** A mirror port can drop frames when the switch is busy and generally will not reproduce errored frames; a tap sees everything on the wire.
16. **Tone the socket and probe the comms room** in halves until the run is found, confirm it end to end with a cable tester, then **document the position and either patch it properly or disable it,** since an unused live socket is an easy way onto the network.
