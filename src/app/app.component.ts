import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [DatePipe], // Đăng ký DatePipe như một provider của component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTime: string = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const formattedTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.currentTime = formattedTime !== null ? formattedTime : '';
  }
}