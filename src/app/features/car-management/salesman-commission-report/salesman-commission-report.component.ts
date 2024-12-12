import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SalesmanCommissionReportService } from 'src/app/shared/salesman-commission-report.service';
import { SalesmanCommissionReport } from '../constant/salesman-commision.interface';
import { Router } from '@angular/router';
import { CarBrandNameEnum, ClassEnum } from '../constant/salesman-commison.enum';

@Component({
  selector: 'app-salesman-commission-report',
  templateUrl: './salesman-commission-report.component.html',
  styleUrls: ['./salesman-commission-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesmanCommissionReportComponent implements OnInit {
  salesmanCommissionReports: SalesmanCommissionReport[];

  constructor(
    private salesmanCommissionReportService: SalesmanCommissionReportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSalesmanCommissionReports();
  }

  loadSalesmanCommissionReports(): void {
    this.salesmanCommissionReportService
      .getSalesmanCommissionReportsStatic()
      .subscribe((reports) => {
        this.salesmanCommissionReports = reports;
      });
  }

  calculateCommission(report: SalesmanCommissionReport): number {
    let commission = this.getBaseCommission(report?.brand);
    commission += this.getAdditionalCommission(report);
    return commission;
  }

  getBaseCommission(brand: string): number {
    switch (brand) {
      case CarBrandNameEnum.Audi:
        return 800;
      case CarBrandNameEnum.Jaguar:
        return 750;
      case CarBrandNameEnum.LandRover:
        return 850;
      case CarBrandNameEnum.Renault:
        return 400;
      default:
        return 0;
    }
  }

  getAdditionalCommission(report: SalesmanCommissionReport): number {
    let commission = 0;

    if (report.class === ClassEnum.AClass && report.price > 25000) {
      commission += report.price * 0.08; // 8% for A-class, Audi model
    } else if (report.class === ClassEnum.BClass && report.price > 30000) {
      commission += report.price * 0.06; // 6% for B-class
    } else if (report.class === ClassEnum.CClass && report.price > 35000) {
      commission += report.price * 0.04; // 4% for C-class
    }

    // Extra commission for Class A, based on previous year sales
    if (report.class === ClassEnum.AClass && report.previousYearSales > 500000) {
      commission += report.price * 0.02; // 2% extra for Class A, based on previous year sales
    }

    return commission;
  }

  redirectToModelList(): void {
    this.router.navigate(['/car-model-list']);
  }

  redirectToModalView(): void {
    this.router.navigate(['/car-model']);
  }
}
