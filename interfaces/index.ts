import {
  Order,
  OrderItem,
  OrderStatus,
  Product,
  User,
  Wishlist,
} from "@prisma/client";

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

export interface ExtendedOrderItem extends OrderItem {
  user: User;
  product: Product;
}

export interface ExtendedWishlist extends Wishlist {
  product: Product;
}

export interface ExtendedOrder extends Order {
  user: User;
  orderItems: ExtendedOrderItem[];
}

export type AdminOrder = {
  id: string;
  status: OrderStatus;
  email: string;
  price: number;
};
