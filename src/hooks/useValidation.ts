import { z } from 'zod';

const validationSchema = z.object({
  search: z
    .string()
    .min(2, 'Search query must be at least 2 characters long.')
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      'Search input must contain only English letters, numbers, and spaces.',
    )
    .nonempty('Search input cannot be empty.'),
});

export const useValidation = () => {
  const handleValidate = (values: { search: string }) => {
    const errors: Record<string, string> = {};
    const validationResult = validationSchema.safeParse(values);

    if (!validationResult.success) {
      validationResult.error.errors.forEach(error => {
        errors[error.path[0]] = error.message;
      });
    }

    return errors;
  };

  return { handleValidate };
};
