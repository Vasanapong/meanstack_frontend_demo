import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  login(userLoginData: any) {
    let requestObject = {
      username: userLoginData.username,
      password: userLoginData.password
    }

    this.http.post('https://meanstack-backend-demo.onrender.com/api/users/login', requestObject)
      .subscribe({
        next: (respone: any) => { localStorage.setItem('token', respone.token); this.router.navigateByUrl('/') },
        error: (error) => alert(error.error)
      })
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }


  isLogin() {
    try{

      let token: any = localStorage.getItem('token')
      let decodedToken: any = jwtDecode(token)

      let isExpired = decodedToken.exp * 1000 < Date.now() ? false : true
      return isExpired

    }catch(error){
      return false
    }


  }

  currentUser(){
    try{
      let token:any = localStorage.getItem('token')
      let decodedToken:any = jwtDecode(token)
      return decodedToken
    }catch(error){
      return this.router.navigateByUrl('/login')
    }

  }

}
