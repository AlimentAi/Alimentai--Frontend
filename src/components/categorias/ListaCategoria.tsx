import React, { useContext, useEffect, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Categoria from '../../models/Categoria';
import { buscar } from '../../services/Service';
import CardCategoria from './CardCategoria';

function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente');
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  const handleFiltrarCategorias = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroCategoria(e.target.value);
  };

  const categoriasFiltradas = categorias.filter(categoria =>
    categoria.nome.toLowerCase().includes(filtroCategoria.toLowerCase())
  );

  const cadastrarCategoria = (
    <Link to='/cadastrarCategoria'>
      <button
        className={'p-2 border-3 rounded-lg font-bold w-64 bg-white dark:bg-[#212b24] hover:scale-110 duration-300'}
        style={{ fontSize: '15px' }}>
        Cadastrar nova Categoria
      </button>
    </Link>
  )

  return (
    <>
      {categorias.length === 0 && (
        <>
          <div className="flex flex-col items-center justify-center my-4 gap-4">
            <Vortex
              height="100"
              width="100"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              visible={true}
              colors={['#be0343', '#be0343', '#be0343', '#be0343', '#be0343', 'green']}
            />
            <p>Parece que nenhuma categoria foi criada ainda.</p>
            {cadastrarCategoria}
          </div>
        </>
      )}
      <div className="flex justify-center w-full md:px-20 bg-wallpaper bg-repeat bg-center">

        <div className="flex justify-center w-full md:px-20">
          <div className="container flex flex-col">
            {categorias.length !== 0 && (
              <>
                <div className={'my-10 bg-green-300 bg-opacity-50 backdrop-blur-sm dark:bg-[#394B3E] dark:bg-opacity-30 py-3 px-10 mb-10 flex flex-col md:gap-0 md:flex-row justify-between items-center rounded-full'}>
                  <span className='font-bold mr-4 text-2xl md:text-4xl'>CATEGORIAS</span>
                  <input
                    type="text"
                    placeholder="Pesquisar por categoria"
                    value={filtroCategoria}
                    onChange={handleFiltrarCategorias}
                    className='border-slate-800 rounded m-4 bg-white dark:bg-[#212b24] h-min w-full px-3 py-1 duration-300'
                  />
                  {cadastrarCategoria}
                </div>
              </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoriasFiltradas.map((categoria) => (
                <CardCategoria key={categoria.id} categoria={categoria} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategoria;
