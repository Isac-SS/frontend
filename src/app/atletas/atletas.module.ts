import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtletasPageRoutingModule } from './atletas-routing.module';

import { AtletasPage } from './atletas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtletasPageRoutingModule
  ],
  declarations: [AtletasPage]
})
export class AtletasPageModule {}
