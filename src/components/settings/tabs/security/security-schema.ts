
import { z } from "zod";

export const securitySettingsSchema = z.object({
  mfa: z.boolean(),
  sessionTimeout: z.number().min(5).max(120),
  passwordExpiry: z.enum([
    "never",
    "30days",
    "60days",
    "90days",
    "180days",
    "365days"
  ]),
  requirements: z.object({
    minLength: z.boolean(),
    uppercase: z.boolean(),
    numbers: z.boolean(),
    special: z.boolean()
  })
});

export type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>;
