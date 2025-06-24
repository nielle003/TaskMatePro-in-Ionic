import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

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
    })
    await loading.present();


    this.authService.register( this.email, this.password).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        if (res.success) {
          this.showToast('Successfully Registered!', 'success');
          this.router.navigate(['/login']);
        } else {
          this.showToast('Registration Failed', 'danger')
        }
      },
      error: async (err:any) => {
        await loading.dismiss();
        this.showToast('Server error occurred!', 'danger');
        console.log(err);
      }
    });
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
