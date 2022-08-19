const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    
    const newNote = {};
    if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  
  let note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404).send("not found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
    );
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    
  }
    res.json({ note });
  });

  router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;  
    try {
      let note = await Note.findById(req.params.id);
      if (!note) {
        res.status(404).send("not found");
      }
      
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
  
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"success":"note deleted"});
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});
  
module.exports = router;
