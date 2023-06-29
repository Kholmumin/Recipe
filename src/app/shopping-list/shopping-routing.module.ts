import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const shopingRoutes: Routes = [{ path: '', component: ShoppingListComponent }];

@NgModule({
  imports: [RouterModule.forChild(shopingRoutes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
