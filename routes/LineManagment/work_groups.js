const express = require("express");
const router = express.Router();
const { getDb } = require("../../db");

router.get("/", (req, res) => {
  const db = getDb();
  let workGroups = [];

  db.collection("work_groups")
    .find()
    .forEach((group) => workGroups.push(group))
    .then(() => {
      res.status(200).json(workGroups);
      console.log("data fetch");
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

module.exports = router;
