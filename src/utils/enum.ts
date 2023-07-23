export enum Routes {
  SAVE_USER = "/api/user/save",
  UPDATE_USER = "/user/update/:id",
  REDEFINE_PASSWORD = "/api/redefine_password",
  NEW_PASSWORD = "/api/new_password/:id",
  DELETE_USER = "/user/:id",

  SAVE_CATEGORY = "/api/category/save/:id",
  GET_CATEGORIES = "/api/categories/:id",
  GET_CATEGORY_NAME = "/api/categories_names/:id",
  GET_CATEGORY_BY_ID = '/api/categorY_by_id/:id',

  LOGIN = "/api/login",
  PAYLOAD = "/api/payload",
  REFRESH_TOKEN = "/api/refresh_token",
  SAVE_SALARY = "/api/salary/save/:id",
  GET_SALARY = "/api/salary/:id",
}

export enum Permissions {
  USER = "SAVEMONEY_USER",
}
