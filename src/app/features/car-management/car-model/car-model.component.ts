import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarModelService } from 'src/app/shared/car-model-service';
import { CarModel } from '../constant/car-model.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { NotificationService } from 'src/app/shared/notification.service';
import { FieldNameEnum } from '../constant/car-model.enum';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarModelComponent implements OnInit {
  carModelForm: FormGroup;
  carModels: CarModel[] = [];
  isEditing = false;
  currentEditingId: string | number;
  fieldNameEnum = FieldNameEnum;

  constructor(
    private carModelService: CarModelService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCarModels();
  }

  initializeForm(): void {
    this.carModelForm = new FormGroup({
      [this.fieldNameEnum.Brand]: new FormControl('', Validators.required),
      [this.fieldNameEnum.Class]: new FormControl('', Validators.required),
      [this.fieldNameEnum.ModelName]: new FormControl('', Validators.required),
      [this.fieldNameEnum.ModelCode]: new FormControl('', Validators.required),
      [this.fieldNameEnum.Description]: new FormControl('', Validators.required),
      [this.fieldNameEnum.Features]: new FormControl('', Validators.required),
      [this.fieldNameEnum.Price]: new FormControl('', [Validators.required, Validators.min(0)]),
      [this.fieldNameEnum.DateOfManufacturing]: new FormControl('', Validators.required),
      [this.fieldNameEnum.Active]: new FormControl(''),
      [this.fieldNameEnum.SortOrder]: new FormControl(''),
    });
  }

  loadCarModels(): void {
    this.carModelService.getCarModelsStatic().subscribe((carModels: CarModel[]) => {
      this.carModels = carModels;
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.carModelForm.get(controlName);
    if (control && control.touched && control.invalid) {
      return this.getValidationErrorMessage(controlName, control);
    }
    return '';
  }

  getValidationErrorMessage(controlName: string, control: any): string {
    if (control.hasError('required')) {
      return `${controlName} is required`;
    } else if (control.hasError('minlength')) {
      return `${controlName} must be at least 10 characters long`;
    } else if (control.hasError('alphanumeric')) {
      return `${controlName} must contain only alphanumeric characters or hyphen (-)`;
    } else if (control.hasError('min')) {
      return `${controlName} must be a positive number`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.carModelForm.valid) {
      this.isEditing ? this.updateCarModel() : this.createCarModel();
    }
  }

  createCarModel(): void {
    const newModel: CarModel = this.prepareCarModelForSubmission();
    newModel.id = uuidv4();

    this.carModelService.createCarModel(newModel).subscribe(() => {
      this.handleFormSuccess('Created Successfully');
    });
  }

  updateCarModel(): void {
    const updatedModel: CarModel = this.prepareCarModelForSubmission();
    updatedModel.id = this.currentEditingId;

    this.carModelService.updateCarModel(updatedModel).subscribe(() => {
      this.handleFormSuccess('Updated Successfully');
    });
  }

  prepareCarModelForSubmission(): CarModel {
    return { ...this.carModelForm.value };
  }

  handleFormSuccess(message: string): void {
    this.loadCarModels();
    this.resetForm();
    this.notificationService.showNotification(message);
  }

  editCarModel(carModel: CarModel): void {
    this.isEditing = true;
    this.currentEditingId = carModel?.id;
    this.setCarModelFormValues(carModel);
  }

  setCarModelFormValues(carModel: CarModel): void {
    const formattedCarModel = {
      ...carModel,
      [this.fieldNameEnum.DateOfManufacturing]: carModel?.[this.fieldNameEnum.DateOfManufacturing]?.split('T')[0] ?? null,
    };
    this.carModelForm.patchValue(formattedCarModel);
    this.markFormControlsAsTouchedAndDirty();
  }

  markFormControlsAsTouchedAndDirty(): void {
    Object.keys(this.carModelForm?.controls)?.forEach((controlName) => {
      const control = this.carModelForm.get(controlName);
      control.markAsTouched();
      control.markAsDirty();
    });
    this.carModelForm.updateValueAndValidity();
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentEditingId = null;
    this.carModelForm.reset();
    this.carModelForm.markAsPristine();
    this.carModelForm.markAsUntouched();
    this.carModelForm.updateValueAndValidity();
  }

  redirectToModelList(): void {
    this.router.navigate(['/car-model-list']);
  }
}
