import mongoose from "mongoose";
//set rule
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 45,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    duration: {
      type: Number,
      min: 1,
      required: true,
    },
    tutorName: {
      type: String,
      required: false,
      maxLength: 45,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
//create table
const Course = mongoose.model("Course", courseSchema);
export default Course;
