import { Router } from "express";
import { AccessController } from "../controllers/access.controller";

function AccessRouter(): Router {
  const router = Router();

  router.post("/access", AccessController.create);

  return router;
}

export default AccessRouter();
