import { ItemLista } from "../../components/itemLista/ItemLista";
import { SearchBar } from "../../components/searchBar/SearchBar";

export function AreaVendedor() {
  return (
    <div className="w-full flex flex-col items-center gap-8 p-8">
      <div className="w-[70%] flex items-center justify-between pr-2 pl-2">
        <h1 className="text-4xl">Área do Vendedor</h1>
        <button className="w-48 bg-[#ffd6b2] rounded-full p-3">Criar Novo Anúncio</button>
      </div>
      <SearchBar titulo="Seus anúncios" />
      <div className="w-full flex flex-col gap-10">
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
      </div>
    </div>
  )
}