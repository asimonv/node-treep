const express = require("express");

const router = express.Router();
const reportService = require("../controllers/report");

// POST routes
router.post("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const result = await reportService.postReport({
    commentId,
    ...req.body,
    ...req.user,
  });
  res.json(result);
});

module.exports = router;
