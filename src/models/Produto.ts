import Usuario from "./Usuario";
import Categoria from "./Categoria";

export default interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    foto: string;
    categoria: Categoria;
    usuario: Usuario;
}