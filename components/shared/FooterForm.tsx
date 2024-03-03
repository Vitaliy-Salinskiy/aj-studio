"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const FooterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      const { email } = data;

      const res = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        reset();
        alert("Subscribed successfully");
      } else {
        alert("Failed to subscribe");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 mt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Input
          {...register("email")}
          className={`p-3 border-[2px] ${
            errors.email?.message
              ? "border-red-500 placeholder:text-red-500 text-red-500"
              : "border-black"
          } rounded-[5px] font-semibold placeholder:font-normal focus-visible:ring-0 focus-visible:ring-transparent transition-colors`}
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        {errors.email?.message && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  );
};

export default FooterForm;
