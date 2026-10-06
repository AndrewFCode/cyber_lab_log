---
title: "TryHackMe 8: How Websites Work"
description: "TryHackMe module 8 — front end vs back end, HTML/CSS/JS, page source, sensitive data exposure, and HTML injection."
tags: ["tryhackme", "html", "css", "javascript", "sensitive-data-exposure", "html-injection"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "tryhackme"
module: "How Websites Work"
moduleOrder: 46
unit: 8
---

> **In one line:** a browser (front end) requests data from a server (back end); HTML structures it, CSS styles it, JavaScript makes it interactive — and unsanitised page content leads straight to sensitive data exposure and HTML injection.

*Companion to: TryHackMe Pre Security, Module 8.* The full version is the How Websites Work class notes; the module overview is the TryHackMe module sheet.

**Numbering note:** filed as Module 8 (after 6 = DNS in Detail, 7 = HTTP in Detail) — the source again labelled this "6", almost certainly a repeated copy-paste slip.

## Front end vs back end

| | Front end | Back end |
| --- | --- | --- |
| Runs where | Browser (client-side) | Server (server-side) |
| Job | Renders the page | Processes requests, returns responses |

## The three building blocks

| Tech | Role |
| --- | --- |
| HTML | Structure |
| CSS | Styling |
| JavaScript | Interactivity |

## HTML basics

```html
<!DOCTYPE html>      <!-- declares HTML5 -->
<html>                <!-- root element -->
  <head>...</head>    <!-- page info, not shown -->
  <body>               <!-- only this is visible -->
    <h1>Heading</h1>
    <p>Paragraph</p>
  </body>
</html>
```

| Attribute | Purpose |
| --- | --- |
| `class` | Styling; **shareable** across elements |
| `id` | **Unique** per element; styling + JS targeting |
| `src` | Resource location (e.g. `<img src="...">`) |

**View source:** right-click → "View Page Source" (Chrome) / "Show Page Source" (Safari).

## JavaScript basics

```javascript
document.getElementById("demo").innerHTML = "Hack the Planet";
```

```html
<button onclick='document.getElementById("demo").innerHTML = "Clicked";'>
  Click Me!
</button>
```

- Loaded inline (`<script>...</script>`) or externally (`<script src="...">`).
- **Events** (`onclick`, `onhover`, etc.) trigger JS in response to user action.

## Two basic web vulnerabilities

| Issue | What it is | Cause |
| --- | --- | --- |
| **Sensitive data exposure** | Sensitive clear-text info left visible in page source (creds in comments, hidden links) | Developer oversight, not removed before launch |
| **HTML injection** | User input rendered as real HTML on the page | Missing **input sanitisation** |

- **Golden rule:** never trust user input.

## 🔐 Security notes

- **Viewing page source is trivial for attackers too** — no tooling needed; anything sensitive there should never have been placed there.
- **HTML injection often escalates to XSS**: the same unsanitised field that renders `<h1>` will often render `<script>` too, letting an attacker run JavaScript in another user's session.
- **Client-side-only sanitisation is bypassable** — an attacker can send requests directly, skipping the browser; real filtering must happen server-side.
- **Meaningful id/class names can leak structure** (`admin-panel`, `debug-mode`) — same category of accidental exposure as credentials in comments.

## Practice drills

<details>
<summary>1. Front end vs back end?</summary>

Front end is the client-side rendering by the browser; back end is the server processing requests and returning responses.
</details>

<details>
<summary>2. Roles of HTML, CSS, JavaScript?</summary>

HTML = structure, CSS = styling, JavaScript = interactivity.
</details>

<details>
<summary>3. class vs id attribute?</summary>

class can be shared across many elements (styling); id must be unique to one element (styling + JS targeting).
</details>

<details>
<summary>4. How do you view a page's raw HTML?</summary>

Right-click → "View Page Source" (Chrome) or "Show Page Source" (Safari).
</details>

<details>
<summary>5. What is sensitive data exposure?</summary>

Sensitive, clear-text information left visible to end users — usually found in front-end source code.
</details>

<details>
<summary>6. What causes HTML injection?</summary>

Unfiltered/unsanitised user input being displayed on the page, so submitted HTML renders as real page HTML.
</details>

<details>
<summary>7. Why isn't client-side-only input filtering enough?</summary>

An attacker can send requests directly, bypassing the browser and any JavaScript-only filtering.
</details>

## Key takeaways

- **Front end (browser) renders; back end (server) processes and responds.**
- **HTML = structure, CSS = styling, JS = interactivity** — id is unique, class is shareable.
- **View page source** is a trivial first step for both auditors and attackers.
- **Sensitive data exposure** = leftover secrets in source; **HTML injection** = unsanitised input rendered as HTML — both come from "never trust user input" being ignored.
- **Security:** HTML injection often escalates to XSS; sanitise on the server, not just the client.
