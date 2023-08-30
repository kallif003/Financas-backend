import {
  IRelease,
  IReleaseSchema,
  IReleasesData,
  IUpdateRelease,
} from "../utils/interfaces";
import ReleaseModel from "../models/release";
import HandleError from "../utils/errors/handleError";
import PaginationService from "./pagination_service";

class ReleasesService extends PaginationService {
  static async createReleasesSerivce(
    data: IReleasesData
  ): Promise<IReleaseSchema> {
    try {
      const {
        category,
        destinedValue,
        userId,
        idRelease,
        name,
        value,
        date,
        locale,
        createdAt,
      } = data;

      const release: IRelease = {
        idRelease,
        name,
        value,
        locale,
        date: date,
      };

      let existingRelease = await ReleaseModel.findOne({ category, createdAt });

      if (!existingRelease) {
        existingRelease = new ReleaseModel({
          category,
          destinedValue,
          userId,
          createdAt,
          release: [release],
        });
      } else {
        existingRelease.release.push(release);
      }

      return await existingRelease.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllReleaseService(
    userId: string,
    skip: number,
    itemsPerPage: number,
    createdAt: string
  ) {
    try {
      const query = { userId, createdAt, deleted: false };

      return await this.getPaginatedItems(
        query,
        skip,
        itemsPerPage,
        ReleaseModel
      );
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async deleteReleaseService(
    userId: string,
    category: string,
    idRelease: string
  ) {
    try {
      const release = await ReleaseModel.findOne({ userId, category });

      release.release = release.release.filter((r) => r.idRelease != idRelease);

      return await release.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateReleaseService(
    userId: string,
    idRelease: string,
    id: string,
    category: string,
    release: IUpdateRelease
  ) {
    let updateRelease: Partial<IUpdateRelease> = {};

    for (const key in release) {
      if (release[key as keyof IUpdateRelease]) {
        updateRelease = {
          ...updateRelease,
          [key]: release[key as keyof IUpdateRelease],
        };
      }
    }

    const releases = await ReleaseModel.findOne({ userId, category });

    Object.assign(
      releases.release.find((r) => r.idRelease == idRelease),
      updateRelease
    );

    const update = await ReleaseModel.findByIdAndUpdate(id, {
      release: releases.release,
    });

    return update;
  }
}

export default ReleasesService;
