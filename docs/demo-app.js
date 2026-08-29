// ============================================================
// 🏢 SOC LITE PYMES - Demo Interactivo
// ============================================================

const AlertsDB = [
    { time: "14:32:01", type: "CRITICAL", source: "192.168.1.45", msg: "Brute force detectado - 50 intentos en 2 min", action: "IP bloqueada automáticamente" },
    { time: "14:28:15", type: "HIGH", source: "firewall", msg: "Puerto 3389 (RDP) escaneado desde 45.33.32.156", action: "Regla de firewall actualizada" },
    { time: "14:15:42", type: "MEDIUM", source: "web-server", msg: "SQL Injection attempt en /api/login", action: "Request bloqueado" },
    { time: "13:58:00", type: "LOW", source: "user-activity", msg: "Usuario admin intentó login desde ubicación inusual", action: "MFA requerido" },
    { time: "13:45:22", type: "HIGH", source: "endpoint", msg: "Malware detectado en WORKSTATION-07", action: "Aislamiento de red activado" },
    { time: "13:30:11", type: "MEDIUM", source: "dns", msg: "Consulta a dominio C2 conocido: evil-phishing.com", action: "Dominio bloqueado en DNS" },
    { time: "12:55:33", type: "CRITICAL", source: "database", msg: "Acceso no autorizado detectado a tabla 'usuarios'", action: "Sesión terminada + alerta al admin" },
    { time: "12:20:00", type: "LOW", source: "backup", msg: "Backup diario completado exitosamente", action: "Ninguna" },
];

let socUses = 0;

function initSocDemo() {
    const container = document.getElementById('soc-demo');
    if (!container) return;
    container.innerHTML = `
        <style>
            .soc-demo { background: #0d0d1a; border-radius: 20px; padding: 2rem; margin: 2rem auto; max-width: 900px; border: 1px solid #1a1a3e; }
            .soc-demo h3 { color: #00ff88; margin-bottom: 1rem; font-size: 1.3rem; }
            .soc-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 1.5rem; }
            .soc-stat { text-align: center; padding: 15px 10px; background: #111122; border-radius: 10px; border: 1px solid #222244; }
            .soc-stat .num { font-size: 1.5rem; font-weight: 800; }
            .soc-stat .label { color: #666; font-size: 0.75rem; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
            .soc-alerts { max-height: 400px; overflow-y: auto; }
            .soc-alert { display: grid; grid-template-columns: 80px 90px 1fr auto; gap: 12px; padding: 10px 14px; background: #111122; border-radius: 8px; margin-bottom: 6px; border-left: 3px solid; align-items: center; font-size: 0.85rem; }
            .soc-alert.CRITICAL { border-color: #ff4444; }
            .soc-alert.HIGH { border-color: #ff8c00; }
            .soc-alert.MEDIUM { border-color: #ffbd2e; }
            .soc-alert.LOW { border-color: #00ff88; }
            .soc-alert .time { color: #666; font-family: monospace; }
            .soc-alert .type { font-weight: 700; font-size: 0.75rem; padding: 3px 8px; border-radius: 4px; text-align: center; }
            .soc-alert .type.CRITICAL { background: rgba(255,68,68,0.2); color: #ff4444; }
            .soc-alert .type.HIGH { background: rgba(255,140,0,0.2); color: #ff8c00; }
            .soc-alert .type.MEDIUM { background: rgba(255,189,46,0.2); color: #ffbd2e; }
            .soc-alert .type.LOW { background: rgba(0,255,136,0.2); color: #00ff88; }
            .soc-alert .msg { color: #ccc; }
            .soc-alert .action { color: #888; font-size: 0.8rem; text-align: right; }
            .soc-btn { margin-top: 1rem; padding: 12px 24px; background: linear-gradient(135deg, #00ff88, #00aaff); color: #000; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.3s; width: 100%; }
            .soc-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,255,136,0.3); }
            .soc-uses { text-align: center; color: #666; font-size: 0.8rem; margin-top: 1rem; }
        </style>
        <div class="soc-demo">
            <h3>🏢 SOC Dashboard en Vivo</h3>
            <div class="soc-stats">
                <div class="soc-stat"><div class="num" style="color:#ff4444">2</div><div class="label">Críticos</div></div>
                <div class="soc-stat"><div class="num" style="color:#ff8c00">2</div><div class="label">Altos</div></div>
                <div class="soc-stat"><div class="num" style="color:#ffbd2e">2</div><div class="label">Medios</div></div>
                <div class="soc-stat"><div class="num" style="color:#00ff88">2</div><div class="label">Bajos</div></div>
            </div>
            <div class="soc-alerts" id="soc-alerts">
                ${AlertsDB.map(a => `
                    <div class="soc-alert ${a.type}">
                        <div class="time">${a.time}</div>
                        <div class="type ${a.type}">${a.type}</div>
                        <div class="msg"><strong>${a.source}</strong> - ${a.msg}</div>
                        <div class="action">${a.action}</div>
                    </div>
                `).join('')}
            </div>
            <button class="soc-btn" onclick="simulateAlert()">🔄 Simular Nuevo Alerta en Vivo</button>
            <div class="soc-uses" id="soc-uses">Usos: ${socUses}/3</div>
        </div>
    `;
}

const RandomAlerts = [
    { type: "CRITICAL", source: "ids", msg: "Patrón de ataque DDoS detectado desde 200+ IPs", action: "Rate limiting activado" },
    { type: "HIGH", source: "email-gateway", msg: "Phishing con payload adjunto bloqueado", action: "Email cuarentena" },
    { type: "MEDIUM", source: "vpn", msg: "Login desde país inusual (Corea del Norte)", action: "Verificación MFA" },
    { type: "LOW", source: "ssl-monitor", msg: "Certificado SSL expira en 7 días", action: "Notificación al admin" },
    { type: "CRITICAL", source: "waf", msg: "Exploit CVE-2026-1234 detectado en tráfico", action: "WAF rule activada" },
    { type: "HIGH", source: "endpoint", msg: "PowerShell ejecutado con args sospechosos", action: "Proceso terminado" },
];

function simulateAlert() {
    if (!DemoSystem.use()) return;
    socUses++;
    
    const alert = RandomAlerts[Math.floor(Math.random() * RandomAlerts.length)];
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    
    const alertsDiv = document.getElementById('soc-alerts');
    const newAlert = document.createElement('div');
    newAlert.className = `soc-alert ${alert.type}`;
    newAlert.style.animation = 'slideDown 0.3s ease';
    newAlert.innerHTML = `
        <div class="time">${time}</div>
        <div class="type ${alert.type}">${alert.type}</div>
        <div class="msg"><strong>${alert.source}</strong> - ${alert.msg}</div>
        <div class="action">${alert.action}</div>
    `;
    alertsDiv.prepend(newAlert);
    document.getElementById('soc-uses').textContent = `Usos: ${socUses}/3`;
}

document.addEventListener('DOMContentLoaded', () => { setTimeout(initSocDemo, 100); });
