---
title: Try Hack Me- Pre Security
description: "Chaetsheet for Pre Security "
draft: false
updated: 2026-09-17
category: tryhackme
pinned: false
kind: resource
resource: "TryHackMe"
module: "Pre-Security"
moduleOrder: 1
---
## **Section 2: Computer Fundamentals**

**Inside A Computer**


| Part | Function | Place |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| **Central Processing Unit (CPU)** | Processes every program, click, and instruction, and tells the other components what to do. | CPU socket on the motherboard |
| **Random Access Memory (RAM)** | Temporarily stores the data the computer is currently using so it can be accessed quickly. Its contents are lost when the power is switched off. | DIMM slots on the motherboard |
| **Power Supply Unit (PSU)** | Takes electricity from the wall and converts it into the correct voltage for the computer’s internal components. | Mounted at the edge of the chassis |
| **Network Adapter** | Sends and receives data over a network, allowing the computer to connect to other devices and the internet. | Inside the chassis near the rear |
| **Wi-Fi Dongle** | Adds wireless network connectivity to a computer through an external USB connection. | USB port on the outside of the chassis |
| **Input / Output Panel (I/O)** | Provides the external ports used to connect devices, including USB, HDMI, audio, and Ethernet. | Rear opening of the chassis |
| **Solid State Drive (SSD)** | Permanently stores files, applications, and the operating system. It is fast, silent, and has no moving parts. | Mounted directly on the motherboard |
| **Hard Disk Drive (HDD)** | Permanently stores files using spinning magnetic disks and moving parts. | Drive bay inside the chassis |
| **Graphics Card (GPU)** | Creates the visuals shown on the screen and processes images, video, and 3D graphics. | PCIe x16 slot on the motherboard |


**Computer Types**


| **Computer Type** | **Screen and Keyboard** | **Main Purpose** |
| ----------------- | ----------------------- | ------------------------------------------------- |
| Laptop | Yes | Portable everyday computing. |
| Desktop | Yes | Sustained performance at a fixed location. |
| Workstation | Yes | Precision and reliability for professional tasks. |
| Server | No | Providing services to many users over a network. |



| **Type** | **What it is** | **Examples** |
| --------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Smartphone** | Pocket-sized computer optimized for battery life and connectivity | iPhone, Android phone |
| **Tablet** | Touch-first computer with larger screen | iPad, drawing tablet |
| ++**IoT++ device** | Network-connected device with a single purpose | Thermostat, smart doorbell, fitness tracker |
| **Embedded computer** | Computer built into another device | Coffee maker controller, automatic door sensor, ++lamp++ dimmer chip |


> **IoT vs Embedded:** Both can be small and single-purpose. The difference is connectivity. IoT devices connect to a network to report data or receive commands. Embedded computers might not connect to anything; they do their job inside the machine, often for years without anyone knowing they exist.

**Client Server**


|  |  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Service, Client, Server | The browser is the **client** that requests the webpage, and the **server** is the system that serves it. |
| Request & Response | In computer systems, we can say that Alice used a browser (the client) to request a webpage from a server, which then sent the webpage to the client. |
| Protocol | A protocol defines how a client can communicate with a server. This definition includes:- Which commands do the client and server understand. E.g., the **get** command.- How a request is structured. E.g., first the command and then the order.- What syntax is used. E.g., Alice uses the English language.- What response should be given to which type of request. E.g., a request for pizza results in receiving the available pizza.- What response to give to faulty requests. E.g., the server at Luigi's Pizzas says: No pepereonni pizza available |
| Port | A port is used to identify a specific service running on a system. When a client wants to access a service on a server, it must connect using the correct port. |
| DNS | DNS stands for Domain Name Service and works similarly to GPS: when you enter the name of, for example, a website, DNS resolves it to server's location. These location coordinates are called an Internet Protocol (IP) address in computer terms |


**HTTP Commands**

- GET
- POST
- PUT
- DELETE
- PATCH
- HEAD
- OPTIONS
- CONNECT
- TRACE

GET

- We can use this method to retrieve a resource from web server.
  - **Scheme**: Tells us which protocol was used: HTTP or HTTPS.
  - **Host**: Tells us the name of the host we request resources from.
  - **Filename**: Indicates which file we requested from the host. In our request, this is "/", which actually translates to "index.html".
  - **Address**: Displays the IP address where the website is hosted. In our example, we are hosting the website on the same device. That's why the address 127.0.0.1 is shown.
  - **Status**: This field indicates whether the request was successful. In our example, we received a "200 OK" status, which means that the request was successful.

**Visualisation Basics**

