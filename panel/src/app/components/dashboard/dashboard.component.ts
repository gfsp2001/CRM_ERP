import { Component, OnInit } from '@angular/core';
import { KpiService } from 'src/app/services/kpi.service';
declare var ApexCharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public token = localStorage.getItem('token');
  constructor(
    private _kpiService: KpiService
  ) { }

  ngOnInit(): void {
    this.init_chart_1();
    this.init_chart_2();
    this.init_chart_3();
  }

  init_chart_1() {
    this._kpiService.kpi_pagos_mensuales(this.token).subscribe(
      response => {
        const apexChart = "#chart_1";
        var options = {
          series: [{
            name: "Total",
            data: response.data
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          },
          colors: ['#6993FF']
        };
        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();
      });


  }
  init_chart_2() {
    this._kpiService.kpi_prospectos_mensuales(this.token).subscribe(
      response => {
        const apexChart = "#chart_2";
        var options = {
          series: [{
            name: "Prospectos",
            data: response.data
          }],
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          },
          colors: ['#6993FF']
        };
        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();
      });


  }
  init_chart_3() {

    const warning = '#6993FF';
    const success = '#1BC5BD';

    this._kpiService.kpi_prospectos_genero(this.token).subscribe(
      response => {
        const apexChart = "#chart_3";
        var options = {
          series: response.data,
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Masculino', 'Femenino'],
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
          colors: [warning, success]
        };

        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();

      })



  }


}
