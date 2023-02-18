const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const carSchema = mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  year: {
    type: String,
    required: true,
  },
});

carSchema.plugin(mongoose_fuzzy_searching, {
  fields: ["make", "model", "year"],
});

const Car = mongoose.model("Car", carSchema);

module.exports = { Car };
