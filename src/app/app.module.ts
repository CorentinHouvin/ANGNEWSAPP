import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Router
import { RouterModule } from "@angular/router"
import { AppRouterModule } from "./app.router";

import { AppComponent } from './app.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedPageComponent } from './routes/connected-page/connected-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { CrudService } from "./services/crud/crud.service";
import { FormLoginComponent } from './shared/form-login/form-login.component';
import { AuthService } from "./services/auth/auth.service";
import { FormRegisterComponent } from './shared/form-register/form-register.component';
import { BookmarksPageComponent } from './routes/bookmarks-page/bookmarks-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConnectedPageComponent,
    HeaderComponent,
    FormLoginComponent,
    FormRegisterComponent,
    BookmarksPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouterModule, { onSameUrlNavigation: 'reload' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CrudService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
