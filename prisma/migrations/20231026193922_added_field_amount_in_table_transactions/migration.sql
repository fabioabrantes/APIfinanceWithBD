/*
  Warnings:

  - Added the required column `amount` to the `transctions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transctions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT,
    CONSTRAINT "transctions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_transctions" ("clientId", "createdAt", "id", "type") SELECT "clientId", "createdAt", "id", "type" FROM "transctions";
DROP TABLE "transctions";
ALTER TABLE "new_transctions" RENAME TO "transctions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
