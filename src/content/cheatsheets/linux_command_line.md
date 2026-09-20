---
title: Linux Command Line
description: "These are the abbreviations I have learnt. "
draft: false
updated: 2026-09-15
category: Linux
pinned: false
kind: resource
resource: "The Linux Command Line"
module: "Commands"
moduleOrder: 1
---
Linux Command Line is one of the more interesting topics I have engaged with so far. I think it is because I sort of understand the basics from previous dipping of interest into the area.   

Currently I am working my way through The Linux Command Line by Schotts. All definitions come through here and I am working through this in accordance to my cyber roadmap which I created using AI to help me focus on my studies. 

Week 1: Ending 30 August (Chapter 1)

To open a terminal it will depend what hardware your using. If using windows you cannot use the powershell and instead will need to download a linux command line. 

For me I downloaded Ubuntu. 


| Command | What It Does |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| date | Displays current date and time |
| uptime | Displays how long the system has been running and the average number of processes running over various periods of time |
| exit | Ends session. Closes terminal |


Week 2: Ending 6 September (Chapter 2)


| Command | What It Does |
| ------- | --------------------------------------- |
| pwd | Print name of current working directory |
| cd | Change directory |
| ls | List directory contents |



| Pathname | Definition | Example |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Absolute | Begins with the root directory and follows the tree branch by branch until the path to the desired directory or file is completed | [me@linuxbox ~]$ cd /usr/bin |
| Relative | Starts from the working directory. |  |


Different ways to use cd:


| cd | Action | Example |
| --- | --------------------------------------------- | ---------------------------------------------------- |
| . | Refers to the working directory | cd /usr/bin~~cd ./bin~~++**cd bin (./) Implied**++ |
| .. | Refers to the parent of the working directory |  |


Shortcuts for cd


|  |  |  |
| -------------- | ---------------------------------------------------------------- | --- |
| cd | Change working directory to home |  |
| cd - | Change working directory to the previous working directory |  |
| cd "user_name" | Changes the working directory to the home directory of user_name |  |


**Week Ending 13 September (Chapter 3-4)**


| Command | What it does |
| ------- | ------------------------------------ |
| ls ~ | List multiple directories |
| file | Determine file type |
| less | View file contents |
| cp | Copy files & directories |
| mv | Move or rename files and directories |
| mkdir | Create directories |
| rm | Remove files & directories |
| ln | Create hard &symbolic links |


**Options & Arguments**

Commands are often followed by one or more options that modify their **behaviour.**

Further by one or more arguments, the **items** upon which the **command acts**.

**Common ls options**


| Short Hand | Long Option | What it Does |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------- |
| -a | --all | List all files including ones that start with a period. |
| -A | --almost-all | Like -a option except it does not list current directory & parent directory |
| -d | --directory | If a directory is listed it will list the contents of that directory |
| -F | --classify | This option will append an indicator character to the end of each listed name. |
| -h | --human-readable | In long format listings , display file sizes in human-readable format rather than in bytes. |
| -l |  | Displays results in long format |
| -r | --reverse | Displays results in reverse order. (Normally in ascending alphabetical order) |
| -S |  | Sorts results by file size |
| -t |  | Sorts by modification time. |


**A Look At Longer Format**

```
-rw--r-r-- 1 root root 3576296 2017-04-03 11:05 Experience ubuntu.ogg
```


| Field | Meaning |
| --------------------- | ---------------------------------------------------------------------- |
| -rw-r--r-- | Access rights to the file. First character indicates the type of file. |
| 1 | File's number of hard links |
| root | Username of files owner |
| root | Name of the group that owns the file |
| 3576296 | Size of file in bytes |
| 2017-04-03 11:05 | Date & time of the last file modification |
| Experience ubuntu.ogg | Name of the file |



| Character | Type of File |
| --------- | ------------ |
| - | Regular file |
| d | Directory |



| Command | Action |
| ------------------ | ----------------------------------------------------- |
| PAGE UP or b | Scroll back one page |
| PAGE DOWN or space | Scroll forward one page |
| Up arrow | Scroll up one line |
| Down arrow | Scroll down one line |
| G | Move to the end of the text file |
| 1G or g | Move to the beginning of the text file |
| /characters | Search forward to the next occurrence of characters |
| n | Search for the next occurrence of the previous search |
| h | Display help screen |
| q | Quit less |



