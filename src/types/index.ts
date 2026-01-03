// Core data types
export interface Product {
  id: string;
  name: string;
  description: string;
  categorySlug: string;
  price: number;
  currency: string;
  images: string[];
  featured: boolean;
  tags: string[];
  materialOptions: MaterialOption[];
  colorOptions: ColorOption[];
  sizeOptions: SizeOption[];
  leadTimeDaysMin: number;
  leadTimeDaysMax: number;
  rating: number;
  reviewCount: number;
  sku: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface ColorOption {
  id: string;
  name: string;
  hexCode: string;
  priceModifier: number;
}

export interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  priceModifier: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMaterial: MaterialOption;
  selectedColor: ColorOption;
  selectedSize: SizeOption;
  customizationNote: string;
  itemId: string; // Unique identifier for this cart item
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  price: number;
}

export interface Order {
  orderReference: string;
  customerInfo: CustomerInfo;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: string;
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

export interface FilterState {
  priceRange: [number, number];
  materials: string[];
  colors: string[];
  rating: number;
  tags: string[];
}

export interface PageMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}