Before the concept of virtualization, the rule of thumb in IT was: **“One server = one application.”**

The problems were obvious:

- **High cost**: Buying multiple physical servers is expensive, not just the hardware, but also electricity, cooling, maintenance, and data center space.
- **Low utilization**: Most applications don’t use the server’s full capacity. Many servers stayed at 5–20% usage, wasting ++CPU++, memory, and storage resources.
- **Slow deployment**: Setting up new physical servers could take days or weeks.
- **Hard to scale**: If an application suddenly needed more resources, you often had to buy yet another server.

**Analogy For Virtualisation**


|  |  |
| -------------------- | -------------------------------------------------------------- |
| The building | The physical server |
| The apartments | Lab machines |
| The tenants | Applications or operating systems |
| The building manager | The hypervisor (the software that divides the building safely) |


> Each virtual computer, known as a Lab Machine (VM), **acts as an independent system** with its own operating system, apps, and settings, even though they all share the same physical hardware underneath.

***Hypervisor***

> A **hypervisor** is the core technology behind virtualization. It's the software that creates and manages lab machines.

It is a special piece of software that:

- Divides a physical computer into multiple virtual ones.
- Gives each lab machine its own share of ++CPU++, memory, and storage.
- Keeps everything isolated and safe.
- Manages the lifecycle of lab machines (start, stop, pause, clone, delete).

Hypervisors have two main types of implementation, each of which is used for specific scenarios, from home labs to large data centers:

- **Type 1** hypervisors run directly on the physical hardware, making them fast, efficient, and ideal for servers and professional environments.
- **Type 2** hypervisors run within an existing operating system, making them easier to install and ideal for learning, testing, or small setups.


|  |  |  |
| -------------------- | ---------- | ---------- |
| **Use Case** | **Type 1** | **Type 2** |
| Test Malicious Files |  | X |
| Production Server | X |  |
| Database Server | X |  |
| Software Testing |  | X |
| Kali ++Linux++ |  | X |
| Data Center | X |  |


***Lab Manchines***

A **Lab Machine (++VM++)** is a virtual computer created by the hypervisor.  
Even though it’s virtual, it behaves as a real machine:

- It has its own virtual CPU, ++RAM++, storage, and network.
- It can run any operating system (Windows, Linux, etc.).
- It’s completely isolated from other VMs. This means that if one VM breaks, the others continue to work.

You can deploy VMs on your own computer using tools such as ++**Oracle VirtualBox and VMware Workstation.**++ This type of software acts as a type 2 hypervisor and lets you run multiple operating systems, such as Windows, Linux, and macOS.

Since you have learned what a hypervisor and VM are, let's take some examples where you might need them:

- You need to work on a different ++OS++ like Kali Linux, but you can't buy another whole system, so you install a hypervisor and run a Kali Linux VM on it.
- You want to test whether a file is malicious, so you set up an isolated lab machine to protect your main computer from being infected.

***Containers***

> A ++**container**++ is a lightweight, isolated environment that runs a single application and all the necessary components to support it. Instead of bringing a whole separate operating system, a container borrows the core of the existing system by running on the kernel, which is the part of an operating system that communicates with the hardware and manages resources such as memory and running programs.

Because containers share this kernel, they start quickly and use fewer resources than full lab machines, but it also means they must match the host system’s type. For example, you can’t run a Windows container on a Linux machine.

Containers behave like small, self-contained spaces because:

- They package the application and its dependencies (libraries, tools, versions).
- They share the host’s operating system, so they start almost instantly.
- They remain isolated from each other, so a misbehaving container doesn’t affect the others.
- They can run consistently on any machine, making them perfect for development, testing, and scalable deployments.

The easiest way to deploy containers in a VM is using Docker.

**Cloud Computing Fundamentals**

Cloud Benefits & Characteristics:


|  |  |
| ----------------------------- | ----------------------------------------------------------------------------- |
| **Scalability** | Easily scale up or down as your application's needs change. |
| **On-demand self-service** | Create or remove servers and storage instantly, without waiting for hardware. |
| **Pay only for what you use** | You are charged based on usage, not upfront costs. |
| **Security** | Cloud providers protect the infrastructure with strong security measures. |
| **High availability** | Applications keep running even if part of the system fails. |
| **Global access** | Your application can be accessed by users anywhere in the world. |


**Types Of Cloud Computing**


| **Public Cloud** | Used by startups, websites, and global apps because it is affordable, easy to scale, and requires no infrastructure management. Public cloud services are preferable for nearly every use case. |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Private Cloud** | Used by banks, healthcare, and government organizations because it offers greater control, customization, and compliance for sensitive data. |
| **Hybrid Cloud** | Used by companies like e-commerce platforms that need to keep sensitive data private while still scaling publicly during high demand. |


