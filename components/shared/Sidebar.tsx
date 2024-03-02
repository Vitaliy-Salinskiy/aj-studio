"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { adminTabs } from "@/constants";

import { IoIosArrowForward } from "react-icons/io";

interface SidebarProps {
  session: any;
}

const Sidebar = ({ session }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-own-light-black text-white/50 min-h-screen p-6 min-w-fit rounded-r-[6px] flex flex-col`}
    >
      <div className="relative">
        <div
          className="absolute -right-9 top-2.5 h-7 w-7 bg-own-light-black hidden lg:flex items-center justify-center text-xl border-[#2D2F39] border rounded-lg cursor-pointer"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <IoIosArrowForward></IoIosArrowForward>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <Avatar className="h-11 w-11 border-[2px] border-[#2D2F39]">
            <AvatarImage src={session?.user.image!} />
            <AvatarFallback className="bg-own-light-black text-white">
              {session?.user.name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div
            className={`hidden ${
              isOpen ? "lg:flex" : "lg:hidden"
            } justify-center items-centerS flex-col`}
          >
            <p className="uppercase text-sm font-medium">Product manager</p>
            <h2 className="text-[20px] leading-7 text-white/80">
              {session?.user.name}
            </h2>
          </div>
        </div>
      </div>
      <Separator className="my-4 lg:my-6 bg-[#2D2F39] h-0.5" />
      <div className="flex gap-2 flex-col h-full">
        {adminTabs.map((item) => (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger
                className={`z-10 ${item.isExit ? "mt-auto" : ""}`}
              >
                <Link
                  href={item.path}
                  className={`flex items-center justify-center lg:justify-stretch gap-3 min-h-10 mt-auto ${
                    item.isExit ? "text-red-500" : "hover:text-white"
                  } transition-colors hover:bg-[#2D2F39] px-3 capitalize rounded-md`}
                >
                  <item.icon
                    className={`${item.isExit ? "text-[28px]" : "text-[20px]"}`}
                  />
                  <p
                    className={`text-sm font-medium hidden ${
                      isOpen ? "lg:block" : "lg:hidden"
                    }`}
                  >
                    {item.label}
                  </p>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={`bg-[#2D2F39] ${
                  !isOpen ? "flex" : "hidden"
                } border-none text-white h-10 text-sm justify-center items-center`}
              >
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
