import ReleasesController from "../controllers/releases_controller";
import express from "express";
import { Permissions, Routes } from "../utils/enum";
import { verifyPermission } from "../middleware";

const release_route = express.Router();
const releases_controller = new ReleasesController();

release_route
  .post(
    Routes.GET_RELEASES,
    verifyPermission([Permissions.USER]),
    releases_controller.getAllReleases
  )
  .post(
    Routes.SAVE_RELEASE,
    verifyPermission([Permissions.USER]),
    releases_controller.createRelease
  )
  .patch(
    Routes.DELETE_RELEASE,
    verifyPermission([Permissions.USER]),
    releases_controller.deleteRelease
  )
  .patch(
    Routes.UPDATE_RELEASE,
    verifyPermission([Permissions.USER]),
    releases_controller.updateRelease
  );

export default release_route;
