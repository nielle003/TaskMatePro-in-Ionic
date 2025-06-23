import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  async getTasks(){
    const token = await this.storage.get('token');
    
    return this.http.get<any>('http://localhost/taskmate-backend/tasks.php',{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
