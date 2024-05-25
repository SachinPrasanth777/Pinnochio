import bcrypt from "bcryptjs";
import db from "../../loaders/db";
import { ERRORS, ROUNDS } from "../../shared/constants";
import { AuthSchema, UserAuthSchema } from "./users.schema";
import generateToken from "../../middlewares/jwt";
import { ObjectId } from "mongodb";

export async function handleSignUp({ username, password }: AuthSchema) {
  const users = (await db()).collection<UserAuthSchema>("users");
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
  const users = (await db()).collection<UserAuthSchema>("users");
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

export async function getUserbyId(userId: string): Promise<UserAuthSchema> {
  const users = (await db()).collection<UserAuthSchema>("users");
  const user = await users.findOne({ _id: new ObjectId(userId) });
  if (!user) {
    throw {
      statusCode: ERRORS.USER_NOT_FOUND.statusCode,
      message: ERRORS.USER_NOT_FOUND.message.error,
    };
  }
  return user;
}
