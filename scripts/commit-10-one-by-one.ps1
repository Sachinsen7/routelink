$files = @(
    @{path="services/user-service/src/application/usecases/getServiceInfo.ts"; msg="Add getServiceInfo use case to user service"},
    @{path="services/auth-service/prisma/schema.prisma"; msg="Add Prisma schema for auth service database"},
    @{path=".prettierrc.json"; msg="Add Prettier code formatting configuration"},
    @{path="services/auth-service/src/infrastructure/providers/twilioOtpProvider.ts"; msg="Add Twilio OTP provider for SMS authentication"},
    @{path="services/auth-service/src/application/ports/authRepository.ts"; msg="Add auth repository port interface"},
    @{path="services/auth-service/src/infrastructure/db/prisma.ts"; msg="Add Prisma database client for auth service"},
    @{path="package.json"; msg="Add root package.json for monorepo scripts"},
    @{path="services/auth-service/package.json"; msg="Add auth service package.json"},
    @{path="docker-compose.yml"; msg="Add Docker Compose configuration"},
    @{path="scripts/prisma-all.ps1"; msg="Add Prisma migration script for all services"}
)

foreach ($file in $files) {
    if (Test-Path $file.path) {
        git add $file.path
        git commit -m $file.msg
        Write-Host "Committed: $($file.path)" -ForegroundColor Green
    }
}

Write-Host "`nAll 10 commits done. Pushing..." -ForegroundColor Cyan
git push
Write-Host "Done!" -ForegroundColor Green