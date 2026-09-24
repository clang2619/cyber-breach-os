# ⚡ CYBER-BREACH OS // v2.4

> A retro cyberpunk terminal intrusion simulator and puzzle game built with vanilla web technologies.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🖥️ Overview

**CYBER-BREACH OS** puts the player behind the keyboard of an offensive security terminal. The objective is to map a target subnet, bypass remote security barriers, extract database credentials, and phase-lock an AI kernel before active intrusion countermeasures sever the connection.

The project relies entirely on **vanilla JavaScript, HTML5 Canvas, and CSS** with zero external runtime dependencies or asset libraries.

---

## ✨ Key Features

- **Retro CRT Aesthetic:** Custom CSS scanlines, phosphor bloom, corner vignette, and an interactive scanline toggle for accessibility.
- **Procedural Web Audio Engine:** Realistic mechanical typing clicks, system buzzes, and alert sirens generated programmatically via the browser's built-in `AudioContext`—no external `.mp3` files required.
- **Dynamic Network Topology Radar:** Real-time HTML5 Canvas displaying target nodes, connection states, and a rotating phosphor sweep beam.
- **Interactive Shell Engine:** Command parser featuring shell history navigation (`ArrowUp` / `ArrowDown`), real-time execution logging, and custom styling.
- **Progressive Cyber Mini-Games:**
  - `probe` & `portscan`: Network mapping and port enumeration.
  - `sniff`: Packet inspection to intercept cleartext bearer authentication tokens.
  - `inject`: SQL injection authentication bypass payloads.
  - `override` & `tune`: Dynamic 25-second harmonic frequency phase-alignment sequence.
- **Intrusion Trace Meter:** Real-time ticker accelerating during alarm events or misconfigurations, ending in remote host lockdown if unmanaged.

---

## 🕹️ Command Reference

| Command | Usage | Description |
| :--- | :--- | :--- |
| `help` | `help` | Lists available terminal subsystem directives |
| `probe` | `probe` | Scans the subnet (`10.0.0.0/24`) for live hosts |
| `connect` | `connect <ip>` | Establishes a remote shell session with a target IP |
| `portscan` | `portscan` | Performs a SYN stealth scan on the active target |
| `sniff` | `sniff <port>` | Inspects unencrypted frame streams on raw interfaces |
| `bypass` | `bypass <token>` | Disables firewall rules using harvested auth credentials |
| `inject` | `inject <payload>` | Submits SQL injection bypass vectors to database instances |
| `override` | `override` | Initiates the AI Mainframe kernel frequency lock bypass |
| `tune` | `tune <ch> <freq>` | Calibrates harmonic resonance channels (1, 2, or 3) |
| `status` | `status` | Reports current connection telemetry and VPN status |
| `clear` | `clear` | Clears the active terminal output buffer |
| `reboot` | `reboot` | Purges trace signatures and resets network session |

---

## 🛠️ Project Structure

```text
cyber-breach-os/
│
├── index.html        # Main dashboard markup, CRT overlay, and split layout
├── style.css         # Phosphor theme, CRT scanlines, and typography styling
├── js/
│   ├── audio.js      # Procedural sound synthesizer (Web Audio API)
│   ├── terminal.js   # Shell parser, typing events, and command history
│   ├── network.js    # Canvas topology visualizer and radar sweep loop
│   └── game.js       # Game progression, trace timer, and exploit validators
└── README.md         # Project documentation and guide
