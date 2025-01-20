import { z } from "zod";
import { sanitizeInput } from "./sanitizeInput";

const formValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email format"),
});

export const processFormData = (data: Record<string, unknown>) => {
  // Sanitize input with type check
  const sanitizedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === "string" ? sanitizeInput(value) : value,
    ])
  );

  // Validation
  const validatedData = formValidationSchema.parse(sanitizedData);

  return validatedData;
};

export default formValidationSchema;