---
title: "Code: The World Brain"
description: "Code ch. 28 — graphics, sound, networks, the internet and the web tying it all together, plus a look at where computing goes next."
tags: ["code", "petzold", "computing", "networking", "internet"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 28"
moduleOrder: 28
unit: 28
---
> **In one line:** the same bits that added two numbers now carry images, sound and the whole internet — the final chapter connects every machine into one worldwide system.

*Companion to: Charles Petzold, Code (2nd edition), chapter 28 — the closing chapter.*

---

## Everything is bits

| Media | How it's encoded |
|---|---|
| Images | A grid of pixels; each pixel is red/green/blue values (24-bit colour = one byte each) |
| Sound | Amplitude sampled thousands of times a second (CD: 44,100 samples/s, 16 bits) |
| Video | Many images per second, plus sound, heavily compressed |
| Text | Characters as numbers ([ch. 13](/resources/code/13/)) |

**Compression** shrinks all of these: lossless (PNG, ZIP) keeps every bit; lossy (JPEG, MP3, H.264) discards detail people barely notice.

---

## From one machine to the network

| Layer | What it does | Everyday form |
|---|---|---|
| Physical / link | Bits over copper, fibre or radio | Ethernet, Wi-Fi |
| Internet (IP) | Routes packets between networks by address | IP addresses |
| Transport (TCP/UDP) | Reliable or fast delivery to the right program | Ports |
| Application | The services people use | HTTP, DNS, email |

- **Packets:** data is chopped into packets, each routed independently and reassembled.
- **The internet** is this system at global scale; the **web** (HTTP, HTML, URLs) is one application running on top of it.

Networking detail lives in [A+ Core 1 domain 2](/resources/a-plus-core-1/2/).

---

## The web in one request

1. You type a URL. **DNS** turns the name into an IP address.
2. Your browser opens a **TCP** connection (port 443) and a **TLS** handshake encrypts it.
3. It sends an **HTTP** request; the server replies with **HTML**, CSS and JavaScript.
4. The browser renders the page — itself a small computer running the JavaScript.

---

## Where it goes next

The book closes by looking outward: ever-smaller and more numerous computers (phones, IoT), the cloud, and machine learning — all still built, underneath, from the bits and gates of the earlier chapters.

---

## Try it

```bash
dig example.com +short          # name → IP (the first step of every request)
curl -I https://example.com     # just the HTTP response headers
traceroute example.com          # the hops a packet takes across the internet
```

```powershell
Resolve-DnsName example.com
Test-NetConnection example.com -Port 443
```

---

## 🔐 Security and IT connections

- **Encryption is what makes the shared network usable.** TLS (HTTPS) gives confidentiality and integrity over wires anyone can tap; without it, everything is [chapter 1](/resources/code/1/)'s open Morse code.
- **Every layer is an attack surface:** spoofed DNS, intercepted TCP, stripped TLS, malicious JavaScript. Defence in depth means controls at each one.
- **Compression can leak.** Attacks like CRIME/BREACH inferred secrets from the *size* of compressed, encrypted responses — a reminder that even "just encoding" has security consequences.
- **The through-line of the whole book:** it's all bits. Understanding that — from a torch blinking Morse to a TLS handshake — is what lets you reason about how any of it can fail or be defended.

---

## Practice drills

<details>
<summary>1. What's the difference between lossless and lossy compression?</summary>

Lossless (PNG, ZIP) restores every original bit; lossy (JPEG, MP3) permanently discards detail to save space.
</details>

<details>
<summary>2. Put these in order for loading a web page: TLS handshake, DNS lookup, HTTP request, TCP connection.</summary>

DNS lookup → TCP connection → TLS handshake → HTTP request.
</details>

<details>
<summary>3. What does the web run on top of, and what does that make it?</summary>

The internet (IP/TCP). The web is one application layered on the internet, not the internet itself.
</details>

---

## Key takeaways

- Images, sound and video are all bits, usually compressed (lossless or lossy).
- Networking is layered: link, IP, transport, application; the internet connects networks, the web runs on it.
- A web request chains DNS, TCP, TLS and HTTP — each a layer to secure.
- The book's message: it's bits all the way down, and understanding that is the real literacy.
