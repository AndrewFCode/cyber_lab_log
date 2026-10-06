---
title: "TryHackMe 8: How Websites Work — Class Notes"
description: "Full class notes for TryHackMe module 8: front end vs back end, HTML/CSS/JS, page source, sensitive data exposure, and HTML injection."
tags: ["class-notes", "tryhackme", "html", "css", "javascript", "sensitive-data-exposure", "html-injection"]
draft: false
pubDate: 2026-09-27
---

**Class notes · TryHackMe Pre Security · Module 8**

> **Quick reference:** the short version of this lesson lives in the
> [TryHackMe resource sheets](/cyber_lab_log/resources/tryhackme/8/). Modules 6 and 7 covered
> the protocols behind a request (DNS, then HTTP); this lesson looks inside the
> **content** that comes back — how a page is actually built, and two of the
> most basic security issues that follow from it.
>
> **Numbering note:** the update block for this lesson was again labelled
> "SECTION/UNIT: 6" — the same label used for both DNS in Detail and HTTP in
> Detail. Since this is clearly a third, distinct lesson, it has been filed as
> **Module 8**, continuing the sequence — flag if a different number was
> intended.

## Learning objectives

By the end of these notes you should be able to:

1. Explain the difference between a website's front end and back end.
2. Describe the roles of HTML, CSS and JavaScript.
3. Read the basic structure of an HTML document and explain common elements
   and attributes.
4. Explain how JavaScript can read and change page content, including via
   events.
5. Explain sensitive data exposure and why viewing page source matters for
   security.
6. Explain HTML injection and why input sanitisation prevents it.

## 1. Front end and back end

When you visit a website, your browser sends a **request** to a **web server**
— a dedicated computer somewhere else — asking for information about the page.
The server **responds** with data, and the browser uses that data to actually
**display** the page to you.

A website has two major components:

- **Front end (client-side).** The part your **browser** renders — what you
  actually see and interact with.
- **Back end (server-side).** The server that **processes** your request and
  **returns** a response.

There is a lot more happening in between a request and a rendered page, but the
essential model is: you request, the server responds, and your browser turns
that response into something you can see.

## 2. The three building blocks

Websites are built primarily from three technologies, each with a distinct
job:

| Technology | Role |
| --- | --- |
| **HTML** | Builds the website and defines its **structure** |
| **CSS** | Adds **styling** — makes the page look a particular way |
| **JavaScript** | Adds **interactivity** and more complex behaviour |

## 3. HTML

**HTML (HyperText Markup Language)** is the language websites are written in.
Its building blocks are **elements**, also called **tags**, which tell the
browser how to display content. Every HTML document follows the same basic
skeleton:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page title</title>
  </head>
  <body>
    <h1>A heading</h1>
    <p>A paragraph.</p>
  </body>
</html>
```

- **`<!DOCTYPE html>`** declares the page as an **HTML5** document, helping
  browsers interpret it consistently.
- **`<html>`** is the **root** element — every other element sits inside it.
- **`<head>`** holds information **about** the page, such as its title, rather
  than visible content.
- **`<body>`** holds the document's actual content — **only** what is inside
  `<body>` is shown in the browser.
- **`<h1>`** defines a large heading; **`<p>`** defines a paragraph.

Many other elements exist for other purposes — `<button>` for buttons, `<img>`
for images, list elements, and far more.

### 3.1 Attributes

Elements can carry **attributes** that add extra information or behaviour.
Two common ones:

- **`class`** — used for styling, and can be **shared** across many elements:
  `<p class="bold-text">`.
- **`src`** — used on elements like `<img>` to point at a resource's location:
  `<img src="img/cat.jpg">`.

An element can carry **several** attributes at once, each doing something
different: `<p attribute1="value1" attribute2="value2">`.

A separate attribute, **`id`**, gives an element a **unique** identifier —
unlike `class`, which many elements can share, an `id` should belong to only
**one** element on the page. IDs are used both for styling and, importantly,
for **JavaScript** to find and act on a specific element.

> **In the real world:** you can view the HTML behind any page by
> right-clicking and choosing **"View Page Source"** (Chrome) or **"Show Page
> Source"** (Safari) — a simple habit that matters for security reasons
> covered in Section 5.

## 4. JavaScript

**JavaScript (JS)** is one of the most widely used programming languages, and
it is what makes a page **interactive**. Where HTML defines structure and
content, JavaScript controls **functionality** — without it, a page is
entirely **static**, with nothing responding to what a user does. JavaScript
can update a page **dynamically**, in real time: changing a button's style when
it is clicked, or driving animation.

JavaScript is added to a page either directly, inside `<script>` tags, or
loaded from an external file using the `src` attribute:

```html
<script src="/location/of/javascript_file.js"></script>
```

A short example of what JavaScript can do — find the element with the ID
`demo`, and change its content:

```javascript
document.getElementById("demo").innerHTML = "Hack the Planet";
```

HTML elements can also carry **events**, such as `onclick` or `onhover`, that
**run JavaScript** when the event happens. For example:

```html
<button onclick='document.getElementById("demo").innerHTML = "Button Clicked";'>
  Click Me!