|  |  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| / | The root of the filesystem tree; everything else hangs off it |
| /bin | Essential binaries the system needs to boot and run |
| /boot | Kernel image, initial RAM disk, and boot loader config (e.g. GRUB) |
| /dev | Device nodes — Linux treats hardware as files here |
| /etc | System-wide configuration files and startup scripts (all plain text) |
| /home | One subdirectory per user for their personal files; normal users can only write in their own |
| /lib | Shared libraries used by the core programs in `/bin` and `/sbin` |
| /lost+found | Where `fsck` puts recovered fragments after a partially corrupted filesystem is repaired |
| /media | Auto-mount points for removable media on modern systems |
| /mnt | Mount points for manually mounted devices (older convention) |
| /opt | Optional/add-on commercial software packages |
| /proc | Virtual filesystem the kernel exposes — not real files on disk, but a window into kernel state |
| /root | The root user's home directory |
| /sbin | System binaries, generally reserved for the superuser |
| /tmp | Scratch space for temporary files; often wiped at boot |
| /usr | The bulk of installed software and support files for regular users |
| /usr/bin | Executables installed by your distribution — by far the biggest bin directory |
| /usr/lib | Shared libraries for the programs in `/usr/bin` |
| /usr/local | Software built or installed locally rather than by the distro; `/usr/local/bin` is the usual spot |
| /usr/sbin | Additional system administration binaries |
| /usr/share | Architecture-independent data: icons, fonts, man pages, default configs, wallpaper |
| /usr/share/doc | Documentation shipped with installed packages |
| /var | Data that changes over time — databases, mail spools, caches |
| /var/log | Log files recording system activity; `/var/log/messages` or `/var/log/syslog` is the usual first stop |
| -/.config & ~/.local | These two directories are located in the home directory of each desktop user. ,They are used to store user-specific config and programme state data for desktop apps |


**Symbolic & Hard Links**


|  |  |  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Symbolic | A sign on a post that says "house is that way →". Follow the sign and you get to the house. But knock the house down and the sign is still standing there, pointing at an empty field. |  |
| Hard | A second front door to the same house. Both doors are real doors. Brick up one and you still walk in through the other. Your stuff is fine — it was never attached to the door. |  |


**Wildcard**

Makes the commands more powerful. These special characters help rapidly specify group of filenamrs.


| Wildcard | Meaning |
| ------------------------------ | ---------------------------------------------------------------- |
| * | Matches any characters, including none |
| ? | Matches any single character |
| [characters] | Matches any character that is a member of the set characters |
| [!characters] or [^characters] | Matches any character that is not a member of the set characters |
| [[:class:]] | Matches any character that is a member of the specified class |


Commonly Used Character Classes


| Character Class | meaning |
| --------------- | ---------------------------------- |
| [:alnum:] | Matches any alphanumeric character |
| [:alpha:] | Matches any alphabetic character |
| [:digit:] | Matches any numeral |
| [:lower:] | Matches any lowercase letter |
| [:upper:] | Matches any uppercase letter |



|  |  |
| ---------------------- | ------------------------------------------------------------------------- |
| * | All files |
| g* | Any file beginning with g |
| b*.txt | Any file beginning with b followed by any characters and ending with .txt |
| Data??? | Any file beginning with Data followed by exactly three numerals |
| [abc]* | Any file beginning with either a, a b, or a c |
| BACKUP.[0-9][0-9][0-9] | Any file beginning with BACKUP, followed by exactly three numerals |
| [[:upper:]]* | Any file beginning with an uppercase letter |
| [![:digit:]]* | Any file not beginning with a numeral |
| *[[:lower:]123] | Any file ending with a lowercase letter or the numerals 1,2 or 3 |


**cp Options**


| Option | Long Option | Meaning |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -a | --archive | Copy the files and directories and all of their attributes, including ownerships and permissions. |
| -i | --interactive | Before overwriting an existing file, prompt the user for confirmation |
| -r | --recursive | Recursively copy directories and their contents |
| -u | --update | When copying files from one directory to another, only copy files that either don't exist or are newer than the existing corresponding files, in the destination directory. |
| -v | --verbose | Display informative messages as the copy is performed |


**cp Examples**


