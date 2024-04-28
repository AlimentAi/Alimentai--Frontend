import { ReactNode, createContext, useState } from "react"
import Produto from "../models/Produto"

interface CartContextCrud {
  carrinho: CartItem[]
  buscarItens: () => CartItem[]
  adicionarItem: (produto: Produto, quantidadeDesejada: number) => void
  removerItem: (index: number) => void
  limparCarrinho: () => void
  alterarQuantidade: (index: number, quantity: number) => void
  valorTotal: number
  valorRestante: number
}

interface CartItem {
  id: number
  produto: Produto
  quantidadeDesejada: number
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextCrud)

export function CartProvider({ children }: CartProviderProps) {
  const [carrinho, setCarrinho] = useState<CartItem[]>([])
  const [valorTotal, setValorTotal] = useState(0)
  const [valorRestante, setValorRestante] = useState(0)

  function buscarItens() {
    return carrinho
  }

  function adicionarItem(produto: Produto, quantidadeDesejada: number) {
    const novoItem: CartItem = {
      id: carrinho.length,
      produto: produto,
      quantidadeDesejada: quantidadeDesejada
    }

    setCarrinho([...carrinho, novoItem])
  }

  function removerItem(id: number) {
    const novoCarrinho = carrinho.filter((item) => item.id !== id)
    setCarrinho(novoCarrinho)
  }

  function limparCarrinho() {
    setCarrinho([])
  }

  function alterarQuantidade(id: number, quantidade: number) {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id) {
        return { ...item, quantidadeDesejada: quantidade }
      }
      return item
    })

    let total = 0;
    carrinho.forEach((item) => {
      total += item.quantidadeDesejada * item.produto.preco;
    })
    setValorTotal(total)

    let restante = total < 99 ? 99 - total : 0;
    setValorRestante(restante)

    setCarrinho(novoCarrinho)
  }

  return (
    <CartContext.Provider value={{ carrinho, buscarItens, adicionarItem, removerItem, limparCarrinho, alterarQuantidade, valorTotal, valorRestante }}>
      {children}
    </CartContext.Provider>
  )
}