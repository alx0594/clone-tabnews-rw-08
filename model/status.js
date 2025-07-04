import database from "infra/database.js";

async function getDatabaseVersion() {
  const databaseVersionResult = await database.query("SHOW server_version");
  const databaseResultValue = databaseVersionResult.rows[0].server_version;
  return databaseResultValue;
}

async function getDatabaseMaxConnections() {
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections",
  );
  const databaseMaxConnectionValue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  return databaseMaxConnectionValue;
}

async function getDatabaseOpenedConnections() {
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datName = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionValue =
    databaseOpenedConnectionsResult.rows[0].count;
  return databaseOpenedConnectionValue;
}

const status = {
  getDatabaseVersion,
  getDatabaseMaxConnections,
  getDatabaseOpenedConnections,
};

export default status;
