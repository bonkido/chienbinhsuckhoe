import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './thoitiet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thoitiet',
  standalone: true,
  imports: [ CommonModule , HttpClientModule , FormsModule],
  providers: [WeatherService],
  templateUrl: './thoitiet.component.html',
  styleUrl: './thoitiet.component.css'
})
export class ThoitietComponent {
  city = 'ho chi minh';
  temperature: number = 0;
  description: string = '';

  constructor(private weatherService: WeatherService) {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.temperature = data.main.temp;
        this.description = data.weather[0].description;
      },
      (error) => {
        console.error('Error getting weather:', error);
      }
    );
  }
  onInputChange(event: any) {
    this.city = event.target.value;
    this.getWeather();
  }
}
