import { Bomb } from '@phosphor-icons/react'
import React from 'react'

function NotFound() {
  return (
    <>
      <div className='flex flex-col flex-center mx-[20%] my-10 items-center m-auto min-h-[62vh]'>
        <Bomb size={256} />
        <p className='text-3xl'>Cuidado! Essa página não tem nada além de uma bomba de bugs. Saia imadiatamente ou fique por sua conta e risco!</p>
      </div>
    </>
  )
}

export default NotFound