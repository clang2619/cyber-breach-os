// --- Game State & Mission Controller ---
const gameState = {
  currentStage: 0, // 0: Firewall, 1: Database, 2: Core AI, 3: Completed
  currentTarget: null,
  trace: 0,
  traceInterval: null,
  isGameOver: false,
  stages: [
    {
      id: 'firewall',
      name: 'GATEWAY FIREWALL',
      ip: '10.0.0.5',
      requiredCmd: 'sniff',
      objective: 'Intercept packet stream on exposed port to extract the bypass token.',
      hint: 'Run "portscan 10.0.0.5", then analyze packet traffic with "sniff 8080".'
    },
    {
      id: 'database',
      name: 'ENCRYPTED DATABASE',
      ip: '10.0.0.12',
      requiredCmd: 'inject',
      objective: 'Bypass SQL query sanitization to dump encrypted admin key.',
      hint: 'Run "inject <payload>" (e.g., \' OR 1=1 --) to extract credentials.'
    },
    {
      id: 'mainframe',
      name: 'CORE AI MAINFRAME',
      ip: '10.0.0.99',
      requiredCmd: 'override',
      objective: 'Run kernel frequency override sequence to take root control.',
      hint: 'Type "override" and align the resonance frequencies.'
    }
  ]
};

// UI Elements
const traceBar = document.getElementById('trace-bar');
const tracePercentage = document.getElementById('trace-percentage');
const targetIndicator = document.getElementById('target-indicator');
const missionInfo = document.getElementById('mission-info');

// Update Telemetry Panel
function updateMissionUI() {
  if (gameState.currentStage >= gameState.stages.length) {
    missionInfo.innerHTML = '<span class="highlight">ALL TARGETS COMPROMISED. SYSTEM ROOT GRANTED.</span>';
    targetIndicator.textContent = 'TARGET: COMPLETE';
    return;
  }
  const stage = gameState.stages[gameState.currentStage];
  missionInfo.innerHTML = `
    <strong>TARGET:</strong> ${stage.name} (${stage.ip})<br>
    <strong>OBJECTIVE:</strong> ${stage.objective}<br>
    <span style="opacity: 0.7;"><strong>HINT:</strong> ${stage.hint}</span>
  `;
}

// Intrusion Trace Engine
function startTraceTicker() {
  if (gameState.traceInterval) clearInterval(gameState.traceInterval);
  gameState.traceInterval = setInterval(() => {
    if (!gameState.currentTarget || gameState.isGameOver) return;

    adjustTrace(1);
  }, 1200);
}

function adjustTrace(amount) {
  if (gameState.isGameOver) return;
  gameState.trace = Math.min(100, Math.max(0, gameState.trace + amount));
  traceBar.style.width = `${gameState.trace}%`;
  tracePercentage.textContent = `${gameState.trace}%`;

  if (gameState.trace >= 75) {
    traceBar.style.backgroundColor = '#ff3344';
    traceBar.style.boxShadow = '0 0 8px #ff3344';
    if (typeof sfx !== 'undefined') sfx.playAlert();
  }

  if (gameState.trace >= 100) {
    triggerLockdown();
  }
}

function triggerLockdown() {
  gameState.isGameOver = true;
  clearInterval(gameState.traceInterval);
  if (typeof sfx !== 'undefined') sfx.playError();
  printBlank();
  printLine('!!! INTRUSION COUNTERMEASURES TRIGGERED !!!', 'alert-msg');
  printLine('CONNECTION FORCIBLY TERMINATED BY REMOTE HOST.', 'alert-msg');
  printLine('Type <span class="highlight">reboot</span> to purge trace logs and reconnect.', 'alert-msg');
}

