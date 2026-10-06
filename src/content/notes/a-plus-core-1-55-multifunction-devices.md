---
title: "A+ Core 1 3.7: Multifunction Devices — Class Notes"
description: "Full class notes for A+ Core 1 3.7: MFD setup, drivers, PCL/PostScript, connectivity, sharing, print features, secure printing, and scanning."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "printers", "multifunction-devices", "pcl", "postscript", "secure-print", "scanning"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 3.7**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This opens
> the printer material in Section 3 under objective **3.7** (printers and
> multifunction devices) — a change of subject from the Section 3.5 motherboard
> and CPU lessons.

## Learning objectives

By the end of these notes you should be able to:

1. Set up a multifunction device physically and install the right drivers.
2. Explain page description languages and match the driver to the printer.
3. Update device firmware and choose the right wired or wireless connection.
4. Share a printer via the OS or a print server.
5. Configure print features — duplex, orientation, trays and quality.
6. Secure output with authentication, badging, secured prints and auditing.
7. Use the device as a scanner, including scan-to destinations.

## 1. What a multifunction device is

A **multifunction device (MFD)** combines several peripherals in one unit —
commonly a **printer, scanner and fax**, and often a copier. It may connect over
**wired** or **wireless** networking, have a **phone line** for the fax, and
accept print jobs from **mobile devices over the web**. With so many capabilities
in one box comes plenty that can go wrong — and as the technician, you are the
one who installs and repairs it.

## 2. Physical setup

At home an MFD may be about the size of an ordinary printer; in an office it can
be **large**, needing its own space **out of the walkway**. Wherever it goes, it
needs a **power** connection, usually a **wired network** connection, and a
location **accessible to everyone** who uses it.

## 3. Drivers

Installing the hardware is only half the job — each **workstation** must be
configured to print to it, which means installing the correct **printer driver**
for that exact model on everyone's computer. As with a standalone printer, the
driver must match the **operating system**, and crucially the **bit-width**: a
**32-bit OS needs a 32-bit driver**, a **64-bit OS needs a 64-bit driver** (the
same rule from the CPU Features lesson). Using the right driver is also what
unlocks the device's full multifunction capabilities — check the documentation
and confirm the driver matches the model.

## 4. Page description languages

An MFD renders a page using a **page description language (PDL)**, and two are
common:

| PDL | Origin | Notes |
| --- | --- | --- |
| PCL (Printer Command Language) | Hewlett-Packard | Common on HP printers |
| PostScript | Adobe | Widely supported across many printers |

The workstation sends the document in the chosen language; the printer
**interprets** that language, **renders** the page from it, and prints the
result. The driver must match the language: a **PCL** printer needs a **PCL
driver**, a **PostScript** printer needs a **PostScript driver**. Some printers
can use either — so select the driver that matches how the printer is configured.

## 5. Firmware

An MFD has no operating system you normally log into; at power-on it loads its
own device OS, the **firmware**, which controls printing, scanning and faxing.
Manufacturers release **new firmware** to fix bugs or add features, and you
install it to upgrade the device. The firmware and its instructions live on the
**manufacturer's website** — and because **every device has a different upgrade
process**, always follow that documentation.

## 6. Wired and wireless connections

```
Ways to connect to an MFD:

  Wired:     USB (Type A at the PC, Type B or USB-C at the printer)
             RJ45 Ethernet   (can use more than one at once)
  Wireless:  Bluetooth  (short range - be close to the device)
             802.11 infrastructure (via an access point - shared)
             802.11 ad hoc         (point-to-point, no access point)
```

**Wired.** A **USB** connection is familiar, but note the ends differ: your
computer uses **Type A**, while the printer often uses **Type B** or **USB-C**.
Alternatively you connect to the network via an **RJ45 Ethernet** port on the
back. Many devices allow **several interfaces at once** — e.g. a USB Type B to a
computer *and* an RJ45 to the network simultaneously.

