---
title: "A+ Core 1 3.4: RAID"
description: "Professor Messer A+ 220-1201 objective 3.4 — RAID 0 striping, RAID 1 mirroring, RAID 5 and RAID 6 parity, and nested RAID 1+0, plus why RAID is not backup."
tags: ["a-plus", "comptia", "messer", "hardware", "storage", "raid", "redundancy"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "RAID"
moduleOrder: 71
unit: 3
---

> **In one line:** RAID 0 stripes for speed with zero redundancy, RAID 1 mirrors for full redundancy at double the storage cost, RAID 5 and 6 stripe with one or two parity blocks to survive one or two lost drives, and RAID 1+0 stripes mirrored pairs — but none of them is a substitute for backup.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.4 (RAID).* The full version is the RAID class notes; the section overview is the Section 3 sheet.

---

## RAID is not backup

**Never conflate the two.** RAID protects against a drive **hardware failure**. It does nothing against accidental deletion, corruption, or ransomware — those replicate across the array exactly as faithfully as legitimate data. A separate backup process is always required, regardless of RAID level.

## RAID levels at a glance

| Level | Also called | Min drives | Survives losing | Usable capacity | Speed | CPU overhead |
|---|---|---|---|---|---|---|
| **RAID 0** | Striping | 2 | **0 drives** | 100% (all drives) | Fastest | None |
| **RAID 1** | Mirroring | 2 | 1 (either) | 50% | Normal | None |
| **RAID 5** | Striping + 1 parity | 3 | 1 | (n−1) drives | Good | Yes |
| **RAID 6** | Striping + 2 parity | 4 | 2 (simultaneous) | (n−2) drives | Good | More |
| **RAID 1+0 / RAID 10** | Stripe of mirrors | 4 | 1 per mirrored pair | 50% | Fast | None |

## How each works

**RAID 0 (striping):** data split across all drives — write speed benefits from parallel writes. **Lose any one drive → the whole array's data is gone.**

**RAID 1 (mirroring):** every byte duplicated on a second drive. **Lose either drive → the other has a complete, unaffected copy.** Costs double the storage.

**RAID 5 (striping + parity):** stripes like RAID 0, but one drive's worth of *each stripe* holds **parity** instead of data — and which physical drive holds it **rotates** stripe by stripe. Lose one drive → reconstruct it from the rest + parity, in real time, running **degraded**. Parity math costs CPU, especially during recovery.

**RAID 6 (striping + dual parity):** RAID 5 plus a **second independent parity block** per stripe. Survives **two** simultaneous lost drives. The extra drive adds fault tolerance, **not extra usable capacity**.

**RAID 1+0 / RAID 10 (nested):** RAID 0 striping **across mirrored pairs** ("a stripe of mirrors"). Minimum 4 drives (2 pairs). Survives losing **one drive from each pair** simultaneously — but **not both drives of the same pair** at once.

## Choosing a level

| Priority | Level |
|---|---|
| Max speed/capacity, data is disposable | RAID 0 |
| Simple full redundancy, budget for 2x storage | RAID 1 |
| Balanced fault tolerance + storage efficiency | RAID 5 |
| Survive two simultaneous failures | RAID 6 |
| Speed + strong redundancy, budget allows 2x storage | RAID 1+0 |

## 🔐 Security notes

- **"We have RAID" ≠ "we have backups."** Ransomware and accidental deletion propagate through a RAID array just as reliably as real data.
- **A degraded array is a live risk window,** not just slower — a further failure during that window (RAID 5 on N−1, RAID 6 on N−2) can mean real data loss. Replace failed drives and monitor for degraded state.
- **Encrypt deliberately, at drive level or above the controller** — the choice changes what a stolen single drive exposes and how key management works across a rebuild.
- **Decommission every drive in the array,** not just one — even a parity-only drive holds recoverable information derived from real data.
- **Rebuild load increases second-failure risk** on same-age, same-wear drives — a known real-world failure pattern, and part of why RAID 6/10 exist for higher-stakes systems.

## Practice drills

<details>
<summary>1. Why does RAID 0 have zero redundancy?</summary>

Data is **split** across drives, so each drive holds only **part** of every file — losing any one drive leaves the data incomplete.
</details>

<details>
<summary>2. What's the storage cost of RAID 1?</summary>

**Double** the storage — every byte is written twice.
</details>

<details>
<summary>3. How does RAID 5 recover from a lost drive?</summary>

**Reconstructs the missing data from the remaining data plus parity**, running in a degraded state with a CPU-driven performance cost.
</details>

<details>
<summary>4. RAID 6 vs RAID 5 — what's the actual gain from the extra drive?</summary>

**Fault tolerance for a second simultaneous lost drive** — not extra usable capacity; the added drive's space goes entirely to parity.
</details>

<details>
<summary>5. What does RAID 1+0 combine, and what's its minimum?</summary>

**RAID 0 striping across RAID 1 mirrored pairs** — minimum **4 drives**.
</details>

<details>
<summary>6. RAID 1+0 with 3 mirrored pairs — which specific failure combination loses data?</summary>

**Both drives of the same mirrored pair failing together.** Losing one drive from each of several different pairs is survivable.
</details>

<details>
<summary>7. Does RAID protect against ransomware or accidental deletion?</summary>

**No.** RAID protects against drive hardware failure only — corruption and deletion replicate across the array just like legitimate data.
</details>

<details>
<summary>8. RAID 5 array missing one of four drives — accessible? What next?</summary>

**Yes, accessible, running degraded.** Replace the failed drive promptly so it can rebuild.
</details>

## Key takeaways

- RAID trades among speed, capacity efficiency and fault tolerance — no level gives you all three.
- RAID 0 = speed, zero redundancy. RAID 1 = full redundancy, half capacity.
- RAID 5 survives one drive loss via rotating parity; RAID 6 survives two, at the cost of one more drive with zero extra capacity.
- RAID 1+0 survives one loss per mirrored pair, not both drives of the same pair.
- RAID is never a substitute for backup — say it every time.
