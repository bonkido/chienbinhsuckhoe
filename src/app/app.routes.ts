import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { BmiComponent } from './bmi/bmi.component';
import { LichComponent } from './lich/lich.component';
import { BaothucComponent } from './baothuc/baothuc.component';
import { ThoitietComponent } from './thoitiet/thoitiet.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'task', component: TaskComponent },
    { path: 'bmi', component: BmiComponent },
    { path: 'lich', component: LichComponent },
    { path: 'baothuc', component: BaothucComponent },
    { path: 'thoitiet', component: ThoitietComponent },
];

