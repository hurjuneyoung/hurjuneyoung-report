$ErrorActionPreference = 'Stop'
$appRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodePath = 'C:\Users\skill\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$edgePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
try { $ready = Invoke-RestMethod 'http://127.0.0.1:18764/api/session' -TimeoutSec 2 } catch { $ready = $null }
if (-not $ready) {
  Start-Process -FilePath $nodePath -ArgumentList ('"' + (Join-Path $appRoot 'server.mjs') + '"') -WorkingDirectory $appRoot -WindowStyle Hidden
  for ($attempt=0; $attempt -lt 30; $attempt++) { Start-Sleep -Milliseconds 300; try { $ready=Invoke-RestMethod 'http://127.0.0.1:18764/api/session' -TimeoutSec 1; break } catch {} }
}
if (-not $ready) { Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('앱을 실행하지 못했습니다. 18764 포트와 설치 폴더를 확인하세요.'); exit 1 }
Start-Process -FilePath $edgePath -ArgumentList '--app=http://127.0.0.1:18764','--window-size=1440,960'
