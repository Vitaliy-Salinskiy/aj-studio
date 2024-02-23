import { CgProfile } from "react-icons/cg";
import { BsFillBox2HeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdSimCardDownload } from "react-icons/md";

export const headerLinks = [
  {
    href: "/sign-in",
    label: "Profile",
    image: "/user.svg",
    withAuth: false,
  },
  {
    href: "/profile/wishlist",
    label: "Wishlist",
    image: "/heart.svg",
    withAuth: true,
  },
  {
    href: "/profile/cart",
    label: "Cart",
    image: "/cart.svg",
    withAuth: true,
  },
];

export const languagesList = [
  { value: "ENG", label: "ENG" },
  { value: "UA", label: "UA" },
  { value: "PL", label: "PL" },
];

export const currencyList = [
  { value: "USD", label: "USD" },
  { value: "UAH", label: "UAH" },
  { value: "PLN", label: "PLN" },
];

export const colorOptions = [
  { value: "#000000", label: "Black" },
  { value: "#E61800", label: "Red" },
  { value: "#E67100", label: "Orange" },
  { value: "#E6C400", label: "Yellow" },
  { value: "#70B200", label: "Green" },
];

export const productFormInitialValues = {
  colors: [],
  description: "",
  name: "",
  price: "" as any,
};

export const userFormInitialValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: undefined,
};

export const slidesList = [
  {
    title: "Are you ready to",
    boldTitle: "lead the way",
    description: "Luxury meets ultimate sitting comfort",
    image: "/slide-1.png",
    path: "/products",
    bgColor: "#FFDC62",
    color: "#FFC703",
  },
  {
    title: "Are you ready to",
    boldTitle: "lead the way",
    description: "Luxury meets ultimate sitting comfort",
    image: "/slide-1.png",
    path: "/products",
    bgColor: "#FFE2B5",
    color: "#F5CF94",
  },
  {
    title: "Are you ready to",
    boldTitle: "lead the way",
    description: "Luxury meets ultimate sitting comfort",
    image: "/slide-1.png",
    path: "/products",
    bgColor: "#D3FBD9",
    color: "#8DFF9E",
  },
];

export const profileTabs = [
  {
    label: "Profile",
    path: "/profile",
    icons: CgProfile,
  },
  {
    label: "Cart",
    path: "/profile/cart",
    icons: FaShoppingCart,
  },
  {
    label: "Wishlist",
    path: "/profile/wishlist",
    icons: BsFillBox2HeartFill,
  },
  {
    label: "Your Products",
    path: "/profile/products",
    icons: MdSimCardDownload,
  },
  {
    label: "Settings",
    path: "/profile/settings",
    icons: IoSettings,
  },
];
