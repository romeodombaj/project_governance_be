const express = require("express");
const router = express.Router();
const { getData, postData, patchData, deleteData } = require("../../fetchData");
const table = "projects";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.post("/add", (req, res) => {
  let data = req.body;
  const date = new Date();
  let currentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  data = {
    body: {
      ...data,
      creationDate: currentDate,
    },
  };

  postData(data, res, table);
});

router.patch("/update/:id", (req, res) => {
  patchData(req, res, table, req.params.id);
});

router.delete("/delete/:id", (req, res) => {
  deleteData(req, res, table, req.params.id);
});

module.exports = router;