**Main cloud Service Model**


| **Infrastructure as a Service (++IaaS++)** | You rent basic computing resources such as virtual servers, storage, and networking. You are responsible for managing the operating system and your application, while the provider manages the physical hardware. |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Platform as a Service (++PaaS++)** | The cloud provider manages the infrastructure and the operating system. You focus on building, deploying, and running your application without worrying about servers. |
| **Software as a Service (++SaaS++)** | You use a complete application over the internet. The provider manages everything, and you access the software through a browser or app, for example, Gmail or Zoom. |


**Major Cloud Vendors**


|  |  |
| ------------------------------- | ---------------------------------------------------------------------------- |
| **Microsoft Azure** | A strong competitor, especially in enterprise and hybrid cloud environments. |
| **Google Cloud Platform (GCP)** | Known for powerful data analytics, AI, and machine learning tools. |
| **Alibaba Cloud** | A major player in Asia, offering competitive cloud services globally. |
| **IBM Cloud** | Focuses on hybrid cloud and AI-driven solutions for businesses. |
| **Oracle Cloud** | Focuses on enterprise applications and databases. |


**How Companies Are Using The Cloud**


| **Netflix** | Runs its entire platform on AWS so it can scale globally, stay online during peak demand, and stream content reliably to millions of users at once. |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Spotify** | Uses the cloud to handle millions of songs and users, scaling quickly when new music or features are released. |
| **Instagram** | Relies on the cloud to store massive amounts of photos and videos and deliver them fast to users around the world. |
| **Online stores** | Use the cloud to handle traffic spikes during black friday without buying permanent infrastructure. |


> These companies use the cloud because it lets them scale easily, reduce costs, stay reliable, and **focus on improving their products instead of managing hardware**.

**Basic Cloud Terminology**


|  |  |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **EC2 (Virtual Computer / Server)** | EC2 represents a virtual computer in the cloud. Just like a real computer, it has a CPU and memory (RAM) and can run applications. Whenever you add an EC2 instance, you are adding a computer to your environment. |
| **Instance Type (for example: t2, t3, m5)** | Instance types describe how powerful the virtual computer is. Some have more CPU and RAM and are therefore more expensive. You choose the Instance Type based on your needs, knowing that:- Bigger instances = more power + higher cost- Minor instances = less power + lower cost |


## **Section 3: Operating Systems Basics**

**Windows Basics**

***Logging in & Auth:***

> Before gaining access to the Windows Desktop, you must authenticate (prove your identity) to the system.

Account Types:


| **Guest** | A restricted account intended for temporary access, with minimal permissions and no ability to change system settings |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Standard** | A user account for everyday tasks, such as running applications and changing personal settings, without access to system-wide changes |
| **Administrator** | A privileged account with full control over the system, including software installation, configuration changes, and user management |


***Windows Desktop:***

Two Main Areas:


|  |  |
| ----------- | ----------------------------------------------------------------------------------------------- |
| **Desktop** | The main workspace where files, folders, and shortcuts live |
| **Taskbar** | A control strip that provides access to applications, system tools, settings, and notifications |


*Core Components:* 


|  |  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Desktop icons** | Shortcuts to items like the Recycle Bin, folders, and frequently used applications. It is fully customizable |
| **Start menu** | Primary way to access applications, settings, and power options. From here, you can log out, restart, or power off your machine |
| **Search** | Quickly find applications, files, folders, and system settings by using keywords |
| **Task View** | Allows you to see all currently open windows and quickly switch between them |
| **Pinned Applications and Folders** | Your most used applications and folders can be pinned here |
| **Network and Audio settings** | This section can be customized to suit your needs |
| **Date and Time** | Opens up to a full calendar. Date and time settings can be accessed here, too |
| **Notifications** | Displays computer or application notifications. Network and other settings can also be accessed |


*Built In Tools & Apps:*

> Windows ships with many useful built-in tools and applications that you will use daily

*Task Manager:*

> **Task Manager** is a built-in Windows tool that allows you to monitor what is happening on your system in real time. It allows you to view running applications and background processes, as well as check system performance, including CPU and memory usage

Task Manager has five tabs to help you keep track of your system.

1. **Processes**: Currently running apps and background processes, and their resource usage
2. **Performance**: Graphs and statistics for system resources such as CPU, memory, and network
3. **Users**: Currently logged-in users and used resources 
4. **Details**: A more technical view of running processes, including process IDs (PIDs)
5. **Services**: Windows services and their current status (running or stopped)

