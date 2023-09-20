import ReleasesController from "../controllers/releases_controller";
import express from "express";
import { Routes } from "../utils/enum";

const release_route = express.Router();
const releases_controller = new ReleasesController();

release_route
  .post(
    Routes.GET_RELEASES,

    releases_controller.getAllReleases
  )
  .post(Routes.SAVE_RELEASE, releases_controller.createRelease)
  .patch(Routes.DELETE_RELEASE, releases_controller.deleteRelease)
  .patch(Routes.UPDATE_RELEASE, releases_controller.updateRelease);

export default release_route;
