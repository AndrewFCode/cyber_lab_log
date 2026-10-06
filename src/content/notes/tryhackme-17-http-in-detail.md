---
title: "TryHackMe 7: HTTP in Detail — Class Notes"
description: "Full class notes for TryHackMe module 7: HTTP/HTTPS, URL structure, requests and responses, HTTP methods, status codes, headers, and cookies."
tags: ["class-notes", "tryhackme", "http", "https", "url", "http-methods", "status-codes", "cookies"]
draft: false
pubDate: 2026-09-27
---

**Class notes · TryHackMe Pre Security · Module 7**

> **Quick reference:** the short version of this lesson lives in the
> [TryHackMe resource sheets](/cyber_lab_log/resources/tryhackme/7/). This follows Module 6
> (DNS in Detail) — DNS got you to the right server; this lesson covers what
> your browser actually says to that server once it arrives.
>
> **Numbering note:** the update block for this lesson was labelled
> "SECTION/UNIT: 6", the same number as DNS in Detail. Since HTTP and DNS are
> clearly sequential topics within TryHackMe's web-fundamentals material, this
> has been filed as **Module 7** rather than a duplicate 6 — flag if that's
> not what you intended.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what HTTP and HTTPS are and the difference between them.
2. Break a URL down into its component parts.
3. Read a raw HTTP request and response line by line.
4. Name the common HTTP methods and what each is used for.
5. Interpret HTTP status codes by range and recognise the common ones.
6. Explain what HTTP headers do, including common request and response
   headers.
7. Explain what cookies are and why HTTP's statelessness makes them useful.

## 1. HTTP and HTTPS

**HTTP** — **HyperText Transfer Protocol** — is the protocol used every time you
view a website. It was developed by **Tim Berners-Lee** and his team between
**1989 and 1991**. HTTP is the set of rules that governs how a browser
communicates with a web server to **transmit web page data**: HTML, images,
video, and so on.

**HTTPS** — **HyperText Transfer Protocol Secure** — is the encrypted version of
HTTP. Encryption does two things at once: it stops anyone observing the traffic
from **reading** the data being sent or received, and it gives you assurance
that you are actually talking to the **genuine** web server rather than
something **impersonating** it.

## 2. URLs

Before a browser can request anything, it needs to know exactly **how and
where** to find it — that instruction is a **URL (Uniform Resource
Locator)**. A URL can carry several distinct parts, though not every request
uses all of them:

| Part | Purpose | Example |
| --- | --- | --- |
| **Scheme** | Which protocol to use | `http`, `https`, `ftp` |
| **User** | Username/password for services that authenticate via the URL | — |
| **Host** | The domain name or IP address of the server | `tryhackme.com` |
| **Port** | The port to connect to — commonly **80** for HTTP, **443** for HTTPS, but any port from **1–65535** is possible | `:8080` |
| **Path** | The specific file or location being requested | `/blog` |
| **Query string** | Extra information passed to the path | `?id=1` |
| **Fragment** | A reference to a location within the page itself | `#section2` |

> **In the real world:** `/blog?id=1` tells the `/blog` path that the client
> wants the article with **id 1** — the query string is how a single path can
> serve many different results depending on what is passed to it.

## 3. Making a request

The bare minimum a request needs is one line:

```text
GET / HTTP/1.1
```

But for a real browsing experience, a request typically carries several more
lines of information, called **headers** (covered fully in Section 5). A
representative request looks like this:

```text
GET / HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0 (Firefox/87.0)
Referer: https://tryhackme.com

```

Reading it line by line:

1. **Method, path, version.** `GET` requests the resource; `/` is the **home
   page**; `HTTP/1.1` states the protocol version being used.
2. **Host.** Tells the server which website is being requested — necessary
   because one server can host several sites (Section 5).
3. **User-Agent.** Identifies the client's browser and version — here,
   **Firefox 87**.
4. **Referer.** Identifies the page that **linked to** this request — here,
   `https://tryhackme.com`.
5. **Blank line.** Every HTTP request **ends with a blank line**, signalling to
   the server that the request is complete.

And the response that comes back:

