export interface ProductDto {
  name: string;
  price: number;
  imageUrl: string;
  colors: string[];
}

export interface IUserForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
}
