---
title: "A+ Core 1 3.1: Display Types — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.1: LCD backlights, TN vs IPS vs VA, OLED, mini LED local dimming, touchscreens and digitizers, and inverters."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "displays", "lcd", "oled", "digitizer"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, lesson 3.1 (Display Types)**

> **Quick reference:** the short version of this lesson is the Display Types cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). This is the first lesson of section 3 (hardware); the laptop display points also connect to the mobile device material in [section 1](/cyber_lab_log/resources/a-plus-core-1/1/).

## Learning objectives

By the end of these notes you should be able to:

1. Explain how an LCD produces an image and why it cannot work without a backlight.
2. List the advantages of LCD over the display technology it replaced, and its main weakness.
3. Compare TN, IPS and VA panels and choose one for a given use.
4. Explain what makes OLED different, and the consequences of having no backlight.
5. Explain what mini LED changes about an LCD backlight and why it improves black levels.
6. Describe what a digitizer does and how a stylus fits in.
7. Explain why a fluorescent backlight needs an inverter and an LED backlight does not.
8. Diagnose a dim-but-visible screen and say which component to replace.

## 1. LCD: liquid crystal display

### 1.1 How the image is made

Most monitors in use today are **LCDs** — liquid crystal displays. A light source behind the panel shines forward through a layer of liquid crystals, then through a colour filter, and finally out to your eyes. The crystals twist under electrical control to let more or less light through each subpixel, and the filters decide what colour that light is. Light, filters and crystals together are what produce the picture.

```text
+------------------------------------------------------------------------------+
|  Light path through an LCD, back to front                                    |
|                                                                              |
|   [ Backlight ]  -->  [ Polariser ]  -->  [ Liquid crystals ]  -->           |
|    LED or CCFL         filters light       twist to block or                 |
|    always on           to one plane        pass light per pixel              |
|                                                                              |
|                  -->  [ Colour filter ]  -->  [ Polariser ]  -->  eye        |
|                        red, green, blue        light that got                |
|                        subpixels               through is seen               |
+------------------------------------------------------------------------------+
```

### 1.2 Why LCDs took over

Before LCDs, displays were large glass tubes. Against those, an LCD is:

| Advantage | Consequence |
|---|---|
| Light | Can be wall-mounted, built into portable systems, carried anywhere |
| Low power | Practical on battery, which is why mobile devices use them |
| Inexpensive | Cheap enough to put a screen on almost anything needing visual feedback |

> **Note (beyond this lesson):** the technology LCDs replaced is the **CRT** (cathode ray tube). The A+ objectives no longer cover CRTs, but the contrast is why "thin, light, low power" are stated as LCD advantages at all.

### 1.3 The weakness: black, and the backlight

Because the image is made by *filtering* light that is already switched on, an LCD finds it hard to produce a true black. Some light always leaks through the crystals and filters, so black comes out closer to very dark grey.

The backlight is not optional. Without it the panel is still doing its job, but there is nothing to see through the filters — the screen is extremely dim and hard to read. Two kinds are used:

- **Fluorescent lamps** on older LCDs
- **LEDs** (light emitting diodes) on most modern LCDs

Backlights are awkward to replace. On a larger LCD you may be able to replace part of the backlight assembly; on smaller or cheaper systems, replacing the whole display is often the only practical repair.

> **In the real world:** a monitor sold as an "LED display" is usually an **LCD with an LED backlight**, not an LED panel. The marketing describes the light source, not the technology making the image.

## 2. LCD panel technologies: TN, IPS and VA

The liquid crystal layer can be arranged in different ways, and the arrangement decides what the panel is good at.

### 2.1 TN — twisted nematic

One of the earliest LCD types, and still valued for one thing: **very fast response times**, which suits gaming and anything where the image changes quickly.

Its weakness is viewing angle. Move off centre and the colours shift, getting worse the further off axis you go. If several people need to see the same screen at once, TN is a poor choice.

### 2.2 IPS — in plane switching

