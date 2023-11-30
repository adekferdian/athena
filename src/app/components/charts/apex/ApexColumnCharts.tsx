import React from "react";
import Chart from "react-apexcharts";
import { Card } from 'reactstrap';

interface ComponentProps {
  direction: any,
  filter: any,
  dataMitra: any[],
  dataLogistic: any[]
}

const ApexColumnCharts:React.FC<ComponentProps>= ({ direction, filter, dataMitra, dataLogistic }) => {
  const columnColors = {
    series1: '#18B2FB',
    series2: '#25D786',
    bg: '#f8d3ff'
  }

  const options = {
    chart: {
      height: 400,
      type: 'bar',
      stacked: false,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      },
      
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        colors: {
          // backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
          // backgroundBarRadius: 20,
        },
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    colors: [filter === "Mitra" ? columnColors.series1 : filter === "Logistic" ? columnColors.series2 : columnColors.series1, columnColors.series2],
    stroke: {
      show: true,
      colors: ['transparent'],
      width: 15,
      curve: 'smooth',
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    fill: {
      opacity: 1
    },
    yaxis: {
      opposite: direction === 'rtl',
    },
    
  }

  const series = [
    {
      name: 'Mitra',
      data: dataMitra
    },
    {
      name: 'Logistic',
      data: dataLogistic
    },
  ];

  const seriesMitra = [
    {
      name: 'Mitra',
      data: dataMitra
    },
  ];
  const seriesLogistic = [
    {
      name: 'Logistic',
      data: dataLogistic
    },
  ];

  return (
    <Card className="w-100">
      <Chart 
        //@ts-ignore
        options={options} series={filter === "Mitra" ? seriesMitra : filter === "Logistic" ? seriesLogistic : series} type='bar' height={400} />
    </Card>
  )
}

export default ApexColumnCharts
