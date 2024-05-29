import bcrypt from "bcryptjs";
import db from "../../loaders/db";
import { v4 as uuidv4 } from "uuid";
import { BASEURL, ERRORS, ROUNDS, URL_REGEX } from "../../shared/constants";
import { UserAuthSchema, AuthSchema } from "./users.schema";
import { ObjectId } from "mongodb";
import generateToken from "../../middlewares/jwt";

export async function handleSignUp({ username, password }: AuthSchema) {
  const users = (await db()).collection<AuthSchema>("users");
  const data = await users.findOne({ username: username });
  if (data) {
    throw {
      statusCode: ERRORS.USER_ALREADY_EXISTS.statusCode,
      message: ERRORS.USER_ALREADY_EXISTS.message.error,
    };
  }
  const hash = await bcrypt.hash(password, ROUNDS);
  await users.insertOne({
    username: username,
    password: hash,
  });
}

export async function handleLogin({
  username,
  password,
}: AuthSchema): Promise<string> {
  const users = (await db()).collection<AuthSchema>("users");
  const data = await users.findOne({ username: username });
  if (!data) {
    throw {
      statusCode: ERRORS.USER_NOT_FOUND.statusCode,
      message: ERRORS.USER_NOT_FOUND.message.error,
    };
  }
  const res = await bcrypt.compare(password, data.password);
  if (!res) {
    throw {
      statusCode: ERRORS.UNAUTHORIZED.statusCode,
      message: ERRORS.UNAUTHORIZED.message.error,
    };
  }
  return generateToken(username);
}

export async function getUserbyId(userId: string): Promise<AuthSchema> {
  const users = (await db()).collection<AuthSchema>("users");
  const user = await users.findOne({ _id: new ObjectId(userId) });
  if (!user) {
    throw {
      statusCode: ERRORS.USER_NOT_FOUND.statusCode,
      message: ERRORS.USER_NOT_FOUND.message.error,
    };
  }
  return user;
}

export async function handleURL(userId: string, url: string): Promise<string> {
  const collection = (await db()).collection<UserAuthSchema>("users");
  if (!url || !url.match(URL_REGEX)) {
    throw {
      statusCode: ERRORS.INVALID_URL.statusCode,
      message: ERRORS.INVALID_URL.message.error,
    };
  }
  const shortURL = `${BASEURL}/${uuidv4().slice(0, 6)}`;
  await collection.updateOne(
    { username: userId },
    { $push: { OriginalUrl: url, ShortenedUrl: shortURL } },
  );
  return shortURL;
}

export async function redirectToOriginalURL(shortURL: string): Promise<string> {
  const collection = (await db()).collection<UserAuthSchema>("users");
  const url = await collection.findOne({ ShortenedUrl: shortURL });
  if (!url) {
    throw {
      statusCode: ERRORS.URL_NOT_EXIST.statusCode,
      message: ERRORS.URL_NOT_EXIST.message.error,
    };
  }
  const index = url.ShortenedUrl.indexOf(shortURL);
  const originalURL = url.OriginalUrl[index];
  return originalURL;
}
