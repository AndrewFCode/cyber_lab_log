---
title: "Code: Logic with Switches"
description: "Code ch. 6 — Boolean algebra (AND, OR, NOT), sets and conditions, and how switches in series and parallel perform logic."
tags: ["code", "petzold", "computing", "logic"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 6"
moduleOrder: 6
unit: 6
---
> **In one line:** George Boole turned logic into algebra, and switches do that algebra with electricity — series is AND, parallel is OR.

*Companion to: Charles Petzold, Code (2nd edition), chapter 6.*

---

## Boolean algebra

George Boole (1850s) treated logic like arithmetic on **sets** and **true/false** values.

| Operation | Meaning | Set view | Boolean arithmetic |
|---|---|---|---|
| AND | Both must be true | Intersection | Like × (1 × 1 = 1, anything × 0 = 0) |
| OR | Either can be true | Union | Like + (but 1 + 1 = 1) |
| NOT | Flip it | Everything outside the set | 1 − x |

**Example condition:** "a cat that's female **AND** neutered **AND** (black **OR** white) **AND NOT** tan". Parentheses matter exactly as in arithmetic.

---

## Switches do logic

```
AND — series: both must be closed      OR — parallel: either closed is enough

 +──[A]──[B]──(bulb)──┐                 +──┬──[A]──┬──(bulb)──┐
                      │                    └──[B]──┘          │
 −────────────────────┘                 −─────────────────────┘
```

| A | B | Series (AND) | Parallel (OR) |
|---|---|---|---|
| off | off | dark | dark |
| off | on | dark | lit |
| on | off | dark | lit |
| on | on | lit | lit |

---

## The same logic in every tool

| Tool | AND | OR | NOT |
|---|---|---|---|
| PowerShell | `-and` | `-or` | `-not` / `!` |
| Python | `and` | `or` | `not` |
| Bash | `&&` | `\|\|` | `!` |
| SQL | `AND` | `OR` | `NOT` |
| JavaScript / C | `&&` | `\|\|` | `!` |
| Bitwise (numbers) | `&` | `\|` | `~` |

```powershell
Get-Service | Where-Object { $_.Status -eq 'Running' -and $_.StartType -eq 'Manual' }
```

```sql
SELECT * FROM logins WHERE (result = 'fail' OR locked = 1) AND NOT user LIKE 'svc_%';
```

---

## 🔐 Security and IT connections

- **Firewall rules, SIEM queries, group policies and search filters are all Boolean expressions.** A misplaced OR can let everything through; a missing parenthesis can change the meaning completely.
- **Detection example (KQL):** `SecurityEvent | where EventID == 4625 and not(Account has "svc_")` finds failed logons, excluding service accounts.
- **Test logic with a truth table** before trusting a complex rule.

---

## Practice drills

<details>
<summary>1. Two switches in series: A on, B off. Is the bulb lit?</summary>

No — series is AND, so both must be on.
</details>

<details>
<summary>2. Write "running services that aren't Automatic" in PowerShell.</summary>

`Get-Service | Where-Object { $_.Status -eq 'Running' -and $_.StartType -ne 'Automatic' }`
</details>

<details>
<summary>3. In Boolean arithmetic, what's 1 + 1 for OR?</summary>

1 — OR is true if either input is true, and there's nothing "more true" than true.
</details>

---

## Key takeaways

- Boolean algebra: AND (intersection, ×), OR (union, +), NOT (complement).
- Switches in series = AND; in parallel = OR.
- The same three operators run every query, filter and rule you'll write.
