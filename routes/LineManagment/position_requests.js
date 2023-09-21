const express = require("express");
const router = express.Router();
const {
  getData,
  postData,
  deleteData,
  patchData,
  postManyData,
} = require("../../fetchData");
const table = "position_requests";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.get("/:id", (req, res) => {
  const filter = req.params.id;

  getData(req, res, table, { projectId: filter });
});

router.post("/add", (req, res) => {
  postData(req, res, table);
});

router.post("/addMany", (req, res) => {
  postManyData(req, res, table);
});

router.patch("/update/:id", (req, res) => {
  patchData(req, res, table, req.params.id);
});

router.delete("/delete/:id", (req, res) => {
  deleteData(req, res, table, req.params.id);
});

module.exports = router;
