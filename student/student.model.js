import mongoose from "mongoose";

//set rule/schema
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 65,
    lowercase: true,
  },
  contactNumber: {
    type: String,
    required: false,
    trim: true,
    maxlength: 15,
    minlength: 7,
  },
  isGraduate: {
    type: Boolean,
    required: false,
  },
});
//create table/model/collection
const Student = mongoose.model("Student", studentSchema);
export default Student;
