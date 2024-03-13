import express from "express";
import { addStudentValidationSchema } from "./student.validation.js";
import Student from "./student.model.js";
const router = express.Router();

//addd student route
// router.post("/student/add", async (req, res) => {
//   // extract new student from req.body
//   const newStudent = req.body;
//   // validate new student using yup
//   let validatedData;
//   try {
//     validatedData = await addStudentValidationSchema.validate(newStudent);
//     // if validation fails, throw error
//   } catch (error) {
//     return res.status(400).send({ message: error.message });
//   }
//   // check if user with provided email already exists
//   const student = await Student.findOne({ email: newStudent.email });
//   // if user exists, throw error
//   if (student) {
//     return res.status(409).send({ message: "student alrerady exist" });
//   }
//   // create user
//   await Student.create(newStudent);
//   // send response
//   return res.status(201).send({ message: "student added successful" });
// });
router.post(
  "/student/add",
  async (req, res, next) => {
    //extract new student from req body
    const newStudent = req.body;
    //validate new student
    let validatedData;
    try {
      validatedData = await addStudentValidationSchema.validate(newStudent);
      //if validation fails, throw error
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }

    //call next function
    next();
  },
  async (req, res) => {
    //extract new student from req body
    const newStudent = req.body;
    // check if email already used
    const student = await Student.findOne({ email: newStudent.email });
    // if email already occupied, throw error
    if (student) {
      return res.status(400).send({ message: "email already exist" });
    }
    // create user
    await Student.create(newStudent);
    // send respons
    return res.status(201).send({ message: "Student created sucessfully" });
  }
);
export default router;
