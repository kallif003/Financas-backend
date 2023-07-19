import express, { Request, Response, Express } from "express";
import user_route from "./users_route";
import login_route from "./login_route";
import payload_route from "./payload_route";
import salary_route from "./salary_route";
import refresh_token_route from "./refreshToken_route";
import { verifyToken, cacheControlMiddleware } from "../middleware";

import cors from "cors";

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("SaveMoney Backend Ativo");
  });

  app.use(
    express.json(),
    cors(),
    cacheControlMiddleware,
    login_route,
    user_route,
    verifyToken,
    salary_route,
    payload_route,
    refresh_token_route
  );
};

export default router;
