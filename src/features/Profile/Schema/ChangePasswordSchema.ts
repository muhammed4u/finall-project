import z from "zod"

export const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty('Current password is required'),
    password: z.string().nonempty('New password is required').min(8, 'Password must be at least 8 characters'),
    rePassword: z.string().nonempty( 'Please confirm your password')
}).refine(data => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword']
})

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>