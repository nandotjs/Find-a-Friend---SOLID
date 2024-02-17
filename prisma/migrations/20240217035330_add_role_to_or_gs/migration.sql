-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADM', 'MEMBER');

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADM';
