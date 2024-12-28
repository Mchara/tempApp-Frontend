import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlottingScreenComponent } from './plotting-screen.component';

describe('PlottingScreenComponent', () => {
  let component: PlottingScreenComponent;
  let fixture: ComponentFixture<PlottingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlottingScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlottingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
