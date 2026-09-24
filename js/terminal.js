// Scanline toggle switch
const crtBtn = document.getElementById('crt-toggle');
if (crtBtn) {
  crtBtn.addEventListener('click', () => {
    document.body.classList.toggle('no-scanlines');
    const isActive = !document.body.classList.contains('no-scanlines');
    crtBtn.textContent = `CRT: ${isActive ? 'ON' : 'OFF'}`;
  });
}