---
title: "A+ Core 1 2.3: Wireless Networking Protocols"
description: "When people say \"wireless networking\", they usually mean the network used at home or work to reach other devices and the internet. This is standardised by the IEEE — the Institute of Electrical and Electronics…"
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 2.2__

__Quick reference:__ the short version of this lesson is the Wireless Networking Protocols cheat sheet, part of Section 2.

## Learning objectives

By the end of these notes you should be able to:

1. Explain who standardises Wi-Fi, and match 802.11 standard names to their Wi-Fi generation names.
2. Describe the three Wi-Fi frequency bands and how channels relate to frequencies.
3. Explain bandwidth in the 802.11 sense, and compare channel availability across the three bands.
4. Describe Bluetooth, its frequency band, and its typical range.
5. Explain the unlicensed ISM band and why it matters.
6. Describe RFID, including passive and active tags, and common uses.
7. Explain NFC, how it builds on RFID, and its common uses.

## 1. Who standardises Wi-Fi

When people say "wireless networking", they usually mean the network used at home or work to reach other devices and the internet. This is standardised by the __IEEE__ — the __Institute of Electrical and Electronics Engineers__ — specifically by its __802.11 Committee__. That's why these are called __802.11 networks__.

## 1.1 802.11 names vs Wi-Fi generation names

The 802.11 Committee felt that names like "802.11ac" were confusing for everyday use, so newer standards also get a simpler __Wi-Fi generation__ name:

__802.11 standard__

__Wi-Fi name__

802.11ac

__Wi-Fi 5__

802.11ax

__Wi-Fi 6__, and __Wi-Fi 6E__ (Extended)

802.11be

__Wi-Fi 7__

Instead of remembering the 802.11 letter codes, you can just say "Wi-Fi 6" or "Wi-Fi 7".

## 2. Frequencies and channels

## 2.1 The three bands

Wi-Fi can use several frequency ranges, and different standards support different bands. Most Wi-Fi networks and devices use:

__Band__

__Notes__

__2.4 GHz__

The oldest, most crowded band

__5 GHz__

More spectrum, more channels

__6 GHz__

The newest, with the most spectrum

Some access points and devices can use __more than one band simultaneously__.

## 2.2 Channels instead of frequencies

Rather than remembering exact frequency values, the 802.11 Committee groups frequencies into __channels__ — a simpler way to refer to a particular slice of spectrum. Your device's Wi-Fi settings show the channel it's using, not the raw frequency.

__Worked example — reading channel numbers.__ On one device:

- __2.4 GHz, channel 6__ → this corresponds to __2.437 GHz__ in the IEEE standard.
- __5 GHz, channel 44__ → this corresponds to __5.220 GHz__.

It's far easier to say "channel 44" than "5.220 GHz" — that's the whole point of channel numbers.

## 2.3 Bandwidth

__Bandwidth__, in this context, is __how much spectrum__ a single Wi-Fi connection uses. Common values are:

- __20 MHz__
- __40 MHz__
- __80 MHz__
- __160 MHz__

A wider bandwidth uses more spectrum for one connection, generally allowing __more throughput__.

## 2.4 Comparing the three bands

__Band__

__Available channels/spectrum__

__Bandwidth options__

__Interference__

__2.4 GHz__

Limited — only __three non-overlapping 20 MHz channels__

Mainly 20 MHz

High, especially in crowded areas

__5 GHz__

Much more spectrum

20, 40, 80 or __160 MHz__

Lower

__6 GHz__

The most spectrum of all

20, 40, 80 or 160 MHz, with the most room to use them

Lowest

__Why 5 GHz and 6 GHz exist:__ 2.4 GHz has relatively little usable spectrum. In a confined space with many wireless networks nearby, that crowding causes __interference__. Moving to 5 GHz — and now 6 GHz — gives far more frequencies (and wider bandwidth options) to work with, reducing that congestion.

__Note (beyond this lesson):__ the three non-overlapping 2.4 GHz channels referred to here are __channels 1, 6 and 11__ — the same set covered in the Section 2 networking notes.

## 3. Bluetooth

__Bluetooth__ is a different wireless technology, commonly used for __wireless headsets and wireless speakers__ connecting to a computer or phone.

__Feature__

__Detail__

Frequency

__2.4 GHz__

Band type

Part of the __unlicensed ISM__ frequencies

Range (consumer devices)

About __10 metres__ maximum

## 3.1 ISM band

