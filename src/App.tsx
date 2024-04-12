import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./pages/todo/Todo"
import NotFound from "./pages/notfound/NotFound"
import { NavBar } from "./components/navBar/NavBar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Todo />} />
          <Route path='/cadastrar' element={<Todo />} />
          <Route path='/sobre' element={<Todo />} />
          <Route path='/contato' element={<Todo />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
