const express = require("express");
const { connectToDb, getDb } = require("./db");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let db;

app.listen(5001);

connectToDb((err) => {
  if (!err) {
    app.listen(5002, () => {
      console.log("App listening");
    });
    db = getDb();
  }
});

app.get("/", (req, res) => {
  res.json({ mssg: "hello" });
});

const employeeRouter = require("./routes/LineManagment/employees");
const workGroupRouter = require("./routes/LineManagment/work_groups");

app.use("/line_managment/employees", employeeRouter);
app.use("/line_managment/work_groups", workGroupRouter);
