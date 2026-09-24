---
title: "A+ Core 1 3.4: RAID — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.4: RAID 0 striping, RAID 1 mirroring, RAID 5 and RAID 6 parity, and nested RAID 1+0."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "storage", "raid", "redundancy"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.4 (RAID)**

> **Quick reference:** the short version of this lesson is the RAID cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It follows directly from the Storage Devices lesson in this section, and reuses the parity concept introduced in the Memory Technologies lesson, applying it to drives instead of memory.

## Learning objectives

By the end of these notes you should be able to:

1. Define RAID and explain why RAID is not a substitute for backup.
2. Describe RAID 0 (striping) and explain why it offers no redundancy.
3. Describe RAID 1 (mirroring) and its storage-efficiency trade-off.
4. Describe RAID 5 (striping with parity) and how it recovers from a lost drive.
5. Describe RAID 6 and how it differs from RAID 5 in fault tolerance and capacity.
6. Describe RAID 1+0 (RAID 10) and how many drives it can lose while staying online.
7. Choose an appropriate RAID level for a described workload and fault-tolerance requirement.

## 1. Why RAID exists

### 1.1 The problem

Hard drives, SSDs, and other storage devices hold large amounts of important data, and losing that data is a real risk. Hard drives in particular are **physical devices with moving parts** — platters spinning, actuator arms moving — and if **any one of those components fails**, everything on that drive becomes inaccessible.

### 1.2 The solution

Multiple drives can be **combined together** to create redundancy, so that losing one physical drive does not mean losing the data.

### 1.3 RAID is not backup

This point matters enough to state plainly, and the lesson is explicit about it: **RAID redundancy is not a backup**. Even with a RAID array protecting against drive failure, you still need a **completely separate backup process**. RAID protects against a hardware failure; it does nothing to protect against accidental deletion, corruption, ransomware, or a disaster that takes out the whole array at once.

### 1.4 What RAID stands for

**RAID** stands for **Redundant Array of Independent Disks**. You may also see it expanded as **Redundant Array of Inexpensive Disks** — both expansions are in use.

### 1.5 Redundant, or not

Not every RAID level provides redundancy. Some methods keep your data available even after losing a drive; others do not. Knowing which is which is the whole point of this lesson.

## 2. RAID 0 — striping

### 2.1 How it works

**RAID 0**, also called **striping**, uses **at least two physical drives**. Data being saved is **split across all the drives** in the array. A single file might be broken into, say, eight parts, with each part written to one of the drives — for example, Block 1A on drive one, Block 2A on drive two, back to Block 3A on drive one, and so on.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   RAID 0 (striping) -- at least 2 drives, zero redundancy                    |
|                                                                              |
|   Drive 1:  [ Block 1A ] [ Block 3A ] [ Block 5A ] ...                       |
|   Drive 2:  [ Block 2A ] [ Block 4A ] [ Block 6A ] ...                       |
|                                                                              |
|   Lose EITHER drive -> the file is incomplete -> effectively all data lost   |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 2.2 The trade-off: speed for zero redundancy

RAID 0 is known for **speed** — writing small pieces of data to multiple drives simultaneously is faster than writing everything to a single drive. But losing **any one drive** in the array means losing access to the data, since each drive only holds part of every file. RAID 0 is therefore described as having **zero redundancy**.

