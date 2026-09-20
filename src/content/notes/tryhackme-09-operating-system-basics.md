---
title: "TryHackMe: Operating System Basics"
description: "Note: rooms in this module include Operating Systems: Introduction and Windows Basics, with Linux covered alongside. These notes are written from the module outline — cross-check room specifics as you go."
tags: ["tryhackme", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · TryHackMe Pre Security (2026 path) · Module 3__

__Quick reference:__ the short version of this module is the Module 3 cheat sheet. OS internals in more depth are in TCM Help Desk section 6.

__Note:__ rooms in this module include __Operating Systems: Introduction__ and __Windows Basics__, with Linux covered alongside. These notes are written from the module outline — cross-check room specifics as you go.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what an OS does, and the main OS types.
2. Find your way around Windows: the interface, system information, apps, files and security settings.
3. Use the essential Windows admin tools and their Run shortcuts.
4. Navigate Linux from the terminal, and read and change basic permissions.
5. Explain user accounts, administrator/root privileges, UAC and sudo.
6. Inspect processes and system information on both operating systems.
7. Apply basic OS security hygiene.

## 1. The operating system's job

An __operating system__ sits between you, your applications and the hardware. It manages resources so programs can share the machine safely.

__Job__

__What it means for you__

Process management

Many apps run "at once" — the OS shares CPU time between them

Memory management

Each app gets its own memory; one can't read another's

File management

Files and folders, paths, permissions

Device management

Drivers make printers, Wi-Fi and USB devices work

User management

Accounts, passwords, admin rights

Interface

Desktop (GUI) and command line (CLI)

## 1.1 OS types

__Type__

__Examples__

__Built for__

Desktop

Windows 11, macOS, Ubuntu Desktop

One user at a keyboard

Server

Windows Server, Ubuntu Server, RHEL

Running services for many users; often no GUI

Mobile

Android, iOS

Touch, battery life, app stores, sensors

Embedded

Custom Linux, RTOS

One dedicated job inside a device

Real-time (RTOS)

FreeRTOS, VxWorks

Guaranteed response times (cars, industrial control)

## 1.2 Worked example — "what is this old computer?"

A friend gives you an old PC and can't remember anything about it. Before deciding whether to wipe, upgrade or sell it, identify it.

__If it runs Windows:__

__Question__

__How__

Which Windows, and which build?

Win\+R → winver

CPU, RAM, model, BIOS mode

Win\+R → msinfo32

Full summary, including install date and hotfixes

systeminfo in Command Prompt

Storage and free space

File Explorer → This PC, or Get-Volume

Is it activated and still supported?

Settings → System → Activation; compare the build with Microsoft's support dates

__If it runs Linux:__

cat /etc/os-release       \

# distribution and version
uname -r                  \

# kernel version
lscpu | head              \

# CPU
free -h                   \

# RAM
lsblk                     \

# disks

__Decision:__

- An unsupported OS version (no more security updates) should be upgraded or wiped before it's used online.
- Old personal data on it should be securely erased before selling.

## 2. Windows basics

## 2.1 The interface

__Element__

__Use__

Desktop

Shortcuts and open windows

Start menu

Launch apps; just start typing to search

Taskbar

Pinned and running apps, system tray, clock and notifications

File Explorer (Win\+E)

Browse drives, folders and files

Settings (Win\+I)

Modern configuration: Wi-Fi, updates, accounts, privacy

Control Panel (control)

Classic configuration; some settings still only live here

__Useful shortcuts:__

__Shortcut__

__Does__

Win\+R

Run box

Win\+X

Power-user menu

Ctrl\+Shift\+Esc

Task Manager

Win\+L

Lock the PC

Win\+D

Show the desktop

Alt\+Tab

Switch apps

## 2.2 Run-box tools every technician uses

__Type in Win\+R__

__Opens__

__Use it to__

winver

About Windows

Check the exact version and build

msinfo32

System Information

Hardware, BIOS mode, Secure Boot state, drivers

taskmgr

Task Manager

Processes, performance, startup apps

resmon

Resource Monitor

Detailed CPU, memory, disk and network use per process

control

Control Panel

Classic settings

appwiz.cpl

Programs and Features

Uninstall or repair programs

sysdm.cpl

System Properties

Computer name, domain, remote settings, environment variables

ncpa.cpl

Network Connections

Adapter settings, IP configuration

services.msc

Services

Start, stop and configure background services

eventvwr.msc

Event Viewer

System, Application and Security logs

compmgmt.msc

Computer Management

Disks, users, services and logs in one console

diskmgmt.msc

Disk Management

Partitions and volumes

lusrmgr.msc

Local Users and Groups

Local accounts (Pro/Enterprise editions only)

wf.msc

Firewall with Advanced Security

Detailed firewall rules

regedit

Registry Editor

Low-level settings — back up before editing

## 2.3 Files and folders

- __Paths__ start with a drive letter and use backslashes: C:\\Users\\andrew\\Documents\\report.docx.

__Folder__

__Holds__

C:\\Windows

The operating system

C:\\Program Files

64-bit applications

C:\\Program Files (x86)

32-bit applications

C:\\Users\\<name>

Each user's profile: Desktop, Documents, Downloads, AppData

C:\\Users\\<name>\\AppData

Per-user app settings and data (hidden by default)

__Turn on__ File Explorer → View → Show → __Hidden items__ and __File name extensions__.

## 2.4 Installing and removing apps

__Method__

__Notes__

Microsoft Store

Sandboxed apps, auto-updated

Installer (.exe / .msi)

Traditional; usually needs admin rights

winget

Command-line package manager, e.g. winget install Mozilla.Firefox

Uninstall

Settings → Apps → Installed apps, or appwiz.cpl

## 2.5 Security settings

__Area__

__Where__

__What to check__

Antivirus

Windows Security → Virus & threat protection

Real-time protection on; definitions current

Firewall

Windows Security → Firewall & network protection

On for all profiles (domain, private, public)

Updates

Settings → Windows Update

Up to date; no failed updates

Account protection

Windows Security → Account protection

Windows Hello, dynamic lock

UAC

Control Panel → User Accounts

Not set to "Never notify"

Device security

Windows Security → Device security

Core isolation / memory integrity; TPM and Secure Boot

Get-MpComputerStatus |
    Select-Object RealTimeProtectionEnabled, AntivirusSignatureLastUpdated
Get-NetFirewallProfile | Select-Object Name, Enabled
Update-MpSignature                     \

# update Defender definitions
Start-MpScan -ScanType QuickScan       \

# run a quick scan

## 3. Linux basics

## 3.1 The terminal and the file system

Linux is usually managed from a __terminal__ running a __shell__ (typically Bash). Everything lives in one tree starting at / — there are no drive letters.

__Directory__

__Holds__

/

The root of everything

/home/<user>

Users' files (~ is shorthand for your own)

/root

The root user's home

/etc

System configuration files (plain text)

/var/log

Log files

/bin, /usr/bin

Programs

/tmp

Temporary files

__Task__

__Command__

Where am I?

pwd

List files (including hidden, with details)

ls -la

Change directory

cd /etc, cd ~, cd ..

Read a file

cat file, less file

Find text in a file

grep "word" file

Make / remove directory

mkdir name, rmdir name

Copy / move / delete

cp, mv, rm (no recycle bin)

The Shotts class notes cover all of this in depth.

## 3.2 Installing software

__Distro family__

__Package manager__

__Update everything__

__Install__

Debian / Ubuntu

apt

sudo apt update && sudo apt upgrade

sudo apt install nmap

RHEL / Fedora

dnf

sudo dnf upgrade

sudo dnf install nmap

## 4. Users and privileges

## 4.1 Standard vs administrative accounts

__Windows__

__Linux__

All-powerful account

Administrator (and members of the Administrators group)

root (UID 0)

Everyday elevation

__UAC__ prompt: "Do you want to allow this app to make changes?"

sudo <command> — runs one command as root, after your password

Switch to another user

Sign out, or "Run as different user"

su - username

Who am I?

whoami, whoami /groups

whoami, id

List users

net user, Get-LocalUser

cat /etc/passwd

Admin members

net localgroup administrators

getent group sudo (Ubuntu) or wheel (RHEL)

__UAC (User Account Control)__ means even administrators run with standard rights until an action needs elevation. Then Windows asks for confirmation. It limits the damage malware can do silently.

## 4.2 Linux permissions

Every file has an __owner__, a __group__ and permissions for three classes: __user (owner)__, __group__ and __others__.

 -rwxr-x---  1  andrew  devs  4096  Sep 18 10:00  deploy.sh
 |\\\_/\\\_/\\\_/     |       |
 | |  |  |      owner   group
 | |  |  others: ---  (no access)
 | |  group:  r-x   (read, execute)
 | owner:     rwx   (read, write, execute)
 file type: - = file, d = directory, l = link

__Letter__

__On a file__

__On a directory__

__Octal value__

r

Read contents

List contents

4

w

Modify

Create and delete files inside

2

x

Run as a program

Enter (cd)

1

__Worked example — setting permissions:__

1. __Goal:__ you wrote backup.sh. You should read, write and run it; your team group should read and run it; nobody else should touch it.
2. __Octal per class:__ owner rwx = 4\+2\+1 = __7__; group r-x = 4\+0\+1 = __5__; others --- = __0__.
3. __Apply it:__

chmod 750 backup.sh
ls -l backup.sh       \

# -rwxr-x--- ... backup.sh1. __Symbolic alternative:__ chmod u\+x backup.sh adds execute for the owner only.

__Changing ownership__ needs root:

sudo chown andrew:devs backup.sh

__Windows__ uses __NTFS permissions (ACLs)__: right-click → Properties → Security, or icacls C:\\Data from the command line.

## 5. Processes and system information

## 5.1 Processes

__Task__

__Windows__

__Linux__

Live view

Task Manager (Ctrl\+Shift\+Esc)

top (or htop)

List all

tasklist, Get-Process

ps aux

Find one

Get-Process -Name chrome

ps aux | grep ssh

End one

taskkill /PID 1234 /F, Stop-Process -Id 1234

kill 1234 (kill -9 only as a last resort)

Services

services.msc, Get-Service

systemctl status ssh, systemctl list-units --type=service

## 5.2 Worked example — "the PC is really slow"

1. __Look:__ open Task Manager → Processes, and sort by CPU, then by Memory.
2. __Find the culprit:__ an unknown process, updater\_x.exe, is using 90 % CPU.
3. __Investigate before killing it:__
	- Right-click → __Open file location__. Where does it run from? C:\\Users\\...\\AppData\\Local\\Temp is suspicious; C:\\Program Files\\<known vendor> is less so.
	- Right-click → __Properties → Digital Signatures__. Is it signed by a known publisher?
	- Search the exact file name.
4. __Decide:__
	- __Legitimate but stuck__ (e.g. a known updater): end it and update the software.
	- __Unknown, in Temp, unsigned:__ don't just kill it and move on — treat it as potential malware and follow the security procedure.

## 5.3 System information commands

__Need__

__Windows__

__Linux__

OS version

winver, systeminfo

cat /etc/os-release

Kernel / build

systeminfo | findstr /B /C:"OS Version"

uname -r

Hostname

hostname

hostname

Uptime

(Get-CimInstance Win32\_OperatingSystem).LastBootUpTime

uptime

Disk space

Get-Volume

df -h

IP configuration

ipconfig /all

ip a

Logs

Event Viewer (eventvwr.msc)

journalctl, /var/log

## 6. GUI vs CLI

__GUI__

__CLI__

Discoverable — you can see the options

You need to know the commands

Slow for repetitive tasks

Fast, scriptable, repeatable

Hard to document precisely

The command *is* the documentation

Needs a desktop session

Works remotely over SSH or PowerShell remoting

Technicians use both: the GUI to explore, the CLI to repeat and automate.

## 7. Security perspective

- __Least privilege.__ Use a standard account for daily work and elevate only when needed (UAC, sudo). Malware runs with the rights of whoever launched it.
- __Keep protections on:__ real-time antivirus, firewall, automatic updates. "Temporarily" disabling them is a common way incidents start.
- __Weak passwords and exposed remote logins get attacked.__ SSH or RDP open to the internet with weak passwords is brute-forced constantly. Use strong passwords, keys and MFA, and don't expose these services unnecessarily.
- __Command history leaks secrets.__ ~/.bash\_history and the PowerShell history file record what was typed, including any password on the command line. Attackers look there after getting in; so do investigators.
- __Logs are evidence.__
	- __Windows:__ Security log event 4624 = successful logon, 4625 = failed logon.
	- __Linux:__ /var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL).
