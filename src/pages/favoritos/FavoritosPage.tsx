import React, { useState, useEffect } from 'react';
import { Vortex } from 'react-loader-spinner';
import { useFavorite } from '../../contexts/FavoriteContext';
import CardProduto from '../../components/produtos/CardProduto';
import { Heart } from '@phosphor-icons/react';

function FavoritosPage() {
  const { favorites } = useFavorite();
  const [loading, setLoading] = useState(true);
  const [filtroProduto, setFiltroProduto] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFiltrarProdutos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroProduto(e.target.value);
  };

  return (
    <div className="flex justify-center w-full px-20 bg-wallpaper bg-repeat bg-center">
      <div className="container flex flex-col flex-container items-center mb-8">
      <div className={'my-10 bg-green-300 bg-opacity-50 backdrop-blur-sm dark:bg-[#394B3E] dark:bg-opacity-30 backdrop-blur-sm py-3 px-10 mb-10 flex items-center rounded-full'}>
          <span className='font-bold mr-20' style={{ fontSize: '40px' }}>FAVORITOS</span>
          <input
            type="text"
            placeholder="Pesquisar por produto"
            value={filtroProduto}
            onChange={handleFiltrarProdutos}
            className='border-slate-800 rounded bg-white dark:bg-[#212b24] px-3 py-1 duration-300'
            style={{ width: '400px', marginRight: '20px' }}
          />
<Heart size={30} color="gray"/>        </div>
        {loading && (
          <div className="flex justify-center min-h-96">
            <Vortex
              height={100}
              width={100}
              ariaLabel="vortex-loading"
              visible={true}
              colors={['#be0343', '#be0343', '#be0343', '#be0343', '#be0343', 'green']}
            />
          </div>
        )}
        {!loading && favorites.length === 0 && (
          <p className="text-center text-lg font-semibold text-gray-600">
            Ainda não há Produtos adicionados aos Favoritos
          </p>
        )}
        {!loading && favorites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {favorites
              .filter((produto) =>
                produto.nome.toLowerCase().includes(filtroProduto.toLowerCase())
              )
              .map((produto) => (
                <CardProduto key={produto.id} produto={produto} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritosPage;
