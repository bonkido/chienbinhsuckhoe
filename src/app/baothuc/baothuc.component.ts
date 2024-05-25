import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  topic: string;
}

@Component({
  selector: 'app-baothuc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './baothuc.component.html',
  styleUrl: './baothuc.component.css'
})
export class BaothucComponent {
  // hiện dữ liệu trên json
  tasks: Task[] = [];
  task: Task = {
    id: 0,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    topic: ''
  };

  showPopup = false;
  audioUrl = 'path/to/your/audio.mp3';
  imageUrl = 'path/to/your/image.jpg';

  constructor(private http: HttpClient) {}
  latestId: number = 0; // Biến lưu trữ id hiện tại

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

  showAlarmPopup() {
    this.showPopup = true;
    // Sau 8 giây, hiển thị hình ảnh hoặc âm thanh
    setTimeout(() => {
      // Hiển thị hình ảnh
      // hoặc
      // Phát âm thanh
    }, 8000);
  }

  hideAlarmPopup() {
    this.showPopup = false;
  }

  // xuất hiện hình ảnh
  showImageContainer = false;

  showImage() {
    this.showImageContainer = false;
    setTimeout(() => {
      this.showImageContainer = true;
    }, 8000);
  }
}