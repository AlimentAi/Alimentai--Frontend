import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { ItemLista } from "../../components/itemLista/ItemLista";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { SearchBar } from "../../components/searchBar/SearchBar";

export function AreaVendedor() {
  const { usuario } = useContext(AuthContext)
  let navigate = useNavigate()

  useEffect(() => {
    if (usuario.tipo !== 'produtor') {
      toast.error('Opa! Parece que você não está usando uma conta de vendedor...')
      navigate('/')
    }
  }, [usuario.tipo])

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