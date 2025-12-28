export type MenuItem = {
  id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  menu: MenuItem[];
};
