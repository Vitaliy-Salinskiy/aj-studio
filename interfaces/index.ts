export interface ProductDto {
  name: string;
  price: number;
  imageUrl: string;
  colors: string[];
  description?: string;
}

export interface IUserForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  colors: string[];
  description?: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
