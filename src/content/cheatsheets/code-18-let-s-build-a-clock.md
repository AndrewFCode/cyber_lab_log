---
title: "Code: Let's Build a Clock!"
description: "Code ch. 18 — a digital clock from counters: binary-coded decimal, dividing a fast oscillator down to 1 Hz, and driving seven-segment displays."
tags: ["code", "petzold", "computing", "logic-gates", "counters"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 18"
moduleOrder: 18
unit: 18
---
> **In one line:** a clock is just counters — divide a fast oscillator down to one tick per second, count 0–59, reset, carry into minutes and hours, and decode the digits for a display.

*Companion to: Charles Petzold, Code (2nd edition), chapter 18.*

---

## Binary-coded decimal (BCD)

Each **decimal digit** gets its own 4 bits, so displays are easy to drive.

| Decimal | BCD |
|---|---|
| 5 | `0101` |
| 9 | `1001` |
| 59 | `0101 1001` (5 and 9 stored separately) |
| 12 | `0001 0010` |

Codes `1010`–`1111` go unused in BCD, so a counter must reset to 0 after 9.

---

## Counting time

| Stage | Counts | Resets when |
|---|---|---|
| Seconds (ones digit) | 0–9 | It passes 9 → carries into the tens digit |
| Seconds (tens digit) | 0–5 | It reaches 6 → carries into minutes |
| Minutes | 00–59 | Same pattern |
| Hours | 1–12 | Past 12 → back to 1; AM/PM toggles at 12 |

Detecting "reached 6" or "passed 9" is a job for a few gates watching the counter's bits.

### Getting 1 Hz

Quartz watch and PC clock crystals typically run at **32,768 Hz = 2¹⁵**. Fifteen divide-by-two flip-flops bring that down to exactly 1 Hz.

---

## Seven-segment displays

```
  aaa
 f   b
 f   b
  ggg
 e   c
 e   c
  ddd
```

| Digit | Segments lit |
|---|---|
| 0 | a b c d e f |
| 1 | b c |
| 2 | a b d e g |
| 3 | a b c d g |
| 4 | b c f g |
| 5 | a c d f g |
| 6 | a c d e f g |
| 7 | a b c |
| 8 | a b c d e f g |
| 9 | a b c d f g |

A **decoder** — gates, or a small ROM — turns each 4-bit BCD digit into these seven on/off signals.

---

## Try it

```python
' '.join(f'{int(d):04b}' for d in "59")   # '0101 1001' — BCD for 59
2**15                                     # 32768
```

```powershell
w32tm /query /status          # Windows time source and last sync
```

```bash
timedatectl                   # Linux clock, time zone and NTP status
```

---

## 🔐 Security and IT connections

- **Every PC has this clock inside.** The real-time clock chip runs on a 32.768 kHz crystal, kept alive by the CMOS battery — which is why a dead coin cell resets the date.
- **Time is a security control:**
  - Kerberos (Active Directory logons) rejects clocks more than **5 minutes** apart by default.
  - TLS certificates fail outside their validity dates.
- **Log correlation needs synchronised clocks.** Keep systems on NTP and store logs in UTC; a timeline is useless if every machine disagrees about the time.

---

## Practice drills

<details>
<summary>1. Write 47 in BCD.</summary>

`0100 0111`
</details>

<details>
<summary>2. Which segments light for the digit 7?</summary>

a, b and c.
</details>

<details>
<summary>3. A domain PC suddenly can't log users in and its clock is 20 minutes fast. Why?</summary>

Kerberos rejects the time skew (default limit 5 minutes). Resync with `w32tm /resync`.
</details>

---

## Key takeaways

- BCD stores each decimal digit in 4 bits — handy for displays.
- Counters plus reset logic count seconds, minutes and hours; dividers turn a fast crystal into 1 Hz.
- Seven-segment decoders map digits to segments.
- Accurate time underpins authentication, certificates and log timelines.
