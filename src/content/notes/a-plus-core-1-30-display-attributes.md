---
title: "A+ Core 1 3.1: Display Attributes — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.1: pixel density and PPI maths, refresh rate and frames per second, resolution and aspect ratio, and colour gamut."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "displays", "resolution", "refresh-rate", "colour-gamut"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.1 (Display Attributes)**

> **Quick reference:** the short version of this lesson is the Display Attributes cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It is the companion to the Display Types lesson in the same section: that one covers the technologies (LCD, OLED, mini LED), this one covers the numbers on the specification sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what pixel density is and calculate PPI from a display's resolution and physical size.
2. Explain why two displays at the same resolution can look very different.
3. Explain refresh rate in hertz, how it relates to frames per second, and what V-sync means.
4. State the frame rates typical of film, television and fast-motion content.
5. Explain why the graphics card and the cable must support the refresh rate as well as the display.
6. Read a resolution specification and work out its aspect ratio.
7. Explain what colour gamut means and how sRGB percentages are used to compare displays.
8. Choose a display for a stated use from its published specifications.

## 1. Specifications and use case

Display specifications vary enormously between models — different options, different numbers, different settings. The way to make sense of them is to start from the other end: decide **how the display will be used**, then read the specification sheet to find one that suits.

The use cases the lesson raises are worth holding in mind throughout:

| Use | What matters most |
|---|---|
| Gaming | High refresh rate, fast response |
| Watching video | Resolution and colour; refresh rate less critical |
| A screen on a lobby wall | Size and brightness; nobody is sitting close |
| Presentations | Resolution and viewing angle |
| Graphics and video editing | Colour gamut above everything |

Only once you know the job do the numbers mean anything. A 144 Hz specification is irrelevant to a lobby screen and essential to a gaming monitor.

## 2. Pixel density

### 2.1 What PPI measures

**Pixel density** is how many pixels fit into one inch of display area — **PPI**, pixels per inch. Outside the United States you may see pixels per centimetre instead. It puts a number on how crisp a display looks: a higher pixel density means a sharper, clearer image, because the individual pixels are smaller and closer together.

```text
+------------------------------------------------------------------------------+
|  The same one-inch square at different pixel densities                       |
|                                                                              |
|   1 PPI          2 PPI          4 PPI            8 PPI                       |
|  +-------+      +---+---+      +-+-+-+-+      +++++++++                      |
|  |       |      |   |   |      +-+-+-+-+      +++++++++                      |
|  |       |      +---+---+      +-+-+-+-+      +++++++++                      |
|  |       |      |   |   |      +-+-+-+-+      +++++++++                      |
|  +-------+      +---+---+      +-+-+-+-+      +++++++++                      |
|                                                                              |
|  1 pixel         4 pixels      16 pixels       64 pixels                     |
|  PPI counts across AND down, so doubling PPI quadruples the pixels           |
+------------------------------------------------------------------------------+
```

### 2.2 Printing is a different number

If the image will only ever be viewed on screen, PPI is the number that matters. If it is going to be printed, check the printer's **DPI** (dots per inch) as well, and whether it can reproduce what you are seeing on the display. Screen and paper are measured separately.

> **Note (beyond this lesson):** PPI and DPI are often used interchangeably but describe different things — PPI is pixels on a display, DPI is ink dots a printer lays down. Printers typically quote far higher DPI figures than any monitor's PPI, because several ink dots combine to make one perceived colour.

### 2.3 Calculating PPI

The calculation is simply **pixels divided by inches**. The catch is that a display's advertised size is its **diagonal**, so you need the width in inches, not the diagonal.

**A 27-inch 4K monitor.** 27 inches on the diagonal works out at roughly 24 inches wide, and 4K means 3,840 pixels across:

- 3,840 ÷ 24 = **160 PPI**

**A 65-inch 4K television.** Same 3,840 pixels, but about 57 inches wide:

- 3,840 ÷ 57 = **67 PPI**

I checked both the width figures and the division. For a 16:9 display, a 27-inch diagonal gives a width of 23.5 inches and a 65-inch diagonal gives 56.7 inches, so the lesson's rounded 24 and 57 are right. The divisions come out at 160 and 67.4 PPI.

