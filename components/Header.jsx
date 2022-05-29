import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';


const Header = () => {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active)
  }

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <>
      <nav className='flex items-center flex-wrap bg-gray-900 p-3 sticky top-0 z-50 mb-8'>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
            <span className='text-xl text-white font-bold uppercase tracking-wide'>
              Guru Guides
            </span>
          </a>
        </Link>
        <button
          className=' inline-flex p-3 hover:bg-purple-500 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
             {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}><span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer hover:text-purple-700">{category.name}</span></Link>
          ))}
          </div>
        </div>
      </nav>
    </>
  )
};

export default Header