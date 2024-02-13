import { prisma } from "@/lib/prisma";

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductsCount = async () => {
  return await prisma.product.count();
};