A newer arrangement with **very good colour representation**, which makes it the panel for graphics and video editing work. It costs more than TN — you pay a premium for the colour accuracy.

### 2.3 VA — vertical alignment

Sits between the two. Colour representation is very good, but the response time is not as fast as TN.

| | TN | IPS | VA |
|---|---|---|---|
| Stands for | Twisted nematic | In plane switching | Vertical alignment |
| Strength | Fastest response | Best colour representation | Good colour, middle ground |
| Weakness | Colour shifts off angle | More expensive | Slower response than TN |
| Suits | Gaming, fast motion | Graphics, video editing | General-purpose |

> **Exam tip:** match the symptom to the panel. "Colours look wrong from the side" points at **TN**. "I need accurate colour for design work" points at **IPS**. Speed versus colour is the trade-off the exam tests.

Not every device offers a choice — a given laptop or tablet may only be available with one panel type. Where you do get the choice, pick for the work being done.

### 2.4 Worked example — choosing panels for three desks

**Scenario:** you are specifying monitors for a small office.

1. **The designer** retouches product photography, and colour has to be right. **IPS** — colour accuracy is the whole job, and the extra cost is justified.
2. **The esports-adjacent test rig** runs fast-moving footage where response time matters most. **TN** — fastest response, and one person sits directly in front of it so the viewing angle problem never arises.
3. **The shared meeting-room screen** is viewed by five people from different angles. Not **TN**, whose colours shift off axis. **IPS** or **VA**, depending on budget.
4. **General office desks** doing documents and email: **VA** or IPS is fine, and panel type is not the deciding factor at this end of the market.

## 3. OLED: organic light emitting diode

### 3.1 No backlight at all

A backlight adds cost, power draw and thickness. **OLED** removes it entirely. The panel contains an organic compound that **emits its own light** when power is applied, so each pixel is its own light source. There is no separate lamp behind the screen.

```text
+------------------------------------------------------------------------------+
|  LCD                                     OLED                                |
|                                                                              |
|   [ backlight always on ]                 (nothing behind the panel)         |
|            |                                                                 |
|            v                                                                 |
|   [ crystals + filters block ]            [ pixels emit their own light ]    |
|            |                                          |                      |
|            v                                          v                      |
|   black = light leaking through           black = pixel simply off           |
|   thicker, heavier, more power            thinner, lighter, deep black       |
+------------------------------------------------------------------------------+
```

### 3.2 What that buys you

| Result | Because |
|---|---|
| Much thinner and lighter | No backlight assembly behind the panel |
| Very good colour representation | Each pixel produces its own light and colour |
| Deep blacks | A black pixel is switched off entirely |

OLED is common on **phones, watches and tablets**, and is available in large-screen sizes too. For graphics, image and video work it is a strong choice for the same reason IPS is: the colour is right.

> **Note (beyond this lesson):** OLED's known weakness is **burn-in** — a static element such as a taskbar or channel logo can leave a permanent faint ghost. It is also generally the more expensive technology, which is exactly why the LCD side keeps innovating.

## 4. Mini LED

### 4.1 Improving the backlight instead

The industry constantly competes on price between OLED and LCD, and **mini LED** is an LCD-side answer. It is still an ordinary LCD backlight — but the individual LEDs are far smaller, so there are far more of them behind the panel.

### 4.2 Local dimming

More LEDs means the display can control **each light individually**, deciding which region of the screen should be lit and how brightly. When part of the image is dark or completely black, the LEDs behind that region are turned off, producing a far deeper black than a conventional backlight that is uniformly on.

The result is that a cheaper LCD gets much closer to OLED's colour and contrast without abandoning LCD.

```text
+------------------------------------------------------------------------------+
|  Conventional LED backlight        Mini LED backlight                        |
|                                                                              |
|   +-----------------------+         +-----------------------+                |
|   |   O     O     O   O   |         | oooooooooooooooooooo  |                |
|   |                       |         | oooooooooooooooooooo  |                |
|   |   O     O     O   O   |         | oooooo....oooooooooo  |                |
|   |                       |         | oooooo....oooooooooo  |                |
|   +-----------------------+         +-----------------------+                |
|   few large LEDs, all on            many small LEDs, dark ones               |
|   dark areas still lit              switched off for deep black              |
+------------------------------------------------------------------------------+
```