> **Exam tip:** RAID 0 improves performance and **capacity is fully usable** (all drives' space is available for data), but it makes things *worse* for reliability compared to a single drive — more drives means more chances for one to fail, and any single failure loses everything.

## 3. RAID 1 — mirroring

### 3.1 How it works

**RAID 1**, or **mirroring**, needs **at least two drives**. Everything written to one drive is **duplicated exactly** on the other. Whatever is on Disk 0 is also, identically, on Disk 1.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   RAID 1 (mirroring) -- at least 2 drives, full redundancy                   |
|                                                                              |
|   Disk 0:  [ A ][ B ][ C ][ D ] ...                                          |
|   Disk 1:  [ A ][ B ][ C ][ D ] ...   <-- identical copy                     |
|                                                                              |
|   Lose EITHER drive -> the other still has everything, unaffected            |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 3.2 The trade-off: capacity for redundancy

Mirroring needs **twice the storage space** to hold the same amount of usable data — every byte is written twice. In exchange, losing one physical drive leaves the array **fully functional**: the surviving drive still has an exact, complete copy of everything, and the system keeps working normally while the failed drive is replaced and the mirror is rebuilt.

## 4. RAID 5 — striping with parity

### 4.1 Reusing parity from memory

RAID 5 takes the **parity** concept covered in the Memory Technologies lesson — an extra piece of data that lets you detect and, here, actually **reconstruct** missing information — and applies it to disks instead of memory bytes.

### 4.2 How it works

RAID 5's striping works the same way as RAID 0: a file is cut into pieces and distributed across the drives. The difference is that **one drive's worth of space per stripe** does not hold a piece of the file — it holds the **parity** calculated from the other pieces in that stripe.

In a RAID 5 array of **four physical drives**, for example, three drives' worth of that stripe holds actual data, and the fourth holds parity for that stripe. Which physical drive holds the parity **rotates** across the array stripe by stripe, rather than always landing on the same drive — this spreads both the write load and the recovery workload more evenly, and makes the whole array more efficient to read from and rebuild.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   RAID 5 (striping with single parity) -- parity rotates across drives       |
|                                                                              |
|   Stripe 1:  Drive1=Data   Drive2=Data   Drive3=Data   Drive4=Parity         |
|   Stripe 2:  Drive1=Data   Drive2=Data   Drive3=Parity Drive4=Data           |
|   Stripe 3:  Drive1=Data   Drive2=Parity Drive3=Data   Drive4=Data           |
|                                                                              |
|   Lose ANY ONE drive -> remaining data + parity reconstruct what's missing   |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 4.3 Efficiency versus mirroring

Because RAID 5 stores **parity, not a full duplicate**, it is more storage-efficient than mirroring — you are not paying for a complete second copy of everything, only for the equivalent of one drive's worth of parity data across the array.

### 4.4 Recovering from a lost drive

If a single physical drive is lost, the **remaining data combined with the parity** is enough to **reconstruct** what was on the missing drive — effectively, in real time, as though the data were still physically present, while the array runs in this reduced (degraded) state.

### 4.5 The cost: CPU overhead

Calculating and using parity is not free — it requires **CPU overhead**, and running a RAID 5 array while it is missing a drive and reconstructing data on the fly can produce a **noticeable performance hit** during that recovery period.

## 5. RAID 6 — striping with dual parity

### 5.1 How it differs from RAID 5

RAID 6 is very similar to RAID 5, with one addition: an **additional storage drive** carrying a **second, independent block of parity** per stripe.

### 5.2 Fault tolerance

Because there are now two independent parity calculations rather than one, RAID 6 can survive losing **two** physical drives at once and still keep all data accessible — running in a **degraded state**, but fully up and available. Losing a single drive behaves essentially the same as RAID 5.

### 5.3 The cost: capacity, not just an extra drive

Adding that second parity drive means the array needs **one more physical drive than an equivalent RAID 5 array would**, and — importantly — that extra drive's space goes entirely to parity, **not to additional usable capacity**. You gain fault tolerance for a second lost drive, but you do not gain any extra storage space by adding it.

| | RAID 5 | RAID 6 |
|---|---|---|
| Minimum useful concept | 3+ drives (data + 1 parity) | 4+ drives (data + 2 parity) |
| Drives that can fail simultaneously | 1 | 2 |
| Usable capacity | (n − 1) drives' worth | (n − 2) drives' worth |
| CPU overhead | Yes | More (two parity calculations) |

## 6. RAID 1+0 (RAID 10) — nested RAID

### 6.1 What "nested" means

**RAID 1+0**, commonly written **RAID 10**, is **nested RAID**: two RAID levels combined. Specifically, it combines **RAID 0's striping** with **RAID 1's mirroring** — often summarised as "a stripe of mirrors."

### 6.2 Building it up

Start with RAID 0: a file split into blocks, one block per drive across a set of drives — offering **zero redundancy** on its own, exactly as in section 2. RAID 1+0 adds RAID 1's mirroring on top: instead of just striping across individual drives, each drive in the stripe is **mirrored**, so every striped segment exists on **two** physical drives rather than one.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   RAID 1+0 (RAID 10) -- a stripe of mirrors, minimum 4 drives                |
|                                                                              |
|   Stripe A:  [ Drive1 ]==mirror==[ Drive2 ]                                  |
|   Stripe B:  [ Drive3 ]==mirror==[ Drive4 ]                                  |
|                                                                              |
|   One block of the file lands on Stripe A (both Drive1 and Drive2 have it),  |
|   the next block lands on Stripe B (both Drive3 and Drive4 have it)          |
|                                                                              |
|   Losing one drive from EACH mirrored pair still leaves a full copy          |
|   of every stripe available                                                  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 6.3 Minimum drives and fault tolerance

RAID 1+0 needs **at least four drives** — two mirrored pairs, striped together. In a larger array with several mirrored pairs striped together, you can lose **one drive from each mirrored pair** simultaneously and remain fully up and running, because each pair still has its surviving member holding a complete copy of that stripe's data. What you cannot survive is losing **both drives of the same mirrored pair** at once — that specific stripe of data would then be gone.

### 6.4 Worked example — choosing a RAID level for three workloads

**Scenario:** you are specifying storage for three separate systems: a video scratch disk used only for temporary render files, a small business file server holding client documents, and a database server that cannot tolerate any downtime from a drive failure.

1. **Video scratch disk:** speed matters, the data is disposable and easily regenerated, and redundancy is not worth the cost here. **RAID 0** fits — maximum speed and capacity, with the understanding that a drive failure means starting the render over, not losing anything irreplaceable.
2. **Small business file server:** the documents matter, budget is limited, and moderate fault tolerance with reasonable capacity efficiency is wanted. **RAID 5** is a common fit — one drive's worth of parity overhead, survives a single drive failure, and a **separate backup** is still run regardless (as the lesson stresses).
3. **Database server, zero tolerance for downtime from a drive failure:** performance and resilience both matter, and budget for extra drives is available. **RAID 1+0** is the strongest fit — it tolerates multiple simultaneous drive failures (provided they are not from the same mirrored pair) with no parity-calculation performance overhead, at the cost of needing double the raw drive capacity, similar to straight mirroring.
4. **In every case,** the RAID choice does not replace the backup requirement — that is a constant across all three systems, not something any RAID level changes.

## 7. Security perspective

RAID sits squarely in the availability corner of security, but it interacts with confidentiality and integrity in ways worth understanding.

- **RAID is not backup, and conflating the two is a real, recurring incident cause.** Ransomware, accidental deletion, and file corruption all propagate across a RAID array exactly as reliably as legitimate data does — RAID's redundancy protects against hardware failure specifically, and nothing else. Organisations that treat "we have RAID" as equivalent to "we have backups" discover the gap at the worst possible moment.
- **A degraded RAID array is a window of elevated risk, not just reduced performance.** RAID 5 running on N-1 drives, or RAID 6 on N-2, has used up some or all of its fault tolerance — a further drive failure during that window, before the array rebuilds, can mean genuine data loss. Monitoring for degraded arrays and replacing failed drives promptly is a real availability control, not just good housekeeping.
- **Encryption and RAID interact, and the order matters.** Whether encryption is applied at the individual drive level or above the RAID controller changes what an attacker with physical access to a single drive can see, and changes how key management needs to work across a rebuild. This is a design decision worth making deliberately rather than by default.
- **Decommissioning a RAID array means every drive, not just one.** Because RAID 1, 5, 6 and 10 all spread copies or fragments of data across multiple physical drives, secure disposal at end of life means treating **every drive in the array** as holding sensitive data — a RAID 5 array's parity drive still contains recoverable information derived from the real data, even though no single drive holds a complete copy.
- **Rebuild time is itself an exposure window.** Rebuilding a large RAID 5 or RAID 6 array after a drive replacement can take a long time and places extra read load on the surviving drives, which is precisely when a second failure is statistically more likely on ageing drives of similar age and wear — a known real-world failure pattern, and part of why RAID 6 and RAID 10 exist for higher-stakes systems.

## Summary

- **RAID** (Redundant Array of Independent/Inexpensive Disks) combines multiple physical drives for performance, redundancy, or both — and it is **never a substitute for backup**.
- **RAID 0 (striping):** data split across drives, fastest, **zero redundancy** — losing any one drive loses the array's data.
- **RAID 1 (mirroring):** full duplicate on a second drive, needs **double the storage**, survives losing either drive with no data loss.
- **RAID 5 (striping with single parity):** data plus rotating parity across drives, survives **one** lost drive by reconstructing it from the rest, more storage-efficient than mirroring, with **CPU overhead** during recovery.
- **RAID 6 (striping with dual parity):** an extra parity drive over RAID 5, survives **two** simultaneous lost drives, but that extra drive adds fault tolerance, **not usable capacity**.
- **RAID 1+0 (RAID 10):** nested RAID — a stripe of mirrors, minimum **four** drives, can lose **one drive from each mirrored pair** simultaneously without data loss, but not both drives of the same pair.

## Glossary

| Term | Meaning |
|---|---|
| RAID | Redundant Array of Independent (or Inexpensive) Disks |
| Redundancy | The ability of an array to survive a drive failure without data loss |
| Striping | Splitting data across multiple drives (RAID 0's core technique) |
| Mirroring | Duplicating data identically onto a second drive (RAID 1) |
| Parity | Calculated data that allows missing information to be reconstructed |
| RAID 0 | Striping; fastest, zero redundancy |
| RAID 1 | Mirroring; full duplication, survives one lost drive |
| RAID 5 | Striping with one rotating parity block per stripe |
| RAID 6 | Striping with two independent parity blocks per stripe |
| RAID 1+0 / RAID 10 | Nested RAID; a stripe of mirrored drive pairs |
| Degraded | An array's state after losing a drive, running on reduced redundancy |
| Rebuild | Restoring full redundancy after replacing a failed drive |
| Nested RAID | A RAID level built by combining two other RAID levels |

## Review questions

1. Why is RAID needed at all, given that drives can already store large amounts of data?
2. Why is RAID explicitly not a substitute for backup?
3. What does RAID stand for (both common expansions)?
4. How does RAID 0 work, and why does it offer zero redundancy?
5. What is the storage cost of RAID 1, and what do you get in exchange?
6. How does RAID 5's striping differ from RAID 0's?
7. What happens to a RAID 5 array's performance while it is missing a drive, and why?
8. How does RAID 6 differ from RAID 5 in what it can survive?
9. Does adding a second parity drive in RAID 6 increase usable capacity? Why or why not?
10. What does RAID 1+0 combine, and what is its minimum drive count?
11. In a larger RAID 1+0 array, which specific combination of drive failures would actually cause data loss?
12. **Scenario:** a video editor wants maximum speed and capacity for temporary render files with no need for redundancy. Which RAID level fits, and why?
13. **Scenario:** a small office wants reasonable fault tolerance and storage efficiency on a limited budget, and is prepared to also run a separate backup. Which RAID level is a natural fit?
14. **Scenario:** a RAID 5 array has just lost one of its four drives. Is data still accessible, and what should be done next?
15. **Scenario:** a RAID 6 array loses two drives simultaneously. Is data still accessible? What if a third drive were to fail before the first two are replaced?
16. **Scenario:** an organisation relies solely on a RAID 1 array for its critical files and has no other backup. A user accidentally deletes an important folder. Does the RAID array help recover it? Why or why not?

## Answer key

1. **Hard drives are mechanical and any component failing makes the drive's data inaccessible,** so combining drives creates redundancy against that failure.
2. **RAID protects against hardware failure only.** It does nothing against accidental deletion, corruption, ransomware, or an event that destroys the whole array — a separate backup process is still required.
3. **Redundant Array of Independent Disks, or Redundant Array of Inexpensive Disks.**
4. **Data is split into pieces and distributed across all drives in the array.** Because each drive only holds part of the data, losing any one drive leaves incomplete, effectively unusable data — zero redundancy.
5. **Twice the storage space** for the same usable capacity. In exchange, losing either drive leaves the other with a complete, unaffected copy of all data.
6. **RAID 5 dedicates part of each stripe to parity rather than actual data,** with the parity rotating across the drives, rather than striping every bit of space purely for data as RAID 0 does.
7. **It can take a performance hit,** because reconstructing the missing drive's data from parity on the fly requires **CPU overhead**.
8. **RAID 6 can survive losing two drives simultaneously,** compared with RAID 5's tolerance for only one, because it maintains two independent parity calculations.
9. **No.** The extra drive's space is used entirely for the second parity block, adding fault tolerance, not usable storage capacity.
10. **RAID 0 (striping) and RAID 1 (mirroring), combined as a stripe of mirrors.** The minimum is **four drives**.
11. **Losing both drives of the same mirrored pair at the same time** would lose that stripe's data; losing one drive from each of several different pairs does not.
12. **RAID 0.** It offers the highest speed and full usable capacity, which fits disposable, non-critical temporary data with no redundancy requirement.
13. **RAID 5.** It balances fault tolerance for a single drive failure against reasonable storage efficiency, fitting a limited budget when paired with a genuine separate backup.
14. **Yes, data is still accessible**, running in a degraded state. **The failed drive should be replaced promptly** so the array can rebuild and restore full redundancy.
15. **Yes, data remains accessible after losing two drives** — that is exactly what RAID 6 is designed to tolerate. **A third failure before replacement, however, would exceed RAID 6's fault tolerance** and result in data loss.
16. **No.** RAID 1 faithfully mirrors the deletion to the second drive just as reliably as it mirrors everything else — RAID protects against drive hardware failure, not user error, and only a genuine backup would allow recovery of the deleted folder.
