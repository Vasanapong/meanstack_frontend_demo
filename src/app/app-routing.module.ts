import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MyClassComponent } from './my-class/my-class.component';
import { canActiveHomepage, canActiveMyClass } from './services/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: '', component:HomepageComponent, canActivate:[canActiveHomepage]},
  {path: 'register', component: RegisterFormComponent},
  {path: 'login' , component: LoginFormComponent},
  {path: 'my-class', component: MyClassComponent, canActivate:[canActiveMyClass]},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
