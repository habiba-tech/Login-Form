
const express = require("express");
const Student = require("../models/student");
const router = express.Router();



router.get("/", async (req, res) => {
    const students = await Student.find()
        .select({
            password: 0
        });
    res.json(
        {
            data: students
        }
    );
});

module.exports = router;