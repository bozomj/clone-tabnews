import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDataBase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "post",
          },
        );

        expect(response1.status).toBe(201);

        const responseBody1 = await response1.json();

        expect(Array.isArray(responseBody1)).toBe(true);
        expect(responseBody1.length).toBeGreaterThan(0);

        const responseDelete = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "delete",
          },
        );

        expect(responseDelete.status).toBe(405);
        console.log(await responseDelete.json());

        const responsePut = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "put",
          },
        );

        expect(responsePut.status).toBe(405);
        console.log(await responsePut.json());
      });

      test("For the second time", async () => {
        const response2 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "post",
          },
        );

        expect(response2.status).toBe(200);

        const responseBody2 = await response2.json();

        expect(Array.isArray(responseBody2)).toBe(true);
        expect(responseBody2.length).toBe(0);
      });
    });
  });
});
