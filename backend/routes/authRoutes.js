
const express = require("express");
const Student = require("../models/student");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const student = await Student.findOne({
      email: email,
      password: password
    }).select({
      password: 0
    });

    if (!student) {
      res.status(400).json({
        message: "invalid email or password"
      })
    }

    res.status(201).json({
      data: student
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;