import { ChangeEvent, useContext, useEffect, useState } from "react";
import Logo from "../../assets/logo.png"
import Categoria from "../../models/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import { toast } from "react-toastify";
import { toastAlerta } from "../../utils/toastAlerta";

export function FormularioCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })

    console.log(JSON.stringify(categoria))
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: {
            'Authorization': token
          }
        })

        toastAlerta('Categoria atualizada com sucesso', 'sucess')
        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          const mensagemTokenExpirou = (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="font-semibold">O token expirou, favor logar novamente</span>
              <img src="https://i.imgur.com/EM7Oc1r.png" alt="Tempo Inativo" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
            </div>
          );
  toast.error(mensagemTokenExpirou);
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar a Categoria', 'error')
        }
      }

    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: {
            'Authorization': token
          }
        })

        toastAlerta('Categoria cadastrada com sucesso', 'sucess')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          const mensagemToken = (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="font-semibold">O token expirou, favor logar novamente</span>
              <img src="https://i.imgur.com/EM7Oc1r.png" alt="Tempo Inativo" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
            </div>
          );
  toast.error(mensagemToken);
          handleLogout()
        } else {
          toastAlerta('Erro ao cadastrar a Categoria', 'error')
        }
      }
    }

    retornar()
  }

  function retornar() {
    navigate("/home")
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

  return (
    <div className="w-full min-h-[84vh] container flex flex-col items-center justify-center mx-auto gap-4">
      <div className="w-[90%] justify-center flex items-center">
        <h1 className="text-3xl font-bold">{id === undefined ? 'Nova Categoria' : 'Editar Categoria'}</h1>
        <img src={Logo} className="w-14" alt="" />
      </div>

      <form className="w-1/2 flex flex-col items-center gap-4" onSubmit={gerarNovaCategoria}>
        <input
          type="text"
          placeholder="Nome da Categoria"
          name='nome'
          className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
          value={categoria.nome}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />

        <input
          type="text"
          placeholder="Descrição da Categoria"
          name='descricao'
          className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
          value={categoria.descricao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />

        <button
          className="w-[50%] h-14 bg-[#f76c6f] rounded-lg font-bold text-white hover:bg-[#c42342] duration-1000"
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  )
}