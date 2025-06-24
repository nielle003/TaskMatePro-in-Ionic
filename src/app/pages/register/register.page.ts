import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
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

  constructor(private authService: AuthService, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  
  ) { }

  ngOnInit() {
  }

  async register() {
    const loading = await this.loadingCtrl.create({
      message: 'Registering...',
      spinner: 'crescent',
      duration: 3000
    });

    await loading.present();

    try {
      const res: any = await firstValueFrom(this.authService.register(this.email, this.password));
      await loading.dismiss();

      if (res.success) {
        this.showToast('Successfully Registered!', 'success');
        this.message = res.message;
        this.router.navigate(['/login']);
      } else {
        this.showToast('Registration Failed', 'danger');
        this.message = res.message || 'Please try again';
      }

    } catch (err) {
      await loading.dismiss();
      this.showToast('Server error occurred!', 'danger');
      console.error('Registration error:', err);
      this.message = 'Server error';
    }
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }


  async showToast(message: string, color: string = 'primary'){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }

}
