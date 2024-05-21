import bcrypt from "bcryptjs";
import db from "../../loaders/db";
import { ERRORS, ROUNDS } from "../../shared/constants";
import { AuthSchema, UserAuthSchema } from "./users.schema";

export async function handleSignUp(signup: AuthSchema) {
  const users = (await db()).collection<UserAuthSchema>("users");
  const data = await users.findOne({ username: signup.username });
  if (data) {
    throw {
      statusCode: ERRORS.USER_ALREADY_EXISTS,
      message: ERRORS.USER_ALREADY_EXISTS.message,
    };
  }
  const password = await bcrypt.hash(signup.password, ROUNDS);
  await users.insertOne({
    username: signup.username,
    password: password,
  });
}
