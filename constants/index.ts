export const headerLinks = [
  {
    href: "/",
    label: "Profile",
    image: "/user.svg",
  },
  {
    href: "/wishlist",
    label: "Wishlist",
    image: "/heart.svg",
  },
  {
    href: "/cart",
    label: "Cart",
    image: "/cart.svg",
  },
];

export const colorOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
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
