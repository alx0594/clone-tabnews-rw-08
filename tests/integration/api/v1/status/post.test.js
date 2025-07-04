import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Usando usuário anônimo", () => {
    test("Buscando status corrente do sistema", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);

      const responseBody = await response.json();
      expect(responseBody.name).toBeDefined();
      expect(responseBody.action).toBeDefined();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.status_code).toBeDefined();
    });
  });
});
