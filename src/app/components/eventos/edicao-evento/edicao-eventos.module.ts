import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EdicaoEventoComponent } from './edicao-evento.component';

@NgModule({
  declarations: [
    EdicaoEventoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    EdicaoEventoComponent,
  ],
})
export class EdicaoEventoModule {}