import database from "infra/database.js";

beforeAll(cleanDataBase);

async function cleanDataBase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST TO /API/V1/MIGRATIONS SHOULD RETURN 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "post",
  });

  expect(response1.status).toBe(201);

  const responseBody1 = await response1.json();
  const dbMigrations1 = (await database.query("Select * from pgmigrations"))
    .rows;

  expect(Array.isArray(responseBody1)).toBe(true);
  expect(responseBody1.length).toBeGreaterThan(0);

  expect(Array.isArray(dbMigrations1)).toBe(true);
  expect(dbMigrations1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "post",
  });

  expect(response2.status).toBe(200);

  const responseBody2 = await response2.json();
  const dbMigrations2 = (await database.query("Select * from pgmigrations"))
    .rows;

  expect(Array.isArray(responseBody2)).toBe(true);
  expect(responseBody2.length).toBe(0);

  expect(Array.isArray(dbMigrations2)).toBe(true);
  expect(dbMigrations2.length).toBeGreaterThan(0);
});
