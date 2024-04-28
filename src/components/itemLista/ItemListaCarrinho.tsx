/* eslint-disable prefer-const */
import { Minus, Plus, Trash } from "@phosphor-icons/react"
import { ChangeEvent, useState } from "react"
import imageLista from "../../assets/alface-fresca.jpg"

export function ItemListaCarrinho() {
  const [quantidade, setQuantidade] = useState(0);

  function incrementItem() {
    setQuantidade(quantidade + 1);
  }

  function decrementItem() {
    if (quantidade > 0)
      setQuantidade(quantidade - 1);
    if (quantidade < 1)
      setQuantidade(0);
  }

  function atualizarQuantidade(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value)
    setQuantidade(value);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <tbody className="w-full h-36 flex items-center justify-center">
        <tr className="w-full h-32 flex items-center justify-between bg-transparent rounded-md">
          <td className="w-[50%] h-full flex gap-6">
            <div className="w-[50%] flex">
              <img src={imageLista} alt="" className="p-2" />
            </div>
            <div className="h-full flex items-center">
              <h1 className="text-xl">Semenete Peletizada De Alface Brunela 1.000 Sementes Feltrin</h1>
            </div>
          </td>

          <div className="w-[50%] flex justify-around items-center">
            <td className="w-1/3 flex justify-center">R$ 29,90</td>

            <td className="w-1/3 flex justify-center">
              <div className='w-[80%] p-2 border border-emerald-400 rounded-lg mx-3 mb-3'>
                <div className='flex justify-between items-center text-2xl'>
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

            <td className="w-1/3 flex justify-center gap-4">R$ 29,90 <Trash size={24} className="text-red-500" /></td>
          </div>
        </tr>
      </tbody>
      <hr  className="w-[95%]"/>
    </div>
  )
}