---
title: "A+ Core 1 3.5: BIOS Settings — Class Notes"
description: "Full class notes for A+ Core 1 3.5: entering setup, boot order, USB control, fan and temperature, Secure Boot, passwords, CMOS reset and virtualisation."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "bios", "uefi", "secure-boot", "boot-order", "passwords"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> sixth lesson under objective **3.5**, and the direct companion to the BIOS
> lesson: that one explained what the firmware is, this one walks the settings
> you actually configure inside it.

## Learning objectives

By the end of these notes you should be able to:

1. Enter firmware setup, including on a Windows machine using Fast Startup, and
   on a virtual machine.
2. Explain why and how to change BIOS settings safely.
3. Configure the boot order and enable or disable hardware such as USB ports.
4. Configure fan/cooling profiles and read temperature monitoring.
5. Explain what Secure Boot protects and when you would disable it.
6. Set and distinguish boot and supervisor passwords, and reset a lost
   configuration.
7. Locate the virtualisation settings and know their platform names.

## 1. Getting into BIOS setup

To open the setup program you press a key while the system is starting. The key
varies by manufacturer, but it is very often **Delete**, **F1** or **F2**, and
is sometimes a combination such as **Ctrl+S** or **Ctrl+Alt+S**. The POST screen
usually tells you which.

### 1.1 Practising without touching real hardware

You do not need to reboot your own PC to explore a BIOS:

- **A virtual machine's firmware.** Desktop hypervisors let you stop a VM before
  it boots and open its firmware setup. **Hyper-V** (built into Windows 10/11),
  **VMware Workstation** (Windows) and **VMware Fusion** (macOS) all support
  this. **VirtualBox does not** expose a virtual BIOS setup, so use one of the
  others or a physical machine if you need it.
- **An online UEFI simulator.** Search for a "UEFI BIOS simulator" and you will
  find several browser-based ones — handy for practice with no install.

### 1.2 Windows Fast Startup gets in the way

On Windows 10 and 11 you may find that start-up shows **no prompt** to press a
setup key. That is because of **Fast Startup**: the machine does not fully power
down when you shut it off. Instead it does a partial (hybrid) shutdown so it can
resume faster — and because it never runs a full cold boot, there is no window
to press the setup key.

To force a genuine full shutdown so you can reach setup:

- Hold **Shift** while clicking **Restart**.
- Or go to **Settings -> Update and Security -> Recovery -> Advanced startup ->
  Restart now**.
- Or make a temporary change in **msconfig** (the System Configuration utility).
- If none of those are available, **interrupt the boot three times in a row**;
  the fourth attempt starts from the very beginning and gives you the recovery
  options.

> **Note (beyond this lesson):** the transcript gives the Windows 10 menu path.
> On Windows 11 the same option has moved to **Settings -> System -> Recovery ->
> Advanced startup**. The Shift+Restart and triple-interrupt methods work on
> both.

## 2. Changing settings safely

A word of warning before touching anything: a bad BIOS change can leave a system
that **will not boot or will not run stably**. So:

- **Document every change.** Write down the before-and-after, or simply
  photograph each screen with your phone before you alter it.
- **Understand what you are changing.** Most settings are straightforward, but
  some **memory and CPU** options are subtle — do not change these at random.
- **Have a backup you can revert to.** Keep a record of the working
  configuration so you can put it back.

## 3. What the BIOS controls

The BIOS is among the very first software to run. At power-on it reads all the
configuration you have set and acts on it before any OS loads. One consequence
worth understanding: you can **disable hardware in the BIOS**, and when the
operating system loads it will have **no idea that hardware exists** — because
the BIOS is the layer that connects the OS to the hardware, and cutting that
connection hides the device entirely.

## 4. Boot order

The BIOS is where you set the **boot order** (boot sequence). A system usually
has several devices it *could* boot from — multiple SSDs, an M.2 drive, a network
connection, USB drives — and you tell the firmware which to try **first**, which
**second** if the first has no OS, and so on.

In the example firmware the setting lives under **Startup -> Primary Boot
Sequence**. You select a device and move it **up or down** the list. Want to boot
a USB installer? Move USB to the top. Just fitted a new M.2 boot drive? Move it
above the others so it is tried first.

## 5. USB permissions

Because the BIOS can enable and disable hardware, a common target is the **USB
ports**. USB storage is fast and convenient for moving data, but it is also a
risk, and some security teams want it restricted. In the example firmware this is
under **Devices -> USB Setup**, where you can enable or disable interfaces,
change the type of support, and turn individual ports on or off.

