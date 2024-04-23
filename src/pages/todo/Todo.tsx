import { DevToLogo } from '@phosphor-icons/react'
import React from 'react'

function Todo() {
  return (
    <>
      <div className='flex flex-col flex-center mx-[20%] my-10 items-center m-auto min-h-[62vh]'>
        <DevToLogo size={256} />
        <p className='text-3xl'>Esta página ainda está em desenvolvimento. Se você é um dev, aproveite para implementá-la :p</p>
      </div>
    </>
  )
}

export default Todo