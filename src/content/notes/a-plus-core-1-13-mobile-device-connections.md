---
title: "A+ Core 1 1.2: Mobile Device Connections"
description: "Almost everyone in an organisation carries a phone, a tablet or both. Each device needs a way to connect back to computers and networks — and different devices have historically used different connectors and standards."
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 1.2__

__Quick reference:__ the short version of this lesson is the 1.2 Mobile Device Connections cheat sheet, part of Section 1.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what mobile device connections are used for besides charging.
2. Identify mini-USB, micro-USB, USB Type-A, USB-C and Lightning connectors, and where each is used.
3. Describe the features of USB-C, including the other signal types it can carry.
4. Explain why Apple's Lightning connector existed, and why the industry is converging on USB-C.
5. Describe NFC and its uses for payment, access control and data transfer.
6. Explain Bluetooth as a personal area network (PAN).
7. Distinguish a hotspot from tethering, and know what determines whether you can use them.

## 1. Why connections matter

Almost everyone in an organisation carries a phone, a tablet or both. Each device needs a way to connect back to computers and networks — and different devices have historically used different connectors and standards.

Connections are used for __much more than charging__:

__Purpose__

__Example__

Charging

Topping up the battery

Connectivity

Linking the device to a computer or network

Synchronisation

Keeping contacts, photos and files in step with a computer

Backup

Copying the device's contents to a computer

Identification

Using the device to prove it (and you) are the owner — for example, pairing it with a trusted computer

## 2. Wired connections

## 2.1 USB and its connectors

__USB (Universal Serial Bus)__ has been the standard for connecting devices for many years. The standard has evolved, and so have the physical connectors.

__Connector__

__Where you'll see it__

__Notes__

Mini-USB (mini-B)

Older mobile devices and accessories

An older, larger-style plug

Micro-USB (micro-B)

Older phones and many accessories still in use

Very common for years. Only fits one way round

USB Type-A

The __computer end__: desktops, laptops, chargers

The familiar rectangular plug. Still common even when the device end has changed

USB-C

Modern phones, tablets, laptops and accessories

The current standard (section 2.2)

A typical older cable is __Type-A at the computer end and micro-B or mini-B at the device end__. The design problem was that devices kept getting smaller, while these connectors were designed for a much larger style of interface.

## 2.2 USB-C

__USB-C__ describes the __physical connector__, not the speed or the protocol.

__Feature__

__Detail__

Pins

__24__

Orientation

__Reversible__ — it plugs in either way up

Speed

Supports higher speeds than the older USB connectors

Standards

One connector covers everything from USB 2.0 up to the latest USB standards

Other signals

Can carry __DisplayPort__, __HDMI__ and __Thunderbolt__ as well as USB data — video, data and more over the same physical plug

__Exam tip:__ USB-C is a __connector type__. The same plug can carry USB data, video (DisplayPort, HDMI) and Thunderbolt. What actually works depends on what the device and cable support.

### 2.3 Lightning

Older Apple devices use a proprietary connector instead of USB: __Lightning__.

__Feature__

__Detail__

Pins

__8__

Used on

Older iPhones and iPads

Orientation

Reversible — no more flipping the plug to find the right way

Power

Higher power output than the old USB connectors, so devices charged faster

Design

Simple, and easy to use across many different Apple devices

Lightning was introduced to solve problems with the older USB connectors of the time: they were one-way-round, had lower power output, and were relatively large.

## 2.4 The connector drawer problem

Supporting devices from many manufacturers used to mean carrying a bag full of different cables: mini-USB, micro-USB and Lightning. The industry is now moving towards a __single connector type, USB-C__.

__Note (beyond this lesson):__ Apple moved the iPhone to USB-C with the iPhone 15, and EU rules have made USB-C the common charging port for phones and many other devices sold there. You'll still meet Lightning and micro-USB on older devices for years.

### 2.5 Worked example — identifying connectors

A user brings in a bag of devices, and you need to know which cable each one needs.

__Device__

__Port description__

__Connector__

Five-year-old Android phone

Small, flat, trapezoid, one way round

Micro-USB (micro-B)

iPad from around 2018

Small, flat, reversible, 8 contacts

Lightning

New laptop

Small oval, reversible

USB-C

Old digital camera

Slightly larger, trapezoid, one way round

