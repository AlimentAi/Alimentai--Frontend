import { House } from '@phosphor-icons/react'
import React from 'react'
import { Link } from 'react-router-dom'
import foto1 from "../../assets/foto1-sm.jpg"
import foto2 from "../../assets/foto2-sm.jpg"
import foto3 from "../../assets/foto3-sm.jpg"
import { Carousel } from "@material-tailwind/react";
import Sobre from '../sobre/Sobre'

function Home() {
  return (
    <>
      <div className='flex -z-10 justify-center border-b-4 border-neutral-200 relative py-5'>
        <Carousel
          transition={{ duration: 2 }}
          className="rounded-xl w-full h-96 max-w-5xl mx-4"
          autoplay={true}
          loop={true}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <img
            src={foto1}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src={foto2}
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src={foto3}
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>

      <Sobre />
    </>
  )
}

export default Home
