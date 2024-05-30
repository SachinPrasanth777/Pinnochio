import { Request, Response, NextFunction, Router } from "express";
import { redirectToOriginalURL } from "./redirect.service";
import { verifyUser } from "../../middlewares/authentication";

export const redirectURL = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const value = req.params.value;
  try {
    const originalURL = await redirectToOriginalURL(value);
    res.redirect(originalURL);
  } catch (error) {
    next(error);
  }
};

export default (): Router => {
  const app = Router();
  app.get("/:value", verifyUser(), redirectURL);
  return app;
};
