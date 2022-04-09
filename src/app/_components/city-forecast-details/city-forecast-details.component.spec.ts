import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityForecastDetailsComponent } from './city-forecast-details.component';

describe('CityForecastDetailsComponent', () => {
  let component: CityForecastDetailsComponent;
  let fixture: ComponentFixture<CityForecastDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityForecastDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityForecastDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
