import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./pages/todo/Todo"
import NotFound from "./pages/notfound/NotFound"
import { NavBar } from "./components/navBar/NavBar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { AuthProvider } from "./contexts/AuthContext"
import { Cadastrar } from "./pages/cadastrar/Cadastrar"

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
            <Route path='/*' element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
