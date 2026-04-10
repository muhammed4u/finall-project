import z from "zod";

export const shippingAddressSchema = z.object({
    details: z
    .string()
    .nonempty("Address is required")
    .min(10, "Address must be at least 10 characters long")
    .max(200, "Address must be 200 characters long maximum"),

    phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^(010|011|012|015)[0-9]{8}$/, "Invalid Egyptian phone number format"),

    city: z
    .string()
    .nonempty("City is required")
    .min(2, "City must be at least 2 characters long")
    .max(50, "City must be 50 characters long maximum"),
})

export type shippingAddressValues = z.infer<typeof shippingAddressSchema>