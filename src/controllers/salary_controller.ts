import { Request, Response } from "express";
import SalaryService from "../services/salary_service";

class SalaryController {
  async registerSalary(req: Request, res: Response) {
    try {
      const { value } = req.body;

      const { id } = req.params;

      const salary = await SalaryService.registerSalaryService(value, id);

      return res.status(201).json(salary);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getSalarary(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const salary = await SalaryService.getSalaryService(id);

      return res.status(200).json(salary);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}

export default SalaryController;
