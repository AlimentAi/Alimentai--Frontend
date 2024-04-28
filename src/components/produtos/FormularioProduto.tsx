import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import Categoria from "../../models/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import Produto from "../../models/Produto";
import { toast } from "react-toastify";
import { toastAlerta } from "../../utils/toastAlerta";

export function FormularioProduto() {
  const [produto, setProduto] = useState<Produto>({} as Produto);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: '',
    descricao: ''
  })

  async function buscarProdutoPorId(id: string) {
    await buscar(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategoriaPorId(id: string) {
    await buscar(`/produtos/${id}`, setCategoria, {
      headers: {
        Authorization: token
      }
    })
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
        const mensagemTokenExpirou = (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="font-semibold">O token expirou, favor logar novamente</span>
              <img src="https://i.imgur.com/qR3xwhs.png" alt="Tempo Inativo" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
            </div>
          );
  toast.error(mensagemTokenExpirou);
        handleLogout();
      } else {
        const mensagemErroCategoria = (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="font-semibold">Erro ao buscar as Categorias</span>
              <img src="https://i.imgur.com/aAwsVDm.png" alt="Erro ao buscar Categorias" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
            </div>
          );
  toast.error(mensagemErroCategoria);
      }
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario
    });
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (id !== undefined) {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token
          }
        });
        toastAlerta('Produto atualizado com sucesso', 'sucess');
      } else {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token
          }
        });
        toastAlerta('Produto cadastrado com sucesso', 'sucess');
      }
      retornar();
    } catch (error: any) {
      if (error.toString().includes('403')) {
        const mensagemToken = (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="font-semibold">O token expirou, favor logar novamente</span>
              <img src="https://i.imgur.com/EM7Oc1r.png" alt="Tempo Inativo" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
            </div>
          );
  toast.error(mensagemToken);
        handleLogout();
      } else {
        const mensagemErro = (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="font-semibold">Erro ao cadastrar/atualizar o produto</span>
              <img src="https://i.imgur.com/F1Yn7v3.png" alt="Erro ao Cadastrar Usuário" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
            </div>
          );
          toast.error(mensagemErro);
      }
    }
  }

  function retornar() {
    navigate("/home");
  }

  useEffect(() => {
    if (token === '') {
        const mensagemErro = (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="font-semibold">Você precisa estar logado</span>
              <img src="https://i.imgur.com/F1Yn7v3.png" alt="Precisa estar Logado" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
            </div>
          );
          toast.error(mensagemErro);
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
    buscarCategorias();
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria
    })
  }, [categoria])

  //TODO: Criar card de preview que atualiza os componentes conforme edição do usuário
  return (
    <div className="container flex justify-around">
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
            min='0'
            step='0.01'
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <input
            type="number"
            placeholder="Quantidade do Produto"
            name='quantidade'
            className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
            value={produto.quantidade}
            min={0}
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
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
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
      <div>
        <p>Criar card de preview</p>
      </div>
    </div>
  );
}
