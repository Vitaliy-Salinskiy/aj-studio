"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { User as IUser } from "@prisma/client";

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
import { profileSchema } from "@/schemas";
import { useEdgeStore } from "@/context/EdgeStoreProvider";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProfileFormProps {
  profileData: IUser;
}

const ProfileForm = ({ profileData }: ProfileFormProps) => {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<string>("");
  const { edgestore } = useEdgeStore();

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    profileForm.reset({
      name: profileData?.name! || "",
      dateOfBirth: profileData?.dateOfBirth || undefined,
      bio: profileData?.bio || "",
      address: profileData?.address || "",
      phoneNumber: profileData?.phoneNumber || "",
    });
  }, [profileData?.id]);

  useEffect(() => {
    if (profileData?.image) {
      setFile(profileData.image);
    }
  }, []);

  const handlePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const res = await edgestore.publicFiles.upload({
        file: e.target.files[0],
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });

      setFile(res.url);

      const userRes = await fetch(`/api/users/${profileData.id}`, {
        method: "PATCH",
        body: JSON.stringify({ image: res.url }),
      });

      if (userRes.ok) {
        router.refresh();
        const sessionRes = await updateSession({
          ...session,
          user: { ...session?.user, image: res.url },
        });
        console.log("User image updated", sessionRes);
      }
    }
  };

  const onSubmit = (data: Partial<IUser>) => {
    console.log(data);
  };

  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex justify-between items-center">
          <Avatar className="h-[72px] w-[72px] rounded-full bg-black text-white relative flex justify-center items-center text-2xl">
            <AvatarImage src={file} className="w-full h-full rounded-full" />
            <label className="z-10 bg-transparent absolute inset-0 rounded-full cursor-pointer">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg, image/webp"
                hidden
                onChange={async (e) => await handlePictureChange(e)}
              />
              <div className="w-[22px] h-[22px] flex justify-center items-center bg-black border-[1px] border-white text-white absolute bottom-0 right-0 rounded-md">
                <BiSolidMessageSquareEdit className="text-sm" />
              </div>
            </label>
            <AvatarFallback>{profileData?.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>

          {/* <Button className="bg-black hover:bg-black py-6 px-5 flex gap-2 transition-transform active:scale-90">
            <BiSolidMessageSquareEdit className="text-[17px]" />
            Edit Profile
          </Button> */}
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-3">
          <FormField
            control={profileForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1 h-fit">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
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
          <FormField
            control={profileForm.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1 h-fit">
                <FormLabel>Address (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
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
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-3">
          <FormField
            name="dateOfBirth"
            control={profileForm.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1 h-fit">
                <FormLabel>Date of birth (optional)</FormLabel>
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
                        {...field}
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
                <FormLabel>Phone number (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
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
              <FormLabel>Bio (optional)</FormLabel>
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
  );
};

export default ProfileForm;