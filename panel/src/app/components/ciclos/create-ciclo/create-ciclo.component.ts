import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { CursoService } from 'src/app/services/curso.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $: any;
@Component({
  selector: 'app-create-ciclo',
  templateUrl: './create-ciclo.component.html',
  styleUrls: ['./create-ciclo.component.css']
})
export class CreateCicloComponent implements OnInit {

  public token = localStorage.getItem('token');
  public id = '';
  public btn_load = false;
  public ciclo: any = {
    nivel: '',
    sede: ''
  };
  public h_inicio = { hour: 13, minute: 30 };
  public h_fin = { hour: 13, minute: 30 };
  public data = false;
  public titulo = '';
  public load_data = true;
  public salon: any = {
    salon: ''
  };
  public dias: Array<any> = [];
  public salones: Array<any> = [];

  public str_today = GLOBAL.str_today;

  constructor(
    private _route: ActivatedRoute,
    private _cursoService: CursoService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._cursoService.obtener_datos_curso_admin(this.id, this.token).subscribe(
          response => {
            if (response.data != undefined) {
              this.data = true;
              this.titulo = response.data.titulo;
              this.load_data = false;
            } else {
              this.data = false;
              this.load_data = false;
            }
          });
      });
  }

  registrar() {
    this.ciclo.curso = this.id;
    this.ciclo.salones = this.salones;
    if (!this.ciclo.nivel) {
      $.notify('Seleccione el nivel del ciclo.', {
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
    } else if (!this.ciclo.sede) {
      $.notify('Seleccione la sede del ciclo.', {
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
    } else if (!this.ciclo.f_inicio) {
      $.notify('Ingrese la fecha inicio de clases.', {
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
    } else if (!this.ciclo.f_fin) {
      $.notify('Ingrese la fecha fin de clases.', {
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
    } else if (!this.ciclo.precio) {
      $.notify('Ingrese el precio del ciclo.', {
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
    } else if (this.ciclo.precio <= 0) {
      $.notify('Ingrese un precio válido del ciclo.', {
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
    } else if (this.ciclo.salones.length <= 0) {
      $.notify('Ingrese al menos un salon.', {
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
      this._cursoService.crear_ciclo_admin(this.ciclo, this.token).subscribe(response => {

        $.notify('Se registro el nuevo ciclo.', {
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

        this._router.navigate(['/cursos/' + this.id + '/ciclo']);

      })

    }

  }

  agregar_ciclo() {
    if (this.h_inicio || this.h_inicio != undefined || this.h_inicio != null) {
      this.salon.h_inicio = this.h_inicio.hour + ':' + this.h_inicio.minute;
    }
    if (this.h_fin || this.h_fin != undefined || this.h_fin != null) {
      this.salon.h_fin = this.h_fin.hour + ':' + this.h_fin.minute;
    }
    this.salon.f_dias = this.dias;

    if (!this.salon.salon) {
      $.notify('Seleccione el salon a agregar.', {
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
    } else if (!this.salon.aforo_total) {
      $.notify('Ingrese el aforo del salon.', {
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
    } else if (this.salon.aforo_total <= 0) {
      $.notify('Ingrese un aforo valido.', {
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
    } else if (!this.salon.h_inicio) {
      $.notify('Ingrese la hora de inicio del salon.', {
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
    } else if (!this.salon.h_fin) {
      $.notify('Ingrese la hora de fin del salon.', {
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
    } else if (this.salon.f_dias.length <= 0) {
      $.notify('Seleccione almenos un dia.', {
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


      this.salones.push(this.salon);
      this.dias = [];
      this.salon = {
        salon: ''
      };

      $('.custom-control-input').prop('checked', false);

    }

    //console.log(this.salon);

  }

  select_day(event: any) {
    let status = event.currentTarget.checked;
    let value = event.target.value;
    if (status) {
      this.dias.push(value);
    } else {
      let indice = 0;
      this.dias.forEach((element, index) => {
        if (element == value) {
          this.dias.splice(index, 1);
        }
      });
    }
  }

  eliminar_salon(idx: any) {
    this.salones.splice(idx, 1);
  }


}
