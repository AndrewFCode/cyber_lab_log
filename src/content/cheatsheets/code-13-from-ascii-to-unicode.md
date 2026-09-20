---
title: "Code: From ASCII to Unicode"
description: "Code ch. 13 — text as numbers: Baudot and shift codes, 7-bit ASCII and control characters, code pages, Unicode, and UTF-8/16/32."
tags: ["code", "petzold", "computing", "encoding", "unicode"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 13"
moduleOrder: 13
unit: 13
---
> **In one line:** every character is a number — ASCII gave English 128 of them, and Unicode gives every writing system a number, with UTF-8 storing them compactly.

*Companion to: Charles Petzold, Code (2nd edition), chapter 13.* See also [TCM Help Desk section 3](/resources/tcm-help-desk/3/).

---

## The road to Unicode

| Code | Bits | Notes |
|---|---|---|
| Baudot / teletype codes | 5 | 32 codes — needed **shift** codes to switch between letters and figures |
| ASCII (1960s) | 7 | 128 codes: control characters, digits, letters, punctuation |
| EBCDIC | 8 | IBM mainframes — a different, incompatible layout |
| Extended ASCII / code pages | 8 | The top 128 values vary by code page (ISO-8859-1, Windows-1252) — the source of garbled text |
| Unicode | Code points up to U+10FFFF | One number per character across all writing systems, plus emoji |

---

## ASCII landmarks

| Range / char | Hex | Decimal | Notes |
|---|---|---|---|
| Control characters | `00`–`1F` | 0–31 | Non-printing: NUL `00`, BEL `07`, BS `08`, TAB `09`, LF `0A`, CR `0D`, ESC `1B` |
| Space | `20` | 32 | First printable character |
| `0`–`9` | `30`–`39` | 48–57 | Digit value = code − 48 |
| `A`–`Z` | `41`–`5A` | 65–90 | |
| `a`–`z` | `61`–`7A` | 97–122 | Lowercase = uppercase + 32 (one bit: `0x20`) |
| DEL | `7F` | 127 | |

**Line endings:** Windows ends lines with CR LF (`0D 0A`); Linux and macOS use LF (`0A`).

---

## Unicode encodings

| Encoding | Bytes per character | Notes |
|---|---|---|
| UTF-8 | 1–4 | ASCII unchanged; the web and Linux default |
| UTF-16 | 2 or 4 | Used inside Windows, Java, JavaScript |
| UTF-32 | 4 | Simple, wasteful |

| UTF-8 byte pattern | Carries |
|---|---|
| `0xxxxxxx` | U+0000–U+007F (plain ASCII) |
| `110xxxxx 10xxxxxx` | Up to U+07FF |
| `1110xxxx 10xxxxxx 10xxxxxx` | Up to U+FFFF |
| `11110xxx` + three `10xxxxxx` | Up to U+10FFFF |

| Character | Code point | UTF-8 bytes |
|---|---|---|
| `A` | U+0041 | `41` |
| `é` | U+00E9 | `C3 A9` |
| `€` | U+20AC | `E2 82 AC` |
| 😀 | U+1F600 | `F0 9F 98 80` |

A UTF-8 **BOM** (`EF BB BF`) sometimes starts a file and can break scripts that don't expect it.

---

## Try it

```python
ord('A'), chr(97)             # (65, 'a')
'é'.encode('utf-8')           # b'\xc3\xa9'
hex(ord('€'))                 # '0x20ac'
```

```powershell
[int][char]'A'                                                    # 65
[Text.Encoding]::UTF8.GetBytes('é') | ForEach-Object { '{0:X2}' -f $_ }   # C3 A9
```

```bash
file -i notes.txt                                      # reports the charset
iconv -f WINDOWS-1252 -t UTF-8 old.txt > new.txt       # convert encodings
dos2unix script.sh                                     # CRLF → LF (fixes "bad interpreter" errors)
echo -n 'é' | xxd                                      # c3a9
```

---

## 🔐 Security and IT connections

- **Homoglyphs.** Cyrillic `а` (U+0430) looks identical to Latin `a`, so attackers register look-alike domains. Browsers show these as punycode (`xn--...`) — a red flag in a link.
- **Invisible and control characters:**
  - The right-to-left override (U+202E) disguises file extensions.
  - Zero-width characters hide text.
  - CR/LF injected into input can forge log lines or HTTP headers.
- **Null bytes** (`%00`) once truncated file paths in poorly written code ("file.php%00.jpg").
- **Everyday tickets:** garbled characters (`Ã©` for `é`) mean UTF-8 read as Windows-1252. A shell script failing with `^M` means it has Windows line endings.

---

## Practice drills

<details>
<summary>1. What's the hex code for lowercase <code>c</code>?</summary>

`0x63` (uppercase C is `0x43`; add `0x20`).
</details>

<details>
<summary>2. How many bytes does <code>é</code> take in UTF-8?</summary>

Two: `C3 A9`.
</details>

<details>
<summary>3. A link reads <code>xn--80ak6aa92e.com</code>. Why be suspicious?</summary>

It's punycode for a domain spelled entirely in Cyrillic look-alike letters that displays as "apple.com" — a well-known homograph demonstration.
</details>

<details>
<summary>4. A Bash script copied from Windows fails with <code>/bin/bash^M: bad interpreter</code>. Fix?</summary>

Convert CRLF to LF: `dos2unix script.sh`.
</details>

---

## Key takeaways

- Characters are numbers: ASCII covers 128, Unicode covers everything.
- UTF-8 is variable-length, ASCII-compatible and the default almost everywhere.
- Encoding mismatches cause garbled text; look-alike and invisible characters are attack tools.
