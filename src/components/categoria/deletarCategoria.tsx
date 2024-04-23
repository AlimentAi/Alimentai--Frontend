import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Categoria from '../../models/Categoria'
import { buscar, deletar } from '../../services/Service'

function deletarCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`,  setCategoria, {
                headers: {
                    'Authorizaion': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('Vish você esta um tempo inativo, faça login novamente por favor')
                handleLogout()
            }
        }
    }

    // useEffect(() => {
    //     if (token === ''){
    //         alert('Logue primeiro antes de qualquer ação')
    //         navigate('/login')
    //     }
    // },[token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate('/categorias')
    }

    async function deletarCategoria() {
        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('A categoria foi apagada com sucesso')

        } catch (error) {
            alert('Erro ao apagar a categoria')
        }

        retornar
    }
    return (
        <div className='container w-1/2 mx-auto'>
            <h1 className='text-4x1 text-center my-4'>Deletar categoria</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza que deseja apagar essa categoria?</p>

            <div className='border flex flex-col rounded-2x1 overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-[#f76c6f] text-white font-bold text-2x1'>Categoria</header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.descricao}</p>
                <div className='flex'>
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-green-400 hover:bg-green-600 flex items-center justify-center' onClick={deletarCategoria}>Sim</button>
                </div>
            </div>
        </div>
    )
}

export default deletarCategoria