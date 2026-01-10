import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, MaterialOption, ColorOption, SizeOption } from '../types';
import { logAnalyticsEvent } from '../utils/analytics';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    material: MaterialOption,
    color: ColorOption,
    size: SizeOption,
    quantity: number,
    customizationNote?: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateCustomization: (itemId: string, note: string) => void;
  updateVariant: (
    itemId: string,
    material?: MaterialOption,
    color?: ColorOption,
    size?: SizeOption
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'light3d-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initialization
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addToCart = (
    product: Product,
    material: MaterialOption,
    color: ColorOption,
    size: SizeOption,
    quantity: number,
    customizationNote: string = ''
  ) => {
    const itemId = `${product.id}-${material.id}-${color.id}-${size.id}-${Date.now()}`;
    
    const newItem: CartItem = {
      product,
      quantity,
      selectedMaterial: material,
      selectedColor: color,
      selectedSize: size,
      customizationNote,
      itemId,
    };

    setItems((prev) => [...prev, newItem]);
    
    // Analytics event
    logAnalyticsEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity,
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const updateCustomization = (itemId: string, note: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId ? { ...item, customizationNote: note } : item
      )
    );
  };

  const updateVariant = (
    itemId: string,
    material?: MaterialOption,
    color?: ColorOption,
    size?: SizeOption
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.itemId !== itemId) return item;
        return {
          ...item,
          ...(material && { selectedMaterial: material }),
          ...(color && { selectedColor: color }),
          ...(size && { selectedSize: size }),
        };
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const basePrice = item.product.price;
      const materialPrice = item.selectedMaterial.priceModifier;
      const colorPrice = item.selectedColor.priceModifier;
      const sizePrice = item.selectedSize.priceModifier;
      const itemTotal = (basePrice + materialPrice + colorPrice + sizePrice) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCustomization,
        updateVariant,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
