import { z } from "zod";

export const createAutocompleteValidationSchema = z.object({
  title: z.string().min(1)
});

export type CreateAutocompleteDTO = z.infer<
  typeof createAutocompleteValidationSchema
>;
