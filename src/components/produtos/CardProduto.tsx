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
    <div className='border flex flex-col overflow-hidden max-w-64'>
      <img src={produto.foto} className='w-full' alt={produto.nome} />
      <div className='p-4'>
        <p className='text-start text-2xl font-bold mb-4'>{produto.nome}</p>
        <p className='text-justify mb-2'>{produto.descricao}</p>
        <p>Peso aprox: 250g</p>
        <p className='text-2xl font-bold text-start my-2'>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(produto.preco)}</p>
        <div className='flex justify-between items-center text-2xl px-2 border'>
          <Minus size={24} className='' onClick={decrementItem} />
          <p>{quantidade}</p>
          <Plus size={24} className='' onClick={incrementItem} />
        </div>
      </div>
    </div>
  );
}

export default CardProduto;
