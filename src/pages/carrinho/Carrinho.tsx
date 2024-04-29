import { useContext, useEffect, useState } from "react";
import { ItemListaCarrinho } from "../../components/itemLista/ItemListaCarrinho";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

export function Carrinho() {
  const { carrinho, valorTotal, valorRestante } = useContext(CartContext);
  const [percentual, setPercentual] = useState(0);

  useEffect(() => {
    const limiteFreteGratis = 99;
    const percentualValorTotal = (valorTotal / limiteFreteGratis) * 100;
    setPercentual(percentualValorTotal > 100 ? 100 : percentualValorTotal);
  }, [valorTotal, valorRestante, carrinho]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 pt-20 p-8">
      <SearchBar titulo="Meu Carrinho" />
      <div className="w-[90%] flex gap-12">
        <table className="w-full flex flex-col border-[1px] rounded-md">
          <thead className="w-full flex items-center justify-between border-b-[1px]">
            <tr className="w-full h-16 flex items-center justify-between bg-transparent text-[#54412f]">
              <th className="w-[50%] flex justify-center">Item</th>
              <th className="w-[50%] flex justify-around">
                <th className="w-full flex justify-center">Preço</th>
                <th className="w-full flex justify-center">Quantidade</th>
                <th className="w-full flex justify-center">Subtotal</th>
              </th>
            </tr>
          </thead>
          <tbody className="flex flex-col">
            {carrinho.map((item) => (
              <ItemListaCarrinho key={item.id} id={item.id} produto={item.produto} quantidadeDesejada={item.quantidadeDesejada} />
            ))}
          </tbody>
        </table>

        <div className="flex flex-col items-start gap-4 bg-transparent p-6 rounded-md shadow-xl">
          <h1 className="w-96 text-2xl text-start font-bold pb-1">Resumo do pedido</h1>
          <p className="font-semibold text-[#607571]">Faltam apenas {
            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorRestante)
          } para Frete Grátis</p>

          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="w-[16%] bg-emerald-400 h-2.5 rounded-full" style={{ width: `${percentual}%` }}></div>
          </div>

          <div className="flex items-center justify-between">
            <span className="w-28 text-sm text-start font-semibold text-[#607571]">{valorTotal}</span>
            <span className="w-28 text-sm text-end font-semibold text-[#607571]">R$ 99,00</span>
          </div>

          <hr className="w-full" />
        </div>
      </div>
    </div>
  );
}
