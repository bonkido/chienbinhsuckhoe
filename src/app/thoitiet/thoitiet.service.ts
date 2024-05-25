import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'ec24f7108ad8be573b5139a9756dd401'; 

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    const params = { q: city, appid: this.apiKey, units: 'metric' };
    return this.http.get<any>(this.apiUrl, { params });
  }
}