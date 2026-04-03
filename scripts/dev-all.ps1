$ErrorActionPreference = "Stop"

powershell -ExecutionPolicy Bypass -File scripts/ensure-env.ps1

npx concurrently -k -n auth,user,route,chat,payment,notification "npm -w services/auth-service run dev" "npm -w services/user-service run dev" "npm -w services/route-service run dev" "npm -w services/chat-service run dev" "npm -w services/payment-service run dev" "npm -w services/notification-service run dev"
