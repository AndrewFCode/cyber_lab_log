---
title: "Code: Is This for Real?"
description: "Code ch. 15 — from mechanical calculators and relay machines to vacuum tubes, transistors, integrated circuits and the microprocessor."
tags: ["code", "petzold", "computing", "history", "transistors"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 15"
moduleOrder: 15
unit: 15
---
> **In one line:** the switches got smaller and faster — relays, then vacuum tubes, then transistors etched by the billion onto chips — but the logic stayed the same.

*Companion to: Charles Petzold, Code (2nd edition), chapter 15.*

---

## Timeline

| When | Milestone |
|---|---|
| 1640s–1670s | Mechanical calculators — Pascal, then Leibniz |
| 1820s–1830s | Babbage's Difference and Analytical Engines; Ada Lovelace writes what's often called the first program (1843) |
| 1890 | Hollerith's punched-card tabulators process the US census — the roots of IBM |
| Late 1930s–1940s | Relay computers (Zuse, Stibitz, Harvard Mark I) |
| 1940s | Vacuum-tube machines (Colossus at Bletchley Park; ENIAC) |
| 1945 | Von Neumann describes the **stored-program** architecture |
| 1947 | The **transistor** is invented at Bell Labs |
| Late 1950s | The **integrated circuit** — many transistors on one chip (Kilby, Noyce) |
| 1960s | 7400-series TTL logic chips; Moore observes transistor counts doubling |
| 1971 / 1974 | Intel 4004, then the 8080 — whole CPUs on a single chip |

---

## Switch technology

| Switch | Pros | Cons |
|---|---|---|
| Relay | Simple, visible | Slow, noisy, wears out |
| Vacuum tube | No moving parts, much faster | Hot, power-hungry, burns out |
| Transistor | Tiny, fast, cool, reliable | Needs precise manufacturing |

- **A transistor as a switch:** a small current (or voltage) at one terminal lets a larger current flow between the other two.
- **7400-series chips:** the 7400 packs four 2-input NAND gates into one package.
- **CMOS** logic uses almost no power when idle, which is why phones and CPUs use it.

---

## Von Neumann architecture

| Part | Role |
|---|---|
| Memory | Holds **both** the program's instructions **and** its data |
| CPU | Fetches instructions from memory and executes them |
| I/O | Moves data in and out |

The alternative, **Harvard architecture**, keeps instructions and data in separate memories.

---

## Try it

```powershell
Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores   # a descendant of the 4004
```

```bash
lscpu | head -n 15
```

---

## 🔐 Security and IT connections

- **Shared memory for code and data is a double-edged sword.** It makes computers flexible, but it lets attackers smuggle in data that later gets executed as code — the basis of classic code-injection and buffer-overflow attacks.
- **Modern mitigations** mark data memory non-executable (**DEP / NX bit**) and never make memory writable and executable at the same time.
- **Hardware history matters in IT:** legacy systems built on old designs still run in factories and banks, and they're hard to patch.

---

## Practice drills

<details>
<summary>1. What replaced vacuum tubes, and why?</summary>

Transistors — smaller, faster, cooler, more reliable and far less power-hungry.
</details>

<details>
<summary>2. What's the defining feature of the von Neumann architecture?</summary>

Instructions and data share the same memory.
</details>

<details>
<summary>3. What does DEP/NX do?</summary>

It marks data areas of memory as non-executable, so injected data can't run as code.
</details>

---

## Key takeaways

- Relays → vacuum tubes → transistors → integrated circuits: the same logic in ever-smaller switches.
- The stored-program (von Neumann) design puts code and data in one memory.
- That design is why code injection works, and why DEP/NX exists.
