const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const xlsx = require("xlsx");
const Mesin = require("../model/dataMesin");
const Feeder = require("../model/feeder");
const Har = require("../model/har");
const { cookie, append } = require("express/lib/response");

// Halaman Home
router.get("/", async (req, res) => {
  if (req.query.namaUnit) {
    const dataMesin = await Mesin.find({ namaUnit: req.query.namaUnit });
    res.render("pages/home", {
      dataMesin,
    });
  } else {
    const dataMesin = await Mesin.find({ namaUnit: "PLTD Tahuna" });
    res.render("pages/home", {
      dataMesin,
    });
  }
});

// Mengirim Hasil Inpuit Data Mesin
router.post("/", async (req, res) => {
  const dataMesin = await Mesin.insertMany({ namaUnit: req.body.namaUnit, unit: req.body.unit, namaMesin: req.body.namaMesin, dayaMampu: req.body.dayaMampu });
  res.redirect("/");
});

// Menghapus Data Mesin
router.delete("/", async (req, res) => {
  const deleteMesin = await Mesin.deleteOne({ _id: req.body._id });
  res.redirect("/");
});

// Mengupdate Data Mesin
router.put("/", async (req, res) => {
  const updateMesin = await Mesin.updateOne(
    {
      _id: req.body._id,
    },
    {
      $set: {
        unit: req.body.unit,
        namaMesin: req.body.namaMesin,
        dayaMampu: req.body.dayaMampu,
      },
    }
  );
  res.redirect("/");
});

// Halaman Feeder
router.get("/feeder", async (req, res) => {
  if (req.query.tanggal) {
    const dataFeeder = await Feeder.find({ tanggal: req.query.tanggal }).sort({ no: 1 });
    const bebanFeeder = [];
    const jam = [];
    for (let i = 0; i < dataFeeder.length; i++) {
      bebanFeeder.push(dataFeeder[i].total);
      jam.push(dataFeeder[i].jam);
    }
    res.render("pages/feeder", {
      dataFeeder,
      bebanFeeder: JSON.stringify(bebanFeeder),
      jam: JSON.stringify(jam),
    });
  } else {
    const date = new Date().toISOString().slice(0, 10);
    // const dataFeederAll = await Feeder.find({}).sort({ tanggal: -1 });
    const dataFeeder = await Feeder.find({ tanggal: date }).sort({ no: 1 });
    const bebanFeeder = [];
    const jam = [];
    for (let i = 0; i < dataFeeder.length; i++) {
      bebanFeeder.push(dataFeeder[i].total);
      jam.push(dataFeeder[i].jam);
    }
    res.render("pages/feeder", {
      dataFeeder,
      // dataFeederAll,
      bebanFeeder: JSON.stringify(bebanFeeder),
      jam: JSON.stringify(jam),
    });
  }
});

// Mengupload Data Feeder
router.post("/feeder", upload, (req, res) => {
  const workbook = xlsx.readFile(req.files.feeder[0].path);
  const sheet_namelist = workbook.SheetNames;
  let x = 0;
  sheet_namelist.forEach((element) => {
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    Feeder.insertMany(xlData, (err, data) => {
      if (err) {
        res.json({ massage: err });
      } else {
        console.log(req.files);
      }
    });
    x++;
  });
  res.redirect("/feeder");
});

// Menghapus Data Feeder
router.delete("/feeder", async (req, res) => {
  const deleteFeeder = await Feeder.deleteOne({ _id: req.body._id });
  res.redirect("/feeder");
});

