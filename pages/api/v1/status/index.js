import database from "infra/database.js";

async function status(request, response) {
  const updatedAT = new Date().toISOString();

  const postgresVersion = await database.query({
    text: "show server_version",
  });
  const postgresMaxConnections = await database.query("show max_connections;");

  const dbName = process.env.POSTGRES_DB;
  const usedConnections = await database.query({
    text: "select count(*) as used_connections from pg_stat_activity where datname = $1;",
    values: [dbName],
  });

  console.log(`Banco de dados selecionado é: ${dbName}`);

  response.status(200).json({
    updated_at: updatedAT,
    postgres_version: postgresVersion.rows[0].server_version,
    max_connections: parseInt(postgresMaxConnections.rows[0].max_connections),
    used_connections: parseInt(usedConnections.rows[0].used_connections),
  });
}

export default status;
