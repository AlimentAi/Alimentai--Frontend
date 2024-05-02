import React, { useContext, useEffect, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Produto from '../../models/Produto';
import Categoria from '../../models/Categoria';
import { buscar } from '../../services/Service';
import CardProduto from './CardProduto';
import { toastAlerta } from '../../utils/toastAlerta';

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroProduto, setFiltroProduto] = useState<string>("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'error');
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
        toastAlerta('O token expirou, favor logar novamente', 'error');
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
        toastAlerta('O token expirou, favor logar novamente', 'error');
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

  const cadastrarProduto = (
    <Link to='/cadastrarProduto'>
      <button
        className={`p-2 border-3 rounded-lg border-black dark:border-white font-semibold ${'bg-white dark:bg-[#212b24] dark:text-white hover:text-black hover:bg-white dark:hover:bg-[#212b24]'} transform hover:scale-110 transition-all duration-300`}
        style={{ fontSize: '15px' }}
      >
        Cadastrar novo Produto
      </button>
    </Link>
  )

  return (
    <>
      {produtos.length === 0 && (
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
            <p>Parece que nenhum produto foi postado ainda.</p>
            <p>Aguarde até que um vendedor poste algo.</p>
          </div>
        </>
      )}
      <div className="container justify-center mx-auto px-20 bg-wallpaper bg-repeat bg-center">
        <div className="">
          {produtos.length !== 0 && (
            <>
              <div className={'my-10 bg-green-300 bg-opacity-50 backdrop-blur-sm dark:bg-[#394B3E] dark:bg-opacity-30 py-3 px-10 mb-10 flex flex-col md:flex-row items-center rounded-full gap-4'}>
                <span className='font-bold text-4xl'>PRODUTOS</span>
                <div className='flex'>
                  <select
                    name="categoria"
                    id="categoria"
                    value={categoriaSelecionada}
                    onChange={handleSelecionarCategoria}
                    className='border-slate-800 rounded bg-transparent mx-4'
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
                    className='border-slate-800 rounded bg-white dark:bg-[#212b24] hidden md:block mx-auto px-3 py-1 duration-300'
                  />
                </div>
                {(usuario.tipo === "produtor" || usuario.tipo === "administrador") && cadastrarProduto}
              </div>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtosFiltrados.map((produto) => (
              <CardProduto key={produto.id} produto={produto} editable={produto.usuario.id === usuario.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;