// Halaman Har
const date = new Date().toISOString().slice(0, 10);
router.get("/har", async (req, res) => {
  if (req.query.tanggal) {
    const dataHar = await Har.find({
      tanggal: { $elemMatch: { $in: req.query.tanggal } },
    });
    const pltahuna = await Har.find({ $and: [{ namaUnit: "PLTD Tahuna" }, { tanggal: { $elemMatch: { $in: req.query.tanggal } } }] });
    const pltahunahar = await Mesin.find({ namaUnit: "PLTD Tahuna" });
    const tahuna = [];
    const unitthn = [];
    for (let i = 0; i < pltahunahar.length; i++) {
      tahuna.push(pltahunahar[i].namaMesin);
      unitthn.push(pltahunahar[i].unit);
    }
    const pltamako = await Har.find({ $and: [{ namaUnit: "PLTD Tamako" }, { tanggal: { $elemMatch: { $in: req.query.tanggal } } }] });
    const pltamakohar = await Mesin.find({ namaUnit: "PLTD Tamako" });
    const tamako = [];
    const unittmk = [];
    for (let i = 0; i < pltamakohar.length; i++) {
      tamako.push(pltamakohar[i].namaMesin);
      unittmk.push(pltamakohar[i].unit);
    }
    const pllesabe = await Har.find({ $and: [{ namaUnit: "PLTD Lesabe" }, { tanggal: { $elemMatch: { $in: req.query.tanggal } } }] });
    const pllesabehar = await Mesin.find({ namaUnit: "PLTD Lesabe" });
    const lesabe = [];
    const unitlsb = [];
    for (let i = 0; i < pllesabehar.length; i++) {
      lesabe.push(pllesabehar[i].namaMesin);
      unitlsb.push(pllesabehar[i].unit);
    }
    const plpetta = await Har.find({ $and: [{ namaUnit: "PLTD Petta" }, { tanggal: { $elemMatch: { $in: req.query.tanggal } } }] });
    const plpettahar = await Mesin.find({ namaUnit: "PLTD Petta" });
    const petta = [];
    const unitptt = [];
    for (let i = 0; i < plpettahar.length; i++) {
      petta.push(plpettahar[i].namaMesin);
      unitptt.push(plpettahar[i].unit);
    }
    const plupel = await Har.find({ $and: [{ namaUnit: "PLTM Upel" }, { tanggal: { $elemMatch: { $in: req.query.tanggal } } }] });
    const plupelhar = await Mesin.find({ namaUnit: "PLTM Upel" });
    const upel = [];
    const unitupl = [];
    for (let i = 0; i < plupelhar.length; i++) {
      upel.push(plupelhar[i].namaMesin);
      unitupl.push(plupelhar[i].unit);
    }
    const plsangihe = await Har.find({ $and: [{ namaUnit: "PLTS Sangihe" }, { tanggal: { $elemMatch: { $in: req.query.tanggal } } }] });
    const plsangihehar = await Mesin.find({ namaUnit: "PLTS Sangihe" });
    const sangihe = [];
    const unitsgh = [];
    for (let i = 0; i < plsangihehar.length; i++) {
      sangihe.push(plsangihehar[i].namaMesin);
      unitsgh.push(plsangihehar[i].unit);
    }
    res.render("pages/har", {
      dataHar,
      pltahuna,
      pltamako,
      pllesabe,
      plpetta,
      plupel,
      plsangihe,
      tahuna: JSON.stringify(tahuna),
      tamako: JSON.stringify(tamako),
      lesabe: JSON.stringify(lesabe),
      petta: JSON.stringify(petta),
      upel: JSON.stringify(upel),
      sangihe: JSON.stringify(sangihe),
      unitthn: JSON.stringify(unitthn),
      unittmk: JSON.stringify(unittmk),
      unitlsb: JSON.stringify(unitlsb),
      unitptt: JSON.stringify(unitptt),
      unitupl: JSON.stringify(unitupl),
      unitsgh: JSON.stringify(unitsgh),
    });
  } else {
    const pltahuna = await Har.find({ $and: [{ namaUnit: "PLTD Tahuna" }, { tanggal: { $elemMatch: { $in: date } } }] });
    const pltahunahar = await Mesin.find({ namaUnit: "PLTD Tahuna" });
    const tahuna = [];
    const unitthn = [];
    for (let i = 0; i < pltahunahar.length; i++) {
      tahuna.push(pltahunahar[i].namaMesin);
      unitthn.push(pltahunahar[i].unit);
    }
    const pltamako = await Har.find({ $and: [{ namaUnit: "PLTD Tamako" }, { tanggal: { $elemMatch: { $in: date } } }] });
    const pltamakohar = await Mesin.find({ namaUnit: "PLTD Tamako" });
    const tamako = [];
    const unittmk = [];
    for (let i = 0; i < pltamakohar.length; i++) {
      tamako.push(pltamakohar[i].namaMesin);
      unittmk.push(pltamakohar[i].unit);
    }
    const pllesabe = await Har.find({ $and: [{ namaUnit: "PLTD Lesabe" }, { tanggal: { $elemMatch: { $in: date } } }] });
    const pllesabehar = await Mesin.find({ namaUnit: "PLTD Lesabe" });
    const lesabe = [];
    const unitlsb = [];
    for (let i = 0; i < pllesabehar.length; i++) {
      lesabe.push(pllesabehar[i].namaMesin);
      unitlsb.push(pllesabehar[i].unit);
    }
    const plpetta = await Har.find({ $and: [{ namaUnit: "PLTD Petta" }, { tanggal: { $elemMatch: { $in: date } } }] });
    const plpettahar = await Mesin.find({ namaUnit: "PLTD Petta" });
    const petta = [];
    const unitptt = [];
    for (let i = 0; i < plpettahar.length; i++) {
      petta.push(plpettahar[i].namaMesin);
      unitptt.push(plpettahar[i].unit);
    }
    const plupel = await Har.find({ $and: [{ namaUnit: "PLTM Upel" }, { tanggal: { $elemMatch: { $in: date } } }] });
    const plupelhar = await Mesin.find({ namaUnit: "PLTM Upel" });
    const upel = [];
    const unitupl = [];
    for (let i = 0; i < plupelhar.length; i++) {
      upel.push(plupelhar[i].namaMesin);
      unitupl.push(plupelhar[i].unit);
    }
    const plsangihe = await Har.find({ $and: [{ namaUnit: "PLTS Sangihe" }, { tanggal: { $elemMatch: { $in: date } } }] });
    const plsangihehar = await Mesin.find({ namaUnit: "PLTS Sangihe" });
    const sangihe = [];
    const unitsgh = [];
    for (let i = 0; i < plsangihehar.length; i++) {
      sangihe.push(plsangihehar[i].namaMesin);
      unitsgh.push(plsangihehar[i].unit);
    }
    const dataHar = await Har.find({ tanggal: { $elemMatch: { $in: date } } });
    res.render("pages/har", {
      tahuna: JSON.stringify(tahuna),
      tamako: JSON.stringify(tamako),
      lesabe: JSON.stringify(lesabe),
      petta: JSON.stringify(petta),
      upel: JSON.stringify(upel),
      sangihe: JSON.stringify(sangihe),
      unitthn: JSON.stringify(unitthn),
      unittmk: JSON.stringify(unittmk),
      unitlsb: JSON.stringify(unitlsb),
      unitptt: JSON.stringify(unitptt),
      unitupl: JSON.stringify(unitupl),
      unitsgh: JSON.stringify(unitsgh),
      dataHar,
      pltahuna,
      pltamako,
      pllesabe,
      plpetta,
      plupel,
      plsangihe,
    });
  }
});

// Mengirim Hasil Inpuit Har
router.post("/har", async (req, res) => {
  const dataHar = await Har.insertMany(req.body);
  res.redirect("/har");
});

// Halaman Error 404
router.use("/", (req, res) => {
  res.status(404);
  res.render("pages/error404");
});

module.exports = router;
