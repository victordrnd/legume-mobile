export default interface Product {
  id: number;
  libelle: string;
  category: { id: string, libelle: string, slug: string };
  origin: string;
  unit_price: string;
  unit: string;
  category_id: number;
}