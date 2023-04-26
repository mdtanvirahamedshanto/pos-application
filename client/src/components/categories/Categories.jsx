import React from 'react'

const Categories = () => {
  return (
    <ul className='flex md:flex-col gap-4 text-lg'>
        <li className='bg-sky-500 px-6 py-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center min-w-[145px]'>
            <span>Tümü</span>
        </li>
        <li className='bg-sky-500 px-6 py-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center min-w-[145px]'>
            <span>Yiyecek</span>
        </li>
        <li className='bg-sky-500 px-6 py-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center min-w-[145px]'>
            <span>İçecek</span>
        </li>
    </ul>
  )
}

export default Categories
