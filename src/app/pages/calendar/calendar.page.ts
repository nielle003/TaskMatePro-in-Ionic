import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullCalendarModule  // Add this import
  ]
})
export class CalendarPage implements OnInit {
  // Use CalendarOptions instead of individual properties
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: []
  };

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.loadEventsFromBackend();
  }

  async loadEventsFromBackend() {
    try {
      const observable = await this.taskService.getTasks(); // this gives you the Observable
      observable.subscribe({
        next: (res: any) => {
          this.calendarOptions.events = res.tasks.map((task: any) => ({
            title: task.title,
            date: task.due_date
          }));
          console.log('Received tasks from backend:', res);
        },
        error: (err: any) => {
          console.error('Failed to load tasks:', err);
        }
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

 // Fetch events
}