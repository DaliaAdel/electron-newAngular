import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryPercentageComponent } from './ministry-percentage.component';

describe('MinistryPercentageComponent', () => {
  let component: MinistryPercentageComponent;
  let fixture: ComponentFixture<MinistryPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistryPercentageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistryPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
