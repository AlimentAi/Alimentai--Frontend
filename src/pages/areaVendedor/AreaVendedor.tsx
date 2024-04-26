import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { ItemLista } from "../../components/itemLista/ItemLista";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

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

      <div className="w-[70%] bg-[#ebfbea] dark:bg-[#394B3E] py-3 px-10 mb-10 flex items-center justify-between rounded-full">
        <span className='font-normal text-3xl'>Seus anúncios</span>
        <div className="w-[40%] relative">
          <input type="search" className="w-full bg-purple-white shadow rounded-full border-0 p-3" placeholder="Search by name..." />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-100 rounded-full p-2">
            <MagnifyingGlass size={24} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-10">
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
      </div>
    </div>
  )
}