> **Exam tip:** identical resolution does not mean identical sharpness. Spread the same 3,840 pixels over a bigger screen and each pixel gets bigger, so the image is less dense. Resolution alone tells you nothing about clarity without the physical size.

### 2.4 Worked example — will this monitor look sharp?

**Scenario:** a user wants a 32-inch monitor and is choosing between 1080p and 4K. They sit about 70 cm away.

1. **Find the widths.** A 16:9 32-inch display is about 27.9 inches wide.
2. **1080p:** 1,920 ÷ 27.9 = about **69 PPI**. That is in the same territory as the 65-inch television above — perfectly fine across a room, visibly coarse at desk distance.
3. **4K:** 3,840 ÷ 27.9 = about **138 PPI**, roughly double, and text will look markedly cleaner.
4. **Factor in distance.** PPI matters more the closer you sit. At 70 cm the difference is obvious; on a lobby wall viewed from 5 m it would not be.
5. **Conclusion:** for a desk monitor at that size, 4K. For the same panel size hung as signage, 1080p would do.

## 3. Refresh rate

### 3.1 Hertz

A display is not showing one image; it is redrawing the screen continuously. **Hertz (Hz)** is the generic term for cycles per second, and a display's hertz figure is how many times it can refresh the screen in one second.

### 3.2 Hertz and frames per second

**Frames per second (FPS)** is a related but not identical idea — it counts the images in the content being shown. You can configure a system so that hertz and FPS match, and some display configurations update only part of the screen on a given cycle, which breaks the equivalence.

**V-sync** (vertical sync) is the setting that ties them together: with V-sync enabled, the frame rate matches the display's refresh rate.

```text
+------------------------------------------------------------------------------+
|  Refresh rate (Hz)     how many times the DISPLAY redraws per second         |
|  Frame rate (FPS)      how many images the CONTENT provides per second       |
|                                                                              |
|  With V-sync on, the two are locked together:  Hz = FPS                      |
|                                                                              |
|  FPS higher than Hz  ->  frames the display never shows (or tearing)         |
|  FPS lower than Hz   ->  the same frame shown twice; motion stutters         |
+------------------------------------------------------------------------------+
```

### 3.3 What the content needs

| Content | Typical frame rate |
|---|---|
| Films (United States) | 24 FPS |
| Television shows and online video | 30 FPS |
| Sport and gaming | 60 FPS or higher |

The lesson demonstrates the difference with falling circles updated at 1, 15 and 30 FPS: at 1 FPS the motion is visibly choppy, while at 30 FPS it falls smoothly. That is the whole argument for a higher refresh rate — with fast-moving content, too low a refresh rate makes the image appear to stutter as it moves across the screen.

> **Note (beyond this lesson):** US broadcast television is actually 29.97 FPS rather than exactly 30, a legacy of the transition to colour. The 30 figure is the right one to remember for the exam.

### 3.4 The whole chain has to keep up

The display is only one link. To actually get a high refresh rate you also need:

1. A **video card or video subsystem** capable of producing frames at that rate, and
2. A **connection type** with the bandwidth to carry them.

The lesson gives two figures: **HDMI 2.1** supporting 4K at up to 144 Hz, and **DisplayPort 2.1** supporting **dual** 4K displays at up to 144 Hz each. Buy a 144 Hz monitor and connect it with a cable or a card that cannot manage it, and you will run at a lower rate without any obvious warning.

> **Caution:** HDMI 2.1's headline, uncompressed specification is 4K at **120 Hz**; 4K at 144 Hz is reached using **DSC** (Display Stream Compression), which the standard also defines. Treat 144 Hz as achievable over HDMI 2.1 rather than as the plain uncompressed maximum. The DisplayPort 2.1 dual-4K-at-144 Hz figure matches VESA's own published configuration.

> **In the real world:** cables are the most common culprit. An HDMI cable rated for an earlier version physically fits an HDMI 2.1 port and works — just at a lower resolution or refresh rate. If a monitor will not offer its top mode, check the cable before anything else.

