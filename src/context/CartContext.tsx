import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/tamanusData';

export interface CartItem {
  product: Product;
  packSize: '500g' | '1kg';
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, packSize: '500g' | '1kg', quantity?: number) => void;
  removeItem: (productId: string, packSize: '500g' | '1kg') => void;
  updateQuantity: (productId: string, packSize: '500g' | '1kg', quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tamanus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('tamanus_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addItem = (product: Product, packSize: '500g' | '1kg', quantity = 1) => {
    const unitPrice = packSize === '500g' ? product.price500g : product.price1kg;
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.packSize === packSize
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.packSize === packSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, packSize, quantity, price: unitPrice }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, packSize: '500g' | '1kg') => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.packSize === packSize)
      )
    );
  };

  const updateQuantity = (
    productId: string,
    packSize: '500g' | '1kg',
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(productId, packSize);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.packSize === packSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmount,
        totalCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
