
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentRatesComponent } from './installment-rates.component';

describe('InstallmentRatesComponent', () => {
  let component: InstallmentRatesComponent;
  let fixture: ComponentFixture<InstallmentRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallmentRatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallmentRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
