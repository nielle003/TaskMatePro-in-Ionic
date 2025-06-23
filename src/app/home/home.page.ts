import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { EditTaskModalPage } from '../modals/edit-task-modal/edit-task-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: any[] = [];
  newTask = {
    title: '',
    description: '',
    due_date: ''
  };

  constructor(private tasksService: TasksService, private authService: AuthService, private modalCtrl: ModalController ) {}
  ngOnInit() {
    this.loadtasks();
  }
  async openEditModal(task: any){
    const modal = await this.modalCtrl.create({
      component: EditTaskModalPage,
      componentProps:{task}
    });
    modal.onDidDismiss().then(result => {
      if (result.data?.updated){
        this.loadtasks();
      }
    });
    await modal.present();
  }
  loadtasks(){
    this.tasksService.getTasks().then(response =>{
      response.subscribe({
        next:(res)=>{
          this.tasks = res.tasks;
          console.log('tasks', res.tasks);
        },
        error: (err) => {
          console.error('Error fetching tasks:', err)
        }
      });
    });
  }


  addTask(){
    this.tasksService.addTask(this.newTask).then(response =>{
      response.subscribe({
        next: (res) => {
          if(res.success){
            this.newTask = {title: '', description: '', due_date:''};
            this.loadtasks();
          } else {
            console.log(res.message);
          }
        },
        error: err =>{
          console.error('Error adding task:',err);
        }

      });
    });
  }

  logout(){
    this.authService.logout();
  }

  deleteTask(taskId:number){
    if (confirm("Are you sure you want to delete this task?")){
      this.tasksService.deleteTask(taskId).subscribe({
        next: (res) =>{
          if (res.success){
            alert('Task deleted successfully!');
            this.loadtasks();
          }else{
            alert('Failed to delete task');
          }
        },
        error: err =>{
          console.error('Error deleting task:', err);
          alert('An error occurred while trying to delete the');
        }
      });
    }
  }
}
