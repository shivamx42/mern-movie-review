import { Link } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import HeaderItem from "./HeaderItem";
import SwitchTheme from "../Toggle Theme/SwitchTheme";

export default function Header() {
  return (
    <div className='flex justify-between items-center p-4'>
      <div className='flex gap-4 ml-4'>
        <HeaderItem title='home' address='/' Icon={AiFillHome} />
        <HeaderItem title='about' address='/about' Icon={BsFillInfoCircleFill} />
      </div>
      <div className='flex items-center mr-4'>
        <Link to="/" className='mr-8'>
          <span className='text-lg font-bold bg-slate-300 py-1 px-2 rounded-lg'>
          FlickFusion
          </span>
        </Link>
          <SwitchTheme/>  
      </div>
    </div>
  );
}