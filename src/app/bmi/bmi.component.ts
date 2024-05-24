import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-bmi',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './bmi.component.html',
  styleUrl: './bmi.component.css'
})
export class BmiComponent {
  height: number;
  weight: number;
  result: number;

  constructor() {
    this.height = 0;
    this.weight = 0;
    this.result = 0;
  }

  ngOnInit() {
    this.calculateResult();
  }

  calculateResult() {
    this.result = this.weight / (this.height*this.height) 
  }

  onHeightChange() {
    this.calculateResult();
  }

  onWeightChange() {
    this.calculateResult();
  }

}
