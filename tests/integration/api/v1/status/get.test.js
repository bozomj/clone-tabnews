import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET TO /API/V1/STATUS SHOULD RETURN 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(responseBody.postgres_version).toContain("16.0");
  expect(responseBody.max_connections).toEqual(expect.any(Number));
  expect(responseBody.used_connections).toEqual(1);
});
