import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;
@Component({
  selector: 'app-llamadas-cliente',
  templateUrl: './llamadas-cliente.component.html',
  styleUrls: ['./llamadas-cliente.component.css']
})
export class LlamadasClienteComponent implements OnInit {

  public id='';
  public llamada:any ={
    resultado: ''
  };
  public str_today = GLOBAL.str_today;
  public time = { hour: 13, minute: 30 };
  public btn_load = false;
  public token = localStorage.getItem('token');
  public llamadas:Array<any>=[];
  public page= 1;
  public pageSize = 7;
  public data=false;
  public load_data =true;

  constructor(
  private _route: ActivatedRoute,
  private _clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._clienteService.obtener_datos_cliente_admin(this.id, this.token).subscribe(
          response => { 
            if (response.data != undefined) {
                this.data=true;
                this.load_data = false;
                this.init_data();
            }else{
                this.data=false;
                this.load_data = false;
            }
        });
        
    })
  }

  init_data(){
    this._clienteService.listar_llamada_prospeccion_admin(this.id, this.token).subscribe(
      response => {
        this.llamadas = response.data;
      })
  }

  registrar(){
    if (this.time ||this.time != undefined || this.time != null) {
      this.llamada.hora = this.time.hour + ':'+this.time.minute;
    }
    if (!this.llamada.fecha) {
      $.notify('Ingrese la fecha correctamente.', { 
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
    }else if(!this.llamada.resultado){
        $.notify('Seleccione el resultado correctamente.', { 
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
    }else if(!this.llamada.hora){
      $.notify('Ingrese la hora correctamente.', { 
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
    }else{
      this.btn_load= true;
      this.llamada.cliente = this.id;
      this.llamada.asesor = localStorage.getItem('_id');
      this._clienteService.crear_llamada_prospeccion_admin(this.llamada,this.token).subscribe(
        response=>{
        $('#modalLlamada').modal('hide');
        this.btn_load= false;
        this.init_data();
        this.llamada ={
          resultado: ''
        };
        $.notify('Se registro correctamente la llamada.', { 
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
      });
    }

  }

}
