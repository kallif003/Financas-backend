import { Request, Response } from "express";
import TokenService from "../services/token_service";

class TokenController {
  async createRefreshToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      const refresh_token = await TokenService.updateRefreshToken(token);

      return res.status(200).json(refresh_token);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}

export default TokenController;
