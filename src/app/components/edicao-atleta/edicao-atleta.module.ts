import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EdicaoAtletaComponent } from './edicao-atleta.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EdicaoAtletaComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule], 
  exports: [EdicaoAtletaComponent],
})
export class EdicaoAtletaModule {}