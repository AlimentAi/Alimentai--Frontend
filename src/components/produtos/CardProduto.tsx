import { useState } from 'react';
import Produto from '../../models/Produto';
import { Minus, Plus } from '@phosphor-icons/react';

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  const [quantidade, setQuantidade] = useState(0);

  function incrementItem() {
    if (quantidade < produto.quantidade)
      setQuantidade(quantidade + 1);
  }

  function decrementItem() {
    if (quantidade > 0)
      setQuantidade(quantidade - 1);
  }

  return (
<div className='border border-gray-300 shadow-md rounded-lg overflow-hidden max-w-64'>
  <img src={produto.foto} className='w-full' alt={produto.nome} />
  <div className='p-4 flex flex-col justify-center items-center'>
    <p className='text-start text-2xl font-bold mb-4'>{produto.nome}</p>
    <p className='w-full flex items-center justify-center py-2 rounded-lg duration-300'>{produto.descricao}</p>
    <p>Peso aprox: 250g</p>
    <p className='text-2xl font-bold text-start my-2'>{Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(produto.preco)}</p>
  </div>
  <div className='p-4 border border-gray-300 rounded-lg mx-3 mb-3'>
    <div className='flex justify-between items-center text-2xl px-2'>
      <Minus size={24} className='' onClick={decrementItem} />
      <p>{quantidade}</p>
      <Plus size={24} className='' onClick={incrementItem} />
    </div>
  </div>
</div>



  );
}

export default CardProduto;
