"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";

import Uploader from "@/components/shared/Uploader";

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
import { useProductStore } from "@/store/productStore";
import { useToast } from "@/components/ui/use-toast";

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
];

const productSchema = z.object({
  name: z.string().trim().min(2).max(30),
  description: z.string().trim().min(5).max(500).optional(),
  price: z
    .string()
    .transform(parseFloat)
    .refine((value) => !isNaN(value), {
      message: "Price is required",
    })
    .refine((value) => value >= 0.99 && value <= 10000, {
      message: "Price must be between 0.99 and 10000",
    }),
  colors: z.array(z.any()).min(1),
});

const ProductForm = () => {
  const { toast } = useToast();
  const { image, setError } = useProductStore();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    setError(false);
    if (!image) {
      toast({
        title: "ERROR!",
        description: "Please upload an image",
      });
      setError(true);
    }
    console.log(data, image);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col lg:flex-row gap-5">
          <FormItem className="flex-1">
            <Uploader />
          </FormItem>
          <div className="flex-1 flex flex-col gap-2.5">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1 h-fit">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={`${
                          form.formState.errors.name
                            ? "border-red-500 text-red-500"
                            : "border-own-dark-blue"
                        } focus-visible:ring-transparent !mt-0`}
                      />
                    </FormControl>
                    {form.formState.errors.name &&
                    form.formState.errors.name.message ? (
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
                        className={`${
                          form.formState.errors.price
                            ? "border-red-500 text-red-500"
                            : "border-own-dark-blue"
                        } focus-visible:ring-transparent !mt-0`}
                      />
                    </FormControl>
                    {form.formState.errors.price &&
                    form.formState.errors.price.message ? (
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
                      options={colorOptions as any}
                      classNamePrefix="product-select"
                      styles={{
                        placeholder: (provided) => ({
                          ...provided,
                          color: form.formState.errors.colors
                            ? "red"
                            : "#11293B",
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
                        control: (provided, state) => ({
                          ...provided,
                          border: form.formState.errors.colors
                            ? "1px solid red"
                            : "1px solid #11293B",
                          height: 40,
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
                          color: "#11293B",
                          transition: "color 0.3s",
                          cursor: "pointer",
                          "&:hover": {
                            color: "#000",
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
                        menuList: (provided) => ({
                          borderColor: "red",
                        }),
                      }}
                    />
                  </FormControl>

                  {form.formState.errors.colors &&
                  form.formState.errors.colors.message ? (
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
                      className={`${
                        form.formState.errors.description
                          ? "border-red-500 text-red-500"
                          : "border-own-dark-blue"
                      } focus-visible:ring-transparent min-h-[240px] max-h-[240px] !mt-0`}
                    />
                  </FormControl>
                  {form.formState.errors.description &&
                  form.formState.errors.description.message ? (
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
        <Button className="bg-black text-white transition-transform hover:bg-black duration-300 active:scale-[0.99]">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