> **In the real world:** the classic case is the **2008 US Department of Defense
> USB ban**. An infected USB drive was plugged into a DoD system and spread the
> **Agent.btz** worm across military networks; the response included banning
> removable USB media (roughly November 2008 to February 2010) and, on many
> systems, disabling USB in the BIOS.

> **Correction:** the transcript names the worm "SillyFDC". The worm behind the
> DoD incident was **Agent.btz** — a *variant* of the older SillyFDC family — so
> "a SillyFDC variant" is accurate but "SillyFDC" alone is imprecise.

## 6. Fans, cooling and temperature

Cases get hot: the CPU throws off a lot of heat, so fans pull cool air in and
push warm air out — a fan directly on the CPU, and often case fans moving air
through the whole system. Most motherboards have **temperature sensors and
integrated fan controllers**, and those controllers are configured in the BIOS,
which lets the board monitor temperatures and spin the fans up as things warm.
Modern boards take the fan connections directly (you will see a header marked
something like **CPU_FAN1**).

In the example firmware, fan control is under **Power -> Intelligent Cooling**,
with profiles such as:

| Profile | Behaviour |
| --- | --- |
| Best performance | Maximum cooling |
| Best experience | Minimises fan noise |
| Full speed | All fans always at full |

A quiet room might suit "best experience"; a data centre might want "full speed".

The board also carries **many** temperature sensors — in the CPU, the memory and
other components — and the BIOS can display them, so you can check temperatures
**before** booting an OS and without any third-party tool. In the example, the
CPU reads 45 degrees Celsius. This is handy after fitting new hardware, to
confirm everything is cooling properly.

## 7. Secure Boot

Antivirus in the OS is not enough on its own, because malware can try to load
**before** the OS — or even tamper with the BIOS. **Secure Boot** guards against
that. It is a **UEFI feature** (you will not find it on a legacy BIOS) that uses
**digital signatures** to check that boot-time software is what it claims to be:

- It knows what well-known operating systems should look like; if malware has
  modified that software, Secure Boot **halts the boot** and stops it running.
- It checks the **bootloader** that runs before the OS, comparing its signature
  against a trusted certificate; if it cannot confirm the signature, it will not
  start the OS.
- It also protects the firmware from being overwritten: it checks a **BIOS
  update's** digital signature against the **manufacturer's public key**, and
  refuses to flash an update it cannot verify.

The trade-off is older or unsigned software. A very old OS may have no valid
signature, so Secure Boot will block it — you would **disable** Secure Boot to
run it, then **re-enable** it for modern software. The settings live under
**Security -> Secure Boot**, with options to enable/disable and to manage the
keys used for verification.

> **Note (beyond this lesson):** two nuances. Secure Boot verifies the boot chain
> (bootloader/OS) against keys held in firmware; the signed-firmware-update
> check is a closely related but technically distinct flash-protection mechanism
> that vendors bundle alongside it. And Secure Boot pairs with a **TPM** in the
> full trusted-boot stack.

## 8. Password management

The BIOS offers passwords that either stop a system booting or stop its
configuration being changed:

- **Boot password** (also **user** or **power-on** password): prompted at
  start-up; the machine will not boot an OS without it — and this applies
  whatever OS is installed.
- **Supervisor password** (also **BIOS** password): required to *enter setup*.
  This is what stops someone undoing your changes — for example re-enabling the
  USB ports you disabled for security.

Both matter to remember: without the boot password you cannot start the machine,
and without the supervisor password you cannot change the BIOS. If you lose one,
the fix is to **reset the BIOS configuration** using the process your
motherboard manufacturer specifies. In the example these are under **Security**,
at the top: a supervisor password, a power-on password, and others.

## 9. Where settings live, and how to reset them

Two things sit in flash on the motherboard: the **BIOS firmware** itself (so it
can be upgraded) and, often in separate flash, the **BIOS configuration
settings**.

You will also see **CMOS** (Complementary Metal-Oxide-Semiconductor) mentioned.
Historically, settings were held in **volatile** CMOS memory kept alive by the
motherboard **battery** — which is why the old advice was to pull the battery to
clear them. Modern boards store settings in **non-volatile flash**, needing no
power to retain them, so **removing the battery no longer resets the
configuration**. Instead you reset with **physical access to the board**: fit a
**jumper** across the clear pins and power on.

