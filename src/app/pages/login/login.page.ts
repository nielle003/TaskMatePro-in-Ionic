import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) { }
  
  onLogin(){
    const credentials ={
      email: this.email,
      password: this.password
    };

   this.authService.login(credentials).subscribe(
      async (res) =>{
        if (res.success){
          await this.authService.storeToken(res.token);
        } else{
          this.errorMessage = res.message;
        }
      },
      error => {
        this.errorMessage = 'Server error, Please try again.';
      }
    );
  }
}
