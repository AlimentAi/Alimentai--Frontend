import Usuario from "./Usuario";
import Categoria from "./Categoria";

export default interface Postagem {
    id: number;
    titulo: string;
    texto: string;
    data: string;
    categoria: Categoria;
    usuario: Usuario;
}