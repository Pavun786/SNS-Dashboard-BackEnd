const categoryModel = require("../Models/categoryModel.js")



const createCategory = async (req, res) => {

  try {
    const { CategoryName } = req.body;

    const verifyCategory = await categoryModel.findOne({ CategoryName })

    if (verifyCategory) {
      res.send({ message: " Category already exist..!" })
    }
    else {
      const newCategory = new categoryModel({
        CategoryName: CategoryName
      })

      await newCategory.save()

      res.status(200).send({ message: "Category created successfully" })
    }
  } catch (err) {
    res.send({ message: err })
  }

}

const getallCategorys = async (req, res) => {
  console.log("exe")
  try {

    const getAllCategorys = await categoryModel.find({})

    if (getAllCategorys) {
      res.status(200).send(getAllCategorys)
    } else {
      res.send(404).send({ message: "Category not found" })
    }
  } catch (err) {
    res.send({ message: err })
  }


}

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const getCategory = await categoryModel.findOne({ _id: id })

    if (getCategory) {
      res.status(200).send(getCategory)
    } else {
      res.status(404).send({ message: "Category not found" })
    }
  }
  catch (err) {
    res.send({ message: err })
  }
}

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const editCategory = await categoryModel.updateOne({ _id: id }, { $set: data })
    res.status(200).send({ message: "Category edited successfully" })
  } catch (err) {
    res.send({ message: err })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await categoryModel.deleteOne({ _id: id })
    res.status(200).send({ message: "Category is deleted" })
  } catch (err) {
    res.send({ message: err })
  }
}


module.exports = { createCategory, getallCategorys, getSingleCategory, editCategory, deleteCategory };