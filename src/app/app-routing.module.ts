import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Rota de redirecionamento para a página inicial
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [
  RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

