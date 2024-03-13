import express from "express";
import connectDB from "./connect.db.js";
import courseRoutes from "./course/course.route.js";
import studentRoutes from "./student/student.route.js";
const app = express();
// to amke app understand json
app.use(express.json());

//connect database
connectDB();
//register routs
app.use(courseRoutes);
app.use(studentRoutes);

//server and port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
