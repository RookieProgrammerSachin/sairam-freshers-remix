import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { DB_URL } from "drizzle.config";
import postgres from "postgres";

// for migrations
const migrationClient = postgres(DB_URL, { max: 1 });
const runMigration = async () => {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./app/db/migrations",
  });
  await migrationClient.end();
};

runMigration();
