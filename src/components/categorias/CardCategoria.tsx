import { Link } from 'react-router-dom';
import Categoria from '../../models/Categoria';
import { PencilSimpleLine, Trash } from '@phosphor-icons/react';

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className='border m-4 flex flex-col rounded-2xl overflow-hidden shadow-md bg-white dark:bg-neutral-900 duration-300'>
      <p className='p-2 pb-2 text-3xl font-bold text-white bg-[#be0343] dark:bg-[#870431]'>{categoria.nome}</p>
      <p className='p-5 text-2xl font-semibold h-full'>{categoria.descricao}</p>

      <div className="flex">
        <Link to={`/editarCategoria/${categoria.id}`} className='w-4/5 text-slate-100 bg-[#4C5857] hover:bg-[#2E3736] flex items-center justify-center py-2 duration-300'>
          <button className="relative flex items-center justify-center w-full">
            EDITAR
            <PencilSimpleLine size={18} className="absolute right-11 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          </button>
        </Link>
        <Link to={`/deletarCategoria/${categoria.id}`} className='w-2/5 text-slate-100 bg-[#f76c6f] hover:bg-[#ae3235] flex items-center justify-center py-2 duration-300'>
          <button className="rounded-lg">
            <Trash size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
