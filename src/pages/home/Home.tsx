import { House } from '@phosphor-icons/react'
import React from 'react'
import { Link } from 'react-router-dom'
import foto1 from "../../assets/foto1.jpeg"
import foto2 from "../../assets/foto2.jpeg"
import foto3 from "../../assets/foto3.jpeg"
import { Carousel } from "@material-tailwind/react";

function Home() {
  return (
    <>
        <div className=' top-4 relative'><h1 className='text-3xl'> Bem-Vindos! </h1></div>
        

      <div className='flex justify-center border-b-4 border-neutral-200 top-8 relative pb-5'>
        <Carousel transition={{ duration: 2 }} className="rounded-xl w-1/2 h-96" autoplay={true} loop={true} >
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

      <div>
        <div className='top-12 relative'><h1 className='text-3xl'> Sobre o ALIMENTAi </h1></div>

        <div className='flex flex-col flex-center mx-[20%] my-10 m-auto min-h-[62vh] text-justify top-8 relative gap-4'>
          <p className='text-1xl'>Bem-vindo à nossa plataforma dedicada a conectar pequenos produtores e agricultores com consumidores conscientes, apaixonados por produtos frescos e de qualidade. Aqui na nossa comunidade, valorizamos não apenas os alimentos que você compra, mas também as histórias por trás deles - histórias de trabalho árduo, dedicação à terra e um compromisso com práticas sustentáveis.</p>

          <p className='text-1xl'> Nosso propósito é criar uma ponte entre os que cultivam e os que consomem, promovendo uma conexão genuína e transparente. Acreditamos que cada produto tem uma história única, e é essa narrativa que queremos compartilhar com você, nosso estimado cliente.</p>

          <p className='text-1xl'>Ao escolher nossa plataforma, você está apoiando diretamente agricultores locais e pequenos produtores, ajudando a fortalecer comunidades e economias regionais. Estamos comprometidos em promover práticas de comércio justo e sustentável, garantindo que tanto os agricultores quanto os consumidores sejam beneficiados de maneira equitativa.</p>

          <p className='text-1xl'>Nossa equipe é composta por entusiastas dedicados, apaixonados por alimentos de qualidade e pelo bem-estar daqueles que os produzem. Estamos aqui para fornecer a você uma experiência de compra sem igual, repleta de produtos frescos, sazonais e cultivados com cuidado e respeito pela natureza.</p>

          <p className='text-1xl'>Junte-se a nós nessa jornada de descoberta e celebração da agricultura local. Juntos, podemos fazer uma diferença real, apoiando pequenos produtores e criando um futuro mais sustentável para todos.</p>
        </div>

        <div className='my-8 mt-16'>
          <p className='text-1xl'>Obrigado por fazer parte da nossa comunidade.</p>

          <p className='text-1xl'>Atenciosamente,</p>

          <p className='text-1xl'>ALIMENTAi - Raízes Sustentáveis</p>
        </div>
      </div>
    </>
  )
}

export default Home