```text
HTTP/1.1 200 OK
Server: nginx/1.18.0
Date: Mon, 01 Jan 2024 12:00:00 GMT
Content-Type: text/html
Content-Length: 1256

<!DOCTYPE html>
...
```

1. **Version and status.** `HTTP/1.1` states the protocol version, followed by
   the **status code** — here **200 OK**, meaning the request succeeded
   (Section 4).
2. **Server.** Identifies the web server software and version.
3. **Date.** The server's current date, time and time zone.
4. **Content-Type.** Tells the client what **kind** of data is coming — HTML,
   an image, a video, a PDF, XML, and so on.
5. **Content-Length.** States how long the response body is, so the client can
   confirm **nothing is missing**.
6. **Blank line.** Confirms the end of the **response headers**.
7. **Body.** The actual requested content follows — here, the home page's
   HTML.

> **Note (beyond this lesson):** the example `Server`, `Date` and `Content-
> Length` values above are illustrative rather than a live capture of a real
> request/response pair, to make each line's purpose clear without asserting a
> specific site's actual current output.

## 4. HTTP methods

A **method** states the client's **intended action**. There are several, but
two dominate day-to-day use:

| Method | Purpose |
| --- | --- |
| **GET** | Retrieve information from the server |
| **POST** | Submit data to the server, potentially creating new records |
| **PUT** | Submit data to the server to **update** existing information |
| **DELETE** | Remove information/records from the server |

## 5. HTTP status codes

Every HTTP response starts with a **status code** in its first line, telling
the client the outcome of its request — and often hinting at what to do next.
Codes fall into five ranges:

| Range | Meaning |
| --- | --- |
| **100–199** | Informational — the first part of the request was accepted; continue sending the rest. Rarely seen today. |
| **200–299** | Success — the request completed successfully. |
| **300–399** | Redirection — the client should look elsewhere for the resource. |
| **400–499** | Client error — something was wrong with the request. |
| **500–599** | Server error — something went wrong on the server's side, usually a significant problem. |

### 5.1 Common status codes

| Code | Meaning |
| --- | --- |
| **200 OK** | The request completed successfully. |
| **201 Created** | A resource was created (e.g. a new user or post). |
| **301 Moved Permanently** | The resource has moved permanently; browsers and search engines should update to the new location. |
| **302 Found** | A **temporary** redirect — unlike 301, the resource may move back or move again. |
| **400 Bad Request** | Something was wrong or missing in the request, possibly a missing expected parameter. |
| **401 Not Authorised** | Authentication (commonly username/password) is required before viewing this resource. |
| **403 Forbidden** | Access is denied, whether logged in or not. |
| **404 Page Not Found** | The requested resource does not exist. |
| **405 Method Not Allowed** | The resource does not accept the method used (e.g. sending GET to a path expecting POST). |
| **500 Internal Server Error** | The server hit an error it does not know how to handle. |
| **503 Service Unavailable** | The server cannot handle the request — overloaded or down for maintenance. |

## 6. Headers

**Headers** are extra data sent alongside a request or response. No header is
**strictly required** to make a request work at the protocol level, but without
them a website becomes very difficult to use properly.

### 6.1 Common request headers

Sent from the **client** (typically your browser) to the server:

- **Host** — which of a server's several hosted sites is being requested,
  without which you get whatever the server's **default** site is.
- **User-Agent** — the browser's software and version, so the server can
  format the page appropriately (some HTML/JavaScript/CSS features only exist
  in certain browsers).
- **Content-Length** — when sending data (e.g. a submitted form), states how
  much data to expect, so the server can confirm nothing is missing.
- **Accept-Encoding** — which compression methods the browser supports, so
  the server can shrink the data it sends over the network.
- **Cookie** — data sent back to the server to help it remember information
  about the client (Section 7).

### 6.2 Common response headers

Returned from the **server** to the client:

- **Set-Cookie** — data to store and send back with every future request
  (Section 7).
- **Cache-Control** — how long the browser should cache this content before
  requesting it again.
- **Content-Type** — what kind of data is being returned (HTML, CSS,
  JavaScript, images, PDF, video, etc.), so the browser knows how to process
  it.
