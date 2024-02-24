import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public authService:AuthService){
    
  }

  toggleMobileDropdown(){
    let mobileDropdown:any = document.getElementById('menu');
    if(mobileDropdown.classList.contains('active')){
      mobileDropdown.style.top = '-100vh'
      window.onscroll = null
      mobileDropdown.classList.remove('active')
    }else{
      mobileDropdown.style.top = '56px'
      window.onscroll = function(){window.scrollTo(0,0)}
      mobileDropdown.classList.add('active')
    }
  }

}
