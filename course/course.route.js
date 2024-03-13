import express from "express";
import Course from "./course.model.js";
import {
  courseValidationSchema,
  paginationDataValidationSchema,
} from "./course.validation.js";
import mongoose from "mongoose";
const router = express.Router();

//add course
router.post("/course/add", async (req, res) => {
  //extract new course from req body
  const newCourse = req.body;
  //vaidation
  try {
    await courseValidationSchema.validate(newCourse);
  } catch (error) {
    return res.status(400).send(error.message);
  }
  //save course
  await Course.create(newCourse);
  //send res
  return res
    .status(201)
    .send({ message: "Course is added successfully..........." });
});
// edit course by id
router.put("/course/edit/:id", async (req, res) => {
  //extract course id from req.params
  const courseId = req.params.id;
  //check course id is valid mongoid or not
  const isValidMongoId = mongoose.isValidObjectId(courseId);
  //if not throw error
  if (!isValidMongoId) {
    return res.status(404).send({ message: "mongo id is not validate" });
  }
  //find course by id
  const course = await Course.findOne({ _id: courseId });
  //if not throw error
  if (!course) {
    return res.status(404).send({ message: "course doesnot exist" });
  }
  //extract new values from req.body
  const newValue = req.body;
  //validate new values
  try {
    await courseValidationSchema.validate(newValue);
  } catch (error) {
    //if  validation fails , throw error
    return res.status(400).send({ message: error.message });
  }
  //edit
  await Course.updateOne({ _id: courseId }, { $set: { ...newValue } });
  //send response

  return res.status(200).send({ message: "course is updated successfully" });
});

//delete course by id
router.delete("/course/delete/:id", async (req, res) => {
  //extract id from req.params
  const courseId = req.params.id;
  //check valid mongo id
  const isValidMongoId = mongoose.isValidObjectId(courseId);
  //throw error if not
  if (!isValidMongoId) {
    return res.status(400).send({ message: "mongo id is not valid" });
  }
  //find course by id
  const course = await Course.findOne({ _id: courseId });
  //if not then throw error
  if (!course) {
    return res.status(404).send({ message: "course does not exist" });
  }
  //delete course
  await Course.deleteOne({ _id: courseId });
  //send response
  return res.status(200).send({ message: "deleting" });
});
//get course list
router.get("/course/list", async (req, res) => {
  //extract paginationdata from req.body
  const paginationData = req.body;
  let validatedData;
  //validate pagination data
  try {
    validatedData = await paginationDataValidationSchema.validate(
      paginationData
    );
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  //calculate skip
  const skip = (validatedData.page - 1) * validatedData.limit;
  //find courses
  const courses = await Course.aggregate([
    { $match: {} },
    { $skip: skip },
    { $limit: validatedData.limit },
    {
      $project: {
        name: 1,
        duration: 1,
        tutorName: 1,
      },
    },
  ]);

  return res.status(200).send({ message: "success", courseList: courses });
});
export default router;
