import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import status from "model/status.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updateAt = new Date().toISOString();
  const version = await status.getDatabaseVersion();
  const maxConnections = await status.getDatabaseMaxConnections();
  const openedConnections = await status.getDatabaseOpenedConnections();
  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: version,
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections,
      },
    },
  });
}
