import { Link, useNavigate } from "react-router-dom";
import SwitchTheme from "../Toggle Theme/SwitchTheme";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CrossIcon, HamburgerIcon } from "../Toggle Theme/Icons";
import "./css/Header.css";

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate("/profile");
  }

  return (
    <div className='flex justify-between items-center p-4 relative'>
      <div className='flex gap-4 ml-4'>
        <button className="sm:hidden" hidden={isMenuOpen} onClick={toggleMenu}>
          <HamburgerIcon />
        </button>

        <div className='hidden sm:flex flex-row gap-4'>
          {currentUser ? (
            <div className="">
            <img src={`${currentUser.pic}`} className="w-8 h-8 rounded-full object-cover hover:cursor-pointer" onClick={handleClick}/>
            </div>
            
          ) : (
            <Link to="/account" className='hover:text-amber-500'>
              <div className='uppercase text-sm'>Sign In</div>
            </Link>
          )}
          <Link to="/" className='hover:text-amber-500'>
            <p className='uppercase text-sm'>Home</p>
          </Link>
          <Link to="/about" className='hover:text-amber-500'>
            <p className='uppercase text-sm'>About</p>
          </Link>
        </div>
      </div>

      <div className='flex items-center mr-4'>
        <Link to="/" className='mr-8'>
          <span className='text-lg font-bold bg-slate-300 py-1 px-2 rounded-lg'>
            FlickFusion
          </span>
        </Link>
        <SwitchTheme />
      </div>

      {isMenuOpen && (
        <>
          <div className="menu-backdrop" onClick={toggleMenu}></div>
          <div className={`menu-container ${isMenuOpen ? 'open' : ''} dark:bg-[#526278]`}>
            <div className="menu-header">
              <span className='font-bold'>Menu</span>
              <button onClick={toggleMenu}>
                <CrossIcon />
              </button>
            </div>
            {currentUser ? (
              <div className="menu-item flex gap-2 items-center justify-center hover:cursor-pointer" onClick={handleClick}>
                <img src={`${currentUser.pic}`} className="w-8 h-8 rounded-full object-cover " />
                <span>Profile</span>
              </div>
            ) : (
              <div className="menu-item">
                <Link to="/account" onClick={toggleMenu} className='hover:text-amber-500'>
                  Sign In
                </Link>
              </div>
            )}
            <div className="menu-item">
              <Link to="/" onClick={toggleMenu} className='hover:text-amber-500'>
                Home
              </Link>
            </div>
            <div className="menu-item">
              <Link to="/about" onClick={toggleMenu} className='hover:text-amber-500'>
                About
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}