import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { CardVendedor } from "./CardVendedor";
import { buscar } from "../../services/Service";
import Produto from "../../models/Produto";

export function AreaVendedor() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]); 

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

  return (
    <div className="w-full flex flex-col items-center gap-8 p-8">
      <div className="w-[70%] flex items-center justify-between pr-2 pl-2">
        <h1 className="text-4xl">Área do Vendedor</h1>
        <button className="w-48 bg-[#ffd6b2] rounded-full p-3">
          <Link to="/cadastrarProduto">Anunciar Produto</Link>
        </button>
      </div>
      <SearchBar titulo="SEUS PRODUTOS" />
      <div className="grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-h-auto">
        {produtos.filter(produto => produto.usuario.id === usuario.id).map((produto) => (
          <CardVendedor key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}
