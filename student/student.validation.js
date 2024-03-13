import Yup from "yup";

export const addStudentValidationSchema = Yup.object({
  firstName: Yup.string()
    .required()
    .trim()
    .max(30, "First name should be at max 30 characters"),
  lastName: Yup.string()
    .required()
    .trim()
    .max(30, "Last name should be at max 30 characters"),
  email: Yup.string()
    .required()
    .trim()
    .max(65, "email should be at max 65 characters")
    .lowercase(),
  contactNumber: Yup.string()
    .trim()
    .max(15, "contact number should be at max 15 characters")
    .min(7, "contact number should be at least 7 characters"),
  isGraduate: Yup.boolean(),
});
