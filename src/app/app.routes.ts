import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'task', component: TaskComponent },
];
