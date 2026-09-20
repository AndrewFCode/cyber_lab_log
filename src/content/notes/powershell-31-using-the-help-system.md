---
title: "PowerShell: Using the Help System"
description: "PowerShell has thousands of commands, and every module you install adds more. No one memorises them. Skilled PowerShell users are skilled at finding and reading help. The book is emphatic on this point: if you learn…"
tags: ["powershell", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Learn PowerShell in a Month of Lunches (Jeffery Hicks et al.) · Chapter 3__

__Quick reference:__ the short version of this chapter is the Chapter 3 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why the help system is the most important skill in PowerShell.
2. Download and refresh local help with Update-Help, and prepare offline help with Save-Help.
3. Find commands you don't know the name of, using Get-Help and Get-Command with wildcards.
4. Read a command's syntax: parameter sets, mandatory and optional parameters, positional parameters, switches and value types.
5. Use Get-Help options to see examples, full detail, one parameter, or the online version.
6. Find and read about\_ topics for PowerShell concepts.
7. Use help to spot commands that change things, and test them safely.

## 1. Why help comes first

PowerShell has thousands of commands, and every module you install adds more. No one memorises them. Skilled PowerShell users are skilled at __finding__ and __reading__ help. The book is emphatic on this point: if you learn to use help well, you can teach yourself any command — including ones that don't exist yet.

The help system answers three questions:

1. __Which command do I need?__ (discovery)
2. __How do I use it?__ (syntax and parameters)
3. __Can I see an example?__ (examples)

## 2. Updatable help

## 2.1 Why help needs updating

PowerShell ships with only minimal help. Full help — descriptions, parameter details, examples and the about\_ topics — is __downloaded__ separately, so Microsoft can fix and improve it without shipping a new PowerShell. On a fresh install, Get-Help shows little more than the syntax, and may prompt you to update.

## 2.2 Commands

__Command__

__Does__

Update-Help

Downloads the latest help for installed modules

Update-Help -Scope CurrentUser

Installs help for your account only — no admin rights needed. This is the default in PowerShell 7

Update-Help -Scope AllUsers

Installs for everyone — needs an elevated session

Update-Help -UICulture en-US

Asks for English help. Useful if help for your system language isn't published

Save-Help -DestinationPath <folder>

Downloads help files to a folder

Update-Help -SourcePath <folder>

Installs help from that folder — for machines without internet access

## 2.3 Worked example — updating help

1. Run Update-Help.
2. A progress bar runs while it downloads help for each module.
3. Some modules may report errors — typically because their authors haven't published updatable help, or not in your language. __This is normal.__ The core modules still update.
4. Check the result: Get-Help about\_\* should now list dozens of topics. Before updating, it may list none.
5. Repeat every few weeks, or when you install new modules.

__In the real world:__ servers often have no internet access. Run Save-Help on a connected machine, copy the folder across, then Update-Help -SourcePath on the server.

## 3. Finding the command you need

## 3.1 Search with wildcards

Both Get-Help and Get-Command accept wildcards (\* = any characters):

Get-Help \*event\*                  \

# help topics and commands with "event" in the name
Get-Command \*item\*                \

# every command with "item" in its name
Get-Command -Noun Process         \

# commands whose noun is Process
Get-Command -Verb Get -Noun \*Net\* \

# Get- commands about networking
Get-Command -Module Microsoft.PowerShell.Management

__help__ is a built-in function that runs Get-Help and pages the output one screen at a time. Use help interactively; use Get-Help in scripts.

## 3.2 Worked example — "I need to stop a process"

1. __Think of the noun:__ the thing to manage is a *process*.
2. __List the commands for it:__

PS> Get-Command -Noun Process

CommandType Name
----------- ----
     Cmdlet Debug-Process
     Cmdlet Get-Process
     Cmdlet Start-Process
     Cmdlet Stop-Process
     Cmdlet Switch-Process
     Cmdlet Wait-Process1. __Pick the verb:__ Stop-Process is the obvious candidate.
2. __Read its help:__ help Stop-Process -Examples.

This verb–noun reasoning works because PowerShell commands follow a consistent __Verb-Noun__ naming convention (chapter 4). Guess the noun, then look at the verbs.

## 3.3 Worked example — the search that fails

You search Get-Command \*eventlog\* on PowerShell 7 and get nothing.

1. __Broaden the search:__ Get-Command \*event\*.
2. __On Windows,__ this finds Get-WinEvent — the modern cmdlet for reading event logs. The older Get-EventLog exists only in Windows PowerShell 5.1.
3. __On Linux,__ Windows event log cmdlets don't exist at all. You'd use the native journalctl instead.

__Lesson:__ when a search finds nothing, try a shorter or different keyword before concluding the command doesn't exist. Remember that some commands are Windows-only or 5.1-only.

## 4. Reading syntax

## 4.1 Parameter sets

Many commands can be used in more than one way. Each way is a __parameter set__, shown as a separate syntax block. You can use parameters from __one set at a time__.

PS> Get-Command Stop-Process -Syntax

Stop-Process \[-Id\] <int\[\]> \[-PassThru\] \[-Force\] \[-WhatIf\] \[-Confirm\] \[<CommonParameters>\]

Stop-Process -Name <string\[\]> \[-PassThru\] \[-Force\] \[-WhatIf\] \[-Confirm\] \[<CommonParameters>\]

Stop-Process \[-InputObject\] <Process\[\]> \[-PassThru\] \[-Force\] \[-WhatIf\] \[-Confirm\] \[<CommonParameters>\]There are three ways to identify which process to stop: by __Id__, by __Name__, or by passing process __objects__. Because -Id and -Name appear in different sets, you can't use both in one command.

## 4.2 Decoding the brackets

__Syntax pattern__

__Meaning__

__Example__

-Name <string\[\]> (no brackets)

__Mandatory__ parameter. You must type the name -Name

Stop-Process -Name notepad

\[-Id\] <int\[\]>

__Mandatory, positional.__ The value is required; typing -Id is optional

Stop-Process 1234

\[\[-Path\] <string\[\]>\]

__Optional, positional.__ The whole parameter can be left out; if used, its name is optional

Get-ChildItem C:\\Temp

\[-Force\]

__Switch.__ No value — including it turns the behaviour on

Stop-Process -Name notepad -Force

\[-Filter <string>\]

__Optional, named.__ You must type the name if you use it

-Filter \*.log

\[<CommonParameters>\]

Parameters every cmdlet shares, such as -Verbose and -ErrorAction

See about\_CommonParameters

__Value types__ appear in angle brackets:

__Type__

__Accepts__

<string>

Text

<int>

A whole number

<string\[\]> or <int\[\]>

__One or more__ values — the \[\] means an array. Separate values with commas: -Name notepad, calc

<Process\[\]>

One or more process objects

<switch> (or no type shown)

On or off

## 4.3 Worked example — reading Get-ChildItem

Get-ChildItem \[\[-Path\] <string\[\]>\] \[\[-Filter\] <string>\] \[-Include <string\[\]>\]
    \[-Exclude <string\[\]>\] \[-Recurse\] \[-Depth <uint>\] \[-Force\] \[-Name\] ...1. __\[\[-Path\] <string\[\]>\]__ — optional and positional. Path is the first positional parameter, and it accepts several paths.
2. __\[\[-Filter\] <string>\]__ — also optional and positional. Filter is the second positional parameter, with a single value.
3. __\[-Recurse\], \[-Force\]__ — switches.
4. __So these two commands are identical:__

Get-ChildItem -Path C:\\Logs -Filter \*.log
Get-ChildItem C:\\Logs \*.log- PowerShell assigns the unnamed values to positions 1 and 2 — Path, then Filter.

1. __Tip:__ positional shortcuts are fine at the prompt. In scripts and documentation, write the parameter names so readers don't have to know the positions.

## 5. Get-Help options

__Command__

__Shows__

Get-Help Stop-Process

Summary: synopsis, syntax, short description

Get-Help Stop-Process -Examples

Only the examples — often the fastest route to an answer

Get-Help Stop-Process -Detailed

Parameter descriptions plus examples

Get-Help Stop-Process -Full

Everything, including technical details for each parameter

Get-Help Stop-Process -Parameter Name

Details for one parameter

Get-Help Stop-Process -Online

Opens the latest version on Microsoft's website in your browser

Get-Help Stop-Process -ShowWindow

Help in a separate, searchable window (Windows only)

## 5.1 Reading a parameter's details

PS> Get-Help Get-Process -Parameter Name

-Name <string\[\]>
    Required?                    false
    Position?                    0
    Accept pipeline input?       true (ByPropertyName)
    Parameter set name           Name, NameWithUserName
    Aliases                      ProcessName
    Dynamic?                     false
    Accept wildcard characters?  false

__Field__

__Tells you__

Required?

Whether it's mandatory — in this parameter set

Position?

Its positional order (numbering starts at 0 in current help), or "named" if it can't be used positionally

Accept pipeline input?

Whether it can take values from the pipeline, and how — important in later chapters

Aliases

Alternative, shorter names for the parameter

Accept wildcard characters?

Whether \* and ? work in its value — check against the full help and examples

__Help can be incomplete when it isn't updated.__ Some of these fields are generated automatically and may be less accurate until you run Update-Help. If a detail matters, check the -Online version.

## 6. about\_ topics

Commands aren't the only thing with help. PowerShell __concepts__ are documented in __about topics__:

Get-Help about\_\*                  \

# list them all (after Update-Help)
Get-Help about\_CommonParameters   \

# -Verbose, -ErrorAction, -WhatIf, etc.
Get-Help about\_Wildcards
Get-Help about\_Execution\_Policies
Get-Help about\_AliasesWhen a chapter introduces a concept, reading the matching about\_ topic is a good way to deepen it. The book regularly points you to them.

## 7. Worked example — solving a problem with help only

__Task:__ list only the __files__ (not folders) in a directory, including hidden ones, without searching online.

1. __Find the command:__ Get-Command -Noun ChildItem → Get-ChildItem.
2. __Read the syntax:__ Get-Command Get-ChildItem -Syntax shows switches named -File and -Force.
3. __Check what -Force does:__ Get-Help Get-ChildItem -Parameter Force says it gets items that otherwise can't be accessed, such as hidden or system files.
4. __Build the command:__

Get-ChildItem -Path C:\\Temp -File -Force1. __Test__ it, and compare with and without -Force.

Every step used help. This is the pattern for learning any new command.

## 8. Security perspective

- __Help shows you which commands change things.__ If a command's syntax includes __-WhatIf__ and __-Confirm__, it's designed to change the system. That's a signal to slow down:
	- __-WhatIf__ shows what *would* happen without doing it.
	- __-Confirm__ asks before each change.

Stop-Process -Name notepad -WhatIf
\

# What if: Performing the operation "Stop-Process" on target "notepad (4312)".- __Read before you run.__ Commands found in forums, tickets or chat messages can do more than they claim. Checking the help for each command and parameter before running it takes seconds.
- __Offline help is operationally useful.__ Incident response and locked-down environments often have no internet. Save-Help means your documentation goes where you go.
- __Help is also how you learn security tools.__ Modules for Active Directory, Defender and cloud security all follow the same help conventions — so the reading skill transfers directly.

# Summary

- __Help is the core skill:__ discovery → syntax → examples.
- __Updatable help:__
	- Update-Help downloads full help (CurrentUser scope by default in PowerShell 7). Some module errors are normal.
	- Save-Help plus Update-Help -SourcePath covers offline machines.
- __Find commands__ with wildcards: Get-Help \*keyword\*, Get-Command -Noun X, -Verb, -Module. help pages the output.
- __Syntax:__
	- Each parameter set is a separate way to use the command; parameters from different sets don't mix.
	- \[-Name\] <x> = mandatory positional; \[\[-Name\] <x>\] = optional positional; \[-Switch\] = switch; <type\[\]> = one or more values, comma-separated.
- __Get-Help options:__ -Examples, -Detailed, -Full, -Parameter, -Online, and -ShowWindow on Windows.
- __Concepts__ live in about\_ topics.
- __-WhatIf and -Confirm__ in a syntax block mark commands that change things — test with -WhatIf first.

# Glossary

__Term__

__Definition__

Updatable help

Help content downloaded separately from PowerShell and refreshed with Update-Help

Update-Help

Downloads and installs the latest help

Save-Help

Saves help files to a folder for offline installation

Get-Help / help

Displays help / the same, one page at a time

Get-Command

Lists commands, filterable by name, verb, noun or module

Wildcard

\* or ? used to match names

Syntax

The formal description of how to use a command

Parameter set

One valid combination of a command's parameters

Mandatory parameter

A parameter that must be supplied

Positional parameter

A parameter whose value can be given without its name, by position

Named parameter

A parameter that must be written with its name

Switch parameter

A parameter with no value, turned on by being present

Array (\[\])

One or more values, separated by commas

Common parameters

Parameters every cmdlet supports, such as -Verbose and -ErrorAction

about\_ topic

Help documenting a PowerShell concept rather than a command

-WhatIf

Shows what a command would do without doing it

-Confirm

Prompts for confirmation before making a change

# Review questions

1. Why is Update-Help needed on a new installation?
2. Which Update-Help scope doesn't need administrator rights?
3. How would you install help on a server with no internet access?
4. Write a command that lists every command with "Service" as its noun.
5. Get-Command \*eventlog\* finds nothing in PowerShell 7 on Windows. What might you try next?
6. What is a parameter set, and why can't you use -Id and -Name together with Stop-Process?
7. What does \[-Id\] <int\[\]> tell you about the -Id parameter?
8. What does \[\[-Path\] <string\[\]>\] tell you?
9. How do you pass two process names to -Name?
10. Which Get-Help option shows only examples?
11. Where would you learn about -ErrorAction and -Verbose?
12. A command's syntax includes -WhatIf and -Confirm. What does that tell you, and how would you use -WhatIf?

# Answer key

1. __PowerShell ships with minimal help.__ Full help, including examples and about\_ topics, is downloaded separately.
2. __-Scope CurrentUser__ — the default in PowerShell 7.
3. __Run Save-Help on a connected machine, copy the folder over, then run Update-Help -SourcePath <folder>__ on the server.
4. __Get-Command -Noun Service.__
5. __A broader keyword such as Get-Command \*event\*__, which finds Get-WinEvent on Windows. (Get-EventLog exists only in Windows PowerShell 5.1.)
6. __A parameter set is one valid way of using the command.__ -Id and -Name belong to different sets, so they can't be combined.
7. __It's mandatory (in that set) and positional__: you must supply the value, but typing -Id is optional. It accepts one or more integers.
8. __It's optional and positional__: you can leave it out entirely, or supply a value with or without the name. It accepts one or more strings.
9. __Separate them with a comma:__ -Name notepad, calc.
10. __-Examples.__
11. __Get-Help about\_CommonParameters.__
12. __The command changes something.__ Add -WhatIf to see what would happen without making the change, e.g. Stop-Process -Name notepad -WhatIf.
