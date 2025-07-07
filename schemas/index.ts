import z from "zod/v4";

export const nameUserSchema = z
  .string()
  .min(1, "Debe contener al menos 1 caractér.")
  .max(50, "No debe contener más de 50 caracteres.");

export const emailSchema = z.email("Ingrese una dirección de correo válido.");

export const usernameSchema = z
  .string()
  .min(3, "Debe contener al menos 3 caracteres.")
  .max(32, "Debe contener máximo 32 caracteres.");

export const passwordSchema = z
  .string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  .refine((val) => /[a-z]/.test(val), {
    message: "Debe contener al menos una letra minúscula",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Debe contener al menos una letra mayúscula",
  })
  .refine((val) => /\d/.test(val), {
    message: "Debe contener al menos un número",
  })
  .refine((val) => /[@$!%*?&]/.test(val), {
    message: "Debe contener al menos un carácter especial (@$!%*?&)",
  });