- __Permissions matter:__
	- 777 (anyone can do anything) is almost always wrong.
	- Private keys and credentials should be 600.
	- Watch out for world-writable scripts that root runs.

# Summary

- The OS manages processes, memory, files, devices, users and the interface. Types include desktop, server, mobile, embedded and real-time.
- __Windows:__
	- The Start menu, Explorer, Settings and Control Panel.
	- Win\+R tools: winver, msinfo32, taskmgr, services.msc, eventvwr.msc, ncpa.cpl.
	- Windows Security for antivirus, firewall and device security.
- __Linux:__ one tree from /; the terminal with pwd, ls, cd, cat, grep; packages with apt or dnf.
- __Privileges:__ Administrator/UAC on Windows; root/sudo on Linux. Work as a standard user.
- __Linux permissions:__ r=4, w=2, x=1 for user/group/others — chmod 750, chown user:group.
- __Processes:__ investigate before killing — check the location and signature.

# Glossary

__Term__

__Definition__

GUI / CLI

Graphical / command-line user interface

Shell

A program that interprets commands (PowerShell, Bash)

Terminal

A window giving access to a shell

Run box

Win\+R dialog for launching programs by name

.msc / .cpl

Microsoft Management Console snap-in / Control Panel applet

Profile

A user's folder and settings (C:\\Users\\name, /home/name)

