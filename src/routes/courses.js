const express = require("express");

const router = express.Router({ mergeParams: true });
const coursesService = require("../controllers/courses");

router.get("/:courseId/comments", async (req, res, next) => {
  try {
    const stats = await coursesService.getComments(req.params);
    res.json(stats);
  } catch (e) {
    next(e);
  }
});

router.put("/:courseId/comments", async (req, res, next) => {
  try {
    const comment = await coursesService.postComment({ ...req.params, ...req.body, ...req.user });
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

router.get("/:courseId/stats", async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const stats = await coursesService.getStats({ courseId, ...req.body });
    res.json(stats);
  } catch (e) {
    next(e);
  }
});

router.put("/:courseId/stats", async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { sub: userId } = req.user;
    const stat = await coursesService.sendStat({ courseId, userId, ...req.body });
    res.json(stat);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
