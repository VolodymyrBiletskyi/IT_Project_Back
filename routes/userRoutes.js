const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const { deleteUser } = require("../controllers/userController");


const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  console.log("test");
  return res.send("Welcome");
});
// DELETE user route, using the deleteUser controller function
router.delete("/delete/:id", authenticateToken, deleteUser);

module.exports = router;