// --- Terminal State & Elements ---
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const terminalForm = document.getElementById('terminal-form');
const crtBtn = document.getElementById('crt-toggle');

// Command History Buffer
const commandHistory = [];
let historyIndex = -1;

// --- Scanline Display Toggle ---
if (crtBtn) {
  crtBtn.addEventListener('click', () => {
    document.body.classList.toggle('no-scanlines');
    const isActive = !document.body.classList.contains('no-scanlines');
    crtBtn.textContent = `CRT: ${isActive ? 'ON' : 'OFF'}`;
  });
}

// --- Terminal Print Utilities ---
function printLine(text, className = '') {
  const line = document.createElement('div');
  line.className = `log-entry ${className}`.trim();
  line.innerHTML = text;
  terminalOutput.appendChild(line);
  // Auto-scroll to the latest log line
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function printBlank() {
  printLine('&nbsp;');
}

// --- Built-in Base Commands ---
const commands = {
  help: () => {
    printLine('=== AVAILABLE SUBSYSTEM COMMANDS ===', 'highlight');
    printLine('  <span class="highlight">help</span>       - Displays available command directives');
    printLine('  <span class="highlight">clear</span>      - Clears active terminal screen buffer');
    printLine('  <span class="highlight">status</span>     - Check current connection & intrusion trace');
    printLine('  <span class="highlight">probe</span>      - Scan local subnet for exposed network targets');
    printLine('  <span class="highlight">connect</span>    - Establish remote shell to an IP target');
    printLine('  <span class="highlight">about</span>      - System firmware version info');
    printBlank();
  },

  clear: () => {
    terminalOutput.innerHTML = '';
  },

  about: () => {
    printLine('CYBER-BREACH OS [Kernel v2.4.0-x86_64]', 'highlight');
    printLine('Tactical network exploitation & penetration testing shell.');
    printLine('Unauthorized intrusion into secure systems is strictly simulated.');
  },

  status: () => {
    printLine('System Status: OPERATIONAL');
    printLine('Subnet Gateway: 192.168.1.1 (ONLINE)');
    printLine('Active VPN Tunnel: ENCRYPTED [AES-256-GCM]');
    printLine('Target Node: NONE (use "probe" or "connect <ip>")');
  }
};

// --- Command Execution Dispatcher ---
function executeCommand(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) return;

  // 1. Echo the user's typed command
  printLine(`&gt; ${trimmed}`, 'user-command');

  // 2. Add to history buffer
  commandHistory.push(trimmed);
  historyIndex = commandHistory.length;

  // 3. Parse command & arguments
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // 4. Dispatch
  if (commands[cmd]) {
    commands[cmd](args);
  } else {
    printLine(`zsh: command not found: <span class="highlight">${cmd}</span>. Type <span class="highlight">help</span> for directives.`, 'alert-msg');
  }
}

// --- Event Listeners ---
// Submit on Enter
terminalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = terminalInput.value;
  terminalInput.value = '';
  executeCommand(input);
});

// ArrowUp and ArrowDown for Command History
terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      terminalInput.value = '';
    }
  }
});

// Keep input focused when clicking anywhere inside the terminal pane
document.querySelector('.terminal-pane').addEventListener('click', () => {
  terminalInput.focus();
});