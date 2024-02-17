export const headerLinks = [
  {
    href: "/sign-in",
    label: "Profile",
    image: "/user.svg",
    withAuth: false,
  },
  {
    href: "/wishlist",
    label: "Wishlist",
    image: "/heart.svg",
    withAuth: true,
  },
  {
    href: "/cart",
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
    color: "#FFDC62",
  },
  {
    title: "Are you ready to",
    boldTitle: "lead the way",
    description: "Luxury meets ultimate sitting comfort",
    image: "/slide-1.png",
    path: "/products",
    color: "#FFE2B5",
  },
  {
    title: "Are you ready to",
    boldTitle: "lead the way",
    description: "Luxury meets ultimate sitting comfort",
    image: "/slide-1.png",
    path: "/products",
    color: "#D3FBD9",
  },
];