__ISM__ stands for __Industrial, Scientific and Medical__. These are __unlicensed__ frequencies — no special licence is required to use them. That's precisely why you can simply turn on a laptop or phone and connect to Wi-Fi or Bluetooth without applying for any kind of spectrum licence.

## 3.2 Range: 802.11 vs Bluetooth

__802.11 (Wi-Fi)__

__Bluetooth__

Typical range

Enough to move around a building

About 10 metres (consumer devices)

Typical use

The network for a whole site

__Personal__ devices connected to you

Because of its shorter range, Bluetooth suits devices that travel with __you__ — headsets, speakers, wearables — rather than a whole building's network.

## 4. RFID

__RFID (Radio Frequency Identification)__ is used in many everyday situations:

__Use__

__Example__

Access control

Building access badges

Retail and manufacturing

Tags inside products, or tracked along an assembly line

Animal identification

A chip inside a pet, scanned to identify the owner

## 4.1 Tag types

__Type__

__Power source__

__Range__

__Passive__

__No battery.__ Sits with no power until a scanner's radio signal powers it

Short — you need to bring the scanner close

__Active__

Has its own __battery__

Longer — can be scanned from further away

__Physical forms:__

- A tiny tag, roughly __the size of a grain of rice__ — implanted in pets, for example.
- A __flat__ tag, as found in an access card — a printed __antenna__ around the outside, with the __RFID chip__ in the middle.

## 4.2 How a passive tag works

1. The tag sits __completely unpowered__.
2. A __scanner__ is brought close.
3. The __radio frequency energy from the scanner__ is enough to power the tag.
4. The scanner __reads an ID code__ from the tag.
5. That code is __compared against a database__ to determine what — or who — the tag represents.

## 4.3 Worked example — choosing a tag type

__Scenario__

__Tag type__

__Why__

An employee access badge, tapped at the door

Passive

No battery to maintain; short range is fine, even desirable

A pet microchip

Passive

Small, maintenance-free, lasts the animal's lifetime

Tracking a shipping container across a large yard

Active

Needs to be read from much further away than a passive tag allows

## 5. NFC

__NFC (Near Field Communication)__ builds on RFID technology, but extends it further.

__RFID__

__NFC__

Direction

Generally __one-way__ (scanner reads the tag)

__Two-way__ communication

Typical devices

Tags, badges, chips

Phones, smartwatches

## 5.1 Common uses

__Use__

__Example__

Payment

Tapping a phone or smartwatch at a point-of-sale terminal

Device setup

A phone using NFC to pass __Bluetooth or Wi-Fi configuration parameters__ to a new device, so it can join the network

Identification / access

Using a phone (instead of a badge) to open a door

## 5.2 Worked example — pairing a speaker with NFC

A new Bluetooth speaker supports NFC pairing.

1. The user __taps their phone__ against the NFC symbol on the speaker.
2. NFC's two-way link passes the __Bluetooth connection details__ to the speaker automatically.
3. The devices __pair without manually searching the Bluetooth device list__ and entering a code.
4. Once paired, actual audio still travels over __Bluetooth__ — NFC only helped with the setup step.

## 6. Security perspective

- __2.4 GHz interference isn't just annoying — it can mask problems.__ A congested band can look like a connectivity fault when it's really contention for limited channels. Moving affected devices to 5 GHz or 6 GHz, or changing channel, often resolves it.
- __The ISM band being unlicensed cuts both ways.__ Anyone can transmit on it — including attackers running rogue access points or jamming equipment. Always verify you're joining the legitimate network (correct SSID and authentication), not a lookalike.
- __RFID and NFC don't inherently encrypt.__ A basic passive RFID badge can potentially be cloned by someone with the right reader held close enough. More secure systems use encrypted or rolling-code tags.
- __Bluetooth's short range is a partial defence, not a complete one.__ Directional antennas can extend an attacker's effective range well beyond the "typical" 10 metres. Turn Bluetooth off when not in use, and don't accept unexpected pairing requests.
- __NFC's very short range__ (centimetres) makes casual eavesdropping harder, but keep payment authentication (PIN, biometric) enabled as a second layer.

# Summary

