// Imports
const express = require("express");

// Router Declaration
const router = express.Router();
const db = require("./skillsModel");

// Routes
router.use("/", (req, res) => res.send("Welcome to the Skills API"));

router.get("/", (req, res) => {
  db.get()
    .then(skills => {
      res.json(skills);
    })
    .catch(err => res.send({ error: "The skills could not be retrieved." }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(skill => {
      if (skill) {
        res.status(200).json(skill);
      } else {
        res
          .status(404)
          .json({ message: "The skill with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The skill couldn't be retrieved" });
    });
});

router.post("/", async (req, res) => {
  if (!req.body.text) {
    return res
      .status(400)
      .json({ message: "Please provide contents for the skill." });
  }
  try {
    let data = await db.insert(req.body);
    return res.status(201).json({
      id: data.id,
      text: req.body.text,
      user: req.body.userId
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the skill to the database"
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id).then(skill => {
    if (!skill) {
      res
        .status(404)
        .json({ message: "The skill with the specified ID does not exist." });
    } else {
      db.remove(id)
        .then(skill => {
          res.status(200).json({ message: "skill was successfully deleted" });
        })
        .catch(err => {
          console.log("Error: ", err);
          res.status(500).json({ error: "The skill could not be removed" });
        });
    }
  });
});

//updates the user and returns the updated user object
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const skill = { text };

  if (!req.body.text) {
    return res.status(400).json({ message: "Can't be empty." });
  } else {
    db.get(id).then(skill => {
      if (!skill) {
        return res
          .status(404)
          .json({ message: "The skill with the specified ID does not exist." });
      }
    });
  }

  db.update(id, skill)
    .then(res.status(200))
    .catch(err => {
      res.status(500).json({ error: "Didn't work, don't know why." });
    });

  db.get(id).then(skill => {
    if (skill) {
      res.status(200).json(skill);
    }
  });
});

module.exports = router;

// Export
module.exports = router;
