---
title: "TryHackMe: Software Basics"
description: "Note: these notes are written from the module's topic outline (data representation, Python, JavaScript, databases and SQL). Cross-check room specifics as you go."
tags: ["tryhackme", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TryHackMe Pre Security (2026 path) · Module 4__

__Quick reference:__ the short version of this module is the Module 4 cheat sheet.

__Note:__ these notes are written from the module's topic outline (data representation, Python, JavaScript, databases and SQL). Cross-check room specifics as you go.

## Learning objectives

By the end of these notes you should be able to:

1. Explain how numbers and text are represented as bits, and convert between them in code.
2. Use variables, data types, conditions, loops, functions and collections in Python.
3. Write the same logic in JavaScript, and explain its key differences from Python.
4. Explain relational databases: tables, rows, columns and keys.
5. Write SQL to create, read, update and delete data, including a simple join.
6. Explain how SQL injection works and how parameterised queries prevent it.

## 1. Data representation

Everything in a computer is stored as __bits__. What those bits *mean* depends on how the program interprets them.

## 1.1 One value, many forms

__Form__

__65 written as__

Decimal

65

Binary

0100 0001

Hexadecimal

0x41

ASCII character

A

The byte 0x41 is "A" to a text editor, 65 to a calculator, and part of a colour or instruction to other programs. __Context gives bits meaning.__

## 1.2 Data types

__Type__

__Holds__

__Python__

__JavaScript__

Integer

Whole numbers

int — 42

number — 42

Floating point

Decimals (approximate)

float — 3.14

number — 3.14

String

Text

str — "hello"

string — "hello"

Boolean

True or false

bool — True / False

boolean — true / false

List / array

Ordered collection

list — \[22, 80\]

Array — \[22, 80\]

Dictionary / object

Key → value pairs

dict — \{"port": 22\}

Object — \{port: 22\}

Nothing

Absence of a value

None

null / undefined

__Floating point is approximate.__ 0.1 \+ 0.2 gives 0.30000000000000004 in both languages, because 0.1 can't be stored exactly in binary. Money is handled in whole pence/cents or with a decimal type.

## 1.3 Converting in code

__Task__

__Python__

__JavaScript__

Decimal → binary

bin(10) → '0b1010'

(10).toString(2) → '1010'

Decimal → hex

hex(255) → '0xff'

(255).toString(16) → 'ff'

Binary / hex → decimal

int('1010', 2), int('ff', 16)

parseInt('1010', 2), parseInt('ff', 16)

Character → code

ord('A') → 65

'A'.charCodeAt(0) → 65

Code → character

chr(97) → 'a'

String.fromCharCode(97) → 'a'

Check type

type(x)

typeof x

## 2. Programming fundamentals in Python

Python is readable and widely used in security for automation, tooling and data analysis. Run it interactively with python3, or save code in a .py file and run python3 script.py.

## 2.1 Variables and input

name = "Andrew"                \

# a string
attempts = 3                   \

# an integer
is\_admin = False               \

# a boolean

port = input("Port to check: ")   \

# input() ALWAYS returns a string
port = int(port)                  \

# convert before doing maths
print(f"Checking port \{port\}")    \

# f-string: variables inside \{\}

### 2.2 Conditions

if port == 22:
    print("SSH")
elif port == 3389:
    print("RDP — should not be exposed to the internet")
else:
    print("Other service")

__Indentation is part of the syntax.__ The indented block belongs to the if. Comparison uses ==; a single = assigns.

__Operator__

__Meaning__

==, \!=

Equal, not equal

<, >, <=, >=

Comparisons

and, or, not

Combine conditions

in

Membership: 22 in \[22, 80\] → True

## 2.3 Loops

for port in \[22, 80, 443\]:        \

# loop over a list
    print(port)

for i in range(5):                \

# 0, 1, 2, 3, 4
    print(i)

tries = 0
while tries < 3:                  \

# repeat while the condition is true
    tries \+= 1

### 2.4 Functions

def is\_risky(port):
    risky = \[21, 23, 445, 3389\]
    return port in risky

print(is\_risky(23))    \

# True

### 2.5 Worked example — a failed-login counter

__Goal:__ given login records, flag any user with 3 or more failures.

logins = \[
    \{"user": "amy",  "result": "fail"\},
    \{"user": "amy",  "result": "fail"\},
    \{"user": "ben",  "result": "ok"\},
    \{"user": "amy",  "result": "fail"\},
    \{"user": "carl", "result": "fail"\},
\]

failures = \{\}                                   \

# dict: user -> count
for entry in logins:
    if entry\["result"\] == "fail":
        failures\[entry\["user"\]\] = failures.get(entry\["user"\], 0) \+ 1

for user, count in failures.items():
    if count >= 3:
        print(f"ALERT: \{user\} has \{count\} failed logins")
\

# ALERT: amy has 3 failed logins

__How it works:__

1. The loop walks each record.
2. failures.get(user, 0) returns the current count, or 0 if the user isn't in the dictionary yet.
3. The second loop checks each user's total against the threshold.

This is the same logic a SIEM brute-force rule uses.

## 3. JavaScript

JavaScript runs in every web browser, and on servers with Node.js. You can try it now: press F12 in a browser, open the __Console__ tab, and type code.

## 3.1 The same ideas, different syntax

let tries = 0;                         // let = can change
const risky = \[21, 23, 445, 3389\];     // const = won't be reassigned

function isRisky(port) \{
  return risky.includes(port);
\}

for (const port of \[22, 23, 443\]) \{
  if (isRisky(port)) \{
    console.log(\`Port $\{port\} is risky\`);   // template literal
  \} else \{
    console.log(\`Port $\{port\} looks fine\`);
  \}
\}

### 3.2 Key differences from Python

__Aspect__

__Python__

__JavaScript__

Blocks

Indentation

\{ \} braces

Statement end

Newline

; (optional, but conventional)

Variables

x = 5

let x = 5; / const x = 5;

Equality

==

=== strict (preferred); == converts types first

Logic

and, or, not

&&, ||, \!

Output

print()

console.log()

Where it runs

Terminal, scripts, servers

Browsers, Node.js

## 3.3 Worked example — why === matters

'5' == 5      // true  — JavaScript converts the string to a number first
'5' === 5     // false — different types
0 == ''       // true  — surprising
0 === ''      // falseLoose equality (==) causes subtle bugs, including security bugs such as authentication checks that compare the wrong types. __Use ===.__

## 4. Databases

## 4.1 Relational databases

A __relational database__ stores data in __tables__ of __rows__ (records) and __columns__ (fields). Tables relate to each other through __keys__.

 users                                 logins
 \+----\+-------\+-------\+                \+----\+---------\+---------------------\+--------\+
 | id | name  | role  |                | id | user\_id | time                | result |
 \+----\+-------\+-------\+                \+----\+---------\+---------------------\+--------\+
 |  1 | amy   | admin |<---------------|  1 |    1    | 2026-09-18 09:00:00 | fail   |
 |  2 | ben   | user  |<---\+           |  2 |    1    | 2026-09-18 09:01:00 | ok     |
 |  3 | carl  | user  |    \+-----------|  3 |    2    | 2026-09-18 09:05:00 | ok     |
 \+----\+-------\+-------\+                \+----\+---------\+---------------------\+--------\+
  primary key: id                        foreign key: user\_id -> users.id

__Term__

__Meaning__

Table

A set of related records, like a spreadsheet sheet

Row / record

One entry, e.g. one user

Column / field

One attribute, e.g. name

Primary key

Uniquely identifies each row (users.id)

Foreign key

A column that references another table's primary key (logins.user\_id)

Schema

The structure: tables, columns, types, keys

__Relational (SQL)__

__NoSQL__

Fixed tables and relationships

Documents, key–value pairs, graphs

MySQL, PostgreSQL, SQL Server, SQLite

MongoDB, Redis

Strong consistency; joins

Flexible schemas; horizontal scale

## 5. SQL

__SQL (Structured Query Language)__ is how you talk to relational databases. The core operations are known as __CRUD__: create, read, update, delete.

## 5.1 Creating and inserting

CREATE TABLE users (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT
);

INSERT INTO users (name, role) VALUES ('amy', 'admin');
INSERT INTO users (name, role) VALUES ('ben', 'user');
INSERT INTO users (name, role) VALUES ('carl', 'user');

### 5.2 Reading with SELECT

SELECT \* FROM users;                              -- every column, every row
SELECT name FROM users WHERE role = 'user';       -- filter
SELECT name FROM users WHERE name LIKE 'a%';      -- starts with a (% = any characters)
SELECT name FROM users ORDER BY name DESC;        -- sort
SELECT COUNT(\*) FROM users WHERE role = 'admin';  -- count
SELECT \* FROM users LIMIT 2;                      -- first 2 rows

__Worked example — query results.__ With the three users above:

__Query__

__Result__

SELECT name FROM users WHERE role = 'user';

ben, carl

SELECT COUNT(\*) FROM users;

3

SELECT name FROM users WHERE role = 'admin' OR name = 'carl';

amy, carl

## 5.3 Updating and deleting

UPDATE users SET role = 'admin' WHERE name = 'ben';
DELETE FROM users WHERE name = 'carl';

__Caution:__ UPDATE or DELETE __without a WHERE__ changes or removes __every row__. Write the WHERE first, and test it as a SELECT before running the change.

### 5.4 Joining tables

SELECT u.name, l.time, l.result
FROM logins l
JOIN users u ON l.user\_id = u.id
WHERE l.result = 'fail';This matches each login to its user through the foreign key, then filters to failures. In the example data it returns amy | 2026-09-18 09:00:00 | fail.

## 5.5 Practising locally with SQLite

SQLite is a whole database in a single file — no server needed.

sqlite3 lab.db

__Command inside sqlite3__

__Does__

.tables

List tables

.schema users

Show a table's structure

.headers on then .mode column

Readable output

.quit

Exit

## 6. SQL injection

## 6.1 How it happens

__SQL injection__ happens when user input is pasted directly into an SQL statement, so the input can change the query itself.

__Vulnerable login code:__

username = input("User: ")
password = input("Password: ")
query = "SELECT \* FROM users WHERE name = '" \+ username \+ "' AND password = '" \+ password \+ "'"

__Normal use:__ the user types amy and secret, giving:

SELECT \* FROM users WHERE name = 'amy' AND password = 'secret'

### 6.2 Worked example — how the attack works

The attacker types the username admin' -- and anything as the password. The query becomes:

SELECT \* FROM users WHERE name = 'admin' --' AND password = 'anything'1. The attacker's ' __closes the string__ early.
2. -- starts an __SQL comment__, so the password check is ignored.
3. The query now just means "find the admin user", so the attacker logs in as admin without a password.

Other payloads can dump whole tables, or change or delete data. SQL injection has been behind many major breaches.

## 6.3 The fix: parameterised queries

__Never build queries by gluing strings together.__ Use __parameters__, so the database treats input purely as data:

import sqlite3
conn = sqlite3.connect("lab.db")
cur = conn.cursor()
cur.execute("SELECT \* FROM users WHERE name = ? AND password = ?", (username, password))

The ? placeholders are filled safely. An input of admin' -- is searched for literally as a username (which doesn't exist) — it can't change the query's structure.

## 6.4 Defence in depth

- __Parameterised queries / prepared statements__ — the primary defence.
- __Input validation__ — check type, length and format (a user ID should be digits).
- __Least privilege__ for the database account — the web app shouldn't be able to drop tables.
- __Never store plain-text passwords.__ Store salted hashes (bcrypt, Argon2), so even a stolen table doesn't reveal passwords.
- __Web application firewalls__ — a backstop, not a fix.

## 7. Security perspective

- __All input is untrusted:__
	- input() values, form fields, URL parameters, HTTP headers
	- uploaded files, and data from other systems
- __Injection is a family of bugs__ with one cause: data mixed into code. SQL injection, command injection (input glued into shell commands) and cross-site scripting (input glued into web pages as script) all work this way.
- __Client-side JavaScript can be changed by the user.__ Browser validation is for convenience; the server must re-check everything.
- __Avoid eval()__ in both Python and JavaScript. It executes a string as code, so any injection becomes code execution.
- __Security people write code.__ Python and SQL are everyday tools for log analysis, automation, and querying SIEMs and databases.

# Summary

- __Bits get meaning from context:__ the same byte can be a number, a character or part of an instruction. Floats are approximate.
- __Python:__ variables, input() (always a string), if/elif/else, for and while, functions with def, lists and dictionaries — with indentation as syntax.
- __JavaScript:__ the same concepts with braces, let/const, and === for strict equality. It runs in browsers and Node.js.
- __Relational databases:__ tables of rows and columns, linked by primary and foreign keys.
- __SQL:__ CREATE, INSERT, SELECT … WHERE … ORDER BY … LIMIT, UPDATE, DELETE (always with WHERE) and JOIN.
- __SQL injection:__ input changes the query's structure. Parameterised queries stop it.

# Glossary

__Term__

__Definition__

Data type

The kind of value: integer, float, string, boolean, etc.

Variable

A named storage location for a value

String

A sequence of characters

Boolean

A true/false value

Floating point

An approximate representation of decimal numbers

Condition

A test that decides which code runs (if)

Loop

Code that repeats (for, while)

Function

A named, reusable block of code

List / array

An ordered collection of values

Dictionary / object

A collection of key → value pairs

Type coercion

Automatic conversion between types (JavaScript ==)

Relational database

A database of related tables

Primary key

A column that uniquely identifies each row

Foreign key

A column referencing another table's primary key

SQL

The language for querying relational databases

CRUD

Create, read, update, delete

JOIN

Combining rows from two tables on a related column

SQL injection

An attack where input alters an SQL query's structure

Parameterised query

A query with placeholders filled safely by the database driver

Hashing (passwords)

One-way transformation used to store passwords safely

# Review questions

1. What does hex(200) return in Python?
2. Why does int(input("Age: ")) \+ 1 work but input("Age: ") \+ 1 fail?
3. Write a Python loop that prints each item in ports = \[22, 80, 443\].
4. In JavaScript, what does '1' == 1 return, and what does '1' === 1 return?
5. What's the difference between a primary key and a foreign key?
6. Write SQL to list the names of all users whose role is admin, sorted alphabetically.
7. What happens if you run DELETE FROM users;?
8. Why does 0.1 \+ 0.2 not equal exactly 0.3?
9. Explain what the input admin' -- does to a vulnerable login query.
10. What is the primary defence against SQL injection?
11. Why must a server re-validate data already checked by browser JavaScript?
12. Name two other attacks in the same "injection" family as SQL injection.

# Answer key

1. __'0xc8'.__
2. __input() returns a string__; int() converts it to a number so arithmetic works. Adding 1 to a string raises a TypeError.
3. __for port in ports: print(port)__ — with print(port) on an indented line.
4. __true, then false.__ == converts types; === compares type and value.
5. __A primary key uniquely identifies rows in its own table; a foreign key references another table's primary key__, linking the tables.
6. __SELECT name FROM users WHERE role = 'admin' ORDER BY name;__
7. __Every row in users is deleted__, because there's no WHERE clause.
8. __0.1 and 0.2 can't be represented exactly in binary floating point__, so small rounding errors appear.
9. __The ' closes the username string and -- comments out the rest__, including the password check, so the query just finds the admin user.
10. __Parameterised queries (prepared statements).__
11. __The user controls the browser__: client-side code can be bypassed or edited, so only server-side checks can be trusted.
12. __Any two of:__ command injection, cross-site scripting (XSS), LDAP injection, code injection via eval.
