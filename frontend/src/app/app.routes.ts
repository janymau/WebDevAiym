import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RadPageComponent } from './rad-page/rad-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'rad', component: RadPageComponent},
    {path: 'login', component: LoginComponent},
    {path:'register', component: RegisterComponent}

];
