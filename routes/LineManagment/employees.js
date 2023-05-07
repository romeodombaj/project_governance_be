const express = require("express");
const router = express.Router();
const { getDb } = require("../../db");

router.get("/", (req, res) => {
  const db = getDb();
  let employees = [];

  db.collection("employees")
    .find()
    .forEach((employee) => employees.push(employee))
    .then(() => {
      res.status(200).json(employees);
      console.log("data fetch");
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

module.exports = router;
