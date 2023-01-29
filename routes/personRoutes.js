const express = require("express");
const router = express.Router();
const person = require("../models/personSchema");

router.post("/newPerson", (req, res) => {
  let newPerson = new person(req.body);
  newPerson.save((err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

router.post("/newManyPerson", (req, res) => {
  person
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

router.get("/getPerson/:name", (req, res) => {
  person.find({ name: req.params.name }, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});

router.get("/getOnePerson/:favoriteFoods", (req, res) => {
  person.findOne({ favoriteFoods: req.params.favoriteFoods }, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});

router.get("/getIdPerson/:id", (req, res) => {
  person.findById({ _id: req.params.id }, req.body, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});

router.put("/person/UpdateById/:id", (req, res) => {
  person.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    (err, data) => {
      if (err) throw err;
      else res.json(req.body);
    }
  );
});

router.put("/person/UpdateByName/:name", (req, res) => {
  person.findOneAndUpdate(
    { name: req.params.name },
    { ...req.body },
    (err, data) => {
      if (err) throw err;
      else res.json(req.body);
    }
  );
});

router.delete("/person/remove/:id", (req, res) => {
  person.findByIdAndRemove(
    { _id: req.params.id },
    { ...req.body },
    (err, data) => {
      if (err) throw err;
      else res.json(req.body);
    }
  );
});

router.get("/NarrowSearch", (req, res) => {
  person
    .find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.json({ msg: "error" });
      } else {
        res.json(data);
      }
    });
});

module.exports = router;