> **Note (beyond this lesson):** **micro LED** is a different thing again — a self-emissive technology like OLED, not a backlight for an LCD. Mini LED improves an LCD; micro LED replaces the panel.

### 4.3 Worked example — reading the spec sheet

**Scenario:** two monitors at similar prices. One says "LED backlit IPS", the other "mini LED, 512 local dimming zones". What actually differs?

1. **Both are LCDs.** Neither is self-emissive; both filter light from a backlight.
2. **The panel type may be identical** — mini LED describes the *backlight*, not the crystal arrangement, so a mini LED monitor can also be IPS.
3. **The real difference is contrast.** 512 zones can be dimmed independently, so dark areas of the image get much darker.
4. **Watch for the trade-off.** A bright object on a black background can show a faint halo, because the whole zone behind it must be lit. More zones means less of this.
5. **If deep black matters more than anything,** OLED still wins, since its control is per pixel rather than per zone.

## 5. Touchscreens and digitizers

### 5.1 What a digitizer does

Watches, phones, tablets and some laptops accept input by touch. The component responsible is the **digitizer**: a layer over the display that detects where you are touching and **converts that touch into coordinates** the system can use. That is what makes it possible to drop the keyboard entirely and use the screen as the input device.

### 5.2 Choosing the right input

Plenty of laptops and mobile devices still offer a physical keyboard as well, which gives you a choice: mouse, digitizer or keyboard, whichever suits the task. Writing a document wants a keyboard; sketching, signing or dragging something around is far easier by touch.

### 5.3 The stylus

Many digitizers detect a **stylus** as well as a finger. A stylus works like a pen or pencil against the screen, with every stroke converted to digital input by the digitizer. It is a common input method on tablets, and also appears on laptops and even desktop displays.

> **Note (beyond this lesson):** most modern touchscreens are **capacitive** — they sense the electrical properties of a finger, support multi-touch, and need a conductive or active stylus. Older **resistive** screens detect physical pressure, work with any object including a gloved hand, and are still found on industrial and point-of-sale equipment.

> **Caution:** the digitizer and the display panel are separate components that are often bonded together. A cracked screen that still displays correctly but ignores touch is a digitizer fault; on many devices the two can only be replaced as one assembly.

## 6. Inverters

### 6.1 Why an inverter exists

If a display is an LCD, it has a backlight, and that backlight is either fluorescent or LED. The two need different kinds of power:

- **LED backlights** run on the **DC** (direct current) power a laptop already uses internally. No conversion is needed.
- **Fluorescent backlights** need **AC** (alternating current). Since the laptop supplies DC, something must convert it — and that is the **inverter**.

```text
+------------------------------------------------------------------------------+
|  LED backlight                         Fluorescent (CCFL) backlight          |
|                                                                              |
|   [ Laptop DC power ] ---------->      [ Laptop DC power ]                   |
|            |                                    |                            |
|            v                                    v                            |
|      [ LED backlight ]                    [ Inverter: DC -> AC ]             |
|      no conversion needed                        |                           |
|                                                  v                           |
|                                          [ Fluorescent lamp ]                |
+------------------------------------------------------------------------------+
```

Inverters are common on older laptops, and are often found in the **bezel** around the display.

### 6.2 Diagnosing a failed backlight

The test is simple and costs nothing:

1. Power the device on.
2. Look very closely at the screen — shining a **torch** directly at it helps, because the light reflects off the back of the display.
3. If you can make out text or graphics but they are extremely faint, the panel is working and the **backlight** is not.

The fix depends on the type. An LED backlight means replacing the backlight (or, on small systems, the whole display). A fluorescent backlight may mean replacing the **inverters** instead. Check with the laptop manufacturer for which type is fitted, where the inverters sit, and what the replacement procedure is.

