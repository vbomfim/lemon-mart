import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PosComponent } from './pos.component';

const routes: Routes = [{ path: '', component: PosComponent, children: [] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
