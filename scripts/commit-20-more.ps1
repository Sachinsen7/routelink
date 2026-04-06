$commitMessages = @{
    "services/auth-service/src/application/usecases/getServiceInfo.ts" = "Add getServiceInfo use case to auth service"
    "services/auth-service/prisma/schema.prisma" = "Add Prisma schema for auth service"
    "services/auth-service/src/infrastructure/db/prisma.ts" = "Add Prisma client configuration"
    "services/auth-service/src/infrastructure/providers/twilioOtpProvider.ts" = "Add Twilio OTP provider for SMS auth"
    "services/auth-service/src/application/ports/authRepository.ts" = "Add auth repository port interface"
    "services/auth-service/src/app.ts" = "Add auth service Express app"
    "services/auth-service/package.json" = "Add auth service package.json"
    "services/user-service/src/application/usecases/getServiceInfo.ts" = "Add getServiceInfo use case to user service"
    "services/user-service/src/app.ts" = "Add user service Express app"
    "services/user-service/package.json" = "Add user service package.json"
    "services/user-service/prisma/schema.prisma" = "Add Prisma schema for user service"
    "services/user-service/src/infrastructure/db/prisma.ts" = "Add Prisma client for user service"
    "services/chat-service/src/server.ts" = "Add chat service server"
    "services/notification-service/src/server.ts" = "Add notification service server"
    "services/payment-service/src/server.ts" = "Add payment service server"
    "services/route-service/src/server.ts" = "Add route service server"
    "package.json" = "Add root package.json with scripts"
    "docker-compose.yml" = "Add Docker Compose services"
    "scripts/prisma-all.ps1" = "Add Prisma migration script"
    "apps/mobile/src/utils/travelers.ts" = "Add travelers utility functions"
    "apps/mobile/src/navigation/TabNavigator.tsx" = "Add tab navigator component"
    "apps/mobile/DESIGN.md" = "Add mobile design documentation"
    "apps/mobile/src/screens/auth/OnboardingScreen.tsx" = "Add onboarding screen component"
    "apps/mobile/src/api/services/user.ts" = "Add user API service"
    "apps/mobile/package.json" = "Add mobile app package.json"
    "scripts/install-all.ps1" = "Add install script"
}

$count = 0
foreach ($file in $commitMessages.Keys) {
    if ($count -ge 20) { break }
    if (Test-Path $file) {
        try {
            git add "$file"
            git commit -m "$($commitMessages[$file])"
            Write-Host "Committed: $file" -ForegroundColor Green
            $count++
        } catch {
            Write-Host "Failed: $file" -ForegroundColor Red
        }
    }
}

Write-Host "`nCommitted $count files" -ForegroundColor Cyan
git push -u origin feat/albus
Write-Host "Pushed to remote" -ForegroundColor Green