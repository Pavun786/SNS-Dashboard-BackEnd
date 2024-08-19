const mongoose = require("mongoose")

const expenceSchema = new mongoose.Schema({

   Amount: {
      type: String,
      required: true
   },

   Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
   },

   Date: {
      type: Date,
      required: true
   },
   Description: {
      type: String,
      required: true
   },


},
   { timestamps: true }
)

module.exports = mongoose.model("Expence", expenceSchema)