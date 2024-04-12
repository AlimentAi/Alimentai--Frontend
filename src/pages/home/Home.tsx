import { House } from '@phosphor-icons/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
          <div className='flex flex-col flex-center mx-[20%] my-10 items-center m-auto min-h-[62vh]'>
            <House size={256} />
            <p className='text-3xl'>Esta é a página Home... Ainda em desenvolvimento com um desenho e texto diferentes :p</p>
            <p>Explore os outros elementos da tela e veja o que eles fazem ou apenas pegue a rota <Link to='/notfound' className='font-bold underline'>/notfound</Link> :)</p>
          </div>
        </>
      )
}

export default Home