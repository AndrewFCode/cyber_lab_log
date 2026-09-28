---
title: "A+ Core 1 3.5: HSM and TPM"
description: "A+ Core 1 3.5 — TPM (on-board crypto, root of trust, BitLocker) vs HSM (centralised keys and crypto offload)."
tags: ["a-plus", "comptia", "messer", "hardware", "tpm", "hsm", "encryption", "keys", "root-of-trust"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "HSM and TPM"
moduleOrder: 79
unit: 3
---

> **In one line:** algorithms are public, so the secret is the key — a **TPM** protects one device's keys in on-board hardware (BitLocker, root of trust), an **HSM** protects and offloads keys for many systems.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the HSM and TPM class notes; the section overview is the Section 3 sheet.

## Why keys matter

- Encryption algorithms are **open standards** — security rests on the **key**, not on hiding the method.
- The problem: once data is encrypted, **how do you protect the key?** → TPM (one device) or HSM (many).

## TPM (Trusted Platform Module)

| Aspect | Detail |
| --- | --- |
| What | Standardised on-board crypto hardware — a **module** or **built into the board** |
| Inside | Crypto processor (**RNG**, key generation) · **persistent** memory (burned-in keys) · **versatile** memory (stored keys) · password-protected |
| Unique key | Secret, per-system, hardware-bound |
| Enables | **BitLocker/FDE** (drive won't decrypt in another PC), **root of trust**, **remote attestation** |
| In BIOS | Security → **TCG** (Trusted Computing Group); **TPM 2.0**; enable/disable; clear |
| Beyond scope | Burned-in key = **Endorsement Key**; **firmware TPM** (fTPM); **Windows 11 needs TPM 2.0**; phones use a secure element/TEE, not a literal TPM |

## HSM (Hardware Security Module)

| Aspect | Detail |
| --- | --- |
| Scope | **Many** systems |
| Where | Data-centre high-end device (or personal/lightweight, e.g. **crypto wallet**) |
| Roles | **Central key storage/backup** · **crypto acceleration/offload** (e.g. web-server TLS) |
| Protects | Infrastructure keys — web servers, **certificate authority** |
| Beyond scope | Usually **FIPS 140-2/3**, tamper-responsive (zeroise on attack); keys never leave in plaintext |

## TPM vs HSM

| | TPM | HSM |
| --- | --- | --- |
| Devices | One | Many |
| Use | Local FDE, device trust, phone lock/boot | Central keys + crypto offload |

## 🔐 Security notes

- **TPM defeats "pull the drive and read it elsewhere"** — but TPM-only unlocks at boot, so a whole-laptop thief still gets in. Use **TPM + PIN**.
- **Discrete TPMs can be bus-sniffed** for the BitLocker key (physical access) — mitigate with TPM+PIN, a **firmware TPM**, or bus encryption.
- **Clearing the TPM destroys sealed keys** → recovery-key prompt/lockout. Back up the BitLocker **recovery key** before touching TPM settings.
- **Attestation** lets you require a device prove an unchanged boot state before joining the network.
- **An HSM concentrates trust** (CA/server keys, FIPS, tamper-responsive) — a crown-jewel asset to lock down and log.

## Practice drills

<details>
<summary>1. Why is it OK that encryption algorithms are public?</summary>

Security rests on the secret key, not on hiding the algorithm — knowing the lock doesn't open the door.
</details>

<details>
<summary>2. Where can a TPM be located?</summary>

As a separate module on the motherboard, or built into the motherboard itself.
</details>

<details>
<summary>3. How does a TPM stop a stolen encrypted drive being read elsewhere?</summary>

The decryption key stays in the original machine's TPM, so the drive won't decrypt in another computer.
</details>

<details>
<summary>4. What does TCG stand for, and where are TPM settings in the BIOS?</summary>

Trusted Computing Group; under Security (as TCG / TPM Security Chip 2.0) — enable/disable and clear.
</details>

<details>
<summary>5. Two roles an HSM plays in a data centre?</summary>

Centralised key storage/backup and cryptographic acceleration/offload (protecting web-server and CA keys).
</details>

<details>
<summary>6. Give a personal/lightweight HSM example.</summary>

A hardware cryptocurrency wallet.
</details>

<details>
<summary>7. TPM or HSM for a CA signing key used by many services?</summary>

HSM — central, hardened, built for many systems' keys.
</details>

## Key takeaways

- **The key is the secret**, so protecting the key is the whole game.
- **TPM = one device:** on-board crypto, unique hardware-bound key → BitLocker, root of trust, attestation.
- **BIOS:** Security → TCG, TPM 2.0, enable/disable/clear.
- **HSM = many devices:** central key storage/backup + crypto offload; CA and web-server keys.
- **Security:** use **TPM + PIN** (TPM-only auto-unlocks; discrete TPMs can be sniffed); back up recovery keys before clearing a TPM.
