import {
  handleLogin,
  handleSignUp,
  getUserbyId,
  handleURL,
  redirectToOriginalURL,
} from "./users.service";
import { Request, Response, NextFunction, Router } from "express";
import { MESSAGES, BASEURL } from "../../shared/constants";
import { verifyUser } from "../../middlewares/authentication";

export const handleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  try {
    await handleSignUp({ username, password });
    res.status(200).json({
      success: true,
      message: MESSAGES.SIGNED_IN,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  try {
    const token = await handleLogin({ username, password });
    res.status(200).json({
      success: true,
      message: MESSAGES.LOGGED_IN,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInfoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  try {
    const user = await getUserbyId(userId);
    res.status(200).json({
      success: true,
      message: MESSAGES.FETCH_USER,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getShortURL = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, url } = req.body;
  try {
    const shortURL = await handleURL(username, url);
    res.status(200).json({
      success: true,
      message: MESSAGES.SHORTENED_URL,
      shortURL,
    });
  } catch (error) {
    next(error);
  }
};

export const redirectURL = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const value=req.params.value;
  const shortURL = `${BASEURL}/${value}`;
  console.log(shortURL);
  try {
    const originalURL = await redirectToOriginalURL(shortURL);
    res.redirect(originalURL);
    console.log(originalURL);
  } catch (error) {
    next(error);
  }
};

export default (): Router => {
  const app = Router();
  app.post("/signup", handleUser);
  app.post("/login", handleUserLogin);
  app.get("/:id", verifyUser(), getUserInfoById);
  app.post("/shorten", verifyUser(), getShortURL);
  app.get("/:value",verifyUser(),redirectURL);
  return app;
};
