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
  delivery_location: z.string().optional(),
  delivery_address: z.string().optional(),
  receiver_name: z.string().optional(),
  receiver_phone: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  category: z.enum(["mechanical", "steel", "electrical"]),
  file: z.instanceof(File),
});

export type TProductDetails = z.infer<typeof productSchema>;
export type TUserDetails = z.infer<typeof userDetails>;
