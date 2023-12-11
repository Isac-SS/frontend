import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ListaAtletasModule } from '../components/lista-atletas/lista-atletas.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, IonicModule, ListaAtletasModule],
})
export class HomeModule {}
