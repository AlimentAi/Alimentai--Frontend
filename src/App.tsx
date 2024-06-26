import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./pages/todo/Todo"
import NotFound from "./pages/notfound/NotFound"
import { NavBar } from "./components/navBar/NavBar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { AuthContext, AuthProvider } from "./contexts/AuthContext"
import FavoritosPage from "./pages/favoritos/FavoritosPage"
import { Cadastrar } from "./pages/cadastrar/Cadastrar"
import DeletarCategoria from "./components/categorias/DeletarCategoria"
import { FormularioCategoria } from "./components/categorias/FormularioCategoria"
import ListaCategoria from "./components/categorias/ListaCategoria"
import ListaProdutos from "./components/produtos/ListaProdutos"
import Sobre from "./pages/sobre/Sobre"
import { useContext } from "react"
import DeletarProduto from "./components/produtos/DeletarProduto"
import { FormularioProduto } from "./components/produtos/FormularioProduto"
import { AreaVendedor } from "./pages/areaVendedor/AreaVendedor"
import { Carrinho } from "./pages/carrinho/Carrinho"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditarUsuario from "./pages/editarUsuario/EditarUsuario"

function App() {
  const {usuario} = useContext(AuthContext)

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/' element={
            usuario.token === '' ? <Login /> : <Home />
          } />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastrar' element={<Cadastrar />} />
          <Route path='/editarUsuario' element={<EditarUsuario />} />
          <Route path='/contato' element={<Todo />} />
          <Route path='/favoritos' element={<FavoritosPage />} />
          <Route path='/listaProdutos' element={<ListaProdutos />} />
          <Route path='/cadastrarProduto' element={<FormularioProduto />} />
          <Route path='/editarProduto/:id' element={<FormularioProduto />} />
          <Route path='/deletarProduto/:id' element={<DeletarProduto />} />
          <Route path='/listaCategorias' element={<ListaCategoria />} />
          <Route path='/cadastrarCategoria' element={<FormularioCategoria />} />
          <Route path='/editarCategoria/:id' element={<FormularioCategoria />} />
          <Route path='/deletarCategoria/:id' element={<DeletarCategoria />} />
          <Route path='/areaVendedor' element={<AreaVendedor />} />
          <Route path='/carrinho' element={<Carrinho />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
