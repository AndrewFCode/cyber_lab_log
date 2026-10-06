---
title: "TryHackMe 7: HTTP in Detail"
description: "TryHackMe module 7 — HTTP/HTTPS, URL structure, requests/responses, HTTP methods, status codes, headers, and cookies."
tags: ["tryhackme", "http", "https", "url", "http-methods", "status-codes", "cookies"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "tryhackme"
module: "HTTP in Detail"
moduleOrder: 45
unit: 7
---

> **In one line:** HTTP is the rulebook browsers and servers use to exchange page data — URLs address a resource, requests state a method and headers, responses carry a status code and their own headers, and cookies give stateless HTTP a way to remember you.

*Companion to: TryHackMe Pre Security, Module 7.* The full version is the HTTP in Detail class notes; the module overview is the TryHackMe module sheet.

**Numbering note:** filed as Module 7 (following Module 6, DNS in Detail) — the source labelled this "6", almost certainly a copy-paste slip since HTTP and DNS are sequential topics.

## URL anatomy

| Part | Purpose | Example |
| --- | --- | --- |
| Scheme | Protocol | `http`, `https`, `ftp` |
| User | Credentials in the URL | — |
| Host | Domain/IP of the server | `tryhackme.com` |
| Port | Connection port | 80 (HTTP), 443 (HTTPS), or 1–65535 |
| Path | Resource location | `/blog` |
| Query string | Extra parameters | `?id=1` |
| Fragment | In-page location | `#section` |

## Request / response shape

```
GET / HTTP/1.1              <- method, path, version
Host: example.com           <- request headers...
User-Agent: ...
Referer: ...
                             <- blank line = end of request
```

```
HTTP/1.1 200 OK              <- version + status code
Server: ...                  <- response headers...
Content-Type: text/html
Content-Length: 1256
                              <- blank line = end of headers
<body content>
```

## HTTP methods

| Method | Purpose |
| --- | --- |
| GET | Retrieve information |
| POST | Submit data, potentially create |
| PUT | Submit data, update |
| DELETE | Remove information |

## Status codes

| Range | Meaning |
| --- | --- |
| 1xx | Informational (rare today) |
| 2xx | Success |
| 3xx | Redirection |
| 4xx | Client error |
| 5xx | Server error |

| Code | Meaning |
| --- | --- |
| 200 OK | Success |
| 201 Created | Resource created |
| 301 Moved Permanently | Permanent redirect |
| 302 Found | Temporary redirect |
| 400 Bad Request | Malformed/missing request data |
| 401 Not Authorised | Authentication required |
| 403 Forbidden | Access denied |
| 404 Not Found | Doesn't exist |
| 405 Method Not Allowed | Exists, wrong method |
| 500 Internal Server Error | Unhandled server error |
| 503 Service Unavailable | Overloaded/maintenance |

## Headers

| Request (client → server) | Response (server → client) |
| --- | --- |
| Host — which site to serve | Set-Cookie — data to store |
| User-Agent — browser identity | Cache-Control — caching duration |
| Content-Length — data being sent | Content-Type — what kind of data |
| Accept-Encoding — supported compression | Content-Encoding — compression used |
| Cookie — stored data sent back | |

## Cookies

- Created by a **Set-Cookie** response header; sent back via **Cookie** on every later request.
- Exist because **HTTP is stateless** — no built-in memory between requests.
- Commonly hold a **token**, not a plain-text password.
- View them: browser dev tools → **Network** tab → a request → **Cookies** tab.

## 🔐 Security notes

- **HTTP vs HTTPS is a real decision:** plain HTTP can be read/tampered with in transit; HTTPS encrypts and verifies server identity.
- **Cookies are a prime target:** stealing a session cookie (XSS, unencrypted link, weak config) impersonates the user without the password — hence `HttpOnly`/`Secure` flags on real systems.
- **User-Agent/Referer leak info voluntarily** — more than a site may strictly need.
- **403 vs 404 leaks existence:** 403 confirms a resource exists but is protected; 404 says it doesn't exist — some systems deliberately return 404 for both to avoid this signal.
- **405 confirms functionality:** the resource exists and wants a different method — useful for mapping an app's actions.

## Practice drills

<details>
<summary>1. What does HTTPS add over HTTP?</summary>

Encryption (data can't be read in transit) and verification that you're talking to the genuine server.
</details>

<details>
<summary>2. What must every HTTP request end with?</summary>

A blank line, signalling the request is complete.
</details>

<details>
<summary>3. Four common HTTP methods and their purpose?</summary>

GET (retrieve), POST (submit/create), PUT (update), DELETE (remove).
</details>

<details>
<summary>4. Difference between 301 and 302?</summary>

301 is a permanent move; 302 is only temporary and may change again.
</details>

<details>
<summary>5. What does a 405 status code tell you?</summary>

The resource exists but doesn't accept the method that was used.
</details>

<details>
<summary>6. Why do cookies exist?</summary>

HTTP is stateless (no memory of previous requests) — cookies let the server remember who a client is.
</details>

<details>
<summary>7. How is a cookie created and then reused?</summary>

Created via a Set-Cookie response header; sent back automatically in the Cookie header on every later request.
</details>

## Key takeaways

- **URL parts:** scheme, user, host, port, path, query string, fragment.
- **Request/response** both end headers with a blank line before the body/next stage.
- **Methods:** GET/POST/PUT/DELETE; **status codes:** 1xx–5xx ranges, memorise 200/301/302/400/401/403/404/405/500/503.
- **Headers** carry metadata each direction; **cookies** (Set-Cookie/Cookie) fix HTTP's statelessness, usually via a token.
- **Security:** HTTPS matters, cookies are a hijacking target, and status codes/headers leak more than they seem to.
