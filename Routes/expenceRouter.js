const express = require("express");
const {createExpence,getAllExpences,getSingleExpence,editExpence,deleteExpence} = require("../Controllers/expenceControllers");

const router = express.Router()

router.post("/createExpence",createExpence)
router.get("/getAllExpence",getAllExpences)
router.get("/:id",getSingleExpence)
router.put("/:id",editExpence)
router.delete("/:id",deleteExpence)


module.exports = router;