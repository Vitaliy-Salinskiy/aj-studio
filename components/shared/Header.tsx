"use client";

import { signOut } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currencyList, headerLinks, languagesList } from "@/constants";

interface HeaderProps {
  productsCount: number;
}

const Header = ({ productsCount }: HeaderProps) => {
  const { data: session } = useSession();

  return (
    <header>
      <div className="appContainer">
        <div className="flex justify-between items-center py-[15px] lg:py-[26px]">
          <div className="flex items-center gap-2.5">
            <Button className="text-[18px] flex items-center justify-center gap-[5px] px-[16px] h-[56px] font-normal rounded-full bg-own-gray text-own-dark-blue hover:bg-own-gray transition-all">
              <div className="flex gap-[4px] flex-col items-start justify-center h-full">
                <div className="w-[14px] h-[2px] bg-own-dark-gray rounded-full" />
                <div className="w-[10px] h-[2px] bg-own-dark-gray rounded-full" />
              </div>
              Menu
            </Button>
            <div className="relative hidden md:block">
              <Input
                className="bg-own-gray focus-visible:ring-transparent pl-[48px] pr-[22px] py-[17px] w-[200px] placeholder:text-own-dark-blue text-[18px] placeholder:text-[18px] text-own-dark-blue rounded-full h-[56px]"
                placeholder="Search"
              />
              <Image
                src="/search.svg"
                width={17}
                height={17}
                alt="description"
                className="absolute left-[25px] top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="sm:flex-[2] sm:flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <Image src="/logo.svg" width={32} height={32} alt="logo" />
              <h2 className="hidden md:block leading-[35px] font-medium text-[23px]">
                Studio
              </h2>
            </div>
          </div>

          <div className="gap-[46px] hidden sm:flex">
            <div className="hidden gap-[30px] items-center sm:flex">
              {headerLinks.map((link) => {
                if (!link.withAuth && session?.user) {
                  return (
                    <div className="flex gap-2" key={link.label}>
                      <Button
                        className="bg-black hover:bg-black"
                        onClick={async () => {
                          await signOut();
                        }}
                      >
                        Sign Out
                      </Button>
                      <Avatar className="border border-black">
                        {session?.user?.image && (
                          <AvatarImage
                            width={32}
                            height={32}
                            src={session?.user?.image}
                            alt="avatar"
                          />
                        )}
                        <AvatarFallback className="border border-black bg-own-gray">
                          {session?.user?.name?.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  );
                }

                return (
                  <div className="flex gap-4 items-center" key={link.href}>
                    <Link href={link.href}>
                      <Image
                        src={link.image}
                        width={18}
                        height={18}
                        alt={link.label}
                      />
                    </Link>
                    {link.label === "Cart" && (
                      <div className="w-[28px] h-[28px] bg-own-red drop-shadow-2xl shadow-2xl shadow-slate-950 rounded-full flex justify-center items-center text-white">
                        {productsCount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="hidden gap-2.5 lg:flex">
              <Select>
                <SelectTrigger className="w-[69px] h-[30px] bg-own-gray flex gap-[5px] justify-between text-xs text-own-dark-blue rounded-full pr-[6px] pl-[15px] focus-visible:ring-transparent">
                  <SelectValue placeholder="ENG" />
                </SelectTrigger>
                <SelectContent className="w-[69px]">
                  {languagesList.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[69px] h-[30px] bg-own-gray flex gap-[5px] justify-between text-xs text-own-dark-blue rounded-full pr-[6px] pl-[15px] focus-visible:ring-transparent">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent className="w-[69px]">
                  {currencyList.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
