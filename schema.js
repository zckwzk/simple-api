// schema.js
const { z } = require("zod");

const learningPlanSchema = z.object({
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
  timePerWeek: z.number().min(0).max(168), // Assuming time is in hours per week
  learningStyles: z.array(z.string()),
  technologies: z.array(z.string()),
  goalTimeline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Goal timeline is required")
    .refine(
      (val) => {
        const today = new Date();
        const selectedDate = new Date(val);
        return selectedDate > today;
      },
      { message: "Goal timeline must be after today" },
    ),

  resourceType: z.string(),
  // Add other fields as needed
});

module.exports = learningPlanSchema;
