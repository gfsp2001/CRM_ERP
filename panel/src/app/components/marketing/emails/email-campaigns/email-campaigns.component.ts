import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
declare var $: any;

@Component({
  selector: 'app-email-campaigns',
  templateUrl: './email-campaigns.component.html',
  styleUrls: ['./email-campaigns.component.css']
})
export class EmailCampaignsComponent implements OnInit {

  public token = localStorage.getItem('token');
  public campaign: any = {
    listid: ''
  };
  public campaigns: Array<any> = [];
  public listas: Array<any> = [];

  public email: any = {
    listid: ''
  };

  public load_data = true;
  public load_btn = false;
  public load_btn_eliminar = false;
  public load_btn_desplegar = false;
  public load_btn_edit = false;

  constructor(
    private _emailService: EmailService,
  ) { }

  ngOnInit(): void {
    this.init_data();
    this.init_listas();
  }

  init_data() {
    this.load_data = true;
    this._emailService.obtener_campaings(this.token).subscribe(
      response => {
        this.campaigns = response.data.campaigns;
        this.load_data = false;
      })
  }

  init_listas() {
    this.listas = [];
    this._emailService.obtener_listas_contactos(this.token).subscribe(
      response => {
        this.listas = response.data.lists;
      })
  }

  crear() {
    if (!this.email.name) {
      $.notify('Por favor ingrese un nombre de campaña.', {
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
    } else if (!this.email.subject) {
      $.notify('Por favor ingrese el asunto de la campaña.', {
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

    } else if (!this.email.html_content) {
      $.notify('Por favor ingrese un contenido de la campaña.', {
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

    } else if (!this.email.listid) {
      $.notify('Por favor seleccione una lista.', {
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
      this._emailService.crear_campaign(this.email, this.token).subscribe(
        response => {
          this.load_btn = false;
          $('#createEmail').modal('hide');
          this.email = {
            listid: ''
          };
          $.notify('Campaña creada exitosamente.', {
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

          this.init_data();
        })
    }

  }

  eliminar_campaign(id: any) {

    this.load_btn_eliminar = true;
    this._emailService.eliminar_campaign(id, this.token).subscribe(
      response => {
        this.load_btn_eliminar = false;
        $('#EliminarCampaign-' + id).modal('hide');

        $.notify('Campaña eliminada exitosamente.', {
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

        this.init_data();
      })
  }

  obtener_one_campaign(id: any) {
    this.campaign = { listid: '' };
    this._emailService.obtener_one_campaign(id, this.token).subscribe(
      response => {
        this.campaign.id = id;
        this.campaign.name = response.data.name;
        this.campaign.subject = response.data.subject;
        this.campaign.html_content = response.data.htmlContent;
        this.campaign.listid = response.data.recipients.lists[0];
      })



  }

  editar_one_campaign(id: any) {
    if (!this.campaign.name) {
      $.notify('Por favor ingrese un nombre de campaña.', {
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
    } else if (!this.campaign.subject) {
      $.notify('Por favor ingrese el asunto de la campaña.', {
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

    } else if (!this.campaign.html_content) {
      $.notify('Por favor ingrese un contenido de la campaña.', {
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

    } else if (!this.campaign.listid) {
      $.notify('Por favor seleccione una lista.', {
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
      this._emailService.editar_campaign(id, this.campaign, this.token).subscribe(
        response => {
          this.load_btn_edit = false;
          $('#EditarCapaign').modal('hide');
          $.notify('Campaña editada exitosamente.', {
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
          this.init_data();
        })
    }

  }

  enviar_email(id: any) {
    this.load_btn_desplegar = true;
    this._emailService.enviar_email_campaign({ id: id }, this.token).subscribe(
      response => {

        this.load_btn_desplegar = false;
        $('#desplegarCampaign-' + id).modal('hide');

        $.notify('Campaña desplegada exitosamente.', {
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
        this.init_data();
      })
  }

}
