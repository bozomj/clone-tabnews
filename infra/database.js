import { Client, Pool } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORDS,
  });
  console.log("Crendenciais do Postgress", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORDS,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (e) {
    console.error(e);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};