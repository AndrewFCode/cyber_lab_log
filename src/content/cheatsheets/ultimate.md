---
title: "The Ultimate IT & Cyber Cheat Sheet"
description: "The short version of everything I study — key commands and facts by topic, each linking to the full chapter notes."
tags: ["cheat-sheet", "powershell", "linux", "windows", "networking", "hardware"]
draft: false
updated: "2026-09-24"
kind: "ultimate"
pinned: true
---
> **In one line:** the short version of everything, by topic — follow **Full notes →** for the chapter that explains it.

- **Topics stay short:** the handful of things you reach for most. Detail lives in the resource sheets.
- **Tags** like `MoL 5` or `A+1 D2` say where each topic comes from.
- **The list at the bottom is generated automatically** from the resource sheets, so it never needs editing by hand.

---

## Rosetta stone

| Task | PowerShell | Bash | CMD |
|---|---|---|---|
| Where am I? | `Get-Location` (`pwd`) | `pwd` | `cd` |
| List (incl. hidden) | `Get-ChildItem -Force` | `ls -la` | `dir /a` |
| Change directory | `Set-Location` (`cd`) | `cd` | `cd` (`cd /d` changes drive) |
| Make directory | `New-Item -ItemType Directory` (`mkdir`) | `mkdir -p` | `mkdir` |
| Copy / move / rename | `Copy-Item` / `Move-Item` / `Rename-Item` | `cp` / `mv` / `mv` | `copy` / `move` / `ren` |
| Delete | `Remove-Item` (`-Recurse`) | `rm` (`-r`) | `del` / `rmdir /s` |
| Show a file | `Get-Content` (`cat`) | `cat` / `less` | `type` |
| Follow a log | `Get-Content f -Tail 10 -Wait` | `tail -f f` | — |
| Search text | `Select-String` | `grep` | `findstr` |
| Help | `Get-Help x` | `man x` / `x --help` | `x /?` |
| What is this command? | `Get-Command x` | `type x` | `where x` |
| Who am I? | `whoami` | `whoami` / `id` | `whoami` |
| Env variable | `$env:PATH` | `echo $PATH` | `echo %PATH%` |
| Processes / kill | `Get-Process` / `Stop-Process -Id` | `ps aux` / `kill` | `tasklist` / `taskkill /PID` |
| Output to file / discard errors | `>` `>>` / `2>$null` | `>` `>>` / `2>/dev/null` | `>` `>>` / `2>nul` |
| Link status | `Get-NetAdapter` | `ip -br link` | `netsh interface show interface` |
| IP addresses | `Get-NetIPAddress` | `ip -br addr` | `ipconfig` |
| Routing table | `Get-NetRoute` | `ip route` | `route print` |
| ARP / neighbour cache | `Get-NetNeighbor` | `ip neigh` | `arp -a` |
| Listening ports | `Get-NetTCPConnection -State Listen` | `sudo ss -tlnp` | `netstat -ano \| findstr LISTENING` |
| Test a TCP port | `Test-NetConnection host -Port 443` | `nc -zv host 443` | — |
| IPv6 neighbours | `Get-NetNeighbor -AddressFamily IPv6` | `ip -6 neigh` | `netsh interface ipv6 show neighbors` |
| Show MTU | `Get-NetIPInterface` | `ip link` | `netsh interface ipv4 show subinterfaces` |
| Test the MTU (don't fragment) | `Test-Connection host -MtuSize` (PS 7) | `ping -M do -s 1472 host` | `ping -f -l 1472 host` |
| Clear the ARP cache | `Remove-NetNeighbor -InterfaceAlias 'Ethernet'` | `sudo ip neigh flush dev eth0` | `arp -d *` |
| Interface error counters | `Get-NetAdapterStatistics` | `ip -s link` | `netstat -e` |
| MAC address of each NIC | `Get-NetAdapter` | `ip link` | `getmac /v` |
| Set a static IPv4 address | `New-NetIPAddress -InterfaceAlias Ethernet -IPAddress <ip> -PrefixLength 24 -DefaultGateway <gw>` | `sudo ip addr add <ip>/24 dev eth0` (until reboot) | `netsh interface ip set address name="Ethernet" static <ip> <mask> <gw>` |
| Ping a host | `Test-Connection host` | `ping -c 4 host` | `ping host` |

---

## PowerShell

### Versions and hosts `MoL 1–2`

- **Which version?** `$PSVersionTable.PSVersion`. `PSEdition`: `Desktop` = 5.1, `Core` = 7. `powershell.exe` is 5.1; `pwsh.exe` is 7.
- **Where am I running?** `$Host.Name` names the host (console, VS Code), and each host has its own `$PROFILE`.
- **Elevated?** Look for "Administrator:" in the title bar, or run `whoami /groups | Select-String 'High Mandatory'`.
- **History:** `F8` / `Ctrl+R` search it. It's saved in plain text: `(Get-PSReadLineOption).HistorySavePath`.

**Full notes →** [Ch. 1 Before you begin](/cyber_lab_log/resources/powershell/1/) · [Ch. 2 Meet PowerShell](/cyber_lab_log/resources/powershell/2/)

### Help `MoL 3`

- `Update-Help` first. 5.1 needs admin; 7 uses `-Scope CurrentUser`.
- `help <cmd> -Examples` · `-Full` · `-Online` · `help *keyword*` · `Get-Command -Noun *x*`.
- **Syntax brackets:** fully bracketed = optional · bracketed name only = positional · no type = switch · `[]` after the type = takes several values.

**Full notes →** [Ch. 3 Using the help system](/cyber_lab_log/resources/powershell/3/)

### Running commands and execution policy `MoL 4`

- **Name shortcuts:** truncate parameter names (`-disp`) · parameter aliases (`-ea`, `-vb`) · positional parameters.
- **Running things:** `&` for quoted paths · `.\` for the current folder · `--%` passes awkward arguments raw.
- **Execution policy:** `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`. It's **not** a security boundary.

**Full notes →** [Ch. 4 Running commands](/cyber_lab_log/resources/powershell/4/)

### Providers, items and the registry `MoL 5`

- **Provider vs PSDrive:** a provider is the mechanism exposing a data store as a filesystem; a PSDrive is one mounted instance of it (`C:`/`D:` are both FileSystem). `Get-PSProvider` lists providers, `Get-PSDrive` lists drives.
- **Drives:** `C:` · `HKCU:` / `HKLM:` · `Env:` · `Cert:` · `Variable:` · `Function:` · `Alias:` · `WSMan:`. **Registry, Certificate and WSMan providers are Windows-only** — only the other five exist on Linux/macOS PowerShell 7.
- **Cmdlet families:** `*-Item` · `*-ChildItem` · `*-ItemProperty` · `*-Location` · `Test-Path` (works against any provider).
- **Registry:** keys are containers/items (`*-Item`/`*-ChildItem`), values are item properties (`*-ItemProperty`) — `Get-ItemProperty 'HKCU:\Control Panel\Desktop'`.
- **Brackets in names:** `-LiteralPath` for names containing `[ ]` — mutually exclusive with `-Path`.
- **`New-PSDrive`** makes a custom shortcut drive against any provider; **session-scoped by default**, gone when the session ends.

**Full notes →** [Ch. 5 Working with providers](/cyber_lab_log/resources/powershell/5/)

### The pipeline `MoL 6`

- **Pipeline passes objects, not text** — properties stay intact stage to stage, unlike a traditional shell's text pipeline. This is why `Where-Object`/`Sort-Object`/`Select-Object` need no parsing.
- **Export:** `Export-Csv` (flat, external tools, loses nested structure) vs `Export-Clixml`/`Import-Clixml` (preserves structure, PowerShell-to-PowerShell reuse).
- **Output:** `Out-File` captures **display text**; `Out-Printer` (Windows-only, reintroduced PS7) prints; `ConvertTo-Html` only makes HTML text — still needs `Out-File` to save.
- **`Stop-Process`/`Stop-Service`:** immediate, no undo. Always `-WhatIf` first on an unfiltered or wildcard pipeline before running for real.
- **The #1 pipeline mistake:** `Format-*` cmdlets **must go last** — they produce display-only objects, so filtering/sorting/exporting after one silently breaks.

**Full notes →** [Ch. 6 The pipeline](/cyber_lab_log/resources/powershell/6/)

---

## Linux and Bash

### Shell and navigation `TLCL 1–2`

- **The prompt:** `user@host:dir$`. A `#` means root.
- **Keys:** `↑` for history. `Ctrl+C` interrupts — copy with `Ctrl+Shift+C`.
- **Moving around:** `pwd` · `ls` · `cd` / `cd -` / `cd ~` / `..`. Absolute paths start with `/`.
- **Filenames:** hidden files start with `.`, names are case-sensitive, avoid spaces.

**Full notes →** [Ch. 1 The shell](/cyber_lab_log/resources/linux/1/) · [Ch. 2 Navigation](/cyber_lab_log/resources/linux/2/)

### Exploring the system `TLCL 3`

- **`ls` flavours:** `ls -la` · `ls -lh` · `ls -ltr` (newest last) · `ls -ld dir`.
- **Identify and read:** `file x` identifies by content. `less x`: `Space`/`b` to page, `/` to search, `G`/`g` for end/start, `q` to quit.
- **Key directories:** `/etc` config · `/var/log` logs · `/home` users · `/tmp` scratch · `/proc` live processes · `/usr/bin` programs.

**Full notes →** [Ch. 3 Exploring the system](/cyber_lab_log/resources/linux/3/)

### Files, wildcards and links `TLCL 4`

- **Wildcards:** `*` · `?` · `[abc]` · `[!abc]` · `[[:digit:]]`. Test with `ls` before `rm`.
- **Key options:** `cp -r` / `-u` / `-a` · `mv -i` · `rm -r` / `-i` (no undo) · `mkdir -p`.
- **Links:** `ln -s target link` makes a symlink; `ln file link` makes a hard link (same inode, no directories).

**Full notes →** [Ch. 4 Manipulating files](/cyber_lab_log/resources/linux/4/)

### Learning about commands `TLCL 5`

- **Identify:** `type -a x` (the truth) · `which x` (disk only).
- **Read the docs:** `help` for builtins · `x --help` · `man x` / `man 5 x` · `apropos word`.
- **Aliases:** `alias name='cmd; cmd'` — session only unless added to `~/.bashrc`.

**Full notes →** [Ch. 5 Working with commands](/cyber_lab_log/resources/linux/5/)

### Redirection and pipelines `TLCL 6`

- **Streams:** stdin 0 · stdout 1 · stderr 2. `>` overwrite (truncates **before** the command runs) · `>>` append · `2>` errors · `&>` both (bash only) · `2>/dev/null` discard · `<` input.
- **Order matters:** write `> file 2>&1`, not `2>&1 > file`. `/dev/null` hides the message, not the exit status.
- **Grouping:** `{ cmd; cmd; } > file` keeps side effects · `( cmd; cmd ) > file` runs in a subshell and discards them.
- **Filters:** `|` (stdout only) · `sort | uniq -c` (needs sorted input) · `grep -i` / `-v` / `-o` · `head` / `tail -n` / `tail -f` · `wc -l` · `tee` writes to a file **and** passes data on · `cat -` = stdin here.
- **Traps:** `sort f > f` empties it (use `sort -o f f`) · `echo x | sudo tee /etc/f` writes where `sudo echo x > /etc/f` can't.

**Full notes →** [Ch. 6 Redirection](/cyber_lab_log/resources/linux/6/)

### Expansion and quoting `TLCL 7`

- **Expansions:** pathname `*` `?` `[abc]` · `~` / `~user` · `$((2+2))` · `{a,b}` / `{01..12}` · `$VAR` / `${VAR}` · `$(cmd)`. The program never sees them — **preview with `echo`**.
- **Globs:** existing files only · skip dotfiles · sorted as text (`data10` before `data2`) · no match = pattern passed through literally.
- **Gotchas:** `$(( ))` is integers only (`7/2` = 3) · unset `$VAR` is **silently empty** (`rm -rf $DIR/*` → `/*`; use `set -u`) · `~nosuchuser` stays literal.
- **Quoting:** `"..."` blocks globbing and word splitting but still runs `$VAR`, `$(( ))`, `$(cmd)` · `'...'` is fully literal and **can't contain a single quote** · `\` escapes one character.
- **Always quote variables:** `"$var"` — `ls $f` on `two words.txt` becomes two arguments. `printf` beats `echo -e` for `\n` / `\t`.

**Full notes →** [Ch. 7 Seeing the world as the shell sees it](/cyber_lab_log/resources/linux/7/)

### Users, permissions and processes `THM 3`

- **Who and what:** `whoami` / `id` · `sudo cmd` · `uname -a` · `cat /etc/os-release`.
- **Processes:** `ps aux` · `top` · `kill PID` (`-9` as a last resort).
- **Permissions:** `chmod 755` / `644` / `600` / `u+x` · `chown user:group` · r=4 w=2 x=1.
- **Key files:** `/etc/passwd` is world-readable; `/etc/shadow` (hashes) is root-only.

**Full notes →** [TryHackMe module 3](/cyber_lab_log/resources/tryhackme/3/)

---

## Windows Command Prompt `THM 3`

- **Identity and system:** `whoami /priv` · `hostname` · `systeminfo` · `ipconfig /all`.
- **Processes:** `tasklist /svc` · `taskkill /PID n /F`.
- **Accounts:** `net user` · `net localgroup administrators`.
- **In PowerShell,** type `where.exe`, because `where` means `Where-Object` there.

**Full notes →** [TryHackMe module 3](/cyber_lab_log/resources/tryhackme/3/)

### Windows tools `THM 3`

- **`Win+R` shortcuts:**
  - `winver` · `msinfo32` · `taskmgr` · `resmon`
  - `appwiz.cpl` · `sysdm.cpl` · `ncpa.cpl`
  - `services.msc` · `eventvwr.msc` · `compmgmt.msc` · `diskmgmt.msc` · `lusrmgr.msc` · `wf.msc`
- **Defender:** `Get-MpComputerStatus` · `Update-MpSignature` · `Start-MpScan -ScanType QuickScan`.

**Full notes →** [TryHackMe module 3](/cyber_lab_log/resources/tryhackme/3/)

---

## Code, data and computing

### Python, JavaScript and SQL `THM 4`

- **Output and input:** `print()` / `console.log()`. `input()` always returns a string — wrap it in `int()`.
- **Equality in JavaScript:** use `===`, not `==`.
- **SQL:** `SELECT cols FROM t WHERE … ORDER BY … LIMIT n`. `UPDATE` and `DELETE` always need a `WHERE`.
- **Parameterise queries** — never glue input into SQL.

**Full notes →** [TryHackMe module 4](/cyber_lab_log/resources/tryhackme/4/)

### Binary, hex and encoding `TCM 3` `THM 2`

- **Hex and bytes:** one hex digit = 4 bits; one byte = 8 bits = `00`–`FF`.
- **ASCII:** `A` = 65 = `0x41`, `a` = 97 = `0x61`. UTF-8 is ASCII-compatible and uses 1–4 bytes per character.
- **KB vs KiB:** KB = 1,000 bytes, KiB = 1,024 — which is why a 1 TB drive shows ~931 GB.

**Full notes →** [TCM section 3](/cyber_lab_log/resources/tcm-help-desk/3/) · [TryHackMe module 2](/cyber_lab_log/resources/tryhackme/2/)

### How a computer works `Code`

The build-up across *Code*, each stage linking to its chapter:

- **Codes and numbers:** a code maps information to signals ([1](/cyber_lab_log/resources/code/1/)); two symbols in n places give 2ⁿ ([2](/cyber_lab_log/resources/code/2/)); binary suits switches; hex writes a byte as two digits ([10](/cyber_lab_log/resources/code/10/), [12](/cyber_lab_log/resources/code/12/)).
- **Electricity to logic:** circuits and Ohm's law ([4](/cyber_lab_log/resources/code/4/)); relays are electrically-controlled switches ([7](/cyber_lab_log/resources/code/7/)); series = AND, parallel = OR, and gates follow ([6](/cyber_lab_log/resources/code/6/), [8](/cyber_lab_log/resources/code/8/)).
- **Arithmetic:** XOR + AND = a half adder; chain them for a byte ([14](/cyber_lab_log/resources/code/14/)); two's complement handles subtraction and negatives ([16](/cyber_lab_log/resources/code/16/)).
- **Memory and timing:** feedback makes a clock or a flip-flop ([17](/cyber_lab_log/resources/code/17/)); latches in addressed rows make RAM ([19](/cyber_lab_log/resources/code/19/)).
- **A CPU:** ALU + status flags ([21](/cyber_lab_log/resources/code/21/)); registers and busses ([22](/cyber_lab_log/resources/code/22/)); the control unit decodes opcodes ([23](/cyber_lab_log/resources/code/23/)); jumps, the stack and CALL/RET ([24](/cyber_lab_log/resources/code/24/)) — all running **fetch → decode → execute**.
- **The rest of the stack:** peripherals via interrupts and DMA ([25](/cyber_lab_log/resources/code/25/)); the OS managing it all ([26](/cyber_lab_log/resources/code/26/)); languages above machine code ([27](/cyber_lab_log/resources/code/27/)); and everything as bits on a global network ([28](/cyber_lab_log/resources/code/28/)).

**Full notes →** [Code (Petzold), chapters 1–28](/cyber_lab_log/resources/code/)

---

## Hardware

### Components and safety `TCM 4` `THM 2`

- **The core parts:** CPU · RAM (volatile) · storage · motherboard · PSU · GPU · NIC (holds the MAC address).
- **ESD:** unplug, drain the charge, wear a wrist strap on bare metal. **Never open a PSU.**
- **Inspect without opening the case:**
  - Windows: `Get-CimInstance Win32_Processor` / `Win32_PhysicalMemory` · `Get-PhysicalDisk` · `msinfo32`
  - Linux: `lscpu` · `lsblk` · `sudo dmidecode`
- **Laptops:** `powercfg /batteryreport` for battery wear. Suspend BitLocker before firmware work: `Suspend-BitLocker -MountPoint C: -RebootCount 1`.

**Full notes →** [TCM section 4](/cyber_lab_log/resources/tcm-help-desk/4/) · [TCM section 5](/cyber_lab_log/resources/tcm-help-desk/5/) · [TryHackMe module 2](/cyber_lab_log/resources/tryhackme/2/)

### CPU, RAM and storage `TCM 4` `A+1 D3`

- **RAM:** DIMM (desktop) or SODIMM (laptop). DDR3/4/5 aren't interchangeable. ECC is for servers.
- **Storage:** HDD · SATA SSD (~550 MB/s) · NVMe (GB/s). M.2 is a shape, not a speed.
- **RAID 0 / 1 / 5 / 6 / 10:** 0 = none survive · 1 and 5 = one drive · 6 = two · 10 = one per mirror. RAID is not a backup.

**Full notes →** [TCM section 4](/cyber_lab_log/resources/tcm-help-desk/4/) · [A+ Core 1 domain 3](/cyber_lab_log/resources/a-plus-core-1/3/)

### Memory overview `A+1 3.3`

- **RAM ≠ storage.** Temporary, high-speed, volatile — data must be loaded into RAM before the CPU can use it; lost instantly on power-off.
- **DIMM** (Dual Inline Memory Module): independent contacts on **each side**, 64-bit data width (72 with ECC). **SO-DIMM** = ~half size, horizontal, laptops.
- **Random access** = any address instantly, any order — no winding like tape. **SDRAM** = synchronised to a common clock. **DDR** transfers on **both edges** of the clock, doubling throughput over single data rate.
- **DDR3 → DDR4 → DDR5:** each faster, **none backwards-compatible** with the last. DIMM pins: DDR3 240 · DDR4 288 · DDR5 **also 288** — physical **keying** (notch position + voltage), not pin count, is what actually stops a wrong-generation module seating.
- **Won't seat, no matter how you orient it?** Wrong generation — check the notch against the slot, never force it.

**Full notes →** [A+ Core 1 3.3 An overview of memory](/cyber_lab_log/resources/a-plus-core-1/3/)

### Memory technologies `A+1 3.3`

- **Parity vs ECC vs standard:** all look identical — only the spec differs. **Parity** adds 1 bit/byte, **detects but can't correct** an error, typically **halts** the system. **ECC** (~8 extra bits per 64) **detects and corrects**, system keeps running.
- **Even parity rule:** count the 1-bits — even count → parity bit 0, odd count → parity bit 1. On read, recalculate and compare; mismatch = error found (not fixable).
- **Memory bandwidth** in **MT/s** (million transfers/sec, already reflects DDR's double-edge transfer). A single channel has a throughput ceiling — beyond it the CPU sits idle waiting.
- **Multi-channel** (dual/triple/quad) roughly multiplies throughput by running **matched modules** across parallel channels — same type, ideally same make/model, in the correctly **colour-coded** slot pairing (one module per colour, not two of the same).
- **Why two 16 GB beats one 32 GB module:** same capacity, but two channels' worth of throughput instead of one.

**Full notes →** [A+ Core 1 3.3 Memory technologies](/cyber_lab_log/resources/a-plus-core-1/3/)

### Storage devices `A+1 3.4`

- **HDD:** platter + spindle + actuator + arm + read/write head. RPM (5,400/7,200/10,000/15,000) — **higher = lower latency**. Form factors: 3.5" desktop, 2.5" laptop. All mechanical, all can fail.
- **SSD:** non-volatile memory, no moving parts, far faster. Outgrew SATA's **6 Gbps** ceiling → PCIe-connected storage → **NVMe** (Non-Volatile Memory Express, low latency, direct to PCIe, even in laptops). M.2 NVMe ≈ **20 Gbps**. (A single PCIe lane is ~8–16 Gbps depending on gen — high aggregate figures come from a 4-lane x4 link, not one lane.)
- **SAS** (Serial Attached SCSI): serialised SCSI, ~**22.5 Gbps**, connector deliberately different from SATA's near-identical form factor to prevent cross-plugging. Used for large HDD arrays.
- **mSATA** (mini SATA) was a stopgap smaller SATA form factor; **M.2** is now dominant — no cables, full PCIe speed, keyed with **B key / M key / both** notches that determine what fits and what speed is available. Check the slot's key before buying a drive.
- **Flash (EEPROM):** non-volatile but **limited write cycles** — not a sole backup/archive on its own. Formats: USB, CF, SD, miniSD/microSD, xD. **Optical** (CD/DVD/Blu-ray): laser-written bumps, slow but compact, good for archiving.

**Full notes →** [A+ Core 1 3.4 Storage devices](/cyber_lab_log/resources/a-plus-core-1/3/)

### RAID `A+1 3.4`

- **RAID is not backup** — it protects against drive hardware failure only. Deletion, corruption and ransomware replicate across the array just like real data; always run a separate backup.
- **RAID 0 (striping):** data split across ≥2 drives, fastest, 100% usable capacity, **zero redundancy** — lose any one drive, lose everything.
- **RAID 1 (mirroring):** ≥2 drives, full duplicate, **50% usable capacity**, survives losing either drive with no data loss.
- **RAID 5 (striping + parity):** ≥3 drives, one drive's worth of *rotating* parity per stripe, survives **1** lost drive (reconstructed from data + parity, CPU overhead), (n−1) usable capacity.
- **RAID 6:** ≥4 drives, a second independent parity block, survives **2** simultaneous lost drives — the extra drive adds fault tolerance, **not capacity**, (n−2) usable.
- **RAID 1+0 / RAID 10:** ≥4 drives, a stripe of mirrored pairs, survives **one drive per mirrored pair** simultaneously — not both drives of the same pair.

**Full notes →** [A+ Core 1 3.4 RAID](/cyber_lab_log/resources/a-plus-core-1/3/)

### Motherboard, firmware, power and cables `A+1 D3`

- **Boards:** ATX > microATX > Mini-ITX. PCIe x16 for GPUs. CMOS battery = CR2032.
- **Firmware:** UEFI + GPT + Secure Boot + TPM 2.0 is the modern stack.
- **PSU:** converts wall **AC to DC** — mainly +3.3 V (orange), +5 V (red), +12 V (yellow), plus **+5 VSB** standby (wake-on-LAN/power button), −12 V (onboard LAN) and obsolete −5 V. **24-pin** to the board (originally 20-pin; leave the last 4 unconnected on older boards), keyed to fit one way; 8-pin to the CPU. **Watts = volts × amps.** US/Canada 110–120 VAC 60 Hz · Europe 220–240 VAC 50 Hz — old PSUs need a manual switch set *before* connecting (120V-into-230V = overload/failure); modern ones auto-sense. **Size to ~50% load** (target = load ÷ 0.5) for headroom; physical size doesn't change with wattage. Redundant PSUs run ~50/50, hot-swappable, either covers 100% alone. Fixed vs modular cabling. Efficiency 80–96%, **80 PLUS → Bronze → Silver → Gold → Platinum → Titanium**, lowest to highest.
- **Speeds:** USB 1.1 low 1.5 / full 12 Mbps · 2.0 480 Mbps · 3.0 (SuperSpeed) 5 Gbps · 3.1 10 Gbps · 3.2 20 Gbps · USB4 / Thunderbolt 40 Gbps. Cable lengths are **approximate** (~3–5 m; no exact spec maximum) — extend with a powered hub.

**Full notes →** [A+ Core 1 domain 3](/cyber_lab_log/resources/a-plus-core-1/3/)

### Peripheral cables and console access `A+1 3.2`

- **USB connectors:** Standard-A (unchanged in 3.0) · Standard-B (taller in 3.0) · Mini-B · Micro-B (**completely different shape** in 3.0 — a 2.0 cable fits and runs at 2.0 speed).
- **USB-C** is one reversible connector replacing them all, and describes **only the physical interface, not the signal** — USB data, DisplayPort, Thunderbolt or power. Two identical-looking cables can differ wildly, so suspect the cable first.
- **Serial:** DB-25 · DB-9 (properly **DE-9** — the letter is the shell size) carrying **RS-232**. Console ports are **RJ45 (serial, not Ethernet)**, DB-9 or USB, and work **when the network doesn't**. Chain: USB → USB-to-serial (a COM port) → DB-9 → RJ45; terminal usually 9600 8N1.
- **Thunderbolt** carries data **and power** and **daisy chains**. TB1 Mini DisplayPort 2 × 10 = 20 Gbps · TB2 Mini DisplayPort 20 Gbps · TB3 **USB-C** 40 Gbps (3 m copper, 60 m optical) · TB4 USB-C 40 Gbps, dual 4K, more PCIe.

**Full notes →** [A+ Core 1 3.2 Peripheral cables](/cyber_lab_log/resources/a-plus-core-1/3/)

### Video cables `A+1 3.2`

- **HDMI:** audio + video, 19-pin **Type A** (bottom corners indented), passive range roughly 15–25 m (~20 m rule of thumb) — active/optical beyond that.
- **DisplayPort:** audio + video, sent **packetised**; passive adapter to HDMI/DVI needs **DP++**, else active. **Locks in place — press the release button** before pulling. Full-size or **Mini**.
- **DVI: video only.** Letter = signal — **A**nalogue (VGA-compatible), **D**igital, **I**ntegrated (both). **Single link** ~3.96 Gbps / 1920×1200 · **dual link** roughly double. Connectors are pin-specific — match signal type and link type at both ends.
- **VGA: video only, analogue.** **DB-15 (DE-15)**, conventionally blue. Degrades from **~5 m** onward — treat as a caution point, not a hard cutoff.
- **USB-C is a connector, not a signal:** can carry Thunderbolt, DisplayPort (Alt Mode), HDMI or MHL — charging works fine on a cable with zero video support, so check port and cable both.

**Full notes →** [A+ Core 1 3.2 Video cables](/cyber_lab_log/resources/a-plus-core-1/3/)

### Storage cables `A+1 3.2`

- **SATA speeds:** 1.0 1.5 Gbps · 2.0 3 Gbps · 3.0 **6 Gbps** (the number that matters for real drives) · 3.2 16 Gbps via **SATA Express** over PCIe lanes — a different mechanism, not faster native SATA.
- **Two connectors per drive:** 15-pin **power** (longer) · 7-pin **data** (shorter), both keyed. Molex sometimes supported as a fallback.
- **Strictly one-to-one, no daisy chaining** — one cable, one port, one drive. Port count = maximum drive count.
- **eSATA:** external SATA, effectively the same signal, but a **different connector** — not interchangeable. ~2 m cable. Internal SATA data connector has a distinctive **L shape**.
- **Drive missing one boot, present the next?** Reseat/swap the **data cable** before suspecting the drive.

**Full notes →** [A+ Core 1 3.2 Storage cables](/cyber_lab_log/resources/a-plus-core-1/3/)

### Adapters and converters `A+1 3.2`

- **The one rule:** same signal type, different shape → **passive** adapter is enough. Different signal types → needs **active** conversion (processing, sometimes power).
- **DVI-D ↔ HDMI:** both digital, passive, **video only** (no audio). **DVI-A ↔ VGA:** both analogue, passive, officially capped at **640 × 480** (many real adapters do more — check the product). **VGA → DVI-D/DVI-I:** analogue → digital, needs **active** conversion.
- **USB-to-Ethernet:** for thin laptops with no RJ45 — especially useful for network troubleshooting, since wired avoids Wi-Fi as a variable.
- **USB-C-to-USB-A:** for thin laptops with no USB-A, as a longer cable or a compact plug-in adapter.
- **USB hub:** one USB connection, many outputs (USB, SD, HDMI, Ethernet in the lesson's example) — broad coverage, but one point of failure for several capabilities at once.

**Full notes →** [A+ Core 1 3.2 Adapters and converters](/cyber_lab_log/resources/a-plus-core-1/3/)

### Copper connectors `A+1 3.2`

- **RJ11** (6P2C, or 6P4C as **RJ14** for two lines): analogue phone, DSL. **RJ45** (8P8C): Ethernet, serial, more. RJ11 is small enough to be mistakenly plugged into RJ45 — not the reverse.
- **F connector:** threaded coax for cable TV/modem; the coax's own centre conductor **is** the pin. Modem side is female. **DOCSIS** carries the data over that infrastructure.
- **Punchdown block:** insulation displacement — push the wire in, seat with the tool, no crimped connector needed. Fast and cheap for bulk terminations.
- **Molex** (also **AMP Mate-n-Lok**): 4 pins, **12 V and 5 V**, friction-fit, powers fans/drives on older systems.
- **Lightning:** Apple-proprietary, reversible; introduced because Micro-USB (then the standard) lacked the power delivery and reversibility Apple wanted.

**Full notes →** [A+ Core 1 3.2 Copper connectors](/cyber_lab_log/resources/a-plus-core-1/3/)

### Laptops, mobile and printers `TCM 5` `A+1 D1` `A+1 D3`

- **Laptop repair:** battery out first, map the screws, plastic tools. A swollen battery means replace now.
- **Laser printing:** Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning.

**Full notes →** [TCM section 5](/cyber_lab_log/resources/tcm-help-desk/5/) · [A+ Core 1 domain 1](/cyber_lab_log/resources/a-plus-core-1/1/) · [A+ Core 1 domain 3](/cyber_lab_log/resources/a-plus-core-1/3/)

---

## Operating systems and files `TCM 6` `THM 3`

- **Kernel vs user space:** the kernel talks to hardware; apps live in user space.
- **File systems:** NTFS (Windows, permissions) · FAT32 (4 GB file limit) · exFAT (flash drives) · ext4 (Linux) · APFS (macOS).
- **Partition schemes:** MBR is legacy (2 TB, 4 partitions); GPT is modern and pairs with UEFI.
- **Magic numbers:** `MZ` = Windows exe · `7F ELF` = Linux binary · `PK` = ZIP/Office · `%PDF`. Extensions lie; `file` doesn't.

**Full notes →** [TCM section 6](/cyber_lab_log/resources/tcm-help-desk/6/) · [TryHackMe module 3](/cyber_lab_log/resources/tryhackme/3/)

---

## Networking

### Network layers and troubleshooting `NfSA 1` `THM 5`

- **Layers:** 1 physical (signals) · 2 datalink (frames, MAC, switches) · 3 network (packets, IP, routers) · 4 transport (TCP/UDP ports) · then the application.
- **Per hop:** MAC addresses are rewritten at every router; IP addresses stay the same end to end (unless NAT). A frame for a remote host goes to the gateway's MAC.
- **Troubleshoot bottom-up:** link → neighbour (ARP) → ping → port → application. Ping proves layers 1–3 only.
- **Failure clues:** refused = nothing listening · timeout = something dropping · works by IP but not by name = DNS.
- **OSI 5–7:** 5 session (opens, maintains and closes sessions; checkpoints) · 6 presentation (formats, encodes, encrypts) · 7 application (HTTP, DNS, SMTP). Mnemonic 1→7: Please Do Not Throw Sausage Pizza Away.
- **TCP vs UDP:** TCP = connection, numbered, missing parts re-sent (web, email, files) · UDP = no connection or guarantee, faster (DNS, DHCP, NTP, VoIP, live video). Units: segment (4) · packet (3) · frame (2) · bits (1).

**Full notes →** [Ch. 1 Network layers](/cyber_lab_log/resources/networking-sysadmins/1/) · [TryHackMe 5.3 OSI Model](/cyber_lab_log/resources/tryhackme/5/)

### TCP connections, headers and frames `THM 5`

- **Handshake:** SYN (my ISN) → SYN/ACK (server ISN + acks yours) → ACK. Close: FIN, ACK, FIN, ACK. RST = abort (nothing listening, or something broke).
- **Flags:** SYN · ACK · FIN · RST · PSH · URG. There is no "DATA" flag: data rides in ordinary ACK segments.
- **Which header holds what:** IP = source/destination IP, TTL (a hop count, not a timer) · TCP/UDP = source/destination port, checksum · TCP only = sequence and acknowledgement numbers, flags.
- **Frame vs packet:** frame (layer 2, MACs) is the envelope and is rewritten each hop; packet (layer 3, IPs) is the letter and travels end to end.

**Full notes →** [TryHackMe 5.4 Packets and Frames](/cyber_lab_log/resources/tryhackme/5/)

### Ethernet, MTU, ARP and VLANs `NfSA 2` `THM 5`

- **MTU:** 1,500 (jumbo 9,000). Don't-fragment ping data = MTU − 28: `ping -M do -s 1472` · `ping -f -l 1472` · FreeBSD `ping -D -s 1472`. Pings work but big transfers stall = PMTU black hole.
- **Autonegotiation:** leave it on at both ends. Hard-setting one side causes a duplex mismatch (slow, late collisions, CRC errors).
- **ARP and NDP:** the cache only holds local hosts. IPv6 uses Neighbor Discovery (ICMPv6 133–137): `ip -6 neigh` · `Get-NetNeighbor -AddressFamily IPv6` · `ndp -an`.
- **VLANs:** 802.1Q tag, IDs 1–4094. Access port = one untagged VLAN; trunk = many tagged. Crossing VLANs needs a router.
- **Errors:** counters are cumulative since boot — compare two readings before blaming hardware.

**Full notes →** [Ch. 2 Ethernet](/cyber_lab_log/resources/networking-sysadmins/2/) · [TryHackMe 5.2 Intro to LAN](/cyber_lab_log/resources/tryhackme/5/)

### Firewalls, port forwarding and VPNs `THM 5`

- **Stateful vs stateless:** stateful tracks whole connections, so return traffic is allowed automatically and stray packets are dropped (more resources) · stateless matches each packet against static rules (cheap, copes with floods, only as good as the rules).
- **Port forwarding:** set on the router, maps public IP + port to an internal host + port (a NAT rule). It opens a path; the firewall still decides what may travel it. Needs a fixed internal address; test from outside.
- **VPN:** encrypted tunnel joining networks or users across the internet. Privacy on untrusted Wi-Fi; anonymity only as far as the provider's logging.
- **VPN tech:** PPP = link framing and authentication, no encryption · PPTP = obsolete, broken · IPsec = strong, fiddly · modern: IPsec/IKEv2, OpenVPN, WireGuard.

**Full notes →** [TryHackMe 5.5 Extending Your Network](/cyber_lab_log/resources/tryhackme/5/)

### Ports `A+1 D2` `THM 5`

| Port | Protocol | Port | Protocol |
|---|---|---|---|
| 20/21 | FTP | 143 | IMAP |
| 22 | SSH / SFTP | 389 | LDAP |
| 23 | Telnet | 443 | HTTPS |
| 25 | SMTP | 445 | SMB |
| 53 | DNS | 636 | LDAPS |
| 67/68 | DHCP | 3389 | RDP |
| 80 | HTTP | 587 / 993 / 995 | SMTP submission / IMAPS / POP3S |
| 110 | POP3 | | |

Everything except 587 / 993 / 995 is on the 220-1201 list. NetBIOS 137–139 and SNMP 161/162 aren't on it, but still turn up on real networks.

Ranges: 0–1023 well-known · 1024–49151 registered · 49152–65535 dynamic/ephemeral (a client's source port). Standards are conventions: a service on a non-standard port needs `host:port`.

**Full notes →** [A+ Core 1 domain 2](/cyber_lab_log/resources/a-plus-core-1/2/) · [TryHackMe 5.4 Packets and Frames](/cyber_lab_log/resources/tryhackme/5/)

### IPv4, IPv6 and MAC addressing `A+1 D2` `THM 5`

- **IPv4:** 32 bits = four octets of 0–255 · 2³² ≈ 4.29 billion addresses.
- **Private (RFC 1918) + NAT:** `10/8` · `172.16/12` (172.16–172.31 only) · `192.168/16`. NAT lets many private hosts share one public address.
- **IPv6:** 128 bits = eight groups of four hex digits · ≈ 340 undecillion addresses · LANs are `/64` (64-bit prefix + 64-bit interface ID).
- **Shortening:** drop leading zeros; `::` replaces one run of zero groups, once only. `2001:0db8:0000:0000:0000:0000:0000:0001` → `2001:db8::1`.
- **Types:** starts `2`/`3` = global · `fe80::` = link-local (never routed) · `fd` = unique local · `::1` = loopback.
- **MAC:** 48 bits = 12 hex digits (`a4:c3:f0:85:ac:2d`); first 6 = manufacturer (OUI), last 6 = the interface. Set at the factory but spoofable; second digit 2/6/a/e = locally set (often a randomised privacy MAC).

**Full notes →** [A+ Core 1 2.6 IPv4 and IPv6](/cyber_lab_log/resources/a-plus-core-1/2/) · [TryHackMe 5.1 What is Networking?](/cyber_lab_log/resources/tryhackme/5/)

### Addressing, DNS and DHCP `A+1 D2` `THM 5`

- **Assigning:** IP + subnet mask + default gateway (+ DNS) · static = typed on the device (routers, DHCP and DNS servers) · reservation = DHCP always gives one MAC the same IP · dynamic = from the pool. Clients pick up changes at lease renewal.
- **Subnet anatomy (/24):** `.0` = network address (never a device) · `.1`–`.254` = hosts · `.255` = broadcast · gateway usually `.1` or `.254`. Subnetting splits one network into smaller ones (staff vs guest).
- **Special addresses:** `169.254.1.0`–`169.254.254.255` = APIPA (DHCP failed; local segment only; chosen after an ARP probe) · `127.0.0.1` / `::1` = loopback.
- **DNS records:** A · AAAA · CNAME · MX · TXT (SPF / DKIM / DMARC) · PTR.
- **DHCP:** DORA (Discover, Offer, Request, Acknowledge) · scope · lease · reservation · exclusion.
- **Commands:**
  - Addressing: `ipconfig /all` · `ipconfig /release` then `/renew` · `ipconfig /flushdns`
  - DNS lookups: `nslookup -type=mx example.com` · `Resolve-DnsName` · `dig +short`
  - Reachability: `Test-NetConnection host -Port 443`

**Full notes →** [A+ Core 1 domain 2](/cyber_lab_log/resources/a-plus-core-1/2/) · [TryHackMe 5.2 Intro to LAN](/cyber_lab_log/resources/tryhackme/5/)

### Network devices, PoE and ISP handoff `A+1 D2` `THM 5`

- **Forwarding:** hub (layer 1) → switch (layer 2, MAC) → router (layer 3, IP). An access point bridges Wi-Fi to wired by MAC; it doesn't route. Layer 3 switch = switch + routing.
- **Switches:** unmanaged = plug-and-play, one big VLAN, no SNMP or logs · managed = VLANs, QoS, redundancy, port mirroring, SNMP.
- **Firewalls:** traditional = IP, protocol and port rules · next-gen = application-aware. Often also router, VPN concentrator and proxy.
- **PoE at the switch / device:** af 15.4 / 12.95 W · at (PoE+) 30 / 25.5 W · bt (PoE++) 60 / 51 W and 90 / 71.3 W. Switch = endspan, injector = midspan.
- **ISP handoff:** cable modem (coax, DOCSIS) · DSL (phone line, asymmetric, slower with distance) · ONT (fibre in, Ethernet out; marks the demarc).
- **Topologies:** star = central switch (today's default; the switch is the weak point) · bus = one backbone cable (cheap, bottlenecks, one break kills it) · ring = loop, often token passing (one break kills it).

**Full notes →** [A+ Core 1 2.5 Network devices](/cyber_lab_log/resources/a-plus-core-1/2/) · [TryHackMe 5.2 Intro to LAN](/cyber_lab_log/resources/tryhackme/5/)

### Internet connection types `A+1 D2`

- **Satellite:** reaches anywhere, costs more. GEO (~35,786 km) ≈ 600 ms round trip · LEO/Starlink (~550 km) 25–60 ms. Needs line of sight; storms cause **rain fade**.
- **Fibre:** most bandwidth, longest reach, dearest to install and repair. SONET rings and multi-wavelength (DWDM) for WANs; FTTP ends at an ONT (FTTC = fibre to the cabinet, VDSL2 after).
- **Cable:** coax **broadband** (many frequencies on one wire: TV, voice, data) · **DOCSIS** · ~50 Mbps–1 Gbps+ · shared per neighbourhood.
- **DSL:** phone line · **asymmetric** (down ≫ up) · slower with distance from the central office/exchange (exam: within ~10,000 ft).
- **Cellular:** tethering = one device · hotspot = many. **WISP:** outdoor antenna; 802.11 mesh, 5G home or proprietary; ~10–1,000 Mbps.

**Full notes →** [A+ Core 1 2.7 Internet connection types](/cyber_lab_log/resources/a-plus-core-1/2/)

### Network tools `A+1 D2`

- **Build copper:** crimper (RJ45 contacts pierce the insulation; stay clamps the jacket) · punch-down tool seats **and** trims onto a numbered block — keep the twists to the block.
- **Cable tester** = continuity, pin 1–8: finds opens, crossed pairs, shorts. Says nothing about quality (that's a certifier). **Loopback plug** = one interface in isolation, TX back into RX — not a crossover.
- **Tone generator + inductive probe:** trace one cable among hundreds; the probe hears it without touching the copper.
- **Wi-Fi analyser** = 802.11 channels, signal, interference, clients · **spectrum analyser** = all radio energy, so non-Wi-Fi interference too.
- **Capture:** physical tap breaks the link to fit (fibre taps often passive, no power) · **port mirror / SPAN** (Switched Port ANalyzer) copies a switch port with no rewiring, but can drop frames when busy.

**Full notes →** [A+ Core 1 2.8 Network tools](/cyber_lab_log/resources/a-plus-core-1/2/)

### Wireless and cabling `A+1 D2` `A+1 3.2` `A+1 D3` `NfSA 2`

- **Wi-Fi:** 4 = n · 5 = ac · 6/6E = ax · 7 = be. On 2.4 GHz use channels 1, 6 and 11.
- **Twisted pair:** four pairs carrying equal and opposite signals (TX+/TX−), twisted so both wires meet the same interference and the receiver cancels it; **each pair twisted at a different rate**. A cable has no speed — the signalling does, and **IEEE 802.3** sets the minimum category.
- **Copper distances:** 1000BASE-T = Cat 5 minimum (Cat 5 deprecated, buy **5e** = Enhanced), 100 m · 10GBASE-T = Cat 6 **55 m unshielded / 100 m shielded**, or **Cat 6A** (Augmented) 100 m.
- **Shielding code** = overall / per-pair + TP, where **U** unshielded, **S** braid, **F** foil — so S/FTP = braid overall plus foil on each pair, F/UTP = foil overall, pairs bare.
- **Wiring (ANSI/TIA-568; ISO/IEC 11801 internationally):** T568B = W-Or, Or, W-Gn, Bl, W-Bl, Gn, W-Br, Br · **T568A** swaps orange and green. Only pins **1, 2, 3, 6** differ; 4, 5, 7, 8 are identical. B is the usual choice — pick one per site and wire **both ends the same** (A-to-B is the old 10/100 crossover, not a gigabit one, and Auto-MDI-X makes crossovers unnecessary). Keystone jacks print both guides and deliberately don't follow pin order — follow the label.
- **Coax** = inner conductor in an outer shield; on networks, cable modems and digital cable.
- **Where it runs:** **direct burial STP** is waterproof, gel-filled and carries a **drain wire** for ground · **plenum space** (open ceiling void used for return air) needs **plenum-rated** cable — **FEP** or low-smoke PVC, not ordinary PVC.
- **Fibre:** light through a **high refractive index core**, held in by **low-index cladding**, protected by a buffer coating; the **ceramic ferrule** in the connector aligns it (a dirty end face is a top cause of failure). No interference, hard to tap, kilometres without regeneration — but needs specialised kit. **Multimode** = short (~2 km, less at 10G), **LED**, wide core, several modes (paths spread, which limits distance) · **single-mode** = kilometres, **laser**, narrow core, one path. **Connectors:** ST (bayonet twist-lock, largest) · SC (push-pull, middle, simplex or duplex) · LC (spring clip, smallest, dense installs, simplex or duplex) — MTP/MPO also used in data centres. Shape matching ≠ fibre-type matching, check both. Dead link? Swap TX/RX at one end, then clean the end faces.
- **Transceivers:** SFP 1G · SFP+ 10G · SFP28 25G · QSFP28 100G. 10GBASE-SR multimode ~300 m (OM3) · 10GBASE-LR single-mode 10 km.

**Full notes →** [A+ Core 1 domain 2](/cyber_lab_log/resources/a-plus-core-1/2/) · [A+ Core 1 domain 3](/cyber_lab_log/resources/a-plus-core-1/3/) · [Networking ch. 2](/cyber_lab_log/resources/networking-sysadmins/2/)

### Display technologies `A+1 3.1` `A+1 D3`

- **LCD:** backlight → polariser → crystals → colour filter. Light, cheap, low power; **can't show true black** and is unreadable without its backlight (fluorescent on older panels, LED on modern).
- **Panels:** TN = fastest response, colours shift off angle · IPS = best colour, costs more · VA = good colour, slower than TN.
- **OLED:** pixels emit their own light, **no backlight** — thinner, lighter, absolute black; burn-in risk. **Mini LED** = an LCD backlight of many tiny, individually dimmed LEDs (per zone, not per pixel); micro LED is self-emissive and a different thing.
- **Digitizer** converts touch (finger or stylus) into coordinates — display fine but no touch = digitizer. **Inverter** converts DC to AC for **fluorescent** backlights only; usually in the bezel.
- **Torch test:** faint image visible = backlight/inverter · nothing at all = panel, cable or GPU.

**Full notes →** [A+ Core 1 3.1 Display types](/cyber_lab_log/resources/a-plus-core-1/3/)

### Display attributes `A+1 3.1`

- **Pixel density (PPI):** horizontal pixels ÷ **width in inches** (advertised size is the diagonal). 27-inch 4K ≈ 160 PPI · 65-inch 4K ≈ 67 PPI — same resolution, very different sharpness.
- **Refresh rate:** Hz = display redraws per second · FPS = frames in the content · **V-sync** locks them. Film 24 · TV/online 30 · sport and gaming 60+.
- **The card and cable must keep up too:** HDMI 2.1 = 4K up to 144 Hz (120 Hz uncompressed, 144 via DSC) · DisplayPort 2.1 = dual 4K at up to 144 Hz. 144 Hz stuck at 60? Check the cable first.
- **Resolution:** HD 1,920 × 1,080 · 4K 3,840 × 2,160 (**four times** the pixels); most standards are **16:9**.
- **Colour gamut:** the range a display can show, plotted on **CIE 1931** and quoted as % of **sRGB** / Adobe RGB / Rec. 709 / DCI-P3. 95% sRGB fine for email, 100% for colour work; OLED generally widest.

**Full notes →** [A+ Core 1 3.1 Display attributes](/cyber_lab_log/resources/a-plus-core-1/3/)

---

## Virtualization and cloud `A+1 D4`

- **Hypervisors:** Type 1 runs on bare metal (Proxmox, ESXi, Hyper-V); Type 2 runs on an OS (VirtualBox).
- **Containers** share the host kernel — lighter, but weaker isolation.
- **Service models:** IaaS (you patch the OS) · PaaS (you manage apps) · SaaS (you manage users and data).
- **Deployment models:** public · private · hybrid · community.

**Full notes →** [A+ Core 1 domain 4](/cyber_lab_log/resources/a-plus-core-1/4/)

---

## Roles and help desk `TCM 2` `TCM 4` `THM 1`

- **Help desk tiers:** Tier 0 self-service → Tier 1 front line → Tier 2 deeper fixes → Tier 3 specialists.
- **Security teams:** Red attacks · Blue defends · Purple makes every attack improve a detection.
- **Ticket types:** incident (broken) · service request (standard ask) · problem (root cause) · change (planned). Priority = impact × urgency.
- **Troubleshooting:** identify → theorise → test → plan and fix → verify and prevent → document.
- **Before any password or MFA reset, verify identity** — the help desk is attackers' favourite door.

**Full notes →** [TCM section 2](/cyber_lab_log/resources/tcm-help-desk/2/) · [TCM section 4](/cyber_lab_log/resources/tcm-help-desk/4/) · [TryHackMe module 1](/cyber_lab_log/resources/tryhackme/1/)

---

## Security quick hits

- **PowerShell logging:** 4104 = script block, 4103 = module. PowerShell 7 logs to `PowerShellCore/Operational` — watch both logs. → [PowerShell ch. 1](/cyber_lab_log/resources/powershell/1/)
- **Suspicious flags:** `-ep bypass` · `-enc` · `-nop` · `-w hidden` · `iex` + `iwr`. Command lines are in 4688 / Sysmon 1. → [PowerShell ch. 4](/cyber_lab_log/resources/powershell/4/)
- **Persistence and interception:** Run keys, rogue root certificates and PATH hijacks. → [PowerShell ch. 5](/cyber_lab_log/resources/powershell/5/)
- **`Stop-Process`/`Stop-Service` from an unfiltered pipeline is self-inflicted denial of service** — filter first, `-WhatIf` before running for real. `Export-Clixml` preserves deep structure (can leak more than intended) and its `SecureString` output only decrypts for the same user/machine that created it. → [Ch. 6 The pipeline](/cyber_lab_log/resources/powershell/6/)
- **Logons:** 4624 success · 4625 failure.
- **Plain-text history:** PSReadLine and `~/.bash_history` both keep it — never type secrets. → [PowerShell ch. 2](/cyber_lab_log/resources/powershell/2/) · [Linux ch. 1](/cyber_lab_log/resources/linux/1/)
- **Hiding places:** dotfiles, `~/.ssh/authorized_keys`, `/tmp`, `/dev/shm`. → [Linux ch. 2](/cyber_lab_log/resources/linux/2/) · [Linux ch. 3](/cyber_lab_log/resources/linux/3/)
- **Alias hijacks:** check `type -a sudo`. → [Linux ch. 5](/cyber_lab_log/resources/linux/5/)
- **Failed SSH by IP:** `grep "Failed password" auth.log | grep -o "from [0-9.]*" | sort | uniq -c | sort -rn`. → [Linux ch. 6](/cyber_lab_log/resources/linux/6/)
- **Silenced jobs fail invisibly:** `> /dev/null 2>&1` in cron hides a failing backup for months, and redirecting stderr away from a capture throws out the "Permission denied" lines that show what an attacker probed. Log with `>> job.log 2>&1`. → [Linux ch. 6](/cyber_lab_log/resources/linux/6/)
- **Injection:** unquoted variables and glued-together input cause shell and SQL injection. `$(...)` *executes*, filenames like `-rf` or with spaces are attacker input (use `--`, `find -print0 | xargs -0`), and secrets on a command line show up in `ps` and history. → [Linux ch. 7](/cyber_lab_log/resources/linux/7/) · [TryHackMe module 4](/cyber_lab_log/resources/tryhackme/4/)
- **Insecure → secure:** Telnet → SSH · FTP → SFTP · HTTP → HTTPS · LDAP → LDAPS · SNMP v1/v2c → v3. Never expose RDP 3389 or SMB 445. → [A+ Core 1 domain 2](/cyber_lab_log/resources/a-plus-core-1/2/)
- **ARP spoofing:** ARP has no authentication — a gateway MAC that changes in `ip neigh` / `Get-NetNeighbor` without a hardware swap is worth investigating. → [Networking ch. 1](/cyber_lab_log/resources/networking-sysadmins/1/)
- **Listening address:** `0.0.0.0` / `::` = reachable from the network; `127.0.0.1` = local only. Audit with `ss -tlnp` / `Get-NetTCPConnection -State Listen`. → [Networking ch. 1](/cyber_lab_log/resources/networking-sysadmins/1/)
- **Rogue IPv6 router adverts:** hosts on "IPv4-only" networks still accept them (mitm6). Use RA Guard, and check `ip -6 route` / `Get-NetRoute -AddressFamily IPv6` for unexpected routers. → [Networking ch. 2](/cyber_lab_log/resources/networking-sysadmins/2/)
- **VLAN hopping:** disable automatic trunking, avoid VLAN 1 as the native VLAN, park unused ports in a dead VLAN. → [Networking ch. 2](/cyber_lab_log/resources/networking-sysadmins/2/)
- **Unmanaged switches and rogue APs:** an unmanaged switch has no logs, VLANs or port security, and an access point just bridges — either one plugged into a wall socket silently extends the LAN. Use port security or 802.1X. → [A+ Core 1 2.5](/cyber_lab_log/resources/a-plus-core-1/2/)
- **Managed switch hygiene:** management on its own VLAN, SNMPv3 (v1/v2c send community strings in clear text), unused ports disabled; port mirroring feeds IDS. → [A+ Core 1 2.5](/cyber_lab_log/resources/a-plus-core-1/2/)
- **NAT is not a firewall:** port forwards, UPnP and inside-initiated connections pass straight through. IPv6 usually has no NAT at all, so write and test IPv6 firewall rules too. → [A+ Core 1 2.6](/cyber_lab_log/resources/a-plus-core-1/2/)
- **Normalise IPv6 before matching:** `2001:db8::1` = `2001:0db8:0:0:0:0:0:1`, so text-based blocklists and log searches miss variants. Compare the compressed form. → [A+ Core 1 2.6](/cyber_lab_log/resources/a-plus-core-1/2/)
- **Rogue DHCP and starvation:** clients take the first offer, so a rogue server can hand out its own gateway and DNS; draining the pool pushes clients onto APIPA. Use DHCP snooping, and treat a spike in 169.254 addresses as a possible attack. → [A+ Core 1 2.6](/cyber_lab_log/resources/a-plus-core-1/2/)
- **A tap or SPAN port is a wiretap:** anyone with comms room access, or just a switch login, can copy every unencrypted packet on a link. Keep switch management on its own VLAN, log mirror-config changes, and remember passive fibre taps are undetectable from the network side. → [A+ Core 1 2.8](/cyber_lab_log/resources/a-plus-core-1/2/)
- **Tethering and hotspots bypass the corporate edge:** a work laptop on a phone's hotspot skips the firewall, web filter, DLP and logging, and one on the LAN and a hotspot at once can bridge the two. Control with policy and MDM. → [A+ Core 1 2.7](/cyber_lab_log/resources/a-plus-core-1/2/)
- **MAC addresses aren't identity:** one command spoofs them, so MAC allow-lists (guest Wi-Fi paywalls, "admin MAC" firewall rules) are easy to bypass, and randomised MACs break MAC-based inventories. Use 802.1X or WPA2/WPA3-Enterprise. → [TryHackMe 5.1](/cyber_lab_log/resources/tryhackme/5/)
- **A subnet is only a boundary if something filters it:** put guest Wi-Fi, cameras and printers on their own subnet or VLAN, and make the router or firewall between them deny by default. → [TryHackMe 5.2](/cyber_lab_log/resources/tryhackme/5/)
- **UDP source addresses are easy to forge:** no handshake proves the sender, which is what makes open UDP services useful for reflection and amplification DDoS. Don't expose them; rate-limit the ones you must. TCP logs are harder to fake. → [TryHackMe 5.3](/cyber_lab_log/resources/tryhackme/5/)
- **SYN floods and SYN scans use the handshake:** half-open connections eat server state (SYN cookies help), and a scan that never sends the final ACK leaves little in application logs. SYN/ACK = open · RST = closed · silence = filtered, which is why dropping beats rejecting at the perimeter. → [TryHackMe 5.4](/cyber_lab_log/resources/tryhackme/5/)
- **Every port forward is a permanent doorway:** scanners find it within hours, and forwarded RDP 3389 or SMB 445 are prime ransomware routes. Forward only what must be public and reach internal services over a VPN — never PPTP, whose protections are broken. → [TryHackMe 5.5](/cyber_lab_log/resources/tryhackme/5/)
- **Screens are an uncontrolled output channel:** IPS and OLED stay readable far off axis, so shoulder surfing is easier — privacy filters in receptions and on trains, short lock timeouts, and watch for OLED burn-in ghosting a dashboard on a powered-off device. → [A+ Core 1 3.1](/cyber_lab_log/resources/a-plus-core-1/3/)
- **Copper radiates, fibre doesn't:** twisted pair emits a weak field an inductive probe can read, and cable routes through ceiling voids, risers and between buildings can be reached, tapped or cut. Shielding reduces emission; fibre removes it and the surge path with it. Non-plenum cable in a plenum is a life-safety violation. Tapping fibre means interrupting the light, which costs optical power — so a monitored link can show a tap as a drop in received level. → [A+ Core 1 3.2](/cyber_lab_log/resources/a-plus-core-1/3/)
- **Peripheral ports bypass the OS:** USB devices can present as a keyboard and type on insertion, and **Thunderbolt exposes PCI Express**, so a malicious dock may reach memory over DMA (IOMMU plus device-approval prompts mitigate it — never "always allow"). Console ports are unauthenticated physical access by design: the cabinet lock is the control. → [A+ Core 1 3.2](/cyber_lab_log/resources/a-plus-core-1/3/)
- **Physical SATA access is raw disk access,** bypassing every OS control — full-disk encryption is what survives an opened case. eSATA is a fast exfiltration path often missed by USB-only device-control policy, and decommissioned drives stay readable over SATA via a cheap adapter unless wiped or destroyed. → [A+ Core 1 3.2](/cyber_lab_log/resources/a-plus-core-1/3/)
- **An adapter or hub is an active device on the path, not passive plastic** — a compromised USB hub or USB-Ethernet adapter can inject keystrokes, tap traffic or exfiltrate data like any other USB device, and a USB-Ethernet adapter may be an unmonitored NIC unless NAC/802.1X is confirmed to cover it. Passive video adapters (DVI-D-HDMI, DVI-A-VGA) carry no such risk — nothing to compromise. → [A+ Core 1 3.2](/cyber_lab_log/resources/a-plus-core-1/3/)
- **Unlabelled punchdown blocks are invisible trust** — hundreds of terminated pairs with no documentation make an unauthorised cross-connect nearly undetectable, and counterfeit Lightning or USB-C cables can carry malicious electronics that a proprietary shape makes harder to spot by eye. → [A+ Core 1 3.2](/cyber_lab_log/resources/a-plus-core-1/3/)
- **An out-of-place fibre connector type is a visible anomaly** — a stray ST cable in an all-LC room is worth a second look during a physical walkthrough, and a dense LC patch panel concentrates far more connectivity per square inch than ST ever did, so secure it accordingly. → [A+ Core 1 3.2](/cyber_lab_log/resources/a-plus-core-1/3/)
- **RAM holds data in the clear while in use** — keys, decrypted files, credentials — even on an encrypted disk, which is the basis of cold boot attacks and RAM-scraping malware. Random crashes from a forced or mis-keyed memory module can also mimic compromise — rule out hardware before assuming malware. → [A+ Core 1 3.3](/cyber_lab_log/resources/a-plus-core-1/3/)
- **Silent bit flips on non-ECC memory leave no trace** — no signal when data corrupts, which is why crypto, financial and database workloads specify ECC. **Rowhammer**-class attacks deliberately induce bit flips via repeated memory access; ECC raises the bar but doesn't eliminate the risk. → [A+ Core 1 3.3](/cyber_lab_log/resources/a-plus-core-1/3/)
- **Physical destruction is the defensible wipe method for mechanical HDDs** — a destroyed platter is very hard to recover data from. **EEPROM write exhaustion silently stops accepting new data** while still reading fine, and small flash media is both a data-loss and an exfiltration risk. → [A+ Core 1 3.4](/cyber_lab_log/resources/a-plus-core-1/3/)
- **"We have RAID" is not "we have backups"** — ransomware and deletion propagate through an array as faithfully as real data. A degraded array (RAID 5 on N−1, RAID 6 on N−2) is a live risk window; replace failed drives promptly. Decommission **every** drive in a RAID array, including parity-only ones. → [A+ Core 1 3.4](/cyber_lab_log/resources/a-plus-core-1/3/)
- **Always disconnect power and account for capacitor charge before opening a case** — the single most severe physical hazard in this course. Never connect yourself to a building's electrical system, including the ground wire, which can become energised. → [A+ Core 1 3.6](/cyber_lab_log/resources/a-plus-core-1/3/)
- **A tapped video link discloses exactly what's on screen** — passwords, OTPs, documents — with no need to touch the endpoint's OS, and USB-C's multi-signal nature means a malicious "charging" cable or dock can carry video and data at once. Treat unfamiliar docks, cables and adapters as untrusted. → [A+ Core 1 3.2](/cyber_lab_log/resources/a-plus-core-1/3/)

---

## Changelog

| Date | Change |
|---|---|
| 2026-09-24 | Added A+ Core 1 3.2 (Video cables): new Video cables topic (HDMI, DisplayPort, DVI, VGA, video over USB-C); one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.6 (Computer power): expanded the PSU line (AC/DC, watts formula, regional voltage, sizing, 80 PLUS); one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.4 (RAID): new RAID topic (levels 0/1/5/6/10, RAID-is-not-backup); one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.4 (Storage devices): new Storage devices topic (HDD/SSD, PCIe/NVMe, SAS, mSATA/M.2 keying, flash, optical); one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.3 (Memory technologies): new Memory technologies topic (parity, ECC, bandwidth, multi-channel); one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.3 (An overview of memory): new Memory overview topic (RAM vs storage, DIMM/SO-DIMM, SDRAM, DDR3-5 and keying); one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.2 (Fiber connectors): extended the Fibre line with ST/SC/LC mechanisms and sizes; one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.2 (Copper connectors): new Copper connectors topic (RJ11/RJ14, F connectors, punchdown, Molex, Lightning); one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.2 (Adapters and converters): new Adapters and converters topic; one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.2 (Storage cables): new Storage cables topic (SATA speeds, one-to-one wiring, eSATA); one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.2 (Peripheral cables): new Peripheral cables and console access topic; USB speeds line extended; one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.2 (Optical fibre): expanded the Fibre line with core/cladding, ferrules, multimode vs single-mode and first-check troubleshooting |
| 2026-09-24 | Added A+ Core 1 3.2 (568A and 568B colours): expanded the Wiring line with both pinouts, the four differing pins and the don't-mix rule |
| 2026-09-24 | Added A+ Core 1 3.2 (Network cables): expanded Wireless and cabling with twisted pair, category distances, shielding codes, direct burial and plenum; one security quick hit |
| 2026-09-24 | Added A+ Core 1 3.1 (Display attributes): new Display attributes topic (PPI maths, Hz vs FPS, resolution, colour gamut) |
| 2026-09-24 | Added A+ Core 1 3.1 (Display types): new Display technologies topic (displays line moved out of Laptops, mobile and printers); one security quick hit |
| 2026-09-24 | Expanded TLCL 7 (Expansion and quoting): glob rules, integer and unset-variable gotchas, quoting detail; extended the injection security quick hit |
| 2026-09-24 | Added MoL 6 (The pipeline): objects vs text, export formats, `Format-*` placement, and system-modifying cmdlets; one security quick hit |
| 2026-09-24 | Expanded MoL 5 (Working with providers): provider vs PSDrive, Windows-only providers, `-LiteralPath`, and session-scoped `New-PSDrive` |
| 2026-09-23 | Expanded TLCL 6 (Redirection): descriptors, truncation, group commands, `tee` and `cat -`, and the `sort -o` / `sudo tee` traps; one security quick hit |
| 2026-09-23 | Added A+ Core 1 2.8 (Network tools): new Network tools topic; one security quick hit |
| 2026-09-23 | Expanded A+ Core 1 2.7 (Internet connection types): GEO vs LEO satellite, fibre/cable/DSL detail, and the tethering security hit |
| 2026-09-22 | Added TryHackMe 5.5 (Extending Your Network): new Firewalls, port forwarding and VPNs topic; one security quick hit |
| 2026-09-22 | Added TryHackMe 5.4 (Packets and Frames): new TCP connections, headers and frames topic; port ranges line and `THM 5` tag on Ports; one security quick hit |
| 2026-09-22 | Added TryHackMe 5.3 (OSI Model): OSI 5–7 and TCP vs UDP bullets plus `THM 5` tag and link on Network layers and troubleshooting, one security quick hit |
| 2026-09-22 | Added TryHackMe 5.2 (Intro to LAN): topologies bullet on Network devices, subnet anatomy bullet on Addressing, `THM 5` tags and links there and on Ethernet/ARP, one security quick hit |
| 2026-09-22 | Added TryHackMe 5.1 (What is Networking?): MAC line and `THM 5` tag on the renamed IPv4, IPv6 and MAC addressing topic; ping Rosetta stone row; MAC spoofing security quick hit |
| 2026-09-22 | Added A+ Core 1 2.6 (Assigning IP addresses): Assigning bullet and precise APIPA range in Addressing, DNS and DHCP; one Rosetta stone row; one security quick hit |
| 2026-09-22 | Added A+ Core 1 2.6 (IPv4 and IPv6): new IPv4 and IPv6 addressing topic (private ranges moved in from Addressing, DNS and DHCP), two security quick hits |
| 2026-09-22 | Added A+ Core 1 2.5 (Network devices): new Network devices, PoE and ISP handoff topic (device line moved out of the renamed Wireless and cabling topic, PoE++ figures corrected), one Rosetta stone row, two security quick hits |
| 2026-09-22 | Added Networking for Sysadmins ch. 2 (`NfSA 2`): new Ethernet topic, transceiver line and tag on Devices, five Rosetta stone rows, two security quick hits |
| 2026-09-22 | Added Networking for Sysadmins ch. 1 (`NfSA 1`): new Network layers topic, six Rosetta stone rows, two security quick hits |
| 2026-09-18 | Added all 28 Code (Petzold) chapter sheets; expanded the "How a computer works" topic into a per-chapter map |
| 2026-09-18 | Added TCM 1–6, A+1 D1–D2 and THM 1–3 sheets. Ports corrected to the 220-1201 list (LDAPS in; NetBIOS and SNMP out). New Windows tools topic; hardware, networking and help desk commands |
| 2026-09-18 | Restructured: short topics with Full notes links; resource list now generated automatically |
| 2026-09-18 | Created — `MoL 1–5` · `TLCL 1–7` · `THM 1–4` · `TCM 1–6` · `A+1 D1–D4` |

<!-- Nothing below this line. The "All resource sheets" list is rendered by the page layout (ultimate: true) and updates itself. -->
