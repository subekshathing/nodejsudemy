import Yup from "yup";
export const courseValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required()
    .max(45, "Name should be at 45 characters"),
  duration: Yup.number().min(1, "duration must be at least 1 day").required(),
  price: Yup.number().min(0, "Price must be at least 0.").required(),
  tutorName: Yup.string().trim().max(45, "tutor name must be 45 characters."),
});

export const paginationDataValidationSchema = Yup.object({
  page: Yup.number().required().min(1, "page number must be at least one"),
  limit: Yup.number().default(6).min(1, "limit must be at least 1"),
});
