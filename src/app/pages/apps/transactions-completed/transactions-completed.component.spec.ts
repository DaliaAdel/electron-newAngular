import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsCompletedComponent } from './transactions-completed.component';

describe('TransactionsCompletedComponent', () => {
  let component: TransactionsCompletedComponent;
  let fixture: ComponentFixture<TransactionsCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
