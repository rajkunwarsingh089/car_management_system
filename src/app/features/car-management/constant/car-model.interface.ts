export interface CarModel {
    id?: number | string;
    brand: string;
    class: string;
    modelName: string;
    modelCode: string;
    description: string;
    features: string;
    price: number;
    dateOfManufacturing: string;
    active: boolean;
    sortOrder: number;
    image?: string;
  }