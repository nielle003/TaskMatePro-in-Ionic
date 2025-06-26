import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

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

  constructor(
    private authService: AuthService, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService
  ) { }
  
  async onLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
      spinner: 'crescent',
      duration: 3000
    });

    await loading.present();

    const credentials = {
      email: this.email,
      password: this.password
    };

    try {
      const res: any = await firstValueFrom(this.authService.login(credentials));
      await loading.dismiss();

      if (res.success) {
        await this.authService.storeToken(res.token);
        console.log('Saved token:', res.token);


       this.firebaseService.requestPermissionAndGetToken().then(Firetoken =>{
          if(Firetoken){
             this.authService.saveFcmToken(Firetoken).then(() => {
              console.log('FCM token saved to backend!');
            }).catch (err => {
              console.error('Failed to save FCM token', err);
            });
          }
        });
        
        this.router.navigate(['/home']);
      } else {
        this.showToast('Login failed', 'danger');
        this.errorMessage = res.message || 'Login failed';
      }

    } catch (err) {
      await loading.dismiss();
      this.showToast('Server error occurred!', 'danger');
      console.error('Backend error:', err);
      this.errorMessage = 'Server error';
    }
  }


  async onRegister(){

    const go = await this.loadingCtrl.create({
      message: 'Going to register....',
      spinner: 'circular',
      duration: 1000

    })
    await go.present();
    await go.dismiss();
    this.router.navigate(['/register']);
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
