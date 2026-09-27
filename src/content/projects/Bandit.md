---
title: Overthewire
description: Over The Wire Challenges
why: This is the levelling up of ssh and Linux
origin: handwritten
status: active
draft: false
pubDate: 2026-09-27
---
### **Level 0: Connecting To The Network**

```
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

**The Breakdown:**

```
ssh
```

*Secure Shell - Remote Access*

```
-p
```

*Port*

### **Level 1: Find The Read Me File**

```
ls

cat readme

exit
```

**The Breakdown:**

```
ls
```

***List: Lists all files and directories***

```
cat
```

***Concatenate Files - Reads one or more files and copies them to standard output.*** 

```
exit
```

***Exit - Leaves the secure shell.*** 

### **Level 2: Dashed Files**

```
ls

cat ./-
```

```
cat ./-
```

***For this command to work we need to specify that we are looking at the file - inside of the directory otherwise cat - will produce a different outcome.*** 

### **Level 3: --spaces file--** 

```
ls

cat "./--in this file--"

exit
```

```
cat "./--in this file--"
```

***Files that have spaces in them need to be in quotation mark so the shell knows it is a file.*** 

### **Level 4: Outhere Directory** (Hidden File)**

```
ls -a

cd ./outhere

cat :/Hiding_From_You

exit
```

```
ls -a
```

***Lists are folders and files that are marked private as well as all that are not.*** 

### **Level 5: Outhere Directory (Find Inside Multiple Files)** 

```
ls 

cd ./outhere

file ./*

cat ./-correctfile07

exit
```

```
file ./*
```

***This checks each type of the files in the directory***

### **Level 6: Outhere Directory (File With Specific Metrics)** 

```
ls

cd ./outhere

find . type-f -size 1033c ! -executable

cat ./couldbe06/.file01

exit
```

```
find . type-f -size 1033c ! -executable
```

***find - searches the entire file system from the top to  the bottom***

***-type f  will find files only. -size 1033c exactly 1033 bytes. ! -executable excludes executable files***

Level 7: Finding Somewhere On The Server

```
ls -la

find size -33c

find type -f user bandit7 -group bandit6 -size 33c

find type -f user bandit7 -group bandit6 -size 33c 2>/dev/null

cat /var/lib/abcd/info/bandit7.password

exit
```

```
find type -f user bandit7 -group bandit6 -size 33c
```

***type -f: only regular files -user bandit7: Owned by that user. - group bandit6: Owned by that group.*** 

```
2>/dev/null
```

***Means "send error output to the discard bin."***

Level 8: Thousands Of Lines In a File

```
ls -l data.txt

grep millionth data.txt

exit
```

```
grep millionth data.txt
```

**grep: search for lines that match a pattern. - millionth: the text to look for. - data.txt: the file to search in.** 

Level 9: Unique Line

```
sort data.txt

sort data.txt | uniq -u

exit
```

```
sort data.txt
```

***sort: orders the lines so identical ones sit together***

```
sort data.txt | uniq -u
```

**|: *feeds sorts output into the next command. - uniq -u prints only the lines that appear exactly once.*** 

Level 10: Unique Character

```
strings data.txt

strings data.txt | grep =

exit
```

```
strings data.txt
```

***strings: pulls out only printable text from a binary file***

