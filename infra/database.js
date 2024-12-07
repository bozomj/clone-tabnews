import { Client, Pool } from "pg";

async function query(queryObject) {
  const client =
    process.env.NODE_ENV === "development"
      ? new Client({
          host: process.env.POSTGRES_HOST,
          port: process.env.POSTGRES_PORT,
          user: process.env.POSTGRES_USER,
          database: process.env.POSTGRES_DB,
          password: process.env.POSTGRES_PASSWORDS,
          url: process.env.DATABASE_URL,
        })
      : new Client(process.env.DATABASE_URL);

  // console.log("Crendenciais do Postgress", {
  //   host: process.env.POSTGRES_HOST,
  //   port: process.env.POSTGRES_PORT,
  //   user: process.env.POSTGRES_USER,
  //   database: process.env.POSTGRES_DB,
  //   password: process.env.POSTGRES_PASSWORDS,
  //   database_url: process.env.DATABASE_URL,
  // });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    console.log(result);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
