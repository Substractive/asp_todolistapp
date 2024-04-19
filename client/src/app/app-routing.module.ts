import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListeComponent } from './liste/liste.component';
import { ZadaciComponent } from './zadaci/zadaci.component';
import { UrediListuComponent } from './uredi-listu/uredi-listu.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'liste', component: ListeComponent},
  {path: 'lista/:id', component: UrediListuComponent},
  {path: 'zadaci', component:ZadaciComponent},
  {path: '**', component: HomeComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
