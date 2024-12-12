import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarModelService } from 'src/app/shared/car-model-service';
import { CarModel } from '../constant/car-model.interface';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarModelListComponent implements OnInit {
  carModels: CarModel[] = [];
  copyCarModels: CarModel[] = [];
  searchTerm: string = '';
  searchCode: string = '';

  constructor(
    private carModelService: CarModelService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCarModels();
  }

  loadCarModels(): void {
    this.carModelService.getCarModelsStatic().subscribe((carModels) => {
      this.carModels = carModels;
      this.copyCarModels = carModels; 
    });
  }

  deleteCarModel(id: number | string): void {
    this.carModelService.deleteCarModel(id).subscribe(() => {
      this.loadCarModels(); 
      this.notificationService.showNotification('Deleted Successfully');
    });
  }

  sortCarModels(key: string, isDescending: boolean = true): void {
    const compare = (a: CarModel, b: CarModel) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue && bValue) {
        if (isDescending) {
          return new Date(bValue).getTime() - new Date(aValue).getTime();
        }
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
      return 0;
    };

    this.copyCarModels.sort(compare);
  }

  searchCarModels(): void {
    if (this.searchTerm) {
      this.copyCarModels = this.carModels.filter(carModel =>
        this.matchesSearchTerm(carModel)
      );
    } else {
      this.copyCarModels = [...this.carModels];
    }
  }

   matchesSearchTerm(carModel: CarModel): boolean {
    const term = this.searchTerm.toLowerCase();
    return (
      carModel?.modelName?.toLowerCase().includes(term) ||
      carModel?.modelCode?.toLowerCase().includes(term)
    );
  }

  redirectToSalesmanCommisionView(): void {
    this.router.navigate(['/salesman-commission-report']);
  }

  redirectToModalView(): void {
    this.router.navigate(['/car-model']);
  }
}
