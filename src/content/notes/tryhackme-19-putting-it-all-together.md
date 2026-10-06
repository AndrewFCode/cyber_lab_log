---
title: "TryHackMe 9: Putting It All Together — Class Notes"
description: "Full class notes for TryHackMe module 9: load balancers, CDNs, databases, WAFs, web server software, virtual hosts, and static vs dynamic content."
tags: ["class-notes", "tryhackme", "load-balancer", "cdn", "waf", "web-servers", "virtual-hosts", "backend"]
draft: false
pubDate: 2026-09-27
---

**Class notes · TryHackMe Pre Security · Module 9**

> **Quick reference:** the short version of this lesson lives in the
> [TryHackMe resource sheets](/cyber_lab_log/resources/tryhackme/9/). This ties together
> Modules 6–8 (DNS, HTTP, how websites are built) into the fuller picture of
> what actually sits behind a busy website — and introduces the web server
> software itself.
>
> **Numbering note:** the update block again labelled this "SECTION/UNIT: 6".
> This transcript explicitly opens by referring back to "the previous
> modules" (DNS, HTTP, and website structure), which confirms it belongs
> **after** those three — filed here as **Module 9**, continuing the
> established sequence.

## Learning objectives

By the end of these notes you should be able to:

1. Recap, in one flow, how a browser request becomes a rendered page.
2. Explain what a load balancer does and how it chooses a server.
3. Explain what a CDN does and the problem it solves.
4. Explain the role of a database and name a few common ones.
5. Explain what a WAF does and how it filters requests.
6. Explain what web server software does, including root directories and
   virtual hosts.
7. Distinguish static content from dynamic content, and explain the role of a
   backend language.

## 1. The request, recapped

Pulling the earlier modules together: requesting a website means your
computer first needs the server's **IP address**, found via **DNS**. Your
computer then talks to that server using **HTTP**, a defined set of commands.
The web server responds with **HTML, JavaScript, CSS, images**, and so on,
which your browser assembles and displays as the page you see.

That covers the core request/response cycle. A busy, real-world website
usually has several more components working alongside it.

## 2. Load balancers

A single web server eventually runs out of capacity — either the traffic gets
too large, or the application needs **high availability** that one server
cannot guarantee alone. A **load balancer** solves both problems at once:

- **Handling high traffic.** Requests are spread across **multiple servers**
  instead of hitting one.
- **Providing failover.** If a server stops responding, the load balancer
  stops sending it traffic.

When a load balancer is in front of a site, it **receives the request first**,
then forwards it to one of the servers behind it, using an **algorithm** to
decide which:

- **Round-robin** — sends each request to the next server in turn.
- **Weighted** — checks how busy each server currently is and sends the
  request to the **least busy** one.

Load balancers also run periodic **health checks** against each server behind
them. If a server fails to respond, or responds incorrectly, the load
balancer **stops routing traffic to it** until it starts responding properly
again.

```
Load balancer in front of a web tier:

                 +----------------+
  client  ---->  | Load balancer  |
                 | (algorithm +   |
                 |  health check) |
                 +--------+-------+
                          |
        +-----------------+-----------------+
        v                 v                 v
   [ Server 1 ]      [ Server 2 ]      [ Server 3 ]
   (healthy)          (healthy)         (unresponsive,
                                          removed from
                                          rotation)
```

## 3. Content Delivery Networks (CDNs)

A **CDN** cuts down traffic hitting a busy website by hosting its **static
files** — JavaScript, CSS, images, video — across **thousands of servers
worldwide**, rather than serving everything from one location.

When a user requests one of those hosted files, the CDN works out the
**physically nearest** server to that user and serves the file from there,
instead of potentially routing the request across the world to the original
server.

## 4. Databases

Websites commonly need to **store information** — user accounts, content,
settings — and web servers communicate with **databases** to store and
retrieve that data. Databases range enormously in scale, from a simple
**plain text file** up to **complex clusters** of multiple servers built for
speed and resilience.

Common databases you will encounter include **MySQL, MSSQL, MongoDB,
Postgres**, and others — each with its own particular strengths.

## 5. Web Application Firewalls (WAFs)

A **WAF (Web Application Firewall)** sits **between** an incoming web request
and the actual web server. Its job is to protect the server from **hacking
attempts and denial-of-service attacks** by inspecting requests for:

- **Common attack techniques.**
- **Whether the request looks like a real browser** rather than an automated
  bot.
- **Excessive request volume**, using **rate limiting** — allowing only a
  certain number of requests from a given IP address **per second**.

If a request is judged a likely attack, the WAF **drops it** — it is never
forwarded to the web server at all.

## 6. Web server software

A **web server** is the software that **listens for incoming connections**
and uses **HTTP** to deliver content to clients. Common examples: **Apache,
Nginx, IIS, and NodeJS**.

Files are delivered from the server's configured **root directory**. Defaults
differ by platform:

| Software | Platform | Default root directory |
| --- | --- | --- |
| Apache, Nginx | Linux | `/var/www/html` |
| IIS | Windows | `C:\inetpub\wwwroot` |