- **Content-Encoding** — which compression method was used, so the browser
  knows how to decompress the data.

## 7. Cookies

A **cookie** is a small piece of data stored on your computer. A cookie is
created when the browser receives a **Set-Cookie** header in a response; from
that point on, the browser sends that cookie's data back to the server on
**every subsequent request**.

Cookies exist because **HTTP is stateless** — it has no built-in memory of your
previous requests. A cookie lets the server "remember" who you are, personal
settings, or whether you have visited before, despite the protocol itself
having no concept of an ongoing session.

Cookies are most commonly used for **website authentication**. Rather than
storing a plain-text password, the cookie's value is normally a **token** — a
unique, not-easily-guessable secret code — rather than something a human could
read and reuse directly.

> **In the real world:** you can see exactly which cookies your browser is
> sending by opening your browser's **developer tools**, switching to the
> **Network** tab, selecting a request, and checking its **Cookies** tab.

### 7.1 Worked example — following a login flow

A user logs into a website with a username and password.

1. **Initial request.** The browser sends a `POST` request to `/login` with the
   credentials in the request body.
2. **Server validates and responds.** If correct, the server's response
   includes a `Set-Cookie` header carrying an authentication **token**, along
   with a **302 Found** status redirecting to the account dashboard.
3. **Browser stores the cookie and follows the redirect.** It sends a fresh
   `GET` request for the dashboard, now including a `Cookie` header carrying
   that token.
4. **Server recognises the session.** Because HTTP itself has no memory, the
   server relies entirely on that cookie's token to know **who is asking** —
   without it, the request would look identical to any anonymous visitor's.

## 8. Security perspective

This lesson's building blocks — methods, status codes, headers, cookies — are
exactly what a web attacker and a web defender both work with directly:

- **HTTP vs HTTPS is a genuine security decision, not a formality.** Plain HTTP
  traffic can be read and tampered with by anyone positioned between client and
  server; HTTPS's encryption and server verification close both gaps. Any
  page that handles a login, payment details, or personal data over plain HTTP
  is exposing that data in transit.
- **Cookies are a prime target.** Because a session's entire identity often
  rests on one cookie's token, stealing that cookie (through a
  cross-site-scripting flaw, an unencrypted connection, or a poorly configured
  cookie) can let an attacker impersonate the logged-in user without ever
  knowing their password — this is why cookies used for authentication are
  normally marked with protective flags such as `HttpOnly` and `Secure` in
  production systems.
- **The User-Agent and Referer headers reveal information voluntarily.** Both
  are sent by the client without the user actively choosing to, and both can
  leak details — what software you are running, or which page linked you here
  — that are sometimes more than a site strictly needs to know.
- **Status codes leak information about what exists.** The difference between
  a **403 Forbidden** and a **404 Not Found** tells an attacker whether a
  resource **exists but is protected**, versus **does not exist at all** —
  a small but real reconnaissance signal, which is one reason some systems
  deliberately return 404 for both cases.
- **Method mismatches point at functionality.** A **405 Method Not Allowed**
  response confirms that a resource exists and expects a **different** method
  than the one just sent — useful information for mapping out what actions an
  application actually supports.

## Summary

- **HTTP** governs how browsers and web servers exchange page data;
  **HTTPS** adds **encryption** and **server identity verification** on top.
- A **URL** can carry a **scheme, user, host, port, path, query string and
  fragment** — not all present in every request.
- A request is at minimum `METHOD PATH HTTP/VERSION`, plus optional
  **headers**, and always ends with a **blank line**; a response starts with
  `HTTP/VERSION STATUS`, its own headers, a blank line, then the body.
- **Methods:** **GET** (retrieve), **POST** (submit/create), **PUT**
  (update), **DELETE** (remove).
- **Status codes** fall into five ranges — **1xx** informational, **2xx**
  success, **3xx** redirection, **4xx** client error, **5xx** server error —
  with common codes like **200, 201, 301, 302, 400, 401, 403, 404, 405, 500,
  503**.
