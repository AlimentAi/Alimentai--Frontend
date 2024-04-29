import React, { useState } from "react";
import { Link } from "react-router-dom";

interface PropsSearchBar {
  titulo: string;
  handleFiltrarProdutos: (filtro: string) => void;
  usuarioTipo?: string;
  mostrarCarrinhoIcon?: boolean;
}


export function SearchBar(props: PropsSearchBar) {
  const [filtroProduto, setFiltroProduto] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtro = e.target.value;
    setFiltroProduto(filtro);
    props.handleFiltrarProdutos(filtro);
  };

  return (
    <div className="w-[90%] bg-[#ebfbea] dark:bg-[#394B3E] py-6 px-10 mb-10 flex items-center justify-between rounded-full">
      <div className="flex items-center">
        <span className='font-normal text-3xl'>{props.titulo}</span>
        <div className="ml-20 flex relative">
          <input
            type="text"
            placeholder="Pesquisar por produto"
            value={filtroProduto}
            onChange={handleInputChange}
            className='border-slate-800 rounded bg-white dark:bg-[#212b24] px-3 py-1 duration-300'
            style={{ width: '400px' }}
          />
        </div>
      </div>
      {(props.usuarioTipo === "produtor" || props.usuarioTipo === "administrador") && (
        <Link to='/cadastrarProduto'>
          <button
            className={`p-3 border-3 rounded-lg border-black dark:border-white font-semibold ${'bg-white dark:bg-[#212b24] dark:text-white hover:text-black hover:bg-white dark:hover:bg-[#212b24]'} transform hover:scale-110 transition-all duration-300`}
            style={{ fontSize: '15px' }}
          >
            Cadastrar novo Produto
          </button>
        </Link>
      )}
    </div>
  );
}
