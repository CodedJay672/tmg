import { z } from "zod";

export const AuthSchema = (type: string) =>
  z.object({
    firstname: type === "SIGN_IN" ? z.string().optional() : z.string(),
    lastname: type === "SIGN_IN" ? z.string().optional() : z.string(),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword:
      type === "SIGN_IN"
        ? z
            .string()
            .min(8, {
              message: "Password must be at least 8 characters.",
            })
            .optional()
        : z.string().min(8, {
            message: "Password must be at least 8 characters.",
          }),
  });

export const resetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 character.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
