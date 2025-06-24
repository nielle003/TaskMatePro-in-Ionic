import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastController } from '@ionic/angular';

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
    private toastCtrl : ToastController
  ) { }


  async save(){
    this.tasksService.editTask(this.task).then(response =>{
      response.subscribe({
        next: (res) => {
          if (res.success){
            this.modalCtrl.dismiss({updated: true});
            this.showToast('Successfully updated task', 'success');
          } else{
            this.showToast('Failed to update task', 'danger');
          }
        },
        error: (err) => {
          this.showToast('Error updating task', 'danger');
          console.error('Error updating task: ', err);
        }
      })
    });
  }
  close(){
    this.modalCtrl.dismiss();
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
