import { ProductDto, UserDto } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

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
    const res = await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const createUser = async (dto: UserDto) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(dto.password, salt);

    dto.password = hashedPassword;

    const res = await prisma.user.create({
      data: {
        ...dto,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
