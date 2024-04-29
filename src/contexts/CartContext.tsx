import { createContext, useState, useEffect } from "react";
import Produto from "../models/Produto";

interface CartContextCrud {
  carrinho: CartItem[];
  valorTotal: number;
  adicionarItem: (produto: Produto, quantidadeDesejada: number) => void;
  removerItem: (id: number) => void;
  limparCarrinho: () => void;
  alterarQuantidade: (id: number, quantidade: number) => void;
  valorRestante: number;
}

interface CartItem {
  id: number;
  produto: Produto;
  quantidadeDesejada: number;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as CartContextCrud);

export function CartProvider({ children }: CartProviderProps) {
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorRestante, setValorRestante] = useState(0);
  const [percentual, setPercentual] = useState(0);

  useEffect(() => {
    // Calcula o valor total inicial quando o componente é montado
    let total = 0;
    carrinho.forEach((item) => {
      total += item.quantidadeDesejada * item.produto.preco;
    });
    setValorTotal(total);

    // Calcula o valor restante para o frete grátis
    const novoValorRestante = total < 99 ? 99 - total : 0;
    setValorRestante(novoValorRestante);

    // Calcula o percentual
    const novoPercentual = (total / 99) * 100;
    setPercentual(novoPercentual > 100 ? 100 : novoPercentual);
  }, [carrinho]);

  function adicionarItem(produto: Produto, quantidadeDesejada: number) {
    const novoItem: CartItem = {
      id: carrinho.length,
      produto: produto,
      quantidadeDesejada: quantidadeDesejada
    };

    setCarrinho([...carrinho, novoItem]);
  }

  function removerItem(id: number) {
    const itemRemovido = carrinho.find((item) => item.id === id);
    if (!itemRemovido) return;

    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);

    // Recalcula o valor total excluindo o valor do item removido
    const novoValorTotal =
      valorTotal - itemRemovido.produto.preco * itemRemovido.quantidadeDesejada;
    setValorTotal(novoValorTotal);

    // Recalcula o valor restante para o frete grátis
    const novoValorRestante = novoValorTotal < 99 ? 99 - novoValorTotal : 0;
    setValorRestante(novoValorRestante);

    // Recalcula o percentual
    const novoPercentual = (novoValorTotal / 99) * 100;
    setPercentual(novoPercentual > 100 ? 100 : novoPercentual);
  }

  function limparCarrinho() {
    setCarrinho([]);
    setValorTotal(0);
    setValorRestante(99);
    setPercentual(0);
  }

  function alterarQuantidade(id: number, quantidade: number) {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id) {
        return { ...item, quantidadeDesejada: quantidade };
      }
      return item;
    });

    let total = 0;
    novoCarrinho.forEach((item) => {
      total += item.quantidadeDesejada * item.produto.preco;
    });
    setValorTotal(total);

    let restante = total < 99 ? 99 - total : 0;
    setValorRestante(restante);

    setCarrinho(novoCarrinho);

    // Recalcula o percentual
    const novoPercentual = (total / 99) * 100;
    setPercentual(novoPercentual > 100 ? 100 : novoPercentual);
  }

  return (
    <CartContext.Provider
      value={{
        carrinho,
        valorTotal,
        adicionarItem,
        removerItem,
        limparCarrinho,
        alterarQuantidade,
        valorRestante
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