> **Exam tip:** "image visible but very dim, readable with a torch" is the classic **backlight or inverter** answer. A completely black screen with no image at all under a torch is a different fault — the panel, the video cable, or the graphics hardware.

### 6.3 Worked example — a laptop with a dim screen

**Scenario:** an older laptop boots, makes the usual sounds, but the screen appears black.

1. **Shine a torch at the panel at an angle** and look for a faint desktop. If you can see one, the system is running and rendering — the problem is light, not video.
2. **Try an external monitor.** A correct image externally confirms the graphics hardware and drivers are fine and narrows the fault to the display assembly.
3. **Identify the backlight type** with the manufacturer's documentation. Fluorescent points at the inverter as the likely culprit; LED points at the backlight itself.
4. **Check the cheap things first** — on some models the display cable or the lid switch can produce similar symptoms.
5. **Plan the repair.** Inverter replacement on an older laptop is realistic; on a small modern LED system, the economical fix is usually a whole display assembly.

## 7. Security perspective

Displays look like a purely hardware topic, but they carry real confidentiality and availability implications.

- **The screen is an uncontrolled output channel.** Anything on it can be read by anyone in the room, or photographed from a distance. Wide-viewing-angle panels such as **IPS and OLED make shoulder surfing easier** — they look correct from far off axis. In receptions, open-plan offices, trains and clinics, a **privacy filter** is the control, and it is a deliberate use of the viewing-angle weakness TN has by accident.
- **Screen locks are the primary control.** A short lock timeout and lock-on-lid-close matter more than any panel property, since the display will faithfully show a logged-in session to whoever walks past.
- **OLED burn-in can leak information.** A ghosted outline of an application, a dashboard layout or a static banner persists on a screen that is switched off — a subtle disclosure on shared, public-facing or resold devices.
- **Repairs put the device inside someone else's hands.** Display and digitizer replacement means dismantling the machine. Use trusted repair channels, remove or encrypt storage where policy requires, and remember that a third-party digitizer assembly is a component sitting directly on the input path.
- **Touch input has its own residue.** Smudge patterns on a glossy touchscreen can reveal a swipe unlock pattern or PIN; longer passcodes and biometrics reduce the risk.
- **A failed backlight is an availability incident, not a data loss.** The machine is running normally and the data is intact. Knowing the torch test turns "my laptop is dead" into a scheduled repair with an external monitor as the stopgap, rather than a panic rebuild.

## Summary

- An **LCD** shines a backlight through polarising and colour filters and liquid crystals. It is light, low power and cheap, but struggles to show true black and **cannot work without its backlight**.
- Backlights are **fluorescent** on older panels and **LED** on modern ones, and are difficult to replace — often a whole-display job on smaller systems.
- **TN** = fastest response, colours shift off angle. **IPS** = best colour, costs more. **VA** = good colour, response slower than TN.
- **OLED** has no backlight; an organic compound emits its own light per pixel, giving thinner, lighter panels with excellent colour. Common on phones, watches and tablets.
- **Mini LED** keeps the LCD but uses far smaller, far more numerous backlight LEDs that can be dimmed individually, so dark areas go genuinely dark and the panel approaches OLED's contrast.
- A **digitizer** converts touch — finger or stylus — into coordinates, letting the screen replace or supplement the keyboard.
- LED backlights run on the laptop's **DC** power; fluorescent backlights need **AC**, so an **inverter** converts it. Inverters are usually in the display bezel.
- **Dim but visible under a torch** = backlight or inverter fault, not a video fault.

## Glossary

