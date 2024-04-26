import { ReactNode, createContext, useState } from "react"
import Produto from "../models/Produto"

interface CartContextCrud {
    carrinho: CartItem[]
    buscarItens: () => CartItem[]
    adicionarItem: (produto: Produto, quantidade: number) => void
    removerItem: (index: number) => void
    limparCarrinho: () => void
    alterarQuantidade: (index: number, quantity: number) => void
}

interface CartItem {
  id: number
  produto: Produto
  quantidade: number
}

interface CartProviderProps {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextCrud)

export function CartProvider({ children }: CartProviderProps) {
    const [carrinho, setCarrinho] = useState<CartItem[]>([])

    function buscarItens() {
        return carrinho
    }

    function adicionarItem(produto: Produto, quantidade: number) {
      const novoItem: CartItem = {
        id: carrinho.length,
        produto: produto,
        quantidade: quantidade
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
          return {...item, quantidade: quantidade}
        }
        return item
      })

      setCarrinho(novoCarrinho)
    }

    return (
        <CartContext.Provider value={{carrinho, buscarItens, adicionarItem, removerItem, limparCarrinho, alterarQuantidade}}>
          {children}
        </CartContext.Provider>
    )
}