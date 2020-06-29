const express = require("express");

const router = express.Router();
const statsService = require("../controllers/stats");

// GET routes
router.get("/", async (req, res) => {
  const result = await statsService.getStats();
  res.json(result);
});

router.get("/teachers", async (req, res) => {
  const teachers = await statsService.getBestTeachers();
  res.json(teachers);
});

router.get("/courses", async (req, res) => {
  const courses = await statsService.getBestCourses();
  res.json(courses);
});

module.exports = router;
