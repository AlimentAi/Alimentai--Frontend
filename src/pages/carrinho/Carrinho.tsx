import { ItemListaCarrinho } from "../../components/itemLista/ItemListaCarrinho";
import { SearchBar } from "../../components/searchBar/SearchBar";

export function Carrinho() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 pt-20 p-8">
      <SearchBar titulo="Meu Carrinho" />
      <div className="w-[90%] flex gap-12">
        <table className="w-full flex flex-col border-[1px] rounded-md">
          <thead className="w-full flex items-center justify-center border-b-[1px]">
            <tr className="w-full h-16 flex items-center justify-between bg-transparent text-[#54412f]">
              <th className="w-[50%] flex justify-center">Item</th>
              <div className="w-[50%] flex justify-around">
                <th className="w-full flex justify-center">Preço</th>
                <th className="w-full flex justify-center">Quantidade</th>
                <th className="w-full flex justify-center">Subtotal</th>
              </div>
            </tr>
          </thead>
          <tbody className="flex flex-col">
            <ItemListaCarrinho />
            <ItemListaCarrinho />
            <ItemListaCarrinho />
            <ItemListaCarrinho />
          </tbody>
        </table>

        <div className="flex flex-col items-start gap-4 bg-transparent p-6 rounded-md shadow-xl">
          <h1 className="w-96 text-2xl text-start font-bold pb-1">Resumo do pedido</h1>
          <p className="font-semibold text-[#607571]">Faltam apenas R$222,96 para Frete Grátis</p>
          
          <div className="w-full flex items-center gap-2">
            <span className="w-28 text-sm text-start font-semibold text-[#607571]">R$ 50,00</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="w-[16%] bg-emerald-400 h-2.5 rounded-full"></div>
            </div>
            <span className="w-28 text-sm text-end font-semibold text-[#607571]">R$ 299,00</span>
          </div>

          <hr className="w-full"/>


        </div>
      </div>
    </div>
  )
}