Mini-USB (mini-B)

Desktop PC's front port

Wide rectangle

USB Type-A

For each cable, the other end is usually __Type-A__ (for older chargers and computers) or __USB-C__ (for newer ones).

## 2.6 Worked example — "the USB-C display won't work"

A user plugs a monitor into their laptop's USB-C port using a USB-C cable, and gets no picture.

1. __Recall the key idea:__ USB-C is a connector. Video only works if DisplayPort or HDMI signals are carried through it.
2. __Check the laptop's port.__ Many laptops mark ports that support video (a DisplayPort or Thunderbolt symbol); some ports are data and charging only.
3. __Check the cable.__ Some USB-C cables are charge-only or low-speed and don't carry video. Try a cable rated for video or Thunderbolt.
4. __Test__ on the correct port with a suitable cable.

## 3. Wireless connections

## 3.1 NFC — Near Field Communication

__NFC__ sends a small amount of data over a very short distance. It's built into many phones, tablets and smartwatches.

__Use__

__Example__

Payment

Tapping a phone or watch at a point-of-sale terminal

Identification and access control

Holding a phone or watch to a sensor on the wall to open a door — instead of carrying a separate ID or access card

Data transfer

Passing information from one phone to another by touching them together

__Worked example — replacing access cards.__ An organisation wants staff to open doors with the phones they already carry.

1. Install __NFC readers__ at the doors.
2. Provision each employee's phone or watch with their access credential.
3. Staff tap the phone or watch on the reader to enter. There's no separate card to lose — and because NFC's range is tiny, the device has to be deliberately held against the reader.

## 3.2 Bluetooth — the personal area network

__Bluetooth__ connects devices at high speed over relatively __short distances__. Because it links the devices a single person uses, it's called a __personal area network (PAN)__.

__Typical use__

__Example__

Audio

Wireless headphones and headsets

Input

Wireless keyboards and mice

Connectivity

Tethering a laptop to a smartphone for internet access

Bluetooth is designed around the individual, but it can also connect several phones and devices together.

## 3.3 Hotspots and tethering

A phone can act as an __internet router__, sharing its mobile data connection with other devices. Messer distinguishes the two terms by __how many devices__ share the connection:

__Term__

__Meaning__

__Hotspot__

__Many__ devices connect to the phone for internet access

__Tethering__

__One__ device connects to the phone, and it's the only device using that connection

__Connecting the two views.__ In practice:

- A hotspot is normally shared over __Wi-Fi__, which suits many devices.
- Tethering is often over __USB or Bluetooth__, which suits a single device.

So the common exam scenario — a phone sharing its connection with one laptop over a USB cable — is __tethering__ by either definition.

__What determines whether you can do it:__

1. __The phone's software__ must support the feature.
2. __The mobile provider__ must allow it on your plan. Some plans restrict or charge extra for sharing data. If in doubt, contact the provider.

## 3.4 Worked example — choosing the right connection

__Situation__

__Best option__

__Why__

Three colleagues on a train need internet for their laptops

Hotspot on one phone

Many devices sharing one connection

One laptop needs internet, and the phone's battery is low

Tethering over a USB cable

One device; the laptop also charges the phone

Paying for lunch with a smartwatch

NFC

Tiny amount of data over a very short range

Taking calls hands-free while driving

Bluetooth

A personal area network for audio

Copying photos from an old Android phone to a PC

Micro-USB to Type-A cable

A wired connection for data transfer

## 4. Security perspective

- __USB is a data connection, not just power.__
	- Charging from untrusted public USB ports can expose the device's data connection ("juice jacking"). Use your own charger or a data-blocking adapter.
	- Phones typically ask whether to __trust__ a computer before sharing data — say no to unknown computers.
- __NFC's tiny range is its main safeguard__, but it's not absolute. Keep payment authentication (PIN, fingerprint or face) turned on. For access control, report a lost phone or watch immediately so its credential can be revoked.
- __Bluetooth:__
	- Turn it off when not needed, and never accept pairing requests you didn't start.
	- Known attacks include __bluejacking__ (unsolicited messages) and __bluesnarfing__ (data theft).
- __Hotspots:__ protect them with a strong password and modern encryption (WPA2 or WPA3). An open hotspot shares your data allowance — and a network path to your phone — with strangers.
- __Organisations may restrict these features__ through mobile device management (MDM), for example blocking tethering or USB data transfer on corporate phones.

