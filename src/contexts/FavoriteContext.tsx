import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Produto from '../models/Produto';

// Criando o contexto de favoritos e definindo o tipo
interface FavoriteContextType {
  favorites: Produto[]; // Tipo adequado de produto
  addFavorite: (product: Produto) => void; // Tipo adequado de produto
  removeFavorite: (productId: number) => void; // Tipo adequado de productId
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

// Hook customizado para usar o contexto de favoritos
export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};

// Provedor do contexto de favoritos
export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Produto[]>([]); // Tipo adequado de produto

  // Função para adicionar um produto aos favoritos
  const addFavorite = (product: Produto) => {
    setFavorites([...favorites, product]);
  };

  // Função para remover um produto dos favoritos
  const removeFavorite = (productId: number) => {
    const updatedFavorites = favorites.filter((product) => product.id !== productId);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    // Recuperar favoritos do armazenamento local ao montar o componente
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Salvar favoritos no armazenamento local sempre que eles forem atualizados
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

