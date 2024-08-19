const express = require("express");
const {createCategory,getallCategorys,getSingleCategory,editCategory,deleteCategory} = require("../Controllers/categoryController");

const router = express.Router()

router.post("/createCategory",createCategory)
router.get("/getAllCategory",getallCategorys)
router.get("/:id",getSingleCategory)
router.put("/:id",editCategory)
router.delete("/:id",deleteCategory)


module.exports = router;