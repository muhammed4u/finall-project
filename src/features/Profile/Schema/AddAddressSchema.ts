import z from "zod";

export const addressSchema = z.object({
    name: z.string().nonempty('Address name is required').min(2, 'Address name must be at least 2 characters'),
    details: z.string().nonempty('Address details are required').min(5, 'Address details must be at least 5 characters'),
    city: z.string().nonempty('City is required').min(2, 'Write a valid city name'),
    phone: z.string().nonempty('Phone number is required').regex(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number'),
})
