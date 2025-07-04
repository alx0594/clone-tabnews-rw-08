import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Usando usuário anônimo", () => {
    test("Buscando status corrente do sistema", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody.update_at).toBeDefined();
      const parseUpdateAt = new Date(responseBody.update_at).toISOString();
      expect(responseBody.update_at).toEqual(parseUpdateAt);

      expect(responseBody.dependencies.database.version).toEqual("16.9");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
