import { z } from "zod";
import { zodUrlNullable } from "../core/common/constants/zod.constants";

export const updateProfileValidationSchema = z
  .object({
    avatar: zodUrlNullable.optional(),
    name: z.string().min(1).optional(),
    surname: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional()
  })
  .strict();

export type UpdateProfileDTO = z.infer<typeof updateProfileValidationSchema>;
