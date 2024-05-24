import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HttpClientModule],
  providers: [DatePipe], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('');
  }
  currentTime: string | undefined;

  ngOnInit() {
    this.updateCurrentTime();
  }

  updateCurrentTime() {
    const now = new Date();
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const day = days[now.getDay()] ;
    const date = now.getDate() ;
    const month = now.getMonth() ; 
    const year = now.getFullYear() ;
    const hours = now.getHours() ;
    const minutes = now.getMinutes() + 1;
    const seconds = now.getSeconds() + 1;

    this.currentTime = `${day}, ${date}/${month}/${year} - ${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }
  
}