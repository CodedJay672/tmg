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

export const userDetails = z.object({
  fullname: z.string().optional(),
  email: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  imgUrl: z.string().optional(),
});

export type TUserDetails = z.infer<typeof userDetails>;
