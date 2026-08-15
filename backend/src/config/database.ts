import { Pool } from "pg";
import { env } from "./env.js";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Database connected to PostgreSQL");
});

pool.on("error", (error) => {
  console.error("PostgreSQL connection error:", error);
});

export default pool;