Highcharts.chart("container", {
  chart: {
    type: "column",
  },
  title: {
    text: "Realisasi Beban Feeder",
  },
  // subtitle: {
  //   text: "Source: WorldClimate.com",
  // },
  xAxis: {
    categories: jam,
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "Beban Feeder (kW)",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} kW</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  series: [{ name: "Beban Feeder", data: beban }],
});
