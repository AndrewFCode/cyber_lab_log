---
title: "A+ Core 1 3.5: HSM and TPM — Class Notes"
description: "Full class notes for A+ Core 1 3.5: protecting cryptographic keys with a TPM (root of trust, BitLocker) and centralising them with an HSM."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "tpm", "hsm", "encryption", "keys", "root-of-trust"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> seventh lesson under objective **3.5**, and it follows naturally from the BIOS
> lessons — the TPM is the security chip you enable in firmware, and the HSM is
> its data-centre-scale cousin.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why protecting the cryptographic **key** is the central problem in
   encryption.
2. Describe what a **TPM** is, what is inside it, and how it is fitted.
3. Explain how a TPM's unique key enables full-disk encryption, a root of trust
   and remote attestation.
4. Find and manage the TPM settings in the BIOS.
5. Describe an **HSM** and the roles it plays at scale.
6. Compare a TPM and an HSM and choose the right one for a scenario.

## 1. Encryption and the problem of the key

So much of technology is about keeping secrets. Data we hold should be readable
only by us, and to achieve that we lean on **encryption** almost everywhere: a
phone encrypts what it stores and what it sends over the air, traffic to and from
a web server is encrypted, and data on a local drive or SSD can be encrypted too.

The *algorithms* that do this are usually **open, public standards** — anyone can
read exactly how the encryption and decryption work. That is not the weakness it
sounds like. Think of the lock in a door: understanding how the mechanism works
does not get you through the door. What gets you through is the one unique thing
nobody else has — the **key**.

Computers use **digital keys** the same way. Encrypt data with a key and you must
have the correct key to decrypt it later. Which raises the real question of the
lesson: once your data is protected by a key, **how do you protect the key
itself?**

## 2. The Trusted Platform Module (TPM)

On a personal computer, one answer is the **Trusted Platform Module**, or
**TPM** — a **standardised piece of hardware built for encryption**, with many
cryptographic functions on the chip itself. A TPM may be a **separate module**
plugged onto the motherboard, or it may be **built into the motherboard**
directly.

Inside a TPM you find:

- A **cryptographic processor** that can perform **random number generation** and
  **generate cryptographic keys** on the chip.
- **Persistent memory** holding **keys burned in during manufacture** — unique to
  that chip.
- **Versatile memory** for storing keys and other information as you use it.
- **Security and access control:** the TPM is **password-protected**, with
  features designed to stop anyone reaching your private keys.

> **Note (beyond this lesson):** the burned-in unique key is called the
> **Endorsement Key (EK)**, and the TPM also holds **Platform Configuration
> Registers (PCRs)** that record measurements of the boot process — the basis of
> "sealing" a key to a known-good system state. A TPM can also be a **firmware
> TPM** (fTPM / Intel PTT) implemented in the CPU rather than a separate chip;
> **Windows 11 requires TPM 2.0**, firmware or discrete.

```
Trusted Platform Module (TPM):

+-------------------------------------------+
|  Crypto processor                         |
|    - random number generation             |
|    - key generation                       |
|                                           |
|  Persistent memory                        |
|    - key(s) burned in at manufacture      |
|                                           |
|  Versatile memory                         |
|    - stores keys and other data in use    |
|                                           |
|  Security / access control (password)     |
+-------------------------------------------+
   Unique secret key per system = root of trust
```

### 2.1 What the unique key lets you do

Because a TPM holds a **secret key that is unique to your system** — no other
machine has the same one — your encryption keys become tied to *this* computer.
That enables several things:

- **Full-disk encryption.** With **BitLocker** (or another FDE product), the TPM
  supplies and protects the key that encrypts the drive. A powerful consequence:
  you **cannot pull the drive out and read it in another machine**, because the
  decryption key stays behind in the original computer's TPM.
- **A root of trust.** Because the TPM's key is unique and bound to the hardware,
  it anchors trust in that specific machine. You can use it to confirm that a
  computer you are talking to across the network really is the device you expect.
- **Remote attestation.** The TPM can be used to **remotely determine whether
  anything has changed** on a system, so you know a machine you connect to is the
  one you think it is, in the state you expect.

Because the TPM is **physically part of the hardware**, it cannot easily be
copied and moved elsewhere — seeing that TPM means you really are looking at that
particular physical computer.

> **Note (beyond this lesson):** phones achieve the same ends with equivalent
> secure hardware — a **secure element**, **TrustZone/TEE**, or Apple's **Secure
> Enclave** — rather than a literal PC-style TPM. The function (protect keys in
> tamper-resistant hardware, back screen-lock and encryption) is the same, so
> treating "the phone uses a TPM" as shorthand is fine, but the component has a
> different name.

## 3. Managing the TPM in the BIOS

