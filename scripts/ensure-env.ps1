$ErrorActionPreference = "Stop"

$services = @("auth-service", "user-service", "route-service", "chat-service", "payment-service", "notification-service")

foreach ($service in $services) {
  $serviceDir = Join-Path "services" $service
  $envPath = Join-Path $serviceDir ".env"
  $examplePath = Join-Path $serviceDir ".env.example"

  if (!(Test-Path $envPath) -and (Test-Path $examplePath)) {
    Copy-Item -Path $examplePath -Destination $envPath
  }
}
