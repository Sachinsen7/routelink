CREATE TYPE "OtpPurpose" AS ENUM ('LOGIN', 'SIGNUP');

ALTER TABLE "OTPCode"
ADD COLUMN "purpose" "OtpPurpose" NOT NULL DEFAULT 'LOGIN',
ADD COLUMN "name" TEXT,
ADD COLUMN "email" TEXT;

DROP INDEX IF EXISTS "OTPCode_phone_createdAt_idx";
CREATE INDEX "OTPCode_phone_purpose_createdAt_idx" ON "OTPCode"("phone", "purpose", "createdAt");
