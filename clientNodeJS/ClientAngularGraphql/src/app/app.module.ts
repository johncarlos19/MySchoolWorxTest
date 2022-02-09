import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { ShirtComponent } from './components/shirt/shirt.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderPresentationComponent } from './components/header-presentation/header-presentation.component';
import { BodyComponentComponent } from './components/body-component/body-component.component';
import {SharedModule} from "./components/shared/shared.module";
import { HomeComponent } from './components/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import { ProductComponent } from './components/product/product.component';
import { AddShirtComponent } from './components/add-shirt/add-shirt.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import { ShirtEditComponent } from './components/shirt-edit/shirt-edit.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ShirtComponent,
    NavBarComponent,
    HeaderPresentationComponent,
    BodyComponentComponent,
    HomeComponent,
    ProductComponent,
    AddShirtComponent,
    AddCarComponent,
    ShirtEditComponent,
    CarEditComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    MatCardModule,
    ReactiveFormsModule

  ],
  providers: [],
  exports: [
    NavBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
