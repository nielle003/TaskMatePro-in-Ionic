import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})



export class AuthService {
  private TOKEN_KEY = "jwt-token";
  private apiUrl = "http://localhost/taskmate-backend/login.php"; // Replace with your actual API endpoint
  private _storage: Storage | null = null;
  private _ready: Promise<void>;
 
  constructor(private http: HttpClient, private storage: Storage, private router: Router) {
    this._ready = this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  private async ensureReady() {
    await this._ready;
  }


  login (credentials:{email:string,password:string}) {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  async storeToken (token: string){
    await this.ensureReady(); 
    await this._storage?.set('token', token);
    console.log('Token stored:', token);
  }

  async getToken(){
    await this.ensureReady();
    const token = await this._storage?.get('token');
    console.log('Token retrieved:', token);
    return token ?? null;
  }

  async logout() {
    await this.ensureReady();
    await this._storage?.remove('token');
    this.router.navigate(['/login']);
    
  }

   register( email: string, password:string){
    return this.http.post<any>('http://localhost/taskmate-backend/register.php', {
      email,
      password,
    });

  }

  async saveFcmToken(FireToken: string): Promise<any> {
    await this.ensureReady();
    const token = await this._storage?.get('token');
    console.log('FCM Token being sent:', FireToken);

    return this.http.post<any>(
      'http://localhost/taskmate-backend/save-fcm-token.php',
      {token: FireToken},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ).toPromise();
  }

 
}
