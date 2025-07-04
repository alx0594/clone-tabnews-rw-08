import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

const migrationsOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function retreiveMigratePending() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const result = await migrationRunner({
      ...migrationsOptions,
      dbClient,
    });
    return result;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const result = await migrationRunner({
      ...migrationsOptions,
      dbClient,
      dryRun: false,
    });
    return result;
  } finally {
    await dbClient?.end();
  }
}

const migrate = {
  retreiveMigratePending,
  runPendingMigrations,
};

export default migrate;
