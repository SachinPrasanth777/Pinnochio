import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  MONGODB_URI: z.string(),
});

const env = envSchema.parse(process.env);
export type EnvSchemaType = z.infer<typeof envSchema>;

export default {
  PORT: env.PORT,
  MONGODB_URI: env.MONGODB_URI,
};
