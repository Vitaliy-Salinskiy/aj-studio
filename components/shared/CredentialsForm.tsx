"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
import { loginSchema, registerSchema } from "@/schemas";
import { IUserForm } from "@/interfaces";
import { userFormInitialValues } from "@/constants";

interface CredentialsFormProps {
  isExtended: boolean;
}

const CredentialsForm = ({ isExtended }: CredentialsFormProps) => {
  const [isPasswordsHide, setIsPasswordsHide] = useState(true);

  const authForm = useForm<IUserForm>({
    resolver: zodResolver(isExtended ? registerSchema : loginSchema),
    mode: "onChange",
    defaultValues: userFormInitialValues,
  });

  const onSubmit = (data: IUserForm) => {
    const { confirmPassword, ...dto } = data;
    console.log(dto);
    authForm.reset();
  };

  return (
    <div className="bg-white w-full sm:w-4/5 lg:w-3/6 p-10 sm:rounded-3xl flex flex-col gap-8">
      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="font-medium text-[40px] leading-[110%]">
          {isExtended ? "Create an account" : "Log in"}
        </h1>
        <p className="text-gray-500/60 flex gap-[3px] text-base flex-col sm:flex-row">
          New to Design Space?
          <Link
            href={isExtended ? "sign-in" : "sign-up"}
            className="underline text-own-dark-black cursor-pointer"
          >
            {isExtended ? "Login" : "Sign up"} for free
          </Link>
        </p>
      </div>

      <div>
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
                          authForm.formState.errors.confirmPassword
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
          </form>
          <div className="w-full h-0.5 bg-own-light-gray my-4 relative">
            <p className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-sm bg-white uppercase px-3">
              OR
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <Button
              className="flex-1 bg-transparent hover:bg-transparent border border-black"
              onClick={() => signIn("google")}
            >
              <FcGoogle className="text-[26px]" />
            </Button>
            <Button
              className="flex-1 bg-transparent hover:bg-transparent border border-black"
              onClick={() => signIn("github")}
            >
              <FaGithub className="text-[26px] text-black" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CredentialsForm;