### 3.5 Worked example — a 144 Hz monitor stuck at 60 Hz

**Scenario:** a new 4K 144 Hz monitor only offers 60 Hz in the display settings.

1. **Check the cable first.** An older HDMI cable will not carry 4K at high refresh rates. Fit an Ultra High Speed HDMI cable or a DisplayPort cable.
2. **Check which port it is plugged into.** A graphics card may have one port that supports the full specification and others that do not.
3. **Check the graphics card's capability** — the card has to generate the frames as well as output them.
4. **Check the display settings,** since some systems default to a conservative refresh rate even when a higher one is available.
5. **Check the monitor's own menu.** Some 4K monitors require a high-bandwidth or "DP 1.4 / HDMI 2.1 mode" setting to be turned on per input.

## 4. Resolution and aspect ratio

### 4.1 Reading a resolution

**Resolution** is the number of pixels horizontally and vertically. **4K** is 3,840 × 2,160; **HD** (1080p) is 1,920 × 1,080. More pixels give a sharper image, so at the same physical size a 4K screen looks considerably better than an HD one.

Note how much more work that is: 4K has exactly **four times** as many pixels as HD — twice as many across and twice as many down, which is 8,294,400 against 2,073,600. That is why a card that runs a game comfortably at HD may struggle at 4K.

### 4.2 Aspect ratio

Most standard resolutions share a **16:9** aspect ratio, which is why the numbers look like a family: 1,920 ÷ 1,080 and 3,840 ÷ 2,160 both reduce to 16:9. Some displays deviate from the standard resolutions or use different aspect ratios entirely, so pick the shape that suits the use — ultrawide for side-by-side working, 16:9 for video.

```text
+------------------------------------------------------------------------------+
|  16:9 family, to scale                                                       |
|                                                                              |
|   +---------------------------------------------+                            |
|   |                                             |                            |
|   |      4K  3840 x 2160                        |                            |
|   |                                             |                            |
|   |   +---------------------+                   |                            |
|   |   |  HD  1920 x 1080    |                   |                            |
|   |   |  (one quarter the   |                   |                            |
|   |   |   pixels of 4K)     |                   |                            |
|   |   +---------------------+                   |                            |
|   +---------------------------------------------+                            |
+------------------------------------------------------------------------------+
```

> **Note (beyond this lesson):** to get the aspect ratio from a resolution, divide both numbers by their greatest common divisor. 1,920 × 1,080 divided by 120 gives 16 × 9. The same works for 2,560 × 1,440 (QHD) and 3,440 × 1,440 (a 21:9 ultrawide).

## 5. Colour gamut

### 5.1 What a gamut is

The human eye sees a far wider range of colours than any display can reproduce. The range a display **can** show is its **colour gamut**. For general use this hardly matters; for graphics and image work it may be the deciding specification.

### 5.2 Measuring it

Gamut is plotted on the **CIE 1931 colour space** — a diagram of everything the human eye can see, onto which each standard is drawn as a triangle covering the portion of that space it defines:

| Standard | Note |
|---|---|
| sRGB | Standard Red Green Blue; the common baseline for web and general use |
| Adobe RGB | Adobe's wider standard, aimed at print and photographic work |
| ITU standards | From the International Telecommunications Union, such as Rec. 709 |
| DCI-P3 | A wide gamut also quoted on monitor specification sheets |

You will find this broken down in a monitor's technical specifications as percentages. One display in the lesson quotes **100% Rec. 709, 100% sRGB and 98% DCI-P3**. You do not need to know each standard's details — the percentage tells you how closely the display meets it.

### 5.3 Comparing two displays

Comparing two otherwise similar monitors, one covers **100% of sRGB** and the other **95%**. Which is right depends entirely on the job:

- Web browsing and email — 95% sRGB is perfectly adequate.
- Graphics or video editing — pay for the display that meets the standard properly.

Both of those displays are **LCDs using IPS**, and the better one uses a variant of IPS that achieves deeper blacks, which is likely why it reaches a higher percentage of sRGB. Panel technology and colour performance are connected.

