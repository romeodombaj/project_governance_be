const { getDb } = require("./db.js");

const getData = (req, res, table) => {
  const db = getDb();
  let dataArray = [];

  db.collection(table)
    .find()
    .forEach((line) => dataArray.push(line))
    .then(() => {
      res.status(200).json(dataArray);
      console.log("data fetch");
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
};

const postData = (req, res, table) => {
  const db = getDb();
  const data = req.body;

  db.collection(table)
    .insertOne(data)
    .then((result) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not add new employee" });
    });
};

module.exports = {
  getData: getData,
  postData: postData,
};
