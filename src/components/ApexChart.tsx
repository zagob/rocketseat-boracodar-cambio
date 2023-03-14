import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function ApexChart() {
  const options: ApexOptions = {
    chart: {
      id: "line",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    yaxis: {
      min: 5,
      tickAmount: 4,
      labels: {
        formatter: (value) => {
          return value.toFixed(1).replace(".", ",");
        },
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    colors: ["#7c3aed"],
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return `<div class="tooltip">
          <span>${String(series[seriesIndex][dataPointIndex]).replace(
            ".",
            ","
          )}</span>
          <span>${new Date(
            w.globals.seriesX[seriesIndex][dataPointIndex]
          ).toLocaleDateString("pt-BR", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}</span>
          </div>`;
      },
    },
  };

  const series = [
    {
      name: "cambio",
      data: [
        {
          x: new Date("2018-02-12").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-13").getTime(),
          y: 5.3,
        },
        {
          x: new Date("2018-02-14").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-15").getTime(),
          y: 5.11,
        },
        {
          x: new Date("2018-02-16").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-17").getTime(),
          y: 5.25,
        },
        {
          x: new Date("2018-02-18").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-19").getTime(),
          y: 5.2,
        },
      ],
    },
  ];

  return (
    <div>
      <h3 className="font-semibold text-xl text-[#0F172A]">Taxa de câmbio</h3>
      <div id="chart">
        <Chart options={options} series={series} type="area" />
        <div className="ml-10 mr-6 flex justify-between">
          <button className="px-3 text-sm">1D</button>
          <button className="px-3 text-sm">5D</button>
          <button className="bg-purple-500 text-white text-sm px-3 rounded-full font-bold">
            1M
          </button>
          <button className="px-3 text-sm">1A</button>
          <button className="px-3 text-sm">5A</button>
          <button className="px-3 text-sm">Máx</button>
        </div>
      </div>
    </div>
  );
}
