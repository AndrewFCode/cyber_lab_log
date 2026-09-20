---
title: "A+ Core 1 2.5: Domain Name System (DNS)"
description: "DNS (Domain Name System) is one of the most critical services on any network. It lets us provide IP addresses when all we remember is a fully qualified domain name (FQDN)."
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 2.4__

__Quick reference:__ the short version of this lesson is the DNS cheat sheet, part of Section 2.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why DNS matters, and describe it as a distributed, hierarchical database.
2. Describe the role of root servers, top-level domains and country-code TLDs.
3. Use dig and nslookup to query DNS records.
4. Explain resource records in general, and why DNS changes need care.
5. Describe A and AAAA records, and explain TTL.
6. Describe CNAME records and why they're useful for administration.
7. Describe MX records and how mail delivery uses them together with A records.
8. Describe TXT records and their use for verification.
9. Explain DKIM, SPF and DMARC, and how they work together to fight email spoofing and spam.

## 1. Why DNS matters

__DNS (Domain Name System)__ is one of the most critical services on any network. It lets us provide __IP addresses__ when all we remember is a __fully qualified domain name (FQDN)__.

__Worked example — the basic lookup.__ You type www.professormesser.com into a browser:

1. A __DNS resolution__ happens behind the scenes.
2. It translates the name into the __IP address__ of that web server.
3. You never had to remember or type an IP address — only the name.

DNS does far more than this basic lookup too, as this lesson explores.

## 2. The DNS hierarchy

## 2.1 A distributed database

DNS is a __distributed database__: it's __scattered across the internet__, with different portions held on different servers, on different networks, around the world. Together, this hierarchy can resolve the IP address for __any__ fully qualified domain name on the internet.

## 2.2 Root servers

At the top of the hierarchy sit __13 root server clusters__. Each "cluster" is far more than one machine — in reality, __over 1,000 servers__ make up that root server system between them. The root servers direct queries down to the servers responsible for __top-level domains__.

## 2.3 Top-level domains (TLDs)

__Type__

__Examples__

Generic top-level domains (gTLDs)

.com, .org, .net

Country-code top-level domains

.us (United States), .ca (Canada), .uk (United Kingdom)

There are roughly __275 country codes__ in use for TLDs.

## 2.4 The hierarchy, visually

                              root
                               |
                      \+--------\+--------\+
                     .com              .uk  (and other TLDs)
                      |
                professormesser
                      |
        \+-------------\+-------------\+
       www                        mail
        |                           |
 (the web server)            (the mail server)

 You can add further layers too, e.g.:
   katie.east.professormesser.com
   judy.west.professormesser.comEach layer — TLD, domain, subdomain, host — lets an organisation __structure its DNS__ in a way that makes sense for it, while remaining accessible to anyone in the world.

## 3. Querying DNS: dig and nslookup

## 3.1 dig

dig is a common DNS query tool on __Linux and macOS__ (a version is also installable on some Windows systems).

dig www.professormesser.comThe output shows:

- The __command__ used.
- The __question__ being asked.
- The __answer(s)__ returned.

__Worked example — three answers.__ Querying www.professormesser.com returns __three separate IP addresses__. This is deliberate: multiple __redundant__ web servers exist, so if one address becomes unavailable, the others can still be used.

## 3.2 nslookup

__nslookup__ is the equivalent tool built into __Windows__:

nslookup professormesser.comQuerying the same domain with nslookup returns the __same three IP addresses__.

## 4. Resource records

Every answer a DNS server gives comes from an entry in its database, called a __resource record (RR)__. Resource records can hold IP addresses, certificate information, email routing details, host aliases and more.

__Caution:__ DNS configuration is __not something to experiment with casually__. A single mistake in a DNS server's records can make one or more of your services suddenly unreachable from the rest of the internet. __Always keep a backup__, and know how to revert quickly if a change causes a problem.

__Two ways to edit records:__

- __A raw text configuration file__, directly on the DNS server.
- __A web-based front end__, which many hosted DNS providers offer — the same underlying records, presented as a form for adding, editing or removing entries.

