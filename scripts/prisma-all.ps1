$ErrorActionPreference = "Stop"

$base = "postgresql://neondb_owner:npg_BYdLJ65ZmxVs@ep-green-bush-aht177vg-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
$schemas = @{
  'auth-service' = 'auth'
  'user-service' = 'user'
  'route-service' = 'route'
  'chat-service' = 'chat'
  'payment-service' = 'payment'
  'notification-service' = 'notification'
}

foreach ($pair in $schemas.GetEnumerator()) {
  $service = $pair.Key
  $schema = $pair.Value
  $env:DATABASE_URL = "$base&schema=$schema"
  npm -w "services/$service" run prisma:generate
  npm -w "services/$service" run prisma:migrate -- --name init
}
