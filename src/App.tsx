import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./pages/todo/Todo"
import NotFound from "./pages/notfound/NotFound"
import { NavBar } from "./components/navBar/NavBar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { AuthProvider } from "./contexts/AuthContext"
import { Cadastrar } from "./pages/cadastrar/Cadastrar"
import DeletarCategoria from "./components/categorias/DeletarCategoria"
import { FormularioCategoria } from "./components/categorias/FormularioCategoria"
import ListaCategoria from "./components/categorias/ListaCategoria"

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/cadastrar' element={<Cadastrar />} />
            <Route path='/sobre' element={<Todo />} />
            <Route path='/contato' element={<Todo />} />
            <Route path='/listaProdutos' element={<Todo />} />
            <Route path='/cadastrarProduto' element={<Todo />} />
            <Route path='/editarProduto/:id' element={<Todo />} />
            <Route path='/deletarProduto/:id' element={<Todo />} />
            <Route path='/listaCategorias' element={<ListaCategoria />} />
            <Route path='/cadastrarCategoria' element={<FormularioCategoria />} />
            <Route path='/editarCategoria/:id' element={<FormularioCategoria />} />
            <Route path='/deletarCategoria/:id' element={<DeletarCategoria />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
