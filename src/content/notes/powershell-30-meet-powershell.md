---
title: "PowerShell: Meet PowerShell"
description: "PowerShell is two things working together:"
tags: ["powershell", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Learn PowerShell in a Month of Lunches (Jeffery Hicks et al.) · Chapter 2__

__Quick reference:__ the short version of this chapter is the Chapter 2 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain the difference between the PowerShell engine and a host application.
2. Choose between the console, Windows Terminal and Visual Studio Code for a task.
3. Set up VS Code with the PowerShell extension, and run code from it.
4. Configure the console for readability.
5. Use tab completion, predictions and PSReadLine history search to type faster and more accurately.
6. Start PowerShell as administrator when needed, and recognise when you are.
7. Explain the security implications of command history and elevated sessions.

## 1. Engine and host

PowerShell is two things working together:

- The __engine__ — the part that understands commands, runs them and produces results.
- A __host__ — the application that gives you a window to type into and displays the output.

 \+------------------\+     \+------------------\+     \+------------------\+
 | Console (pwsh in |     |  VS Code with    |     |  Windows         |
 | a terminal)      |     |  PowerShell ext. |     |  PowerShell ISE  |
 \+--------\+---------\+     \+--------\+---------\+     \+--------\+---------\+
          |                        |                        |
          \+------------------------\+------------------------\+
                                   |
                         \+---------v----------\+
                         |  PowerShell engine |
                         \+--------------------\+Different hosts can behave slightly differently — for example in how they display output or which keyboard shortcuts work. Check which host you're in:

$Host.Name        \

# ConsoleHost in a terminal; "Visual Studio Code Host" in VS Code

## 2. Choosing where to work

## 2.1 The options

__Host__

__Best for__

__Notes__

Console (pwsh in a terminal)

Running commands interactively — most of this book

Fast, lightweight, available everywhere, including over SSH

Windows Terminal

The modern way to host consoles on Windows

Tabs, split panes, profiles for PowerShell 7, Windows PowerShell, CMD and WSL

Visual Studio Code \+ PowerShell extension

Writing and debugging scripts

Free, cross-platform; syntax highlighting, IntelliSense, debugger, integrated console

Windows PowerShell ISE

Legacy script editing

Windows PowerShell 5.1 only; no longer developed. Doesn't support PowerShell 7

__Exam tip:__ "ISE" is the Integrated Scripting Environment. For PowerShell 7, __VS Code with the PowerShell extension__ is Microsoft's recommended replacement.

### 2.2 Worked example — making PowerShell 7 the default in Windows Terminal

1. Open Windows Terminal and press Ctrl\+, to open Settings.
2. Under __Startup → Default profile__, choose __PowerShell__ — the PowerShell 7 profile, not "Windows PowerShell".
3. Save. New windows and tabs now open pwsh.
4. __Verify:__ $PSVersionTable.PSEdition returns Core.

## 2.3 Worked example — setting up VS Code

1. __Install__ VS Code (winget install --id Microsoft.VisualStudioCode, or from code.visualstudio.com).
2. __Open the Extensions view__ (Ctrl\+Shift\+X), search for __PowerShell__ and install Microsoft's extension.
3. __Create__ a file named test.ps1. The .ps1 extension tells VS Code it's PowerShell.
4. __Type:__ Get-Process | Sort-Object CPU -Descending | Select-Object -First 5
5. __Run it:__
	- __F8__ runs the current line or selection in the integrated console.
	- __F5__ runs the whole script.
6. __Watch IntelliSense__ suggest command and parameter names as you type.

## 3. Making the console comfortable

A readable console reduces mistakes. In Windows Terminal (Settings → Profiles → PowerShell → Appearance) or your terminal's preferences:

__Setting__

__Recommendation__

__Why__

Font

A monospaced coding font, such as Cascadia Mono

Distinguishes 0/O, 1/l, and backtick from apostrophe

Font size

Large enough to read without squinting

You'll spend hours here

Colours

High contrast; keep errors clearly visible

Error messages are information — you need to read them

Window size

Wide enough that output doesn't wrap

Tables are easier to read

The __backtick__ (\`) has special meaning in PowerShell, and in some fonts it's nearly identical to an apostrophe ('). A good font prevents a class of confusing errors.

## 4. Typing tips

## 4.1 Tab completion

Press __Tab__ while typing and PowerShell completes what it can:

__You type__

__Tab completes__

Get-Pro

Command names: Get-Process, then other matches on repeated presses

Get-Process -Na

Parameter names: -Name

Get-Process -Name pw

Parameter __values__, where PowerShell can work them out — here, running process names

Get-ChildItem C:\\Pro

Paths: C:\\Program Files, and so on

__Behaviour differs slightly by platform.__ On Windows, Tab cycles through matches. On macOS and Linux, PowerShell uses a Bash-like style that completes as far as possible and lists the options. On Windows, __Ctrl\+Space__ shows all matches as a menu.

Tab completion is faster, and it also __prevents typos__: if Tab won't complete a name, it probably doesn't exist.

## 4.2 PSReadLine: history and predictions

__PSReadLine__ is the module that handles line editing in the console. It gives PowerShell modern editing features:

__Key__

__Does__

Up / Down

Step through previous commands

Ctrl\+R

Search history backwards — type part of an old command

Right arrow

Accept the greyed-out __prediction__ shown after the cursor

F2

Switch predictions between inline and list view

Escape

Clear the current line (on Windows)

Ctrl\+C

Cancel the running command, or abandon the line

__Predictive IntelliSense:__ as you type, PSReadLine suggests a completion in grey, based on your history (and installed prediction plugins). Accept it with the Right arrow, or keep typing to ignore it.

## 4.3 Worked example — finding an old command with Ctrl\+R

Yesterday you ran a long command to list the five busiest processes, and you want it again.

1. Press __Ctrl\+R__. The prompt changes to a history search.
2. Type Sort-Object CPU. The most recent matching command appears.
3. Press __Ctrl\+R__ again to step to older matches.
4. Press __Enter__ to run it, or an arrow key to edit it first.

## 4.4 Two kinds of history

__Command or file__

__Contains__

Get-History (alias h)

Commands from __this session only__

PSReadLine history file

Commands from __every session__, saved to disk

Find the file:

(Get-PSReadLineOption).HistorySavePath
\

# Windows:      ...\\AppData\\Roaming\\Microsoft\\Windows\\PowerShell\\PSReadLine\\ConsoleHost\_history.txt
\

# Linux/macOS:  ~/.local/share/powershell/PSReadLine/ConsoleHost\_history.txt

## 5. Running as administrator

Some tasks — managing services, changing system settings, installing modules for all users — need elevated rights.

__Platform__

__How to elevate__

__How to tell__

Windows

Right-click PowerShell or Terminal → __Run as administrator__

The window title starts with __Administrator:__

macOS / Linux

Run the specific command with sudo

You're prompted for your password

__Check elevation on Windows:__

(\[Security.Principal.WindowsPrincipal\]\[Security.Principal.WindowsIdentity\]::GetCurrent()).IsInRole(
    \[Security.Principal.WindowsBuiltInRole\]::Administrator)

This returns True in an elevated session.

__Good practice:__ open an elevated window for the admin task, then close it. Do day-to-day exploration in a normal window.

## 6. Cross-platform differences to expect

__Area__

__Windows__

__Linux / macOS__

Path separator

\\ (PowerShell also accepts /)

/

Case sensitivity of file names

Not case-sensitive

__Case-sensitive__

Some aliases (ls, cat, ps)

Point to PowerShell cmdlets

Not defined — they run the native Linux commands

Windows-only cmdlets (Get-Service, event logs)

Available

Not present

Chapter 4 looks at aliases in detail.

## 7. Security perspective

- __History files are evidence — and a liability.__
	- The PSReadLine history file keeps commands from every session, in plain text.
	- Investigators read it to reconstruct activity; attackers read it hunting for passwords, server names and credentials typed on the command line.
	- Recent PSReadLine versions try to avoid saving lines containing words like "password", but don't rely on that. Never type secrets as command arguments; use Get-Credential or a secret store instead.
- __Elevate only when needed.__ An elevated session magnifies every mistake and every malicious script. Separate admin windows (and separate admin accounts in real organisations) limit the damage.
- __Know which host and version you're in.__ Security features, logging and module behaviour can differ between Windows PowerShell 5.1 and PowerShell 7, and between hosts. $PSVersionTable and $Host.Name answer this in seconds.
- __Record your work.__ Start-Transcript writes a session's commands and output to a file (Stop-Transcript ends it). It's useful for change records and ticket evidence — but transcripts can capture sensitive output, so store them carefully.

# Summary

- __Engine vs host:__ the PowerShell engine runs commands; a host (console, VS Code, ISE) provides the window. Check with $Host.Name.
- __Where to work:__
	- The console, in Windows Terminal, for interactive work.
	- VS Code with the PowerShell extension for scripts (F8 runs a selection, F5 the file).
	- The ISE is legacy and 5.1-only.
- __Console setup:__ a clear monospaced font, readable colours, a wide window.
- __Typing:__ Tab completes commands, parameters, values and paths. PSReadLine adds Ctrl\+R history search and grey predictions (Right arrow accepts; F2 switches view).
- __History:__ Get-History covers this session; the PSReadLine file covers all sessions.
- __Elevation:__ "Run as administrator" on Windows (title shows Administrator:); sudo on Linux and macOS.
- __Cross-platform:__ paths and case sensitivity differ, and some aliases and cmdlets don't exist off Windows.

# Glossary

__Term__

__Definition__

Engine

The part of PowerShell that interprets and runs commands

Host

The application that presents PowerShell to the user

$Host.Name

Shows which host is running the session

Console host

PowerShell running in a terminal window

Windows Terminal

Microsoft's modern tabbed terminal application

VS Code

Visual Studio Code — a free, cross-platform code editor

PowerShell extension

The VS Code extension adding PowerShell support

ISE

Integrated Scripting Environment — the legacy editor for Windows PowerShell

.ps1

The file extension for PowerShell scripts

Tab completion

Completing command, parameter, value and path names with Tab

PSReadLine

The module providing console line editing, history and predictions

Predictive IntelliSense

Greyed-out suggestions based on history and plugins

Ctrl\+R

Reverse search through command history

Get-History

Lists commands from the current session

Elevated session

A session running with administrator rights

Transcript

A text file recording a session's commands and output

# Review questions

1. What's the difference between the PowerShell engine and a host?
2. How do you find out which host you're using?
3. Which editor does Microsoft recommend for writing PowerShell 7 scripts?
4. Can the Windows PowerShell ISE run PowerShell 7 code as PowerShell 7?
5. In VS Code, what do F8 and F5 do?
6. Why does font choice matter in PowerShell specifically?
7. Name three kinds of thing that Tab can complete.
8. How do you search your command history for an earlier command containing "Sort-Object"?
9. What's the difference between Get-History and the PSReadLine history file?
10. How can you tell a Windows PowerShell window is elevated?
11. Why might ls -la behave differently in PowerShell on Linux than on Windows?
12. Why should you avoid typing passwords as command arguments in PowerShell?

# Answer key

1. __The engine interprets and runs commands; the host is the application that shows you a window and displays output.__
2. __$Host.Name.__
3. __Visual Studio Code with the PowerShell extension.__
4. __No__ — the ISE only works with Windows PowerShell 5.1.
5. __F8 runs the current line or selection; F5 runs the whole script.__
6. __Some characters look alike__ — especially the backtick and apostrophe, which mean different things in PowerShell. A good coding font keeps them distinct.
7. __Any three of:__ command names, parameter names, parameter values, file paths.
8. __Press Ctrl\+R, type Sort-Object,__ then press Ctrl\+R again for older matches.
9. __Get-History shows this session only; the PSReadLine file stores commands from all sessions on disk.__
10. __The window title begins with "Administrator:".__
11. __On Linux, ls isn't a PowerShell alias__, so it runs the native ls program. On Windows, ls is an alias for Get-ChildItem, which doesn't understand -la.
12. __They're saved in plain text in the PSReadLine history file__ (and may appear in logs and transcripts), where others could read them.
