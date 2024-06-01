import { Link, useSearchParams } from "react-router-dom";

export default function HeaderItem({ title, param }) {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get('genre');
  return (
    <div>
      <Link
          className={`font-semibold ${genre === param ? '  text-red-400 hover:text-red-400' : 'hover:text-slate-800 dark:hover:text-slate-50'
          }`}
        to={`/?genre=${param}`}
      >
        {title}
      </Link>
    </div>
  );
}