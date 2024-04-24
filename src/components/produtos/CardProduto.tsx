import React, { useState } from 'react'
import Postagem from '../../models/Postagem'
import { Minus, Plus } from '@phosphor-icons/react'

/*interface CardProdutoProps {
  produto: Postagem
}*/

const produto = {
  id: 0,
  nome: "Lorem Ipsum",
  descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda quia maiores alias eaque rerum enim voluptate atque recusandae quo molestias, labore, architecto ex asperiores in fugiat, a doloremque possimus ipsa?",
  preco: 12.34,
  quantidade: 4,
  data: "24-04-2024",
  foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwW3IWpDpIZjhTkrxapzBSKnJXrj3aKMvRS3ctQn0Pw&s",
  categoria: {
    id: 0,
    nome: "fruta",
    descricao: "Descrição"
  },
  usuario: {
    id: 0,
    nome: "José da Silva"
  }
}

function CardProduto() {
  const [quantidade, setQuantidade] = useState(0)

  function incrementItem() {
    if (quantidade < produto.quantidade)
      setQuantidade(quantidade + 1)
  }

  function decrementItem() {
    if (quantidade > 0)
      setQuantidade(quantidade - 1)
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
  )
}

export default CardProduto