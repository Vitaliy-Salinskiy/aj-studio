import { OrderItem, Product, User } from "@prisma/client";

export interface ProductDto {
  name: string;
  price: number;
  imageUrl: string;
  colors: string[];
  description?: string;
}

export interface OrderItemDto {
  productId: string;
  color: string;
  quantity: number;
}

export interface IUserForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
}

export interface UserDto {
  email: string;
  name: string;
  password: string;
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

export interface ExtendedOrderItem extends OrderItem {
  user: User;
  product: Product;
}
