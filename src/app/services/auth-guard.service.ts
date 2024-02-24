import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private http: HttpClient, private router: Router) { }

  canActive(){
    // Prepare Request Object
    let token = localStorage.getItem('token')
    let requestObject = { token : token }

    // Send Http Requests
    const headers = new HttpHeaders({'content-type':'application/json'})
    this.http.post('https://meanstack-backend-demo.onrender.com/api/users/verify',JSON.stringify(requestObject),{headers})
    .subscribe({
      next: (response) =>  { return true },
      error: (error) => { console.log(error.error.message) ; alert('You must login to access content.');this.router.navigateByUrl('/login')}
    })
  }

}

export const canActiveMyClass = (route:any, state:any) =>{
  return inject(AuthGuardService).canActive()
}

export const canActiveHomepage = (route:any, state:any) =>{
  return inject(AuthGuardService).canActive()
}