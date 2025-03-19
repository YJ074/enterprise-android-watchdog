
import * as z from "zod";

export const investigationSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  deviceIds: z.array(z.string()).min(1, { message: "Select at least one device" }),
});

export type InvestigationFormValues = z.infer<typeof investigationSchema>;