**Wireless.** Some MFDs support **Bluetooth**, which has **limited range**, so
you must be close. More common is **802.11** Wi-Fi in **infrastructure mode**,
where the device joins an **access point** and everyone on the network can reach
it. Some also support **ad hoc mode**, a **point-to-point** link with **no access
point** — useful for a single computer talking to an MFD where there is no AP.

> **Note (beyond this lesson):** 802.11 **ad hoc** for printers has largely been
> superseded by **Wi-Fi Direct**, the modern point-to-point way to connect
> directly to a printer without an access point.

## 7. Sharing the device

Many people need one MFD, and there are two ways to share it.

**OS printer sharing.** From a computer directly connected to the printer, the
operating system's printer properties has a **sharing tab** where you give the
printer a **network name**. The weakness: if that host computer is **turned
off**, nobody can print.

**Print server.** Most organisations instead use a **print server** — usually a
service **running inside the printer itself**, though **external** print servers
exist. Workstations send jobs to the print server, which **manages the printing**
to the MFD. A **web-based front end** (or client software) lets you view the
**queue** and administratively **add or remove jobs**.

```
Direct share vs print server:

  Direct:  PC (shares printer) --> MFD
           if that PC is off, nobody can print.

  Server:  PCs --> Print server --> MFD
           the server queues and manages all jobs (web front end).
```

## 8. Print features

### 8.1 Duplex

**Duplex** printing puts output on **both sides** of the page automatically,
saving paper. Not every printer supports it, and it **may need extra hardware**
in the printer to work.

### 8.2 Orientation

You can print **portrait** (the long edges at top and bottom) or **landscape**
(the long edges at left and right). The page does **not** physically turn as it
feeds through — the printer simply lays the image down in the orientation you
chose.

### 8.3 Paper trays

Larger MFDs have **multiple trays**, and you choose which to print from. Trays
often hold different **paper types and sizes** — plain paper, letterhead,
envelopes, and so on. In the example device:

| Tray | Contents |
| --- | --- |
| Tray 1 (default) | Letter paper |
| Tray 2 | No. 10 envelopes |
| Tray 3 | Legal paper |
| Tray 4 | 9 x 12 inch envelopes |

If output comes from the **wrong tray**, check the tray setting on the job.

### 8.4 Print quality

You can also set the **quality** of the output: the **resolution** (e.g. **600 x
600** dpi by default), and **colour vs grayscale**. A lower resolution **saves
toner** on a laser printer. For colour, a **colour-saving mode** uses less ink,
and the colour quality can be reduced from true colour to save resources.

## 9. Access control and secure output

A shared MFD sitting in the open raises two problems: who may use it, and how to
keep printed output private.

**User authentication and permissions.** You can **limit who prints**, often
through the printer sharing or the print server, by setting **rights and
permissions** for individual **users or groups** — separating who may **print**
from who may **manage** the device.

**Badging.** Because a central printer is usually out in the open, sensitive
output should not sit in the tray. With **badging**, you send the job but the
printer **holds** it; it prints only once you **physically visit the printer and
badge in** to authenticate, so the output appears while you are standing there.

**Secured prints.** Similar in effect but without a card: you define a
**passcode/PIN**, send the job, then **enter the PIN at the printer** to release
it. Windows supports **PIN-protected printing** — set a PIN in Windows, walk to
the printer, enter it, and the job prints.

**Auditing.** Printing costs money, and high-resolution colour costs more, so
organisations **audit who prints and how much**. Many printers keep an **audit
log** — in the device or in the OS that shares it, usually under security
monitoring, or in the **Windows Event Viewer**.

```
Secure release printing:

  Send job --> held in the queue (not printed yet)
           --> you walk to the MFD
           --> authenticate: badge OR PIN / passcode
           --> the job prints while you stand there
```

### 9.1 Worked example — deploying an office MFD securely

1. **Place and connect** the device out of the walkway, on power and **RJ45**
   Ethernet.
2. **Update firmware** from the vendor site first, following their process, and
   **change the default admin password**.
