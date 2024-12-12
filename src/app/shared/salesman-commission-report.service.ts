import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SalesmanCommissionReport } from '../features/car-management/constant/salesman-commision.interface';
import { ClassEnum } from '../features/car-management/constant/salesman-commison.enum';

@Injectable({
  providedIn: 'root',
})
export class SalesmanCommissionReportService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getSalesmanCommissionReports(): Observable<SalesmanCommissionReport[]> {
    return this.http.get<SalesmanCommissionReport[]>(this.apiUrl);
  }

  createSalesmanCommissionReport(report: SalesmanCommissionReport): Observable<SalesmanCommissionReport> {
    return this.http.post<SalesmanCommissionReport>(this.apiUrl, report);
  }

  updateSalesmanCommissionReport(report: SalesmanCommissionReport): Observable<SalesmanCommissionReport> {
    return this.http.put<SalesmanCommissionReport>(`${this.apiUrl}/${report.id}`, report);
  }

  deleteSalesmanCommissionReport(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  private salesmanCommissionReports = [
    {
      id: 1,
      salesman: 'John Smith',
      brand: 'Audi',
      class: ClassEnum.AClass,
      modelName: 'A4',
      modelCode: 'AUDI-A4-001',
      price: 25000,
      commission: 800,
      additionalCommission: 0,
      totalCommission: 800,
      previousYearSales: 5000000,
      numberOfCarsSold: 200
    },
    {
      id: 2,
      salesman: 'Richard Porter',
      brand: 'Jaguar',
      class: ClassEnum.BClass,
      modelName: 'XE',
      modelCode: 'JAGUAR-XE-002',
      price: 30000,
      commission: 750,
      additionalCommission: 0,
      totalCommission: 750,
      previousYearSales: 20000,
      numberOfCarsSold: 20
    }
  ];

  getSalesmanCommissionReportsStatic(): Observable<SalesmanCommissionReport[]> {
    return of(this.salesmanCommissionReports);
  }
}