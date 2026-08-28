"""SOC Lite PYMES - API"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
from monitor import soc

app = FastAPI(title="SOC Lite PYMES", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ScanRequest(BaseModel):
    config: Dict

@app.get("/")
async def root():
    return "<html><body><h1>🏢 SOC Lite para PYMES</h1><p>Monitoreo de seguridad simplificado para pequeñas y medianas empresas</p></body></html>"

@app.post("/api/scan")
async def scan(request: ScanRequest):
    alerts = soc.scan_assets(request.config)
    dashboard = soc.get_dashboard()
    return {
        "alerts": [{"id": a.id, "title": a.title, "severity": a.severity.value, "recommendation": a.recommendation} for a in alerts],
        "dashboard": dashboard
    }

@app.get("/api/dashboard")
async def dashboard():
    return soc.get_dashboard()

if __name__ == "__main__":
    import uvicorn
    print("🏢 Iniciando SOC Lite PYMES...")
    uvicorn.run(app, host="0.0.0.0", port=9006)
