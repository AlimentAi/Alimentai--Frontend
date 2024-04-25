import imageLista from "../../assets/alface-fresca.jpg"

export function ItemLista() {
  return (
    <tbody className="w-full h-28 flex items-center justify-center">
      <tr className="w-[70%] h-32 flex items-center justify-between bg-white border-[1px] rounded-md">
        <td className="w-[16%] h-full flex gap-4 border-r-[1px]">
            <img src={imageLista} alt="" className=""/>
        </td>

        <div className="w-full flex items-center justify-around">
          <td>
            <h1 className="text-xl">Semenete Peletizada De Alface Brunela 1.000 Sementes Feltrin</h1>
          </td>

          <td className="">
            <h2>Estoque</h2>
            <p>108</p>
          </td>

          <td className="">
            <h2>Vendidos</h2>
            <p>30</p>
          </td>

          <td className="w-[20%] h-full flex justify-center items-center">
            <button className="w-full h-14 bg-[#eeefee] rounded-full">Editar anúncio</button>
          </td>
        </div>
      </tr>
    </tbody>
  )
}