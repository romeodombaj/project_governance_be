const express = require("express");
const router = express.Router();
const { getData, postData, deleteData } = require("../../fetchData");
const table = "employees";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.post("/add", (req, res) => {
  postData(req, res, table);
});

router.delete("/delete/:id", (req, res) => {
  deleteData(req, res, table, req.params.id);
});

module.exports = router;