3. **Install the correct model-specific driver** (matching each OS's bit-width)
   and the matching **PDL** (PCL or PostScript).
4. **Share via a print server** so printing does not depend on one PC being on;
   set **permissions** for the right users/groups.
5. **Enable secured prints (PIN)** or **badging** so sensitive documents are not
   left in the tray, and confirm the **audit log** is capturing usage.
6. For scanning, point **scan-to-folder** at a share using a **least-privilege**
   account (Section 10 / Security).

## 10. Scanning

An MFD is an input device too. Most are **flatbed scanners**: place a physical
document on the glass and it produces a **digital** copy. Many add an **Automatic
Document Feeder (ADF)** so you can load a stack, press one button, and scan every
page to a file.

Where the scan goes has several options:

- **Scan to email** — convenient for **small** jobs; large attachments can
  overwhelm an inbox.
- **Scan to folder / scan to SMB** — sends the file to a network share. **SMB**
  is **Server Message Block**, the standard Windows file-sharing format; the scan
  lands in a Microsoft share you then open from your computer. Better for **large**
  jobs.
- **Scan to cloud** — to an external service such as **Google Drive** or
  **Dropbox**: load the paper, press a button, and the file goes to your cloud
  drive.

> **Note (beyond this lesson):** SMB runs over **TCP port 445** (see the Ports
> topic) — relevant because a scan-to-folder destination means the MFD stores
> credentials for that share.

## 11. Security perspective

Printers and MFDs are one of the most under-appreciated risks on a network,
precisely because they are treated as appliances rather than the computers they
are:

- **An MFD is a networked computer.** It runs a firmware OS, has a network stack,
  often a web admin interface, and internal storage — and it is frequently left
  **unpatched with default credentials**. Treat it like any host: **update
  firmware**, **change default admin passwords**, disable unused services
  (including the fax line and protocols you do not use), and put printers on a
  **segmented VLAN** rather than the flat user network.
- **Scan-to destinations hold credentials.** Scan-to-SMB stores a **share
  credential**, scan-to-email stores **SMTP** details, and scan-to-cloud stores a
  **cloud token** — all on the device. A compromised MFD leaks whatever it holds,
  so use a **least-privilege service account** for scan-to-folder (never a
  domain admin) and scope the share tightly.
- **Physical output is a leak channel — which badging/secure print close.** The
  lesson's own features are the control: **badging** and **PIN secured prints**
  stop sensitive documents sitting in the tray for anyone to read or take, and the
  **audit log** (or Event Viewer) gives you a record of who printed what.
- **Internal storage caches documents.** Many MFDs have an internal **hard
  drive** that retains scanned and printed images; a device sold or scrapped
  without **wiping or removing that drive** is a classic data-leak finding.
- **The print path itself is an attack surface.** The **Windows Print Spooler**
  has had serious vulnerabilities (the PrintNightmare family), and **printer
  drivers run in the kernel** — so a malicious "printer driver" or an abused
  Point-and-Print install is a full compromise (the same kernel-driver risk as
  the Expansion Cards lesson). Patch the spooler, restrict who can install
  drivers, and get drivers only from the manufacturer.

## Summary

- An **MFD** combines printer, scanner, fax and more; it needs power, a
  (usually wired) network connection, and an accessible spot.
- Install the **model-specific driver** on each workstation, matching the OS and
  its **bit-width** (32-bit OS -> 32-bit driver, 64-bit -> 64-bit).
- **PDLs:** **PCL** (HP) and **PostScript** (Adobe); match the driver to the
  printer's language.
- **Firmware** is the device OS; update it from the vendor site per their process.
- **Connect** by **USB** (Type A at PC, Type B/USB-C at printer), **RJ45
  Ethernet** (often several at once), **Bluetooth** (short range), or **802.11**
  **infrastructure** (via AP) or **ad hoc** (point-to-point).
- **Share** via OS printer sharing (host must stay on) or a **print server**
  (queue + web front end).
- **Features:** **duplex** (both sides), **orientation** (portrait/landscape),
  **paper trays** (types/sizes, a default), and **quality** (resolution,
  colour/grayscale, colour/toner saving).
- **Secure output:** user **authentication/permissions**, **badging**, **secured
  prints (PIN)**, and **auditing** (device log / Event Viewer).
- **Scan** on a **flatbed** (or **ADF**) to **email**, a **folder/SMB** share, or
  the **cloud**.

## Glossary

| Term | Meaning |
| --- | --- |
| MFD | Multifunction device; printer/scanner/fax/copier in one. |
| Printer driver | Software letting an OS print to a specific model. |
| PDL | Page description language the printer renders a page from. |
| PCL | Printer Command Language; a PDL from Hewlett-Packard. |
| PostScript | A PDL from Adobe, widely supported. |
| Firmware | The device's own operating system. |
| USB Type B | The square-ish USB connector common on printers. |
| Infrastructure mode | Wi-Fi via an access point (shared). |
| Ad hoc mode | Point-to-point Wi-Fi with no access point. |
| Print server | Service that queues and manages jobs to a printer. |
| Duplex | Printing on both sides of the page. |
| Orientation | Portrait or landscape layout of the output. |
| Paper tray | A source of paper of a given type/size. |
| Resolution | Print detail in dpi (e.g. 600 x 600). |
| Badging | Releasing a held job by badging in at the printer. |
| Secured print | Releasing a held job with a PIN/passcode. |
| ADF | Automatic Document Feeder for multi-page scanning. |
| Scan to SMB | Scanning to a Server Message Block (Windows) share. |

## Review questions

1. What functions does a multifunction device typically combine?
2. What three things must a driver match for an MFD to work fully?
3. Name the two common page description languages and who created each.
4. What is firmware on an MFD, and where do you get updates?
5. Which USB connector types appear at the computer versus the printer end?
6. Distinguish 802.11 infrastructure mode from ad hoc mode.
7. What is the main weakness of sharing a printer directly from a computer?
8. What does a print server add over direct sharing?
9. What is duplex printing, and what might it require?
10. In the example, which tray is the default and what does it hold?
11. How does badging protect sensitive output, and how does a secured print
    differ?
12. Where can you find a printer's audit log on a Windows system?
13. Name three scan-to destinations and when scan-to-folder beats scan-to-email.
14. Scenario: a decommissioned office MFD is being sold. What data risk must you
    address first?
15. Scenario: users on a 64-bit OS can't access the MFD's advanced features.
    What driver issue would you check?

## Answer key

1. **Printer, scanner and fax (and often copier) in one unit.** Many peripherals,
   one device.
2. **The model, the operating system, and the OS bit-width (32/64-bit).** Right
   driver unlocks full features.
3. **PCL (Printer Command Language) by Hewlett-Packard, and PostScript by
   Adobe.** The two common PDLs.
4. **The device's own operating system; updates come from the manufacturer's
   website, following their process.** Follow the docs — every device differs.
5. **Type A at the computer; Type B or USB-C at the printer.** The ends differ.
6. **Infrastructure uses an access point so everyone can reach the device; ad hoc
   is a direct point-to-point link with no AP.** Shared vs direct.
7. **If the host computer is turned off, nobody can print.** Availability depends
   on that PC.
8. **A queue and management (web front end/client) that handles jobs
   independently of any one PC.** Centralised, always-on printing.
9. **Printing on both sides automatically; it may need extra hardware in the
   printer.** Not universal.
10. **Tray 1, holding letter paper.** The automatically selected tray.
11. **Badging holds the job until you badge in at the printer, so output isn't
    left in the tray; a secured print does the same but releases with a
    PIN/passcode instead of a badge.** Both are pull/secure release.
12. **In the Windows Event Viewer (or the printer's own security monitoring/audit
    log).** Records who printed what.
13. **Email, a folder/SMB share, and the cloud (e.g. Google Drive/Dropbox);
    scan-to-folder suits large jobs that would overwhelm an inbox.** Match
    destination to size.
14. **The internal storage may cache scanned/printed documents — wipe or remove
    the drive before disposal.** MFDs retain data.
15. **A wrong or generic driver — confirm the correct model-specific, 64-bit
    driver is installed.** The right driver unlocks full features.
