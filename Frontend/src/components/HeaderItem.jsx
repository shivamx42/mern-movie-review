import { Link } from "react-router-dom";

export default function HeaderItem({ title, address, Icon }) {
  return (
    <Link to={`${address}`} className='hover:text-amber-500'>
      <Icon className="text-2xl sm:hidden"/>
      <p className='uppercase hidden sm:inline text-sm'>{title}</p>
    </Link>
  );
}