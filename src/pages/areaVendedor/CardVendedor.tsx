import { useContext } from "react";
import Produto from "../../models/Produto";
import { AuthContext } from "../../contexts/AuthContext";
import { PencilSimpleLine } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

interface CardVendedorProps {
  produtos: Produto[];
}

export function CardVendedor({ produtos }: CardVendedorProps) {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const editarProduto = (produtoId: string) => {
    console.log(`Editar produto com ID: ${produtoId}`);
    navigate(`/editarProduto/${produtoId}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      {produtos.map((produto) => (
        <div key={produto.id} className="relative border border-gray-300 shadow-md rounded-lg overflow-hidden" style={{ width: "900px", height: "80px" }}>
          <div className="flex flex-row h-full">
            <img src={produto.foto} className="w-1/6 h-full object-cover" alt={produto.nome} />
            <div className="ml-4 flex-grow flex flex-col justify-center">
            </div>
              <div className="flex justify-between items-center h-full">
                <div className="flex flex-row">
                  <h1 className="text-lg font-bold">{produto.nome}</h1>
                  <p className="text-sm mt-1">{produto.descricao}</p>
              </div>
                <div className="flex flex-col items-end justify-center">
                  <div className="flex items-center">
                    <h2 className="text-sm p-2">Estoque</h2>
                    <p className="p-2">{produto.quantidade}</p>
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-sm p-2">Vendidos</h2>
                    <p className="p-2">30</p>
                  </div>
                </div>
              <div className="flex items-center justify-center">
                  <button
                    onClick={() => editarProduto(produto.id.toString())}
                    className="p-1 bg-[#4C5857] dark:bg-[#3C3837] hover:bg-[#2E3736] dark:hover:bg-[#2E3736] text-white text-lg font-semibold py-2 px-10 mr-4 rounded-lg duration-300"
                  >
                    Editar
                    <PencilSimpleLine size={20} className="ml-2 cursor-pointer text-white" />
                  </button>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
