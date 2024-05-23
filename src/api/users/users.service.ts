import bcrypt from "bcryptjs";
import db from "../../loaders/db";
import { ERRORS, ROUNDS } from "../../shared/constants";
import { AuthSchema, UserAuthSchema } from "./users.schema";

export async function handleSignUp({ username, password }: AuthSchema) {
  const users = (await db()).collection<UserAuthSchema>("users");
  const data = await users.findOne({ username: username });
  if (data) {
    throw {
      statusCode: ERRORS.USER_ALREADY_EXISTS.statusCode,
      message: ERRORS.USER_ALREADY_EXISTS.message.error,
    };
  }
  await bcrypt.hash(password, ROUNDS);
  await users.insertOne({
    username: username,
    password: password,
  });
}
