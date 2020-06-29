const express = require("express");

const router = express.Router();
const searchService = require("../controllers/search");

// GET routes
router.get("/:q", async (req, res) => {
  const { q } = req.params;
  const result = await searchService.search(q);
  res.json(result);
});

module.exports = router;
