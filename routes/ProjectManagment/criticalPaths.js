const express = require("express");
const router = express.Router();
const { getData, postData, patchData, deleteData } = require("../../fetchData");
const { calculateCriticalPath } = require("../../calculateCritical");
const table = "criticalPaths";

router.get("/", (req, res) => {
  getData(req, res, table);
});

router.get("/:id", (req, res) => {
  const filter = req.params.id;

  getData(req, res, table, { projectId: filter });
});

router.post("/add", async (req, res) => {
  const body = req.body;
  let originalArray = [];

  const projectId = body[0].projectId;

  for (let x in body) {
    originalArray.push({
      featureId: body[x]._id,
      i: body[x].name,
      predecessors: [
        ...body[x].conditions.split(",").filter((el) => el !== ""),
      ],
      duration: parseInt(body[x].duration),
    });
  }

  const calculatedArray = await calculateCriticalPath(originalArray);

  await calculatedArray.reverse();

  const data = {
    body: {
      projectId: projectId,
      calculatedArray: calculatedArray,
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
