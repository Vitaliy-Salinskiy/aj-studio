import { ProductDto } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const getAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    return error;
  }
};

export const getProductsCount = async () => {
  try {
    return await prisma.product.count();
  } catch (error) {
    return error;
  }
};

export const createProduct = async (dto: ProductDto, userId: string) => {
  try {
    const res = await prisma.product.create({
      data: {
        ...dto,
        userId,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