For example, a request for `http://www.example.com/picture.jpg` would cause
the server to send the file at `/var/www/html/picture.jpg` from its own local
disk (on a Linux server using that default).

### 6.1 Virtual hosts

A single web server can host **multiple websites**, each with a different
domain name, using **virtual hosts**. The server software checks the
**hostname** being requested — read from the request's HTTP headers — and
matches it against its configured virtual hosts, which are simply **text-based
configuration files**. If a match is found, that site is served; if not, the
server falls back to its **default website**.

Each virtual host can point its root directory at a **different location** on
disk — for example, `one.com` mapped to `/var/www/website_one`, and `two.com`
mapped to `/var/www/website_two`. There is **no limit** to how many separate
websites one server can host this way.

```
One server, multiple virtual hosts:

   Host: one.com  --> matches virtual host "one.com"
                       --> serves /var/www/website_one

   Host: two.com  --> matches virtual host "two.com"
                       --> serves /var/www/website_two

   Host: (unknown) --> no match --> serves the default website
```

## 7. Static vs dynamic content

**Static content** never changes — common examples are images, JavaScript and
CSS, but also includes HTML that stays the same. Static files are served
**directly** from the web server's disk, unmodified.

**Dynamic content** can change depending on the specific request. A blog's
homepage showing its latest posts is dynamic — publish a new post, and the
homepage updates. A search page is another example: different search terms
produce different results.

The work that produces dynamic output happens on the **backend** — so called
because it happens **behind the scenes**. You cannot see backend processing by
viewing a page's HTML source; the HTML you *do* see is the **result** of that
backend processing. Everything visible in the browser is the **frontend**.

## 8. Scripting and backend languages

Backend languages are what give a website real **interactivity**, and there is
very little limit to what they can do — interacting with databases, calling
external services, processing user input, and much more. Common examples:
**PHP, Python, Ruby, NodeJS, Perl**, among many others.

### 8.1 Worked example — a simple PHP request

Requesting `http://example.com/index.php?name=adam`, where `index.php`
contains:

```php
<html><body>Hello <?php echo $_GET["name"]; ?></body></html>
```

produces this output sent to the client:

```html
<html><body>Hello adam</body></html>
```

The **query string** value (`name=adam`) is read by the PHP code on the
server via `$_GET["name"]`, and the server **substitutes** that value into
the page **before** sending it. Crucially, the client never sees the PHP code
itself — only the final HTML result — because the PHP runs entirely on the
**backend**.

> **Exam tip:** the transcript flags this directly — this kind of
> interactivity is exactly what **opens up security issues** in web
> applications that are not built securely, a thread the course picks up in
> later modules.

## 9. Security perspective

This lesson's own text already gestures toward security, so the additions
here connect its components more explicitly to attack and defence:

