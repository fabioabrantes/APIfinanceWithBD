-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transctions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT,
    CONSTRAINT "transctions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_transctions" ("createdAt", "id", "type") SELECT "createdAt", "id", "type" FROM "transctions";
DROP TABLE "transctions";
ALTER TABLE "new_transctions" RENAME TO "transctions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
