import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
declare var $: any;

@Component({
  selector: 'app-edit-cursos',
  templateUrl: './edit-cursos.component.html',
  styleUrls: ['./edit-cursos.component.css']
})
export class EditCursosComponent implements OnInit {

  public curso: any = {};
  public btn_load = false;
  public id = '';
  public token = localStorage.getItem('token');
  public banner: File | any = undefined;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _cursoService: CursoService) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.init_data();
      })
  }

  init_data() {
    this._cursoService.obtener_datos_curso_admin(this.id, this.token).subscribe(
      response => {
        this.curso = response.data;
        this.curso.banner = undefined;
      })
  }

  fileEventChange(event: any): void {

    var file: any;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

      if (file.size <= 2000000) {
        if (file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/webp') {
          this.banner = file;
          this.curso.banner = this.banner;
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
          this.banner = undefined;
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
        this.banner = undefined;
      }
    }

  }

  actualizar() {

    if (!this.curso.titulo) {

      $.notify('Ingrese el titulo del curso.', {
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

    } else if (!this.curso.descripcion) {

      $.notify('Ingrese la descripcion del curso.', {
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

      this.btn_load = true;
      this._cursoService.actualizar_curso_admin(this.id, this.curso, this.token).subscribe(
        response => {

          this.btn_load = false;

          $.notify('Se actualizó el curso correctamente.', {
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
          this._router.navigate(['/cursos']);
        })

    }

  }

}
