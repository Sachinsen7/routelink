$ErrorActionPreference = "Stop"

$commitMessages = @{
    ".env.example" = "Add environment variables template for local development"
    ".gitignore" = "Add gitignore to exclude node_modules, dist, and sensitive files"
    ".prettierignore" = "Add prettier ignore configuration"
    ".prettierrc.json" = "Add prettier code formatting configuration"
    "package.json" = "Add root package.json for monorepo configuration"
    "docker-compose.yml" = "Add Docker Compose for local development services"
    "README.md" = "Update README with project documentation"
    
    "scripts/install-all.ps1" = "Add installation script for all services"
    "scripts/prisma-all.ps1" = "Add Prisma migration script for all services"
    "scripts/dev-all.ps1" = "Add development mode script for all services"
    "scripts/ensure-env.ps1" = "Add environment validation script"
    
    "docker/postgres/init.sql" = "Add PostgreSQL initialization SQL"
    
    "services/auth-service/src/server.ts" = "Add auth service entry point"
    "services/auth-service/src/interfaces/http/index.ts" = "Add auth service HTTP interface"
    "services/auth-service/src/interfaces/http/routes/auth.ts" = "Add authentication routes"
    "services/auth-service/src/interfaces/http/routes/health.ts" = "Add health check endpoint"
    "services/auth-service/src/infrastructure/db/prisma.ts" = "Add Prisma database client for auth service"
    "services/auth-service/src/infrastructure/security/jwtTokenService.ts" = "Add JWT token service implementation"
    "services/auth-service/src/infrastructure/providers/twilioOtpProvider.ts" = "Add Twilio OTP provider"
    "services/auth-service/src/infrastructure/providers/googleOAuthProvider.ts" = "Add Google OAuth provider"
    "services/auth-service/src/infrastructure/providers/staticServiceInfoProvider.ts" = "Add static service info provider"
    "services/auth-service/src/infrastructure/repositories/prismaAuthRepository.ts" = "Add Prisma auth repository"
    "services/auth-service/src/application/usecases/signupUser.ts" = "Add user signup use case"
    "services/auth-service/src/application/usecases/requestOtpLogin.ts" = "Add OTP login request use case"
    "services/auth-service/src/application/usecases/verifyOtpLogin.ts" = "Add OTP verification use case"
    "services/auth-service/src/application/usecases/loginWithGoogle.ts" = "Add Google login use case"
    "services/auth-service/src/application/usecases/refreshSession.ts" = "Add session refresh use case"
    "services/auth-service/src/application/ports/authRepository.ts" = "Add auth repository port interface"
    "services/auth-service/src/application/ports/tokenService.ts" = "Add token service port interface"
    "services/auth-service/src/application/ports/serviceInfoProvider.ts" = "Add service info provider port"
    "services/auth-service/tsconfig.json" = "Add TypeScript config for auth service"
    "services/auth-service/.env.example" = "Add auth service environment template"
    
    "services/user-service/src/server.ts" = "Add user service entry point"
    "services/user-service/src/interfaces/http/index.ts" = "Add user service HTTP interface"
    "services/user-service/src/interfaces/http/routes/users.ts" = "Add user routes"
    "services/user-service/src/interfaces/http/routes/health.ts" = "Add health check endpoint"
    "services/user-service/src/infrastructure/repositories/prismaUserRepository.ts" = "Add Prisma user repository"
    "services/user-service/src/infrastructure/providers/digiLockerProvider.ts" = "Add DigiLocker provider"
    "services/user-service/src/infrastructure/providers/staticServiceInfoProvider.ts" = "Add static service info provider"
    "services/user-service/tsconfig.json" = "Add TypeScript config for user service"
    
    "apps/mobile/App.tsx" = "Add mobile app entry point"
    "apps/mobile/index.ts" = "Add mobile app index"
    "apps/mobile/app.json" = "Add Expo app configuration"
    "apps/mobile/metro.config.js" = "Add Metro bundler config"
    "apps/mobile/babel.config.js" = "Add Babel config for mobile"
    "apps/mobile/tsconfig.json" = "Add TypeScript config for mobile"
    "apps/mobile/tailwind.config.js" = "Add Tailwind CSS config"
    "apps/mobile/global.css" = "Add global CSS styles"
    "apps/mobile/nativewind-env.d.ts" = "Add nativewind type definitions"
    "apps/mobile/DESIGN.md" = "Add mobile design documentation"
    
    "apps/mobile/src/navigation/AppNavigator.tsx" = "Add app navigator"
    "apps/mobile/src/navigation/AuthNavigator.tsx" = "Add auth navigator"
    "apps/mobile/src/navigation/TabNavigator.tsx" = "Add tab navigator"
    "apps/mobile/src/navigation/types.ts" = "Add navigation types"
    
    "apps/mobile/src/screens/auth/OnboardingScreen.tsx" = "Add onboarding screen"
    "apps/mobile/src/screens/auth/LoginSignupScreen.tsx" = "Add login/signup screen"
    "apps/mobile/src/screens/auth/OtpVerificationScreen.tsx" = "Add OTP verification screen"
    "apps/mobile/src/screens/HomeScreen.tsx" = "Add home screen"
    "apps/mobile/src/screens/DiscoverScreen.tsx" = "Add discover screen"
    "apps/mobile/src/screens/RouteDetailScreen.tsx" = "Add route detail screen"
    "apps/mobile/src/screens/PostRouteScreen.tsx" = "Add post route screen"
    "apps/mobile/src/screens/ProfileScreen.tsx" = "Add profile screen"
    "apps/mobile/src/screens/ChatScreen.tsx" = "Add chat screen"
    "apps/mobile/src/screens/ChatRoomScreen.tsx" = "Add chat room screen"
    "apps/mobile/src/screens/PaymentScreen.tsx" = "Add payment screen"
    "apps/mobile/src/screens/NotificationsScreen.tsx" = "Add notifications screen"
    "apps/mobile/src/screens/VerificationScreen.tsx" = "Add verification screen"
    
    "apps/mobile/src/components/ui/Button.tsx" = "Add Button component"
    "apps/mobile/src/components/ui/Input.tsx" = "Add Input component"
    "apps/mobile/src/components/ui/Card.tsx" = "Add Card component"
    "apps/mobile/src/components/ui/Avatar.tsx" = "Add Avatar component"
    "apps/mobile/src/components/ui/Badge.tsx" = "Add Badge component"
    "apps/mobile/src/components/ui/ScreenShell.tsx" = "Add ScreenShell component"
    "apps/mobile/src/components/ui/TopBar.tsx" = "Add TopBar component"
    "apps/mobile/src/components/ui/RouteTracker.tsx" = "Add RouteTracker component"
    "apps/mobile/src/components/chat/ConversationView.tsx" = "Add ConversationView component"
    
    "apps/mobile/src/store/authFlowStore.ts" = "Add auth flow store"
    "apps/mobile/src/store/sessionStore.ts" = "Add session store"
    "apps/mobile/src/store/profileStore.ts" = "Add profile store"
    "apps/mobile/src/store/routesStore.ts" = "Add routes store"
    "apps/mobile/src/store/postRouteStore.ts" = "Add post route store"
    "apps/mobile/src/store/chatStore.ts" = "Add chat store"
    "apps/mobile/src/store/paymentStore.ts" = "Add payment store"
    "apps/mobile/src/store/notificationsStore.ts" = "Add notifications store"
    
    "apps/mobile/src/api/http.ts" = "Add HTTP client"
    "apps/mobile/src/api/errors.ts" = "Add API error types"
    "apps/mobile/src/api/session-runtime.ts" = "Add session runtime"
    "apps/mobile/src/api/config.ts" = "Add API configuration"
    "apps/mobile/src/api/services/auth.ts" = "Add auth API service"
    "apps/mobile/src/api/services/user.ts" = "Add user API service"
    "apps/mobile/src/api/services/routes.ts" = "Add routes API service"
    "apps/mobile/src/api/services/chat.ts" = "Add chat API service"
    "apps/mobile/src/api/services/payments.ts" = "Add payments API service"
    "apps/mobile/src/api/services/notifications.ts" = "Add notifications API service"
    
    "apps/mobile/src/types/auth.ts" = "Add auth types"
    "apps/mobile/src/types/user.ts" = "Add user types"
    "apps/mobile/src/types/route.ts" = "Add route types"
    "apps/mobile/src/types/chat.ts" = "Add chat types"
    "apps/mobile/src/types/payment.ts" = "Add payment types"
    "apps/mobile/src/types/notification.ts" = "Add notification types"
    
    "apps/mobile/src/constants/colors.ts" = "Add color constants"
    "apps/mobile/src/constants/spacing.ts" = "Add spacing constants"
    "apps/mobile/src/constants/typography.ts" = "Add typography constants"
    "apps/mobile/src/constants/shadows.ts" = "Add shadow constants"
    "apps/mobile/src/constants/media.ts" = "Add media constants"
    "apps/mobile/src/constants/design-tokens.json" = "Add design tokens"
    
    "apps/mobile/src/utils/format.ts" = "Add formatting utilities"
    "apps/mobile/src/utils/travelers.ts" = "Add travelers utilities"
    "apps/mobile/src/utils/cn.ts" = "Add classname utility"
    
    "apps/mobile/src/providers/AppProviders.tsx" = "Add app providers"
    "apps/mobile/src/features/home/screens/HomeScreen.tsx" = "Add home feature screen"
    "apps/mobile/src/features/home/components/RouteCard.tsx" = "Add route card component"
}