| Term | Meaning |
|---|---|
| LCD | Liquid crystal display; an image made by filtering light from a backlight |
| Liquid crystal | The layer that twists under electrical control to block or pass light |
| Backlight | The light source behind an LCD panel, without which the screen is unreadable |
| Polarising filter | Filter restricting light to one plane so the crystals can control it |
| Colour filter | The red, green and blue subpixel filters that give the image its colour |
| Fluorescent backlight | Older LCD light source; requires AC power |
| LED | Light emitting diode; the modern LCD backlight source, running on DC |
| TN | Twisted nematic; fast response, colours shift off angle |
| IPS | In plane switching; very good colour representation, higher cost |
| VA | Vertical alignment; good colour, response slower than TN |
| OLED | Organic light emitting diode; pixels emit their own light, no backlight |
| Mini LED | An LCD backlight of many very small LEDs, individually controllable |
| Local dimming | Turning down or off the backlight behind dark regions of the image |
| Digitizer | The layer that converts a touch into screen coordinates |
| Stylus | A pen-like input device detected by the digitizer |
| Inverter | Converts the laptop's DC power to the AC a fluorescent backlight needs |
| Bezel | The frame around a display panel, where laptop inverters are often fitted |
| Burn-in | Permanent faint ghosting of a static image, associated with OLED |

## Review questions

1. Describe the path light takes through an LCD, from the back of the panel to your eye.
2. Give three advantages of LCD over the glass-tube displays it replaced.
3. Why is it hard for an LCD to produce a true black?
4. What are the two backlight types found in LCDs?
5. What does TN stand for, what is it good at, and what is its weakness?
6. Which panel type would you choose for video editing, and why?
7. Where does VA sit between TN and IPS?
8. What does OLED stand for, and what makes it different from an LCD?
9. Name two physical consequences of having no backlight.
10. What does mini LED change about an LCD, and what does that improve?
11. What does a digitizer do?
12. Why does a fluorescent backlight need an inverter when an LED backlight does not?
13. **Scenario:** a laptop screen appears black, but shining a torch at it reveals a faint desktop. What is the fault, and what would you replace?
14. **Scenario:** a meeting-room screen shows correct colours to the person in front of it but washed-out, shifted colours to people sitting to the side. Which panel type is fitted, and what would you specify instead?
15. **Scenario:** a user wants the deepest possible blacks for watching films in a dark room. Compare an OLED and a mini LED LCD for them.
16. **Scenario:** a tablet's screen displays perfectly but no longer responds to touch anywhere. Which component has failed?

## Answer key

1. **Backlight, through a polarising filter, through the liquid crystals, through the colour filter, and out to the eye.** The crystals decide how much light passes; the filters decide its colour.
2. **Light, low power and inexpensive** — so they can be wall-mounted or carried, run on battery, and be fitted to almost anything.
3. **The backlight is always on and light leaks through** the polarising and colour filters, so black is really very dark grey.
4. **Fluorescent** (older) and **LED** (modern).
5. **Twisted nematic. Very fast response times,** suiting gaming and fast motion; its weakness is **colour shifting as you move off centre**.
6. **IPS,** for its very good colour representation — worth the higher cost when colour accuracy is the job.
7. **In the middle:** very good colour like IPS, but a response time not as fast as TN.
8. **Organic light emitting diode.** An organic compound emits light when powered, so each pixel is its own light source and there is **no backlight**.
9. **Thinner and lighter panels,** plus **deeper blacks**, because a black pixel is simply switched off.
10. **The backlight LEDs are far smaller and far more numerous, and each can be controlled individually.** Dark regions have their LEDs turned off, giving much deeper blacks and colour closer to OLED.
11. **It detects where the screen is being touched and converts that into coordinates,** from a finger or a stylus.
12. **Fluorescent lamps need AC; the laptop supplies DC,** so the inverter converts DC to AC. LEDs run on DC directly.
13. **The backlight (or, on a fluorescent panel, the inverter).** The panel and video hardware are working — only the light has failed.
14. **TN,** whose colours shift off angle. Specify **IPS** (or VA) for a screen viewed by several people at once.
15. **OLED controls light per pixel,** so black is absolute; **mini LED dims per zone,** which is very good but can show a faint halo around bright objects on black. OLED wins on black level; mini LED is usually cheaper and brighter, and avoids burn-in risk.
16. **The digitizer,** which is a separate layer from the display panel — though on many devices the two are replaced as one bonded assembly.