On the example Asus micro-ATX board, that jumper sits next to the BIOS chip and
is marked **CLRTC** — Clear Real-Time Clock RAM. A jumper is a small plastic
block with a metal bar inside; pushing it onto the two pins **shorts** them,
clearing the configuration.

```
Reset the BIOS configuration (modern boards):

  battery removal   -> does NOT clear settings (they're in flash)
  CLRTC jumper      -> short the two pins, power on -> cleared

  [ o o ]  two pins        [ === ]  jumper bridges them
```

> **Note (beyond this lesson):** the coin cell (**CR2032**) still powers the
> **real-time clock** even when settings live in flash — which is exactly why
> the clear pins are labelled "Clear RTC RAM". On some boards a clear-CMOS jumper
> or battery pull still clears settings; always check the board's own manual for
> the correct method.

## 10. Virtualisation

Virtualisation is helped by dedicated hardware, mostly built into the **CPU**,
and it is enabled or disabled in the BIOS. Turning it on makes virtualisation
**more stable and much faster**. The option's name depends on the platform:

- **Intel:** Intel Virtualization Technology (**VT**, i.e. VT-x).
- **AMD:** AMD Virtualization (**AMD-V**, often shown as **AMD Secure Virtual
  Machine / SVM**).

In the example firmware these are under **Advanced -> CPU Setup**, where the AMD
Secure Virtual Machine option can be enabled or disabled. Check your CPU's
specification for exactly what it supports.

### 10.1 Worked example — hardening a kiosk from the BIOS

A public-facing kiosk should boot only its internal drive and resist tampering.
Using the menus above, in order:

1. **Document** the current settings (photograph each screen).
2. **Startup:** set the boot order to the **internal drive only** (or first),
   so it will not boot a USB installer.
3. **Devices -> USB Setup:** disable the external USB ports the public can reach.
4. **Security -> Secure Boot:** ensure it is **enabled**, so only signed boot
   code runs.
5. **Security:** set a **supervisor password** so nobody can re-enable USB or
   change the boot order; optionally a **boot password** if only staff may power
   it on.
6. Remember: none of this beats **physical access** to the board (Section 11) —
   so the case itself must be locked.

## 11. Security perspective

This lesson is almost entirely security settings, so the defender's reading is
direct:

- **Boot-order lockdown stops the easiest attack.** An attacker who can boot a
  live USB skips the installed OS and its protections entirely. Setting the boot
  order to the internal drive and disabling USB booting closes that door;
  Secure Boot and full-disk encryption close the rest.
- **Firmware USB control is a real malware/DLP control.** The Agent.btz story is
  the lesson: disabling USB storage in firmware blocks both data exfiltration and
  removable-media worms in a way an attacker cannot simply undo from the OS.
- **Secure Boot defends the pre-OS window.** It is the mechanism that stops
  bootkits and unsigned bootloaders, and refuses unsigned firmware flashes.
  Disabling it to run an old OS genuinely lowers the machine's security posture —
  do it knowingly and re-enable it afterwards.
- **BIOS passwords deter; they do not protect data.** This is the crucial
  caveat. Because the configuration can be **cleared with physical board access**
  (the CLRTC/clear-CMOS jumper, sometimes a battery pull, and vendor "backdoor"
  reset procedures), a supervisor or boot password is defeated by anyone who can
  open the case. Treat BIOS passwords as a tamper-deterrent, and rely on
  **full-disk encryption plus physical security** for actual data protection.
- **Undocumented firmware change is a risk in itself.** Turning off Secure Boot,
  opening the boot order or disabling a security feature can silently weaken a
  build — which is why documenting changes and tracking firmware settings in the
  baseline is a security practice, not just a tidiness one.

## Summary

- **Enter setup** with a key at power-on (Del/F1/F2, or Ctrl+S/Ctrl+Alt+S);
  practise on a VM's firmware (not VirtualBox) or an online UEFI simulator.
- **Windows Fast Startup** skips the setup prompt; force a full shutdown
  (Shift+Restart, Advanced startup, msconfig, or interrupt the boot three times).
- **Always document, understand and back up** before changing anything.
- **Boot order** sets which device boots first; the BIOS can **disable hardware**
  (e.g. **USB ports** — the Agent.btz/DoD case) so the OS never sees it.
- **Fan profiles** and **temperature monitoring** live in the firmware.
- **Secure Boot** (UEFI only) verifies bootloader, OS and firmware-update
  signatures; disable only to run old/unsigned software.
- **Boot/user password** to boot; **supervisor/BIOS password** to enter setup;
  lost passwords mean resetting the BIOS.