*Native Windows Security:*

> Windows offers built-in security tools designed to help protect your system from threats such as malware, insecure applications, and unauthorized network access. These are enabled by default and allow the monitoring and control of your system's security. 

The **Windows Security** application is your central dashboard for managing Windows' built-in protection measures. It is divided into four main sections, each focusing on a different area of system security.


| **Virus & threat protection** | Helps detect and remove malicious software using real-time protection and customizable scans |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| **Firewall & network protection** | Controls incoming and outgoing network traffic to help prevent unauthorized access |
| **App & browser control** | Protects users from potentially unsafe apps, files, and websites |
| **Device security** | Provides hardware-based protections that help secure the system |


*Windows Defender Firewall*

> **Windows Defender Firewall** is a built-in firewall designed to help protect your computer from unauthorized network traffic. It monitors network connections and applies rules that determine whether the connections are allowed or denied. The firewall operates on different network profiles, allowing you to create custom rules or specify applications that are permitted.


| **Domain** | Used when a system is connected to an organization’s domain network |
| ----------- | ------------------------------------------------------------------- |
| **Private** | Intended for trusted networks, such as a home or lab environment |
| **Public** | Used for untrusted networks, such as public Wi-Fi |


**Linux CLI Basics**


| Command | What It Does |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| pwd | Where Am I? |
| ls | What's Around Me |
| ls -l | The output displays important information about the files and directories like file sizes, permissions, dates, and more. |
| ls -al | What's Around Me (Including The Hidden Files) |
| cd | Move Around |
| cd .. | Go Back One Level |
| find | Locate Files Within The System |
| cat | Read The File |
| whoami | Prints Current Username |
| uname -a | What Is The System |
| df -h | Check Disk & Storage Info |


**Windows CLI Basics**

The **terminal** is a text-based interface for interacting with the Windows OS. Instead of clicking windows and folders, you type commands that tell the computer exactly what to do. cyber security professionals use it because:

- It's faster than clicking around
- It gives more control
- Many security tools only run in the terminal


|  |  |
| -------------- | ------------------------------------------------------------------------------------------ |
| cd | Where Am I? |
| dir | What's Around Me? |
| dir /a | Are There Hidden Files? |
| cd folder_name | Move Around |
| dir /s | Find A File On The Disk - /s looks through subfolders |
| type | Prints Content Of Files |
| whoami | Who Am I Logged In As? |
| hostname | What Is The Name Of The Computer? |
| systeminfo | What Version Of Windwes Is This? |
| ipconfig | How Is The Machine Connected To The Network? (Look for an IPv4 Address, A Default Gateway) |
|  |  |
|  |  |


**Operating System Security**

> Computer hardware refers to all the computer parts and peripherals that you can touch with your hand. Hardware includes the screen, the keyboard, the printer, the USB flash memory, and the desktop board. As shown in the figure below, the desktop board contains many components, in particular, a central processing unit (CPU) and memory chips (RAM). Although not shown in the image below, the desktop board is usually connected to a storage device (HDD or SSD).

The Operating System (OS) is the layer sitting between the hardware and the applications and programs you are running.

When we talk about security, we should think of protecting three things:


| Confidentiality | You want to ensure that secret and private files and information are only available to intended persons. |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Integrity | It is crucial that no one can tamper with the files stored on your system or while being transferred on the network. |
| Availability | You want your laptop or smartphone to be available to use anytime you decide to use it. |


Three weaknesses targeted by malicious users:

1. Authentication and Weak Passwords
2. Weak File Permissions
3. Malicious Programs

**Authentication and Weak Passwords**

Authentication is the act of verifying your identity, be it a local or a remote system. Authentication can be achieved via three main ways:

- Something you know, such as a password or a PIN code.
- Something you are, such as a fingerprint.
- Something you have, such as a phone number via which you can receive an SMS message.

**Weak File Permissions**

> ++***Proper security dictates the principle of least privilege***++. In a work environment, you want any file accessible only by those who need to access it to get work done. On a personal level, if you are planning a trip with family or friends, you might want to share all the files related to the trip plan with those going on that trip; you don’t want to share such files publicly. That’s the principle of least privilege, or in simpler terms, “who can access what?”

**Access to Malicious Programs**

> Some types of malicious programs, such as Trojan horses, give the attacker access to your system. Consequently, the attacker would be able to read your files or even modify them.
>
> Some types of malicious programs attack availability. One such example is ransomware. Ransomware is a malicious program that encrypts the user's files. Encryption makes the file(s) unreadable without knowing the encryption password; in other words, the files become gibberish without decryption (reversing the encryption).

