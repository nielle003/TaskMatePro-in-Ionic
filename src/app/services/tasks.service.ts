import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _storage: Storage | null = null;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private authservice: AuthService
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
    const token = await this.authservice.getToken();
    console.log('Sending token:', token);

    return this.http.post<any>('http://localhost/taskmate-backend/add-task.php', task, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  async editTask(updatedTask:any){
    const token = await this.authservice.getToken();
    return this.http.post<any>('http://localhost/taskmate-backend/update-task.php', updatedTask, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteTask(taskId: number): Observable<any> {
    return from(this.authservice.getToken()).pipe(
      switchMap((token) => {
        return this.http.post('http://localhost/taskmate-backend/delete-task.php', { id: taskId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    );
  }

}
