export enum Routes {
  GET_USERS = "/users",
  GET_USER_BY_USERNAME = "/user/by-username",
  GET_ALL_USERNAMES = "/user/all",
  SAVE_USER = "/api/user/save",
  UPDATE_USER = "/user/update/:id",
  DELETE_USER = "/user/:id",

  LOGIN = "/api/login",
  PAYLOAD = "/api/payload",
  REFRESH_TOKEN = "/refresh_token",
}

export enum Permissions {
  USER = "USER",
}
