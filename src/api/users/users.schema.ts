import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be atleast 6 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
export const UserAuthorizationSchema = UserSchema.pick({
  username: true,
  password: true,
});

export type AuthSchema = z.infer<typeof UserAuthorizationSchema>;
export type UserAuthSchema = z.infer<typeof UserSchema>;
