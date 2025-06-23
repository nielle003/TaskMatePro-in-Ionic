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
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
    this.initStorage();
  }
  async initStorage() {
    await this.storage.create();
  }
  login (credentials:{email:string,password:string}) {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  async storeToken (token: string){
    await this.storage.set(this.TOKEN_KEY, token);
  }

  async getToken(){
    return await this.storage.get(this.TOKEN_KEY);
  }

  async logout() {
    await this.storage.remove(this.TOKEN_KEY);
    this.router.navigate(['/home']);
  }




}
