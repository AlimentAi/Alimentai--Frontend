import React, { useContext, useEffect, useState } from "react";
import { ItemListaCarrinho } from "../../components/itemLista/ItemListaCarrinho";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import beterationCartImage from "../../assets/beteration/beterraba-cart.png";
 

export function Carrinho() {
  const { carrinho, valorTotal, valorRestante } = useContext(CartContext);
  const [percentual, setPercentual] = useState(0);
  const [freteGratis, setFreteGratis] = useState(false);
  const [filtroProduto, setFiltroProduto] = useState<string>("");

  useEffect(() => {
    const limiteFreteGratis = 99;
    const percentualValorTotal = (valorTotal / limiteFreteGratis) * 100;
    setPercentual(percentualValorTotal > 100 ? 100 : percentualValorTotal);
    setFreteGratis(valorTotal >= limiteFreteGratis);
  }, [valorTotal, valorRestante, carrinho]);

  const filtrarProdutos = (filtro: string) => {
    setFiltroProduto(filtro);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 pt-20 p-8">
      <SearchBar titulo="Meu Carrinho" handleFiltrarProdutos={filtrarProdutos} />
      <div className="w-[90%] flex gap-12">
        <table className="w-full flex flex-col border-[1px] rounded-md">
          <thead className="w-full flex items-center justify-between border-b-[1px]">
            <tr className="w-full h-16 flex items-center justify-between bg-transparent text-[#54412f]">
              <th className="w-[50%] flex justify-center">Item</th>
              <div className="w-[50%] flex justify-around">
                <th className="w-full flex justify-center">Preço</th>
                <th className="w-full flex justify-center">Quantidade</th>
                <th className="w-full flex justify-center">Subtotal</th>
              </div>
            </tr>
          </thead>
          {carrinho.length === 0 ? (
            <tbody className="flex flex-col items-center justify-around w-full h-full">
              <p className="text-xl font-bold mt-10">Seu carrinho está vazio. Deseja ir às compras?</p>

              <Link to="/listaProdutos">
                <button className="mt-10 h-full px-8 border rounded-lg text-2xl font-bold">Ir às compras</button>
              </Link>
              <img src={beterationCartImage} alt="Carrinho" className="mt-5" style={{ width: "200px", height: "200px" }} />


            </tbody>
          ) : (
            <tbody className="flex flex-col">
              {carrinho
                .filter((item) => item.produto.nome.toLowerCase().includes(filtroProduto.toLowerCase()))
                .map((item) => (
                  <ItemListaCarrinho
                    key={item.id}
                    id={item.id}
                    produto={item.produto}
                    quantidadeDesejada={item.quantidadeDesejada}
                  />
                ))}
            </tbody>
          )}
        </table>

        <div className="flex flex-col items-start gap-4 bg-transparent p-6 rounded-md shadow-xl">
          <h1 className="w-96 text-2xl text-start font-bold pb-1">Resumo do pedido</h1>
          {!freteGratis && (
            <p className="font-semibold text-[#607571]">
              Faltam apenas {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorRestante)}para Frete Grátis
            </p>
          )}
          {freteGratis && <p className="font-semibold text-[#607571]">Parabéns, você conseguiu frete grátis!</p>}

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
