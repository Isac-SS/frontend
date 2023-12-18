import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CriacaoAtletaComponent } from '../atletas/criacao-atleta/criacao-atleta.component'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  mostrarListaAtletas = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  mostrarAtletas() {
    this.mostrarListaAtletas = true;
  }

  async abrirPopupCriacaoAtleta() {
    const modal = await this.modalController.create({
      component: CriacaoAtletaComponent,
      componentProps: {},
    });
    return await modal.present();
  }
}
