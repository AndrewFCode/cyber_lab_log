---
title: "PowerShell: Running Commands"
description: "Many people avoid PowerShell because they think it means \"programming\". But most day-to-day PowerShell is simply typing commands and pressing Enter, just as you would in CMD or Bash. A script is only a text file of…"
tags: ["powershell", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Learn PowerShell in a Month of Lunches (Jeffery Hicks et al.) · Chapter 4__

__Quick reference:__ the short version of this chapter is the Chapter 4 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why running commands interactively is not the same as scripting — and why that matters for learning.
2. Break a command into its parts: command name, parameters, values and switches.
3. Use the Verb-Noun naming convention to predict and find command names.
4. Distinguish cmdlets, functions, aliases and external applications.
5. Use and create aliases, and explain how they behave differently on Linux and macOS.
6. Shorten commands with truncated parameter names, parameter aliases and positional parameters — and know when not to.
7. Run external commands, and read PowerShell error messages to fix mistakes.
8. Explain execution policy, and what it does and doesn't protect against.

## 1. Running commands, not scripting

Many people avoid PowerShell because they think it means "programming". But most day-to-day PowerShell is simply __typing commands and pressing Enter__, just as you would in CMD or Bash. A script is only a text file of commands you've already learned to run interactively.

That's why the book spends so long at the prompt before it reaches scripting: if you can run a command, you can later automate it.

## 2. The anatomy of a command

 Get-ChildItem  -Path C:\\Logs  -Filter \*.log  -Recurse
 \\\_\_\_\_\_\_\_\_\_\_\_/  \\\_\_\_/ \\\_\_\_\_\_/  \\\_\_\_\_\_/ \\\_\_\_/  \\\_\_\_\_\_\_/
   command      name   value    name   value   switch
                \\\_\_\_\_\_\_\_\_\_\_\_/  \\\_\_\_\_\_\_\_\_\_\_\_\_/
                  parameter       parameter

__Part__

__Rules__

Command name

Usually a cmdlet in Verb-Noun form. Not case-sensitive

Parameter name

Always begins with a dash: -Path

Value

Follows the parameter name after a __space__. Use quotes if it contains spaces: -Path "C:\\My Files"

Switch

A parameter with no value. Its presence turns it on: -Recurse

Multiple values

Separate with commas: -Name notepad, calc

__Note:__ a space goes __between__ the parameter name and its value (-Path C:\\Logs), and there's no space inside the name. - Path and -Path:C:\\Logs are common beginner confusions. (The colon form is legal but rarely needed; stick to a space.)

## 3. The cmdlet naming convention

## 3.1 Verb-Noun

__Cmdlets__ (pronounced "command-lets") are PowerShell's native commands. They're named __Verb-Noun__:

- The __verb__ says what to do: Get, Set, New, Remove, Start, Stop.
- The __noun__ says what to do it to, and is singular: Process, Service, Item.
- Module authors often add a __prefix__ to the noun to avoid clashes: Get-ADUser (Active Directory), Get-MgUser (Microsoft Graph).

## 3.2 Approved verbs

Microsoft publishes a list of __approved verbs__, so the same verb means the same thing everywhere:

Get-Verb                 \

# 100 approved verbs in PowerShell 7.4
Get-Verb -Verb Stop      \

# Stop  Lifecycle

__Verb__

__Means__

__Example__

Get

Retrieve information; changes nothing

Get-Process

Set

Change something that exists

Set-Location

New

Create something

New-Item

Remove

Delete something

Remove-Item

Start / Stop

Begin / end an operation or process

Start-Service

## 3.3 Worked example — guessing command names

Because naming is consistent, you can often guess a command before looking it up.

__You want to__

__Guess__

__Check__

See the running services

Get-Service

Get-Command Get-Service (Windows)

Create a folder

New-Item

help New-Item -Examples

Delete a file

Remove-Item

Remove-Item -Path x.txt -WhatIf

See your current location

Get-Location

Run it

List every command for "Item"

—

Get-Command -Noun Item

__Get verbs are safe to explore__ — they only read. The other verbs change things, so read their help first.

## 4. Kinds of command

Get-Command reports a __CommandType__:

__Type__

__What it is__

__Example__

Cmdlet

Compiled .NET command built into PowerShell or a module

Get-ChildItem

Function

A command written in PowerShell itself

help is a function

Alias

A nickname for another command

gci → Get-ChildItem

Application

An external program (an .exe or native binary)

ping, ipconfig, ssh

Get-Command Get-ChildItem, help, gci | Select-Object Name, CommandType

## 5. Aliases

## 5.1 Nicknames for commands

An __alias__ is a short or familiar name for a command. Many exist to make CMD and Bash users feel at home:

__Alias__

__Runs__

__Familiar from__

dir, gci

Get-ChildItem

CMD, PowerShell shorthand

cd

Set-Location

CMD and Bash

cls

Clear-Host

CMD

gps

Get-Process

PowerShell shorthand

ls, cat, ps

Get-ChildItem, Get-Content, Get-Process

Bash — __Windows only__ (see 5.3)

Get-Alias gci                        \

# what does this alias run?
Get-Alias -Definition Get-ChildItem  \

# what aliases exist for this command?

### 5.2 Creating aliases

New-Alias -Name np -Value notepad    \

# np now starts Notepad- Aliases point to a __command only__ — they can't include parameters. For that you need a function (covered later).
- Aliases you create last only for the current session, unless added to your __profile__ script.

## 5.3 Aliases and cross-platform PowerShell

On __Linux and macOS__, PowerShell 7 __doesn't define__ aliases that clash with real native commands: ls, cat, ps, cp, mv, rm, man and others.

__Typed on Linux__

__What runs__

ls

The native Linux ls — text output, Linux options like -la

Get-ChildItem or gci

The PowerShell cmdlet — objects

dir

Still an alias for Get-ChildItem

This trips people up when moving scripts between systems.

__Caution:__ in scripts and anything you share, __use full command names__. Aliases save typing at the prompt but make scripts harder to read — and, as above, they don't behave the same on every platform.

## 6. Taking shortcuts

## 6.1 Truncated parameter names

You only need to type enough of a parameter name to make it __unique__ for that command:

Get-ChildItem -Pa C:\\Logs -Fi \*.log     \

# -Pa = -Path, -Fi = -FilterIf the prefix matches more than one parameter, PowerShell tells you:

Parameter cannot be processed because the parameter name 'F' is ambiguous.
Possible matches include: -Filter -Force.

### 6.2 Parameter aliases

Some parameters have alternative names. Get-Process -Id also answers to -PID. Find them in help (the __Aliases__ field) or with:

(Get-Command Get-Process).Parameters\['Id'\].Aliases     \

# PID

### 6.3 Positional parameters

Positional parameters can be given without their names, in order (chapter 3):

Get-ChildItem C:\\Logs \*.log      \

# Path, then Filter

### 6.4 Worked example — full form to shortcut, and back

__Stage__

__Command__

Full, as you'd write in a script

Get-ChildItem -Path C:\\Logs -Filter \*.log -Recurse

Alias for the command

gci -Path C:\\Logs -Filter \*.log -Recurse

Positional parameters

gci C:\\Logs \*.log -Recurse

Truncated switch

gci C:\\Logs \*.log -r

The last line is quick to type but hard to read. __Rule of thumb:__ use shortcuts at the prompt; write the full form in scripts, documentation, tickets and your blog.

## 7. External commands

PowerShell runs ordinary programs too:

ping 8.8.8.8
ipconfig /all
ssh andrew@server01

__Key differences from cmdlets:__

- __External commands return text__, not objects. You can't sort or filter their output by property the way you can with cmdlet output (a big theme of later chapters).
- __PowerShell parses the line first.__ Characters that are special to PowerShell — such as @, $, ; or \{ \} — can change the arguments an external program receives. When arguments get mangled, the __stop-parsing token__ --% passes the rest of the line as-is (mainly useful on Windows):

icacls C:\\Data --% /grant Users:(OI)(CI)

R

## 8. Dealing with errors

PowerShell's error messages are usually specific and helpful — the red text is information, not a failure. Read the __first line__ carefully.

## 8.1 Worked example — decoding common errors

__Error message (first line)__

__Cause__

__Fix__

The term 'Get-Proces' is not recognized as a name of a cmdlet, function, script file, or executable program.

Typo in the command name, or the command doesn't exist here

Use Tab completion; check with Get-Command

A parameter cannot be found that matches parameter name 'Nme'.

Misspelled or non-existent parameter

Check the syntax with Get-Command <cmd> -Syntax

Parameter cannot be processed because the parameter name 'F' is ambiguous.

Truncated name matches more than one parameter

Type more of the name

Cannot find path '/nope' because it does not exist.

Wrong path

Check spelling, case (on Linux) and current location

Cannot process command because of one or more missing mandatory parameters: Id.

A required value was left out

Supply it — interactively, PowerShell prompts you for it

## 8.2 Missing mandatory parameters

If you run a command without a mandatory parameter in an interactive session, PowerShell __prompts__ for the value rather than failing:

PS> Stop-Process
cmdlet Stop-Process at command pipeline position 1
Supply values for the following parameters:
Id\[0\]:Id\[0\] means it's asking for the first value of an array. Press Enter on an empty line to finish, or Ctrl\+C to cancel.

## 9. Execution policy

## 9.1 What it is

__Execution policy__ controls whether PowerShell will run __script files__ (.ps1). It doesn't affect typing commands at the prompt.

__Policy__

__Allows__

Restricted

No scripts at all — the default on Windows client editions

AllSigned

Only scripts signed by a trusted publisher

RemoteSigned

Local scripts run; scripts downloaded from the internet must be signed. The default on Windows Server

Unrestricted

All scripts run; downloaded scripts trigger a warning

Bypass

Nothing is blocked and nothing warns

Get-ExecutionPolicy
Get-ExecutionPolicy -List                          \

# the policy at each scope
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

__On Linux and macOS,__ execution policy isn't enforced: Get-ExecutionPolicy returns Unrestricted, and it can't be changed.

## 9.2 What it isn't

Microsoft is explicit that execution policy is __not a security boundary__. It's a safety feature to stop users running scripts by accident. Anyone can bypass it — by starting PowerShell with -ExecutionPolicy Bypass, or by pasting a script's contents into the console. Real protection comes from application control (such as AppLocker or WDAC), logging and least privilege.

## 10. Security perspective

- __Attackers use the same shortcuts__ — plus aliases, truncated parameters and encoding — to obfuscate commands. Knowing how iex, iwr or -enc expand is part of reading suspicious PowerShell in logs:
	- iex → Invoke-Expression
	- iwr → Invoke-WebRequest
	- -enc → -EncodedCommand
- __-ExecutionPolicy Bypass in a process command line is a classic red flag__ in endpoint logs, because legitimate admin work rarely needs it.
- __External commands are part of the attack surface.__ Built-in Windows programs (certutil, bitsadmin, mshta and others) are often run from PowerShell by attackers. Knowing that PowerShell happily runs them is part of understanding "living off the land".
- __Test before changing.__ Combine the habits from chapter 3: a Get- command first to see what's there; -WhatIf before the change; full command names in anything saved.

# Summary

- __Most PowerShell is running commands.__ Scripts are just saved commands.
- __Anatomy:__ command, -Parameter value, switches (no value), commas for multiple values, quotes for spaces.
- __Cmdlets use Verb-Noun__ with approved verbs (Get-Verb) and singular nouns, sometimes with a module prefix. Get commands only read.
- __Command types:__ cmdlet, function, alias, application — Get-Command shows which.
- __Aliases__ (Get-Alias, New-Alias) are nicknames without parameters, lasting for the session only. On Linux and macOS, ls, cat, ps and similar run native programs. Use full names in scripts.
- __Shortcuts:__ truncated parameter names (must be unique), parameter aliases, positional parameters. Fine at the prompt; avoid in scripts.
- __External programs__ return text; --% stops PowerShell parsing the rest of the line.
- __Errors:__ read the first line — they name the problem. Missing mandatory values trigger a prompt.
- __Execution policy__ governs script files — Restricted on Windows clients, RemoteSigned on servers, Unrestricted off Windows — and is __not__ a security boundary.

# Glossary

__Term__

__Definition__

Cmdlet

A compiled PowerShell command named Verb-Noun

Parameter

A named input to a command, written with a leading dash

Value

The data given to a parameter

Switch parameter

A parameter with no value, turned on by its presence

Verb-Noun

The naming convention for PowerShell commands

Approved verbs

Microsoft's standard list of verbs, shown by Get-Verb

Noun prefix

A module-specific prefix on a noun, e.g. AD in Get-ADUser

CommandType

Cmdlet, Function, Alias or Application

Alias

A nickname for a command

Parameter alias

An alternative name for a parameter, e.g. -PID for -Id

Truncated parameter

A shortened parameter name that is still unique

Positional parameter

A parameter whose name can be omitted

External command / application

A program outside PowerShell, such as ping

Stop-parsing token (--%)

Tells PowerShell to pass the rest of the line unchanged

Mandatory parameter prompt

PowerShell asking for a required value that was omitted

Execution policy

A setting controlling whether script files may run

RemoteSigned

Policy requiring downloaded scripts to be signed

Profile

A script that runs when PowerShell starts, used to keep aliases and settings

# Review questions

1. Label the parts of: Get-ChildItem -Path "C:\\My Files" -Recurse.
2. Why do values containing spaces need quotes?
3. What does the verb in a cmdlet name tell you? Which verb is always safe to explore with?
4. Why do some nouns have prefixes, such as Get-ADUser?
5. Name the four CommandTypes you'll commonly see.
6. Can an alias include parameters? What would you use instead?
7. What happens when you type ls -la in PowerShell 7 on Linux? And on Windows?
8. Get-ChildItem -F \*.log fails. Why, and how do you fix it?
9. Rewrite gci C:\\Temp \*.txt -r in full form.
10. What's the main difference between the output of ipconfig and of Get-NetIPConfiguration?
11. Read this error: A parameter cannot be found that matches parameter name 'Nmae'. What's wrong?
12. What's the default execution policy on Windows 11, on Windows Server, and on Linux?
13. Is execution policy a security boundary? Explain.
14. Why is -ExecutionPolicy Bypass in a process command line worth investigating?

# Answer key

1. __Get-ChildItem is the command; -Path a parameter with the value "C:\\My Files"; -Recurse a switch.__
2. __Otherwise PowerShell treats the space as a separator__, so C:\\My and Files become separate arguments.
3. __The action the command takes.__ Get only retrieves information, so it's safe to explore with.
4. __To avoid name clashes between modules__ — the prefix identifies the product (AD = Active Directory).
5. __Cmdlet, Function, Alias, Application.__
6. __No.__ Use a function (covered later) to wrap a command with parameters.
7. __On Linux, ls is the native Linux program, so -la works as in Bash.__ On Windows, ls is an alias for Get-ChildItem, which errors because it has no -la parameter.
8. __-F is ambiguous__ (it matches -Filter and -Force). Type more of the name, e.g. -Fi or -Filter.
9. __Get-ChildItem -Path C:\\Temp -Filter \*.txt -Recurse.__
10. __ipconfig returns plain text; Get-NetIPConfiguration returns objects__ with properties you can filter and sort.
11. __The parameter name is misspelled__ — it should be -Name.
12. __Restricted on Windows 11 (client); RemoteSigned on Windows Server; Unrestricted on Linux__, where it can't be changed.
13. __No.__ It prevents accidental script execution but is easily bypassed. Real protection needs application control, logging and least privilege.
14. __Legitimate use is rare__, and attackers commonly add it to run scripts without restriction — so it's a common indicator of suspicious activity.
