---
title: "A+ Core 1 3.5: Cooling"
description: "A+ Core 1 3.5 — fans and airflow, passive cooling, heat sinks, thermal paste vs pads, and liquid cooling."
tags: ["a-plus", "comptia", "messer", "hardware", "cooling", "fans", "heat-sink", "thermal-paste", "liquid-cooling"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "Cooling"
moduleOrder: 82
unit: 3
---

> **In one line:** move heat out with airflow and fans, spread it with finned heat sinks (bonded by thermal paste or a pad), go fanless for silence, or use liquid cooling for hot/overclocked builds.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the Cooling class notes; the section overview is the Section 3 sheet.

## Cooling methods

| Method | What / when |
| --- | --- |
| Airflow | Cool air in one side, hot out the other; keep cables clear |
| Case fans | **80 / 120 / 200 mm**, often variable speed (faster = louder) |
| Card fans | On larger cards (high-end GPUs) |
| Passive (fanless) | Silent — set-top boxes, media servers, appliances; uses a heat sink |
| Heat sink | Fins increase surface area; air carries heat off (gets very hot — burn risk) |
| Liquid cooling | Block on CPU → pipes → radiator + fans → coolant loop; high-end/gaming/overclocking |

## Thermal interface material

| | Thermal paste | Thermal pad |
| --- | --- | --- |
| Also called | Thermal/conductive grease | — |
| Amount | **Pea-sized** (spreads under pressure) | Pre-cut pad |
| Effectiveness | Best | Slightly less |
| Mess/leak | Can squeeze out | Cleaner, no leak |
| Reusable? | **No** | **No** |

- **Not an adhesive:** paste fills gaps for heat transfer; the heat sink is held by **clips/brackets**, not glued. (Separate "thermal adhesive" does bond.)
- **Beyond scope:** most paste is electrically **non-conductive**; **liquid-metal** paste *is* conductive and can short parts.

## The CPU stack

```
Fan  ->  Heat sink  ->  Thermal paste/pad  ->  CPU
(top)                                          (bottom, hot part)
```

## 🔐 Security notes

- **Cooling = availability:** a failed fan/pump, dust, or dried paste causes **thermal throttling**/shutdown (self-inflicted DoS) and can **mask or mimic** compromise — monitor temps (BIOS sensors/OS tools) to tell a cooling fault from an attack.
- **Fans/heat are covert channels:** on air-gapped machines, data can leak via fan speed/noise (**Fansmitter**) or temperature (**BitWhisper**) — niche but real.
- **Data-centre HVAC is attack surface:** interfering with cooling downs systems without touching them.

## Practice drills

<details>
<summary>1. How does airflow cool a case?</summary>

Cool air in one side, over the warm components, hot air out the other — keep cables/clutter out of the path.
</details>

<details>
<summary>2. Three common case-fan sizes?</summary>

80 mm, 120 mm and 200 mm.
</details>

<details>
<summary>3. What is passive cooling and where does it suit?</summary>

Fanless cooling (with a heat sink) — silent, for set-top boxes, media servers and appliances.
</details>

<details>
<summary>4. How does a heat sink work?</summary>

It spreads heat over fins to increase surface area; passing air carries the heat away.
</details>

<details>
<summary>5. How much thermal paste, and is it reusable?</summary>

A pea-sized blob (it spreads under the heat sink); not reusable — replace it when you remove the heat sink.
</details>

<details>
<summary>6. When would you use a thermal pad instead of paste?</summary>

When worried about paste leaking onto other components — pads are cleaner but slightly less effective (also single-use).
</details>

<details>
<summary>7. What is in a liquid cooling loop, and when is it used?</summary>

A block on the CPU, pipes, a radiator with fans, and a coolant loop — for high-end, gaming and overclocked systems.
</details>

## Key takeaways

- **Airflow + fans** are the baseline; card fans on big GPUs; case fans **80/120/200 mm**, variable speed (noise trade-off).
- **Passive = silent** (heat sink, appliances); **heat sinks** spread heat over fins — and get hot.
- **Paste** (pea-sized, single-use, not glue) vs **pad** (cleaner, no leak, slightly weaker).
- **Stack:** CPU → paste/pad → heat sink → fan. **Liquid cooling** for hot/overclocked builds.
- **Security:** cooling failure = DoS that can mimic compromise — monitor temperatures.
