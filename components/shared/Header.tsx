"use client";

import { signOut } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  currencyList,
  headerLinks,
  languagesList,
  profileTabs,
} from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

interface HeaderProps {
  productsCount: number;
  session: any;
}

const Header = ({ productsCount, session }: HeaderProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const setQueryAndPush = useCallback(
    (key: string, value: string | null) => {
      const currentQuery = new URLSearchParams(
        Array.from(searchParams.entries())
      );

      if (value) {
        currentQuery.set(key, value);
      } else {
        currentQuery.delete(key);
      }

      const newQuery = currentQuery.toString();
      const query = newQuery ? `?${newQuery}` : "";

      router.push(`${pathName}${query}`);
    },
    [searchParams, pathName, router]
  );

  const onLanguageChange = useCallback(
    async (value: string) => {
      setQueryAndPush("lang", value);
    },
    [setQueryAndPush]
  );

  const onCurrencyChange = useCallback(
    async (value: string) => {
      setQueryAndPush("currency", value);
    },
    [setQueryAndPush]
  );

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryAndPush("search", e.target.value || null);
  };

  useEffect(() => {
    const setQueries = async () => {
      await onLanguageChange("ENG");
      await onCurrencyChange("USD");
    };

    setQueries();
  }, [onLanguageChange, onCurrencyChange]);

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
                onChange={onInputChange}
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
            <Link
              href="/"
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <Image src="/logo.svg" width={32} height={32} alt="logo" />
              <h2 className="hidden md:block leading-[35px] font-medium text-[23px]">
                Studio
              </h2>
            </Link>
          </div>

          <div className="gap-[46px] hidden sm:flex items-center">
            <div className="hidden gap-[30px] items-center sm:flex">
              {headerLinks.map((link) => {
                if (!link.withAuth && session?.user) {
                  return (
                    <div className="flex gap-2" key={link.label}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Avatar className="border border-black cursor-pointer">
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
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            {profileTabs.map((tab) => (
                              <DropdownMenuItem
                                key={tab.path}
                                onClick={() => router.push(tab.path)}
                              >
                                {tab.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => router.push("/about")}
                          >
                            About us
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              router.replace(
                                "https://github.com/Vitaliy-Salinskiy"
                              )
                            }
                          >
                            My GitHub
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => signOut()}
                            className="text-own-light-red hover:!text-own-light-red"
                          >
                            Log out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
              <Select onValueChange={onLanguageChange} defaultValue="ENG">
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
              <Select onValueChange={onCurrencyChange} defaultValue="USD">
                <SelectTrigger className="w-[69px] h-[30px] bg-own-gray flex gap-[5px] justify-between text-xs text-own-dark-blue rounded-full pr-[6px] pl-[15px] focus-visible:ring-transparent">
                  <SelectValue placeholder="USD" defaultValue="USD" />
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
