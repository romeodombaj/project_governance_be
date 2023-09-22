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
  const features = body.featureList;
  const startDate = new Date(body.startDate);
  let originalArray = [];

  const projectId = features[0].projectId;

  for (let x in features) {
    originalArray.push({
      featureId: features[x]._id,
      i: features[x].name,
      featureIndex: parseInt(x),
      finished: false,
      predecessors: [
        ...features[x].conditions.split(",").filter((el) => el !== ""),
      ],
      duration: parseInt(features[x].duration),
      skill: features[x].skill,
      employees: features[x].employees,
    });
  }

  const calculatedArray = await calculateCriticalPath(originalArray, startDate);

  await calculatedArray.reverse();

  const data = {
    body: {
      projectId: projectId,
      calculatedArray: calculatedArray,
      startDate: startDate,
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
