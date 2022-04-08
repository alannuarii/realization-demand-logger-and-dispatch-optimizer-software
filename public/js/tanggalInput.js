const tglinp = document.getElementById("tglinp");
const jumat = document.querySelector(".jumat");
const sabtu = document.querySelector(".sabtu");
const minggu = document.querySelector(".minggu");
const senin = document.querySelector(".senin");
const selasa = document.querySelector(".selasa");
const rabu = document.querySelector(".rabu");
const kamis = document.querySelector(".kamis");
const tglsabtu = document.querySelector(".tglsabtu");
const tglminggu = document.querySelector(".tglminggu");
const tglsenin = document.querySelector(".tglsenin");
const tglselasa = document.querySelector(".tglselasa");
const tglrabu = document.querySelector(".tglrabu");
const tglkamis = document.querySelector(".tglkamis");

tglinp.onchange = function () {
  function addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy.toISOString().slice(0, 10);
  }

  const tanggal = tglinp.value;
  const date = new Date(tanggal);

  const sabtux = addDays(date, 1);
  const minggux = addDays(date, 2);
  const seninx = addDays(date, 3);
  const selasax = addDays(date, 4);
  const rabux = addDays(date, 5);
  const kamisx = addDays(date, 6);
  jumat.innerHTML = tanggal;
  sabtu.innerHTML = sabtux;
  minggu.innerHTML = minggux;
  senin.innerHTML = seninx;
  selasa.innerHTML = selasax;
  rabu.innerHTML = rabux;
  kamis.innerHTML = kamisx;
  tglsabtu.value = sabtux;
  tglminggu.value = minggux;
  tglsenin.value = seninx;
  tglselasa.value = selasax;
  tglrabu.value = rabux;
  tglkamis.value = kamisx;

  // console.log(tanggal);
};
