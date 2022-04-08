const mongoose = require("mongoose");

// Membuat Schema
const Mesin = mongoose.model("mesin", {
  namaUnit: {
    type: String,
  },
  unit: {
    type: String,
  },
  namaMesin: {
    type: String,
  },
  dayaMampu: {
    type: String,
  },
});

// const mesin7 = new Mesin({
//   namaUnit: "PLTM Upel",
//   unit: "1",
//   namaMesin: "Alsthom",
//   dayaMampu: "200",
// });

// mesin7.save().then((data) => console.log(data));

module.exports = Mesin;
