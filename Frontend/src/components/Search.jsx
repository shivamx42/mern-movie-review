import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function Search() {
  const [search, setSearch] = useState('');
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };
  return (
    <div className='flex flex-col items-center'>
    <form
      className='bg-slate-100 p-3 my-8 rounded-lg flex items-center border-[2px] border-[#1F201F] dark:border-[white] dark:bg-slate-300'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        placeholder='Search Movies'
        className='bg-transparent focus:outline-none w-24 sm:w-64 dark:placeholder-black placeholder:text-sm'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        disabled={search === ''}
      >
        <FaSearch size={15} className='duration-0 text-[#1F201F] ml-3 mt-1'/>
      </button>
    </form>
    </div>
  );
}