- __Wi-Fi__ is standardised by the __IEEE 802.11 Committee__. Modern standards also carry simpler names: 802.11ac = __Wi-Fi 5__, 802.11ax = __Wi-Fi 6 / 6E__, 802.11be = __Wi-Fi 7__.
- __Three frequency bands:__ 2.4 GHz (limited, only three non-overlapping 20 MHz channels), 5 GHz and 6 GHz (much more spectrum and wider bandwidth options — up to 160 MHz).
- __Channels__ are a simpler way to refer to specific frequencies (e.g. channel 6 = 2.437 GHz; channel 44 = 5.220 GHz).
- __Bandwidth__ is how much spectrum one connection uses: 20, 40, 80 or 160 MHz.
- __Bluetooth__ uses 2.4 GHz, part of the __unlicensed ISM__ band, with a consumer range of about 10 metres — suited to personal devices like headsets and speakers.
- __RFID__ tags can be __passive__ (no battery, powered by the scanner, short range) or __active__ (battery-powered, longer range). Used for access badges, retail/manufacturing tracking and pet identification.
- __NFC__ builds on RFID with __two-way__ communication, used for payments, device pairing/configuration, and phone-based access.

# Glossary

__Term__

__Definition__

IEEE

Institute of Electrical and Electronics Engineers

802.11

The IEEE committee and standard family for Wi-Fi

Wi-Fi 5 / 6 / 6E / 7

Simplified names for 802.11ac / ax / ax (extended) / be

Frequency band

A range of radio frequencies, e.g. 2.4 GHz, 5 GHz, 6 GHz

Channel

A named slice of spectrum within a band, simpler than quoting a frequency

Bandwidth (wireless)

The amount of spectrum used by one connection

Interference

Disruption from other devices or networks sharing the same spectrum

Bluetooth

A short-range wireless technology for personal devices

ISM band

Industrial, Scientific and Medical — unlicensed radio frequencies

Unlicensed spectrum

Frequencies usable without a specific licence

RFID

Radio Frequency Identification

Passive tag

An RFID tag with no battery, powered by the scanner's signal

Active tag

An RFID tag with its own battery, readable from further away

NFC

Near Field Communication — short-range, two-way wireless

Point-of-sale (POS) terminal

The payment device at a shop checkout

# Review questions

1. Which organisation, and which committee, standardises Wi-Fi?
2. Match the Wi-Fi generation names to their 802.11 standards: Wi-Fi 5, Wi-Fi 6, Wi-Fi 7.
3. What is a channel, and why is it more convenient than quoting a raw frequency?
4. What frequency does 2.4 GHz channel 6 correspond to?
5. Why does the 2.4 GHz band suffer more interference than 5 GHz or 6 GHz?
6. List four common Wi-Fi bandwidth values.
7. What frequency band does Bluetooth use, and what's its typical consumer range?
8. What does ISM stand for, and why does it matter that these frequencies are unlicensed?
9. What's the difference between a passive and an active RFID tag?
10. Describe, step by step, how a passive RFID badge is read.
11. Name two everyday uses of RFID besides access badges.
12. How does NFC differ from RFID?
13. Give two common uses of NFC.
14. A phone uses NFC to help a new speaker join a Bluetooth connection. Once paired, which technology actually carries the audio?

# Answer key

1. __The IEEE (Institute of Electrical and Electronics Engineers), via its 802.11 Committee.__
2. __Wi-Fi 5 = 802.11ac. Wi-Fi 6 (and 6E) = 802.11ax. Wi-Fi 7 = 802.11be.__
3. __A channel is a simpler label for a specific slice of spectrum__, easier to remember and communicate than an exact frequency value.
4. __2.437 GHz.__
5. __2.4 GHz has relatively little usable spectrum — only three non-overlapping 20 MHz channels —__ so networks nearby easily interfere with each other. 5 GHz and 6 GHz offer far more spectrum.
6. __20, 40, 80 and 160 MHz.__
7. __2.4 GHz; about 10 metres for consumer devices.__
8. __Industrial, Scientific and Medical.__ Being unlicensed means no special permission is needed to transmit on them, which is why Wi-Fi and Bluetooth just work out of the box.
9. __A passive tag has no battery and is powered by the scanner's signal, giving it a short range. An active tag has its own battery and can be read from further away.__
10. __The tag sits unpowered; a scanner is brought close; the scanner's radio energy powers the tag; the scanner reads the tag's ID code; that code is compared against a database.__
11. __Any two of:__ tags inside retail products, tracking along an assembly line, identifying pets via an implanted chip.
12. __NFC supports two-way communication, while RFID is generally one-way__ (a reader scanning a tag).
13. __Any two of:__ point-of-sale payments; passing Bluetooth/Wi-Fi setup details to a new device; phone-based door access or identification.
14. __Bluetooth.__ NFC only helps set up the connection; the audio itself travels over Bluetooth.
