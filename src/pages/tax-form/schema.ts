import { z } from "zod";

const formSchema = z.object({
  year: z.enum(["2019", "2020", "2021", "2022"], {
    message: "Please choose values between 2019 & 2022",
  }),
  // Validate currency number input
  income: z.string().transform((val, ctx) => {
    const parsed = Number(val.replace(/[^\d.-]/g, ""));
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You can't be that poor",
      });
    } else if (parsed > 9999999999) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Calm down Jeff Bezos",
      });
    }
    return parsed;
  }),
});

type FormInputData = z.input<typeof formSchema>;
type FormOutputData = z.output<typeof formSchema>;

export { formSchema, type FormInputData, type FormOutputData };
