import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ExportToCsv } from 'export-to-csv';
declare var moment: any;
declare var $: any;
@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public token = localStorage.getItem('token');
  public clientes: Array<any> = [];
  public _Array: Array<any> = [];

  public filtro = '';
  public page = 1;
  public pageSize = 15;
  public load_estado = false;
  public load_data = false;

  public options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'Clientes',
    filename: 'Clientes-' + moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(
      (params: Params) => {
        this.filtro = params['filter'];
        if (this.filtro) {
          this.filtrar();
        } else {
          this.ultimos_30_clientes();
        }
      }
    );
  }

  init_data() {
    if (this.filtro) {
      this._router.navigate(['/cliente'], { queryParams: { filter: this.filtro } });
    } else {
      this._router.navigate(['/cliente']);
    }
  }

  filtrar() {
    if (this.filtro) {
      this.load_data = true;
      this._clienteService.listar_clientes_filtro_admin(this.filtro, this.token).subscribe(
        response => {
          this.clientes = response.data;
          this.load_data = false;
        });
    } else {
      this.clientes = [];
    }
  }

  ultimos_30_clientes() {
    this.load_data = true;
    this._clienteService.listar_clientes_ultimos30_admin(this.token).subscribe(
      response => {
        this.clientes = response.data;
        this.load_data = false;
      });
  }

  set_state(id: any, estado: any) {
    this.load_estado = true;
    this._clienteService.cambiar_estado_cliente_admin(id, { estado: estado }, this.token).subscribe(
      response => {
        this.load_estado = false;
        $('#cambiarEstadoCliente-' + id).modal('hide');
        this.ultimos_30_clientes();
      }
    );
  }


  toExcel() {
    if (this.clientes.length >= 1) {
      let today = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
      this.preparar_datos();

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Clientes");

      //Convertiendo nuestro arreglo a un formato legible para excel usando exceljs
      worksheet.addRow(undefined);
      for (let x1 of this._Array) {
        let x2 = Object.keys(x1);

        let temp = []
        for (let y of x2) {
          temp.push(x1[y])
        }
        worksheet.addRow(temp);
      }

      let fname = "matricula-" + today;

      // asignación de la cabeccera del documento excel donde cada campo de los datos que exportaremos sera una columna
      worksheet.columns = [
        { header: 'NOMBRES', key: 'col1', width: 25 },
        { header: 'APELLIDOS', key: 'col2', width: 25 },
        { header: 'FULLNAMES', key: 'col3', width: 35 },
        { header: 'EMAIL', key: 'col4', width: 30 },
        { header: 'TELEFONO', key: 'col5', width: 15 },
        { header: 'ESTADO', key: 'col6', width: 15 },
        { header: 'VERIFIY', key: 'col7', width: 15 },
        { header: 'ROL', key: 'col8', width: 15 },
      ] as any;

      // preparacion del archivo y su descarga
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname + '.xlsx');
      });
    } else {
      $.notify('No hay clientes para exportar', {
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

  toCSV() {
    if (this.clientes.length >= 1) {
      const csvExporter = new ExportToCsv(this.options);
      this.preparar_datos();
      csvExporter.generateCsv(this._Array);
    } else {
      $.notify('No hay matriculas para exportar', {
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

  preparar_datos() {
    this._Array = [];
    let verify = '';
    let estado = '';
    for (var item of this.clientes) {
      if (item.estado) {
        estado = 'Activado';
      } else {
        estado = 'Desactivado';
      }
      if (item.verify) {
        verify = 'Verificado';
      } else {
        verify = 'No verificado';
      }
      this._Array.push({
        nombres: item.nombres,
        apellidos: item.apellidos,
        fullnames: item.fullnames,
        email: item.email,
        telefono: item.telefono,
        estado: estado,
        verify: verify,
        rol: item.tipo,
      })
    }
  }

}
