import { Request, Response } from "express";
import HandleError from "../utils/errors/handleError";
import ReleasesService from "../services/releases_service";

class ReleasesController {
  async createRelease(req: Request, res: Response) {
    try {
      const {
        category,
        destinedValue,
        idRelease,
        name,
        value,
        date,
        locale,
        createdAt,
      } = req.body;

      const { id } = req.params;

      const release = await ReleasesService.createReleasesSerivce({
        category,
        destinedValue,
        idRelease,
        name,
        value,
        date,
        userId: id,
        locale,
        createdAt,
      });

      return res.status(201).json(release);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getAllReleases(req: Request, res: Response) {
    try {
      const { page, itemsPerPage, createdAt } = req.body;

      const { id } = req.params;

      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const releases = await ReleasesService.getAllReleaseService(
        id,
        skip,
        itemsPerPage,
        createdAt
      );

      return res.status(200).json(releases);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async deleteRelease(req: Request, res: Response) {
    try {
      const { category, idRelease } = req.body;

      const { id } = req.params;

      await ReleasesService.deleteReleaseService(id, category, idRelease);

      res.status(204).send("deleted release");
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async updateRelease(req: Request, res: Response) {
    try {
      const {
        releaseCategory,
        idRelease,
        idCategory,
        name,
        value,
        date,
        locale,
      } = req.body;

      const { id } = req.params;

      await ReleasesService.updateReleaseService(
        id,
        idRelease,
        idCategory,
        releaseCategory,
        { name, value, date, locale }
      );

      res.status(204).send("updated release");
    } catch (error) {}
  }
}

export default ReleasesController;
