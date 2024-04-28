import { ItemListaCarrinho } from "../../components/itemLista/ItemListaCarrinho";
import { SearchBar } from "../../components/searchBar/SearchBar";

export function Carrinho() {
  return (
    <div className="w-full flex flex-col items-center gap-8 p-8">
      <SearchBar titulo="Meu Carrinho" />
      <div className="w-[80%] flex items-center justify-center gap-12">
        <table className="w-[70%] flex flex-col gap-2 border-[1px] rounded-md">
          <thead className="w-full flex flex-col items-center justify-center">
            <tr className="w-full h-16 flex items-center justify-between bg-transparent border-b-[1px] text-[#54412f]">
              <th className="w-[50%]">Item</th>
              <div className="w-[50%] flex justify-around">
                <th className="w-1/3 flex justify-center">Preço</th>
                <th className="w-1/3 flex justify-center">Quantidade</th>
                <th className="w-1/3 flex justify-center">Subtotal</th>
              </div>
            </tr>
          </thead>
          <ItemListaCarrinho />
          <ItemListaCarrinho />
          <ItemListaCarrinho />
          <ItemListaCarrinho />
        </table>

        <div className="w-[30%] bg-slate-400">Teste</div>
      </div>
    </div>
  )
}