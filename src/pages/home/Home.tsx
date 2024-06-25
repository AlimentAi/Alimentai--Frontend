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
      <div className='flex justify-center border-neutral-200 relative'>
        <Carousel
          transition={{ duration: 2 }}
          className="w-full h-[45rem]"
          autoplay={true}
          loop={true}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <img
            src={foto1}
            alt="image 1"
            className="h-full w-full object-fill"
          />
          <img
            src={foto2}
            alt="image 2"
            className="h-full w-full object-fill"
          />
          <img
            src={foto3}
            alt="image 3"
            className="h-full w-full object-fill"
          />
        </Carousel>
      </div>

      <Sobre />
    </>
  )
}

export default Home
