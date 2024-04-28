import { Bomb } from '@phosphor-icons/react'
import React from 'react'

function NotFound() {
  return (
    <>
      <div className='flex flex-col flex-center mx-[20%] my-10 items-center m-auto min-h-[62vh]'>
        <img src="src/assets/beteration/beterraba-farmer.png" alt="" className='w-auto max-h-64' />
        <p className='text-3xl'>Parece que você está tentando plantar além dos limites. Tente navegar pelo botões acima.</p>
      </div>
    </>
  )
}

export default NotFound