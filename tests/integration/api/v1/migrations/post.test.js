import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Usando usuário anônimo", () => {
    describe("Executando Migrations Pendentes", () => {
      test("Para primeira vez", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response.status).toBe(201);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
      });
      test("Pela segunda vez", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
        );
        expect(response1.status).toBe(200);

        const response1Body = await response1.json();
        expect(Array.isArray(response1Body)).toBe(true);

        expect(response1Body.length).toEqual(0);
      });
    });
  });
});
