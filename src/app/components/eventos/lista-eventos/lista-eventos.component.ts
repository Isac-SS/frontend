// lista-eventos.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventosService } from 'src/app/shared/services/atletas/eventos.service';
import { Evento } from 'src/app/shared/model/evento.model';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { EdicaoEventoComponent } from '../edicao-evento/edicao-evento.component';


@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss'],
})
export class ListaEventosComponent implements OnInit, OnDestroy {
  eventosList: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  termoPesquisa: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    public eventosService: EventosService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getEventos();

    this.eventosService.recarregarEventos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.getEventos();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async getEventos() {
    this.eventosService.getEventosList().subscribe((data: Evento[]) => {
      this.eventosList = data;
      this.filtrarEventos();
    });
  }

  formatarData(data: Date): string {
    const dataLocal = moment.utc(data).local().toDate();
    return moment(dataLocal).format('DD/MM/YYYY');
  }

  filtrarEventos() {
    if (this.termoPesquisa.trim() === '') {
      this.eventosFiltrados = this.eventosList;
    } else {
      this.eventosFiltrados = this.eventosList.filter((evento) =>
        evento.id && evento.id.toString().includes(this.termoPesquisa)
      );
    }
    console.log(this.eventosFiltrados);
  }

  async editarEvento(evento: Evento) {
    const modal = await this.modalController.create({
      component: EdicaoEventoComponent,
      componentProps: {
        evento: { ...evento },
      },
    });
  
    modal.onDidDismiss().then((dadosEditados) => {
      if (dadosEditados && dadosEditados.data) {
        const eventoEditado: Evento = dadosEditados.data;
  
        const eventoId = evento.id ? evento.id : '';
        this.eventosService.editarEvento(eventoId, eventoEditado).subscribe(() => {
          this.getEventos();
        });
      }
    });
  
    await modal.present();
  }

  async excluirEvento(evento: Evento) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Deseja excluir esse evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            if (evento.id) {
              this.eventosService.excluirEvento(evento.id).subscribe(() => {
                console.log(`Evento ${evento.id} excluído com sucesso.`);
                this.getEventos();
              }, (error) => {
                console.error(`Erro ao excluir evento: ${error}`);
              });
            } else {
              console.error('Id do evento indefinido');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
}
