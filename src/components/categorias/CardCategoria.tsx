import { Link } from 'react-router-dom';
import Categoria from '../../models/Categoria';

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className='border m-4 flex flex-col rounded-2xl overflow-hidden shadow-md bg-gray-50 dark:bg-neutral-900 duration-300'>
      <p className='p-5 pb-5 text-3xl font-bold text-white bg-[#c42342] dark:bg-[#a81313]'>{categoria.nome}</p>
      <p className='p-5 text-2xl font-semibold h-full'>{categoria.descricao}</p>

      <div className="flex p-2">
        <Link to={`/editarCategoria/${categoria.id}`} className='w-full text-slate-100 bg-sky-700 hover:bg-sky-900 flex items-center justify-center py-2 rounded-lg duration-300'>
          <button className="rounded-lg">Editar</button>
        </Link>
        <Link to={`/deletarCategoria/${categoria.id}`} className='text-slate-100 bg-red-500 hover:bg-rose-700 w-full flex items-center justify-center py-2 rounded-lg duration-300'>
          <button className="rounded-lg">Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
