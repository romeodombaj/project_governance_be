const express = require("express");
const { connectToDb, getDb } = require("./db");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("App listening");
    });
    db = getDb();
  }
});

app.get("/", (req, res) => {
  res.json({ mssg: "hello" });
});

// Line Managment
const employeeRouter = require("./routes/LineManagment/employees");
const workGroupRouter = require("./routes/LineManagment/work_groups");
//
app.use("/line_managment/employees", employeeRouter);
app.use("/line_managment/work_groups", workGroupRouter);

// Project Managment
const projectsRouter = require("./routes/ProjectManagment/projects");
//
app.use("/project_managment/projects", projectsRouter);


// Process Managment
const procesRouter = require("./routes/ProcessManagment/features");
//
app.use("/process_managment/features", procesRouter);
