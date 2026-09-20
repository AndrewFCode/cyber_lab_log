---
title: "Help Desk: Laptop Computer Components and Repair"
description: "TCM Practical Help Desk section 5 — opening laptops safely, batteries, SODIMM RAM, laptop drives, the CMOS battery and other internal parts."
tags: ["help-desk", "tcm", "hardware", "laptops"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tcm-help-desk"
module: "§5"
moduleOrder: 33
unit: 5
---
> **In one line:** the same parts as a desktop, shrunk, glued and cabled tighter — so the service manual, a screw map and patience matter more than strength.

*Companion to: TCM Security, Practical Help Desk, section 5.* Exam-level detail is in [A+ Core 1 domain 1](/resources/a-plus-core-1/1/).

---

## Opening a laptop

1. **Get the service manual** for the exact model — disassembly order varies wildly.
2. **Suspend BitLocker** if you'll touch storage or firmware (see Security notes).
3. **Power off, unplug, and disconnect the battery.** On internal batteries, unplug the connector first.
4. **Map the screws.** Draw the base on paper or use a magnetic mat; screws differ in length, and a long screw in the wrong hole can pierce the board.
5. **Use plastic spudgers** and picks, not screwdrivers, to release clips.
6. **Handle ribbon cables carefully.** On ZIF connectors, flip the latch up *before* sliding the cable out.

---

## Components

| Part | Notes |
|---|---|
| Battery | Li-ion or Li-polymer. Removable on older models, internal on most modern ones. Capacity drops with charge cycles |
| RAM | SODIMM — insert at an angle, then press down until the clips lock. Often one slot, or none: **LPDDR is soldered** |
| Storage | 2.5" SATA (check 7 mm vs 9.5 mm thickness) or M.2 (2230 / 2242 / 2280) |
| CMOS battery | Coin cell, often on a wire lead rather than a socket |
| Wireless card | Small M.2 card; the two antenna leads (main / aux) run up into the display |
| Keyboard | Sometimes riveted into the palm rest, meaning you replace the whole top case |
| Touchpad | Ribbon cable, usually under the palm rest |
| Display assembly | Panel, display cable, webcam, microphones and Wi-Fi antennas |
| Fan and heatsink | Clog with dust, causing heat and throttling — clean them and repaste |
| Charging port | Barrel jack or USB-C (Power Delivery); a loose port causes intermittent charging |

---

## Batteries

```powershell
powercfg /batteryreport /output "$env:USERPROFILE\Desktop\battery-report.html"
Get-CimInstance Win32_Battery | Select-Object EstimatedChargeRemaining, BatteryStatus
```

In the report, compare **design capacity** with **full charge capacity**. The gap is battery wear, and the cycle count is listed too.

```bash
upower -e                                   # list power devices
upower -i $(upower -e | grep BAT)           # details for the battery
cat /sys/class/power_supply/BAT0/capacity   # current charge % (the name may differ)
```

**Care:** avoid heat, and store long-term at around 40–60 % charge. A **swollen** battery means stop using it, don't charge it, don't puncture it, and recycle it as hazardous waste.

---

## Upgrading HDD → SSD

| Approach | When |
|---|---|
| Clone (Clonezilla or vendor tool) | Keep everything as-is; the new drive must be at least as big as the used space |
| Clean install | Fresh start; better when the old OS is slow or messy |

Afterwards, confirm the firmware boots in the same mode (UEFI) and that TRIM is on: `fsutil behavior query DisableDeleteNotify` should show `0`.

---

## CMOS battery

**Symptoms:** date and time reset after unplugging, firmware settings lost, or "CMOS checksum" messages at boot.

It's usually a wired coin cell tucked under another part. Match the connector when ordering.

---

## 🔐 Security notes

- **Suspend BitLocker before firmware updates or board and drive work.** Otherwise the next boot can demand the recovery key.

  ```powershell
  manage-bde -status C:
  Suspend-BitLocker -MountPoint "C:" -RebootCount 1     # resumes itself after one reboot
  ```

  Know where recovery keys live — the user's Microsoft account, Entra ID, or Active Directory — before you start.
- **Webcam and microphone:** they live in the display bezel. Physical privacy shutters are the only control malware can't switch off.
- **Lost or stolen laptops:** full-disk encryption plus remote wipe via MDM turns a data breach into a hardware loss.
- **Swapped-out drives still hold data.** Wipe or destroy them before they leave your hands.

---

## Practice drills

<details>
<summary>1. A user says the battery "only lasts an hour now". How do you prove it?</summary>

`powercfg /batteryreport` — compare full charge capacity against design capacity.
</details>

<details>
<summary>2. You're adding RAM to a thin laptop and there's no slot. Why?</summary>

The memory is soldered LPDDR — it can't be upgraded.
</details>

<details>
<summary>3. After replacing a laptop keyboard, Wi-Fi is weak. What did you probably disturb?</summary>

The antenna leads on the wireless card, which run into the display.
</details>

<details>
<summary>4. What must you do before a BIOS update on a BitLocker laptop?</summary>

`Suspend-BitLocker -MountPoint "C:" -RebootCount 1` — and have the recovery key ready.
</details>

<details>
<summary>5. You want to swap an M.2 drive. What two things do you check?</summary>

Length (e.g. 2242 vs 2280) and interface (SATA vs NVMe) supported by the slot.
</details>

---

## Key takeaways

- Service manual first, screw map always, plastic tools, and lift ZIF latches before pulling cables.
- Batteries wear with cycles (`powercfg /batteryreport`). A swollen battery is a hazard.
- Laptop RAM is SODIMM — or soldered. Laptop drives are 2.5" SATA or M.2 in several lengths.
- A dead CMOS battery shows up as a lost clock and lost settings.
- Suspend BitLocker before firmware or hardware changes, and know where the recovery key is.
