import database from "infra/database.js";

import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("GET TO /API/V1/MIGRATIONS SHOULD RETURN 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
