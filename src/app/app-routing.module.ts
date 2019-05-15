import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';

const routes: Routes = [
  { path: 'add', component: AddDataComponent },
  //{ path: 'settings', component: SettingsComponent },
  //{ path: 'graph', component: GraphComponent },
  //{ path: '', redirectTo: '/graph', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
