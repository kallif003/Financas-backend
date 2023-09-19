import { validationResult } from "express-validator";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { UserPayload } from "../utils/jwtUtils";
import ExternalApiService from "../services/externalApi_service";
import { setBearerAuthorization, useClient } from "../clients/AxiosClient";

export const validRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        location: error.location,
        msg: error.msg,
        param: error.param,
        nestedErrors: error.nestedErrors,
      };
    },
  });

  const errors = myValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

declare module "express" {
  interface Request {
    token?: string;
    user?: UserPayload;
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    setBearerAuthorization(useClient(), token);

    if (!token) {
      res.status(401).json({ message: "Token não fornecido" });
      return;
    }

    const validToken = await ExternalApiService.validateToken();

    if (validToken) {
      next();
    }
  } catch (error: any) {
    res.status(401).json({ message: "Token inválido" });
  }
};

export const cacheControlMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
};
