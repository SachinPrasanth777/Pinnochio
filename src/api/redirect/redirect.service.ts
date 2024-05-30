import db from "../../loaders/db";
import { ERRORS } from "../../shared/constants";
import { UserAuthSchema } from "../users/users.schema";

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
