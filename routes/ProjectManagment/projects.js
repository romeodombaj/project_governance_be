const express = require("express");
const router = express.Router();
const { getData, postData, patchData, deleteData } = require("../../fetchData");
const table = "projects";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.post("/add", (req, res) => {
  postData(req, res, table);
});

router.patch("/update/:id", (req, res) => {
  patchData(req, res, table, req.params.id);
});

router.delete("/delete/:id", (req, res) => {
  deleteData(req, res, table, req.params.id);
});

module.exports = router;
