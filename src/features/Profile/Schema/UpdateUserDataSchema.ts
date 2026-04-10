import z from "zod";

export const updateUserDataSchema = z.object({
    name: z
        .string()
        .nonempty("Name is required")
        .min(2, "Name must be at least 2 characters"),
    email: z
        .string()
        .nonempty("Email is required")
        .pipe(z.email("Invalid email address")),
    phone: z
        .string()
        .nonempty("Phone number is required")
        .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
});
