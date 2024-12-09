import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const valueDryRun = checkMethod(request.method);
  if (valueDryRun === null) {
    return await response.status(405).json({
      metodo: request.method,
      error: "Recurso não suportado.",
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: valueDryRun,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    const migrations = await migrationRunner(defaultMigrationOptions);
    const statusCode = migrations.length > 0 ? 201 : 200;
    return response.status(statusCode).json(migrations);
  } catch (e) {
    console.error(e);
  } finally {
    await dbClient.end();
  }
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
