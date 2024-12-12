import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanCommissionReportComponent } from './salesman-commission-report.component';

describe('SalesmanCommissionReportComponent', () => {
  let component: SalesmanCommissionReportComponent;
  let fixture: ComponentFixture<SalesmanCommissionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesmanCommissionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanCommissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
