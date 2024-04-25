import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import Categoria from "../../models/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import Produto from "../../models/Produto";

export function FormularioProduto() {
  const [produto, setProduto] = useState<Produto>({} as Produto);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategorias() {
    try {
      await buscar(`/categorias`, setCategorias, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente');
        handleLogout();
      } else {
        alert('Erro ao buscar as categorias');
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
    buscarCategorias();
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value
    });
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (id !== undefined) {
        await atualizar(`/produtos/${id}`, produto, setProduto, {
          headers: {
            Authorization: token
          }
        });
        alert('Produto atualizado com sucesso');
      } else {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token
          }
        });
        alert('Produto cadastrado com sucesso');
      }
      retornar();
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente');
        handleLogout();
      } else {
        alert('Erro ao cadastrar/atualizar o produto');
      }
    }
  }

  function retornar() {
    navigate("/home");
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [token]);

  //TODO: Criar card de preview que atualiza os componentes conforme edição do usuário
  return (
    <div className="w-full min-h-[84vh] container flex flex-col items-center justify-center mx-auto gap-4 my-8">
      <div className="w-[90%] justify-center flex items-center">
        <h1 className="text-3xl font-bold">{id === undefined ? 'Novo Produto' : 'Editar Produto'}</h1>
        <img src={Logo} className="w-14" alt="" />
      </div>

      <form className="w-1/2 flex flex-col items-center gap-4" onSubmit={gerarNovoProduto}>
        <input
          type="text"
          placeholder="Nome do Produto"
          name='nome'
          className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
          value={produto.nome}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />

        <input
          type="text"
          placeholder="Descrição do Produto"
          name='descricao'
          className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
          value={produto.descricao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />

        <input
          type="number"
          placeholder="Preço do Produto"
          name='preco'
          className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
          value={produto.preco}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />

        <input
          type="number"
          placeholder="Quantidade do Produto"
          name='quantidade'
          className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
          value={produto.quantidade}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />

        <input
          type="text"
          placeholder="URL da Imagem do Produto"
          name='foto'
          className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
          value={produto.foto}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />

        <select
          name="categoria"
          className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
          value={produto.categoria?.id || ''}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setProduto({
              ...produto,
              categoria: {
                id: parseInt(e.target.value),
                nome: e.target.options[e.target.selectedIndex].text,
                descricao: ''
              }
            })
          }
        >
          <option value="">Selecione a categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <button
          className="w-[50%] h-14 bg-[#f76c6f] rounded-lg font-bold text-white hover:bg-[#c42342] duration-1000"
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  );
}