function Commit-File {
    param($filePath, $message)
    
    git add "$filePath"
    git commit -m "$message"
    Write-Host "Committed: $filePath" -ForegroundColor Green
}

function Make-Tiny-Change {
    param($filePath, $counter)
    
    $content = Get-Content $filePath -Raw
    $marker = "// contribution-$counter"
    
    if ($content -notmatch [regex]::Escape($marker)) {
        Add-Content $filePath -Value $marker
        git add "$filePath"
        git commit -m "Add contribution marker $counter"
        Write-Host "Tiny commit $counter" -ForegroundColor Yellow
    }
}

Write-Host "Starting commit process..." -ForegroundColor Cyan
$commitCount = 0

foreach ($file in $commitMessages.Keys) {
    if (Test-Path $file) {
        try {
            Commit-File -filePath $file -message $commitMessages[$file]
            $commitCount++
        } catch {
            Write-Host "Skipped (already tracked): $file" -ForegroundColor Gray
        }
    }
}

Write-Host "`nAdded $commitCount commits from known files. Checking for remaining untracked files..." -ForegroundColor Cyan

$untracked = git ls-files --others --exclude-standard
$untrackedList = $untracked -split "`n" | Where-Object { $_ -match '\.(ts|tsx|js|json|yml|sql|md)$' }

$remainingCommits = 100 - $commitCount
$counter = 1

foreach ($file in $untrackedList) {
    if ($counter -gt $remainingCommits) { break }
    if ($file -match 'node_modules|\.git|dist|package-lock|\.expo' -or $file -eq '') { continue }
    
    try {
        git add "$file"
        $msg = "Add $file"
        git commit -m $msg
        Write-Host "Committed: $file" -ForegroundColor Green
        $counter++
    } catch {
        Write-Host "Failed: $file" -ForegroundColor Red
    }
}

Write-Host "`nAll files committed. Pushing to remote..." -ForegroundColor Cyan
git push

Write-Host "`nDone! All commits pushed." -ForegroundColor Green