- **Headers** carry extra request/response data: **Host, User-Agent,
  Content-Length, Accept-Encoding, Cookie** (request); **Set-Cookie,
  Cache-Control, Content-Type, Content-Encoding** (response).
- **Cookies**, set via `Set-Cookie` and returned via `Cookie`, give
  **stateless** HTTP a way to remember a client across requests — commonly
  used for authentication via a **token**.

## Glossary

| Term | Meaning |
| --- | --- |
| HTTP | HyperText Transfer Protocol; rules for web communication. |
| HTTPS | HTTP Secure; encrypted, identity-verified HTTP. |
| URL | Uniform Resource Locator; an address for a web resource. |
| Scheme | The protocol part of a URL (http, https, ftp). |
| Host | The domain/IP part of a URL identifying the server. |
| Path | The specific resource location within a URL. |
| Query string | Extra parameters passed to a path in a URL. |
| Fragment | A reference to a specific location within a page. |
| HTTP method | The client's stated action (GET, POST, PUT, DELETE). |
| Status code | The three-digit outcome code in an HTTP response. |
| Header | Extra metadata sent with an HTTP request or response. |
| User-Agent | A header identifying the client's browser and version. |
| Referer | A header identifying the page that linked to this request. |
| Cookie | Small client-stored data sent back on subsequent requests. |
| Stateless | HTTP's lack of built-in memory between requests. |
| Token | A unique secret value, often used in an auth cookie. |

## Review questions

1. What does HTTP do, and who developed it?
2. What two things does HTTPS add on top of HTTP?
3. List the seven possible parts of a URL and give the purpose of each.
4. What must every HTTP request end with, and why?
5. What does the Content-Length header do, in a response?
6. Name the four common HTTP methods and what each is used for.
7. List the five HTTP status code ranges and what each broadly means.
8. What is the difference between a 301 and a 302 status code?
9. What does a 405 status code tell you, specifically?
10. Name two common request headers and two common response headers, with what
    each does.
11. Why do cookies exist, given how HTTP itself behaves?
12. How is a cookie typically created, and how is it then used on later
    requests?
13. Scenario: an attacker steals a user's session cookie via a script
    injection flaw. What can they now do, and why does that work?
14. Scenario: you request a page and get a 403 instead of a 404. What does
    that difference tell you that a 404 would not?

## Answer key

1. **It defines the rules for how browsers and web servers exchange page data;
   developed by Tim Berners-Lee and his team, 1989–1991.** Foundational web
   protocol.
2. **Encryption (so data can't be read in transit) and verification that you
   are talking to the genuine server.** Confidentiality plus authenticity.
3. **Scheme (protocol), user (credentials), host (server), port (connection
   port), path (resource location), query string (extra parameters), fragment
   (in-page location).** The full URL anatomy.
4. **A blank line, to signal to the server that the request is complete.**
   End-of-request marker.
5. **It states the response body's length so the client can confirm nothing is
   missing.** Integrity check on size.
6. **GET (retrieve), POST (submit/create), PUT (update), DELETE (remove).**
   The core CRUD-style actions.
7. **1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx
   server error.** The five outcome categories.
8. **301 is a permanent move (update your records); 302 is only temporary and
   may change again.** Permanence differs.
9. **That the resource exists but doesn't accept the method that was just
   used.** Confirms existence, wrong verb.
10. **Request: Host (which site) and User-Agent (browser identity) — or
    Content-Length/Accept-Encoding. Response: Set-Cookie (store data) and
    Content-Type (what kind of data) — or Cache-Control/Content-Encoding.**
    Any valid pair each side.
11. **Because HTTP is stateless — it has no memory of previous requests —
    cookies let the server remember who a client is across requests.** Filling
    a protocol gap.
12. **Created via a Set-Cookie response header; sent back automatically in the
    Cookie header on every subsequent request to that server.** Set once, sent
    repeatedly.
13. **They can impersonate the logged-in user without knowing their password,
    because the server identifies sessions purely by the cookie's token.**
    Session hijacking.
14. **That the resource actually exists but access to it is denied — a 404
    would mean it doesn't exist at all.** Existence vs non-existence
    disclosure.
