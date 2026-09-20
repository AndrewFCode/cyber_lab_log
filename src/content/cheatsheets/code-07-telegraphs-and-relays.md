---
title: "Code: Telegraphs and Relays"
description: "Code ch. 7 — the telegraph key and sounder, why long lines fail, and the relay: a switch flipped by electricity that regenerates the signal."
tags: ["code", "petzold", "computing", "electricity"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 7"
moduleOrder: 7
unit: 7
---
> **In one line:** the relay — a switch operated by an electromagnet — lets one circuit control another, and that idea is the seed of every computer.

*Companion to: Charles Petzold, Code (2nd edition), chapter 7.*

---

## The telegraph

| Part | How it works |
|---|---|
| Key | A spring-loaded switch the operator taps to send dots and dashes |
| Line | A long wire, using the earth as its return path |
| Sounder | An **electromagnet** that pulls an iron bar down with a click when current flows |

- **Electromagnet:** a coil of wire around iron. Current makes it magnetic; no current and it lets go.
- **The problem:** over hundreds of miles, wire resistance leaves too little current to work the sounder.

---

## The relay

```
 weak incoming line ──► [electromagnet] ──pulls──► [switch] ── fresh local battery ──► next line
```

| Feature | Why it matters |
|---|---|
| Input current energises a coil | A tiny current can control a big one |
| The coil closes a separate switch | The output circuit has its own fresh power |
| Output copies the input | The signal is **regenerated** — relays chained along the route send it any distance |
| It's a switch controlled by electricity | Relays can control other relays — the basis of logic gates (next chapter) |

**Relay → vacuum tube → transistor:** same job, each faster and smaller than the last.

---

## 🔐 Security and IT connections

- **Regeneration is how networks span distance.** Repeaters, switches and routers receive a weakened signal and send a clean new one.
- **"Relay" still means "receive and pass on."** An **open SMTP relay** forwards anyone's mail, so spammers abuse it. Mail servers should relay only for authenticated users.
- **Relays still exist physically:** PSUs, UPS units and industrial control systems (SCADA) use them to switch big loads from small signals.

---

## Practice drills

<details>
<summary>1. What does an electromagnet do when current stops?</summary>

It loses its magnetism and releases the iron bar or switch contact.
</details>

<details>
<summary>2. Why did long telegraph lines need relays?</summary>

Wire resistance weakened the current. A relay used the weak signal to switch a fresh local battery onto the next stretch of line.
</details>

<details>
<summary>3. What's an open mail relay and why is it bad?</summary>

A mail server that forwards anyone's email without authentication — spammers use it to send mail that looks like it comes from you.
</details>

---

## Key takeaways

- The telegraph used a key (switch) and a sounder (electromagnet) over long wires.
- A relay uses one circuit's current to flip a switch in another, regenerating the signal.
- Electrically controlled switches are the building block of logic — and of computers.
