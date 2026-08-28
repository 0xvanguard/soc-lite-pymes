"""SOC Lite PYMES - Monitoreo de Seguridad"""
from typing import Dict, List
from dataclasses import dataclass
from enum import Enum
import datetime

class AlertSeverity(Enum):
    INFO = "info"
    LOW = "bajo"
    MEDIUM = "medio"
    HIGH = "alto"
    CRITICAL = "critico"

@dataclass
class SecurityAlert:
    id: str
    title: str
    description: str
    severity: AlertSeverity
    source: str
    timestamp: str
    recommendation: str

class SOCMonitor:
    def __init__(self):
        self.alerts = []
        self.assets = []
    
    def scan_assets(self, config: Dict) -> List[SecurityAlert]:
        alerts = []
        
        if config.get("open_ports"):
            alerts.append(SecurityAlert(
                "SOC-001", "Puertos Abiertos Detectados",
                f"Se encontraron {len(config['open_ports'])} puertos abiertos expuestos",
                AlertSeverity.MEDIUM, "Port Scanner",
                datetime.datetime.now().isoformat(),
                "Cerrar puertos innecesarios y configurar firewall"
            ))
        
        if config.get("outdated_software"):
            alerts.append(SecurityAlert(
                "SOC-002", "Software Desactualizado",
                f"Software obsoleto detectado: {config['outdated_software']}",
                AlertSeverity.HIGH, "Vulnerability Scanner",
                datetime.datetime.now().isoformat(),
                "Actualizar software a la última versión"
            ))
        
        if config.get("weak_passwords"):
            alerts.append(SecurityAlert(
                "SOC-003", "Contraseñas Débiles",
                "Se detectaron contraseñas que no cumplen políticas",
                AlertSeverity.HIGH, "Password Audit",
                datetime.datetime.now().isoformat(),
                "Implementar políticas de contraseñas fuertes"
            ))
        
        if config.get("no_mfa"):
            alerts.append(SecurityAlert(
                "SOC-004", "Autenticación Multi-Factor Deshabilitada",
                "Cuentas administrativas sin MFA",
                AlertSeverity.CRITICAL, "Auth Audit",
                datetime.datetime.now().isoformat(),
                "Habilitar MFA en todas las cuentas administrativas"
            ))
        
        if config.get("unpatched_os"):
            alerts.append(SecurityAlert(
                "SOC-005", "Sistema Operativo Sin Parches",
                "SO con vulnerabilidades conocidas sin parchar",
                AlertSeverity.CRITICAL, "OS Audit",
                datetime.datetime.now().isoformat(),
                "Aplicar parches de seguridad inmediatamente"
            ))
        
        self.alerts = alerts
        return alerts
    
    def get_dashboard(self) -> Dict:
        return {
            "total_alerts": len(self.alerts),
            "critical": sum(1 for a in self.alerts if a.severity == AlertSeverity.CRITICAL),
            "high": sum(1 for a in self.alerts if a.severity == AlertSeverity.HIGH),
            "medium": sum(1 for a in self.alerts if a.severity == AlertSeverity.MEDIUM),
            "low": sum(1 for a in self.alerts if a.severity == AlertSeverity.LOW),
            "security_score": max(0, 100 - (len(self.alerts) * 15))
        }

soc = SOCMonitor()
