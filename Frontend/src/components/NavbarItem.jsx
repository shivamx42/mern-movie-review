import { Link, useSearchParams } from "react-router-dom";

export default function NavbarItem({ title, param }) {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get('genre');
  return (
    <div>
      <Link
        className={`hover:text-amber-600 font-semibold ${
          genre === param
            ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
            : ''
        }`}
        to={`/?genre=${param}`}
      >
        {title}
      </Link>
    </div>
  );
}