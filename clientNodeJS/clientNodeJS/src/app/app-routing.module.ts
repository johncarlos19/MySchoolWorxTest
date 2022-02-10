import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CarComponent} from "./components/car/car.component";
import {ShirtComponent} from "./components/shirt/shirt.component";
import {ProductComponent} from "./components/product/product.component";
import {AddShirtComponent} from "./components/add-shirt/add-shirt.component";
import {AddCarComponent} from "./components/add-car/add-car.component";
import {CarEditComponent} from "./components/car-edit/car-edit.component";
import {ShirtEditComponent} from "./components/shirt-edit/shirt-edit.component";

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: 'full'},
  {path: 'home',component: HomeComponent},
  {path: 'shirt',component: ShirtComponent},
  {path: 'AddShirt',component: AddShirtComponent},
  {path: 'AddCar',component: AddCarComponent},
  {path: 'EditCar',component: CarEditComponent},
  {path: 'EditShirt',component: ShirtEditComponent},
  {path: 'car',component: CarComponent},
  {path: 'product',component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
