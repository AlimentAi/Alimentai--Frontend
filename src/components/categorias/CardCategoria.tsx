import { Link } from 'react-router-dom';
import Categoria from '../../models/Categoria';

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className='border m-4 flex flex-col rounded-2xl overflow-hidden shadow-md bg-white dark:bg-neutral-900 duration-300'>
      <p className='p-2 pb-2 text-3xl font-bold text-white bg-[#6ea930] dark:bg-[#3f611c]'>{categoria.nome}</p>
      <p className='p-5 text-2xl font-semibold h-full'>{categoria.descricao}</p>

      <div className="flex">
        <Link to={`/editarCategoria/${categoria.id}`} className='w-4/5 text-slate-100 bg-[#4C5857] hover:bg-[#2E3736] flex items-center justify-center py-2 duration-300'>
          <button className="rounded-lg">EDITAR</button>
        </Link>
        <Link to={`/deletarCategoria/${categoria.id}`} className='w-2/5 text-slate-100 bg-[#974547] hover:bg-[#773536] flex items-center justify-center py-2 duration-300'>
          <button className="rounded-lg">DELETAR</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
