import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreeComponent } from './tree/tree.component';
import { Treev2Component } from './treev2/treev2.component';

const routes: Routes = [
  {
      path: '', component: TreeComponent
  },
  {
      path: 'tree', component: TreeComponent
  },
  {
      path: 'treev2', component: Treev2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
