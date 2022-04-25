import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitterModule } from "primeng/splitter";
import {BadgeModule} from 'primeng/badge';
import {CarouselModule} from 'primeng/carousel';
import { InputNumberModule } from "primeng/inputnumber";
import {SpeedDialModule} from 'primeng/speeddial';
import {ImageModule} from 'primeng/image';

import { AuthGuard } from './jwt/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { JwtInterceptor } from './jwt/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    ProductsComponent,
    CartComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    HttpClientModule,
    MessagesModule,
    ConfirmDialogModule, 
    BrowserAnimationsModule,
    DialogModule,
    MenubarModule,
    TableModule,
    DataViewModule,
    DropdownModule,
    ToggleButtonModule,
    SplitterModule,
    BadgeModule,
    CarouselModule,
    InputNumberModule,
    SpeedDialModule,
    ImageModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
