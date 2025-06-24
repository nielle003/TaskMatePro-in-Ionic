// src/app/pages/calendar/calendar.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';

// 1. Import the standalone page component
import { CalendarPage } from './calendar.page'; 

// Import FullCalendarModule
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    FullCalendarModule,
    CalendarPage // <-- 2. ADD the page to IMPORTS
  ],
  // 3. REMOVE the declarations array completely, or leave it empty.
  // declarations: [CalendarPage] // <-- REMOVE THIS LINE
})
export class CalendarPageModule {}