import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatriculaService } from 'src/app/services/matricula.service';
import { I18nInterface } from 'ngx-image-drawing';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $: any;

@Component({
  selector: 'app-contrato-matricula',
  templateUrl: './contrato-matricula.component.html',
  styleUrls: ['./contrato-matricula.component.css']
})
export class ContratoMatriculaComponent implements OnInit {

  public token = localStorage.getItem('token');
  public id = '';
  public load_data = true;
  public data = false;
  public imageUrl = '';
  public I18n: I18nInterface = {
    saveBtn: 'Confirmar firma',
    sizes: {
      extra: 'Extra'
    }
  }
  public logotipo = '';
  public url = GLOBAL.url;

  public matricula: any = {}

  constructor(
    private _matriculaService: MatriculaService,
    private _configuracionesService: ConfiguracionService,
    private _route: ActivatedRoute
  ) {
    this.init_configuraciones();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._matriculaService.obtener_matriculas_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.data = false;
            } else {
              this.data = true;
              this.matricula = response.data;
            }
            this.load_data = false;
          });
      });
  }

  init_configuraciones() {
    this._configuracionesService.obtener_configuracion_general_admin(this.token).subscribe(
      response => {
        this.logotipo = response.data.logo;
      })
  }

  save(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event);
    reader.onloadend = () => {
      var img = reader.result;
      $('#firma_img').val(img);
      let firma = $('#firma_img').val();
      this._matriculaService.firmar_matricula_admin(this.id, { firma: firma }, this.token).subscribe(
        response => {

          $.notify('Se firmó correctamente el contrato.', {
            type: 'success',
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
          $('#firmaModal').modal('hide');
          window.location.reload();
        })
    }
  }
  cancel() { }

}
