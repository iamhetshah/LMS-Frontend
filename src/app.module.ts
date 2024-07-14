import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './app/services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './app/components/header/header.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { LogoutComponent } from './app/components/logout/logout.component';
import { HomeComponent } from './app/components/home/home.component';
import { BookCardComponent } from './app/components/book-card/book-card.component';
import { AllBooksComponent } from './app/components/all-books/all-books.component';
import { FormsModule } from '@angular/forms';
import { BookPageComponent } from './app/components/book-page/book-page.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    HomeComponent,
    BookCardComponent,
    AllBooksComponent,
    BookPageComponent,
  ],
  providers: [CookieService, UserService, provideHttpClient()],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
})
export class AppModule {}
