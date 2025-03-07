import { createRouter } from "next-connect";
import controller from "infra/controller";
import migrator from "models/migrator.js";

const router = createRouter();

router.post(postHandler);
router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const pendingMigrations = await migrator.listPendingMigrations();
  return response.status(200).json(pendingMigrations);
}

async function postHandler(request, response) {
  const migratedMigrations = await migrator.runPendingMigrations();

  // let statusCode = migratedMigrations.length > 0 ? 201 : 200;
  // return response.status(statusCode).json(migratedMigrations);

  return migratedMigrations.length > 0
    ? response.status(201).json(migratedMigrations)
    : response.status(200).json(migratedMigrations);
}
