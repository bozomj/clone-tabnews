const { execOnce } = require("next/dist/shared/lib/utils");

test("POST TO /API/V1/MIGRATIONS SHOULD RETURN 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "post",
  });

  const responseBody = await response.json();

  console.log(responseBody);
  expect(Array.isArray(responseBody)).toBe(true);
});
