const express = require("express");
const router = express.Router();
const { getData, postData } = require("../../fetchData");
const table = "projects";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.post("/add", (req, res) => {
  postData(req, res, table);
});

module.exports = router;
