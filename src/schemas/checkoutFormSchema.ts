import { z } from 'zod';
export const formSchema = z.object({
    firstName: z.string().min(2, {
      message: 'First name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
      message: 'Last name must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    phone: z.string().regex(/^(?:\+359|00359|0)(2|[3-9][0-9]{2})(\s?\d{3}\s?\d{4}|\s?\d{2}\s?\d{2}\s?\d{2})$|^(?:\+359|00359|0)(87|88|89)(\s?\d{3}\s?\d{4})$/, {
      message: "Invalid Bulgarian phone number",
    }),
    address: z.string().min(2, {
      message: 'Address must be at least 2 characters.',
    }),
    city: z.string().min(2, {
      message: 'City must be at least 2 characters.',
    }),
  })