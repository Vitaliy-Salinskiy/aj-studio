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
