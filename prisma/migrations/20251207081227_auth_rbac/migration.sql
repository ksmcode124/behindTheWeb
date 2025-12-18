-- CreateEnum
CREATE TYPE "Role" AS ENUM ('superadmin', 'admin', 'user');

-- CreateTable
CREATE TABLE "btw_anggota" (
    "id_anggota" SERIAL NOT NULL,
    "nama_anggota" TEXT NOT NULL,
    "foto_anggota" TEXT,
    "linkedin" TEXT,

    CONSTRAINT "btw_anggota_pkey" PRIMARY KEY ("id_anggota")
);

-- CreateTable
CREATE TABLE "btw_divisi" (
    "id_divisi" SERIAL NOT NULL,
    "nama_divisi" TEXT NOT NULL,

    CONSTRAINT "btw_divisi_pkey" PRIMARY KEY ("id_divisi")
);

-- CreateTable
CREATE TABLE "btw_kepengurusan" (
    "id_btw" SERIAL NOT NULL,
    "tahun_kerja" TEXT NOT NULL,
    "nama_kepengurusan" TEXT NOT NULL,

    CONSTRAINT "btw_kepengurusan_pkey" PRIMARY KEY ("id_btw")
);

-- CreateTable
CREATE TABLE "btw_jabatan" (
    "id_jabatan" SERIAL NOT NULL,
    "nama_jabatan" TEXT NOT NULL,

    CONSTRAINT "btw_jabatan_pkey" PRIMARY KEY ("id_jabatan")
);

-- CreateTable
CREATE TABLE "detail_anggota" (
    "id" SERIAL NOT NULL,
    "id_anggota" INTEGER NOT NULL,
    "id_divisi" INTEGER NOT NULL,
    "id_btw" INTEGER NOT NULL,
    "id_jabatan" INTEGER NOT NULL,

    CONSTRAINT "detail_anggota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "type" TEXT NOT NULL DEFAULT 'credential',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON "Account"("providerId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- AddForeignKey
ALTER TABLE "detail_anggota" ADD CONSTRAINT "detail_anggota_id_anggota_fkey" FOREIGN KEY ("id_anggota") REFERENCES "btw_anggota"("id_anggota") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_anggota" ADD CONSTRAINT "detail_anggota_id_divisi_fkey" FOREIGN KEY ("id_divisi") REFERENCES "btw_divisi"("id_divisi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_anggota" ADD CONSTRAINT "detail_anggota_id_btw_fkey" FOREIGN KEY ("id_btw") REFERENCES "btw_kepengurusan"("id_btw") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_anggota" ADD CONSTRAINT "detail_anggota_id_jabatan_fkey" FOREIGN KEY ("id_jabatan") REFERENCES "btw_jabatan"("id_jabatan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