# Summary

- __Mobile connections__ are used for charging, connectivity, synchronisation, backup and identification.
- __USB connectors:__
	- Mini-B and micro-B on older devices.
	- Type-A at the computer end.
	- __USB-C__ as the modern standard: 24 pins, reversible, faster, covering USB 2.0 to the latest, and able to carry __DisplayPort, HDMI and Thunderbolt__.
- __Lightning__ is Apple's older proprietary connector: 8 pins, reversible, higher power. Used on older iPhones and iPads.
- __The industry is converging on USB-C__, reducing the number of cables to carry.
- __NFC:__ very short range, small amounts of data. Used for payments, access control (phone or watch instead of a card) and phone-to-phone transfer.
- __Bluetooth:__ short-range, high-speed __PAN__ for headsets, keyboards, mice and tethering. It can link several devices.
- __Hotspot vs tethering:__ a hotspot shares the phone's internet with __many__ devices; tethering with __one__. Both depend on the phone's software and the mobile provider's plan.

# Glossary

__Term__

__Definition__

USB

Universal Serial Bus — the standard for connecting peripherals and devices

Mini-USB (mini-B)

An older, small USB connector used on older devices

Micro-USB (micro-B)

A smaller USB connector widely used on older phones and accessories

USB Type-A

The standard rectangular USB plug, usually at the computer or charger end

USB-C

A 24-pin, reversible USB connector that can carry multiple signal types

DisplayPort / HDMI

Digital video standards that can travel over USB-C

Thunderbolt

A high-speed interface for data, video and power that can use the USB-C connector

Lightning

Apple's proprietary 8-pin, reversible connector for older iPhones and iPads

Proprietary

Specific to one manufacturer rather than an open standard

Synchronisation

Keeping data consistent between a device and a computer or cloud

NFC

Near Field Communication — very short-range wireless for small amounts of data

Point-of-sale (POS) terminal

The payment device at a shop checkout

Access control

Restricting entry to authorised people, e.g. with NFC door readers

Bluetooth

Short-range, high-speed wireless for personal devices

PAN

Personal area network — the network of one person's devices

Hotspot

A phone sharing its internet connection with many devices

Tethering

A phone sharing its internet connection with a single device

Mobile provider

The carrier supplying the phone's cellular service and plan

# Review questions

1. Besides charging, give three things mobile device connections are used for.
2. Which connector is usually found at the computer end of an older phone cable?
3. How many pins does a USB-C connector have, and why is its orientation convenient?
4. Name three types of signal, besides USB data, that can travel over a USB-C connector.
5. A user says "USB-C is a speed". Correct them.
6. How many pins does Lightning have, and which devices use it?
7. Give two problems Lightning was introduced to solve.
8. Why is supporting many mobile devices becoming easier over time?
9. Name three uses of NFC.
10. How can NFC replace an ID or access card?
11. Why is Bluetooth called a PAN? Give two typical uses.
12. Five people want to share one phone's internet connection. Is that a hotspot or tethering?
13. A phone shares its internet with one laptop over a USB cable. Hotspot or tethering?
14. Before relying on hotspot functionality, what two things should you check?

# Answer key

1. __Any three of:__ connectivity, synchronisation, backup, identification.
2. __USB Type-A.__
3. __24 pins. It's reversible__, so it plugs in either way up.
4. __DisplayPort, HDMI and Thunderbolt.__
5. __USB-C is a physical connector type.__ It can carry different USB standards (from USB 2.0 to the latest) and other signals, so the speed depends on what the device and cable support.
6. __8 pins; older iPhones and iPads.__
7. __Any two of:__ reversible insertion; higher power output for faster charging; a simple design usable across many devices.
8. __Devices are converging on a single connector type, USB-C.__
9. __Payment at point-of-sale terminals; identification and door access; transferring data between phones.__
10. __A phone or watch taps a sensor on the wall to open a door__, so staff use a device they already carry instead of a separate card.
11. __It connects the devices one person uses, over a short range.__ Typical uses: headsets and headphones; keyboards and mice; tethering.
12. __A hotspot__ — many devices sharing the connection.
13. __Tethering__ — one device.
14. __That the phone's software supports it, and that the mobile provider's plan allows it.__
