const express = require("express");

const router = express.Router({ mergeParams: true });
const authService = require("../controllers/auth");

router.put("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const authRes = await authService.authUser(req.body);
    res.json(authRes);
  } catch (e) {
    next(e);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const authRes = await authService.logoutUser();
    res.json(authRes);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
