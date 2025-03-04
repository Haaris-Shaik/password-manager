import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 py-3 px-10 flex justify-between items-center'>
        <div className='logo text-white font-bold text-2xl'><span className='text-green-400'>&lt;</span>PASS<span className='text-green-400'>OP/&gt;</span></div>
        <button className='bg-green-500 flex p-2 justify-center items-center gap-2 rounded-full hover:bg-green-400 border hover:border-green-900 '><img className='w-8' src="icons/github.svg" alt="github" />GitHub</button>
    </nav>
  )
}

export default Navbar
