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

export interface ExtendedProduct extends Product {
  User: User;
}

export type AdminOrder = {
  id: string;
  status: OrderStatus;
  email: string;
  price: number;
};

export type AdminUser = {
  id: string;
  email: string;
  role: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  email: string;
  price: number;
};

export interface IFilter {
  placeholder: string;
  field: string;
}

export interface IStripeItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: string[];
    };
    unit_amount: number;
  };
  quantity: number;
}

export interface IStripeMetaData {
  userId: string;
  itemsId: string[];
}

export interface IProfileForm {
  name: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  image?: string;
}
