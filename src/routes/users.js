const express = require('express');

const router = express.Router();
const usersService = require('../controllers/users');

router.get('/me/votes', async (req, res, next) => {
  try {
    const votes = await usersService.getUserVotes(req.user);
    res.json(votes);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
