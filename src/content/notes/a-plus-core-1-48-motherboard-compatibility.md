---
title: "A+ Core 1 3.5: Motherboard Compatibility — Class Notes"
description: "Full class notes for A+ Core 1 3.5: Intel vs AMD sockets, installing a CPU, and multisocket server motherboards."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "motherboard", "cpu", "sockets", "intel", "amd", "server"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> fourth lesson under objective **3.5** ("install and configure motherboards,
> CPUs, and add-on cards"), joining Motherboard form factors, expansion slots
> and connections. Here the theme is *compatibility*: matching a board to a CPU,
> fitting the CPU, and what makes a server board different.

## Learning objectives

By the end of these notes you should be able to:

1. Name the two major PC CPU makers and describe the traditional (and shifting)
   difference between them.
2. Explain why the CPU brand dictates the motherboard, and why Intel and AMD
   boards are not interchangeable.
3. Install a CPU into its socket safely, without force.
4. List the features that distinguish a server motherboard from a desktop one.

## 1. Intel and AMD

In the world of personal-computer CPUs there are two major companies: **Intel**
and **AMD**. Both make processors that do the same job and run the same
software, but there are subtle differences between the two.

The traditional shorthand is that **AMD** is the lower-cost option and **Intel**
the higher-performing one, so a build chasing the lowest price might lean AMD.
That description is very generalised, though, and it does not stay put: because
the two compete directly, you will often find Intel offering the better-priced
part in a given segment, or AMD offering the better-performing one. The "who is
cheaper / who is faster" crown moves back and forth between generations.

> **In the real world:** never buy on the old stereotype alone. Compare the
> specific two parts you are choosing between for the workload in front of you —
> the generalisation is a starting point, not a decision.

## 2. Sockets decide the board

Intel and AMD processors are physically similar in size, but the **connectivity
on the motherboard is different** for each. The CPU plugs into a **socket**, and
Intel and AMD use *different* sockets. That single fact drives the core
compatibility rule:

- Planning to use an **AMD** CPU? You need a motherboard with an **AMD socket**.
- Planning to use an **Intel** CPU? You need a motherboard with an **Intel
  socket**.

You cannot mix them: an Intel chip will not fit an AMD board, or vice versa. The
CPU you choose therefore chooses the motherboard for you.

```
CPU brand decides the board:

     Intel CPU  --needs-->  board with an Intel socket
     AMD CPU    --needs-->  board with an AMD socket

     Intel CPU  --X-->  AMD board     (won't fit)
     AMD CPU    --X-->  Intel board   (won't fit)
```

> **Note (beyond this lesson):** sockets also differ in *style*. Intel desktop
> sockets are **LGA** (Land Grid Array — the pins are in the socket, flat lands
> on the chip). AMD used **PGA** (Pin Grid Array — pins on the chip) for many
> years on AM4, and moved to LGA with AM5. The exam here only asks you to match
> brand to socket, but the LGA/PGA distinction is worth knowing for handling
> chips carefully.

## 3. Installing the CPU

Whichever brand you use, fitting the CPU is straightforward and, crucially,
**requires no force**. Most sockets are zero-force designs: you rest the CPU on
top of the socket in its correct orientation, close the retaining cover, and lock
it down with the lever or handle provided. You should never press hard or push
the chip in — if it needs force, something is misaligned.

> **Caution:** modern sockets have delicate pins (in the socket for Intel/AM5,
> on the chip for older AMD). A dropped or forced CPU bends pins, which is often
> fatal to the board or chip. Line up the orientation marker, let it drop into
> place under its own weight, then close and latch.

## 4. Server motherboards

Desktops, laptops and workstations almost always have a **single** processor.
Servers are different: when you need far more processing power, you reach for a
**multisocket** board — one motherboard that physically holds **more than one
CPU**. The example board Messer shows carries **two** physical CPUs.

Server boards scale up the other resources to match:

- **Memory:** many more RAM slots — **at least four, often six or more** — to
  maximise the RAM a single system can hold.
- **Expansion:** plenty of expansion slots, so the server can be tailored to its
  role (storage controllers, extra networking, accelerators).
- **Form factor and mounting:** server boards are built to fit a **19-inch
  rack**, and so tend to use large, **full-size ATX**-style boards.

```
Dual-socket server board (schematic):

+-------------------------------------------+
|  [DIMM][DIMM][DIMM]    [DIMM][DIMM][DIMM]  |
|                                           |
|      +---------+          +---------+      |
|      |  CPU 0  |          |  CPU 1  |      |
|      +---------+          +---------+      |
|                                           |
|  [== PCIe ==] [== PCIe ==] [== PCIe ==]    |
+-------------------------------------------+
   Two physical CPUs, six memory slots, several
   expansion slots; large board built for a rack.
```

> **Note (beyond this lesson):** two things the transcript simplifies. First,
> dual-socket boards are frequently *larger* than standard ATX — variants such
> as E-ATX or SSI-EEB — even though they mount in the same rack chassis. Second,
> server RAM is usually **ECC** (see the Memory technologies lesson, 3.3),
> because a server prizes data integrity over cost.

### 4.1 Worked example — spec by workload

Three requests, three answers, all from the same compatibility logic.

1. **Cheapest capable office desktop.** Pick the best-value CPU today (could be
   Intel *or* AMD — check current prices), then a board with the matching
   socket. Single socket, a couple of RAM slots, one or two expansion slots.
2. **High-core-count render workstation.** Choose the strongest single CPU for
   the budget, matching-socket board, four RAM slots for headroom, a long PCIe
   x16 slot for the GPU.
3. **Virtualisation host with lots of RAM and cores.** This wants a **server**
   board: **dual socket** for CPU count, six-plus DIMM slots (ECC) for memory,
   several expansion slots, full-size and rack-mountable.

The through-line: decide the CPU (or CPUs) the workload needs, and the socket,
RAM-slot count and form factor follow from there.

## 5. Security perspective

A compatibility lesson is light on direct security, but the platform choices it
describes carry a defender's footnotes:

- **The CPU platform is also a firmware platform.** Both vendors ship low-level
  management and microcode that live below the operating system (Intel's
  Management Engine, AMD's Platform Security Processor). Fixes for CPU-level
  vulnerabilities and microcode updates reach you through the **board vendor's
  BIOS/UEFI updates**, so "which socket/board" quietly decides how you receive
  those patches. Keep firmware current, not just the OS.
- **Server boards usually add out-of-band management.** Most server motherboards
  include a **BMC** (baseboard management controller, reached over **IPMI** or a
  vendor web interface) that can power the machine on or off, mount virtual
  media and see the console — independently of the OS, sometimes on its own
  network port. That is enormously useful and an enormous attack surface:
  exposed or default-credentialled BMCs are a well-worn route to full control.
  Put management interfaces on an isolated network, change defaults, and patch
  them like any other host.
- **Multisocket means concentration.** A single server board can run many
  workloads (often virtual machines) at once, so one compromised host or a
  physical-access attack on it reaches far more than a desktop would. Physical
  and firmware controls matter more, not less, on these boxes.

## Summary

- **Two CPU makers:** **Intel** and **AMD**; the old "AMD cheaper, Intel faster"
  line is a generalisation that shifts generation to generation.
- **Sockets differ by brand:** an AMD CPU needs an AMD-socket board, an Intel CPU
  needs an Intel-socket board — **not interchangeable**. The CPU chooses the
  board.
- **Install with no force:** rest the CPU in the socket, close the cover, lock
  the lever.
- **Server boards** are **multisocket** (more than one physical CPU), with **many
  RAM slots (4, 6 or more)**, plenty of expansion, and are built large and
  **rack-mountable**.

## Glossary

| Term | Meaning |
| --- | --- |
| CPU | Central Processing Unit; the main processor. |
| Intel | One of the two major PC CPU makers. |
| AMD | The other major PC CPU maker. |
| Socket | The board connector a CPU plugs into; brand-specific. |
| Compatibility rule | AMD CPU needs an AMD socket; Intel CPU an Intel socket. |
| Zero-force install | Seating a CPU with no pressure, then latching a cover. |
| Retaining lever | The handle that locks the CPU cover down. |
| LGA | Land Grid Array; pins in the socket (Intel, AMD AM5). |
| PGA | Pin Grid Array; pins on the chip (older AMD). |
| Multisocket | A board holding more than one physical CPU. |
| Server motherboard | A board with multisocket, many RAM/expansion slots, rack-fit. |
| DIMM slot | A memory slot; servers have many. |
| ECC | Error-correcting memory, usual on servers. |
| 19-inch rack | Standard rack width server boards are built to fit. |
| BMC / IPMI | Out-of-band server management controller and its protocol. |

## Review questions

1. Name the two major PC CPU manufacturers.
2. State the traditional price/performance stereotype, and why you should not
   rely on it.
3. Why does the CPU brand determine which motherboard you buy?
4. Can an Intel CPU be fitted to a board with an AMD socket? Explain.
5. Describe the correct way to install a CPU.
6. What should you never do when seating a CPU, and why?
7. What does "multisocket" mean, and where do you find such boards?
8. Give two ways a server motherboard scales up resources beyond a desktop
   board.
9. What form factor and mounting do server boards tend to use, and why?
10. Scenario: a customer wants the cheapest capable desktop. What is the right
    way to choose the CPU and board?
11. Scenario: you are building a virtualisation host needing many cores and lots
    of RAM. What kind of motherboard, and what two features matter most?
12. Beyond this lesson: name the two socket styles and which vendor uses each.

## Answer key

1. **Intel and AMD.** The two dominate PC CPUs.
2. **"AMD cheaper, Intel faster" — but it is generalised and the lead switches
   between generations, so compare the actual parts.** The stereotype is a
   starting point only.
3. **Intel and AMD use different sockets, so the CPU only fits a board with its
   matching socket.** The chip chooses the board.
4. **No — Intel and AMD sockets are physically different, so it will not fit.**
   Brands are not interchangeable.
5. **Rest it in the socket in the correct orientation, close the cover, and lock
   the lever — no force.** Alignment, not pressure.
6. **Never force it or press hard — that bends pins and can ruin the chip or
   board.** Force means misalignment.
7. **More than one physical CPU on one board; on server motherboards.** For
   extra processing power.
8. **Many more RAM slots (4, 6 or more) and multiple expansion slots (also
   multisocket) — any two.** Scaled for server workloads.
9. **Large, full-size ATX-style boards built to fit a 19-inch rack.** Racks are
   the server's home.
10. **Pick the best-value CPU available right now (Intel or AMD — check current
    prices), then a board with the matching socket.** Value first, then match.
11. **A server (multisocket) board; dual-plus CPU sockets and many RAM slots
    (ideally ECC) matter most.** Cores and memory drive the choice.
12. **LGA (Intel, and AMD AM5) has pins in the socket; PGA (older AMD) has pins
    on the chip.** Handle whichever has exposed pins with care.
