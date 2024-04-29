import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Produto from '../models/Produto';

interface FavoriteContextType {
  favorites: Produto[];
  addFavorite: (product: Produto) => void;
  removeFavorite: (productId: number) => void;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Produto[]>([]);


  const addFavorite = (product: Produto) => {
    setFavorites([...favorites, product]);
  };

  const removeFavorite = (productId: number) => {
    const updatedFavorites = favorites.filter((product) => product.id !== productId);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

