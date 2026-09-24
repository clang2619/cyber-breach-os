// --- Network Topology Radar Canvas ---
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

// Node Definitions
const networkNodes = [
  { id: 'gateway', label: 'GW: 10.0.0.1', x: 60, y: 120, state: 'compromised' },
  { id: 'firewall', label: 'FW: 10.0.0.5', x: 140, y: 60, state: 'targeted' },
  { id: 'database', label: 'DB: 10.0.0.12', x: 220, y: 170, state: 'locked' },
  { id: 'mainframe', label: 'AI: 10.0.0.99', x: 290, y: 90, state: 'locked' }
];

// Connections between nodes
const networkLinks = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 }
];

let radarAngle = 0;

function drawNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw subtle background grid
  ctx.strokeStyle = 'rgba(34, 242, 89, 0.08)';
  ctx.lineWidth = 1;
  const gridSize = 20;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // 2. Draw connections between nodes
  networkLinks.forEach(link => {
    const start = networkNodes[link.from];
    const end = networkNodes[link.to];

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);

    if (start.state === 'compromised' && end.state === 'compromised') {
      ctx.strokeStyle = '#22f259';
      ctx.setLineDash([]);
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = 'rgba(34, 242, 89, 0.3)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
    }
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // 3. Draw nodes
  networkNodes.forEach(node => {
    // Outer glow ring
    ctx.beginPath();
    ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);

    if (node.state === 'compromised') {
      ctx.fillStyle = '#22f259';
      ctx.shadowColor = '#22f259';
      ctx.shadowBlur = 10;
      ctx.fill();
    } else if (node.state === 'targeted') {
      ctx.fillStyle = '#138833';
      ctx.shadowColor = '#22f259';
      ctx.shadowBlur = 6;
      ctx.fill();

      // Pulsing target beacon
      const pulseSize = 10 + Math.sin(Date.now() / 200) * 3;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 242, 89, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      ctx.fillStyle = '#0f2914';
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.strokeStyle = 'rgba(34, 242, 89, 0.4)';
      ctx.stroke();
    }

    // Node labels
    ctx.shadowBlur = 0;
    ctx.font = '10px "Share Tech Mono", monospace';
    ctx.fillStyle = node.state === 'locked' ? 'rgba(34, 242, 89, 0.5)' : '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(node.label, node.x, node.y + 20);
  });

 // 4. Radar sweep beam & trailing phosphor shadow
  radarAngle += 0.02;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const sweepRadius = 140;

  // Draw trailing phosphor fan
  const trailAngle = 0.35; // sweep arc width
  const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, sweepRadius);
  gradient.addColorStop(0, 'rgba(34, 242, 89, 0.25)');
  gradient.addColorStop(1, 'rgba(34, 242, 89, 0.02)');

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, sweepRadius, radarAngle - trailAngle, radarAngle);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw main leading sweep line (bolder and darker green glow)
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + Math.cos(radarAngle) * sweepRadius,
    centerY + Math.sin(radarAngle) * sweepRadius
  );
  ctx.strokeStyle = 'rgba(34, 242, 89, 0.65)';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#22f259';
  ctx.shadowBlur = 4;
  ctx.stroke();
  ctx.shadowBlur = 0; // reset blur for next frame

  // Loop the animation
  requestAnimationFrame(drawNetwork);
}

// Start visualizer animation loop
drawNetwork();

// Export helper to update a node's visual state
window.setNodeState = (nodeId, newState) => {
  const node = networkNodes.find(n => n.id === nodeId);
  if (node) {
    node.state = newState;
  }
};