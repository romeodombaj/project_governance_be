const express = require("express");
const router = express.Router();
const { getData, postData, patchData, deleteData } = require("../../fetchData");
const { calculateCriticalPath } = require("../../calculateCritical");
const table = "criticalPaths";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.post("/add", async (req, res) => {
  let originalArray = [
    { i: 0, predecessors: [], duration: 4 },
    { i: 1, predecessors: [0], duration: 7 },
    { i: 2, predecessors: [1], duration: 3 },
    { i: 3, predecessors: [1, 2], duration: 9 },
    { i: 4, predecessors: [2], duration: 2 },
  ];

  const calculatedArray = await calculateCriticalPath(originalArray);

  console.log("CALCULATED");
  console.log(calculatedArray);

  res.status(200).json(calculatedArray);

  const data = {
    body: {
      calculatedArray,
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
