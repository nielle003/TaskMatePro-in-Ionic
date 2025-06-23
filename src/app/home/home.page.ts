import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: any[] = [];

  constructor(private tasksService: TasksService) {}
  ngOnInit() {
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
}
