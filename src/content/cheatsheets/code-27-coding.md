---
title: "Code: Coding"
description: "Code ch. 27 — from machine code to high-level languages: assemblers, compilers vs interpreters, high-level constructs, libraries and APIs."
tags: ["code", "petzold", "computing", "programming"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 27"
moduleOrder: 27
unit: 27
---
> **In one line:** nobody writes ones and zeros — layers of translation, from assembler up to high-level languages, let humans express ideas that machines still run as machine code.

*Companion to: Charles Petzold, Code (2nd edition), chapter 27.* See also [TryHackMe module 4](/resources/tryhackme/4/) and [TCM Help Desk section 3](/resources/tcm-help-desk/3/).

---

## The ladder of languages

| Level | Example | Who reads it |
|---|---|---|
| Machine code | `B8 01 00 00 00` | The CPU |
| Assembly | `MOV EAX, 1` | Humans, one line ≈ one instruction |
| High-level | `total = a + b` | Humans, one line ≈ many instructions |

- **Assembler:** translates assembly mnemonics into machine code, one-to-one.
- **The leap to high-level languages** (Fortran, C, then everything since) let programmers stop thinking about registers and write in terms of the problem.

---

## Compiled vs interpreted

| | Compiled | Interpreted | Bytecode / JIT |
|---|---|---|---|
| When translated | Ahead of time, to machine code | Line by line, at run time | To bytecode, then to machine code while running |
| Speed | Fast | Slower | In between |
| Portability | One binary per OS + CPU | Runs anywhere the interpreter does | Runs anywhere the runtime does |
| Examples | C, C++, Go, Rust | Python, JavaScript, Bash, PowerShell | Java, C# (.NET) |

---

## What high-level languages give you

| Construct | Purpose |
|---|---|
| Variables and types | Named, typed storage |
| Conditionals and loops | `if` / `while` / `for` — jumps and flags, made readable |
| Functions | Reusable subroutines ([ch. 24](/resources/code/24/)) |
| Data structures | Arrays, lists, dictionaries, objects |
| Libraries / modules | Prewritten code you call |
| API | The published set of functions a library or service exposes |

Higher levels trade some control and speed for a lot of productivity — **abstraction** again.

---

## Try it — one job, three languages

```python
print(sum(range(1, 101)))          # Python — interpreted
```

```c
/* C — compiled: gcc sum.c -o sum && ./sum */
#include <stdio.h>
int main(void){ int t=0; for(int i=1;i<=100;i++) t+=i; printf("%d\n", t); return 0; }
```

```bash
seq 1 100 | paste -sd+ | bc         # shell — glue existing tools together
```

---

## 🔐 Security and IT connections

- **The language shapes the bugs.**
  - C and C++ let you touch memory directly, so buffer overflows and use-after-free are theirs. This is why memory-safe languages (Rust, Go) are now recommended for new security-sensitive code.
  - Interpreted languages avoid those but add injection risks (`eval`, `os.system`) if input isn't handled carefully.
- **The supply chain is code you didn't write.** Modern programs pull in hundreds of library dependencies. A poisoned package (typosquatting, a hijacked maintainer account) runs with your program's privileges. Pin versions, check signatures, and scan dependencies.
- **Source vs binary.** You run compiled binaries you can't easily read — which is why signing, hashes and trusted sources matter, and why malware analysts disassemble.

---

## Practice drills

<details>
<summary>1. What does an assembler translate, and at what ratio?</summary>

Assembly mnemonics into machine code, roughly one instruction per line.
</details>

<details>
<summary>2. Compiled vs interpreted — which is more portable and why?</summary>

Interpreted: the same source runs anywhere the interpreter is installed, with no per-platform binary.
</details>

<details>
<summary>3. Why are memory-safe languages recommended for new security-critical code?</summary>

They prevent whole classes of memory bugs (buffer overflows, use-after-free) that plague C and C++.
</details>

---

## Key takeaways

- Machine code → assembly → high-level languages, each more human and further from the metal.
- Compiled is fast and platform-specific; interpreted is portable and slower; bytecode sits between.
- The language and its dependencies shape the security risks — from memory bugs to supply-chain attacks.
