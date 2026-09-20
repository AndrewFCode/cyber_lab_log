---
title: "PowerShell: Before You Begin"
description: "Graphical tools are good for doing one thing, once. They struggle with:"
tags: ["powershell", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Learn PowerShell in a Month of Lunches (Jeffery Hicks et al.) · Chapter 1__

__Quick reference:__ the short version of this chapter is the Chapter 1 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why administrators and security teams learn PowerShell rather than relying on graphical tools.
2. Distinguish Windows PowerShell 5.1 from PowerShell 7, and identify which one you're running.
3. Install PowerShell 7 on Windows, macOS or Linux, and verify the installation.
4. Set up a safe practice lab.
5. Plan a study routine that matches how the book is designed to be used.
6. Explain why PowerShell matters to both attackers and defenders.

## 1. Why PowerShell?

## 1.1 The limits of the GUI

Graphical tools are good for doing one thing, once. They struggle with:

__Task__

__GUI__

__PowerShell__

Disable one account

A few clicks

One command

Disable 300 leavers from a spreadsheet

300 rounds of the same clicks — slow and error-prone

The same command, fed the list

Report which servers are missing an update

Log on to each one

One command run against all of them

Prove exactly what you changed

Screenshots, memory

The commands themselves are the record

Repeat the job next month

Do it all again

Run the same script

The core idea is __automation__: describe a task once, precisely, then repeat it at any scale.

## 1.2 Where PowerShell is used

- __Windows administration:__ services, processes, event logs, registry, files, scheduled tasks.
- __Directory and cloud:__ Active Directory, Microsoft 365, Exchange Online, Entra ID and Azure all have PowerShell modules — and some settings are *only* reachable through PowerShell.
- __Other platforms:__ PowerShell 7 runs on Linux and macOS, and vendors such as VMware and AWS publish modules for it.
- __Security operations:__ incident responders use it to collect evidence across many machines; defenders use it to audit configuration and hunt through logs.

__In the real world:__ job adverts for help desk, sysadmin and SOC roles routinely list PowerShell. Being able to say "I automated this" — with a script to show — stands out.

## 2. Windows PowerShell vs PowerShell 7

There are two main lines of PowerShell, and you'll meet both.

__Windows PowerShell 5.1__

__PowerShell 7.x__

Comes with

Windows (built in)

Separate install

Built on

.NET Framework

Modern .NET (formerly .NET Core)

Runs on

Windows only

Windows, macOS, Linux

Executable

powershell.exe

pwsh (pwsh.exe on Windows)

Development

Maintenance only — security fixes, no new features

Actively developed

$PSVersionTable.PSEdition

Desktop

Core

Can they coexist?

Yes — installing 7 doesn't remove or replace 5.1

The book teaches __PowerShell 7__, because it's the version that's moving forward and works on every platform. Almost everything also applies to 5.1, and a few older Windows-only modules still need 5.1 — when that matters, the book says so.

## 2.1 Worked example — which version am I running?

PS> $PSVersionTable

Name                      Value
----                      -----
PSVersion                 7.4.6
PSEdition                 Core
GitCommitId               7.4.6
OS                        Ubuntu 24.04.4 LTS
Platform                  Unix
PSCompatibleVersions      \{1.0, 2.0, 3.0, 4.0…\}
PSRemotingProtocolVersion 2.3
SerializationVersion      1.1.0.1
WSManStackVersion         3.01. __PSVersion 7.4.6__ — this is PowerShell 7.
2. __PSEdition Core__ — confirms the modern, cross-platform line. Windows PowerShell shows Desktop and version 5.1.x.
3. __OS and Platform__ — this session is on Linux (Unix). On Windows, Platform shows Win32NT.

Just the version number:

$PSVersionTable.PSVersion

__Note:__ PowerShell 7 has __LTS__ (long-term support) releases and shorter-lived __current__ releases. For work systems, an LTS release is usually the safer choice. Check Microsoft's PowerShell support lifecycle page for current dates.

## 3. Setting up your lab

## 3.1 What you need

- __A computer running Windows 10/11, macOS or a mainstream Linux distribution.__ PowerShell 7 runs on all of them.
- __Ideally, a virtual machine__ (or several) you can break without consequence. Later chapters on remoting are easiest with at least two Windows machines — for example a Windows 11 VM and a Windows Server evaluation VM in your home lab.
- __Administrator rights__ on the lab machine, since some exercises change system settings.

## 3.2 Installing PowerShell 7

__OS__

__Recommended method__

Windows

winget install --id Microsoft.PowerShell --source winget — or the MSI from the PowerShell GitHub releases page

macOS

brew install --cask powershell (Homebrew)

Ubuntu / Debian

Add Microsoft's package repository, then sudo apt-get install -y powershell — or sudo snap install powershell --classic

RHEL / Fedora

Add Microsoft's repository, then sudo dnf install -y powershell

Microsoft's "Install PowerShell" documentation has the exact repository steps for each distribution and version. Follow it rather than copying commands from random blogs.

## 3.3 Worked example — install and verify on Windows

1. __Open Windows Terminal__ or Command Prompt, and run:

winget install --id Microsoft.PowerShell --source winget1. __Start PowerShell 7:__ type pwsh, or pick __PowerShell__ (not "Windows PowerShell") in the Start menu or a new Windows Terminal tab.
2. __Check the version:__

$PSVersionTable.PSVersion
$PSVersionTable.PSEdition     \

# should say Core1. __Confirm 5.1 is still there:__ run powershell from inside pwsh, check $PSVersionTable.PSEdition says Desktop, then type exit to return.

## 3.4 Keeping it updated

__Method__

__Update with__

winget

winget upgrade --id Microsoft.PowerShell

Homebrew

brew upgrade --cask powershell

apt / dnf

Your normal system updates

## 4. How to use the book

## 4.1 The "month of lunches" design

The book is built around short daily sessions: __one chapter a day__, sized to fit a lunch break (roughly an hour including the lab). Its chapters follow a consistent pattern:

__Element__

__What to do with it__

Main text

Read it with a PowerShell window open

__Try it now__ sections

Stop and type the commands yourself — straight away

Hands-on labs

Do them before moving on; answers are provided for checking

__Above and beyond__ sections

Optional depth — skip on a busy day, return later

## 4.2 Study habits that work with this book

- __Type, don't paste.__ Typing builds the muscle memory for command and parameter names, and exposes your typos — which teaches you to read error messages.
- __Don't skip the labs.__ The labs are where reading turns into ability.
- __Don't skip ahead.__ Later chapters assume the earlier ones; the help system (chapter 3) and the pipeline are foundations for everything else.
- __Keep a lab log.__ Note commands that surprised you and errors you solved. It becomes your personal reference — and material for your blog.
- __Learn to discover, not to memorise.__ PowerShell has thousands of commands. The book's real goal is teaching you how to *find* and *learn* commands on your own.

## 4.3 Worked example — a four-week plan

__Week__

__Chapters__

__Weekend review__

1

1–5: setup, help, running commands, providers

Redo the labs from memory

2

6–10: pipeline, modules, objects, formatting

Write cheat sheet entries

3

11–15: filtering, remoting, jobs, multitasking

Try one real task in the home lab

4

Remaining chapters

Automate one real, repetitive task end to end

Chapter groupings above are illustrative — adjust to the edition you're reading and to your own pace. Consistency matters more than speed.

## 5. Security perspective

- __Attackers love PowerShell.__ It's installed on every Windows machine, runs code directly in memory, and can reach almost every part of the system. Using legitimate built-in tools like this is called __living off the land__ — it helps attackers blend in with normal admin activity.
- __Defenders love it too.__ The same reach lets defenders:
	- collect evidence from many machines at once;
	- audit settings (who's an administrator, which services run, what's scheduled);
	- search logs at scale.
- __Logging makes PowerShell visible.__ Windows can record PowerShell activity:
	- __Script block logging__ records the code that ran, even if it was obfuscated or encoded.
	- __Module logging__ records pipeline execution details.
	- __Transcription__ writes a text record of whole sessions.
	- Many organisations enable these through Group Policy and forward the events to a SIEM.
- __Old versions are a risk.__ Windows PowerShell 2.0 lacked modern logging and protections, so attackers tried to "downgrade" to it. Microsoft has been removing it from recent Windows versions; on older systems it should be disabled.
- __Install from official sources only:__ winget, Microsoft's repositories, or the official GitHub releases. A tampered shell would be a perfect backdoor.

# Summary

- __PowerShell turns repetitive admin work into commands you can repeat__ at any scale, and leaves a precise record of what was done.
- __Two lines:__
	- Windows PowerShell 5.1 — built in, Windows only, powershell.exe, Desktop edition, maintenance only.
	- PowerShell 7 — cross-platform, pwsh, Core edition, actively developed.
	- They install side by side.
- __Check your version__ with $PSVersionTable (PSVersion, PSEdition, OS, Platform).
- __Install:__ winget (Windows), Homebrew (macOS), Microsoft's repositories or snap (Linux). Prefer LTS for work systems.
- __Study:__ one chapter a day, type every "try it now", do every lab, keep a lab log, and focus on discovering commands rather than memorising them.
- __Security:__ PowerShell is a favourite attacker tool and an essential defender tool. Logging and current versions make it visible and safer.

# Glossary

__Term__

__Definition__

PowerShell

Microsoft's command-line shell and scripting language

Automation

Performing tasks through repeatable commands rather than by hand

Windows PowerShell 5.1

The built-in, Windows-only version, based on .NET Framework

PowerShell 7

The modern, cross-platform version, based on .NET

powershell.exe / pwsh

The executables for Windows PowerShell / PowerShell 7

.NET

The software framework PowerShell is built on

PSEdition

Desktop (5.1) or Core (6 and later)

$PSVersionTable

A built-in variable describing the running PowerShell

Cross-platform

Running on Windows, macOS and Linux

LTS

Long-term support release

winget

The Windows package manager

Homebrew

A package manager for macOS

Module

A package of PowerShell commands for a product or task

Lab

A safe environment for practice

Living off the land

Attackers using legitimate built-in tools to avoid detection

Script block logging

Windows logging that records the PowerShell code that ran

Transcription

Recording a PowerShell session's input and output to a text file

# Review questions

1. Give two tasks where PowerShell clearly beats a GUI tool, and explain why.
2. What are the executable names for Windows PowerShell and PowerShell 7?
3. $PSVersionTable.PSEdition returns Desktop. Which PowerShell are you in?
4. Does installing PowerShell 7 remove Windows PowerShell 5.1?
5. On which operating systems does PowerShell 7 run?
6. Write the winget command to install PowerShell 7.
7. What does $PSVersionTable.Platform show on Linux, and on Windows?
8. What are "Try it now" sections for, and how should you use them?
9. Why does the book emphasise discovering commands over memorising them?
10. What does "living off the land" mean, and why is PowerShell a good example?
11. Name two kinds of PowerShell logging defenders can enable.
12. Why was Windows PowerShell 2.0 attractive to attackers?

# Answer key

1. __Any two, such as:__ changing hundreds of accounts from a list; reporting on many servers at once; repeating a monthly task. One command applies at any scale and is repeatable.
2. __powershell.exe and pwsh.__
3. __Windows PowerShell (5.1).__
4. __No__ — they install side by side.
5. __Windows, macOS and Linux.__
6. __winget install --id Microsoft.PowerShell --source winget.__
7. __Unix on Linux (and macOS); Win32NT on Windows.__
8. __Hands-on moments within a chapter__ — stop and type the commands immediately, rather than reading on.
9. __There are thousands of commands__; knowing how to find and learn them (mainly through help) matters more than recalling any one.
10. __Attackers using legitimate built-in tools so their activity blends in.__ PowerShell is on every Windows machine, is trusted and is very powerful.
11. __Any two of:__ script block logging, module logging, transcription.
12. __It lacked modern logging and security protections__, so attacks run in it were harder to see.
