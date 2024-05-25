import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Task {
  id:string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  topic: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() tasks: Task[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<Task[]>('http://localhost:3000/nhiemvu')
      .subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
  }
  
//  //xóa
//  deleteTask(task: Task) {
//   if (confirm('Bạn có chắc chắn muốn xóa task này?')) {
//     this.http.delete(`http://localhost:3000/nhiemvu/${task.id}`)
//       .subscribe(
//         () => {
//           console.log('Task đã được xóa thành công');
//           this.xoaTaskKhoiMang(task);
//         },
//         (error) => {
//           console.error('Lỗi khi xóa task:', error);
//         }
//       );
//   }
// }

// xoaTaskKhoiMang(task: Task) {
//   const index = this.tasks.findIndex(t => t.id === task.id);
//   if (index !== -1) {
//     this.tasks.splice(index, 1);
//   }
// }

}