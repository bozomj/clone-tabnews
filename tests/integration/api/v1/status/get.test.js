test("GET TO /API/V1/STATUS SHOULD RETURN 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
