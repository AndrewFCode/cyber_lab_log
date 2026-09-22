---
title: "The Ultimate IT & Cyber Cheat Sheet"
description: "The short version of everything I study — key commands and facts by topic, each linking to the full chapter notes."
tags: ["cheat-sheet", "powershell", "linux", "windows", "networking", "hardware"]
draft: false
updated: "2026-09-22"
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

- **Drives:** `C:` · `HKCU:` / `HKLM:` · `Env:` · `Cert:` · `Variable:` · `Function:` · `Alias:`. List them with `Get-PSDrive`.
- **Cmdlet families:** `*-Item` · `*-ChildItem` · `*-ItemProperty` · `*-Location` · `Test-Path`.
- **Registry:** keys are items, values are properties — `Get-ItemProperty 'HKCU:\Control Panel\Desktop'`.
- **Brackets in names:** `-LiteralPath` for names containing `[ ]`.

**Full notes →** [Ch. 5 Working with providers](/cyber_lab_log/resources/powershell/5/)

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

- **Streams:** `>` overwrite · `>>` append · `2>` errors · `&>` both · `2>/dev/null` discard · `<` input.
- **Order matters:** write `> file 2>&1`, not `2>&1 > file`.
- **Filters:** `|` · `sort | uniq` · `grep -i` / `-v` · `head` / `tail -n` / `tail -f` · `wc -l` · `tee`.

**Full notes →** [Ch. 6 Redirection](/cyber_lab_log/resources/linux/6/)

### Expansion and quoting `TLCL 7`

