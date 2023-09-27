import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



//components
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent, // Use "component" em vez de "loadChildren"
  },
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
