import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _storage: Storage | null = null;
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { 

    this.init();
  }

  async init(){
    this._storage = await this.storage.create();
  }



  private async getToken(): Promise<string | null> {
    if (!this._storage) {
      await this.init(); // make sure it's initialized
    }
    return this._storage?.get('token') ?? null;
  }


  async getTasks(){
    const token = await this.getToken();
    console.log('Token from getTasks:', token);
    
    return this.http.get<any>('http://localhost/taskmate-backend/tasks.php',{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
  }



  async addTask(task: any){
    const token = await this.getToken();
    console.log('Sending token:', token);

    return this.http.post<any>('http://localhost/taskmate-backend/add-task.php', task, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
