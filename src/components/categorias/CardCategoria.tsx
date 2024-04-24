import { Link } from 'react-router-dom';
import Categoria from '../../models/Categoria';

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className='border m-4 flex flex-col rounded-2xl overflow-hidden justify-between shadow-md'>
      <p className='p-10 text-3xl font-bold bg-gray-50 h-full'>{categoria.nome}</p>
      <p className='p-5 text-3xl font-semibold bg-gray-50 h-full'>{categoria.descricao}</p>

      <div className="flex flex-col p-2 bg-gray-50">
        <Link to={`/editarCategoria/${categoria.id}`} className='w-full text-slate-100 bg-sky-700 hover:bg-sky-900 flex items-center justify-center py-2 rounded-lg'>
          <button className="rounded-lg">Editar</button>
        </Link>
        <Link to={`/deletarCategoria/${categoria.id}`} className='text-slate-100 bg-red-500 hover:bg-rose-700 w-full flex items-center justify-center py-2 rounded-lg'>
          <button className="rounded-lg">Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
