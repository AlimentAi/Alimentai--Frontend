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

  return (
    <>
      {categorias.length === 0 && (
        <>
          <div className="flex justify-center w-full my-4">
            <div className="flex justify-center">
              <Vortex
                height="100"
                width="100"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                visible={true}
                colors={['#be0343', '#be0343', '#be0343', '#be0343', '#be0343', 'green']}
              />
            </div>
          </div>
          <p>Parece que nenhuma categoria foi criada ainda.</p>
        </>
      )}

      <div className="flex justify-center w-full px-20 my-10">
        <div className="container flex flex-col">
          {categorias.length !== 0 && (
            <>
              <div className="bg-green-200 dark:bg-[#394B3E] py-3 px-10 mb-10 flex items-center rounded-full">
                <span className='font-bold mr-4 ' style={{ fontSize: '40px' }}>CATEGORIAS</span>
                <input
                  type="text"
                  placeholder="Pesquisar por categoria"
                  value={filtroCategoria}
                  onChange={handleFiltrarCategorias}
                  className='border-slate-800 rounded bg-white dark:bg-[#212b24] ml-auto px-3 py-1 ml-200 duration-300'
                  style={{ marginRight: '40px', width: '400px' }}
                />
                <Link to='/cadastrarCategoria'>
                  <button
                    className={`p-2 border-3 rounded-lg border-black dark:border-white font-semibold ${'bg-white dark:bg-[#212b24] dark:text-white hover:text-black hover:bg-white dark:hover:bg-[#212b24]'} transform hover:scale-110 transition-all duration-300`}
                    style={{ fontSize: '15px' }}
                  >
                    Cadastrar nova Categoria
                  </button>
                </Link>
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
    </>
  );
}

export default ListaCategoria;
