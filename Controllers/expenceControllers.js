const expenceModel = require("../Models/expenceModel.js")
const CategoryModel = require("../Models/categoryModel.js")
const mongoose = require('mongoose');
const moment = require('moment');



const createExpence = async (req, res) => {
  try {
    const { Amount, Category, Date: DateString, Description } = req.body;

    console.log(Amount, Category, DateString, Description);

    const category = await CategoryModel.findOne({ CategoryName: Category });

    if (!category) {
      return res.status(400).send({ message: "Invalid category" });
    }

    // Directly create a Date object from the DateString
    const date = new Date(DateString);

    if (isNaN(date.getTime())) {
      return res.status(400).send({ message: "Invalid date format" });
    }

    const newExpence = new expenceModel({
      Amount,
      Category: category._id,
      Date: date,
      Description,
    });

    await newExpence.save();

    res.status(200).send({ message: "Expence created successfully", data: newExpence });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};




const getAllExpences = async (req, res) => {
  try {
    const getExpences = await expenceModel.find().populate("Category")
    if (getExpences) {
      res.status(200).send(getExpences)
    } else {
      res.status(400).send({ message: "Expence not found" })
    }
  } catch (err) {
    res.status(500).send({ message: err })
  }
}



const getSingleExpence = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleExpence = await expenceModel.findOne({ _id: id }).populate("Category")
    if (getSingleExpence) {
      res.status(200).send(getSingleExpence)
    } else {
      res.status(400).send({ message: "Expence not found" })
    }
  } catch (err) {
    res.status(500).send({ message: err })
  }
}




const editExpence = async (req, res) => {

  try {
    const { id } = req.params;

    let data = req.body;

    console.log("data", data)

    const updateExpence = await expenceModel.findByIdAndUpdate({ _id: id }, { $set: data })
    if (updateExpence) {
      res.status(200).send({ message: "Expence updated successfully" })
    } else {
      res.status(400).send({ message: "Expence not found" })
    }

  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const deleteExpence = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExpence = await expenceModel.deleteOne({ _id: id })
    res.status(200).send({ message: "Expence deleted successfully" })
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

module.exports = { createExpence, getAllExpences, getSingleExpence, editExpence, deleteExpence }