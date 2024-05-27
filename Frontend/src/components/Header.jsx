import { Link } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import HeaderItem from "./HeaderItem";

export default function Header() {
  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
      <div className='flex gap-4'>
        <HeaderItem title='home' address='/' Icon={AiFillHome} />
        <HeaderItem title='about' address='/about' Icon={BsFillInfoCircleFill} />
      </div>
      <div className='flex items-center gap-4'>
        <Link to="/" className='flex gap-1 items-center'>
          <span className='text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg'>
            IMDb
          </span>
          <span className='text-xl hidden sm:inline'>Clone</span>
        </Link>
      </div>
    </div>
  );
}