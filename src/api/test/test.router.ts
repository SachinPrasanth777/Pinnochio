import { Router } from "express";

export default (): Router => {
  const app = Router();
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  return app;
};
