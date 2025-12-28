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

const BASE_URL =
  'https://6950293b8531714d9bcff550.mockapi.io/api/v1';

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const res = await fetch(`${BASE_URL}/restaurants`);
  if (!res.ok) throw new Error('Failed to load restaurants');
  return res.json();
};
