import Usuario from "./Usuario";
import Categoria from "./Categoria";

export default interface Postagem {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    data: string;
    foto: string;
    categoria: Categoria;
    usuario: Usuario;
}