import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be atleast 6 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
  OriginalUrl: z.array(z.string()),
  ShortenedUrl: z.array(z.string()),
});

export const UserAuth = UserSchema.pick({ username: true, password: true });

export type AuthSchema = z.infer<typeof UserAuth>;
export type UserAuthSchema = z.infer<typeof UserSchema>;
