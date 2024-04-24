import React, { useContext, useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Categoria from '../../models/Categoria';
import { buscar } from '../../services/Service';
import CardCategoria from './CardCategoria';

function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
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

  const handleSelecionarCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoriaSelecionada(e.target.value);
  };

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
            <DNA
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper mx-auto"
            />
          </div>
          <p>Parece que nenhuma categoria foi criada ainda.</p>
        </>
      )}

      <div className="flex justify-center w-full px-20 my-4">
        <div className="container flex flex-col">
          {categorias.length !== 0 && <>
            <span style={{ fontFamily: 'Roboto', fontWeight: 'normal' }} className='font-semibold self-start py-3 mx-20'>COMPRE POR</span>
            <div className="bg-green-100 dark:bg-green-900 py-7 px-10 mb-20 flex items-center rounded-full">
              <span style={{ fontFamily: 'Roboto', fontWeight: 'normal' }} className='font-semibold mr-4'>CATEGORIAS</span>
              <select
                name="categoria"
                id="categoria"
                value={categoriaSelecionada}
                onChange={handleSelecionarCategoria}
                className='border-slate-800 rounded bg-transparent ml-20'
              >
                <option value="" disabled>Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Pesquisar por categoria"
                value={filtroCategoria}
                onChange={handleFiltrarCategorias}
                className='border-slate-800 rounded bg-white dark:bg-green-950 ml-auto px-3 py-1 ml-200 duration-300'
                style={{ marginRight: '20px', width: '400px' }}
              />
            </div></>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriasFiltradas.map((categoria) => ( 
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>

      <Link to='/cadastrarCategoria'><button className='m-4 p-2 border rounded-lg border-black dark:border-white'>Cadastrar nova Categoria</button></Link>
    </>
  );
}

export default ListaCategoria;
