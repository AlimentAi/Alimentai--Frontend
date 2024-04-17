import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./pages/todo/Todo"
import NotFound from "./pages/notfound/NotFound"
import { NavBar } from "./components/navBar/NavBar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import { Login } from "./pages/login/Login"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <NavBar/>
              <Home />
              <Footer />
            </>
          } />
          <Route path='/home' element={
            <>
              <NavBar/>
              <Home />
              <Footer />
            </>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/cadastrar' element={<Todo />} />
          <Route path='/sobre' element={<Todo />} />
          <Route path='/contato' element={<Todo />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
