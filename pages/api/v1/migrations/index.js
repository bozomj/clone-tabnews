import migrationRunner from "node-pg-migrate";
import { Console } from "node:console";
import { join } from "node:path";

export default async function migrations(request, response) {
  const valueDryRun = checkMethod(request.method);

  if (valueDryRun === null) {
    return response.status(405).end();
  } else {
    const migrations = await migrationRunner(runnerOption(valueDryRun));
    return response.status(200).json(migrations);
  }
}

function runnerOption(dryRun) {
  return {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: dryRun,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
}

function checkMethod(method) {
  let value = null;

  switch (method) {
    case "POST":
      value = false;
      break;
    case "GET":
      value = true;
      break;
  }
  return value;
}
