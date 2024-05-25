import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoitietComponent } from './thoitiet.component';

describe('ThoitietComponent', () => {
  let component: ThoitietComponent;
  let fixture: ComponentFixture<ThoitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThoitietComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThoitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
