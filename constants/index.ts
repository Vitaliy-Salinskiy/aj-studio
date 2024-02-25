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
];

export const currencyList = [
  { value: "USD", label: "USD" },
  { value: "UAH", label: "UAH" },
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
    bgColor: "#D3FBD9",
    color: "#8DFF9E",
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

export const cardColors = ["#7BE498", "#F5E6FF", "#F7C29B", "#68EAEB"];

export const discountRate = [0, 5, 10, 15, 20, 25, 50, 75];

export const footerFeatures = [
  {
    title: "Categories",
    subtitles: ["Cufflink", "Evening Dress", "Pumps", "Umbrella", "Sari"],
  },
  {
    title: "More",
    subtitles: [
      "Column Two",
      "Down-padded Coat",
      "Sandals",
      "Brooch",
      "Scarf",
      "Ring",
    ],
  },
  {
    title: "About",
    subtitles: [
      "Contact Us",
      "About Us",
      "Support/Help",
      "FAQ",
      "Terms and Conditions",
    ],
  },
];

import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

export const socials = [
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://facebook.com",
    color: "#3b5998",
  },
  {
    name: "Twitter",
    icon: AiFillTwitterCircle,
    link: "https://twitter.com",
    color: "#1da1f2",
  },
  {
    name: "Instagram",
    icon: RiInstagramFill,
    link: "https://instagram.com",
    color: "#c32aa3",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    link: "https://linkedin.com",
    color: "#0077b5",
  },
];

export const footerCopyrights = [
  "Privacy Policy",
  "Terms of Service",
  "Cookies Settings",
];
