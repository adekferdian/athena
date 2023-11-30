import React from "react";
import Chart from "react-apexcharts";

interface ApexChartProps {
  title: any,
  value1: any,
  value2: any,
  filter: any
}

const ApexRadiarChart:React.FC<ApexChartProps>= ({title, value1, value2, filter}) => {
  const donutColors = {
    series1: 'red',
    series2: filter !== "Logistic" ? '#18B2FB' : '#F4F4F4',
    series3: filter !== "Mitra" ? '#25D786' : '#F4F4F4'
  }
  const options = {
    legend: {
      show: false,
      position: 'bottom',
    },
    colors: [donutColors.series2, donutColors.series3],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val:any) {
                // return `${parseInt(val)}%`
              }
            },
            total: {
              show: true,
              fontSize: '1rem',
              label: title,
              color: 'black',
              formatter() {
                // return "GMV"
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 300,
        options: {
          chart: {
            height: 350,
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 350,
            width: 200
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  const series = [value1, value2]

  return (
        <Chart 
          //@ts-ignore
          options={options} series={series} type='donut' height={250} 
        />
  )
}

export default ApexRadiarChart
