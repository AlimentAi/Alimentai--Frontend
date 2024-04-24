import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Produto from '../../models/Produto'
import { buscar, deletar } from '../../services/Service'

function DeletarProduto() {
    const [produto, setProduto] = useState<Produto>({} as Produto)

    let navigate = useNavigate()

    const { id } = useParams <{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
        }catch (error: any) {
            if (error.toString().includes('403')) {
                alert('Vish você esta um tempo inativo, faça login novamente por favor')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Logue primeiro antes de qualquer ação')
            navigate('/Login')
        }
    }, [token])

useEffect(() => {
    if (id !== undefined) {
        buscarPorId(id)
    }
}, [id])

function retornar(){
    navigate('/listaProdutos')
}

async function deletarProduto() {
    try {
        await deletar(`/produtos/${id}`, {
            headers: {
                'Autrorization': token
            }
        })

        alert('O produto foi deletado com sucesso')
        retornar()

    }catch (error) {
        alert('Erro ao tentar deletar o produto')
    }

    retornar
}
    return (
        <div className="conatiner w-1/3 mx-auto">
            <h1 className="text-4x1 text-center my-4">Deletar Produto</h1>
            <p className="text-center  font-semibold mb-4">Você tem certeza que deseja deletar esse produto?</p>
            <div className="border flex flex-col rounded-2x1 overflow-hidden justify-between">

                <p className="p-5 pb-5 text-3xl font-bold dark:bg-rose-950">{produto.nome}</p>
                <p className="p-5 text-2xl font-semibold h-full">{produto.descricao}</p>

                <div>
                    <button onClick={retornar} className="w-full text-slate-100 hover:bg-sky-900 flex items-center justify-center py-2 rounded-lg duration-300">
                        <button className="rounded-lg">Não</button>
                    </button>
                    <button onClick={DeletarProduto} className="text-slate-100 bg-red-500 hover:bg-rose-700 w-full flex items-center justify-center py-2 rounded-lg duration-300">
                        <button className="rounded-lg">Sim</button>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto