import { Request, Response } from "express";

class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const { name, value } = req.body;
      const { id } = req.params;

      return res.status(201).json();
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
}

export default CategoryController;
