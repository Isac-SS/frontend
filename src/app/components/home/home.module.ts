import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';
import { ListaAtletasModule } from '../atletas/lista-atletas/lista-atletas.module';
import { ListaEventosModule } from '../eventos/lista-eventos/lista-eventos.module';
import { listaEmbarcacoesModule } from '../embarcacoes/lista-embarcacoes/lista-embarcacoes.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, IonicModule, ListaAtletasModule, ListaEventosModule, listaEmbarcacoesModule],
  exports: [HomeComponent ],
})
export class HomeModule {}
