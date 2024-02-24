"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProductStore } from "@/store/productStore";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Product as IProduct } from "@prisma/client";

import { useEdgeStore } from "@/context/EdgeStoreProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SingleImageDropzone } from "@/components/shared/EdgeStoreDropZone";
import { colorOptions, productFormInitialValues } from "@/constants";
import { productSchema } from "@/schemas";
import { ProductDto } from "@/interfaces";

interface ProductFormProps {
  product?: IProduct;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const { toast } = useToast();
  const { image, setError } = useProductStore();
  const [isDisabled, setIsDisabled] = useState(false);

  const [file, setFile] = useState<any>();
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: product?.name,
      price: `${product?.price}` as any,
      colors: colorOptions.filter((option) =>
        product?.colors?.includes(option.value)
      ),
      description: product?.description || undefined,
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      toast({
        title: "ERROR!",
        description: "You have be to authenticated to see that page",
      });
    }

    if (status === "authenticated" && product) {
      if (product.userId !== session?.user?.id) {
        router.push("/");
        toast({
          title: "ERROR!",
          description: "You can only edit your products",
        });
      }
    }
  }, [status]);

  useEffect(() => {
    if (product?.imageUrl) {
      setFile(product.imageUrl);
    }
  }, [image]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    if (!session?.user?.id) {
      toast({
        title: "ERROR!",
        description: "Please sign in to add a product",
      });
      return;
    }

    setError(false);
    setIsDisabled(true);
    if (!file) {
      toast({
        title: "ERROR!",
        description: "Please upload an image",
      });
      setError(true);
    } else {
      let res;
      if (typeof file !== "string") {
        res = await edgestore.publicFiles.upload({ file });
      }

      if (res?.url || product?.imageUrl) {
        const productData: ProductDto = {
          ...data,
          colors: data.colors.map((color) => color.value),
          imageUrl: product?.imageUrl ? product.imageUrl : (res?.url as string),
        };

        try {
          if (!product) {
            await createProduct(productData, session?.user?.id);
          } else {
            await updateProduct(product.id, productData, session?.user?.id);
          }
        } catch (error) {
          toast({
            title: "ERROR!",
            description: (error as Error).message,
          });
        }
      } else {
        toast({
          title: "ERROR!",
          description: "Something went wrong! Please try again.",
        });
      }
    }
    setIsDisabled(false);
  };

  const createProduct = async (dto: ProductDto, id: string) => {
    console.log("dto", dto, id);
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dto,
        userId: id,
      }),
    });
    if (response.ok) {
      form.reset(productFormInitialValues);
      setFile(undefined);
      toast({
        title: "SUCCESS!",
        description: "Product added successfully",
      });
      router.refresh();
    }
  };

  const updateProduct = async (
    id: string,
    dto: Partial<ProductDto>,
    userId: string
  ) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dto,
      }),
    });
    if (response.ok) {
      form.reset(productFormInitialValues);
      setFile(undefined);
      toast({
        title: "SUCCESS!",
        description: "Product updated successfully",
      });
      router.refresh();
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col lg:flex-row gap-5">
          <FormItem className="flex-1 min-h-full max-h-full">
            {/* <Uploader /> */}
            <SingleImageDropzone
              className="w-full border-[2px] border-black "
              value={file}
              dropzoneOptions={{
                maxSize: 5 * 1024 * 1024,
              }}
              onChange={(file) => {
                setFile(file);
              }}
            />
          </FormItem>
          <div className="flex-1 flex flex-col gap-2.5">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1 h-fit">
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        placeholder="New Jeans"
                        className={`${
                          form.formState.errors.name
                            ? "border-red-500 text-red-500 placeholder:text-red-500"
                            : "border-own-dark-blue"
                        } focus-visible:ring-transparent !mt-0`}
                      />
                    </FormControl>
                    {form.formState.errors.name?.message ? (
                      <FormMessage className="!mt-0">
                        {form.formState.errors.name.message}
                      </FormMessage>
                    ) : (
                      <FormDescription className="text-own-dark-blue !mt-0">
                        Name of the product
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1 h-fit">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="9.99"
                        className={`${
                          form.formState.errors.price
                            ? "border-red-500 text-red-500 placeholder:text-red-500"
                            : "border-own-dark-blue"
                        } focus-visible:ring-transparent !mt-0`}
                      />
                    </FormControl>
                    {form.formState.errors.price?.message ? (
                      <FormMessage className="!mt-0">
                        {form.formState.errors.price.message}
                      </FormMessage>
                    ) : (
                      <FormDescription className="text-own-dark-blue !mt-0">
                        Price of the product
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 h-fit">
                  <FormLabel>Colors</FormLabel>
                  <FormControl className="!mt-0">
                    <Select
                      {...field}
                      isMulti
                      placeholder="Select colors"
                      options={colorOptions as any}
                      classNamePrefix="product-select"
                      styles={{
                        placeholder: (provided) => ({
                          ...provided,
                          color: form.formState.errors.colors ? "red" : "#777",
                        }),
                        option: (provided, { isSelected, isFocused }) => ({
                          ...provided,
                          backgroundColor: isSelected
                            ? "red"
                            : isFocused
                            ? "#b61629c5"
                            : undefined,
                          color: isSelected
                            ? "red"
                            : isFocused
                            ? "#fff"
                            : undefined,
                          "&:hover": {
                            backgroundColor: "#b61629c5",
                            color: "#fff",
                          },
                          "&:focus": {
                            backgroundColor: "#b61629c5",
                            color: "#fff",
                          },
                        }),
                        control: (provided) => ({
                          ...provided,
                          border: form.formState.errors.colors
                            ? "1px solid red"
                            : "1px solid #11293B",
                          minHeight: 40,
                          boxShadow: "none",
                          "&:hover": {
                            borderColor: form.formState.errors.colors
                              ? "red"
                              : "#11293B",
                          },
                        }),
                        clearIndicator: (provided) => ({
                          ...provided,
                          color: "#11293B",
                          transition: "color 0.3s",
                          cursor: "pointer",
                          "&:hover": {
                            color: "#dc2626",
                          },
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: form.formState.errors.colors
                            ? "red"
                            : "#11293B",
                          transition: "color 0.3s",
                          cursor: "pointer",
                          "&:hover": {
                            color: form.formState.errors.colors
                              ? "red"
                              : "#000",
                          },
                        }),
                        multiValue: (provided) => ({
                          ...provided,
                          backgroundColor: "#b61629c5",
                        }),
                        multiValueLabel: (provided) => ({
                          ...provided,
                          color: "#fff",
                        }),
                        multiValueRemove: (provided) => ({
                          ...provided,
                          color: "#fff",
                          backgroundColor: "#b61629c5",
                          transition: "color 0.3s, background-color 0.3s",
                          "&:hover": {
                            backgroundColor: "#b61629c5",
                            color: "#000",
                          },
                        }),
                        menu: (provided) => ({
                          ...provided,
                          boxShadow: "1px 0px 6px 0px rgba(66, 68, 90, 1)",
                        }),
                        indicatorSeparator: (provided) => ({
                          ...provided,
                          backgroundColor: form.formState.errors.colors
                            ? "red"
                            : "#11293B",
                        }),
                      }}
                    />
                  </FormControl>

                  {form.formState.errors.colors?.message ? (
                    <FormMessage className="!mt-0">
                      {form.formState.errors.colors.message}
                    </FormMessage>
                  ) : (
                    <FormDescription className="text-own-dark-blue !mt-0">
                      Colors of the product
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 h-fit">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="New 2024 Jeans with a new design and rgba lighting, perfect for the summer. Available in all sizes and colors. Only for a limited time! Get yours now! Order now!  New 2024 Jeans with a new design and rgba lighting, perfect for the summer. Available in all sizes and colors. Only for a limited time! Get yours now! Order now! New 2024 Jeans with a new design and rgba lighting, perfect for the summer. Available in all sizes and colors. Only for a limited time! Get yours now! Order now! New 2024 Jeans with a new design and rgba lighting, perfect for the summer. Available in all sizes and colors. Only for a limited time! Get yours now! Order now!"
                      className={`${
                        form.formState.errors.description
                          ? "border-red-500 text-red-500 placeholder:text-red-500"
                          : "border-own-dark-blue"
                      } focus-visible:ring-transparent min-h-[240px] max-h-[240px] !mt-0`}
                    />
                  </FormControl>
                  {form.formState.errors.description?.message ? (
                    <FormMessage className="!mt-0">
                      {form.formState.errors.description.message}
                    </FormMessage>
                  ) : (
                    <FormDescription className="text-own-dark-blue !mt-0">
                      Description of the product
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          disabled={isDisabled}
          className="bg-black text-white transition-transform hover:bg-black duration-300 active:scale-[0.99]"
        >
          {isDisabled ? "Loading..." : product ? "Edit Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
