import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Workbook } from 'exceljs';
import { ExportToCsv } from 'export-to-csv';
import * as fs from 'file-saver';
declare var $: any;
declare var moment: any;


@Component({
  selector: 'app-inventario-entrada',
  templateUrl: './inventario-entrada.component.html',
  styleUrls: ['./inventario-entrada.component.css']
})
export class InventarioEntradaComponent implements OnInit {

  public token = localStorage.getItem('token');
  public today = new Date();
  public month: any = this.today.getMonth() + 1;
  public year = this.today.getFullYear();
  public filtro_year = this.year;
  public filtro_month = this.month;
  public load_data = false;

  public inventario: Array<any> = [];

  public page = 1;
  public pageSize = 15;

  public options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'InventarioEntrada',
    filename: 'InventarioEntrada-' + moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  constructor(
    private _productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.search();
  }

  downloadExcel() {
    let today = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("InventarioEntrada");

    //Convertiendo nuestro arreglo a un formato legible para excel usando exceljs
    worksheet.addRow(undefined);
    for (let x1 of this.inventario) {
      let x2 = Object.keys(x1);

      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp);
    }

    let fname = "InventarioEntrada-" + today;

    // asignación de la cabeccera del documento excel donde cada campo de los datos que exportaremos sera una columna
    worksheet.columns = [
      { header: 'SKU', key: 'col1', width: 20 },
      { header: 'PRODUCTO', key: 'col2', width: 35 },
      { header: 'VARIEDAD', key: 'col3', width: 20 },
      { header: 'INGRESO', key: 'col4', width: 35 },
      { header: 'CANTIDAD', key: 'col5', width: 15 },
      { header: 'PRECIO', key: 'col6', width: 15 },
      { header: 'FECHA', key: 'col7', width: 15 },
    ] as any;

    // preparacion del archivo y su descarga
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '.xlsx');
    });
  }

  toCSV() {
    if (this.inventario.length >= 1) {
      const csvExporter = new ExportToCsv(this.options);
      csvExporter.generateCsv(this.inventario);
    } else {
      $.notify('No hay productos para exportar', {
        type: 'danger',
        spacing: 10,
        timer: 1000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 500,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    }

  }

  search() {
    this.load_data = true;
    this._productoService.obtener_inventario_entrada_admin(this.filtro_year, this.filtro_month, this.token).subscribe(
      response => {
        this.inventario = [];
        for (var item of response.data) {
          this.inventario.push({
            sku: item.variedad.sku.toUpperCase(),
            producto: item.producto.titulo.toUpperCase(),
            variedad: item.variedad.titulo.toUpperCase(),
            ingreso: item._id,
            cantidad: item.cantidad,
            precio: item.costo_unidad,
            fecha: moment(item.createdAt).format('YYYY-MM-DD')
          });
        }
        this.load_data = false;
      })
  }

  refresh() {
    this.filtro_year = this.year;
    this.filtro_month = this.month;
    this.inventario = [];
    this.search();
  }

}
