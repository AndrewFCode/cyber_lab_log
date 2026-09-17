---
title: Try Hack Me- Pre Security
description: "Chaetsheet for Pre Security "
draft: false
updated: 2026-09-17
category: tryhackme
pinned: false
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

**Cloud Computing Fundamentals**

## **Section 3: Operating Systems Basics**

**Windows Basics**

**Linux CLI Basics**

**Windows CLI Basics**

**Operating System Security**