A DNS server's configuration commonly includes an __SOA record__ at the top (defining authority for the zone), along with __MX__, __A__ and __CNAME__ records, among others — each covered in the sections below.

## 5. A and AAAA records

__Record__

__IP version__

__Also known as__

__A__

IPv4

Address record

__AAAA__

IPv6

"Quad A" record

Both define the __IP address for a hostname__.

__Worked example — reading an A record.__

www.professormesser.com   IN   A   162.159.246.164- IN — internet.
- A — this is an address record.
- 162.159.246.164 — the address returned when someone asks for www.professormesser.com.

__Worked example — adding one through a web front end.__ Fields typically requested:

__Field__

__Example__

Host name

www

IP address

162.159.246.164

__TTL (time to live)__

15 minutes

__TTL__ is how long a resolver (and the requesting user's device) will __remember__ that answer before asking again. After 15 minutes here, the record __times out__, and the next request re-queries the DNS server. This is deliberate: it lets an administrator change the IP address at any time, knowing the change will be visible everywhere within, at most, one TTL period.

__AAAA records__ are added the same way — host name, __IPv6__ address, and a TTL.

## 6. CNAME records

Sometimes one physical server plays several roles: a web server, a DNS server, an NTP server and a mail server all at once. Instead of giving every service the __same name__, you can use __canonical names (CNAMEs)__ that all point back to one underlying host.

__Worked example:__

mail.example.com     (the real server, with its own A record)
chat.example.com     CNAME →  mail.example.com
ftp.example.com      CNAME →  mail.example.com
www.example.com      CNAME →  mail.example.comEvery request for chat., ftp. or www.example.com really connects to __mail.example.com__.

__Why this matters for administration:__ if the underlying server's IP address ever changes, you only update the __one A record__ (mail.example.com) — every CNAME pointing to it automatically follows, with __no changes needed__ to the CNAME records themselves.

## 7. MX records

__MX (Mail Exchanger)__ records are among the most critical on any domain — they make sending and receiving email possible.

__Structure:__

example.com   IN   MX   mail.example.com- IN — internet.
- MX — mail exchanger record.
- The __name of the mail server__ responsible for that domain.

## 7.1 How mail delivery uses MX and A together

__Worked example — sending mail to james@professormesser.com:__

1. The sending mail server looks up the __MX record__ for professormesser.com.
2. It finds the mail server's name, e.g. mail.example.com.
3. It performs a __second lookup__ — this time for the __A record__ of mail.example.com.
4. That returns an IP address, e.g. 123.12.41.41.
5. The sending server now knows exactly __where to deliver the message__.

## 7.2 Worked example — a different domain's MX record

A web-based DNS front end might show:

__Field__

__Example__

Host

mail

Target

mail.hover.com.cust.hostedemail.com

This routes mail for that domain to a __third-party hosted email provider__, rather than a self-managed server.

__Every domain has its own MX records__, configured (via a raw file or a web front end) with a record type, host name, target name, and a TTL — just like the other record types.

## 8. TXT records

__TXT (text) records__ are __human-readable__ entries anyone can query from a DNS server. They're used for:

- __Verification__ — proving you control a domain, for example when setting up a service that needs to confirm domain ownership.
- __Reducing spam__ — several specific TXT-based mechanisms exist for this, covered in sections 9–11.

__Worked example — viewing TXT records:__

dig professormesser.com TXTor, on Windows:

nslookup -type=txt google.comQuerying professormesser.com this way might show, for example, one TXT record used for a __service verification__ (such as a "stripe verification" entry), and another used as an __SPF record__.

## 9. DKIM — DomainKeys Identified Mail

__DKIM__ adds a __digital signature__ to outgoing email, so recipients can confirm a message genuinely came from your domain.

__Where__

__What's stored__

__DNS TXT record__

The __public key__ — you'll see v=DKIM in the record

__Your email server__

The matching __private key__

__How it works:__

1. Your outgoing mail is __digitally signed__ using your __private key__.
2. A receiving mail server sees the signature.
3. It looks up your __public key__ from your DNS TXT record.
4. It __verifies the signature__ using that public key.
5. If it checks out, the recipient knows the message really did come from your official mail server.

__Adding a DKIM record through a web front end:__

__Field__

__Example__

Host name

Usually provided by your email service

Text content

The __public key__

TTL

e.g. 15 minutes

## 10. SPF — Sender Policy Framework

Organisations often send email from __several different sources__: an internal mail server, plus perhaps a third-party bulk-mail provider. __SPF__ lets you publish which servers are __allowed__ to send mail on your behalf.

__How it works:__

1. Your domain's SPF __TXT record__ lists every legitimate outgoing mail server.
2. A receiving server checks a message's __origination server__ against that list.
3. If the origination server __is__ on the list, the message is treated as legitimate for that check.
4. If it __isn't__, the message likely didn't really come from your organisation.

__Adding an SPF record:__

__Field__

__Example__

Record type

TXT

Host name

All hosts, shown as @

Content

The list of approved outgoing mail servers

## 11. DMARC — Domain-based Message Authentication, Reporting and Conformance

__SPF and DKIM checks can each pass or fail.__ __DMARC__ tells receiving mail servers __what to do__ when they fail, on your domain's behalf:

__Policy option__

__Effect on a failing message__

Accept

Deliver it anyway

Quarantine

Send it to spam/quarantine

Reject

Drop it entirely

__Reporting:__ a DMARC record can also include an __email address__, so receiving servers send back a report of how messages from your domain were handled. This lets you build a picture of __how many messages got through, and how many were flagged__.

__Worked example — reading a DMARC record:__

A DMARC TXT record specifies that messages failing validation should be put into __quarantine (spam)__, and that reports of that disposition should be sent to a specified __reporting email address__ for later analysis.

### 11.1 How SPF, DKIM and DMARC fit together

 Sender publishes:
   SPF   -> which servers may send mail for this domain
   DKIM  -> a public key to verify message signatures
   DMARC -> what to do if SPF or DKIM checks fail, and where to report it

 Receiver, for each incoming message:
   1. Check SPF: did it come from an approved server?
   2. Check DKIM: does the signature verify with the published public key?
   3. Apply the sender's DMARC policy to anything that failed
      (accept / quarantine / reject)
   4. Optionally send a report back to the sender's DMARC reporting address

## 12. Security perspective

- __DNS changes need care and a rollback plan.__ A single bad record can take a service off the internet; always keep a backup configuration.
- __TTL is a trade-off.__ A short TTL (like the 15-minute example) makes changes propagate fast — useful during migrations or incident response — but increases query load. A long TTL reduces load but slows how fast a fix (or an attacker's redirection) spreads.
- __SPF, DKIM and DMARC together are the main defence against email spoofing.__ Any one alone is weaker: SPF alone can be bypassed by forwarding; DKIM alone doesn't say who's allowed to send; DMARC ties both together and defines the consequence.
- __A domain with no DMARC record is easy to spoof convincingly.__ Attackers can send mail that appears to come from a real domain, and the receiving server has no policy telling it what to do about failures.
- __DKIM's private key must stay private.__ If it leaks, an attacker can forge validly signed mail from your domain until the key is rotated.
- __Resource records are often the first thing checked in a phishing investigation__ — verifying SPF/DKIM/DMARC results on a suspicious message, and checking whether a domain's MX or A records were recently and unexpectedly changed.

# Summary

- __DNS__ resolves FQDNs to IP addresses, as a __distributed, hierarchical__ database: 13 root server clusters (1,000\+ servers), then TLDs (generic and country-code), then domains and subdomains.
- __dig__ (Linux/macOS) and __nslookup__ (Windows) query DNS directly.
- __Resource records (RR)__ hold the actual data; handle DNS configuration carefully, with backups.
- __A / AAAA records__ map a hostname to an IPv4 / IPv6 address; __TTL__ controls how long that answer is cached.
- __CNAME records__ point one name at another, so changing the underlying A record updates every alias automatically.
- __MX records__ name a domain's mail server; delivery needs both the MX lookup and a follow-up A record lookup.
- __TXT records__ hold human-readable text, used for verification and anti-spam mechanisms.
- __DKIM__ signs outgoing mail (private key on the server, public key in DNS) so recipients can verify authenticity.
- __SPF__ lists which servers may legitimately send mail for a domain.
- __DMARC__ defines what receivers should do when SPF or DKIM fail (accept, quarantine, reject) and where to send reports.

# Glossary

__Term__

__Definition__

DNS

Domain Name System — resolves domain names to IP addresses

FQDN

Fully qualified domain name

Distributed database

A database spread across many servers and networks

Root server

A top-level DNS server directing queries to TLD servers

TLD

Top-level domain, e.g. .com or a country code like .uk

gTLD

Generic top-level domain

ccTLD

Country-code top-level domain

dig

A DNS query tool for Linux/macOS

nslookup

A DNS query tool built into Windows

Resource record (RR)

An entry in a DNS server's database

A record

Maps a hostname to an IPv4 address

AAAA record

Maps a hostname to an IPv6 address

TTL

Time to live — how long a DNS answer is cached

CNAME

An alias record pointing one name to another

MX record

Names a domain's mail server(s)

TXT record

A human-readable text entry in DNS

SOA record

Defines authority and settings for a DNS zone

DKIM

DomainKeys Identified Mail — digitally signs outgoing email

Public / private key

The key pair DKIM uses to sign and verify mail

SPF

Sender Policy Framework — lists a domain's authorised mail servers

DMARC

Domain-based Message Authentication, Reporting and Conformance

Quarantine

Placing a message in spam/junk rather than delivering or rejecting it

# Review questions

1. Why is DNS described as both "distributed" and "hierarchical"?
2. Roughly how many servers make up the 13 root server clusters?
3. Give an example of a generic TLD and a country-code TLD.
4. A dig query for a web server returns three different IP addresses. Why might that be?
5. What is a resource record?
6. Why should you always have a backup before changing DNS records?
7. What's the difference between an A record and an AAAA record?
8. A record has a TTL of 15 minutes. What does that control?
9. Why would an organisation use CNAME records instead of giving every service its own A record?
10. Describe the two DNS lookups involved in delivering an email to a domain.
11. What kind of information is stored in a TXT record, and name two uses.
12. How does DKIM allow a recipient to verify a message's authenticity?
13. What does an SPF record list, and what does it protect against?
14. What three actions can a DMARC policy specify for a message that fails validation?
15. Why are SPF, DKIM and DMARC more effective together than any one alone?

# Answer key

1. __Distributed__ because the database is spread across many servers worldwide; __hierarchical__ because it's organised in layers — root, TLD, domain, subdomain, host.
2. __Over 1,000 servers.__
3. __Generic: .com, .org or .net. Country-code: .us, .ca or .uk__ (any valid example).
4. __The organisation runs redundant web servers__, so if one address becomes unavailable, the others still work.
5. __An entry in a DNS server's database__ holding information such as an IP address, certificate details, or mail routing information.
6. __A mistake in a DNS record can make a service unreachable from the internet__, so you need a quick way to revert the change.
7. __A records map a hostname to an IPv4 address; AAAA records map a hostname to an IPv6 address.__
8. __How long a resolver or device caches that answer before it must ask again.__
9. __So that changing the underlying server's IP address only requires updating one A record__ — every CNAME pointing to it updates automatically, with no changes needed to the CNAMEs themselves.
10. __First, a lookup of the domain's MX record to find the mail server's name; second, a lookup of that mail server's A record to find its IP address.__
11. __Human-readable text.__ Any two of: domain ownership verification, SPF, DKIM.
12. __The message is signed with the sender's private key; the recipient retrieves the matching public key from the sender's DNS TXT record and uses it to verify the signature.__
13. __The mail servers authorised to send email for that domain.__ It protects against messages that falsely claim to be from that domain.
14. __Accept, quarantine (spam) or reject.__
15. __Because SPF, DKIM and DMARC each check something different__ — who may send, whether the message was tampered with, and what to do if a check fails — so together they close gaps that any single mechanism leaves open.
