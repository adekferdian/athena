import React from "react";
import Chart from "react-apexcharts";
import { Card } from 'reactstrap'

interface ApexProps {
    direction: any,
    filter: any
}

const ApexLineChart:React.FC<ApexProps> = ({ direction, filter }) => {
    const columnColors = {
        series1: '#6750a3',
        series2: '#24e801',
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
            columnWidth: '50%',
            colors: {
              // backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
              backgroundBarRadius: 10,
            },
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'top',
          horizontalAlign: 'start',
        },
        colors: [columnColors.series1, columnColors.series2],
        stroke: {
          show: true,
          colors: ['transparent'],
          width: 5
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        fill: {
          opacity: 1
        },
        yaxis: {
        //   opposite: 'rtl'
        },
        
      }
    
      const series = [
        {
          name: 'Achivement',
          data: [220, 120, 55, 100, 80, 125, 175, 70, 88, 180, 980, 700]
        },
      ]

  return (
    <Card className="w-100">
        <Chart 
        //@ts-ignore
        options={options} series={series} type='bar' height={400} />
    </Card>
  )
}

export default ApexLineChart