Firmware is where you turn TPM features on and off. In the example BIOS it is
under **Security**, and scrolling down reveals an option labelled **TCG** —
**Trusted Computing Group**, the organisation that manages the TPM standards. The
system shows a **TPM Security Chip 2.0**, and from here you can:

- **Enable or disable** the TPM.
- **Clear** any data stored in the TPM, with parameters controlling how that
  deletion happens.

> **Caution:** clearing the TPM destroys the keys it protects. If a drive is
> BitLocker-encrypted and its key is sealed to the TPM, clearing the TPM (or a
> firmware change that alters the measured boot state) can force a **recovery
> key** prompt. Always have the BitLocker recovery key backed up before touching
> TPM settings.

## 4. The Hardware Security Module (HSM)

A TPM is ideal for **one** device. But a data centre may have **hundreds or
thousands** of devices, each with keys of its own, and that needs a larger-scale
solution: the **Hardware Security Module**, or **HSM**.

HSMs do several jobs:

- **Centralised key storage and backup.** Rather than scattering keys across
  every server, you keep them on one central, protected device — for example, all
  your web-server keys managed on a single HSM.
- **Cryptographic acceleration / offload.** An HSM often does the crypto *for*
  other systems: instead of a web server spending its own CPU on encryption and
  decryption, that work happens in hardware on the HSM, offloading it from the
  software service.
- **Personal / lightweight HSMs.** Smaller portable HSMs store personal keys and
  move between computers — a hardware **cryptocurrency wallet** is a common
  example, protecting the owner's keys on a small dedicated device.

In the data centre, an HSM is usually a **high-end server fitted with
cryptographic hardware**, deployed to protect the keys that matter most — the
keys behind your web servers, or those of a **certificate authority**.

> **Note (beyond this lesson):** production HSMs are typically **FIPS 140-2/140-3
> validated** and **tamper-responsive** — they zeroise (wipe) their keys if
> physically attacked — and keys generated inside them **never leave in
> plaintext**. That is exactly why a certificate authority guards its signing key
> in one.

### 4.1 Worked example — matching the tool to the job

Two requests, one principle.

1. **"Encrypt the finance team's laptops so a stolen laptop is useless."**
   This is single-device protection, so use each laptop's **TPM** with
   **BitLocker**: the key is sealed to the machine, and a thief who removes the
   SSD cannot read it elsewhere. (Add a startup **PIN** — see Security
   perspective.)
2. **"Protect the private key our public web servers and CA share, and take the
   TLS load off the web servers."** This spans many systems and needs central,
   hardened key storage plus offload, so use an **HSM**: it holds the keys and
   performs the crypto in hardware.

The rule: **TPM for one device's own keys; HSM for many systems' keys and for
offloading crypto.**

## 5. TPM vs HSM

| | TPM | HSM |
| --- | --- | --- |
| Scope | A single system | Many systems |
| Where it lives | On one motherboard — a module or built in | A data-centre high-end device (or a personal/lightweight unit) |
| Typical use | Local full-disk encryption (BitLocker), device root of trust, phone boot/screen-lock | Central key storage and backup, cryptographic acceleration/offload |
| Protects | This device's data and keys | Infrastructure keys (web servers, certificate authority) |

## 6. Security perspective

This lesson *is* security hardware, so the defender's reading is central:

- **The TPM makes a stolen drive worthless — if used well.** Sealing the FDE key
  in the TPM means the disk only decrypts on its own machine, which defeats the
  "pull the drive and read it elsewhere" attack. The important caveat is that a
  TPM-only configuration unlocks automatically at boot, so an attacker with the
  whole laptop still reaches the desktop. Adding a **TPM + PIN** (or password)
  ties decryption to something the attacker does not have.
- **Discrete TPMs can be bus-sniffed.** A separate TPM chip talks to the CPU over
  a board bus, and an attacker with physical access can interpose on that bus to
  capture a BitLocker key in transit (the well-documented "TPM sniffing"
  attack). Mitigate with **TPM + PIN**, a **firmware TPM** (no external bus), or
  bus-encryption where supported. This is the same physical-access theme as the
  internal TPM header from the Motherboard connections lesson.
- **Clearing the TPM is destructive, and that cuts both ways.** It is how you
  safely decommission a machine's keys, but an attacker (or a careless firmware
  change) that clears or de-syncs the TPM triggers recovery-key prompts and can
  lock users out — so back up **recovery keys** and treat TPM clears as a change
  to control.
- **Root of trust and attestation are how you trust a remote machine.** Because
  the key is bound to the hardware, health-attestation and conditional-access
  systems can require a device to *prove* its integrity (unchanged boot state)
  before it joins the network — a strong control against tampered or unknown
  endpoints.
- **An HSM concentrates trust, so protect it accordingly.** Centralising CA and
  server keys in one tamper-responsive, FIPS-validated device massively reduces
  key sprawl and keeps keys out of software memory — but it also makes that HSM a
  crown-jewel asset. Access to it, and to its crypto-offload service, must be
  tightly controlled and logged.

