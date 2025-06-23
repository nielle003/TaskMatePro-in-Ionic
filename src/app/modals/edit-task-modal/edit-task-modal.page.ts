import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.page.html',
  styleUrls: ['./edit-task-modal.page.scss'],
  standalone: false
})
export class EditTaskModalPage {
  task: any = {
    id: null,
    title: '',
    description:'',
    due_date: ''
  }
  constructor(
    private modalCtrl: ModalController,
    private tasksService: TasksService,
    private navParams: NavParams
  ) { }


  async save(){
    this.tasksService.editTask(this.task).then(response =>{
      response.subscribe({
        next: (res) => {
          if (res.success){
            this.modalCtrl.dismiss({updated: true});
          } else{
            alert('Failed to update task')
          }
        },
        error: (err) => {
          console.error('Error updating task: ', err);
        }
      })
    });
  }
  close(){
    this.modalCtrl.dismiss();
  }
}
