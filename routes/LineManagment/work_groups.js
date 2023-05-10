const express = require("express");
const { route } = require("./employees");
const { getData, postData } = require("../../fetchData");
const router = express.Router();

const table = "work_groups";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.post("add", (req, res) => {
  postData(req, res, table);
});

module.exports = router;
