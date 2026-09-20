---
title: Ultimate Cheatsheet
description: "The living sheet: commands, encodings and hardware facts from every source, hyperlinked to the broken-down resource notes."
tags:
  - computing-fundamentals
  - linux
  - powershell
  - git
draft: false
updated: 2026-09-18
category: ultimate
pinned: true
kind: ultimate
---

Keep adding here. Each heading is a topic I keep needing; the links go to the resource tab (book or course) and the module or chapter sheet.

## Codes, bits and number systems

- A **code** is an agreed mapping. With 2 symbols and *n* positions you get **2ⁿ** combinations.
- Morse is variable-length (needs gaps). Braille is fixed-length (6 dots = 64 cells).
- Place value: `value = Σ (digit × base^position)`. In every base, the base itself is written `10`.
- Decimal → other base: divide, read remainders **up**. Binary → octal/hex: group bits in **3s / 4s**.
- Powers of two worth knowing: 8, 16, 32, 64, 128, 256, 1024, 65536.

Full notes: [Codes & Combinations](/cyber_lab_log/resources/code-2nd-ed/codes-and-combinations) · [Number systems](/cyber_lab_log/resources/code-2nd-ed/number-systems-and-bases) · [Bits, bytes & encoding](/cyber_lab_log/resources/code-2nd-ed/bits-bytes-and-character-encoding) · [Computing fundamentals overview](/cyber_lab_log/resources/computing-fundamentals/computing-fundamentals-binary-and-cpus)

## Electricity, gates and arithmetic

- Circuit must be closed. **Ohm:** `V = I × R`. Series switches = AND; parallel = OR.
- A **relay** is a switch thrown by electricity — circuits controlling circuits.
- Gates: NOT, AND, OR, NAND, NOR, XOR. NAND (or NOR) is universal (De Morgan).
- Half adder: Sum = XOR, Carry = AND. Full adder takes Carry In. Two's complement = invert + 1.

Full notes: [Electricity & gates](/cyber_lab_log/resources/code-2nd-ed/electricity-switches-relays-and-gates) · [Binary arithmetic](/cyber_lab_log/resources/code-2nd-ed/binary-arithmetic-adders-and-twos-complement)

## Memory and the CPU

- Combinational logic has no memory. Feedback (R-S, then D flip-flop) holds a bit.
- Edge-triggered D flip-flop: capture D on the clock edge, hold otherwise. *n* of them = a register.
- RAM: *n* address lines → 2ⁿ locations. SRAM (cache) vs DRAM (main, needs refresh).
- Stored-program: instructions are numbers in the same RAM. Loop: **fetch → decode → execute**.
- JMP / JZ are goto / if. CALL / RET + stack are functions.

Full notes: [Flip-flops & RAM](/cyber_lab_log/resources/code-2nd-ed/feedback-flip-flops-clocks-and-memory) · [Building a CPU](/cyber_lab_log/resources/code-2nd-ed/building-a-cpu) · [Peripherals, OS & coding](/cyber_lab_log/resources/code-2nd-ed/peripherals-operating-systems-and-coding)

## Hardware, help desk, TryHackMe

- ESD first. Isolate the failing part; cheapest/easiest test first.
- Help desk is the front door of IT — deploy, administer, support.
- THM Pre-Security: computer parts, networking vocab, Windows vs Linux at a glance.

Full notes: [PC hardware](/cyber_lab_log/resources/pc-hardware-repair/pc-hardware-and-repair) · [Help desk](/cyber_lab_log/resources/it-fundamentals/it-fundamentals-and-help-desk) · [TryHackMe Pre-Security](/cyber_lab_log/resources/tryhackme/Try_Hack_Me)

## Linux command line

Working through *The Linux Command Line* (Shotts). Commands and abbreviations live on the resource sheet; playground screenshots live under Full Picture.

Full notes: [Linux commands](/cyber_lab_log/resources/the-linux-command-line/linux_command_line) · [Full picture: Playground](/cyber_lab_log/full-picture/linux-command-line-playground)

## PowerShell

Microsoft Learn / *Month of Lunches*. The broken-down sheet is the commands; Full Picture is the labs with screenshots.

Full notes: [PowerShell commands](/cyber_lab_log/resources/learn-windows-powershell/Windows_Power_Shell) · [Full picture: Learn Windows PowerShell](/cyber_lab_log/full-picture/learn-windows-powershell)

## Git (recovery)

Everyday commands I remember. These are the ones I look up when panicking:

- `reset` rewrites history; `revert` adds a cancelling commit (use revert if others have pulled).
- `git log -S` searches the content of diffs.
- `reflog` recovers work that was committed then “lost”.
- Prefer `--force-with-lease` over `--force`.

Full notes: [Git recovery](/cyber_lab_log/resources/git/git)

## FFmpeg

Options **before** `-i` apply to the input; options after apply to the output.

Full notes: [FFmpeg commands](/cyber_lab_log/resources/ffmpeg/ffmpeg)

## Reading list

Month-by-month books and platforms: [Reading list](/cyber_lab_log/resources/reading-list/Resource_List)
