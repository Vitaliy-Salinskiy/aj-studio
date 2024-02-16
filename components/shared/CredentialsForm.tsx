"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { BiHide } from "react-icons/bi";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CredentialsFormProps {
  isExtended?: boolean;
}

interface IUserForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
}

const CredentialsForm = ({ isExtended = true }: CredentialsFormProps) => {
  const [isPasswordsHide, setIsPasswordsHide] = useState(true);

  const loginSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(32, { message: "Password must be no more than 32 characters" }),
  });

  const registerSchema = loginSchema
    .extend({
      username: z
        .string()
        .trim()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(32, { message: "Username must be no more than 32 characters" }),
      dateOfBirth: z.date(),
      confirmPassword: z
        .string()
        .trim()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(32, { message: "Password must be no more than 32 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords should match",
      path: ["confirmPassword"],
    });

  const authForm = useForm<IUserForm>({
    resolver: zodResolver(isExtended ? registerSchema : loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: IUserForm) => {
    console.log(data);
  };

  return (
    <Form {...authForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={authForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={authForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-1 h-fit">
              <FormLabel
                className={`text-base ${
                  authForm.formState.errors.email
                    ? "text-red-500"
                    : "text-own-light-gray"
                }`}
              >
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="jhoedoe@gmail.com"
                  className={`${
                    authForm.formState.errors.email
                      ? "border-red-500 text-red-500 placeholder:text-red-500"
                      : "border-own-dark-blue"
                  } focus-visible:ring-transparent !mt-0`}
                />
              </FormControl>
              {authForm.formState.errors.email &&
                authForm.formState.errors.email.message && (
                  <FormMessage className="!mt-0">
                    {authForm.formState.errors.email.message}
                  </FormMessage>
                )}
            </FormItem>
          )}
        />
        {isExtended && (
          <>
            <FormField
              control={authForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 h-fit">
                  <FormLabel
                    className={`text-base ${
                      authForm.formState.errors.username
                        ? "text-red-500"
                        : "text-own-light-gray"
                    }`}
                  >
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Mike Doe"
                      className={`${
                        authForm.formState.errors.username
                          ? "border-red-500 text-red-500 placeholder:text-red-500"
                          : "border-own-dark-blue"
                      } focus-visible:ring-transparent !mt-0`}
                    />
                  </FormControl>
                  {authForm.formState.errors.username &&
                    authForm.formState.errors.username.message && (
                      <FormMessage className="!mt-0">
                        {authForm.formState.errors.username.message}
                      </FormMessage>
                    )}
                </FormItem>
              )}
            />
            <FormField
              name="dateOfBirth"
              control={authForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel
                    className={`text-base ${
                      authForm.formState.errors.dateOfBirth
                        ? "text-red-500"
                        : "text-own-light-gray"
                    }`}
                  >
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            `w-full ${
                              authForm.formState.errors.dateOfBirth
                                ? "border-red-500 !text-red-500"
                                : "border-black"
                            } border justify-start text-left font-normal`,
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  {authForm.formState.errors.dateOfBirth &&
                    authForm.formState.errors.dateOfBirth.message && (
                      <FormMessage className="!mt-0">
                        {authForm.formState.errors.dateOfBirth.message}
                      </FormMessage>
                    )}
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={authForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-1 h-fit">
              <div className="w-full flex justify-between">
                <FormLabel
                  className={`text-base ${
                    authForm.formState.errors.password
                      ? "text-red-500"
                      : "text-own-light-gray"
                  }`}
                >
                  Password
                </FormLabel>
                <div
                  className={`transition-colors duration-300 flex items-center gap-1 cursor-pointer ${
                    isPasswordsHide ? "text-own-light-gray" : "text-black"
                  }`}
                  onClick={() => setIsPasswordsHide((prevState) => !prevState)}
                >
                  <BiHide className="text-sm" />
                  <p className="text-sm">Hide</p>
                </div>
              </div>
              <FormControl>
                <Input
                  type={isPasswordsHide ? "password" : "text"}
                  {...field}
                  placeholder="strong-password"
                  className={`${
                    authForm.formState.errors.password
                      ? "border-red-500 text-red-500 placeholder:text-red-500"
                      : "border-own-dark-blue"
                  } focus-visible:ring-transparent !mt-0`}
                />
              </FormControl>
              {authForm.formState.errors.password &&
                authForm.formState.errors.password.message && (
                  <FormMessage className="!mt-0">
                    {authForm.formState.errors.password.message}
                  </FormMessage>
                )}
            </FormItem>
          )}
        />
        {isExtended && (
          <FormField
            name="confirmPassword"
            control={authForm.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1 h-fit">
                <div className="w-full flex justify-between">
                  <FormLabel
                    className={`text-base ${
                      authForm.formState.errors.confirmPassword
                        ? "text-red-500"
                        : "text-own-light-gray"
                    }`}
                  >
                    Confirm Password
                  </FormLabel>
                  <div
                    className={`transition-colors duration-300 flex items-center gap-1 cursor-pointer ${
                      isPasswordsHide ? "text-own-light-gray" : "text-black"
                    }`}
                    onClick={() =>
                      setIsPasswordsHide((prevState) => !prevState)
                    }
                  >
                    <BiHide className="text-sm" />
                    <p className="text-sm">Hide</p>
                  </div>
                </div>
                <FormControl>
                  <Input
                    type={isPasswordsHide ? "password" : "text"}
                    {...field}
                    placeholder="strong-password"
                    className={`${
                      authForm.formState.errors.password
                        ? "border-red-500 text-red-500 placeholder:text-red-500"
                        : "border-own-dark-blue"
                    } focus-visible:ring-transparent !mt-0`}
                  />
                </FormControl>
                {authForm.formState.errors.confirmPassword &&
                  authForm.formState.errors.confirmPassword.message && (
                    <FormMessage className="!mt-0">
                      {authForm.formState.errors.confirmPassword.message}
                    </FormMessage>
                  )}
              </FormItem>
            )}
          />
        )}
        <p className="text-black underline text-base">Forgot Password?</p>
        <Button className="bg-black hover:bg-black">Login</Button>
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button className="flex-1 bg-transparent hover:bg-transparent border border-black">
            <FcGoogle className="text-[26px]" />
          </Button>
          <Button className="flex-1 bg-transparent hover:bg-transparent border border-black">
            <FaGithub className="text-[26px] text-black" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CredentialsForm;
