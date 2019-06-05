import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { GraphComponent } from './graph/graph.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'add', component: AddDataComponent, data: { type: 'add' }},
  { path: 'goal', component: AddDataComponent, data: { type: 'goal' }},
  { path: 'settings', component: SettingsComponent },
  { path: '', component: GraphComponent },
  { path: 'graph', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
