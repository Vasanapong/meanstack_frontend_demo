import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ClassroomService } from '../services/classroom.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  // Utility Function
  async loadClassroom() {
    let classrooms: any = await lastValueFrom(this.classroomService.getClassrooms())
    let currentUser = this.authService.currentUser()

    // Compare two [{}]
    let avaliableClassrooms = classrooms.data.filter((classroom: any) => {
      return !currentUser.userClassroom.some((userClassroom: any) => {
        return userClassroom._id === classroom._id
      })
    })

    // Set Value
    this.classrooms = avaliableClassrooms

  }

  addUserClassroom(classroomId: any) {
    let confirmResult = confirm('You want to register this course?')
    if (confirmResult) {
      this.classroomService.addUserClassroom(classroomId)
        .subscribe({
          // Update Token before reload component to make registered class disappear.
          next: (response: any) => { localStorage.setItem('token', response.token); this.loadClassroom() },
          error: (error) => console.log(error)
        })
    }
  }

  constructor(public authService: AuthService, public classroomService: ClassroomService, private ref: ChangeDetectorRef) { }

  classrooms: any = [];

  ngOnInit() {
    this.loadClassroom()
  }

}

