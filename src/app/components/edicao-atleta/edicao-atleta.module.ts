import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EdicaoAtletaComponent } from './edicao-atleta.component';

@NgModule({
  declarations: [
    EdicaoAtletaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, 
  ],
  exports: [
    EdicaoAtletaComponent,
  ],
})
export class EdicaoAtletaModule {}