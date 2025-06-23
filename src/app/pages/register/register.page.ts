import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  email:string = '';
  password:string = '';
  message:string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register( this.email, this.password).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('Successfully Registered!');
          this.message = res.message;
          this.router.navigate(['/login']);
        } else {
          alert('Registration Failed');
          console.log(res.error);
        }
      },
      error: (err:any) => {
        alert('Something went wrong');
        console.log(err);
      }
    });
  }

}
