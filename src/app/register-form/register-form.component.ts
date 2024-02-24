import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface RegisterResponse{
  username:string,
  email:string,
  password:string
}

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  constructor(private http: HttpClient, private router:Router){}

  checkMatchPassword():ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null =>{

      let password = control.get('password')?.value
      let confirmPassword = control.get('confirmPassword')?.value

      if(password !== confirmPassword){
        return { checkMatchPassword : true}
      }

      return null
    }
  }
  
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(10)])
  },{validators:this.checkMatchPassword()})

  get username() { return this.registerForm.get('username') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password')}
  get confirmPassword() { return this.registerForm.get('confirmPassword') }

  onSubmit() {
    let userObject = {
      username : this.username?.value,
      email:this.email?.value,
      password : this.password?.value
    }

    const headers = new HttpHeaders({ 'content-type':'application/json'})
    this.http.post<RegisterResponse>('https://meanstack-backend-demo.onrender.com/api/users',JSON.stringify(userObject),{headers})
    .subscribe({
      next:(response) => {
        this.router.navigateByUrl('/login')
      },
      error:(error) => alert(error.error.message)
    })

  }
}












