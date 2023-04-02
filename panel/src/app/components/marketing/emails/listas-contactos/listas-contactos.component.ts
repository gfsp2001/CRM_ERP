import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
declare var $: any;
@Component({
  selector: 'app-listas-contactos',
  templateUrl: './listas-contactos.component.html',
  styleUrls: ['./listas-contactos.component.css']
})
export class ListasContactosComponent implements OnInit {


  public token = localStorage.getItem('token');

  public listas: Array<any> = [];
  public contactos: Array<any> = [];
  public titulo = '';
  public str_import = '';
  public str_idlist = '';
  public load_contactos = true;
  public load_data = true;
  public load_btn = false;
  public load_btn_delete = false;
  public load_btn_importar = false;
  public load_btn_edit = false;
  public titulo_edit = '';


  constructor(
    private _emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.load_data = true;
    this._emailService.obtener_listas_contactos(this.token).subscribe(
      response => {
        this.listas = response.data.lists;
        this.load_data = false;
      })
  }

  crear_lista() {
    if (this.titulo == '') {
      $.notify('Por favor ingrese un titulo.', {
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
      this._emailService.crear_lista_contactos({ titulo: this.titulo }, this.token).subscribe(
        response => {
          this.load_btn = false;
          $.notify('Lista creada exitosamente.', {
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
          $('#createList').modal('hide');
          this.init_data();
        })
    }

  }

  editar_lista(id: any) {
    if (this.titulo_edit == '') {
      $.notify('Ingrese un titulo.', {
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
      this.load_btn_edit = true;
      this._emailService.editar_lista_contactos(id, { titulo: this.titulo_edit }, this.token).subscribe(
        response => {
          this.load_btn_edit = false;
          $.notify('Lista editada exitosamente.', {
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
          $('#EditarLista-' + id).modal('hide');
          this.init_data();
        })
    }
  }

  eliminar_lista(id: any) {
    this.load_btn_delete = true;
    this._emailService.eliminar_lista(id, this.token).subscribe(
      response => {
        $.notify('Lista eliminada exitosamente.', {
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
        this.load_btn_delete = false;
        $('#EliminarLista-' + id).modal('hide');
        this.init_data();
      });
  }

  openImport(id: any) {
    this.str_idlist = id;
  }

  openEdit(name: any) {
    this.titulo_edit = name;
  }


  importar_contactos() {
    if (this.str_import == '') {
      $.notify('Por favor ingrese datos.', {
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
      let data = {
        str_import: this.str_import,
        idlist: this.str_idlist
      }
      this.load_btn_importar = true;
      this._emailService.importar_contactos(data, this.token).subscribe(
        response => {
          $.notify('Lista creada exitosamente.', {
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
          this.load_btn_importar = false;
          $('#importarContacto').modal('hide');
          this.init_data();
        })
    }

  }

  obtener_contactos(id: any) {
    this.load_contactos = true;
    this._emailService.obtener_contactos_lista(id, this.token).subscribe(
      response => {
        this.contactos = response.data.contacts;
        this.load_contactos = false;
      })
  }


}
