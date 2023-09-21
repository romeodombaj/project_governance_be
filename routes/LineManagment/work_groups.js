const express = require("express");
const { getData, postData, deleteData, patchData } = require("../../fetchData");
const router = express.Router();

const table = "work_groups";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.post("/add", (req, res) => {
  postData(req, res, table);
});

router.delete("/delete/:id", (req, res) => {
  deleteData(req, res, table, req.params.id);
});

router.patch("/update/:id", (req, res) => {
  patchData(req, res, table, req.params.id);
});

module.exports = router;
