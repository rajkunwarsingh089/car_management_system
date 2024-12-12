export interface SalesmanCommissionReport {
  id: number;
  salesman: string;
  brand: string;
  class: string;
  modelName: string;
  modelCode: string;
  price: number;
  commission: number;
  additionalCommission: number;
  totalCommission: number;
  previousYearSales: number;
  numberOfCarsSold: number;
}