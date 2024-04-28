// Arquivo: CardProduto.tsx
import React, { useContext, useState, useEffect, ChangeEvent } from 'react';
import { Heart, ShoppingCart, PencilSimpleLine, ImageBroken, Minus, Plus, Trash } from '@phosphor-icons/react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFavorite } from '../../contexts/FavoriteContext';
import Produto from '../../models/Produto';
import { atualizar } from '../../services/Service';
import { toast } from 'react-toastify';
import { toastAlerta } from '../../utils/toastAlerta';

interface CardProdutoProps {
  produto: Produto;
  editable: boolean;
}

function CardProduto({ produto, editable }: CardProdutoProps) {
  const [quantidade, setQuantidade] = useState(0);
  const [favorito, setFavorito] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();
  
  const { addFavorite, removeFavorite, favorites } = useFavorite();

  useEffect(() => {
    setFavorito(favorites.some((favProduto) => favProduto.id === produto.id));
  }, [favorites, produto]);

  function incrementItem() {
    if (quantidade < produto.quantidade)
      setQuantidade(quantidade + 1);
    if (quantidade > produto.quantidade - 1)
      setQuantidade(produto.quantidade);
  }

  function decrementItem() {
    if (quantidade > 0)
      setQuantidade(quantidade - 1);
    if (quantidade < 1)
      setQuantidade(0);
  }
  
  function atualizarQuantidade(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)
    
    if (value > 0) {
      e.target.value = value.toString();
      setQuantidade(value);
    }

    if (value < 0) {
      e.target.value = "0";
      setQuantidade(0);
    }

    if (value > produto.quantidade) {
      e.target.value = quantidade.toString();
      setQuantidade(produto.quantidade);
    } else {
      setQuantidade(value);
    }  
  }
  
  function toggleFavorito() {
    if (!favorito) {
      addFavorite(produto);
    } else {
      removeFavorite(produto.id);
    }
    setFavorito(!favorito);
  }

  async function addToCart() {
    const newProduto = {...produto, quantidade: produto.quantidade - quantidade}

    if (quantidade === 0) {
      toastAlerta('Você não pode adicionar algo vazio ao carrinho', 'info')
      return
    }

    // Adicionar ao CartContext

    /*try {
      await atualizar('/produtos', newProduto, Function, {
        headers: {
          'Authorization': usuario.token
        }
      })

      toastAlerta(`${quantidade} ${produto.nome}s foi adicionado ao carrinho`, 'sucesso')

    } catch(error: any) {
      toast.error('Erro ao adicionar item ao carrinho')
      console.log(error)
    }*/
  }

  function editarProduto() {
    navigate(`/editarProduto/${produto.id}`)
  }
  
  return ( 
    <div className='relative border border-gray-300 shadow-md rounded-lg overflow-hidden max-w-80'>
         {location.pathname === '/favoritos' ?
        <Trash
          size={40}
          weight='fill'
          className={'absolute top-1 right-1 p-2 cursor-pointer hover:text-red-600 dark:hover:text-red-400 text-red-500 duration-300'}
          onClick={toggleFavorito}
        /> :
        favorito ?
        <Heart
          size={40}
          weight='fill'
          className={'absolute top-1 right-1 p-2 cursor-pointer hover:text-red-600 dark:hover:text-red-400 text-red-500 duration-300'}
          onClick={toggleFavorito}
        /> :
        <Heart
          size={40}
          className={'absolute top-1 right-1 p-2 cursor-pointer hover:text-red-600 dark:hover:text-red-400 text-black dark:text-white duration-300'}
          onClick={toggleFavorito}/>
      }
      {produto.foto === null || produto.foto === undefined || produto.foto === '' ?
        <ImageBroken size={64} className='mx-auto w-full h-auto max-h-56 bg-[#88888844]' /> :
        <img src={produto.foto} className='w-full max-h-56' alt={produto.nome} />
      }
      <div className='p-4 flex flex-col justify-center items-center'>
        <p className='text-start text-2xl font-bold mb-4'>{produto.nome}</p>
        <p className='w-full flex items-center justify-center py-2 rounded-lg duration-300'>{produto.descricao}</p>
        <p>Peso aprox: 250g</p>
        <p className='text-2xl font-bold text-start my-2'>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(produto.preco)}</p>
      </div>
      <div className='p-2 border border-gray-300 rounded-lg mx-3 mb-3'>
        <div className='flex justify-between items-center text-2xl'>
          <button><Minus weight='bold' size={32} className='hover:text-[#c42342] duration-300 p-2' onClick={decrementItem} /></button>
          <input
            type='number'
            className='w-full bg-transparent text-center outline-none [&::-webkit-inner-spin-button]:appearance-none'
            value={quantidade}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => atualizarQuantidade(e)}/>
          <button><Plus weight='bold' size={32} className='hover:text-[#c42342] duration-300 p-2' onClick={incrementItem} /></button>
        </div>
      </div>
      <div className="flex mx-3 mb-3">
      {editable ?
        <button
          onClick={editarProduto}
          className="relative p-6 bg-[#4C5857] dark:bg-[#3C3837] hover:bg-[#2E3736] dark:hover:bg-[#2E3736] text-white text-lg font-semibold py-3 px-4 w-full rounded-lg duration-300">
          Editar
          <PencilSimpleLine size={25} className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white" />
        </button> :
        <button
          onClick={addToCart}
          className="relative p-6 bg-[#95507E] hover:bg-[#5a314d] text-white text-lg font-semibold py-3 px-4 w-full rounded-lg duration-300">
          Adicionar
          <ShoppingCart size={25} className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white" />
        </button>}
      </div>
    </div>
  );
}

export default CardProduto;
