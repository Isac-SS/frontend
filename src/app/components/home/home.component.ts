import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CriacaoAtletaComponent } from '../atletas/criacao-atleta/criacao-atleta.component'; 
import { CriacaoEventoComponent } from '../eventos/criacao-evento/criacao-evento.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mostrarListaAtletas: boolean = true;
  mostrarListaEventos: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  mostrarAtletas() {
    this.mostrarListaAtletas = true;
    this.mostrarListaEventos = false;
  }

  mostrarEventos() {
    this.mostrarListaAtletas = false;
    this.mostrarListaEventos = true;
  }

  async abrirPopupCriacaoItem() {
    let component;
    if(this.mostrarListaAtletas) {
      component = CriacaoAtletaComponent;
    } else if (this.mostrarListaEventos) {
      component = CriacaoEventoComponent;
    }
    
    if(component) {
      const modal = await this.modalController.create({
        component: component,
        componentProps: {},
      });
      return await modal.present();
    } 
  }
}