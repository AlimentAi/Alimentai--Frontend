import { MagnifyingGlass } from "@phosphor-icons/react";

interface PropsSearchBar {
  titulo: string
}

export function SearchBar(props: PropsSearchBar) {
  return(
    <div className="w-[80%] bg-[#ebfbea] dark:bg-[#394B3E] py-3 px-10 mb-10 flex items-center justify-between rounded-full">
    <span className='font-normal text-3xl'>{props.titulo}</span>
    <div className="w-[40%] relative">
      <input type="search" className="w-full bg-purple-white shadow rounded-full border-0 p-3" placeholder="Search by name..." />
      <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-100 rounded-full p-2">
        <MagnifyingGlass size={24} />
      </div>
    </div>
  </div>
  )
}