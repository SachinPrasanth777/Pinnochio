import { Router } from "express";
import testRouter from "./test/test.router";
import usersController from "./users/users.controller";
import redirectController from "./redirect/redirect.controller";

export default (): Router => {
  const app = Router();
  app.use("/test", testRouter());
  app.use("/users", usersController());
  app.use("/", redirectController());
  return app;
};
