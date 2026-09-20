---
title: "Help Desk: Laptop Computer Components and Repair"
description: "Limited — RAM and storage sometimes; CPU and GPU almost never (soldered)"
tags: ["help-desk", "tcm", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TCM Security, Practical Help Desk · Section 5__

__Quick reference:__ the short version of this section is the Section 5 cheat sheet. The exam view of laptops is in A\+ Core 1 section 1.

## Learning objectives

By the end of these notes you should be able to:

1. Explain how laptops differ from desktops, and why that changes how you repair them.
2. Open a laptop safely and handle its internal connectors.
3. Assess battery health and handle damaged batteries safely.
4. Upgrade or replace laptop RAM and storage, including cloning an HDD to an SSD.
5. Diagnose a failing CMOS battery.
6. Identify the other internal components and how they fail.
7. Troubleshoot common laptop faults: no power, no display, overheating, weak Wi-Fi.
8. Protect data and encryption during laptop repairs.

## 1. Laptops vs desktops

__Aspect__

__Desktop__

__Laptop__

Parts

Standard, interchangeable

Often proprietary to the model

Upgradability

High

Limited — RAM and storage sometimes; CPU and GPU almost never (soldered)

Access

Remove a side panel

Remove many screws, release clips, follow a model-specific order

Power

Mains PSU

Battery \+ external charger

Cooling

Large fans and heatsinks

Thin heat pipes and a small fan that clogs easily

Risk of damage

Low

Higher: fragile clips, ribbon cables and thin boards

__The golden rule:__ get the __service manual__ (or the manufacturer's disassembly guide) for the __exact model__ before opening anything.

## 2. Opening a laptop

## 2.1 Before you start

1. __Back up the user's data__, or confirm it's backed up.
2. __Check BitLocker__ and have the recovery key ready if you'll touch storage or firmware (section 8).
3. __Shut down fully.__ Hibernate and sleep aren't off.
4. __Unplug the charger and remove the battery__, or disconnect the internal battery connector as soon as the base is off.
5. __Ground yourself:__ ESD strap and mat.

## 2.2 During disassembly

__Technique__

__Why__

Map the screws

Draw the base on paper and put each screw on its spot, or use a magnetic project mat. Screw lengths differ, and a long screw in the wrong hole can crack the board

Plastic spudgers and picks

Release clips without gouging the case or shorting circuits

Work in order

Follow the manual's sequence; photograph each stage

Mind hidden screws

Under rubber feet, labels, or the keyboard

Never force

If it resists, there's a screw or clip you've missed

## 2.3 Ribbon cables and ZIF connectors

Many internal cables are thin __ribbon (flex) cables__ held in __ZIF__ (zero insertion force) connectors.

  Closed (cable locked):      Open (cable free):
  ====\[latch down\]====        ====/latch up/=====
      |cable|                     |cable|  <- slides out freely1. __Open__ by flipping the latch up (or sliding it out, depending on the design). Never pull the cable while locked.
2. __Remove__ by sliding the cable straight out.
3. __Reinsert__ fully and squarely, then close the latch.

A half-seated ribbon is the most common cause of "worked before the repair, dead after".

## 3. Batteries

## 3.1 Lithium-ion basics

Laptops use __lithium-ion (Li-ion)__ or __lithium-polymer (Li-poly)__ cells.

- Li-poly can be made in flat, custom shapes, which suits thin laptops.
- __Charge cycles:__ one full cycle = 100 % of capacity used, which could be two 50 % discharges. Capacity slowly drops with cycles, age and heat.
- __Wear:__ typically a noticeable capacity drop after several hundred cycles.
- __Heat is the enemy:__ high temperatures accelerate wear more than anything else.
- __Storage:__ for long periods, keep at about 40–60 % charge in a cool place.

## 3.2 Worked example — "My battery only lasts an hour"

1. __Generate a battery report__ (on the user's laptop):

powercfg /batteryreport /output "$env:USERPROFILE\\Desktop\\battery-report.html"1. __Read the key figures__ in the report:

__Field__

__Example__

Design capacity

56,000 mWh

Full charge capacity

28,500 mWh

Cycle count

812

1. __Calculate health:__ 28,500 ÷ 56,000 ≈ __51 %__. The battery has lost about half its capacity after 812 cycles.
2. __Also check__ the "Recent usage" and "Battery usage" sections for heavy drains. A browser or video call can drain faster than expected, but here the capacity itself is the problem.
3. __Recommendation:__ replace the battery (manufacturer part or a reputable equivalent). Document the report figures in the ticket.

__Linux equivalent:__

\

# energy-full vs energy-full-design, and capacity %
upower -i $(upower -e | grep BAT)

### 3.3 Swollen batteries — a safety hazard

A swelling Li-ion battery can lift the touchpad, bow the case or pop the keyboard up.

- __Stop using it immediately.__ Don't charge it.
- __Don't puncture, bend or crush it__ — damaged lithium cells can catch fire.
- __Remove it__ only if safe. Store it in a fire-safe container away from anything flammable.
- __Dispose of it__ as hazardous waste through a proper battery recycling route.

## 4. Laptop RAM

__Feature__

__Detail__

Module type

SODIMM (small outline DIMM)

DDR4 SODIMM / DDR5 SODIMM

260-pin / 262-pin — not interchangeable

Soldered memory

Many thin laptops use LPDDR soldered to the board: __no upgrade possible__

Mixed designs

Some models have soldered RAM plus one free slot

__Installing a SODIMM:__

1. Line up the notch.
2. Insert at roughly a 30–45° angle into the slot.
3. Press down until the side clips snap into place.
4. To remove, spread the clips; the module pops up to an angle.

__Before recommending an upgrade,__ check the manufacturer's specification (or a system information tool) for slot count, maximum RAM and whether memory is soldered.

## 5. Laptop storage

## 5.1 Drive formats

__Format__

__Notes__

2.5" SATA (HDD or SSD)

Older laptops. Check thickness (7 mm vs 9.5 mm)

M.2 2280

The most common laptop SSD length

M.2 2242 / 2230

Shorter drives in compact laptops and handhelds

M.2 keys

Storage uses __M key__ (NVMe) or __B\+M__ (often SATA). Wi-Fi cards use A/E key

mSATA

Legacy small SSDs

__Always check two things:__ the length the slot accepts, and whether it supports NVMe, SATA or both.

## 5.2 Worked example — upgrading an HDD to an SSD by cloning

__Scenario:__ an old laptop with a 500 GB HDD holding 180 GB of data; the user wants speed without reinstalling.

1. __Pick the drive:__ a 2.5" SATA SSD (the laptop has no M.2 slot) of at least 250 GB — 500 GB for headroom.
2. __Connect__ the new SSD with a USB-to-SATA adapter.
3. __Clone__ with a cloning tool (the SSD vendor's utility, or Clonezilla from a bootable USB). Clone the whole disk so the EFI and recovery partitions come across too.
4. __Suspend BitLocker first__ if it's enabled (section 8).
5. __Swap__ the drives, then boot.
6. __Verify:__ Windows boots, and the firmware boot mode (UEFI) is unchanged. TRIM is enabled if this shows 0:

fsutil behavior query DisableDeleteNotify1. __Offer to wipe the old HDD securely__ or return it, per policy — it still holds all the data.

__Alternative:__ a clean install onto the SSD, if the OS was slow or cluttered anyway.

## 6. The CMOS battery

A small coin cell (often a CR2032, sometimes on a wire lead in laptops) powers the __real-time clock__ and firmware settings while the laptop has no power.

__Symptom__

__Cause__

Date and time reset after the main battery goes flat

Dead CMOS battery

Firmware settings lost (boot order, Secure Boot)

Same

Boot messages about a CMOS checksum error or time not set

Same

Laptop CMOS batteries are often buried under other parts, and the wired type must match the connector. The service manual shows the location.

## 7. Other laptop components

__Component__

__Notes__

__Common faults__

Keyboard

Sometimes screwed in; often riveted into the palm rest, which means replacing the whole top case

Liquid damage, stuck or dead keys

Touchpad

Ribbon cable under the palm rest

Erratic cursor (also caused by a swollen battery pushing up)

Display assembly

LCD/OLED panel, display cable, webcam, microphones and Wi-Fi antennas all live in the lid

Flicker when moving the lid points to a damaged display cable

Wireless card

Small M.2 (A/E key) card with two antenna leads (main / aux)

Weak Wi-Fi after repairs means a disconnected antenna lead

Speakers

Small units in the base

Distortion, no sound

Fan and heatsink

Heat pipes carry heat to a fin stack cooled by the fan

Dust clogging causes loud fans, heat and throttling

Charging port

Barrel jack, or USB-C with Power Delivery

Intermittent charging when the jack or port is loose

Biometrics

Fingerprint reader, IR camera (Windows Hello)

Driver or enrolment issues

## 8. Laptop troubleshooting

## 8.1 No power

1. __Try a known-good charger.__ Check the charger's LED and the correct wattage (e.g. a 65 W laptop on a 45 W charger may not charge while in use).
2. __Remove all peripherals and the dock.__
3. __Hard reset:__ remove the battery (if removable) and charger, hold power for 30 seconds, then reconnect the charger only.
4. __Check the charging port__ for looseness or damage.
5. __If still dead:__ suspect the motherboard or power circuitry and escalate for board repair or replacement.

## 8.2 Power but no display

1. __Connect an external monitor.__
	- A picture there means the problem is in the display panel or its cable.
	- No picture there either points to the GPU, board or RAM.
2. __Torch test:__ shine a light at the dark screen.
	- A faint image means the backlight has failed.
	- No image points to the panel or cable.
3. __Flex the lid__ gently. Flicker as it moves points to the display cable.
4. __Reseat the RAM__ (common after drops).

## 8.3 Overheating and loud fans

1. __Check the airflow__ — laptops on beds and sofas block their vents.
2. __Look for heavy processes__ in Task Manager.
3. __Clean the fan and heatsink:__ compressed air in short bursts, holding the fan still so it doesn't overspin.
4. __Repaste__ the CPU and GPU on older machines.
5. __Update the BIOS and drivers__ — firmware often includes fan-curve fixes.

## 8.4 Weak or dropping Wi-Fi

1. __Check the signal:__

netsh wlan show interfaces- Look at the Signal % and band.

1. __Compare__ with another device in the same spot.
2. __After a repair,__ check the antenna leads on the Wi-Fi card.
3. __Update or reinstall__ the wireless driver.

## 9. Security perspective

## 9.1 BitLocker and repairs

Firmware updates, motherboard replacements, TPM changes and some boot-order changes make BitLocker think the machine may have been tampered with. It then demands the __recovery key__ at the next boot. Prevent this by suspending protection first:

\

# is it encrypted, and is protection on?
manage-bde -status C:
\

# resumes automatically after one reboot
Suspend-BitLocker -MountPoint "C:" -RebootCount 1Always confirm where the recovery key is before starting: the user's Microsoft account, Entra ID, or Active Directory.

## 9.2 Other security points

- __Replaced drives contain data.__ A removed laptop drive is a data breach waiting to happen. Securely wipe or destroy it, and record it.
- __Laptops get lost and stolen.__ Full-disk encryption plus MDM (remote lock and wipe) turns a breach into a hardware loss.
- __Webcams and microphones:__ a physical privacy shutter is the only control software can't override.
- __Charging from untrusted USB ports__ (airports, hotels) can expose data connections. Use your own charger or a data-blocking adapter.

# Summary

- __Laptop parts__ are proprietary and tightly packed: service manual first, screw map always, plastic tools, and open ZIF latches before pulling cables.
- __Batteries:__ capacity falls with cycles and heat. Use powercfg /batteryreport to compare full-charge vs design capacity. A swollen battery is a fire hazard.
- __RAM:__ SODIMM (DDR4 260-pin, DDR5 262-pin), or soldered LPDDR with no upgrade possible.
- __Storage:__ 2.5" SATA or M.2 (check length and NVMe/SATA). Clone to upgrade, and suspend BitLocker first.
- __CMOS battery:__ a dead one shows up as clock and settings loss.
- __Troubleshooting:__ external monitor and torch tests for display faults; known-good charger and hard reset for power; clean and repaste for heat; antenna leads for Wi-Fi.

# Glossary

__Term__

__Definition__

Service manual

The manufacturer's official disassembly and parts guide for a model

Spudger

A plastic or nylon prying tool

Ribbon / flex cable

A thin, flat cable connecting internal components

ZIF connector

Zero insertion force connector with a locking latch

Li-ion / Li-poly

Lithium-ion / lithium-polymer rechargeable battery chemistries

Charge cycle

Using 100 % of battery capacity, in one go or across several partial discharges

Design / full charge capacity

Original capacity / capacity the battery holds now

SODIMM

Small-outline memory module for laptops

LPDDR

Low-power DDR memory, usually soldered to the board

M.2 key

Notch pattern on an M.2 card showing its interface (B, M, A/E)

Cloning

Copying an entire disk, including partitions, to another disk

TRIM

A command that helps SSDs manage deleted blocks efficiently

Backlight

The light source behind an LCD panel

Heat pipe

A sealed tube that moves heat from the CPU to a heatsink

USB Power Delivery

A USB-C standard for negotiating higher-power charging

BitLocker recovery key

A 48-digit key needed to unlock a BitLocker drive when protection is triggered

# Review questions

1. Why is a service manual more important for laptops than for desktops?
2. What must you do before pulling a ribbon cable out of a ZIF connector?
3. A battery report shows a design capacity of 60,000 mWh and a full charge capacity of 42,000 mWh. What's its health?
4. A laptop's touchpad is raised and clicks by itself. What's the likely cause, and what do you do?
5. Can every laptop take more RAM? Explain.
6. Name two things to check before buying a replacement M.2 SSD.
7. A laptop shows a faint image when you shine a torch at the dark screen. What's failed?
8. The date resets whenever the main battery goes flat. Which part is failing?
9. Why suspend BitLocker before a firmware update?
10. Wi-Fi is weak only since the keyboard was replaced. What's the most likely cause?
11. What happens to the old HDD after an SSD upgrade, from a security view?
12. Why do laptops overheat more than desktops, and what's the first physical fix?

# Answer key

1. __Laptop layouts, screw locations and disassembly order are model-specific.__ Guessing risks broken clips, cables and boards.
2. __Open the latch first__ (flip it up or slide it out), then slide the cable straight out.
3. __70 %__ (42,000 ÷ 60,000).
4. __A swollen battery pushing the touchpad up.__ Stop using and charging it, remove it safely if possible, store it safely, and recycle it as hazardous waste.
5. __No.__ Many thin laptops use soldered LPDDR with no slots; others have limited slots or a maximum. Check the specification.
6. __The length it accepts__ (e.g. 2242 vs 2280) __and the interface it supports__ (NVMe, SATA or both).
7. __The backlight__ — the panel is working but not lit.
8. __The CMOS battery.__
9. __Firmware changes alter TPM measurements__, so BitLocker demands the recovery key at the next boot unless protection is suspended.
10. __An antenna lead disconnected or pinched__ during the repair.
11. __It still holds all the user's data.__ Securely wipe or destroy it, or hand it over per policy, and document it.
12. __Small fans and thin heatsinks clog with dust, and soft surfaces block the vents.__ Clean the fan and heatsink with compressed air and make sure the vents are clear.
