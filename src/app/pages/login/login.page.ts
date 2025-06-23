import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }
  
  onLogin(){
    const credentials ={
      email: this.email,
      password: this.password
    };

    console.log(this.email);
    console.log(this.password);
   this.authService.login(credentials).subscribe({
      next: async (res) => {
        console.log('Backend response:', res);
        if (res.success) {
          await this.authService.storeToken(res.token);
          console.log('saved token:', res.token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = res.message || 'Login failed';
        }
      },
      error: (err) => {
        console.error('Backend error:', err);
        this.errorMessage = 'Server error';
      }
    });

  }

  onRegister(){
    this.router.navigate(['/register']);
  }
}
