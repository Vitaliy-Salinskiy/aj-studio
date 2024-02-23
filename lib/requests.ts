import { OrderItemDto, ProductDto, UserDto } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const getAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    throw error;
  }
};

export const getProductsCount = async () => {
  try {
    return await prisma.product.count();
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (dto: ProductDto, userId: string) => {
  try {
    return await prisma.product.create({
      data: {
        ...dto,
        userId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    return await prisma.product.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id: string, dto: Partial<ProductDto>) => {
  try {
    return await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  } catch (error) {
    return error;
  }
};

export const createUser = async (dto: UserDto) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(dto.password, salt);

    dto.password = hashedPassword;

    return await prisma.user.create({
      data: {
        ...dto,
      },
    });
  } catch (error) {
    return error;
  }
};

export const createOrderItem = async (dto: OrderItemDto, userId: string) => {
  try {
    return await prisma.orderItem.create({
      data: {
        color: dto.color,
        quantity: dto.quantity,
        userId,
        productId: dto.productId,
      },
    });
  } catch (error) {
    console.error("Error in createOrderItem:", error);
    throw error;
  }
};

export const getOrdersItemsByUserId = async (id: string) => {
  try {
    console.log("id", id);
    const ordersItems = await prisma.orderItem.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
        user: true,
      },
    });

    return ordersItems;
  } catch (error) {
    throw error;
  }
};

export const countOrderItems = async (id: string) => {
  try {
    const count = await prisma.orderItem.count({
      where: {
        userId: id,
      },
    });

    return count;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (userId: string, orderItems: string[]) => {
  try {
    return await prisma.order.create({
      data: {
        userId,
        orderItem: {
          connect: orderItems.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProductFromCart = async (productId: string) => {
  try {
    return await prisma.orderItem.delete({
      where: {
        id: productId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const addItemToWishlist = async (productId: string, userId: string) => {
  try {
    return await prisma.wishlist.create({
      data: {
        productId,
        userId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getWishedItemsByUserId = async (id: string) => {
  try {
    return await prisma.wishlist.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
};
