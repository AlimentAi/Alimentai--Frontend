import React, { useState, useEffect } from 'react';
import { Vortex } from 'react-loader-spinner';
import { useFavorite } from '../../contexts/FavoriteContext';
import CardProduto from '../../components/produtos/CardProduto';

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
    <div className="flex justify-center w-full px-20 my-10">
      <div className="container flex flex-col flex-container items-center mb-8">
        <div className="bg-green-200 dark:bg-[#394B3E] py-3 px-10 mb-10 flex items-center rounded-full mb-20 mx-10">
          <span className='font-bold mr-20' style={{ fontSize: '40px' }}>FAVORITOS</span>
          <input
            type="text"
            placeholder="Pesquisar por produto"
            value={filtroProduto}
            onChange={handleFiltrarProdutos}
            className='border-slate-800 rounded bg-white dark:bg-[#212b24] px-3 py-1 duration-300'
            style={{ width: '400px', marginRight: '20px' }}
          />
        </div>
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
