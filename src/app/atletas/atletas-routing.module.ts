import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtletasPage } from './atletas.page';

const routes: Routes = [
  {
    path: '',
    component: AtletasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtletasPageRoutingModule {}