The best colour gamut generally comes from **OLED**, which tends to have the best colour representation of all and usually matches these standards more closely than a traditional liquid crystal display.

> **Exam tip:** for colour-critical work, the ranking that emerges across both display lessons is OLED first, then a good IPS LCD. Match this to the panel-type lesson: IPS is the LCD answer for colour, OLED is the overall answer.

### 5.4 Worked example — reading two specification sheets

**Scenario:** two 27-inch 4K monitors at similar prices, for a marketing team that does light photo editing and a lot of video calls.

1. **Pixel density is identical** — both are 27-inch 4K, so both are about 160 PPI. This is not the deciding factor.
2. **Compare the gamut figures.** 100% sRGB against 95% sRGB is a real difference for photo work; colours outside the display's gamut are approximated.
3. **Check the panel type.** If one is IPS and the other TN, the IPS unit is the one for colour and for anyone viewing off axis.
4. **Check the refresh rate against the use.** Neither photo editing nor video calls need 144 Hz — do not pay for it here.
5. **Conclusion:** buy on gamut and panel type, not refresh rate. Reverse this entirely for a gaming machine.

## 6. Security perspective

Display specifications are not a security topic by nature, but several of them have defender-relevant consequences.

- **High pixel density makes remote capture easier.** A sharp, high-PPI screen is legible from further away and photographs far more clearly, which increases the practical range of shoulder surfing and camera-based capture in open-plan areas, trains and receptions.
- **Large, bright signage displays show what they are given.** A lobby screen is an unattended output device on your network, often driven by a small media player with default credentials and no patching regime. Treat it as an endpoint: unique credentials, isolated VLAN, and control over who can push content to it.
- **Refresh rate and resolution changes are a symptom worth reading.** A display that silently drops to a lower resolution or refresh rate usually means a cable, port or driver problem — but sudden unexplained display changes are also consistent with malware or an unwanted remote-control tool, so confirm the mundane explanation rather than assuming it.
- **Colour and resolution fingerprint a browser.** Screen resolution, colour depth and pixel ratio are among the attributes websites read for device fingerprinting, and an unusual combination makes a user more identifiable, not less.
- **Wide-gamut, high-resolution screens carry more information at a glance.** The more a screen shows legibly, the more a single photograph of it discloses — a consideration for what is displayed on shared dashboards and wall-mounted operations screens.
- **Specification claims should be verified, not trusted.** A cheap cable or adapter sold as HDMI 2.1 that silently negotiates a lower mode is a small example of a general principle: confirm what the hardware is actually doing rather than what the packaging says.

## Summary

- Start from the **use case**, then read the specification sheet. The right numbers depend entirely on the job.
- **Pixel density (PPI)** is pixels per inch of display area; higher means sharper. Calculate it as pixels ÷ inches of **width**, remembering that advertised size is the diagonal. A 27-inch 4K display is about 160 PPI; a 65-inch 4K display is about 67 PPI.
- **DPI** is the printer's equivalent, and a separate check if the image will be printed.
- **Hertz** is screen refreshes per second; **FPS** is frames in the content. **V-sync** locks them together. Film is 24 FPS, TV and online video 30, sport and gaming 60 or higher.
- The **video card and the connection** must support the refresh rate too — HDMI 2.1 for 4K at up to 144 Hz, DisplayPort 2.1 for dual 4K at up to 144 Hz.
- **Resolution** is horizontal × vertical: HD is 1,920 × 1,080, 4K is 3,840 × 2,160 — four times the pixels. Most standards are **16:9**.
- **Colour gamut** is the range of colours a display can show, plotted on the **CIE 1931** colour space and quoted as percentages of **sRGB**, **Adobe RGB**, **Rec. 709** or **DCI-P3**. 95% sRGB is fine for email; colour work wants 100%. **OLED** generally gives the widest gamut.

## Glossary

