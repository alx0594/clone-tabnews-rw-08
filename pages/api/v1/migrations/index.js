import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import migrate from "model/migrate.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const migrationsPending = await migrate.retreiveMigratePending();
  return response.status(200).json(migrationsPending);
}

async function postHandler(request, response) {
  const migrated = await migrate.runPendingMigrations();
  console.log(migrated);
  if (migrated.length > 0) {
    return response.status(201).json(migrated);
  }
  return response.status(200).json(migrated);
}
