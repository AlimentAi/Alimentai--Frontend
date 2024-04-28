/* eslint-disable prefer-const */
import { Minus, Plus, Trash } from "@phosphor-icons/react"
import { ChangeEvent, useContext, useState } from "react"
import imageLista from "../../assets/alface-fresca.jpg"
import Produto from "../../models/Produto";
import { CartContext } from "../../contexts/CartContext";

interface ItemListaCarrinhoProps {
  id: number,
  produto: Produto,
  quantidadeDesejada: number
}

export function ItemListaCarrinho({id, produto, quantidadeDesejada}: ItemListaCarrinhoProps) {
  const [quantidade, setQuantidade] = useState(quantidadeDesejada);
  const {alterarQuantidade} = useContext(CartContext)

  function incrementItem() {
    if (quantidade < produto.quantidade)
      setQuantidade(quantidade + 1);
      alterarQuantidade(id, quantidade)
    if (quantidade > produto.quantidade)
      setQuantidade(produto.quantidade)
  }

  function decrementItem() {
    if (quantidade > 0)
      setQuantidade(quantidade - 1);
      alterarQuantidade(id, quantidade)
    if (quantidade < 1)
      setQuantidade(0);
  }

  function atualizarQuantidade(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value)
    setQuantidade(value);
    alterarQuantidade(id, value)
  }

  return (
    <div className="flex flex-col items-center">
        <tr className="w-full h-40 flex items-center bg-transparent rounded-md">
          <td className="w-[50%] h-full flex items-center">
            <div className="w-[40%] p-6 flex items-center">
              <img src={produto.foto} alt="" className="w-[12rem] flex" />
            </div>
            <div className="flex flex-1 items-center">
              <h1 className="w-full text-xl">{produto.nome}</h1>
            </div>
          </td>

          <div className="w-[50%] flex gap-4">
            <td className="w-full flex justify-center">
              {Intl.NumberFormat(
                'pt-BR', {
                  style:'currency',
                  currency: 'BRL'}
                ).format(produto.preco)}</td>

            <td className="w-full flex justify-center">
              <div className='flex p-2 border border-emerald-400 rounded-lg'>
                <div className='flex text-xl'>
                  <button><Minus weight='bold' size={32} className='hover:text-[#c42342] dark:hover:text-[#95507E] duration-300 p-2' onClick={decrementItem} /></button>
                  <input
                    type='number'
                    className='w-full bg-transparent text-center outline-none [&::-webkit-inner-spin-button]:appearance-none'
                    value={quantidade}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarQuantidade(e)}
                  />
                  <button><Plus weight='bold' size={32} className='hover:text-emerald-400 dark:hover:text-[#95507E] duration-300 p-2' onClick={incrementItem} /></button>
                </div>
              </div>
            </td>

            <td className="w-full flex justify-center items-center gap-4">
              {Intl.NumberFormat(
                'pt-BR', {
                  style: 'currency',
                  currency: 'BRL'}
                ).format(produto.preco * quantidade)}</td>
            <Trash size={24} className="text-red-500" />
          </div>
        </tr>
      <hr  className="w-[95%]"/>
    </div>
  )
}