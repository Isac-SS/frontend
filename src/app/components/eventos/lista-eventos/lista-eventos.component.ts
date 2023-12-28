import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/shared/services/atletas/eventos.service';
import { Evento } from 'src/app/shared/model/evento.model';
import { ModalController } from '@ionic/angular';
import { EdicaoEventoComponent } from '../edicao-evento/edicao-evento.component';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateUtils } from 'src/utils/date-utils';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss'],
})
export class ListaEventosComponent implements OnInit {
  eventosList: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  termoPesquisa: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    public eventosService: EventosService,
    private modalController: ModalController,
    private dataPipe: DatePipe
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
      this.eventosList = data.map((evento) => ({
        ...evento,
        dataFormatada: DateUtils.formatarParaBr(new Date(evento.dataEvento)),
      }));
  
      this.filtrarEventos();  
    });
  }

  formatarData(data: Date): string | null {
    return this.dataPipe.transform(data, 'dd/MM/yy');
  }

  filtrarEventos() {
    if (this.termoPesquisa.trim() === '') {
      this.eventosFiltrados = this.eventosList;
    } else {
      this.eventosFiltrados = this.eventosList.filter((evento) =>
        evento.id.toString().includes(this.termoPesquisa)
      );
    }
    console.log(this.eventosFiltrados);
  }

  async editarEvento(evento: Evento) {
  
    const modal = await this.modalController.create({
      component: EdicaoEventoComponent,
      componentProps: {
        evento: evento,
      },
    });
  
    modal.onDidDismiss().then((dadosEditados) => {
  
      if (dadosEditados && dadosEditados.data) {
        const eventoEditado: Evento = dadosEditados.data;

        this.eventosService
          .editarEvento(evento.id, eventoEditado)
          .subscribe(() => {
            this.getEventos();
          });
      }
    });
  
    await modal.present();
  }
}