</button>
```

An `onclick` handler like this can also be written **inside** a `<script>`
block rather than directly on the element — both approaches achieve the same
result.

```
How a click updates the page:

  User clicks <button onclick="...">
        |
        v
  Browser runs the JavaScript in onclick
        |
        v
  document.getElementById("demo").innerHTML = "Button Clicked"
        |
        v
  The element with id="demo" now shows new text
```

## 5. Sensitive data exposure

**Sensitive data exposure** happens when a website fails to properly protect
(or remove) sensitive, **clear-text** information that ends up visible to any
end user — most often found sitting in the site's **front-end source code**.

Because a website is ultimately built from HTML elements you can simply
**view the page source** to inspect, a developer can easily leave something
behind by accident: forgotten **login credentials**, a **hidden link** to a
private part of the site, or other sensitive data sitting in plain sight
within the HTML or JavaScript.

Exposed information like this can be used to advance an attacker's access
elsewhere in the application. For example, a **temporary login credential**
left in an HTML **comment** could be used to log in somewhere else on the
site — or, worse, to reach other **back-end** components entirely.

> **Exam tip:** the lesson frames this as a first step in any assessment —
> when reviewing a web application for security issues, **reviewing the page
> source code** for exposed credentials or hidden links is one of the very
> first things to check.

## 6. HTML injection

**HTML injection** is a vulnerability that occurs when **unfiltered user
input** is displayed back on the page. If a site fails to **sanitise** user
input — filter out potentially malicious content before using it — and that
raw input is then shown on the page, an attacker can **inject HTML** (or
JavaScript) into the page.

**Input sanitisation** matters because whatever a user types is often reused
elsewhere, both on the front end and the back end. HTML injection is
specifically the **client-side** version of this problem; a related but
different issue, **database injection**, is where controlled input manipulates
a database query instead (covered separately, not in this lesson).

When a user's input is put directly onto the page without filtering, they
effectively gain control over part of the page's **appearance and
functionality**: submitting HTML (such as an `<h1>` tag) into a form field
that echoes input back verbatim will cause the browser to render that
submitted HTML as if it were part of the page itself, rather than displaying
it as plain text.

The general rule the lesson gives is simple: **never trust user input**. To
defend against this, a developer should sanitise **everything** a user enters
before it is used — in this case, that could mean stripping out HTML tags
before echoing the input back to the page.

### 6.1 Worked example — spotting an unsanitised "What's your name" field

A page has a form asking "What's your name?", and whatever is typed is passed
straight into a JavaScript function that writes it onto the page.

1. **Normal input.** Typing `Alex` results in the page showing the text "Hi,
   Alex" — exactly as intended.
2. **Injected input.** Typing `<h1>Hi</h1>` instead is passed to the same
   function, unfiltered, and the browser renders it as an actual large
   heading, not as the literal text `<h1>Hi</h1>` — because the function
   writes the raw input straight into the page's HTML.
3. **Why this matters.** If the input field accepts and renders arbitrary
   HTML, it could also accept `<script>` tags or `onclick`-style event
   attributes, going beyond changing appearance to running **attacker-supplied
   JavaScript** on the page.
4. **The fix.** The developer sanitises the input before writing it to the
   page — for example, stripping or encoding HTML special characters — so
   `<h1>Hi</h1>` is displayed as the literal text, not rendered as a heading.

## 7. Security perspective

This lesson is already framed around security, so the additions here focus on
the parts the transcript leaves implicit:

- **"View source" is a genuinely low-effort first step, both ways.** The same
  ease that makes checking page source a sensible early step for a defender
  auditing their own site also makes it an equally easy first step for an
  **attacker** reconnoitring someone else's — there is no special tooling
  required, just a browser. Treat anything that would be embarrassing or
  dangerous in page source as something that should never have been placed
  there in the first place, rather than something to remove "before launch."
- **HTML injection is often a stepping stone to something worse.** The example
  in Section 6 shows only cosmetic injection (an `<h1>` tag), but the same
  unsanitised field that accepts a heading tag will very often accept a
  `<script>` tag too — at which point the issue becomes **Cross-Site Scripting
  (XSS)**, capable of running arbitrary JavaScript in another user's browser
  session, not just changing how a page looks. HTML injection and XSS sit on
  the same root cause (unsanitised output), differing mainly in what the
  attacker chooses to inject.
- **Sanitisation belongs on the server, not just the browser.** Any filtering
  done purely in the browser's JavaScript can be bypassed by an attacker who
  simply sends the request directly, skipping the browser entirely. Real
  protection against this class of vulnerability has to happen on the
  **server side**, where the attacker cannot skip it.
- **IDs and classes can unintentionally reveal structure.** Meaningful `id`
  and `class` names (`admin-panel`, `debug-mode`) sitting in page source can
  hint at functionality that was never meant to be discovered casually — worth
  keeping in mind alongside the credentials-in-comments example the lesson
  gives.

## Summary

- A **front end** (what the browser renders) and **back end** (the server
  processing requests and returning responses) together make up a website.
- **HTML** defines structure, **CSS** defines styling, **JavaScript** adds
  interactivity — each with a distinct role.
- HTML is built from **elements/tags**, structured with `<!DOCTYPE html>`,
  `<html>`, `<head>` and `<body>`; elements carry **attributes** such as
  `class` (shareable, for styling) and `id` (unique, for styling and
  JavaScript targeting).
- **JavaScript** can read and change page content (e.g.
  `document.getElementById(...).innerHTML = ...`) and respond to **events**
  such as `onclick`.
- **Sensitive data exposure** is sensitive, clear-text information left
  visible in front-end source — reviewing page source is a basic first
  security check.
- **HTML injection** happens when unsanitised user input is echoed back onto
  the page, letting an attacker control part of the page's HTML; the fix is
  **input sanitisation**, and the golden rule is **never trust user input**.

## Glossary

| Term | Meaning |
| --- | --- |
| Front end | The client-side part of a website the browser renders. |
| Back end | The server-side part processing requests and responses. |
| HTML | HyperText Markup Language; defines a page's structure. |
| CSS | Cascading Style Sheets; defines a page's visual styling. |
| JavaScript | A language adding interactivity to a page. |
| Element / tag | A basic HTML building block. |
| Attribute | Extra data on an element (class, id, src, etc.). |
| Class attribute | A shareable styling identifier for elements. |
| ID attribute | A unique identifier for one element. |
| Event | A trigger (e.g. onclick) that runs JavaScript. |
| View page source | Browser feature showing a page's raw HTML. |
| Sensitive data exposure | Sensitive clear-text data left visible in source. |
| Sanitisation | Filtering user input before it is used or displayed. |
| HTML injection | Unfiltered user input rendered as HTML on a page. |
| Cross-Site Scripting (XSS) | Injected JavaScript running in another user's session (beyond this lesson). |
| Database injection | Manipulating a database query via input (beyond this lesson). |

## Review questions

1. Distinguish the front end from the back end of a website.
2. What role does each of HTML, CSS and JavaScript play?
3. Name the four core structural elements every HTML page has, and what each
   does.
4. What is the difference between a class attribute and an id attribute?
5. How would you view the raw HTML behind a page you are viewing?
6. Give an example of how JavaScript can change page content, and how an event
   like onclick fits in.
7. What is sensitive data exposure, and where is it usually found?
8. Why is reviewing page source one of the first steps in a security
   assessment?
9. What is HTML injection, and what causes it?
10. What is the general rule the lesson gives about user input?
11. Why is client-side-only input filtering not sufficient protection?
12. Scenario: a comments field echoes back exactly what a user types, with no
    filtering. What happens if a user types `<b>bold</b>`?
13. Scenario: the same comments field is later found to accept and execute a
    `<script>` tag. What does this now become, beyond simple HTML injection?

## Answer key

1. **Front end is the client-side rendering by the browser; back end is the
   server processing requests and returning responses.** Two sides of one
   exchange.
2. **HTML defines structure, CSS defines styling, JavaScript adds
   interactivity.** Three distinct jobs.
3. **`<!DOCTYPE html>` declares HTML5; `<html>` is the root element; `<head>`
   holds page info; `<body>` holds the visible content.** The standard
   skeleton.
4. **A class can be shared across many elements (for styling); an id must be
   unique to one element (for styling and JavaScript targeting).** Shared vs
   unique.
5. **Right-click and choose "View Page Source" (Chrome) or "Show Page Source"
   (Safari).** A built-in browser feature.
6. **`document.getElementById("id").innerHTML = "..."` changes an element's
   content; an onclick event runs JavaScript like this when the element is
   clicked.** Read/change via the DOM, triggered by events.
7. **Sensitive, clear-text information left visible to end users — usually
   found in the front-end source code.** An accidental exposure.
8. **Because the page source is easy to view and can reveal forgotten
   credentials or hidden links, giving an attacker (or an auditor) an easy
   first foothold.** Low effort, high value.
9. **Unfiltered/unsanitised user input being displayed on the page, letting
   submitted HTML be rendered as real page HTML.** Missing input sanitisation.
10. **Never trust user input.** The core defensive principle.
11. **An attacker can send requests directly, bypassing the browser and any
    JavaScript-only filtering entirely.** Client-side checks are skippable.
12. **The browser renders it as actual bold text, not the literal characters
    `<b>bold</b>`.** Unsanitised HTML is rendered, not escaped.
13. **Cross-Site Scripting (XSS) — the injected code can now run arbitrary
    JavaScript, not just change appearance.** A more serious escalation of the
    same root cause.
