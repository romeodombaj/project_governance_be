const { ObjectId } = require("mongodb");
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
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not add new employee" });
    });
};

const patchData = (req, res, table, id) => {
  const db = getDb();
  const data = req.body;

  if (ObjectId.isValid(id)) {
    db.collection(table)
      .updateOne({ _id: new ObjectId(id) }, { $set: data })
      .then((result) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ err: "Could not update" });
      });
  } else {
    res.status(500).json({ error: "Not a valid id" });
  }
};

const deleteData = (req, res, table, id) => {
  const db = getDb();

  if (ObjectId.isValid(id)) {
    db.collection(table)
      .deleteOne({
        _id: new ObjectId(id),
      })
      .then((result) => {
        res.status(200).json("Success");
      })
      .catch((err) => {
        res.status(500).json({ err: "Could not delete" });
      });
  } else {
    res.status(500).json({ error: "Not a valid id" });
  }
};

module.exports = {
  getData: getData,
  postData: postData,
  patchData: patchData,
  deleteData: deleteData,
};
