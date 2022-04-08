const mongoose = require("mongoose");

// Membuat Schema
const Feeder = mongoose.model("feeder", {
  no: {
    type: Number,
  },
  tanggal: {
    type: String,
  },
  jam: {
    type: String,
  },
  kota: {
    type: Number,
    default: 0,
  },
  tona: {
    type: Number,
    default: 0,
  },
  kolongan: {
    type: Number,
    default: 0,
  },
  lesabe: {
    type: Number,
    default: 0,
  },
  tamako: {
    type: Number,
    default: 0,
  },
  mainlinePetta: {
    type: Number,
    default: 0,
  },
  pettaKota: {
    type: Number,
    default: 0,
  },
  mainlineTahuna: {
    type: Number,
    default: 0,
  },
  kendahe: {
    type: Number,
    default: 0,
  },
  bowongkulu: {
    type: Number,
    default: 0,
  },
  kotaTamako: {
    type: Number,
    default: 0,
  },
  lapango: {
    type: Number,
    default: 0,
  },
  tahuna: {
    type: Number,
    default: 0,
  },
  salurang: {
    type: Number,
    default: 0,
  },
  pintareng: {
    type: Number,
    default: 0,
  },
  tahunaIncome: {
    type: Number,
    default: 0,
  },
  kitTahuna: {
    type: Number,
    default: function () {
      return this.kota + this.tona + this.kolongan + this.lesabe + this.tamako + this.mainlinePetta;
    },
  },
  kitPetta: {
    type: Number,
    default: function () {
      return this.pettaKota + this.mainlineTahuna + this.kendahe + this.bowongkulu;
    },
  },
  kitTamako: {
    type: Number,
    default: function () {
      return this.kotaTamako + this.lapango + this.tahuna;
    },
  },
  kitLesabe: {
    type: Number,
    default: function () {
      return this.salurang + this.pintareng + this.tahunaIncome;
    },
  },
  total: {
    type: Number,
    default: function () {
      return this.kitTahuna + this.kitPetta + this.kitTamako + this.kitLesabe;
    },
  },
});

// const mesin7 = new Mesin({
//   namaUnit: "PLTM Upel",
//   unit: "1",
//   namaMesin: "Alsthom",
//   dayaMampu: "200",
// });

// mesin7.save().then((data) => console.log(data));

module.exports = Feeder;
