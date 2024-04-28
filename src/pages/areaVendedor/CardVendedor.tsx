import { useContext } from "react";
import Produto from "../../models/Produto";
import { AuthContext } from "../../contexts/AuthContext";
import { PencilSimpleLine, Trash } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

interface CardVendedorProps {
  produto: Produto;
}

export function CardVendedor({ produto }: CardVendedorProps) {
  const navigate = useNavigate();

  function editarProduto() {
    navigate(`/editarProduto/${produto.id}`)
  }

  function deletarProduto() {
    navigate(`/deletarProduto/${produto.id}`)
  }

  return (
    <div className="relative container border border-gray-300 shadow-md rounded-lg overflow-hidden m-2 h-20 max-w-5xl">
      <div className="flex h-full">
        <img src={produto.foto} className="w-1/6 h-full object-cover border-r" alt={produto.nome} />
        <div className="flex justify-between items-center h-full w-full">
          <h1 className="text-lg font-bold w-40 px-2">{produto.nome}</h1>
          <p className="text-sm w-full text-justify p-2">{produto.descricao}</p>
          <div className="flex flex-col w-32 m-4 justify-center">
            <h2 className="text-sm p-1">Estoque: {produto.quantidade}</h2>
            <h2 className="text-sm p-1">Vendidos: 30</h2>
          </div>
        </div>
        <div className="m-2 rounded-xl flex overflow-hidden w-40">
          <button
            onClick={editarProduto}
            className="p-1 bg-[#4C5857] dark:bg-[#3C3837] hover:bg-[#2E3736] dark:hover:bg-[#2E3736] text-white text-lg font-semibold px-4 duration-300"
          >
            Editar
            <PencilSimpleLine size={20} className="w-full cursor-pointer text-white" />
          </button>
          <button
            onClick={deletarProduto}
            className="w-full p-1 text-slate-100 bg-[#f76c6f] hover:bg-[#ae3235]">
            <Trash size={28}/>
          </button>
        </div>
      </div>
    </div>
  );
}
