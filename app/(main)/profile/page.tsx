"use client";

import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { BiSolidMessageSquareEdit } from "react-icons/bi";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { profileSchema } from "@/schemas";

const page = () => {
  const { data: session, status } = useSession();

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      // name: session?.user.name,
      // email: session?.user.email,
      // dateOfBirth: session?.user.dateOfBirth | undefined,
      // bio: session?.user.bio,
    },
  });

  if (status === "loading") {
    return <ProfileSkeleton />;
  }

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section>
      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <Avatar className="h-[72px] w-[72px] rounded-full bg-black text-white relative flex justify-center items-center text-2xl">
              <AvatarImage
                src={session?.user.image!}
                className="rounded-full"
              />
              <AvatarFallback>{session?.user.name?.slice(0, 1)}</AvatarFallback>
              <div className="w-[22px] h-[22px] flex justify-center items-center bg-black border-[1px] border-white text-white absolute bottom-0 right-0 rounded-md cursor-pointer">
                <BiSolidMessageSquareEdit className="text-sm" />
              </div>
            </Avatar>

            <Button className="bg-black hover:bg-black py-6 px-5 flex gap-2 transition-transform active:scale-90">
              <BiSolidMessageSquareEdit className="text-[17px]" />
              Edit Profile
            </Button>
          </div>
          <FormField
            control={profileForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1 h-fit">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="Jhon Doe"
                    className={`${
                      profileForm.formState.errors.name
                        ? "border-red-500 text-red-500 placeholder:text-red-500"
                        : "border-own-dark-blue"
                    } focus-visible:ring-transparent !mt-0`}
                  />
                </FormControl>
                {profileForm.formState.errors.name?.message && (
                  <FormMessage className="!mt-0">
                    {profileForm.formState.errors.name.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <FormField
              control={profileForm.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 h-fit">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      placeholder="Street, city, country"
                      className={`${
                        profileForm.formState.errors.address
                          ? "border-red-500 text-red-500 placeholder:text-red-500"
                          : "border-own-dark-blue"
                      } focus-visible:ring-transparent !mt-0`}
                    />
                  </FormControl>
                  {profileForm.formState.errors.address?.message && (
                    <FormMessage className="!mt-0">
                      {profileForm.formState.errors.address.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 h-fit">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      placeholder="jhondoe@gmail.com"
                      className={`${
                        profileForm.formState.errors.email
                          ? "border-red-500 text-red-500 placeholder:text-red-500"
                          : "border-own-dark-blue"
                      } focus-visible:ring-transparent !mt-0`}
                    />
                  </FormControl>
                  {profileForm.formState.errors.email?.message && (
                    <FormMessage className="!mt-0">
                      {profileForm.formState.errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3">
            <FormField
              name="dateOfBirth"
              control={profileForm.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 h-fit">
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild className="!mt-0">
                        <Button
                          variant={"outline"}
                          className={cn(
                            `w-full ${
                              profileForm.formState.errors.dateOfBirth
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
                  {profileForm.formState.errors.dateOfBirth?.message && (
                    <FormMessage className="!mt-0">
                      {profileForm.formState.errors.dateOfBirth.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 h-fit">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      placeholder="+380-XX-XXX-XX-XX"
                      className={`${
                        profileForm.formState.errors.phoneNumber
                          ? "border-red-500 text-red-500 placeholder:text-red-500"
                          : "border-own-dark-blue"
                      } focus-visible:ring-transparent !mt-0`}
                    />
                  </FormControl>
                  {profileForm.formState.errors.phoneNumber?.message && (
                    <FormMessage className="!mt-0">
                      {profileForm.formState.errors.phoneNumber.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={profileForm.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1 h-fit">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Ny new 2024 bio with rgba lighting and 3d effects. Here you can read about my life and my hobbies. And to be honest, I don't know what to write here. I'm just testing the textarea. I hope it will be enough. Ny new 2024 bio with rgba lighting and 3d effects. Here you can read about my life and my hobbies. And to be honest, I don't know what to write here. I'm just testing the textarea. I hope it will be enough Ny new 2024 bio with rgba lighting and 3d effects. Here you can read about my life and my hobbies. And to be honest, I don't know what to write here. I'm just testing the textarea. I hope it will be enough Ny new 2024 bio with rgba lighting and 3d effects. Here you can read about my life and my hobbies. And to be honest, I don't know what to write here. I'm just testing the textarea. I hope it will be enough Ny new 2024 bio with rgba lighting and 3d effects. Here you can read about my life and my hobbies. And to be honest, I don't know what to write here. I'm just testing the textarea. I hope it will be enough"
                    className={`${
                      profileForm.formState.errors.bio
                        ? "border-red-500 text-red-500 placeholder:text-red-500"
                        : "border-own-dark-blue"
                    } focus-visible:ring-transparent min-h-[240px] max-h-[280px] !mt-0`}
                  />
                </FormControl>
                {profileForm.formState.errors.bio?.message && (
                  <FormMessage className="!mt-0">
                    {profileForm.formState.errors.bio.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
};

export default page;
