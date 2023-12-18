import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';
import { ListaAtletasModule } from '../atletas/lista-atletas/lista-atletas.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, IonicModule, ListaAtletasModule],
})
export class HomeModule {}