- **A WAF is a filter, not a fix.** Rate limiting and attack-signature
  matching stop a lot of unsophisticated traffic, but a WAF is a mitigation
  layered **in front of** an application, not a substitute for the
  application actually validating and sanitising its own input (the HTML
  injection lesson's point). A vulnerable backend behind a WAF is still
  vulnerable to anything the WAF's rules do not happen to catch.
- **Load balancers and CDNs both widen the attack surface, not just capacity.**
  Every server behind a load balancer, and every edge node in a CDN, is
  another system that needs configuring and patching consistently — a
  misconfigured server that differs from its siblings can become the weak
  point an attacker specifically targets.
- **The backend/frontend split is exactly why server-side validation
  matters.** Because a client can never see backend code, an attacker cannot
  read the PHP (or Python, or Ruby) directly — but they **can** send whatever
  input they like to it, and the backend has to assume every input is
  potentially hostile. This is the same "never trust user input" principle
  from the previous lesson, now placed against a concrete backend example:
  the `$_GET["name"]` value in the PHP snippet above is exactly the kind of
  unsanitised input that, handled carelessly, leads to HTML injection, SQL
  injection against a database, or worse.
- **Virtual host misconfiguration can expose the wrong site.** Because
  virtual hosts are matched purely by the **Host header** in the request, and
  that header is client-supplied, a poorly configured server can sometimes be
  tricked into serving content from a different virtual host than intended —
  a real class of misconfiguration worth being aware of once you understand
  how hostname matching works.
- **Databases are frequently the actual target.** Web servers, load balancers
  and CDNs are all layers standing in front of what is often the most
  valuable asset — the data sitting in the database. Attacks against the
  frontend and backend application layers are frequently just the path an
  attacker takes to eventually reach that data.

## Summary

- **Recap:** DNS resolves a name to an IP, HTTP carries the request/response,
  the server returns HTML/CSS/JS/images/etc., and the browser renders them.
- **Load balancers** spread traffic across multiple servers (via **round-robin**
  or **weighted** algorithms) and remove unresponsive servers via **health
  checks**.
- **CDNs** host static files (JS, CSS, images, video) across servers worldwide
  and serve each user from the **nearest** one.
- **Databases** store and retrieve site data, from a plain text file up to
  complex clusters — **MySQL, MSSQL, MongoDB, Postgres**, and others.
- **WAFs** sit between the client and the web server, filtering out likely
  attacks and enforcing **rate limiting**.
- **Web server software** (Apache, Nginx, IIS, NodeJS) serves files from a
  **root directory** (`/var/www/html` on Linux, `C:\inetpub\wwwroot` on
  Windows); **virtual hosts** let one server host many domains, matched by
  the request's **Host header**.
- **Static content** never changes and is served as-is; **dynamic content**
  is generated by **backend** processing (PHP, Python, Ruby, NodeJS, Perl,
  etc.), invisible in the page's HTML source, which is itself the *result* of
  that processing — everything visible is the **frontend**.

## Glossary

| Term | Meaning |
| --- | --- |
| Load balancer | Distributes requests across multiple servers. |
| Round-robin | A load-balancing algorithm cycling through servers in turn. |
| Weighted (load balancing) | Routes to the currently least-busy server. |
| Health check | A load balancer's periodic check that a server is responding. |
| CDN | Content Delivery Network; serves static files from nearby servers. |
| Database | Software storing and retrieving structured data. |
| WAF | Web Application Firewall; filters requests before the web server. |
| Rate limiting | Capping requests per IP per second. |
| Web server (software) | Software listening for connections and serving content via HTTP. |
| Root directory | The base folder a web server serves files from. |
| Virtual host | A configuration letting one server host multiple domains. |
| Host header | The HTTP header identifying which site is being requested. |
| Static content | Content served unchanged, as-is. |
| Dynamic content | Content generated per-request by backend processing. |
| Backend | Server-side processing invisible in the page's HTML source. |
| Frontend | Everything visible/rendered in the browser. |

## Review questions

1. Recap, in order, how a browser request becomes a rendered page.
2. What two main problems does a load balancer solve?
3. Describe the round-robin and weighted load-balancing algorithms.
4. What is a health check, and what happens when one fails?
5. What does a CDN host, and how does it decide which server answers a
   request?
6. Give the range of scale a database can operate at, and name three common
   databases.
7. Where does a WAF sit, and what three things does it check for?
8. What is rate limiting?
9. What is a web server's root directory, and give the default location on
   Linux and on Windows.
10. How does a web server decide which virtual host to serve, and what
    happens if there's no match?
11. Distinguish static content from dynamic content, with an example of each.
12. In the PHP example, why does the client never see the PHP code itself?
13. Scenario: a request arrives with `Host: two.com` at a server configured
    with virtual hosts for `one.com` and `two.com`. Which site is served?
14. Scenario: an attacker sends 500 requests per second from one IP to a
    site behind a WAF. What WAF feature is most directly relevant, and what
    happens to those requests?
15. Scenario: a backend script builds a page directly from a URL parameter
    with no validation. What kind of problem could this lead to, referencing
    the previous lesson?

## Answer key

1. **DNS resolves the domain to an IP; the browser sends an HTTP request; the
   server responds with HTML/CSS/JS/images/etc.; the browser renders the
   page.** The full request cycle.
2. **Handling high traffic by spreading it across multiple servers, and
   providing failover if a server becomes unresponsive.** Capacity and
   availability.
3. **Round-robin sends each request to the next server in turn; weighted
   checks current load and sends to the least busy server.** Two distinct
   routing strategies.
4. **A periodic check that a server is responding correctly; if it fails, the
   load balancer stops sending it traffic until it responds properly again.**
   Automatic removal from rotation.
5. **Static files (JS, CSS, images, video); it works out the physically
   nearest server to the requesting user and serves from there.** Geographic
   proximity.
6. **From a simple plain text file up to complex multi-server clusters; e.g.
   MySQL, MSSQL, MongoDB, Postgres.** Wide range of scale and type.
7. **Between the client and the web server; checks for common attack
   techniques, whether the request looks like a real browser, and excessive
   request volume.** Three inspection categories.
8. **Limiting the number of requests allowed from one IP address per
   second.** Volume control.
9. **The base folder files are served from; `/var/www/html` on Linux
   (Apache/Nginx), `C:\inetpub\wwwroot` on Windows (IIS).** Platform defaults.
10. **By matching the requested hostname (from the Host header) against
    configured virtual hosts; with no match, the default website is served.**
    Header-based routing.
11. **Static content never changes and is served as-is (e.g. an image);
    dynamic content is generated per request by backend processing (e.g. a
    blog homepage showing the latest posts).** Fixed vs generated.
12. **Because the PHP runs entirely on the backend/server; only the resulting
    HTML output is sent to the client.** Server-side execution stays hidden.
13. **The site configured for `two.com`, served from its mapped root
    directory.** Header-matched virtual host.
14. **Rate limiting; requests beyond the allowed-per-second threshold are
    dropped before reaching the web server.** Volume-based filtering.
15. **HTML injection (or a related injection issue) — unsanitised input used
    directly in output is exactly the vulnerability described in the previous
    lesson.** Same root cause, backend context.
