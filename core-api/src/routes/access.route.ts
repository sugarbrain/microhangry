import { Router } from "express";
import { AccessController } from "../controllers/access.controller";

function AuthRouter(): Router {
  const router = Router();

  router.post("/access", AccessController.create);

  return router;
}

export default AuthRouter();
