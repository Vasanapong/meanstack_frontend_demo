import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  getClassrooms(){
    return this.http.get('https://meanstack-backend-demo.onrender.com/api/classrooms')
  }

  addUserClassroom(classroomId:any){
    let user = this.authService.currentUser()

    let requestObject = {
      userId : user.userId,
      classroomId : classroomId
    }
    
    return this.http.post('https://meanstack-backend-demo.onrender.com/api/users/add-classroom',requestObject)
  }
}
