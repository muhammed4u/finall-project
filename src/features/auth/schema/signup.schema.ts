import { z } from "zod";

export const signupSchema = z.object({
    name: z
    .string()
    .nonempty('Name is required')
    .min(2, "Name must be at least 2 characters long")
    .max(25, "Name must be max 25 characters long"),

    email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),

    password: z
    .string()
    .nonempty("Password is required")
    .min(8 , "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),

    rePassword: z
    .string()
    .nonempty("Confirm password is required"),

    phone: z
    .string()
    .nonempty("phone is required")
    .regex(/^(\+2)?01[0125][0-9]{8}$/, "Only Egyptian phone numbers are allowed"),

    terms: z
    .boolean()
    .refine((value)=>value === true, {
        error: "You must accept the terms and conditions"
    })
}).refine((data)=>data.password === data.rePassword, {
    path: ['rePassword'],
    error: "Password and confirm password must match"
});

export type SignUpFormValues = z.infer<typeof signupSchema>