- Modern settings sit in **flash**, so a battery pull won't clear them — use the
  **CLRTC (clear-CMOS) jumper**. **Virtualisation** (VT / AMD-V/SVM) is under
  Advanced -> CPU Setup.

## Glossary

| Term | Meaning |
| --- | --- |
| Setup key | The key pressed at boot to enter firmware setup. |
| Fast Startup | Windows partial shutdown that skips a full cold boot. |
| msconfig | Windows System Configuration utility. |
| Boot order | The sequence of devices the firmware tries to boot. |
| Disable hardware | Turning a device off in firmware so the OS can't see it. |
| USB Setup | Firmware menu to enable/disable USB ports and support. |
| Agent.btz | The 2008 worm (a SillyFDC variant) behind the DoD USB ban. |
| Fan controller | Board hardware, configured in BIOS, that regulates fans. |
| Secure Boot | UEFI feature verifying signed boot code and firmware. |
| Bootloader | Pre-OS code that Secure Boot signature-checks. |
| Boot/user password | Password required to boot the system. |
| Supervisor/BIOS password | Password required to enter firmware setup. |
| CMOS | Older battery-backed memory once holding BIOS settings. |
| CLRTC jumper | Clear-RTC-RAM pins shorted to reset the configuration. |
| Jumper | A small block that shorts two pins together. |
| VT / AMD-V (SVM) | Intel/AMD CPU hardware-virtualisation settings. |

## Review questions

1. Give three keys (or combinations) commonly used to enter firmware setup.
2. Why might a Windows 10/11 machine show no prompt to enter the BIOS, and name
   two ways to force a full shutdown.
3. Which common hypervisor does not offer a virtual BIOS setup?
4. List the three things you should do before changing a BIOS setting.
5. If you disable a device in the BIOS, what does the operating system see?
6. Where do you configure which drive boots first, and how do you change it?
7. What real-world incident is tied to disabling USB in the BIOS, and what
   worm was involved?
8. Name the three cooling profiles in the example firmware and when you'd pick
   each.
9. What three things does Secure Boot check, and when would you disable it?
10. Distinguish a boot password from a supervisor password.
11. On a modern board, does removing the battery reset the BIOS configuration?
    How do you reset it?
12. What are the Intel and AMD names for the CPU virtualisation setting?
13. Scenario: a laptop has a supervisor password nobody knows. Is the data on it
    safe from someone with the laptop? Explain.
14. Scenario: you set the boot order to internal-only and disabled USB, but left
    no supervisor password. Why is the hardening incomplete?

## Answer key

1. **Delete, F1, F2 — or combinations like Ctrl+S or Ctrl+Alt+S.** The POST
   screen usually names it.
2. **Fast Startup does a partial shutdown, so there's no full cold boot; force a
   full one with Shift+Restart, Advanced startup, msconfig, or interrupting the
   boot three times (any two).** No cold boot, no setup prompt.
3. **VirtualBox.** Use Hyper-V or VMware instead.
4. **Document/photograph the change, understand what it does, and keep a backup
   to revert to.** Bad changes can stop the system booting.
5. **Nothing — the OS has no idea the hardware exists**, because the BIOS is the
   connection to it. Disabling hides it.
6. **In the BIOS boot order (e.g. Startup -> Primary Boot Sequence); move the
   device up or down the list.** First device with an OS wins.
7. **The 2008 US DoD USB ban, involving the Agent.btz worm (a SillyFDC
   variant).** An infected USB spread it across military networks.
8. **Best performance (max cooling), best experience (minimal noise), full speed
   (fans always maxed) — quiet room vs data centre.** Match to environment.
9. **The OS, the bootloader, and BIOS-update signatures (against trusted keys /
   the manufacturer public key); disable it to run old or unsigned software.**
   Re-enable afterwards.
10. **Boot/user password is needed to boot the machine; supervisor/BIOS password
    is needed to enter setup.** Different jobs.
11. **No — modern settings are in non-volatile flash; reset by shorting the
    clear-CMOS (CLRTC) jumper with physical access.** Battery pull won't do it.
12. **Intel VT (VT-x) and AMD-V (AMD Secure Virtual Machine / SVM).** Under
    Advanced -> CPU Setup.
13. **No — anyone who can open the case can clear the password via the clear-CMOS
    jumper; only full-disk encryption protects the data.** Passwords deter, not
    protect.
14. **Without a supervisor password, someone can enter setup and simply re-enable
    USB and change the boot order.** The lock needs a password to hold.
