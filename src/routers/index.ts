import express, { Request, Response, Express } from "express";
import user_route from "./users_route";
import login_route from "./login_route";
import payload_route from "./payload_route";
import { verifyToken, cacheControlMiddleware } from "../middleware";

import cors from "cors";

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("Pro Resíduos Ativo");
  });

  app.use(
    express.json(),
    cors(),
    cacheControlMiddleware,
    login_route,
    user_route,
    verifyToken,
    payload_route
  );
};

export default router;
