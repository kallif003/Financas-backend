import express, { Request, Response, Express } from "express";
import user_route from "./users_route";
import login_route from "./login_route";
import payload_route from "./payload_route";
import { verifyToken, cacheControlMiddleware } from "../middleware";

import cors from "cors";

const corsOptions = {
  origin: "https://financas-front-end-git-dev-kallif003.vercel.app",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("SaveMoney Backend Ativo");
  });

  app.use(
    express.json(),
    cors(corsOptions),
    cacheControlMiddleware,
    login_route,
    user_route,
    verifyToken,
    payload_route
  );
};

export default router;
