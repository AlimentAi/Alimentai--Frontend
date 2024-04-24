import { Link } from 'react-router-dom';
import Categoria from '../../models/Categoria';

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className='border m-4 flex flex-col rounded-2xl overflow-hidden shadow-md bg-gray-50 dark:bg-neutral-900 duration-300'>
      <p className='p-5 pb-5 text-3xl font-bold text-white bg-[#CC9564] dark:bg-[#584141]'>{categoria.nome}</p>
      <p className='p-5 text-2xl font-semibold h-full'>{categoria.descricao}</p>

      <div className="flex p-2">
        <Link to={`/editarCategoria/${categoria.id}`} className='w-full text-slate-100 bg-[#4C5857] hover:bg-[#2E3736] flex items-center justify-center py-2 rounded-lg duration-300'>
          <button className="rounded-lg">Editar</button>
        </Link>
        <Link to={`/deletarCategoria/${categoria.id}`} className='text-slate-100 bg-[#974547] hover:bg-[#773536] w-full flex items-center justify-center py-2 rounded-lg duration-300'>
          <button className="rounded-lg">Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
