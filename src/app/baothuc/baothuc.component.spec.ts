import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaothucComponent } from './baothuc.component';

describe('BaothucComponent', () => {
  let component: BaothucComponent;
  let fixture: ComponentFixture<BaothucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaothucComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaothucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
