import { Client } from "pg";
import { ServiceError } from "infra/error.js";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro de conexão com o banco de dados ou de execução da query.",
      cause: error,
    });
    console.error(serviceErrorObject);
    throw serviceErrorObject;
  } finally {
    await client?.end();
  }
}

// Quem chama a função deverá tratar exceções
async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValue(),
  });
  await client.connect();
  return client;
}

function getSSLValue() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
const database = {
  query,
  getNewClient,
};

export default database;
