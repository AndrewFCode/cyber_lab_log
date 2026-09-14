---
title: What happens when you type a URL (AI Example)
description: DNS, TCP, TLS and the first byte, in the order they actually occur
tags:
  - networking
  - dns
  - http
draft: false
pubDate: 2026-09-03
difficulty: beginner
---
A deliberately complete walk through one navigation, because the interesting failures all live
in the gaps between these steps.

## 1. The browser decides it is a URL at all

Typing `example.com` into the address bar is ambiguous — it could be a search. The browser
applies heuristics (does it contain a dot, does it match a known TLD, is there a space) and only
then treats it as a navigation. This is why a typo'd domain sometimes becomes a search.

## 2. DNS resolution

The browser needs an IP address. It checks, in order:

1. Its own in-memory DNS cache.
2. The operating system cache, and `/etc/hosts`.
3. The configured resolver — your router, your ISP, or something like `1.1.1.1`.

If the resolver has no cached answer, it walks the hierarchy: a root server tells it which
nameservers own `.com`, those tell it which nameservers own `example.com`, and those return the
A or AAAA record. The resolver does this work; your machine just asks once and waits.

Each answer carries a TTL, which is why a DNS change appears instantly for some people and
takes hours for others — everyone is on a different cache clock.

## 3. TCP connection

With an IP, the browser opens a TCP connection to port 443. The three-way handshake costs one
round trip:

```
client → server   SYN
server → client   SYN-ACK
client → server   ACK
```

## 4. TLS handshake

Now the connection gets encrypted. In TLS 1.3 this is one more round trip, during which:

- The client sends the protocol versions and cipher suites it supports, plus the hostname it
wants via **SNI** — necessary because one IP commonly serves thousands of sites.
- The server returns a certificate chain.
- The client verifies that chain up to a root it trusts, checks the hostname matches, and checks
the dates.
- Both sides derive session keys.

A certificate error is this step failing. So is the "wrong site" you occasionally see behind a
misconfigured CDN — SNI and the server's own routing disagreed.

## 5. The HTTP request

Finally something resembling the thing you asked for:

```http
GET / HTTP/2
Host: example.com
User-Agent: Mozilla/5.0 ...
Accept: text/html,application/xhtml+xml
Accept-Encoding: gzip, br
```

## 6. The response, and the waterfall

The server returns headers and an HTML body. The browser parses as bytes arrive, and whenever it
meets a subresource it starts fetching:

- A stylesheet blocks rendering, because the browser will not paint text it might have to
restyle.
- A plain `<script>` blocks parsing, because the script could call `document.write`.
- `<script defer>` waits until parsing finishes; `async` runs whenever it lands.

Then layout, paint, composite — and the page appears.

## Why this ordering is worth knowing

Almost every "the site is slow" complaint maps to exactly one of these steps, and they have
completely different fixes:


| Symptom | Step | Fix |
| ----------------------------------- | --------- | -------------------------------------------- |
| Long delay before anything happens | DNS | Lower TTLs, faster resolver, DNS prefetch |
| Slow on first visit only | TCP + TLS | Keep-alive, HTTP/2, a CDN closer to the user |
| Fast headers, slow content | Server | Caching, a faster query, streaming |
| Content arrives but nothing renders | Waterfall | Inline critical CSS, defer scripts |


Measuring before guessing is the whole point of knowing the sequence.