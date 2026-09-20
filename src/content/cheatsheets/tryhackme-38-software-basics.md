---
title: "TryHackMe: Software Basics"
description: "Pre Security module 4 — data representation, Python and JavaScript fundamentals side by side, and databases with SQL."
tags: ["tryhackme", "python", "javascript", "sql"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tryhackme"
module: "Module 4"
moduleOrder: 38
unit: 4
---
> **In one line:** everything is numbers underneath; code is instructions that move them around; databases store them in tables you query with SQL.

*Companion to: TryHackMe Pre Security (2026 path), module 4.*

> ⚠ Built from the module outline, not personal notes. Cross-check room names and specifics against the rooms.

---

## Data representation

| Form | Example for 65 |
|---|---|
| Decimal | `65` |
| Binary | `0100 0001` |
| Hex | `0x41` |
| ASCII character | `A` |

| Type | What it holds | Python | JavaScript |
|---|---|---|---|
| Integer | Whole numbers | `42` (`int`) | `42` (`number`) |
| Float | Decimals | `3.14` (`float`) | `3.14` (`number`) |
| String | Text | `"hi"` (`str`) | `"hi"` (`string`) |
| Boolean | True / false | `True` (`bool`) | `true` (`boolean`) |
| List / array | Ordered values | `[22, 80]` | `[22, 80]` |
| Dictionary / object | Key → value pairs | `{"role": "admin"}` | `{role: "admin"}` |

### Converting in code

| Task | Python | JavaScript |
|---|---|---|
| Number → binary | `bin(10)` → `'0b1010'` | `(10).toString(2)` → `'1010'` |
| Number → hex | `hex(255)` → `'0xff'` | `(255).toString(16)` → `'ff'` |
| Binary / hex → number | `int('1010', 2)`, `int('ff', 16)` | `parseInt('1010', 2)`, `parseInt('ff', 16)` |
| Character → code | `ord('A')` → `65` | `'A'.charCodeAt(0)` → `65` |
| Code → character | `chr(97)` → `'a'` | `String.fromCharCode(97)` → `'a'` |
| Check a type | `type(x)` | `typeof x` |

More depth in [TCM Help Desk section 3](/resources/tcm-help-desk/3/) and the [Code](/resources/code/) sheets.

---

## Python and JavaScript side by side

| Concept | Python | JavaScript |
|---|---|---|
| Where it runs | `python3` in a terminal, or a `.py` file | Browser console (`F12`), or Node.js |
| Output | `print("hi")` | `console.log("hi")` |
| Variable | `name = "Andrew"` | `let name = "Andrew";` · `const` if it won't change |
| User input | `x = input("Port? ")` — **always a string** | `prompt("Port?")` — browser only |
| Convert | `int(x)`, `str(n)` | `Number(x)`, `String(n)` |
| If | `if x > 5:` / `elif` / `else:` | `if (x > 5) {} else if () {} else {}` |
| Equality | `==` | `===` (strict) — `'5' == 5` is `true`, `'5' === 5` is `false` |
| And / or / not | `and` · `or` · `not` | `&&` · `\|\|` · `!` |
| Loop over items | `for p in ports:` | `for (const p of ports) {}` |
| Counting loop | `for i in range(5):` (0–4) | `for (let i = 0; i < 5; i++) {}` |
| While | `while tries < 3:` | `while (tries < 3) {}` |
| Function | `def add(a, b):` / `return a + b` | `function add(a, b) { return a + b; }` |
| Length | `len(ports)` | `ports.length` |
| Dict / object | `user["role"]` | `user.role` |
| String formatting | `f"Hi {name}"` | `` `Hi ${name}` `` |
| Comment | `# note` | `// note` |
| Blocks | Indentation | `{ }` |

```python
# Python — flag risky open ports
ports = [22, 80, 443, 3389]
risky = [23, 445, 3389]
for p in ports:
    if p in risky:
        print(f"Port {p} needs a look")
```

```javascript
// JavaScript — the same logic
const ports = [22, 80, 443, 3389];
const risky = [23, 445, 3389];
for (const p of ports) {
  if (risky.includes(p)) console.log(`Port ${p} needs a look`);
}
```

---

## Databases and SQL

| Term | Meaning |
|---|---|
| Database | An organised collection of data |
| Table | Rows (records) × columns (fields) |
| Primary key | A column that uniquely identifies each row |
| Foreign key | A column that points at another table's primary key |
| Relational vs NoSQL | Tables and SQL (MySQL, PostgreSQL, SQLite) vs documents or key-value stores (MongoDB, Redis) |

| Task | SQL |
|---|---|
| Create a table | `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, role TEXT);` |
| Insert | `INSERT INTO users (name, role) VALUES ('amy', 'user');` |
| Read all | `SELECT * FROM users;` |
| Pick columns | `SELECT name, role FROM users;` |
| Filter | `... WHERE role = 'admin' AND name <> 'root';` |
| Pattern | `... WHERE name LIKE 'adm%';` (`%` any characters, `_` one) |
| Sort | `... ORDER BY name ASC;` (`DESC` reverses) |
| Limit | `... LIMIT 10;` (SQL Server: `SELECT TOP 10 ...`) |
| Count | `SELECT COUNT(*) FROM users WHERE role = 'admin';` |
| Update | `UPDATE users SET role = 'admin' WHERE id = 3;` |
| Delete | `DELETE FROM users WHERE id = 3;` |
| Join two tables | `SELECT u.name, l.time FROM users u JOIN logins l ON l.user_id = u.id;` |

`UPDATE` or `DELETE` without `WHERE` hits **every row**.

### Practise locally with SQLite

```bash
sqlite3 lab.db          # opens (or creates) a database file
```

| Dot-command | Does |
|---|---|
| `.tables` | List tables |
| `.schema users` | Show a table's structure |
| `.headers on` + `.mode column` | Readable output |
| `.quit` | Exit |

---

## 🔐 Security notes

- **SQL injection comes from gluing user input into a query:**

  ```python
  # VULNERABLE — input of  ' OR '1'='1  returns every user
  query = "SELECT * FROM users WHERE name = '" + name + "'"

  # SAFE — parameterised query; the database treats input purely as data
  cur.execute("SELECT * FROM users WHERE name = ?", (name,))
  ```

- **All input is untrusted** — `input()`, form fields, URL parameters, file contents. Validate type and length before using it.
- **JavaScript in the browser runs on the user's machine**, so they can change it. Client-side checks are for convenience; the server must check again.
- **Avoid `eval()`** in both languages: it runs a string as code, which turns any injection into code execution.

---

## Practice drills

<details>
<summary>1. Convert 200 to binary and hex in Python.</summary>

`bin(200)` → `'0b11001000'`, `hex(200)` → `'0xc8'`
</details>

<details>
<summary>2. Why does <code>input("Age? ") + 1</code> crash in Python?</summary>

`input()` returns a string. Use `int(input("Age? ")) + 1`.
</details>

<details>
<summary>3. In JavaScript, why prefer <code>===</code>?</summary>

`==` converts types before comparing (`'0' == 0` is `true`). `===` compares type and value.
</details>

<details>
<summary>4. Count admins in a <code>users</code> table.</summary>

`SELECT COUNT(*) FROM users WHERE role = 'admin';`
</details>

<details>
<summary>5. List usernames starting with <code>svc_</code>. Watch the underscore.</summary>

`SELECT name FROM users WHERE name LIKE 'svc\_%' ESCAPE '\';` — `_` is itself a wildcard.
</details>

<details>
<summary>6. Rewrite a query built with <code>+ name +</code> so it's injection-safe.</summary>

Use a parameter: `cur.execute("SELECT * FROM users WHERE name = ?", (name,))`
</details>

---

## Key takeaways

- The same value can be written in decimal, binary, hex or as a character — `bin`, `hex`, `ord` and `chr` convert between them.
- Python and JavaScript share concepts; mainly the syntax differs (indentation vs braces, `==` vs `===`).
- SQL: `SELECT … FROM … WHERE … ORDER BY … LIMIT`; `UPDATE`/`DELETE` always need a `WHERE`.
- Never build queries or commands from raw input — parameterise.
