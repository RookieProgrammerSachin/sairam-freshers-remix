import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export const DB_URL: string = process.env.DB_ENV === "local"? process.env.DB_URI as string: process.env.DB_URI_PROD as string;

if (!DB_URL) {
  throw new Error("Could not connect to DB!");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/db/schema.ts",
  out: "./app/db/migrations",
  dbCredentials: {
    url: DB_URL,
  },
  verbose: true,
  strict: true,
});
