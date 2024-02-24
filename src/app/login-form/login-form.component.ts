import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private authService:AuthService, private router:Router){}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(7)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

  get username() { return this.registerForm.get('username') }
  get password() { return this.registerForm.get('password')}

  onSubmit() {
    let userLoginData = {
      username : this.username?.value,
      password : this.password?.value
    }

    this.authService.login(userLoginData)

  }
}














