// lista-atletas.component.ts

import { Component, OnInit } from '@angular/core';
import { AtletasService } from 'src/app/shared/services/atletas/atletas.service';
import { Atleta } from 'src/app/shared/model/atleta.model';
import { ModalController } from '@ionic/angular';
import { EdicaoAtletaComponent } from '../edicao-atleta/edicao-atleta.component';

@Component({
  selector: 'app-lista-atletas',
  templateUrl: './lista-atletas.component.html',
  styleUrls: ['./lista-atletas.component.scss'],
})
export class ListaAtletasComponent implements OnInit {
  atletasList: Atleta[] = [];

  constructor(
    public atletaService: AtletasService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.getAtletas();
  }

  getAtletas() {
    this.atletaService.getAtletasList().subscribe((data: Atleta[]) => {
      this.atletasList = data;
    });
  }

  async editarAtleta(atleta: Atleta) {
    const modal = await this.modalController.create({
      component: EdicaoAtletaComponent,
      componentProps: {
        atleta: atleta,  // passa o atleta para o componente de edição
      },
    });
  
    modal.onDidDismiss().then((dadosEditados) => {
      if (dadosEditados && dadosEditados.data) {
        const atletaEditado: Atleta = dadosEditados.data;
        this.atletaService.editarAtleta(atleta.id, atletaEditado).subscribe(() => {
          this.getAtletas();
        });
      }
    });
  
    return await modal.present();
  }

  excluirAtleta(atleta: Atleta) {
    this.atletaService.excluirAtleta(atleta.id).subscribe(() => {
      this.getAtletas();
    })
  }
}
