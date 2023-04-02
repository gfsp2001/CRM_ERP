import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var spectrum: any;
declare var $: any;
@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  public token = localStorage.getItem('token');
  public config: any = {};
  public config_finanza: any = {};
  public str_portada: any = 'assets/img/firm.png';
  public logo: any = undefined;
  public url = GLOBAL.url;
  public load_btn = false;
  public load_btn_finanza = false;

  constructor(
    private _configuracionesService: ConfiguracionService
  ) { }

  ngOnInit(): void {
    this.init_configuraciones();
    this.init_config_finanza();
  }

  init_configuraciones() {
    this._configuracionesService.obtener_configuracion_general_admin(this.token).subscribe(
      response => {
        this.config = response.data;
        this.str_portada = this.url + 'get_image_configuracion/' + this.config.logo;
        setTimeout(() => {
          $('#color-picker').spectrum({
            type: 'component',
          });
        }, 150);
      })
  }

  fileEventChange(event: any): void {

    var file: any;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

      if (file.size <= 2000000) {
        if (file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/webp') {
          this.logo = file;
          this.config.logo = this.logo;

          const reader = new FileReader();
          reader.onload = e => this.str_portada = reader.result;
          reader.readAsDataURL(file);

        } else {
          $.notify('Solo se permite la seccion de imagen.', {
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
          this.logo = undefined;
        }
      } else {
        $.notify('La imagen no puede superar los 2MB.', {
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
        this.logo = undefined;
      }
    }


  }

  update() {
    this.config.logo = this.logo;
    this.config.background = $('#color-picker').spectrum('get').toHexString();
    if (!this.config.razon_social) {
      $.notify('Ingrese la razon social.', {
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
    } else if (!this.config.slogan) {
      $.notify('Ingrese el slogan.', {
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
    } else if (!this.config.background) {
      $.notify('Debe seleccionar el color del panel.', {
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
    } else if (!this.config.categorias) {
      $.notify('Debe ingresar las categorias.', {
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
    } else if (!this.config.canales) {
      $.notify('Dege ingresar los caneles.', {
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
    } else {
      this.load_btn = true;
      this._configuracionesService.actualizar_configuracion_general_admin(this.config, this.token).subscribe(
        response => {
          $.notify('actualizado exitosamente.', {
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
          this.init_configuraciones();
          this.load_btn = false;
        })
    }
  }

  init_config_finanza() {
    this._configuracionesService.obtener_configuracion_finanza_admin(this.token).subscribe(
      response => {
        this.config_finanza = response.data;
      })
  }

  actualizar_finanza() {
    if (!this.config_finanza.ganancia_producto) {
      $.notify('Debe ingresar el valor de ganancia.', {
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
    } else {
      this.load_btn_finanza = true;
      this._configuracionesService.actualizar_configuracion_finanza_admin(this.config_finanza, this.token).subscribe(
        response => {
          $.notify('actualizado exitosamente.', {
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
          this.init_config_finanza();
          this.load_btn_finanza = false;
        });
    }
  }

}