// Hook Game Commands directly into the terminal's commands object
function registerHackingCommands() {
  commands.connect = (args) => {
    if (!args[0]) {
      printLine('Usage: connect <target_ip>', 'alert-msg');
      return;
    }
    const ip = args[0];
    const targetStage = gameState.stages[gameState.currentStage];

    if (targetStage && ip === targetStage.ip) {
      gameState.currentTarget = targetStage;
      targetIndicator.textContent = `TARGET: ${targetStage.ip}`;
      printLine(`Establishing SSH handshake with ${ip}...`, 'highlight');
      printLine(`Connected to ${targetStage.name}. Warning: Trace active!`);
      startTraceTicker();
    } else {
      printLine(`Host unreachable: ${ip}. Run "probe" to map live nodes.`, 'alert-msg');
      adjustTrace(5);
    }
  };

  commands.probe = () => {
    printLine('Scanning subnet 10.0.0.0/24 for exposed IP interfaces...', 'highlight');
    gameState.stages.forEach(st => {
      printLine(`  [ONLINE] ${st.ip} - ${st.name}`);
    });
    printLine('Use "connect <ip>" to initiate exploit vector.');
  };

  commands.portscan = (args) => {
    if (!gameState.currentTarget) {
      printLine('Error: No target connected. Use "connect <ip>" first.', 'alert-msg');
      return;
    }
    printLine(`SYN Stealth Scan on ${gameState.currentTarget.ip}...`);
    if (gameState.currentTarget.id === 'firewall') {
      printLine('PORT 22/tcp   OPEN  OpenSSH 8.2p1');
      printLine('PORT 80/tcp   OPEN  nginx/1.18.0');
      printLine('PORT 8080/tcp OPEN  Cleartext-Auth-Daemon [VULNERABLE]');
      printLine('Use <span class="highlight">sniff 8080</span> to analyze ingress packets.');
    } else if (gameState.currentTarget.id === 'database') {
      printLine('PORT 3306/tcp OPEN  MySQL 5.7.34 [Unauthenticated query vulnerability]');
      printLine('Use <span class="highlight">inject \' OR 1=1 --</span> to bypass auth.');
    } else {
      printLine('PORT 9000/tcp OPEN  Core-AI Neural Link');
      printLine('Use <span class="highlight">override</span> to execute bypass sequence.');
    }
  };

  commands.sniff = (args) => {
    if (!gameState.currentTarget || gameState.currentTarget.id !== 'firewall') {
      printLine('Sniffer error: Active target does not permit raw socket inspection.', 'alert-msg');
      return;
    }
    printLine('Capturing frames on interface eth0:8080...');
    printLine('[FRAME 402] SRC 10.0.0.1 -&gt; DST 10.0.0.5 | PAYLOAD: "AUTH_BEARER: TOKEN_K7_BYPASS"');
    printLine('Bypass token identified! Run <span class="highlight">bypass TOKEN_K7_BYPASS</span> to disable firewall.');
  };

  commands.bypass = (args) => {
    if (args[0] === 'TOKEN_K7_BYPASS' && gameState.currentTarget?.id === 'firewall') {
      printLine('FIREWALL ACCESS RULE GRANTED. Security barrier disabled!', 'highlight');
      if (typeof window.setNodeState === 'function') {
        window.setNodeState('firewall', 'compromised');
        window.setNodeState('database', 'targeted');
      }
      gameState.currentStage++;
      gameState.currentTarget = null;
      gameState.trace = Math.max(0, gameState.trace - 25);
      updateMissionUI();
    } else {
      printLine('Invalid bypass token.', 'alert-msg');
      adjustTrace(10);
    }
  };

  commands.inject = (args) => {
    if (!gameState.currentTarget || gameState.currentTarget.id !== 'database') {
      printLine('SQL injection handler requires an active database node connection.', 'alert-msg');
      return;
    }
    const payload = args.join(' ');
    if (payload.includes('1=1') || payload.includes("' OR '1'='1")) {
      printLine('SQL Query: SELECT * FROM admin_creds WHERE user = "" OR 1=1; --');
      printLine('SUCCESS: Authentication bypassed! Database dumped.', 'highlight');
      if (typeof window.setNodeState === 'function') {
        window.setNodeState('database', 'compromised');
        window.setNodeState('mainframe', 'targeted');
      }
      gameState.currentStage++;
      gameState.currentTarget = null;
      gameState.trace = Math.max(0, gameState.trace - 25);
      updateMissionUI();
    } else {
      printLine('SQL syntax error or query rejected by DBMS.', 'alert-msg');
      adjustTrace(15);
    }
  };

  commands.override = () => {
    if (!gameState.currentTarget || gameState.currentTarget.id !== 'mainframe') {
      printLine('Override sequence requires direct connection to Core AI Mainframe.', 'alert-msg');
      return;
    }
    printLine('CORE AI SUBVERTED. ROOT PRIVILEGES UNLOCKED!', 'highlight');
    if (typeof window.setNodeState === 'function') {
      window.setNodeState('mainframe', 'compromised');
    }
    gameState.currentStage++;
    gameState.currentTarget = null;
    updateMissionUI();
  };

  commands.reboot = () => {
    gameState.trace = 0;
    gameState.isGameOver = false;
    gameState.currentTarget = null;
    traceBar.style.width = '0%';
    traceBar.style.backgroundColor = 'var(--term-green)';
    tracePercentage.textContent = '0%';
    targetIndicator.textContent = 'TARGET: DISCONNECTED';
    printLine('System reboot complete. In-memory trace artifacts cleared.', 'highlight');
  };
}

// Initialise game on load
registerHackingCommands();
updateMissionUI();