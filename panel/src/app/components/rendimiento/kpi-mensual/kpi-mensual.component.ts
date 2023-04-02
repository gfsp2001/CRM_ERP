import { Component, OnInit } from '@angular/core';
import { KpiService } from 'src/app/services/kpi.service';
declare var ApexCharts: any;
declare var $: any;
@Component({
  selector: 'app-kpi-mensual',
  templateUrl: './kpi-mensual.component.html',
  styleUrls: ['./kpi-mensual.component.css']
})
export class KpiMensualComponent implements OnInit {

  public token = localStorage.getItem('token');


  public warning = '#6993FF';
  public success = '#1BC5BD';
  public info = '#8950FC';
  public danger = '#F64E60';

  public cursos: Array<any> = [];

  public today = new Date();
  public year = this.today.getFullYear();
  public month: any = this.today.getMonth() + 1;



  constructor(
    private _kpiService: KpiService
  ) { }

  ngOnInit(): void {

    if (this.month <= 9) {
      this.month = '0' + this.month;
    }
    this.search();

    //this.init_chart1();
    // this.init_chart2();
    //this.init_chart3();

    /////////////////////////////////////////////

  }

  refresh() {
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth() + 1;

    if (this.month <= 9) {
      this.month = '0' + this.month;
    }
    this.search();
  }

  search() {
    this.init_chart_1();
    this.init_chart_2();
    this.init_chart_3();
  }


  init_chart_1() {

    this._kpiService.kpi_pagos_tipo(this.year, this.month, this.token).subscribe(
      response => {

        $('#chart_12').remove();
        $('#content_chart_12').html('<div id="chart_12" class="d-flex justify-content-center"></div>');


        const apexChart = "#chart_12";
        var options = {
          series: response.data,
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Cursos', 'Productos'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          colors: [this.warning, this.success]
        };

        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();

      })



  }

  init_chart_2() {

    this._kpiService.kpi_metodos_pago(this.year, this.month, this.token).subscribe(
      response => {

        $('#chart_13').remove();
        $('#content_chart_13').html('<div id="chart_13" class="d-flex justify-content-center"></div>');


        const apexChart = "#chart_13";
        var options = {
          series: response.data,
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Paypal', 'Transferencia', 'Deposito', 'Tarjeta de credito'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          colors: [this.info, this.success, this.warning, this.danger]

        };

        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();

      })



  }

  init_chart_3() {

    this._kpiService.kpi_curso_ganancia(this.year, this.month, this.token).subscribe(
      response => {
        $('#chart_14').remove();
        $('#content_chart_14').html('<div id="chart_14" class="d-flex justify-content-center"></div>');

        const apexChart = "#chart_14";

        var options = {
          series: [{
            name: 'Monto',
            data: response.montos
          }],
          annotations: {
            points: [{
              x: 'Cursos',
              seriesIndex: 0,
              label: {
                borderColor: '#775DD0',
                offsetY: 0,
                style: {
                  color: '#fff',
                  background: '#775DD0',
                },
              }
            }]
          },
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: '50%',
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 2
          },

          grid: {
            row: {
              colors: ['#fff', '#f2f2f2']
            }
          },
          xaxis: {
            labels: {
              rotate: -45
            },
            categories: response.cursos,
            tickPlacement: 'on'
          },
          yaxis: {
            title: {
              text: 'Montos',
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100]
            },
          }
        };

        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();

      })
  }




  ////////////////////////////////////////////

  init_chart1() {
    const apexChart = "#chart_12";
    var options = {
      series: [0, 0],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Cursos', 'Productos'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      colors: [this.warning, this.success]
    };

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
  }

  init_chart2() {
    const apexChart = "#chart_13";
    var options = {
      series: [0, 0, 0, 0],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Paypal', 'Transferencia', 'Deposito', 'Tarjeta de credito'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      colors: [this.info, this.success, this.warning, this.danger]
    };

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
  }

  init_chart3() {
    const apexChart = "#chart_14";
    var options = {
      series: [{
        name: 'Monto',
        data: []
      }],
      annotations: {
        points: [{
          x: 'Cursos',
          seriesIndex: 0,
          label: {
            borderColor: '#775DD0',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#775DD0',
            },
          }
        }]
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '50%',
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },

      grid: {
        row: {
          colors: ['#fff', '#f2f2f2']
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: [],
        tickPlacement: 'on'
      },
      yaxis: {
        title: {
          text: 'Montos',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        },
      }
    };

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
  }
}
