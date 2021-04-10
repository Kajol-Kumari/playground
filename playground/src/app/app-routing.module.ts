import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PgroundComponent } from './component/pground/pground.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "ground", component: PgroundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