Administrator / root

The all-powerful account on Windows / Linux

UAC

User Account Control — prompts before admin-level changes

sudo

Runs one command with root privileges on Linux

Least privilege

Using only the minimum rights needed

Permission bits

r, w, x for user, group and others on Linux

Octal notation

Numeric permissions, e.g. 750

ACL

Access control list — Windows/NTFS permissions

Process / PID

A running program / its process ID

Service / daemon

A background process (Windows term / Linux term)

Package manager

A tool that installs and updates software (apt, dnf, winget)

Event Viewer

Windows log viewer

Distro

A Linux distribution

# Review questions

1. Which Run command shows the exact Windows version and build?
2. Where do 32-bit programs install on 64-bit Windows?
3. What does UAC do for an administrator account?
4. What does chmod 640 notes.txt set?
5. Write the octal permission for rwxr-xr-x.
6. Which Linux command runs a single command with root privileges?
7. An unknown process runs from AppData\\Local\\Temp and is unsigned. What should you do?
8. Which tool shows Windows Security, Application and System logs?
9. How do you update all packages on Ubuntu?
10. Give two reasons to prefer the CLI for repetitive admin tasks.
11. Which Windows event ID records a failed logon?
12. Why is typing a password as a command argument risky?

# Answer key

1. __winver.__
2. __C:\\Program Files (x86).__
3. __It runs the administrator with standard rights until elevation is needed, then asks for confirmation__ — limiting silent changes by malware.
4. __Owner read/write, group read, others nothing__ — rw-r-----.
5. __755.__
6. __sudo.__
7. __Treat it as potential malware.__ Don't just kill it; check its signature and details, and follow the security procedure (isolate and report).
8. __Event Viewer__ (eventvwr.msc).
9. __sudo apt update && sudo apt upgrade.__
10. __Any two of:__ faster; scriptable and repeatable; works remotely; self-documenting.
11. __4625.__
12. __It's saved in shell history files__ (and may be visible in process lists and logs), where attackers or others can read it.
