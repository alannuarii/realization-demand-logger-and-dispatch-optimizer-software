const namaUnit = document.querySelector(".nama-unit");

const tahunaunit = tahuna.map((x, i) => {
  return x + " Unit " + unitthn[i];
});

const tamakounit = tamako.map((x, i) => {
  return x + " Unit " + unittmk[i];
});

const lesabeunit = lesabe.map((x, i) => {
  return x + " Unit " + unitlsb[i];
});

const pettaunit = petta.map((x, i) => {
  return x + " Unit " + unitptt[i];
});

const upelunit = upel.map((x, i) => {
  return x + " Unit " + unitupl[i];
});

const sangiheunit = sangihe.map((x, i) => {
  return x + " Unit " + unitsgh[i];
});

namaUnit.onchange = function isiUnit(event) {
  if (event.target.value === "PLTD Tahuna") {
    const namaMesin = document.querySelector(".nama-mesin");
    namaMesin.options.length = 0;
    for (let i = 0; i < tahunaunit.length; i++) {
      namaMesin.options[namaMesin.length] = new Option(tahunaunit[i]);
    }
  } else if (event.target.value === "PLTD Tamako") {
    const namaMesin = document.querySelector(".nama-mesin");
    namaMesin.options.length = 0;
    for (let i = 0; i < tamakounit.length; i++) {
      namaMesin.options[namaMesin.length] = new Option(tamakounit[i]);
    }
  } else if (event.target.value === "PLTD Lesabe") {
    const namaMesin = document.querySelector(".nama-mesin");
    namaMesin.options.length = 0;
    for (let i = 0; i < lesabeunit.length; i++) {
      namaMesin.options[namaMesin.length] = new Option(lesabeunit[i]);
    }
  } else if (event.target.value === "PLTD Petta") {
    const namaMesin = document.querySelector(".nama-mesin");
    namaMesin.options.length = 0;
    for (let i = 0; i < pettaunit.length; i++) {
      namaMesin.options[namaMesin.length] = new Option(pettaunit[i]);
    }
  } else if (event.target.value === "PLTM Upel") {
    const namaMesin = document.querySelector(".nama-mesin");
    namaMesin.options.length = 0;
    for (let i = 0; i < upelunit.length; i++) {
      namaMesin.options[namaMesin.length] = new Option(upelunit[i]);
    }
  } else if (event.target.value === "PLTS Sangihe") {
    const namaMesin = document.querySelector(".nama-mesin");
    namaMesin.options.length = 0;
    for (let i = 0; i < sangiheunit.length; i++) {
      namaMesin.options[namaMesin.length] = new Option(sangiheunit[i]);
    }
  }
};
