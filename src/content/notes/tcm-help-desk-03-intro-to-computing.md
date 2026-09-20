---
title: "Help Desk: Intro to Computing"
description: "A computer is built from billions of tiny switches (transistors). A switch has two reliable states: off and on, which we write as 0 and 1."
tags: ["help-desk", "tcm", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TCM Security, Practical Help Desk · Section 3__

__Quick reference:__ the short version of this section is the Section 3 cheat sheet. The ground-up version is the Code sheets.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why computers use binary.
2. Convert between decimal, binary and hexadecimal by hand.
3. Use bits, bytes and storage units correctly, including the decimal/binary difference and bits vs bytes in networking.
4. Explain character encoding (ASCII, Unicode, UTF-8) and Base64, and encode a character to bytes by hand.
5. Describe logic gates and how they add numbers.
6. Describe how a CPU executes instructions, and the memory hierarchy.
7. Explain compilers, interpreters and the layers of abstraction between an app and the hardware.
8. Distinguish encoding, encryption and hashing.

## 1. Why binary?

A computer is built from billions of tiny switches (transistors). A switch has two reliable states: __off__ and __on__, which we write as __0__ and __1__.

Why not ten voltage levels for decimal? Because electrical signals are noisy. Telling "high" from "low" is easy and reliable; telling ten levels apart would produce constant errors. Binary trades more digits for rock-solid reliability.

__Physical form__

__0__

__1__

Voltage in a circuit

Low

High

Magnetic hard drive

One magnetic direction

The other direction

SSD flash cell

Charge level read as 0

Charge level read as 1

Optical disc

Land

Pit edge

Fibre-optic cable

Light off

Light on

## 2. Number systems

## 2.1 Place value

In any positional number system, each position is worth the __base raised to a power__:

Decimal 4,825 = 4×10³ \+ 8×10² \+ 2×10¹ \+ 5×10⁰
              = 4000  \+ 800   \+ 20    \+ 5Binary works the same way, with base 2:

__Position__

__7__

__6__

__5__

__4__

__3__

__2__

__1__

__0__

Value

128

64

32

16

8

4

2

1

## 2.2 Worked example — binary to decimal

Convert 1011 0110:

__128__

__64__

__32__

__16__

__8__

__4__

__2__

__1__

1

0

1

1

0

1

1

0

Add the columns that have a 1: 128 \+ 32 \+ 16 \+ 4 \+ 2 = __182__.

## 2.3 Worked example — decimal to binary (subtraction method)

Convert __200__:

__Step__

__Largest power that fits__

__Remainder__

__Bit set__

200

128

72

128 → 1

72

64

8

64 → 1

8

8

0

8 → 1

Every other position is 0 → __1100 1000__.

## 2.4 Worked example — decimal to binary (division method)

Convert __13__: divide by 2 repeatedly and write down the remainders.

13 ÷ 2 = 6 remainder 1   <- least significant bit
 6 ÷ 2 = 3 remainder 0
 3 ÷ 2 = 1 remainder 1
 1 ÷ 2 = 0 remainder 1   <- most significant bit
Read upwards: 1101

### 2.5 Hexadecimal

Hex is base 16: digits 0–9, then A–F (10–15). One hex digit is exactly 4 bits (a __nibble__), so hex is a compact way to write binary.

__Binary__

__Hex__

__Binary__

__Hex__

0000

0

1000

8

0001

1

1001

9

0010

2

1010

A

0011

3

1011

B

0100

4

1100

C

0101

5

1101

D

0110

6

1110

E

0111

7

1111

F

__Worked example — binary to hex:__ 1011 0110 → 1011 = B, 0110 = 6 → __0xB6__. __Check:__ 11×16 \+ 6 = 182, matching section 2.2.

__Worked example — hex to decimal:__ 0x2F = 2×16 \+ 15 = __47__.

You'll see hex in MAC addresses (00:1A:2B:3C:4D:5E), IPv6 addresses, colour codes (\#FF8800), memory addresses, file hashes and Windows error codes (0x80070005).

## 3. Bits and bytes

## 3.1 Units

__Unit__

__Size__

Bit (b)

One binary digit

Nibble

4 bits

Byte (B)

8 bits — 256 possible values (0–255)

An n-bit number has __2ⁿ__ possible values: 8 bits → 256, 16 bits → 65,536, 32 bits → about 4.3 billion.

## 3.2 Decimal vs binary prefixes

__Decimal (SI)__

__Bytes__

__Binary (IEC)__

__Bytes__

1 KB (kilobyte)

1,000

1 KiB (kibibyte)

1,024

1 MB

1,000² = 1,000,000

1 MiB

1,024² = 1,048,576

1 GB

1,000³

1 GiB

1,024³

1 TB

1,000⁴

1 TiB

1,024⁴

__Worked example — the "missing" space ticket.__ A user's new "1 TB" drive shows as 931 GB in Windows.

- __Why:__ drive makers sell in decimal (1 TB = 1,000,000,000,000 bytes). Windows counts in binary but labels it "GB".
- __The maths:__ 1,000,000,000,000 ÷ 1,073,741,824 (bytes per GiB) ≈ 931.3.
- __Nothing is missing__ — it's the same number of bytes in different units.

## 3.3 Bits vs bytes in networking

- Network speeds are quoted in __bits__ per second: __Mbps__, lowercase b.
- File sizes are in __bytes__: __MB__, uppercase B.
- To convert, divide bits by 8.

__Worked example — download time.__ A user downloads a 2 GB file on a 100 Mbps connection.

1. __Convert the speed:__ 100 Mbps ÷ 8 = 12.5 MB/s.
2. __Time:__ 2,000 MB ÷ 12.5 MB/s = 160 seconds — just under 3 minutes, best case.
3. __In reality__ protocol overhead and Wi-Fi quality make it slower, so 3–4 minutes is normal, not a fault.

## 4. Encoding: turning characters into numbers

Computers only store numbers, so text needs an agreed mapping — a __character encoding__.

## 4.1 ASCII

ASCII (1960s) uses 7 bits for 128 characters:

__Range__

__Contents__

0–31

Control characters (tab = 9, line feed = 10, carriage return = 13)

32

Space

48–57

Digits 0–9

65–90

A–Z

97–122

a–z

Upper and lower case differ by exactly 32 (A = 65, a = 97) — a single bit.

## 4.2 Code pages

ASCII only covers English. The 8th bit gave 128 extra characters, but different regions used them differently ("code pages" such as Windows-1252 and ISO-8859-1). The same byte could mean é on one system and something else on another — the source of garbled text.

## 4.3 Unicode and UTF-8

__Unicode__ gives every character in every writing system a unique number, called a __code point__, written U\+ plus hex: A = U\+0041, é = U\+00E9, € = U\+20AC, the "grinning face" emoji = U\+1F600.

__UTF-8__ stores code points in 1–4 bytes:

__Code point range__

__Bytes__

__Pattern__

U\+0000–U\+007F

1

0xxxxxxx (identical to ASCII)

U\+0080–U\+07FF

2

110xxxxx 10xxxxxx

U\+0800–U\+FFFF

3

1110xxxx 10xxxxxx 10xxxxxx

U\+10000–U\+10FFFF

4

11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

__Worked example — encoding é (U\+00E9) in UTF-8:__

1. E9 in binary is 1110 1001. That's above 7F, so it needs 2 bytes, and 2 bytes carry 11 bits of payload.
2. Pad to 11 bits: 000 1110 1001.
3. Split into 5 \+ 6 bits: 00011 and 101001.
4. Fill the pattern: 110 00011 = __C3__, 10 101001 = __A9__.
5. So é is stored as __C3 A9__.
6. If software reads those two bytes as Windows-1252, it shows Ã© — the classic garbled-text ticket.

## 4.4 Base64

__Base64__ turns binary data into safe printable text (letters, digits, \+, /). It's used for email attachments, web data and embedding files. Every 3 bytes become 4 characters.

__Worked example — "Man" → Base64:__

1. __Bytes:__ M = 77, a = 97, n = 110.
2. __In binary:__ 01001101 01100001 01101110.
3. __Regroup into four 6-bit chunks:__ 010011 010110 000101 101110 = 19, 22, 5, 46.
4. __Look up the Base64 alphabet__ (A–Z = 0–25, a–z = 26–51): 19 = T, 22 = W, 5 = F, 46 = u.
5. __Result:__ __TWFu__.

\[Convert\]::ToBase64String(\[Text.Encoding\]::ASCII.GetBytes('Man'))   \

# TWFu
echo -n Man | base64                                                \

# TWFu

## 5. How a computer computes, part 1: logic gates

## 5.1 The basic gates

A __logic gate__ is a small circuit of transistors that takes binary inputs and produces a binary output.

__Gate__

__Symbol in expressions__

__Output 1 when__

AND

A · B

Both inputs are 1

OR

A \+ B

At least one input is 1

NOT

Ā

The input is 0

XOR

A ⊕ B

The inputs differ

NAND

NOT (A AND B)

Not both are 1

__A__

__B__

__AND__

__OR__

__XOR__

__NAND__

0

0

0

0

0

1

0

1

0

1

1

1

1

0

0

1

1

1

1

1

1

1

0

0

NAND is __universal__: any circuit, including a whole CPU, can be built from NAND gates alone.

## 5.2 Worked example — adding two bits with gates

Adding one bit to one bit:

__A__

__B__

__A \+ B__

__Sum bit__

__Carry bit__

0

0

0

0

0

0

1

1

1

0

1

0

1

1

0

1

1

2 (binary 10)

0

1

- The __Sum__ column is exactly XOR; the __Carry__ column is exactly AND.
- One XOR plus one AND is a __half adder__.
- A __full adder__ also accepts a carry-in; chain 8 of them and you can add two bytes. That's arithmetic from switches.

## 6. How a computer computes, part 2: the CPU

## 6.1 Parts of the CPU

__Part__

__Job__

ALU (arithmetic logic unit)

Does the maths and logic — built from adders and gates

Control unit

Reads each instruction and directs everything else

Registers

Tiny, ultra-fast storage inside the CPU for the values being worked on

Program counter

A register holding the address of the next instruction

Clock

Pulses that keep every step in time; 3.5 GHz = 3.5 billion pulses a second

Cache (L1/L2/L3)

Small, fast memory on the CPU holding recently used data

## 6.2 The fetch-decode-execute cycle

     \+-----------\+      \+-----------\+      \+-----------\+
 \+-->|   FETCH   |----->|  DECODE   |----->|  EXECUTE  |---\+
 |   | get next  |      | work out  |      | ALU does  |   |
 |   | instruc-  |      | what it   |      | the work; |   |
 |   | tion from |      | means     |      | store the |   |
 |   | memory    |      |           |      | result    |   |
 |   \+-----------\+      \+-----------\+      \+-----------\+   |
 \+----------------- program counter moves on -------------\+

__Worked example — total = price \+ tax:__

1. __Fetch:__ load price from memory into register 1.
2. __Fetch:__ load tax into register 2.
3. __Execute:__ the ALU adds the two registers; the result lands in register 3.
4. __Store:__ write register 3 to the memory location for total.

One line of code becomes several machine instructions, each going round the cycle.

## 6.3 The memory hierarchy

__Level__

__Typical size__

__Relative speed__

__Volatile?__

Registers

Bytes

Fastest

Yes

L1 / L2 / L3 cache

KB to tens of MB

Very fast

Yes

RAM

8–64 GB

Fast

Yes

SSD

256 GB–4 TB

Slower

No

HDD

1–20 TB

Slowest

No

Faster memory is smaller and more expensive per byte. The CPU keeps what it needs soon as close as possible — which is why adding RAM, or moving from HDD to SSD, speeds up a slow PC so dramatically.

## 7. Compilers and abstraction

## 7.1 Layers of abstraction

Each layer hides the complexity of the one below it:

 Application       Outlook, a web browser
 High-level code   total = price \+ tax
 Assembly          mov eax, \[price\] / add eax, \[tax\]
 Machine code      8B 05 ... 03 05 ...
 CPU               ALU, registers, control unit
 Logic gates       AND, OR, XOR, NAND
 Transistors       Billions of tiny switches

### 7.2 Compilers and interpreters

__Approach__

__How it works__

__Examples__

__Trade-off__

Compiled

The whole program is translated to machine code before running

C, C\+\+, Go, Rust

Fast; one build per OS and CPU type

Interpreted

An interpreter reads and runs the code at run time

Python, JavaScript, PowerShell, Bash

Portable; slower

Bytecode \+ JIT

Compiled to an intermediate bytecode, then to machine code at run time

Java, C\

# (.NET)

A balance of both

__In the real world:__ "This program won't run on my new ARM laptop" is a compiled-code problem — the software was built for x64. Windows on ARM can emulate many x64 apps, but drivers and some low-level software need a native ARM build.

## 8. Security perspective

__Reversible?__

__Needs a key?__

__Purpose__

__Examples__

Encoding

Yes, by anyone

No

Represent data in a different format

ASCII, UTF-8, Base64, hex

Encryption

Yes, with the key

Yes

Keep data secret

AES, RSA, TLS

Hashing

No (one-way)

No

Verify integrity; store passwords

SHA-256, bcrypt

- __Base64 is not security.__ A password "hidden" in Base64 in a script or config file is a plaintext password to anyone who decodes it.
- __Attackers use encoding to hide.__
	- Malicious PowerShell often runs with -EncodedCommand: a Base64 string of the real command.
	- Analysts decode it (UTF-16LE) as a first step.
- __Hex is the language of forensics.__ File signatures, packet captures and memory dumps are all read in hex.
- __Hashes prove integrity.__ Compare a download's SHA-256 with the publisher's; one changed bit gives a completely different hash.

# Summary

- Computers use binary because two states are reliable in noisy electronics.
- __Place value__ works in any base. Convert binary to decimal by adding place values; decimal to binary by subtraction or repeated division. One hex digit = 4 bits.
- A byte is 8 bits (256 values).
	- Drives use decimal units and Windows binary ones — hence 931 GB.
	- Networks use bits; files use bytes (÷ 8).
- __Encoding:__ ASCII (128 characters) → code pages → Unicode code points stored as UTF-8 (1–4 bytes). Base64 makes binary safe as text.
- __Gates and adders:__ gates implement logic; XOR and AND make a half adder; adders chained together do arithmetic.
- __The CPU__ runs fetch-decode-execute using the ALU, control unit, registers and clock; the memory hierarchy trades speed for size.
- __Code:__ compiled code becomes machine code ahead of time; interpreted code runs through an interpreter.
- __Encoding, encryption and hashing__ are three different things.

# Glossary

__Term__

__Definition__

Bit

A binary digit, 0 or 1

Nibble

4 bits — one hex digit

Byte

8 bits

Binary / decimal / hexadecimal

Base 2 / base 10 / base 16 number systems

KiB / MiB / GiB

Binary units (1,024-based)

Mbps

Megabits per second — network speed

ASCII

7-bit character encoding with 128 characters

Code page

An 8-bit character set used for one region's extra characters

Unicode

A standard giving every character a unique code point

Code point

The number assigned to a character, e.g. U\+00E9

UTF-8

Variable-length (1–4 byte) encoding of Unicode; ASCII-compatible

Base64

Encoding binary data as printable text, 3 bytes → 4 characters

Logic gate

A circuit that computes a logical function of binary inputs

Half / full adder

Gate circuits that add two bits / two bits plus a carry

ALU

Arithmetic logic unit — the part of the CPU that computes

Register

Tiny, very fast storage inside the CPU

Clock speed

Pulses per second that pace the CPU (GHz)

Cache

Small, fast memory close to the CPU

Compiler

Translates source code to machine code before execution

Interpreter

Executes source code directly at run time

Abstraction

Hiding lower-level complexity behind a simpler interface

# Review questions

1. Convert 1110 0101 to decimal and to hex.
2. Convert 99 to binary.
3. A user's 2 TB drive shows about 1.81 TB in Windows. Explain why.
4. How long, at best, does a 500 MB file take to download on a 40 Mbps connection?
5. What are the UTF-8 bytes for the character A, and why?
6. What does the text Ã© appearing instead of é tell you?
7. Encode "Hi" in hex (ASCII).
8. Which two gates form a half adder, and which output does each produce?
9. Put in order, fastest first: RAM, L1 cache, SSD, registers.
10. What's the difference between compiled and interpreted code?
11. A script contains cGFzc3dvcmQxMjM=. Is the value protected? Explain.
12. What does the program counter hold?

# Answer key

1. __229, 0xE5.__ 128 \+ 64 \+ 32 \+ 4 \+ 1 = 229; 1110 = E, 0101 = 5.
2. __0110 0011.__ 64 \+ 32 \+ 2 \+ 1 = 99.
3. __Decimal vs binary units.__ Sold as 2 × 10¹² bytes; Windows divides by 1,024⁴ (about 1.1 × 10¹²) and shows about 1.82 "TB" (really TiB). Nothing is missing.
4. __About 100 seconds.__ 40 Mbps ÷ 8 = 5 MB/s, and 500 ÷ 5 = 100 s.
5. __41, a single byte.__ UTF-8 stores U\+0000–U\+007F exactly as ASCII.
6. __UTF-8 text was read as a different encoding__ (e.g. Windows-1252) — an encoding mismatch.
7. __48 69.__ H = 72 = 0x48, i = 105 = 0x69.
8. __XOR gives the sum bit; AND gives the carry bit.__
9. __Registers → L1 cache → RAM → SSD.__
10. __Compiled code is translated to machine code before it runs__ (fast, platform-specific). __Interpreted code is run by an interpreter at run time__ (portable, slower).
11. __No — it's Base64, which anyone can decode__ (it's "password123"). Encoding isn't encryption.
12. __The memory address of the next instruction to fetch.__
