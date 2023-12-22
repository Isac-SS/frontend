import { Component, OnInit } from '@angular/core';
import { AtletasService } from 'src/app/shared/services/atletas/atletas.service';
import { Atleta } from 'src/app/shared/model/atleta.model';
import { ModalController } from '@ionic/angular';
import { EdicaoAtletaComponent } from '../edicao-atleta/edicao-atleta.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-atletas',
  templateUrl: './lista-atletas.component.html',
  styleUrls: ['./lista-atletas.component.scss'],
})

export class ListaAtletasComponent implements OnInit {
  atletasList: Atleta[] = [];
  atletasFiltrados: Atleta[] = [];
  termoPesquisa: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    public atletaService: AtletasService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.getAtletas();

    this.atletaService.recarregarAtletas$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.getAtletas();
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAtletas() {
    this.atletaService.getAtletasList().subscribe((data: Atleta[]) => {
      this.atletasList = data;
      this.filtrarAtletas();
    });
  }

  filtrarAtletas() {
    if(this.termoPesquisa.trim() === ''){
      this.atletasFiltrados = this.atletasList;
    } else {
      this.atletasFiltrados = this.atletasList.filter(atleta =>
        atleta.cod.toString().includes(this.termoPesquisa));
    }
}

  async editarAtleta(atleta: Atleta) {
    const modal = await this.modalController.create({
      component: EdicaoAtletaComponent,
      componentProps: {
        atleta: atleta,  
      },
    });
  
    modal.onDidDismiss().then((dadosEditados) => {
      if (dadosEditados && dadosEditados.data) {
        const atletaEditado: Atleta = dadosEditados.data;
        this.atletaService.editarAtleta(atleta.cod, atletaEditado).subscribe(() => {
          this.getAtletas();
        });
      }
    });
  
    return await modal.present();
  }

  excluirAtleta(atleta: Atleta) {
    if (atleta.cod) {
      this.atletaService.excluirAtleta(atleta.cod).subscribe(() => {
        console.log(`Atleta ${atleta.cod} excluído com sucesso.`);
        this.getAtletas();
      }, (error) => {
        console.error(`Erro ao excluir atleta: ${error}`);
      });
    } else {
      console.error('Código do atleta indefinido');
    }
  }
}