- **Expansions:** `*` · `~` · `$((2+2))` · `{a,b}` / `{01..12}` · `$VAR` · `$(cmd)`. Preview with `echo`.
- **Quoting:** `"..."` keeps `$` expansions; `'...'` is literal; `\` escapes one character.
- **Always quote variables:** `"$var"`.

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

### Motherboard, firmware, power and cables `A+1 D3`

- **Boards:** ATX > microATX > Mini-ITX. PCIe x16 for GPUs. CMOS battery = CR2032.
- **Firmware:** UEFI + GPT + Secure Boot + TPM 2.0 is the modern stack.
- **PSU:** rails are +3.3 V (orange), +5 V (red) and +12 V (yellow). 24-pin to the board, 8-pin to the CPU.
- **Speeds:** USB 2.0 480 Mbps · 3.2 Gen 1 5 Gbps · Gen 2 10 Gbps · USB4 / Thunderbolt 40 Gbps.

**Full notes →** [A+ Core 1 domain 3](/cyber_lab_log/resources/a-plus-core-1/3/)

### Laptops, mobile and printers `TCM 5` `A+1 D1` `A+1 D3`

- **Laptop repair:** battery out first, map the screws, plastic tools. A swollen battery means replace now.
- **Displays:** IPS (colour) · TN (speed) · VA (contrast) · OLED (no backlight). Dim-but-visible = backlight.
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

### Network layers and troubleshooting `NfSA 1`

- **Layers:** 1 physical (signals) · 2 datalink (frames, MAC, switches) · 3 network (packets, IP, routers) · 4 transport (TCP/UDP ports) · then the application.
- **Per hop:** MAC addresses are rewritten at every router; IP addresses stay the same end to end (unless NAT). A frame for a remote host goes to the gateway's MAC.
- **Troubleshoot bottom-up:** link → neighbour (ARP) → ping → port → application. Ping proves layers 1–3 only.
- **Failure clues:** refused = nothing listening · timeout = something dropping · works by IP but not by name = DNS.

**Full notes →** [Ch. 1 Network layers](/cyber_lab_log/resources/networking-sysadmins/1/)

### Ethernet, MTU, ARP and VLANs `NfSA 2`

- **MTU:** 1,500 (jumbo 9,000). Don't-fragment ping data = MTU − 28: `ping -M do -s 1472` · `ping -f -l 1472` · FreeBSD `ping -D -s 1472`. Pings work but big transfers stall = PMTU black hole.
- **Autonegotiation:** leave it on at both ends. Hard-setting one side causes a duplex mismatch (slow, late collisions, CRC errors).
- **ARP and NDP:** the cache only holds local hosts. IPv6 uses Neighbor Discovery (ICMPv6 133–137): `ip -6 neigh` · `Get-NetNeighbor -AddressFamily IPv6` · `ndp -an`.
- **VLANs:** 802.1Q tag, IDs 1–4094. Access port = one untagged VLAN; trunk = many tagged. Crossing VLANs needs a router.
- **Errors:** counters are cumulative since boot — compare two readings before blaming hardware.

**Full notes →** [Ch. 2 Ethernet](/cyber_lab_log/resources/networking-sysadmins/2/)

### Ports `A+1 D2`

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

**Full notes →** [A+ Core 1 domain 2](/cyber_lab_log/resources/a-plus-core-1/2/)

### IPv4 and IPv6 addressing `A+1 D2`

- **IPv4:** 32 bits = four octets of 0–255 · 2³² ≈ 4.29 billion addresses.
- **Private (RFC 1918) + NAT:** `10/8` · `172.16/12` (172.16–172.31 only) · `192.168/16`. NAT lets many private hosts share one public address.
- **IPv6:** 128 bits = eight groups of four hex digits · ≈ 340 undecillion addresses · LANs are `/64` (64-bit prefix + 64-bit interface ID).
- **Shortening:** drop leading zeros; `::` replaces one run of zero groups, once only. `2001:0db8:0000:0000:0000:0000:0000:0001` → `2001:db8::1`.
- **Types:** starts `2`/`3` = global · `fe80::` = link-local (never routed) · `fd` = unique local · `::1` = loopback.

**Full notes →** [A+ Core 1 2.6 IPv4 and IPv6](/cyber_lab_log/resources/a-plus-core-1/2/)

### Addressing, DNS and DHCP `A+1 D2`

- **Assigning:** IP + subnet mask + default gateway (+ DNS) · static = typed on the device (routers, DHCP and DNS servers) · reservation = DHCP always gives one MAC the same IP · dynamic = from the pool. Clients pick up changes at lease renewal.
- **Special addresses:** `169.254.1.0`–`169.254.254.255` = APIPA (DHCP failed; local segment only; chosen after an ARP probe) · `127.0.0.1` / `::1` = loopback.
- **DNS records:** A · AAAA · CNAME · MX · TXT (SPF / DKIM / DMARC) · PTR.
- **DHCP:** DORA (Discover, Offer, Request, Acknowledge) · scope · lease · reservation · exclusion.
- **Commands:**
  - Addressing: `ipconfig /all` · `ipconfig /release` then `/renew` · `ipconfig /flushdns`
  - DNS lookups: `nslookup -type=mx example.com` · `Resolve-DnsName` · `dig +short`
  - Reachability: `Test-NetConnection host -Port 443`

**Full notes →** [A+ Core 1 domain 2](/cyber_lab_log/resources/a-plus-core-1/2/)

### Network devices, PoE and ISP handoff `A+1 D2`

- **Forwarding:** hub (layer 1) → switch (layer 2, MAC) → router (layer 3, IP). An access point bridges Wi-Fi to wired by MAC; it doesn't route. Layer 3 switch = switch + routing.
- **Switches:** unmanaged = plug-and-play, one big VLAN, no SNMP or logs · managed = VLANs, QoS, redundancy, port mirroring, SNMP.
- **Firewalls:** traditional = IP, protocol and port rules · next-gen = application-aware. Often also router, VPN concentrator and proxy.
- **PoE at the switch / device:** af 15.4 / 12.95 W · at (PoE+) 30 / 25.5 W · bt (PoE++) 60 / 51 W and 90 / 71.3 W. Switch = endspan, injector = midspan.
- **ISP handoff:** cable modem (coax, DOCSIS) · DSL (phone line, asymmetric, slower with distance) · ONT (fibre in, Ethernet out; marks the demarc).

**Full notes →** [A+ Core 1 2.5 Network devices](/cyber_lab_log/resources/a-plus-core-1/2/)

### Wireless and cabling `A+1 D2` `A+1 D3` `NfSA 2`

- **Wi-Fi:** 4 = n · 5 = ac · 6/6E = ax · 7 = be. On 2.4 GHz use channels 1, 6 and 11.
- **Copper:** Cat 5e 1 Gbps · Cat 6a 10 Gbps at 100 m.
- **Wiring:** T568B = W-Or, Or, W-Gn, Bl, W-Bl, Gn, W-Br, Br.
- **Fibre:** single-mode (long) vs multimode (short). Connectors ST, SC, LC.
- **Transceivers:** SFP 1G · SFP+ 10G · SFP28 25G · QSFP28 100G. 10GBASE-SR multimode ~300 m (OM3) · 10GBASE-LR single-mode 10 km.

**Full notes →** [A+ Core 1 domain 2](/cyber_lab_log/resources/a-plus-core-1/2/) · [A+ Core 1 domain 3](/cyber_lab_log/resources/a-plus-core-1/3/) · [Networking ch. 2](/cyber_lab_log/resources/networking-sysadmins/2/)

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
- **Logons:** 4624 success · 4625 failure.
- **Plain-text history:** PSReadLine and `~/.bash_history` both keep it — never type secrets. → [PowerShell ch. 2](/cyber_lab_log/resources/powershell/2/) · [Linux ch. 1](/cyber_lab_log/resources/linux/1/)
- **Hiding places:** dotfiles, `~/.ssh/authorized_keys`, `/tmp`, `/dev/shm`. → [Linux ch. 2](/cyber_lab_log/resources/linux/2/) · [Linux ch. 3](/cyber_lab_log/resources/linux/3/)
- **Alias hijacks:** check `type -a sudo`. → [Linux ch. 5](/cyber_lab_log/resources/linux/5/)
- **Failed SSH by IP:** `grep "Failed password" auth.log | grep -o "from [0-9.]*" | sort | uniq -c | sort -rn`. → [Linux ch. 6](/cyber_lab_log/resources/linux/6/)
- **Injection:** unquoted variables and glued-together input cause shell and SQL injection. → [Linux ch. 7](/cyber_lab_log/resources/linux/7/) · [TryHackMe module 4](/cyber_lab_log/resources/tryhackme/4/)
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

---

## Changelog

| Date | Change |
|---|---|
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
