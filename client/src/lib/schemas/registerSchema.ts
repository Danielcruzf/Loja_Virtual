import { z } from 'zod';

const PasswordValidation = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$'
    
);

export const registerSchema = z.object({
    email: z.string().email(),
    Password: z.string().regex(PasswordValidation,{
        message: 'A senha deve conter entre 6 e 10 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
    })
});
export type RegisterSchema = z.infer<typeof registerSchema>;