| Term | Meaning |
|---|---|
| Pixel density | How many pixels occupy one inch of display area |
| PPI | Pixels per inch; the unit of pixel density |
| DPI | Dots per inch; the printer equivalent of PPI |
| Diagonal | How display size is advertised, measured corner to corner |
| Hertz (Hz) | Cycles per second; a display's refresh rate |
| Refresh rate | How many times per second the display redraws the screen |
| FPS | Frames per second; how many images the content supplies |
| V-sync | Vertical sync; setting that locks frame rate to refresh rate |
| Stutter | Visible jerkiness when the refresh rate cannot keep up with motion |
| Resolution | The number of pixels horizontally and vertically |
| HD | 1,920 × 1,080 |
| 4K | 3,840 × 2,160; four times the pixels of HD |
| Aspect ratio | The proportion of width to height, commonly 16:9 |
| Colour gamut | The range of colours a display can reproduce |
| CIE 1931 | The colour space diagram gamuts are plotted on |
| sRGB | Standard Red Green Blue; the common baseline colour standard |
| Adobe RGB | Adobe's wider colour standard |
| Rec. 709 | An ITU colour standard quoted on monitor specifications |
| DCI-P3 | A wide colour gamut standard quoted on monitor specifications |
| DSC | Display Stream Compression; how HDMI 2.1 reaches 4K at 144 Hz |

## Review questions

1. What does pixel density measure, and in what unit?
2. Why can't you calculate PPI from the advertised screen size directly?
3. Calculate the PPI of a 4K display 24 inches wide.
4. Why does the same 4K resolution look sharper on a 27-inch monitor than on a 65-inch television?
5. What is DPI, and when do you need to think about it?
6. What does hertz measure on a display?
7. What does V-sync do?
8. Give the typical frame rates for film, television and gaming.
9. Besides the display itself, what two things must support a high refresh rate?
10. What are the resolutions of HD and 4K, and how many times more pixels does 4K have?
11. What aspect ratio do most standard resolutions use?
12. What is a colour gamut, and what is the CIE 1931 colour space used for?
13. **Scenario:** a new 144 Hz monitor only offers 60 Hz. What do you check first?
14. **Scenario:** a designer needs a monitor for colour-critical photo retouching. Which specifications matter most, and which can you ignore?
15. **Scenario:** two similar monitors quote 100% sRGB and 95% sRGB. When does the difference matter, and when does it not?
16. **Scenario:** a 55-inch screen is going on a lobby wall, viewed from several metres away. Does it need 4K? Justify your answer using pixel density.

## Answer key

1. **How many pixels fit into one inch of display area,** measured in **PPI** (or pixels per centimetre elsewhere).
2. **The advertised size is the diagonal,** not the width. You need the width in inches to divide the horizontal pixel count by.
3. **160 PPI.** 3,840 ÷ 24 = 160.
4. **The same number of pixels is spread over a much larger area,** so each pixel is bigger — about 160 PPI against about 67 PPI.
5. **Dots per inch, a printer specification.** Check it when the image will be printed rather than only displayed.
6. **Cycles per second** — how many times the display redraws the screen each second.
7. **It locks the frame rate to the display's refresh rate,** so hertz equals FPS.
8. **Film 24 FPS, television and online video 30 FPS, sport and gaming 60 FPS or higher.**
9. **The video card or video subsystem, and the connection type** (cable and port).
10. **HD is 1,920 × 1,080 and 4K is 3,840 × 2,160 — four times** the pixels (twice as many in each direction).
11. **16:9.**
12. **The range of colours a display can reproduce.** CIE 1931 maps everything the human eye can see, so each standard's coverage can be drawn on it and compared.
13. **The cable** — an older HDMI cable fits the port but won't carry 4K at high refresh rates. Then the port used, the graphics card, the OS display settings and the monitor's own input mode.
14. **Colour gamut (aim for 100% sRGB) and panel type (IPS, or OLED for the widest gamut).** Refresh rate above 60 Hz is not worth paying for here.
15. **It matters for graphics and video editing,** where colours outside the gamut are approximated. **It doesn't for web browsing and email.**
16. **No.** At several metres, pixel density is far less noticeable. A 55-inch 16:9 screen is about 48 inches wide, so HD gives roughly 40 PPI and 4K about 80 PPI — a real difference up close, but not from across a lobby. Spend the budget on brightness and reliability instead.
