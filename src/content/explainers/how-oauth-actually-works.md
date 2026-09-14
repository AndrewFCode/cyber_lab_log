---
title: How OAuth actually works
description: The authorisation code flow, step by step, without the diagrams that explain nothing
tags: [auth, web, security]
pubDate: 2026-08-22
updated: 2026-09-10
difficulty: intermediate
---

Every OAuth explanation starts with a sequence diagram containing six arrows, and I have never
once understood it from the diagram. What follows is the authorisation code flow written as a
story, because the ordering is the only genuinely hard part.

## The problem it solves

You want a third-party app to read your calendar. The naive solution is to hand the app your
Google password. That is catastrophic: the app can do *anything* as you, forever, and you cannot
revoke it without changing your password.

OAuth exists so that the app gets a token instead. A token is scoped (calendar only), expiring,
and revocable without touching your password. **OAuth is a delegation protocol, not a login
protocol** — that distinction matters later.

## The four parties

- **Resource owner** — you.
- **Client** — the app that wants your calendar.
- **Authorisation server** — the thing that shows the consent screen and issues tokens.
- **Resource server** — the API holding the calendar.

## The flow

**1. The client sends you to the authorisation server.** A redirect, with the important
parameters in the query string:

```
GET https://auth.example.com/authorize
  ?response_type=code
  &client_id=abc123
  &redirect_uri=https://app.example.com/callback
  &scope=calendar.read
  &state=xyz789
  &code_challenge=<sha256 of a random verifier>
  &code_challenge_method=S256
```

**2. You authenticate and consent.** This happens entirely on the authorisation server. The
client never sees your credentials, which is the whole point.

**3. The authorisation server redirects back with a code.**

```
GET https://app.example.com/callback?code=SplxlOBeZQ&state=xyz789
```

That code is short-lived, single-use, and useless on its own.

**4. The client exchanges the code for a token**, server-to-server, over POST:

```http
POST /token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=SplxlOBeZQ
&redirect_uri=https://app.example.com/callback
&client_id=abc123
&code_verifier=<the original random string>
```

The response contains an access token, usually a refresh token, and an expiry.

**5. The client calls the API** with `Authorization: Bearer <access_token>`.

## Why there is a code at all

This is the question nobody answers. Why not have the authorisation server just return the
token in the redirect?

Because a redirect is a URL, and URLs leak. They land in browser history, in server access logs,
in `Referer` headers, in the terminal of whoever is screen-sharing. The code is designed for
that exposure: it is single-use, expires in about a minute, and cannot be redeemed without the
client's own credentials or a PKCE verifier. The token itself never touches the URL bar.

## What `state` and PKCE are guarding

`state` is CSRF protection. The client generates a random value, stores it in the session, and
checks it when the callback arrives. Without it, an attacker can trigger the callback with their
own authorisation code and get your session linked to their account.

**PKCE** (Proof Key for Code Exchange) guards the code itself. The client invents a random
`code_verifier`, sends its SHA-256 hash up front, then reveals the original when redeeming the
code. Anyone who intercepts the code cannot use it, because they do not have the verifier. It
began as a mobile concern and is now recommended for every client type.

## The part that trips everyone up

OAuth authorises; it does not authenticate. An access token tells you "the bearer may read this
calendar". It does not reliably tell you *who* the user is — a token issued to another app could
be replayed at yours, and you would happily log the wrong person in.

**OpenID Connect** is the thin layer that fixes this. It adds an `id_token`: a signed JWT with
an audience claim naming the client it was issued for. If you are implementing "sign in with X",
you want OIDC and you must verify that `aud` matches your own client ID.

## The shortest useful summary

The code is a claim ticket that only the real client can redeem. Everything else in the protocol
exists to make sure the ticket cannot be stolen in transit, and to stop a ticket for one
cloakroom being used at another.
