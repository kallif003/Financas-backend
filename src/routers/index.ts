import express, { Request, Response, Express } from "express";
import salary_route from "./salary_route";
import category_route from "./category_route";
import release_route from "./release_route";
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
    verifyToken,
    salary_route,
    category_route,
    release_route
  );
};

export default router;