| Command | Reults |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cp file1 file2 | Copy file1 to file2. If file2 exists, its overwritten with the contents of file1. If file2 does not exist, it is created. |
| cp -i file1 file2 | The same as command up above except that if file2 exists, the user is prompted before its overwritten. |
| cp file1 file2 dir1 | Copy file1 & file2 into directory dir1. The directory dir1 must already exist. |
| cp dir1/* dir2 | Using a wildcard, copy all files in dir1 into dir2. The directory dir2 must already exist. |
| cp -r dir1 dir2 | Copy the contents of directory 1 dir1 to directory 2 dir2. If directory dir2 does not exist, it is created and, after the copy will contain the same contents as dir1. |


**mv Options**


| Option | Long Option | Meaning |
| ------ | ------------- | ------------------------------------------------------------------------------------------------- |
| -i | --interactive | Prompt before overwriting an existing file. Without it, `mv` overwrites silently. |
| -u | --update | Move only when the source is newer than the destination file, or when no destination file exists. |
| -v | --verbose | Show each move as it happens. |


**mv Examples**


| Command | Meaning |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mv file1 file2 | Moves `file1` to `file2`. If `file2` already exists it's replaced by `file1`, and `file1` no longer exists afterwards. If `file2` doesn't exist, this is effectively a rename. |
| mv -i file1 file2 | Same as above, except you're asked to confirm before an existing `file2` gets overwritten. |
| mv file1 file2 dir1 | Moves both `file1` and `file2` into the directory `dir1`, which must already exist. |
| mv dir1 dir2 | If `dir2` exists, `dir1` is moved inside it. If `dir2` doesn't exist, `dir1` is simply renamed to `dir2`. |


**rm Option**


| Option | Long Option | Meaning |
| ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| -i | --interactive | Prompt for confirmation before deleting each file. Without it, `rm` deletes silently. |
| -r | --recursive | Delete directories along with everything inside them, including subdirectories. Required to remove a non-empty directory. |
| -f | --force | Ignore files that don't exist and skip all prompts. Overrides `-i`. |
| -v | --verbose | Show each deletion as it happens. |


**rm Examples**


| Command | Results |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| rm file1 | Deletes `file1` silently. |
| rm -i file1 | Asks for confirmation first, then deletes `file1`. |
| rm -r file1 dir1 | Deletes `file1`, then deletes `dir1` along with all of its contents. |
| rm -rf file1 dir1 | Same as above, but if `file1` or `dir1` doesn't exist, `rm` says nothing and carries on rather than complaining. |


**ln- Create Links**

Used to create both hard and symbolic links.

Hard Link

```
ln file link
```

Soft Link

```
ln -s item link
```

**Week 4: Ending 20 September (Chapter 5-6)**


| Command | What it does |
| ------- | --------------------------------------------------------------- |
| type | Indicate how a command name is interpreted |
| which | Display which executable programme will be executed |
| help | Get help for shell builtins |
| man | Display a command's manual page |
| apropos | Display a list of appropriate commands |
| info | Display a command's info entry |
| whatis | Display one-line manual page descriptions |
| alias | Create an alias for a command |
| cat | Concatenate files |
| sort | Sort lines of text |
| uniq | Report or omit repeated lines |
| grep | Print lines matching a pattern |
| wc | Print newline, word, and byte counts for each file |
| head | Output the first part of the file |
| tail | Output the last part of the file |
| tee | Read from standard input and write to standard output and files |


**What exactly are commands?**


|  |  |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An Executable Programme | Programmes can be compiled binaries, such as programmes written in C & C++, or programmes written in scripting languages, such as shell, perl, python, ruby and so on |
| A command built into the shell itself | bash supports a number of commands internally called shell builtins. |
| A shell function | Miniature shell scripts incorporated into the environment |
| An alias | Commands we can define ourselves, built from other commands |


**Identifying Commands**

*type- Display a commands type* 

- This is a builtin command that displays the kind of command the shell will execute

*which- Displays an executable's location*

- Sometime there is m ore than one version of an executable programme installed on the system
- This is not common on desktops but more on larger servers.

**Getting a command's documentation**

*help- Get help for shell builtins*

- bash has a built in facility available for each of the shell builtins

> A quick note: When square brackets appear in the description of a command's syntax, they indicate optional items. A vertical bar character indicates mutually exclusive items. ~Take the previous cd command, for example...

```
cd [-L][-P[-e]]] [dir]
```

> This notation says that the command cd may be followed optionally by either a -L or a -P; further, if the -P option is specified, the -e option may be included followed by the optional argument dir.
>
> While the output of help for the cd commands is concise and accurate, it is by no means tutorial, and as we see.

*--help- Display Usage Information*

- Many executable programmes support a --help option that displays a description of the command's supported syntax and options.

*man- Displays a Programmes Manual Page*

- Most executable programmes intended for command line use provide a formal piece of documentation called a manual or man pages. A special paging programme called man is used to view them.

**Man Pages Structure**

- A title (the page's name)
- A synopsis of the command's syntax
- A description of the command's purpose
- A listing and description of each of the commands options

**Man Page Organisation**


|  |  |
| --- | ---------------------------------------------- |
| 1 | User commands |
| 2 | Programming interfaces for kernal system calls |
| 3 | Programming interfaces to the C library |
| 4 | Special files such as device nodes and drivers |
| 5 | File formats |
| 6 | Games and amusements such as screen savers |
| 7 | Miscellaneous |
| 8 | System administration commands |


Example

```
man 5 passwd
```

This will display the man page describing the file format of the /etc/passwd file

*apropos- Display appropriate commands*

- It is possible to search the list of man pages for possible matches based on a search term.

*whatis- Display one-line manual page description*

- Displays the name and a one-line description of a man page.

*info- Displays a programmes info entry.*

- The GNU project provides an alternative to man pages for their programmes.

**info Commands**


| Command | Action |
| -------------------- | --------------------------------------------------------------------------- |
| ? | Display command help |
| PAGE UP or BACKSPACE | Display previous page |
| PAGE DOWN or SPACE | Display next page |
| n | Next: Display the next node |
| p | Previous: Display the previous node |
| u | Up: Display the parent node of the currently displayed node, usually a menu |
| ENTER | Follow the hyperlink at the cursor location |
| q | Quit |


*README and Other Programme Documentation Files*

- Many of the packages installed on the system have documentation files reading in the usr/share/doc directroy

**Creating Our Own Commands with alias**

- It is possible to put more than one command on a line by separating each command with a semicolon.

```
command1; command2; command3...

cd /usr; ls; cd -
```

- First we change the directory to /usr
- Then list the directory
- Then return to the original directory. 

