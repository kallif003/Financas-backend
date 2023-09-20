import { ISalarySchema } from "../utils/interfaces";
import Salary from "../models/salary";

class SalaryService {
  static async registerSalaryService(value: number, userId: string) {
    try {
      let salary: ISalarySchema = await Salary.findOne({ userId });

      if (!salary) {
        salary = new Salary({
          userId: userId,
          value: value,
        });
      } else {
        salary.value = value;
      }

      await salary.save();

      return "Salário registrado com sucesso";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getSalaryService(userId: string) {
    try {
      const salary = await Salary.findOne({ userId });

      return salary;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default SalaryService;
