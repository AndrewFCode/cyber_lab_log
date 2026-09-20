---
title: "Code: Relays and Gates"
description: "Code ch. 8 — building AND, OR, NOT, NAND and NOR gates from relays, truth tables, gate symbols and De Morgan's laws."
tags: ["code", "petzold", "computing", "logic-gates"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 8"
moduleOrder: 8
unit: 8
---
> **In one line:** wire relays together the right way and they perform Boolean logic — logic gates are where maths becomes hardware.

*Companion to: Charles Petzold, Code (2nd edition), chapter 8.* The book's companion site, CodeHiddenLanguage.com, animates many of these circuits.

---

## Gates from relays

| Gate | Relay wiring | Output is 1 when… |
|---|---|---|
| Buffer | One relay, normally-open contact | The input is 1 |
| NOT (inverter) | One relay, **normally-closed** contact | The input is 0 |
| AND | Two relays in **series** | Both inputs are 1 |
| OR | Two relays in **parallel** | Either input is 1 |
| NAND | AND followed by NOT | Not both are 1 |
| NOR | OR followed by NOT | Neither is 1 |

### Truth tables

| A | B | AND | OR | NAND | NOR |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 |

**Universal gates:** every other gate — and so an entire computer — can be built from NAND gates alone, or from NOR gates alone.

---

## De Morgan's laws

| Law | In words |
|---|---|
| NOT (A AND B) = (NOT A) OR (NOT B) | "Not both" means "at least one is missing" |
| NOT (A OR B) = (NOT A) AND (NOT B) | "Neither" means "not this and not that" |

---

## Try it

```python
for a in (0, 1):
    for b in (0, 1):
        print(a, b, "AND", a & b, "OR", a | b, "NAND", 1 - (a & b), "NOR", 1 - (a | b))
```

```powershell
1 -band 0     # 0  (AND)
1 -bor 0      # 1  (OR)
```

---

## 🔐 Security and IT connections

- **De Morgan catches rule-writing bugs.** "Alert unless the login is from the office AND uses MFA" = alert if **not office OR no MFA**. Negating a compound condition is where detection and firewall logic most often goes wrong.
- **Bitwise operators are gates on whole numbers.** `&` masks bits (subnet masks work this way), `|` sets bits, `~` flips them.

---

## Practice drills

<details>
<summary>1. What single relay wiring gives a NOT gate?</summary>

A relay using its normally-closed contact — current flows to the output only when the input is off.
</details>

<details>
<summary>2. Apply De Morgan: NOT (admin OR remote).</summary>

(NOT admin) AND (NOT remote)
</details>

<details>
<summary>3. Output of NAND with both inputs 1?</summary>

0
</details>

<details>
<summary>4. Why do chip designers love NAND?</summary>

It's universal — any logic can be built from NAND gates alone.
</details>

---

## Key takeaways

- Relays in series = AND, in parallel = OR, a normally-closed relay = NOT.
- NAND and NOR are universal — a whole computer can be built from either.
- De Morgan's laws turn negated ANDs into ORs and vice versa. Use them to check rule logic.
