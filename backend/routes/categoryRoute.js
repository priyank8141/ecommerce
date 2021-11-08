const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/authCheck");

//import controller
const categoryController = require("../controllers/categoryController");

router.post("/category", authCheck, adminCheck, categoryController.create);
router.get("/categories", categoryController.list);
router.get("/category/:slug", categoryController.read);
router.put("/category/:slug", authCheck, adminCheck, categoryController.update);
router.delete(
  "/category/:slug",
  authCheck,
  adminCheck,
  categoryController.remove
);

module.exports = router;
