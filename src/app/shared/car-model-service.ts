import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { CarModel } from '../features/car-management/constant/car-model.interface';
import { CarClassEnum } from '../features/car-management/constant/car-model.enum';

@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getCarModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(this.apiUrl);
  }

  createCarModel(carModel: CarModel): Observable<CarModel> {
    return of(carModel).pipe(map(carModel => {
      this.carModels.push(carModel);
      return carModel;
    }));
  }

  updateCarModel(carModel: CarModel): Observable<CarModel> {
    return of(carModel).pipe(
      map((updatedModel) => {
        const index = this.findCarModelIndex(updatedModel?.id);
        if (index !== -1) {
          this.carModels[index] = { ...this.carModels[index], ...updatedModel };
        }
  
        return updatedModel;
      })
    );
  }
  
  deleteCarModel(id: number | string): Observable<any> {
    const index = this.findCarModelIndex(id);
    if (index !== -1) {
      this.carModels.splice(index, 1);
    }
    return of(this.carModels);
  }
  

findCarModelIndex(id: number | string): number{
  return this.carModels.findIndex(carModel => carModel.id == id)
}
  private carModels: CarModel[] = [
    {
      id: 1,
      brand: 'Audi',
      class: CarClassEnum.AClass,
      modelName: 'A4',
      modelCode: 'AUDI-A4-001',
      description: 'This is a description of the Audi A4',
      features: 'This is a feature of the Audi A4',
      price: 25000,
      dateOfManufacturing: '2020-01-01',
      active: true,
      sortOrder: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6Gv_XLNB1gbJoALMK2u8xJfVO95SLHUzdQ&s'
    },
    {
      id: 2,
      brand: 'Jaguar',
      class: CarClassEnum.BClass,
      modelName: 'XE',
      modelCode: 'JAGUAR-XE-002',
      description: 'This is a description of the Jaguar XE',
      features: 'This is a feature of the Jaguar XE',
      price: 30000,
      dateOfManufacturing: '2020-02-01',
      active: true,
      sortOrder: 2,
      image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/19826/xf-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80'
    },
  ];

  getCarModelsStatic(): Observable<CarModel[]> {
    return of(this.carModels);
  }
}