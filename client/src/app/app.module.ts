import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, LandingPageComponent, SignupComponent],
    imports: [BrowserModule, AppRoutingModule, LoginComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
