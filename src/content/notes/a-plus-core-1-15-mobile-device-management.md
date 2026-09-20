---
title: "A+ Core 1 1.4: Mobile Device Management"
description: "An organisation may have hundreds or thousands of phones and tablets. Some are company-owned; others belong to employees. They're outside the office, easily lost, and each needs the right apps, email settings and…"
tags: ["a-plus", "comptia", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · Professor Messer, CompTIA A\+ 220-1201 Core 1 · Objective 1.3 (MDM)__

__Quick reference:__ the short version of this lesson is the Mobile Device Management cheat sheet, part of Section 1.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what a mobile device manager (MDM) is and why organisations need one.
2. Compare the BYOD, COPE and CYOD ownership models, and choose one for a scenario.
3. Explain how partitioning keeps corporate and personal data separate on one phone.
4. Describe the policies and restrictions an MDM can enforce.
5. Find device details such as platform, user and IMEI in an MDM console.
6. Configure over-the-air synchronisation: what syncs, over which network, and when.
7. Set up business app accounts with per-service synchronisation settings.
8. Explain the security benefits and privacy boundaries of MDM.

## 1. What an MDM is

## 1.1 The problem

An organisation may have hundreds or thousands of phones and tablets. Some are company-owned; others belong to employees. They're outside the office, easily lost, and each needs the right apps, email settings and security. Configuring them one by one isn't practical.

## 1.2 The solution

A __mobile device manager (MDM)__ — also called mobile device management — is specialised software that lets administrators __manage all mobile devices centrally, from one place__.

__An MDM lets you__

__Examples__

Set rules and parameters for how devices are used

Allowed and forbidden apps

Enable or disable device features

Camera, GPS

Separate corporate and personal data

A partitioned work area on a personal phone

Enforce security policies

Screen locks with a PIN or other unlock method; multi-factor authentication

Push configuration

Corporate email settings, applications

See every device

Inventory with device, user and IMEI details

In short, an MDM can control almost every aspect of a managed mobile device.

## 2. Ownership models

## 2.1 BYOD — bring your own device

__BYOD__ (also called __bring your own technology__) means the __employee owns the phone__ and uses it for work too.

__Benefit__

__Challenge__

The employee carries only one device

Company data must be protected on a device the company doesn't own

No hardware cost for the company

The user's personal data must stay personal and private

Policies are needed for when the phone is __upgraded, traded in or lost__

The MDM defines which part of the device is __home (private)__ and which is __work__, and how data in each is protected.

## 2.2 COPE — corporate owned, personally enabled

With __COPE__, some organisations don't allow personal phones for work at all. Instead:

1. __The company buys the phone.__
2. __The company assigns it to a user.__
3. __The company manages it as a corporate device__, with complete control over every aspect of it.
4. __Many organisations also let the user use it personally__ — the "personally enabled" part.

It's managed much like company laptops and desktops. The company decides what's stored on the device, how it's stored, and what happens to the data if the device is replaced or lost.

## 2.3 CYOD — choose your own device

__CYOD__ adds flexibility: the company provides and manages the device, but the __user chooses it from a selection__ of approved models.

## 2.4 Comparing the models

__BYOD__

__COPE__

__CYOD__

Who owns the device

Employee

Company

Company

Who chooses it

Employee

Company

User picks from an approved list

Company control

Limited — the work partition

Complete

Complete (company-owned)

Personal use

Yes — it's their phone

Often allowed

Often allowed

Key concern

Separating work and personal data; privacy

Cost of buying devices

Supporting several models

__Note (beyond this lesson):__ a fourth model, __COBO__ (corporate-owned, business only), allows __no__ personal use at all. It's common for high-security roles and shared devices.

### 2.5 Worked example — choosing a model

__Scenario__

__Model__

__Reasoning__

A small charity has no budget for phones; staff need work email on the phones they already have

BYOD

No hardware cost, with a work partition protecting the charity's data

A bank needs complete control of every device that holds customer data

COPE (or COBO)

The company owns and fully manages the device

A firm wants control but staff complain about the one model on offer

CYOD

Staff choose from approved models while the company keeps ownership and control

## 3. Partitioning personal and corporate data

On a BYOD phone, the MDM creates a __partitioned area__ for the organisation:

 \+----------------------- Employee's phone ----------------------\+
 |                              |                                |
 | PERSONAL (home) partition    | CORPORATE (work) partition     |
 | Photos, personal apps,       | Work email, calendar,          |
 | messages, social media       | business apps, company files   |
 |                              |                                |
 | Private to the user.         | Managed by the MDM:            |
 | The organisation doesn't     | policies, protection,          |
 | manage it                    | removal when needed            |
 |                              |                                |
 \+------------------------------\+--------------------------------\+- __The user's personal data__ stays protected and private.
- __Corporate data__ stays in its own area, under company policy.
- __When the phone is upgraded, traded in, lost, or the employee leaves,__ the organisation can deal with its own data without touching the user's personal data.

__Note (beyond this lesson):__ this is often called __containerisation__. Removing just the corporate partition is a __selective__ (corporate) __wipe__; erasing the whole device is a __full wipe__, used for company-owned devices.

## 4. What the MDM controls

## 4.1 Policies and security

__Area__

__What administrators can do__

Screen lock

Require one, unlocked with a __PIN__ or another access method

Authentication

Require __two-factor / multi-factor authentication__, and specify which type

Applications

__Allow__ specific apps, __forbid__ others, and __push__ apps for automatic installation

Device features

Enable or disable features such as the __camera__ and __GPS__

Corporate email

Configure settings centrally and __push__ them to every phone

__The pay-off from central email configuration:__ the user turns on their phone and their inbox simply works. They don't have to enter any server settings themselves.

## 4.2 Why extra security for mobiles?

Mobile devices live __outside the company__ and are __easily lost__. So the security team often requires more on them than on office desktops — for example mandatory screen locks and multi-factor authentication.

## 5. The MDM console

## 5.1 The device inventory

The console lists every managed device. Typical columns:

__Field__

__Shows__

Device name

The phone's name

Platform

e.g. iOS or Android

Username

Who the device is assigned to

Email and contact information

The user's details

__IMEI__

The device's __unique identifier__ — the International Mobile Equipment Identity

## 5.2 Drilling into one device

Selecting a device shows its details — for example:

- __Model and OS:__ an Apple iPhone 13, and the exact iOS version.
- __Operating system details.__
- __Device security options__ that are enabled or disabled.
- __A network summary__ of what it's currently connected to.

## 5.3 The Restrictions tab

As the device's manager, you can enable or disable features, such as:

__Category__

__Examples__

Camera and communication

The camera, FaceTime, voice dialling

Assistant

Siri

Other

Security options, printing options, application options

## 5.4 Worked example — a lost company phone

A user reports their COPE iPhone lost on a train.

1. __Find the device__ in the MDM console by username.
2. __Note its IMEI__ — the carrier can use it to identify and block the handset.
3. __Check its details:__ the last network summary and whether its security options (screen lock, encryption) are enabled.
4. __Act on it using the MDM,__ according to the company's lost-device policy — the lesson stresses that the policy for lost devices must be decided in advance. (Beyond this lesson: this usually means a remote lock, then a remote wipe.)
5. __Record everything__ in the ticket, and arrange a replacement. Synchronised data (section 6) restores onto it.

## 6. Over-the-air synchronisation

## 6.1 Why sync matters

Mobile devices are rarely plugged in to anything central, so __synchronisation over the air__ is how their data is __backed up__ — and how it's __restored__ if a device fails, is damaged or needs replacing.

## 6.2 What the MDM configures

__Setting__

__Options__

What's always synced

Some items are preconfigured, such as __phone information and messages__

Email service

Differs by organisation — e.g. __Gmail__ or __Microsoft Outlook__ — so it's set centrally

Network used

__Wi-Fi only__, or Wi-Fi __and cellular__

Data types

Choose individually: __calendar__, __contacts__ and others

Timing

Different synchronisation behaviour at different times of day

Cellular limits

How much cellular data can be used, and for what

Automatic downloads

Whether they're allowed over mobile data, and the __maximum app size__ that can download over the mobile network

## 6.3 Cellular data and cost

Cellular data can be expensive. Many organisations sync only over __802.11 (Wi-Fi)__ or the local network to control cost. Mobile devices also have their own settings controlling how much cellular data can be used and for what.

__Check the contract with the cellular provider:__ how much data is allowed, and at what times.

## 6.4 Worked example — designing a sync policy

Field engineers have phones on a plan with a small monthly data allowance.

1. __Always sync:__ phone information and messages (preconfigured).
2. __Email:__ configure the company's service centrally, so it's pushed to every phone.
3. __Calendar and contacts:__ sync over any network — they're small and time-sensitive.
4. __Large data (backups, app downloads):__ __Wi-Fi only__.
5. __Automatic downloads over cellular:__ limit them to small apps — or turn them off.
6. __Confirm__ the plan's allowance and any time-based terms in the provider contract.

__Result:__ engineers always have current appointments and contacts, and the heavy data waits for Wi-Fi.

## 7. Business applications and accounts

## 7.1 Setting up accounts

Business services such as __Outlook__, other email, and __cloud storage__ are usually set up in the device's __account settings__. You provide:

- a __username__;
- a __password__, or another __authentication factor__.

## 7.2 Choosing what each service syncs

Each account has its own granular sync choices:

__Data type__

__Example__

Mail

The inbox and folders

Contacts

The address book

Calendars

Meetings and appointments

Reminders

Tasks

Notes

Notes

__Settings can differ per service.__ For example, the Microsoft Exchange account might sync mail, contacts and calendars, while a Google Mail account syncs only mail.

## 7.3 Worked example — one phone, two accounts

A user needs their company Exchange account and a shared Google Mail account for a project.

__Account__

__Sync__

__Reason__

Microsoft Exchange (corporate)

Mail, contacts, calendars, reminders

The main work account

Google Mail (project)

Mail only

Avoids duplicate contacts and calendars

Both are added in the account settings, each with its own credentials and authentication factor.

## 8. Security perspective

- __MDM is the security backbone for mobile devices.__ Screen locks, MFA, app allow and deny lists, and feature restrictions (such as disabling the camera in sensitive areas) all come from central policy.
- __Plan for loss before it happens.__ Define in advance what happens to data when a device is lost, upgraded or traded in — then act quickly when it's reported.
- __Keep a good inventory.__ Knowing every device, its user and its IMEI makes lost devices traceable and blockable.
- __Respect BYOD privacy.__ On a personal phone, the organisation manages the work partition, not the user's private data. Clear policies build trust — and users should know what the MDM can see.
- __Sync is also a data-protection control.__ Over-the-air backup means a lost device doesn't mean lost data.
- __Beyond this lesson:__ many MDMs also check compliance — for example flagging __jailbroken__ or __rooted__ devices, or out-of-date OS versions — and can block them from company data.

# Summary

- __MDM__ = central management of company-owned and personal mobile devices: policies, restrictions, security and configuration from one place.
- __Ownership models:__
	- __BYOD__ (bring your own device, or technology) — the employee owns it; work and personal data are partitioned.
	- __COPE__ (corporate owned, personally enabled) — the company buys, assigns and fully controls it; personal use is often allowed.
	- __CYOD__ (choose your own device) — the user picks from approved company devices.
- __Partitioning__ keeps corporate data separate from private data on personal phones.
- __Policies:__ screen locks with a PIN, MFA (and its type), app allow and deny lists with automatic installs, and control of the camera, GPS, FaceTime, voice dialling and Siri.
- __Central email configuration__ is pushed to devices, so the inbox just works.
- __The console__ shows device name, platform, user, contact details and the __IMEI__ (unique identifier), plus OS, security and network details per device.
- __Over-the-air sync:__
	- It's the device's backup and restore.
	- Choose Wi-Fi only or cellular too, which data types, and when.
	- Limit cellular use and download sizes, and check the provider contract.
- __Business app accounts__ are set up in account settings with credentials. Choose mail, contacts, calendars, reminders and notes separately for each service.

# Glossary

__Term__

__Definition__

MDM

Mobile device manager — central management of mobile devices

BYOD

Bring your own device — employees use their own devices for work

BYOT

Bring your own technology — another name for BYOD

COPE

Corporate owned, personally enabled — company device, personal use allowed

CYOD

Choose your own device — the user picks from approved company devices

COBO

Corporate owned, business only — no personal use (beyond this lesson)

Partition (work / personal)

Separate areas on one device for corporate and private data

Containerisation

Another term for isolating corporate data in its own area

Policy

A rule set by administrators and enforced on devices

Restriction

A setting that disables a device feature, e.g. camera or Siri

Screen lock

A lock requiring a PIN, password or biometric to unlock

Two-factor / multi-factor authentication

Login requiring more than one type of proof

Push

Sending configuration or apps from the MDM to devices automatically

IMEI

International Mobile Equipment Identity — a phone's unique hardware identifier

Over-the-air (OTA) sync

Synchronising data wirelessly, without cables

Cellular data

Mobile network data, often limited or charged by contract

Account settings

Where email and cloud services are added to a device

Microsoft Exchange

Microsoft's corporate email, calendar and contacts service

# Review questions

1. What does an MDM allow an administrator to do?
2. What does BYOD stand for, and what's its alternative name?
3. Give one benefit and two challenges of BYOD.
4. What does COPE stand for, and who owns and controls the device?
5. How does CYOD differ from COPE?
6. How does an MDM protect both company data and user privacy on a personal phone?
7. Name two device features the lesson says an MDM can disable.
8. What screen-lock policy might an organisation enforce?
9. Why might security teams require MFA on mobile devices in particular?
10. Which field in the MDM console is the device's unique identifier?
11. Name three settings on an MDM Restrictions tab.
12. Why is over-the-air synchronisation important for mobile devices?
13. An organisation's cellular plan has a small data allowance. How should synchronisation be configured?
14. Can sync settings for a Microsoft Exchange account differ from a Google Mail account on the same phone? Give an example.

# Answer key

1. __Manage all mobile devices centrally__: set policies, allow or forbid apps, enable or disable features, enforce security, and push configuration such as email.
2. __Bring your own device;__ also called bring your own technology.
3. __Benefit:__ the employee carries one device. __Challenges (any two):__ protecting company data; keeping personal data private; deciding what happens to data on upgrade, trade-in or loss.
4. __Corporate owned, personally enabled.__ The company owns the device and has complete control; personal use is often allowed.
5. __With CYOD, the user chooses from a selection of approved devices;__ with COPE, the company chooses. Both are company-owned.
6. __It partitions the device into a work area__ (managed, protected by policy) __and a personal area__ (private to the user).
7. __Any two of:__ camera, GPS (the restrictions tab also covers FaceTime, voice dialling and Siri).
8. __A mandatory screen lock unlocked with a PIN__ (or other access method).
9. __Mobile devices are used outside the company and are easily lost__, so extra authentication protects company access.
10. __The IMEI.__
11. __Any three of:__ camera, FaceTime, voice dialling, Siri, security options, printing options, application options.
12. __Devices are rarely connected to a central facility__, so over-the-air sync provides backup — and restore if the device fails, is damaged or is replaced.
13. __Sync large data over Wi-Fi only; allow only small, essential data__ (e.g. calendar and contacts) over cellular; limit automatic downloads and app sizes over mobile; check the provider contract.
14. __Yes.__ For example, Exchange syncs mail, contacts and calendars, while Google Mail syncs mail only.
