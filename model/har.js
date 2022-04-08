const mongoose = require("mongoose");

// Membuat Schema
const Har = mongoose.model("har", {
  tanggal: [
    {
      type: String,
    },
  ],
  namaUnit: {
    type: String,
  },
  namaMesin: {
    type: String,
  },
  jumat: {
    type: String,
  },
  sabtu: {
    type: String,
  },
  minggu: {
    type: String,
  },
  senin: {
    type: String,
  },
  selasa: {
    type: String,
  },
  rabu: {
    type: String,
  },
  kamis: {
    type: String,
  },
});

// const har1 = new Har({
//   jumat: "standby",
//   sabtu: "standby",
//   minggu: "standby",
//   senin: "standby",
//   selasa: "standby",
//   rabu: "standby",
//   kamis: "standby",
// });

// har1.save().then((data) => console.log(data));

module.exports = Har;
