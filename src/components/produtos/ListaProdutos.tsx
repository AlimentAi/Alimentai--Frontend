import React, { useContext, useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Produto from '../../models/Produto';
import Categoria from '../../models/Categoria';
import { buscar } from '../../services/Service';
import CardProduto from './CardProduto';

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroProduto, setFiltroProduto] = useState<string>("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  async function buscarProdutos() {
    try {
      await buscar('/produtos', setProdutos, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente');
        handleLogout();
      }
    }
  }

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
    buscarProdutos();
    buscarCategorias();
  }, [token]);

  const handleFiltrarProdutos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroProduto(e.target.value);
  };

  const handleSelecionarCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoriaSelecionada(e.target.value);
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(filtroProduto.toLowerCase()) &&
    (categoriaSelecionada === "" || produto.categoria.id === parseInt(categoriaSelecionada))
  );

  return (
    <>
      {produtos.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full px-20 my-10">
        <div className="container flex flex-col">
          {produtos.length !== 0 && (
            <>
            <div className="bg-green-200 dark:bg-[#394B3E] py-3 px-10 mb-10 flex items-center rounded-full">
            <span className='font-bold mr-4 ' style={{ fontSize: '40px' }}>PRODUTOS</span>
                
                <select
                  name="categoria"
                  id="categoria"
                  value={categoriaSelecionada}
                  onChange={handleSelecionarCategoria}
                  className='border-slate-800 rounded bg-transparent ml-20 '
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                  ))}
                </select>
                
                <input
                  type="text"
                  placeholder="Pesquisar por produto"
                  value={filtroProduto}
                  onChange={handleFiltrarProdutos}
                  className='border-slate-800 rounded bg-white dark:bg-[#212b24] ml-auto px-3 py-1 ml-200 duration-300'
                  style={{ marginRight: '20px', width: '400px' }}
                />
  
                <Link to='/cadastrarProduto'>
                <button className='m-4 p-2 border-3 rounded-lg border-black dark:border-white font-semibold text-blacke bg-white dark:bg-[#212b24]'>Cadastrar novo Produto</button>
                </Link>
              </div>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map((produto) => ( 
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
  
}

export default ListaProdutos;