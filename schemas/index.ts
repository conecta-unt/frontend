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

export const majorSchema = z
  .string()
  .min(3, { message: "La especialidad debe tener al menos 3 caracteres" })
  .max(50, { message: "La especialidad no debe exceder los 50 caracteres" })
  .optional();

export const areaSchema = z
  .string()
  .min(1, { message: "El área no puede estar vacía" })
  .max(100, { message: "El área no debe exceder los 100 caracteres" })
  .optional();

export const bioSchema = z
  .string()
  .min(1, { message: "La biografía no puede estar vacía" })
  .max(1000, { message: "La biografía no debe exceder los 1000 caracteres" })
  .optional();
