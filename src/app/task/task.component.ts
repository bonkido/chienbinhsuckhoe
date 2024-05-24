import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';


interface Task {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  topic: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  
}