## Summary

- Encryption is everywhere and its **algorithms are public**; the secret is the
  **key**, so the real problem is **protecting the key**.
- A **TPM** is standardised crypto hardware on a PC (a module or built into the
  board): a **crypto processor** (RNG, key generation), **persistent** burned-in
  keys, **versatile** key storage, and **password-protected** access.
- Its **unique, hardware-bound key** enables **full-disk encryption** (BitLocker
  — the drive won't decrypt in another machine), a **root of trust**, and
  **remote attestation**.
- In the BIOS (**Security -> TCG**, from the **Trusted Computing Group**) you
  **enable/disable** and **clear** the TPM; a TPM **2.0** chip is current.
- An **HSM** scales this to many systems: **centralised key storage/backup** and
  **crypto acceleration/offload**, as a data-centre high-end device — plus
  **personal/lightweight** HSMs (e.g. crypto wallets).
- **TPM = one device's keys; HSM = many systems' keys** (web servers, CA).

## Glossary

| Term | Meaning |
| --- | --- |
| Encryption | Making data unreadable without the correct key. |
| Key | The unique secret that encrypts/decrypts data. |
| TPM | Trusted Platform Module; on-board crypto security hardware. |
| Cryptographic processor | TPM engine for RNG and key generation. |
| Persistent memory | TPM store for keys burned in at manufacture. |
| Endorsement Key | The TPM's unique burned-in key (beyond this lesson). |
| Versatile memory | TPM store for keys and data used at runtime. |
| Root of trust | Hardware-bound anchor for trusting a system. |
| Remote attestation | Proving a machine's integrity/state to another. |
| BitLocker | Windows full-disk encryption that can use the TPM. |
| Full-disk encryption | Encrypting an entire drive's contents. |
| TCG | Trusted Computing Group; manages the TPM standards. |
| TPM 2.0 | The current TPM standard version. |
| Firmware TPM (fTPM) | A TPM implemented in CPU firmware (beyond this lesson). |
| HSM | Hardware Security Module; scaled key protection/offload. |
| Crypto offload | Performing encryption in HSM hardware, not the server. |
| Certificate authority | Issues certificates; its key is a prime HSM use. |

## Review questions

1. Why is it usually fine that encryption algorithms are public standards?
2. What is the central problem this lesson addresses?
3. What is a TPM, and what are the two ways it can be fitted to a system?
4. List the main components inside a TPM.
5. How does a TPM make a stolen, encrypted drive useless in another computer?
6. What do "root of trust" and "remote attestation" mean in the context of a
   TPM?
7. In the BIOS, under what menu do you find TPM settings, and what does TCG
   stand for?
8. Name two things you can do to the TPM from the BIOS.
9. What is an HSM, and how does its scope differ from a TPM's?
10. Give two roles an HSM plays in a data centre.
11. Give an example of a personal/lightweight HSM.
12. Scenario: you must protect a certificate authority's signing key used by many
    services. TPM or HSM, and why?
13. Scenario: a laptop uses TPM-only BitLocker. A thief steals the whole laptop.
    Is the data protected? What would improve it?

## Answer key

1. **The security rests on the secret key, not on hiding the algorithm — knowing
   the lock doesn't grant entry without the key.** Open review even strengthens
   the algorithm.
2. **How to protect the cryptographic key that protects your data.** Everything
   else follows from that.
3. **A standardised on-board crypto hardware module; fitted as a separate module
   or built into the motherboard.** Purpose-built for encryption.
4. **A cryptographic processor (RNG, key generation), persistent memory with
   burned-in keys, versatile memory for stored keys, and password-protected
   access control.** Crypto plus secure storage.
5. **The drive's decryption key stays in the original machine's TPM, so the drive
   won't decrypt elsewhere.** The key is bound to that computer.
6. **Root of trust: the hardware-bound unique key anchors trust in that specific
   machine; remote attestation: using it to prove the machine is unchanged and
   the expected one.** Trusting a remote device.
7. **Under Security; TCG stands for Trusted Computing Group.** They manage the TPM
   standards.
8. **Enable/disable the TPM, and clear its stored data (with deletion
   parameters).** Basic firmware control.
9. **A Hardware Security Module — scaled key protection for many systems, versus a
   TPM's single system.** Central vs local.
10. **Centralised key storage/backup and cryptographic acceleration/offload — plus
    protecting infrastructure keys (web servers, CA).** Any two.
11. **A hardware cryptocurrency wallet.** A portable personal HSM.
12. **HSM — it protects keys shared across many systems and is a hardened, central
    device built for exactly that (CA keys).** TPM is per-device.
13. **Not fully — TPM-only unlocks automatically at boot, so the whole-laptop
    thief reaches the desktop; add a TPM + PIN.** Bind decryption to something the
    thief lacks.
