import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Xuất ra file pdf
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

// Xuất ra file excel
import * as XLSX from 'xlsx';

interface Task {
  id:number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  topic: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  // xuất ra file excel
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

  exportToExcel(): void {
    // Tạo một workbook mới
    const workbook = XLSX.utils.book_new();

    // Tạo một worksheet từ dữ liệu tasks
    const worksheet = XLSX.utils.json_to_sheet(this.tasks);

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');

    // Tạo file Excel và tải về
    XLSX.writeFile(workbook, 'tasks-data.xlsx');
  }

  latestId: number = 0; // Biến lưu trữ id hiện tại

  // thêm dữ liệu lên json
  task: Task = {
    id: 0,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    topic: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
     // Tăng id lên 1 đơn vị
     this.task.id = ++this.latestId;

    this.http.post<Task>('http://localhost:3000/nhiemvu', this.task)
      .subscribe(
        (response) => {
          console.log('Task saved:', response);
           this.tasks.push(response); // Thêm task mới vào mảng tasks
           this.resetForm();
         
        },
        (error) => {
          console.error('Error saving task:', error);
        }
      );
  }

  // hiện dữ liệu trên json
  tasks: Task[] = [];

  ngOnInit() {
    this.http.get<Task[]>('http://localhost:3000/nhiemvu')
      .subscribe(
        (data) => {
          this.tasks = data;
           // Cập nhật latestId dựa trên các task hiện có
           this.latestId = Math.max(...data.map(t => t.id), 0);
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
  }    

  // sửa dử liệu trên json
  selectedTask: Task | null = null;

  onSubmitt() {
    if (this.selectedTask) {
      // Cập nhật task đã chọn
      this.http.put<Task>(`http://localhost:3000/nhiemvu/${this.selectedTask.id}`, this.task)
        .subscribe(
          (response) => {
            console.log('Task đã được cập nhật:', response);
            // Cập nhật task tương ứng trong mảng tasks
            this.capNhatTaskTrongMang(response);
            this.resetForm();
            this.selectedTask = null;
          },
          (error) => {
            console.error('Lỗi khi cập nhật task:', error);
          }
        );
    } else {
      // Tạo task mới
      this.http.post<Task>('http://localhost:3000/nhiemvu', this.task)
        .subscribe(
          (response) => {
            console.log('Task mới đã được lưu:', response);
            this.tasks.push(response);
            this.resetForm();
          },
          (error) => {
            console.error('Lỗi khi lưu task:', error);
          }
        );
    }
  }

  resetForm() {
    this.task = {
      id: 0,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      topic: ''
    };
  }

  
  editTask(task: Task) {
    this.selectedTask = task;
    const { id, name, description, startDate, endDate, topic } = task;
    this.task = { id, name, description, startDate, endDate, topic };
  }
  
  capNhatTaskTrongMang(taskDaCapNhat: Task) {
    const index = this.tasks.findIndex(t => t.id === taskDaCapNhat.id);
    if (index !== -1) {
      this.tasks[index] = taskDaCapNhat;
    }
  }

  //xóa
  deleteTask(task: Task) {
    if (confirm('Bạn có chắc chắn muốn xóa task này?')) {
      this.http.delete(`http://localhost:3000/nhiemvu/${task.id}`)
        .subscribe(
          () => {
            console.log('Task đã được xóa thành công');
            this.xoaTaskKhoiMang(task);
          },
          (error) => {
            console.error('Lỗi khi xóa task:', error);
          }
        );
    }
  }
  
  xoaTaskKhoiMang(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  // in ra file pdf
  exportToPDF() {
    const doc = new jsPDF();

    // Thêm dữ liệu vào PDF
    autoTable(doc, {
      head: [['ID', 'Tên', 'Mô tả', 'Thời gian', 'Chủ đề']],
      body: this.tasks.map(task => [
        task.id,
        task.name,
        task.description,
        `${task.startDate} - ${task.endDate}`,
        task.topic
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak'
      }
    });

    // Lưu file PDF
    doc.save('danh-sach-nhiem-vu.pdf');
  }

}
