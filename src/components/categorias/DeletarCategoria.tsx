import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Categoria from '../../models/Categoria'
import { buscar, deletar } from '../../services/Service'
import { toast } from 'react-toastify'
import { toastAlerta } from '../../utils/toastAlerta'

function DeletarCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        const mensagemInativo = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="font-semibold">Vish você esta um tempo inativo, faça login novamente por favor</span>
            <img src="https://i.imgur.com/EM7Oc1r.png" alt="Tempo Inativo" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
          </div>
        );
toast.error(mensagemInativo);
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      const mensagemLogue = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="font-semibold">Logue primeiro antes de qualquer ação</span>
          <img src="https://i.imgur.com/9LUfmKX.png" alt="Logue Primeiro" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
        </div>
      );
toast.error(mensagemLogue);
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate('/listaCategorias')
  }

  async function deletarCategoria() {
    try {
      await deletar(`/categorias/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      toastAlerta('A categoria foi apagada com sucesso', 'sucess')
      retornar()

    } catch (error) {
      toastAlerta('Erro ao apagar a categoria', 'error')
    }

    retornar
  }
  return (
    <div className='container w-1/2 mx-auto'>
      <h1 className='text-4x1 text-center my-4'>Deletar categoria</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza que deseja apagar essa categoria?</p>

      <div className='border m-4 flex flex-col rounded-2xl overflow-hidden shadow-md bg-gray-50 dark:bg-neutral-900 duration-300'>
        <p className='p-5 pb-5 text-3xl font-bold dark:bg-rose-950'>{categoria.nome}</p>
        <p className='p-5 text-2xl font-semibold h-full'>{categoria.descricao}</p>

        <div className="flex p-2">
          <button onClick={retornar} className='w-full text-slate-100 bg-sky-700 hover:bg-sky-900 flex items-center justify-center py-2 rounded-lg duration-300'>
            <button className="rounded-lg">Não</button>
          </button>
          <button onClick={deletarCategoria} className='text-slate-100 bg-red-500 hover:bg-rose-700 w-full flex items-center justify-center py-2 rounded-lg duration-300'>
            <button className="rounded-lg">Sim</button>
          </button>
        </div>
      </div>


    </div>
  )
}

export default DeletarCategoria