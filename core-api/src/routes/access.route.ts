import { Router } from "express";
import { AccessController } from "../controllers/access.controller";

function AccessRouter(): Router {
  const router = Router();

  router.post("/create", AccessController.createAccess);
  router.get("/", AccessController.getAllAccesses);
  router.get("/:id", AccessController.getAccess);

  return router;
}

export default AccessRouter();
