const express = require('express');

const router = express.Router();
const teachersService = require('../controllers/teachers');

router.get('/:teacherId', async (req, res, next) => {
  try {
    const teacher = await teachersService.getTeacher(req.params);
    res.json(teacher);
  } catch (e) {
    next(e);
  }
});

router.get('/:teacherId/stats', async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const stats = await teachersService.getStats({ teacherId, ...req.body });
    res.json(stats);
  } catch (e) {
    next(e);
  }
});

router.get('/:teacherId/comments', async (req, res, next) => {
  try {
    const stats = await teachersService.getComments(req.params);
    res.json(stats);
  } catch (e) {
    next(e);
  }
});

router.put('/:teacherId/comments', async (req, res, next) => {
  try {
    const comment = await teachersService.postComment({ ...req.params, ...req.body, ...req.user });
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

router.put('/:teacherId/stats', async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const { sub: userId } = req.user;
    const stat = await teachersService.sendStat({ teacherId, userId, ...req.body });
    res.json(stat);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
