import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { DB_URL } from "drizzle.config";

const client = postgres(DB_URL);
export const db = drizzle(client, { schema, logger: true });
