import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { BmiComponent } from './bmi/bmi.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'task', component: TaskComponent },
    { path: 'bmi', component: BmiComponent },
];
