import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { CardVendedor } from "./CardVendedor";
import { buscar } from "../../services/Service";
import Produto from "../../models/Produto";
import beterrabaHertBroken from '../../assets/beteration/beterraba-heartbroken.png';


export function AreaVendedor() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]); 
  const [filtroProduto, setFiltroProduto] = useState<string>("");

  useEffect(() => {
    async function fetchProdutosDoVendedor() {
      try {
        await buscar('/produtos', setProdutos, {
          headers: {
            Authorization: usuario.token,
          },
        });
      } catch (error) {
        console.error("Erro ao buscar os produtos do vendedor:", error);
        toast.error("Erro ao buscar os produtos do vendedor. Por favor, tente novamente.");
      }
    }

    if (usuario.tipo !== "produtor") {
      toast.error("Opa! Parece que você não está usando uma conta de vendedor...");
      navigate("/");
    } else {
      fetchProdutosDoVendedor();
    }
  }, [usuario.id, usuario.tipo, navigate]);

  const handleFiltrarProdutos = (filtro: string) => {
    setFiltroProduto(filtro);
  };

  const produtosFiltrados = produtos.filter(produto => produto.usuario.id === usuario.id && produto.nome.toLowerCase().includes(filtroProduto.toLowerCase()));

  return (
    <div className="flex justify-center w-full h-screen px-20 bg-wallpaper bg-repeat bg-center">
    <div className="w-full flex flex-col items-center">
      <div className="w-[70%] flex items-center justify-between pr-2 pl-2 font-bold my-10">
      </div>
      <SearchBar titulo="ÁREA DO VENDEDOR" handleFiltrarProdutos={handleFiltrarProdutos} />
      <div className="my-20">
        {produtosFiltrados.map((produto) => (
          <CardVendedor key={produto.id} produto={produto} />
        ))}
        {produtosFiltrados.length === 0 && (
          <div>
            <img src={beterrabaHertBroken} alt="Beterraba Heart Broken" className="mx-auto w-96 h-auto" />
            <p className="text-center text-lg font-semibold text-black-600">
              Ainda não há Produtos adicionados
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}