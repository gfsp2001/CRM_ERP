import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var $: any;
@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {

  public token = localStorage.getItem('token');
  public id = '';
  public producto: any = {};
  public categorias: Array<any> = [];
  public str_portada: any = '';
  public portada: any = undefined;
  public data = false;
  public load_data = true;
  public load_btn = false;
  public dataVariedad = false;
  public load_dataVariedad = true;
  public load_btnVariedad = false;
  public load_eliminar = false;

  public url = GLOBAL.url;
  public variedad: any = {};
  public variedades: Array<any> = [];


  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.init_categorias();

    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.init_producto();
        this.init_variedades();
      })
    setTimeout(() => {
      $('.selectpicker').selectpicker();
    }, 50);
  }

  fileEventChange(event: any): void {

    var file: any;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

      if (file.size <= 2000000) {
        if (file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/webp') {
          this.portada = file;
          this.producto.portada = this.portada;

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
          this.portada = undefined;
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
        this.portada = undefined;
      }
    }


  }

  init_categorias() {
    this._productoService.obtener_configuraciones().subscribe(
      response => {
        this.categorias = response.categorias;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 50);
      });
  }

  init_producto() {
    this.load_data = true;
    this._productoService.obtener_datos_producto_admin(this.id, this.token).subscribe(
      response => {
        if (response.data == undefined) {
          this.data = false;
        } else {
          this.data = true;
          this.producto = response.data;
          this.str_portada = this.url + 'get_image_producto/' + this.producto.portada;
          this.producto.portada = undefined;
        }

        this.load_data = false;
      });
  }

  actualizar() {
    this.load_btn = true;
    if (!this.producto.titulo) {
      $.notify('Debe ingresar el nombre del producto.', {
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
    } else if (!this.producto.categoria) {
      $.notify('Debe seleccionar la categoria del producto.', {
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
    } else if (!this.producto.tipo) {
      $.notify('Seleccione el tipo del producto.', {
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
    } else if (!this.producto.tipo_variedad) {
      $.notify('Debe ingresar el tipo de variedad.', {
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
    } else if (!this.producto.descripcion) {
      $.notify('Ingrese la descripcion del producto.', {
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
      // this._router.navigate(['/productos'])
      this._productoService.actualizar_producto_admin(this.id, this.producto, this.token).subscribe(
        response => {
          $.notify('Se actualizaron los datos correctamente.', {
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
          this.load_btn = false;
        })

    }

  }

  generar_sku() {
    if (!this.variedad.titulo) {
      $.notify('Debe ingresar el titulo de variedad.', {
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
      let sku_tipo = this.producto.tipo.charAt(0).toUpperCase();
      let sku_nombre = this.producto.titulo.substr(0, 3).toUpperCase();
      let sku_tvariedad = this.producto.tipo_variedad.substr(0, 3).toUpperCase();
      let sku_variedad = this.variedad.titulo.substr(0, 3).toUpperCase();

      let sku = sku_tipo + '-' + sku_nombre + '-' + sku_tvariedad + '-' + sku_variedad;
      this.variedad.sku = sku;

    }
  }

  agregar_variedad() {
    if (!this.variedad.titulo) {
      $.notify('Debe ingresar el titulo de variedad.', {
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
    } else if (!this.variedad.sku) {
      $.notify('Ingrese el SKU.', {
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
      this.load_btnVariedad = true;
      this.variedad.producto = this.id;
      this._productoService.agregar_variedad_producto_admin(this.variedad, this.token).subscribe(
        response => {
          $.notify('se agrego la nueva variedad.', {
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
          this.load_btnVariedad = false;
          this.variedad = {};
          this.init_variedades();
        })

    }

  }

  init_variedades() {
    this.load_dataVariedad = true;
    this._productoService.obtener_variedades_producto_admin(this.id, this.token).subscribe(
      response => {
        if (response.data != undefined) {
          this.dataVariedad = true;
          this.variedades = response.data;
        } else {
          this.dataVariedad = false;
        }
        this.load_dataVariedad = false;
      })
  }

  delete_variedad(id: any) {
    this.load_eliminar = true;
    this._productoService.eliminar_variedad_producto_admin(id, this.token).subscribe(
      response => {
        if (response.data == true) {
          this.init_variedades();
          $.notify('Se eliminó la variedad.', {
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
          $('#delete-' + id).modal('hide');
        } else {
          $.notify(response.message, {
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
        this.load_eliminar = false;
      })
  }

}
