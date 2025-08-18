import postgres from "postgres";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up postgres connection
const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "postgres",
  username: "arijeetmishra",
  password: "6649",
  max: 50,
}); 

function loadQuery(queryFile) {
  const filePath = path.join(__dirname, "queries", queryFile);
  return readFileSync(filePath, "utf-8");
}

export async function runQuery(queryFile, params = []) {
  const queryText = loadQuery(queryFile);
  return await sql.unsafe(queryText, params);
}
