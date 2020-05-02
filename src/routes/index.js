const express = require("express");

const router = express.Router();

const courses = require("./courses");
const auth = require("./auth");
const search = require("./search");
const teachers = require("./teachers");
const users = require("./users");
const stats = require("./stats");
const report = require("./report");

router.use("/courses", courses);
router.use("/auth", auth);
router.use("/search", search);
router.use("/teachers", teachers);
router.use("/users", users);
router.use("/stats", stats);
router.use("/report", report);

module.exports = router;
