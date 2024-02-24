import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'my-class',
  templateUrl: './my-class.component.html',
  styleUrl: './my-class.component.css'
})
export class MyClassComponent {

  user:any

  constructor(public authService:AuthService){
    this.user = this.authService.currentUser()
  }

  showLesson(){
    alert('This feature is not avaliable in demo version.')
  }

}
